// ./utitls/UIHelper.js
// =========== UI HELPERS ===========
let printDivider = () => {
    console.log(`
========================
`);
};


let printMenu = () => {
  return `
========================
        MAIN MENU
========================

[W] Move North
[H] Inventory
[L] Level & Stats
[T] Rest
[Q] Save & Quit

========================
`;
};

let printMenuCity = () => {
  return `
========================
        CITY MENU
========================

[W] Travel
[S] Shop
[R] Rest At Inn
[B] Blacksmith
[N] NPCs
[L] Stats
[Q] Quit

========================
`;
};

let printSaveMenu = () => {
  console.log( `
========================
        SAVE MENU
========================

[S] Save Game
[L] Load Game
[Q] Quit

`);
};

let printLoadMenu = () => {
  printspace();
  console.log( `
========================
      ARDIANA
========================

[1] New Game
[2] Load Game
[Q] Quit

`);};


let printTitle = (title) => {
  console.log(`
========================
        ${title}
========================
`);
};

let printspace = () => {
  console.log();
};

let printInvalidInput = () => {
  printspace();
  console.log("❌ Invalid Input");
  printspace();
};

let printNoSaveFile = () => {
  printspace();
  console.log("❌ No save file found.");
};

let printSaveLoaded = () => {
  printspace();
  console.log("💾 Save Loaded Successfully.");
  printspace();
};

let printLeaveGame = () => {
  console.log("Disconnecting from system...");
};

module.exports = {
  printDivider,
  printMenu,
  printMenuCity,
  printSaveMenu,
  printLoadMenu,
  printTitle,
  printspace,
  printInvalidInput,
  printNoSaveFile,
  printSaveLoaded,
  printLeaveGame,
};
