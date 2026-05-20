const { createArea } = require("../factories/createAreas");

// ========== AREAS ===========
const forest = createArea(
  "abandoned_forest",
  "The Abandoned Forest",
  "A forest that has been abandoned for a long time",
  1,
  3,
  [
    {
      enemyId: "green_slime",
      weight: 60,
    },
    {
      enemyId: "green_goblin",
      weight: 30,
    },
    {
      enemyId: "skeleton_soldier",
      weight: 9,
    },
    {
      enemyId: "forest_ogre",
      weight: 1,
    },
  ],
  {
    north: {
      areaId: "zedon_city",
      distance: 5,
    },
  },
  70,
);

const city = createArea(
  "zedon_city",
  "Zedon City",
  "One of the biggest cities in the world",
  null,
  null,
  [],
    {
    south: {
      areaId: "abandoned_forest",
      distance: 5,
    },
  },
  0,
);
