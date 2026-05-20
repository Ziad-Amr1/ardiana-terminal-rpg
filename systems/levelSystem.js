// ========== LEVELING SYSTEM ===========
function leveling(target) {
  while (target.progression.exp >= target.progression.expRequired) {
      target.progression.level += 1;
      target.progression.exp -= target.progression.expRequired;
      target.progression.expRequired = expRequirement(target);
      console.log(`${target.info.name} level increased`);
    }
  console.log(`${target.info.name} need ${target.progression.expRequired - target.progression.exp} EXP to level up`);
};

function expRequirement(target) {
  const level = target.progression.level;

  if (level === 1) {
    return 100;
  }

  let expRequired = 100;

  for (let i = 1; i < level; i++) {
    let tier = Math.floor(i / 10);

    let multiplier = 1.25 + (tier * 0.05);

    expRequired = Math.floor(expRequired * multiplier);
  }

  return expRequired;
};

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