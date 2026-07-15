// ./systems/itemResolver.js

const { itemRegistry } = require("../factories/createItem");

const getItemDefinition= (itemId) => {
  if (typeof itemId !== "string") {
    throw new Error(`item ${itemId} is not a string`);
  }
  itemId = itemId.trim();
  if (!itemId) {
    throw new Error(`item ${itemId} is not a valid itemId`);
  }
  let definition = itemRegistry[itemId];

  if (!definition) {
    throw new Error(`item ${itemId} not found`);
  }
  let { identity, classification, economy, storage, durability, upgrade, ...typeSpecificData } =
    definition;

  return {
    ...identity,
    ...classification,
    ...economy,
    ...storage,
    ...durability,
    ...upgrade,
    ...typeSpecificData,
  };
};

const resolveItem  = (item) => {
  let { itemId, ...runTimeData } = item;

  let definition = getItemDefinition(itemId);

  let allData = {
    ...definition,
    ...runTimeData,
  };

  return allData;
};

module.exports = { 
  getItemDefinition,
  resolveItem,
};
