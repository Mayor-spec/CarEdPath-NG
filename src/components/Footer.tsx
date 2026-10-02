import React from 'react';
import { TabType } from '../types';
import { CarEdPathLogo } from './CarEdPathLogo';

interface FooterProps {
  onSelectTab: (tab: TabType) => void;
  onOpenPivotModal: () => void;
  onOpenSampleRoadmap: () => void;
  onOpenSubmitModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenPivotModal,
  onOpenSampleRoadmap,
  onOpenSubmitModal
}) => {
  return (
    <footer className="px-4 py-8 sm:py-10 flex flex-col gap-6 bg-[#0a192f] text-slate-300 border-t border-blue-950">
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
        {/* Brand Info */}
        <div className="flex flex-col gap-2">
          <CarEdPathLogo size="md" theme="dark" />
          <p className="text-[13px] text-slate-400 leading-relaxed max-w-lg">
            An AI career-navigation mentor helping Nigerian secondary-school students make better-informed decisions about their courses, universities, and future careers.
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-bold text-white">
              Resources
            </span>
            <button 
              onClick={() => onSelectTab('fields')} 
              className="text-[12px] text-slate-400 hover:text-white text-left cursor-pointer transition-colors"
            >
              JAMB &amp; WAEC Guide
            </button>
            <button 
              onClick={() => onSelectTab('profile')} 
              className="text-[12px] text-slate-400 hover:text-white text-left cursor-pointer transition-colors"
            >
              Catchment Area Map
            </button>
            <button 
              onClick={onOpenPivotModal} 
              className="text-[12px] text-slate-400 hover:text-white text-left cursor-pointer transition-colors"
            >
              UTME Pivot Simulator
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-bold text-white">
              Opportunities &amp; Guidance
            </span>
            <button 
              onClick={() => onSelectTab('grants')} 
              className="text-[12px] text-slate-400 hover:text-white text-left cursor-pointer transition-colors"
            >
              Secondary &amp; Tertiary Scholarships
            </button>
            <button 
              onClick={() => onSelectTab('mentor')} 
              className="text-[12px] text-slate-400 hover:text-white text-left cursor-pointer transition-colors"
            >
              Secondary Student Mentorship
            </button>
            <button 
              onClick={onOpenSampleRoadmap} 
              className="text-[12px] text-slate-400 hover:text-white text-left cursor-pointer transition-colors"
            >
              Example Student Journeys
            </button>
            {onOpenSubmitModal && (
              <button 
                onClick={onOpenSubmitModal} 
                className="text-[12px] text-amber-300 hover:text-white text-left cursor-pointer transition-colors flex items-center gap-1 font-semibold pt-0.5"
              >
                <span className="material-symbols-outlined text-[14px]">add_circle</span>
                <span>Submit Opportunity / Resource</span>
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
            <span className="text-[13px] font-bold text-white">
              National Standards
            </span>
            <span className="text-[12px] text-slate-400">JAMB CAPS Verified</span>
            <span className="text-[12px] text-slate-400">NUC Accredited Programs</span>
            <span className="text-[12px] text-slate-400">NBTE Polytechnic Pathways</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-3.5 rounded-xl bg-blue-950/60 flex flex-col gap-1 border border-blue-900/40">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-white">Disclaimer:</strong> CarEdPath NG is an independent guidance initiative tailored to Nigerian tertiary admission standards (JAMB, NUC, NBTE). All cut-off advice is advisory based on official past cycles.
          </p>
        </div>

        {/* Copyright & Discreet Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-blue-950">
          <div className="flex items-center gap-3 flex-wrap text-[12px] text-slate-500">
            <span>© 2026 CarEdPath NG</span>
            {onOpenSubmitModal && (
              <>
                <span>•</span>
                <button
                  type="button"
                  onClick={onOpenSubmitModal}
                  className="text-slate-400 hover:text-amber-300 underline decoration-slate-600 underline-offset-2 transition-colors cursor-pointer"
                >
                  Submit an Opportunity or Mentor Story
                </button>
              </>
            )}
          </div>
          <span className="text-[12px] text-slate-300 flex items-center gap-1 font-semibold">
            <span>Made with grit for Nigerian girls</span>
            <span className="material-symbols-outlined text-[14px] text-[#dc2626]">favorite</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
