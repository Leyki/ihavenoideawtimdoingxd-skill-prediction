const Ping = require("./ping");
const utils = require("./utils");
const state = require("./state");

/**
 * @description Managing player's abnormalities
 * @class AbnormalityPrediction
 */
class AbnormalityPrediction {
	constructor(dispatch) {
		this.dispatch = dispatch;
		this.ping = Ping(dispatch);
		this.enabled = false;
		this.gameId = null;
		this.myAbnormals = {};
		
		dispatch.hook("S_LOGIN", 10, event => {
			this.gameId = event.gameId;
		});

		dispatch.hook("S_RETURN_TO_LOBBY", 1, () => {
			this.removeAll();
		});

		dispatch.hook("S_CREATURE_LIFE", 2, event => {
			if (event.gameId.equals(this.gameId) && !event.alive) this.removeAll();
		});

		let abnormalityUpdate = (type, event) => {
			if (event.target.equals(this.gameId)) {
				if (state.config.debugAbnormals) utils.writeDebugMessage("<-", type, event.id, event.duration, event.stacks, state.blockedAbnormals[event.id] == true ? "X" : "");

				let info = state.blockedAbnormals[event.id];
				if (info && this.enabled) {
					if (info == true) return false;

					if (info.overrides && this.exists(info.overrides)) this.remove(info.overrides);
				}

				if (event.duration != 0x7fffffff) event.duration = Math.max(event.duration - this.ping.min, 0);

				if (type === "S_ABNORMALITY_BEGIN" === this.exists(event.id)) { // Transform packet type so it will always be valid
					this.add(event.id, event.duration, event.stacks);
					return false;
				}

				this._add(event.id, event.duration);
				return true;
			}
		};

		dispatch.hook("S_ABNORMALITY_BEGIN", 3, abnormalityUpdate.bind(null, "S_ABNORMALITY_BEGIN"));
		dispatch.hook("S_ABNORMALITY_REFRESH", 1, abnormalityUpdate.bind(null, "S_ABNORMALITY_REFRESH"));

		dispatch.hook("S_ABNORMALITY_END", 1, event => {
			if (event.target.equals(this.gameId)) {
				if (state.config.debugAbnormals) utils.writeDebugMessage("<- S_ABNORMALITY_END", event.id, state.blockedAbnormals[event.id] == true ? "X" : "");

				if (state.blockedAbnormals[event.id] == true && this.enabled) return false;

				if (!this.myAbnormals[event.id]) return false;

				this._remove(event.id);
			}
		});
	}

	/**
	 * @description Checking the existence of a effectId in active abnormies
	 * @param {number} id abnormal id
	 * @returns {boolean} true/false
	 * @memberof AbnormalityPrediction
	 */
	exists(id) {
		return !!this.myAbnormals[id];
	}

	/**
	 * @description Checking the existence of a Map with effectIds in active abnormies
	 * @param {Object} map map object with effectIds
	 * @returns {boolean} 
	 * @memberof AbnormalityPrediction
	 */
	inMap(map) {
		for (let id in this.myAbnormals)
			if (map[id]) return true;
		return false;
	}

	/**
	 * @description add abnormal to effects
	 * @param {number} id effectId
	 * @param {number} duration effect duration in ms
	 * @param {number} stacks stacks for effect
	 * @param {number} [delay=0] delay for activation
	 * @memberof AbnormalityPrediction
	 */
	add(id, duration, stacks, delay = 0) {
		// bandaid fix for race condition (fk you, timers)
		if (this.myAbnormals[id] && this.myAbnormals[id].status === "removePending") {
			clearTimeout(this.myAbnormals[id].removeTimer);
			this._remove(id);
		}

		let type = this.myAbnormals[id] ? "S_ABNORMALITY_REFRESH" : "S_ABNORMALITY_BEGIN",
			version = this.myAbnormals[id] ? 1 : 3;

		setTimeout(() => {
			if (state.config.debugAbnormals) utils.writeDebugMessage("<*", type, id, duration, stacks);

			this.dispatch.toClient(type, version, {
				target: this.gameId,
				source: this.gameId,
				id,
				duration,
				unk: 0,
				stacks,
				unk2: 0
			});

			this._add(id, duration);
		}, delay);
	}

	/**
	 * @description add abnormal from effects
	 * @param {any} id effect id
	 * @param {number} [delay=0] delay 
	 * @returns  
	 * @memberof AbnormalityPrediction
	 */
	remove(id, delay = 0) {
		if (!this.exists(id)) return;
		this.myAbnormals[id].status = "removePending"; //status pendingRemote
		this.myAbnormals[id].removeTimer = setTimeout(() => {
			if (state.config.debugAbnormals) utils.writeDebugMessage("<* S_ABNORMALITY_END", id);
			this.dispatch.toClient("S_ABNORMALITY_END", 1, {
				target: this.gameId,
				id
			});
			this._remove(id);

		}, delay);
	}

	/**
	 * @description remove all effects
	 * @memberof AbnormalityPrediction
	 */
	removeAll() {
		for (let id in this.myAbnormals) {
			clearTimeout(this.myAbnormals[id].removeTimer);
			this.remove(id);
		}
	}

	/**
	 * @description internal
	 * @param {any} id 
	 * @param {any} duration 
	 * @memberof AbnormalityPrediction
	 */
	_add(id, duration) {
		if (!this.myAbnormals[id]) this.myAbnormals[id] = {};
		clearTimeout(this.myAbnormals[id].endTimer);

		this.myAbnormals[id].removeTimer = false;
		this.myAbnormals[id].status = "normal";

		this.myAbnormals[id].endTimer = duration >= 0x7fffffff ? true : setTimeout(() => {
			this.remove(id);
		}, duration);
	}

	/**
	 * @description internal
	 * @param {any} id 
	 * @memberof AbnormalityPrediction
	 */
	_remove(id) {
		if (this.myAbnormals[id]) {
			clearTimeout(this.myAbnormals[id].endTimer);
			delete this.myAbnormals[id];
		}
	}
}

let map = new WeakMap();

module.exports = function Require(dispatch) {
	if (map.has(dispatch.base)) return map.get(dispatch.base);

	let abn = new AbnormalityPrediction(dispatch);
	map.set(dispatch.base, abn);
	return abn;
};