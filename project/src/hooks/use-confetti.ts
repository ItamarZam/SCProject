import { useState, useEffect } from 'react';

export const useConfetti = (duration = 2000) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, duration);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [duration]);

  return showConfetti;
};