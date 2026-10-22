// Structured Pokémon database with official artwork and battle stats
const POKEMON_DATA = [
    {
        id: 1,
        name: "Bulbasaur",
        type: "Grass",
        hp: 45,
        attack: 49,
        defense: 49,
        speed: 45,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        description: "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon."
    },
    {
        id: 4,
        name: "Charmander",
        type: "Fire",
        hp: 39,
        attack: 52,
        defense: 43,
        speed: 65,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        description: "The flame on its tail indicates Charmander's life force. If healthy, the flame burns brightly."
    },
    {
        id: 7,
        name: "Squirtle",
        type: "Water",
        hp: 44,
        attack: 48,
        defense: 65,
        speed: 43,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
        description: "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth."
    },
    {
        id: 25,
        name: "Pikachu",
        type: "Electric",
        hp: 35,
        attack: 55,
        defense: 40,
        speed: 90,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        description: "When several of these Pokémon gather, their electricity could build and cause lightning storms."
    },
    {
        id: 6,
        name: "Charizard",
        type: "Fire",
        hp: 78,
        attack: 84,
        defense: 78,
        speed: 100,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
        description: "It spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally."
    },
    {
        id: 9,
        name: "Blastoise",
        type: "Water",
        hp: 79,
        attack: 83,
        defense: 100,
        speed: 78,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
        description: "The rocket cannons on its shell fire water jets capable of punching holes through thick steel."
    },
    {
        id: 3,
        name: "Venusaur",
        type: "Grass",
        hp: 80,
        attack: 82,
        defense: 83,
        speed: 80,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
        description: "Its plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight."
    },
    {
        id: 94,
        name: "Gengar",
        type: "Ghost",
        hp: 60,
        attack: 65,
        defense: 60,
        speed: 110,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
        description: "Should you feel a sudden chill, it is said that a Gengar appeared to lay a curse on you."
    },
    {
        id: 150,
        name: "Mewtwo",
        type: "Psychic",
        hp: 106,
        attack: 110,
        defense: 90,
        speed: 130,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
        description: "Created by a scientist after years of horrific gene-splicing and DNA engineering experiments."
    },
    {
        id: 130,
        name: "Gyarados",
        type: "Water",
        hp: 95,
        attack: 125,
        defense: 79,
        speed: 81,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png",
        description: "Rarely seen in the wild. Huge and vicious, it is capable of destroying entire cities in a rage."
    },
    {
        id: 149,
        name: "Dragonite",
        type: "Dragon",
        hp: 91,
        attack: 134,
        defense: 95,
        speed: 80,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
        description: "An extremely rarely seen marine Pokémon. Its intelligence is said to match that of humans."
    },
    {
        id: 133,
        name: "Eevee",
        type: "Normal",
        hp: 55,
        attack: 55,
        defense: 50,
        speed: 55,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png",
        description: "Its genetic code is irregular. It may mutate if it is exposed to radiation from element stones."
    }
];

if (typeof module !== "undefined" && module.exports) {
    module.exports = { POKEMON_DATA };
}
