// ./systems/combatSystem.js
const { showInventoryBattle, getItem } = require("./inventorySystem");
const { leveling } = require("./levelSystem");
const { loot, dropItem } = require("./lootingSystem");
const { dice, randomNumber } = require("../utitls/randoms");
const combatUI = require("../utitls/combatUI");
const { getCombatStats } = require("./playerSystem");
const createCombatRoutrt = require("../routers/combatRouter");

// =========== COMBAT SYSTEM ===========

function takeDamage(target, amount) {
  const previousHealth = target.resources.health;

  target.resources.health = Math.max(0, target.resources.health - amount);

  const actualDamageTaken = previousHealth - target.resources.health;

  combatUI.printTakeDamage(target, actualDamageTaken);
}

let attack = (attacker, target) => {
  // 1. لو الضارب ميت، ميكملش
  if (!checkStatus(attacker)) {
    combatUI.printDiedAlready(attacker);
    return;
  }

  combatUI.printAttack(attacker, target);

  // =========================================
  // ⚙️ دمج نظام الإحصائيات (Stats System)
  // =========================================

  // 2. حساب قوة الهجوم (Attacker Damage)
  let attackerDamage = attacker.combat.damage;
  if (attacker.equipment) {
    // لو الضارب عنده equipment (يعني هو اللاعب)، استخدم دالة الحسابات
    attackerDamage = getCombatStats(attacker).damage;
  }

  // 3. حساب قوة الدفاع (Target Defense)
  let targetDefense = 0;
  if (target.equipment) {
    // لو المضروب هو اللاعب، احسب دفاعه من الدروع
    targetDefense = getCombatStats(target).defense;
  }

  // 4. حساب الضرر النهائي (الضربة - الدفاع)
  // بنستخدم Math.max عشان نضمن إن الضربة متقلش عن 1، عشان مستحيل ضربة تزود دم الخصم!
  let finalDamage = Math.max(1, attackerDamage - targetDefense);

  // =========================================

  // 5. تنفيذ الضربة بالرقم النهائي
  takeDamage(target, finalDamage);
  // 6. طباعة الدم المتبقي
  if (target.resources.health > 0) {
    combatUI.printRestHealth(target);
  } else {
    combatUI.printZeroHealth(target);
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

let startBattle = () => {
  let turn = rolling();
  if (turn) {
    return "enemy";
  } else {
    return "player";
  }
};

let battle = (gamestate, rl, onExit, enemy) => {
  let player = gamestate.player;

  let battleStarter = startBattle(gamestate, enemy);

  gamestate.currentBattle = {
    player,
    enemy,
    battleStarter,
    turnNumber: 1,
  };

  const combatState = gamestate.currentBattle;

  let playerTurn = () => {
    rl.question(combatUI.printChoiceMenu(), (answer) => {
      answer = answer.trim().toLowerCase();

      const playerAttack = () => {
        attack(combatState.player, combatState.enemy);
        if (checkStatus(combatState.enemy)) {
          if (combatState.battleStarter == "player") {
            enemyTurn();
          } else {
            combatState.turnNumber++;
            startTurn();
          }
        } else {
          endBattle(2);
        }
      };

      const combatRoutes = createCombatRoutrt({
        combatState,
        playerAttack,
        inventoryTurn,
        endBattle,
      });
      if (combatRoutes[answer]) {
        combatRoutes[answer]();
      } else {
        combatUI.printWrongInput();
        playerTurn();
      }
    });
  };

  let enemyTurn = () => {
    attack(combatState.enemy, combatState.player);
    if (checkStatus(combatState.player)) {
      if (combatState.battleStarter == "enemy") {
        playerTurn();
      } else {
        combatState.turnNumber++;
        startTurn();
      }
    } else {
      endBattle(3);
    }
  };

  let inventoryTurn = () => {
    if (showInventoryBattle(combatState.player) === false) {
      combatUI.printInvalidItem();
      playerTurn();
    } else {
      showInventoryBattle(combatState.player);
      rl.question(combatUI.printChoiceItem(), (answer) => {
        answer = Number(answer);
        let used = getItem(combatState.player, answer);
        if (!used) {
          inventoryTurn();
          return;
        }
        if (combatState.battleStarter == "player") {
          enemyTurn();
        } else {
          combatState.turnNumber++;
          startTurn();
        }
      });
    }
  };

  let endBattle = (status) => {
    if (status === 1) {
      // player escaped
      const penalty = randomNumber(1, 2);
      combatUI.printEscaped(combatState, penalty);
      gamestate.travel.remainingSteps += penalty;
      gamestate.currentBattle = null;
      onExit();
      return;
    } else if (status === 2) {
      // player won -- enemy died
      combatUI.printWon(combatState);
      loot(combatState.player, combatState.enemy.loot.coins);
      combatState.player.progression.exp += combatState.enemy.loot.exp;
      leveling(combatState.player);
      dropItem(combatState.player, combatState.enemy);
      if (
        combatState.player.resources.health <=
        combatState.player.resources.maxHealth / 2
      ) {
        combatUI.printTip();
      }
      gamestate.currentBattle = null;
      if (checkStatus(combatState.player)) {
        rl.question(combatUI.printContinueMenu(), () => {
          onExit();
        });
        return;
      } else {
        combatUI.printLost(combatState.player);
        process.exit(0);
      }
    } else if (status === 3) {
      // player died -- game over
      combatUI.printDefeated(combatState.player, combatState.enemy);
      gamestate.currentBattle = null;
      process.exit(0);
    }
  };

  if (combatState.turnNumber === 1) {
    combatUI.printTurnOne(combatState.enemy);
    if (combatState.battleStarter == "enemy") {
      combatUI.printEnemyStart();
    } else {
      combatUI.printPlayerStart();
    }
  }

  let startTurn = () => {
    combatUI.printStartTurnPrint(combatState);

    if (combatState.battleStarter == "enemy") {
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
