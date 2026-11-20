/**
 * Audio synthesis & authentic letter playback helper for Kids Quran learning
 * Plays crystal-clear authentic Arabic letter recordings with fallback to Web Speech API
 */

class KidAudioManager {
  private audioCtx: AudioContext | null = null;
  private currentAudio: HTMLAudioElement | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  // Play a gentle joyful chime for kid clicking a letter
  playChime(freq = 523.25) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // safe fallback
    }
  }

  // Play authentic letter pronunciation audio (MP3 recording -> CDN fallback -> SpeechSynthesis)
  playLetterPronunciation(
    audioFile: string,
    cdnAudio: string,
    arabicName: string,
    onEnded?: () => void
  ) {
    // 1. Stop any previously playing audio to prevent overlapping
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {
        // ignore
      }
      this.currentAudio = null;
    }

    // 2. Play gentle child-friendly chime
    this.playChime(587.33);

    // 3. Try playing local MP3 audio
    const audio = new Audio(audioFile);
    this.currentAudio = audio;

    let hasFallbackRun = false;
    const runFallback = () => {
      if (hasFallbackRun) return;
      hasFallbackRun = true;

      // Try CDN fallback
      const cdn = new Audio(cdnAudio);
      this.currentAudio = cdn;
      cdn.onended = () => {
        onEnded?.();
      };
      cdn.onerror = () => {
        // Fallback to Web Speech API with Tashkeel
        this.speakArabic(arabicName);
        onEnded?.();
      };
      cdn.play().catch(() => {
        this.speakArabic(arabicName);
        onEnded?.();
      });
    };

    audio.onended = () => {
      this.currentAudio = null;
      onEnded?.();
    };

    audio.onerror = () => {
      runFallback();
    };

    audio.play().catch(() => {
      runFallback();
    });
  }

  // Play authentic Dua audio recording with fallback to SpeechSynthesis
  playDuaAudio(audioFile: string, arabicText: string, onEnded?: () => void) {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {
        // ignore
      }
      this.currentAudio = null;
    }

    this.playChime(659.25);

    const audio = new Audio(audioFile);
    this.currentAudio = audio;

    let hasFallbackRun = false;
    const runFallback = () => {
      if (hasFallbackRun) return;
      hasFallbackRun = true;
      this.speakArabic(arabicText);
      setTimeout(() => {
        onEnded?.();
      }, 3500);
    };

    audio.onended = () => {
      this.currentAudio = null;
      onEnded?.();
    };

    audio.onerror = () => {
      runFallback();
    };

    audio.play().catch(() => {
      runFallback();
    });
  }

  // Play celebration fanfare for quiz win
  playVictory() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + idx * 0.1;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.4);
      });
    } catch {
      // safe fallback
    }
  }

  // Play gentle try-again tone
  playTryAgain() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(329.63, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(261.63, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // safe fallback
    }
  }

  // Speak Arabic text using browser speech synthesis (male voice preferred)
  speakArabic(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.82; // Deliberate and clear for kids
      utterance.pitch = 0.85; // Male baritone pitch

      const voices = window.speechSynthesis.getVoices();
      // Look for male Arabic voices first
      const maleArabicVoice = voices.find((v) =>
        v.lang.startsWith('ar') &&
        (v.name.toLowerCase().includes('male') ||
         v.name.toLowerCase().includes('hamed') ||
         v.name.toLowerCase().includes('maged') ||
         v.name.toLowerCase().includes('tarik') ||
         v.name.toLowerCase().includes('shakir') ||
         v.name.toLowerCase().includes('naayf') ||
         v.name.toLowerCase().includes('bilal'))
      ) || voices.find((v) => v.lang.startsWith('ar'));

      if (maleArabicVoice) {
        utterance.voice = maleArabicVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // safe fallback
    }
  }

  // Speak Bengali explanation
  speakBengali(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'bn-BD';
      utterance.rate = 0.9;
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      const bnVoice = voices.find((v) => v.lang.startsWith('bn'));
      if (bnVoice) {
        utterance.voice = bnVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // safe fallback
    }
  }
}

export const kidAudio = new KidAudioManager();
