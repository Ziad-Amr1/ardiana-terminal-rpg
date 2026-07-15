const { randomNumber } = require("../utils/randoms");

// =========== ENCOUNTER SYSTEM ===========
let encounterCheck = (chance) => {
  const roll = randomNumber(1, 100);

  if (roll <= chance) {
    // printTitle("🐉 You encountered an enemy!");
    return true;
  }
  // console.log("🌲 The road is quiet...");
  return false;
};

module.exports = {
  encounterCheck,
};