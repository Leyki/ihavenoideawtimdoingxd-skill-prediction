"use strict";

const { protocol } = require("tera-data-parser"),
	Ping = require("./ping"),
	Abnormies = require("./abnormalities"),
	{ Vec3, SkillID } = require("tera-data-parser").types,
	utils = require("./utils"),
	state = require("./state");

const INTERRUPT_TYPES = {
	"retaliate": 5,
	"lockonCast": 36
};

const PLAYER_ACTION = 1,
	PLAYER_REACTION = 2;

module.exports = function SkillPrediction(dispatch) {
	const ping = Ping(dispatch),
		abnormality = Abnormies(dispatch);

	//TODO: refactor this shit
	let sending = false,
		gameId = null,
		templateId = 0,
		skillsCache = null,
		race = -1,
		job = -1,
		vehicleEx = null,
		mounted = false,
		aspd = 1,
		currentGlyphs = null,
		currentStamina = 0,
		bodyRolls = [],
		blockedSkills = {},
		blacklistedSkills = {},
		lowStaminaSystemMessage = null,
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
		lastEndedTime = 0,
		serverTimeout = null,
		stageEnd = null,
		stageEndTime = 0,
		stageEndTimeout = null,
		debugActionTime = 0,
		packetsHooks = [],
		canChainVB = false,
		switchVB = false,
		attackSpeed = 0,
		attackSpeedBonus = 0,
		fixedPending = true;

	//SP state from start enabled/disabled(init)
	if (state.config.enabled)
		enable();

	state.on("stateChanged", (state) => {
		if (state) enable();
		else disable();
	});

	//Enable function (for all main packets)
	function enable() {

		try {
			addHook("S_DEFEND_SUCCESS", dispatch.base.majorPatchVersion >= 74 ? 3 : 2, sDefendSuccessHandler);
			addHook("S_CANNOT_START_SKILL", 1, sCannotStartSkillHandler);
			addHook("C_CAN_LOCKON_TARGET", dispatch.base.majorPatchVersion >= 74 ? 3 : 2, cCanLockonTargetHandler);
			addHook("S_CAN_LOCKON_TARGET", dispatch.base.majorPatchVersion >= 74 ? 3 : 2, sCanLockonTarget);
			addHook("C_PLAYER_LOCATION", 5, cPlayerLocationHandler);
			addHook("C_NOTIFY_LOCATION_IN_ACTION", dispatch.base.majorPatchVersion >= 74 ? 4 : 3, notifyLocation.bind(null, "C_NOTIFY_LOCATION_IN_ACTION", dispatch.base.majorPatchVersion >= 74 ? 4 : 3));
			addHook("C_NOTIFY_LOCATION_IN_DASH", dispatch.base.majorPatchVersion >= 74 ? 4 : 3, notifyLocation.bind(null, "C_NOTIFY_LOCATION_IN_DASH", dispatch.base.majorPatchVersion >= 74 ? 4 : 3));
			for (let packet of [
				["C_START_SKILL", dispatch.base.majorPatchVersion >= 74 ? 7 : 6],
				["C_START_TARGETED_SKILL", dispatch.base.majorPatchVersion >= 74 ? 6 : 5],
				["C_START_COMBO_INSTANT_SKILL", dispatch.base.majorPatchVersion >= 74 ? 4 : 3],
				["C_START_INSTANCE_SKILL", dispatch.base.majorPatchVersion >= 74 ? 5 : 4],
				["C_START_INSTANCE_SKILL_EX", dispatch.base.majorPatchVersion >= 74 ? 5 : 4],
				["C_PRESS_SKILL", dispatch.base.majorPatchVersion >= 74 ? 4 : 3],
				["C_NOTIMELINE_SKILL", dispatch.base.majorPatchVersion >= 74 ? 3 : 2]
			])
				addHook(packet[0], "raw", state.hookFake, startSkill.bind(null, ...packet));
			addHook("S_GRANT_SKILL", dispatch.base.majorPatchVersion >= 74 ? 3 : 2, sGrantSkillHandler);
			addHook("S_INSTANT_DASH", 3, sInstantDashHandler);
			addHook("S_INSTANT_MOVE", 3, sInstantMoveHandler);
			addHook("S_ACTION_END", dispatch.base.majorPatchVersion >= 74 ? 5 : 4, sActionEndHandler);
			addHook("C_CANCEL_SKILL", dispatch.base.majorPatchVersion >= 74 ? 3 : 2, cCancelSkillHandler);
			addHook("S_ACTION_STAGE", 8, sActionStageHandler);
			addHook("S_CREST_MESSAGE", 2, state.hookFake, sCrestMessageHandler);
			addHook("S_START_COOLTIME_SKILL", dispatch.base.majorPatchVersion >= 74 ? 3 : 2, cooldownFix);
			addHook("S_DECREASE_COOLTIME_SKILL", dispatch.base.majorPatchVersion >= 74 ? 3 : 2, cooldownFix);
			addHook("S_SYSTEM_MESSAGE", 1, smtCorrection);
		} catch (err) {
			utils.writeErrorMessage(`Critical error! Proxy client will be interrupted... ${err}`);
			process.exit();
		}
		abnormality.enabled = true;
	}

	//Disable function (for hooks in packetsHooks)
	function disable() {
		for (let pointer of packetsHooks) {
			dispatch.unhook(pointer);
		}
		packetsHooks = [];
		abnormality.enabled = false;
	}

	function addHook(...args) {
		packetsHooks.push(dispatch.hook(...args));
	}

	dispatch.hook("S_LOGIN", 10, event => {
		skillsCache = {};
		blacklistedSkills = {};
		({ gameId, templateId } = event);
		race = Math.floor((templateId - 10101) / 100);
		job = (templateId - 10101) % 100;
		if (state.config.debug) utils.writeDebugMessage(`Class: ${job}, race: ${race}`);
		LowStaminaSmtMessage();
		hookInventory();
	});

	dispatch.hook("S_LOAD_TOPO", "raw", () => {
		blockedSkills = {};
		vehicleEx = null;
		mounted = false;
		currentAction = null;
		serverAction = null;
		lastEndSkill = 0;
		lastEndType = 0;
		lastEndedId = 0;
		lastEndedTime = 0;
		sendActionEnd(37);
	});

	dispatch.hook("S_PLAYER_STAT_UPDATE", 9, event => {
		attackSpeed = event.attackSpeed;
		attackSpeedBonus = event.attackSpeedBonus;
		currentStamina = event.stamina;
		aspd = (attackSpeed + attackSpeedBonus) / (job >= 8 ? 100 : attackSpeed);
	});

	dispatch.hook("S_CREST_INFO", 2, event => {
		currentGlyphs = {};
		for (let crest of event.crests)
			currentGlyphs[crest.id] = crest.enable;
	});

	dispatch.hook("S_CREST_APPLY", 2, event => {
		if (state.config.debugGlyphs) utils.writeDebugMessage("Glyph", event.id, event.enable);
		currentGlyphs[event.id] = event.enable;
	});

	dispatch.hook("S_PLAYER_CHANGE_STAMINA", 1, event => {
		currentStamina = event.current;
	});

	dispatch.hook("S_SPAWN_ME", 3, event => {
		updateLocation(event);
		alive = event.alive;
	});

	dispatch.hook("S_CREATURE_LIFE", 2, event => {
		if (isMe(event.gameId)) {
			alive = event.alive;
			if (!alive) {
				clearStage();
				oopsLocation = currentAction = serverAction = null;
				blockedSkills = {};
			}
		}
	});

	dispatch.hook("S_SKILL_LIST", 1, event => {
		for (let item of event.skillList.filter(x => x.type == 1)) {
			if (state.blacklist[item.skill]) blacklistedSkills[item.skill] = true;
		}
	});

	dispatch.hook("S_USER_STATUS", 1, event => {
		if (event.target.equals(gameId)) {
			inCombat = event.status == 1;

			if (!inCombat) hookInventory();
			else if (!inventory && inventoryHook) {
				dispatch.unhook(inventoryHook);
				inventoryHook = null;
			}
		}
	});

	function hookInventory() {
		if (!inventoryHook) inventoryHook = dispatch.hook("S_INVEN", 14, event => {
			inventory = event.first ? event.items : inventory.concat(event.items);

			if (!event.more) {
				equippedWeapon = false;
				for (let item of inventory)
					if (item.slot == 1) {
						equippedWeapon = true;
						break;
					}
				for (let item of inventory) {
					if (item.slot == 3) {
						bodyRolls = (item.passivitySets[item.passivitySet] == undefined) ? [] :
							item.passivitySets[item.passivitySet].passivities.map(itm => itm.dbid);
						break;
					}
				}
				inventory = null;
				if (inCombat) {
					dispatch.unhook(inventoryHook);
					inventoryHook = null;
				}
			}
		});
	}

	dispatch.hook("S_PARTY_MEMBER_LIST", 7, (event) => {
		partyMembers = [];
		for (let member of event.members)
			if (!(member.gameId.equals(gameId)))
				partyMembers.push(member.gameId);
	});

	dispatch.hook("S_LEAVE_PARTY", "raw", () => {
		partyMembers = null;
	});

	dispatch.hook("S_MOUNT_VEHICLE_EX", 1, event => {
		if (event.target.equals(gameId)) vehicleEx = event.vehicle;
	});

	dispatch.hook("S_UNMOUNT_VEHICLE_EX", 1, event => {
		if (event.target.equals(gameId)) vehicleEx = null;
	});

	dispatch.hook("S_MOUNT_VEHICLE", 2, event => {
		if (event.gameId.equals(gameId)) {
			mounted = true;
			if (state.config.debug) utils.writeDebugMessage("Your character mounted");
		}
	});

	dispatch.hook("S_UNMOUNT_VEHICLE", 2, event => {
		if (event.gameId.equals(gameId)) {
			mounted = false;
			if (state.config.debug) utils.writeDebugMessage("Your character unmounted");
		}
	});

	function cPlayerLocationHandler(event) {
		if (state.config.debugLoc) utils.writeDebugMessage(`Location type: ${event.type} speed: ${utils.decimal(event.speed)} (${event.loc}) > (${event.dest})`);
		if (currentAction) {
			let info = skillInfo(currentAction.skill);
			if (info && info.distance) return false;
		}

		updateLocation({
			loc: event.loc.addN(event.dest).scale(0.5),
			w: event.w
		});
	}

	function notifyLocation(type, version, event) {
		if (!currentAction || !currentAction.skill.equals(event.skill)) {
			if (state.config.debugLoc) utils.writeDebugMessage(`-> ${type} ${skillId(event.skill)} ${event.stage} (${event.loc}) X`);
			return false;
		}
		if (state.config.debugLoc) utils.writeDebugMessage(`-> ${type} ${skillId(event.skill)} ${event.stage} (${event.loc})`);
		
		let info = skillInfo(event.skill);
		//TODO: fix it somehow (leap interaction)
		if(currentAction.skill.equals(event.skill) && info && info.ignoreCnliaForStages && info.ignoreCnliaForStages.includes(currentAction.stage)) {
			if(state.config.debugLoc) utils.writeDebugMessage(`-> ${type} ${skillId(event.skill)} ${event.stage} (${event.loc}) X (by ignoreCnliaForStage)`);
		}
		else 
			updateLocation(event, true);

		// The server rejects and logs packets with an incorrect skill, so if a skill has multiple possible IDs then we wait for a response
		if(info && (info.abnormalChains || info.chains || info.hasChains))
			if (serverConfirmedAction) {
				if (!serverAction) return false;
				else if (!event.skill.equals(serverAction.skill)) {
					event.skill = serverAction.skill;
					return true;
				}
			}
			else {
				queuedNotifyLocation.push([type, version, event]);
				return false;
			}
	}

	function dequeueNotifyLocation(skill) {
		if (queuedNotifyLocation.length) {
			if (skill)
				for (let [type, version, event] of queuedNotifyLocation)
					dispatch.toServer(type, version, Object.assign(event, { skill }));
			queuedNotifyLocation = [];
		}
	}

	function startSkill(type, version, code, data) {
		if (sending) return;

		let event = protocol.parse(dispatch.base.protocolVersion, type, version, data = Buffer.from(data)),
			info = skillInfo(event.skill),
			delay = 0;

		if (delayNext && Date.now() <= stageEndTime) {
			delay = delayNext;
			if (info && !info.noRetry && state.config.skillRetryCount) {
				delay -= (ping.max - ping.min <= 13) ? ping.max - ping.min : state.config.skillRetryJittercomp;
				if (delay < 0) delay = 0;
			}
		}

		if (state.config.debug) {
			let strs = ["->", type, skillId(event.skill)];

			if (type == "C_START_SKILL") strs.push(...[event.unk ? 1 : 0, event.moving ? 1 : 0, event.continue ? 1 : 0, event.unk2 ? 1 : 0]);
			if (type == "C_PRESS_SKILL") strs.push(event.press);
			else if (type == "C_START_TARGETED_SKILL") {
				let tmp = [];

				for (let e of event.targets) tmp.push([e.id.toString(), e.unk].join(" "));

				strs.push("[" + tmp.join(", ") + "]");
			}

			if (state.config.debugLoc) {
				strs.push(...[`${event.w}\xb0`, "(" + Math.round(event.loc.x), Math.round(event.loc.y), `${Math.round(event.loc.z)})`]);

				if (type == "C_START_SKILL" || type == "C_START_TARGETED_SKILL" || type == "C_START_INSTANCE_SKILL_EX")
					strs.push(...[">", "(" + Math.round(event.dest.x), Math.round(event.dest.y), `${Math.round(event.dest.z)})`]);
			}

			if (delay) strs.push(`DELAY=${delay}`);

			utils.writeDebugMessage(strs.join(" "));
		}

		clearTimeout(delayNextTimeout);

		if (info && info.type === "charging" && Date.now() - lastEndedTime <= (state.config.skillRetryCount * state.config.skillRetryMs)) delay += state.ChargeDelayConst;

		if (delay) {
			delayNextTimeout = setTimeout(() => {
				if (handleStartSkill(type, event, info, data) !== false) toServerLocked(data)
			}, delay);

			return false;
		}

		return handleStartSkill(type, event, info, data);
	}

	function handleStartSkill(type, event, info, data) {
		serverConfirmedAction = false;
		dequeueNotifyLocation();
		delayNext = 0;

		let specialLoc = event.dest;

		if (!info) {
			if (type != "C_PRESS_SKILL" || event.start)
				// Sometimes invalid (if this skill can't be used, but we have no way of knowing that)
				if (type != "C_NOTIMELINE_SKILL") updateLocation(event, false, specialLoc);
			return;
		}

		let skill = event.skill.clone(),
			skillBase = Math.floor(skill.id / 10000),
			interruptType = 0;

		if (mounted) {
			sendCannotStartSkill(event.skill);
			sendSystemMessage("SMT_PROHIBITED_ACTION_ON_RIDE");
			return false;
		}

		if (!alive || abnormality.inMap(state.basicCC)) {
			sendCannotStartSkill(event.skill);
			return false;
		}

		if (info.CC) {
			if (Array.isArray(info.CC)) {
				for (let cc of info.CC) {
					if (checkAdditionalAbnormals(cc)) {
						sendCannotStartSkill(event.skill);
						return false;
					}
				}
			} else if (checkAdditionalAbnormals(info.CC)) {
				sendCannotStartSkill(event.skill);
				return false;
			}
		}

		if (!equippedWeapon && !info.withoutWeapon) {
			sendCannotStartSkill(event.skill);
			sendSystemMessage("SMT_BATTLE_SKILL_NEED_WEAPON");
			return false;
		}

		if (info.timeout && blockedSkills[skillBase]) {
			if (state.config.debug) utils.writeDebugMessage(`Timeout active, can't cast ${skillBase}`);
			sendCannotStartSkill(event.skill);
			return false;
		}

		if (job == 2 && skillBase == 8) {
			if (!fixedPending) return false;
			fixedPending = false;
			setTimeout(() => { fixedPending = true; }, 490);
		}
		else fixedPending = true;

		if (type == "C_PRESS_SKILL" && event.press && !canChainVB && job == 3 && skillBase == 15 && switchVB) return false; // todo: rewrite this ugly shit

		if (type == "C_PRESS_SKILL" && !event.press && !(canChainVB && (job == 3 && skillBase == 15))) {
			if (currentAction && currentAction.skill.equals(skill)) {
				if (info.type == "hold" || info.type == "holdInfinite") {
					updateLocation(event);

					if (info.chainOnRelease) {
						sendActionEnd(11);

						info = skillInfo(skill = modifyChain(skill, info.chainOnRelease));
						if (!info) {
							return;
						}

						startAction({
							skill,
							info,
							stage: 0,
							speed: info.fixedSpeed || aspd * (info.speed || 1)
						});
					}
					else sendActionEnd(info.endType51 ? 51 : 10);
				} else if (info.type == "charging") {
					if (job == 3 && abnormality.exists(state.ZERK_KMS)) { //shit optimization for normal classes (TODO: remove it/rewrite or smth)
						toServerLocked("C_PRESS_SKILL", dispatch.base.majorPatchVersion >= 74 ? 4 : 3, {
							skill: skill,
							press: false,
							loc: currentLocation.loc,
							w: currentLocation.w
						});
						grantCharge(skill, info, info.length.length || 1);
						return false;
					}
					else
						grantCharge(skill, info, currentAction.stage);
				}
			} else if (info.type == "grantCharge") grantCharge(skill, info, storedCharge);
			return;
		}

		if (currentAction) {
			var currentSkill = currentAction.skill.id,
				currentSkillBase = Math.floor(currentSkill / 10000),
				currentSkillSub = currentSkill % 100;
			if (currentAction.skill.type === PLAYER_ACTION) {

				if (canChainVB && currentSkillBase == 15 && currentSkillSub == 14) {
					setTimeout(() => {
						switchVB = false;
					}, ping.max); // this should be handled differently but reading code :thinking:
					canChainVB = false;
					if (state.config.debug) utils.writeDebugMessage("Chained VB disabled");
				}

				// Some skills are bugged clientside and can interrupt the wrong skills, so they need to be flagged manually
				if (info.noInterrupt && (info.noInterrupt.includes(currentSkillBase) || info.noInterrupt.includes(`${currentSkillBase}-${currentSkillSub}`))) {
					let canInterrupt = false;
					if (info.interruptibleWithAbnormal)
						for (let abnormal in info.interruptibleWithAbnormal)
							if (abnormality.exists(abnormal) && currentSkillBase == info.interruptibleWithAbnormal[abnormal])
								canInterrupt = true;

					if (info.interruptAllWithAbnormal)
						for (let abnormal in info.interruptAllWithAbnormal)
							if (abnormality.exists(abnormal) && currentSkillBase !== info.interruptAllWithAbnormal[abnormal])
								canInterrupt = true;

					if (!canInterrupt) {
						sendCannotStartSkill(event.skill);
						return false;
					}
				}
				if (info.type == "storeCharge") storedCharge = currentAction.stage;
			}
			else if (currentAction.skill.type === PLAYER_REACTION && (currentAction.skill.id !== templateId * 100 + 2 || info.type !== "retaliate")) {
				sendCannotStartSkill(event.skill);
				return false;
			}
		}

		// 'connect' type skills (chains)
		
		let chain;

		// 1. Abnormality chains (prioritise in order of ID)
		for(let id in info.abnormalChains)
			if(abnormality.exists(Number(id))) {
				chain = info.abnormalChains[id];
				break;
			}

			// 2. Skill chains
		if(chain === undefined && currentAction) {
			const chains = info.chains;

			if(chains) {
				chain = chains[`${currentSkillBase}-${currentSkillSub}`];
				if(chain === undefined) chain = chains[currentSkillBase];
			}
		}

		if(chain !== undefined) {
			if(chain === null) { // Special null chain
				updateLocation(event, false, specialLoc);
				sendActionEnd(4);
				return;
			}
			skill = chain >= 100 ? new SkillID(chain) : modifyChain(skill, chain);
			interruptType = INTERRUPT_TYPES[info.type] || 4;
		}
		else interruptType = INTERRUPT_TYPES[info.type] || 6;
		

		if (info.onlyDefenceSuccess)
			if (currentAction && currentAction.defendSuccess) interruptType = 3;
			else {
				sendCannotStartSkill(event.skill);
				sendSystemMessage("SMT_SKILL_ONLY_DEFENCE_SUCCESS");
				return false;
			}

		if (info.onlyTarget && event.targets[0].id.equals(0)) {
			sendCannotStartSkill(event.skill);
			return false;
		}

		// Skill override (chain)
		if(!skill.equals(event.skill)) {
			info = skillInfo(skill);
			if (!info) {
				if (type != "C_NOTIMELINE_SKILL") updateLocation(event, false, specialLoc);
				return;
			}
			event.skill = skill.clone();
		}

		// TODO: System Message
		if (info.requiredBuff) {
			if (Array.isArray(info.requiredBuff)) {
				let found = false;

				for (let buff of info.requiredBuff)
					if (abnormality.exists(buff)) {
						found = true;
						break;
					}

				if (!found) {
					sendCannotStartSkill(event.skill);
					return false;
				}
			} else if (!abnormality.exists(info.requiredBuff)) {
				sendCannotStartSkill(event.skill);
				return false;
			}
		}

		if (info.toggleOnAbnormality) {
			if (Array.isArray(info.toggleOnAbnormality)) {
				let found = false;

				for (let buff of info.toggleOnAbnormality)
					if (abnormality.exists(buff)) {
						found = true;
						break;
					}

				if (found) {
					sendCannotStartSkill(event.skill);
					return false;
				}
			} else if (abnormality.exists(info.toggleOnAbnormality)) {
				sendCannotStartSkill(event.skill);
				return false;
			}
		}

		if (type != "C_NOTIMELINE_SKILL") updateLocation(event, false, specialLoc);
		lastStartLocation = currentLocation;

		let additionalSpeedBonuses = 1,
			chargeSpeed = 0,
			distanceMult = 1,
			nocTanMod = 1;

		if (info.abnormals)
			for (let id in info.abnormals)
				if (abnormality.exists(id)) {
					let abnormal = info.abnormals[id];

					if (abnormal.speed) additionalSpeedBonuses += abnormal.speed;
					if (abnormal.chargeSpeed) chargeSpeed += abnormal.chargeSpeed;
					if (abnormal.nocTanSpeed) nocTanMod += abnormal.nocTanSpeed;
					if (abnormal.chain) skill = modifyChain(skill, abnormal.chain);
					if(abnormal.skill) skill = new SkillID(abnormal.skill);
				}

		// Skill override (abnormal)
		if (!skill.equals(event.skill)) {
			info = skillInfo(skill);
			if (!info) {
				return;
			}
		}

		if (interruptType) event.continue ? clearStage() : sendActionEnd(interruptType);

		// Finish calculations and send the final skill
		let speed = info.fixedSpeed || aspd * (info.speed || 1),
			movement = null,
			stamina = info.stamina,
			effectScale = 1;

		if (info.glyphs)
			for (let id in info.glyphs)
				if (currentGlyphs[id]) {
					let glyph = info.glyphs[id];

					if (glyph.speed) additionalSpeedBonuses += glyph.speed;
					if (glyph.chargeSpeed) chargeSpeed += glyph.chargeSpeed;
					if (glyph.movement) movement = glyph.movement;
					if (glyph.distance) distanceMult *= glyph.distance;
					if (glyph.stamina) stamina += glyph.stamina;
					if (glyph.effectScale) effectScale *= glyph.effectScale;
				}

		if (info.bodyRolls) {
			for (let id in info.bodyRolls) {
				if (bodyRolls.includes(id)) {
					let roll = info.bodyRolls[id];

					if (roll.chargeSpeed) chargeSpeed += roll.chargeSpeed;
					if (roll.stamina) stamina += roll.stamina;
				}
			}
		}

		//ALL MAGIC: (aspd * (1+ sum from (abnormals speed + glyphs))*(1+modifier from nocts) + (sum from (abn+glyphs for chargeSpeed))
		//THEORYCRAFT MAGIC (THX, NEP!)
		speed = (speed * additionalSpeedBonuses) * nocTanMod;

		if (stamina) {
			if (currentStamina < stamina) {
				sendCannotStartSkill(event.skill);
				sendSystemMessage(lowStaminaSystemMessage);
				return false;
			}
			if (info.instantStamina) currentStamina -= stamina;
		}

		if (info.timeout && !blockedSkills[skillBase]) {
			blockedSkills[skillBase] = true;
			if (state.config.debug) utils.writeDebugMessage(`Timeout ${info.timeout}, skill ${skillBase} blocked`);
		}

		startAction({
			skill,
			info,
			stage: 0,
			speed,
			chargeSpeed,
			movement,
			moving: type == "C_START_SKILL" && event.moving == 1,
			effectScale,
			distanceMult,
			dest: event.dest,
			endpoints: event.endpoints
		});

		// Normally the user can press the skill button again if it doesn't go off
		// However, once the animation starts this is no longer possible, so instead we simulate retrying each skill
		if (!info.noRetry)
			retry(() => {
				if ((state.config.skillRetryAlways && type != "C_PRESS_SKILL") || info.retryAlways || currentAction && currentAction.skill.equals(skill) && !serverConfirmedAction) return toServerLocked(data);
				return false;
			});
	}

	function toServerLocked(...args) {
		sending = true;
		let success = dispatch.toServer(...args);
		sending = false;

		return success;
	}

	// CC check; true - found, false - nope
	function checkAdditionalAbnormals(type) {
		switch (type) {
		case "evasive":
			return abnormality.inMap(state.evasiveCC);
		case "extended":
			return abnormality.inMap(state.extendedCC);
		default:
			return false;
		}
	}

	function cCancelSkillHandler(event) {
		if (state.config.debug) utils.writeDebugMessage(["-> C_CANCEL_SKILL", skillId(event.skill), event.type].join(" "));

		if (currentAction) {
			let info = skillInfo(currentAction.skill); // event.skill can be wrong, so use the known current skill instead
			if (info && info.type == "lockon") sendActionEnd(event.type);
			if (info && info.blockCancelPacket) {
				if (state.config.debug) utils.writeDebugMessage("C_CANCEL_SKILL was dropped");
				return false;
			}
		}
	}

	function sActionStageHandler(event) {
		if (isMe(event.gameId)) {
			if (state.config.debug) {
				let duration = Date.now() - debugActionTime,
					strs = [skillInfo(event.skill) ? "<X" : "<-", "S_ACTION_STAGE", skillId(event.skill), event.stage, `${utils.decimal(event.speed, 3)}x`, `${utils.decimal(event.projectileSpeed, 3)} x`];

				if (state.config.debugLoc) strs.push(...[utils.degrees(event.w), "(" + Math.round(event.loc.x), Math.round(event.loc.y), `${Math.round(event.loc.z)})`]);

				if (serverAction)
					strs.push(...[
						`${utils.decimal(serverAction.loc.dist2D(event.loc), 3)}u`,
						`${duration}ms`,
						"(" + Math.round(duration * serverAction.speed) + "ms)"
					]);

				if (event.movement.length) {
					let movement = [];

					for (let e of event.movement)
						movement.push(`${e.duration} ${e.speed} ${e.unk} ${e.distance}`);

					strs.push("(" + movement.join(", ") + ")");
				}

				utils.writeDebugMessage(strs.join(" "));
				debugActionTime = Date.now();
			}

			let info = skillInfo(event.skill);
			if (info) {
				if(currentAction && event.skill.type === currentAction.skill.type && Math.floor(event.skill.id / 100) === Math.floor(currentAction.skill.id / 100) && event.stage === currentAction.stage) {
					clearTimeout(serverTimeout);
					serverConfirmedAction = true;
					dequeueNotifyLocation(event.skill);

					if (state.config.jitterCompensation && event.stage == 0) {
						let delay = Date.now() - lastStartTime - ping.min;

						if (delay > 0 && delay < 1000) {
							delayNext = delay;

							if (stageEnd) {
								stageEndTime += delay;
								refreshStageEnd();
							}
						}
					}
				}

				if (info.forceClip && event.movement.length) {
					let distance = 0;
					for (let m of event.movement) distance += m.distance;

					if (info.distance < 0) distance = -distance;

					oopsLocation = applyDistance(lastStartLocation, distance);

					if (!currentAction || currentAction.skill != event.skill) sendInstantMove(oopsLocation);
				}

				// If the server sends 2 S_ACTION_STAGE in a row without a S_ACTION_END between them and the last one is an emulated skill,
				// this stops your character from being stuck in the first animation (although slight desync will occur)
				if (serverAction && serverAction == currentAction && !skillInfo(currentAction.skill)) sendActionEnd(6);

				serverAction = event;
				return false;
			}

			serverAction = event;

			if (event.id == lastEndedId) return false;

			if (currentAction && skillInfo(currentAction.skill)) sendActionEnd(lastEndSkill == currentAction.skill ? lastEndType || 6 : 6);

			currentAction = event;
			updateLocation();
		}
	}

	function sGrantSkillHandler(event) {
		if (state.config.debug) utils.writeDebugMessage(["<- S_GRANT_SKILL", skillId(event.skill)].join(" "));

		if (skillInfo(modifyChain(event.skill, 0))) return false;
	}

	function sInstantDashHandler(event) {
		if (isMe(event.gameId)) {
			if (state.config.debug) {
				let duration = Date.now() - debugActionTime,
					strs = [(serverAction && skillInfo(serverAction.skill)) ? "<X" : "<-", "S_INSTANT_DASH", event.unk1, event.unk2, event.unk3];

				if (state.config.debugLoc) strs.push(...[utils.degrees(event.w), "(" + Math.round(event.loc.x), Math.round(event.loc.y), `${Math.round(event.loc.z)})`]);

				strs.push(...[
					`${utils.decimal(serverAction.loc.dist2D(event.loc), 3)}u`,
					`${duration}ms`,
					"(" + Math.round(duration * serverAction.speed) + "ms)"
				]);

				utils.writeDebugMessage(strs.join(" "));
			}

			if (serverAction && skillInfo(serverAction.skill)) return false;
		}
	}

	function sInstantMoveHandler(event) {
		if (isMe(event.gameId)) {
			if (state.config.debug) {
				let info = serverAction && skillInfo(serverAction.skill),
					duration = Date.now() - debugActionTime,
					strs = ["<- S_INSTANT_MOVE"];

				if (state.config.debugLoc) strs.push(...[utils.degrees(event.w), "(" + Math.round(event.loc.x), Math.round(event.loc.y), `${Math.round(event.loc.z)})`]);

				strs.push(...[
					`${utils.decimal(serverAction.loc.dist2D(event.loc), 3)}u`,
					`${duration}ms`,
					"(" + Math.round(duration * serverAction.speed) + "ms)"
				]);

				utils.writeDebugMessage(strs.join(" "));
			}

			updateLocation(event, true);

			let info = serverAction && skillInfo(serverAction.skill);

			if(info && info.type == "teleport" && currentAction && currentAction.skill.equals(serverAction.skill))
				oopsLocation = currentLocation;
		}
	}

	function sActionEndHandler(event) {
		if (isMe(event.gameId)) {
			if (state.config.debug) {
				let duration = Date.now() - debugActionTime,
					strs = [(event.id == lastEndedId || skillInfo(event.skill)) ? "<X" : "<-", "S_ACTION_END", skillId(event.skill), event.type];

				if (state.config.debugLoc) strs.push(...[utils.degrees(event.w), "(" + Math.round(event.loc.x), Math.round(event.loc.y), `${Math.round(event.loc.z)})`]);

				if (serverAction)
					strs.push(...[
						`${utils.decimal(serverAction.loc.dist2D(event.loc), 3)}u`,
						`${duration}ms`,
						"(" + Math.round(duration * serverAction.speed) + "ms)"
					]);
				else strs.push("???");

				utils.writeDebugMessage(strs.join(" "));
			}

			serverAction = null;
			lastEndSkill = event.skill;
			lastEndType = event.type;

			if (event.id == lastEndedId) {
				lastEndedId = 0;
				return false;
			}

			let info = skillInfo(event.skill);
			if (info) {
				if (info.type == "dash")
					// If the skill ends early then there should be no significant error
					if (currentAction && event.skill.equals(currentAction.skill)) {
						updateLocation(event);
						sendActionEnd(event.type);
					}
					// Worst case scenario, teleport the player back if the error was large enough for the client to act on it
					else if (!lastEndLocation || lastEndLocation.loc.dist2D(event.loc) >= state.XYCorrectionDiff)
						sendInstantMove(event);

				if (Math.abs(event.loc.z - currentLocation.loc.z) >= state.zCorrectionDiff) {
					if (currentAction) {
						if (state.config.debug) utils.writeDebugMessage("Loc correction queued to", event.loc);
						oopsLocation = event;
					} else {
						if (state.config.debug) utils.writeDebugMessage("Loc corrected to", event.loc);
						currentLocation.loc = event.loc;
						sendInstantMove(event);
					}
				}

				// Skills that may only be cancelled during part of the animation are hard to emulate, so we use server response instead
				// This may cause bugs with very high ping and casting the same skill multiple times
				if (currentAction && (event.skill.equals(currentAction.skill) || event.skill.type == PLAYER_REACTION) && [2, 9, 13, 33, 25, 29, 43].includes(event.type)) {
					updateLocation(event);
					sendActionEnd(event.type);
				}
				return false;
			}

			if (!currentAction)
				utils.writeErrorMessage("S_ACTION_END: currentAction is null", skillId(event.skill), event.id);
			else if (!event.skill.equals(currentAction.skill))
				utils.writeErrorMessage("S_ACTION_END: skill mismatch", skillId(currentAction.skill), skillId(event.skill), currentAction.id, event.id);

			currentAction = null;
		}
	}

	dispatch.hook("S_EACH_SKILL_RESULT", 11, event => {
		let reaction = event.targetAction;
		if (isMe(event.target) && reaction.enable) {
			if (state.config.debug) {
				let strs = ["<- S_EACH_SKILL_RESULT.reaction", skillId(reaction.skill), reaction.stage];
				if (state.config.debugLoc) strs.push(...[utils.degrees(reaction.w), "(" + Math.round(reaction.loc.x), Math.round(reaction.loc.y), `${Math.round(reaction.loc.z)})`]);
				utils.writeDebugMessage(strs.join(" "));
			}

			if (currentAction && skillInfo(currentAction.skill)) sendActionEnd(9);
			blockedSkills = {};
			if (state.config.debug) utils.writeDebugMessage("Blocked list cleared");

			currentAction = serverAction = reaction ;
			updateLocation();
		}
	});

	function unblockSkill(skillBase, timeout) {
		if (blockedSkills[skillBase]) {
			setTimeout(() => {
				if (state.config.debug) utils.writeDebugMessage(`Skill unblocked by timeout ${skillBase}`);
				delete blockedSkills[skillBase];
			}, timeout);
		}
	}

	function cooldownFix(event) {
		if (event.cooldown > 0) {
			event.cooldown -= ping.min;
			if (event.cooldown <= 0) event.cooldown = 0;
			return true;
		}
	}

	function sCrestMessageHandler(event) {
		if (state.config.debug) utils.writeDebugMessage(`<- S_CREST_MESSAGE ${event.unk} ${event.type} ${skillId(event.skill)}`);
		if (event.type == 6) {
			let info = skillInfo(event.skill, true);
			if (info && info.timeout) {
				let skillBase = Math.floor(event.skill / 10000);
				unblockSkill(skillBase, 5);
			}
		}
	}

	 function sDefendSuccessHandler(event) {
		if (isMe(event.gameId)) {
			if (currentAction && serverAction && currentAction.skill.equals(serverAction.skill)) currentAction.defendSuccess = true;
			else if (state.config.defendSuccessStrict || job != 10) return false;
		}
	}

	function sCannotStartSkillHandler(event) {
		if (state.config.debug) utils.writeDebugMessage(`<- S_CANNOT_START_SKILL ${skillId(event.skill)}`);

		if (skillInfo(event.skill)) {
			if (state.config.skillDelayOnFail && state.config.skillRetryCount && currentAction && (!serverAction || !currentAction.skill.equals(serverAction.skill)) && event.skill.id === currentAction.skill.id)
				delayNext += state.config.skillRetryMs;

			return false;
		}
	}

	function cCanLockonTargetHandler(event) {
		let info = skillInfo(event.skill);
		if (info) {
			let success = true;
			if (info.partyOnly) {
				success = false;

				if (partyMembers)
					for (let member of partyMembers)
						if (member.equals(event.target)) {
							success = true;
							break;
						}
			}

			dispatch.toClient("S_CAN_LOCKON_TARGET", dispatch.base.majorPatchVersion >= 74 ? 3 : 2, Object.assign({
				success
			}, event));
		}
	}

	function sCanLockonTarget(event) {
		return skillInfo(event.skill) ? false : undefined;
	}

	function startAction(opts) {
		let info = opts.info;

		if (info.consumeAbnormal)
			if (Array.isArray(info.consumeAbnormal))
				for (let id of info.consumeAbnormal)
					abnormality.remove(id);
			else
				abnormality.remove(info.consumeAbnormal);

		sendActionStage(opts);

		if (info.type == "dash") sendInstantDash(opts.dest);

		if (info.triggerAbnormal)
			for (let id in info.triggerAbnormal) {
				let abnormal = info.triggerAbnormal[id];

				if (Array.isArray(abnormal))
					abnormality.add(id, abnormal[0], 1, abnormal[1]);
				else
					abnormality.add(id, abnormal, 1, 10);
			}

		if (info.triggerAbnormalIfMissing)
			for (let id in info.triggerAbnormalIfMissing) {
				if (!abnormality.exists(id)) {
					let abProperties = info.triggerAbnormalIfMissing[id];
					abnormality.add(id, abProperties[0], 1, abProperties[1]);
				}
			}
		lastStartTime = Date.now();
	}

	function sendActionStage(opts) {
		clearTimeout(serverTimeout);
		opts.stage = opts.stage || 0;
		opts.distanceMult = opts.distanceMult || 1;

		let info = opts.info,
			multiStage = Array.isArray(info.length),
			movement = opts.movement;

		movePlayer(opts.distance * opts.distanceMult);

		if (multiStage)
			movement = movement && movement[opts.stage] || !opts.moving && get(info, "inPlace", "movement", opts.stage) || get(info, "movement", opts.stage) || [];
		else
			movement = movement || !opts.moving && get(info, "inPlace", "movement") || info.movement || [];

		//another hardcoded shit for zerk (TODO: rewrite/remove it)
		let defendSucc;
		if (job == 3) {
			let abn = abnormality.exists(state.ZERK_KMS);
			if (abn && info.type === "charging") {
				opts.stage = info.length.length || 1;
			}
			defendSucc = (opts.stage > 0 && !abn) ? currentAction.defendSuccess : false;
		} else
			defendSucc = opts.stage > 0 ? currentAction.defendSuccess : false;

		if (state.config.debug) utils.writeDebugMessage(`<* S_ACTION_STAGE ${skillId(opts.skill)} ${opts.stage} ${info.type == "charging" ? 1 : opts.speed}`);

		dispatch.toClient("S_ACTION_STAGE", 8, currentAction = {
			gameId: myChar(),
			loc: currentLocation.loc,
			w: currentLocation.w,
			templateId,
			skill: opts.skill,
			stage: opts.stage,
			speed: info.type == "charging" ? 1 : opts.speed,
			projectileSpeed : info.type == "charging" ? 1 : opts.speed,
			id: actionNumber,
			effectScale: opts.effectScale,
			moving: false,
			dest: info.setEndpointStage === opts.stage ? opts.endpoints[0].loc : undefined,
			target: 0,
			movement,

			// Meta
			defendSuccess: defendSucc
		});

		opts.distance = (multiStage ? get(info, "distance", opts.stage) : info.distance) || 0;
		stageEnd = null;

		let speed = 1.0;
		if (info.type == "charging")
			speed = opts.speed + opts.chargeSpeed;
		else
			speed = opts.speed;

		let noTimeout = false;

		if (info.enableVB && info.pendingStartTime) {
			switchVB = true; // disable charging vb, could probably express the whole better but i'm lost in the code uwu
			setTimeout(enableVB, (info.pendingStartTime / speed)); // We need to emulate the chain activation
		}

		if(serverAction && Math.floor(serverAction.skill.id / 100) === Math.floor(opts.skill.id / 100) && serverAction.stage >= opts.stage)
			noTimeout = true;

		if (info.type == "teleport" && opts.stage == info.teleportStage) {
			opts.distance = Math.min(opts.distance, Math.max(0, currentLocation.loc.dist2D(opts.dest) - 15)); // Client is approx. 15 units off
			applyDistance(currentLocation, opts.distance);
			currentLocation.loc.z = opts.dest.z;
			sendInstantMove();
			opts.distance = 0;
		}
		if ((info.type == "charging" || info.type == "holdInfinite") && opts.stage == ((info.length && (info.length.length || 1)) || 0)) {
			if (!noTimeout) serverTimeout = setTimeout(sendActionEnd, getServerTimeout(), 33);
			return;
		}

		let length = Math.round((multiStage ? info.length[opts.stage] : info.length) / speed);

		if (!noTimeout) {
			const serverTimeoutTime = getServerTimeout();
			if (length > serverTimeoutTime) serverTimeout = setTimeout(sendActionEnd, serverTimeoutTime, 33);
		}

		if (multiStage) {
			if (!opts.moving) {
				let inPlaceDistance = get(info, "inPlace", "distance", opts.stage);

				if (inPlaceDistance !== undefined) opts.distance = inPlaceDistance;
			}

			if (opts.stage + 1 < info.length.length) {
				opts.stage += 1;
				stageEnd = sendActionStage.bind(null, opts);
				stageEndTime = Date.now() + length;
				stageEndTimeout = setTimeout(stageEnd, length);
				return;
			}
		} else if (!opts.moving) {
			let inPlaceDistance = get(info, "inPlace", "distance");

			if (inPlaceDistance !== undefined) opts.distance = inPlaceDistance;
		}

		if (info.type == "dash" && opts.distance) {
			let distance = lastStartLocation.loc.dist2D(opts.dest);

			if (distance < opts.distance) {
				length *= distance / opts.distance;
				opts.distance = distance;
			}
		}

		if (info.type == "charging" || info.type == "holdInfinite") {
			opts.stage += 1;
			stageEnd = sendActionStage.bind(null, opts);
			stageEndTime = Date.now() + length;
			stageEndTimeout = setTimeout(stageEnd, length);
			return;
		}

		stageEnd = sendActionEnd.bind(null, info.type == "dash" ? 39 : 0, opts.distance * opts.distanceMult);
		stageEndTime = Date.now() + length;
		stageEndTimeout = setTimeout(stageEnd, length);
	}

	function getServerTimeout() {
		return (ping.min * 2) + (ping.max > 300 ? 200 : ping.max / 2) + (state.config.skillRetryCount * state.config.skillRetryMs) + state.config.serverTimeout;
	}

	function clearStage() {
		clearTimeout(serverTimeout);
		clearTimeout(stageEndTimeout);
	}

	function refreshStageEnd() {
		clearTimeout(stageEndTimeout);
		stageEndTimeout = setTimeout(stageEnd, stageEndTime - Date.now());
	}

	function grantCharge(skill, info, stage) {
		let levels = info.chargeLevels;
		dispatch.toClient("S_GRANT_SKILL", dispatch.base.majorPatchVersion >= 74 ? 3 : 2, {
			skill: modifyChain(skill.clone(), levels ? levels[stage] : 10 + stage)
		});
	}

	function sendInstantDash(dest) {
		dispatch.toClient("S_INSTANT_DASH", 3, {
			gameId: myChar(),
			target: 0,
			unk: 0,
			loc: dest,
			w: currentLocation.w
		});
	}

	function sendInstantMove(event) {
		if (event) updateLocation(event);
		dispatch.toClient("S_INSTANT_MOVE", 3, {
			gameId: myChar(),
			loc: currentLocation.loc,
			w: currentLocation.w
		});
	}

	function sendActionEnd(type, distance) {
		clearStage();

		if (!currentAction) return;

		if (state.config.debug) utils.writeDebugMessage(["<* S_ACTION_END", skillId(currentAction.skill), type || 0, utils.degrees(currentLocation.w), currentLocation.loc, `${distance || 0}u`].join(" "));

		if (oopsLocation && !currentLocation.action) sendInstantMove(oopsLocation);
		else movePlayer(distance);

		if (canChainVB) { // In case VB didn't get used on line 670
			switchVB = false;
			canChainVB = false;
			if (state.config.debug) utils.writeDebugMessage("<* I_DISABLE_CHAINED_VB");
		}

		dispatch.toClient("S_ACTION_END", dispatch.base.majorPatchVersion >= 74 ? 5 : 4, {
			gameId: myChar(),
			loc: currentLocation.loc,
			w: currentLocation.w,
			templateId,
			skill: currentAction.skill,
			type: type || 0,
			id: currentAction.id
		});

		if (currentAction.id == actionNumber) {
			let info = skillInfo(currentAction.skill);
			if (info) {
				if (info.timeout) {
					let skillBase = Math.floor(currentAction.skill.id / 10000);
					unblockSkill(skillBase, ping.min + info.timeout);
				}

				if (info.consumeAbnormalEnd)
					if (Array.isArray(info.consumeAbnormalEnd))
						for (let id of info.consumeAbnormalEnd)
							abnormality.remove(id);
					else
						abnormality.remove(info.consumeAbnormalEnd);


				if (info.consumeAbnormalEndPending)
					for (let id in info.consumeAbnormalEndPending) {
						let delay = info.consumeAbnormalEndPending[id];
						abnormality.remove(id, delay);
					}

				/*    
                if (info.triggerAbnormalEnd)
                    for (let id in info.triggerAbnormalEnd) {
                        let abnormal = info.triggerAbnormalEnd[id];

                        if (Array.isArray(abnormal))
                            abnormality.add(id, abnormal[0], abnormal[1]);
                        else
                            abnormality.add(id, abnormal, 1)
                    }
                */

				if (info.type == "dash") lastEndLocation = currentLocation;
			}
		} else lastEndedId = currentAction.id;

		actionNumber++;
		if (actionNumber > 0xffffffff) actionNumber = 0x80000000;

		oopsLocation = currentAction = null;

		lastEndedTime = Date.now();
	}

	function sendCannotStartSkill(skill) {
		dispatch.toClient("S_CANNOT_START_SKILL", 1, {skill: skill.id});
	}

	function sendSystemMessage(smt, data) {
		dispatch.toClient("S_SYSTEM_MESSAGE", 1, {
			message: dispatch.buildSystemMessage(smt, data)
		});
	}

	function updateLocation(event, action, special) {
		event = event || currentAction;
		currentLocation = {
			loc: event.loc,
			w: special ? event.w || currentLocation.w : event.w, // Should be a skill flag maybe?
			action
		};
	}

	function retry(cb, count = 1) {
		if (count > state.config.skillRetryCount) return;

		setTimeout(() => {
			if (cb()) retry(cb, count + 1);
		}, state.config.skillRetryMs);
	}

	function movePlayer(distance) {
		if (distance && !currentLocation.action) applyDistance(currentLocation, distance);
	}

	function applyDistance(pos, dist) {
		pos.loc.add(new Vec3(dist, 0, 0).rotate(pos.w));
		return pos;
	}

	// Modifies the chain part (last 2 digits) of a skill ID, preserving flags
	function modifyChain(skill, chain) {
		(skill = skill.clone()).id += chain - (skill.id % 100);
		return skill;
	}

	function skillId(skill) {
		if(!(skill instanceof SkillID)) skill = new SkillID(skill);
	
		let str = skill.reserved ? `[X${skill.reserved.toString(16)}]` : "";
	
		switch(skill.type) {
		case 1: str += "A"; break;
		case 2: str += "R"; break;
		default: str += `[T${skill.type}]`; break;
		}
	
		if(skill.npc) {
			if(skill.type === 1) return `${str}${skill.huntingZoneId}:${skill.id}`;
			return str + skill.id;
		}
	
		const id = skill.id.toString();
	
		switch(skill.type) {
		case 1: return str + [id.slice(0, -4), id.slice(-4, -2), id.slice(-2)].join("-");
		case 2: return str + [id.slice(0, -2), id.slice(-2)].join("-");
		default: return str + id;
		}
	}

	//Load info about skill
	function skillInfo(skill) {
		if(!(skill instanceof SkillID)) skill = new SkillID(skill);
		if(skill.type !== PLAYER_ACTION) return null;
		const id = skill.id;

		let cached = skillsCache[id];

		if (cached !== undefined) return cached;

		let group = Math.floor(id / 10000),
			level = (Math.floor(id / 100) % 100) - 1,
			sub = id % 100;

		// blacklist support
		if (blacklistedSkills[id])
			return skillsCache[id] = null;
		// preset.js support
		if (!get(state.preset, job, "enabled") || !get(state.preset, job, group))
			return skillsCache[id] = null;

		let info = [ // Ordered by least specific < most specific
			get(state.skills, job, "*"),
			get(state.skills, job, "*", "level", level),
			get(state.skills, job, "*", "race", race),
			get(state.skills, job, "*", "race", race, "level", level),
			get(state.skills, job, group, "*"),
			get(state.skills, job, group, "*", "level", level),
			get(state.skills, job, group, "*", "race", race),
			get(state.skills, job, group, "*", "race", race, "level", level),
			get(state.skills, job, group, sub),
			get(state.skills, job, group, sub, "level", level),
			get(state.skills, job, group, sub, "race", race),
			get(state.skills, job, group, sub, "race", race, "level", level)
		];

		// Note: Exact skill (group, sub) must be specified for prediction to be enabled. This helps to avoid breakage in future patches
		if (info[8]) {
			cached = skillsCache[id] = Object.assign({}, ...info);
			// Sanitize to reduce memory usage
			delete cached.race;
			delete cached.level;
			return cached;
		}
		return skillsCache[id] = null;
	}

	//Check gameId(cid)
	function isMe(id) {
		return gameId.equals(id) || vehicleEx && vehicleEx.equals(id);
	}

	//Get current gameId for character
	function myChar() {
		return vehicleEx ? vehicleEx : gameId;
	}

	function get(obj, ...keys) {
		if (obj === undefined) return;

		for (let key of keys)
			if ((obj = obj[key]) === undefined)
				return;

		return obj;
	}

	function enableVB() {
		canChainVB = true;
		if (state.config.debug) utils.writeDebugMessage("<* I_ENABLE_CHAINED_VB");
	}

	//TODO: disable it for lancer/warr
	function smtCorrection(event) {
		if (dispatch.parseSystemMessage(event.message).id == "SMT_BATTLE_SKILL_FAIL_LOW_STAMINA") {
			sendSystemMessage(lowStaminaSystemMessage);
			return false;
		}
	}

	//Gunner/Ninja/Valk triggering different smt (default - RE stamina)
	function LowStaminaSmtMessage() {
		switch (job) {
		case 9:
			lowStaminaSystemMessage = "SMT_BATTLE_SKILL_FAIL_LOW_ARCANE";
			break;
		case 10:
			lowStaminaSystemMessage = "SMT_BATTLE_SKILL_FAIL_LOW_CHAKRA";
			break;
		case 12:
			lowStaminaSystemMessage = "SMT_BATTLE_SKILL_FAIL_LOW_MOON_LIGHT";
			break;
		default:
			lowStaminaSystemMessage = "SMT_BATTLE_SKILL_FAIL_LOW_STAMINA";
			break;
		}
	}
};
