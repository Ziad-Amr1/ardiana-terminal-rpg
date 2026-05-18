const playerData = require("../data/player");
let player = playerData.player;
const { allInGameItems } = require("../factories/createItem");
const { allInGameEnemies } = require("../factories/createEnemy");
const { healing } = require("./playerSystem");

// ========== INVENTORY SYSTEM ===========
let addItem = (player, item) => {
  player.inventory.push(item);
};

let removeItem = (player, item) => {
  player.inventory = player.inventory.filter((i) => i !== item);
};

let useItem = (player, item) => {
  if (item.category === "consumable") {
    if (item.effect["healAmount"]) {
      healing(player, item.effect.healAmount);
      removeItem(player, item);
      console.log(`${item.name} healed ${player.name}`);
    }
  }
};

let showInventory = (player) => {
  if (player.inventory.length === 0) {
    console.log("Your inventory is empty");
  } else {
    console.log("Your inventory:");
    player.inventory.forEach((item) => {
      console.log(`${item.name} - ${item.description}`);
    });
  }
};

let showInventoryBattle = (player) => {
  if (player.inventory.length === 0) {
    return false;
  } else {
    console.log("Your inventory:");
    let i = 1;
    player.inventory.forEach((item) => {
      if (item.category === "consumable") {
        console.log(`${i} - ${item.name} - ${item.description}`);
        i++;
      }
    });
  }
};

let getItem = (player, number) => {
  let consumables = player.inventory.filter(
    (item) => item.category === "consumable",
  );
  let item = consumables[number];
  useItem(player, item);
};

module.exports = {
  addItem,
  removeItem,
  useItem,
  showInventory,
  showInventoryBattle,
  getItem,
};
