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
[Q] Save & Quit

========================
`;
};

let printTitle = (title) => {
  console.log(`
========================
        ${title}
========================
`);
};

let printspace = () => {
  console.log(``);
};

module.exports = { printDivider, printMenu, printTitle, printspace };