const { allInGameItems } = require("../factories/createItem");
const { allInGameEnemies } = require("../factories/createEnemy");
const { addItem, showInventoryBattle, getItem } = require("./inventorySystem");
const { leveling } = require("./levelSystem");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const playerData = require("../data/player");
let player = playerData.player;
const { healing } = require("./playerSystem");

// =========== COMBAT SYSTEM ===========
function loot(target, amount) {
  target.coins += amount;
  console.log(`${target.name} got ${amount} coins`);
}

function takeDamage(target, amount) {
  target.health -= amount;

  console.log(`${target.name} take ${amount} damage`);

  if (target.health <= 0) {
    console.log(`${target.name} died`);
  }
}

let attack = (attacker, target) => {
  if (checkStatus(attacker)) {
    console.log(`${attacker.name} attacked ${target.name}`);
    takeDamage(target, attacker.damage);
    if (target.health > 0) {
      console.log(`${target.name} had ${target.health} HP`);
    } else {
      console.log(`${target.name} had 0 HP`);
    }
  } else {
    console.log(`${attacker.name} has died already`);
  }
};

let checkStatus = (target) => {
  if (target.health <= 0) {
    return false;
  } else {
    return true;
  }
};

let rolling = () => {
  let dice = Math.floor(Math.random() * 6) + 1;
  if (dice <= 3) {
    return false;
  } else {
    return true;
  }
};

let randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let startBattle = () => {
  let turn = rolling();
  if (turn) {
    console.log("The Enemy start");
    return "E";
  } else {
    console.log("You start");
    return "P";
  }
};

let battle = (player, onExit, enemy) => {
  if (enemy === undefined) {
    enemy = choiceEnemy();
  }

  let s = startBattle();
  let msg = `choose an action: \n
  1. Attack\n
  2. Heal\n
  3. Run\n
  `;
  let turnNumber = 1;

  let playerTurn = () => {
    rl.question(msg, (answer) => {
      if (answer === "1") {
        attack(player, enemy);
        if (checkStatus(enemy)) {
          if (s == "P") {
            enemyTurn();
          } else {
            turnNumber++;
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
        console.log("Invalid Input");
        playerTurn();
      }
    });
  };

  let enemyTurn = () => {
    attack(enemy, player);
    if (checkStatus(player)) {
      if (s == "E") {
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
      console.log(`Your inventory is empty`);
      playerTurn();
    } else {
      showInventoryBattle(player);
      rl.question(`Choose an item to use: `, (answer) => {
        answer = Number(answer) - 1;
        getItem(player, answer);
        if (s == "P") {
          enemyTurn();
        } else {
          turnNumber++;
          startTurn();
        }
      });
    }
  };

  let resetEnemy = (enemy) => {
    enemy.health = enemy.maxHealth;
  };

  let endBattle = (status) => {
    if (status === 1) {
      // player escaped
      console.log("Battle End");
      console.log(`${player.name} ran away from ${enemy.name}`);
      console.log("");
      onExit();
      return;
    } else if (status === 2) {
      // player won -- enemy died
      console.log("Battle End");
      console.log(`${player.name} killed ${enemy.name}`);
      console.log("");
      console.log(`${player.name} got ${enemy.loot.exp} EXP`);
      loot(player, enemy.loot.coins);
      player.exp += enemy.loot.exp;
      leveling(player);
      dropItem(enemy);
      if (player.health <= player.maxHealth / 2) {
        console.log(
          `Tip: your health is low, heal yourself before enter new battle`,
        );
      }

      if (checkStatus(player)) {
        onExit();
        return;
      } else {
        console.log(`${player.name} has died, game over`);
        process.exit(0);
      }
    } else if (status === 3) {
      // player died -- game over
      console.log("Battle End");
      console.log(`${enemy.name} killed ${player.name}`);
      console.log(`
===================\n
      Game Over\n
===================
      
      `);
      process.exit(0);
    }
  };

  // let playAgain = () => {
  //   rl.question(`Do you want to play again? Y/N`, (answer) => {
  //     if (answer === "Y" || answer === "y") {
  //       let enemy = choiceEnemy();
  //       resetEnemy(enemy);
  //       battle(player, enemy);
  //     } else if (answer === "N" || answer === "n") {
  //       console.log("Goodbye");
  //       process.exit(0);
  //     } else {
  //       console.log("Invalid Input");
  //       playAgain();
  //     }
  //   });
  // };

  let startTurn = () => {
    console.log(`======= Turn ${turnNumber} =======`);

    if (s == "E") {
      enemyTurn();
    } else {
      playerTurn();
    }
  };
  startTurn();
};

let choiceEnemy = () => {
  let enemies = [
    { enemy: allInGameEnemies[0].name, chance: 60 },
    { enemy: allInGameEnemies[1].name, chance: 30 },
    { enemy: allInGameEnemies[2].name, chance: 10 },
  ];
  let chance1 = enemies[0].chance;
  let chance2 = chance1 + enemies[1].chance;
  let spawn = randomNumber(1, 100);
  if (spawn <= chance1) {
    console.log(`You are fighting ${allInGameEnemies[0].name}`);
    return allInGameEnemies[0];
  } else if (spawn <= chance2) {
    console.log(`You are fighting ${allInGameEnemies[1].name}`);
    return allInGameEnemies[1];
  } else {
    console.log(`You are fighting ${allInGameEnemies[2].name}`);
    return allInGameEnemies[2];
  }
};

let dropItem = (enemy) => {
  let chance = enemy.loot.items.DR;
  if (chance >= randomNumber(1, 100)) {
    // 20 >= random number 1-100
    console.log(`You got ${enemy.loot.items.name}`);
    allInGameItems.forEach((item) => {
      if (item.name === enemy.loot.items.name) {
        addItem(player, item);
      }
    });
  } else {
    console.log(`No item dropped`);
  }
};

module.exports = {
  attack,
  checkStatus,
  battle,
  choiceEnemy,
  dropItem,
  takeDamage,
};
