const allInGameItems = [];
const itemRegistry = {};

class Item {
    
    constructor({id, name, description, category, value, effect, stackable, maxStack, quantity}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.value = value;
        this.effect = effect;
        this.stackable = stackable;
        this.maxStack = maxStack;
        this.quantity = quantity;
        
        // add automatically to allInGameItems
        allInGameItems.push(this);
        itemRegistry[this.id] = this;
    }
}

class Equipment extends Item {
    constructor({ id, name, description, value, slot, statsBonus }) {

      super({ id, name, description, category: "equipment", value });
        // durability
        // upgradeLevel
        // enchantments

        this.slot = slot; 
        this.statsBonus = statsBonus;
    }
}

module.exports = { allInGameItems, itemRegistry, Item, Equipment };
