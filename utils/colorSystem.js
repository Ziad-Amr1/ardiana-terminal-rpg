// ./utitls/colorSystem.js
// =========== COLOR SYSTEM ===========

const chalk = require("chalk");

const error = (msg) => chalk.red(msg);
const success = (msg) => chalk.green(msg);
const warning = (msg) => chalk.yellow(msg);
const title = (msg) => chalk.cyan.bold(msg);
const player = (msg) => chalk.cyan(msg);
const enemy = (msg) => chalk.magenta(msg);
const damage = (msg) => chalk.red(msg);
const health = (msg) => chalk.red(msg);
const mana = (msg) => chalk.blue(msg);
const stamina = (msg) => chalk.yellow(msg);
const coins = (msg) => chalk.yellow(msg);
const exp = (msg) => chalk.green(msg);
const menuKeys = (msg) => chalk.cyan.bold(msg);
const rarity = {
  common: (msg) => chalk.white(msg),
  uncommon: (msg) => chalk.green(msg),
  rare: (msg) => chalk.cyan(msg),
  epic: (msg) => chalk.magenta(msg),
  legendary: (msg) => chalk.yellow(msg),
  mythical: (msg) => chalk.red(msg),
};

module.exports = {
  error,
  success,
  warning,
  title,
  player,
  enemy,
  damage,
  health,
  mana,
  stamina,
  coins,
  exp,
  menuKeys,
  rarity,
};


/*
Error       → Red
Success     → Green
Warning     → Yellow

Title       → Cyan + Bold

Player      → Cyan
Enemy       → Magenta

Damage      → Red
Health      → Red
Mana        → Blue
Stamina     → Yellow

Coins       → Yellow
EXP         → Green

Menu Keys   → Cyan + Bold
*/