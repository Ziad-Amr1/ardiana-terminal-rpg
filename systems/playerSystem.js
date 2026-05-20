function restoreMana(target, power) {
  if (target.resources.mana < target.resources.maxMana) {
    target.resources.mana += power;
    if (target.resources.mana > target.resources.maxMana) {
      target.resources.mana = target.resources.maxMana;
    }

    console.log(`💧 ${target.info.name} Restored  ${power} MP`);
  }
}

function restoreStamina(target, power) {
  if (target.resources.stamina < target.resources.maxStamina) {
    target.resources.stamina += power;
    if (target.resources.stamina > target.resources.maxStamina) {
      target.resources.stamina = target.resources.maxStamina;
    }

    console.log(`💪 ${target.info.name} Restored  ${power} Stamina`);
  }
}

function restoreHealth(target, power) {
  if (target.resources.health < target.resources.maxHealth) {
    target.resources.health += power;
    if (target.resources.health > target.resources.maxHealth) {
      target.resources.health = target.resources.maxHealth;
    }

    console.log(`❤️ ${target.info.name} Restored  ${power} HP`);
  }
}

module.exports = { 
  restoreHealth,
  restoreMana,
  restoreStamina,
 };
