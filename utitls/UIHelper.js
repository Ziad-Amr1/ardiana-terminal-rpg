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
  console.log( `
========================
      ARDIANA
========================

[1] New Game
[2] Load Game
[Q] Quit

`);};

let printCombatHUD = (player, enemy) => {
  console.log(`
========================
⚔️ COMBAT STATUS
========================

${player.info.name}
❤️ HP: ${player.resources.health}/${player.resources.maxHealth}

${enemy.info.name}
❤️ HP: ${enemy.resources.health}/${enemy.resources.maxHealth}

========================
`);
};


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

module.exports = {
  printDivider,
  printMenu,
  printMenuCity,
  printCombatHUD,
  printSaveMenu,
  printLoadMenu,
  printTitle,
  printspace
};
