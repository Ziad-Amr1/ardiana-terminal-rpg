const { createEnemy } = require("../factories/createEnemy");

// ========== CRATE ENITIRES ===========
// id, name, health, damage, coins, exp, loot, area_id
let slime = createEnemy(
  "green_slime",
  "Green Slime",
  5,
  2,
  8,
  12,
  [
    {
      id: "slime_drop",
      name: "Slime Drop",
      DR: 20,
    },
  ],
  "abandoned_forest",
);

let goblin = createEnemy(
  "green_goblin",
  "Green Goblin",
  12,
  4,
  15,
  20,
  [
    {
      id: "goblin_leather",
      name: "Goblin Leather",
      DR: 20,
    },
  ],
  "abandoned_forest",
);

let skeletonSolider = createEnemy(
  "skeleton_soldier",
  "Skeleton Solider",
  25,
  8,
  30,
  40,
  [
    {
      id: "rusty_iron_sword",
      name: "Rusty iron sword",
      DR: 20,
    },
  ],
  "abandoned_forest",
);

let forestOgre = createEnemy(
  "forest_ogre",
  "Forest Ogre",
  50,
  10,
  75,
  75,
  [
    {
      id: "orc_leather",
      name: "Orc Leather",
      DR: 20,
    },
    {
      id: "orc_teeth",
      name: "Orc Teeth",
      DR: 20,
    },
  ],
  "abandoned_forest",
);
