const { printTitle } = require("../utitls/UIHelper");
const { restoreMana, restoreStamina, restoreHealth } = require("./playerSystem");
// const { encounterCheck } = require("./encounterSystem");

// ========== REST SYSTEM ===========
let msg = 
`How long do you want to rest?

[1] Short Rest (1 hour)
[2] Medium Rest (4 hours)
[3] Full Rest (8 hours)
[C] Cancel`;


let rest = (gameState, rl, onComplete) => {
  let player = gameState.player;
  rl.question( msg , (answer) => {
    if (answer === "c") {
      console.log("Okay, you cancel the rest.");
      onComplete();
      return;
    }

    Number(answer); 
    let hours;
    
    if (answer === "1") {
      hours = 1;
    } else if (answer === "2") {
      hours = 4;
    } else if (answer === "3") {
      hours = 8;
    } else {
      console.log("❌ Invalid rest time.");
      rest(gameState, rl, onComplete);
      return;
    }

      let restoreAmount = hours * 2;

      printTitle("💤 You rest");

      restoreHealth(player, restoreAmount);
      restoreMana(player, restoreAmount);
      restoreStamina(player, restoreAmount);

      console.log(`You rest for ${hours} hours and regain ${restoreAmount} health.`);

      onComplete();


  });
};

module.exports = {
  rest,
};