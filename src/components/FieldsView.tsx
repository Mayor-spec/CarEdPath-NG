import React, { useState } from 'react';
import { CAREER_LIST } from '../data/careerData';

interface FieldsViewProps {
  onOpenPivotModal: () => void;
  onGoToMentorAI: (query?: string) => void;
}

export const FieldsView: React.FC<FieldsViewProps> = ({ onOpenPivotModal, onGoToMentorAI }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedCareerId, setExpandedCareerId] = useState<string | null>(null);

  const categories = [
    'All',
    'Law & Legal',
    'Business & Finance',
    'Media & Social Sciences',
    'Health & Diagnostics',
    'Tech & Computing',
    'Arts & Humanities',
    'Education & Teaching',
    'Clean Tech & Agri'
  ];

  const filteredCareers = CAREER_LIST.filter(career => {
    const matchesCategory = 
      selectedCategory === 'All' || 
      (selectedCategory === 'Law & Legal' && career.badge.includes('Law')) ||
      (selectedCategory === 'Business & Finance' && career.badge.includes('Business')) ||
      (selectedCategory === 'Media & Social Sciences' && career.badge.includes('Social')) ||
      (selectedCategory === 'Health & Diagnostics' && career.badge.includes('Health')) ||
      (selectedCategory === 'Tech & Computing' && career.badge.includes('Tech')) ||
      (selectedCategory === 'Arts & Humanities' && career.badge.includes('Arts')) ||
      (selectedCategory === 'Education & Teaching' && career.badge.includes('Education')) ||
      (selectedCategory === 'Clean Tech & Agri' && (career.badge.includes('Clean') || career.badge.includes('Agri') || career.badge.includes('Environmental')));

    const matchesSearch = 
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.subjects.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.schools.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.badge.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-5 px-4 py-8 max-w-5xl mx-auto w-full">
      {/* Header Banner */}
      <div className="flex flex-col gap-2">
        <span className="text-[12px] font-bold text-[#dc2626] uppercase tracking-widest">
          Nigerian Career Catalog
        </span>
        <h2 className="font-serif-headline text-[26px] sm:text-[34px] font-bold text-[#0a192f] leading-tight">
          Explore Accredited Career Fields &amp; Requirements
        </h2>
        <p className="text-[14px] sm:text-[15px] text-slate-600 leading-relaxed max-w-2xl">
          Compare verified WAEC combinations, UTME benchmarks, NUC-accredited federal and state universities, and practical alternative Plan B paths.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-3 text-[20px] text-slate-400">
            search
          </span>
          <input
            type="text"
            placeholder="Search by course, university (e.g. UNILAG, FUTA), or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-[13px] text-slate-900 focus:outline-none focus:border-[#0a192f] shadow-xs"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-full text-[12px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0a192f] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Careers List */}
      <div className="flex flex-col gap-4">
        {filteredCareers.map(career => {
          const isExpanded = expandedCareerId === career.id;

          return (
            <div
              key={career.id}
              className="p-4 sm:p-5 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col gap-3.5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-950/10 text-[#0a192f]">
                      {career.badge}
                    </span>
                    <span className="text-[12px] text-slate-500 font-medium">
                      {career.duration}
                    </span>
                  </div>
                  <h3 className="font-serif-headline text-[19px] sm:text-[22px] font-bold text-[#0a192f] mt-1">
                    {career.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[13px] font-bold text-[#dc2626]">
                    {career.salary.split('+')[0]}
                  </span>
                </div>
              </div>

              <p className="text-[13px] text-slate-600 leading-relaxed">
                {career.description}
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    WAEC / JAMB Subjects
                  </span>
                  <span className="text-[12px] font-semibold text-slate-900">
                    {career.subjects}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Top Accredited Nigerian Universities
                  </span>
                  <span className="text-[12px] text-slate-800">
                    {career.schools}
                  </span>
                </div>
              </div>

              {/* Collapsible Deep Dive */}
              {isExpanded && (
                <div className="flex flex-col gap-3 pt-2 border-t border-slate-200 animate-in fade-in duration-200">
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-[#b91c1c] uppercase tracking-wider">
                      Alternative Direct Entry Route (Plan B):
                    </span>
                    <p className="text-[12px] text-[#7f1d1d]">
                      {career.alt}
                    </p>
                  </div>

                  {career.cutOffBenchmark && (
                    <div className="p-3.5 rounded-xl bg-blue-950/5 border border-blue-900/10 flex flex-col gap-1">
                      <span className="text-[11px] font-bold text-[#0a192f] uppercase tracking-wider">
                        Cut-Off Benchmark &amp; Admission Catchment:
                      </span>
                      <p className="text-[12px] text-slate-800">
                        {career.cutOffBenchmark}
                      </p>
                      {career.catchmentTip && (
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          💡 {career.catchmentTip}
                        </p>
                      )}
                    </div>
                  )}

                  {career.keySkills && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-bold text-slate-500">Key High-Value Skills:</span>
                      {career.keySkills.map((sk, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-md bg-slate-100 text-[11px] font-medium text-slate-800 border border-slate-200">
                          {sk}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onGoToMentorAI(`I am exploring ${career.title}. What are the best subject combinations, cut-off benchmarks, and alternative polytechnic routes for this course?`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a192f] text-white text-[12px] font-semibold hover:bg-[#152a4d]"
                      type="button"
                    >
                      <span>Ask AI Mentor About {career.title.split(' ')[0]}</span>
                      <span className="material-symbols-outlined text-[15px]">chat</span>
                    </button>
                    <button
                      onClick={onOpenPivotModal}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-[#b91c1c] border border-red-200 text-[12px] font-semibold hover:bg-red-100"
                      type="button"
                    >
                      <span>Test Score in Simulator</span>
                      <span className="material-symbols-outlined text-[15px]">alt_route</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Expand Toggle Button */}
              <button
                onClick={() => setExpandedCareerId(isExpanded ? null : career.id)}
                className="self-start text-[12px] font-bold text-[#dc2626] hover:underline flex items-center gap-1 cursor-pointer pt-1"
                type="button"
              >
                <span>{isExpanded ? 'Show Less' : 'View Full Details & Plan B Route'}</span>
                <span className={`material-symbols-outlined text-[16px] transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
