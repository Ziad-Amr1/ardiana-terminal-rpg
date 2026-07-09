// ./systems/itemStorageSystem.js
// =========== ITEM MANAGEMENT SYSTEM ===========

// =========== IMPORTS ===========
const { printError } = require("../utitls/UIHelper");

// =========== Core Functions ===========
// Add Item to Inventory
let addItem = (player, item, quantity = 1) => {
  // ========== VALIDATION ==========

  if (item === undefined) {
    printError(errorMessage);
    return false;
  }

  // ========== PREPARE ITEM ==========

  const clonedItem = { ...item };

  // ========== CHECK INVENTORY CAPACITY ==========

  const availableSpace = 20 - player.inventory.length;

  // ========== NON-STACKABLE ITEM ==========

  if (!clonedItem.stackable) {
    if (availableSpace === 0) {
      printError("Your inventory is full.");
      printError("You can't carry more than 20 items.");
      return false;
    }

    if (availableSpace < quantity) {
      printError(
        "You don't have enough space in your inventory to carry that many.",
      );
      return false;
    }

    for (let i = 0; i < quantity; i++) {
      player.inventory.push({
        ...clonedItem,
        quantity: 1,
      });

      console.log(`You added ${clonedItem.name} to your inventory.`);
    }

    return true;
  }

  // ========== STACKABLE ITEM ==========
  // First get the list of not full stacks
  const itemInInventory = player.inventory.filter(
    (inventoryItem) =>
      inventoryItem.id === clonedItem.id &&
      inventoryItem.quantity < inventoryItem.maxStack,
  );

  // ========== NO AVAILABLE EXISTING STACKS ==========

  if (!itemInInventory.length) {
    if (availableSpace === 0) {
      printError("Your inventory is full.");
      printError("You can't carry more than 20 items.");
      return false;
    }

    const numberOfStacks = Math.ceil(quantity / clonedItem.maxStack);

    if (numberOfStacks > availableSpace) {
      printError(
        "You don't have enough space in your inventory to carry that many.",
      );
      return false;
    }

    for (let i = 0; i < numberOfStacks; i++) {
      const quantityToAdd = Math.min(quantity, clonedItem.maxStack);

      player.inventory.push({
        ...clonedItem,
        quantity: quantityToAdd,
      });

      quantity -= quantityToAdd;
    }

    return true;
  }

  // ========== ITEM EXISTS ==========

  // First get New Quantity Variable, we don't want to change the original quantity
  let remainingQuantity = quantity;

    // ========== CALCULATE EXISTING STACK SPACE ==========

    // we already had a filtered list [{id: 1, quantity: 6}, {id: 2, quantity: 3}], if max = 10, remainingToMaxStack = [4, 7], quantity = 25
    const remainingToMaxStack = itemInInventory.map(
      (item) => clonedItem.maxStack - item.quantity,
    );

    const existingStackSpace = remainingToMaxStack.reduce((a, b) => a + b, 0);
    // existingStackSpace = 4 + 7 = 11

    // ========== CALCULATE REQUIRED NEW SLOTS ==========

      const quantityAfterExistingStacks = Math.max(
        0,
        remainingQuantity - existingStackSpace
      );
      // max(0, 25 - 11) = max(0, 14) = 14

      const slotsNeeded = Math.ceil(
        quantityAfterExistingStacks / clonedItem.maxStack
      );
      // ceil(14 / 10) = 2

      if (slotsNeeded > availableSpace) {
        printError("You can't carry more than 20 items.");
        return false;
      }

      // ========== FILL EXISTING STACKS ==========

        for (let i = 0; i < itemInInventory.length; i++) {
          const freeSpace =
            clonedItem.maxStack - itemInInventory[i].quantity;

          const quantityToAdd =
            Math.min(remainingQuantity, freeSpace);

          itemInInventory[i].quantity += quantityToAdd;

          remainingQuantity -= quantityToAdd;

          if (remainingQuantity === 0) {
            console.log(`You added ${quantity} ${clonedItem.name} to your inventory.`);
            return true;
          }
        }
        

        // ========== ADD NEW STACKS ==========
        for (let i = 0; i < slotsNeeded; i++) {
          const quantityToAdd = Math.min(remainingQuantity, clonedItem.maxStack);

          player.inventory.push({
            ...clonedItem,
            quantity: quantityToAdd,
          });

          remainingQuantity -= quantityToAdd;
        }

  console.log(`You added ${quantity} ${clonedItem.name} to your inventory.`);
  return true;
};

// Remove Item from Inventory
let removeItem = (player, item, quantity = 1) => {
  // 1. Guard Clause (item is not undefined)
  if (item === undefined) {
    printError(errorMessage);
    return false;
  }

  // 2. if Inventory is empty
  if (player.inventory.length === 0) {
    console.log("Your inventory is empty.");
    return false;
  }

  // 3. Find the item index once
  let itemIndex = player.inventory.findIndex((i) => i.id === item.id);

  if (itemIndex !== -1) {
    let itemInInventory = player.inventory[itemIndex];

    // 4. Handle Stackable items (like potions)
    if (itemInInventory.stackable) {
      // Guard: Trying to remove more than what exists
      if (itemInInventory.quantity < quantity) {
        printError("You don't have that many.");
        return false;
      }

      // Logic: Exact amount vs Partial amount
      if (itemInInventory.quantity === quantity) {
        player.inventory.splice(itemIndex, 1);
      } else {
        itemInInventory.quantity -= quantity;
      }

      console.log(
        `You removed ${quantity} ${itemInInventory.name} from your inventory.`,
      );
      return true;
    } else {
      // 5. Handle Non-stackable items (like weapons)
      player.inventory.splice(itemIndex, 1);
      console.log(`You removed ${itemInInventory.name} from your inventory.`);
      return true;
    }
  } else {
    // Item not found in inventory at all
    printError("You don't have that item.");
    return false;
  }
};

module.exports = {
  addItem,
  removeItem,
};
