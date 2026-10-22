# Shape Matcher — Reaction Speed Game

An interactive, fast-paced geometric shape recognition and reaction game built with vanilla JavaScript, HTML5, and CSS3.

## 📋 Overview

Shape Matcher tests players' reflexes and visual processing speed. Players must quickly identify and tap the specified shape and color combination (e.g. "RED HEXAGON", "BLUE TRIANGLE") from a dynamic 6-shape grid under a 30-second countdown.

## ✨ Key Features

- **Interactive Reaction Loop**: Real-time matching mechanics with dynamic combinations of shapes and colors.
- **Multiple Geometries**: Renders clean vector SVGs for Circles, Squares, Triangles, Diamonds, Stars, and Hexagons.
- **Combo & Streak System**: Consecutive correct clicks trigger score combo multipliers (`1x`, `2x`, `3x`, etc.).
- **Audio Feedback**: Custom Web Audio API synthesizer generating unique pleasant chimes for correct answers, buzzers for mistakes, and game-over fanfares.
- **High Score Persistence**: Automatically tracks and stores the player's all-time best score in `localStorage`.
- **Responsive Layout & Visual FX**: Modern dark glassmorphic interface with bounce and shake feedback animations.

## 📁 Project Structure

```text
06-Shapes-Games/
├── index.html       # Game HUD, prompt banner, shapes grid, and modal
├── game.js          # Game loop, timer, combo scoring, and SVG generators
├── sound.js         # Web Audio API sound synthesizer
├── style.css        # Responsive styling and feedback animations
└── README.md        # Project documentation
```

## 🎮 How to Play

1. Open `index.html` in your web browser.
2. Click **Start Game** to begin the 30-second timer.
3. Read the prompt banner (e.g., "Click the GREEN STAR!").
4. Tap the matching shape as quickly as possible to build your combo multiplier.
5. Avoid wrong clicks to keep your combo streak alive!
