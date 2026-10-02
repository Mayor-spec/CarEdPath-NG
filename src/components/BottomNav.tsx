import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-white/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(10,25,47,0.08)] border-t border-slate-200">
      <div className="h-16 px-2 max-w-md mx-auto flex items-center justify-around">
        {/* Tab 1: Hub */}
        <button
          id="nav-tab-hub"
          aria-current={currentTab === 'hub' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] h-14 transition-colors cursor-pointer ${
            currentTab === 'hub'
              ? 'text-[#0a192f] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
          onClick={() => onSelectTab('hub')}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">dashboard</span>
          <span className="text-[11px] mt-0.5 tracking-tight">Hub</span>
        </button>

        {/* Tab 2: Fields */}
        <button
          id="nav-tab-fields"
          aria-current={currentTab === 'fields' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] h-14 transition-colors cursor-pointer ${
            currentTab === 'fields'
              ? 'text-[#0a192f] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
          onClick={() => onSelectTab('fields')}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">domain</span>
          <span className="text-[11px] mt-0.5 tracking-tight">Fields</span>
        </button>

        {/* Tab 3: Mentor AI (Touch of Red Center Elevated Button) */}
        <button
          id="nav-tab-mentor"
          aria-current={currentTab === 'mentor' ? 'page' : undefined}
          className="flex flex-col items-center justify-center min-w-[56px] h-14 transition-colors relative cursor-pointer group"
          onClick={() => onSelectTab('mentor')}
          type="button"
        >
          <div className="w-11 h-11 -mt-5 rounded-full bg-[#dc2626] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(220,38,38,0.45)] group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[22px]">psychology</span>
          </div>
          <span 
            className={`text-[11px] mt-1 tracking-tight ${
              currentTab === 'mentor' ? 'text-[#dc2626] font-bold' : 'text-slate-500'
            }`}
          >
            Mentor AI
          </span>
        </button>

        {/* Tab 4: Opportunities Hub */}
        <button
          id="nav-tab-grants"
          aria-current={currentTab === 'grants' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] h-14 transition-colors cursor-pointer ${
            currentTab === 'grants'
              ? 'text-[#0a192f] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
          onClick={() => onSelectTab('grants')}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">school</span>
          <span className="text-[11px] mt-0.5 tracking-tight">Opps Hub</span>
        </button>

        {/* Tab 5: Profile */}
        <button
          id="nav-tab-profile"
          aria-current={currentTab === 'profile' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] h-14 transition-colors cursor-pointer ${
            currentTab === 'profile'
              ? 'text-[#0a192f] font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
          onClick={() => onSelectTab('profile')}
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">account_circle</span>
          <span className="text-[11px] mt-0.5 tracking-tight">Profile</span>
        </button>
      </div>
    </nav>
  );
};
