import React from 'react';
import { TabType } from '../types';
import { CarEdPathLogo } from './CarEdPathLogo';

interface HeaderProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenDrawer: () => void;
  onOpenSampleRoadmap: () => void;
  onOpenIntakeModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenDrawer,
  onOpenSampleRoadmap,
  onOpenIntakeModal,
}) => {
  const getHeaderTitle = () => {
    switch (currentTab) {
      case 'hub':
        return 'Career Hub';
      case 'fields':
        return 'Career Fields';
      case 'mentor':
        return 'AI Mentor';
      case 'grants':
        return 'Grants & Awards';
      case 'profile':
        return 'Mentee Profile';
      default:
        return 'Career Hub';
    }
  };

  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-[#0a192f]/95 backdrop-blur-xl shadow-[0_2px_12px_rgba(10,25,47,0.25)] border-b border-blue-900/40 text-white">
      <div className="h-16 px-4 max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Drawer Trigger + Brand Logo */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <button
            id="header-drawer-toggle"
            aria-label="Open navigation menu"
            className="w-10 h-10 flex items-center justify-center rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer"
            onClick={onOpenDrawer}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>
          
          <button
            id="header-brand-btn"
            onClick={() => onTabChange('hub')}
            className="flex items-center cursor-pointer text-left py-1"
          >
            <CarEdPathLogo size="sm" theme="dark" />
          </button>
        </div>

        {/* Center: Current Section Indicator (Only on non-hub tabs on desktop/tablet to eliminate collisions) */}
        {currentTab !== 'hub' && (
          <div className="hidden md:flex items-center justify-center px-2 flex-1 min-w-0">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[12px] font-semibold text-slate-200 tracking-wide truncate max-w-[200px] text-center backdrop-blur-xs">
              {getHeaderTitle()}
            </span>
          </div>
        )}

        {/* Right: Quick Action CTAs */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
          {/* Touch of Red on Roadmap CTA button */}
          <button
            id="header-roadmap-btn"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#dc2626] text-white font-semibold text-[12px] shadow-[0_2px_8px_rgba(220,38,38,0.4)] active:scale-95 transition-all cursor-pointer hover:bg-[#b91c1c]"
            onClick={onOpenIntakeModal || onOpenSampleRoadmap}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">map</span>
            <span className="hidden sm:inline">Map Career</span>
          </button>

          <button
            id="header-profile-btn"
            onClick={() => onTabChange('profile')}
            className="w-8 h-8 rounded-full bg-[#172a46] border border-blue-700/40 flex items-center justify-center flex-shrink-0 shadow-sm hover:bg-blue-800 transition-colors cursor-pointer text-white"
            title="View Profile"
            type="button"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
