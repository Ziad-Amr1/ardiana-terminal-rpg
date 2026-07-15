// ./systems/equipmentSystem.js
// =========== EQUIPMENT SYSTEM ===========

/*
Responsibilities:
- Validate whether an item can be equipped.
- Manage equipping and unequipping items.
- Move items between inventory and equipment.
- Equip items.
- Unequip items.

Not Responsible For:
- Calculating final combat stats.
- Applying combat damage.
- Rendering UI.
*/

// =========== IMPORTS ===========

const { printError } = require("../utils/UIHelper");
const { addItem, removeItem } = require("./itemStorageSystem");
const { t } = require("../i18n");
const { renderItemName } = require("../utils/inventoryUI");

// =========== VALIDATION HELPERS ===========

// =========== EQUIPMENT ACTIONS ===========

const EquipmentSystem = {
  equipItem: (player, item, itemIndex) => {
    if (!player.equipment.hasOwnProperty(item.slot)) {
      printError(t("equipment.error.invalidSlot"));
      return;
    }

    // validate item - new
    if (item.category !== "equipment") {
      printError(t("equipment.error.InvalidItem"));
      return;
    }

    // new
    /*
      requirements: {
        level: 1,
        stats: {
          STR: 5,
        },
      },
    */
    const requirements = item.requirements;
    if (requirements) {
      const playerLevel = player.progression.level;
      const playerStats = player.base_stats;
      const levelRequirement =
        requirements.level !== undefined && playerLevel < requirements.level;
      let validationMessage = "";

      let missingStatsMessage = "";
      if (requirements.stats) {
        for (const stat in requirements.stats) {
          if (playerStats[stat] < requirements.stats[stat]) {
            missingStatsMessage += `${stat}: ${playerStats[stat]} / ${requirements.stats[stat]}\n`;
          }
        }
      }

      if (levelRequirement && missingStatsMessage) {
        validationMessage =
          t("equipment.error.notEnoughLevel", {
            itemName: renderItemName(item),
            requiredLevel: requirements.level,
            currentLevel: playerLevel,
          }) +
          "\n" +
          t("equipment.error.notEnoughStats", {
            itemName: renderItemName(item),
            stats: missingStatsMessage,
          });
      } else if (levelRequirement) {
        validationMessage = t("equipment.error.notEnoughLevel", {
          itemName: renderItemName(item),
          requiredLevel: requirements.level,
          currentLevel: playerLevel,
        });
      } else if (missingStatsMessage) {
        validationMessage = t("equipment.error.notEnoughStats", {
          itemName: renderItemName(item),
          stats: missingStatsMessage,
        });
      }

      if (validationMessage) {
        printError(validationMessage);
        return;
      }
    }

    const newRuntimeItem = player.inventory[itemIndex];

    if (player.equipment[item.slot] !== null) {
      const currentItem = player.equipment[item.slot];
      const removed = removeItem(player, item, itemIndex);

      if (!removed) {
        printError(t("equipment.error.failedToRemoveNewItem"));
        return;
      }

      const added = addItem(player, currentItem.itemId, 1, currentItem);

      if (!added) {
        printError(t("equipment.error.failedToRestoreOldItem"));
        addItem(player, newRuntimeItem.itemId, 1, newRuntimeItem);
        return;
      }

      player.equipment[item.slot] = newRuntimeItem;
      // then reCalcStatsSystem or playerSystem and print the message
      // calc stats
      console.log(
        t("equipment.changed", {
          oldItemName: renderItemName(currentItem),
          newItemName: renderItemName(item),
        }),
      );
      return;
    }

    player.equipment[item.slot] = newRuntimeItem;
    removeItem(player, item, itemIndex);
    console.log(t("equipment.equipped", { itemName: renderItemName(item) }));
    // CalcStatsSystem or playerSystem
  },

  unequipItem: (player, slotName) => {
    const itemToRemove = player.equipment[slotName];
    if (itemToRemove) {
      // player.inventory.push(itemToRemove);
      player.equipment[slotName] = null;
      console.log(
        t("equipment.unequipped", { itemName: renderItemName(itemToRemove) }),
      );
      addItem(player, itemToRemove);
      // CalcStatsSystem or playerSystem
    }
  },
};

module.exports = EquipmentSystem;
