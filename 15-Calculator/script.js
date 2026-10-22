// Advanced Scientific Calculator Controller with Safe Math Parser
let expression = "";
let memory = 0;

const display = document.querySelector("#display");
const secondaryDisplay = document.querySelector("#secondary-display");
const historyList = document.querySelector("#history-list");
const historyDrawer = document.querySelector("#history-drawer");
const toggleHistoryBtn = document.querySelector("#btn-toggle-history");
const clearHistoryBtn = document.querySelector("#btn-clear-history");
const memoryIndicator = document.querySelector("#memory-indicator");

const STORAGE_KEY = "calc_history_data";
let history = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

function updateDisplays(expr, preview = "") {
    if (display) display.value = expr;
    if (secondaryDisplay) secondaryDisplay.textContent = preview;
}

function updateMemoryIndicator() {
    if (memoryIndicator) {
        memoryIndicator.textContent = memory !== 0 ? `M (${memory})` : "";
    }
}

function saveHistory(expr, result) {
    history.unshift({ expr, result, time: new Date().toLocaleTimeString() });
    if (history.length > 30) history.pop();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    if (!historyList) return;
    historyList.innerHTML = "";

    if (history.length === 0) {
        historyList.innerHTML = '<li class="empty-history">No calculations yet</li>';
        return;
    }

    history.forEach(item => {
        const li = document.createElement("li");
        li.className = "history-item";
        li.innerHTML = `
            <span class="hist-expr">${item.expr}</span>
            <span class="hist-res">= ${item.result}</span>
        `;
        li.addEventListener("click", () => {
            expression = String(item.result);
            updateDisplays(expression);
        });
        historyList.appendChild(li);
    });
}

function executeCalculate() {
    if (!expression) return;

    try {
        const result = SafeParser.calculate(expression);
        const formattedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));

        saveHistory(expression, formattedResult);
        updateDisplays(String(formattedResult), `${expression} =`);
        expression = String(formattedResult);
    } catch (err) {
        updateDisplays("Error", err.message || "Invalid syntax");
        expression = "";
    }
}

function handleInput(char) {
    if (display && display.value === "Error") {
        expression = "";
    }

    // Prevent multiple consecutive operators
    const lastChar = expression.slice(-1);
    if (["+", "-", "*", "/", "%", "^"].includes(lastChar) && ["+", "*", "/", "%", "^"].includes(char)) {
        expression = expression.slice(0, -1) + char;
        updateDisplays(expression);
        return;
    }

    expression += char;
    updateDisplays(expression);
}

function handleSpecialOp(op) {
    if (op === "clear") {
        expression = "";
        updateDisplays("", "");
    } else if (op === "backspace") {
        expression = expression.slice(0, -1);
        updateDisplays(expression);
    } else if (op === "sqrt") {
        if (!expression) {
            expression = "sqrt(";
        } else {
            expression = `sqrt(${expression})`;
        }
        updateDisplays(expression);
    } else if (op === "power") {
        handleInput("^");
    } else if (op === "mc") {
        memory = 0;
        updateMemoryIndicator();
    } else if (op === "mr") {
        if (memory !== 0) handleInput(String(memory));
    } else if (op === "m-plus") {
        try {
            const currentVal = SafeParser.calculate(expression || display.value);
            memory += currentVal;
            updateMemoryIndicator();
        } catch (e) {}
    } else if (op === "m-minus") {
        try {
            const currentVal = SafeParser.calculate(expression || display.value);
            memory -= currentVal;
            updateMemoryIndicator();
        } catch (e) {}
    }
}

// Button click handlers
document.querySelectorAll(".calc-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const num = btn.dataset.number;
        const sign = btn.dataset.sign;
        const action = btn.dataset.action;

        if (num !== undefined) handleInput(num);
        else if (sign !== undefined) handleInput(sign);
        else if (action === "equals") executeCalculate();
        else if (action) handleSpecialOp(action);
    });
});

// Keyboard handling
document.addEventListener("keydown", (e) => {
    if (/^[0-9.]$/.test(e.key)) {
        handleInput(e.key);
    } else if (["+", "-", "*", "/", "%", "^", "(", ")"].includes(e.key)) {
        handleInput(e.key);
    } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        executeCalculate();
    } else if (e.key === "Escape") {
        handleSpecialOp("clear");
    } else if (e.key === "Backspace") {
        handleSpecialOp("backspace");
    }
});

// Drawer toggles
if (toggleHistoryBtn && historyDrawer) {
    toggleHistoryBtn.addEventListener("click", () => {
        historyDrawer.classList.toggle("open");
    });
}

if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", () => {
        history = [];
        localStorage.removeItem(STORAGE_KEY);
        renderHistory();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderHistory();
    updateMemoryIndicator();
});