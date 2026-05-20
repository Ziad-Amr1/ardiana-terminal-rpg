const { allInGameItems } = require("../factories/createItem");
const { takeCoins, giveCoins, buyItem, sellItem } = require("./economySystem");
const {  printDivider, printTitle, printspace } = require("../utitls/UIHelper");

// =========== SHOP SYSTEM ===========
let buy = (player, item) => {
  if (buyItem(player, item)) {
    takeCoins(player, item.value);
  }
};

let sell = (player, item) => {
  if (sellItem(player, item)) {
    giveCoins(player, item.value);
  }
};

let buyAll = (player, item) => {
  if (buyItem(player, item)) {
    takeCoins(player, item.value * item.count);
  }
};

let sellAll = (player, item) => {
  if (sellItem(player, item)) {
    giveCoins(player, item.value * item.count);
  }
};

let showShop = () => {
  printTitle("Shop");
  printspace();
  let i = 1;
  allInGameItems.forEach((item) => {
    console.log(`${i} - ${item.name} - ${item.description}
        ${item.value} coins
        ${item.count} items
        `);
    printspace();
    i++;
  });
};

module.exports = {
  buy,
  sell,
  buyAll,
  sellAll,
  showShop,
};
