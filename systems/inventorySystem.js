const { restoreHealth } = require("./playerSystem");
const { printDivider, printTitle, printspace } = require("../utitls/UIHelper");

// ========== INVENTORY SYSTEM ===========
let addItem = (player, item, quantity = 1) => {
  // Guard Clause
  if (item === undefined) {
    console.log("❌ Invalid Item.");
    return false;
  }
  let clonedItem = { ...item };
  if (player.inventory.length < 20) {
    if (clonedItem.stackable) {
      let itemInInventory = player.inventory.find(
        (i) => i.id === clonedItem.id,
      );
      if (!itemInInventory) {
        clonedItem.quantity = quantity;
        player.inventory.push(clonedItem);
        console.log(`You added ${clonedItem.name} to your inventory.`);
        return true;
      }
      if (itemInInventory.quantity + quantity <= itemInInventory.maxStack) {
        itemInInventory.quantity += quantity;
        console.log(
          `You added ${quantity} ${clonedItem.name} to your inventory.`,
        );
        return true;
      } else {
        clonedItem.quantity = quantity;
        player.inventory.push(clonedItem);
        console.log(
          `You added ${quantity} ${clonedItem.name} to your inventory.`,
        );
        return true;
      }
    } else {
      clonedItem.quantity = quantity;
      player.inventory.push(clonedItem);
      console.log(`You added ${clonedItem.name} to your inventory.`);
      return true;
    }
  } else {
    console.log("❌ Your inventory is full.");
    return false;
  }
};


let removeItem = (player, item, quantity = 1) => {
  // 1. Guard Clause (item is not undefined)
  if (item === undefined) {
    console.log("❌ Invalid Item.");
    return false;
  }

  // 2. if Inventory is empty
  if (player.inventory.length === 0) {
    console.log("Your inventory is empty.");
    return false;
  }

  // 3. Find the item index once
  let itemIndex = player.inventory.findIndex(i => i.id === item.id);

  if (itemIndex !== -1) {
    let itemInInventory = player.inventory[itemIndex];

    // 4. Handle Stackable items (like potions)
    if (itemInInventory.stackable) {
      // Guard: Trying to remove more than what exists
      if (itemInInventory.quantity < quantity) {
        console.log("❌ You don't have that many.");
        return false;
      }

      // Logic: Exact amount vs Partial amount
      if (itemInInventory.quantity === quantity) {
        player.inventory.splice(itemIndex, 1);
      } else {
        itemInInventory.quantity -= quantity;
      }
      
      console.log(`You removed ${quantity} ${itemInInventory.name} from your inventory.`);
      return true;

    } else {
      // 5. Handle Non-stackable items (like weapons)
      player.inventory.splice(itemIndex, 1);
      console.log(`You removed ${itemInInventory.name} from your inventory.`);
      return true;
    }

  } else {
    // Item not found in inventory at all
    console.log("❌ You don't have that item.");
    return false;
  }
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
  if (
    player.inventory.filter((item) => item.category === "consumable").length ===
    0
  ) {
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
    if (category != null) {
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
