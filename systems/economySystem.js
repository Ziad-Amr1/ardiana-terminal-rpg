// const gameState = require("../state/gameState");
// let player = gameState.player;
// const allInGameItems = require("../factories/createItem");
const {addItem, removeItem} = require("./itemStorageSystem");

// =================== ECONOMY SYSTEM ===================
let takeCoins = (target, coins) => {
  target.economy.coins -= coins;
  console.log(`💰 ${target.info.name} took ${coins} coins`);
};

let giveCoins = (target, coins) => {
  target.economy.coins += coins;
  console.log(`💰 ${target.info.name} got ${coins} coins`);
};

let buyItem = (target, item, merchant, shopStorage, amount) => {
  if (amount === undefined) {
    amount = 1;
  }
  
  if (shopStorage === undefined) {
    console.log(`❌ Error: Shop storage is undefined`);
    return false;
  }

  if (merchant === undefined) {
    console.log(`❌ Error: merchant is undefined`);
    return false;
  }
  
  let checkStock = shopStorage.filter((i) => i.id === item.id);
  if (checkStock.length === 0) {
    console.log(`❌ ${merchant.info.name} doesn't have ${item.name} in stock`);
    return false;
  } // else if (checkStock.)

  if (amount === 1 && target.economy.coins < item.value) {
    console.log(`❌ ${target.info.name} doesn't have enough coins to buy ${item.name}`);
    return false;
  } else if (amount > 1 && target.economy.coins < item.value * amount) {
    console.log(`❌ ${target.info.name} doesn't have enough coins to buy ${amount} ${item.name}s`);
    return false;
  } else {
    target.economy.coins -= item.value * amount;
    addItem(target, item, amount);
    console.log(`💰 ${target.info.name} bought ${amount} ${item.name}s`);
    return true;
  }
};

let sellItem = (target, item) => {
  // we need to think now about quantity
  let itemInInventory = target.inventory.find((i) => i.id === item.id);
  if (!itemInInventory) {
    console.log(`❌ ${target.info.name} doesn't have ${item.name} to sell`);
    return false;
  }
  target.economy.coins += item.value / 2;
  removeItem(target, item);
  console.log(`💰 ${target.info.name} sold ${item.name}`);
  return true;
};

module.exports = {
  takeCoins,
  giveCoins,
  buyItem,
  sellItem,
};

