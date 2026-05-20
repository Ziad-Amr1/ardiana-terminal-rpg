const fs = require("fs");
const { allInGameItems } = require("../factories/createItem");
const { allInGameEnemies } = require("../factories/createEnemy");
const gameState = require("../state/gameState");

// =========== SAVE SYSTEM ===========
function saveGamestate(gamestate) {
  let gamestateSave = gamestate;

  fs.writeFile("./data/gamestate.json", JSON.stringify(gamestateSave), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Game saved");
    }
  });
}

function loadGamestate() {
  fs.readFile("./data/gamestate.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let gamestateData = JSON.parse(data);
      Object.assign(gameState, gamestateData);
      console.log("Player data loaded");
    }
  });
}

module.exports = { saveGamestate, loadGamestate };