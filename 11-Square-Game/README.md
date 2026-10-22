# Square Game — Interactive Color & Memory Arena

An interactive, responsive 2x2 color reaction and pattern memory game built with vanilla JavaScript, HTML5, and CSS3.

## 📋 Overview

Square Game explores dynamic visual interactions across four interconnected colored squares. It resolves an invalid CSS rgb syntax error, introduces unified pointer/touch event listeners for mobile compatibility, adds custom Web Audio tone synthesizers, and introduces a Simon-style sequence memory game mode with LocalStorage score tracking.

## ✨ Key Features

- **CSS Syntax Fix**: Fixed malformed RGB color string (`rgb(${r1},255,255`) by supplying the missing closing parenthesis.
- **Full Touch & Mobile Support**: Replaced mouse-only hover events with unified pointer listeners, enabling seamless interactions on smartphones and tablets.
- **Dual Gameplay Modes**:
  - **Free Play**: Interactive sandbox exploring random numbers, toggle colors, RGB shifts, and multi-square ripple waves.
  - **Memory Challenge**: Simon-style pattern sequence where squares flash with distinct musical tones; players must replicate the exact sequence to advance.
- **Web Audio API Sound Engine**: Synthesized pitched musical tones (C4, E4, G4, C5) mapped to each square alongside success and failure audio cues.
- **High Score Persistence**: Automatically tracks and stores best memory round records in `localStorage`.
- **Instructions Modal & Responsive UI**: Clean modern glassmorphic interface with an in-game rules popup.

## 📁 Project Structure

```text
11-Square-Game/
├── index.html       # Game layout, HUD, 2x2 square arena, and instructions modal
├── script.js        # Event handlers, syntax fix, Free Play, and Memory logic
├── audio.js         # Web Audio API tone synthesizer
├── style.css        # Responsive styling, touch active states, and dark theme
└── README.md        # Project documentation
```

## 🎮 How to Play

1. Open `index.html` in any web browser.
2. In **Free Play Mode**, hover or tap any square to trigger unique color and number animations.
3. Switch to **Memory Challenge** mode and press **Start Challenge**.
4. Observe the flashing sequence and tap the corresponding squares in order.
