// Pokemon Battle Cards Deck and Type Advantages
const BATTLE_CARDS = [
    {
        id: "pikachu",
        name: "Pikachu",
        type: "Electric",
        hp: 100,
        maxHp: 100,
        attack: 28,
        special: "Thunderbolt",
        specialDmg: 42,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
    },
    {
        id: "charmander",
        name: "Charmander",
        type: "Fire",
        hp: 95,
        maxHp: 95,
        attack: 26,
        special: "Flamethrower",
        specialDmg: 40,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
    },
    {
        id: "bulbasaur",
        name: "Bulbasaur",
        type: "Grass",
        hp: 110,
        maxHp: 110,
        attack: 24,
        special: "Solar Beam",
        specialDmg: 38,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
    },
    {
        id: "squirtle",
        name: "Squirtle",
        type: "Water",
        hp: 105,
        maxHp: 105,
        attack: 25,
        special: "Hydro Pump",
        specialDmg: 39,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
    },
    {
        id: "gengar",
        name: "Gengar",
        type: "Ghost",
        hp: 90,
        maxHp: 90,
        attack: 32,
        special: "Shadow Ball",
        specialDmg: 45,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png"
    },
    {
        id: "mewtwo",
        name: "Mewtwo",
        type: "Psychic",
        hp: 120,
        maxHp: 120,
        attack: 34,
        special: "Psystrike",
        specialDmg: 50,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
    }
];

// Multiplier based on type matchups
const TYPE_MULTIPLIERS = {
    Fire: { Grass: 1.5, Water: 0.7, Electric: 1.0, Ghost: 1.0, Psychic: 1.0 },
    Water: { Fire: 1.5, Grass: 0.7, Electric: 0.8, Ghost: 1.0, Psychic: 1.0 },
    Grass: { Water: 1.5, Fire: 0.7, Electric: 1.0, Ghost: 1.0, Psychic: 1.0 },
    Electric: { Water: 1.5, Grass: 0.8, Fire: 1.0, Ghost: 1.0, Psychic: 1.0 },
    Ghost: { Psychic: 1.5, Normal: 0.5, Fire: 1.0, Water: 1.0, Grass: 1.0 },
    Psychic: { Ghost: 0.8, Fire: 1.0, Water: 1.0, Grass: 1.0, Electric: 1.0 }
};

function getTypeMultiplier(attackerType, defenderType) {
    if (TYPE_MULTIPLIERS[attackerType] && TYPE_MULTIPLIERS[attackerType][defenderType]) {
        return TYPE_MULTIPLIERS[attackerType][defenderType];
    }
    return 1.0;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { BATTLE_CARDS, getTypeMultiplier };
}
