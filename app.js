// =========== IMPORTS ===========
const gamestate = require("./state/gameState");
const { battle } = require("./systems/combatSystem");
const { showInventory } = require("./systems/inventorySystem");
const { showLevel } = require("./systems/levelSystem");
const { choiceEnemy } = require("./systems/spawningSystem");
const { getCurrentArea } = require("./systems/areaSystem");
const { saveGamestate, loadGamestate } = require("./systems/saveSystem");
const { movePlayer } = require("./systems/areaSystem");
const { renderCharacterIntro } = require("./utitls/renderCharacterIntro");
const { printMenu, printspace } = require("./utitls/UIHelper");
const readline = require("readline");
const fs = require("fs");

// =========== GAME DATA ===========
require("./data/enemies");
require("./data/items");
require("./data/areas");

// =========== READ FILES ===========
const msg = fs.readFileSync("./data/startmsg.txt", "utf8");
const msg2 = fs.readFileSync("./data/startmsg_2.txt", "utf8");
const gameStateFileLoad = fs.readFileSync("./data/gamestate.json", "utf8");

// =========== READLINE ===========
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// =========== MAIN MENU ===========
let menuMsg = printMenu();

// =========== MAIN ===========
let main = () => {
  // =========== MAIN MENU ===========
  let mainMenu = () => {
    rl.question(menuMsg, (answer) => {
      answer = answer.trim().toLowerCase();

      // =========== MOVE ===========
      if (answer === "w") {
        const result = movePlayer("north");

        // encounter happened
        if (result === "encounter") {
          const enemy = choiceEnemy(getCurrentArea());
          battle(gamestate, rl, mainMenu, enemy);
          return;
        }

        mainMenu();

        // =========== INVENTORY ===========
      } else if (answer === "h") {
        showInventory(gamestate.player);

        mainMenu();

        // =========== LEVEL ===========
      } else if (answer === "l") {
        showLevel(gamestate);

        mainMenu();

        // =========== QUIT ===========
      } else if (answer === "q") {
        rl.question("Do you want to save your progress? Y/N ", (answer) => {
          answer = answer.trim().toLowerCase();

          // save game
          if (answer === "y") {
            saveGamestate(gamestate);

            printspace();
            console.log("💾 Game Saved Successfully.");
            console.log("Disconnecting from system...");
            console.log("Goodbye.");

            process.exit(0);

            // quit without save
          } else if (answer === "n") {
            printspace();
            console.log("Disconnecting from system...");
            console.log("Goodbye.");

            process.exit(0);

            // invalid input
          } else {
            printspace();
            console.log("❌ Invalid Input");
            printspace();

            mainMenu();
          }
        });

        // =========== INVALID ===========
      } else {
        printspace();
        console.log("❌ Invalid Input");
        printspace();

        mainMenu();
      }
    });
  };

  // =========== NEW GAME ===========
  if (gameStateFileLoad.trim() === "") {
    console.log(msg);

    renderCharacterIntro();

    console.log(msg2);

    mainMenu();

    // =========== LOAD GAME ===========
  } else {
    loadGamestate();

    printspace();
    console.log("💾 Save Loaded Successfully.");
    printspace();

    mainMenu();
  }
};

main();
