// ./utitls/combatUI.js
// =========== imports ===========
const {
  printTitle,
  printspace,
  renderHeader,
  renderKeys,
  printError,
} = require("./UIHelper");

const {
  player: playerColor,
  enemy: enemyColor,
  damage: damageColor,
  health: healthColor,
  exp: expColor,
  warning,
} = require("./colorSystem");

// =========== COMBAT UI ===========
const printTakeDamage = (target, amount) => {
  console.log(`🩸 ${target.info.name} takes ${damageColor(amount)} damage!`);
};

const printAttack = (attacker, target) => {
  console.log(`⚔️  ${attacker.info.name} attacks ${target.info.name}! 💥`);
  printspace();
};

const printDiedAlready = (attacker) => {
  printError(`${attacker.info.name} has died already.`);
};

const renderHealthBar = (currentHealth, maxHealth, barSize = 10) => {
  if (currentHealth <= 0) {
    return `[${"░".repeat(barSize)}]`;
  }

  if (currentHealth >= maxHealth) {
    return `[${"█".repeat(barSize)}]`;
  }

  const healthRatio = currentHealth / maxHealth;

  const filledSize = Math.floor(healthRatio * barSize);
  const emptySize = barSize - filledSize;

  const filledBar = "█".repeat(filledSize);
  const emptyBar = "░".repeat(emptySize);

  return `[${filledBar}${emptyBar}]`;
};

const printRestHealth = (target) => {
  printspace();
  console.log(
    `❤️   ${target.info.name} HP= ${renderHealthBar(target.resources.health, target.resources.maxHealth)} ${healthColor(target.resources.health)}/${target.resources.maxHealth}`,
  );
};

const printZeroHealth = (target) => {
  printspace();
  console.log(
    `💀 ${target.info.name} HP= ${renderHealthBar(0, target.resources.maxHealth)} ${healthColor(0)}/${target.resources.maxHealth}`,
  );
};

const printWrongInput = () => {
  printError("Invalid command.");
};

const printInvalidItem = () => {
  printError("You don't have any consumable items.");
};

const printEscaped = (combatState, penalty) => {
  printTitle("Battle End");
  console.log(
    `${combatState.player.info.name} ran away from ${combatState.enemy.info.name}`,
  );
  console.log("You got lost while escaping"); // The monster forced you backward
  console.log(`+ ${penalty} steps`);
  printspace();
};

const printWon = (combatState) => {
  printTitle("Battle End");
  console.log(
    `${playerColor(combatState.player.info.name)} defeated ${enemyColor(combatState.enemy.info.name)}!`,
  );
  printspace();
  console.log(`+ ${expColor(combatState.enemy.loot.exp)} EXP`);
};

const printTip = () => {
  console.log(
    `${warning("Tip")}: your health is low, heal yourself before enter new battle`,
  );
};

const printLost = (player) => {
  printTitle("Game Over");
  console.log(`${playerColor(player.info.name)} has died, game over`);
};

const printDefeated = (player, enemy) => {
  printTitle("Battle End");
  console.log(
    `${enemyColor(enemy.info.name)} killed ${playerColor(player.info.name)}`,
  );
  printTitle("Game Over");
};

const printTurnOne = (enemy) => {
  console.log("⚔️ BATTLE STARTS!");
  console.log(`You are fighting ${enemyColor(enemy.info.name)}`);
};

const printPlayerStart = () => {
  console.log("⚔️ You move first!");
};

const printEnemyStart = () => {
  console.log("⚔️ The enemy moves first!");
};

const printStartTurnPrint = (combatState) => {
  printTitle(`TURN ${combatState.turnNumber}`);

  printspace();

  printCombatHUD(combatState.player, combatState.enemy);
};

const printChoiceMenu = () => {
  return `
  choose an action=

  ${renderKeys(`
  [A] Attack
  [H] Heal
  [R] Run
  `)}
  `;
  // [S] Skill
  // [D] Defend
  // [I] Inventory
};

let printCombatHUD = (player, enemy) => {
  console.log(`
${renderHeader("⚔️ COMBAT STATUS")}
${playerColor(player.info.name)}
❤️ HP: ${renderHealthBar(player.resources.health, player.resources.maxHealth)} ${healthColor(player.resources.health)}/${player.resources.maxHealth}

${enemyColor(enemy.info.name)}
❤️ HP: ${renderHealthBar(enemy.resources.health, enemy.resources.maxHealth)} ${healthColor(enemy.resources.health)}/${enemy.resources.maxHealth}

========================
`);
};

const printChoiceItem = () => {
  return `Choose an item to use= `;
};

const printContinueMenu = () => {
  return `\nPress Enter to continue...`;
};

module.exports = {
  printAttack,
  printTakeDamage,
  printDefeated,
  printEscaped,
  printWon,
  printTip,
  printLost,
  printTurnOne,
  printPlayerStart,
  printEnemyStart,
  printStartTurnPrint,
  printChoiceMenu,
  printChoiceItem,
  printContinueMenu,
  printDiedAlready,
  printRestHealth,
  printZeroHealth,
  printWrongInput,
  printInvalidItem,
  printCombatHUD,
};
