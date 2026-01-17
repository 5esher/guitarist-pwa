import { useEffect, useRef, useState } from "react";

export const useAutoScroll = () => {
  const [enabled, setEnabled] = useState(false);
  const [speed, setSpeed] = useState(30);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      return;
    }

    const step = () => {
      window.scrollBy(0, speed / 60);
      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [enabled, speed]);

  return {
    enabled,
    setEnabled,
    speed,
    setSpeed
  };
};
