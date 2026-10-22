// Web Audio API Sound Synthesizer for Tic-Tac-Toe
class GameAudio {
    constructor() {
        this.ctx = null;
        this.muted = false;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
    }

    playTone(freq, type = "sine", duration = 0.1, gainVal = 0.08) {
        if (this.muted) return;
        try {
            this.init();
            if (!this.ctx) return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

            gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            // Audio context not allowed or supported
        }
    }

    playMoveX() {
        this.playTone(440, "sine", 0.08, 0.1);
    }

    playMoveO() {
        this.playTone(554.37, "sine", 0.08, 0.1);
    }

    playWin() {
        this.playTone(523.25, "triangle", 0.15, 0.12);
        setTimeout(() => this.playTone(659.25, "triangle", 0.15, 0.12), 120);
        setTimeout(() => this.playTone(783.99, "triangle", 0.3, 0.15), 240);
    }

    playDraw() {
        this.playTone(330, "sawtooth", 0.2, 0.08);
        setTimeout(() => this.playTone(260, "sawtooth", 0.3, 0.08), 150);
    }
}

const gameAudio = new GameAudio();

if (typeof module !== "undefined" && module.exports) {
    module.exports = { GameAudio, gameAudio };
}
