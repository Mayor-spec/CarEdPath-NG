import React, { useState } from 'react';

interface BentoGridProps {
  onOpenPivotModal: () => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onOpenPivotModal }) => {
  const [isJargonOpen, setIsJargonOpen] = useState(false);
  const [checklist, setChecklist] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false
  });

  const toggleCheck = (idx: number) => {
    setChecklist(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <section className="px-4 py-8 sm:py-10 flex flex-col gap-5 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-5">
        {/* Section Header with Touch of Red */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-bold text-[#dc2626] uppercase tracking-widest">
            Built for Nigeria
          </span>
          <h2 className="font-serif-headline text-[24px] sm:text-[30px] font-bold text-[#0a192f] leading-tight">
            Why Nigerian Secondary Students Need More Than Generic Career Advice
          </h2>
          <p className="text-[14px] sm:text-[15px] text-slate-600 leading-relaxed max-w-2xl">
            Our education system has unique bottlenecks — catchment areas, university strikes, and shifting cut-offs. CarEdPath NG navigates around them.
          </p>
        </div>

        {/* Bento Tiles Grid */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 pt-1">
          {/* Card A: No Confusing Jargon */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col justify-between gap-3 hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-950/10 text-[#0a192f] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[22px]">menu_book</span>
                </div>
                <h3 className="font-serif-headline text-[18px] font-bold text-[#0a192f]">
                  No Confusing Jargon
                </h3>
              </div>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                Catchment areas, Direct Entry, JAMB CAPS, Post-UTME, and NUC Accreditation explained in everyday Nigerian English with zero confusion.
              </p>
            </div>

            {/* Accordion Trigger */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                id="jargon-accordion-btn"
                className="self-start text-left px-3 py-1.5 rounded-lg bg-slate-100 text-[12px] font-semibold text-[#dc2626] hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                onClick={() => setIsJargonOpen(!isJargonOpen)}
                type="button"
              >
                <span>{isJargonOpen ? 'Hide Explanation' : 'See: Catchment Area vs Merit List'}</span>
                <span className="material-symbols-outlined text-[16px]">
                  {isJargonOpen ? 'expand_less' : 'info'}
                </span>
              </button>

              {isJargonOpen && (
                <div 
                  className="p-3 rounded-xl bg-slate-50 text-[12px] text-slate-700 border border-slate-200 animate-in fade-in duration-200 leading-relaxed" 
                  id="jargon-preview"
                >
                  <strong className="text-[#0a192f]">Quick breakdown:</strong> Merit cut-off applies to the top scores nationwide regardless of your state. Catchment area is a lower score requirement granted to candidates from neighboring geographical states of that federal university.
                </div>
              )}
            </div>
          </div>

          {/* Card B: The 'What If?' Safety Net */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col justify-between gap-3 hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#dc2626] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[22px]">security</span>
                </div>
                <h3 className="font-serif-headline text-[18px] font-bold text-[#0a192f]">
                  The "What If?" Safety Net
                </h3>
              </div>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                Score 190 instead of 250 in JAMB? School fees suddenly tight? CarEdPath NG instantly provides verified fallback courses, JUPEB options, professional certificates, and tuition-free polytechnic routes.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/5 border border-blue-900/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[#dc2626] text-[20px] flex-shrink-0">alt_route</span>
                <span className="text-[12px] font-semibold text-[#0a192f] truncate">Simulate a JAMB Cut-Off Pivot</span>
              </div>
              <button
                id="bento-try-scenario-btn"
                className="px-3 py-1.5 rounded-full bg-[#dc2626] text-white text-[12px] font-semibold flex-shrink-0 hover:bg-[#b91c1c] active:scale-95 transition-all cursor-pointer shadow-sm"
                onClick={onOpenPivotModal}
                type="button"
              >
                Try Scenario
              </button>
            </div>
          </div>

          {/* Card C: Action In 90 Days */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col justify-between gap-3 hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-950/10 text-[#0a192f] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[22px]">rocket_launch</span>
                </div>
                <h3 className="font-serif-headline text-[18px] font-bold text-[#0a192f]">
                  Action In 90 Days
                </h3>
              </div>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                No abstract motivational quotes. You get concrete, verified tasks you can kick off this weekend.
              </p>
            </div>

            {/* Interactive Micro Checklist */}
            <div className="flex flex-col gap-2 pt-1">
              <label 
                className="flex items-start gap-2.5 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                onClick={() => toggleCheck(1)}
              >
                <input
                  checked={checklist[1]}
                  onChange={() => {}}
                  className="w-4 h-4 rounded text-[#0a192f] accent-[#0a192f] mt-0.5 cursor-pointer"
                  type="checkbox"
                />
                <span className={`text-[12px] leading-tight ${checklist[1] ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                  1. Confirm WAEC subject combinations with JAMB brochure
                </span>
              </label>

              <label 
                className="flex items-start gap-2.5 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                onClick={() => toggleCheck(2)}
              >
                <input
                  checked={checklist[2]}
                  onChange={() => {}}
                  className="w-4 h-4 rounded text-[#0a192f] accent-[#0a192f] mt-0.5 cursor-pointer"
                  type="checkbox"
                />
                <span className={`text-[12px] leading-tight ${checklist[2] ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                  2. Identify 3 federal universities with lower catchment cut-off
                </span>
              </label>

              <label 
                className="flex items-start gap-2.5 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                onClick={() => toggleCheck(3)}
              >
                <input
                  checked={checklist[3]}
                  onChange={() => {}}
                  className="w-4 h-4 rounded text-[#0a192f] accent-[#0a192f] mt-0.5 cursor-pointer"
                  type="checkbox"
                />
                <span className={`text-[12px] leading-tight ${checklist[3] ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                  3. Explore in-app STEM scholarships &amp; secondary competitions
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
