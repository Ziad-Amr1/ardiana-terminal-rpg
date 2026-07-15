// ./systems/lootSystem.js
const { randomNumber } = require("../utils/randoms");
const { addItem } = require("./itemStorageSystem");

function loot(target, amount) {
  target.economy.coins += amount;
  console.log(`+ ${amount} coins`);
}

let dropItem = (player, enemy) => {
  let getDroppedItem = () => {
    let droppedlist = [];

    for (let i = 0; i < enemy.loot.items.length; i++) {
      let item = enemy.loot.items[i];

      if (item.DR >= randomNumber(1, 100)) {
        droppedlist.push(item);
      }
    }

    return droppedlist;
  };

  let dropped = getDroppedItem();

  if (dropped.length > 0) {
    for (let i = 0; i < dropped.length; i++) {
      let droppedItem = dropped[i];

      addItem(player, droppedItem.itemId, 1);
    }
  } else {
    console.log(`No item dropped`);
  }
};

module.exports = { loot, dropItem };