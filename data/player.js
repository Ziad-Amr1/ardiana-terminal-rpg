// ./data/player.js

const player = {
  id: "player_1",

  info: {
    name: "Kayda",
  },

  base_stats: {
    STR: 5, // Strength: increases physical damage
    VIT: 5, // Vitality: increases maximum Health
    WIS: 5, // Wisdom: increases maximum Mana
    DEX: 5, // Dexterity: increases Critical Chance
    LUK: 5, // Luck: increases Drop Rate
  },

  resources: {
    health: 50,
    maxHealth: 50,

    mana: 25,
    maxMana: 25,

    stamina: 30,
    maxStamina: 30,
  },

  combat: {
    damage: 5,
    critChance: 5,
    critDamage: 1.5,
  },

  progression: {
    level: 1,
    exp: 0,
    expRequired: 100,
    statsPoints: 0,
  },

  economy: {
    coins: 50,
  },

  inventory: [],

  area_id: "abandoned_forest",

  equipment: {
    weapon: null,
    armor: null,
    accessory: null,
  },

  // currentBuffs: [],
  // statusEffects: [],
};

module.exports = { player };
