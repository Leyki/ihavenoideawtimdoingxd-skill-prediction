const config = require('../config/config.json');

/**
 * Ping method from Pinkie -https://github.com/pinkipi/skill-prediction 
 * Active method
 */
class ActivePing {
	constructor(dispatch) {
		this.min = this.max = this.avg = 0;
		this.history = [];
		this.pingInterval = 6000;
		this.pingTimeout = 30000;
		this.pingLimitMin = config.pingSpikesMin;
		this.pingLimitMax = config.pingSpikesMax;
		this.pingLimit = config.pingSpikesLimit;
		this.pingHistoryMax = config.pingHistoryMax;

		let timeout = null,
			waiting = false,
			lastSent = 0

		let ping = () => {
			clearTimeout(timeout)
			dispatch.toServer('C_REQUEST_GAMESTAT_PING', 1)
			waiting = true
			lastSent = Date.now()
			timeout = setTimeout(ping, this.pingTimeout)
		}

		dispatch.hook('S_SPAWN_ME', 'raw', () => {
			clearTimeout(timeout)
			timeout = setTimeout(ping, this.pingInterval)
		})

		dispatch.hook('S_LOAD_TOPO', 'raw', () => { clearTimeout(timeout) })
		dispatch.hook('S_RETURN_TO_LOBBY', 'raw', () => { clearTimeout(timeout) })

		// Disable inaccurate ingame ping so we have exclusive use of ping packets
		dispatch.hook('C_REQUEST_GAMESTAT_PING', 'raw', () => {
			dispatch.toClient('S_RESPONSE_GAMESTAT_PONG', 1)
			return false
		})

		dispatch.hook('S_RESPONSE_GAMESTAT_PONG', 'raw', () => {
			let result = Date.now() - lastSent

			clearTimeout(timeout)

			if (!waiting) this.history.pop() // Oops! We need to recalculate the last value

			//If spike protection enabled - wrong value will be skipped
			//WARNING! With wrong values for min/max ping your SP will be borked
			if (this.pingLimit && ((result <= this.pingLimitMin) || (result >= this.pingLimitMax))) {
				//Yes, its bad... ctrl+c-> ctrl+v (c) SaltyMonkey
				waiting = false;
				timeout = setTimeout(ping, this.pingInterval);
				return false
			}
			else {
				this.history.push(result)

				if (this.history.length > this.pingHistoryMax) this.history.shift()

				// Recalculate statistics variables
				this.min = this.max = this.history[0]
				this.avg = 0

				for (let p of this.history) {
					if (p < this.min) this.min = p
					else if (p > this.max) this.max = p

					this.avg += p
				}

				this.avg /= this.history.length

				waiting = false
				timeout = setTimeout(ping, this.pingInterval - result)
				return false
			}
		})
	}

	UpdateConfig(newConfig) {
		this.pingLimitMin = newConfig.pingSpikesMin;
		this.pingLimitMax = newConfig.pingSpikesMax;
		this.PingHistoryMax = newConfig.pingHistoryMax;
		this.pingLimit = newConfig.pingSpikesLimit;
	}
}

/**
* Ping.js fix by undefined#3394 - https://github.com/undefined3394/safe-skill-prediction/blob/master/ping.js
* Passive method
*/
class PassivePing {
	constructor(dispatch) {
		this.min = this.max = this.avg = 0;
		this.history = [];
		this.pingLimitMin = config.pingSpikesMin;
		this.pingLimitMax = config.pingSpikesMax;
		this.PingHistoryMax = config.pingHistoryMax;
		this.pingLimit = config.pingSpikesLimit;

		const updatePing = ping => {
			if (this.pingLimit && ((ping <= this.pingLimitMin) || (ping >= this.pingLimitMax))) return;
			this.history.push(ping);
			if (this.history.length > this.PingHistoryMax) this.history.shift();

			this.min = this.max = this.history[0];
			this.avg = 0;

			for (let p of this.history) {
				if (p < this.min) this.min = p;
				else if (p > this.max) this.max = p;

				this.avg += p;
			}

			this.avg /= this.history.length;
		};

		//---

		let cid;
		this.last = 0;
		let pingStack = {};

		const pingStart = id => {
			if (!id) return;
			pingStack[id] = Date.now();
		};
		const pingEnd = id => {
			if (!pingStack[id]) return;
			this.last = Date.now() - pingStack[id];
			updatePing(this.last);
			delete pingStack[id];
		};

		const skillId = id => {
			return ((id > 0x4000000) ? id - 0x4000000 : id);
		};

		dispatch.hook('S_LOGIN', 9, event => { cid = event.gameId; });

		const skillHook = e => {
			pingStart(skillId(e.skill));
		};

		for (let packet of [
			['C_START_SKILL', 3],
			['C_START_TARGETED_SKILL', 3],
			['C_START_COMBO_INSTANT_SKILL', 1],
			['C_START_INSTANCE_SKILL', 1],
			['C_START_INSTANCE_SKILL_EX', 2],
			//['C_PRESS_SKILL', 1],
			//['C_NOTIMELINE_SKILL', 1], //not sure about this one
			['C_CAN_LOCKON_TARGET', 1],
		]) dispatch.hook(packet[0], packet[1], { /*filter: { fake: false, modified: false },*/ order: 1000 }, skillHook);

		dispatch.hook('C_CANCEL_SKILL', 1, e => {
			delete pingStack[skillId(e.skill)];
		});

		const actionHook = e => {
			if (e.source && !e.source.equals(cid)) return;
			pingEnd(skillId(e.skill));
		};

		for (let packet of [
			['S_ACTION_STAGE', 1],
			['S_CANNOT_START_SKILL', 1],
			['S_CAN_LOCKON_TARGET', 1],
			['S_INSTANT_DASH', 1],
			//['S_INSTANT_MOVE', 1], //uses id instead of source
		]) dispatch.hook(packet[0], packet[1], { filter: { fake: false, modified: false, silenced: null }, order: -1000 }, actionHook);

		dispatch.hook('C_REQUEST_GAMESTAT_PING', 1, () => {
			setTimeout(() => { dispatch.toClient('S_RESPONSE_GAMESTAT_PONG', 1); }, this.last);
			return false;
		});

	}
	UpdateConfig(newConfig) {
		this.pingLimitMin = newConfig.pingSpikesMin;
		this.pingLimitMax = newConfig.pingSpikesMax;
		this.PingHistoryMax = newConfig.pingHistoryMax;
		this.pingLimit = newConfig.pingSpikesLimit;
	}
}
/**
 *	PoC by SaltyMonkey (not public)
 */
class ExternalPingBridge {
	constructor(dispatch) {
		this.EXTERNAL_PING_TIMEOUT = 2000;
		this.EXTERNAL_PROGRAM_NAME = '\\ConnectionStats.exe';
		this.spawnProcess = require('child_process').spawn;
		this.externalPingChecker = this.spawnProcess(__dirname + this.EXTERNAL_PROGRAM_NAME, [process.pid.toString(), this.EXTERNAL_PING_TIMEOUT.toString()]);
		this.min = this.max = 0;

		this.externalPingChecker.stdout.on('data', (data) => {
			if (data != null) {
				data = data.toString();
				var parsedData = data.split(',');
				this.max = Number(parsedData[0]);
				this.min = Number(parsedData[1]);
				if (config.debug) console.log(parsedData[0], parsedData[1]);
			}
		});
		this.externalPingChecker.on('close', (code, signal) => {
			console.log(`[Skill-Prediction] Child process terminated due to receipt of signal ${signal}`);
		});
		this.externalPingChecker.on('exit', (code, signal) => {
			console.log(`[Skill-Prediction] Child process closed due to receipt of signal ${signal}`);
		});
	}
	destructor() {
		this.externalPingChecker.kill();
	}
}

let map = new WeakMap();

module.exports = function Require(dispatch) {
	if (map.has(dispatch.base)) return map.get(dispatch.base);
	let ping = null;
	switch (String(config.pingMethod).trim().toLowerCase()) {
		case "active":
			ping = new ActivePing(dispatch);
			break;
		case "passive":
			ping = new PassivePing(dispatch);
			break;
		case "external":
			ping = new ExternalPingBridge(dispatch);
			break;
		default:
			ping = new ActivePing(dispatch);
			break;
	}

	map.set(dispatch.base, ping);
	return ping
};
