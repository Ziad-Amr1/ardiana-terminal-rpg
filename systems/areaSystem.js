const gamestate = require("../state/gameState");
const { allInGameAreas } = require("../factories/createAreas");
const { printspace, printTitle } = require("../utils/UIHelper");
const { encounterCheck } = require("./encounterSystem");

// =========== AREA SYSTEM ===========

let getCurrentArea = () => {
  return allInGameAreas.find((area) => area.id === gamestate.player.area_id);
};

// =========== ENCOUNTER CHANCE ===========
let areaEncounterChance = () => {
  const currentArea = getCurrentArea();
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

    // =========== PLAYER ARRIVED ===========
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

    // =========== RANDOM ENCOUNTER ===========
    const encountered = encounterCheck(areaEncounterChance());

    if (encountered) {
      return "encounter";
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

  // =========== BEGIN JOURNEY ===========
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
  const currentArea = getCurrentArea();
  if (!currentArea) {
    console.log("❌ You are not in any area.");
    return;
  }

  currentArea.enterArea();
  if (currentArea.dangerLevel === 0) {
    console.log("This is a safe area.");
  } else {
    let dangerLevel = currentArea.dangerLevel;
    if (dangerLevel > 85) {
      console.log("⚠️ Danger Level: Very High");
    } else if (dangerLevel > 70) {
      console.log("⚠️ Danger Level: High");
    } else if (dangerLevel > 50) {
      console.log("⚠️ Danger Level: Medium");
    } else if (dangerLevel > 30) {
      console.log("⚠️ Danger Level: Low");
    } else {
      console.log("⚠️ Danger Level: Very Low");
    }
  }
};

module.exports = {
  getCurrentArea,
  movePlayer,
  showCurrentArea,
  areaEncounterChance,
};
