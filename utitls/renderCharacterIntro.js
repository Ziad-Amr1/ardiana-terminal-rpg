const gamestate = require("../state/gameState");
let player = gamestate.player;

let renderCharacterIntro = () => {
console.log(`

Name: ${player.info.name}
Health: ${player.resources.health}/${player.resources.maxHealth}
Mana: ${player.resources.mana}/${player.resources.maxMana}
Stamina: ${player.resources.stamina}/${player.resources.maxStamina}
Coins: ${player.economy.coins}
Level: ${player.progression.level}
EXP: ${player.progression.exp}/${player.progression.expRequired}

🎒 Inventory:
${player.inventory.map((item) => item.name).join(", ") || "(Empty)"}

`);
};

module.exports = { renderCharacterIntro };