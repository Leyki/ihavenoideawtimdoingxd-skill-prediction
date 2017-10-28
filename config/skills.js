/* Note:
	* '*' can be used in place of the skill group or sub-skill to set default values
	* Processing order is 'noInterrupt' > 'chains' > 'abnormals'
*/

module.exports = {
	0: { // Warrior
		1: { // Combo Attack
			'*': { noInterrupt: [1, 32] },
			0: {
				length: 565,
				distance: 62.29
			},
			1: {
				length: 650,
				distance: 51.69
			},
			2: {
				length: 650,
				distance: 28.08
			},
			3: {
				length: 900,
				distance: 73.34
			}
		},
		2: { // Evasive Roll
			0: {
				length: 830, //Popori: 1085 | Any other race: 830
				distance: 150,
				forceClip: true,
				stamina: 500,
				instantStamina: true,
				noInterrupt: [2, 10, 32],
				glyphs: {
					21015: { stamina: -100 },
					21067: { stamina: -100 },
					21101: { stamina: -120 }
				}
			}
		},
		3: { // Torrent of Blows
			0: {
				length: 1600,
				distance: 68.26,
				noInterrupt: [32]
			}
		},
		4: { // Rain of Blows
			'*': { distance: 151.87 },
			0: {
				length: 2550,
				noInterrupt: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 16, 17, 19, 22, 23, 28, 29, 32, 34, 35, 36, 37, 39],
				abnormals: {
					100801: { skill: 360100 }
				},
				chains: {
					18: 30,
					21: 30,
					27: 30
				}
			},
			30: {
				length: 2000,
				abnormals: {
					100801: { skill: 360130 }
				}
			}
		},
		5: { // Battle Cry
			0: {
				length: 1665,
				noInterrupt: [32],
				glyphs: {
					21040: { speed: 1.5 }
				}
			}
		},
		8: { // Assault Stance
			'*': {
				length: 575, 
				noInterrupt: [32]
			},
			0: { stamina: 1000 },
			50: true
		},
		9: { // Defensive Stance
			'*': {
				length: 575, 
				noInterrupt: [32]
			},
			0: { stamina: 1000 },
			50: true
		},
		10: { // Death From Above
			0: {
				length: 2025,
				noInterrupt: [2, 32]
			}
		},
		11: { // Poison Blade
			0: {
				length: 925,
				distance: 54.85,
				noInterrupt: [32]
			}
		},
		12: { // Leaping Strike
			0: {
				length: 1525,
				distance: 250,
				noInterrupt: [32]
			}
		},
		/*13: { // Retaliate
			0: {
				type: 'retaliate',
				length: 1630,
				noInterrupt: [32],
				noRetry: true
			}
		},*/
		16: { // Charging Slash
			0: {
				type: 'dash',
				fixedSpeed: 1,
				length: 1135,
				distance: 467.88,
				noRetry: true,
				noInterrupt: [32]
			},
			1: { length: 825 }
		},
		17: { // Vortex Slash
			0: {
				length: 1600,
				requiredBuff: 100400,
				noInterrupt: [32]
			}
		},
		18: { // Combative Strike
			'*': {
				length: 1100,
				distance: 138.28,
				noInterrupt: [32]
			},
			0: true,
			1: true,
			2: true
		},
		19: { // Rising Fury
			'*': { noInterrupt: [32] },
			0: {
				length: 725,
				distance: 170.61,
				
			},
			1: {
				length: 1400,
				distance: 122.34
			}
		},
		20: { // Deadly Gamble
			0: {
				fixedSpeed: 1,
				length: 300,
				noInterrupt: [32]
			}
		},
		21: { // Cascade of Stuns
			0: {
				length: 1400,
				distance: 122.34,
				noInterrupt: [32]
			}
		},
		23: { // Spinning Counter
			0: {
				length: 1055,
				requiredBuff: 100700,
				abnormals: {
					100201: { chain: 6 }
				}
			}
		
		},
		24: { // Smoke Aggressor
			0: {
				fixedSpeed: 1,
				length: 475,
				noInterrupt: [32]
			}
		},
		25: { // Command: Attack
			0: {
				fixedSpeed: 1,
				length: 700,
				requiredBuff: 102600,
				noInterrupt: [32]
			}
		},
		26: { // Command: Follow
			0: {
				fixedSpeed: 1,
				length: 700,
				requiredBuff: 102600,
				noInterrupt: [32]
			}
		},
		27: { // Pounce
			0: {
				length: 2000,
				distance: 180,
				noInterrupt: [32],
				glyphs: {
					21048: { speed: 1.3 },
					21082: { speed: 1.3 }
				}
			}
		},
		28: { // Traverse Cut
			0: {
				length: 2000,
				distance: 160,
				noInterrupt: [1, 2, 3, 4, 8, 9, 10, 12, 13, 16, 17, 19, 21, 22, 28, 29, 32, 34, 36, 37, 39],
				abnormals: {
					100201:{ skill: 390100 }
				},
				chains: {
					11: 30,
					18: 30,
					27: 30
				}
			},
			30: {
				length: 2650,
				distance: 210,
				abnormals: {
					100201: { skill: 390130 }
				}
			}
		},
		29: { // Blade Draw
			0: {
				length: 3000,
				distance: 94.5,
				noInterrupt: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, '16-0', 18, '19-0', 21, 22, 23, 27, 29, 34, 35, 36, 37],
				interruptibleWithAbnormal: {
					102010: 3
				},
				abnormals: {
					102010: { chain: 30 },
					100801: { skill: 370100 }
				},
				chains: {
					3: 30,
					16: 30,
					17: 30,
					19: 30,
					28: 30,
					32: 30,
					39: 30
				}
			},
			30: {
				length: 1335,
				distance: 135,
				abnormals: {
					100801: { skill: 370130 }
				}
			}
		},
		30: { // Scythe
			0: {
				length: 1850,
				distance: 150,
				noInterrupt: [1, 3, 5, 8, 9, 10, 13, 16, 17, 18, 19, 21, 22, 23, 27, 28, 32, 34, 35, 39],
				abnormals: {
					100801: { skill: 380100 }
				},
				chains: {
					2: 30,
					4: 30,
					11: 30,
					12: 30,
					29: 30,
					36: 30,
					37: 30
				}
			},
			30: {
				length: 1385,
				distance: 120,
				abnormals: {
					100801: { skill: 380130 }
				}
			}
		},
		31: { // Reaping Slash
			'*': { distance: 110 },
			0: {
				length: 2275,
				distance: 110,
				noInterrupt: [1, 2, 3, 5, 8, 9, 10, 11, 12, 13, 16, 17, 19, 21, 22, 23, 27, 28, 29, 32, 33, 34, 35, 37, 39],
				chains: {
					4: 30,
					18: 30,
					36: 30
				}
			},
			30: { length: 1665 }
		},
		32: { // Cross Parry
			0: {
				type: 'holdInfinite',
				fixedSpeed: 1,
				requiredBuff: [100201],
				stamina: 50
			}
		},
		34: { // Binding Sword
			0: { 
				length: 1900,
				noInterrupt: [1, 2, 3, 4, 5, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 27, 28, 29, 32, 33, 34, 35, 36, 37, 39]
			}
		},
		35: { // Infuriate
			0: { 
				length: 2425,
				noInterrupt: [32],
				requiredBuff: [100201]
			}
		},
		36: { // Rain of Blows (Deadly Gamble)
			'*': { distance: 151.87 },
			0: { 
				length: 2550,
				noInterrupt: [32]
		    },
			30: { length: 2000 }
		},
		37: { // Blade Draw (Deadly Gamble)
			0: {
				length: 3000,
				distance: 94.5,
				abnormals: {
					102010: { chain: 30 }
				}
			},
			30: {
				length: 1335,
				distance: 135
			}
		},
		38: { // Scythe (Deadly Gamble)
			'*': { distance: 150 },
			0: { 
				length: 1850,
				noInterrupt: [32]
			},
			30: { length: 1385 }
		},
		39: { // Traverse Cut (Defensive Stance)
			0: {
				length: 2000,
				distance: 160,
				noInterrupt: [1, 2, 3, 4, 8, 9, 10, 12, 13, 16, 17, 19, 21, 22, 29, 32, 34, 36, 37, 39],
				chains: {
					11: 30,
					18: 30,
					27: 30
				}
			},
			30: {
				length: 2650,
				distance: 210
			}
		},
	},
	1: { // Lancer
		1: { // Combo Attack
			'*': { noInterrupt: [1, 2] },
			0: {
				length: 650,
				distance: 75	
			},
			1: {
				length: 1025,
				distance: 20
			},
			2: {
				length: 1815,
				distance: 66
			}
		},
		2: { // Stand Fast
			0: {
				type: 'holdInfinite',
				fixedSpeed: 1,
				stamina: 50
			}
		},
		3: { // Onslaught
			'*': {
				distance: [0, 100, 100, 100, 100, 62.7],
				noInterrupt: [1, 2, 3, 4, 8, 9, 10, 11, 12, 13, 15, 18, 21, 23, 24, 25, 26, 27],
				abnormals: {
					22060: { speed: 1.25 }
				},
				chains: {
					5: 30
				}
			},
			0: { length: [950, 500, 500, 500, 400, 775] },
			30: { length: [713, 375, 375, 375, 300, 582] }
		},
		4: { // Challenging Shout
			0: {
				length: 2225,
				noInterrupt: [2],
				glyphs: {
					22056: { speed: 1.25 },
					22085: { speed: 1.25 }
				}
			}
		},
		5: { // Shield Bash
			0: {
				length: 830,
				distance: 43.69,
				noInterrupt: [2]
			}
		},
		7: { // Guardian Shout
			0: { 
				length: 550, // Popori: 800
				noInterrupt: [2]
			}
		},
		8: { // Shield Counter
			0: {
				length: 1450,
				distance: 108.06,
				onlyDefenceSuccess: true
			}
		},
		9: { // Leash
			0: { 
				length: [725, 850],
				noInterrupt: [2]
		    }
		},
		10: { // Debilitate
			0: {
				length: 925,
				distance: 43.69,
				noInterrupt: [2]
			}
		},
		/*11: { // Retaliate
			0: {
				type: 'retaliate',
				length: 1645,
				noInterrupt: [2],
				noRetry: true
			}
		},*/
		12: { // Infuriate
			0: { 
				length: 2425,
				noInterrupt: [2]
		    }
		},
		13: { // Spring Attack
			0: {
				length: 2775,
				distance: 85,
				noInterrupt: ['1-0', '1-1', 2, 3, 4, 9, 11, 12, 13, 15, '18-0', 21, 23, 24, 25, 26, 27],
				chains: {
					1: 30,
					5: 30,
					8: 30,
					10: 30,
					18: 30
			    }
			},
			30: {
				length: 1850,
				distance: 85
			}
		},
		15: { // Charging Lunge
			0: {
				type: 'dash',
				fixedSpeed: 1,
				length: 1135,
				distance: 474.5,
				noInterrupt: [2, 15]
			},
			1: { 
				length: 940,
				noInterrupt: [2]
		    }
		},
		16: { // Second Wind
			0: {
				fixedSpeed: 1,
				length: 700,
				noInterrupt: [2]
			}
		},
		17: { // Adrenaline Rush
			0: {
				fixedSpeed: 1,
				length: 700,
				noInterrupt: [2]
			}
		},
		18: { // Shield Barrage
			0: {
				length: 625, // M.Helf: 525
				distance: 122.66,
				noInterrupt: [2],
				abnormals: {
					201550: { speed: 1.2 }
				}
			},
			1: {
				length: 800,
				distance: 66.04,
				noInterrupt: [2]
			}
		},
		19: { // Pledge of Protection
			0: {
				fixedSpeed: 1,
				length: 1000,
				noInterrupt: [2]
			}
		},
		20: { // Menacing Wave
			0: {
				fixedSpeed: 1,
				length: [700, 800],
				noInterrupt: [2]
			}
		},
		21: { // Lockdown Blow
			0: {
				length: 1400,
				distance: 122.66,
				noInterrupt: [2]
			}
		},
		22: { // Iron Will
			0: {
				fixedSpeed: 1,
				length: 800,
				noInterrupt: [2]
			}
		},
		23: { // Master's Leash
			0: {
				length: [725, 850],
				requiredBuff: 201000,
				noInterrupt: [2]
			}
		},
		24: { // Chained Leash
			0: { 
				length: [725, 850],
				noInterrupt: [2]
		    }
		},
		25: { // Wallop
			0: {
				length: 2375,
				distance: 100,
				noInterrupt: [1, 2, 3, 4, 5, 9, 11, 12, '18-0', 21, 23, 24, 25, 26, 27],
				chains: {
					8: 30,
					10: 30,
					13: 30,
					15: 30,
					18: 30
			    }
			},
			30: {
				length: 1900,
				distance: 100
			}
		},
		26: { // Backstep
			0: {
				length: 725,
				distance: -150,
				forceClip: true,
				stamina: 800,
				instantStamina: true,
				noInterrupt: [2, 26],
				glyphs: {
					22067: { stamina: -100 },
					22089: { stamina: -100 }
				}
			}
		},
		27: { // Rallying Cry
			0: { 
				length: 620,
			    noInterrupt: [2]
		    }
		}	
	},	
	2: { // Slayer
		1: { // Combo Attack
			'*': { noInterrupt: [1] },
			0: {
				length: 750,
				distance: 36.78
			},
			1: {
				length: 1025,
				distance: 35.68
			},
			2: {
				length: 750,
				distance: 28.05
			},
			3: {
				length: 1650,
				distance: 46.76
			}
		},
		2: { // Knockdown Strike
			'*': {
				consumeAbnormal: 23220,
				length: 2850,
				distance: 220.47,
				abnormals: {
					23070: { speed: 1.25 }
				},
				chains: {
					14: 30,
					20: 0
				}
			},
			0: true,
			1: true,
			2: true,
			30: { length: 2450 }
		},
		3: { // Whirlwind
			0: {
				length: 2900,
				distance: 128.69,
				abnormals: {
					23080: { speed: 1.25 }
				}
			}
		},
		4: { // Evasive Roll
			'*': { 
				length: 905, //Popori: 1185 | Any other race: 905
				distance: 150,
				forceclip: true,
				noInterrupt: [4]
			},
			0: true,
			30: { requiredBuff: 301200 }
		},
		5: { // Dash
			0: {
				fixedSpeed: 1,
				length: 700
			}
		},
		8: { // Overhand Strike
			0: {
				length: 3365,
				distance: 170,
				noInterrupt: ['1-0', '1-1', '1-2', 4, 6, 8, 10, '14-0', '14-1', 17, 21, 25],
				abnormals: {
					300801: { skill: 250100 }
				},
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
					24: 30
				}
			},
			30: {
				length: 1325,
				distance: 169.65,
				abnormals: {
					300801: { skill: 250130 }
				}
			}
		},
		9: { // Leaping Strike
			0: {
				length: 2175,
				distance: 250
			}
		},
		10: { // Retaliate
			0: {
				type: 'retaliate',
				length: 1630,
				noRetry: true
			}
		},
		12: { // Heart Thrust
			0: {
				length: 2315,
				distance: 230,
				abnormals: {
					23060: { speed: 1.25 },
					23061: { speed: 1.35 }
				}
			}
		},
		13: { // Stunning Backhand
			0: {
				length: 2150,
				distance: 76.71
			}
		},
		14: { // Distant Blade
			'*': {
				triggerAbnormal: { 23220: 3000 },
				consumeAbnormalEnd: 23220
			},
			0: {
				length: 600,
				distance: 75
			},
			1: {
				length: 600,
				distance: 100.02,
			},
			2: {
				length: 1500,
				distance: 104.82
			}
		},
		15: { // Startling Kick
			0: {
				length: 1475,
				distance: -175,
				forceClip: true,
				glyphs: {
					23060: { speed: 1.25 }
			    }
		    }
		},
		16: { // Fury Strike
			0: {
				length: 1000,
				distance: 142.53
			}
		},
		17: { // Headlong Rush
			0: {
				type: 'dash',
				fixedSpeed: 1,
				length: 1000,
				distance: 413
			}
		},
		18: { // Overpower
			0: {
				fixedSpeed: 1,
				length: 200
			}
		},
		19: { // Tenacity
			0: {
				fixedSpeed: 1,
				length: [500, 700]
				//noInterrupt: [4]
			}
        },
		20: { // In Cold Blood
			0: {
				triggerAbnormal: { 23220: 2000 },
				fixedSpeed: 1,
				length: 1185
				//noInterrupt: [4]
			}
		},
		21: { //Exhausting Blow
		    0: {
				length: 1175,
			    distance: 75
				//noInterrupt: [4]
			},
		},
		23: { // Measured Slice
			'*': {
				distance: 190
			},
			0: {
				length: 3685,
				noInterrupt: [1, 2, 3, 4, 6, 9, 10, 12, 13, 14, 15, 16, 17, 21, 22],
				chains: {
					8: 30,
					24: 30,
					25: 30
				}
			},
			30: { length: 1670 }
 		},
		24: { // Eviscerate
			0: {
				length: 1915,
				distance: 50,
				noInterrupt: ['1-0', '1-1', '1-2', 4, 6, 10, 14, 16, 17, 21, 22, 24],
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
			30: {
				 length: 1500,
				 distance: 100
			}
		},
		25: { // Ultimate Overhand Strike
			'*': { distance: 170 },
			0: { length: 3365 },
			30: { length: 1325 }
		}
	},
	3: { // Berserker
		1: { // Combo Attack
			'*': { noInterrupt: [1, 2, 4] },
			0: {
				length: 1155,
				distance: 78
			},
			1: {
				length: 925,
				distance: 21.05
			},
			2: {
				length: 1125,
				distance: 31.84
			},
			3: {
				length: 1825,
				distance: 54.28
			}
		},
		2: { // Axe Block
		    '*': { type: 'holdInfinite' },
			0: { fixedSpeed: 1 },
			30: true,
			31: { fixedSpeed: 1 }
		},
		3: { // Thunderstrike
			'*': {
				type: 'chargeCast',
				length: 1750
			},
			0: {
				type: 'charging',
				length: [650, 650, 650], // These are the charging states, overcharging isn't emulated
				noInterrupt: [2, 4, 10, 15, 18, 24, 25, 30],
				glyphs: {
					24067: { chargeSpeed: 0.25 }
				},
				abnormals: {
					24130: { chargeSpeed: 0.3 },
					24170: { chargeSpeed: 0.25 },
					4010150: { chargeSpeed: 0.2 }
				}
			},
			10: {
				distance: 85.74, // Cast F. - TODO
                noInterrupt: [2, 4, 24, 25, 30]			
			}, 
			11: {
				distance: 85.74,
                noInterrupt: [2, 4, 24, 25, 30]
			},
			12: {
				distance: 85.74,
                noInterrupt: [2, 4, 24, 25, 30]		
	        },
			13: {
				distance: 85.74,
				noInterrupt: [2, 4, 24, 25, 30]			  
			}
		},
		4: { // Flatten
			'*': {
				length: 3150,
				distance: 105.685,
				glyphs: {
					24008: { speed: 1.25 },
					24050: { speed: 1.25 }
				},
				abnormals: {
					24100: { speed: 1.25 },
					24101: { speed: 1.30 }
				}
			},
			0: {
				noInterrupt: [1, 2, '3-10', '3-11', '3-12', '3-13', 4, '8-30', '10-10', '10-11', '10-12', 11, '10-13', 12, 13, '15-10', '15-11', '15-12', '15-13', '15-14', '16', '18-10', '18-11', '18-12', '18-13', 24, 27, 28, 29, 30, 31, '32-0'],
				abnormals: {
					401400: { chain: 1 }
				},
				chains: {
					6: 30,
					25: 30,
					32: 31				
				}
			},
			1: { chains: {
					6: 31,
					25: 31
				 }
		    },
			30: { length: 2350 },
			31: { length: 2350 }
		},
		5: { // Dash
			0: {
				fixedSpeed: 1,
				length: 700,
				noInterrupt: [2]
			}
		},
		6: { // Sweeping Strike
			'*': {
				length: 1285,
				distance: 80.47,
				noRetry: true
			},
			0: { 
				noInterrupt: [2],
			    interruptibleWithAbnormal: {
				    401404: 2
				},
				abnormals: {
					401404: { chain: 30 }
				}
		    },
			1:  true,
			30: true,
		},
		7: { // Mocking Shout
		    0: {
				fixedSpeed: 1,
				length: [315, 1100],
				noInterrupt: [2]
				
			}
        },
		8: { // Fiery Rage
			'*': { noInterrupt: [2] },
			0: {
				fixedSpeed: 1,
				length: 600
			},
			30: { 
				length: 1760,
				requiredBuff: 401400
		    }
		},
		10: { // Cyclone
			'*': { type: 'chargeCast' },
			0: {
				type: 'charging',
				length: [650, 650, 650],
			    noInterrupt: [2, 3, 4, 15, 18, 24, 25, 30],
				glyphs: {
					24009: { chargeSpeed: 0.25 },
					24052: { chargeSpeed: 0.25 },
					24096: { chargeSpeed: 0.3 }
				},
				abnormals: {
					24010: { chargeSpeed: 0.3 },
					24190: { chargeSpeed: 0.3 },
					4010150: { chargeSpeed: 0.2 },
					401400: { chain: 6 }
				}
			},
			10: {
				length: 1325, // Cast F. - TODO
				distance: 50,
				noInterrupt: [2, 4, 24, 25, 30] 
			},
			11: {
				length: [375, 375, 1325],
				distance: [33.33, 33.33, 0],
				noInterrupt: [2, 4, 24, 25, 30]
			},
			12: {
				length: [375, 375, 375, 375, 1325],
				distance: [33.33, 33.33, 33.33, 33.33, 0],
				noInterrupt: [2, 4, 24, 25, 30]
			},
			13: {
				length: [375, 375, 375, 375, 1325],
				distance: [33.33, 33.33, 33.33, 33.33, 0],
				noInterrupt: [2, 4, 15, 24, 25, 30]
			}
		},
		11: { // Leaping Strike 
			0: {
				length: 2290,
				distance: 250,
				noInterrupt: [2]
			}
		},
		12: { // Unchained Anger
			'*': { 
				length: [1050, 550],
				noInterrupt: [2]
			},
			30: true,
			31: true
		},
		13: { // Retaliate (TODO: Check)
			0: {
				type: 'retaliate',
				length: 1625,
				noInterrupt: [2],
				noRetry: true
			}
		},
		/*15: { // Vampiric Blow
            '*': {                    // Chained VB Usage: 1. "Show default Chained Skills" in the Chained Skills menu must be on.        
				type: 'chargeCast',  //                    2. Must be in combat when used.  
				length: 1940        //                    Else the animation of VB won't go off causing slight desync.
			 },                                                		                               
            0: {             
                type: 'charging',       
				length: [800, 800, 800],
				noInterrupt: [2, 4, 24, 25, 30],
				abnormals: {
					4010150: { chargeSpeed: 0.2 }
				},
				chains: {
                    3: 14,
                    10: 14,
                    18: 14
                }
            },
            10: {
				distance: 72.78,
				noInterrupt: [2, 4, 24, 25, 30]
			},
            11: {
				distance: 72.78,
				noInterrupt: [2, 4, 24, 25, 30]
			},
            12: {
				distance: 72.78,
				noInterrupt: [2, 4, 24, 25, 30]
			},
            13: {
				distance: 72.78,
				noInterrupt: [2, 4, 24, 25, 30]
			},
            14: { distance: 72.78 }
		},*/
		16: { // Fearsome Shout
		    0: {
				fixedSpeed: 1,
				length: [700, 1425],
				noInterrupt: [2]
			}
		},
		18: { // Lethal Strike (TODO: Check)
			'*': {
				type: 'chargeCast',
				length: 1515
		    },
			0: {
				type: 'charging',
				length: [800, 800, 800],
				noInterrupt: [2, 3, 4, 10, 15, 24, 25, 30],
				abnormals:  {
					24120: { chargeSpeed: 0.3 },
					4010150: { chargeSpeed: 0.2 },
					401400: { chain: 6 }
			    }
			},
			10: {
			    distance: 171.48,
                noInterrupt: [2, 4, 24, 25, 30]
			},
			11: {
				distance: 171.48,
				noInterrupt: [2, 4, 24, 25, 30]
			 },
			12: {
				distance: 171.48,
				noInterrupt: [2, 4, 24, 25, 30]
		    },
			13: {
				distance: 171.48,
				noInterrupt: [2, 4, 15, 24, 25, 30]
			}
		},
		19: { // Tenacity
			0: {
				fixedSpeed: 1,
				length: [500, 710],
				noInterrupt: [2]				
			}
        },
		20: { // Inescapable Doom
		    0: { 
			    fixedSpeed: 1,
				length: [600, 900],
				noInterrupt: [2]
			}
		},			
		21: { // Bloodlust
			0: {
				fixedSpeed: 1,
				length: 700,
				noInterrupt: [2]
			}
		},
		24: { // Evasive Smash (TODO: Check)
			'*': {
				length: 1640,
				distance: 167.625
			},
			0: {
				length: 1015,
				distance: 150
			},
			10: { noInterrupt: [2, 3, 4, 10, 15, 18, 25, 30] },
			11: { noInterrupt: [2, 3, 4, 10, 15, 18, 25, 30] },
			12: { noInterrupt: [2, 3, 4, 10, 15, 18, 25, 30] },
			13: { noInterrupt: [2, 3, 4, 10, 15, 18, 25, 30] }
		},
		25: { // Raze
			'*': { 
				length: 1205,
				distance: 96,
				glyphs: {
					24078: { speed: 1.25 }
				}
			},
			0: {
				noInterrupt: [2, '3-10', '3-11', '3-12', '3-13', 4, '8-30', '10-10', '10-11', '10-12', '10-13', 11, 12, 13, '15-10', '15-11', '15-12', '15-13', '15-14', '18-10', '18-11', '18-12', '18-13', 24, 25, 26, 27, 28, 29, '32-0'],
				interruptibleWithAbnormal: { 
					401404: 2
				}, 
				abnormals: {
					401404: { chain: 31 }
				},
				chains: {
					1: 30,
					30: 31,
					31: 30,
					32: 31
				}
			},
			1: true,
			30: { length: 965 },
			31: { length: 965 }
		},
		26: { // Tackle
			0: {
				length: 1000,
				distance: 80,
				noInterrupt: [2]
			}
		},
		27: { // Unbreakable
			0: { 
				length: 2100,
				noInterrupt: [2] 
			},
		},
		28: { // Intimidation
		    0: {
				length: 1560,
				noInterrupt: [2]               
			},
		    50: { 
			    length: 1560,
                noInterrupt: [2]
			}
		},
		29: { // Evasive Roll (TODO: Check)
			0: {
				length: 920,
				distance: 150,
				forceClip: true,
				noInterrupt: [2, 29]
			}
		},
		30: { // Axe Counter (TODO: Check)
		    '*': {
				length: 650,
				distance: 21.05,
				noInterrupt: [1, '3-10', '3-11', '3-12', '3-13', 4, 6, '8-30', '10-10', '10-11', '10-12', '10-13', 11, 12, 13, '15-10', '15-11', '15-12', '15-13', '15-14', '18-10', '18-11', '18-12', '18-13', 24, 25, 26, 27, 28, 29, 30, 31, 32],
				requiredBuff: 401402
			},
			0: true,
			30: true
		},
		31: { // Overwhelm (TODO: Check)
			0: {
				type: 'dash',
				fixedSpeed: 1,
				length: 1135,
				distance: 470,
				noInterrupt: [2],
				noRetry: true
			},
			1: { 
				length: 1340,
			    noInterrupt: [2]
            }
		},
		32: { // Punishing Strike (TODO: Check)
			'*': {
				noInterrupt: [2],
				requiredBuff: 401400
			},
			0: {
				length: 795,
				distance: 31.575
			},
			1: {
				length: 835,
				distance: 134.1
			}
		}
	},
	4: { // Sorcerer
		1: { // Fireball
			0: { length: 730 }
		},
		2: { // Frost Sphere
			0: { length: 1010 } // Popori/M.Casta/M.Helf/M.Human/F.Casta/F.Aman/F.Helf/F.Human: 810 | Baraka: 910 | Elin: 1010 | M.Aman: 1255
		},
		3: { // Lightning Trap
			0: {
				length: 1300,
				abnormals: {
					25090: { speed: 1.4 }
				}
			}
		},
		4: { // Arcane Pulse
			'*': {
				type: 'chargeCast',
				length: 1015 // Elin: 1015  | Any other race: 1285
			},
			0: {
				type: 'charging',
				length: [1000, 1000],
				noInterrupt: [7, 26],
				abnormals: {
					25140: { chargeSpeed: 0.3 }
				}
			},
			10: {
				noInterrupt: [7, 26],
				abnormals: {
					500150: { skill: 330110 },
					501600: { skill: 330150 },
					501650: { skill: 330150 }
				}
			},
			11: {
				noInterrupt: [7, 26],
				abnormals: {
					500150: { skill: 330111 },
					501600: { skill: 330150 },
					501650: { skill: 330150 }
				}
			},
			12: {
				noInterrupt: [7, 26],
				abnormals: {
					500150: { skill: 330112 },
					501600: { skill: 330150 },
					501650: { skill: 330150 }
				}
			}
		},
		5: { // Mana Infusion
			0: { length: 4600 }
		},
		6: { // Meteor Strike
			0: {
				length: 3725, // Elin: 3725 | Any other race: 3925
				glyphs: {
					25003: { speed: 1.17 },
					25069: { speed: 1.25 }
				},
				abnormals: {
					25100: { speed: 1.25 },
					500150: { skill: 320100 },
					//501600: { skill: 320150 },
					501650: { skill: 320150 }
				}
			}
		},
		7: { // Backstep
			0: {
				length: 660,
				distance: -200,
				forceClip: true
			}
		},
		8: { // Flame Pillar
			0: {
				length: 1200,
				abnormals: {
					25070: { speed: 1.25 }
				}
			}
		},
		10: { // Mana Barrier
			0: { length: 625 }
		},
		11: { // Lightning Strike
			0: { length: 805 } // Elin: 805  | Any other race: 835/845
		},
		12: { // Void Pulse
			0: { length: 935 }
		},
		13: { // Mindblast
			0: {
				length: 2325,
				glyphs: {
					25048: { speed: 1.3 }
				},
				abnormals: {
					25110: { speed: 1.4 }
				}
			}
		},
		16: { // Painblast
			0: { length: 1330 } // Elin: 1330 | Popori: 1580
		},
		17: { // Painful Trap
			0: { length: 1100 }
		},
		18: { // Glacial Retreat
			0: {
				length: 1100,
				distance: -187.5,
				forceClip: true
			}
		},
		19: { // Mana Siphon
			'*': {
				type: 'chargeCast',
				length: 900
			},
			0: {
				type: 'charging',
				length: [1000, 1000],
				noInterrupt: [7, 26]
			},
			10: {noInterrupt: [7, 26] },
			11: {noInterrupt: [7, 26] },
			12: {noInterrupt: [7, 26] }
		},
		20: { // Flaming Barrage
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 4900
			},
			10: {
				type: 'lockonCast',
				length: 1500,
				glyphs: {
					25001: { speed: 1.3 },
					25096: { speed: 1.4 }
				},
				abnormals: {
					25060: { speed: 1.25 }
				}
			}
		},
		21: { // Nerve Exhaustion
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 4900
			},
			10: {
				type: 'lockonCast',
				fixedSpeed: 1,
				length: [300, 1200]
			}
		},
		22: { // Burning Breath
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 4900
			},
			10: {
				type: 'lockonCast',
				fixedSpeed: 1,
				length: [300, 1200]
			}
		},
		23: { // Mana Volley
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 4900
			},
			10: {
				type: 'lockonCast',
				fixedSpeed: 1,
				length: [325, 875]
			}
		},
		25: { // Time Gyre
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 4900
			},
			10: {
				type: 'lockonCast',
				fixedSpeed: 1,
				length: 700
			}
		},
		26: { // Teleport Jaunt
			0: {
				type: 'teleport',
				length: [200, 260],
				distance: [0, 333],
				noInterrupt: [26],
				teleportStage: 1,
				noRetry: true
			}
		},
		27: { // Hailstorm
			0: { length: 980 }
		},
		30: { // Nova
			0: {
				length: 2850,
				glyphs: {
					25092: { speed: 1.3 }
				}
			}
		},
		31: { // Warp Barrier
			'*': { length: 475 },
			0: true,
			10: true,
			20: true
		},
		32: { // Meteor Shower
			'*': {
				length: 6475, // Elin: 6475 | M.Helf/F.Casta: 6750/6775
				glyphs: {
					25003: { speed: 1.17 },
					25069: { speed: 1.25 }
				},
				noRetry: true
			},
			0: true,
			50: { length: 3700 }
		},
		33: { // Arcane Pulse (Mana Boost)
			'*': {
				type: 'chargeCast',
				length: 1015, // Elin: 1015  | Any other race: 1285
				noRetry: true
			},
			10: true,
			11: true,
			12: true,
			50: true
		},
		34: { // Mana Boost
			0: { length: 750 }
		}
	},
	5: { // Archer
		1: { // Arrow
			0: { length: 400 }
		},
		2: { // Arrow Volley
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 4900,
				noInterrupt: [22],
				noRetry: true,
				length: 4900
			},
			10: {
				type: 'lockonCast',
				length: 1225,
				noInterrupt: [22]
			}
		},
		3: { // Radiant Arrow
			'*': {
				type: 'chargeCast',
				length: 1760
			},
			0: {
				type: 'charging',
				length: [600, 600, 600],
				noInterrupt: [4, 22],
				abnormals: {
					26180: { chargeSpeed: 0.3 },
					601450: { chargeSpeed: 0.5 }
				}
			},
			10: { 
				distance: -100,
				noInterrupt: [22]
			}, // Cast F. - TODO
			11: { 
				distance: -100,
				noInterrupt: [22]
			},
			12: { 
				distance: -100,
				noInterrupt: [22]
			},
			13: { 
				distance: -100,
				noInterrupt: [22]
			}
		},
		4: { // Penetrating Arrow
			'*': {
				type: 'chargeCast',
				length: 1315
			},
			0: {
				type: 'charging',
				length: [800, 800, 800],
				noInterrupt: [3, 22],
				abnormals: {
					26160: { chargeSpeed: 0.3 },
					26170: { chargeSpeed: 0.3 },
					26171: { chargeSpeed: 0.4 },
					26190: { chargeSpeed: 0.3 },
					601450: { chargeSpeed: 0.5 }
				}
			},
			10: { 
				distance: -50,
				noInterrupt: [22]
			}, // Cast F. - TODO
			11: { 
				distance: -50,
				noInterrupt: [22]
		    },
			12: { 
				distance: -50,
				noInterrupt: [22]
			},
			13: { 
				distance: -50,
				noInterrupt: [22]
			}
		},
		5: { // Rain of Arrows
			0: {
				length: 3200,
				glyphs: {
					26077: { speed: 1.4 }
				},
				abnormals: {
					902: { speed: 1.15 },
					911: { speed: 1.15 },
					916: { speed: 1.15 },
					920: { speed: 1.225 }
				}
			}
		},
		6: { // Backstep
			0: {
				length: 705,
				distance: -200,
				forceClip: true
			}
		},
		7: { // Feign Death
			0: {
				fixedSpeed: 1,
				length: [2950, 54525, 1675],
				distance: [-114.05, 0, 0]
			}
		},
		8: { // Rapid Fire
			'*': { 
				noRetry: true,
				noInterrupt: [22]
			},
			0: { 
				length: 433,
				noInterrupt: [6] 
			},
			1: { length: 600 },
			2: { length: 700 },
			3: { length: 800 },
			4: { length: 700 },
			5: { length: 800 },
			6: { length: 1233 }
		},
		9: { // Slow Trap
			0: { length: 1150 }
		},
		10: { // Stunning Trap
			0: { length: 1150 }
		},
		12: { // Velik's Mark
			0: { length: 200 }
		},
		14: { // Retaliate
		    0: {
				type: 'retaliate',
				length: 1600,
                noRetry: true	
			}
		},
		15: { // Incendiary Trap
			0: { length: 1150 }
		},
		16: { // Breakaway Bolt
			0: {
				length: 1375,
				distance: -250,
				forceClip: true
			}
		},
		17: { // Web Arrow
			0: { 
				length: 525,
				noInterrupt: [22]
			}
		},
		18: { // Close Quarters
			0: {
				length: 300,
				distance: 89.8
			},
			1: {
				length: 1200,
				distance: 87.29
			}
		},
		19: { // Poison Arrow
			0: { 
				length: 1125,
				distance: -12.5,
				noInterrupt: [22]
			}
		},
		20: { // Restraining Arrow
			0: { 
				length: 525,
				noInterrupt: [22]
			}
		},
		21: { // Sniper's Eye
		    0:  { length: 625 },
			50: { length: 625 }
		},
		22: { // Sequential Fire
			0: {
				length: 500,
				requiredBuff: 600200,
				noRetry: true,
				noInterrupt: [22]
			}
		},
		23: { // Stunning Trap Arrow
			0: { length: 1450 }
		},
		25: { // Incendiary Trap Arrow
			0: { length: 1225 }
		},
		29: { // Thunderbolt
			0: {
				length: 3750,
				distance: -100,
				noInterrupt: [22],
				glyphs: {
					26089: { speed: 1.3 },
					26102: { speed: 1.3 }
				}
			}
		},
		31: { // Tenacity
			0: {
				fixedSpeed: 1,
				length: [500, 750]
			}
		},
		32: { // Find Weakness
			0: {
				fixedSpeed: 1,
				length: 200
			}
		},
		33: { // Chase
			0: {
				type: 'dash',
				fixedSpeed: 1,
				length: 1075,
				distance: 413
			}
		}
	},
	6: { // Priest
		1: { // Divine Radiance
			0: { length: 625 },
			1: { length: 650 },
			2: { length: 675 },
			3: { length: 725 }
		},
		2: { // Regeneration Circle
			0: {
				length: 3150,
				abnormals: {
					902: { speed: 1.15 },
					911: { speed: 1.15 },
					916: { speed: 1.15 },
					920: { speed: 1.225 }
				}
			}
		},
		3: { // Healing Circle
			0: { length: 1750 }
		},
		5: { // Blessing of Shakan
			0: { length: 1300 }
		},
		6: { // Arise
			0: { length: 830 }
		},
		8: { // Mana Infusion
			0: {
				length: 4600,
				glyphs: {
					28044: { speed: 1.25 }
				}
			}
		},
		10: { // Purifying Circle
			0: { length: 1275 }
		},
		11: { // Metamorphic Blast
			0: { length: 830 }
		},
		12: { // Resurrect
			0: {
				length: 5915, // 5900
				glyphs: {
					28045: { speed: 1.15 }
				},
				abnormals: {
					902: { speed: 1.15 },
					911: { speed: 1.15 },
					916: { speed: 1.15 },
					920: { speed: 1.225 }
				}
			}
		},
		14: { // Summon: Party
			0: { length: 4500 }
		},
		16: { // Shocking Implosion
			0: { length: 1700 }
		},
		17: { // Prayer of Peace
			0: {
				length: [925, 925, 850],
				glyphs: {
					28021: { speed: 2 }
				}
			}
		},
		18: { // Heal Thyself
			0: { length: 1250 }
		},
		19: { // Focus Heal
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 54440
			},
			10: {
				type: 'lockonCast',
				length: 1940
			}
		},
		22: { // Kaia's Shield
			0: { length: 650 }
		},
		23: { // Blessing of Balder
			0: { length: 1300 }
		},
		26: { // Fiery Escape
			0: {
				length: 1125,
				distance: -250.5,
				forceClip: true
			}
		},
		27: { // Final Reprisal
			0: {
				length: 2600,
				noInterrupt: [2, 3, 5, 10, 12, 14, 17, 18, 19, 23, 25, 26, 27, 28-10, 34, 38, 41-10],
				chains: {
					11: 30,
					16: 30,
					29: 30,
					40: 30
				}
			},
			30: { length: 1040 }
		},
		28: { // Mana Charge
			'*': {
				type: 'chargeCast',
				length: 825
			},
			0: {
				type: 'charging',
				length: [800, 1600],
				noInterrupt: [26, 27, 38],
				glyphs: {
					28031: { chargeSpeed: 0.25 }
				}
			},
			10: { noInterrupt: [26, 27, 38] },
			11: { noInterrupt: [26, 27, 38] },
			12: { noInterrupt: [26, 27, 38] }
		},
		29: { // Triple Nemesis
			0: { length: 800 },
			1: { length: 800 },
			2: { length: 1250 }
		},
		30: { // Plague of Exhaustion
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 4900
			},
			10: {
				type: 'lockonCast',
				fixedSpeed: 1,
				length: 1430
			}
		},
		31: { // Guardian Sanctuary
			0: {
				fixedSpeed: 1,
				length: 700
			}
		},
		32: { // Divine Respite
			0: {
				fixedSpeed: 1,
				length: [1300, 900]
			}
		},
		33: { // Ishara's Lullaby
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 4900,
				noRetry: true
			},
			10: {
				type: 'lockonCast',
				fixedSpeed: 1,
				length: [300, 1430]
			}
		},
		34: { // Restorative Burst
			0: { length: 1430 }
		},
		35: { // Energy Stars
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 4900
			},
			10: {
				type: 'lockonCast',
				fixedSpeed: 1,
				length: 1430
			}
		},
		37: { // Healing Immersion
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 4900,
				noInterrupt: [37],
				partyOnly: true
			},
			10: {
				type: 'lockonCast',
				fixedSpeed: 1,
				length: 1430,
				noInterrupt: ['37-10']
			}
		},
		38: { // Backstep
			0: {
				length: 665,
				distance: -200,
				forceClip: true
			}
		},
		39: { // Grace of Resurrection
			0: { length: 5900 }
		},
		40: { // Zenobia's Vortex
			0: { length: 1080 }
		},
		41: { // Divine Intervention
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 54440,
				partyOnly: true
			},
			10: {
				type: 'lockonCast',
				length: 925
			}
		}
	},
	7: { // Mystic
		1: { // Sharan Bolt
			0: { length: 675 },
			1: { length: 675 },
			2: { length: 675 },
			3: { length: 675 }
		},
		2: { // Corruption Ring
			0: {
				type: 'hold',
				length: 10850,
				chainOnRelease: 11
			},
			11: { length: 825 },
			12: { length: 1275 }
		},
		4: { // Ancient Binding
			0: { length: 1280 }
		},
		5: { // Titanic Favor
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 59900
			},
			10: {
				type: 'lockonCast',
				length: 1940
			}
		},
		6: { // Shara's Lash
			0: { length: 1300 }
		},
		8: { // Metamorphic Blast
			0: {
				length: 820,
				noInterrupt: [1, 2, 4, '5-10', 6, '9-10', 10, 13, 14, 15, 16, 17, 21, '18-10', '22-10', 37, '41-10', 43], // The skill behaves the same way Metamorphic Smite does from lvls 1 to 10 then at lvl 11 it loses its cancelling properties
				chains: {
					8: 30,
					23: 30
				}
			},
			30: { length: 820 }
		},
		9: { // Arun's Cleansing
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 59900
			},
			10: {
				type: 'lockonCast',
				length: 790
			}
		},
		10: { // Resurrect
			0: {
				length: 8080, // 8050
				glyphs: {
					27049: { speed: 1.2 },
					27079: { speed: 1.2 }
				},
				abnormals: {
					902: { speed: 1.25 },
					911: { speed: 1.25 },
					916: { speed: 1.25 },
					920: { speed: 1.375 }
				}
			}
		},
		11: { // Summon: Party
			0: { length: 4400 }
		},
		12: { // Vow of Rebirth
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 59900,
				partyOnly: true
			},
			10: {
				type: 'lockonCast',
				length: 1940
			}
		},
		13: { // Aura of the Merciless
			'*': { length: 1300 },
			0: true,
			50: true
		},
		14: { // Aura of the Swift
			'*': { length: 1300 },
			0: true,
			50: true
		},
		15: { // Aura of the Unyielding
			'*': { length: 1300 },
			0: true,
			50: true
		},
		16: { // Aura of the Tenacious
			'*': { length: 1300 },
			0: true,
			50: true
		},
		17: { // Teleport Jaunt
			0: {
				type: 'teleport',
				length: [200, 260],
				distance: [0, 333],
				noInterrupt: [17],
				teleportStage: 1,
				noRetry: true
			}
		},
		18: { // Arun's Vitae
			'*': { noInterrupt: [8, 17, 23] },
			0: {
				type: 'charging',
				length: 1475
			},
			10: {
				type: 'chargeCast',
				length: 850,
				abnormals: {
					27070: { speed: 1.25 },
					27080: { speed: 1.25 }
				}
			}
		},
		21: { // Retaliate
			0: {
				type: 'retaliate',
				length: 1625,
				noRetry: true
			}
		},
		22: { // Arun's Tears
		    '*': { noInterrupt: [8, 17, 23] },
			0: {
				type: 'charging',
				length: 1475
			},
			10: {
				type: 'chargeCast',
				length: 850,
				abnormals: {
					27100: { speed: 1.25 }
				}
			}
		},
		23: { // Metamorphic Smite
			0: {
				length: 1430,
				noInterrupt: [1, 2, 4, '5-10', 6, '9-10', 10, 13, 14, 15, 16, 17, '18-10', 21, '22-10', 23, 37, '41-10', 43],
				chains: {
					8: 30
				}
			},
			30: { length: 1100 }
		},
		24: { // Volley of Curses
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 4900
			},
			10: {
				type: 'lockonCast',
				fixedSpeed: 1,
				length: [525, 675]
			}
		},
		25: { // Thrall of Protection
			0: {
				fixedSpeed: 1,
				length: [1000, 1720]
			}
		},
		27: { // Thrall of Life
			0: {
				fixedSpeed: 1,
				length: [275, 575]
			}
		},
		28: { // Sonorous Dreams
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 4900
			},
			10: {
				type: 'lockonCast',
				fixedSpeed: 1,
				length: 1430
			}
		},
		29: { // Regression
			fixedSpeed: 1,
			length: [500, 700]
		},
		30: { // Curse of Exhaustion
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 4900
			},
			10: {
				type: 'lockonCast',
				fixedSpeed: 1,
				length: 1430
			}
		},
		31: { // Curse of Confusion
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 4900
			},
			10: {
				type: 'lockonCast',
				fixedSpeed: 1,
				length: 1430
			}
		},
		32: { // Mire
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 4900
			},
			10: {
				type: 'lockonCast',
				fixedSpeed: 1,
				length: 1430
			}
		},
		33: { // Thrall of Vengeance
			0: {
				fixedSpeed: 1,
				length: [275, 575]
			}
		},
		34: { // Thrall of Wrath
			0: {
				fixedSpeed: 1,
				length: [1000, 1700]
			}
		},
		35: { // Command: Attack
			0: {
				fixedSpeed: 1,
				length: 700
			}
		},
		36: { // Command: Follow
			0: {
				fixedSpeed: 1,
				length: 700
			}
		},
		37: { // Warding Totem
			0: { length: 1900 }
		},
		41: { // Contagion
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 4900
			},
			10: {
				type: 'lockonCast',
				length: 1000
			}
		},
		42: { // Boomerang Pulse
			0: {
				length: 550, // 530, 550, 575
				noInterrupt: [42]
			}
		},
		43: { // Release																																																																							
			0: { length: [400, 575] }
		}
	},
	8: { // Reaper
		'*' : { consumeAbnormal: [10151020, 10151021, 10151022, 10141023] },
		1: { // Spiral Barrage
			'*': {
				length: 1000,
				distance: 48,
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
				noInterrupt: [3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 20, 40],
				abnormals: {
					10151020: { chain: 2 },
					10151021: { chain: 3 },
					10151022: { chain: 4 },
					10151023: { chain: 5 }
				},
				chains: { 1: 1 },
				noRetry: true
			},
			0: { triggerAbnormal: { 10151020: 2000 } },
			1: { triggerAbnormal: { 10151020: 2000 } },
			2: {
				length: 1200,
				distance: 42,
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
				triggerAbnormal: { 10151021: 2000 },
			},
			3: {
				length: 860,
				distance: 56,
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
				triggerAbnormal: { 10151022: 1800 },
			},
			4: {
				length: 1400,
				distance: 60,
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
				triggerAbnormal: { 10151023: 2000 },
			},
			5: {
				length: 1900,
				distance: 91,
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
				length: 2025,
				noInterrupt: ['1-0', '1-2', 3, 4, 12, 14, 20],
				abnormals: {
					29030: { speed: 1.25 }
				},
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
			0: true,
			30: true
		},
		4: { // Sundering Strike
			'*': { noRetry: true },
			0: {
				type: 'nullChain',
				length: [1175, 1750, 1025],
				distance: [0, 100, 0],
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
				},
				noInterrupt: [1, 4, 8, 9, 10, 11, 12, 14, 20]
			},
			30: {
				length: [1750, 1025],
				distance: [100, 0],
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
				distance: [120, 0],
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
				length: [2400, 975],
				noInterrupt: ['1-0', '1-2', 4, 12, 14, 20],
				chains: {
					1: 30,
					3: 30,
					5: 30,
					6: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30
				}
			},
			30: { length: [1450, 975] }
		},
		6: { // Death Spiral
			'*': {
				length: 1250,
				abnormals: {
					10151131: { chain: 31 }
				},
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
				noRetry: true
			},
			0: { noInterrupt: ['6-31'] },
			30: true,
			31: true
		},
		8: { // Whipsaw
			'*': {
				length: 2500,
				noInterrupt: [4, 5, 6, 8, 9, 11, 12, 14, 20],
				chains: {
					1: 30,
					3: 30,
					10: 30
				}
			},
			0: true,
			30: true
		},
		9: { // Smite
			0: {
				length: 1725,
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
				noInterrupt: [1, 3, 4, 5, 6, 8, 9, 10, 11, 12, 14, 20]
			}
		},
		10: { // Pendulum Strike
			'*': {
				length: 1000,
				distance: -200,
				noInterrupt: [10],
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
					14: 30
				}
			},
			0: true,
			30: true
		},
		11: { // Shadow Lash
			'*': {
				length: 1250, // Length for any stage unless the stage itself has one stated already
				noRetry: true,
				noInterrupt: [1, 3, 4, 5, 6, 8, 9, 10, 12, 13, 14, 15, 16, 18, 20, 40]
			},
			0: {
				length: 2150, // Specific length for stage 0
				triggerAbnormal: { 10151040: 2000 },
				abnormals: {
					10151040: { chain: 1 },
					10151041: { chain: 2 },
					10151042: { chain: 3 }
				}
			},
			1: { 
				consumeAbnormal: 10151040,
				triggerAbnormal: { 10151041: 2000 }
			},
			2: { 
				consumeAbnormal: 10151041,
				triggerAbnormal: { 10151042: 2000 }
			},
			3: { consumeAbnormal: 10151042 }
		},
		12: { // Shadow Burst
			'*': {
				glyphs: {
					29026: { speed: 1.25 }
				}
			},
			0: {
				length: 3265,
				noInterrupt: [1, 3, 4, 5, 6, 8, 9, 10, 11, 14, 20],
				chains: {
					12: 1
				}
			},
			1: {
				length: 2060,
				noInterrupt: ['12-1']
			}
		},
		/*14: { // Retaliate
			0: {
				type: 'retaliate',
				length: 1610,
				noRetry: true
			}
		},*/
		15: { // Retribution
			0: {
				fixedSpeed: 1,
				length: 1575
			}
		},
		16: { // Shadow Reaping
			0: {
				fixedSpeed: 1,
				length: 775
			}
		},
		18: { // Shrouded Escape
			0: {
				length: 850,
				distance: 150
			}
		},
		40: { // Shadow Step
			'*': {
				length: 700,
				distance: 180,
				forceClip: true,
				abnormals: {
					10151000: { chain: 30 }
				}
			},
			0: true,
			30: true
		}
	},
	9: { // Gunner
		1: { // Blast
			'*': {
				fixedSpeed: 1,
				noRetry: true,
				length: 1200,
				noInterrupt: [1]
			},
			1: true,
			2: true
		},
		3: { // Scattershot
			'*': {
				length: 1725,
				distance: -108,
				noInterrupt: [3],
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
				chains: {
					'2-1': 30,
					4: 30,
					'7-3': 30,
					'9-11': 30,
					10: 30,
					11: 30,
					13: 30,
					15: 30,
					19: 30,
					40: 30
				}
			},
			1: true,
			2: true,
			30: true
		},
		4: { // Point Blank
			'*': {
				length: 1525,
				distance: 137.88,
				noInterrupt: ['4-3'],
				chains: {
					'2-1': 30,
					3: 30,
					4: 4,
					'7-3': 30,
					'9-10': 30,
					'9-11': 30,
					10: 30,
					11: 30,
					13: 30,
					15: 30,
					19: 30,
					40: 30
				}
			},
			1: { noRetry: true },
			2: { noRetry: true },
			3: {
				length: 1200,
				distance: -198.53
			},
			4: {
				length: 1200,
				distance: -198.53
			},
			30: { noRetry: true }
		},
		5: { // Burst Fire
			0: { length: 850 },
			1: {
				fixedSpeed: 1,
				length: 122,
				stamina: 70,
				instantStamina: true,
				glyphs: {
					30046: { stamina: -10 }
				}
			}
		},
		6: { // Time Bomb
			'*': {
				fixedSpeed: 1,
				length: 1000
			},
			1: true,
			2: true
		},
		7: { // Arcane Barrage
			'*': { length: 1525 },
			1: {
				fixedSpeed: 1,
				noInterrupt: [7],
				noRetry: true
			},
			2: {
				fixedSpeed: 1,
				noInterrupt: [7],
				noRetry: true
			},
			3: {
				requiredBuff: 10152040,  
				length: 1200
			}
		},
		9: { // Mana Missiles
			'*': {
				type: 'chargeCast',
				length: 1250
			},
			0: {
				type: 'charging',
				length: 1280 
			},
			10: { distance: -50 },
			11: { distance: -100 }
		},
		10: { // Arc Bomb
			'*': {
				length: 1325,
				chains: {
					15: 30,
					40: 30
				},
				chains: {
					'2-1': 30,
					3: 30,
					4: 30,
					'7-3': 30,
					'9-10': 30,
					'9-11': 30,
					10: 30,
					11: 30,
					13: 30,
					15: 30,
					19: 30,
					40: 30
				}
			},
			1: true,
			2: true,
			30: true
		},
		11: { // Rocket Jump
			'*': {
				length: 1400,
				noInterrupt: [15],
				distance: 415.45,
				chains: {
					'2-1': 30,
					3: 30,
					4: 30,
					'7-3': 30,
					'9-10': 30,
					'9-11': 30,
					10: 30,
					11: 30,
					13: 30,
					//15: 30, fixed with noInterrupt but anyway it can't chain
					19: 30,
					40: 31
				}
			},
			1: true,
			2: true,
			30: true,
			31: {
				length: 1700,
				distance: 503.64
			}
		},
		13: { // Balder's Vengeance
			'*': {
				length: 5800,
				distance: -269.09,
				chains: {
					'2-1': 30,
					3: 30,
					4: 30,
					'7-3': 30,
					'9-10': 30,
					'9-11': 30,
					10: 30,
					11: 30,
					13: 30,
					15: 30,
					19: 30,
					40: 30
				},
				noRetry: true
			},
			1: true,
			2: true,
			30: true
		},
		15: { // Replenishment
			'*': {
				fixedSpeed: 1,
				length: 1325,
				noInterrupt: [15],
				chains: {
					'2-1': 30,
					3: 30,
					4: 30,
					'7-3': 30,
					'9-10': 30,
					'9-11': 30,
					10: 30,
					11: 30,
					13: 30,
					15: 30,
					19: 30,
					40: 30
				}
			},
			1: true,
			2: true,
			30: true
		},
		18: { // HB
			'*': {
				fixedSpeed: 1,
				length: 1430
			},
			1: true,
			2: true
		},
		40: { // Rolling Reload
			0: {
				fixedSpeed: 1,
				length: 910, //800 in original SP
				distance: 172.5,
				forceClip: true
			}
		}
	},
	10: { // Brawler
		1: { // Punch
			'*': {
				length: 1575,
				distance: 71.28,
				triggerAbnormal: { 10153060: 3000 },
				consumeAbnormalEnd: 10153060,
				noInterrupt: ['1-3'],
				chains: {
					'1-0': 1,
					'1-1': 2,
					'1-2': 3,
					'1-30': 1,
					'1-31': 32,
					'1-32': 2,
					'2-2': 31,
					'2-3': 31,
					2: 30
				},
				noRetry: true
			},
			0: true,
			1: {
				length: 1575,
				distance: 68.63
			},
			2: {
				length: 925,
				distance: 50.7
			},
			3: {
				length: 1725,
				distance: 121
			},
			30: true,
			31: true,
			32: {
				length: 1575,
				distance: 68.63
			}
		},
		2: { // Counter
			'*': { noRetry: true },
			1: {
				length: 1200,
				distance: 139.97,
				triggerAbnormal: { 10153001: 0x7fffffff },
				consumeAbnormalEnd: 10153001
			},
			2: {
				length: 1800,
				distance: 84,
				triggerAbnormal: { 10153002: 0x7fffffff },
				consumeAbnormalEnd: 10153002
			},
			3: {
				length: 1925,
				distance: 131.2,
				triggerAbnormal: { 10153003: 0x7fffffff },
				consumeAbnormalEnd: 10153003
			},
			4: {
				length: 1950,
				distance: 142.86,
				triggerAbnormal: { 10153004: 0x7fffffff },
				consumeAbnormalEnd: 10153004
			},
			10: {
				type: 'holdInfinite',
				fixedSpeed: 1,
				length: 800,
				distance: 33.38,
				triggerAbnormal: { 10153006: 0x7fffffff },
				consumeAbnormalEnd: 10153006
			},
			11: {
				type: 'holdInfinite',
				fixedSpeed: 1,
				length: 800,
				distance: 33.38,
				triggerAbnormal: { 10153005: 0x7fffffff },
				consumeAbnormalEnd: 10153005
			},
			12: {
				/*abnormals: {
					10153061: { chain: 1 },
					10153062: { chain: 2 },
					10153063: { chain: 3 },
					10153064: { chain: 4 }
				},*/
				chains: {
					'1-0': 1,
					'1-1': 2,
					'1-2': 3,
					'1-3': 4,
					'1-30': 1,
					'1-31': 1,
					'1-32': 2
				}
			}
		},
		/*3: { // Divine Wrath
			0: {
				fixedSpeed: 1,
				length: 29900
			},
			1: {
				type: 'lockonCast',
				length: [,,],
				distance: [,,]
			}
		},*/
		4: { // Ground Pound
			'*': { length: 3225 },
			0: true,
			30: true
		},
		5: { // Bullrush
			0: {
				fixedSpeed: 1,
				length: [2950, 650],
				distance: [0, 135]
			}
		},
		6: { // Haymaker
			'*': {
				length: [1025, 1825],
				distance: [0, 171.61],
				abnormals: {
					31120: { chain: 31 }
				},
				chains: {
					1: 30,
					2: 30,
					'3-1': 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					14: 30,
					15: 30,
					16: 30,
					17: 30,
					18: 30,
					20: 30,
					40: 30
				}
			},
			1: true,
			2: true,
			30: true,
			31: true
		},
		7: { // Roundhouse Kick
			'*': {
				length: 860,
				distance: 105,
				noInterrupt: [7],
				hasChains: true
			},
			0: true,
			30: true
		},
		8: { // Piledriver
			'*': {
				length: 1950,
				distance: 164.94,
				abnormals: {
					31120: { chain: 31 }
				},
				chains: {
					1: 30,
					2: 30,
					'3-1': 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					9: 30,
					14: 30,
					15: 30,
					16: 30,
					17: 30,
					18: 30,
					20: 30,
					40: 30
				}
			},
			1: true,
			2: true,
			30: { fixedSpeed: 1},
			31: true
		},
		9: { // Jackhammer
			'*': {
				fixedSpeed: 1,
				length: 1540,
				distance: 40,
				noInterrupt: [9],
				abnormals: {
					31120: { chain: 31 }
				},
				hasChains: true
			},
			1: true,
			2: true,
			30: true,
			31: true
		},
		10: { // Counterpunch
			'*': {
				length: 1850,
				distance: 155,
				requiredBuff: 10153000,
				chains: {
					1: 30,
					2: 30,
					'3-1': 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					14: 30,
					15: 30,
					16: 30,
					17: 30,
					18: 30,
					20: 30,
					40: 30
				}
			},
			0: true,
			30: true
		},
		13: { // Provoke
			'*': {
				fixedSpeed: 1,
				length: 1275
			},
			1: true,
			2: true
		},
		14: { // Infuriate
			'*': { length: 1650 },
			1: true,
			2: true,
			30: true
		},
		16: { // Flip Kick
			'*': {
				length: 2050,
				distance: 134,
				hasChains: true
			},
			1: true,
			2: true,
			30: true
		},
		21: { // Mounting Rage
			'*': {
				fixedSpeed: 1,
				length: 1275
			},
			1: true,
			2: true
		},
		40: { // Quick Dash
			'*': {
				fixedSpeed: 1,
				length: 580,
				distance: 144,
				forceClip: true,
				hasChains: true,
				noRetry: true
			},
			0: true, // TODO: Figure out which animations are correct
			1: true,
			30: true,
			31: true
		}
	},
	11: { // Ninja
		'*': { consumeAbnormal: [10154000, 10154001, 10154002, 10154003, 10154004, 10154005, 10154006] },
		1: { // Combo Attack
			'*': {
				fixedSpeed: 1,
				length: 650,
				distance: 44.86,
				triggerAbnormal: { 10154000: 1650 },
				noRetry: true
			},
			0: {
				abnormals: {
					10154000: { chain: 1 },
					10154001: { chain: 2 },
					10154002: { chain: 3 },
					10154003: { chain: 4 },
					10154004: { chain: 5 },
					10154005: { chain: 6 }
				},
				chains: {
					1: 30,
					4: 30,
					6: 30,
					7: 30,
					9: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					18: 30,
					19: 30,
					20: 30
				}
			},
			1: {
				length: 1125,
				distance: 52.47,
				consumeAbnormal: 10154000,
				triggerAbnormal: { 10154001: 1500 }
			},
			2: {
				length: 1200,
				distance: 69.96,
				consumeAbnormal: 10154001,
				triggerAbnormal: { 10154002: 1400 }
			},
			3: {
				length: 1225,
				distance: 38.01,
				consumeAbnormal: 10154002,
				triggerAbnormal: { 10154003: 1400 }
			},
			4: {
				length: 1700,
				distance: 54.69,
				consumeAbnormal: 10154003,
				triggerAbnormal: { 10154004: 1400 }
			},
			5: {
				length: 1500,
				distance: 37.80,
				consumeAbnormal: 10154004,
				triggerAbnormal: { 10154005: 1600 }
			},
			6: {
				length: 1150,
				distance: 82.62,
				consumeAbnormal: 10154005,
				triggerAbnormal: { 10154006: 100 }
			},
			30: {
				abnormals: {
					10154000: { chain: 1 },
					10154001: { chain: 2 },
					10154002: { chain: 3 },
					10154003: { chain: 4 },
					10154004: { chain: 5 },
					10154005: { chain: 6 }
				}
			},
			40: {
				abnormals: {
					10154000: { chain: 41 },
					10154001: { chain: 42 },
					10154002: { chain: 43 },
					10154003: { chain: 44 },
					10154004: { chain: 45 },
					10154005: { chain: 46 }
				},
				chains: {
					1: 70,
					4: 70,
					6: 70,
					7: 70,
					9: 70,
					12: 70,
					13: 70,
					14: 70,
					15: 70,
					16: 70,
					18: 70,
					19: 70,
					20: 70
				}
			},
			41: {
				length: 1125,
				distance: 52.47,
				consumeAbnormal: 10154000,
				triggerAbnormal: { 10154001: 1500 }
			},
			42: {
				length: 1200,
				distance: 69.96,
				consumeAbnormal: 10154001,
				triggerAbnormal: { 10154002: 1400 }
			},
			43: {
				length: 1225,
				distance: 38.01,
				consumeAbnormal: 10154002,
				triggerAbnormal: { 10154003: 1400 }
			},
			44: {
				length: 1700,
				distance: 54.69,
				consumeAbnormal: 10154003,
				triggerAbnormal: { 10154004: 1400 }
			},
			45: {
				length: 1500,
				distance: 37.80,
				consumeAbnormal: 10154004,
				triggerAbnormal: { 10154005: 1600 }
			},
			46: {
				length: 1150,
				distance: 82.62,
				consumeAbnormal: 10154005,
				triggerAbnormal: { 10154006: 100 }
			},
			70: {
				abnormals: {
					10154000: { chain: 41 },
					10154001: { chain: 42 },
					10154002: { chain: 43 },
					10154003: { chain: 44 },
					10154004: { chain: 45 },
					10154005: { chain: 46 }
				}
			}
		},
		2: { // Shadow Jump
			'*': {
				fixedSpeed: 1,
				length: 650,
				distance: 175,
				forceClip: true,
				abnormals: {
					10154010: { chain: 30 }
				}
			},
			0: true,
			30: true
		},
		3: { // Leaves on the Wind
			0: { length: 1275 }
		},
		4: { // Jagged Path
			1: {
				type: 'dash',
				fixedSpeed: 1,
				length: 665,
				distance: 469
			},
			10: { length: 1500 },
			11: {
				length: 300,
				distance: 150
			}
		},
		5: { // Impact Bomb
			'*': {
				length: 1025,
				distance: -291.6,
				noInterrupt: [5],
				forceClip: true,
				noRetry: true
			},
			0: { chains: {
				1: 4,
				2: 4,
				3: 4,
				4: 4,
				6: 4,
				7: 4,
				8: 4,
				9: 4,
				11: 4,
				12: 4,
				13: 4,
				14: 4,
				15: 4,
				16: 4,
				17: 4,
				18: 4,
				19: 4,
				20: 4
			    }
		    },
			30: true
		},
		6: { // One Thousand Cuts
			1: {
				type: 'dash',
				fixedSpeed: 1,
				length: 300,
				distance: 246
			},
			10: { length: 3500 }
		},
		7: { // Decoy Jutsu
			0: {
				length: 1550,
				onlyTarget: true
			}
		},
		8: { // Fire Avalanche
			'*': {
				length: [700, 1375, 325],
				distance: [0, 367.31, 0],
				noInterrupt: [9, 18],
				abnormals: {
					10154080: { chain: 1 },
					10154081: { chain: 2 }
				},
				chains: {
					1: 30,
					4: 30,
					6: 30,
					7: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					17: 30,
					19: 30,
					20: 30
				},
				noRetry: true
			},
			0: true,
			1: {
				length: [1375, 325],
				distance: [411.39, 0]
			},
			2: {
				length: [1375, 325],
				distance: [455.47, 0]
			},
			30: true
		},
		9: { // Smoke Bomb
			0: { length: 700 }
		},
		11: { // Focus
			0: { length: 1430 },
			50: { length: 1430 }
		},
		12: { // Skyfall
			'*': {
				length: 1325,
				distance: 154.72,
				noInterrupt: [9, 12, 18],
				chains: {
					1: 30,
					4: 30,
					6: 30,
					7: 30,
					8: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					17: 30,
					19: 30,
					20: 30
				}
			},
			1: true,
			2: true,
			30: true
		},
		13: { // Circle of Steel
			'*': {
				length: 3225,
				distance: 245.06,
				noInterrupt: [9, 13, 18],
			    chains: {
				1: 30,
				4: 30,
				6: 30,
				7: 30,
				8: 30,
				12: 30,
				14: 30,
				15: 30,
				16: 30,
				17: 30,
				19: 30,
				20: 30
				}
			},
			1: true,
			2: true,
			30: true
		},
		14: { // Double Cut
			'*': {
				length: 1425,
				distance: 162,
				noInterrupt: [9, 14, 18],
				chains: {
					1: 30,
					4: 30,
					6: 30,
					7: 30,
					8: 30,
					12: 30,
					13: 30,
					15: 30,
					16: 30,
					17: 30,
					19: 30,
					20: 30
				}
			},
			1: true,
			2: true,
			30: true
		},
		15: { // Burning Heart
			'*': {
				stamina: 100,
				instantStamina: true,
				abnormals: {
					32033: { speed: 1.2 },
					32058: { speed: 1.3 }
				}
			},
			0: { length: 880 },
			1: { length: 390 },
			2: { length: 390 },
			3: { length: 390 },
			4: { length: 390 },
			5: { length: 390 },
			6: { length: 390 },
			7: { length: 390 },
			8: { length: 390 },
			9: { length: 390 }
		},
		16: { // Death Blossom
			'*': {
				fixedSpeed: 1,
				length: 1525
			},
			0: true,
			30: true
		},
		17: { // Attunement
			'*': { length: 1000 },
			0: true,
			30: true
		},
		18: { // Bladestorm
			0: { length: 1000 }
		},
		19: { // Chakra Thrust
			'*': {
				length: [225, 825],
				distance: 127.5,
				chains: {
					1: 30,
					4: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					12: 30,
					13: 30,
					15: 30,
					16: 30,
					17: 30,
					18: 30,
					19: 30,
					20: 30
				}
			},
			0: true,
			30: true
		},
		20: { // Clone Jutsu
			0: {
				fixedSpeed: 1,
				length: 1275
			}
		}
	},
	12: { // Valkyrie
		1: { // Slash
			'*': {
				length: 1100,
				distance: 47.13,
				noInterrupt: ['1-3'],
				chains: {
					'1-0': 1,
					'1-1': 2,
					'1-2': 3,
					'1-30': 1,
					2: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					19: 30,
					20: 30
				},
				noRetry: true
			},
			0: true,
			1: {
				length: 1200,
				distance: 43.37
			},
			2: {
				length: 1450,
				distance: 58.54
			},
			3: {
				length: 1925,
				distance: 90.1
			},
			30: true
		},
		2: { // Overhead Slash
			'*': {
				length: 1900,
				distance: 102.47,
				chains: {
					1: 30,
					2: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					19: 30,
					20: 30
				}
			},
			0: true,
			30: true
		},
		3: { // Glaive Strike
			'*': {
				length: 2450,
				distance: 105.62,
				requiredBuff: 10155112,
				chains: {
					1: 30,
					2: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					19: 30,
					20: 30
				}
			},
			0: true,
			30: true
		},
		4: { // Charge
			0: {
				type: 'dash',
				fixedSpeed: 1,
				length: 550,
				distance: 436,
				noInterrupt: ['4-0','4-10'],	//prevent double charges if first one did'nt hit a target.
				noRetry: true
			},
			10: { length: 900 },
			11: {
				length: 400,
				distance: 50,
				noInterrupt: [1, 2, '4-11', 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21]
			}
		},
		5: { // Maelstrom
			'*': {
				length: 3150,
				distance: 125.11,
				chains: {
					1: 30,
					2: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					19: 30,
					20: 30
				}
			},
			0: true,
			30: true
		},
		6: { // Leaping Strike
			'*': {
				length: 1775,
				distance: 105,
				chains: {
					1: 30,
					2: 30,
					3: 30,
					'4-10': 30,
					'4-11': 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					19: 30,
					20: 30
				}
			},
			0: true,
			30: true
		},
		7: { // Spinning Death
			'*': {
				length: 1775,
				distance: 139.72,
				noInterrupt: ['7-2'],
				abnormals: {
					10155070: { chain: 1 },
					10155071: { chain: 2 }
				},
				chains: {
					1: 30,
					2: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					19: 30,
					20: 30
				},
				noRetry: true
			},
			0: true,
			1: true,
			2: {
				length: 2300,
				distance: 197.82
			},
			30: true
		},
		8: { // Titansbane
			'*': {
				fixedSpeed: 1,
				length: 7700,
				chains: {
					1: 30,
					2: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 1,
					9: 30,
					10: 30,
					11: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					19: 30,
					20: 30
				}
			},
			0: true,
			1: { length: 2000 },
			30: true
		},
		9: { // Ground Bash
			'*': {
				length: 1450,
				distance: 136,
				requiredBuff: 10155112,
				chains: {
					1: 30,
					2: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					19: 30,
					20: 30
				}
			},
			0: true,
			30: true
		},
		10: { // Dream Slash
			'*': {
				length: 1775,
				distance: 11,
				glyphs: {
					33020: { speed: 1.2 }
				}
			},
			0: {
				chains: {
					1: 4,
					2: 4,
					3: 4,
					'4-10': 4,
					'4-11': 4,
					5: 4,
					6: 4,
					7: 4,
					8: 4,
					9: 4,
					11: 4,
					12: 4,
					13: 4,
					14: 4,
					15: 4,
					16: 4,
					18: 4,
					19: 4,
					20: 4,
			    }
		    },
			30: true // 17, 21
		},
		11: { // Shining Crescent
			'*': {
				length: 2725,
				chains: {
					1: 30,
					2: 30,
					3: 30,
					'4-10': 30,
					'4-11': 30,					
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					19: 30,
					20: 30
				}
			},
			0: {
				distance: 227.49,
				noInterrupt: [11]
			},
			1: {
				length: 2500,
				chains: {
					1: 31,
					2: 31,
					3: 31,
					4: 31,
					5: 31,
					6: 31,
					7: 31,
					8: 31,
					9: 31,
					10: 31,
					11: 31,
					12: 31,
					13: 31,
					14: 31,
					15: 31,
					16: 31,
					19: 31,
					20: 31
				}
			},
			30: { distance: 227.49 },
			31: { length: 2500 }
		},
		12: { // Ragnarok
			'*': {
				length: 2800,
				chains: {
					1: 30,
					2: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					19: 30,
					20: 30
				}
			},
			0: true,
			30: true
		},
		13: { // Bloodflower
			'*': {
				length: 1700,
				distance: 20.57,
				chains: {
					1: 30,
					2: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					19: 30,
					20: 30
				}
			},
			0: true,
			30: true
		},
		14: { // Evasion
			'*': {
				fixedSpeed: 1,
				length: 825,
				distance: 188.18,
				forceClip: true
			},
			0: true,
			1: {
				consumeAbnormal: 10155020, 
				requiredBuff: 10155020
			}
		},
		15: { // Windslash
			'*': {
				length: 1100,
				distance: 152.82,
				chains: {
					1: 30,
					2: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					19: 30,
					20: 30
				}
			},
			0: true,
			30: true
		},
		16: { // Runeburst
			'*': {
				fixedSpeed: 1,
				length: 1325,
				distance: 25,
				chains: {
					1: 30,
					2: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					19: 30,
					20: 30
				}
			},
			0: true,
			30: true
		},
		17: { // Balder's Tears
			0: {
				fixedSpeed: 1,
				length: 1075
			}
		},
		/*18: { // Retaliate
			0: { 
				type: 'retaliate',
				length: 1630,
				noRetry: true 
			}
		},*/
		19: { // Reclamation
			'*': {
				length: 1525,
				chains: {
					1: 30,
					2: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					10: 30,
					11: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					19: 30,
					20: 30
				}
			},
			0: true,
			30: true
		},
		20: { // Backstab
			0: {
				length: 1500,
				onlyTarget: true
			}
		},
		21: { // Dark Herald
			0: {
				fixedSpeed: 1,
				length: 925,
				requiredBuff: 10155201
			}
		}
	}
}
