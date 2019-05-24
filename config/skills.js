/*	Notes:
	* '*' can be used in place of the skill or sub-skill to set default values

	Races:
	0 = Male Human
	1 = Female Human
	2 = Male High Elf
	3 = Female High Elf
	4 = Male Aman
	5 = Female Aman
	6 = Male Castanic
	7 = Female Castanic
	8 = Popori
	9 = Elin
	10 = Baraka
*/

module.exports = {
	'*': { // All-class
		9010100: true, // Racial teleport
		9020100: { fixedSpeed: true }, // Racial buff 1
		9030100: { fixedSpeed: true }, // Racial buff 2
		9100100: { fixedSpeed: true } // Apex Urgency
	},
	0: { // Warrior
		"*": { consumeAbnormal: 104110 },
		1: { // Combo Attack
			"*": { noInterrupt: [1] },
			0: true,
			1: true,
			2: true,
			3: true
		},
		2: { // Evasive Roll
			0: {
				forceClip: true,
				stamina: 500,
				instantStamina: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		3: { // Torrent of Blows
			0: true
		},
		4: { // Rain of Blows
			0: {
				noInterrupt: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 16, 17, 19, 22, 23, 28, 29, 30, 31, 34, 35, 36, 37, 38, 39, 41, 42],
				categoryChains: { 550: 30 }
			},
			30: true
		},
		5: { // Battle Cry
			0: true
		},
		8: { // Assault Stance
			0: {
				stamina: 1000,
				abnormals: { 102500: { disableSkill: true } }
			},
			50: true
		},
		9: { // Defensive Stance
			0: { stamina: 1000 },
			50: true
		},
		10: { // Death From Above
			0: { noInterrupt: [2, 10] }
		},
		11: { // Poison Blade
			0: true
		},
		12: { // Leaping Strike
			0: true
		},
		13: { // Retaliate
			0: { noRetry: true }
		},
		16: { // Charging Slash
			'*': { noInterrupt: [2, 10, 22, 29, 30, 32, 37, 38, 40, 41] },
			0: {
				fixedSpeed: true,
				length: 1100,
				distance: 467.88,
				noRetry: true
			},
			1: true
		},
		17: { // Vortex Slash
			0: true,
			1: true,
			2: true
		},
		18: { // Combative Strike
			'*': { noInterrupt: [32] },
			0: true,
			1: true,
			2: true
		},
		19: { // Rising Fury
			"*": { noInterrupt: [19] },
			0: true,
			1: true
		},
		20: { // Deadly Gamble
			0: {
				fixedSpeed: true,
				cooldownEnd: 300
			}
		},
		21: { // Cascade of Stuns
			0: true
		},
		22: { // Backstab
			0: {
				distance: 0,
				onlyTarget: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		23: { // Spinning Counter
			0: { requiredBuff: 100700 }
		},
		24: { // Smoke Aggressor
			0: { fixedSpeed: true }
		},
		25: { // Command: Attack
			0: {
				fixedSpeed: true,
				requiredBuff: 102600
			}
		},
		26: { // Command: Follow
			0: {
				fixedSpeed: true,
				requiredBuff: 102600
			}
		},
		28: { // Traverse Cut
			'*': {
				noInterrupt: [1, 2, 3, 4, 8, 9, 10, 13, 16, 17, 19, 21, 22, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39, 41, 42],
				hasChains: true
			},
			0: {
				categoryChains: {
					1011: 30,
					1012: 30,
					1018: 30,
					1040: 30
				}
			},
			30: true
		},
		29: { // Blade Draw
			'*': { hasChains: true },
			0: {
				noInterrupt: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, '16-0', 18, '19-0', 21, 22, 23, 27, 29, 30, 34, 35, 36, 37, 38, 41, 42],
				interruptibleWithAbnormal: { 102010: 3 },
				categoryChains: {
					1032: 30,
					550: 30
				}
			},
			30: true
		},
		30: { // Scythe
			'*': { hasChains: true },
			0: {
				noInterrupt: [1, 3, 5, 8, 9, 10, 13, 16, 17, 18, 19, 21, 22, 23, 27, 28, 30, 31, 34, 35, 38, 39, 41, 42],
				categoryChains: {
					1002: 30,
					1004: 30,
					1011: 30,
					1012: 30,
					1029: 30,
					1040: 30
				}
			},
			30: true
		},
		31: { // Reaping Slash
			'*': {
				noInterrupt: [1, 2, 3, 5, 8, 9, 10, 11, 12, 13, 16, 17, 19, 21, 22, 23, 27, 28, 29, 30, 33, 34, 35, 37, 38, 39, 41, 42],
				hasChains: true
			},
			0: { categoryChains: { 550: 30 } },
			30: true
		},
		32: { // Cross Parry
			0: {
				fixedSpeed: true,
				requiredBuff: [100200, 100201],
				stamina: 50
			}
		},
		34: { // Binding Sword
			0: { noInterrupt: [1, 2, 3, 4, 5, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 28, 29, 30, 31, 33, 35, 36, 37, 38, 39, 41, 42] }
		},
		35: { // Infuriate
			0: { requiredBuff: [100200, 100201] }
		},
		36: { // Rain of Blows (Deadly Gamble)
			'*': { hasChains: true },
			0: { categoryChains: { 550: 30 } },
			30: true
		},
		37: { // Blade Draw (Deadly Gamble)
			'*': { hasChains: true },
			0: {
				categoryChains: {
					1032: 30,
					550: 30
				}
			},
			30: true
		},
		38: { // Scythe (Deadly Gamble)
			'*': { hasChains: true },
			0: {
				categoryChains: {
					1002: 30,
					1004: 30,
					1011: 30,
					1012: 30,
					1029: 30,
					1040: 30
				}
			},
			30: true
		},
		39: { // Traverse Cut (Defensive Stance)
			'*': { hasChains: true },
			0: {
				categoryChains: {
					1011: 30,
					1012: 30,
					1018: 30,
					1040: 30
				}
			},
			30: true
		},
		40: { // Blade Waltz
			'*': {
				noInterrupt: ['41-0', '41-30', 42],
				abnormals: { 104101: { disableSkill: true } },
				hasChains: true,
				longRetry: true
			},
			10: {
				triggerAbnormal: { 104101: 800 },
				categoryChains: { 560: 11 },
				noRetry: true
			},
			11: { triggerAbnormal: { 104101: 800 } },
			12: true,
			20: {
				triggerAbnormal: { 104101: 800 },
				categoryChains: { 560: 21 },
				noRetry: true
			},
			21: { triggerAbnormal: { 104101: 800 } },
			22: true
		},
		41: { // Aerial Scythe
			'*': {
				noInterrupt: [42],
				hasChains: true,
				noRetry: true
			},
			0: {
				triggerAbnormal: { 105100: 1800 },
				categoryChains: { 560: 30 }
			},
			30: { triggerAbnormal: { 105100: 1800 } },
			31: { consumeAbnormal: 105100 }
		},
		42: { // Blade Frenzy
			'*': {
				noInterrupt: [1, 3, 4, 5, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 21, 22, 23, 28, 29, 31, 33, 34, 35, 36, 37, 39, 40, '41-0', '41-30', 42],
				hasChains: true
			},
			0: {
				categoryChains: {
					1002: 30,
					1030: 30,
					2041: 30
				}
			},
			30: true
		}
	},
	1: { // Lancer
		1: { // Combo Attack
			'*': { noInterrupt: [1, 2] },
			0: true,
			1: true,
			2: true
		},
		2: { // Stand Fast
			'*': {
				fixedSpeed: true,
				stamina: 50,
				level: {
					1: { stamina: 40 }
				},
				noRetry: true
			},
			0: true,
			30: true,
			40: { stamina: 37 }
		},
		3: { // Onslaught
			'*': {
				noInterrupt: [2, 3, 4, 9, 8, 10, 11, 12, 13, 15, 21, 23, 24, 25, 26, 27, 28, 29],
				abnormals: { 22060: { speed: 1.25 } }
			},
			0: {
				chains: {
					1: 30,
					5: 30,
					18: 30
				}
			},
			30: true
		},
		4: { // Challenging Shout
			'*': { noInterrupt: [4, 9, 12, 23, 24, 26] },
			0: {
				chains: {
					1: 30,
					3: 30,
					5: 30,
					8: 30,
					10: 30,
					13: 30,
					15: 30,
					18: 30,
					21: 30,
					25: 30,
					28: 30
				}
			},
			30: true
		},
		5: { // Shield Bash
			1: true,
			2: {
				chains: { 10: 30 }
			},
			30: true
		},
		7: { // Guardian Shout
			0: true
		},
		8: { // Shield Counter
			0: { onlyDefenceSuccess: true }
		},
		9: { // Leash
			0: true
		},
		10: { // Debilitate
			'*': { noInterrupt: [3, 4, 5, 8, 9, 10, 11, 12, 13, 15, 21, 23, 24, 25, 26, 27, 28, 29] },
			0: {
				chains: {
					1: 30,
					18: 30
				}
			},
			30: true
		},
		11: { // Retaliate
			0: { noRetry: true }
		},
		12: { // Infuriate
			0: true
		},
		13: { // Spring Attack
			"*": {
				triggerAbnormal: { 201831: 2000 },
				consumeAbnormalEnd: 201831
			},
			0: {
				noInterrupt: ["1-0", "1-1", 3, 4, 9, 11, 12, 13, 15, 23, 24, 25, 26, 27, 28, 29],
				chains: {
					1: 30,
					5: 30,
					8: 30,
					10: 30,
					18: 30,
					21: 30
				}
			},
			30: true
		},
		15: { // Charging Lunge
			0: {
				fixedSpeed: true,
				length: 1125,
				distance: 474.5,
				noInterrupt: [15]
			},
			1: { noInterrupt: [2, "15-1", 25, 28] }
		},
		16: { // Second Wind
			0: { fixedSpeed: true }
		},
		17: { // Adrenaline Rush
			0: { fixedSpeed: true }
		},
		18: { // Shield Barrage
			"*": {
				triggerAbnormal: { 201831: 2000 },
				consumeAbnormalEnd: 201831,
				noInterrupt: [18]
			},
			0: {
				abnormals: {
					201550: { speed: 1.2 }
				}
			},
			1: true
		},
		19: { // Pledge of Protection
			0: { fixedSpeed: true }
		},
		21: { // Lockdown Blow
			1: true,
			2: {
				chains: {
					10: 30,
					13: 30,
					18: 30
				}
			},
			30: true
		},
		22: { // Iron Will
			0: { fixedSpeed: true }
		},
		23: { // Master's Leash
			0: { requiredBuff: 201000 }
		},
		24: { // Chained Leash
			1: true,
			2: true
		},
		25: { // Wallop
			0: {
				noInterrupt: [1, 3, 4, 5, 9, 11, 12, 23, 24, 25, 26, 27, 28, 29],
				chains: {
					8: 30,
					10: 30,
					13: 30,
					15: 30,
					18: 30,
					21: 30
				}
			},
			30: true
		},
		26: { // Backstep
			0: {
				moveDir: 1,
				forceClip: true,
				stamina: 800,
				instantStamina: true,
				noInterrupt: [26],
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		27: { // Rallying Cry
			0: true
		},
		28: { // Super Leap
			0: {
				noInterrupt: [1, 3, 4, 5, 8, 9, 10, 12, 13, 18, 21, 23, 24, 26, 28, 29],
				forceClip: true,
				chains: {
					15: 1,
					25: 1
				}
			},
			1: true
		},
		29: { // Guardian's Barrier
			0: {
				fixedSpeed: true,
				noRetry: true
			}
		},
		30: { // Divine Protection
			0: true
		}
	},
	2: { // Slayer
		1: { // Combo Attack
			'*': { noInterrupt: [1], noRetry: true },
			0: true,
			1: true,
			2: true,
			3: true
		},
		2: { // Knockdown Strike
			'*': { abnormals: { 23070: { speed: 1.25 } } },
			1: true,
			2: { 
				noInterrupt: [1, 2, 3, 4, 6, 8, 9, 10, 12, 13, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 28],
				chains: { 14: 30, 27: 30 }
			},
			30: true
		},
		3: { // Whirlwind
			'*': { abnormals: { 23080: { speed: 1.25 } } },
			0: true,
			1: true,
			2: { 
				chains: {
					2: 30,
					4: 30,
					8: 30,
					12: 30,
					23: 30,
					24: 30,
					26: 30,
					27: 30,
					28: 30
				}
			},
			30: { requiredBuff: 301604 }
		},
		4: { // Evasive Roll
			'*': {
				noInterrupt: [4],
				forceClip: true,
				hasChains: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			},
			0: { abnormalChains: { 40300: 30 } },
			30: true
		},
		5: { // Dash
			0: { 
				fixedSpeed: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		6: { // Backstab
			0: {
				distance: 0,
				onlyTarget: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		/*
		8: { // Overhand Strike
			'*': { hasChains: true },
			0: {
				noInterrupt: ['1-0', '1-1', '1-2', 4, 6, 8, 10, '14-0', '14-1', 17, 25],
				chains: {
					1: 30,
					2: 30,
					3: 30,
					9: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					24: 30,
					27: 30 // Workaround - TODO: Emulate abnormal 301604
				}
			},
			30: true
		},
		*/
		9: { // Leaping Strike
			0: true
		},
		10: { // Retaliate
			0: { noRetry: true }
		},
		12: { // Heart Thrust
			'*': {
				abnormals: {
					23060: { speed: 1.25 },
					23061: { speed: 1.35 }
				}
			},
			0: true,
			1: true,
			2: { 
				chains: {
					2: 30,
					3: 30,
					4: 30,
					8: 30,
					12: 30,
					23: 30,
					24: 30,
					26: 30,
					27: 30,
					28: 30
				}
			},
			30: { requiredBuff: 301604 }
		},
		13: { // Stunning Backhand
			0: true
		},
		14: { // Distant Blade
			'*': {
				triggerAbnormal: { 23220: 2000 },
				consumeAbnormalEnd: 23220
			},
			0: true,
			1: true,
			2: true
		},
		15: { // Startling Kick
			0: {
				moveDir: 1,
				forceClip: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		16: { // Fury Strike
			0: true
		},
		17: { // Headlong Rush
			0: {
				fixedSpeed: true,
				length: 1000,
				distance: 413,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		18: { // Overpower
			"*": { noInterrupt: [1, 2, 3, 4, 6, 8, 9, 12, 13, 14, 15, 16, 17, 18, 21, 23, 24, 25, 26, 27, 28] },
			0: true,
			50: true
		},
		19: { // Tenacity
			0: { fixedSpeed: true }
		},
		20: { // In Cold Blood
			0: {
				fixedSpeed: true,
				triggerAbnormal: { 23220: 2000 },
				consumeAbnormalEnd: 23220
			 }
		},
		21: { // Exhausting Blow
			0: true
		},
		23: { // Measured Slice
			'*': { hasChains: true },
			0: {
				noInterrupt: [1, 2, 3, 4, 6, 9, 12, 13, 15, 17, 22, 23],
				categoryChains: {
					3008: 30,
					3024: 30,
					3025: 30,
					3026: 30,
					3027: 30 // Workaround - TODO: Emulate abnormal 301604
				}
			},
			30: true
 		},
		24: { // Eviscerate
			'*': { hasChains: true },
			0: {
				noInterrupt: ['1-0', '1-1', '1-2', 4, 6, 14, 16, 17, 22, 24, 26],
				chains: {
					1: 30,
					2: 30,
					3: 30,
					8: 30,
					9: 30,
					12: 30,
					13: 30,
					15: 30,
					25: 30
				}
			},
			30: true
		},
		26: { // Punishing Blow
			'*': {
				noInterrupt: [1, 2, 3, 4, 6, 9, 10, 12, 13, 14, 15, 16, 17, 21, 22, 26, 28],
				hasChains: true
			},
			0: {
				categoryChains: {
					3023: 30,
					3024: 30,
					3027: 30,
					3099: 30
				}
			},
			30: { consumeAbnormal: 301604 }
		},
		27: { // Savage Strike
			'*': {
				noInterrupt: ['27-31'],
				hasChains: true,
				noRetry: true
			},
			0: {
				triggerAbnormal: {
					301600: 4000,
					301603: 5000
				},
				categoryChains: { 9999: 30 }
			},
			30: { triggerAbnormal: { 301603: 5000 } },
			31: {
				consumeAbnormal: [301600, 301603],
				triggerAbnormal: { 301601: 4000 }
			}
		},
		28: { // Unsheathe
			'*': { noRetry: true },
			0: {
				chargeLevels: [1, 2, 3],
				abnormals: {
					301600: { chargeSpeed: 0.4 },
					301601: { chargeSpeed: 0.6 }
				}
			},
			1: true,
			2: true,
			3: true
		}
	},
	3: { // Berserker
		1: { // Combo Attack
			'*': { noInterrupt: [1], noRetry: true },
			0: true,
			1: true,
			2: true,
			3: true
		},
		2: { // Axe Block
			'*': { consumeAbnormal: 401701 },
			0: true,
			30: true,
			31: { fixedSpeed: true }
		},
		3: { // Thunder Strike
			'*': {
				abnormals: {
					24170: { speed: 1.25 }
				}
			},
			0: {
				noInterrupt: [2],
				overcharge: 450,
				abnormals: {
					24130: { chargeSpeed: 0.3 },
					24170: { speed: 1.25 },
					400500: { chargeSpeed: 0.2 },
					400501: { chargeSpeed: 0.4 },
					400508: { chargeSpeed: 0.4 },
					401150: { chargeSpeed: 0.2 }
				}
			},
			10: { noRetry: true },
			11: { noRetry: true },
			12: { noRetry: true },
			13: { noRetry: true }
		},
		4: { // Flatten
			0: {
				noInterrupt: ['3-10', '3-11', '3-12', '3-13', 4, '10-10', '10-11', '10-12', 11, '10-13', '15-10', '15-11', '15-12', '15-13', '15-14', '18-10', '18-11', '18-12', '18-13', 24, 26, 28, 29, '32-0'],
				chains: {
					6: 30,
					25: 30,
					31: 30,
					32: 30,
					34: 30,
					35: 30,
					36: 30,
					37: 30
				}
			},
			1: {
				chains: {
					6: 31,
					25: 31,
					31: 31,
					32: 31
				}
			},
			30: true,
			31: true
		},
		5: { // Dash
			0: { 
				fixedSpeed: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		6: { // Sweeping Strike
			'*': { noRetry: true },
			0: true,
			30: true
		},
		8: { // Fiery Rage
			1: { fixedSpeed: true },
			30: true
		},
		10: { // Cyclone
			0: {
				overcharge: 365,
				noChargeAbnormalityId: 401701,
				abnormals: {
					24190: { chargeSpeed: 0.3 },
					400500: { chargeSpeed: 0.2 },
					400501: { chargeSpeed: 0.4 },
					400508: { chargeSpeed: 0.4 },					
					401150: { chargeSpeed: 0.2 }
				},
				noRetry: true
			},
			10: { noRetry: true },
			11: { noRetry: true },
			12: { noRetry: true },
			13: true
		},
		11: { // Leaping Strike
			0: true
		},
		13: { // Retaliate
			0: { noRetry: true }
		},
		15: { // Vampiric Blow
			0: {
				noInterrupt: [2],
				releaseChain: {
					overcharge: true,
					chain: 14
				},
				abnormals: {
					400500: { chargeSpeed: 0.2 },
					400501: { chargeSpeed: 0.4 },
					400508: { chargeSpeed: 0.4 },
					401150: { chargeSpeed: 0.2 }
				}
			},
			10: { noRetry: true },
			11: { noRetry: true },
			12: { noRetry: true },
			13: { noRetry: true },
			14: true
		},
		16: { // Fearsome Shout / Titanic Shout
			0: { fixedSpeed: true },
			10: { fixedSpeed: true },
			20: true
		},
		18: { // Lethal Strike
			0: {
				noInterrupt: [1, 4, 6, 13, 18, 24, 25, 26, 27, 28, 29, 31, 34, 35, 36, 37],
				chains: {
					// Correct
					/*3: 30,
					10: 30,
					11: 30,
					15: 30*/

					// Workaround: C_CANCEL_SKILL is not emulated properly for charging skills (TODO)
					'3-10': 30,
					'3-11': 30,
					'3-12': 30,
					'3-13': 30,
					'10-10': 30,
					'10-11': 30,
					'10-12': 30,
					'10-13': 30,
					11: 30,
					'15-10': 30,
					'15-11': 30,
					'15-12': 30,
					'15-13': 30,
					'15-14': 30
				}
			},
			30: true
		},
		19: { // Triumphant Shout
			0: { fixedSpeed: true }
		},
		20: { // Inescapable Doom
			0: { fixedSpeed: true }
		},
		21: { // Bloodlust
			0: { fixedSpeed: true }
		},
		24: { // Evasive Smash
			0: {
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			},
			5: true,
			10: true,
			11: true,
			12: true,
			13: true
		},
		25: { // Raze
			0: {
				noInterrupt: [4, 6, '6-30', 11, '18-10', '18-11', '18-12', '18-13', 24, 26, 28, 29, '32-0'],
				chains: {
					1: 30,
					3: 30,
					10: 30,
					'15-10': 30,
					'15-11': 30,
					'15-12': 30,
					'15-13': 30,
					'15-14': 30,
					30: 30,
					32: 30
				}
			},
			1: {
				chains: {
					1: 31,
					3: 31,
					10: 31,
					'15-10': 31,
					'15-11': 31,
					'15-12': 31,
					'15-13': 31,
					'15-14': 31,
					30: 31,
					32: 31
				}
			},
			30: true,
			31: true
		},
		26: { // Tackle
			0: true
		},
		27: { // Unbreakable
			0: {
				noInterrupt: [1, '3-10', '3-11', '3-12', '3-13', 4, 6, '8-30', '10-10', '10-11', '10-12', '10-13', 11, 13, '15-10', '15-11', '15-12', '15-13', '15-14', 18, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
				interruptibleWithAbnormal: { 401705: 33 }
			},
			30: true
		},
		28: { // Intimiation
			0: true,
			50: true
		},
		29: { // Evasive Roll
			0: {
				noInterrupt: [29],
				forceClip: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		30: { // Axe Counter
			'*': {
				noInterrupt: [1, '3-10', '3-11', '3-12', '3-13', 4, 6, '8-30', '10-10', '10-11', '10-12', '10-13', 11, 12, 13, '15-10', '15-11', '15-12', '15-13', '15-14', '18-10', '18-11', '18-12', '18-13', 24, 25, 26, 27, 28, 29, 30, 31, 32],
				requiredBuff: 401402
			},
			0: true,
			30: true
		},
		31: { // Overwhelm
			0: {
				fixedSpeed: true,
				length: 1115,
				distance: 467.88
			},
			1: { noInterrupt: [2, 4, 10, 25, "31-1"] }
		},
		32: { // Punishing Strike
			"*": { noInterrupt: [32] },
			0: true,
			1: true
		},
		33: { // Unleash
			0: true
		},
		34: { // Unleash: Dexter
			'*': {
				requiredBuff: 401705,
				noRetry: true
			},
			0: {
				noInterrupt: [27, 34, 36],
				chains: {
					33: 30,
					35: 30,
					37: 30
				}
			},
			30: true,
			31: true
		},
		35: { // Unleash: Sinister
			'*': {
				requiredBuff: 401705,
				noRetry: true
			},
			0: {
				noInterrupt: [27, 35, 36, 37],
				chains: {
					33: 1,
					34: 30
				}
			},
			1: true,
			30: true,
			31: true
		},
		36: { // Unleash: Rampage
			'*': {
				requiredBuff: 401705,
				noRetry: true
			},
			0: {
				noInterrupt: [27, 37],
				chains: {
					34: 30,
					35: 30,
					36: 30
				}
			},
			30: true,
			31: true
		},
		37: { // Unleash: Beast Fury
			'*': {
				noInterrupt: [37],
				requiredBuff: 401705
			},
			0: {
				chains: {
					33: 30,
					34: 30,
					35: 30,
					36: 30
				}
			},
			30: true
		}
	},
	4: { // Sorcerer
		1: { // Fireball
			0: true
		},
		2: { // Frost Sphere
			0: true
		},
		3: { // Lightning Trap
			0: {
				abnormals: {
					25090: { speed: 1.4 }
				}
			}
		},
		4: { // Arcane Pulse
			0: {
				abnormals: {
					25140: { chargeSpeed: 0.3 }
				}
			},
			10: { noRetry: true },
			11: { noRetry: true },
			12: { noRetry: true }
		},
		5: { // Mana Infusion
			0: true
		},
		6: { // Meteor Strike
			0: {
				abnormals: {
					25100: { speed: 1.25 }
				}
			}
		},
		7: { // Backstep
			0: {
				moveDir: 1,
				forceClip: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		8: { // Flame Pillar
			0: {
				abnormals: {
					25070: { speed: 1.25 }
				}
			}
		},
		10: { // Mana Barrier
			0: true
		},
		11: { // Lightning Strike
			0: { checkReset: true }
		},
		12: { // Void Pulse
			0: true
		},
		13: { // Mindblast
			0: {
				abnormals: {
					25110: { speed: 1.4 }
				}
			}
		},
		14: { // Retaliate
			0: { noRetry: true }
		},
		16: { // Painblast
			0: true
		},
		17: { // Painful Trap
			0: true
		},
		18: { // Glacial Retreat
			0: {
				moveDir: 1,
				forceClip: true
			}
		},
		19: { // Mana Siphon
			0: { autoRelease: 0 },
			10: { noRetry: true },
			11: { noRetry: true },
			12: { noRetry: true }
		},
		20: { // Flaming Barrage
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: true
			},
			10: {
				type: 'lockonCast',
				abnormals: {
					25060: { speed: 1.25 }
				}
			}
		},
		21: { // Nerve Exhaustion
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: true
			},
			10: {
				type: 'lockonCast',
				fixedSpeed: true
			}
		},
		22: { // Burning Breath
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: true
			},
			10: {
				type: 'lockonCast',
				fixedSpeed: true
			}
		},
		23: { // Mana Volley
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: true
			},
			10: {
				type: 'lockonCast',
				fixedSpeed: true
			}
		},
		25: { // Time Gyre
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: true
			},
			10: {
				type: 'lockonCast',
				fixedSpeed: true
			}
		},
		26: { // Teleport Jaunt
			0: {
				noInterrupt: [26],
				cooldownEnd: 300,
				noRetry: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		27: { // Hailstorm
			0: true
		},
		30: { // Nova
			0: true
		},
		31: { // Warp Barrier
			10: true,
			20: true
		},
		32: { // Meteor Strike (Mana Boost)
			'*': { noRetry: true },
			0: true,
			50: true
		},
		33: { // Arcane Pulse (Mana Boost)
			'*': { noRetry: true },
			10: true,
			11: true,
			12: true,
			50: true
		},
		34: { // Mana Boost
			0: true
		},
		36: { // Fusion
			'*': { noInterrupt: [6, 20, 36, 30, 32] },
			0: true,
			//20: true, // TODO: Needs S_SKILL_CATEGORY implementation (always disabled - non-critical)
			30: true
		},
		39: { // Implosion
			0: {
				requiredBuff: 502052,
				distance: [0, 0, -219.55]
			}
		}
	},
	5: { // Archer
		1: { // Arrow
			0: true
		},
		2: { // Arrow Volley
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: true
			},
			10: { type: 'lockonCast' }
		},
		3: { // Radiant Arrow
			'*': {
				moveDir: 1,
				abnormals: {
					26180: { chargeSpeed: 0.3 },
					601450: { chargeSpeed: 0.5 },
					602108: { speed: 1.3 }
				}
			},
			0: true,
			10: { noRetry: true },
			11: { noRetry: true },
			12: { noRetry: true },
			13: { noRetry: true }
		},
		4: { // Penetrating Arrow
			'*': {
				moveDir: 1,
				abnormals: {
					26160: { chargeSpeed: 0.3 },
					26170: { chargeSpeed: 0.3 },
					26171: { chargeSpeed: 0.4 },
					26190: { chargeSpeed: 0.3 },
					601450: { chargeSpeed: 0.5 },
					602108: { speed: 1.3 }
				}
			},
			0: true,
			10: { noRetry: true },
			11: { noRetry: true },
			12: { noRetry: true },
			13: { noRetry: true }
		},
		5: { // Rain of Arrows
			0: {
				abnormals: {
					902: { speed: 1.15 },
					911: { speed: 1.15 },
					912: { speed: 1.15 },
					913: { speed: 1.15 },
					916: { speed: 1.15 },
					917: { speed: 1.15 },
					920: { speed: 1.225 },
					921: { speed: 1.225 },
					922: { speed: 1.225 },
					999010000: { speed: 1.15 }
				}
			}
		},
		6: { // Backstep
			0: {
				moveDir: 1,
				forceClip: true,
				stamina: 180,
				instantStamina: true,
				noInterrupt: [6],
				noRetry: true
			}
		},
		7: { // Feign Death
			0: {
				fixedSpeed: true,
				moveDir: 1,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		8: { // Rapid Fire
			'*': { noRetry: true },
			0: { noInterrupt: [6] },
			1: {
				level: {
					5: { noInterrupt: [6] }
				}
			},
			2: true,
			3: true,
			4: true,
			5: true,
			6: true,
			7: true,
			11: true,
			12: true,
			13: true,
			14: true
		},
		9: { // Slow Trap
			0: true
		},
		10: { // Stunning Trap
			0: true
		},
		12: { // Velik's Mark
			0: true
		},
		14: { // Retaliate
			0: { noRetry: true }
		},
		15: { // Incendiary Trap
			0: true
		},
		16: { // Breakaway Bolt
			0: {
				moveDir: 1,
				forceClip: true
			}
		},
		17: { // Web Arrow
			0: true
		},
		18: { // Close Quarters
			"*": { noInterrupt: [18] },
			0: true,
			1: true
		},
		19: { // Poison Arrow
			0: true
		},
		20: { // Restraining Arrow
			0: true
		},
		22: { // Sequential Fire
			0: {
				noInterrupt: [22],
				requiredBuff: 600200,
				noRetry: true
			}
		},
		25: { // Incendiary Trap Arrow
			0: true
		},
		29: { // Thunderbolt
			0: {
				moveDir: 1,
				abnormals: { 602108: { speed: 1.3 } }
			}
		},
		31: { // Tenacity
			0: { fixedSpeed: true }
		},
		32: { // Find Weakness
			0: true
		},
		33: { // Chase
			0: {
				fixedSpeed: true,
				length: 1000,
				distance: 413,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		34: { // Wind Walk
			'*': {
				noInterrupt: [34],
				stamina: 150,
				instantStamina: true,
				abnormals: { 602107: { stamina: -30 } },
				noRetry: true
			},
			0: {
				inPlace: {
					movement: [{
						duration: 766,
						speed: 1,
						unk: 1,
						distance: 0
					}],
					distance: 0
				}
			},
			10: true,
			20: { moveDir: -0.5 },
			30: { moveDir: -0.25 },
			40: { moveDir: -0.75 },
			50: { moveDir: 0.5 },
			60: { moveDir: 0.25 },
			70: { moveDir: 0.75 },
			80: { moveDir: 1 }
		},
		35: { // Windsong
			0: true
		},
		36: { // Gust Arrow
			'*': {
				abnormals: { 601450: { chargeSpeed: 0.5 } }
			},
			0: {
				chargeLevels: [null, 360213],
				autoRelease: 10
			},
			13: { noRetry: true }
		}
	},
	6: { // Priest
		1: { // Divine Radiance
			"*": { noInterrupt: [1] },
			0: true,
			1: true,
			2: true,
			3: true
		},
		2: { // Regeneration Circle
			0: {
				abnormals: {
					902: { speed: 1.15 },
					911: { speed: 1.15 },
					912: { speed: 1.15 },
					913: { speed: 1.15 },
					916: { speed: 1.15 },
					917: { speed: 1.15 },
					920: { speed: 1.225 },
					921: { speed: 1.225 },
					922: { speed: 1.225 },
					999010000: { speed: 1.15 },
					805800: { disableSkill: true }
				}
			}
		},
		3: { // Healing Circle
			0: {
				abnormals: { 805800: { disableSkill: true } },
				noInterrupt: [2, 3, 5, 10, 12, 11, 14, 16, 18, 25, 27, 28, "30-10", "33-10", 34, "35-10", "37-10", "41-10", 42],
				chains: {
					"19-30": 30,
					26: 30,
					38: 30
				}
			},
			30: true
		},
		5: { // Blessing of Shakan
			0: true
		},
		6: { // Arise
			0: true
		},
		8: { // Mana Infusion
			0: { abnormals: { 805800: { disableSkill: true } } }
		},
		10: { // Purifying Circle
			0: true
		},
		11: { // Metamorphic Blast
			0: true,
			1: true,
			2: true
		},
		12: { // Resurrect
			0: {
				abnormals: {
					902: { speed: 1.15 },
					910: { speed: 1.15 },
					911: { speed: 1.15 },
					912: { speed: 1.15 },
					913: { speed: 1.15 },
					916: { speed: 1.15 },
					917: { speed: 1.15 },
					920: { speed: 1.225 },
					921: { speed: 1.225 },
					922: { speed: 1.225 },
					929: { speed: 1.225 },
					5010009: { speed: 1.15 },
					999010000: { speed: 1.15 }
				}
			}
		},
		14: { // Summon: Group
			0: true
		},
		16: { // Shocking Implosion
			"*": { noInterrupt: [2, 3, 5, 10, 12, 14, 16, 18, "19-10", 25, 26, 28, 29, "30-10", "33-10", 34, "35-10", "37-10", 38, 40, "41-10", 42] },
			0: {
				chains: {
					11: 30,
					27: 30
				}
			},
			10: {
				chains: {
					11: 11,
					27: 11
				}
			},
			11: true,
			20: {
				chains: {
					11: 21,
					27: 21
				}
			},
			21: true,
			30: true
		},
		18: { // Heal Thyself
			0: { abnormals: { 805800: { disableSkill: true } } }
		},
		19: { // Focus Heal
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: true,
				abnormals: { 805800: { disableSkill: true } }
			},
			10: { type: 'lockonCast' }
		},
		22: { // Kaia's Shield
			0: { abnormals: { 805800: { disableSkill: true } } }
		},
		25: { // Retaliate
			0: { noRetry: true }
		},
		26: { // Fiery Escape
			0: {
				noInterrupt: [26, "28-10", "28-11", "28-12", "28-13", 34, 38],
				moveDir: 1,
				noInterrupt: [26, 38],
				forceClip: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		27: { // Final Reprisal
			'*': { noInterrupt: [2, 3, 5, 10, 12, 14, 18, "19-10", 25, 26, 27, 28, "30-10", "33-10", 34, "35-10", "37-10", 38, "41-10", 42] },
			0: {
				chains: {
					11: 30,
					16: 30,
					29: 30,
					40: 30
				}
			},
			10: {
				chains: {
					11: 11,
					16: 11,
					29: 11,
					40: 11
				}
			},
			11: true,
			20: {
				chains: {
					11: 21,
					16: 21,
					29: 21,
					40: 21
				}
			},
			21: true,
			30: true
		},
		28: { // Mana Charge / Divine Charge
			0: true,
			10: { noRetry: true },
			11: { noRetry: true },
			12: { noRetry: true },
			13: { noRetry: true }
		},
		29: { // Triple Nemesis
			0: true,
			1: true,
			2: true
		},
		30: { // Plague of Exhaustion
			'*': {
				fixedSpeed: true,
				noRetry: true
			},
			0: { type: 'lockon' },
			10: { type: 'lockonCast' }
		},
		31: { // Guardian Sanctuary
			0: { fixedSpeed: true, abnormals: { 805800: { disableSkill: true } } }
		},
		32: { // Divine Prayer
			0: { fixedSpeed: true, abnormals: { 805800: { disableSkill: true } } }
		},
		33: { // Ishara's Lulliby
			'*': {
				fixedSpeed: true,
				noRetry: true
			},
			0: { type: 'lockon' },
			10: { type: 'lockonCast' }
		},
		34: { // Restorative Burst
			0: true
		},
		35: { // Energy Stars
			'*': {
				fixedSpeed: true,
				noRetry: true
			},
			0: { type: 'lockon' },
			10: { type: 'lockonCast' }
		},
		37: { // Healing Immersion
			'*': {
				fixedSpeed: true,
				noRetry: true,
				abnormals: { 805800: { disableSkill: true } }
			},
			0: {
				type: 'lockon',
				noInterrupt: [37],
				partyOnly: true
			},
			10: {
				type: 'lockonCast',
				noInterrupt: ['37-10']
			}
		},
		38: { // Backstep
			0: {
				moveDir: 1,
				noInterrupt: [26, 38],
				forceClip: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		39: { // Grace of Resurrection
			0: true
		},
		40: { // Zenobia's Vortex
			0: true,
			10: true,
			20: true
		},
		41: { // Divine Intervention / Mass Divine Intervention
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: true,
				abnormals: { 805800: { disableSkill: true } },
				partyOnly: true
			},
			10: { type: 'lockonCast' }
		},
		42: { // Holy Burst
			20: true,
			30: true
		},
		43: { // Edict of Judgement
			0: true,
			50: true
		}
	},
	7: { // Mystic
		1: { // Sharan Bolt
			0: true,
			1: true,
			2: true,
			3: true
		},
		2: { // Corruption Ring
			0: { cancelChain: 11 },
			11: true,
			12: true
		},
		5: { // Titanic Favor
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: true
			},
			10: { type: 'lockonCast' }
		},
		6: { // Shara's Lash
			0: true
		},
		8: { // Metamorphic Blast
			0: {
				noInterrupt: [1, 2, 6, 17],
				checkReset: true,
				chains: {
					8: 30,
					23: 30
				}
			},
			30: true
		},
		9: { // Arun's Cleansing
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: true
			},
			10: { type: 'lockonCast' }
		},
		10: { // Resurrect
			0: {
				abnormals: {
					902: { speed: 1.25 },
					910: { speed: 1.25 },
					911: { speed: 1.25 },
					912: { speed: 1.25 },
					913: { speed: 1.25 },
					916: { speed: 1.25 },
					917: { speed: 1.25 },
					920: { speed: 1.375 },
					921: { speed: 1.375 },
					922: { speed: 1.375 },
					929: { speed: 1.375 },
					5010009: { speed: 1.25 },
					999010000: { speed: 1.375 }
				}
			}
		},
		11: { // Summon: Group
			0: true
		},
		12: { // Vow of Rebirth
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: true,
				partyOnly: true
			},
			10: { type: 'lockonCast' }
		},
		13: { // Aura of the Merciless
			0: true,
			50: true
		},
		14: { // Aura of the Swift
			0: true,
			50: true
		},
		15: { // Aura of the Unyielding
			0: true,
			50: true
		},
		16: { // Aura of the Tenacious
			0: true,
			50: true
		},
		17: { // Teleport Jaunt
			0: {
				noInterrupt: [17],
				cooldownEnd: 300,
				noRetry: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		18: { // Arun's Vitae
			0: {
				chargeLevels: [10, 10],
				noInterrupt: [18],
				//autoRelease: 0,
				abnormals: {
					27070: { chargeSpeed: 0.25 },
					27080: { chargeSpeed: 0.25 }
				}
			},
			10: { noRetry: true,
				noInterrupt: ["18-10"]
			}
		},
		21: { // Retaliate
			0: { noRetry: true }
		},
		22: { // Arun's Tears
			0: {
				chargeLevels: [10, 10],
				//autoRelease: 0,
				abnormals: {
					27100: { chargeSpeed: 0.25 }
				}
			},
			10: { noRetry: true }
		},
		23: { // Metmorphic Smite
			0: {
				noInterrupt: [1, 2, 4, "5-10", 6, "9-10", 10, 13, 14, 15, 16, 17, "18-10", 21, "22-10", 23, 37, "41-10", 43, 48],
				chains: { 8: 30 }
			},
			30: true
		},
		24: { // Volley of Curses
			'*': {
				fixedSpeed: true,
				noRetry: true
			},
			0: { type: 'lockon' },
			10: { type: 'lockonCast' }
		},
		25: { // Thrall of Protection
			'*': {
				fixedSpeed: true,
				cooldownEnd: 300
			},
			0: true,
			10: true,
			30: true
		},
		27: { // Thrall of Life
			'*': {
				fixedSpeed: true,
				cooldownEnd: 300
			},
			0: true,
			10: true,
			30: true
		},
		28: { // Sonorous Dreams
			'*': {
				fixedSpeed: true,
				noRetry: true
			},
			0: { type: 'lockon' },
			10: { type: 'lockonCast' }
		},
		29: { // Regression
			0: { fixedSpeed: true }
		},
		30: { // Curse of Exhaustion
			'*': {
				fixedSpeed: true,
				noRetry: true
			},
			0: { type: 'lockon' },
			10: { type: 'lockonCast' }
		},
		31: { // Curse of Confusion
			'*': {
				fixedSpeed: true,
				noRetry: true
			},
			0: { type: 'lockon' },
			10: { type: 'lockonCast' }
		},
		32: { // Mire
			'*': {
				fixedSpeed: true,
				noRetry: true
			},
			0: { type: 'lockon' },
			10: { type: 'lockonCast' }
		},
		33: { // Thrall of Vengeance
			'*': {
				fixedSpeed: true,
				cooldownEnd: 300
			},
			0: true,
			10: true,
			30: true
		},
		34: { // Thrall of Wrath
			'*': {
				fixedSpeed: true,
				cooldownEnd: 300
			},
			0: true,
			10: true,
			30: true
		},
		35: { // Command: Attack
			0: { fixedSpeed: true }
		},
		36: { // Command: Follow
			0: { fixedSpeed: true }
		},
		37: { // Warding Totem
			0: true
		},
		41: { // Contagion
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: true
			},
			10: { type: 'lockonCast' }
		},
		42: { // Boomerang Pulse
			0: {
				noInterrupt: [42],
				cooldownEnd: 300
			}
		},
		43: { // Unsummon Thrall
			0: true
		},
		44: { // Mass Teleport
			0: {
				noInterrupt: [17],
				cooldownEnd: 300,
				noRetry: true
			}
		},
		45: { // Thrall Augmentation
			0: true,
			50: true
		},
		47: { // Arunic Release
			0: true
		},
		48: { // Thrall Lord
			0: { fixedSpeed: true }
		}
	},
	8: { // Reaper
		'*': { consumeAbnormal: [10151020, 10151021, 10151022, 10151023, 10151040, 10151041, 10151042] },
		1: { // Spiral Barrage
			'*': {
				noInterrupt: [3, 4, 12, 20],
				inPlace: {
					movement: [{
						duration: 766,
						speed: 1,
						unk: 1,
						distance: 0
					},
					{
						duration: 346,
						speed: 1,
						unk: 1,
						distance: 0
					}],
					distance: 0
				},
				noRetry: true
			},
			0: {
				triggerAbnormal: { 10151020: 2000 },
				categoryChains: { 90001: 1 }
			},
			1: { triggerAbnormal: { 10151020: 2000 } },
			2: {
				inPlace: {
					movement: [{
						duration: 950,
						speed: 1,
						unk: 1,
						distance: 0
					},
					{
						duration: 346,
						speed: 1,
						unk: 1,
						distance: 0
					}],
					distance: 0
				},
				triggerAbnormal: { 10151021: 2000 }
			},
			3: {
				inPlace: {
					movement: [{
						duration: 616,
						speed: 1,
						unk: 1,
						distance: 0
					},
					{
						duration: 346,
						speed: 1,
						unk: 1,
						distance: 0
					}],
					distance: 0
				},
				triggerAbnormal: { 10151022: 1800 }
			},
			4: {
				inPlace: {
					movement: [{
						duration: 1150,
						speed: 1,
						unk: 1,
						distance: 0
					},
					{
						duration: 346,
						speed: 1,
						unk: 1,
						distance: 0
					}],
					distance: 0
				},
				triggerAbnormal: { 10151023: 2000 }
			},
			5: {
				inPlace: {
					movement: [{
						duration: 2016,
						speed: 1,
						unk: 1,
						distance: 0
					}],
					distance: 0
				}
			}
		},
		3: { // Double Shear
			'*': {
				noInterrupt: ["1-0", "1-2", 3, 4, 12, 13, 14, 15, 18, 19, 20, 21, 23, 40],
				inPlace: {
					movement: [{
						duration: 2140,
						speed: 1,
						unk: 1,
						distance: 0
					}],
					distance: 0
				},
				abnormals: {
					29030: { speed: 1.25 }
				}
			},
			0: {
				chains: {
					1: 30,
					5: 30,
					6: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30
				}
			},
			30: true,
			40: {
				chains: {
					1: 41,
					5: 41,
					6: 41,
					8: 41,
					9: 41,
					10: 41,
					11: 41
				}
			},
			41: true
		},
		4: { // Sundering Strike
			'*': {
				noInterrupt: [1, 4, 8, 9, 10, 11, '12-0', '12-1', 20],
				noRetry: true
			},
			0: {
				chains: {
					1: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30
				},
				inPlace: {
					movement: [
						[],
						[{
							duration: 1757,
							speed: 1,
							unk: 1,
							distance: 0
						}],
						[]
					],
					distance: [0, 0, 0]
				}
			},
			30: {
				connectSkillArrow: true,
				inPlace: {
					movement: [
						[{
							duration: 1757,
							speed: 1,
							unk: 1,
							distance: 0
						}],
						[]
					],
					distance: [0, 0]
				},
				noRetry: true
			},
			31: {
				inPlace: {
					movement: [
						[{
							duration: 1757,
							speed: 1,
							unk: 1,
							distance: 0
						}],
						[]
					],
					distance: [0, 0]
				}
			},
			40: {
				chains: {
					1: 60,
					3: 60,
					4: 60,
					5: 60,
					6: 60,
					8: 60,
					9: 60,
					10: 60,
					11: 60,
					12: 60
				},
				inPlace: {
					movement: [
						[],
						[{
							duration: 1757,
							speed: 1,
							unk: 1,
							distance: 0
						}],
						[]
					],
					distance: [0, 0, 0]
				}
			},
			60: {
				connectSkillArrow: true,
				inPlace: {
					movement: [
						[{
							duration: 1757,
							speed: 1,
							unk: 1,
							distance: 0
						}],
						[]
					],
					distance: [0, 0]
				},
				noRetry: true
			},
			61: {
				inPlace: {
					movement: [
						[{
							duration: 1757,
							speed: 1,
							unk: 1,
							distance: 0
						}],
						[]
					],
					distance: [0, 0]
				}
			}
		},
		5: { // Grim Strike
			'*': {
				inPlace: {
					movement: [
						[{
							duration: 2416,
							speed: 1,
							unk: 1,
							distance: 0
						}],
						[{
							duration: 1065,
							speed: 1,
							unk: 1,
							distance: 0
						}]
					],
					distance: [0, 0]
				}
			},
			0: {
				noInterrupt: ["1-0", "1-2", 4, 12, 13, 14, 15, 18, 20, 23, 40],
				chains: {
					1: 30,
					3: 30,
					5: 30,
					6: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					19: 30,
					21: 30
				}
			},
			30: true,
			31: {
				chains: {
					1: 32,
					3: 32,
					5: 32,
					6: 32,
					8: 32,
					9: 32,
					10: 32,
					11: 32,
					19: 32,
					21: 32
				}
			},
			32: true
		},
		6: { // Death Spiral
			'*': { noRetry: true },
			0: {
				noInterrupt: ["6-31", 19, 21, 23],
				chains: {
					1: 30,
					3: 30,
					4: 30,
					5: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30,
					13: 30,
					14: 30
				}
			},
			30: true,
			31: true,
			40: {
				chains: {
					1: 41,
					3: 41,
					4: 41,
					5: 41,
					6: 41,
					8: 41,
					9: 41,
					10: 41,
					11: 41,
					12: 41,
					13: 41,
					14: 41
				}
			},
			41: true,
			42: true
		},
		8: { // Whipsaw
			'*': { noInterrupt: [4, 5, 6, 8, 9, 11, 12, 13, 14, 15, 18, 19, 20, 21, 23, 40] },
			0: {
				chains: {
					1: 30,
					3: 30,
					10: 30
				}
			},
			30: true,
			40: {
				chains: {
					1: 41,
					3: 41,
					10: 41
				}
			},
			41: true
		},
		9: { // Smite
			"*": {
				distance: 168,
				inPlace: {
					movement: [{
						duration: 1832,
						speed: 1,
						unk: 1,
						distance: 0
					}],
					distance: 0
				},
				noInterrupt: [1, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 23, 40],
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			},
			0: true,
			30: true
		},
		10: { // Pendulum Strike
			'*': {
				noInterrupt: [10, 19, 21, 23],
				moveDir: 1
			},
			0: {
				chains: {
					1: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					8: 30,
					9: 30,
					11: 30,
					12: 30,
					13: 30,
					14: 30,
					40: 30
				}
			},
			30: true,
			40: {
				chains: {
					1: 41,
					3: 41,
					4: 41,
					5: 41,
					6: 41,
					8: 41,
					9: 41,
					10: 41,
					11: 41,
					12: 41,
					13: 41,
					14: 41,
					40: 41
				}
			},
			41: true
		},
		11: { // Shadow Lash
			'*': {
				noInterrupt: [19],
				noRetry: true
			},
			0: { triggerAbnormal: { 10151040: 2000 } },
			1: { triggerAbnormal: { 10151041: 2000 } },
			2: { triggerAbnormal: { 10151042: 2000 } },
			3: true
		},
		12: { // Shadow Burst
			0: {
				noInterrupt: [1, 3, '4-0', '4-30', '4-40', '4-60', 5, 6, 8, 9, 10, 11, 20],
				chains: { 12: 1 }
			},
			1: true,
			31: true
		},
		14: { // Retaliate
			0: { noRetry: true }
		},
		15: { // Retribution
			30: { fixedSpeed: true },
			81: true
		},
		16: { // Shadow Reaping
			0: { fixedSpeed: true }
		},
		19: { // Dark Harvest
			'*': {
				inPlace: {
					movement: [{
						duration: 2122,
						speed: 1,
						unk: 1,
						distance: 0
					}],
					distance: 0
				}
			},
			0: {
				noInterrupt: [21],
				requiredBuff: 10151220,
				chains: {
					1: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30
				}
			},
			30: true
		},
		/*20: { // Cable Step
			0: {
				type: 'dynamicDistance',
				length: 1250
			}
		},*/
		21: { // Recall Scythes
			'*': { requiredBuff: 10151221 },
			0: {
				noInterrupt: [21],
				chains: {
					1: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30
				}
			},
			30: true
		},
		23: { // Binding Scythes
			31: { fixedSpeed: true },
			33: { onlyTarget: true }
		},
		40: { // Shadow Step
			'*': {
				forceClip: true,
				abnormalChains: { 10151000: 30 },
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			},
			0: true,
			30: true
		}
	},
	9: { // Gunner
		'*': { consumeAbnormal: [10152010, 10152011] },
		1: { // Blast
			'*': {
				fixedSpeed: true,
				noInterrupt: [1],
				projectiles: [20],
				triggerAbnormal: { 10152011: 3100 },
				hasChains: true
			},
			1: true,
			2: { noRetry: true },
			20: {
				type: 'userProjectile',
				flyingSpeed: 800,
				flyingDistance: 500,
				explodeOnHit: true
			}
		},
		2: { // Bombardment
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: true
			},
			1: { type: 'lockonCast' }
		},
		3: { // Scattershot
			'*': {
				moveDir: 1,
				noInterrupt: [3, 20],
				glyphs: {
					30007: {
						movement: [
							{
								duration: 394,
								speed: 1,
								unk: 1,
								distance: 0
							},
							{
								duration: 111,
								speed: 1,
								unk: 1,
								distance: 0
							},
							{
								duration: 1333,
								speed: 1.8,
								unk: 1,
								distance: 64.8
							}
						],
						distance: 0.6
					}
				},
				hasChains: true
			},
			1: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			2: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			30: true
		},
		4: { // Point Blank
			'*': {
				noInterrupt: ['4-3', '4-4'],
				hasChains: true
			},
			1: {
				noInterrupt: [4],
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				},
				noRetry: true
			},
			2: {
				noInterrupt: [4],
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				},
				noRetry: true
			},
			3: {
				moveDir: 1,
				categoryChains: { 91004: 4 }
			},
			4: { moveDir: 1 },
			30: { noRetry: true }
		},
		5: { // Burst Fire / Targeted Burst Fire
			'*': { noInterrupt: ['9-0', '9-10', '9-20'] },
			0: { noRetry: true },
			1: {
				fixedSpeed: true,
				stamina: 75,
				instantStamina: true,
				level: [
					{ stamina: 50 },
					{ stamina: 55 },
					{ stamina: 60 },
					{ stamina: 65 }
				]
			},
			10: { noRetry: true },
			11: {
				fixedSpeed: true,
				stamina: 75,
				instantStamina: true
			},
			20: { noRetry: true },
			21: {
				fixedSpeed: true,
				stamina: 90,
				instantStamina: true
			}
		},
		6: { // Time Bomb
			'*': {
				fixedSpeed: true,
				projectiles: [20],
				triggerAbnormal: {
					10152010: 3100,
					10152084: 4100
				}
			},
			1: true,
			2: true,
			20: {
				type: 'userProjectile',
				flyingSpeed: 800
			}
		},
		7: { // Arcane Barrage
			1: {
				fixedSpeed: true,
				noInterrupt: [7],
				triggerAbnormal: { 10152010: 3100 },
				noRetry: true
			},
			2: {
				fixedSpeed: true,
				noInterrupt: [7],
				triggerAbnormal: { 10152010: 3100 },
				noRetry: true
			},
			3: true
		},
		9: { // Mana Missiles
			'*': { moveDir: 1 },
			0: {
				autoRelease: 0,
				level: {
					9: {
						releaseChain: {
							connectSkills: [400102, 400132],
							chain: 12,
							grant: true
						}
					}
				}
			},
			10: {
				projectiles: [21, 22],
				noRetry: true
			},
			11: {
				projectiles: [21, 22, 23, 24, 25],
				noRetry: true
			},
			12: {
				projectiles: [31, 32, 33, 34, 35],
				noRetry: true
			},
			21: {
				type: 'userProjectile',
				flyingSpeed: 600,
				flyingDistance: 750
			},
			22: {
				type: 'userProjectile',
				flyingSpeed: 500,
				flyingDistance: 750
			},
			23: {
				type: 'userProjectile',
				flyingSpeed: 400,
				flyingDistance: 750
			},
			24: {
				type: 'userProjectile',
				flyingSpeed: 350,
				flyingDistance: 750
			},
			25: {
				type: 'userProjectile',
				flyingSpeed: 300,
				flyingDistance: 750
			},
			31: {
				type: 'userProjectile',
				flyingSpeed: 600,
				flyingDistance: 750
			},
			32: {
				type: 'userProjectile',
				flyingSpeed: 500,
				flyingDistance: 750
			},
			33: {
				type: 'userProjectile',
				flyingSpeed: 400,
				flyingDistance: 750
			},
			34: {
				type: 'userProjectile',
				flyingSpeed: 350,
				flyingDistance: 750
			},
			35: {
				type: 'userProjectile',
				flyingSpeed: 300,
				flyingDistance: 750
			}
		},
		10: { // Arc Bomb
			'*': { noRetry: true },
			1: {
				projectiles: [20],
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			2: {
				projectiles: [20],
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			20: {
				type: 'userProjectile',
				delay: 450,
				flyingSpeed: 700,
				flyingDistance: 350,
				level: [
					{ flyingSpeed: 800 },
					{ flyingSpeed: 800 },
					{ flyingSpeed: 800 },
					{ flyingSpeed: 800 },
					{ flyingSpeed: 800 },
					{ flyingSpeed: 800 },
					{ flyingSpeed: 800 },
					{ flyingSpeed: 800 }
				]
			},
			// TODO: Chain projectiles
			/*21: {
				type: 'userProjectile',
				flyingSpeed: 300,
				flyingDistance: 100
			},
			22: {
				type: 'userProjectile',
				flyingSpeed: 300,
				flyingDistance: 75
			},
			23: {
				type: 'userProjectile',
				flyingSpeed: 300,
				flyingDistance: 50
			},
			24: {
				type: 'projectile',
				length: 1000
			},*/
			30: {
				connectSkillArrow: true,
				projectiles: [20],
				noRetry: true
			}
		},
		11: { // Rocket Jump
			'*': {
				noInterrupt: [15],
				hasChains: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			},
			1: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 31,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			2: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 31,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			30: true,
			31: true
		},
		13: { // Balder's Vengeance
			'*': {
				noInterrupt: [13],
				moveDir: 1,
				noRetry: true
			},
			1: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			2: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			30: {
				connectSkillArrow: true,
				noRetry: true
			}
		},
		15: { // Replenishment
			'*': {
				fixedSpeed: true,
				noInterrupt: [15]
			},
			1: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			2: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			30: true
		},
		18: { // HB
			'*': { fixedSpeed: true },
			1: true,
			2: true
		},
		19: { // ST
			'*': { noRetry: true },
			1: {
				projectiles: [20],
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			2: {
				projectiles: [20],
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			20: {
				type: 'userProjectile',
				delay: 350,
				flyingSpeed: 700,
				flyingDistance: 450
			},
			// TODO: Chain projectiles
			/*21: {
				type: 'projectile',
				length: 5000
			},*/
			30: {
				connectSkillArrow: true,
				projectiles: [20],
				noRetry: true
			}
		},
		20: { // Retaliate
			0: { noRetry: true }
		},
		40: { // Rolling Reload / Dashing Reload
			'*': {
				fixedSpeed: true,
				triggerAbnormal: {
					10152010: 3100,
					10152012: 3100,
					10152354: 4000
				},
				forceClip: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			},
			1: { abnormalChains: { 10152354: 31 } },
			2: { abnormalChains: { 10152354: 32 } },
			31: {
				consumeAbnormal: 10152354,
				triggerAbnormal: {
					10152010: 3100,
					10152012: 3100
				}
			},
			32: {
				consumeAbnormal: 10152354,
				triggerAbnormal: {
					10152010: 3100,
					10152012: 3100
				}
			}
		},
		41: { // Modular Weapon System
			'*': {
				fixedSpeed: true,
				hasChains: true
			},
			1: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			2: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			30: true
		},
		42: { // Detonate
			1: {
				fixedSpeed: true,
				triggerAbnormal: { 10152011: 3100 }
			}
		},
		43: { // Remote Trigger
			'*': {
				moveDir: 1,
				hasChains: true,
				noRetry: true
			},
			1: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			3: {
				categoryChains: {
					91002: 50,
					91003: 50,
					91004: 50,
					91005: 50,
					'91007,10001': 50,
					91009: 50,
					91010: 50,
					91011: 50,
					91013: 50,
					91015: 50,
					91018: 50,
					91019: 50,
					91040: 50,
					91041: 50,
					91043: 50,
					91047: 50
				}
			},
			30: {
				connectSkillArrow: true,
				noRetry: true
			},
			31: true,
			50: {
				connectSkillArrow: true,
				noRetry: true
			},
			51: true,
		},
		44: { // Balder's Vengeance (Modular Weapon System)
			'*': {
				noInterrupt: [44],
				moveDir: 1,
				noRetry: true
			},
			1: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			30: {
				connectSkillArrow: true,
				noRetry: true
			}
		},
		47: { // Obliteration
			'*': {
				requiredBuff: 10152340,
				moveDir: 1,
				hasChains: true
			},
			1: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			2: {
				categoryChains: {
					91002: 30,
					91003: 30,
					91004: 30,
					91005: 30,
					'91007,10001': 30,
					91009: 30,
					91010: 30,
					91011: 30,
					91013: 30,
					91015: 30,
					91018: 30,
					91019: 30,
					91040: 30,
					91041: 30,
					91043: 30,
					91047: 30
				}
			},
			30: true
		}
	},
	10: { // Brawler
		1: { // Punch
			'*': {
				noInterrupt: ['1-3'],
				triggerAbnormal: { 10153060: 3000 },
				consumeAbnormalEnd: 10153060,
				hasChains: true,
				noRetry: true
			},
			0: {
				categoryChains: {
					'92001,10000': 1,
					'92001,10001': 2,
					'92001,10002': 3,
					'92001,10010': 32,
					92002: 30,
					92003: 30,
					92004: 30,
					92005: 30,
					92006: 30,
					92007: 30,
					92008: 30,
					92009: 30,
					92010: 30,
					92013: 30,
					92014: 30,
					92015: 30,
					92016: 30,
					92017: 30,
					92018: 30,
					92019: 30,
					92020: 30,
					92021: 30,
					92022: 30,
					92024: 30,
					92026: 30,
					92040: 30
				}
			},
			1: true,
			2: true,
			3: true,
			30: true,
			31: true,
			32: true
		},
		2: { // Counter
			'*': {
				hasChains: true,
				noRetry: true
			},
			1: {
				triggerAbnormal: { 10153001: 0x7fffffff },
				consumeAbnormalEnd: 10153001
			},
			2: {
				triggerAbnormal: { 10153002: 0x7fffffff },
				consumeAbnormalEnd: 10153002
			},
			3: {
				triggerAbnormal: { 10153003: 0x7fffffff },
				consumeAbnormalEnd: 10153003
			},
			4: {
				triggerAbnormal: { 10153004: 0x7fffffff },
				consumeAbnormalEnd: 10153004
			},
			10: {
				fixedSpeed: true,
				triggerAbnormal: { 10153006: 0x7fffffff },
				consumeAbnormalEnd: 10153006
			},
			11: {
				fixedSpeed: true,
				triggerAbnormal: { 10153005: 0x7fffffff },
				consumeAbnormalEnd: 10153005
			},
			12: {
				categoryChains: {
					'92001,10000': 1,
					'92001,10001': 2,
					'92001,10002': 3,
					'92001,10003': 4,
					'92001,10010': 1
				}
			}
		},
		3: { // Divine Wrath
			'*': {
				fixedSpeed: true,
				noRetry: true
			},
			0: true,
			1: {
				type: 'lockonCast',
				forceClip: true,
				setEndpointStage: 1
			}
		},
		4: { // Ground Pound
			'*': { hasChains: true },
			0: { categoryChains: { 800: 30 } },
			30: true
		},
		5: { // Bullrush
			0: {
				fixedSpeed: true,
				noRetry: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		6: { // Haymaker
			'*': { hasChains: true },
			1: { categoryChains: { 800: 30 } },
			2: { categoryChains: { 800: 30 } },
			30: true,
			31: true
		},
		7: { // Roundhouse Kick
			'*': {
				noInterrupt: [7],
				hasChains: true
			},
			0: { categoryChains: { 800: 30 } },
			30: true
		},
		8: { // Piledriver
			'*': { hasChains: true },
			1: { categoryChains: { 800: 30 } },
			2: { categoryChains: { 800: 30 } },
			30: true,
			31: true
		},
		9: { // Jackhammer
			'*': {
				noInterrupt: [9],
				fixedSpeed: true,
				hasChains: true
			},
			1: { categoryChains: { 800: 30 } },
			2: { categoryChains: { 800: 30 } },
			30: true,
			31: true
		},
		10: { // Counterpunch
			'*': {
				requiredBuff: 10153000,
				hasChains: true
			},
			0: { categoryChains: { 800: 30 } },
			30: true
		},
		12: { // Retaliate
			0: { noRetry: true }
		},
		13: { // Provoke
			'*': { fixedSpeed: true },
			1: true,
			2: true
		},
		14: { // Infuriate
			'*': { hasChains: true },
			1: { categoryChains: { 800: 30 } },
			2: { categoryChains: { 800: 30 } },
			30: true
		},
		15: { // High Kick
			'*': {
				requiredBuff: 10153503,
				hasChains: true
			},
			0: { categoryChains: { 800: 30 } },
			30: true
		},
		16: { // Flip Kick
			'*': { hasChains: true },
			1: { categoryChains: { 800: 30 } },
			2: { categoryChains: { 800: 30 } },
			30: true
		},
		18: { // Growing Fury
			'*': {
				requiredBuff: 10153050,
				hasChains: true
			},
			1: { categoryChains: { 800: 30 } },
			2: { categoryChains: { 800: 30 } },
			30: true
		},
		19: { // Invigorating Rage
			'*': {
				fixedSpeed: true,
				stamina: 1500,
				instantStamina: true
			},
			1: true,
			2: true
		},
		21: { // Mounting Rage
			'*': { fixedSpeed: true },
			1: true,
			2: true
		},
		22: { // Flying Kick
			'*': {
				noInterrupt: [22],
				hasChains: true
			},
			0: { categoryChains: { 800: 30 } },
			30: true
		},
		24: { // One-Inch Punch
			'*': { hasChains: true },
			1: { categoryChains: { 800: 30 } },
			2: { categoryChains: { 800: 30 } },
			30: true,
			31: true
		},
		26: { // Rythmic Blows
			'*': {
				hasChains: true,
				noRetry: true
			},
			0: { categoryChains: { 800: 2 } },
			1: true,
			2: true,
			3: true,
			4: true,
			5: true,
			6: true,
			7: true
		},
		40: { // Quick Dash
			'*': {
				fixedSpeed: true,
				forceClip: true,
				abnormalChains: { 10153150: 30 },
				noRetry: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			},
			0: true,
			30: true,
			31: true
		}
	},
	11: { // Ninja
		'*': { consumeAbnormal: [10154000, 10154001, 10154002, 10154003, 10154004, 10154005, 10154006] },
		1: { // Combo Attack
			'*': {
				fixedSpeed: true,
				triggerAbnormal: { 10154000: 1650 },
				hasChains: true,
				noRetry: true
			},
			0: { categoryChains: { 900: 30 } },
			1: { triggerAbnormal: { 10154001: 1500 } },
			2: { triggerAbnormal: { 10154002: 1400 } },
			3: { triggerAbnormal: { 10154003: 1400 } },
			4: { triggerAbnormal: { 10154004: 1400 } },
			5: { triggerAbnormal: { 10154005: 1600 } },
			6: { triggerAbnormal: { 10154006: 100 } },
			30: true,
			40: { categoryChains: { 900: 70 } },
			41: { triggerAbnormal: { 10154001: 1500 } },
			42: { triggerAbnormal: { 10154002: 1400 } },
			43: { triggerAbnormal: { 10154003: 1400 } },
			44: { triggerAbnormal: { 10154004: 1400 } },
			45: { triggerAbnormal: { 10154005: 1600 } },
			46: { triggerAbnormal: { 10154006: 100 } },
			70: true
		},
		2: { // Shadow Jump
			'*': {
				fixedSpeed: true,
				forceClip: true,
				abnormalChains: { 10154010: 30 },
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			},
			0: true,
			30: true
		},
		3: { // Leaves on the Wind
			'*': { 
				hasChains: true,
				noInterrupt: [3]
			},
			0: {
				categoryChains: {
					911: 40,
					'9999,900': 30
				}
			},
			30: {
				connectSkillArrow: true,
				noRetry: true
			},
			40: true
		},
		4: { // Jagged Path
			1: {
				fixedSpeed: true,
				length: 665,
				distance: 469,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			},
			2: { fixedSpeed: true },
			10: true,
			11: true
		},
		5: { // Impact Bomb
			'*': {
				moveDir: 1,
				noInterrupt: [5],
				forceClip: true,
				noRetry: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			},
			0: { categoryChains: { 900: 30 } },
			30: {
				connectSkillArrow: true,
				noRetry: true
			}
		},
		6: { // One Thousand Cuts
			'*': { 
				hasChains: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }	
			},
			0: { categoryChains: { 900: 30 } },
			1: {
				fixedSpeed: true,
				length: 300,
				distance: 246
			},
			10: true,
			30: true
		},
		7: { // Decoy Jutsu
			0: { 
				onlyTarget: true,
				noInterrupt: [7],
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		8: { // Fire Avalanche
			'*': {
				abnormals: { 
					32033: { speed: 1.2 },
					32058: { speed: 1.3 }
				},
				hasChains: true,
				noRetry: true
			},
			0: { categoryChains: { 900: 30 } },
			1: true,
			2: true,
			30: true,
			31: { categoryChains: { 900: 30 } },
			51: { categoryChains: { 900: 52 } },
			52: true
		},
		9: { // Smoke Bomb
			"*": { cooldownEnd: 300 },
			0: { categoryChains: { 900: 30 } },
			30: {
				connectSkillArrow: true,
				noRetry: true
			}
		},
		10: { // Retaliate
			0: { noRetry: true }
		},
		11: { // Focus
			'*': { noInterrupt: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] },
			0: true,
			50: true
		},
		12: { // Skyfall
			'*': { 
				hasChains: true, 
				noInterrupt: [12]
			},
			1: { categoryChains: { 900: 30 } },
			2: { categoryChains: { 900: 30 } },
			30: true
		},
		13: { // Circle of Steel
			'*': { 
				hasChains: true,
				noInterrupt: [13]
			},
			1: { categoryChains: { 900: 30 } },
			2: { categoryChains: { 900: 30 } },
			30: true
		},
		14: { // Double Cut
			'*': { 
				hasChains: true,
				noInterrupt: [14]
			},
			1: { categoryChains: { 900: 30 } },
			2: { categoryChains: { 900: 30 } },
			30: true
		},
		15: { // Burning Heart
			'*': {
				stamina: 100,
				noInterrupt: [17, 5],
				instantStamina: true,
				abnormals: {
					32033: { speed: 1.2 },
					32058: { speed: 1.3 }
				}
			},
			1: true,
			2: true,
			3: true,
			4: true,
			5: true,
			6: true,
			7: true,
			8: true,
			9: true,
			10: true,
			31: { categoryChains: { 900: 32 } },
			32: true
		},
		16: { // Death Blossom
			'*': {
				fixedSpeed: true,
				hasChains: true,
				noInterrupt: [16]
			},
			0: { categoryChains: { 900: 30 } },
			30: true
		},
		17: { // Attunement
			'*': { 
				hasChains: true,
				noInterrupt: [17]
			},
			0: { categoryChains: { 900: 30 } },
			30: true
		},
		18: { // Bladestorm
			'*': { 
				hasChains: true,
				noInterrupt: [18]
			},
			0: { categoryChains: { 900: 30 } },
			30: true
		},
		19: { // Chakra Thrust
			'*': { 
				hasChains: true,
				noInterrupt: [19]
			},
			0: { categoryChains: { 900: 30 } },
			30: true
		},
		20: { // Clone Jutsu
			0: { fixedSpeed: true }
		},
		21: { // Boomerang Shuriken
			'*': {
				hasChains: true,
				noRetry: true
			},
			0: { categoryChains: { 93003: 15 } },
			11: { categoryChains: { 93003: 17 } },
			12: { categoryChains: { 93003: 16 } },
			13: { categoryChains: { 93003: 18 } },
			15: {
				connectSkillArrow: true,
				noRetry: true
			},
			16: {
				connectSkillArrow: true,
				noRetry: true
			},
			17: {
				connectSkillArrow: true,
				noRetry: true
			},
			18: {
				connectSkillArrow: true,
				noRetry: true
			},
			50: true,
			51: true
		},
		22: { // Quick Attack
			10: {
				noInterrupt: [22],
				categoryChains: {
					93019: 30,
					'9999,900': 20
				}
			},
			20: true,
			30: true,
			40: {
				categoryChains: {
					93019: 60,
					'9999,900': 50
				}
			},
			50: {
				connectSkillArrow: true,
				noRetry: true
			},
			60: {
				connectSkillArrow: true,
				noRetry: true
			}
		},
		23: { // Inner Harmony
			'*': { hasChains: true },
			0: { categoryChains: { 900: 30 } },
			30: true
		}
	},
	12: { // Valkyrie
		1: { // Slash
			'*': {
				noInterrupt: ['1-3', 9, 11, 19],
				hasChains: true,
				noRetry: true
			},
			0: {
				triggerAbnormal: { 10155006: 4000 },
				consumeAbnormalEnd: 10155006,
				categoryChains: { 750: 30 }
			},
			1: {
				triggerAbnormal: { 10155007: 4000 },
				consumeAbnormalEnd: 10155007
			},
			2: {
				triggerAbnormal: { 10155008: 4000 },
				consumeAbnormalEnd: 10155008
			},
			3: true,
			30: {
				triggerAbnormal: { 10155006: 4000 },
				consumeAbnormalEnd: 10155006
			}
		},
		2: { // Overhead Slash
			'*': { 
				hasChains: true,
				noInterrupt: [2]
			},
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		3: { // Glaive Strike
			'*': {
				requiredBuff: 10155113,
				hasChains: true,
				noInterrupt: [3]
			},
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		4: { // Charge
			"*": { noInterrupt: [1, 2, "4-10", "4-11", 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25] },
			0: {
				fixedSpeed: true,
				length: 550,
				distance: 436,
				noInterrupt: [4]
			},
			10: true,
			11: true
		},
		5: { // Maelstrom
			'*': { 
				hasChains: true,
				noInterrupt: [5]
			},
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		6: { // Leaping Strike
			'*': { 
				hasChains: true,
				noInterrupt: [6]
			 },
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		7: { // Spinning Death
			'*': {
				noInterrupt: ['7-2'],
				hasChains: true,
				noRetry: true
			},
			0: {
				triggerAbnormal: { 10155070: 5000 },
				categoryChains: { 750: 30 }
			},
			1: {
				consumeAbnormal: 10155070,
				triggerAbnormal: { 10155071: 5000 }
			},
			2: {
				consumeAbnormal: 10155071,
				triggerAbnormal: { 10155072: 1 }
			},
			30: { triggerAbnormal: { 10155070: 5000 } }
		},
		8: { // Titansbane
			'*': { hasChains: true },
			0: {
				fixedSpeed: true,
				categoryChains: {
					'13008,10000': 1,
					750: 30
				}
			},
			1: true,
			30: { fixedSpeed: true }
		},
		9: { // Ground Bash
			'*': {
				requiredBuff: 10155112,
				hasChains: true,
				noInterrupt: [9]
			},
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		10: { // Dream Slash
			'*': {
				noInterrupt: ["4-0", 10],
				hasChains: true,
				noRetry: true
			},
			0: { categoryChains: { 750: 30 } },
			30: {
				connectSkillArrow: true,
				noRetry: true
			}
		},
		11: { // Shining Crescent
			'*': { hasChains: true },
			0: {
				noInterrupt: [11],
				categoryChains: { 750: 30 }
			},
			1: { categoryChains: { 750: 31 } },
			30: true,
			31: true
		},
		12: { // Ragnarok
			'*': { 
				hasChains: true,
				noInterrupt: [12]
			},
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		13: { // Bloodflower
			'*': { 
				hasChains: true,
				noInterrupt: [13]
			 },
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		14: { // Evasion
			'*': {
				fixedSpeed: true,
				forceClip: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			},
			0: true,
			1: true
		},
		15: { // Windslash
			'*': { 
				hasChains: true,
				noInterrupt: [15]
			 },
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		16: { // Runeburst
			'*': {
				fixedSpeed: true,
				hasChains: true,
				noInterrupt: [16]
			},
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		17: { // Balder's Tears
			0: { fixedSpeed: true }
		},
		18: { // Retaliate
			0: { noRetry: true }
		},
		19: { // Reclamation
			'*': { 
				hasChains: true,
				noInterrupt: [19]
			},
			0: { categoryChains: { 750: 30 } },
			30: true
		},
		20: { // Backstab
			0: {
				distance: 0,
				onlyTarget: true,
				abnormals: {
					501323: { disableSkill: true }, 
					400801: { disableSkill: true },
					301900: { disableSkill: true } 
		    }
			}
		},
		21: { // Dark Herald
			0: {
				requiredBuff: 10155201,
				fixedSpeed: true
			}
		},
		23: { // Gungir's Bite
			'*': {
				abnormals: { 10155531: { disableSkill: true } },
				hasChains: true,
				noRetry: true,
				noInterrupt: [23]
			},
			0: {
				triggerAbnormal: { 10155531: 1000 },
				categoryChains: { 750: 1 }
			},
			1: { triggerAbnormal: { 10155531: 1000 } },
			2: true
		},
		24: { // Twilight Waltz
			'*': {
				abnormals: { 10155543: { disableSkill: true } },
				hasChains: true,
				noRetry: true,
				noInterrupt: [25, "11-0", "11-30"]
			},
			0: {
				triggerAbnormal: { 10155543: 1000 },
				categoryChains: { 750: 1 }
			},
			1: { triggerAbnormal: { 10155543: 1000 } },
			2: { triggerAbnormal: { 10155543: 1000 } },
			3: true,
			4: true
		},
		25: { // Godsfall
			'*': {
				abnormals: { 10155511: { disableSkill: true } },
				hasChains: true,
				noRetry: true
			},
			0: {
				triggerAbnormal: { 10155511: 2000 },
				categoryChains: {
					772: 31,
					'9999,750': 1
				}
			},
			1: { triggerAbnormal: { 10155511: 2000 } },
			2: {
				distance: [-313.28, 463.28],
				categoryChains: {
					772: 32,
					'9999,750': 3
				}
			},
			3: { distance: [-313.28, 463.28] },
			31: { triggerAbnormal: { 10155511: 2000 } },
			32: { distance: [-313.28, 463.28] }
		}
	}
}