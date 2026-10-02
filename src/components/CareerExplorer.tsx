import React, { useState } from 'react';
import { CAREER_LIST } from '../data/careerData';
import { CareerDetail } from '../types';

interface CareerExplorerProps {
  onSelectCareerForRoadmap?: (career: CareerDetail) => void;
}

export const CareerExplorer: React.FC<CareerExplorerProps> = ({ onSelectCareerForRoadmap }) => {
  const [selectedId, setSelectedId] = useState<string>('mls');

  const selectedCareer = CAREER_LIST.find(c => c.id === selectedId) || CAREER_LIST[0];

  return (
    <section className="px-4 py-8 sm:py-10 flex flex-col gap-5 max-w-5xl mx-auto w-full">
      {/* Section Header with Touch of Red */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[12px] font-bold text-[#dc2626] uppercase tracking-widest">
          Targeted Insights
        </span>
        <h2 className="font-serif-headline text-[24px] sm:text-[30px] font-bold text-[#0a192f] leading-tight">
          Explore In-Demand Careers in Nigeria
        </h2>
        <p className="text-[14px] sm:text-[15px] text-slate-600 leading-relaxed max-w-2xl">
          Select a pathway to see instant subject combinations, degree length, and realistic Nigerian career outlook.
        </p>
      </div>

      {/* Horizontal Scrollable Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar" id="career-tabs">
        {CAREER_LIST.map(career => {
          const isActive = career.id === selectedId;
          return (
            <button
              key={career.id}
              id={`career-tab-${career.id}`}
              onClick={() => setSelectedId(career.id)}
              className={`career-btn px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#0a192f] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
              type="button"
            >
              {career.title.split(' ')[0]} {career.title.split(' ')[1] || ''}
            </button>
          );
        })}
      </div>

      {/* Dynamic Detail Card */}
      <div 
        className="p-4 sm:p-6 rounded-2xl bg-white shadow-md border border-slate-200 flex flex-col gap-4 transition-all" 
        id="career-card"
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span 
            className="text-[12px] font-bold px-3 py-1 rounded-full bg-blue-950/10 text-[#0a192f]" 
            id="career-badge"
          >
            {selectedCareer.badge}
          </span>
          <span 
            className="text-[13px] font-bold text-[#dc2626]" 
            id="career-duration"
          >
            {selectedCareer.duration}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 
            className="font-serif-headline text-[20px] sm:text-[24px] font-bold text-[#0a192f]" 
            id="career-title"
          >
            {selectedCareer.title}
          </h3>
          {onSelectCareerForRoadmap && (
            <button
              id="career-build-roadmap-btn"
              onClick={() => onSelectCareerForRoadmap(selectedCareer)}
              className="inline-flex items-center gap-1.5 self-start px-3.5 py-1.5 rounded-full bg-red-50 text-[#b91c1c] text-[12px] font-bold hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
              type="button"
            >
              <span>Build My Career Roadmap</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          )}
        </div>

        <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed">
          {selectedCareer.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Required WAEC / UTME Subjects
            </span>
            <p className="text-[13px] text-slate-900 font-semibold" id="career-subjects">
              {selectedCareer.subjects}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Top Nigerian Universities
            </span>
            <p className="text-[13px] text-slate-800" id="career-schools">
              {selectedCareer.schools}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Alternative Route (Plan B)
            </span>
            <p className="text-[13px] text-slate-800" id="career-alt">
              {selectedCareer.alt}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Starting Graduate Outlook
            </span>
            <p className="text-[13px] text-[#dc2626] font-bold" id="career-salary">
              {selectedCareer.salary}
            </p>
          </div>
        </div>

        {selectedCareer.catchmentTip && (
          <div className="p-3.5 rounded-xl bg-blue-950/5 border border-blue-900/10 flex items-start gap-2.5 text-[12px] text-[#0a192f] leading-relaxed">
            <span className="material-symbols-outlined text-[#dc2626] text-[18px] flex-shrink-0 mt-0.5">lightbulb</span>
            <div>
              <strong>Admission Strategy: </strong>
              {selectedCareer.catchmentTip}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
