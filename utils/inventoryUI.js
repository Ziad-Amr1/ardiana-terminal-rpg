// ./utils/inventoryUI.js

/*
  Inventory UI

  Responsibilities:
  - Display inventory items
  - Display selected item
  - Display item details
  - Display item actions
  - Display inventory messages

  IMPORTANT:
  This file expects resolved items when displaying full item data.

  Example resolved item:

  {
    id: "rusty_iron_sword",
    name: "Rusty Iron Sword",
    category: "equipment",
    subCategory: "weapon",

    maxDurability: 100,
    weaponStats: {
      damage: 25
    },

    itemId: "rusty_iron_sword",
    currentDurability: 100,
    upgradeLevel: 0
  }
*/

// =========== IMPORTS ===========

const { rarity: rarityColor, player: playerColor } = require("./colorSystem");

const {
  renderKeys,
  printTitle,
  printspace,
  renderHeader,
} = require("./UIHelper");

// ========================================
// GENERAL HELPERS
// ========================================

// Get item color based on rarity
const getRarityColor = (rarity) => {
  return rarityColor[rarity] ?? rarityColor.common;
};

// Render item name using rarity color
const renderItemName = (item) => {
  return getRarityColor(item.rarity)(item.name);
};

// Render item rarity using rarity color
const renderItemRarity = (item) => {
  return getRarityColor(item.rarity)(item.rarity);
};

// Render player name using player color
const renderPlayerName = (player) => {
  return playerColor(player.info.name);
};

// Convert camelCase into readable text
//
// Example:
//
// attackSpeed
//
// becomes:
//
// Attack Speed
const formatKey = (key) => {
  const separatedKey = key.replace(/([A-Z])/g, " $1");

  return separatedKey[0].toUpperCase() + separatedKey.slice(1);
};

// Get quantity for UI display
//
// Stackable:
// { quantity: 50 }
//
// Non-stackable:
// No quantity property
//
// Therefore:
//
// quantity ?? 1
const getDisplayQuantity = (item) => {
  return item.quantity ?? 1;
};

// Shorten item description for inventory list
const getDisplayDescription = (item) => {
  return item.description.length > 10
    ? item.description.slice(0, 10) + "..."
    : item.description;
};

// ========================================
// ITEM HEADER
// ========================================

// Decide which header should be displayed
// depending on item type
const getItemHeader = (item) => {
  if (item.category !== "equipment") {
    return renderHeader("ITEM DETAILS");
  }

  if (item.subCategory === "weapon") {
    return renderHeader("WEAPON DETAILS");
  }

  if (item.subCategory === "armor") {
    return renderHeader("ARMOR DETAILS");
  }

  if (item.subCategory === "accessory") {
    return renderHeader("ACCESSORY DETAILS");
  }

  // Fallback for unknown equipment types
  return renderHeader("ITEM DETAILS");
};

// ========================================
// ITEM ACTIONS
// ========================================

const getItemActions = (item, { inspect = false } = {}) => {
  return renderKeys(`
    ${item.category === "consumable" ? "[C] Consume / Use" : ""}
    ${item.category === "equipment" ? "[E] Equip" : ""}

    [D] Drop
    [N] Next item
    [P] Previous item

    ${inspect ? "[I] Inspect" : ""}

    [B] Back
  `);
};

// ========================================
// STATS DISPLAY
// ========================================

// Convert a stats object into readable text
//
// Example:
//
// {
//   damage: 25,
//   attackSpeed: 10
// }
//
// becomes:
//
// Damage: +25
// Attack Speed: +10
const displayStats = (stats) => {
  if (!stats || Object.keys(stats).length === 0) {
    return "";
  }

  return Object.keys(stats)
    .map((key) => {
      return `${formatKey(key)}: +${stats[key]}`;
    })
    .join("\n");
};

// ========================================
// EQUIPMENT TYPE STATS
// ========================================

// Display stats specific to equipment type
//
// Weapon:
// weaponStats
//
// Armor:
// armorStats
//
// Accessory:
// Currently has no type-specific stats
const displayEquipmentStats = (item) => {
  if (item.subCategory === "weapon") {
    return `-----------------------------------------
    WEAPON STATS
-----------------------------------------

    ${displayStats(item.weaponStats)}`;
  }

  if (item.subCategory === "armor") {
    return `-----------------------------------------
    ARMOR STATS
-----------------------------------------

    ${displayStats(item.armorStats)}`;
  }

  // Accessory currently has no special stats section
  return "";
};

// ========================================
// EQUIPMENT BONUSES
// ========================================

const displayBonuses = (statsBonus) => {
  if (!statsBonus || Object.keys(statsBonus).length === 0) {
    return "";
  }

  return `-----------------------------------------
    BONUSES
-----------------------------------------

    ${displayStats(statsBonus)}`;
};

// ========================================
// ITEM REQUIREMENTS
// ========================================

const displayRequirements = (requirements) => {
  // Some items, such as current accessories,
  // may not have requirements
  if (!requirements || Object.keys(requirements).length === 0) {
    return "";
  }

  const requirementsText = Object.keys(requirements)
    .map((key) => {
      const value = requirements[key];

      /*
        Handle nested objects.

        Example:

        requirements: {
          level: 1,

          stats: {
            STR: 5,
            DEX: 3
          }
        }
      */

      if (typeof value === "object" && value !== null) {
        const nestedValues = Object.keys(value)
          .map((nestedKey) => {
            return `    ${formatKey(nestedKey)}: ${value[nestedKey]}`;
          })
          .join("\n");

        return `${formatKey(key)}:\n${nestedValues}`;
      }

      return `${formatKey(key)}: ${value}`;
    })
    .join("\n");

  return `-----------------------------------------
    REQUIRED
-----------------------------------------

    ${requirementsText}`;
};

// ========================================
// EQUIPMENT CONDITION
// ========================================

const displayCondition = (item) => {
  /*
    TODO:

    Currently your data model says:

    Weapon:
    - durability
    - upgrades

    Armor:
    - durability
    - upgrades

    Accessory:
    - currently no durability
    - currently no upgrades

    Therefore accessories are ignored here.

    If accessories later support durability or upgrades,
    this logic should be changed.
  */

  if (item.subCategory === "accessory") {
    return "";
  }

  if (item.category !== "equipment") {
    return "";
  }

  return `-----------------------------------------
    CONDITION
-----------------------------------------

    Durability: ${item.currentDurability} / ${item.maxDurability}
    Upgrade:    ${item.upgradeLevel} / ${item.maxUpgradeLevel}`;
};

// ========================================
// ITEM EFFECTS
// ========================================

const displayEffects = (effects) => {
  if (!effects || effects.length === 0) {
    return "";
  }

  /*
    Example:

    effects: [
      {
        type: "bleeding",
        chance: 25,
        damage: 5,
        duration: 3
      }
    ]
  */

  const effectsText = effects
    .map((effect) => {
      return Object.keys(effect)
        .map((key) => {
          return `    ${formatKey(key)}: ${effect[key]}`;
        })
        .join("\n");
    })
    .join("\n\n");

  return `-----------------------------------------
    EFFECTS
-----------------------------------------

${effectsText}`;
};

// ========================================
// COMPLETE EQUIPMENT SECTION
// ========================================

const displayEquipmentSection = (item) => {
  if (item.category !== "equipment") {
    return "";
  }

  /*
    All equipment can use:

    1. Type-specific stats
    2. Bonuses
    3. Requirements
    4. Condition

    Each helper decides whether
    it actually has something to display.
  */

  return `
${displayEquipmentStats(item)}

${displayBonuses(item.statsBonus)}

${displayRequirements(item.requirements)}

${displayCondition(item)}
`;
};

// ========================================
// INVENTORY UI
// ========================================

const printUsedItem = (player, item) => {
  console.log(`${renderPlayerName(player)} uses ${renderItemName(item)}.`);
};

const printEmptyInventory = (player) => {
  console.log(`${renderPlayerName(player)} has no items in inventory.`);
};

// ========================================
// PRINT INVENTORY LIST
// ========================================

const printInventory = (inventory, category = null) => {
  printTitle("Inventory");

  printspace();

  const items = category
    ? inventory.filter((item) => item.category === category)
    : inventory;

  items.forEach((item, index) => {
    console.log(
      `${index + 1} - ${renderItemName(item)} - ${getDisplayDescription(item)} - (x${getDisplayQuantity(item)})`,
    );

    printspace();
  });
};

// ========================================
// PRINT ITEM DETAILS
// ========================================

const printInspectItem = (item) => {
  console.log(`
${getItemHeader(item)}

${renderItemName(item)} [${renderItemRarity(item)}]

-----------------------------------------
    GENERAL
-----------------------------------------

    Category:    ${formatKey(item.category)}
    Subcategory: ${formatKey(item.subCategory)}

    Description:
    ${item.description}

-----------------------------------------
    VALUE
-----------------------------------------

    Buy Price:  ${item.buyPrice} coins
    Sell Price: ${item.sellPrice} coins


${displayEquipmentSection(item)}


${displayEffects(item.effects)}


-----------------------------------------
    INVENTORY
-----------------------------------------

    Quantity: ${getDisplayQuantity(item)}


-----------------------------------------
    ACTIONS
-----------------------------------------

${getItemActions(item)}
`);
};

// ========================================
// SELECTED ITEM
// ========================================

const renderSelectedItem = (item) => {
  return `
You selected ${renderItemName(item)}.

What do you want to do?

${getItemActions(item, { inspect: true })}
`;
};

// ========================================
// OPEN INVENTORY
// ========================================

const renderOpenInventory = (player) => {
  if (player.inventory.length === 0) {
    return renderKeys(`
Your inventory is empty.

[B] Back
`);
  }

  return renderKeys(`
Choose an item number.

[B] Back
`);
};

// ========================================
// ADD ITEM MESSAGE
// ========================================

const printAddItem = (itemName, quantity = 1) => {
  if (quantity === 1) {
    console.log(`You added ${itemName} to your inventory.`);

    return;
  }

  console.log(`You added ${quantity} ${itemName} to your inventory.`);
};

const printRemovedItem = (player, item, quantity) => {
  if (!quantity) {
    console.log(`You removed ${item.name} from your inventory.`);
    return;
  }
  console.log(
    `You removed ${quantity} ${item.name} from your inventory.`,
  );
};

// ========================================
// EXPORTS
// ========================================

module.exports = {
  printUsedItem,
  printEmptyInventory,
  printInventory,
  printInspectItem,
  renderSelectedItem,
  renderOpenInventory,
  printAddItem,
  printRemovedItem,
  renderItemName,
};
