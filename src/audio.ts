const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return null;
  return new AudioContextClass();
};

let audioCtx: AudioContext | null = null;

export const playSound = (type: 'success' | 'error') => {
  try {
    if (!audioCtx) {
      audioCtx = getAudioContext();
    }

    if (!audioCtx) return;

    // Resume context if it was suspended (browser policy)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'success') {
      // "Coin" sound
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(987.77, now); // B5
      oscillator.frequency.exponentialRampToValueAtTime(1318.51, now + 0.1); // E6

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.5, now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      oscillator.start(now);
      oscillator.stop(now + 0.3);
    } else {
      // "Loss" sound - Softer descending boop
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(300, now);
      oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.4);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.4, now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      oscillator.start(now);
      oscillator.stop(now + 0.4);
    }
  } catch (err) {
    console.error('Failed to play sound', err);
  }
};
