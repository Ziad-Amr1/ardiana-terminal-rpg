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

const { printError } = require("../utitls/UIHelper");
const { addItem, removeItem } = require("./itemStorageSystem");

// =========== VALIDATION HELPERS ===========

// =========== EQUIPMENT ACTIONS ===========


const EquipmentSystem = {
    
    equipItem: (player, item) => {
        if (!player.equipment.hasOwnProperty(item.slot)) {
            printError("Invalid Slot.");
            return;
        }

        if (player.equipment[item.slot] !== null) {
            EquipmentSystem.unequipItem(player, item.slot);
            // CalcStatsSystem or playerSystem
        }

        player.equipment[item.slot] = item;
        removeItem(player, item);
        console.log(`you equiped ${item.name} 🎒`);
        // CalcStatsSystem or playerSystem
    },

    unequipItem: (player, slotName) => {
        const itemToRemove = player.equipment[slotName];
        if (itemToRemove) {
            // player.inventory.push(itemToRemove);
            player.equipment[slotName] = null;
            console.log(`you unequiped ${itemToRemove.name} 🎒`);
            addItem(player, itemToRemove);
            // CalcStatsSystem or playerSystem
        }
    },

};

module.exports = EquipmentSystem;