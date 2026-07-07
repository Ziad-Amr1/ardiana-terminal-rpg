const allInGameAreas = [];

class Area {
    
    constructor({ id, type, name, description, services, levelRange, enemies, connections, encounterChance }) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.description = description;
        this.services = services || { shop: false, inn: false, blacksmith: false };
        this.levelRange = levelRange || { min: 1, max: 1 };
        this.enemies = enemies || [];
        this.connections = connections || {};
        this.encounterChance = encounterChance || 0;
        
        // add automatically to allInGameAreas
        allInGameAreas.push(this);
    }

    enterArea() {
      let servicesText = `Shop: ${this.services.shop ? "✅" : "❌"} | Inn: ${this.services.inn ? "✅" : "❌"} | Blacksmith: ${this.services.blacksmith ? "✅" : "❌"}`;
      if (this.encounterChance === 0 && (this.services.shop || this.services.inn || this.services.blacksmith)) {
        console.log(`
========================
        ${this.name}
========================

${this.description}

Services:
${servicesText}

=========================
          `);
        } else {
          console.log(`
========================
        ${this.name}
========================

${this.description}

=========================
          `);
        }
    }
}

module.exports = { allInGameAreas, Area };