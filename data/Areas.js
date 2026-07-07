const { Area } = require("../factories/createAreas");

// ========== AREAS ===========

const forest = new Area({
  id: "abandoned_forest",
  type: "forest",
  name: "The Abandoned Forest",
  description: "A forest that has been abandoned for a long time",
  services: { shop: false, inn: false, blacksmith: false },
  levelRange: { min: 1, max: 3 },
  enemies: [
    { enemyId: "green_slime", weight: 60 },
    { enemyId: "green_goblin", weight: 30 },
    { enemyId: "skeleton_soldier", weight: 9 },
    { enemyId: "forest_ogre", weight: 1 },
  ],
  connections: {
    north: { areaId: "zedon_city", distance: 5 },
  },
  encounterChance: 50
});

const city = new Area({
  id: "zedon_city",
  type: "city",
  name: "Zedon City",
  description: "One of the biggest cities in the world",
  services: { shop: true, inn: true, blacksmith: false },
  levelRange: { min: 1, max: 1 }, // أو ممكن تسيبيها فاضية لأنها هتاخد القيم الافتراضية
  enemies: [],
  connections: {
    south: { areaId: "abandoned_forest", distance: 5 },
  },
  encounterChance: 0
});

// module.exports = { forest, city };