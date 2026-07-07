// =========== Routes ==============
const createCombatRoutrt = (prep) => {
  return {
    a: () => prep.playerAttack(),
    h: () => prep.inventoryTurn(),
    r: () => prep.endBattle(1),
  };
};

module.exports = createCombatRoutrt;
