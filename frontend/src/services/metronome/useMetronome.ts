import { useEffect, useRef, useState } from "react";

export const useMetronome = (initialBpm: number) => {
  const [running, setRunning] = useState(false);
  const [bpm, setBpm] = useState(initialBpm || 120);
  const intervalRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playClick = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 880;
    gain.gain.value = 0.1;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  };

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      intervalRef.current = null;
      return;
    }
    const interval = (60 / bpm) * 1000;
    playClick();
    intervalRef.current = window.setInterval(playClick, interval);
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [running, bpm]);

  return {
    bpm,
    setBpm,
    running,
    toggle: () => setRunning((prev) => !prev)
  };
};
