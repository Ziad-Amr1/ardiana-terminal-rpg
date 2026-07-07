// =========== Routes ==============
const createMainMenuRouter = (prep) => {
  return {
    w: () => {
      const result = prep.movePlayer("north");

      // encounter happened
      if (result === "encounter") {
        const enemy = prep.choiceEnemy(prep.getCurrentArea());
        prep.battle(prep.gamestate, prep.rl, prep.mainMenu, enemy);
        return;
      }

      prep.mainMenu();
    },
    h: () => {
      prep.showInventory(prep.gamestate.player);

      prep.mainMenu();
    },
    l: () => {
      prep.showLevel(prep.gamestate);
      prep.characterStatsWindow(prep.gamestate.player);

      prep.mainMenu();
    },
    t: () => {
      prep.rest(prep.gamestate, prep.rl, prep.mainMenu);
    },
    s: () => {
      prep.startDialogue(
        "merchant_greeting",
        prep.rl,
        prep.mainMenu,
        prep.gamestate,
      );
    },
    b: () => {
      prep.startDialogue(
        "blacksmith_greeting",
        prep.rl,
        prep.mainMenu,
        prep.gamestate,
      );
    },
    q: () => {
      prep.rl.question("Do you want to save your progress? Y/N ", (answer) => {
        answer = answer.trim().toLowerCase();

        // save game
        if (answer === "y") {
          prep.saveGamestate(prep.gamestate);

          prep.printspace();
          console.log("💾 Game Saved Successfully.");
          console.log("Disconnecting from system...");
          console.log("Goodbye.");

          process.exit(0);

          // quit without save
        } else if (answer === "n") {
          prep.printspace();
          console.log("Disconnecting from system...");
          console.log("Goodbye.");

          process.exit(0);

          // invalid input
        } else {
          prep.printspace();
          console.log("❌ Invalid Input");
          prep.printspace();

          prep.mainMenu();
        }
      });
    },
  };
};

module.exports = createMainMenuRouter;
