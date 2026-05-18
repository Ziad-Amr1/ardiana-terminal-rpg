// =========== IMPORTS ===========
const playerData = require("./data/player");
const { choiceEnemy, battle, checkStatus } = require("./systems/combatSystem");
const { showInventory } = require("./systems/inventorySystem");
const { showLevel } = require("./systems/levelSystem");
const { savePlayer, loadPlayer } = require("./systems/saveSystem");
const readline = require("readline");
const fs = require("fs");

const msg = fs.readFileSync("./data/startmsg.txt", "utf8");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

require("./data/enemies");
require("./data/items");

let player = playerData.player;

// =========== MAIN ===========
let main = () => {
  console.log(`${msg}`);

  let mainMenu = () => {
    rl.question("Choose an action: ", (answer) => {
      answer = answer.trim().toLowerCase();

      if (answer === "w") {
        console.log("\n⬆️ You moved north...\n");

        battle(player, mainMenu);
      } else if (answer === "h") {
        showInventory(player);
        mainMenu();
      } else if (answer === "l") {
        showLevel(player);
        mainMenu();
      } else if (answer === "q") {
        rl.question("Do you want to save your progress? Y/N ", (answer) => {
          answer = answer.trim().toLowerCase();

          if (answer === "y") {
            savePlayer(player);

            console.log("\n💾 Game Saved Successfully.");
            console.log("Disconnecting from system...\nGoodbye.");

            process.exit(0);
          } else if (answer === "n") {
            console.log("\nDisconnecting from system...\nGoodbye.");

            process.exit(0);
          } else {
            console.log("\n❌ Invalid Input\n");

            mainMenu();
          }
        });
      } else {
        console.log("\n❌ Invalid Input\n");

        mainMenu();
      }
    });
  };

  mainMenu();
};

main();
