// ========== LEVELING SYSTEM ===========
function leveling(target) {
  while (target.exp >= target.exp_required) {
    if (target.exp >= target.exp_required) {
      target.level += 1;
      target.exp -= target.exp_required;
      target.exp_required = expRquirement(target);
      console.log(`${target.name} level increased`);
    } else {
      console.log(`${target.name} need ${target.exp_required - target.exp} EXP to level up`);
    }
  }
}
function expRquirement(target) {
  // exp requirement is 1.5 * level
  let baseLevel = 100;
  let increasePerLevel = 1.5;
  let exp_required = Math.floor(baseLevel + target.level * increasePerLevel);
  return exp_required;
};

const showLevel = (target) => {
  let requiredExp = expRquirement(target);
  console.log(`
    exp: ${target.exp}
    level: ${target.level}
    exp required: ${requiredExp}
  `);
};
module.exports = { leveling, showLevel };