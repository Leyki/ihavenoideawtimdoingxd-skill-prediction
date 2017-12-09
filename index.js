const CHECK_COMPATABILITY = true

let error = false

if(CHECK_COMPATABILITY){
	try {
		require('command')
		
	}
	catch(e){
		error = true
		console.error('ERROR: Skill Prediction require "Commands" module for work')
	}
	for(let mod of ['cooldowns', 'lockons', 'lockons-master', 'fastfire', 'fast-fire', 'fast-fire-master', 'fast-block'])
		try {
			require(mod)
			console.error('ERROR: Skill Prediction is not compatible with the obsolete mod "' + mod + '", please remove it and try again.')
			console.error('**For advanced users only**: To disable compatability checking, edit index.js and set CHECK_COMPATABILITY to false')
			error = true
			break
		}
		catch(e) {}
}

const sysmsg = require('tera-data-parser').sysmsg,
	MODS = [
		require('./lib/core'),
		require('./lib/cooldowns')
	]

module.exports = function SkillPredictionCore(dispatch) {
	if(error) return

	dispatch.hook('C_CHECK_VERSION', 1, () => {
		if(!sysmsg.maps.get(dispatch.base.protocolVersion) || sysmsg.maps.get(dispatch.base.protocolVersion).name.size === 0) {
			console.error('ERROR: Your version of tera-proxy is too old to run Skill Prediction')
			process.exit()
		}
	})

	for(let mod of MODS) mod(dispatch)
}