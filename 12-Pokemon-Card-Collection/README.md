# Pokédex Card Collection

An interactive, responsive Pokédex card collection web application built with vanilla JavaScript, HTML5, and CSS3.

## 📋 Overview

The Pokédex Card Collection allows users to explore iconic Pokémon through an interactive visual grid. It features real-time search, category filtering by elemental type, favorite cards bookmarking with LocalStorage persistence, image fallback handling, and a full-featured inspection modal showcasing Pokémon combat statistics.

## ✨ Key Features

- **Scope Crash Resolution**: Resolved duplicate variable declarations (`let main` and `const main`) that previously broke execution on page load.
- **Interactive Search**: Filter Pokémon dynamically by name or Pokédex number in real time.
- **Type Filtering**: Instant filtering across multiple Pokémon types (Fire, Water, Grass, Electric, Psychic, Dragon, Ghost, Normal).
- **Detail Modal**: Click any card or press Enter/Space to open an in-depth view displaying HP, Attack, Defense, Speed, and Pokédex descriptions.
- **Favorites System**: Save and toggle favorite Pokémon cards persisted across browser sessions via `localStorage`.
- **Holographic & Responsive UI**: Clean modern dark-theme interface with smooth hover interactions and mobile responsiveness.
- **Asset Fallback**: Automatic image error detection that gracefully falls back to official PokeAPI sprites when needed.

## 📁 Project Structure

```text
12-Pokemon-Card-Collection/
├── index.html          # Semantic HTML5 header, controls, grid, and modal markup
├── script.js           # Card rendering, search, filter, and modal interactions
├── pokemon-data.js     # Structured dataset containing Pokémon stats and artwork
├── style.css           # Modern Pokédex styling, responsive grid, and animations
└── README.md           # Project documentation
```

## 🚀 Getting Started

1. Open `index.html` in any modern web browser.
2. Use the search bar or type filter buttons to browse cards.
3. Click on any Pokémon card to inspect detailed stats.
4. Click the star icon (★/☆) to bookmark your favorite Pokémon.
