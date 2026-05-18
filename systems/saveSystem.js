const fs = require("fs");
const { allInGameItems } = require("../factories/createItem");
const { allInGameEnemies } = require("../factories/createEnemy");
const playerData = require("../data/player");
let player = playerData.player;

// =========== SAVE SYSTEM ===========
function savePlayer(player) {
  let playerSave = {
    name: player.name,
    health: player.health,
    maxHealth: player.maxHealth,
    coins: player.coins,
    exp: player.exp,
    level: player.level,
    inventory: player.inventory,
  };

  fs.writeFile("../data/player.json", JSON.stringify(playerSave), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Player data saved");
    }
  });
}

function loadPlayer() {
  fs.readFile("../data/player.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let playerData = JSON.parse(data);
      player.name = playerData.name;
      player.health = playerData.health;
      player.maxHealth = playerData.maxHealth;
      player.coins = playerData.coins;
      player.exp = playerData.exp;
      player.level = playerData.level;
      player.inventory = playerData.inventory;
      console.log("Player data loaded");
    }
  });
}

module.exports = { savePlayer, loadPlayer };