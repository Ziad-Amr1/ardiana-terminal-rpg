const { allInGameItems } = require("../factories/createItem");
const { takeCoins, giveCoins, buyItem, sellItem } = require("./economySystem");
const {  printDivider, printTitle, printspace } = require("../utils/UIHelper");

// =========== SHOP SYSTEM ===========
let buy = (player, item) => {
 
  buyItem(player, item); 
};

let sell = (player, item) => {
  sellItem(player, item);
};

let buyAll = (player, item, amount) => {
  buyItem(player, item, amount);
};

let sellAll = (player, item, amount) => {
  sellItem(player, item, amount);
};

const askQuestion = (rl, query) => {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer.trim().toLowerCase());
        });
    });
};

let showShop = async (currentNpc, rl, onExit, gamestate) => {
  printTitle(`Shop: ${currentNpc.info.name}`);
  printspace();
  let i = 1;
  let shopItems = getShopItems(currentNpc);

  shopItems.forEach((slot) => {
    let currentItem = slot.item;
    
    console.log(`[${i}] - ${currentItem.name} - ${currentItem.description}
        💰 ${currentItem.value} coins
        📦 Stock: ${slot.stock}
        `);
    printspace();
    i++;
  });
  
  console.log(`[Q] Leave Shop`);
  printspace();
  
  let answer = await askQuestion(rl, `> Choose the item number you want to buy, or Q to exit: `);
  
  if (answer === "q") {
      return onExit();
  }

  // 1. التحقق من الإجابة (شيلنا الكومنت وصلحناه)
  let choiceIndex = parseInt(answer);
  if (isNaN(choiceIndex) || choiceIndex < 1 || choiceIndex > shopItems.length) {
    console.log("❌ Invalid choice. Please try again.");
    return await showShop(currentNpc, rl, onExit);
  }

  // 2. سحبنا العنصر اللي اللاعب اختاره
  let chosenSlot = shopItems[choiceIndex - 1];

  let answerQuantity = await askQuestion(rl, `
    [A] Buy All (${chosenSlot.stock} items)
    [B] Buy 1
    > Enter your choice: `);
    
    // 3. جبنا اللاعب من الـ gamestate (لازم تعملي require لـ gameState فوق)
    let player = gamestate.player; 

    if (answerQuantity === "a") {
        // نبعت اللاعب يشتري، ونبعت العنصر، ونبعت الكمية كلها
        buyAll(player, chosenSlot.item, chosenSlot.stock);
        return onExit();
    }
    
    if (answerQuantity === "b") {
        buy(player, chosenSlot.item);
        return onExit();
    }

    // لو دخل حاجة غلط في الكمية
    console.log("❌ Invalid input.");
    return onExit();
};

let getShopItems = (currentNpc) => {
  let items = [];
  
  for (let i = 0; i < currentNpc.inventory.length; i++) {
    let npcSlot = currentNpc.inventory[i]; // ده السلوت اللي فيه item_id و stock
    
    // 1. نجيب تفاصيل العنصر من الكتالوج
    let realItem = allInGameItems.find((item) => item.id === npcSlot.item_id);

    if (realItem) {
      // 2. ندمجهم مع بعض في Object جديد ونحطه في المصفوفة
      items.push({
        item: realItem,      // الكتالوج (الاسم، الوصف، السعر)
        stock: npcSlot.stock // الكمية اللي عند التاجر
      });
    }
  }

  return items;
};

module.exports = {
  buy,
  sell,
  buyAll,
  sellAll,
  showShop,
};
