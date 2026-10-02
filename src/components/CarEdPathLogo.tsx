import React from 'react';

interface CarEdPathLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  theme?: 'dark' | 'light';
}

export const CarEdPathLogo: React.FC<CarEdPathLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  theme = 'dark'
}) => {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 42 : 34;
  const textSize = size === 'sm' ? 'text-[15px]' : size === 'lg' ? 'text-[22px]' : 'text-[18px]';
  const badgeSize = size === 'sm' ? 'text-[9px] px-1 py-0.2' : 'text-[10px] px-1.5 py-0.5';

  return (
    <div className={`inline-flex items-center gap-2 select-none flex-shrink-0 whitespace-nowrap ${className}`}>
      {/* Brand Icon Mark */}
      <div
        style={{ width: iconSize, height: iconSize }}
        className="relative rounded-xl bg-gradient-to-br from-[#0a192f] via-[#102444] to-[#1e3a8a] p-1 shadow-sm border border-[#dc2626]/40 flex-shrink-0 flex items-center justify-center overflow-hidden group"
      >
        {/* Glow accent */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#dc2626]/30 rounded-full blur-xs" />
        
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Graduation Cap Top */}
          <path
            d="M20 7L35 15L20 23L5 15L20 7Z"
            fill="#ffffff"
          />
          {/* Tassel */}
          <path
            d="M34 16V26"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="34" cy="27" r="1.5" fill="#f59e0b" />
          {/* Cap Base Underlayer */}
          <path
            d="M12 19V25C12 28 15.5 30 20 30C24.5 30 28 28 28 25V19"
            stroke="#93c5fd"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          {/* Career Path Forward Surging Arrow (Red & Gold) */}
          <path
            d="M7 29C11 25 17 24 23 27C27 29 30 32 33 35"
            stroke="#dc2626"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <polygon points="34,31 36,36 30,36" fill="#dc2626" />
        </svg>
      </div>

      {/* Brand Typography & Nigerian Badge */}
      {showText && (
        <div className="flex items-center gap-1.5 leading-none flex-shrink-0 whitespace-nowrap">
          <span
            className={`font-serif-headline font-bold tracking-tight ${textSize} ${
              theme === 'dark' ? 'text-white' : 'text-[#0a192f]'
            }`}
          >
            CarEd<span className="text-[#ef4444]">Path</span>
          </span>
          <span
            className={`rounded-md font-bold uppercase tracking-wider bg-emerald-600/90 text-white border border-emerald-400/40 shadow-xs ${badgeSize}`}
          >
            NG
          </span>
        </div>
      )}
    </div>
  );
};
