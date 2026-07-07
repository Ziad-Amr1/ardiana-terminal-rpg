// systems/dialogueSystem.js
// =========== imports ===========
const { dialogues } = require("../data/dialogues");
const { showShop } = require("./shopSystem");
// const { showBlacksmith } = require("./blacksmithSystem");
const { allInGameNpcs } = require("../factories/createNpc");

// ========== system ===========

const startDialogue = async (dialogueId, rl, onExit, gamestate) => {
    await showDialogue(dialogueId);
    await showChoices(dialogueId);
    let totalChoices = dialogues[dialogueId].choices.length;
    const choice = await getChoice(rl, totalChoices);
    const action = await getNextAction(dialogueId, choice);
    await actionListExecutor(dialogueId, action, onExit, rl, gamestate);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const showDialogue = async (x) => {
    const dialogue = dialogues[x];
    // console.log(dialogue.text, "\n");
    for (let char of dialogue.text) {
        process.stdout.write(char);
        await sleep(dialogue.cd);
    };
}

const showChoices = async (x) => {
    const dialogue = dialogues[x];
    for (let i = 0; i < dialogue.choices.length; i++) {
        let choice = dialogue.choices[i];
        console.log(`[${i+1}] ${choice.reply}`);
        await sleep(dialogue.cd);
    }
}

const getNextAction = async (x, choiceIndex) => {
    const dialogue = dialogues[x];
    return dialogue.choices[choiceIndex - 1].nextAction;
}

const actionListExecutor = async (x, action, onExit, rl, gamestate) => {
    if (action === "CLOSE_DIALOGUE") {
        console.log("Dialogue closed.");
        return onExit();
    }

    if (action === "OPEN_SHOP") {
        let npcId = dialogues[x].npcId;
        let currentNpc = allInGameNpcs.find(npc => npc.id === npcId);
        return showShop(currentNpc, rl, onExit, gamestate);
    }
    
    if (action === "OPEN_BLACKSMITH") {
        let npcId = dialogues[x].npcId;
        let currentNpc = allInGameNpcs.find(npc => npc.id === npcId);
        // return showBlacksmith(currentNpc, rl, onExit, gamestate);
        console.log("Blacksmith system is under construction. Please check back later!"); // placeholder for now
        return onExit();
    }
}

const askQuestion = (rl, query) => {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer.trim().toLowerCase());
        });
    });
};

const getChoice = async (rl, choicenumber) => {
  
    const choice = await askQuestion(rl, "Enter your choice: "); 
    
    if (isNaN(choice) || choice < 1 || choice > choicenumber) {
        console.log("❌ Invalid choice. Please try again.");
        return await getChoice(rl, choicenumber);
    }
    return choice;
};

// =========== exports ===========

module.exports = {
    startDialogue
};