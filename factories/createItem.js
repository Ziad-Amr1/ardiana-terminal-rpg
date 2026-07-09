const allInGameItems = [];
const itemRegistry = {};

class Item {
    constructor({id, name, description, category, value, effect, stackable, maxStack, quantity, rarity,
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.value = value;
        this.effect = effect;
        this.stackable = stackable;
        this.maxStack = maxStack;
        this.quantity = quantity;
        this.rarity = rarity;
        
        // add automatically to allInGameItems
        allInGameItems.push(this);
        itemRegistry[this.id] = this;
    }
}

class Equipment extends Item {
  constructor({ id, name, description, value, effect, stackable, maxStack, quantity, rarity, subCategory, slot, statsBonus, requirements, durability,
  }) {
    super({ id, name, description, category: "equipment", value, effect, stackable, maxStack, quantity, rarity,
    });

    this.subCategory = subCategory;
    this.slot = slot;
    this.statsBonus = statsBonus;
    this.requirements = requirements;
    this.durability = durability;
  };
};

        // durability
        // upgradeLevel
        // enchantments
class Weapon extends Equipment {
  constructor({ id, name, description, value, effect, stackable, maxStack, quantity, rarity, statsBonus, requirements, durability, weaponStats, specialEffects,
  }) {
    super({ id, name, description, value, effect, stackable, maxStack, quantity, rarity, subCategory: "weapon", slot: "weapon", statsBonus, requirements, durability,
    });

    this.weaponStats = weaponStats;
    this.specialEffects = specialEffects;
  };
};

// class weapon extends Item {
//     constructor({ id, name, description, value, damage, range, attackSpeed, equipSlot, statsBonus }) {
//       super({ id, name, description, category: "weapon", value });
//       this.damage = damage;
//       this.range = range;
//       this.attackSpeed = attackSpeed;
//       this.equipSlot = equipSlot;
//       this.statsBonus = statsBonus;

//       this.economy = {
//         buyPrice,
//         sellPrice,
//       };
//       this.requirements = {
//         level,
//         stats,
//       };
//       this.combat = {
//         damage,
//         cirtChance,
//         critDamage,
//       };
//       this.durability = {
//         current,
//         max,
//       };
//       this.smithing = {
//         upgradeLevel,
//         enchantments,
//         statsBonus,
//       };
//       this.storage = {
//         stackable = false,
//       };
//     };
// };

module.exports = { allInGameItems, itemRegistry, Item, Equipment, Weapon };
