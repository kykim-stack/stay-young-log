'use client';

import { useEffect, useState } from 'react';

export default function MyCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-6 h-6 bg-(--accent) opacity-50 rounded-full pointer-events-none z-9999 transition-transform duration-150 ease-out"
      style={{
        left: 0,
        top: 0,
        transform: `translate3d(${position.x - 12}px, ${position.y - 12}px, 0)`,
      }}
    />
  );
}
