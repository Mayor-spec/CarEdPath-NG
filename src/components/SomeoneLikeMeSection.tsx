import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENTOR_STORIES, getClusterForCareer } from '../data/mentorStoriesData';
import { CareerCluster, MentorStory } from '../types';

interface SomeoneLikeMeSectionProps {
  careerAmbition: string;
  onGoToMentorAI?: (prompt?: string) => void;
  className?: string;
}

export const SomeoneLikeMeSection: React.FC<SomeoneLikeMeSectionProps> = ({
  careerAmbition,
  onGoToMentorAI,
  className = ''
}) => {
  const defaultCluster = getClusterForCareer(careerAmbition);
  const [selectedCluster, setSelectedCluster] = useState<CareerCluster>(defaultCluster);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync cluster whenever user changes career ambition
  useEffect(() => {
    setSelectedCluster(getClusterForCareer(careerAmbition));
  }, [careerAmbition]);

  const clusters: { id: CareerCluster; label: string; icon: string; count: number }[] = [
    {
      id: 'Health Sciences',
      label: 'Health Sciences',
      icon: 'medical_services',
      count: MENTOR_STORIES.filter((s) => s.cluster === 'Health Sciences').length
    },
    {
      id: 'Tech',
      label: 'Tech & Digital',
      icon: 'terminal',
      count: MENTOR_STORIES.filter((s) => s.cluster === 'Tech').length
    },
    {
      id: 'Engineering',
      label: 'Engineering',
      icon: 'precision_manufacturing',
      count: MENTOR_STORIES.filter((s) => s.cluster === 'Engineering').length
    },
    {
      id: 'Creative STEM',
      label: 'Creative STEM & Bio',
      icon: 'architecture',
      count: MENTOR_STORIES.filter((s) => s.cluster === 'Creative STEM').length
    }
  ];

  const filteredStories = MENTOR_STORIES.filter((story) => story.cluster === selectedCluster);

  const handleCopyAdvice = (story: MentorStory) => {
    const text = `"${story.advice}" — ${story.name} (${story.location}) [Sample Student Guidance via CarEdPath NG]`;
    navigator.clipboard.writeText(text);
    setCopiedId(story.id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  return (
    <div
      id="someone-like-me-section"
      className={`rounded-2xl border border-slate-200 bg-white p-4 sm:p-7 shadow-sm transition-all ${className}`}
    >
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex flex-col gap-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[15px] text-[#dc2626]">auto_stories</span>
            <span>How CarEdPath NG Works • Example Journeys</span>
          </div>
          <h3 className="font-serif-headline text-[22px] sm:text-[28px] font-bold text-[#0a192f] leading-tight">
            Sample Student Pathways &amp; Course Transitions
          </h3>
          <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed">
            Illustrative sample pathways showing how Nigerian secondary-school students can navigate cutoff marks, course alternatives, and university admission hurdles. <span className="font-semibold text-slate-700">Note: These are illustrative example journeys demonstrating admission alternatives, not real user testimonials.</span>
          </p>
        </div>

        {/* Dynamic Cluster Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[12px] text-slate-700 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>
            Discipline: <strong className="text-[#0a192f]">{selectedCluster}</strong>
          </span>
        </div>
      </div>

      {/* Cluster Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pt-5 pb-3 no-scrollbar">
        {clusters.map((c) => {
          const isActive = selectedCluster === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCluster(c.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#0a192f] text-white shadow-sm ring-2 ring-[#0a192f]/20'
                  : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{c.icon}</span>
              <span>{c.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {c.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Editorial Card Deck Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
        <AnimatePresence mode="popLayout">
          {filteredStories.map((story, idx) => (
            <motion.div
              key={story.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/50 p-4 sm:p-5 hover:border-slate-300 hover:shadow-md transition-all group"
            >
              {/* Card Top: Hurdle Tag & Location */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold">
                    <span className="material-symbols-outlined text-[13px] text-amber-700">flag</span>
                    <span>{story.hurdleTag}</span>
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-slate-400">location_on</span>
                    {story.location}
                  </span>
                </div>

                {/* Profile Header */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-[#0a192f] flex items-center justify-center font-bold text-[15px] shadow-2xs flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px] text-[#dc2626]">alt_route</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Sample Student Pathway</span>
                    <h4 className="text-[14px] font-bold text-[#0a192f] leading-snug">{story.name}</h4>
                    <p className="text-[12px] text-slate-600 font-medium leading-tight line-clamp-1">
                      Target: {story.currentRole}
                    </p>
                  </div>
                </div>

                {/* 3-Sentence Route Story Block */}
                <div className="rounded-lg bg-white p-3.5 border border-slate-200/80 text-[12.5px] text-slate-700 leading-relaxed">
                  <div className="text-[10.5px] uppercase font-bold text-slate-600 tracking-wider mb-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-[#dc2626]">route</span>
                    Illustrative Transition Route
                  </div>
                  <p className="font-normal text-slate-700">{story.routeStory}</p>
                </div>

                {/* Empowering Direct Quote */}
                <div className="relative rounded-lg bg-rose-50/50 p-3.5 border border-rose-100 text-[12px] text-slate-800 italic leading-relaxed">
                  <span className="material-symbols-outlined absolute top-2 right-2 text-rose-200 text-[26px] pointer-events-none">
                    format_quote
                  </span>
                  <div className="text-[10px] uppercase not-italic font-bold text-[#b91c1c] tracking-wider mb-1">
                    Secondary Student Guidance
                  </div>
                  “{story.advice}”
                </div>
              </div>

              {/* Card Footer: Current Org & Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-500 truncate max-w-[65%]">
                  {story.currentOrganization}
                </span>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyAdvice(story)}
                    title="Copy her advice"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {copiedId === story.id ? 'check' : 'content_copy'}
                    </span>
                    <span className="hidden sm:inline">
                      {copiedId === story.id ? 'Copied' : 'Share'}
                    </span>
                  </button>

                  {onGoToMentorAI && (
                    <button
                      type="button"
                      onClick={() =>
                        onGoToMentorAI(
                          `I just read about ${story.name}'s non-linear journey in ${story.cluster} (${story.hurdleTag}). How can I apply her path to my current situation in Nigeria?`
                        )
                      }
                      title="Discuss this route with Mentor Adaeze"
                      className="p-1.5 rounded-lg text-[#dc2626] hover:bg-rose-50 transition-colors text-[11px] flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <span className="material-symbols-outlined text-[15px]">chat</span>
                      <span className="hidden sm:inline">Ask Adaeze</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Micro Footer Notice */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-slate-500 text-[16px]">info</span>
          <span>Sample Student Journeys: Illustrative examples demonstrating how secondary students navigate admission hurdles.</span>
        </div>
        <span className="text-slate-400 text-[11px]">Calibrated to 2026/2027 JAMB &amp; Tertiary Admissions</span>
      </div>
    </div>
  );
};
