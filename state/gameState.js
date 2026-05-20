const playerData = require("../data/player");
const { allInGameEnemies } = require("../factories/createEnemy");
const { allInGameItems } = require("../factories/createItem");
let player = playerData.player;

const gameState = {
  player,
  currentBattle: null,
  world: {},
  travel: {
   destination: null,
   remainingSteps: 0,
}
};

module.exports = gameState;