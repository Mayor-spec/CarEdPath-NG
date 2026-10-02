import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRIMARY_CASE_STUDY } from '../data/careerData';

interface HeroSectionProps {
  onScrollToBuilder: () => void;
  onOpenSampleRoadmap: () => void;
  onOpenIntakeModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToBuilder,
  onOpenSampleRoadmap,
  onOpenIntakeModal
}) => {
  const [isBlueprintOpen, setIsBlueprintOpen] = useState(false);

  return (
    <div className="flex flex-col w-full">
      {/* Top Decorative Nigerian Heritage Geometric Trim - Deep Blue & Touch of Red */}
      <div className="w-full h-1.5 bg-gradient-to-r from-[#0a192f] via-[#dc2626] to-[#1e3a8a]" />

      {/* FIRST PART (HERO) - Starts with the rich Deep Blue colour instead of white */}
      <section className="w-full bg-gradient-to-b from-[#0a192f] via-[#0b1d3a] to-[#0e2448] text-white pt-6 pb-10 px-4 shadow-[0_8px_24px_-4px_rgba(10,25,47,0.3)]">
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-5">
          {/* Trust Pill Badge with Touch of Red */}
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dc2626] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#dc2626]"></span>
            </span>
            <span className="text-[12px] font-semibold tracking-wide">
              🇳🇬 An AI Career Mentor for Nigerian Secondary-School Students • 100% Free
            </span>
          </div>

          {/* Main Editorial Headline on Deep Blue Canvas */}
          <div className="flex flex-col gap-2.5">
            <h1 className="font-serif-headline text-[28px] sm:text-[40px] md:text-[44px] font-bold text-white tracking-tight leading-[1.18]">
              Turn Your Career Dreams Into a Realistic, Step-by-Step Nigerian Roadmap.
            </h1>
            <p className="text-[15px] sm:text-[17px] text-blue-100/90 leading-relaxed max-w-2xl font-normal">
              An AI career-navigation mentor helping Nigerian secondary-school students make better-informed decisions about their courses, universities, and future careers.
            </p>
          </div>

          {/* Dual Action CTAs - Featuring Touch of Red */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              id="hero-map-career-btn"
              onClick={onOpenIntakeModal}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#dc2626] text-white font-semibold text-[14px] sm:text-[15px] shadow-lg shadow-red-950/40 hover:bg-[#b91c1c] active:scale-[0.98] transition-all cursor-pointer"
              type="button"
            >
              <span>Map My Career (Free)</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button
              id="hero-sample-roadmap-btn"
              onClick={onOpenSampleRoadmap}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 text-white font-semibold text-[14px] sm:text-[15px] hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">description</span>
              <span>See Sample Roadmap</span>
            </button>
          </div>

          {/* Social Proof Metrics Bar - Factual non-numeric institutional framing */}
          <div className="p-3.5 rounded-xl bg-[#112444]/90 backdrop-blur-md border border-blue-800/40 flex flex-wrap items-center justify-between gap-y-2.5 gap-x-4 text-white shadow-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#dc2626] text-[20px]">verified</span>
              <span className="text-[12px] sm:text-[13px] font-medium text-slate-100">Built for every JAMB-accredited Nigerian institution</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-[20px]">policy</span>
              <span className="text-[12px] sm:text-[13px] font-medium text-slate-100">Grounded in Official IBASS &amp; University Portals</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-300 text-[20px]">stars</span>
              <span className="text-[12px] sm:text-[13px] font-medium text-slate-100">STEM, Health, Law &amp; Tech</span>
            </div>
          </div>

          {/* Visual Feature Card: Example Journey (Sample Student) */}
          <div 
            className="rounded-2xl bg-white text-[#0f172a] p-4 sm:p-5 shadow-xl border border-blue-900/20 flex flex-col gap-4 relative overflow-hidden mt-1" 
            id="case-study"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-slate-100 ring-2 ring-slate-200 flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px] text-[#0a192f]">alt_route</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="inline-flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    Example Journey (Sample Student)
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">
                    {PRIMARY_CASE_STUDY.location}
                  </span>
                </div>
                <h3 className="font-serif-headline text-[18px] sm:text-[20px] font-bold text-[#0a192f] truncate mt-0.5">
                  {PRIMARY_CASE_STUDY.role}
                </h3>
                <p className="text-[13px] text-slate-600 truncate">
                  {PRIMARY_CASE_STUDY.subRole}
                </p>
              </div>
            </div>

            {/* Roadmap Progression Timeline */}
            <div className="flex flex-col gap-2 pl-2 pt-1">
              {PRIMARY_CASE_STUDY.steps.map((step, idx) => (
                <React.Fragment key={step.number}>
                  <div className="flex items-start gap-3 relative">
                    <div 
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0 mt-0.5 ${
                        step.number === 1 ? 'bg-[#0a192f] text-white' :
                        step.number === 2 ? 'bg-[#dc2626] text-white shadow-xs' :
                        step.number === 3 ? 'bg-[#1e3a8a] text-white' :
                        'bg-[#0a192f] text-white'
                      }`}
                    >
                      {step.number}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-[13px] font-semibold text-[#0a192f]">
                        {step.title}
                      </span>
                      <span className="text-[12px] text-slate-600">
                        {step.description}
                      </span>
                    </div>
                  </div>
                  {idx < PRIMARY_CASE_STUDY.steps.length - 1 && (
                    <div 
                      className={`w-0.5 h-4 ml-3 ${
                        step.number === 1 ? 'bg-blue-900/20' :
                        step.number === 2 ? 'bg-red-500/30' :
                        'bg-blue-800/20'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Expand Details Dropdown Interactive */}
            <button
              id="example-toggle-blueprint-btn"
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-100 text-[#0a192f] text-[13px] font-semibold flex items-center justify-between hover:bg-slate-200 transition-all duration-300 cursor-pointer"
              onClick={() => setIsBlueprintOpen(!isBlueprintOpen)}
              type="button"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#dc2626]">visibility</span>
                <span>View How CarEdPath NG Navigates Subject &amp; JAMB Blueprints</span>
              </span>
              <span className={`material-symbols-outlined text-[18px] transition-transform duration-500 ease-out ${isBlueprintOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            <AnimatePresence>
              {isBlueprintOpen && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: -4 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -4 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="p-3.5 rounded-xl bg-slate-50 text-slate-800 flex flex-col gap-2.5 border border-slate-200 overflow-hidden" 
                  id="example-step-details"
                >
                  <p className="text-[13px] leading-relaxed">
                    <strong className="text-[#0a192f]">How CarEdPath NG Works:</strong> {PRIMARY_CASE_STUDY.insight}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PRIMARY_CASE_STUDY.keyStats.map((stat, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-full bg-slate-200 text-[11px] font-semibold text-[#0a192f]">
                        {stat}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};
