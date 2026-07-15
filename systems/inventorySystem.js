// ./systems/inventorySystem.js

// =========== IMPORTS ===========
const { restoreHealth, restoreMana } = require("./playerSystem");
const { printError } = require("../utils/UIHelper");
const {
  printUsedItem,
  printEmptyInventory,
  printInventory,
  printInspectItem,
  renderSelectedItem,
  renderOpenInventory,
} = require("../utils/inventoryUI");
const EquipmentSystem = require("./equipmentSystem");
const { addItem, removeItem } = require("./itemStorageSystem");
const { resolveItem } = require("./itemResolver");
const { t } = require("../i18n");

// =========== constants ===========
const errorMessage = t("inventory.error.InvalidItem");

// ========== INVENTORY SYSTEM ===========

const invForAction = (inventory) => {
  return inventory.map((item) => resolveItem(item));
};

let useItem = (player, item, itemIndex) => {
  if (item.category === "consumable") {
    if (!item.effects || item.effects.length === 0) {
      return;
    }
    printUsedItem(player, item);

    setTimeout(() => {
      switch (item.effects[0].type) {
        case "instantHeal":
          restoreHealth(player, item.effects[0].amount);
          break;

        case "restoreMana":
          restoreMana(player, item.effects[0].amount);
          break;
        default:
          return;
      }

      removeItem(player, item, itemIndex);
    }, 1000);
  }
};

let showInventory = (player) => {
  const inventoryList = invForAction(player.inventory);
  if (inventoryList.length === 0) {
    printEmptyInventory(player);
  } else {
    printInventory(inventoryList);
  }
};

let showInventoryBattle = (player) => {
  const inventoryList = invForAction(player.inventory);
  if (
    inventoryList.filter((item) => item.category === "consumable").length === 0
  ) {
    return false;
  } else {
    printInventory(inventoryList, "consumable");
  }
};

let getItem = (player, number) => {
  let inventoryList = invForAction(player.inventory);
  let consumables = inventoryList.filter(
    (item) => item.category === "consumable",
  );
  let item = consumables[number - 1];
  if (!item) {
    printError(errorMessage);
    return false;
  }
  let count = number - 1;

  let getConsumableIndex = (inventoryList) => {
    for (let i = 0; i < inventoryList.length; i++) {
      if (inventoryList[i].category === "consumable" && count === 0) {
        return i;
      } else if (inventoryList[i].category === "consumable" && count > 0) {
        count--;
      } else {
        continue;
      }
    }
  };
  let itemIndex = getConsumableIndex(inventoryList);
  useItem(player, item, itemIndex);
  return true;
};

let openInventory;

const selectedItem = (player, itemIndex, rl, gamestate, onExit) => {
  const item = resolveItem(player.inventory[itemIndex]);
  const msg = renderSelectedItem(item);
  rl.question(msg, (answer) => {
    answer = answer.trim().toLowerCase();
    if (answer === "c" && item.category === "consumable") {
      useItem(player, item, itemIndex);
      openInventory(gamestate, rl, onExit);
      return;
    } else if (answer === "e" && item.category === "equipment") {
      EquipmentSystem.equipItem(player, item, itemIndex);
      openInventory(gamestate, rl, onExit);
      return;
    } else if (answer === "d") {
      // dropItem(player, item);
      removeItem(player, item, itemIndex);
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
      printInspectItem(item);
      rl.question(" ", () => {
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
        printError(errorMessage);
        openInventory(gamestate, rl, onExit);
      }
    }
  });
};

module.exports = {
  useItem,
  showInventory,
  showInventoryBattle,
  getItem,
  openInventory,
};
