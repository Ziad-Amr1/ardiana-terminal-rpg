// ./factories/createItem.js
const allInGameItems = [];
const itemRegistry = {};

/*
TODO:
Item
│
├── Consumable
│   ├── Potion
│   └── Food
│
├── Material
│   ├── Gathering
│   └── Crafting Material
│
└── Equipment
    │
    ├── Weapon
    │
    ├── Armor
    │
    └── Accessory
 */

class Item {
    constructor({
        id, name, description = "", rarity= "common", category,
        buyPrice = 0 , sellPrice = 0, stackable = false, 
        maxStack = 1, effects = [],
    }) {
        this.identity = {
            id: id,
            name: name,
            description: description,
            rarity: rarity,
        },
        this.classification = {
            category: category,
            subCategory: null,
        },
        this.economy = {
            buyPrice: buyPrice,
            sellPrice: sellPrice,
        },
        this.storage = {
            stackable: stackable,
            maxStack: maxStack,
        },
        this.effects = effects,
        
        // add automatically to allInGameItems
        allInGameItems.push(this);
        itemRegistry[this.identity.id] = this;
    };
};

// Equipment Category

class Equipment extends Item {
  constructor({ id, name, description, rarity,
        buyPrice, sellPrice, stackable, maxStack,
        subCategory, slot, statsBonus, requirements,
        maxUpgradeLevel, effects,
  }) {
    super({ 
        id, name, description, rarity, category: "equipment",
        buyPrice, sellPrice, stackable, maxStack,
        effects,
    });

    this.classification.subCategory = subCategory;
    this.slot = slot;
    this.statsBonus = statsBonus;
    if (requirements) {
        this.requirements = requirements;
    };
    if (maxUpgradeLevel) {
        this.upgrade = {maxUpgradeLevel: maxUpgradeLevel};
    };
  };
};
class Weapon extends Equipment {
  constructor({ id, name, description, rarity,
        buyPrice, sellPrice, stackable, maxStack,
        statsBonus, requirements,
        maxDurability, maxUpgradeLevel, weaponStats, effects,
      }) {
    super({ 
        id, name, description, rarity,
        buyPrice, sellPrice, stackable, maxStack,
        subCategory: "weapon", slot: "weapon", statsBonus, 
        requirements, maxUpgradeLevel, effects,
    });
    if (maxDurability) {
        this.durability = {maxDurability: maxDurability};
    };
    this.weaponStats = weaponStats;
    
  };
};

class Armor extends Equipment {
  constructor({ id, name, description, rarity,
        buyPrice, sellPrice, stackable, maxStack,
        statsBonus, requirements,
        subCategory, slot,
        maxDurability, maxUpgradeLevel, armorStats, effects,
      }) {
    super({ 
        id, name, description, rarity,
        buyPrice, sellPrice, stackable, maxStack,
        statsBonus, subCategory, slot,
        requirements, maxUpgradeLevel, effects,
    });
    if (maxDurability) {
        this.durability = {maxDurability: maxDurability};
    };
    this.armorStats = armorStats;
  };
};


// Consumable
class Consumable extends Item {
    constructor({id, name, description, rarity,
        buyPrice, sellPrice, stackable, maxStack, subCategory,
        effects,
    }) {
        super({ id, name, description, rarity, category: "consumable",
        buyPrice, sellPrice, stackable, maxStack,
         effects,
        });
        this.classification.subCategory = subCategory;
    };
};

// Material
class Material extends Item {
    constructor({id, name, description, rarity,
        buyPrice, sellPrice, stackable, maxStack, subCategory,
         effects,
    }) {
        super({ id, name, description, rarity, category: "material",
        buyPrice, sellPrice, stackable, maxStack,
         effects,
        });
        this.classification.subCategory = subCategory;
    };
};


module.exports = { 
  allInGameItems,
  itemRegistry,
  Item,
  Equipment,
  Weapon,
  Armor,
  Consumable,
  Material,
};
