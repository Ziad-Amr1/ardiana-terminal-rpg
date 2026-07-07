function restoreHealth(target, power) {
  if (power === "MX") {
    power = target.resources.maxHealth - target.resources.health;
  }

  let neededHealth = target.resources.maxHealth - target.resources.health;
  if (target.resources.health < target.resources.maxHealth) {
    target.resources.health += power;
    if (target.resources.health > target.resources.maxHealth) {
      target.resources.health = target.resources.maxHealth;
    }
    if (neededHealth >= power) {
      console.log(`❤️ ${target.info.name} Restored  ${power} HP`);
    } else {
      console.log(`❤️ ${target.info.name} Restored  ${neededHealth} HP`);
    }
  }
}

function restoreMana(target, power) {
  if (power === "MX") {
    power = target.resources.maxMana - target.resources.mana;
  }

  let neededMana = target.resources.maxMana - target.resources.mana;
  if (target.resources.mana < target.resources.maxMana) {
    target.resources.mana += power;
    if (target.resources.mana > target.resources.maxMana) {
      target.resources.mana = target.resources.maxMana;
    }
    if (neededMana >= power) {
      console.log(`💧 ${target.info.name} Restored  ${power} MP`);
    } else {
      console.log(`💧 ${target.info.name} Restored  ${neededMana} MP`);
    }
  }
}

function restoreStamina(target, power) {
  if (power === "MX") {
    power = target.resources.maxStamina - target.resources.stamina;
  }

  let neededStamina = target.resources.maxStamina - target.resources.stamina;
  if (target.resources.stamina < target.resources.maxStamina) {
    target.resources.stamina += power;
    if (target.resources.stamina > target.resources.maxStamina) {
      target.resources.stamina = target.resources.maxStamina;
    }
    if (neededStamina >= power) {
      console.log(`💪 ${target.info.name} Restored  ${power} Stamina`);
    } else {
      console.log(`💪 ${target.info.name} Restored  ${neededStamina} Stamina`);
    }
  }
}


let getCombatStats = (player) => {
  `
  what we need?
  - Damage
  - Crit Chance
  - Crit Damage
  - Drop Rate
  - Defense
  `;
  let baseStats = player.base_stats;
  let baseDamage = player.combat.damage;
  let baseCritChance = player.combat.critChance;
  let baseCritDamage = player.combat.critDamage;
  let equipmentStats = player.equipment;
  let weaponDamage = equipmentStats.weapon?.statsBonus?.damage || 0;
  let weaponCritChance = equipmentStats.weapon?.statsBonus?.critChance || 0;
  let weaponCritDamage = equipmentStats.weapon?.statsBonus?.critDamage || 0;
  let equipmentDR =
    (equipmentStats.armor?.statsBonus?.dropRate || 0) +
    (equipmentStats.accessory?.statsBonus?.dropRate || 0);
  let equipmentDEF =
    (equipmentStats.armor?.statsBonus?.defense || 0) +
    (equipmentStats.accessory?.statsBonus?.defense || 0);

  let damage = baseDamage + baseStats.STR + weaponDamage;
  let critChance = baseCritChance + baseStats.DEX + weaponCritChance;
  let critDamage = damage * 1.5 + weaponCritDamage;
  let dropRate = (baseStats.LUK + equipmentDR) / 100;
  let defense = baseStats.VIT + equipmentDEF;

  return {
    damage,
    critChance,
    critDamage,
    dropRate,
    defense,
  };
};

let maxHealth = (player) => {
  return (player.resources.maxHealth = player.base_stats.VIT * 2);
};

let maxMana = (player) => {
  return (player.resources.maxMana = player.base_stats.WIS * 2);
};

module.exports = {
  restoreHealth,
  restoreMana,
  restoreStamina,
  getCombatStats,
  maxHealth,
  maxMana,
};
