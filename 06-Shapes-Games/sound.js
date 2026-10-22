// Web Audio Synthesizer for Shapes Game
class ShapeAudio {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
    }

    playTone(freq, type = "sine", duration = 0.1, gainVal = 0.08) {
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
            // Audio error or not permitted
        }
    }

    playCorrect() {
        this.playTone(587.33, "triangle", 0.1, 0.1);
        setTimeout(() => this.playTone(880, "triangle", 0.15, 0.12), 80);
    }

    playWrong() {
        this.playTone(180, "sawtooth", 0.25, 0.1);
    }

    playGameOver() {
        this.playTone(400, "sine", 0.2, 0.1);
        setTimeout(() => this.playTone(320, "sine", 0.2, 0.1), 180);
        setTimeout(() => this.playTone(240, "sine", 0.4, 0.12), 360);
    }
}

const shapeAudio = new ShapeAudio();

if (typeof module !== "undefined" && module.exports) {
    module.exports = { ShapeAudio, shapeAudio };
}
