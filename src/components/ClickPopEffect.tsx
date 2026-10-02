import React, { useState, useEffect, useCallback } from 'react';

interface ClickPop {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const ClickPopEffect: React.FC = () => {
  const [pops, setPops] = useState<ClickPop[]>([]);

  const handlePointerDown = useCallback((e: MouseEvent | TouchEvent) => {
    let clientX = 0;
    let clientY = 0;

    if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      return;
    }

    // Palette harmonized with CarEdPath NG brand: Crimson, Navy Blue, Golden Honey, Emerald
    const colors = ['#dc2626', '#0a192f', '#f59e0b', '#2563eb', '#059669'];
    const selectedColor = colors[Math.floor(Math.random() * colors.length)];

    const newPop: ClickPop = {
      id: Date.now() + Math.random(),
      x: clientX,
      y: clientY,
      color: selectedColor
    };

    setPops((prev) => [...prev.slice(-8), newPop]);

    setTimeout(() => {
      setPops((prev) => prev.filter((p) => p.id !== newPop.id));
    }, 550);
  }, []);

  useEffect(() => {
    window.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [handlePointerDown]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {pops.map((pop) => (
        <div
          key={pop.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: pop.x, top: pop.y }}
        >
          {/* Main Expanding Pop Ring */}
          <div
            className="w-10 h-10 rounded-full border-2 animate-click-pop-ring opacity-95 shadow-sm"
            style={{ borderColor: pop.color }}
          />

          {/* Central Flash Dot */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full animate-click-pop-dot"
            style={{ backgroundColor: pop.color }}
          />

          {/* Radiating Accent Micro-Sparks */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <span
              key={deg}
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full animate-click-spark"
              style={
                {
                  backgroundColor: pop.color,
                  '--spark-deg': `${deg}deg`
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};
