// Pokemon Battle Arena Engine
let playerCard = null;
let cpuCard = null;
let playerHp = 100;
let cpuHp = 100;
let isPlayerTurn = true;
let isGameOver = false;
let battleHistory = [];

const fallbackSprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png";

// Simple Web Audio API Synthesizer for sound effects
class SoundEngine {
    constructor() {
        this.ctx = null;
    }
    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
    }
    playTone(freq, type, duration) {
        try {
            this.init();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            // Audio not supported or blocked
        }
    }
    playAttack() { this.playTone(320, "triangle", 0.15); }
    playSpecial() { this.playTone(580, "sawtooth", 0.3); }
    playHit() { this.playTone(140, "square", 0.2); }
    playWin() {
        this.playTone(523.25, "sine", 0.2);
        setTimeout(() => this.playTone(659.25, "sine", 0.2), 150);
        setTimeout(() => this.playTone(783.99, "sine", 0.4), 300);
    }
    playLose() {
        this.playTone(350, "sawtooth", 0.2);
        setTimeout(() => this.playTone(280, "sawtooth", 0.4), 200);
    }
}

const sounds = new SoundEngine();

// DOM elements
const playerCardEl = document.getElementById("player-active-card");
const cpuCardEl = document.getElementById("cpu-active-card");
const playerHpBar = document.getElementById("player-hp-bar");
const cpuHpBar = document.getElementById("cpu-hp-bar");
const playerHpText = document.getElementById("player-hp-text");
const cpuHpText = document.getElementById("cpu-hp-text");
const logContainer = document.getElementById("battle-log");
const attackBtn = document.getElementById("btn-attack");
const specialBtn = document.getElementById("btn-special");
const newDuelBtn = document.getElementById("btn-new-duel");
const turnIndicator = document.getElementById("turn-indicator");
const playerDeckContainer = document.getElementById("player-deck");

function logMessage(msg, type = "info") {
    if (!logContainer) return;
    const entry = document.createElement("div");
    entry.className = `log-entry ${type}`;
    entry.textContent = msg;
    logContainer.prepend(entry);
}

function updateHpDisplays() {
    if (playerHpBar && playerCard) {
        const pct = Math.max(0, (playerHp / playerCard.maxHp) * 100);
        playerHpBar.style.width = `${pct}%`;
        playerHpBar.className = `hp-fill ${pct < 25 ? "danger" : pct < 50 ? "warning" : "healthy"}`;
        playerHpText.textContent = `${Math.ceil(playerHp)} / ${playerCard.maxHp} HP`;
    }

    if (cpuHpBar && cpuCard) {
        const pct = Math.max(0, (cpuHp / cpuCard.maxHp) * 100);
        cpuHpBar.style.width = `${pct}%`;
        cpuHpBar.className = `hp-fill ${pct < 25 ? "danger" : pct < 50 ? "warning" : "healthy"}`;
        cpuHpText.textContent = `${Math.ceil(cpuHp)} / ${cpuCard.maxHp} HP`;
    }
}

function renderCardSlot(element, card, isPlayer) {
    if (!element || !card) return;
    element.innerHTML = `
        <div class="card-inner type-${card.type.toLowerCase()}">
            <div class="card-top">
                <span class="card-name">${card.name}</span>
                <span class="card-type-badge ${card.type.toLowerCase()}">${card.type}</span>
            </div>
            <div class="card-artwork">
                <img src="${card.sprite}" alt="${card.name}">
            </div>
            <div class="card-moves">
                <p><strong>Basic:</strong> ${card.attack} DMG</p>
                <p><strong>Special:</strong> ${card.special} (${card.specialDmg} DMG)</p>
            </div>
        </div>
    `;

    const img = element.querySelector("img");
    img.addEventListener("error", () => { img.src = fallbackSprite; });
}

function selectPlayerPokemon(card) {
    playerCard = { ...card };
    playerHp = playerCard.hp;

    // Pick a random different CPU card
    const cpuCandidates = BATTLE_CARDS.filter(c => c.id !== card.id);
    const randomCpu = cpuCandidates[Math.floor(Math.random() * cpuCandidates.length)] || BATTLE_CARDS[0];
    cpuCard = { ...randomCpu };
    cpuHp = cpuCard.hp;

    isGameOver = false;
    isPlayerTurn = true;

    renderCardSlot(playerCardEl, playerCard, true);
    renderCardSlot(cpuCardEl, cpuCard, false);
    updateHpDisplays();

    if (logContainer) logContainer.innerHTML = "";
    logMessage(`⚔️ Duel started: ${playerCard.name} vs ${cpuCard.name}!`, "event");
    logMessage(`Your turn! Choose an action below.`, "player");

    if (attackBtn) attackBtn.disabled = false;
    if (specialBtn) specialBtn.disabled = false;
    if (turnIndicator) turnIndicator.textContent = "Your Turn";
}

function renderPlayerDeck() {
    if (!playerDeckContainer) return;
    playerDeckContainer.innerHTML = "";

    BATTLE_CARDS.forEach(card => {
        const thumb = document.createElement("button");
        thumb.className = `deck-choice type-${card.type.toLowerCase()}`;
        thumb.innerHTML = `
            <img src="${card.sprite}" alt="${card.name}">
            <span>${card.name}</span>
        `;
        const img = thumb.querySelector("img");
        img.addEventListener("error", () => { img.src = fallbackSprite; });

        thumb.addEventListener("click", () => {
            selectPlayerPokemon(card);
            document.querySelectorAll(".deck-choice").forEach(b => b.classList.remove("selected"));
            thumb.classList.add("selected");
        });

        playerDeckContainer.appendChild(thumb);
    });
}

function executeAttack(isSpecial = false) {
    if (!isPlayerTurn || isGameOver || !playerCard || !cpuCard) return;

    isPlayerTurn = false;
    if (attackBtn) attackBtn.disabled = true;
    if (specialBtn) specialBtn.disabled = true;

    // Player action
    const baseDmg = isSpecial ? playerCard.specialDmg : playerCard.attack;
    const multiplier = getTypeMultiplier(playerCard.type, cpuCard.type);
    const variance = (Math.random() * 6 - 3);
    const finalDmg = Math.max(5, Math.round((baseDmg + variance) * multiplier));

    if (isSpecial) sounds.playSpecial();
    else sounds.playAttack();

    cpuHp = Math.max(0, cpuHp - finalDmg);
    cpuCardEl.classList.add("taking-hit");
    setTimeout(() => cpuCardEl.classList.remove("taking-hit"), 400);

    let matchMsg = multiplier > 1 ? " It's super effective! 🔥" : multiplier < 1 ? " It's not very effective... 💧" : "";
    logMessage(`${playerCard.name} used ${isSpecial ? playerCard.special : "Quick Attack"} dealing ${finalDmg} damage!${matchMsg}`, "player");
    updateHpDisplays();

    if (cpuHp <= 0) {
        endDuel(true);
        return;
    }

    if (turnIndicator) turnIndicator.textContent = "CPU is Thinking...";

    // CPU Turn after delay
    setTimeout(executeCpuTurn, 1000);
}

function executeCpuTurn() {
    if (isGameOver || !cpuCard || !playerCard) return;

    const useSpecial = Math.random() < 0.4;
    const baseDmg = useSpecial ? cpuCard.specialDmg : cpuCard.attack;
    const multiplier = getTypeMultiplier(cpuCard.type, playerCard.type);
    const variance = (Math.random() * 6 - 3);
    const finalDmg = Math.max(5, Math.round((baseDmg + variance) * multiplier));

    sounds.playHit();
    playerHp = Math.max(0, playerHp - finalDmg);
    playerCardEl.classList.add("taking-hit");
    setTimeout(() => playerCardEl.classList.remove("taking-hit"), 400);

    let matchMsg = multiplier > 1 ? " It's super effective! ⚡" : multiplier < 1 ? " It's not very effective." : "";
    logMessage(`Enemy ${cpuCard.name} used ${useSpecial ? cpuCard.special : "Tackle"} dealing ${finalDmg} damage!${matchMsg}`, "cpu");
    updateHpDisplays();

    if (playerHp <= 0) {
        endDuel(false);
        return;
    }

    isPlayerTurn = true;
    if (attackBtn) attackBtn.disabled = false;
    if (specialBtn) specialBtn.disabled = false;
    if (turnIndicator) turnIndicator.textContent = "Your Turn";
}

function endDuel(playerWon) {
    isGameOver = true;
    if (attackBtn) attackBtn.disabled = true;
    if (specialBtn) specialBtn.disabled = true;

    if (playerWon) {
        sounds.playWin();
        logMessage(`🎉 VICTORY! Enemy ${cpuCard.name} fainted! You won the battle!`, "victory");
        if (turnIndicator) turnIndicator.textContent = "🏆 Victory!";
    } else {
        sounds.playLose();
        logMessage(`💀 DEFEAT! Your ${playerCard.name} fainted. Better luck next time!`, "defeat");
        if (turnIndicator) turnIndicator.textContent = "Defeat!";
    }
}

// Initial setup
document.addEventListener("DOMContentLoaded", () => {
    renderPlayerDeck();

    // Default select Pikachu
    selectPlayerPokemon(BATTLE_CARDS[0]);
    const firstDeckChoice = playerDeckContainer?.querySelector(".deck-choice");
    if (firstDeckChoice) firstDeckChoice.classList.add("selected");

    if (attackBtn) attackBtn.addEventListener("click", () => executeAttack(false));
    if (specialBtn) specialBtn.addEventListener("click", () => executeAttack(true));
    if (newDuelBtn) newDuelBtn.addEventListener("click", () => {
        if (playerCard) selectPlayerPokemon(playerCard);
    });
});
