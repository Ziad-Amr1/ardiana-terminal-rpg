const fs = require("fs");
const gameState = require("../state/gameState");
const { enemyRegistry } = require("../factories/createEnemy");

// =========== SAVE SYSTEM ===================

// ===== Serialize Current Battle =====
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

  fs.writeFileSync("./data/gamestate.json", JSON.stringify(state, null, 2));
}

// ========== Deserialize Current Battle ==========
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

// ========== Load Gamestate ==================
function loadGamestate() {
  const data = fs.readFileSync("./data/gamestate.json", "utf8");

  const saveData = JSON.parse(data);
  saveData.currentBattle = deserializeCurrentBattle(saveData.currentBattle);
  Object.assign(gameState, saveData);
}

// ========== Save Exists ====================
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
