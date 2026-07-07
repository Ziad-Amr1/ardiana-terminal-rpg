TODO

[x] Done
[-] Partial
[ ] Todo

========================================
CORE GAMEPLAY
========================================

# World & Areas

[x] Add area types
[x] Area-specific menus
[ ] City gameplay loop
[-] Safe zones
[-] Service systems
[x] Area metadata system
[ ] World state tracking
[ ] Visited area tracking

----------------------------------------

# Save System

[ ] Replace async load with sync load
[ ] Add save existence detection
[ ] Add New Game / Load Game menu
[ ] Add resetGameState()
[ ] Validate save data
[ ] Prevent corrupted save crashes

----------------------------------------

# Combat UX

[-] Combat HUD
[ ] Show player HP before actions
[ ] Show enemy HP before actions
[ ] Show enemy level
[ ] Show enemy difficulty
[-] Improve combat pacing
[x] Better turn formatting

----------------------------------------

# Rest System

[-] Fix overheal messages
[ ] Use actual restored amount
[-] Restrict resting in dangerous areas
[-] Add future inn system
[-] Add recovery balancing

----------------------------------------

# Travel & Encounters

[-] Reduce encounter frustration
[-] Improve encounter pacing
[x] Rebalance run penalty
[-] Prevent encounter loops
[ ] Add travel flavor events

----------------------------------------

# Area Identity

[x] Different menus per area
[ ] Unique city interactions
[ ] Add shops
[-] Add inn
[ ] Add NPC interactions

----------------------------------------

# UI / UX

[-] Better invalid input messages
[ ] Add status window
[ ] Improve stats screen
[x] Better spacing consistency
[-] Improve intro pacing
[-] Progressive storytelling

----------------------------------------

# Architecture

[-] Refactor app.js
[ ] Create startup flow system
[-] Separate rendering from logic
[ ] Add localization system
[ ] Add world state system
[ ] Add config/constants

----------------------------------------

# Future Systems

[-] Equipment
[ ] Armor
[ ] Skills
[-] Shops
[ ] NPC dialogue
[ ] Quests
[ ] Event system
[ ] Localization
[ ] Web frontend later


--------------------------------------------

عندك حق جداً! لما اللعبة بتبدأ تكبر وتتفصل لأنظمة كتير، لو محطيناش **خريطة طريق (Roadmap)** واضحة، الكود هيدخل في بعضه وهنتوه. خطوة ممتازة إنك وقفتي وطلبتي نرتب أفكارنا.

### إجابة سؤالك: داتا ولا فانكشن؟ 🤔

إحساسك في محله 100%! الأفضل دايماً إنها تكون **داتا (Data-Driven)**.
لو برمجنا الخدمات جوه الفانكشنز، هنضطر نكتب كود جديد لكل مدينة ولكل تاجر. لكن لو عملناها كـ "داتا"، الفانكشن هتبقى مجرد "قالب" بيقرا الداتا دي ويعرضها، وده بيخلي اللعبة قابلة للتوسع اللانهائي بسهولة.

### إجابة سؤالك: Service ولا Places ولا NPC؟ 🏛️

بما إننا بنبني هيكل بيانات (Data Model)، التفكير هنا بيشبه جداً فكرة الـ **Normalization** في قواعد البيانات؛ إزاي نفصل الكيانات (Entities) ونربطها ببعض صح؟
في ألعاب الـ RPG، أفضل هيكلة هي دمج الـ NPC مع الـ Service:

* المدينة (City) جواها مجموعة من الشخصيات (NPCs).
* كل شخصية (NPC) ليها وظيفة (Role) بتقدم خدمة معينة (Service).
* **مثال:** تاجر الأسلحة هو NPC، الـ Role بتاعه Merchant، والخدمة اللي بيقدمها هي الـ Shop اللي جواه الـ Stock بتاعه.

بهذا الشكل، إنتي تقدري تخلي التاجر يكلم اللاعب الأول (Dialogue)، وبعدين يفتحله المتجر.

---

### 🗺️ خطة العمل (تاتة تاتة)

عشان نخلص أنظمة المدينة صح وبدون ما نكسر الكود القديم، هنمشي على الـ 4 خطوات دول بالترتيب:

#### الخطوة الأولى: هيكلة البيانات (Data Modeling) 💾

* هنبني ملف داتا جديد (مثلاً data/npcs.js أو جواه data/merchants.js).
* هنصمم جواه الكيان بتاع التاجر (Merchant Object)، ونحط جواه قائمة البضاعة بتاعته (Shop Stock) بالكميات المتاحة.
* هنربط الـ NPC ده بمدينة Zedon.

#### الخطوة الثانية: ترميم الأساس (Inventory Fixes) 🎒

* قبل ما اللاعب يشتري، لازم نصلح مطب الـ addItem في ملف inventorySystem.js.
* هنعدل اللوجيك عشان لو اللاعب بيشتري معدات (زي 5 سيوف)، الكود يتأكد إن في 5 خانات فاضية، ويعمل Loop يضيف كل سيف في خانة لوحده بدل ما يدمجهم.



#### الخطوة الثالثة: برمجة الخدمات (Shop & Inn Logic) 🛠️

* هنكمل دوال الـ buyItem والـ sellItem في economySystem.js ونربطهم بالداتا بتاعة التاجر اللي عملناها في الخطوة الأولى.
* هنعمل دالة سريعة للـ Inn (بتخصم كوينز، وبتنادي دالة Full Heal).

#### الخطوة الرابعة: واجهة اللعبة (app.js Integration) 🎮

* هندخل على app.js، ونبرمج زراير المدينة [S] Shop و [R] Rest في حلقة الـ rl.question.


* نخلي الزرار يستدعي الدوال اللي جهزناها.

---

[ ] Save During Combat