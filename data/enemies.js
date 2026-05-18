const { createEnemy } = require("../factories/createEnemy");

// ========== CRATE ENITIRES ===========
let slime = createEnemy("Green Slime", 5, 2, 50, 5, {
  name: "Slime Drop",
  DR: 20,
});


let goblin = createEnemy("Green Goblin", 12, 4, 80, 10, {
  name: "Goblin Leather",
  DR: 20,
});


let skeletonSolider = createEnemy("Skeleton Solider", 25, 8, 150, 20, {
  name: "Rusty iron sword",
  DR: 20,
});

