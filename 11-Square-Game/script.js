// Square Game — Free Play & Memory Challenge Modes
const s1 = document.getElementById("sq1");
const s2 = document.getElementById("sq2");
const s3 = document.getElementById("sq3");
const s4 = document.getElementById("sq4");
const squares = [s1, s2, s3, s4];

const modeSelect = document.getElementById("game-mode");
const statusBanner = document.getElementById("game-status");
const scoreEl = document.getElementById("score-val");
const highEl = document.getElementById("high-val");
const startBtn = document.getElementById("btn-start-challenge");
const howToBtn = document.getElementById("btn-how-to");
const modal = document.getElementById("instructions-modal");
const closeModalBtn = document.getElementById("close-modal");

const STORAGE_KEY = "square_game_high_score";
let highScore = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
let currentScore = 0;

// Simon Memory Mode State
let pattern = [];
let userStep = 0;
let isAcceptingInput = false;

// Free Play State
let clr = "green";

function updateScores() {
    if (scoreEl) scoreEl.textContent = currentScore;
    if (highEl) highEl.textContent = highScore;
}

// ----------------- FREE PLAY LOGIC -----------------
function handleFreePlayInteraction(squareIndex, isPress) {
    if (typeof squareAudio !== "undefined") squareAudio.playSquareTone(squareIndex);

    const sq = squares[squareIndex];
    if (!sq) return;

    if (squareIndex === 0) { // sq1: random number & color
        if (isPress) {
            const r = Math.floor(Math.random() * 100);
            const r1 = Math.floor(Math.random() * 256);
            const r2 = Math.floor(Math.random() * 256);
            const r3 = Math.floor(Math.random() * 256);
            sq.innerHTML = `<h1>${r}</h1>`;
            sq.style.backgroundColor = `rgb(${r1},${r2},${r3})`;
        } else {
            sq.innerHTML = `<h1>1</h1>`;
            sq.style.backgroundColor = "white";
        }
    } else if (squareIndex === 1) { // sq2: toggle red/green
        if (isPress) {
            sq.style.backgroundColor = clr;
            clr = clr === "green" ? "red" : "green";
        } else {
            sq.style.backgroundColor = "white";
        }
    } else if (squareIndex === 2) { // sq3: random rgb
        if (isPress) {
            const r1 = Math.floor(Math.random() * 256);
            const r2 = Math.floor(Math.random() * 256);
            const r3 = Math.floor(Math.random() * 256);
            sq.style.backgroundColor = `rgb(${r1},${r2},${r3})`;
        } else {
            sq.style.backgroundColor = "white";
        }
    } else if (squareIndex === 3) { // sq4: trigger ripple across all squares (Fixed syntax error)
        if (isPress) {
            const r1 = Math.floor(Math.random() * 256);
            const r2 = Math.floor(Math.random() * 256);
            const r3 = Math.floor(Math.random() * 256);
            s1.style.backgroundColor = `rgb(${r1},255,255)`; // Fixed missing closing parenthesis!
            s2.style.backgroundColor = `rgb(255,${r2},255)`;
            s3.style.backgroundColor = `rgb(255,255,${r3})`;
            s4.style.backgroundColor = `rgb(${r1},${r2},${r3})`;
        } else {
            s1.style.backgroundColor = "white";
            s2.style.backgroundColor = "white";
            s3.style.backgroundColor = "white";
            s4.style.backgroundColor = "white";
        }
    }
}

// ----------------- MEMORY CHALLENGE LOGIC -----------------
function flashSquare(index) {
    return new Promise(resolve => {
        const sq = squares[index];
        const colors = ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b"];
        const orig = sq.style.backgroundColor;

        sq.style.backgroundColor = colors[index];
        sq.classList.add("flashing");
        if (typeof squareAudio !== "undefined") squareAudio.playSquareTone(index);

        setTimeout(() => {
            sq.style.backgroundColor = orig || "white";
            sq.classList.remove("flashing");
            setTimeout(resolve, 150);
        }, 400);
    });
}

async function playPattern() {
    isAcceptingInput = false;
    if (statusBanner) statusBanner.textContent = "Watch the sequence...";

    for (const sqIdx of pattern) {
        await flashSquare(sqIdx);
    }

    userStep = 0;
    isAcceptingInput = true;
    if (statusBanner) statusBanner.textContent = "Repeat the sequence!";
}

function nextRound() {
    currentScore = pattern.length;
    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem(STORAGE_KEY, String(highScore));
    }
    updateScores();

    // Add random square to sequence
    const nextIdx = Math.floor(Math.random() * 4);
    pattern.push(nextIdx);

    setTimeout(playPattern, 800);
}

function handleMemoryInput(index) {
    if (!isAcceptingInput) return;

    if (typeof squareAudio !== "undefined") squareAudio.playSquareTone(index);
    flashSquare(index);

    if (index === pattern[userStep]) {
        userStep++;
        if (userStep === pattern.length) {
            isAcceptingInput = false;
            if (statusBanner) statusBanner.textContent = "Correct! Get ready for next round...";
            if (typeof squareAudio !== "undefined") squareAudio.playSuccess();
            setTimeout(nextRound, 1000);
        }
    } else {
        // Wrong sequence
        isAcceptingInput = false;
        if (typeof squareAudio !== "undefined") squareAudio.playFail();
        if (statusBanner) statusBanner.textContent = `Game Over! Final Score: ${pattern.length - 1}`;
        if (startBtn) startBtn.style.display = "inline-block";
    }
}

function startMemoryChallenge() {
    pattern = [];
    currentScore = 0;
    updateScores();
    if (startBtn) startBtn.style.display = "none";
    nextRound();
}

// ----------------- UNIFIED POINTER / TOUCH HANDLERS -----------------
squares.forEach((sq, idx) => {
    // Desktop mouse hover
    sq.addEventListener("mouseenter", () => {
        if (!modeSelect || modeSelect.value === "free") {
            handleFreePlayInteraction(idx, true);
        }
    });

    sq.addEventListener("mouseleave", () => {
        if (!modeSelect || modeSelect.value === "free") {
            handleFreePlayInteraction(idx, false);
        }
    });

    // Touch / Click handler
    sq.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        if (modeSelect && modeSelect.value === "memory") {
            handleMemoryInput(idx);
        } else {
            handleFreePlayInteraction(idx, true);
        }
    });

    sq.addEventListener("pointerup", () => {
        if (!modeSelect || modeSelect.value === "free") {
            handleFreePlayInteraction(idx, false);
        }
    });
});

// UI Controls
if (modeSelect) {
    modeSelect.addEventListener("change", (e) => {
        const mode = e.target.value;
        squares.forEach(sq => {
            sq.style.backgroundColor = "white";
        });
        if (mode === "memory") {
            if (statusBanner) statusBanner.textContent = "Press 'Start Challenge' to begin";
            if (startBtn) startBtn.style.display = "inline-block";
        } else {
            if (statusBanner) statusBanner.textContent = "Free Play: Hover or tap squares to explore";
            if (startBtn) startBtn.style.display = "none";
        }
    });
}

if (startBtn) startBtn.addEventListener("click", startMemoryChallenge);

if (howToBtn && modal) {
    howToBtn.addEventListener("click", () => {
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
    });
}

if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    updateScores();
});
