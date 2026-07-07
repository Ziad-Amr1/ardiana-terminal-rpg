// data/dialogues.js

const dialogues = {
  "merchant_greeting": {
    id: "merchant_greeting",
    npcId: 1,
    text: "Hello Traveler, how are you? \nWhat brings you today?",
    cd: 50, // خليتها 50 ملي ثانية كمثال لسرعة معقولة
    choices: [
      { 
        reply: "Hello, I came to buy something.", 
        nextAction: "OPEN_SHOP" 
      },
      { 
        reply: "Nothing, just passing by.", 
        nextAction: "CLOSE_DIALOGUE" 
      }
    ]
  },
  // نقدر نضيف حوارات تانية كتير هنا...
  "blacksmith_greeting": {
    id: "blacksmith_greeting",
    npcId: 2, // ربطناه بالحداد (Frank)
    text: "Ah! A new face. Need to repair your sword or craft a new one?",
    cd: 50,
    choices: [
      { reply: "Show me your weapons.", nextAction: "OPEN_BLACKSMITH" },
      { reply: "I will come back later.", nextAction: "CLOSE_DIALOGUE" }
    ]
  }
};

module.exports = { dialogues };