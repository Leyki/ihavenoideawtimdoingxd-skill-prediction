const Ping = require('./ping'),
abnormals = require('./config/abnormalities')

class AbnormalityPrediction {
constructor(dispatch) {
	this.dispatch = dispatch
	this.DEBUG = false
	this.ping = Ping(dispatch)
	this.enabled = true
	this.cid = null
	this.myAbnormals = {}

	dispatch.hook('S_LOGIN', 1, event => { this.cid = event.cid })

	dispatch.hook('S_RETURN_TO_LOBBY', 1, () => { this.removeAll() })

	dispatch.hook('S_CREATURE_LIFE', 1, event => {
		if(event.target.equals(this.cid) && !event.alive) this.removeAll()
	})

	let abnormalityUpdate = (type, event) => {
		if(event.target.equals(this.cid)) {
			if(this.DEBUG) console.log('<-', type, event.id, event.duration, event.stacks, abnormals[event.id] == true ? 'X' : '')

			let info = abnormals[event.id]
			if(info && this.enabled) {
				if(info == true) return false

				if(info.overrides && this.exists(info.overrides)) this.remove(info.overrides)
			}

			if(event.duration != 0x7fffffff) event.duration = Math.max(event.duration - this.ping.min, 0)

			if(type === 'S_ABNORMALITY_BEGIN' === this.exists(event.id)) { // Transform packet type so it will always be valid
				this.add(event.id, event.duration, event.stacks)
				return false
			}

			this._add(event.id, event.duration)
			return true
		}
	}

	dispatch.hook('S_ABNORMALITY_BEGIN', 2, abnormalityUpdate.bind(null, 'S_ABNORMALITY_BEGIN'))
	dispatch.hook('S_ABNORMALITY_REFRESH', 1, abnormalityUpdate.bind(null, 'S_ABNORMALITY_REFRESH'))

	dispatch.hook('S_ABNORMALITY_END', 1, event => {
		if(event.target.equals(this.cid)) {
			if(this.DEBUG) console.log('<- S_ABNORMALITY_END', event.id, abnormals[event.id] == true ? 'X' : '')

			if(abnormals[event.id] == true && this.enabled) return false

			if(!this.myAbnormals[event.id]) return false

			this._remove(event.id)
		}
	})
}

exists(id) {
	return !!this.myAbnormals[id]
}

inMap(map) {
	for(let id in this.myAbnormals)
		if(map[id]) return true
	return false
}

add(id, duration, stacks) {
	let type = this.myAbnormals[id] ? 'S_ABNORMALITY_REFRESH' : 'S_ABNORMALITY_BEGIN',
		version = this.myAbnormals[id] ? 1 : 2

	if(this.DEBUG) console.log('<*', type, id, duration, stacks)

	this.dispatch.toClient(type, version, {
		target: this.cid,
		source: this.cid,
		id,
		duration,
		unk: 0,
		stacks,
		unk2: 0
	})

	this._add(id, duration)
}

remove(id) {
	if(!this.exists(id)) return

	if(this.DEBUG) console.log('<* S_ABNORMALITY_END', id)

	this.dispatch.toClient('S_ABNORMALITY_END', 1, {
		target: this.cid,
		id
	})

	this._remove(id)
}

removeAll() {
	for(let id in this.myAbnormals) this.remove(id)
}

_add(id, duration) {
	clearTimeout(this.myAbnormals[id])
	this.myAbnormals[id] = duration >= 0x7fffffff ? true : setTimeout(() => { this.remove(id) }, duration)
}

_remove(id) {
	clearTimeout(this.myAbnormals[id])
	delete this.myAbnormals[id]
}
}

let map = new WeakMap()

module.exports = function Require(dispatch) {
if(map.has(dispatch.base)) return map.get(dispatch.base)

let ping = new AbnormalityPrediction(dispatch)
map.set(dispatch.base, ping)
return ping
}