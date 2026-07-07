const fs = require("fs");
const gameState = require("../state/gameState");
const { allInGameItems, itemRegistry } = require("../factories/createItem");
const { allInGameEnemies, enemyRegistry } = require("../factories/createEnemy");

// =========== SAVE SYSTEM ===========
const serializeInventory = (state) => {
  let inventory = state.player.inventory;
  let inventoryData = [];
  inventory.forEach((item) => {
    inventoryData.push({
      id: item.id,
      quantity: item.quantity,
    });
  });

  state.player.inventory = inventoryData;
  return state;
};

const serializeEquipment = (state) => {
  let equipment = state.player.equipment;
  let equipmentData = {
    weapon: equipment.weapon,
    armor: equipment.armor,
    accessory: equipment.accessory,
  };
  if (equipment.weapon) {
    equipmentData.weapon = equipment.weapon.id;
  } else {
    equipmentData.weapon = null;
  }
  if (equipment.armor) {
    equipmentData.armor = equipment.armor.id;
  } else {
    equipmentData.armor = null;
  }
  if (equipment.accessory) {
    equipmentData.accessory = equipment.accessory.id;
  } else {
    equipmentData.accessory = null;
  }
  state.player.equipment = equipmentData;
  return state;
};

const serializeCurrentBattle = (state) => {
  if (!state.currentBattle) {
    return state;
  }

  const enemyData = {
    enemyId: state.currentBattle.enemy.id,
    health: state.currentBattle.enemy.resources.health,
  };
  state.currentBattle.enemy = enemyData;
  return state;
};

// ========== Save Gamestate ==========
function saveGamestate(gamestate) {
  let state = structuredClone(gamestate);
  state = serializeCurrentBattle(state);
  state = serializeInventory(state);
  state = serializeEquipment(state);

  fs.writeFileSync("./data/gamestate.json", JSON.stringify(state, null, 2));
}

// ========== Deserialize Inventory ==========
const deserializeInventory = (savedInventory) => {
  let inventory = [];
  for (let i = 0; i < savedInventory.length; i++) {
    let item = savedInventory[i];
    let itemData = structuredClone(itemRegistry[item.id]);
    itemData.quantity = item.quantity;
    inventory.push(itemData);
  }

  return inventory;
};

const deserializeEquipment = (savedEquipment) => {
  if (!savedEquipment) {
    return {
      weapon: null,
      armor: null,
      accessory: null,
    };
  }

  const savedWeapon = () => {
    let weapon = savedEquipment.weapon;
    if (weapon) {
      weapon = structuredClone(itemRegistry[weapon]);
      return weapon;
    }
  };
  const savedArmor = () => {
    let armor = savedEquipment.armor;
    if (armor) {
      armor = structuredClone(itemRegistry[armor]);
      return armor;
    }
  };
  const saveAccessory = () => {
    let accessory = savedEquipment.accessory;
    if (accessory) {
      accessory = structuredClone(itemRegistry[accessory]);
      return accessory;
    }
  };

  let equipment = {
    weapon: savedWeapon() || null,
    armor: savedArmor() || null,
    accessory: saveAccessory() || null,
  };

  return equipment;
};

const deserializeCurrentBattle = (savedBattle) => {
  if (!savedBattle) {
    return null;
  }

  const enemy = structuredClone(enemyRegistry[savedBattle.enemy.enemyId]);

  enemy.resources.health = savedBattle.enemy.health;

  return {
    enemy,
    turnNumber: savedBattle.turnNumber,
    battleStarter: savedBattle.battleStarter,
  };
};
// ========== Load Gamestate ==========
function loadGamestate() {
  const data = fs.readFileSync("./data/gamestate.json", "utf8");

  const saveData = JSON.parse(data);
  saveData.player.inventory = deserializeInventory(saveData.player.inventory);
  saveData.player.equipment = deserializeEquipment(saveData.player.equipment);
  saveData.currentBattle = deserializeCurrentBattle(saveData.currentBattle);
  Object.assign(gameState, saveData);
}

// ========== Save Exists ==========
function saveExists() {
  if (!fs.existsSync("./data/gamestate.json")) {
    return false;
  }

  const data = fs.readFileSync("./data/gamestate.json", "utf8");

  return data.trim() !== "";
}

module.exports = {
  saveGamestate,
  loadGamestate,
  saveExists,
};
