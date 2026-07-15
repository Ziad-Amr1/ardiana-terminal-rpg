// ./data/items.js

const {
  Equipment,
  Weapon,
  Armor,
  Consumable,
  Material,
} = require("../factories/createItem");

/*
ITEM DEFINITIONS

├── Consumables
│   └── Potions
│
├── Materials
│   ├── Gathering
│   └── Drops
│
└── Equipment
    ├── Weapons
    ├── Armor
    └── Accessories
*/

// ============================================================
// CONSUMABLES
// ============================================================

// -------------------- Potions --------------------

const smallHealthPotion = new Consumable({
  id: "small_health_potion",
  name: "Small Health Potion",
  description: "A small magical potion that restores a small amount of Health.",
  rarity: "common",
  buyPrice: 30,
  sellPrice: 15,
  stackable: true,
  maxStack: 99,
  subCategory: "potion",
  effects: [{ type: "instantHeal", amount: 10 }],
});

new Consumable({
  id: "medium_health_potion",
  name: "Medium Health Potion",
  description: "A glowing red potion that restores a moderate amount of Health.",
  rarity: "common",
  buyPrice: 80,
  sellPrice: 40,
  stackable: true,
  maxStack: 99,
  subCategory: "potion",
  effects: [{ type: "instantHeal", amount: 25 }],
});

new Consumable({
  id: "small_mana_potion",
  name: "Small Mana Potion",
  description: "A small blue potion that restores a small amount of Mana.",
  rarity: "common",
  buyPrice: 35,
  sellPrice: 15,
  stackable: true,
  maxStack: 99,
  subCategory: "potion",
  effects: [{ type: "restoreMana", amount: 10 }],
});

// ============================================================
// MATERIALS
// ============================================================

// -------------------- Gathering --------------------

new Material({
  id: "iron_ore",
  name: "Iron Ore",
  description: "Raw iron ore that can be smelted by a blacksmith.",
  rarity: "common",
  buyPrice: 15,
  sellPrice: 8,
  stackable: true,
  maxStack: 99,
  subCategory: "gathering",
});

new Material({
  id: "magic_dust",
  name: "Magic Dust",
  description: "Magical dust that glows faintly and is commonly used in alchemy.",
  rarity: "uncommon",
  buyPrice: 30,
  sellPrice: 15,
  stackable: true,
  maxStack: 99,
  subCategory: "gathering",
});

// -------------------- Drops --------------------

const goblinLeather = new Material({
  id: "goblin_leather",
  name: "Goblin Leather",
  description: "Leather obtained from a goblin that can be used to craft basic equipment.",
  rarity: "common",
  buyPrice: 20,
  sellPrice: 10,
  stackable: true,
  maxStack: 99,
  subCategory: "drops",
});

const goblinTooth = new Material({
  id: "goblin_tooth",
  name: "Goblin Tooth",
  description: "A tooth obtained from a goblin that can be used as a crafting material.",
  rarity: "common",
  buyPrice: 10,
  sellPrice: 5,
  stackable: true,
  maxStack: 99,
  subCategory: "drops",
});

const slimeGoo = new Material({
  id: "slime_goo",
  name: "Slime Goo",
  description: "A sticky substance obtained from a slime and commonly used in alchemy.",
  rarity: "common",
  buyPrice: 8,
  sellPrice: 4,
  stackable: true,
  maxStack: 99,
  subCategory: "drops",
});

const skeletonBone = new Material({
  id: "skeleton_bone",
  name: "Skeleton Bone",
  description: "A sturdy bone obtained from a skeleton and used in various crafting recipes.",
  rarity: "common",
  buyPrice: 15,
  sellPrice: 7,
  stackable: true,
  maxStack: 99,
  subCategory: "drops",
});

const orcLeather = new Material({
  id: "orc_leather",
  name: "Orc Leather",
  description: "Durable leather obtained from an orc that can be used to craft armor.",
  rarity: "uncommon",
  buyPrice: 50,
  sellPrice: 25,
  stackable: true,
  maxStack: 99,
  subCategory: "drops",
});

const orcTeeth = new Material({
  id: "orc_teeth",
  name: "Orc Teeth",
  description: "Strong teeth obtained from an orc and used as uncommon crafting materials.",
  rarity: "uncommon",
  buyPrice: 40,
  sellPrice: 20,
  stackable: true,
  maxStack: 99,
  subCategory: "drops",
});

// ============================================================
// EQUIPMENT
// ============================================================

// -------------------- Weapons --------------------

const rustyIronSword = new Weapon({
  id: "rusty_iron_sword",
  name: "Rusty Iron Sword",
  description: "An old iron sword covered in rust. Worn, but still usable.",
  rarity: "common",
  buyPrice: 100,
  sellPrice: 50,
  stackable: false,
  maxStack: 1,
  statsBonus: {
    STR: 1,
  },
  requirements: {
    level: 1,
    stats: {
      STR: 5,
    },
  },
  maxDurability: 60,
  maxUpgradeLevel: 2,
  weaponStats: {
    damage: 3,
  },
  effects: [],
});

const magicFireSword = new Weapon({
  id: "magic_fire_sword",
  name: "Magic Fire Sword",
  description: "A magical sword infused with unstable fire energy.",
  rarity: "rare",
  buyPrice: 1200,
  sellPrice: 600,
  stackable: false,
  maxStack: 1,
  statsBonus: {
    STR: 2,
    WIS: 1,
  },
  requirements: {
    level: 8,
    stats: {
      STR: 10,
      WIS: 7,
    },
  },
  maxDurability: 120,
  maxUpgradeLevel: 5,
  weaponStats: {
    damage: 10,
    critChance: 5,
  },
  effects: [
    {
      type: "burn",
      chance: 20,
      damage: 2,
      duration: 3,
    },
  ],
});

new Weapon({
  id: "wooden_staff",
  name: "Wooden Staff",
  description: "A simple wooden staff commonly used by novice mages.",
  rarity: "common",
  buyPrice: 100,
  sellPrice: 50,
  stackable: false,
  maxStack: 1,
  statsBonus: {
    WIS: 2,
  },
  requirements: {
    level: 1,
    stats: {
      WIS: 5,
    },
  },
  maxDurability: 50,
  maxUpgradeLevel: 2,
  weaponStats: {
    damage: 2,
    damageType: "magic",
  },
  effects: [],
});

new Weapon({
  id: "iron_dagger",
  name: "Iron Dagger",
  description: "A light and sharp blade designed for quick attacks.",
  rarity: "uncommon",
  buyPrice: 250,
  sellPrice: 125,
  stackable: false,
  maxStack: 1,
  statsBonus: {
    DEX: 2,
  },
  requirements: {
    level: 3,
    stats: {
      DEX: 7,
    },
  },
  maxDurability: 80,
  maxUpgradeLevel: 3,
  weaponStats: {
    damage: 4,
    critChance: 5,
  },
  effects: [
    {
      type: "bleeding",
      chance: 15,
      damage: 2,
      duration: 3,
    },
  ],
});

// -------------------- Armor --------------------

new Armor({
  id: "leather_tunic",
  name: "Leather Tunic",
  description: "Light armor that provides basic protection without greatly restricting movement.",
  rarity: "common",
  buyPrice: 150,
  sellPrice: 75,
  stackable: false,
  maxStack: 1,
  statsBonus: {
    VIT: 1,
  },
  requirements: {
    level: 1,
    stats: {
      VIT: 5,
    },
  },
  subCategory: "armor",
  slot: "armor",
  maxDurability: 80,
  maxUpgradeLevel: 2,
  armorStats: {
    armor: 3,
  },
  effects: [],
});

new Armor({
  id: "iron_chestplate",
  name: "Iron Chestplate",
  description: "Heavy iron armor that provides reliable protection against physical attacks.",
  rarity: "uncommon",
  buyPrice: 500,
  sellPrice: 250,
  stackable: false,
  maxStack: 1,
  statsBonus: {
    VIT: 2,
  },
  requirements: {
    level: 4,
    stats: {
      VIT: 8,
    },
  },
  subCategory: "armor",
  slot: "armor",
  maxDurability: 150,
  maxUpgradeLevel: 3,
  armorStats: {
    armor: 8,
  },
  effects: [],
});

// -------------------- Accessories --------------------

new Equipment({
  id: "ring_of_fortune",
  name: "Ring of Fortune",
  description: "A golden ring enchanted to slightly improve its wearer's luck.",
  rarity: "uncommon",
  buyPrice: 600,
  sellPrice: 300,
  stackable: false,
  maxStack: 1,
  subCategory: "accessory",
  slot: "accessory",
  statsBonus: {
    LUK: 2,
    dropRate: 5,
  },
  effects: [],
});

new Equipment({
  id: "amulet_of_vitality",
  name: "Amulet of Vitality",
  description: "An ancient amulet enchanted to strengthen its wearer's vitality.",
  rarity: "rare",
  buyPrice: 1000,
  sellPrice: 500,
  stackable: false,
  maxStack: 1,
  subCategory: "accessory",
  slot: "accessory",
  statsBonus: {
    VIT: 3,
    defense: 3,
  },
  effects: [],
});