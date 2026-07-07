// ./utitls/UIHelper.js
const {
  error,
  success,
  title,
  menuKeys,
} = require("./colorSystem");

// =========== UI HELPERS ===========
let printDivider = () => {
  console.log(`
========================
`);
};

const renderHeader = (text) => {
  const titleText = title(text);

  return `========================
        ${titleText}
========================`;
};

const printTitle = (text) => {
  console.log(renderHeader(text));
};

const renderKeys = (text) => {
  return text.replace(/\[[A-Z0-9]\]/g, (match) => menuKeys(match));
};

let renderMenu = () => {
  return `
${renderHeader("MENU")}
${renderKeys(`
[W] Move North
[H] Inventory
[L] Level & Stats
[T] Rest
[Q] Save & Quit`)}

========================
`;
};

let renderMenuCity = () => {
  return `
${renderHeader("CITY MENU")}
${renderKeys(`
[W] Travel
[S] Shop
[R] Rest At Inn
[B] Blacksmith
[N] NPCs
[L] Stats
[Q] Quit`)}

========================
`;
};

let printSaveMenu = () => {
  console.log(`
${renderHeader("SAVE MENU")}
${renderKeys(`
[S] Save Game
[L] Load Game
[Q] Quit`)}

========================

`);
};

let printLoadMenu = () => {
  // why this ARDIANA?
  console.log(`
${renderHeader("ARDIANA")}
${renderKeys(`
[1] New Game
[2] Load Game
[Q] Quit`)}

========================

`);
};

let printspace = () => {
  console.log();
};

let printError = (message) => {
  printspace();
  console.log(error(`❌ ${message}`));
  printspace();
};

let printSaveLoaded = () => {
  printspace();
  console.log(success("💾 Save Loaded Successfully."));
  printspace();
};

let printLeaveGame = () => {
  console.log("Disconnecting from system...");
};

module.exports = {
  printDivider,
  renderMenu,
  renderMenuCity,
  printSaveMenu,
  printLoadMenu,
  printTitle,
  printspace,
  printError,
  printSaveLoaded,
  printLeaveGame,
  renderKeys,
  renderHeader, 
};
