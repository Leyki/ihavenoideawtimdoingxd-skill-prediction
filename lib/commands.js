const Command = require("command");
const AutoConfig = require("./autoconfig");
const Ping = require("./ping");
const state = require("./state");

class Cmds {
	constructor(dispatch) {
		const command = Command(dispatch);
		const autoconf = AutoConfig(dispatch);
		const ping = Ping(dispatch);

		//Commands
		command.add("sp", {
            info() {
				command.message("Unofficial SP. Date:03/07/18");
				//command.message(`Class=${me.job}, race=${me.race}`);
				command.message(`Config: timeout: ${state.config.serverTimeout}, retries: ${state.config.skillRetryCount}, jitter comp: ${state.config.jitterCompensation}, RetryMs: ${state.config.skillRetryMs}`);
			},
            config: {
                generate() {
					if (ping.history.length === state.config.pingHistoryMax) {
						command.message("Gathering information ... Please wait ...");
						let returnedConfig = autoconf.Analyze(Object.assign({}, state.config), ping.min, ping.avg, ping.max);
						if (!returnedConfig) {
							command.message("Try to repeat this command after 2-3min.");
							break;
						}
						command.message("The configuration in memory has been overwritten.");
						state.config = returnedConfig;
						command.message("You can test changes and use command /8 sp config save for saving the configuration just created.");
					} else {
						command.message("Not enough measurements for ping. Try to repeat command a bit later.");
					}
                },
				help() {
					command.message("All info in /docs folder :)");
                },
				print() {
					command.message("Current config:");
					for (let [key, value] of Object.entries(state.config))
						command.message(`${key}:${value}`);
				},
				reset() {
					state.ResetConfig();
					command.message("Default configuration file loaded.");
					command.message("You can test changes and use command /8 sp config save for saving the changes.");
				},
				save() {
					state.SaveConfig();
					command.message("Configuration file saved.");
				},
				reload() {
					state.ReloadConfig();
					command.message("Configuration file reloaded.");
                },
            },
			debug() {
				if (state.config.debug)
					command.message("Main Debug mode deactivated.");
				else
					command.message("Main Debug mode activated.");

				state.config.debug = !state.config.debug;
            },
			debugloc() {
				if (state.config.debugLoc)
					command.message("Location debug mode deactivated.");
				else
					command.message("Location debug mode activated.");

				state.config.debugLoc = !state.config.debugLoc;
			},
			debugabnorm() {
				if (state.config.debugAbnormals)
					command.message("Abnormals debug mode deactivated.");
				else
					command.message("Abnormals debug mode activated.");

				state.config.debugAbnormals = !state.config.debugAbnormals;
			},
			strictdef() {
				if (state.config.defendSuccessStrict)
					command.message("DEFEND_SUCCESS_STRICT deactivated.");
				else
					command.message("DEFEND_SUCCESS_STRICT activated.");

				state.config.defendSuccessStrict = !state.config.defendSuccessStrict;
			},
			off() {
				if (state.config.enabled) {
					command.message("Skill emulation Disabled.");
					state.SwitchEnableStateWithEvent();
				} else {
					command.message("Skill emulation already Disabled.");
				}
            },
			on() {
				if (!state.config.enabled) {
					state.SwitchEnableStateWithEvent();
					command.message("Skill emulation Enabled.");
				} else {
					command.message("Skill emulation already Enabled");
				}
            },
			jittercomp() {
				if (state.config.jitterCompensation) {
					command.message("jitterCompensation Disabled.");
				} else {
					command.message("jitterCompensation Enabled");
				}
				state.config.jitterCompensation = !state.config.jitterCompensation;
			},
			ping: {
                log() {
					command.message("Ping history:");
					for (let entry of ping.history)
						command.message(`${entry}`);
                },
				$default() {
					command.message(`Ping: Min=${ping.min} Avg=${Math.floor(ping.avg)} Max=${ping.max} Variance=${ping.max - ping.min} Samples=${ping.history.length}`);
				},
            },
			$default() {
				command.message("Invalid command.");
			},
		}, this);
	}
}
let map = new WeakMap();

module.exports = function Require(dispatch) {
	if (map.has(dispatch.base)) return map.get(dispatch.base);

	let cmd = new Cmds(dispatch);
	map.set(dispatch.base, cmd);
	return cmd;
};
