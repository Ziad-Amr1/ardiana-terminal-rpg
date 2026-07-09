const { Item, Equipment, Weapon } = require("../factories/createItem");

// ========== CREATE ENTITIES ===========

let smallHealthPotion = new Item({
  id: "small_health_potion",
  name: "Small Health Potion",
  description: "small magic potion used to restore small amount of Health",
  category: "consumable",
  value: 40,
  effect: { healAmount: 5 },
  stackable: true,
  maxStack: 99
});

let rustyIronSword = new Weapon({
  id: "rusty_iron_sword",
  name: "Rusty Iron Sword",
  description: "sword made of iron, but it's old and rusty",
  slot: "weapon",
  value: 150,
  rarity: "common",
  slot: "weapon",
  
  statsBonus: { STR: 1, DEX: 1 },
  requirements: { level: 1, stats: { STR: 5 } },
  durability: { current: 100, max: 100 },
  weaponStats: { damage: 25 },
  specialEffects: [],
});

let magicFireSword = new Weapon({
  id: "magic_fire_sword",
  name: "Magic Fire Sword",
  description: "A magical sword infused with fire energy.",
  slot: "weapon",
  value: 1000,
  rarity: "rare",

  statsBonus: { STR: 2, WIS: 1 },
  requirements: { level: 3, stats: { STR: 7 } },
  durability: { current: 100, max: 100 },
  weaponStats: { damage: 55, critChance: 10, critDamage: 1.5 },
  specialEffects: [{ type: "burn", chance: 25, damage: 5, duration: 3 }],
});

let goblinLeather = new Item({
  id: "goblin_leather",
  name: "Goblin Leather",
  description: "leather from a goblin, it can be used to make armor",
  category: "gathering",
  value: 25,
  stackable: true,
  maxStack: 99
});

let goblinTooth = new Item({
  id: "goblin_tooth",
  name: "Goblin Tooth",
  description: "tooth from a goblin, it can be used to make accessories",
  category: "gathering",
  value: 10,
  stackable: true,
  maxStack: 99
});

let slimegoo = new Item({
  id: "slime_goo",
  name: "Slime Goo",
  description: "slime goo, it can be used in alchemy to make potion",
  category: "gathering",
  value: 10,
  stackable: true,
  maxStack: 99
});

let skeletonBone = new Item({
  id: "skeleton_bone",
  name: "Skeleton Bone",
  description: "bone from a skeleton, it can be used to make accessories",
  category: "gathering",
  value: 10,
  stackable: true,
  maxStack: 99
});

let orcLeather = new Item({
  id: "orc_leather",
  name: "Orc Leather",
  description: "leather from an orc, it can be used to make armor",
  category: "gathering",
  value: 80,
  stackable: true,
  maxStack: 99
});

let orcTeeth = new Item({
  id: "orc_teeth",
  name: "Orc Teeth",
  description: "teeth from an orc, it can be used to make armor",
  category: "gathering",
  value: 60,
  stackable: true,
  maxStack: 99
});


// ==========================================
// 🧪 الموارد الاستهلاكية (Consumables)
// ==========================================
new Item({
  id: "medium_health_potion",
  name: "Medium Health Potion",
  description: "A glowing red potion that restores a decent amount of Health.",
  category: "consumable",
  value: 100,
  effect: { healAmount: 20 },
  stackable: true,
  maxStack: 99
});

new Item({
  id: "small_mana_potion",
  name: "Small Mana Potion",
  description: "A blue vial that restores a small amount of Mana.",
  category: "consumable",
  value: 50,
  effect: { restoreMana: 10 },
  stackable: true,
  maxStack: 99
});

// ==========================================
// ⚔️ الأسلحة (Weapons)
// ==========================================
new Equipment({
  id: "wooden_staff",
  name: "Wooden Staff",
  description: "A simple staff used by novice mages. Lightweight but fragile.",
  value: 120,
  slot: "weapon",
  statsBonus: { damage: 5, critChance: 2 } 
});

new Equipment({
  id: "iron_dagger",
  name: "Iron Dagger",
  description: "A fast and sharp blade, perfect for critical strikes.",
  value: 200,
  slot: "weapon",
  statsBonus: { damage: 6, critChance: 15, critDamage: 5 }
});

// ==========================================
// 🛡️ الدروع (Armor)
// ==========================================
new Equipment({
  id: "leather_tunic",
  name: "Leather Tunic",
  description: "Provides basic protection without restricting your movement.",
  value: 250,
  slot: "armor",
  statsBonus: { defense: 5 }
});

new Equipment({
  id: "iron_chestplate",
  name: "Iron Chestplate",
  description: "Heavy armor that provides excellent defense against physical attacks.",
  value: 600,
  slot: "armor",
  statsBonus: { defense: 12 }
});

// ==========================================
// 💍 الإكسسوارات (Accessories)
// ==========================================
new Equipment({
  id: "ring_of_fortune",
  name: "Ring of Fortune",
  description: "A shiny gold ring that slightly increases your drop rate.",
  value: 800,
  slot: "accessory",
  statsBonus: { defense: 1, dropRate: 10 } // 10% زيادة في الغنائم
});

new Equipment({
  id: "amulet_of_vitality",
  name: "Amulet of Vitality",
  description: "An ancient amulet that boosts your overall defense.",
  value: 1000,
  slot: "accessory",
  statsBonus: { defense: 8 }
});

// ==========================================
// 🪵 مواد التصنيع (Gathering / Materials)
// ==========================================
new Item({
  id: "iron_ore",
  name: "Iron Ore",
  description: "Raw iron ore. Can be smelted by a blacksmith.",
  category: "gathering",
  value: 15,
  stackable: true,
  maxStack: 99
});

new Item({
  id: "magic_dust",
  name: "Magic Dust",
  description: "Dust that glows in the dark. Used in alchemy.",
  category: "gathering",
  value: 30,
  stackable: true,
  maxStack: 99
});