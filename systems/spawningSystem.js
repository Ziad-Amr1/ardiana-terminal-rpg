const { randomNumber } = require("../utils/randoms");
const { allInGameEnemies } = require("../factories/createEnemy");

// =========== SPAWNING SYSTEM ===========
let choiceEnemy = (area) => {

  if (!area || !area.enemies) {
   return null;
  }

let enemies = area.enemies;

let getTotalWeight = (enemies) => {
  let totalWeight = 0;
  for (let i = 0; i < enemies.length; i++) {
    totalWeight += enemies[i].weight;
  }
  return totalWeight;
};

let totalWeight = getTotalWeight(enemies);  


  let spawn = randomNumber(1, totalWeight);
  let currentWeight = 0;
  for (let i = 0; i < enemies.length; i++) {
    currentWeight += enemies[i].weight;
    if (spawn <= currentWeight) {
      let enemy = allInGameEnemies.find(
        (enemy) => enemy.id === enemies[i].enemyId
      );
      
      return structuredClone(enemy);
    }
  }
};

module.exports = { choiceEnemy };