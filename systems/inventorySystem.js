const { restoreHealth } = require("./playerSystem");
const {  printDivider, printTitle, printspace } = require("../utitls/UIHelper");

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
      console.log(`${player.info.name} uses ${item.name}`);
      restoreHealth(player, item.effect.healAmount);
      removeItem(player, item);
    }
  }
};

let showInventory = (player) => {
  if (player.inventory.length === 0) {
    console.log("Your inventory is empty");
  } else {
    printInventory(player);
  }
};

let showInventoryBattle = (player) => {
  if (player.inventory.filter((item) => item.category === "consumable").length === 0) {
    return false;
  } else {
    printInventory(player, "consumable");
  }
};

let getItem = (player, number) => {
  let consumables = player.inventory.filter(
    (item) => item.category === "consumable",
  );
  let item = consumables[number - 1];
  if (!item) {
   console.log("❌ Invalid item.");
   return false;
  }
  useItem(player, item);
  return true;
};

let printInventory = (player, category) => {
    printTitle("Your inventory:");
    printspace();
    let i = 1;
    player.inventory.forEach((item) => {
      if (category != null){
      if (item.category === category) {
        console.log(`${i} - ${item.name} - ${item.description}`);
        printspace();
        i++;
      }
    } else {
      console.log(`${i} - ${item.name} - ${item.description}`);
      printspace();
      i++;
    }
      
    });
};

module.exports = {
  addItem,
  removeItem,
  useItem,
  showInventory,
  showInventoryBattle,
  getItem,
};
