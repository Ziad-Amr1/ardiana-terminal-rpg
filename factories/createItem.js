let allInGameItems = [];

let createItem = (na, des, cat, va, eff) => {
  let obj = {
    name: na,
    description: des,
    category: cat,
    value: va,
    effect: eff,
  };
  allInGameItems.push(obj);
  return obj;
};

module.exports = { allInGameItems, createItem };