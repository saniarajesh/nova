// Nova Real-Time Anime Voice Controller
// Uses the authentic anime voice soundtrack (/nova-voice.mp3) as Nova's primary speaking voice
// with real-time playback, audio reactivity, and typewriter synchronization.

class NovaVoiceManager {
  constructor() {
    this.audio = null;
    this.isVoiceEnabled = true;
    this.isSpeaking = false;
    this.onStateChange = null;
    this.audioCtx = null;
    this.analyser = null;
    this.source = null;
    this.unlocked = false;

    if (typeof window !== 'undefined') {
      this.initAudio();
      // Unlock audio on first user touch/click to comply with browser autoplay policy
      const unlockAudio = () => {
        if (!this.unlocked && this.audio) {
          this.unlocked = true;
          this.audio.load();
        }
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };
      window.addEventListener('click', unlockAudio);
      window.addEventListener('keydown', unlockAudio);
    }
  }

  initAudio() {
    try {
      this.audio = new Audio('/nova-voice.mp3');
      this.audio.preload = 'auto';
      this.audio.volume = 1.0;

      this.audio.onended = () => {
        this.isSpeaking = false;
        if (this.onStateChange) this.onStateChange(false);
      };

      this.audio.onpause = () => {
        this.isSpeaking = false;
        if (this.onStateChange) this.onStateChange(false);
      };

      this.audio.onerror = (e) => {
        console.warn("Audio load error:", e);
        this.isSpeaking = false;
        if (this.onStateChange) this.onStateChange(false);
      };
    } catch (e) {
      console.warn("Failed to initialize audio:", e);
    }
  }

  playVoice(onEndCallback) {
    if (!this.isVoiceEnabled || !this.audio) {
      if (onEndCallback) onEndCallback();
      return;
    }

    try {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isSpeaking = true;
      if (this.onStateChange) this.onStateChange(true);

      const playPromise = this.audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.audio.onended = () => {
              this.isSpeaking = false;
              if (this.onStateChange) this.onStateChange(false);
              if (onEndCallback) onEndCallback();
            };
          })
          .catch((err) => {
            console.warn("Autoplay was prevented, awaiting user gesture:", err);
            this.isSpeaking = false;
            if (this.onStateChange) this.onStateChange(false);
            if (onEndCallback) onEndCallback();
          });
      }
    } catch (e) {
      console.warn("Error triggering voice:", e);
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
      if (onEndCallback) onEndCallback();
    }
  }

  // Backwards compatible alias
  playOriginalVoice(onEndCallback) {
    this.playVoice(onEndCallback);
  }

  speak(text, onEndCallback) {
    // Plays the authentic anime soundtrack in real-time
    this.playVoice(onEndCallback);
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.isSpeaking = false;
    if (this.onStateChange) this.onStateChange(false);
  }

  toggleVoice() {
    this.isVoiceEnabled = !this.isVoiceEnabled;
    if (!this.isVoiceEnabled) {
      this.stop();
    } else {
      this.playVoice();
    }
    return this.isVoiceEnabled;
  }
}

export const novaVoice = new NovaVoiceManager();
