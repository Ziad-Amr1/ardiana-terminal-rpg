const randomNumber = require("../utitls/randoms");
const {   restoreHealth,
  restoreMana,
  restoreStamina,
  getCombatStats,
  maxHealth,
  maxMana, } = require("./playerSystem");

// ========== LEVELING SYSTEM ===========
function leveling(target) {
  while (target.progression.exp >= target.progression.expRequired) {
    target.progression.level += 1;
    target.progression.exp -= target.progression.expRequired;
    target.progression.expRequired = expRequirement(target);
    console.log(`${target.info.name} level increased`);
    if (target.progression.level % 5 === 0) {
      target.progression.statsPoints += 5;
      console.log(`${target.info.name} gained 5 stats points`);
    } else {
      let gained = {
        STR: 0,
        VIT: 0,
        WIS: 0,
        DEX: 0,
        LUK: 0,
      };
      for (let i = 0; i < 5; i++) {
        let choice = randomNumber(1, 100);
        if (choice <= 20) {
          target.base_stats.STR += 1;
          gained.STR += 1;
        } else if (choice <= 40) {
          target.base_stats.VIT += 1;
          gained.VIT += 1;
        } else if (choice <= 60) {
          target.base_stats.WIS += 1;
          gained.WIS += 1;
        } else if (choice <= 80) {
          target.base_stats.DEX += 1;
          gained.DEX += 1;
        } else {
          target.base_stats.LUK += 1;
          gained.LUK += 1;
        }
      }
      let printArray = [];
      if (gained.STR > 0) printArray.push(`+${gained.STR} STR`);
      if (gained.VIT > 0) printArray.push(`+${gained.VIT} VIT`);
      if (gained.WIS > 0) printArray.push(`+${gained.WIS} WIS`);
      if (gained.DEX > 0) printArray.push(`+${gained.DEX} DEX`);
      if (gained.LUK > 0) printArray.push(`+${gained.LUK} LUK`);
      // Is this list compresshion?
      
      console.log(`📈 Stats Increased: ${printArray.join(" | ")}`);
      if (gained.VIT > 0) {
        maxHealth(target);
      }
      if (gained.WIS > 0) {
        maxMana(target);
      }
    }
    restoreHealth(target, "MX");
    restoreMana(target, "MX");
    restoreStamina(target, "MX");
  }
  console.log(
    `${target.info.name} need ${target.progression.expRequired - target.progression.exp} EXP to level up`,
  );
}

function expRequirement(target) {
  const level = target.progression.level;

  if (level === 1) {
    return 100;
  }

  let expRequired = 100;

  for (let i = 1; i < level; i++) {
    let tier = Math.floor(i / 10);

    let multiplier = 1.25 + tier * 0.05;

    expRequired = Math.floor(expRequired * multiplier);
  }

  return expRequired;
}

const showLevel = (gamestate) => {
  let player = gamestate.player;
  let requiredExp = expRequirement(player);
  console.log(`
    exp: ${player.progression.exp}
    level: ${player.progression.level}
    exp required: ${requiredExp}
  `);
};
module.exports = { leveling, showLevel };
