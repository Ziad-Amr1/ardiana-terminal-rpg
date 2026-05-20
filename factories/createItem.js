let allInGameItems = [];

let createItem = (id, name, description, category, value, effect) => {
  let obj = {
    id,
    name,
    description,
    category,
    value,
    effect
  };
  allInGameItems.push(obj);
  return obj;
};

module.exports = { allInGameItems, createItem };