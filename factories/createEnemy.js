

let allInGameEnemies = [];

let createEnemy = (na, hp, dmg, coins, exp, items) => {
  let obj = {
    name: na,
    health: hp,
    maxHealth: hp,
    damage: dmg,
    loot: {
      coins: coins,
      exp: exp,
      items: items,
    },
  };
  allInGameEnemies.push(obj);
  return obj;
};


module.exports = { allInGameEnemies, createEnemy };