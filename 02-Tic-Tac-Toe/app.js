// Tic-Tac-Toe Game Engine with AI (Minimax) & Persistent Scoreboard
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const resetScoresBtn = document.querySelector("#reset-scores-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const turnIndicator = document.querySelector("#turn-indicator");
const modeSelect = document.querySelector("#game-mode");
const difficultySelect = document.querySelector("#difficulty");
const scoreXEl = document.querySelector("#score-x");
const scoreOEl = document.querySelector("#score-o");
const scoreDrawEl = document.querySelector("#score-draw");

const STORAGE_KEY = "tictactoe_scores_data";

let board = ["", "", "", "", "", "", "", "", ""];
let turnO = false; // Player X always goes first
let count = 0;
let isGameOver = false;

let scores = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"x":0,"o":0,"draws":0}');

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function updateScoreboard() {
    if (scoreXEl) scoreXEl.textContent = scores.x;
    if (scoreOEl) scoreOEl.textContent = scores.o;
    if (scoreDrawEl) scoreDrawEl.textContent = scores.draws;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

function updateTurnIndicator() {
    if (!turnIndicator || isGameOver) return;
    const isAi = modeSelect && modeSelect.value === "ai";
    const currentPlayer = turnO ? "O" : "X";
    
    if (isAi && turnO) {
        turnIndicator.textContent = "AI is thinking...";
        turnIndicator.className = "turn-banner turn-o";
    } else {
        turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
        turnIndicator.className = `turn-banner turn-${currentPlayer.toLowerCase()}`;
    }
}

function checkWinForBoard(currentBoard) {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
            return { winner: currentBoard[a], pattern };
        }
    }
    return null;
}

function showWinner(winner, pattern) {
    isGameOver = true;
    if (typeof gameAudio !== "undefined") gameAudio.playWin();

    if (winner === "X") scores.x++;
    else scores.o++;
    updateScoreboard();

    if (pattern) {
        pattern.forEach(idx => {
            boxes[idx].classList.add("winning-cell");
        });
    }

    const winnerName = modeSelect && modeSelect.value === "ai" && winner === "O" ? "AI" : `Player ${winner}`;
    msg.textContent = `🎉 Congratulations, Winner is ${winnerName}!`;
    msgContainer.classList.remove("hide");
    if (turnIndicator) turnIndicator.textContent = `Winner: ${winnerName}!`;
    disableBoxes();
}

function gameDraw() {
    isGameOver = true;
    if (typeof gameAudio !== "undefined") gameAudio.playDraw();

    scores.draws++;
    updateScoreboard();

    msg.textContent = "🤝 Game was a Draw!";
    msgContainer.classList.remove("hide");
    if (turnIndicator) turnIndicator.textContent = "Game Draw";
    disableBoxes();
}

function disableBoxes() {
    boxes.forEach(box => {
        box.disabled = true;
    });
}

function enableBoxes() {
    boxes.forEach((box, idx) => {
        box.disabled = false;
        box.textContent = "";
        box.classList.remove("winning-cell", "cell-x", "cell-o");
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    turnO = false;
    count = 0;
    isGameOver = false;
    enableBoxes();
    msgContainer.classList.add("hide");
    updateTurnIndicator();
}

function resetScores() {
    scores = { x: 0, o: 0, draws: 0 };
    updateScoreboard();
    resetGame();
}

// Minimax algorithm for unbeatable AI
function minimax(newBoard, depth, isMaximizing) {
    const winResult = checkWinForBoard(newBoard);
    if (winResult) {
        return winResult.winner === "O" ? 10 - depth : depth - 10;
    }
    if (!newBoard.includes("")) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (newBoard[i] === "") {
                newBoard[i] = "O";
                const score = minimax(newBoard, depth + 1, false);
                newBoard[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (newBoard[i] === "") {
                newBoard[i] = "X";
                const score = minimax(newBoard, depth + 1, true);
                newBoard[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function makeAiMove() {
    if (isGameOver) return;

    const availableIndices = [];
    board.forEach((val, idx) => {
        if (val === "") availableIndices.push(idx);
    });

    if (availableIndices.length === 0) return;

    let targetIndex;
    const isHard = !difficultySelect || difficultySelect.value === "hard";

    if (!isHard && Math.random() < 0.5) {
        // Random move for easy mode
        targetIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    } else {
        // Minimax optimal move for hard mode
        let bestScore = -Infinity;
        targetIndex = availableIndices[0];

        for (const idx of availableIndices) {
            board[idx] = "O";
            const score = minimax(board, 0, false);
            board[idx] = "";
            if (score > bestScore) {
                bestScore = score;
                targetIndex = idx;
            }
        }
    }

    handleMove(targetIndex);
}

function handleMove(idx) {
    if (board[idx] !== "" || isGameOver) return;

    const symbol = turnO ? "O" : "X";
    board[idx] = symbol;
    boxes[idx].textContent = symbol;
    boxes[idx].classList.add(`cell-${symbol.toLowerCase()}`);
    boxes[idx].disabled = true;
    count++;

    if (symbol === "X") {
        if (typeof gameAudio !== "undefined") gameAudio.playMoveX();
    } else {
        if (typeof gameAudio !== "undefined") gameAudio.playMoveO();
    }

    const winResult = checkWinForBoard(board);
    if (winResult) {
        showWinner(winResult.winner, winResult.pattern);
        return;
    }

    if (count === 9) {
        gameDraw();
        return;
    }

    turnO = !turnO;
    updateTurnIndicator();

    // Trigger AI move if single player
    if (modeSelect && modeSelect.value === "ai" && turnO && !isGameOver) {
        disableBoxes();
        setTimeout(() => {
            boxes.forEach((box, i) => {
                if (board[i] === "") box.disabled = false;
            });
            makeAiMove();
        }, 400);
    }
}

// Event Listeners
boxes.forEach((box, idx) => {
    box.addEventListener("click", () => {
        handleMove(idx);
    });
});

if (resetBtn) resetBtn.addEventListener("click", resetGame);
if (resetScoresBtn) resetScoresBtn.addEventListener("click", resetScores);
if (modeSelect) modeSelect.addEventListener("change", resetGame);
if (difficultySelect) difficultySelect.addEventListener("change", resetGame);

document.addEventListener("DOMContentLoaded", () => {
    updateScoreboard();
    updateTurnIndicator();
});
