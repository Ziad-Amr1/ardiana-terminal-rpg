// ./data/enemies.js

const { Enemy } = require("../factories/createEnemy");

// ============================================================
// ENEMIES
// ============================================================

const slime = new Enemy({
  id: "green_slime",
  name: "Green Slime",

  health: 10,
  damage: 2,

  coins: 5,
  exp: 10,

  loot: [
    {
      itemId: "slime_goo",
      DR: 30,
    },
  ],

  area_id: "abandoned_forest",
});

const goblin = new Enemy({
  id: "green_goblin",
  name: "Green Goblin",

  health: 20,
  damage: 4,

  coins: 10,
  exp: 20,

  loot: [
    {
      itemId: "goblin_tooth",
      DR: 25,
    },
    {
      itemId: "goblin_leather",
      DR: 15,
    },
  ],

  area_id: "abandoned_forest",
});

const skeletonSoldier = new Enemy({
  id: "skeleton_soldier",
  name: "Skeleton Soldier",

  health: 35,
  damage: 6,

  coins: 20,
  exp: 35,

  loot: [
    {
      itemId: "rusty_iron_sword",
      DR: 5,
    },
    {
      itemId: "skeleton_bone",
      DR: 30,
    },
  ],

  area_id: "abandoned_forest",
});

const forestOgre = new Enemy({
  id: "forest_ogre",
  name: "Forest Ogre",

  health: 80,
  damage: 10,

  coins: 50,
  exp: 70,

  loot: [
    {
      itemId: "orc_leather",
      DR: 25,
    },
    {
      itemId: "orc_teeth",
      DR: 20,
    },
  ],

  area_id: "abandoned_forest",
});
