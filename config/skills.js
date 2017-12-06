/*	Notes:
	* '*' can be used in place of the skill or sub-skill to set default values
	* Processing order is 'noInterrupt' > 'chains' > 'abnormals'
	* Default race is Elin unless specified

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

	Refer to here for what races have its numbers already added: https://github.com/SaltyMonkey/skill-prediction/wiki 
	If a race doesn't have its own property therefore assumed to use the same default value.
*/

module.exports = {
	0: { // Warrior
		1: { // Combo Attack
			'*': { noInterrupt: [1, 32] },
			0: {
				length: 565,
				distance: 64.29,
				race: {
					2: { distance: 47.53 }, // M.Helf: 47.534
					5: { distance: 45 }, // F.Aman: 45
					8: { distance: 54.32 }, // Popori: 54.32
					9: { distance: 64.29 } // Elin: 64.288
				}
			},
			1: {
				length: 650,
				distance: 51.69,
				race: {
					2: { distance: 42.12 }, // M.Helf: 42.117
					5: { distance: 39 }, // F.Aman: 39
					8: { distance: 21.17 }, // Popori: 21.171
					9: { distance: 51.69 } // Elin: 51.69
				}
			},
			2: {
				length: 650,
				distance: 28.08,
				race: {
					2: { distance: 28.08 }, // M.Helf: 28.078
					5: { distance: 26 }, // F.Aman: 26
					8: { distance: 56.2 }, // Popori: 56.196
					9: { distance: 28.08 } // Elin: 28.078
				}
			},
			3: {
				length: 900,
				distance: 73.34,
				race: {
					2: { distance: 79.9 }, // M.Helf: 79.897
					5: { distance: 85 }, // F.Aman: 85
					8: { distance: 63.53 }, // Popori: 63.529
					9: { distance: 73.34 } // Elin: 73.344
				}
			}
		},
		2: { // Evasive Roll
			0: {
				length: 830,
				distance: 150,
				forceClip: true,
				stamina: 500,
				instantStamina: true,
				noInterrupt: [2, 10, 32],
				glyphs: {
					21015: { stamina: -100 },
					21067: { stamina: -100 },
					21101: { stamina: -120 }
				},
				race: {
					8: { length: 1060 } // Popori
				}
			}
		},
		3: { // Torrent of Blows
			0: {
				length: 1600,
				distance: 75,
				noInterrupt: [32],
				race: {
					2: { distance: 75 }, // M.Helf
					8: { distance: 75 }, // Popori
					9: { distance: 68.26 } // Elin: 68.259
				}
			}
		},
		4: { // Rain of Blows
			'*': {
				distance: 151.87,
				race: {
					2: { distance: 152.73 }, // M.Helf: 152.733
					5: { distance: 150.71 }, // F.Aman: 150.714
					8: { distance: 148.9 }, // Popori: 148.904
					9: { distance: 151.87 } // Elin: 151.867
				}
			},
			0: {
				length: 2550, // 2527/2540  
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
				noInterrupt: [2, 32],
				race: {
					2: { length: 2055 }, // M.Helf
					7: { length: 2055 }, // F.Castanic
					8: { length: 2055 }, // Popori
					9: { length: 2055 } // Elin
				}
			}
		},
		11: { // Poison Blade
			0: {
				length: 830,
				distance: 35,
				noInterrupt: [32],
				race: {
					2: { distance: 0 }, // M.Helf
					5: { distance: 40 }, // F.Aman
					8: { distance: 35 }, // Popori
					7: { length: 925 }, // F.Casta
					9: { // Elin
						length: 925,
						distance: 54.85	// 54.582
					}
				}
			}
		},
		12: { // Leaping Strike
			0: {
				length: 1525,
				distance: 250,
				noInterrupt: [32],
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				},
				race: {
					2: { length: 1525 }, // M.Helf
					5: { length: 1525 }, // F.Aman
					7: { length: 1700 }, // F.Castanic
					8: { length: 1710 }, // Popori
					9: { length: 1525 } // Elin
				}
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
				length: 1115,
				distance: 467.88,
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				},
				noRetry: true,
				noInterrupt: [16, 32]
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
				distance: 120.28,
				noInterrupt: [32],
				race: {
					/*2: { distance: 120.28 }, // M.Helf: 120.277
					5: { distance: 120.28 }, // F.Aman: 120.277*/
					7: { length: 1080 },
					8: { distance: 128.89 }, // Popori: 128.889
					9: { distance: 138.28 } // Elin: 138.284
				}
			},
			0: true,
			1: true,
			2: true
		},
		19: { // Rising Fury
			'*': { noInterrupt: [32] },
			0: {
				length: 725,
				distance: 144.85,
				race: {
					2: { distance: 144.85 }, // M.Helf: 144.846
					5: { distance: 143.27 }, // F.Aman: 143.269
					8: { distance: 161.74 }, // Popori: 161.738
					9: { distance: 170.67 } // Elin: 170.671
				}
			},
			1: {
				length: 1400,
				distance: 100.15,
				race: {
					2: { distance: 100.11 }, // M.Helf: 100.114
					5: { distance: 101.69 }, // F.Aman: 101.689
					8: { distance: 116.63 }, // Popori: 116.629
					9: { distance: 122.34 } // Elin: 122.342
				}
			}
		},
		20: { // Deadly Gamble
			0: {
				fixedSpeed: 1,
				length: 310,
				noInterrupt: [32]
			}
		},
		21: { // Cascade of Stuns
			0: { // Same animation as 2nd cast of Rising fury
				length: 1400,
				distance: 116.63,
				noInterrupt: [32],
				race: {
					2: { distance: 100.11 }, // M.Helf: 100.114
					8: { distance: 116.63 }, // Popori: 116.629
					9: { distance: 122.34 } // Elin: 122.342
				}
			}
		},
		23: { // Spinning Counter
			0: {
				length: 1075,
				distance: 65.35,
				requiredBuff: 100700,
				abnormals: {
					100200: { chain: 6 },
					100201: { chain: 6 }
				},
				race: {
					2: { distance: 68.81 }, // M.Helf: 68.805
					8: { distance: 65.34 }, // Popori: 65.344
					9: { distance: 77.36 } // Elin: 77.359
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
					100200: { skill: 390100 },
					100201: { skill: 390100 }
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
					100200: { skill: 390130 },
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
			'*': { distance: 150 }, // Old fast cast value was wrong on Elin, unless that had a pve intention on it, idk.
			0: {
				length: 1850,
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
				abnormals: {
					100801: { skill: 380130 }
				}
			}
		},
		31: { // Reaping Slash
			'*': { distance: 110 },
			0: {
				length: 2275,
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
				requiredBuff: [100200, 100201],
				stamina: 50,
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
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
				requiredBuff: [100200, 100201]
			}
		},
		36: { // Rain of Blows (Deadly Gamble)
			'*': {
				distance: 151.87,
				race: {
					2: { distance: 152.73 }, // M.Helf: 152.733
					5: { distance: 150.71 }, // F.Aman: 150.714
					8: { distance: 148.9 }, // Popori: 148.904
					9: { distance: 151.87 } // Elin: 151.867
				}
			},
			0: {
				length: 2800,
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
		}
	},
	1: { // Lancer
		1: { // Combo Attack
			'*': { noInterrupt: [1, 2] },
			0: {
				length: 635,
				distance: 74.45,
				race: {
					0: { distance: 78.55 }, // M.Human: 78.546
					2: { distance: 74.41 }, // M.Helf: 74.414
					4: { distance: 70 }, // M.Aman: 70
					5: { distance: 75 }, // F.Aman: 75
					8: { distance: 72.89 }, // Popori: 72.894
					9: { distance: 74.45 } // Elin: 74.453
				}
			},
			1: {
				length: 1025,
				distance: 19.2,
				race: {
					0: { distance: 25 }, // M.Human: 25
					2: { distance: 30.8 }, // M.Helf: 30.798
					4: { distance: 25 }, // M.Aman: 25
					5: { distance: 30.52 }, // F.Aman: 30.523
					8: { distance: 39.05 }, // Popori: 39.051
					9: { distance: 19.2 } // Elin: 19.2
				}
			},
			2: {
				length: 1815,
				distance: 66.07,
				race: {
					0: { distance: 70 }, // M.Human: 70
					2: { distance: 70 }, // M.Helf: 70
					4: { distance: 60 }, // M.Aman: 60
					5: { distance: 54.48 }, // F.Aman: 54.476
					8: { distance: 41.06 }, // Popori: 41.058
					9: { distance: 66.07 } // Elin: 66.07
				}
			}
		},
		2: { // Stand Fast
			0: {
				type: 'holdInfinite',
				fixedSpeed: 1,
				stamina: 50,
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
			}
		},
		3: { // Onslaught / Changed
			'*': {
				distance: [0, 100, 100, 100, 100, 35],
				noInterrupt: [1, 2, 3, 4, 8, 9, 10, 11, 12, 13, 15, 18, 21, 23, 24, 25, 26, 27],
				abnormals: {
					22060: { speed: 1.25 }
				},
				chains: {
					1: 30,
					5: 30,
					18: 30
				},
				race: {
					0: { distance: [0, 100, 100, 100, 100, 15] }, // M.Human
					2: { distance: [0, 100, 100, 100, 100, 16] }, // M.Helf
					4: { distance: [0, 100, 100, 100, 100, 13] }, // M.Aman
					5: { distance: [0, 100, 100, 100, 100, 14] }, // F.Aman
					8: { distance: [0, 100, 100, 100, 100, 15] }, // Popori
					9: { distance: [0, 100, 100, 100, 100, 35] } // Elin, 80 FPS
				}
			},
			0: { length: [950, 500, 500, 500, 400, 775] },
			30: { length: [713, 375, 375, 375, 300, 582] }
		},
		4: { // Challenging Shout / Changed
			0: {
				length: 2215,
				noInterrupt: [2],
				glyphs: {
					22056: { speed: 1.25 },
					22085: { speed: 1.25 }
				}
			},
			30: false
		},
		5: { // Shield Bash / Changed
			0: {
				length: 830,
				distance: 30,
				noInterrupt: [2],
				race: {
					/*0: { distance: 30.000 }, // M.Human
					2: { distance: 30.000 }, // M.Helf
					4: { distance: 30.000 }, // M.Aman
					5: { distance: 30.000 }, // F.Aman
					8: { distance: 30.000 }, // Popori*/
					9: { distance: 43.69 } // Elin: 43.693
				}
			},
			30: false
		},
		7: { // Guardian Shout
			0: {
				length: 550,
				noInterrupt: [2],
				race: {
					/*0: { length: 550 }, // M.Human
					2: { length: 550 }, // M.Helf
					4: { length: 550 }, // M.Aman
					5: { length: 550 }, // F.Aman*/
					8: { length: 800 }, // Popori
					9: { length: 575 }, // Elin
				}
			}
		},
		8: { // Shield Counter
			0: {
				length: 1450,
				distance: 90,
				onlyDefenceSuccess: true,
				race: {
					0: { distance: 90 }, // M.Helf: 90
					2: { distance: 95 }, // M.Helf: 95
					4: { distance: 85 }, // M.Aman: 85
					5: { distance: 85 }, // F.Aman: 85
					8: { distance: 90 }, // Popori: 90
					9: { distance: 108.06 } // Elin: 108.063
				}
			}
		},
		9: { // Leash
			0: {
				length: [725, 850],
				noInterrupt: [2]
			}
		},
		10: { // Debilitate
			0: { // Same animation as shield bash, just slower
				length: 925,
				distance: 30, // Seems pretty equalized
				noInterrupt: [2],
				race: {
					/*0: { distance: 30 }, // M.Human
					2: { distance: 30 }, // M.Helf
					4: { distance: 30}, // M.Aman
					5: { distance: 30 }, // F.Aman
					8: { distance: 30 }, // Popori*/
					9: { distance: 43.69 } // Elin: 43.693
				}
			}
		},
		11: { // Retaliate
			0: {
				type: 'retaliate',
				length: 1635, // Is this correct?
				noRetry: true,
				noInterrupt: [2],
				race: {
					9: { length: 1625 } // Elin, also this?
				}
			}
		},
		12: { // Infuriate
			0: {
				length: 2425,
				noInterrupt: [2]
			}
		},
		13: { // Spring Attack / Changed
			0: {
				length: 2800,
				distance: 85,
				noInterrupt: ['1-0', '1-1', 2, 3, 4, 9, 11, 12, 13, 15, '18-0', 21, 23, 24, 25, 26, 27],
				chains: {
					1: 30,
					5: 30,
					8: 30,
					10: 30,
					18: 30,
					24: 30
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
				length: 1115,
				distance: 474.5,
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				},
				noInterrupt: [2, 15]
			},
			1: {
				length: 935,
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
			'*': { noInterrupt: [2] },
			0: {
				length: 625,
				distance: 95, // M.Aman
				abnormals: {
					201550: { speed: 1.2 }
				},
				race: {
					0: { distance: 100.13 }, // M.Human: 100.125
					2: { // M.Helf: 525, 102.701
						length: 525,
						distance: 102.7
					},
					4: { distance: 95 }, // M.Aman: 95
					5: { distance: 100.13 }, // F.Aman: 100.125
					8: { distance: 92.39 }, // Popori: 92.39
					9: { distance: 122.66 } // Elin: 122.66
				}
			},
			1: {
				length: 800,
				distance: 87, // M.Aman
				race: {
					0: { distance: 74.84 }, // M.Human: 74.836
					2: { distance: 80.43 }, // M.Helf: 80.428
					4: { distance: 87 }, // M.Aman: 87
					5: { distance: 74.84 }, // F.Aman: 74.836
					8: { distance: 89.46 }, // Popori: 89.462
					9: { distance: 66.04 } // Elin: 66.043
				}
			}
		},
		19: { // Pledge of Protection
			0: {
				fixedSpeed: 1,
				length: 1000,
				noInterrupt: [2]
			}
		},
		/*20: { // Menacing Wave / Legacy skill *sad violin*
			0: {
				fixedSpeed: 1,
				length: [700, 800], // 715, 815
				noInterrupt: [2]
			}
		},*/
		21: { // Lockdown Blow / Changed
			0: {
				length: 1400,
				distance: 100.13, // M.Human, 100.126
				noInterrupt: [2],
				chains: {
					10: 30,
					18: 30
				},
				race: {
					0: { distance: 100.13 }, // M.Human: 100.125
					2: { // M.Helf: 1175, 102.701
						length: 1175,
						distance: 102.7
					},
					4: { distance: 95 }, // M.Aman: 95
					5: { distance: 100.13 }, // F.Aman: 100.125
					8: { distance: 92.39 }, // Popori: 92.39
					9: { distance: 122.66 } // Elin: 122.66
				}
			},
			30: false
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
		24: { // Chained Leash / Changed
			'*': {
				length: [725, 850],
				noInterrupt: [2],
				/*chains: {
					//4: 1,
					4: 2
				}*/
			}, // Looks a tad like a ninja skill chain
			0: true,
			1: false,
			2: false
		},
		25: { // Wallop / Changed
			0: {
				length: 2375,
				distance: 100,
				noInterrupt: [1, 2, 3, 4, 5, 9, 11, 12, '18-0', 21, 23, 24, 25, 26, 27],
				chains: {
					8: 30,
					10: 30,
					13: 30,
					15: 30,
					18: 30,
					24: 30
				}
			},
			30: {
				length: 1900, // 1910
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
				},
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
			}
		},
		27: { // Rallying Cry
			0: { // Same animation as guardian shout, just slower
				length: 620,
				noInterrupt: [2],
				race: {
					/*0: { length: 625 }, // M.Human
					2: { length: 625 }, // M.Helf
					4: { length: 625 }, // M.Aman
					5: { length: 625 }, // F.Aman*/
					8: { length: 950 }, // Popori
					9: { length: 650 }, // Elin
				}
			}
		},
		28: { // Righteous Leap
			0: {
				length: [375, 1025, 3100],
				distance: [29.48, 445.52, 0],
				chains: {
					15: 1,
					24: 1
				}
			},
			1: false
		},
		29: { // Deploy Barrier
			0: false
			// length: 10700
		},
		30: { // Heavenly Shield 
			0: false
		},
		91: { // Awaken Aura
			0: false
		}
	},
	2: { // Slayer
		1: { // Combo Attack
			'*': { noInterrupt: [1] },
			0: {
				length: 750,
				distance: 36.68,
				race: {
					0: { distance: 36.68 }, // M.Human: 36.679
					2: { distance: 50.68 }, // M.Helf: 50.68
					4: { distance: 40 }, // M.Aman: 40
					5: { distance: 36.68 }, // F.Aman: 36.68
					6: { distance: 36.68 }, // M.Casta: 36.68
					7: { distance: 60 }, // F.Casta: 60
					8: { distance: 31.53 }, // Popori: 31.526
					9: { distance: 36.68 }, // Elin: 36.68
					10: { distance: 25.08 } // Baraka: 25.076
				}
			},
			1: {
				length: 1030,
				distance: 35.68,
				race: {
					0: { distance: 35.68 }, // M.Human: 35.675
					2: { distance: 30.68 }, // M.Helf: 30.675
					4: { distance: 35 }, // M.Aman: 35
					5: { distance: 35.68 }, // F.Aman: 35.675
					6: { distance: 35.68 }, // M.Casta: 35.675
					7: { distance: 17 }, // F.Casta: 17
					8: { distance: 49.4 }, // Popori: 49.396
					9: { distance: 35.68 }, // Elin: 35.675
					10: { distance: 32.95 } // Baraka: 32.952
				}
			},
			2: {
				length: 750,
				distance: 28.05,
				race: {
					0: { distance: 28.05 }, // M.Human: 28.054
					2: { distance: 33.05 }, // M.Helf: 33.054
					4: { distance: 20 }, // M.Aman: 20
					5: { distance: 28.05 }, // F.Aman: 28.054
					6: { distance: 22.3 }, // M.Casta: 22.302
					7: { distance: 23 }, // F.Casta: 23
					8: { distance: 19.33 }, // Popori: 19.333
					9: { distance: 28.05 }, // Elin: 28.504
					10: { distance: 22.5 } // Baraka: 22.5
				}
			},
			3: {
				length: 1650,
				distance: 46.76,
				race: {
					0: { distance: 46.76 }, // M.Human: 46.758
					2: { distance: 46.76 }, // M.Helf: 46.578
					4: { distance: 40 }, // M.Aman: 40
					5: { distance: 64.36 }, // F.Aman: 64.359
					6: { distance: 118.2 }, // M.Casta: 118.202
					7: { distance: 45 }, // F.Casta: 45
					8: { distance: 19.85 }, // Popori: 19.848
					9: { distance: 46.76 }, // Elin: 46.757
					10: { distance: 37.5 } // Baraka: 37.5
				}
			}
		},
		2: { // Knockdown Strike
			'*': {
				consumeAbnormal: 23220,
				length: 2835,
				distance: 220.47,
				abnormals: {
					23070: { speed: 1.25 }
				},
				chains: {
					14: 30,
					20: 0
				},
				race: {
					0: { distance: 220.47 }, // M.Human: 220.47
					2: { distance: 220.15 }, // M.Helf: 220.153
					4: { distance: 155 }, // M.Aman: 155
					5: { distance: 174.84 }, // F.Aman: 174.837
					6: { distance: 201.64 }, // M.Casta: 201.639
					7: { distance: 200 }, // F.Casta: 200
					8: { distance: 175.81 }, // Popori: 175.811
					9: { distance: 220.47 }, // Elin: 220.47
					10: { distance: 205.95 } // Baraka: 205.953
				}
			},
			0: true,
			1: true, // unused
			2: true, // unused
			30: { length: 2435 }
		},
		3: { // Whirlwind
			0: {
				length: 2900, //
				distance: 128.69,
				abnormals: {
					23080: { speed: 1.25 }
				},
				race: {
					0: { distance: 123.21 }, // M.Human: 123.208
					2: { distance: 116.49 }, // M.Helf: 116.489
					4: { distance: 125 }, // M.Aman: 125
					5: { distance: 137.22 }, // F.Aman: 137.221
					6: { distance: 123.21 }, // M.Casta: 123.208
					7: { distance: 155 }, // F.Casta: 155.004
					8: { distance: 116.09 }, // Popori: 116.085
					9: { distance: 128.69 }, // Elin: 128.691
					10: { distance: 91.21 } // Baraka: 91.21
				}
			}
		},
		4: { // Evasive Roll
			'*': {
				length: 905,
				distance: 150,
				forceclip: true,
				noInterrupt: [4],
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				},
				race: {
					8: {	// Popori: 150.316, 1185
						distance: 150.32,
						length: 1185
					}
				}
			},
			0: true,
			30: { requiredBuff: 301200 }
		},
		5: { // Dash
			0: {
				fixedSpeed: 1,
				length: 700,
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 }
				}
			}
		},
		8: { // Overhand Strike
			'*': {
				distance: 169.5,
				race: {
					0: { distance: 171.14 }, // M.Human: 171.138
					2: { distance: 171.14 }, // M.Helf: 171.138
					4: { distance: 145 }, // M.Aman: 145
					5: { distance: 134.53 }, // F.Aman: 134.532
					6: { distance: 161.14 }, // M.Casta: 161.138
					7: { distance: 170 }, // F.Casta: 170
					8: { distance: 150 }, // Popori: 150
					9: { distance: 169.65 }, // Elin: 169.648
					10: { distance: 151.14 } // Baraka: 151.138
				}
			},
			0: {
				length: 3365,
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
				length: 1325, //
				abnormals: {
					300801: { skill: 250130 }
				}
			}
		},
		9: { // Leaping Strike
			0: {
				length: 2175, //
				distance: 250,
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
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
				distance: 180.96,
				abnormals: {
					23060: { speed: 1.25 },
					23061: { speed: 1.35 }
				},
				race: {
					0: { distance: 166.56 }, // M.Human: 166.555
					2: { distance: 173.75 }, // M.Helf: 173.752
					4: { distance: 175 }, // M.Aman: 175
					5: { distance: 166.56 }, // F.Aman: 166.555
					6: { distance: 168.61 }, // M.Casta: 168.612
					7: { distance: 230 }, // F.Casta: 230, wind down animation moves her a lot
					8: { distance: 174.05 }, // Popori: 174.05
					9: { distance: 180.96 }, // Elin: 180.962
					10: { distance: 136.55 } // Baraka: 136.554
				}
			}
		},
		13: { // Stunning Backhand
			0: {
				length: 2150, //
				distance: 76.71,
				race: {
					0: { distance: 62.07 }, // M.Human: 62.073
					2: { distance: 55.79 }, // M.Helf: 55.787
					4: { distance: 40 }, // M.Aman: 40
					5: { distance: 62.07 }, // F.Aman: 62.073
					6: { distance: 86.12 }, // M.Casta: 86.124
					7: { distance: 80 }, // F.Casta: 80
					8: { distance: 56.49 }, // Popori: 56.491
					9: { distance: 76.71 }, // Elin: 76.706
					10: { distance: 47.07 } // Baraka: 47.072
				}
			}
		},
		14: { // Distant Blade
			'*': {
				triggerAbnormal: { 23220: 2000 },
				consumeAbnormalEnd: 23220,
				length: 600,
				distance: 75
			},
			0: {
				race: {
					2: { distance: 79.01 }, // M.Helf: 79.014
				}
			},
			1: {
				race: {
					2: { distance: 70.99 }, // M.Helf: 70.986
					5: { distance: 100.02 }, // F.Aman: 100.018
					9: { distance: 100.02 } // Elin: 100.018
				}
			},
			2: {
				length: 1500,
				distance: 120,
				race: {
					5: { distance: 94.98 }, // F.Aman: 94.983
					6: { distance: 150 }, // M.Casta: 150
					8: { distance: 112.42 }, // Popori: 112.417
					9: { distance: 104.82 } // Elin: 104.818
				}
			}
		},
		15: { // Startling Kick
			0: {
				length: 1500,
				distance: -175,
				forceClip: true,
				glyphs: {
					23060: { speed: 1.25 }
				},
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
			}
		},
		16: { // Fury Strike
			0: {
				length: 1000,
				distance: 100,
				race: {
					0: { distance: 96.26 }, // M.Human: 96.255
					2: { distance: 103.85 }, // M.Helf: 103.848
					4: { distance: 100 }, // M.Aman: 100
					5: { distance: 96.25 }, // F.Aman: 96.25
					6: { distance: 135.85 }, // M.Casta: 135.847
					7: { distance: 140 }, // F.Casta: 140
					8: { distance: 141.74 }, // Popori: 141.738
					9: { distance: 142.53 }, // Elin: 142.53
					10: { distance: 100 } // Baraka: 100
				}
			}
		},
		17: { // Headlong Rush
			0: {
				type: 'dash',
				fixedSpeed: 1,
				length: 1000,
				distance: 413, // Baraka, 420.018 | M.Aman, 420.007 | M.Human 420
				noInterrupt: [17],
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
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
			}
		},
		20: { // In Cold Blood
			0: {
				triggerAbnormal: { 23220: 2000 },
				fixedSpeed: 1,
				length: 1185
			}
		},
		21: { // Exhausting Blow
			0: {
				length: 1175,
				distance: 75
			},
		},
		23: { // Measured Slice
			'*': {
				distance: 189, // Sometimes 190 but most of the time 189
				races: {
					5: { distance: 190 }, // F.Aman
					10: { distance: 190 } // Baraka
				}
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
			30: { length: 1670 } // Maybe 1675~1700
		},
		24: { // Eviscerate
			0: {
				length: 1925,
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
				length: 1525,
				distance: 100
			}
		},
		25: { // Ultimate Overhand Strike
			'*': {
				distance: 169.5,
				race: {
					0: { distance: 171.14 }, // M.Human: 171.138
					2: { distance: 171.14 }, // M.Helf: 171.138
					4: { distance: 145 }, // M.Aman: 145
					5: { distance: 134.53 }, // F.Aman: 134.532
					6: { distance: 161.14 }, // M.Casta: 161.138
					7: { distance: 170 }, // F.Casta: 170
					8: { distance: 150 }, // Popori: 150
					9: { distance: 169.65 }, // Elin: 169.648
					10: { distance: 151.14 } // Baraka: 151.138
				}
			},
			0: { length: 3365 },
			30: { length: 1325 } //
		}
	},
	3: { // Berserker / There's a lot of unneeded no interrupts currently since sGrantSkill is emulated now, this applies for all charging skills
		1: { // Combo Attack
			'*': { noInterrupt: [1, 2, 4] },
			0: {
				length: 1105, // 1100 new length, at least on Elin and M.Casta, maybe some sneaky equalization?
				distance: 78,
				race: {
					3: { distance: 63.24 }, // F.Helf: 63.236
					6: { distance: 55.69 }, // M.Casta: 56.687
					8: { distance: 48.89 }, // Popori: 48.886
					10: { distance: 44.22 } // Baraka: 44.217
				}
			},
			1: {
				length: 925,
				distance: 21.05,
				race: {
					3: { distance: 27.38 }, // F.Helf: 27.382
					6: { distance: 23.27 }, // M.Casta: 23.274
					8: { distance: 7.06 }, // Popori: 7.06
					9: { distance: 21.05 }, // Elin: 21.05
					10: { distance: 21.09 } // Baraka: 21.085
				}
			},
			2: {
				length: 1120,
				distance: 31.84,
				race: {
					3: { distance: 32.47 }, // F.Helf: 32.474
					6: { distance: 22.83 }, // M.Casta: 22.833
					8: { distance: 40.93 }, // Popori: 40.926
					9: { distance: 31.84 }, // Elin: 31.842
					10: { distance: 20.68 } // Baraka: 20.676
				}
			},
			3: {
				length: 1825,
				distance: 54.28,
				race: {
					3: { distance: 55.25 }, // F.Helf: 55.251
					6: { distance: 59.47 }, // M.Casta: 59.467
					8: { distance: 43.68 }, // Popori: 43.68
					9: { distance: 54.29 }, // Elin: 54.285
					10: { distance: 63.26 } // Baraka: 63.257
				}
			}
		},
		2: { // Axe Block
			'*': {
				type: 'holdInfinite',
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
			},
			0: { fixedSpeed: 1 },
			30: true,
			31: { fixedSpeed: 1 }
		},
		3: { // Thunderstrike
			'*': {
				length: 1750,
				abnormals: {
					24170: { speed: 1.25 }
				},
				noRetry: true
			},
			0: {
				type: 'charging',
				length: [650, 650, 650],
				noInterrupt: [2, 4, 10, 15, 18, 24, 25, 30],
				//autorelease: 2525
				glyphs: {
					24067: {
						chargeSpeed: 0.25
						//autorelease: 2025
					} // Only these affect charge hold time
				},
				abnormals: {
					24130: { chargeSpeed: 0.3 },
					24170: { speed: 1.25 },
					400500: { chargeSpeed: 0.2 },
					400501: { chargeSpeed: 0.4 },
					4010150: { chargeSpeed: 0.2 } // All of these do not
				},
				level: [
					{ length: 800 },	// 1300
					{ length: [800, 800] },	// 1150
					{ length: [800, 800] }	// 1150
				]
			},
			10: {
				distance: 87.28, // 87.272 Cast F. - TODO
				noInterrupt: [2, 4, 24, 25, 30],
				race: {
					3: { distance: 90.98 }, // F.Helf: 90.983
					6: { distance: 69.7 }, // M.Casta: 69.704
					8: { distance: 69.51 }, // Popori: 69.513
					9: { distance: 87.27 }, // Elin: 87.272
					10: { distance: 64.88 } // Baraka: 64.884
				}
			},
			11: {
				distance: 87.28, // 87.272
				noInterrupt: [2, 4, 24, 25, 30],
				race: {
					3: { distance: 90.98 }, // F.Helf: 90.983
					6: { distance: 69.7 }, // M.Casta: 69.704
					8: { distance: 69.51 }, // Popori: 69.513
					9: { distance: 87.27 }, // Elin: 87.272
					10: { distance: 64.88 } // Baraka: 64.884
				}
			},
			12: {
				distance: 87.28, // 87.272
				noInterrupt: [2, 4, 24, 25, 30],
				race: {
					3: { distance: 90.98 }, // F.Helf: 90.983
					6: { distance: 69.7 }, // M.Casta: 69.704
					8: { distance: 69.51 }, // Popori: 69.513
					9: { distance: 87.27 }, // Elin: 87.272
					10: { distance: 64.88 } // Baraka: 64.884
				}
			},
			13: {
				6: { distance: 69.704 }, // M.Casta, 69.704
				distance: 87.28, // 87.272
				noInterrupt: [2, 4, 24, 25, 30],
				race: {
					3: { distance: 90.98 }, // F.Helf: 90.983
					6: { distance: 69.7 }, // M.Casta: 69.704
					8: { distance: 69.51 }, // Popori: 69.513
					9: { distance: 87.27 }, // Elin: 87.272
					10: { distance: 64.88 } // Baraka: 64.884
				}
			}
		},
		4: { // Flatten
			'*': {
				length: 3125, // 3100 pori?
				distance: 105.685,
				glyphs: {
					24008: { speed: 1.25 },
					24050: { speed: 1.25 }
				},
				abnormals: {
					24100: { speed: 1.25 },
					24101: { speed: 1.30 }
				},
				race: {
					3: { distance: 90.6 }, // F.Helf: 90.601
					6: { distance: 75 }, // M.Casta: 75
					8: { distance: 73.34 }, // Popori: 73.344
					9: { distance: 105.69 }, // Elin: 105.685
					10: { distance: 70.23 } // Baraka: 70.227
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
			1: {
				chains: {
					6: 31,
					25: 31
				}
			},
			30: { length: 2350 }, //
			31: { length: 2350 }
		},
		5: { // Dash
			0: {
				fixedSpeed: 1,
				length: 700,
				noInterrupt: [2],
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 }
				}
			}
		},
		6: { // Sweeping Strike
			'*': {
				length: 1285,
				distance: 80.47,
				noRetry: true,
				race: {
					3: { distance: 71.34 }, // F.Helf: 71.336
					6: { distance: 66.21 }, // M.Casta: 66.21
					8: { distance: 53.41 }, // Popori: 53.412
					9: { distance: 80.47 }, // Elin: 80.468
					10: { distance: 70 } // Baraka: 70
				}
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
			1: true,
			30: true,
		},
		/*7: { // Mocking Shout / Legacy skill
			0: {
				fixedSpeed: 1,
				length: [315, 1100],
				noInterrupt: [2]
			}
		},*/
		8: { // Fiery Rage
			'*': { noInterrupt: [2] },
			0: {
				fixedSpeed: 1,
				length: [450, 605] // Idk if Helf is longer but i'm getting this
			},
			30: {
				length: 1760, // /Need M.Casta
				requiredBuff: 401400
			}
		},
		10: { // Cyclone
			'*': { noRetry: true },
			0: {
				type: 'charging',
				length: [650, 650, 650],
				noInterrupt: [2, 3, 4, 15, 18, 24, 25, 30],
				//autorelease: 2525
				glyphs: {
					24009: { chargeSpeed: 0.25 },
					24052: { chargeSpeed: 0.25 },
					24096: {
						chargeSpeed: 0.3
						//autorelease: 2025
					}
				},
				abnormals: {
					24010: { chargeSpeed: 0.3 },
					24190: { chargeSpeed: 0.3 },
					400500: { chargeSpeed: 0.2 },
					400501: { chargeSpeed: 0.4 },
					4010150: { chargeSpeed: 0.2 },
					401400: { chain: 6 }
				},
				level: [
					{ length: 800 },	// 1300
					{ length: [800, 800] },	// 1150
					{ length: [800, 800] }	// 1150
				]
			},
			10: {
				length: 1350, // Cast F. - TODO
				distance: 50,
				noInterrupt: [2, 4, 24, 25, 30],
				races: {
					3: { length: 1800 }	// F.Helf
				}
			},
			11: {
				length: [375, 375, 1350],
				distance: [33.33, 33.33, 50],
				noInterrupt: [2, 4, 24, 25, 30],
				races: {
					3: { length: [375, 375, 1800] }	// F.Helf
				}
			},
			12: {
				length: [375, 375, 375, 375, 1350],
				distance: [33.33, 33.33, 33.33, 33.33, 50],
				noInterrupt: [2, 4, 24, 25, 30],
				races: {
					3: { length: [375, 375, 375, 375, 1800] }	// F.Helf
				}
			},
			13: {
				length: [375, 375, 375, 375, 1350],
				distance: [33.33, 33.33, 33.33, 33.33, 50],
				noInterrupt: [2, 4, 15, 24, 25, 30],
				races: {
					3: { length: [375, 375, 375, 375, 1800] }	// F.Helf
				}
			}
		},
		11: { // Leaping Strike 
			0: {
				length: 2190, // 2185
				distance: 250,
				noInterrupt: [2],
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
			}
		},
		/*12: { // Unchained Anger / Legacy skill
			'*': {
				length: [1035, 550],
				noInterrupt: [2]
			},
			30: true,
			31: true
		},*/
		13: { // Retaliate (TODO: Check)
			0: {
				type: 'retaliate',
				length: 1625,
				noInterrupt: [2],
				noRetry: true
			}
		},
		/*15: { // Vampiric Blow  //         Uncomment this for being able to VB if, a VB chain is avaiable, else, it won't work
            '*': { length: 1930 },            // Usage:            1. "Show default Chained Skills" in the Chained Skills menu must be on.        		                               
            0: {                             //                    2. Must be in combat when used.  
                type: 'charging',           //                    Else the animation of VB won't go off causing slight desync.
				length: [800, 800, 800],
				noInterrupt: [2, '3-0', 4, '10-0', '18-0', 24, 25, 30], // VB can't chain from stages 10, 11 or 12 in the client, it only can on stages 13
				//autorelease: 2515 // ish
				abnormals: {
					400500: { chargeSpeed: 0.2 },
					400501: { chargeSpeed: 0.4 },
					4010150: { chargeSpeed: 0.2 }
				},
				chains: {
					'3-13': 14, // this is fine though maybe uneeded, 13: 14 does the same
					'10-13': 14,
					'18-13': 14
				},
				level: [
					{ length: 800 },	// 1600
					{ length: [800, 800] },	// 1600
					{ length: [800, 800] }	// 1600
				]
			},
			10: {
				distance: 87.28, // 87.272
				noInterrupt: [2, 4, 24, 25, 30],
				race: {
					3: { distance: 72.79 }, // F.Helf: 72.785
					6: { distance: 69.7 }, // M.Casta: 69.704
					8: { distance: 69.51 }, // Popori: 69.513
					9: { distance: 87.27 }, // Elin: 87.272
					10: { distance: 64.88 } // Baraka: 64.884
				}
			},
			11: {
				distance: 87.28, // 87.272
				noInterrupt: [2, 4, 24, 25, 30],
				race: {
					3: { distance: 72.79 }, // F.Helf: 72.785
					6: { distance: 69.7 }, // M.Casta: 69.704
					8: { distance: 69.51 }, // Popori: 69.513
					9: { distance: 87.27 }, // Elin: 87.272
					10: { distance: 64.88 } // Baraka: 64.884
				}
			},
			12: {
				distance: 87.28, // 87.272
				noInterrupt: [2, 4, 24, 25, 30],
				race: {
					3: { distance: 72.79 }, // F.Helf: 72.785
					6: { distance: 69.7 }, // M.Casta: 69.704
					8: { distance: 69.51 }, // Popori: 69.513
					9: { distance: 87.27 }, // Elin: 87.272
					10: { distance: 64.88 } // Baraka: 64.884
				}
			},
			13: {
				distance: 87.28, // 87.272
				noInterrupt: [2, 4, 24, 25, 30],
				race: {
					3: { distance: 72.79 }, // F.Helf: 72.785
					6: { distance: 69.7 }, // M.Casta: 69.704
					8: { distance: 69.51 }, // Popori: 69.513
					9: { distance: 87.27 }, // Elin: 87.272
					10: { distance: 64.88 } // Baraka: 64.884
				}
			},
			14: {
				distance: 87.28, // 87.272
				race: {
					3: { distance: 72.79 }, // F.Helf: 72.785
					6: { distance: 69.7 }, // M.Casta: 69.704
					8: { distance: 69.51 }, // Popori: 69.513
					9: { distance: 87.27 }, // Elin: 87.272
					10: { distance: 64.88 } // Baraka: 64.884
				}
			}
		},*/
		16: { // Fearsome Shout
			0: {
				fixedSpeed: 1,
				length: [700, 1425],
				noInterrupt: [2]
			}
		},
		18: { // Lethal Strike / Changed
			'*': {
				length: 1500,
				distance: 167.63, // 167.624
				noInterrupt: [2, 4, 24, 25, 30],
				race: {
					6: { distance: 168.11 }, // M.Casta: 168.112
					8: { distance: 240.4 }, // Popori: 240.4
					9: { distance: 167.62 }, // Elin: 167.624
					10: { distance: 158.11 } // Baraka: 158.112
				},
				chains: {
					3: 30,
					10: 30
				}
			},
			0: true,
			30: true
		},
		19: { // Fortitude
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
		24: { // Evasive Smash
			'*': {	// Same animation as lethal strike cast, just slower
				length: 1635, // 1630
				distance: 167.63, // 167.624
				race: {
					6: { distance: 168.11 }, // M.Casta: 168.112
					8: { distance: 240.4 }, // Popori: 240.4
					9: { distance: 167.62 }, // Elin: 167.624
					10: { distance: 158.11 } // Baraka: 158.112
				}
			},
			0: {
				type: 'storeCharge',
				length: 1015, // 1000, 1025
				distance: 150,
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 }
				}
			},
			5: { type: 'grantCharge' },
			10: { noInterrupt: [2, 3, 4, 10, 15, 18, 25, 30] }, // check noInterrupts
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
				noInterrupt: [2, '3-10', '3-11', '3-12', '3-13', 4, 6, '8-30', '10-10', '10-11', '10-12', '10-13', 11, 12, 13, '15-10', '15-11', '15-12', '15-13', '15-14', '18-10', '18-11', '18-12', '18-13', 24, 25, 26, 27, 28, 29, '32-0'],
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
		27: { // Unbreakable /Need M.Casta
			'*': {
				length: 2100,
				noInterrupt: [2]
			},
			0: true,
			30: false, // Used for Berserk mode? Chain?
		},
		28: { // Intimidation /Need M.Casta
			0: {
				length: 1560,
				noInterrupt: [2]
			},
			50: {
				length: 1560,
				noInterrupt: [2]
			}
		},
		29: { // Evasive Roll
			0: {
				length: 905,
				distance: 150,
				forceClip: true,
				noInterrupt: [2, 29],
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
			}
		},
		30: { // Axe Counter
			'*': {
				length: 650,
				distance: 21.05,
				noInterrupt: [1, '3-10', '3-11', '3-12', '3-13', 4, 6, '8-30', '10-10', '10-11', '10-12', '10-13', 11, 12, 13, '15-10', '15-11', '15-12', '15-13', '15-14', '18-10', '18-11', '18-12', '18-13', 24, 25, 26, 27, 28, 29, 30, 31, 32],
				requiredBuff: 401402,
				chains: { 2: 30 },
				race: {
					8: { // Popori, just WTF
						length: 1195,
						distance: 240.4
					},
					9: { distance: 21.05 }, // Elin: 21.05
					10: { distance: 21.08 } // Baraka: 21.084
				}
			},
			0: true,
			30: true
		},
		31: { // Overwhelm
			0: {
				type: 'dash',
				fixedSpeed: 1,
				length: 1115,
				distance: 470,
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				},
				noInterrupt: [2, 31],
				noRetry: true
			},
			1: {
				length: 1335
			}
		},
		32: { // Punishing Strike /Need M.Casta
			0: {
				length: 790,
				distance: 31.58,
				noInterrupt: [2],
				requiredBuff: 401400,
				race: {
					8: { // Popori: 930, 61.387
						length: 930,
						distance: 61.39
					},
					9: { distance: 31.58 }, // Elin: 31.575
					10: { distance: 31.63 } // Baraka: 31.628
				}
			},
			1: {
				length: 810,
				distance: 134.1,
				race: {
					8: { distance: 192.32 }, // Popori: 192.319
					9: { distance: 134.1 }, // Elin: 134.1
					10: { distance: 126.49 } // Baraka: 126.49
				}
			}
		},
		33: { // Rage / WUT IS THIS, maybe Berserk
			0: false // length: 
		},
		34: { // Right Hand / remember to test require buff
			0: false, /*{
				length:
				distance:
				chains: {
					35: 30
				}
			}*/
			30: false,
			31: false
		},
		35: { // Left Hand
			0: false, /*{
				length:
				distance:
				chains: {
					34: 30
				}
			}*/
			30: false,
			31: false // Intimidation usage?, specific chaining? Self chains?
		},
		36: { // Dual Wield
			0: false, /*{
				length:
				distance:
				chains: {
					34: 30,
					35: 30,
				}
			}*/
			30: false,
			31: false
		},
		37: { // Crimson Assault
			0: false, /*{
				length:
				distance:
				chains: { // It may just used 0 with most stuff and just chain from something particular though
					34: 30,
					35: 30,
					36: 30,
					37: 30
				}
			}*/
			30: false
		},
		38: { // Rage II 
			0: false, // { length: }
		},
		91: { // Awaken Aura
			0: false, // { length: }
		}
	},
	4: { // Sorcerer
		1: { // Fireball
			0: { length: 730 }
		},
		2: { // Frost Sphere
			0: {
				length: 800,
				race: {
					4: { length: 1250 }, // Male Aman
					9: { length: 1000 }, // Elin
					10: { length: 900 } // Baraka
				}
			}
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
				length: 1285,
				race: {
					9: { length: 1015 } // Elin
				},
				noRetry: true
			},
			0: {
				type: 'charging',
				length: [1000, 1000],
				noInterrupt: [7, 26],
				autorelease: 0,
				abnormals: {
					25140: { chargeSpeed: 0.3 }
				}
			},
			10: {
				noInterrupt: [7, 26], //
				abnormals: {
					500150: { skill: 330110 },
					//501600: { skill: 330150 },
					501650: { skill: 330150 }
				}
			},
			11: {
				noInterrupt: [7, 26], //
				abnormals: {
					500150: { skill: 330111 },
					//501600: { skill: 330150 },
					501650: { skill: 330150 }
				}
			},
			12: {
				noInterrupt: [7, 26], //
				abnormals: {
					500150: { skill: 330112 },
					//501600: { skill: 330150 },
					501650: { skill: 330150 }
				}
			}
		},
		5: { // Mana Infusion
			0: { length: 4600 }
		},
		6: { // Meteor Strike
			0: {
				length: 3925,
				glyphs: {
					25003: { speed: 1.17 },
					25069: { speed: 1.25 }
				},
				abnormals: {
					25100: { speed: 1.25 },
					500150: { skill: 320100 },
					//501600: { skill: 320150 },
					501650: { skill: 320150 }
				},
				race: {
					9: { length: 3700 } // Elin
				}
			}
		},
		7: { // Backstep
			0: {
				length: 660,
				distance: -200,
				forceClip: true,
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
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
			0: {
				length: 840,
				race: {
					9: { length: 800 } // Elin
				}
			}
		},
		12: { // Void Pulse
			0: { length: 935 } //
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
			0: {
				length: 1590, //
				race: {
					9: { length: 1330 } // Elin
				}
			}
		},
		17: { // Painful Trap
			0: { length: 1100 }
		},
		18: { // Glacial Retreat
			0: {
				length: 1100,
				distance: -187.5,
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				},
				forceClip: true
			}
		},
		19: { // Mana Siphon
			'*': {
				length: 900,
				noRetry: true
			},
			0: {
				type: 'charging',
				length: [1000, 1000],
				noInterrupt: [7, 26]
			},
			10: { noInterrupt: [7, 26] },
			11: { noInterrupt: [7, 26] },
			12: { noInterrupt: [7, 26] }
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
					25096: { speed: 1.4 } //
				},
				abnormals: {
					25060: { speed: 1.25 } //
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
				noRetry: true,
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
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
				length: 6775,
				glyphs: {
					25003: { speed: 1.17 },
					25069: { speed: 1.25 }
				},
				noRetry: true,
				race: {
					9: { length: 6475 } // Elin
				}
			},
			0: true,
			50: {
				length: 3925,
				race: {
					9: { length: 3700 } // Elin
				}
			}
		},
		33: { // Arcane Pulse (Mana Boost)
			'*': {
				length: 1285,
				noRetry: true,
				race: {
					9: { length: 1015 } // Elin
				}
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
				length: 1760,
				races: {
					1: { length: 1600 }	// F.Human
				},
				noRetry: true
			},
			0: {
				type: 'charging',
				length: [600, 600, 600],
				noInterrupt: [4, 22],
				//autoRelease: 2550,
				abnormals: {
					26180: { chargeSpeed: 0.3 },
					601450: { chargeSpeed: 0.5 }
				},
				level: [
					{ length: 600 },	// 1400
					{ length: [600, 600] },	// 1400
					{ length: [600, 600] },	// 1400
				]
			},
			10: {
				distance: -100,
				noInterrupt: [22],
				race: {
					8: { distance: -90.6 } // Popori, 90.604
				}
			}, // Cast F. - TODO
			11: {
				distance: -100,
				noInterrupt: [22],
				race: {
					8: { distance: -90.6 } // Popori, 90.604
				}
			},
			12: {
				distance: -100,
				noInterrupt: [22],
				race: {
					8: { distance: -90.6 } // Popori, 90.604
				}
			},
			13: {
				distance: -100,
				noInterrupt: [22],
				race: {
					8: { distance: -90.6 } // Popori, 90.604
				}
			}
		},
		4: { // Penetrating Arrow
			'*': {
				length: 1315,
				races: {
					1: { length: 1275 }	// F.Human, inb4 racechange
				},
				noRetry: true
			},
			0: {
				type: 'charging',
				length: [800, 800, 800],
				noInterrupt: [3, 22],
				//autoRelease: 2550,
				abnormals: {
					26160: { chargeSpeed: 0.3 },
					26170: { chargeSpeed: 0.3 },
					26171: { chargeSpeed: 0.4 },
					26190: { chargeSpeed: 0.3 },
					601450: { chargeSpeed: 0.5 }
				},
				level: [
					{ length: 1000 },	// 1400
					{ length: [1000, 1000] },	// 1400
					{ length: [1000, 1000] },	// 1400
				]
			},
			10: {
				distance: -50,
				noInterrupt: [22],
				race: {
					1: { distance: -80 }, // F.Human
					8: { distance: -48.69 } // Popori, 48.688
				}
			}, // Cast F. - TODO
			11: {
				distance: -50,
				noInterrupt: [22],
				race: {
					1: { distance: -80 }, // F.Human
					8: { distance: -48.69 } // Popori, 48.688
				}
			},
			12: {
				distance: -50,
				noInterrupt: [22],
				race: {
					1: { distance: -80 }, // F.Human
					8: { distance: -48.69 } // Popori, 48.688
				}
			},
			13: {
				distance: -50,
				noInterrupt: [22],
				race: {
					1: { distance: -80 }, // F.Human
					8: { distance: -48.69 } // Popori, 48.688
				}
			}
		},
		5: { // Rain of Arrows
			0: {
				length: 3170,
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
				length: 670,
				distance: -200,
				forceClip: true,
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
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
				noInterrupt: [22] // this actually doesn't do anything
			},
			0: {
				length: 433, // 445
				noInterrupt: [6]
			},
			1: { length: 600 },
			2: { length: 700 },
			3: { length: 800 },
			4: { length: 700 },
			5: { length: 800 },
			6: { length: 1233 } // 1240
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
			0: { length: 1150 } //
		},
		16: { // Breakaway Bolt
			0: {
				length: 1340,
				distance: -250,
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				},
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
				distance: 89.8	// 89.797
			},
			1: {
				length: 1200,
				distance: 87.29	// 97.292
			}
		},
		19: { // Poison Arrow
			0: {
				length: 1125,
				distance: -12.5,
				noInterrupt: [22],
				race: {
					8: { distance: -12.17 } // Popori, 12.167
				}
			}
		},
		20: { // Restraining Arrow
			0: {
				length: 525,
				noInterrupt: [22]
			}
		},
		21: { // Sniper's Eye
			'*': { length: 625 },
			0: true,
			50: true
		},
		22: { // Sequential Fire
			0: {
				length: 440, //
				requiredBuff: 600200,
				noInterrupt: [22],
				noRetry: true
			}
		},
		23: { // Stunning Trap Arrow
			0: { length: 1450 } // 1440
		},
		25: { // Incendiary Trap Arrow
			0: { length: 1225 } // 1215
		},
		29: { // Thunderbolt
			0: {
				length: 3750,
				distance: -100,
				noInterrupt: [22],
				glyphs: {
					26089: { speed: 1.3 },
					26102: { speed: 1.3 }
				},
				race: {
					1: { length: 3575 }, // F.Human
					8: { distance: -96.6 } // Popori, -96.604
				}
			}
		},
		31: { // Tenacity
			0: {
				fixedSpeed: 1,
				length: [500, 720] // 700
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
				length: 1075, // 1000
				distance: 413, // 412.078
				noInterrupt: [33],
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 }
				}
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
				length: 5915,
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
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				},
				forceClip: true
			}
		},
		27: { // Final Reprisal
			0: {
				length: 2600,
				noInterrupt: [2, 3, 5, 10, 12, 14, 17, 18, 19, 23, 25, 26, 27, 28 - 10, 34, 38, 41 - 10],
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
				length: 825,
				noRetry: true
			},
			0: {
				type: 'charging',
				length: [800, 1600],
				noInterrupt: [26, 27, 38],
				autoRelease: 3200,
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
				forceClip: true,
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
			}
		},
		39: { // Grace of Resurrection
			0: { length: 5900 }
		},
		40: { // Zenobia's Vortex
			0: {
				length: 1080,
				noInterrupt: [40]
			}
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
			11: { length: 835 }, // 840
			12: { length: 1300 }
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
				length: 8070, // 8050, 8060 //
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
			'*': { length: 1300 }, //
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
				noRetry: true,
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
			}
		},
		18: { // Arun's Vitae
			'*': {
				noInterrupt: [8, 17, 23],
				noRetry: true
			},
			0: {
				type: 'charging',
				length: 1475,
				chargeLevels: [10, 10],
				autoRelease: 0
			},
			10: {
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
			'*': {
				noInterrupt: [8, 17, 23],
				noRetry: true
			},
			0: {
				type: 'charging',
				length: 1475,
				chargeLevels: [10, 10],
				autoRelease: 0
			},
			10: {
				length: 850, // 810 female high elf
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
				length: [230, 470] // 240, 470
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
		'*': { consumeAbnormal: [10151020, 10151021, 10151022, 10141023] },
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
				chains: { 1: 1 }, // 1 to 1 :thinking:
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
			'*': {
				noInterrupt: [1, 4, 8, 9, 10, 11, 12, 20],
				chains: {
					1: null,
					3: null,
					//4: null,
					5: null,
					6: null,
					8: null,
					9: null,
					10: null,
					11: null,
					12: null
				},
				noRetry: true
			},
			0: {
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
				}
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
				blockCancelPacket: true,
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
					//5: 30,
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
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 }
				},
				noInterrupt: [1, 3, 4, 5, 6, 8, 9, 10, 11, 12, 14, 20]
			}
		},
		10: { // Pendulum Strike
			'*': {
				length: 1000,
				distance: -200,
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				},
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
				triggerAbnormal: { 10151041: 2000 },
				consumeAbnormal: 10151040
			},
			2: {
				triggerAbnormal: { 10151042: 2000 },
				consumeAbnormal: 10151041
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
				length: 3265, //
				noInterrupt: [1, 3, 4, 5, 6, 8, 9, 10, 11, 14, 20],
				chains: {
					12: 1
				}
			},
			1: {
				length: 2060, //
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
				length: 1575, //
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
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
				distance: 150,
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
			}
		},
		/*20: { // Cable Step
			0: {
				type: 'dynamicDistance',
				length: 1250
			}
		},*/
		40: { // Shadow Step
			'*': {
				length: 700,
				distance: 180,
				forceClip: true,
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 },
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
				length: 1195,
				noInterrupt: [1]
			},
			1: true,
			2: true
		},
		2: { // Bombardment
			'*': { noRetry: true },
			0: {
				type: 'lockon',
				fixedSpeed: 1,
				length: 59900
			},
			1: {
				type: 'lockonCast',
				length: 3000,
				glyphs: {
					30004: { speed: 1.25 }
				}
			}
		},
		3: { // Scattershot
			'*': {
				length: 1725,
				distance: -108,
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
				noInterrupt: ['4-3', '4-4', 20],
				chains: {
					'2-1': 30,
					3: 30,
					4: 4, //
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
			1: {
				noInterrupt: [4],
				noRetry: true
			},
			2: { noRetry: true },
			3: {
				length: 1195,
				distance: -198.53
			},
			4: {
				length: 1195,
				distance: -198.53
			},
			30: { noRetry: true }
		},
		5: { // Burst Fire
			'*': {
				blockCancelPacket: true,
				noInterrupt: ['9-0']
			},
			0: { length: 855 },
			1: {
				fixedSpeed: 1,
				length: 122,
				stamina: 70,
				instantStamina: true,
				glyphs: {
					30046: { stamina: -10 }
				},
				level: [
					{ stamina: 50 },
					{ stamina: 55 },
					{ stamina: 60 },
					{ stamina: 65 }
				]
			}
		},
		6: { // Time Bomb
			'*': {
				fixedSpeed: 1,
				length: 1010
			},
			1: true,
			2: true
		},
		7: { // Arcane Barrage
			'*': {
				length: 1525
			},
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
				blockCancelPacket: true,
				length: 1250,
				noInterrupt: [20],
				noRetry: true
			},
			0: {
				type: 'charging',
				autoRelease: 0
			},
			10: { distance: -50 },
			11: { distance: -100 }
		},
		10: { // Arc Bomb
			'*': {
				blockCancelPacket: true,
				length: 1325,
				noInterrupt: [10, 20],
				chains: {
					'2-1': null,
					3: null,
					4: null,
					'7-3': null,
					'9-10': null,
					'9-11': null,
					//10: null,
					11: null,
					13: null,
					15: null,
					19: null,
					40: null
				},
				noRetry: true
			},
			1: true,
			2: true,
			30: true
		},
		11: { // Rocket Jump
			'*': {
				length: 1400,
				noInterrupt: [3, 11, 15, 20],
				distance: 415.45,
				chains: {
					'2-1': 30,
					3: 30,
					4: 30,
					'7-3': 30,
					'9-10': 30,
					'9-11': 30,
					10: 30,
					//11: 30,
					13: 30,
					19: 30,
					40: 31
				}
			},
			1: true,
			2: true,
			30: true,
			31: {
				length: 1675,
				distance: 506.27,
				race: {
					7: { // Female Castanic
						length: 1700,
						distance: 503.64
					}
				}
			}
		},
		13: { // Balder's Vengeance
			'*': {
				length: 5800,
				distance: -269.09,
				noInterrupt: [13],
				chains: {
					'2-1': 30,
					3: 30,
					4: 30,
					'7-3': 30,
					'9-10': 30,
					'9-11': 30,
					10: 30,
					11: 30,
					//13: 30,
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
				noInterrupt: [15, 20],
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
					//15: 30,
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
				length: 1430,
				noInterrupt: [18]
			},
			1: true,
			2: true
		},
		19: { // ST
			'*': {
				length: 1325,
				chains: {
					'2-1': null,
					3: null,
					4: null,
					'7-3': null,
					'9-10': null,
					'9-11': null,
					10: null,
					11: null,
					13: null,
					15: null,
					//19: null,
					40: null
				},
				noRetry: true
			},
			1: true,
			2: true,
			30: true
		},
		20: { // Retaliate
			0: {
				type: 'retaliate',
				length: 1485,
				noRetry: true
			}
		},
		40: { // Rolling Reload
			0: {
				fixedSpeed: 1,
				length: 935,
				noInterrupt: [11],
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
				length: 1575, // is this needed?
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
				length: 1575, // is this needed?
				distance: 68.63
			}
		},
		2: { // Counter
			'*': {
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				},
				noRetry: true
			},
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
			'*': {
				length: 3225,
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
			},
			0: true,
			30: true
		},
		5: { // Bullrush
			0: {
				fixedSpeed: 1,
				length: [2950, 650],
				distance: [0, 135],
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
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
			30: { fixedSpeed: 1 },
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
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
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
				noRetry: true,
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
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
					3: 30,
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
					3: 70,
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
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 },
					10154010: { chain: 30 }
				}
			},
			0: true,
			30: true
		},
		3: { // Leaves on the Wind
			'*': {
				length: 1275,
				noInterrupt: [3, '4-10'],
				chains: {
					1: null,
					2: 30,
					'4-10': 'borked',
					5: 30,
					6: null,
					7: null,
					8: 30, // reeeeeeeeee
					9: null,
					10: null,
					12: null,
					13: null, // eeeeeeeeeeee
					14: null,
					15: null,
					16: null,
					17: 30,
					18: null,
					19: null,
					20: null
				}
			},
			0: true,
			30: true
		},
		4: { // Jagged Path
			1: {
				type: 'dash',
				fixedSpeed: 1,
				length: 665,
				distance: 469,
				noInterrupt: [4],
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
			},
			10: { length: 1500 },
			11: {
				length: 300,
				distance: 150
			}
		},
		5: { // Impact Bomb
			'*': {
				length: 1008,
				distance: -291.6,
				noInterrupt: [5],
				chains: {
					1: null,
					2: null,
					3: null,
					4: null,
					6: null,
					7: null,
					8: null,
					9: null,
					10: null,
					11: null,
					12: null,
					13: null,
					14: null,
					15: null,
					16: null,
					17: null,
					19: null,
					20: null
				},
				forceClip: true,
				noRetry: true,
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
			},
			0: true,
			30: true
		},
		6: { // One Thousand Cuts
			'*': {
				length: 430,
				chains: { // Needed to state we want to trigger substage 4, else it will trigger 6
					1: 30,
					5: 30,
					4: 30,
					7: 30,
					//8: 30, sometimes uses it, sometimes it doesn't
					9: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					18: 30,
					19: 30,
					20: 30
				},
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
			},
			0: true,
			1: { // 0/30(iframe) -> 1(dash, also iframes) -> 10(deeps, doesn't iframe in the very beginning) 
				type: 'dash',
				fixedSpeed: 1,
				length: 300,
				distance: 246
			},
			10: { length: 3500 },
			30: true
		},
		7: { // Decoy Jutsu
			0: {
				length: 1550,
				onlyTarget: true,
				noInterrupt: [7],
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
			}
		},
		8: { // Fire Avalanche
			'*': {
				length: [700, 1375, 325],
				distance: [0, 367.31, 0],
				abnormals: {
					10154080: { chain: 1 },
					10154081: { chain: 2 }
				},
				chains: {
					1: 30,
					3: 30,
					4: 30,
					5: 30,
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
			'*': {
				length: 725,
				chains: {
					1: null,
					2: null,
					4: null,
					5: null,
					6: null,
					7: null,
					8: null,
					10: null,
					11: null,
					12: null,
					13: null,
					14: null,
					15: null,
					16: null,
					17: null,
					19: null,
					20: null
				},
			},
			0: {
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 }
				}
			},
			30: true
		},
		11: { // Focus
			'*': {
				length: 1430,
				noInterrupt: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20]
			},
			0: true,
			50: true
		},
		12: { // Skyfall
			'*': {
				length: 1325,
				distance: 154.72,
				chains: {
					1: 30,
					2: 30, // Rarely triggers, does not affect its normal usage
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					19: 30,
					18: 30,
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
				chains: {
					1: 30,
					2: 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					12: 30,
					14: 30,
					15: 30,
					16: 30,
					18: 30,
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
				chains: {
					1: 30,
					2: 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					12: 30,
					13: 30,
					15: 30,
					16: 30,
					18: 30,
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
				length: 1525,
				noInterrupt: ['4-10', 16],
				chains: {
					1: null,
					2: 30,
					3: null,
					'4-10': 'borked',
					5: 30,
					6: null,
					7: null,
					8: 30, // reeeeeeeeee
					9: null,
					10: null,
					12: null,
					13: null, // eeeeeeeeeeee
					14: null,
					15: null,
					17: 30,
					18: null,
					19: null,
					20: null
				}
			},
			0: true,
			30: true
		},
		17: { // Attunement
			'*': {
				length: 1000,
				chains: {
					1: 30,
					2: 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
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
			0: true,
			30: true
		},
		18: { // Bladestorm
			'*': {
				length: 1000,
				distance: 68.535,
				noInterrupt: ['4-10', 18],
				chains: {
					1: null,
					2: 30,
					3: null,
					'4-10': 'borked',
					5: 30,
					6: null,
					7: null,
					8: 30, // reeeeeeeeee
					9: null,
					10: null,
					12: null,
					13: null, // eeeeeeeeeeee
					14: null,
					15: null,
					16: null,
					17: 30,
					19: null,
					20: null
				}
			},
			0: true,
			30: true
		},
		19: { // Chakra Thrust
			'*': {
				length: [225, 825],
				distance: 127.5,
				noInterrupt: [19],
				chains: {
					1: 30,
					3: 30,
					4: 30,
					5: 30,
					6: 30,
					7: 30,
					8: 30,
					9: 30,
					12: 30,
					13: 30,
					14: 30,
					15: 30,
					16: 30,
					18: 30,
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
				//noInterrupt: ['4-0', '4-10', '4-11'],
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
		10: { // Dream Slash // need to check chains
			'*': {
				length: 1775,
				distance: 11.78,
				noInterrupt: [10],
				glyphs: {
					33020: { speed: 1.2 }
				},
				chains: {
					1: null,
					2: null,
					3: null,
					4: null,
					5: null,
					6: null,
					7: null,
					8: null,
					9: null,
					11: null,
					12: null,
					13: null,
					14: null,
					15: null,
					16: null,
					//17: 30, // Not correct since still triggers substage 4 on them.
					18: null,
					19: null,
					20: null,
					//21: 30 //  But for now it works /shrug
				}
			},
			0: true,
			30: true // if we add a chain to a skill that we want to trigger substage 4 on, it will break, ghosting if there's no fast enough server response.
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
				forceClip: true,
				abnormals: {
					400800: { chain: 6 },
					400801: { chain: 6 },
					501320: { chain: 6 },
					501321: { chain: 6 },
					501322: { chain: 6 },
					501323: { chain: 6 },
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				}
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
					18: 30,
					//19: 30,
					20: 30
				}
			},
			0: true,
			30: true
		},
		20: { // Backstab
			0: {
				length: 1500,
				abnormals: {
					7692002: { chain: 6 },
					9692002: { chain: 6 }
				},
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
