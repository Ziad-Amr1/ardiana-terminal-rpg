const player = {
  id: "player_1",

  info: {
    name: "Kayda",
  },

  base_stats: {
    STR: 5, // STR increases physical damage
    VIT: 5, // VIT increases HP
    WIS: 5, // WIS increases mana
    DEX: 5, // DEX increases crit chance
    LUK: 5, // LUK increases drop rate
  },

  resources: {
    health: 10,
    maxHealth: 10,
    mana: 10,
    maxMana: 10,
    stamina: 10,
    maxStamina: 10,
  },

  combat: {
    damage: 4,
    critChance: 5,
    critDamage: 0, // 1.5 * damage
  },

  progression: {
    level: 1,
    exp: 0,
    expRequired: 100,
    statsPoints: 0,
  },

  economy: {
    coins: 500,
  },

  inventory: [],
  area_id: "abandoned_forest",

  equipment: {
    weapon: null,
    armor: null,
    accessory: null,
  },
  // currentBuffs
  // statusEffects
};

module.exports = { player };
