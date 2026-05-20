// const gameState = require("../state/gameState");
// let player = gameState.player;
// const allInGameItems = require("../factories/createItem");
const {addItem, removeItem} = require("./inventorySystem");

// =================== ECONOMY SYSTEM ===================
let takeCoins = (target, coins) => {
  target.economy.coins -= coins;
  console.log(`💰 ${target.info.name} took ${coins} coins`);
};

let giveCoins = (target, coins) => {
  target.economy.coins += coins;
  console.log(`💰 ${target.info.name} got ${coins} coins`);
};

let buyItem = (target, item) => {
  if (target.economy.coins < item.value) {
    return false;
  }
  target.economy.coins -= item.value;
  addItem(target, item);
  console.log(`💰 ${target.info.name} bought ${item.name}`);
  return true;
};

let sellItem = (target, item) => {
  if (target.economy.coins + item.value/2 ) {
    return false;
  }
  if (target.inventory.find((i) => i.id === item.id)) {
  target.economy.coins += item.value;
  removeItem(target, item);
  console.log(`💰 ${target.info.name} sold ${item.name}`);
  return true;
};
};

module.exports = {
  takeCoins,
  giveCoins,
  buyItem,
  sellItem,
};

