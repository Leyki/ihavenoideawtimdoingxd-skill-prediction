
const {protocol, sysmsg} = require('tera-data-parser'),
    Command = require('command'),
    Ping = require('./ping'),
    AbnormalityPrediction = require('./abnormalities'),
    skills = require('../config/skills'),
    silence = require('../config/data/silence').reduce((map, value) => { // Convert array to object for fast lookup
        map[value] = true
        return map
    }, {})

const INTERRUPT_TYPES = {
    'retaliate': 5,
    'lockonCast': 36
}

const Flags = {
    Player: 0x04000000,
    CC: 0x08000000
}

module.exports = function SkillPrediction(dispatch) {
    const ping = Ping(dispatch),
        abnormality = AbnormalityPrediction(dispatch),
        command = Command(dispatch),
        fs = require('fs'),
        path = require('path')

    let config = null,
        sending = false,
        skillsCache = null,
        cid = null,
        model = 0,
        race = -1,
        job = -1,
        vehicleEx = null,
        mounted = false,
        aspd = 1,
        currentGlyphs = null,
        currentStamina = 0,
        staminaModifier = 0, //For gunner's chest roll 'Reduces Willpower cost of Burst Fire by 5.'
        alive = false,
        inCombat = false,
        inventoryHook = null,
        inventory = null,
        equippedWeapon = false,
        partyMembers = null,
        delayNext = 0,
        delayNextTimeout = null,
        actionNumber = 0x80000000,
        currentLocation = null,
        lastStartTime = 0,
        lastStartLocation = null,
        lastEndLocation = null,
        oopsLocation = null,
        currentAction = null,
        serverAction = null,
        serverConfirmedAction = false,
        queuedNotifyLocation = [],
        storedCharge = 0,
        lastEndSkill = 0,
        lastEndType = 0,
        lastEndedId = 0,
        serverTimeout = null,
        stageEnd = null,
        stageEndTime = 0,
        stageEndTimeout = null,
        debugActionTime = 0,
        packetsHooks = [],
        configFile = path.join(__dirname, '..','config','config.json')


	let canVB = false;
	let VBtimer = null;
    //-------------
    //Config init
    //-------------
    LoadConfiguration()

    //-------------
    //SP state from start enabled/disabled(init)
    //-------------
    if (config.enabled)
        enable()

    //-------------
    //Config file read 
    //-------------
    function LoadConfiguration() {
        try {
            config = JSON.parse(fs.readFileSync(configFile, 'utf8'))
        }
        catch (err) {
            console.log(configFile)
            console.error(`[Skill Prediction] Smth wrong with config.json... Error: ${err}`)
            process.exit()
        }
    }
    //-------------
    //Config file write
    //-------------
    function SaveConfiguration() {
        fs.writeFile(configFile, JSON.stringify(config, "\t"), (err) => {
            if (err)
                console.log('[Skill Prediction] Error!')
        })

    }
    //-------------
    //Enable function (for all main packets)
    //-------------
    function enable() {

        try{
            addHook('S_DEFEND_SUCCESS', 1, sDefendSuccessHandler)
            addHook('S_CANNOT_START_SKILL', 1, sCannotStartSkillHandler)
            addHook('C_CAN_LOCKON_TARGET', 1, cCanLockonTargetHandler)
            addHook('S_CAN_LOCKON_TARGET', 1, sCanLockonTarget)
            addHook('C_PLAYER_LOCATION', 1, cPlayerLocationHandler)
            addHook('C_NOTIFY_LOCATION_IN_ACTION', 1, notifyLocation.bind(null, 'C_NOTIFY_LOCATION_IN_ACTION', 1))
            addHook('C_NOTIFY_LOCATION_IN_DASH', 1, notifyLocation.bind(null, 'C_NOTIFY_LOCATION_IN_DASH', 1))
            for (let packet of [
                ['C_START_SKILL', 3],
                ['C_START_TARGETED_SKILL', 3],
                ['C_START_COMBO_INSTANT_SKILL', 1],
                ['C_START_INSTANCE_SKILL', 1],
                ['C_START_INSTANCE_SKILL_EX', 2],
                ['C_PRESS_SKILL', 1],
                ['C_NOTIMELINE_SKILL', 1]
            ])
                packetsHooks.push(dispatch.hook(packet[0], 'raw', {
                    order: -10,
                    filter: {fake: null}
                },  startSkill.bind(null, ...packet)))
            addHook('S_GRANT_SKILL', 1, sGrantSkillHandler)
            addHook('S_INSTANT_DASH', 1, sInstantDashHandler)
            addHook('S_INSTANT_MOVE', 1, sInstantMoveHandler)
            addHook('S_ACTION_END', 1, sActionEndHandler)
            addHook('C_CANCEL_SKILL', 1, cCancelSkillHandler)
            addHook('S_ACTION_STAGE', 1, sActionStageHandler)
        }
        catch(err){
            console.error(`[Skill Prediction] Critical error! Exit... Error: ${err}`)
            process.exit()
        }
        abnormality.enabled = true
        abnormality.DEBUG = config.debug_abnormals
    }
    //-------------
    //Disable function (for hooks in packetsHooks)
    //-------------
    function disable() {
        for (let pointer of packetsHooks) {
            dispatch.unhook(pointer)
            if (config.debug) debug(pointer)
        }
        packetsHooks = []
        abnormality.enabled = false
        abnormality.DEBUG = false
    }

    function addHook(packetName, packetVersion, func) {
        packetsHooks.push(dispatch.hook(packetName, packetVersion, func))
    }

    //-------------
    //Commands
    //-------------
    command.add('sp', (option, value) => {
        switch (option) {
            case 'info':
                command.message('Unofficial SP. Date:07/12/17')
                command.message(`Config: Timeout: ${config.server_timeout}, retries: ${config.skill_retry_count},jitter comp: ${config.jitter_compensation}, debug: ${config.debug}`)
                break
            case 'timeout':
                if (value === null || value === undefined || value === "") {
                    command.message(`[Skill Prediction] missing argument for command "timeout" [timeout]`);
                    break;
                }
                if (inCombat || sending) {
                    command.message('[Skill Prediction] try a bit later. server_timeout changes can crash client atm.')
                }
                else {
                    if (isNaN(parseInt(value)))
                        break
                    config.server_timeout = parseInt(value)
                }
                break
            case 'debug':
                if (config.debug)
                    command.message('[Skill Prediction] Debug deactivated')
                else
                    command.message('[Skill Prediction] Debug activated')

                config.debug = !config.debug
                break
            case 'debugloc':
                if (config.debug_loc)
                    command.message('[Skill Prediction] Location debug deactivated')
                else
                    command.message('[Skill Prediction] Location debug activated')

                config.debug_loc = !config.debug_loc
                break
            case 'debugabnorm':
                if (config.debug_abnormals)
                    command.message('[Skill Prediction] Abnormals debug deactivated')
                else
                    command.message('[Skill Prediction] Abnormals debug activated')

                config.debug_abnormals = !config.debug_abnormals
                abnormality.DEBUG = config.debug_abnormals
                break
            case 'strictdef':
                if (inCombat) {
                    command.message('[Skill Prediction] DEFEND_SUCCESS_STRICT can be changed only out of combat')
                }
                else {
                    if (config.defend_success_strict)
                        command.message('[Skill Prediction] DEFEND_SUCCESS_STRICT deactivated')
                    else
                        command.message('[Skill Prediction] DEFEND_SUCCESS_STRICT activated')

                    config.defend_success_strict = !config.defend_success_strict
                }
                break
            case 'mount':
                if (config.mount_check)
                    command.message('[Skill Prediction] Mount detection deactivated')
                else
                    command.message('[Skill Prediction] Mount detection activated')

                config.mount_check = !config.mount_check
                break
            case 'save':
                SaveConfiguration()
                break
            case 'off':
                if (!currentAction && !serverAction && !mounted && alive && !inCombat && !sending && config.enabled) {
                    disable()
                    command.message('[Skill Prediction] Deactivated')
                    config.enabled = !config.enabled
                }
                else {
                    command.message('[Skill Prediction] OwO!')
                }
                break
            case 'on':
                if (!currentAction && !serverAction && !mounted && alive && !inCombat && !sending && !config.enabled) {
                    enable()
                    command.message('[Skill Prediction] Activated')
                    config.enabled = !config.enabled
                }
                else {
                    command.message('[Skill Prediction] No,no,no!')
                }
                break
            case 'ping':
                command.message(`Ping: Min=${ping.min} Max=${ping.max} Jitter=${ping.max - ping.min}`)
                break
            case 'clearskills':
                if (!currentAction && !serverAction && !mounted && alive && !inCombat && !sending) {
                    skillsCache = {}
                    command.message('[Skill Prediction] Cache cleared')

                }
                else {
                    command.message('[Skill Prediction] OwO!')
                }
                break
        }
    })


    dispatch.hook('S_LOGIN', 1, event => {
        skillsCache = {}
        ;({cid, model} = event)
        race = Math.floor((model - 10101) / 100)
        job = (model - 10101) % 100
        if (config.debug) debug('Class ' + job)

        /*		let timeoutData = get(timeouts, 'timeouts', job) || get(timeouts, 'timeouts', '*')
                if(timeoutData)	{
                    classBasedServerTimeout = timeoutData
                    if(config..DEBUG) console.log('[Skill Prediction] Class based server timeout:', timeoutData)
                }
                else{
                    classBasedServerTimeout = 200 //failover
                    if(config..DEBUG) console.log('[Skill Prediction] Class based server timeout (failover!):', classBasedServerTimeout)
                }
        */
        hookInventory()
    })

    dispatch.hook('S_LOAD_TOPO', 1, event => {
        vehicleEx = null
        mounted = false

        currentAction = null
        serverAction = null
        lastEndSkill = 0
        lastEndType = 0
        lastEndedId = 0
        clearStage()
    })

    dispatch.hook('S_PLAYER_STAT_UPDATE', 7, event => {
        // Newer classes use a different speed algorithm
        aspd = (event.attackSpeed + event.attackSpeedBonus) / (job >= 8 ? 100 : event.attackSpeed)
        currentStamina = event.stamina
    })


    dispatch.hook('S_CREST_INFO', 1, event => {
        currentGlyphs = {}

        for (let glyph of event.glyphs)
            currentGlyphs[glyph.id] = glyph.enabled
    })

    dispatch.hook('S_CREST_APPLY', 1, event => {
        if (config.debug_glyphs) console.log('Glyph', event.id, event.enabled)

        currentGlyphs[event.id] = event.enabled
    })

    dispatch.hook('S_PLAYER_CHANGE_STAMINA', 1, event => {
        currentStamina = event.current
    })

    dispatch.hook('S_SPAWN_ME', 1, event => {
        alive = event.alive
    })

    dispatch.hook('S_CREATURE_LIFE', 1, event => {
        if (isMe(event.target)) {
            alive = event.alive

            if (!alive) {
                clearStage()
                oopsLocation = currentAction = serverAction = null
            }
        }
    })

    dispatch.hook('S_USER_STATUS', 1, event => {
        if (event.target.equals(cid)) {
            inCombat = event.status == 1

            if (!inCombat) hookInventory()
            else if (!inventory && inventoryHook) {
                dispatch.unhook(inventoryHook)
                inventoryHook = null
            }
        }
    })

    function hookInventory() {
        if (!inventoryHook) inventoryHook = dispatch.hook('S_INVEN', 5, event => {
            inventory = event.first ? event.items : inventory.concat(event.items)

            if (!event.more) {
                equippedWeapon = false

                for (let item of inventory)
                    if (item.slot == 1) {
                        equippedWeapon = true
                        break
                    }

                staminaModifier = 0
                //Body WP roll check for gunner, only inventory parse :( So weird
                if (job == 9 && config.wp_roll_control) {
                    for (var item of inventory) {
                        if (item.slot == 3) {
                            for (var set of item.passivitySets) {
                                if (set.index != item.passivitySet)
                                    continue
                                for (var id of set.passivities) {
                                    if (id.dbid == 350905) {
                                        if (config.debug) debug('[Skill Prediction (INVEN)] ID 350905 rolled')
                                        staminaModifier = -5
                                    }
                                }

                            }
                            break
                        }
                    }
                }

                inventory = null

                if (inCombat) {
                    dispatch.unhook(inventoryHook)
                    inventoryHook = null
                }
            }
        })
    }

    dispatch.hook('S_PARTY_MEMBER_LIST', 1, (event) => {
        partyMembers = []

        for (let member of event.members)
            if (!member.cID.equals(cid))
                partyMembers.push(member.cID)
    })

    dispatch.hook('S_LEAVE_PARTY', () => {
        partyMembers = null
    })

    dispatch.hook('S_MOUNT_VEHICLE_EX', 1, event => {
        if (cid.equals(event.target)) vehicleEx = event.vehicle
    })

    dispatch.hook('S_UNMOUNT_VEHICLE_EX', 1, event => {
        if (cid.equals(event.target)) vehicleEx = null
    })

    dispatch.hook('S_MOUNT_VEHICLE', 1, event => {
        if (cid.equals(event.target)) {
            mounted = true
            if (config.debug) debug('[Skill Prediction] Your character mounted')
        }
    })

    dispatch.hook('S_UNMOUNT_VEHICLE', 1, event => {
        if (cid.equals(event.target)) {
            mounted = false
            if (config.debug) debug('[Skill Prediction] Your character unmounted')
        }
    })

    function cPlayerLocationHandler(event) {
        if (config.debug_loc) console.log('Location %d %d (%d %d %d %d) > (%d %d %d)', event.type, event.speed, Math.round(event.x1), Math.round(event.y1), Math.round(event.z1), event.w, Math.round(event.x2), Math.round(event.y2), Math.round(event.z2))

        if (currentAction) {
            let info = skillInfo(currentAction.skill)

            if (info && info.distance) return false
        }

        currentLocation = {
// This is not correct, but the midpoint location seems to be "close enough" for the client to not teleport the player
            x: (event.x1 + event.x2) / 2,
            y: (event.y1 + event.y2) / 2,
            z: (event.z1 + event.z2) / 2,
            w: event.w
        }
    }


    function notifyLocation(type, version, event) {
        if (config.debug_loc) console.log('-> %s %s %d (%d %d %d %d)', type, skillId(event.skill), event.stage, Math.round(event.x), Math.round(event.y), Math.round(event.z), event.w)

        currentLocation = {
            x: event.x,
            y: event.y,
            z: event.z,
            w: event.w,
            inAction: true
        }

        let info = skillInfo(event.skill)
        // The server rejects and logs packets with an incorrect skill, so if a skill has multiple possible IDs then we wait for a response
        if (info && (info.chains || info.hasChains))
            if (serverConfirmedAction) {
                if (!serverAction) return false
                else if (event.skill !== serverAction.skill) {
                    event.skill = serverAction.skill
                    return true
                }
            }
            else {
                queuedNotifyLocation.push([type, version, event])
                return false
            }
    }

    function dequeueNotifyLocation(skill) {
        if (queuedNotifyLocation.length) {
            if (skill)
                for (let [type, version, event] of queuedNotifyLocation) {
                    event.skill = skill
                    dispatch.toServer(type, version, event)
                }

            queuedNotifyLocation = []
        }
    }


    function startSkill(type, version, code, data) {
        if (sending) return

        let event = protocol.parse(dispatch.base.protocolVersion, type, version, data = Buffer.from(data)),
            info = skillInfo(event.skill),
            delay = 0

        if (delayNext && Date.now() <= stageEndTime) {
            delay = delayNext

            if (info && !info.noRetry && config.skill_retry_count) {
                delay -= config.skill_retry_jittercomp

                if (delay < 0) delay = 0
            }
        }

        if (config.debug) {
            let strs = ['->', type, skillId(event.skill)]

            if (type == 'C_START_SKILL') strs.push(...[event.unk ? 1 : 0, event.moving ? 1 : 0, event.continue ? 1 : 0])
            if (type == 'C_PRESS_SKILL') strs.push(event.start)
            else if (type == 'C_START_TARGETED_SKILL') {
                let tmp = []

                for (let e of event.targets) tmp.push([e.id.toString(), e.unk].join(' '))

                strs.push('[' + tmp.join(', ') + ']')
            }

            if (config.debug_loc) {
                strs.push(...[event.w + '\xb0', '(' + Math.round(event.x), Math.round(event.y), Math.round(event.z) + ')'])

                if (type == 'C_START_SKILL' || type == 'C_START_TARGETED_SKILL' || type == 'C_START_INSTANCE_SKILL_EX')
                    strs.push(...['>', '(' + Math.round(event.toX), Math.round(event.toY), Math.round(event.toZ) + ')'])
            }

            if (delay) strs.push('DELAY=' + delay)

            debug(strs.join(' '))
        }

        clearTimeout(delayNextTimeout)

        if (delay) {
            delayNextTimeout = setTimeout(handleStartSkill, delay, type, event, info, data, true)
            return false
        }

        return handleStartSkill(type, event, info, data)
    }

    function handleStartSkill(type, event, info, data, send) {
        serverConfirmedAction = false
        dequeueNotifyLocation()
        delayNext = 0

        let specialLoc = type == 'C_START_SKILL' || type == 'C_START_TARGETED_SKILL' || type == 'C_START_INSTANCE_SKILL_EX'

        if (!info) {
            if (type != 'C_PRESS_SKILL' || event.start)
            // Sometimes invalid (if this skill can't be used, but we have no way of knowing that)
                if (type != 'C_NOTIMELINE_SKILL') updateLocation(event, false, specialLoc)

            if (send) toServerLocked(data)
            return
        }

        let skill = event.skill,
            skillBase = Math.floor((skill - 0x4000000) / 10000),
            interruptType = 0

        if (mounted && config.mount_check) {
            sendCannotStartSkill(event.skill)
            //sendSystemMessage('SMT_CANT_SKILL_USER_CONDITION')
            return false
        }

        if (!alive || abnormality.inMap(silence)) {
            sendCannotStartSkill(event.skill)
            return false
        }

        if (!equippedWeapon) {
            sendCannotStartSkill(event.skill)
            sendSystemMessage('SMT_BATTLE_SKILL_NEED_WEAPON')
            return false
        }
		
		if(info.canVB) VBtimer = setTimeout(enableVB, 300);	// you need a delay before chaining into VB
		
		if(type == 'C_PRESS_SKILL' && event.start && canVB && job == 3 && skillBase == 15){
			return false;
		}

        if (type == 'C_PRESS_SKILL' && !event.start  && !(canVB && (job == 3 && skillBase == 15) ) ) {
            if (currentAction && currentAction.skill == skill) {
                if (info.type == 'hold' || info.type == 'holdInfinite') {
                    updateLocation(event)

                    if (info.chainOnRelease) {
                        sendActionEnd(11)

                        info = skillInfo(skill = modifyChain(skill, info.chainOnRelease))
                        if (!info) {
                            if (send) toServerLocked(data)
                            return
                        }

                        startAction({
                            skill,
                            info,
                            stage: 0,
                            speed: info.fixedSpeed || aspd * (info.speed || 1)
                        })
                    }
                    else if (info.length) {
                        let length = lastStartTime + info.length - Date.now()
                        if (length > 0) {
                            stageEnd = sendActionEnd.bind(null, 51, info.distance)
                            stageEndTime = Date.now() + length
                            stageEndTimeout = setTimeout(stageEnd, length)
                        }
                        else sendActionEnd(51)
                    }
                    else sendActionEnd(10)
                }
                else if (info.type == 'charging') grantCharge(skill, info, currentAction.stage)
            }
            else if (info.type == 'grantCharge') grantCharge(skill, info, storedCharge)

            if (send) toServerLocked(data)
            return
        }

        if (currentAction) {
            if (currentAction.skill & Flags.CC && (currentAction.skill & 0xffffff !== model * 100 + 2 || info.type !== 'retaliate')) {
                sendCannotStartSkill(event.skill)
                return false
            }
            let currentSkill = currentAction.skill - 0x4000000,
                currentSkillBase = Math.floor(currentSkill / 10000),
                currentSkillSub = currentSkill % 100


            if (currentSkillBase == 6190) {
                if (currentAction.skill != 20800 && (!abnormality.exists(9691000) || !abnormality.exists(9691016))) {
                    sendCannotStartSkill(event.skill)
                    return false
                }
            }

            // Some skills are bugged clientside and can interrupt the wrong skills, so they need to be flagged manually
            if (info.noInterrupt && (info.noInterrupt.includes(currentSkillBase) || info.noInterrupt.includes(currentSkillBase + '-' + currentSkillSub))) {
                let canInterrupt = false

                if (info.interruptibleWithAbnormal)
                    for (let abnormal in info.interruptibleWithAbnormal)
                        if (abnormality.exists(abnormal) && currentSkillBase == info.interruptibleWithAbnormal[abnormal])
                            canInterrupt = true

                if (!canInterrupt) {
                    sendCannotStartSkill(event.skill)
                    return false
                }
            }

            let chain = get(info, 'chains', currentSkillBase + '-' + currentSkillSub) || get(info, 'chains', currentSkillBase)

            if (chain !== undefined) {
                if (chain === null) {
                    updateLocation(event, false, specialLoc)
                    sendActionEnd(4)
                    if (send) toServerLocked(data)
                    return
                }

                skill = modifyChain(skill, chain)
                interruptType = INTERRUPT_TYPES[info.type] || 4
            }
            else interruptType = INTERRUPT_TYPES[info.type] || 6

            if (info.type == 'storeCharge') storedCharge = currentAction.stage
        }

        if (info.onlyDefenceSuccess)
            if (currentAction && currentAction.defendSuccess) interruptType = 3
            else {
                sendCannotStartSkill(event.skill)
                sendSystemMessage('SMT_SKILL_ONLY_DEFENCE_SUCCESS')
                return false
            }

        if (info.onlyTarget && event.targets[0].id.equals(0)) {
            sendCannotStartSkill(event.skill)
            return false
        }

        // Skill override (chain)
        if (skill != event.skill) {
            info = skillInfo(skill)
            if (!info) {
                if (type != 'C_NOTIMELINE_SKILL') updateLocation(event, false, specialLoc)

                if (send) toServerLocked(data)
                return
            }
        }

        // TODO: System Message
        if (info.requiredBuff) {
            if (Array.isArray(info.requiredBuff)) {
                let found = false

                for (let buff of info.requiredBuff)
                    if (abnormality.exists(buff)) {
                        found = true
                        break
                    }

                if (!found) {
                    sendCannotStartSkill(event.skill)
                    return false
                }
            }
            else if (!abnormality.exists(info.requiredBuff)) {
                sendCannotStartSkill(event.skill)
                return false
            }
        }

        if (info.blockedByBuff) {
            if (Array.isArray(info.blockedByBuff)) {
                let found = false
                for (let buff of info.blockedByBuff)
                    if (abnormality.exists(buff)) {
                        found = true
                        break
                    }
                if (found) {
                    sendCannotStartSkill(event.skill)
                    return false
                }
            }
            else if (abnormality.exists(info.blockedByBuff)) {
                sendCannotStartSkill(event.skill)
                return false
            }
        }

        if (type != 'C_NOTIMELINE_SKILL') updateLocation(event, false, specialLoc)
        lastStartLocation = currentLocation

        let abnormalSpeed = 1,
            chargeSpeed = 0,
            distanceMult = 1

        if (info.abnormals)
            for (let id in info.abnormals)
                if (abnormality.exists(id)) {
                    let abnormal = info.abnormals[id]

                    if (abnormal.speed) abnormalSpeed *= abnormal.speed
                    if (abnormal.chargeSpeed) chargeSpeed += abnormal.chargeSpeed
                    if (abnormal.chain) skill = modifyChain(skill, abnormal.chain)
                    if (abnormal.skill) skill = 0x4000000 + abnormal.skill
                }

        // Skill override (abnormal)
        if (skill != event.skill) {
            info = skillInfo(skill)
            if (!info) {
                if (send) toServerLocked(data)
                return
            }
        }

        if (interruptType) event.continue ? clearStage() : sendActionEnd(interruptType)

        // Finish calculations and send the final skill
        let speed = info.fixedSpeed || aspd * (info.speed || 1) * abnormalSpeed,
            movement = null,
            stamina = info.stamina + staminaModifier

        if (info.glyphs)
            for (let id in info.glyphs)
                if (currentGlyphs[id]) {
                    let glyph = info.glyphs[id]

                    if (glyph.speed) speed *= glyph.speed
                    if (glyph.chargeSpeed) chargeSpeed += glyph.chargeSpeed
                    if (glyph.movement) movement = glyph.movement
                    if (glyph.distance) distanceMult *= glyph.distance
                    if (glyph.stamina) stamina += glyph.stamina
                }

        if (stamina) {
            if (currentStamina < stamina) {
                sendCannotStartSkill(event.skill)
                //dispatch.toClient('S_SYSTEM_MESSAGE', 1, { message: '@' + sysmsg.map.name['SMT_BATTLE_SKILL_FAIL_LOW_STAMINA'] })
                return false
            }

            if (info.instantStamina) currentStamina -= stamina
        }

        startAction({
            skill,
            info,
            stage: 0,
            speed,
            chargeSpeed,
            movement,
            moving: type == 'C_START_SKILL' && event.moving == 1,
            distanceMult,
            targetLoc: specialLoc ? {
                x: event.toX,
                y: event.toY,
                z: event.toZ
            } : null
        })

        if (send) toServerLocked(data)

        // Normally the user can press the skill button again if it doesn't go off
        // However, once the animation starts this is no longer possible, so instead we simulate retrying each skill
        if (!info.noRetry)
            retry(() => {
                if ((config.skill_retry_always && type != 'C_PRESS_SKILL') || currentAction && currentAction.skill == skill && !serverConfirmedAction) return toServerLocked(data)
                return false
            })
    }

    function toServerLocked(...args) {
        sending = true
        let success = dispatch.toServer(...args)
        sending = false

        return success
    }

    function cCancelSkillHandler(event) {
        if (config.debug) debug(['-> C_CANCEL_SKILL', skillId(event.skill), event.type].join(' '))

        if (currentAction) {
            let info = skillInfo(currentAction.skill) // event.skill can be wrong, so use the known current skill instead
            if (info && info.type == 'lockon') sendActionEnd(event.type)
            if (info && info.blockCancelPacket) {
                if (config.debug) debug('[Skill Prediction] C_CANCEL_SKILL was dropped')
                return false
            }
        }
    }


    function sActionStageHandler(event) {
        if (isMe(event.source)) {
            if (config.debug) {
                let duration = Date.now() - debugActionTime,
                    strs = [skillInfo(event.skill) ? '<X' : '<-', 'S_ACTION_STAGE', skillId(event.skill), event.stage, (Math.round(event.speed * 1000) / 1000) + 'x']

                if (config.debug_loc) strs.push(...[event.w + '\xb0', '(' + Math.round(event.x), Math.round(event.y), Math.round(event.z) + ')'])

                strs.push(...[event.unk, event.unk1, event.toX, event.toY, event.toZ, event.unk2, event.unk3])

                if (serverAction)
                    strs.push(...[
                        (Math.round(calcDistance(serverAction, event) * 1000) / 1000) + 'u',
                        duration + 'ms',
                        '(' + Math.round(duration * serverAction.speed) + 'ms)'
                    ])

                if (event.movement.length) {
                    let movement = []

                    for (let e of event.movement)
                        movement.push(e.duration + ' ' + e.speed + ' ' + e.unk + ' ' + e.distance)

                    strs.push('(' + movement.join(', ') + ')')
                }

                debug(strs.join(' '))
                debugActionTime = Date.now()
            }

            let info = skillInfo(event.skill)
            if (info) {
                if (currentAction && (event.skill == currentAction.skill || Math.floor((event.skill - 0x4000000) / 10000) == Math.floor((currentAction.skill - 0x4000000) / 10000)) && event.stage == currentAction.stage) {
                    clearTimeout(serverTimeout)
                    serverConfirmedAction = true
                    dequeueNotifyLocation(event.skill)

                    if (config.jitter_compensation && event.stage == 0) {
                        let delay = Date.now() - lastStartTime - ping.min

                        if (delay > 0 && delay < 1000) {
                            delayNext = delay

                            if (stageEnd) {
                                stageEndTime += delay
                                refreshStageEnd()
                            }
                        }
                    }
                }

                if (info.forceClip && event.movement.length) {
                    let distance = 0
                    for (let m of event.movement) distance += m.distance

                    if (info.distance < 0) distance = -distance

                    oopsLocation = applyDistance(lastStartLocation, distance)

                    if (!currentAction || currentAction.skill != event.skill) sendInstantMove(oopsLocation)
                }

                // If the server sends 2 S_ACTION_STAGE in a row without a S_ACTION_END between them and the last one is an emulated skill,
                // this stops your character from being stuck in the first animation (although slight desync will occur)
                if (serverAction && serverAction == currentAction && !skillInfo(currentAction.skill)) sendActionEnd(6)

                serverAction = event
                return false
            }

            serverAction = event

            if (event.id == lastEndedId) return false

            if (currentAction && skillInfo(currentAction.skill)) sendActionEnd(lastEndSkill == currentAction.skill ? lastEndType || 6 : 6)

            currentAction = event
            updateLocation()
        }
    }


    function sGrantSkillHandler(event) {
        if (config.debug) debug(['<- S_GRANT_SKILL', skillId(event.skill)].join(' '))

        if (skillInfo(modifyChain(event.skill, 0))) return false
    }


    function sInstantDashHandler(event) {
        if (isMe(event.source)) {
            if (config.debug) {
                let duration = Date.now() - debugActionTime,
                    strs = [(serverAction && skillInfo(serverAction.skill)) ? '<X' : '<-', 'S_INSTANT_DASH', event.unk1, event.unk2, event.unk3]

                if (config.debug_loc) strs.push(...[event.w + '\xb0', '(' + Math.round(event.x), Math.round(event.y), Math.round(event.z) + ')'])

                strs.push(...[
                    (Math.round(calcDistance(serverAction, event) * 1000) / 1000) + 'u',
                    duration + 'ms',
                    '(' + Math.round(duration * serverAction.speed) + 'ms)'
                ])

                debug(strs.join(' '))
            }

            if (serverAction && skillInfo(serverAction.skill)) return false
        }
    }


    function sInstantMoveHandler(event) {
        if (isMe(event.id)) {
            if (config.debug) {
                let info = serverAction && skillInfo(serverAction.skill),
                    duration = Date.now() - debugActionTime,
                    strs = ['<- S_INSTANT_MOVE']

                if (config.debug_loc) strs.push(...[event.w + '\xb0', '(' + Math.round(event.x), Math.round(event.y), Math.round(event.z) + ')'])

                strs.push(...[
                    (Math.round(Math.sqrt(Math.pow(event.x - serverAction.x, 2) + Math.pow(event.y - serverAction.y, 2)) * 1000) / 1000) + 'u',
                    duration + 'ms',
                    '(' + Math.round(duration * serverAction.speed) + 'ms)'
                ])

                debug(strs.join(' '))
            }

            currentLocation = {
                x: event.x,
                y: event.y,
                z: event.z,
                w: event.w,
                inAction: true
            }

            let info = serverAction && skillInfo(serverAction.skill)

            if (info && info.type == 'teleport' && currentAction && currentAction.skill != serverAction.skill)
                oopsLocation = currentLocation
        }
    }


    function sActionEndHandler(event) {
        if (isMe(event.source)) {
            if (config.debug) {
                let duration = Date.now() - debugActionTime,
                    strs = [(event.id == lastEndedId || skillInfo(event.skill)) ? '<X' : '<-', 'S_ACTION_END', skillId(event.skill), event.type]

                if (config.debug_loc) strs.push(...[event.w + '\xb0', '(' + Math.round(event.x), Math.round(event.y), Math.round(event.z) + ')'])

                if (serverAction)
                    strs.push(...[
                        (Math.round(Math.sqrt(Math.pow(event.x - serverAction.x, 2) + Math.pow(event.y - serverAction.y, 2)) * 1000) / 1000) + 'u',
                        duration + 'ms',
                        '(' + Math.round(duration * serverAction.speed) + 'ms)'
                    ])
                else strs.push('???')

                debug(strs.join(' '))
            }

            serverAction = null
            lastEndSkill = event.skill
            lastEndType = event.type

            if (event.id == lastEndedId) {
                lastEndedId = 0
                return false
            }

            let info = skillInfo(event.skill)
            if (info) {
                if (info.type == 'dash')
                // If the skill ends early then there should be no significant error
                    if (currentAction && event.skill == currentAction.skill) {
                        currentLocation = {
                            x: event.x,
                            y: event.y,
                            z: event.z,
                            w: event.w
                        }
                        sendActionEnd(event.type)
                    }
                    // Worst case scenario, teleport the player back if the error was large enough for the client to act on it
                    else if (!lastEndLocation || Math.round(lastEndLocation.x / 100) != Math.round(event.x / 100) || Math.round(lastEndLocation.y / 100) != Math.round(event.y / 100) || Math.round(lastEndLocation.z / 100) != Math.round(event.z / 100))
                        sendInstantMove({
                            x: event.x,
                            y: event.y,
                            z: event.z,
                            w: event.w
                        })

                // Skills that may only be cancelled during part of the animation are hard to emulate, so we use server response instead
                // This may cause bugs with very high ping and casting the same skill multiple times
                if (currentAction && event.skill == currentAction.skill && [2, 13, 25, 29, 37, 43].includes(event.type))
                    sendActionEnd(event.type)

                return false
            }

            if (!currentAction)
                debug('[Skill Prediction] S_ACTION_END: currentAction is null', skillId(event.skill), event.id)
            else if (event.skill != currentAction.skill)
                debug('[Skill Prediction] S_ACTION_END: skill mismatch', skillId(currentAction.skill), skillId(event.skill), currentAction.id, event.id)

            currentAction = null
        }
    }

    dispatch.hook('S_EACH_SKILL_RESULT', 4, event => {
        if (isMe(event.target) && event.setTargetAction) {
            if (config.debug) {
                let duration = Date.now() - debugActionTime,
                    strs = ['<- S_EACH_SKILL_RESULT.setTargetAction', skillId(event.targetAction), event.targetStage]

                if (config.debug_loc) strs.push(...[event.targetW + '\xb0', '(' + Math.round(event.targetX), Math.round(event.targetY), Math.round(event.targetZ) + ')'])

                debug(strs.join(' '))
            }

            if (currentAction && skillInfo(currentAction.skill)) sendActionEnd(9)

            currentAction = serverAction = {
                x: event.targetX,
                y: event.targetY,
                z: event.targetZ,
                w: event.targetW,
                skill: event.targetAction,
                stage: event.targetStage,
                id: event.targetId
            }

            updateLocation()
        }
    })


    function sDefendSuccessHandler(event) {
        if (isMe(event.cid))
            if (currentAction && currentAction.skill == serverAction.skill) currentAction.defendSuccess = true
            else if (config.defend_success_strict || job != 10) return false
    }


    function sCannotStartSkillHandler(event) {
        if (config.debug) debug('<- S_CANNOT_START_SKILL ' + skillId(event.skill, Flags.Player))

        if (skillInfo(event.skill, true)) {
            if (config.skill_delay_on_fail && config.skill_retry_count && currentAction && (!serverAction || currentAction.skill != serverAction.skill) && event.skill == currentAction.skill - 0x4000000)
                delayNext += config.skill_retry_ms

            return false
        }
    }

    function cCanLockonTargetHandler(event) {
        let info = skillInfo(event.skill)
        if (info) {
            let ok = true

            if (info.partyOnly) {
                ok = false

                if (partyMembers)
                    for (let member of partyMembers)
                        if (member.equals(event.target)) {
                            ok = true
                            break
                        }
            }

            dispatch.toClient('S_CAN_LOCKON_TARGET', Object.assign({ok}, event))
        }
    }


    function sCanLockonTarget(event) {
        return skillInfo(event.skill) ? false : undefined;
    }

    function startAction(opts) {
        let info = opts.info

        if (info.consumeAbnormal)
            if (Array.isArray(info.consumeAbnormal))
                for (let id of info.consumeAbnormal)
                    abnormality.remove(id)
            else
                abnormality.remove(info.consumeAbnormal)

        sendActionStage(opts)

        if (info.type == 'dash') sendInstantDash(opts.targetLoc)

        if (info.triggerAbnormal)
            for (let id in info.triggerAbnormal) {
                let abnormal = info.triggerAbnormal[id]

                if (Array.isArray(abnormal))
                    abnormality.add(id, abnormal[0], abnormal[1])
                else
                    abnormality.add(id, abnormal, 1)
            }

        lastStartTime = Date.now()
    }

    function sendActionStage(opts) {
        clearTimeout(serverTimeout)
        opts.stage = opts.stage || 0
        opts.distanceMult = opts.distanceMult || 1

        let info = opts.info,
            multiStage = Array.isArray(info.length),
            movement = opts.movement

        movePlayer(opts.distance * opts.distanceMult)

        if (multiStage)
            movement = movement && movement[opts.stage] || !opts.moving && get(info, 'inPlace', 'movement', opts.stage) || get(info, 'movement', opts.stage) || []
        else
            movement = movement || !opts.moving && get(info, 'inPlace', 'movement') || info.movement || []

        dispatch.toClient('S_ACTION_STAGE', 1, currentAction = {
            source: myChar(),
            x: currentLocation.x,
            y: currentLocation.y,
            z: currentLocation.z,
            w: currentLocation.w,
            model,
            skill: opts.skill,
            stage: opts.stage,
            speed: info.type == 'charging' ? 1 : opts.speed,
            id: actionNumber,
            unk: 1,
            unk1: 0,
            toX: 0,
            toY: 0,
            toZ: 0,
            unk2: 0,
            unk3: 0,
            movement
        })

        opts.distance = (multiStage ? get(info, 'distance', opts.stage) : info.distance) || 0
        stageEnd = null

        let speed = opts.speed + (info.type == 'charging' ? opts.chargeSpeed : 0),
            noTimeout = false

        if (serverAction && (serverAction.skill == currentAction.skill || Math.floor((serverAction.skill - 0x4000000) / 10000) == Math.floor((currentAction.skill - 0x4000000) / 10000)) && serverAction.stage == currentAction.stage)
            noTimeout = true

        switch (info.type) {
            /*           case 'dynamicDistance':
                           opts.distance = calcDistance(currentLocation, opts.targetLoc)
                           break*/
            case 'teleport':
                if (opts.stage != info.teleportStage) break

                opts.distance = Math.min(opts.distance, Math.max(0, calcDistance(currentLocation, opts.targetLoc) - 15)) // Client is approx. 15 units off
                sendInstantMove(Object.assign(applyDistance(currentLocation, opts.distance), {
                    z: opts.targetLoc.z,
                    w: currentLocation.w
                }))
                opts.distance = 0
                break
            case 'charging':
                if (opts.stage == 0 || opts.stage < info.length.length) break

                if (info.autoRelease !== undefined) {
                    stageEnd = () => {
                        toServerLocked('C_PRESS_SKILL', 1, {
                            skill: opts.skill,
                            start: false,
                            x: currentLocation.x,
                            y: currentLocation.y,
                            z: currentLocation.z,
                            w: currentLocation.w
                        })
                        grantCharge(opts.skill, info, opts.stage)
                    }

                    if (info.autoRelease === 0) {
                        stageEnd()
                        stageEnd = null
                    }
                    else stageEndTimeout = setTimeout(stageEnd, Math.round(info.autoRelease / speed))
                }

            case 'holdInfinite':
                if (!noTimeout) serverTimeout = setTimeout(sendActionEnd, getServerTimeout(), 6)
                return
        }

        let length = Math.round((multiStage ? info.length[opts.stage] : info.length) / speed)

        if (!noTimeout) {
            let serverTimeoutTime = getServerTimeout()
            if (length > serverTimeoutTime) serverTimeout = setTimeout(sendActionEnd, serverTimeoutTime, 6)
        }

        if (multiStage) {
            if (!opts.moving) {
                let inPlaceDistance = get(info, 'inPlace', 'distance', opts.stage)

                if (inPlaceDistance !== undefined) opts.distance = inPlaceDistance
            }

            if (opts.stage + 1 < info.length.length) {
                opts.stage += 1
                stageEnd = sendActionStage.bind(null, opts)
                stageEndTime = Date.now() + length
                stageEndTimeout = setTimeout(stageEnd, length)
                return
            }
        }
        else if (!opts.moving) {
            let inPlaceDistance = get(info, 'inPlace', 'distance')

            if (inPlaceDistance !== undefined) opts.distance = inPlaceDistance
        }

        if (info.type == 'dash' && opts.distance) {
            let distance = calcDistance(lastStartLocation, opts.targetLoc)

            if (distance < opts.distance) {
                length *= distance / opts.distance
                opts.distance = distance
            }
        }

        if (info.type == 'charging') {
            opts.stage += 1
            stageEnd = sendActionStage.bind(null, opts)
            stageEndTime = Date.now() + length
            stageEndTimeout = setTimeout(stageEnd, length)
            return
        }

        stageEnd = sendActionEnd.bind(null, info.type == 'dash' ? 39 : 0, opts.distance * opts.distanceMult)
        stageEndTime = Date.now() + length
        stageEndTimeout = setTimeout(stageEnd, length)
    }

    function getServerTimeout() {
        return ping.max + (config.skill_retry_count * config.skill_retry_ms) + config.server_timeout
    }

    function clearStage() {
        clearTimeout(serverTimeout)
        clearTimeout(stageEndTimeout)
    }

    function refreshStageEnd() {
        clearTimeout(stageEndTimeout)
        stageEndTimeout = setTimeout(stageEnd, stageEndTime - Date.now())
    }

    function grantCharge(skill, info, stage) {
        let levels = info.chargeLevels
        dispatch.toClient('S_GRANT_SKILL', 1, {skill: modifyChain(skill, levels ? levels[stage] : 10 + stage)})
    }

    function sendInstantDash(location) {
        dispatch.toClient('S_INSTANT_DASH', 1, {
            source: myChar(),
            unk1: 0,
            unk2: 0,
            unk3: 0,
            x: location.x,
            y: location.y,
            z: location.z,
            w: currentLocation.w
        })
    }

    function sendInstantMove(location) {
        if (location) currentLocation = location

        dispatch.toClient('S_INSTANT_MOVE', 1, {
            id: myChar(),
            x: currentLocation.x,
            y: currentLocation.y,
            z: currentLocation.z,
            w: currentLocation.w
        })
    }

    function sendActionEnd(type, distance) {
        clearStage()

        if (!currentAction) return

        if (config.debug) debug(['<* S_ACTION_END', skillId(currentAction.skill), type || 0, currentLocation.w + '\xb0', (distance || 0) + 'u'].join(' '))

        if (oopsLocation && (config.force_clip_strict || !currentLocation.inAction)) sendInstantMove(oopsLocation)
        else movePlayer(distance)
	
		if(canVB){
			clearTimeout(VBtimer);
			canVB = false;
			if(DEBUG) console.log('Chained VB disabled');
		}

        dispatch.toClient('S_ACTION_END', 1, {
            source: myChar(),
            x: currentLocation.x,
            y: currentLocation.y,
            z: currentLocation.z,
            w: currentLocation.w,
            model,
            skill: currentAction.skill,
            type: type || 0,
            id: currentAction.id
        })

        if (currentAction.id == actionNumber) {
            let info = skillInfo(currentAction.skill)
            if (info) {
                if (info.consumeAbnormalEnd)
                    if (Array.isArray(info.consumeAbnormalEnd))
                        for (let id of info.consumeAbnormalEnd)
                            abnormality.remove(id)
                    else
                        abnormality.remove(info.consumeAbnormalEnd)

                if (info.type == 'dash') lastEndLocation = currentLocation
            }
        }
        else lastEndedId = currentAction.id

        actionNumber++
        if (actionNumber > 0xffffffff) actionNumber = 0x80000000

        oopsLocation = currentAction = null

    }

    function sendCannotStartSkill(skill) {
        dispatch.toClient('S_CANNOT_START_SKILL', 1, {skill})
    }

    function sendSystemMessage(type, vars) {
        let message = '@' + sysmsg.maps.get(dispatch.base.protocolVersion).name.get(type)

        for (let key in vars)
            message += '\x0b' + key + '\x0b' + vars[key]

        dispatch.toClient('S_SYSTEM_MESSAGE', 1, {message})
    }

    function updateLocation(event, inAction, special) {
        event = event || currentAction

        currentLocation = special ? {
            x: event.x,
            y: event.y,
            z: event.z,
            w: event.w || currentLocation.w, // Should be a skill flag maybe?
            inAction
        } : {
            x: event.x,
            y: event.y,
            z: event.z,
            w: event.w,
            inAction
        }
    }

    function retry(cb, count = 1) {
        if (count > config.skill_retry_count) return

        setTimeout(() => {
            if (cb()) retry(cb, count + 1)
        }, config.skill_retry_ms)
    }

    // The real server uses loaded maps and a physics engine for skill movement, which would be costly to simulate
    // However the client avoids teleporting the player if the sent position is close enough, so we can simply approximate it instead
    function movePlayer(distance) {
        if (distance && !currentLocation.inAction) applyDistance(currentLocation, distance)
    }

    function calcDistance(loc1, loc2) {
        return Math.sqrt(Math.pow(loc2.x - loc1.x, 2) + Math.pow(loc2.y - loc1.y, 2))
    }

    function applyDistance(loc, distance) {
        let r = (loc.w / 0x8000) * Math.PI

        loc.x += Math.cos(r) * distance
        loc.y += Math.sin(r) * distance
        return loc
    }

    // Modifies the chain part (last 2 digits) of a skill ID, preserving flags
	function modifyChain(id, chain) {
		return id - ((id & 0x3ffffff) % 100) + chain
	}

	function skillId(id, flagAs) {
		id |= flagAs

		let skillFlags = ['P', 'C', '[?3]', '[?4]', '[?5]', '[?6]'],
			flags = ''

		for(let i = 0, x = id >>> 26; x; i++, x >>>= 1)
			if(x & 1) flags += skillFlags[i]

		id = (id & 0x3ffffff).toString()

		switch(flags) {
			case 'P':
				id = [id.slice(0, -4), id.slice(-4, -2), id.slice(-2)].join('-')
				break
			case 'C':
				id = [id.slice(0, -2), id.slice(-2)].join('-')
				break
		}

		return flags + id
	}

    //Load info about skill
    function skillInfo(id, local) {
        if (!local) id -= 0x4000000

        let cached = skillsCache[id]

        if (cached !== undefined) return cached

        let group = Math.floor(id / 10000),
            level = (Math.floor(id / 100) % 100) - 1,
            sub = id % 100,
            info = [ // Ordered by least specific < most specific
                get(skills, job, '*'),
                get(skills, job, '*', 'level', level),
                get(skills, job, '*', 'race', race),
                get(skills, job, '*', 'race', race, 'level', level),
                get(skills, job, group, '*'),
                get(skills, job, group, '*', 'level', level),
                get(skills, job, group, '*', 'race', race),
                get(skills, job, group, '*', 'race', race, 'level', level),
                get(skills, job, group, sub),
                get(skills, job, group, sub, 'level', level),
                get(skills, job, group, sub, 'race', race),
                get(skills, job, group, sub, 'race', race, 'level', level)
            ]

        // Note: Exact skill (group, sub) must be specified for prediction to be enabled. This helps to avoid breakage in future patches
        if (info[8]) {
            cached = skillsCache[id] = Object.assign({}, ...info)
            // Sanitize to reduce memory usage
            delete cached.race
            delete cached.level
            return cached
        }

        return skillsCache[id] = null
    }

    //Check cid
    function isMe(id) {
        return cid.equals(id) || vehicleEx && vehicleEx.equals(id)
    }

    //Get current cid for character
    function myChar() {
        return vehicleEx ? vehicleEx : cid
    }

    function get(obj, ...keys) {
        if (obj === undefined) return

        for (let key of keys)
            if ((obj = obj[key]) === undefined)
                return

        return obj
    }
	
	function enableVB(){
		canVB = true;
		clearTimeout(VBtimer);
		if(DEBUG) console.log('You can now use chained VB');
	}

    function debug(msg) {
        console.log('[%d] %s', ('0000' + (Date.now() % 10000)).substr(-4, 4), msg)
    }
}
