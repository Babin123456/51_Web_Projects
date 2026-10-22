# Pokémon Card Duel Arena

An interactive, turn-based Pokémon card battling game built with vanilla JavaScript, HTML5, and CSS3.

## 📋 Overview

The Pokémon Card Duel Arena transforms the static card gallery into a dynamic, turn-based card duel against an intelligent CPU opponent. Players select their champion from a roster of iconic Pokémon, execute tactical quick attacks or high-power elemental moves, leverage elemental type matchups, and track the battle in real time.

## ✨ Key Features

- **Turn-Based Battle Engine**: Smooth combat loops between Player and CPU with animated hit reactions.
- **Roster Selection**: Choose from popular Pokémon (Pikachu, Charmander, Bulbasaur, Squirtle, Gengar, Mewtwo) each with unique stats, moves, and elemental types.
- **Elemental Type Matchups**: Strategic damage multipliers based on Pokémon type advantages (e.g., Water beats Fire, Fire beats Grass, Grass beats Water, Electric beats Water).
- **Web Audio Sound Effects**: Custom synthesized audio effects for basic attacks, elemental bursts, hits, victory fanfares, and defeat tones without external media files.
- **Dynamic Combat Log**: Scrollable live feed logging actions, damage dealt, effectiveness multipliers, and fainting events.
- **Responsive Stadium Design**: Modern battle arena interface that scales seamlessly from widescreen desktops to mobile screens.

## 📁 Project Structure

```text
05-Pokemon-Card-Game/
├── index.html       # Battle arena stadium, roster drawer, and combat log
├── game.js          # Core battle state machine, turn loop, and Web Audio synthesizers
├── cards-data.js    # Card roster stats, damage values, and elemental matchups
├── style.css        # Battle arena aesthetics, animated hit shakes, and health bars
└── README.md        # Game documentation and instructions
```

## 🎮 How to Play

1. Open `index.html` in your web browser.
2. Select your Pokémon from the top roster drawer.
3. Click **Quick Attack** for reliable standard damage or **Elemental Burst** for high-risk elemental damage.
4. Watch the combat log to read effectiveness indicators.
5. Defeat the CPU opponent by reducing their HP to zero. Click **Rematch** to battle again!
