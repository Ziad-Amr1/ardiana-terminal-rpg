const { Enemy } = require("../factories/createEnemy");

// ========== CREATE ENTITIES ===========

const slime = new Enemy({
  id: "green_slime",
  name: "Green Slime",
  health: 5,
  damage: 2,
  coins: 8,
  exp: 12,
  loot: [{ id: "slime_drop", name: "Slime Drop", DR: 20 }],
  area_id: "abandoned_forest"
});

const goblin = new Enemy({
  id: "green_goblin",
  name: "Green Goblin",
  health: 12,
  damage: 4,
  coins: 15,
  exp: 20,
  loot: [{ id: "goblin_leather", name: "Goblin Leather", DR: 20 }],
  area_id: "abandoned_forest"
});

const skeletonSolider = new Enemy({
  id: "skeleton_soldier",
  name: "Skeleton Solider",
  health: 25,
  damage: 8,
  coins: 30,
  exp: 40,
  loot: [{ id: "rusty_iron_sword", name: "Rusty iron sword", DR: 20 }],
  area_id: "abandoned_forest"
});

const forestOgre = new Enemy({
  id: "forest_ogre",
  name: "Forest Ogre",
  health: 50,
  damage: 10,
  coins: 75,
  exp: 75,
  loot: [
    { id: "orc_leather", name: "Orc Leather", DR: 20 },
    { id: "orc_teeth", name: "Orc Teeth", DR: 20 }
  ],
  area_id: "abandoned_forest"
});
