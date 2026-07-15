// ./systems/itemStorageSystem.js
// =========== ITEM MANAGEMENT SYSTEM ===========

// =========== IMPORTS ===========
const { printError } = require("../utils/UIHelper");
const { printAddItem, printRemovedItem } = require("../utils/inventoryUI");
const { getItemDefinition } = require("./itemResolver");
const { t } = require("../i18n");

// =========== Core Functions ===========
// Add Item to Inventory
let addItem = (player, itemId, quantity = 1, runtimeData = null) => {
  // ========== VALIDATION ==========

  if (itemId === undefined) {
    printError(t("inventory.error.InvalidItem"));
    return false;
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    printError(t("inventory.error.InvalidQuantity"));
    return false;
  }

  // ========== PREPARE ITEM ==========

  const item = getItemDefinition(itemId);

  // ========== CHECK INVENTORY CAPACITY ==========

  const availableSpace = 20 - player.inventory.length;

  // ========== EXISTING RUNTIME ITEM ==========

  if (runtimeData && item.category === "equipment") {
    if (availableSpace === 0) {
      printError(
        t("inventory.error.InventoryFull") +
          "\n" +
          t("inventory.error.CantCarryMore"),
      );
      return false;
    }

    player.inventory.push({
      ...runtimeData,
    });

    printAddItem(item.name);
    return true;
  }

  // ========== NON-STACKABLE ITEM ==========

  if (!item.stackable) {
    if (availableSpace === 0) {
      printError(
        t("inventory.error.InventoryFull") +
          "\n" +
          t("inventory.error.CantCarryMore"),
      );
      return false;
    }

    if (availableSpace < quantity) {
      printError(t("inventory.error.NotEnoughSpace"));
      return false;
    }

    let dataObject = {
      itemId: item.id,
    };
    if (item.maxDurability) {
      dataObject.currentDurability = item.maxDurability;
    }

    if (item.maxUpgradeLevel) {
      dataObject.upgradeLevel = 0;
    }

    for (let i = 0; i < quantity; i++) {
      player.inventory.push({
        ...dataObject,
      });
    }

    printAddItem(item.name, quantity);

    return true;
  }

  // ========== STACKABLE ITEM ==========
  // First get the list of not full stacks
  const itemInInventory = player.inventory.filter(
    (inventoryItem) =>
      inventoryItem.itemId === item.id &&
      inventoryItem.quantity < item.maxStack,
  );

  // ========== NO AVAILABLE EXISTING STACKS ==========

  if (!itemInInventory.length) {
    if (availableSpace === 0) {
      printError(
        t("inventory.error.InventoryFull") +
          "\n" +
          t("inventory.error.CantCarryMore"),
      );
      return false;
    }

    const numberOfStacks = Math.ceil(quantity / item.maxStack);

    if (numberOfStacks > availableSpace) {
      printError(t("inventory.error.NotEnoughSpace"));
      return false;
    }

    let remainingQuantity = quantity;

    for (let i = 0; i < numberOfStacks; i++) {
      const quantityToAdd = Math.min(remainingQuantity, item.maxStack);

      player.inventory.push({
        itemId: item.id,
        quantity: quantityToAdd,
      });

      remainingQuantity -= quantityToAdd;
    }
    printAddItem(item.name, quantity);
    return true;
  }

  // ========== ITEM EXISTS ==========

  // First get New Quantity Variable, we don't want to change the original quantity
  let remainingQuantity = quantity;

  // ========== CALCULATE EXISTING STACK SPACE ==========

  // we already had a filtered list [{id: 1, quantity: 6}, {id: 2, quantity: 3}], if max = 10, remainingToMaxStack = [4, 7], quantity = 25
  const remainingToMaxStack = itemInInventory.map(
    (itemIn) => item.maxStack - itemIn.quantity,
  );

  const existingStackSpace = remainingToMaxStack.reduce((a, b) => a + b, 0);
  // existingStackSpace = 4 + 7 = 11

  // ========== CALCULATE REQUIRED NEW SLOTS ==========

  const quantityAfterExistingStacks = Math.max(
    0,
    remainingQuantity - existingStackSpace,
  );
  // max(0, 25 - 11) = max(0, 14) = 14

  const slotsNeeded = Math.ceil(quantityAfterExistingStacks / item.maxStack);
  // ceil(14 / 10) = 2

  if (slotsNeeded > availableSpace) {
    printError("You can't carry more than 20 items.");
    return false;
  }

  // ========== FILL EXISTING STACKS ==========

  for (let i = 0; i < itemInInventory.length; i++) {
    const freeSpace = item.maxStack - itemInInventory[i].quantity;

    const quantityToAdd = Math.min(remainingQuantity, freeSpace);

    itemInInventory[i].quantity += quantityToAdd;

    remainingQuantity -= quantityToAdd;

    if (remainingQuantity === 0) {
      printAddItem(item.name, quantity);
      return true;
    }
  }

  // ========== ADD NEW STACKS ==========
  for (let i = 0; i < slotsNeeded; i++) {
    const quantityToAdd = Math.min(remainingQuantity, item.maxStack);

    player.inventory.push({
      itemId: item.id,
      quantity: quantityToAdd,
    });

    remainingQuantity -= quantityToAdd;
  }

  printAddItem(item.name, quantity);
  return true;
};

// Remove Item from Inventory
let removeItem = (player, item, itemIndex, quantity = 1) => {
  // 1. Guard Clause (item is not undefined)
  if (item === undefined) {
    printError(t("inventory.error.InvalidItem"));
    return false;
  }

  // 2. if Inventory is empty
  if (player.inventory.length === 0) {
    printError(t("inventory.error.InventoryEmpty"));
    return false;
  }

  // 3. validate itemIndex
  if (
    !Number.isInteger(itemIndex) ||
    itemIndex < 0 ||
    itemIndex >= player.inventory.length
  ) {
    printError(t("inventory.error.NotFound"));
    return false;
  }

  let itemInInventory = player.inventory[itemIndex];

  // 4. Handle Stackable items (like potions)
  if (item.stackable) {
    // Guard: Trying to remove more than what exists
    if (itemInInventory.quantity < quantity) {
      printError(t("inventory.error.NotEnough"));
      return false;
    }

    // Logic: Exact amount vs Partial amount
    if (itemInInventory.quantity === quantity) {
      player.inventory.splice(itemIndex, 1);
    } else {
      itemInInventory.quantity -= quantity;
    }

    printRemovedItem(player, item, quantity);
    return true;
  } else {
    // 5. Handle Non-stackable items (like weapons)
    player.inventory.splice(itemIndex, 1);
    printRemovedItem(player, item);
    return true;
  }
};

module.exports = {
  addItem,
  removeItem,
};
