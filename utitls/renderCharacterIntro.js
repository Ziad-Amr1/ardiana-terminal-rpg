const gamestate = require("../state/gameState");
const { getCombatStats } = require("../systems/playerSystem");

let renderCharacterIntro = (player) => {
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

let characterStatsWindow = (player) => {
  // 1. بننادي على الحسابات المعقدة ونخزنها في متغير
  let combatStats = getCombatStats(player);

  // 2. بنرسم الواجهة (UI)
  console.log(`
  =========================================
          🧑 Player: ${player.info.name} 
  =========================================
  [ 🩸 Main Resources ]
  ❤️ Health:  ${player.resources.health}/${player.resources.maxHealth}
  🔵 Mana:    ${player.resources.mana}/${player.resources.maxMana}
  🟢 Stamina: ${player.resources.stamina}/${player.resources.maxStamina}

  [ ⭐ player Progression ]
  📈 Level: ${player.progression.level}  (EXP: ${player.progression.exp}/${player.progression.expRequired})
  💰 Coins: ${player.economy.coins}

  [ 🧬 Base Stats ]
  💪 STR: ${player.base_stats.STR}  |  🛡️ VIT: ${player.base_stats.VIT}  |  🧠 WIS: ${player.base_stats.WIS}
  🏃 DEX: ${player.base_stats.DEX}  |  🍀 LUK: ${player.base_stats.LUK}

  [ ⚔️ Combat Stats ]
  🗡️ Damage:      ${combatStats.damage}
  🛡️ Defense:     ${combatStats.defense}
  🎯 Crit Chance: ${combatStats.critChance}%
  💥 Crit Damage: ${combatStats.critDamage}
  ✨ Drop Rate:   ${(combatStats.dropRate * 100).toFixed(0)}%

  [ 🛡️ Equipment ]
  🗡️ Weapon:    ${player.equipment.weapon?.name || "(None)"}
  👕 Armor:     ${player.equipment.armor?.name || "(None)"}
  💍 Accessory: ${player.equipment.accessory?.name || "(None)"}

  [ 🎒 Inventory ]
  ${player.inventory.map((item) => {
      // لمسة جمالية: لو العنصر بيتراكم نطبع كميته
      return item.stackable ? `${item.name} (x${item.quantity})` : item.name;
  }).join(", ") || "(Empty)"}
  =========================================
  `);
};


module.exports = { renderCharacterIntro, characterStatsWindow };
