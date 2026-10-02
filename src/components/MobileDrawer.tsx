import React from 'react';
import { TabType } from '../types';
import { CarEdPathLogo } from './CarEdPathLogo';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: TabType) => void;
  onOpenSampleRoadmap: () => void;
  onOpenPivotModal: () => void;
  onOpenIntakeModal: () => void;
  onOpenSubmitModal?: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onOpenSampleRoadmap,
  onOpenPivotModal,
  onOpenIntakeModal,
  onOpenSubmitModal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex" id="mobile-drawer-root">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0a192f]/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <aside 
        className="relative w-4/5 max-w-xs h-full bg-white flex flex-col shadow-[0_16px_32px_-4px_rgba(10,25,47,0.2)] pt-safe pb-safe z-10 animate-in slide-in-from-left duration-200"
      >
        {/* Drawer Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 bg-[#0a192f] text-white">
          <CarEdPathLogo size="sm" theme="dark" />
          <button 
            id="drawer-close-btn"
            className="w-10 h-10 flex items-center justify-center rounded-full text-white/80 hover:bg-white/10 transition-colors cursor-pointer" 
            onClick={onClose} 
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Advisory Session Badge */}
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
          <div className="p-2.5 rounded-xl bg-blue-950/10 flex items-center gap-3 border border-blue-900/10">
            <span className="material-symbols-outlined text-[#dc2626] text-[22px]">auto_awesome</span>
            <div className="flex flex-col">
              <span className="text-[12px] text-[#0a192f] font-bold">Secondary Career Navigation</span>
              <span className="text-[11px] text-slate-500">For Nigerian Secondary Students</span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-3 flex flex-col gap-1 overflow-y-auto">
          <button 
            id="drawer-nav-intake"
            className="flex items-center gap-3 px-3 py-3 rounded-xl bg-red-50 text-[#991b1b] border border-red-200 hover:bg-red-100 transition-colors text-left cursor-pointer font-bold"
            onClick={() => {
              onClose();
              onOpenIntakeModal();
            }}
          >
            <span className="material-symbols-outlined text-[#dc2626] text-[20px]">explore</span>
            <div className="flex flex-col">
              <span className="text-[14px]">Tell Us About You</span>
              <span className="text-[11px] text-red-600 font-normal">Map My Career Stepper</span>
            </div>
          </button>

          <button 
            id="drawer-nav-hub"
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors text-left cursor-pointer"
            onClick={() => {
              onSelectTab('hub');
              onClose();
            }}
          >
            <span className="material-symbols-outlined text-[#0a192f] text-[20px]">dashboard</span>
            <span className="text-[14px] font-semibold">Career Hub</span>
          </button>

          <button 
            id="drawer-nav-fields"
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors text-left cursor-pointer"
            onClick={() => {
              onSelectTab('fields');
              onClose();
            }}
          >
            <span className="material-symbols-outlined text-[#0a192f] text-[20px]">explore</span>
            <span className="text-[14px] font-semibold">In-Demand Fields</span>
          </button>

          <button 
            id="drawer-nav-sample-roadmap"
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors text-left cursor-pointer"
            onClick={() => {
              onClose();
              onOpenSampleRoadmap();
            }}
          >
            <span className="material-symbols-outlined text-[#0a192f] text-[20px]">auto_stories</span>
            <span className="text-[14px] font-semibold">Example Student Journey</span>
          </button>

          <button 
            id="drawer-nav-pivot"
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors text-left cursor-pointer"
            onClick={() => {
              onClose();
              onOpenPivotModal();
            }}
          >
            <span className="material-symbols-outlined text-[#dc2626] text-[20px]">alt_route</span>
            <span className="text-[14px] font-semibold">JAMB Cut-Off Pivot Simulator</span>
          </button>

          <button 
            id="drawer-nav-grants"
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors text-left cursor-pointer"
            onClick={() => {
              onSelectTab('grants');
              onClose();
            }}
          >
            <span className="material-symbols-outlined text-[#0a192f] text-[20px]">school</span>
            <span className="text-[14px] font-semibold">Nigerian Opportunity Hub</span>
          </button>

          <button 
            id="drawer-nav-submit"
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors text-left cursor-pointer"
            onClick={() => {
              onClose();
              if (onOpenSubmitModal) onOpenSubmitModal();
            }}
          >
            <span className="material-symbols-outlined text-[#dc2626] text-[20px]">handshake</span>
            <span className="text-[14px] font-semibold">Submit Opportunity / Story</span>
          </button>

          <button 
            id="drawer-nav-profile"
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors text-left cursor-pointer"
            onClick={() => {
              onSelectTab('profile');
              onClose();
            }}
          >
            <span className="material-symbols-outlined text-[#0a192f] text-[20px]">account_circle</span>
            <span className="text-[14px] font-semibold">Mentee Profile &amp; Catchment</span>
          </button>
        </nav>

        {/* Drawer Footer CTA */}
        <div className="p-4 mt-auto border-t border-slate-200 bg-slate-50">
          <button 
            id="drawer-ask-mentor-btn"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#dc2626] text-white font-semibold text-[14px] shadow-md shadow-red-950/20 hover:bg-[#b91c1c] active:scale-[0.98] transition-all cursor-pointer"
            onClick={() => {
              onSelectTab('mentor');
              onClose();
            }}
          >
            <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
            <span>Ask Mentor AI</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
