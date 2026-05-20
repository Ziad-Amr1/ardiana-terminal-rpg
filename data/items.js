const { createItem } = require("../factories/createItem");

// ========== CRATE ENITIRES ===========
let smallHealthPotion = createItem(
  "small_health_potion",
  "Small Health Potion",
  "small magic potion used to restore small amount of Health",
  "consumable",
  40,
  { healAmount: 5 },
);

let rustyIronSword = createItem(
  "rusty_iron_sword",
  "Rusty Iron Sword",
  "sword made of iron, but it's old and rusty, it can be used to increase your damage",
  "weapon",
  150,
  { damage: 10 },
);

let goblinLeather = createItem(
  "goblin_leather",
  "Goblin Leather",
  "leather from a goblin, it can be used to make armor",
  "gathering",
  25,
  { },
);

let slimedrop = createItem(
  "slime_drop",
  "Slime Drop",
  "slime drop, it can be used in alchemy to make potion",
  "gathering",
  10,
  { },
);

let orcLeather = createItem(
  "orc_leather",
  "Orc Leather",
  "leather from an orc, it can be used to make armor",
  "gathering",
  80,
  { },
);

let orcTeeth = createItem(
  "orc_teeth",
  "Orc Teeth",
  "teeth from an orc, it can be used to make armor",
  "gathering",
  60,
  { },
);