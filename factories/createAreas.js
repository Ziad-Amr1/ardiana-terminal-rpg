let allInGameAreas = [];

let createArea = (id, name, description, min, max, enemies, connections, encounterChance,) => {
  let obj = {
    id,
    name,
    description,
    levelRange: {
      min,
      max,
    },
    enemies,
    connections,
    encounterChance,
  };
  allInGameAreas.push(obj);
  return obj;
};

module.exports = { allInGameAreas, createArea };