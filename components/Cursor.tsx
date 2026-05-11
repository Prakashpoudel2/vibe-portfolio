'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function Cursor() {
  const [mounted, setMounted] = useState(false);
  
  // Spring config for buttery smooth vibe coding feel
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  
  const ringX = useSpring(0, { damping: 40, stiffness: 200, mass: 1 });
  const ringY = useSpring(0, { damping: 40, stiffness: 200, mass: 1 });

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4); // offset by half width (8px / 2)
      cursorY.set(e.clientY - 4);
      ringX.set(e.clientX - 20);  // offset by half width (40px / 2)
      ringY.set(e.clientY - 20);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [cursorX, cursorY, ringX, ringY]);

  if (!mounted) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999]"
        style={{ x: cursorX, y: cursorY }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-primary/50 rounded-full pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY }}
      />
    </>
  );
}
