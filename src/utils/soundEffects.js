// Web Audio API Synthesizer for Nova Portal
// Generates soft celestial sounds with zero external audio assets

const MAX_CONCURRENT_SOUNDS = 8;

class SoundController {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.ambientOsc1 = null;
    this.ambientOsc2 = null;
    this.ambientGain = null;
    this.activeSounds = 0;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  _canPlay() {
    if (this.activeSounds >= MAX_CONCURRENT_SOUNDS) return false;
    return true;
  }

  _trackSound(duration) {
    this.activeSounds++;
    setTimeout(() => { this.activeSounds = Math.max(0, this.activeSounds - 1); }, duration * 1000);
  }

  toggleMute() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbient();
    } else {
      this.startAmbient();
      this.playChime();
    }
    return !this.isMuted;
  }

  startAmbient() {
    if (this.isMuted || !this.ctx) return;
    this.stopAmbient();

    try {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(174.61, this.ctx.currentTime);

      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientOsc2.type = 'sine';
      this.ambientOsc2.frequency.setValueAtTime(261.63, this.ctx.currentTime);

      this.ambientOsc1.connect(this.ambientGain);
      this.ambientOsc2.connect(this.ambientGain);

      this.ambientOsc1.start();
      this.ambientOsc2.start();
    } catch (e) {
      console.warn("Audio ambient error:", e);
    }
  }

  stopAmbient() {
    try {
      if (this.ambientOsc1) {
        this.ambientOsc1.stop();
        this.ambientOsc1.disconnect();
        this.ambientOsc1 = null;
      }
      if (this.ambientOsc2) {
        this.ambientOsc2.stop();
        this.ambientOsc2.disconnect();
        this.ambientOsc2 = null;
      }
    } catch (e) {
      // ignore stop errors
    }
  }

  playChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this._canPlay()) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.6);
      this._trackSound(0.6);
    } catch (e) { }
  }

  playShiftForm() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this._canPlay()) return;

    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.035, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.4);
      });
      this._trackSound(0.64);
    } catch (e) { }
  }

  playTransmission() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this._canPlay()) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.5);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.8);
      this._trackSound(0.8);
    } catch (e) { }
  }

  playGuitarString(freq = 440) {
    this.init();
    if (!this.ctx || !this._canPlay()) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);
      this._trackSound(1.2);
    } catch (e) { }
  }

  playCelestialChord() {
    this.init();
    if (!this.ctx || !this._canPlay()) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    try {
      const chord = [261.63, 329.63, 392.00, 523.25, 659.25];
      chord.forEach((freq, idx) => {
        const now = this.ctx.currentTime + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.4);
      });
      this._trackSound(1.72);
    } catch (e) { }
  }

  playStaffAwaken() {
    this.init();
    if (!this.ctx || !this._canPlay()) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    try {
      const now = this.ctx.currentTime;
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(120, now);
      bassOsc.frequency.exponentialRampToValueAtTime(50, now + 0.8);
      bassGain.gain.setValueAtTime(0.18, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      bassOsc.connect(bassGain);
      bassGain.connect(this.ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + 0.8);

      [440, 554.37, 659.25, 880, 1108.73, 1318.51].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = now + idx * 0.06;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.4, t + 0.35);
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.8);
      });
      this._trackSound(1.1);
    } catch (e) { }
  }

  playPageTurn() {
    this.init();
    if (!this.ctx || !this._canPlay()) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    try {
      const now = this.ctx.currentTime;
      // Synthesize soft parchment friction whoosh
      const bufferSize = this.ctx.sampleRate * 0.22;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(700, now + 0.22);
      filter.Q.setValueAtTime(1.8, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.22);

      // Subtle celestial chime harmonic on page settle
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now + 0.05); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3); // A5
      oscGain.gain.setValueAtTime(0.02, now + 0.05);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start(now + 0.05);
      osc.stop(now + 0.35);

      this._trackSound(0.4);
    } catch (e) { }
  }
}

export const soundFx = new SoundController();
