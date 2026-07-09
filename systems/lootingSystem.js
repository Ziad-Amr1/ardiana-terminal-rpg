const { randomNumber } = require("../utitls/randoms");
const { addItem } = require("./itemStorageSystem");
const { allInGameItems } = require("../factories/createItem");

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
    let droppedItem = dropped[i]
    let realItem = allInGameItems.find(
      (item) => item.id === droppedItem.id
    );
      addItem(player, realItem);
      console.log(`You got ${realItem.name}`);
    };
  } else {
    console.log(`No item dropped`);
  }
};

module.exports = { loot, dropItem };