// ./utitls/combatUI.js
// =========== imports ===========
const {
  printDivider,
  printTitle,
  printspace,
  printCombatHUD,
} = require("./UIHelper");

// =========== COMBAT UI ===========
const printTakeDamage = (target, amount) => {
  console.log(`🩸 ${target.info.name} takes ${amount} damage!`);
};

const printAttack = (attacker, target) => {
  console.log(`⚔️ ${attacker.info.name} attacks ${target.info.name}!`);
  printspace();
};

const printDiedAlready = (attacker) => {
  console.log(`❌ ${attacker.info.name} has died already.`);
};

const printRestHealth = (target) => {
  printspace();
  console.log(
    `❤️   ${target.info.name} HP= ${target.resources.health}/${target.resources.maxHealth}`,
  );
};

const printZeroHealth = (target) => {
  printspace();
  console.log(`💀 ${target.info.name} HP= 0/${target.resources.maxHealth}`);
};

const printWrongInput = () => {
  console.log("❌ Invalid command.");
};

const printInvalidItem = () => {
  console.log("❌ You don't have any consumable items.");
};

const printEscaped = (combatState, penalty) => {
  console.log("Battle End");
  console.log(`${combatState.player.info.name} ran away from ${combatState.enemy.info.name}`);
  console.log("You got lost while escaping"); // The monster forced you backward
  console.log(`+ ${penalty} steps`);
  printspace();
};

const printWon = (combatState) => {
  printTitle("Battle End");
  console.log(`${combatState.player.info.name} defeated ${combatState.enemy.info.name}!`);
  printspace();
  console.log(`+ ${combatState.enemy.loot.exp} EXP`);
};

const printTip = () => {
  console.log(`Tip= your health is low, heal yourself before enter new battle`);
};

const printLost = (player) => {
  console.log(`${player.info.name} has died, game over`);
};

const printDefeated = (player, enemy) => {
  console.log("Battle End");
  console.log(`${enemy.info.name} killed ${player.info.name}`);
  printTitle("Game Over");
};

const printTrunOne = (enemy) => {
  console.log("⚔️ BATTLE STARTS!");
  console.log(`You are fighting ${enemy.info.name}`);
};

const printPlayerStart = () => {
  console.log("⚔️ The enemy moves first!");
};

const printEnemyStart = () => {
  console.log("⚔️ You move first!");
};

const printStartTurnPrint = (combatState) => {
  printTitle(`TURN ${combatState.turnNumber}`);

  printspace();

  printCombatHUD(combatState.player, combatState.enemy);
};

const printChoiceMenu = () => {
  return `
  choose an action=

  [ A ] Attack
  [ H ] Heal
  [ R ] Run

  `;
  // [S] Skill
  // [D] Defend
  // [I] Inventory
};

const printChoiceItem = () => {
  return `Choose an item to use= `;
};

const printContinueMenu = () => {
  return `\nPress Enter to continue...`;
};

const printHealth = () => {};
const printDefense = () => {};
const printDamage = () => {};

module.exports = {
  printAttack,
  printTakeDamage,
  printDefeated,
  printEscaped,
  printWon,
  printTip,
  printLost,
  printDefeated,
  printTrunOne,
  printPlayerStart,
  printEnemyStart,
  printStartTurnPrint,
  printChoiceMenu,
  printChoiceItem,
  printContinueMenu,
  printHealth,
  printDefense,
  printDamage,
  printDiedAlready,
  printRestHealth,
  printZeroHealth,
  printWrongInput,
  printInvalidItem,
};
