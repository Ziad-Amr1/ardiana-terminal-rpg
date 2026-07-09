// ./utitls/inventoryUI.js
/*
    Inventory UI
    - printUsedItem
    - printEmptyInventory
    - printInventory
    - printInspectItem
    - renderSelectedItem
    - renderOpenInventory
*/
// =========== imports ===========

// =========== Inventory UI ===========
const printUsedItem = (player, item) => {
  console.log(`${player.info.name} uses ${item.name}`);
};

const printEmptyInventory = (player) => {
  console.log(`${player.info.name} has no items in their inventory.`);
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

const printInspectItem = (player, item) => {
  console.log(`You are looking at 
    ${item.name}
    ${item.category}
    ${item.rarity}
    
    =============
    ${item.description}
    
    ${item.value}
    ${item.effect}
    ${item.quantity}

    =============
    
    ${item.category === "consumable" ? "[C] Consume / Use" : ""}
    ${item.category === "equipment" ? "[E] Equip" : ""}
    [D] Drop
    [N] Next item
    [P] Previous item
    [B] Back

`);
};

const renderSelectedItem = (item) => {
  return `You selected ${item.name};
    
    what do you want to do?
    ${item.category === "consumable" ? "[C] Consume / Use" : ""}
    ${item.category === "equipment" ? "[E] Equip" : ""}
    [D] Drop
    [N] Next item
    [P] Previous item
    [I] Inspect
    [B] Back
    `;
};

const renderOpenInventory = (player) => {
  if (player.inventory.length === 0) {
    message = `Your inventory is empty.
    Press [B] to go back...`;
  } else {
    message = "Choose an item number or [B] Back: ";
  }
};

// =========== exports ===========

module.exports = {
  printUsedItem,
  printEmptyInventory,
  printInventory,
  printInspectItem,
  renderSelectedItem,
  renderOpenInventory,
};
