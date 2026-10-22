// Shape Reaction & Recognition Game Engine
const SHAPES = [
    { type: "circle", name: "Circle" },
    { type: "square", name: "Square" },
    { type: "triangle", name: "Triangle" },
    { type: "diamond", name: "Diamond" },
    { type: "star", name: "Star" },
    { type: "hexagon", name: "Hexagon" }
];

const COLORS = [
    { name: "Red", hex: "#ef4444" },
    { name: "Blue", hex: "#3b82f6" },
    { name: "Green", hex: "#22c55e" },
    { name: "Yellow", hex: "#eab308" },
    { name: "Purple", hex: "#a855f7" }
];

let score = 0;
let combo = 0;
let timeLeft = 30;
let timerInterval = null;
let currentTarget = null;
let isPlaying = false;

const HIGH_SCORE_KEY = "shapes_game_high_score";
let highScore = parseInt(localStorage.getItem(HIGH_SCORE_KEY) || "0", 10);

// DOM Elements
const targetPromptEl = document.getElementById("target-prompt");
const scoreEl = document.getElementById("current-score");
const timerEl = document.getElementById("timer-value");
const comboEl = document.getElementById("combo-streak");
const highScoreEl = document.getElementById("high-score");
const shapesGridEl = document.getElementById("shapes-grid");
const startBtn = document.getElementById("btn-start-game");
const gameOverModal = document.getElementById("game-over-modal");
const finalScoreEl = document.getElementById("final-score");
const playAgainBtn = document.getElementById("btn-play-again");

function updateHUD() {
    if (scoreEl) scoreEl.textContent = score;
    if (timerEl) timerEl.textContent = `${timeLeft}s`;
    if (comboEl) comboEl.textContent = `${combo}x`;
    if (highScoreEl) highScoreEl.textContent = highScore;
}

function generateNewRound() {
    if (!isPlaying) return;

    // Pick 6 random combinations
    const items = [];
    const used = new Set();

    while (items.length < 6) {
        const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const key = `${shape.type}_${color.name}`;

        if (!used.has(key)) {
            used.add(key);
            items.push({ shape, color });
        }
    }

    // Pick one as target
    currentTarget = items[Math.floor(Math.random() * items.length)];
    if (targetPromptEl) {
        targetPromptEl.innerHTML = `Click the <span style="color: ${currentTarget.color.hex}">${currentTarget.color.name.toUpperCase()} ${currentTarget.shape.name.toUpperCase()}</span>!`;
    }

    renderShapes(items);
}

function renderShapes(items) {
    if (!shapesGridEl) return;
    shapesGridEl.innerHTML = "";

    items.forEach(item => {
        const btn = document.createElement("button");
        btn.className = `shape-btn shape-${item.shape.type}`;
        btn.setAttribute("aria-label", `${item.color.name} ${item.shape.name}`);
        btn.style.setProperty("--shape-color", item.color.hex);

        // Render SVG for crisp geometric shapes
        btn.innerHTML = getShapeSvg(item.shape.type, item.color.hex);

        btn.addEventListener("click", () => handleShapeClick(item, btn));
        shapesGridEl.appendChild(btn);
    });
}

function getShapeSvg(type, color) {
    switch (type) {
        case "circle":
            return `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="${color}"/></svg>`;
        case "square":
            return `<svg viewBox="0 0 100 100"><rect x="12" y="12" width="76" height="76" rx="8" fill="${color}"/></svg>`;
        case "triangle":
            return `<svg viewBox="0 0 100 100"><polygon points="50,12 88,86 12,86" fill="${color}"/></svg>`;
        case "diamond":
            return `<svg viewBox="0 0 100 100"><polygon points="50,10 90,50 50,90 10,50" fill="${color}"/></svg>`;
        case "star":
            return `<svg viewBox="0 0 100 100"><polygon points="50,10 61,38 90,38 67,56 76,84 50,68 24,84 33,56 10,38 39,38" fill="${color}"/></svg>`;
        case "hexagon":
            return `<svg viewBox="0 0 100 100"><polygon points="50,10 88,30 88,70 50,90 12,70 12,30" fill="${color}"/></svg>`;
        default:
            return `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="${color}"/></svg>`;
    }
}

function handleShapeClick(item, buttonEl) {
    if (!isPlaying || !currentTarget) return;

    if (item.shape.type === currentTarget.shape.type && item.color.name === currentTarget.color.name) {
        // Correct
        combo++;
        const points = 10 + (combo * 2);
        score += points;
        buttonEl.classList.add("correct-pop");
        if (typeof shapeAudio !== "undefined") shapeAudio.playCorrect();

        if (score > highScore) {
            highScore = score;
            localStorage.setItem(HIGH_SCORE_KEY, String(highScore));
        }

        updateHUD();
        setTimeout(generateNewRound, 200);
    } else {
        // Wrong
        combo = 0;
        score = Math.max(0, score - 5);
        buttonEl.classList.add("wrong-shake");
        if (typeof shapeAudio !== "undefined") shapeAudio.playWrong();
        setTimeout(() => buttonEl.classList.remove("wrong-shake"), 300);
        updateHUD();
    }
}

function startGame() {
    isPlaying = true;
    score = 0;
    combo = 0;
    timeLeft = 30;
    updateHUD();

    if (gameOverModal) {
        gameOverModal.classList.remove("active");
        gameOverModal.setAttribute("aria-hidden", "true");
    }

    if (startBtn) startBtn.style.display = "none";
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        updateHUD();

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    generateNewRound();
}

function endGame() {
    isPlaying = false;
    clearInterval(timerInterval);
    if (typeof shapeAudio !== "undefined") shapeAudio.playGameOver();

    if (targetPromptEl) targetPromptEl.textContent = "Game Over!";
    if (shapesGridEl) shapesGridEl.innerHTML = "";
    if (startBtn) startBtn.style.display = "inline-block";

    if (finalScoreEl) finalScoreEl.textContent = score;
    if (gameOverModal) {
        gameOverModal.classList.add("active");
        gameOverModal.setAttribute("aria-hidden", "false");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateHUD();
    if (startBtn) startBtn.addEventListener("click", startGame);
    if (playAgainBtn) playAgainBtn.addEventListener("click", startGame);
});
