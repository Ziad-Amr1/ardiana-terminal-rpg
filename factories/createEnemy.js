let allInGameEnemies = [];

let createEnemy = (id, name, health, damage, coins, exp, loot, area_id) => {
  let obj = {
    id,
    info: {
      name,
    },
    resources: {
      health,
      maxHealth: health,
    },
    combat: {
      damage,
      critChance: 5,
      critDamage: 1.5*damage,
    },
    loot: {
      exp,
      coins,
      items: loot,
    },
    area_id
  };
  allInGameEnemies.push(obj);
  return obj;
};

module.exports = { allInGameEnemies, createEnemy };