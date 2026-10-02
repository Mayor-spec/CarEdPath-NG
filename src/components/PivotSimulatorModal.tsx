import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  NIGERIAN_COURSES_LIST,
  NIGERIAN_DISCIPLINES,
  NigerianCourse
} from '../data/nigerianCoursesData';

interface PivotSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToMentorAI: (query?: string) => void;
}

export const PivotSimulatorModal: React.FC<PivotSimulatorModalProps> = ({
  isOpen,
  onClose,
  onGoToMentorAI
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('medicine-surgery');
  const [score, setScore] = useState<number>(198);

  // Filter courses based on discipline and search query
  const filteredCourses = useMemo(() => {
    return NIGERIAN_COURSES_LIST.filter((course) => {
      const matchesDiscipline =
        selectedDiscipline === 'All' || course.discipline === selectedDiscipline;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        course.name.toLowerCase().includes(q) ||
        course.degree.toLowerCase().includes(q) ||
        course.faculty.toLowerCase().includes(q) ||
        course.discipline.toLowerCase().includes(q);

      return matchesDiscipline && matchesSearch;
    });
  }, [selectedDiscipline, searchQuery]);

  // Current active course
  const activeCourse: NigerianCourse = useMemo(() => {
    const found = NIGERIAN_COURSES_LIST.find((c) => c.id === selectedCourseId);
    return found || filteredCourses[0] || NIGERIAN_COURSES_LIST[0];
  }, [selectedCourseId, filteredCourses]);

  // Dynamic analysis based on selected course and UTME score
  const analysis = useMemo(() => {
    const { meritCutoff, catchmentCutoff, stateUniCutoff, name, topFederalUnis, keyAdvice } = activeCourse;

    if (score >= meritCutoff) {
      return {
        level: 'merit',
        status: `Strong Chance for National Merit Quota (${meritCutoff}+)`,
        verdictBg: 'bg-emerald-50 border-emerald-300 text-emerald-950',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        icon: 'verified',
        insight: `Your score of ${score} comfortably reaches or surpasses the federal merit benchmark (${meritCutoff}+) for ${name}. You have high competitive standing at top tier institutions like ${topFederalUnis.slice(0, 3).join(', ')} if Post-UTME screening is high.`,
        recommendation: `Ensure your O'Level grades are verified on JAMB CAPS and register early for Post-UTME screening at your first-choice institution.`
      };
    }

    if (score >= catchmentCutoff) {
      return {
        level: 'catchment',
        status: `Competitive via State Catchment / ELDS Quota (${catchmentCutoff}–${meritCutoff - 1})`,
        verdictBg: 'bg-blue-50 border-blue-200 text-blue-950',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
        icon: 'place',
        insight: `At ${score}, you are right within the Catchment Area and Educationally Less Developed States (ELDS) admission window for ${name}. While federal open merit may be fierce, your State of Origin contiguous federal universities offer strong admission probability.`,
        recommendation: `Check your state's contiguous federal institution catchment list to make sure your first-choice university grants quota preferences to your Local Government Area (LGA).`
      };
    }

    if (score >= stateUniCutoff) {
      return {
        level: 'state',
        status: `Viable for State Universities & Sub-Specialty Options (${stateUniCutoff}–${catchmentCutoff - 1})`,
        verdictBg: 'bg-amber-50 border-amber-300 text-amber-950',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
        icon: 'swap_horiz',
        insight: `Score ${score} is below the typical Federal Merit cut-off (${meritCutoff}+) for ${name}, but well within range for State-owned universities, specialized colleges, and related foundation degree faculties.`,
        recommendation: `Consider switching your JAMB first choice to a reputable State University or exploring our verified fallback courses to guarantee placement without lost years.`
      };
    }

    return {
      level: 'pivot',
      status: `Below Typical University Cut-Off (${stateUniCutoff}+ Needed) — Pivot Recommended`,
      verdictBg: 'bg-red-50 border-red-300 text-red-950',
      badgeColor: 'bg-red-100 text-red-900 border-red-200',
      icon: 'alt_route',
      insight: `With a score of ${score}, direct admission into ${name} at accredited universities is at high risk of disqualification or unfulfilled merit lists this year due to extreme candidate competition. ${keyAdvice}`,
      recommendation: `Do not risk an entire gap year sitting idle. Immediate pivot to accredited Direct Entry polytechnic tracks (ND/HND) or specialized professional diplomas (RN/SLT) is strongly advised.`
    };
  }, [score, activeCourse]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed inset-0 bg-[#0a192f]/75 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 16 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col z-10 max-h-[94vh] overflow-hidden my-auto"
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0a192f] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[22px] text-[#dc2626]">
                alt_route
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-headline text-[17px] sm:text-[20px] font-bold text-[#0a192f]">
                  Nigerian University Cut-Off &amp; Pivot Simulator
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-red-100 text-[#b91c1c]">
                  2026 Admissions
                </span>
              </div>
              <p className="text-[12px] text-slate-500">
                Explore official courses in Nigerian universities and test real-time JAMB cut-off alternatives
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            type="button"
            aria-label="Close dialog"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="p-3 sm:p-5 overflow-y-auto flex flex-col gap-4 max-h-[calc(94vh-8rem)]">
          {/* Top Controls: Course Search and Discipline Filters */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-3">
            {/* Search Input Bar */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[19px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses in Nigerian universities (e.g., Nursing, Pharmacy, Software, Medical Lab, Anatomy, Civil)..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-slate-300 text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0a192f] focus:ring-1 focus:ring-[#0a192f] transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>

            {/* Discipline Filter Horizontal Scroll */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <span className="text-[11.5px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap mr-1">
                Discipline:
              </span>
              <button
                type="button"
                onClick={() => setSelectedDiscipline('All')}
                className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDiscipline === 'All'
                    ? 'bg-[#0a192f] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                All Disciplines ({NIGERIAN_COURSES_LIST.length})
              </button>
              {NIGERIAN_DISCIPLINES.map((disc) => {
                const count = NIGERIAN_COURSES_LIST.filter((c) => c.discipline === disc).length;
                return (
                  <button
                    key={disc}
                    type="button"
                    onClick={() => setSelectedDiscipline(disc)}
                    className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedDiscipline === disc
                        ? 'bg-[#0a192f] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {disc} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selectable Courses Grid/Chips */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#0a192f] uppercase tracking-wider">
                Select Target Course ({filteredCourses.length} available)
              </span>
              {searchQuery && (
                <span className="text-[11px] text-slate-500">
                  Matching &ldquo;{searchQuery}&rdquo;
                </span>
              )}
            </div>

            {filteredCourses.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center justify-center gap-2">
                <span className="material-symbols-outlined text-slate-400 text-[28px]">search_off</span>
                <p className="text-[13px] text-slate-600 font-medium">
                  No courses found matching &ldquo;{searchQuery}&rdquo; in {selectedDiscipline}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDiscipline('All');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#0a192f] text-white text-[12px] font-semibold hover:bg-[#152a4d] cursor-pointer mt-1"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1 p-1 bg-slate-50/70 rounded-2xl border border-slate-200">
                {filteredCourses.map((c) => {
                  const isSelected = c.id === activeCourse.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCourseId(c.id)}
                      className={`p-2.5 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between border ${
                        isSelected
                          ? 'bg-[#0a192f] text-white border-[#0a192f] shadow-sm'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className={`text-[12.5px] font-bold leading-tight line-clamp-1 ${isSelected ? 'text-white' : 'text-[#0a192f]'}`}>
                          {c.name}
                        </span>
                        <span className={`text-[11px] mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {c.degree}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/40">
                        <span
                          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-red-500/30 text-red-200 border border-red-400/40'
                              : 'bg-red-50 text-[#b91c1c] border border-red-100'
                          }`}
                        >
                          Merit: {c.meritCutoff}+
                        </span>
                        {isSelected && (
                          <span className="material-symbols-outlined text-[14px] text-emerald-400">
                            check_circle
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Active Course Card & UTME Score Slider */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
            {/* Active Course Snapshot (5 cols) */}
            <div className="md:col-span-5 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#dc2626]">
                    {activeCourse.discipline}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {activeCourse.degree}
                  </span>
                </div>
                <h4 className="font-serif-headline text-[17px] font-bold text-[#0a192f] leading-snug">
                  {activeCourse.name}
                </h4>
                <p className="text-[11.5px] text-slate-500 mt-0.5">
                  Faculty: {activeCourse.faculty}
                </p>

                {/* Admission Benchmark Pills */}
                <div className="grid grid-cols-3 gap-1.5 mt-3">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] font-bold text-slate-500 block">Nat&apos;l Merit</span>
                    <span className="text-[13px] font-bold text-[#0a192f]">{activeCourse.meritCutoff}+</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] font-bold text-slate-500 block">Catchment</span>
                    <span className="text-[13px] font-bold text-[#0a192f]">{activeCourse.catchmentCutoff}+</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="text-[10px] font-bold text-slate-500 block">State Univ</span>
                    <span className="text-[13px] font-bold text-[#0a192f]">{activeCourse.stateUniCutoff}+</span>
                  </div>
                </div>

                {/* Subject combination brief */}
                <div className="mt-3 text-[11.5px] text-slate-600 space-y-1">
                  <div>
                    <strong className="text-slate-800 font-semibold">JAMB Subjects: </strong>
                    {activeCourse.jambSubjects}
                  </div>
                  <div>
                    <strong className="text-slate-800 font-semibold">WAEC/NECO: </strong>
                    {activeCourse.waecSubjects}
                  </div>
                </div>
              </div>

              {/* Top institutions */}
              <div className="mt-3 pt-2.5 border-t border-slate-100">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Accredited Tertiary Hubs:
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeCourse.topFederalUnis.map((uni: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-[#0a192f] text-[11px] font-medium"
                    >
                      {uni}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Score Slider & Realistic Verdict Engine (7 cols) */}
            <div className="md:col-span-7 flex flex-col gap-3">
              {/* Interactive Score Slider Card */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-bold text-[#0a192f]">
                    Simulate Your JAMB / UTME Score
                  </label>
                  <span className="px-3 py-1 rounded-xl bg-[#0a192f] text-white text-[15px] font-bold">
                    {score} / 400
                  </span>
                </div>

                <input
                  type="range"
                  min="160"
                  max="310"
                  step="5"
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="accent-[#dc2626] w-full mt-1 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                />

                {/* Score Quick Jump Pills */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-500 font-medium">Presets:</span>
                    {[180, 195, 215, 245, 275].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setScore(preset)}
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                          score === preset
                            ? 'bg-red-100 text-[#b91c1c] border border-red-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">Range: 160 – 310</span>
                </div>
              </div>

              {/* Dynamic Verdict Banner */}
              <div className={`p-4 rounded-2xl border ${analysis.verdictBg} flex flex-col gap-1.5 shadow-2xs`}>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">
                    {analysis.icon}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Admission Real-Time Verdict
                  </span>
                </div>
                <h4 className="text-[14px] sm:text-[15px] font-bold leading-tight">
                  {analysis.status}
                </h4>
                <p className="text-[12.5px] leading-relaxed mt-0.5 opacity-95">
                  {analysis.insight}
                </p>
                <div className="mt-1.5 pt-2 border-t border-black/10 text-[12px] font-medium leading-relaxed">
                  💡 <strong>Strategic Step:</strong> {analysis.recommendation}
                </div>
              </div>
            </div>
          </div>

          {/* Verified Fallback Options (Plan B) */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#0a192f] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#dc2626] text-[16px]">
                  alt_route
                </span>
                Verified Fallback Options for {activeCourse.name} (Plan B)
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                Guaranteed routes if cutoff misses
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {activeCourse.fallbacks.map((fb, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[13px] font-bold text-[#0a192f] leading-snug">
                        {fb.name}
                      </span>
                      <span className="px-1.5 py-0.5 rounded-full bg-red-50 text-[#b91c1c] text-[10.5px] font-bold border border-red-100 flex-shrink-0">
                        Cut-Off: {fb.cutoff}
                      </span>
                    </div>
                    <p className="text-[11.5px] text-slate-600 leading-relaxed mt-1">
                      {fb.route}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Entry Safety Net */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 text-[12.5px] text-[#0a192f] leading-relaxed flex items-start gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-[#0a192f] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">school</span>
            </div>
            <div className="flex-1">
              <strong className="font-bold text-[#0a192f] block text-[13px] mb-0.5">
                Polytechnic / Direct Entry (DE) Safety Net Blueprint:
              </strong>
              <p className="text-slate-700 leading-relaxed">
                {activeCourse.polyDirectEntryRoute}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-2">
          <div className="text-[11px] text-slate-500 hidden sm:block">
            Simulating: <strong className="text-[#0a192f]">{activeCourse.name}</strong> at score <strong className="text-[#dc2626]">{score}</strong>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-[13px] font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              type="button"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onGoToMentorAI(
                  `I used the Nigerian JAMB cut-off simulator with a score of ${score} for ${activeCourse.name} (${activeCourse.degree}). Can you give me the exact step-by-step strategy for JAMB CAPS and recommended fallback schools?`
                );
              }}
              className="px-4 py-2 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white text-[13px] font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer flex-1 sm:flex-initial"
              type="button"
            >
              <span>Consult Mentor AI</span>
              <span className="material-symbols-outlined text-[16px]">chat</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
