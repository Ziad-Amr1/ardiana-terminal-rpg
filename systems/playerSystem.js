function healing(target, power) {
  if (target.health < target.maxHealth) {
    target.health += power;
    if (target.health > target.maxHealth) {
      target.health = target.maxHealth;
    }

    console.log(`${target.name} healed by ${power}`);
  }
}

module.exports = { healing };