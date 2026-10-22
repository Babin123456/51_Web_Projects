// Web Audio Synthesizer for Square Game
class SquareAudio {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
    }

    playSquareTone(index) {
        try {
            this.init();
            if (!this.ctx) return;
            // Notes for 4 squares: C4, E4, G4, C5
            const notes = [261.63, 329.63, 392.00, 523.25];
            const freq = notes[index] || 440;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + 0.3);
        } catch (e) {
            // Audio context unavailable
        }
    }

    playSuccess() {
        this.playSquareTone(0);
        setTimeout(() => this.playSquareTone(1), 100);
        setTimeout(() => this.playSquareTone(2), 200);
        setTimeout(() => this.playSquareTone(3), 300);
    }

    playFail() {
        try {
            this.init();
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(150, this.ctx.currentTime);
            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.4);
        } catch (e) {}
    }
}

const squareAudio = new SquareAudio();

if (typeof module !== "undefined" && module.exports) {
    module.exports = { SquareAudio, squareAudio };
}
