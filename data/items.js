const { createItem } = require("../factories/createItem");

// ========== CRATE ENITIRES ===========
let smallHealthPotion = createItem(
  "Small Health potion",
  "small magic potion used to restore small amount of Health",
  "consumable",
  50,
  { healAmount: 5 },
);

let rustyIronSword = createItem(
  "Rusty Iron Sword",
  "sword made of iron, but it's old and rusty, it can be used to increase your damage",
  "weapon",
  100,
  { damage: 10 },
);

let goblinLeather = createItem(
  "Goblin Leather",
  "leather from a goblin, it can be used to make armor",
  "gathering",
  100,
  { },
);

let slimedrop = createItem(
  "Slime Drop",
  "slime drop, it can be used in alchemy to make potion",
  "gathering",
  100,
  { },
);