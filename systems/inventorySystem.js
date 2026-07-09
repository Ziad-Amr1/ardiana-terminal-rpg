// ./systems/inventorySystem.js

// =========== IMPORTS ===========
const { restoreHealth } = require("./playerSystem");
const {
  printDivider,
  printTitle,
  printspace,
  printError,
} = require("../utitls/UIHelper");
const { printUsedItem, printEmptyInventory, printInventory, printInspectItem, renderSelectedItem, renderOpenInventory } = require("../utitls/inventoryUI");
const EquipmentSystem = require("./equipmentSystem");
const { addItem, removeItem } = require("./itemStorageSystem");

// =========== constants ===========
const errorMessage = "Invalid Item.";

// ========== INVENTORY SYSTEM ===========

let useItem = (player, item) => {
  if (item.category === "consumable") {
    if (item.effect["healAmount"]) {
      printUsedItem(player, item);
      restoreHealth(player, item.effect.healAmount);
      removeItem(player, item);
    }
  }
};

let showInventory = (player) => {
  if (player.inventory.length === 0) {
    printEmptyInventory(player);
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
    printError(errorMessage);
    return false;
  }
  useItem(player, item);
  return true;
};

let openInventory;

const selectedItem = (player, itemIndex, rl, gamestate, onExit) => {
  const item = player.inventory[itemIndex];
  const msg = renderSelectedItem(item);
  rl.question(msg, (answer) => {
    answer = answer.trim().toLowerCase();
    if (answer === "c" && item.category === "consumable") {
      useItem(player, item);
      openInventory(gamestate, rl, onExit);
      return;
    } else if (answer === "e" && item.category === "equipment") {
      EquipmentSystem.equipItem(player, item);
      openInventory(gamestate, rl, onExit);
      return;
    } else if (answer === "d") {
      // dropItem(player, item);
      removeItem(player, item);
      openInventory(gamestate, rl, onExit);
      return;
    } else if (answer === "n") {
      if (itemIndex === player.inventory.length - 1) {
        itemIndex = 0;
      } else {
        itemIndex++;
      }

      selectedItem(player, itemIndex, rl, gamestate, onExit);
      return;
    } else if (answer === "p") {
      if (itemIndex === 0) {
        itemIndex = player.inventory.length - 1;
      } else {
        itemIndex--;
      }

      selectedItem(player, itemIndex, rl, gamestate, onExit);
      return;
    } else if (answer === "i") {
      printInspectItem(player, item);
      rl.question("Press Enter to go back...", () => {
        selectedItem(player, itemIndex, rl, gamestate, onExit);
      });
      return;
    } else if (answer === "b") {
      openInventory(gamestate, rl, onExit);
      return;
    } else {
      printError("Invalid input.");
      selectedItem(player, itemIndex, rl, gamestate, onExit);
    }
    //splt later
  });
};

openInventory = (gamestate, rl, onExit) => {
  const player = gamestate.player;

  let message = renderOpenInventory(player);

  showInventory(player);


  rl.question(message, (answer) => {
    answer = answer.trim().toLowerCase();

    if (answer === "b") {
      onExit();
      return;
    } else {
      const itemIndex = Number(answer) - 1;
      if (
        Number.isInteger(itemIndex) &&
        itemIndex >= 0 &&
        itemIndex <= player.inventory.length - 1
      ) {
        selectedItem(player, itemIndex, rl, gamestate, onExit);
        return;
      } else {
        printError("Invalid input.");
        openInventory(gamestate, rl, onExit);
      }
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
  openInventory,
};
