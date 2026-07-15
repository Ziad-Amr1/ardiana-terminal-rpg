// ./app.js
// =========== IMPORTS ===========
const gamestate = require("./state/gameState");
const { battle } = require("./systems/combatSystem");
const { showInventory, openInventory } = require("./systems/inventorySystem");
const { showLevel } = require("./systems/levelSystem");
const { choiceEnemy } = require("./systems/spawningSystem");
const { getCurrentArea } = require("./systems/areaSystem");
const {
  saveGamestate,
  loadGamestate,
  saveExists,
} = require("./systems/saveSystem");
const { movePlayer } = require("./systems/areaSystem");
const {
  renderCharacterIntro,
  characterStatsWindow,
} = require("./utils/renderCharacterIntro");
const {
  renderMenu,
  renderMenuCity,
  printspace,
  printLoadMenu,
  printError,
  printSaveLoaded,
  printLeaveGame,
  renderBackPrompt,
} = require("./utils/UIHelper");
const { rest } = require("./systems/restSystem");
const { startDialogue } = require("./systems/dialogueSystem");
const readline = require("readline");
const fs = require("fs");
const createMainMenuRouter = require("./routers/mainMenuRouter");

// =========== GAME DATA ===========
require("./data/enemies");
require("./data/items");
require("./data/areas");

// =========== READ FILES ===========
const msg = fs.readFileSync("./data/startmsg.txt", "utf8");
const msg2 = fs.readFileSync("./data/startmsg_2.txt", "utf8");

// =========== READLINE ===========
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// =========== MAIN MENU ===========
let getMenu = () => {
  const currentArea = getCurrentArea();

  if (currentArea.type === "city") {
    return renderMenuCity();
  }

  return renderMenu();
};

// =========== MAIN ===========
let main = () => {
  // =========== MAIN MENU ===========
  let mainMenu = () => {
    rl.question(getMenu(), (answer) => {
      answer = answer.trim().toLowerCase();

      // =========== Routes ==============
      const routes = createMainMenuRouter({
        gamestate,
        rl,
        mainMenu,
        movePlayer,
        battle,
        showLevel,
        characterStatsWindow,
        rest,
        startDialogue,
        saveGamestate,
        printspace,
        choiceEnemy,
        getCurrentArea,
        showInventory,
        renderBackPrompt,
        openInventory,
      });

      if (routes[answer]) {
        routes[answer]();
        // =========== INVALID ===========
      } else {
        printError("Invalid Input");

        mainMenu();
      }
    });
  };

  // =========== NEW GAME ===========

  let startupMenu = () => {
    printLoadMenu();

    rl.question("> ", (answer) => {
      answer = answer.trim().toLowerCase();

      // ========== NEW GAME ==========
      if (answer === "1") {
        console.log(msg);
        renderCharacterIntro(gamestate.player);
        console.log(msg2);

        mainMenu();

        // ========== LOAD GAME ==========
      } else if (answer === "2") {
        if (!saveExists()) {
          printError("No save file found.");
          startupMenu();

          return;
        }

        loadGamestate();

        printSaveLoaded();

        mainMenu();

        // ========== QUIT ==========
      } else if (answer === "q") {
        printLeaveGame();
        process.exit(0);

        // ========== INVALID ==========
      } else {
        printError("Invalid Input");
        startupMenu();
      }
    });
  };

  startupMenu();
};

main();
