// ./factories/createEffect.js
/*
Effect
├── id
├── name
├── trigger
├── chance
└── canApply()

PoisonEffect
├── damagePerTurn
├── duration
└── apply()

HealEffect
├── amount
└── apply()

DamageEffect
├── damage
├── damageType
└── apply()
*/

const allInGameEffects = [];
const effectRegistry = {};

class Effect {
    constructor({ id, name, description, trigger }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.trigger = trigger;

        // add automatically to allInGameEffects
        allInGameEffects.push(this);
        effectRegistry[this.id] = this;
    };
    canApply() {};
};

class HealEffect extends Effect {
    constructor({ id, name, description, trigger, amount, healingPerTurn, duration }) {
        super({ id, name, description, trigger });

        this.amount = amount;
        this.healingPerTurn = healingPerTurn;
        this.duration = duration;

    };
    apply() {};
};

class PoisonEffect extends Effect {
    constructor({ id, name, description, trigger, damagePerTurn, duration }) {
        super({ id, name, description, trigger });

        this.damagePerTurn = damagePerTurn;
        this.duration = duration;
    };
    apply() {};
};

class DamageEffect extends Effect {
    constructor({ id, name, description, trigger, damage, damageType, duration }) {
        super({ id, name, description, trigger });

        this.damage = damage;
        this.damageType = damageType;
        this.duration = duration;
    };
    apply() {};
};

module.exports = { allInGameEffects, effectRegistry, Effect, PoisonEffect, HealEffect, DamageEffect };