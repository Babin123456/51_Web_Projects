# Scientific Calculator — Safe Math Engine

A modern, secure scientific calculator web application built with vanilla JavaScript, HTML5, and CSS3.

## 📋 Overview

The Scientific Calculator replaces unsafe `eval()` execution with a custom tokenized mathematical expression parser running the Shunting-Yard (Reverse Polish Notation) algorithm. It supports scientific operations, memory registers, sliding calculation history with LocalStorage persistence, and comprehensive keyboard integration.

## ✨ Key Features

- **Safe Mathematical Parser (`SafeParser`)**: Tokenizes expressions and converts infix to RPN, completely preventing arbitrary code injection risks associated with `eval()`.
- **Scientific Operations**: Supports square root (`√`), powers/exponents (`^`), modulo/percentage (`%`), and nested parentheses `( )`.
- **Memory Registers**: Full support for Memory Clear (`MC`), Memory Recall (`MR`), Memory Add (`M+`), and Memory Subtract (`M-`) with active memory status indicators.
- **Persistent Calculation History**: Automatically stores recent expressions and answers in `localStorage` inside an accessible slide-out drawer.
- **Robust Error Handling**: Clean error reporting for division by zero, mismatched parentheses, and malformed operator sequences without application crashes.
- **Full Keyboard Support**: Supports typing numbers, operators (`+`, `-`, `*`, `/`, `^`, `%`, `(`, `)`), Enter/Equals, Escape (Clear), and Backspace.
- **Neumorphic & Responsive UI**: High-contrast dark theme with tactile button depression states and mobile adaptation.

## 📁 Project Structure

```text
15-Calculator/
├── index.html       # Semantic keypad, dual display, and history drawer layout
├── parser.js        # Secure tokenized Shunting-Yard math evaluator
├── script.js        # Calculator state, memory registers, history, and key bindings
├── style.css        # Sleek dark theme styling, keypad grid, and drawer animations
└── README.md        # Project documentation
```

## 🚀 Getting Started

1. Open `index.html` in any web browser.
2. Enter values using either the on-screen keypad or your computer keyboard.
3. Click **History** in the top-right corner to review or reuse previous calculations.
