const gamestate = require("../state/gameState");
const { allInGameAreas } = require("../factories/createAreas");
const {  printspace } = require("../utitls/UIHelper");
const { encounterCheck } = require("./encounterSystem");

// =========== AREA SYSTEM ===========

let getCurrentArea = () => {
  return allInGameAreas.find(
    (area) => area.id === gamestate.player.area_id
  );
};

// const getArea = () => {
//   let areaId = getCurrentArea();
//   let area = allInGameAreas.find((area) => area.id === areaId);
//   return area;
// };

let areaEncounterChance = () => {
  let currentArea = getCurrentArea();

  return currentArea.encounterChance;
};

// =========== MOVE / TRAVEL ===========
function movePlayer(direction) {
  const currentArea = getCurrentArea();
  // =========== CONTINUE TRAVEL ===========
  if (gamestate.travel.remainingSteps > 0) {
    gamestate.travel.remainingSteps--;

    printspace();
    console.log(
      `🛣️ Traveling... ${gamestate.travel.remainingSteps} steps remaining.`,
    );

    // random encounter
    const encountered = encounterCheck(
      areaEncounterChance()
    );

    if (encountered) {
      return "encounter";
    }

    // player arrived
    if (gamestate.travel.remainingSteps === 0) {
      gamestate.player.area_id = gamestate.travel.destination;

      printspace();
      console.log("📍 You arrived at your destination.");
      printspace();

      // reset travel state
      gamestate.travel.destination = null;
      gamestate.travel.remainingSteps = 0;

      showCurrentArea();

      return "arrived";
    }

    return "traveling";
  }

  // =========== START TRAVEL ===========
  const connection = currentArea.connections[direction];

  if (!connection) {
    console.log("❌ You can't go that way.");
    return "invalid_direction";
  }

  const nextAreaId = connection.areaId;
  const distance = connection.distance;

  // instant travel
  if (distance === 0) {
    gamestate.player.area_id = nextAreaId;

    printspace();
    console.log("📍 You moved to a new area.");
    printspace();

    showCurrentArea();

    return "arrived";
  }

  // start travel
  gamestate.travel.destination = nextAreaId;
  gamestate.travel.remainingSteps = distance;

  printspace();
  console.log(`🛣️ You started traveling to ${nextAreaId}.`);
  console.log(
    `📍 Distance remaining: ${gamestate.travel.remainingSteps} steps.`,
  );

  return "started_travel";
}

// =========== SHOW AREA ===========
let showCurrentArea = () => {
  let currentArea = getCurrentArea();

  if (!currentArea) {
    console.log("❌ You are not in any area.");
    return;
  }

  console.log(currentArea.description);
};




module.exports = {
  getCurrentArea,
  movePlayer,
  showCurrentArea,
  areaEncounterChance
};