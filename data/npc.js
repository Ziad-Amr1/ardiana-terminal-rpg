// { id, role, name, health, coins, area_id }
const NPCs = require("../factories/createNpc");

const JackDaniels = new NPCs.Npc({
  id: 1,
  role: "merchant",
  name: "Jack Daniels",
  health: 100,
  coins: 100,
  area_id: 1,
  inventory: [
  { item_id: "small_health_potion", stock: 50 },
  { item_id: "rusty_iron_sword", stock: 3 },
  ],
});

const FrankTheBlacksmith = new NPCs.Npc({
  id: 2,
  role: "blacksmith",
  name: "Frank the Blacksmith",
  health: 100,
  coins: 100,
  area_id: 1,
});