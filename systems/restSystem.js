const { printTitle, printspace } = require("../utils/UIHelper");

const {
  restoreMana,
  restoreStamina,
  restoreHealth,
} = require("./playerSystem");

const { encounterCheck } = require("./encounterSystem");

const {
  areaEncounterChance,
  getCurrentArea,
} = require("./areaSystem");

const { battle } = require("./combatSystem");

const { choiceEnemy } = require("./spawningSystem");

// ========== REST SYSTEM ==========

let msg = `How long do you want to rest?

[1] Short Rest (1 hour)
[2] Medium Rest (4 hours)
[3] Full Rest (8 hours)
[C] Cancel

`;

let rest = (gameState, rl, onComplete) => {

  let player = gameState.player;

  // ========== START REST ==========
  const startRest = () => {

    printspace();
    printTitle("💤 You rest");

    let completedHours = 0;

    for (let i = 0; i < hours; i++) {

      restoreHealth(player, 2);
      restoreMana(player, 2);
      restoreStamina(player, 2);

      completedHours++;

      const interrupted =
        encounterCheck(areaEncounterChance() * 0.35);

      if (interrupted) {

        printspace();

        console.log(
          "⚠️ Your rest was interrupted by a hostile presence!"
        );

        printspace();

        const enemy =
          choiceEnemy(getCurrentArea());

        console.log(
          `⚔️ ${enemy.info.name} attacked your camp!`
        );

        battle(gameState, rl, onComplete, enemy);

        return;
      }
    }

    printspace();

    console.log(
      `💤 You rested for ${completedHours} hours.`
    );

    onComplete();
  };

  rl.question(msg, (answer) => {

    answer = answer.trim().toLowerCase();

    if (answer === "c") {

      console.log("Okay, you cancel the rest.");

      onComplete();
      return;
    }

    let hours;

    if (answer === "1") {

      hours = 1;

    } else if (answer === "2") {

      hours = 4;

    } else if (answer === "3") {

      hours = 8;

    } else {

      console.log("❌ Invalid rest time.");

      rest(gameState, rl, onComplete);

      return;
    }

    const missingHealth =
      player.resources.maxHealth
      - player.resources.health;

    // already full HP
    if (missingHealth === 0) {

      console.log(
        "✨ You are already fully rested."
      );

      onComplete();

      return;
    }

    const possibleHealing = hours * 2;

    // overheal warning
    if (possibleHealing > missingHealth) {

      const warningMsg = `⚠️ You are not heavily injured.

A full rest may waste valuable recovery time.

You only need ${missingHealth} HP,
but this rest can restore up to ${possibleHealing} HP.

Are you sure you want to continue?

[Y] Yes
[N] No

`;

      rl.question(warningMsg, (confirmAnswer) => {

        confirmAnswer =
          confirmAnswer.trim().toLowerCase();

        if (confirmAnswer === "y") {

          startRest();

        } else if (confirmAnswer === "n") {

          console.log(
            "Okay, you cancel the rest."
          );

          onComplete();

        } else {

          console.log("❌ Invalid input.");

          rest(gameState, rl, onComplete);
        }
      });

      return;
    }

    startRest();
  });
};

module.exports = {
  rest,
};