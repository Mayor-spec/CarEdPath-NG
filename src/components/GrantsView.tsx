import React, { useState } from 'react';
import { GRANTS_LIST } from '../data/careerData';
import { GrantOpportunity } from '../types';

interface GrantsViewProps {
  onGoToMentorAI: (query?: string) => void;
}

export const GrantsView: React.FC<GrantsViewProps> = ({ onGoToMentorAI }) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'STEM' | 'Tech' | 'Health'>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredGrants = GRANTS_LIST.filter(grant => {
    if (selectedFilter === 'All') return true;
    return grant.category === selectedFilter;
  });

  const handleCopyTitle = (grant: GrantOpportunity) => {
    navigator.clipboard.writeText(`${grant.title} - ${grant.organization}`);
    setCopiedId(grant.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-5 px-4 py-8 max-w-5xl mx-auto w-full">
      {/* Header Banner */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-red-50 text-[#b91c1c] border border-red-200 text-[11px] font-bold">
          <span className="material-symbols-outlined text-[15px] text-[#dc2626]">verified</span>
          <span>Verified Nigerian Financial Opportunities</span>
        </div>
        <h2 className="font-serif-headline text-[26px] sm:text-[34px] font-bold text-[#0a192f] leading-tight">
          Grants &amp; Scholarships for Nigerian Girls in STEM
        </h2>
        <p className="text-[14px] sm:text-[15px] text-slate-600 leading-relaxed max-w-2xl">
          School fees shouldn't derail your tertiary dreams. These verified corporate, federal, and community scholarships specifically fund secondary-school students and secondary leavers transitioning into tertiary institutions.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {(['All', 'STEM', 'Tech', 'Health'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-colors cursor-pointer ${
              selectedFilter === cat
                ? 'bg-[#0a192f] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            type="button"
          >
            {cat} {cat !== 'All' ? 'Opportunities' : 'All Grants'}
          </button>
        ))}
      </div>

      {/* Grants Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGrants.map(grant => (
          <div
            key={grant.id}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between gap-3 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-950/10 text-[#0a192f]">
                  {grant.category}
                </span>
                <span className="text-[11px] font-semibold text-[#b91c1c] bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                  {grant.applicationStage}
                </span>
              </div>

              <h3 className="font-serif-headline text-[18px] font-bold text-[#0a192f] leading-snug">
                {grant.title}
              </h3>
              <span className="text-[12px] text-slate-500 font-medium">
                {grant.organization}
              </span>
            </div>

            <div className="flex flex-col gap-2 pt-1 border-t border-slate-200">
              <div className="p-2.5 rounded-xl bg-slate-50 flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Award Value
                </span>
                <span className="text-[13px] font-bold text-[#dc2626]">
                  {grant.award}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Eligibility Criteria
                </span>
                <span className="text-[12px] text-slate-800 leading-relaxed">
                  {grant.eligibility}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Deadline: <strong>{grant.deadline}</strong></span>
                <span className="text-blue-900 font-semibold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[14px] text-[#dc2626]">check_circle</span>
                  Verified Past Cycle
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => handleCopyTitle(grant)}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-800 text-[12px] font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[15px]">
                  {copiedId === grant.id ? 'done' : 'bookmark'}
                </span>
                <span>{copiedId === grant.id ? 'Copied Details!' : 'Save Details'}</span>
              </button>

              <button
                onClick={() => onGoToMentorAI(`What are the exact application steps, required documents (SSCE, admission letter, state certificate), and interview tips for the ${grant.title}?`)}
                className="flex-1 py-2 rounded-xl bg-[#0a192f] text-white text-[12px] font-semibold hover:bg-[#152a4d] transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                type="button"
              >
                <span className="material-symbols-outlined text-[15px]">chat</span>
                <span>Ask Mentor Tips</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Grant Preparation Checklist Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-blue-950/5 border border-blue-900/10 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#dc2626] text-[20px]">fact_check</span>
          <h4 className="font-serif-headline text-[16px] font-bold text-[#0a192f]">
            Essential Nigerian Scholarship Documents to Prepare Early
          </h4>
        </div>
        <p className="text-[12px] text-slate-600 leading-relaxed">
          Most Nigerian scholarships (MTN, Shell, Seplat) close applications in under 3 weeks. Have these ready in advance:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] text-[#0a192f] pt-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#dc2626]">done</span>
            <span>Local Government Area (LGA) Origin Certificate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#dc2626]">done</span>
            <span>JAMB Original Admission Letter &amp; Result Slip</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#dc2626]">done</span>
            <span>O'Level (WAEC / NECO) Statement of Result</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#dc2626]">done</span>
            <span>Current Year 1/2 CGPA Result signed by HOD</span>
          </div>
        </div>
      </div>
    </div>
  );
};
