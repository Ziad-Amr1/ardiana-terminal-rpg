const allInGameEnemies = [];
const enemyRegistry = {};

class Enemy {
    // بنستقبل كائن واحد جواه كل الخصائص
    constructor({ id, name, health, damage, coins, exp, loot, area_id }) {
        this.id = id;
        this.area_id = area_id;

        // 1. التقسيمة دي عشان تتطابق مع player.info
        this.info = {
            name: name
        };

        // 2. عشان تتطابق مع player.resources
        this.resources = {
            health: health,
            maxHealth: health // بنحفظ الدم الأساسي هنا
        };

        // 3. عشان تتطابق مع player.combat
        this.combat = {
            damage: damage,
            critChance: 5,
            critDamage: 1.5 * damage
        };

        // 4. الغنائم
        this.loot = {
            exp: exp,
            coins: coins,
            items: loot
        };
        
        // add automatically to allInGameEnemies
        allInGameEnemies.push(this);
        enemyRegistry[this.id] = this;
    }
}

module.exports = { allInGameEnemies, enemyRegistry, Enemy };