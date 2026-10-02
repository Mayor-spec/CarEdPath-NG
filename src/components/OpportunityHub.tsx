import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OPPORTUNITIES_DATA } from '../data/opportunitiesData';
import { OpportunityCategory, OpportunityItem } from '../types';

interface OpportunityHubProps {
  onGoToMentorAI?: (query?: string) => void;
  onOpenSubmitModal?: () => void;
}

export const OpportunityHub: React.FC<OpportunityHubProps> = ({
  onGoToMentorAI,
  onOpenSubmitModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filterChips: { category: OpportunityCategory; icon: string }[] = [
    { category: 'All', icon: 'apps' },
    { category: 'Tertiary Admission Scholarships', icon: 'school' },
    { category: 'Secondary School Competitions', icon: 'emoji_events' },
    { category: 'Free Tech Bootcamps', icon: 'terminal' },
    { category: 'Mentorship Communities', icon: 'diversity_3' }
  ];

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: OPPORTUNITIES_DATA.length };
    OPPORTUNITIES_DATA.forEach((opp) => {
      counts[opp.category] = (counts[opp.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredOpportunities = useMemo(() => {
    return OPPORTUNITIES_DATA.filter((opp) => {
      const matchesCategory =
        selectedCategory === 'All' || opp.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        opp.title.toLowerCase().includes(q) ||
        opp.organization.toLowerCase().includes(q) ||
        opp.eligibilityBadge.toLowerCase().includes(q) ||
        opp.coverage.toLowerCase().includes(q) ||
        opp.description.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyOpportunity = (opp: OpportunityItem) => {
    const text = `${opp.title} (${opp.organization})\nCoverage: ${opp.coverage}\nEligibility: ${opp.eligibilityBadge}\nPortal: ${opp.portalUrl}\nFound on CarEdPath NG`;
    navigator.clipboard.writeText(text);
    setCopiedId(opp.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryTheme = (category: OpportunityItem['category']) => {
    switch (category) {
      case 'Tertiary Admission Scholarships':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-900',
          border: 'border-emerald-200',
          badgeBg: 'bg-emerald-100/80',
          icon: 'school'
        };
      case 'Secondary School Competitions':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-900',
          border: 'border-amber-200',
          badgeBg: 'bg-amber-100/80',
          icon: 'emoji_events'
        };
      case 'Free Tech Bootcamps':
        return {
          bg: 'bg-indigo-50',
          text: 'text-indigo-900',
          border: 'border-indigo-200',
          badgeBg: 'bg-indigo-100/80',
          icon: 'terminal'
        };
      case 'Mentorship Communities':
        return {
          bg: 'bg-rose-50',
          text: 'text-rose-900',
          border: 'border-rose-200',
          badgeBg: 'bg-rose-100/80',
          icon: 'diversity_3'
        };
      default:
        return {
          bg: 'bg-slate-50',
          text: 'text-slate-900',
          border: 'border-slate-200',
          badgeBg: 'bg-slate-100',
          icon: 'verified'
        };
    }
  };

  return (
    <div id="live-opportunity-hub" className="flex flex-col gap-6 px-4 py-8 max-w-6xl mx-auto w-full">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-red-50 text-[#b91c1c] border border-red-200 text-[11px] font-bold">
            <span className="material-symbols-outlined text-[15px] text-[#dc2626]">verified</span>
            <span>Live Nigerian Opportunity Hub</span>
          </div>
          <h2 className="font-serif-headline text-[26px] sm:text-[36px] font-bold text-[#0a192f] leading-tight">
            Active Grants, Scholarships &amp; Programs
          </h2>
          <p className="text-[14px] sm:text-[15px] text-slate-600 leading-relaxed">
            School fees and device constraints should not stop your ambition. Verified funding, laptops, tuition waivers, and free bootcamps specifically supporting Nigerian girls and women.
          </p>
        </div>

        {/* Community Submission Button */}
        {onOpenSubmitModal && (
          <button
            type="button"
            onClick={onOpenSubmitModal}
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:border-[#dc2626] hover:text-[#dc2626] text-[12px] font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            <span>Submit an Opportunity</span>
          </button>
        )}
      </div>

      {/* Search and Quick Metrics Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keyword (e.g. laptop, 100L, SS2, tech, MTN)..."
            className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-300 bg-white text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0a192f]/20 focus:border-[#0a192f] transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Count Pill */}
        <div className="text-[12px] text-slate-500 font-medium self-end sm:self-center">
          Showing <strong className="text-[#0a192f]">{filteredOpportunities.length}</strong> verified opportunities
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {filterChips.map((chip) => {
          const isActive = selectedCategory === chip.category;
          const count = categoryCounts[chip.category] || 0;
          return (
            <button
              key={chip.category}
              onClick={() => setSelectedCategory(chip.category)}
              type="button"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[12.5px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#0a192f] text-white shadow-sm ring-2 ring-[#0a192f]/20'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{chip.icon}</span>
              <span>{chip.category}</span>
              <span
                className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Opportunities Grid */}
      {filteredOpportunities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center bg-white flex flex-col items-center justify-center gap-3">
          <span className="material-symbols-outlined text-slate-400 text-[40px]">
            search_off
          </span>
          <h4 className="text-[16px] font-bold text-slate-800">No opportunities found</h4>
          <p className="text-[13px] text-slate-500 max-w-sm">
            Try adjusting your search query or selecting "All" to view all available scholarships and bootcamps.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-[12px] font-semibold hover:bg-slate-200 cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredOpportunities.map((opp, index) => {
              const theme = getCategoryTheme(opp.category);
              return (
                <motion.div
                  key={opp.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
                  className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
                >
                  {/* Top: Badges & Title */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      {/* Eligibility Badge */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${theme.bg} ${theme.text} ${theme.border}`}
                      >
                        <span className="material-symbols-outlined text-[13px]">{theme.icon}</span>
                        <span>{opp.eligibilityBadge}</span>
                      </span>

                      {/* Verified Badge */}
                      <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">verified</span>
                        <span>{opp.verifiedStatus}</span>
                      </span>
                    </div>

                    {/* Program Title */}
                    <div className="flex flex-col">
                      <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0a192f] group-hover:text-[#dc2626] transition-colors leading-snug">
                        {opp.title}
                      </h3>
                      <span className="text-[12px] font-semibold text-slate-500 mt-0.5">
                        {opp.organization}
                      </span>
                    </div>

                    {/* Coverage Highlight Box */}
                    <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-[#dc2626] text-[20px] flex-shrink-0 mt-0.5">
                        payments
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[10.5px] uppercase font-bold text-slate-500 tracking-wider">
                          Award &amp; Coverage
                        </span>
                        <span className="text-[13px] font-bold text-slate-900 leading-snug">
                          {opp.coverage}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[12.5px] text-slate-600 leading-relaxed">
                      {opp.description}
                    </p>
                  </div>

                  {/* Bottom: Deadlines & Action Buttons */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-[11.5px] text-slate-500 font-medium">
                      <span className="material-symbols-outlined text-[15px] text-slate-400">
                        event
                      </span>
                      <span>Timeline: {opp.deadline}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Copy summary button */}
                      <button
                        type="button"
                        onClick={() => handleCopyOpportunity(opp)}
                        title="Copy opportunity details"
                        className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer text-[12px] flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {copiedId === opp.id ? 'check' : 'content_copy'}
                        </span>
                        <span className="text-[11px] hidden sm:inline">
                          {copiedId === opp.id ? 'Copied' : 'Copy'}
                        </span>
                      </button>

                      {/* Mentor Prep button */}
                      {onGoToMentorAI && (
                        <button
                          type="button"
                          onClick={() =>
                            onGoToMentorAI(
                              `I want to apply for the "${opp.title}". Can you review the eligibility requirements, required documents, and give me winning tips for my application essay?`
                            )
                          }
                          title="Ask Mentor Adaeze for essay tips"
                          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11.5px] font-semibold transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[15px] text-[#dc2626]">
                            smart_toy
                          </span>
                          <span className="hidden sm:inline">Essay Tips</span>
                        </button>
                      )}

                      {/* External Link Button - strictly new tab with rel="noopener noreferrer" */}
                      <a
                        href={opp.portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-[#0a192f] text-white hover:bg-[#dc2626] text-[12px] font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                      >
                        <span>Visit Official Portal</span>
                        <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Advisory Note */}
      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[12.5px] text-amber-950 flex items-start gap-3 mt-2">
        <span className="material-symbols-outlined text-amber-700 text-[20px] flex-shrink-0 mt-0.5">
          security
        </span>
        <div className="leading-relaxed">
          <strong>Scam Prevention Advisory: </strong>
          No legitimate Nigerian scholarship, grant, or corporate foundation will ever ask you to pay an "application processing fee", "scratch card PIN fee", or "shortlist interview fee". Never send money to any individual or bank account to access scholarships listed on CarEdPath NG.
        </div>
      </div>
    </div>
  );
};
