const allInGameNpcs = [];

class Npc {
    // بنستقبل كائن واحد جواه كل الخصائص
    constructor({ id, role, name, health, coins, area_id, inventory }) {
        this.id = id;
        this.role = role;
        this.area_id = area_id;

        this.info = {
            name: name
        };

        this.resources = {
            health: health,
            maxHealth: health
        };

        this.economy = {
            coins: coins,
        };

        this.inventory = inventory || [];
        
        // add automatically to allInGameNpcs
        allInGameNpcs.push(this);
    }
}

module.exports = { allInGameNpcs, Npc };