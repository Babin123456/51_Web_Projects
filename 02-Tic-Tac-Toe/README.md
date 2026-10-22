# Tic Tac Toe — Master Edition

A responsive, feature-rich Tic Tac Toe game built with vanilla JavaScript, HTML5, and CSS3.

## 📋 Overview

Tic Tac Toe Master Edition upgrades the classic 3x3 grid game with an intelligent AI opponent running the Minimax algorithm, a persistent multi-round scoreboard with LocalStorage, custom Web Audio API sound effects, live turn banners, and winning cell highlight animations.

## ✨ Key Features

- **Unbeatable AI Mode**: Implements the recursive Minimax decision algorithm for impossible-to-beat AI gameplay, alongside a casual difficulty mode.
- **2-Player Local Mode**: Play against friends locally with clear turn indicators.
- **Persistent Scoreboard**: Tracks Player X wins, Player O wins, and Ties across browser sessions using `localStorage`.
- **Web Audio Sound Effects**: Synthesized audio feedback for move clicks, winning fanfares, and draw chimes without any external mp3 files.
- **Winning Streak Animations**: Winning three-in-a-row cells glow with animated pulse effects.
- **Responsive & Accessible**: Keyboard accessible buttons with high-contrast neon glassmorphism styling.

## 📁 Project Structure

```text
02-Tic-Tac-Toe/
├── index.html       # Semantic layout with scoreboard, game board, and controls
├── app.js          # Game state, Minimax algorithm, scoreboard, and event handlers
├── audio.js        # Web Audio API sound synthesizer
├── style.css       # Modern neon dark theme styling with animations
└── README.md       # Game documentation
```

## 🎮 How to Play

1. Open `index.html` in any web browser.
2. Select your game mode (**vs AI** or **2 Players**) and difficulty.
3. Click any square on the 3x3 grid to make your move (Player X goes first).
4. The first to align 3 symbols horizontally, vertically, or diagonally wins the round.
5. Use **New Round** to start a new match or **Reset Scores** to wipe historical stats.
