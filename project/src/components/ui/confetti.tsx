import React, { useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  rotation: number;
  size: number;
  color: string;
}

interface ConfettiProps {
  duration?: number;
  pieces?: number;
}

const colors = ['#6FDDF6', '#6772F0', '#FFD700', '#FF69B4', '#4CAF50'];

const Confetti: React.FC<ConfettiProps> = ({ duration = 2000, pieces = 50 }) => {
  const [scope, animate] = useAnimate();

  const confettiPieces: ConfettiPiece[] = Array.from({ length: pieces }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    delay: Math.random() * 0.5,
    rotation: Math.random() * 360,
    size: Math.random() * 8 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  useEffect(() => {
    const animations = confettiPieces.map((piece) => {
      return animate(
        `#confetti-${piece.id}`,
        {
          y: ['-10%', '100vh'],
          rotate: [0, piece.rotation + 720],
          opacity: [1, 0],
        },
        {
          duration: duration / 1000,
          delay: piece.delay,
          ease: [0.25, 0.1, 0.25, 1],
        }
      );
    });

    return () => {
      animations.forEach((animation) => animation.stop());
    };
  }, [animate, confettiPieces, duration]);

  return (
    <motion.div
      ref={scope}
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          id={`confetti-${piece.id}`}
          className="absolute top-0"
          style={{
            left: piece.x,
            width: piece.size,
            height: piece.size * 0.4,
            backgroundColor: piece.color,
            borderRadius: 2,
          }}
          initial={{ y: '-10%', rotate: 0, opacity: 1 }}
        />
      ))}
    </motion.div>
  );
};

export default Confetti;