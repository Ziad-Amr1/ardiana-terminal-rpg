`
Equipment System

1. item should have:
- type (weapon, armor, accessory)
- Stat Modifiers / effects 
- Constraints (can't equip if already equipped) / level requirements

2. Define equipment Slots
if he equipe a helment, he cant equip another helmet
he should remove it first(made it back to inventory and remove the effect)

3. (The Golden Rule of Stats)
`

// ملف: equipmentSystem.js

const EquipmentSystem = {
    
    // الدالة بتاخد كائن اللاعب كائن الأداة من بره
    equipItem: (player, item) => {
        if (!player.equipment.hasOwnProperty(item.slot)) {
            console.log("لا يوجد مكان مخصص لهذه الأداة!");
            return;
        }

        if (player.equipment[item.slot] !== null) {
            EquipmentSystem.unequipItem(player, item.slot);
        }

        player.equipment[item.slot] = item;
        console.log(`you equiped ${item.name} 🎒`);
    },

    unequipItem: (player, slotName) => {
        const itemToRemove = player.equipment[slotName];
        if (itemToRemove) {
            player.inventory.push(itemToRemove);
            player.equipment[slotName] = null;
            console.log(`you unequiped ${itemToRemove.name} 🎒`);
        }
    },

    getTotalStats: (player) => {
        let total = { ...player.base_stats };

        for (let slot in player.equipment) {
            let item = player.equipment[slot];
            if (item !== null && item.statsBonus) {
                for (let statName in item.statsBonus) {
                    if (total[statName]) {
                        total[statName] += item.statsBonus[statName];
                    }
                }
            }
        }
        return total;
    }
};

module.exports = EquipmentSystem;