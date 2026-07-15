// ./state/gameState.js
const playerData = require("../data/player");
// WHY this 2 lines?
const { allInGameEnemies } = require("../factories/createEnemy");
const { allInGameItems } = require("../factories/createItem");
let player = playerData.player;

const gameState = {
  player,
  currentBattle: null,
  world: {},
// world: {
//   visitedAreas,
//   unlockedServices,
//   storyFlags,
// }
  travel: {
   destination: null,
   remainingSteps: 0,
}
};

module.exports = gameState;