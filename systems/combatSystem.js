const { showInventoryBattle, getItem } = require("./inventorySystem");
const { leveling } = require("./levelSystem");
const { loot, dropItem } = require("./lootingSystem");
const { dice } = require("../utitls/randoms");
const {  printDivider, printTitle, printspace } = require("../utitls/UIHelper");

// =========== COMBAT SYSTEM ===========

function takeDamage(target, amount) {
  target.resources.health -= amount;

  console.log(`🩸 ${target.info.name} takes ${amount} damage!`);

  // if (target.resources.health <= 0) {
  //   console.log(`${target.info.name} died`);
  // }
}

let attack = (attacker, target) => {
  if (checkStatus(attacker)) {
    console.log(`⚔️ ${attacker.info.name} attacks ${target.info.name}!`);
    printspace();
    takeDamage(target, attacker.combat.damage);
    printspace();
    if (target.resources.health > 0) {
      console.log(
        `❤️ ${target.info.name} HP: ${target.resources.health}/${target.resources.maxHealth}`,
      );
    } else {
      console.log(`❤️ ${target.info.name} HP: 0/${target.resources.maxHealth}`);
    }
  } else {
    console.log(`${attacker.info.name} has died already`);
  }
};

let checkStatus = (target) => {
  if (target.resources.health <= 0) {
    return false;
  } else {
    return true;
  }
};

let rolling = () => {
  let diceRoll = dice();
  if (diceRoll <= 3) {
    return false;
  } else {
    return true;
  }
};

let startBattle = (gamestate, enemy) => {
  gamestate.currentBattle = {
    enemy,
    turnNumber: 1,
  };
  let turn = rolling();
  if (turn) {
    return "enemy";
  } else {
    return "player";
  }
};

let battle = (gamestate, rl , onExit, enemy) => {
  let player = gamestate.player;

  let battleStarter = startBattle(gamestate, enemy);
  let msg = `
  choose an action:

  1. Attack
  2. Heal
  3. Run
  `;
  let turnNumber = gamestate.currentBattle.turnNumber;

  let playerTurn = () => {
    rl.question(msg, (answer) => {
      if (answer === "1") {
        attack(player, enemy);
        if (checkStatus(enemy)) {
          if (battleStarter == "player") {
            enemyTurn();
          } else {
            turnNumber++;
            gamestate.currentBattle.turnNumber++;
            startTurn();
          }
        } else {
          endBattle(2);
        }
      } else if (answer === "2") {
        inventoryTurn();
      } else if (answer === "3") {
        endBattle(1);
      } else {
        console.log("❌ Invalid command.");
        playerTurn();
      }
    });
  };

  let enemyTurn = () => {
    attack(enemy, player);
    if (checkStatus(player)) {
      if (battleStarter == "enemy") {
        playerTurn();
      } else {
        turnNumber++;
        startTurn();
      }
    } else {
      endBattle(3);
    }
  };

  let inventoryTurn = () => {
    if (showInventoryBattle(player) === false) {
      console.log(`❌ You don't have any consumable items.`);
      playerTurn();
    } else {
      showInventoryBattle(player);
      rl.question(`Choose an item to use: `, (answer) => {
        answer = Number(answer);
        let used = getItem(player, answer);
        if (!used) {
          inventoryTurn();
          return;
        }
        if (battleStarter == "player") {
          enemyTurn();
        } else {
          turnNumber++;
          startTurn();
        }
      });
    }
  };

  let endBattle = (status) => {
    if (status === 1) {
      // player escaped
      console.log("Battle End");
      console.log(`${player.info.name} ran away from ${enemy.info.name}`);
      printspace();
      gamestate.currentBattle = null;
      onExit();
      return;
    } else if (status === 2) {
      // player won -- enemy died
      printTitle("Battle End");
      console.log(`${player.info.name} defeated ${enemy.info.name}!`);
      printspace();
      console.log(`+ ${enemy.loot.exp} EXP`);
      loot(player, enemy.loot.coins);
      player.progression.exp += enemy.loot.exp;
      leveling(player);
      dropItem(player, enemy);
      if (player.resources.health <= player.resources.maxHealth / 2) {
        console.log(
          `Tip: your health is low, heal yourself before enter new battle`,
        );
      }
      gamestate.currentBattle = null;
      if (checkStatus(player)) {
        rl.question("\nPress Enter to continue...", () => {
          onExit();
        });
        return;
      } else {
        console.log(`${player.info.name} has died, game over`);
        process.exit(0);
      }
    } else if (status === 3) {
      // player died -- game over
      console.log("Battle End");
      console.log(`${enemy.info.name} killed ${player.info.name}`);
      printTitle("Game Over");
      gamestate.currentBattle = null;
      process.exit(0);
    }
  };

  if (turnNumber === 1) {
    console.log("⚔️ BATTLE STARTS!");
    console.log(`You are fighting ${enemy.info.name}`);
    if (battleStarter == "enemy") {
      console.log("⚔️ The enemy moves first!");
    } else {
      console.log("⚔️ You move first!");
    }
  }

  let startTurn = () => {
    printTitle(`TURN ${turnNumber}`);
    if (battleStarter == "enemy") {
      enemyTurn();
    } else {
      playerTurn();
    }
  };
  startTurn();
};

module.exports = {
  attack,
  checkStatus,
  battle,
  takeDamage,
};