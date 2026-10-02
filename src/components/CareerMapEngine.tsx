import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CareerMapData,
  RoadmapPhase,
  GLOSSARY_TERMS,
  GlossaryTerm,
  generateCareerMap
} from '../data/careerMapData';
import { UserIntakeProfile } from '../types';
import { ALTERNATIVE_SCENARIOS, AlternativeScenario } from '../data/alternativeRoutesData';
import { AlternativeRouteDrawer } from './AlternativeRouteDrawer';
import { NinetyDaysActionEngine } from './NinetyDaysActionEngine';
import { SomeoneLikeMeSection } from './SomeoneLikeMeSection';
import { AdmissionTargetCard } from './AdmissionTargetCard';

interface CareerMapEngineProps {
  careerAmbition: string;
  userProfile?: UserIntakeProfile;
  onClose?: () => void;
  onGoToMentorAI?: (initialPrompt?: string) => void;
  onExploreOpportunities?: () => void;
}

export const CareerMapEngine: React.FC<CareerMapEngineProps> = ({
  careerAmbition,
  userProfile,
  onClose,
  onGoToMentorAI,
  onExploreOpportunities
}) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [activeGlossaryKey, setActiveGlossaryKey] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  // Institution & Academic Session State
  const [selectedInstitution, setSelectedInstitution] = useState<string>(
    userProfile?.targetInstitution || 'University of Ilorin'
  );
  const [selectedSession] = useState<string>(
    userProfile?.academicSession || '2026/2027'
  );

  useEffect(() => {
    if (userProfile?.targetInstitution) {
      setSelectedInstitution(userProfile.targetInstitution);
    }
  }, [userProfile?.targetInstitution]);

  // "What If?" Alternative Route Engine State
  const [isAltDrawerOpen, setIsAltDrawerOpen] = useState<boolean>(false);
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [initialDrawerScenario, setInitialDrawerScenario] = useState<string | null>(null);

  // Dynamic career map data locked to career ambition and target institution
  const mapData: CareerMapData = useMemo(() => {
    return generateCareerMap(careerAmbition, selectedInstitution);
  }, [careerAmbition, selectedInstitution]);

  const activeGlossary: GlossaryTerm | null = useMemo(() => {
    if (!activeGlossaryKey) return null;
    return GLOSSARY_TERMS[activeGlossaryKey] || null;
  }, [activeGlossaryKey]);

  const activeScenario: AlternativeScenario | null = useMemo(() => {
    if (!activeScenarioId) return null;
    return ALTERNATIVE_SCENARIOS[activeScenarioId] || null;
  }, [activeScenarioId]);

  const handleOpenAltDrawer = (scenarioId?: string) => {
    setInitialDrawerScenario(scenarioId || null);
    setIsAltDrawerOpen(true);
  };

  // Copy Roadmap Summary to Clipboard
  const handleCopySummary = () => {
    const summaryText = `🇳🇬 CarEdPath NG — SECONDARY SCHOOL CAREER ROADMAP
Target Career: ${mapData.careerTitle}
Degree Pathway: ${mapData.degreeTitle}
Regulatory Body: ${mapData.regulatoryBody}
${activeScenario ? `\n🌿 ALTERNATE BRANCH ACTIVATED: ${activeScenario.branchTitle}\n• Strategy: ${activeScenario.coreSprout}\n• Tuition Advantage: ${activeScenario.costComparison.alternateCost}\n` : ''}
PHASE 1: NOW (Secondary School Preparation)
• Subjects: ${mapData.phases[0]?.keyRequirements[0]?.value || 'English, Maths, and Core Subjects'}
• Cost: ${mapData.phases[0]?.costBadge}
• Strategy: ${mapData.phases[0]?.primaryDetails?.items?.[0] || 'Lock in 5 O\'Level credits'}

PHASE 2: NEXT (JAMB UTME & Entry Gateway)
• UTME Combination: ${mapData.phases[1]?.keyRequirements[0]?.value || '4 Compulsory JAMB Subjects'}
• Merit Score Benchmark: ${mapData.phases[1]?.keyRequirements[1]?.value || '240+ UTME'}
• Gateway Cost: ${mapData.phases[1]?.costBadge}

PHASE 3: TERTIARY TRAINING (University & Clinicals)
• Duration: ${mapData.phases[2]?.durationBadge}
• Estimated Tuition: ${mapData.phases[2]?.costBadge}
• Key Milestones: ${mapData.phases[2]?.primaryDetails?.items?.[0] || 'Accredited coursework & SIWES'}

PHASE 4: CAREER LAUNCH & PRACTICE
• Professional Induction: ${mapData.phases[3]?.keyRequirements[0]?.value || 'Council License'}
• Starting Earnings: ${mapData.phases[3]?.costBadge}
• Key Roles: ${mapData.phases[3]?.freeResources?.[0]?.description || 'Clinical / Corporate practice'}

Generated with CarEdPath NG — Career Mentor for Nigerian Secondary-School Students`;

    navigator.clipboard.writeText(summaryText).then(() => {
      setCopyStatus('Copied to Clipboard!');
      setTimeout(() => setCopyStatus(null), 3000);
    }).catch(() => {
      setCopyStatus('Failed to copy');
      setTimeout(() => setCopyStatus(null), 3000);
    });
  };

  return (
    <div className="flex flex-col w-full bg-white text-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-200/90" id="career-map-root">
      {/* Top Nigerian Emerald & Terracotta Geometric Accent Bar */}
      <div className="w-full h-1.5 bg-gradient-to-r from-[#065f46] via-[#c85a32] to-[#0a192f]" />

      {/* Main Header / Control Ribbon */}
      <div className="px-5 sm:px-8 py-5 border-b border-slate-100 bg-slate-50/70 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              Verified Career Milestone Trajectory
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-200 text-slate-700">
              {mapData.discipline}
            </span>
          </div>

          <h2 className="font-serif-headline text-[22px] sm:text-[26px] font-bold text-[#0a192f] mt-1.5 leading-tight">
            Your Career Map: {mapData.careerTitle}
          </h2>
          <p className="text-[13px] text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
            {mapData.degreeTitle} • Regulated by{' '}
            <span className="font-semibold text-slate-800">{mapData.regulatoryBody}</span>
            {mapData.regulatoryExplainKey && (
              <button
                type="button"
                onClick={() => setActiveGlossaryKey(mapData.regulatoryExplainKey!)}
                title="Explain Like I'm 15"
                className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-200 text-[10px] font-bold ml-1 cursor-pointer transition-colors"
                aria-label={`Explain ${mapData.regulatoryBody}`}
              >
                ?
              </button>
            )}
          </p>
        </div>

        {/* Action Buttons: Copy, Save PDF, Close */}
        <div className="flex items-center gap-2 flex-wrap self-start md:self-center">
          <button
            id="career-map-copy-btn"
            type="button"
            onClick={handleCopySummary}
            className="px-3.5 py-2 rounded-xl text-[12.5px] font-semibold flex items-center gap-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px] text-slate-600">
              {copyStatus ? 'check_circle' : 'content_copy'}
            </span>
            <span>{copyStatus || 'Copy Roadmap Summary'}</span>
          </button>

          <button
            id="career-map-pdf-btn"
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl text-[12.5px] font-semibold flex items-center gap-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 active:scale-95 transition-all shadow-xs cursor-pointer no-print"
            title="Save Roadmap as PDF"
          >
            <span className="material-symbols-outlined text-[17px] text-slate-600">picture_as_pdf</span>
            <span className="hidden sm:inline">Save as PDF</span>
          </button>

          {onClose && (
            <button
              id="career-map-close-btn"
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              aria-label="Close roadmap view"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* User Context Banner (if coming from Phase 2 intake) */}
      {userProfile && (
        <div className="px-5 sm:px-8 py-3 bg-[#0a192f] text-white flex flex-wrap items-center justify-between gap-3 text-[12.5px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              <strong>Personalized Trajectory:</strong> Candidate in <em>{userProfile.currentStage}</em> • Strongest in{' '}
              <span className="text-emerald-300 font-semibold">{userProfile.favoriteSubjects.slice(0, 3).join(', ')}</span>
            </span>
          </div>

          <div className="text-slate-300 text-[11.5px]">
            Targeting: <strong className="text-white">{userProfile.studyPreference}</strong>
          </div>
        </div>
      )}

      {/* Interactive Vertical Metro-Line Layout */}
      <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full">
        {/* Official Admission Targets & Requirements Card */}
        <AdmissionTargetCard
          careerTitle={mapData.careerTitle}
          initialInstitution={selectedInstitution}
          initialSession={selectedSession}
          enteredUtmeScore={userProfile?.enteredUtmeScore}
          enteredOlevelGrades={userProfile?.enteredOlevelGrades}
          onSwitchInstitution={(newInst) => setSelectedInstitution(newInst)}
          onExploreAlternativeProgramme={() => handleOpenAltDrawer()}
        />

        {mapData.isUnavailable ? (
          <div className="my-6 p-8 sm:p-12 rounded-2xl bg-amber-50/60 border-2 border-dashed border-amber-300 text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center mx-auto mb-4 text-amber-800 shadow-xs">
              <span className="material-symbols-outlined text-3xl">school</span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-200/80 text-amber-900 border border-amber-300">
              Strict Course Isolation Active
            </span>
            <h3 className="font-serif-headline text-2xl font-bold text-[#0a192f] mt-3 mb-2">
              Information for {mapData.careerTitle || careerAmbition} is currently unavailable
            </h3>
            <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed mb-6">
              CarEdPath NG adheres strictly to course isolation and verified accuracy. Under no circumstances is data from other academic courses substituted. Verified admission requirements, NUC curriculum guidelines, and institution cutoff marks for this specific course are not currently indexed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {onGoToMentorAI && (
                <button
                  type="button"
                  onClick={() => onGoToMentorAI(`Tell me about verified entry requirements for ${careerAmbition} in Nigerian universities.`)}
                  className="px-5 py-2.5 rounded-xl bg-[#065f46] text-white text-xs font-bold hover:bg-[#054d39] transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[17px]">psychology</span>
                  Ask CarEdPath NG Mentor AI
                </button>
              )}
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Choose Another Course
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Active Alternate Branch Announcement Banner */}
            {activeScenario && (
          <div
            id="active-alternate-route-banner"
            className="mb-7 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50/40 to-orange-50 border-2 border-[#c85a32] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-slate-900"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#c85a32] text-white flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
                <span className="material-symbols-outlined text-[22px]">fork_right</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#c85a32] text-white text-[10px] font-extrabold uppercase tracking-wide">
                    Alternate Path Activated
                  </span>
                  <span className="text-[12px] font-bold text-[#7c2d12]">
                    {activeScenario.shortLabel}
                  </span>
                </div>
                <h4 className="font-serif-headline text-[16px] sm:text-[18px] font-bold text-[#0a192f] mt-0.5">
                  {activeScenario.branchTitle}
                </h4>
                <p className="text-[12px] text-slate-600 mt-0.5 max-w-2xl leading-relaxed">
                  {activeScenario.coreSprout}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch md:self-auto justify-end flex-shrink-0">
              <button
                type="button"
                id="change-alt-scenario-btn"
                onClick={() => handleOpenAltDrawer(activeScenario.id)}
                className="px-3 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-[11.5px] cursor-pointer transition-colors shadow-2xs"
              >
                Change Scenario
              </button>
              <button
                type="button"
                id="revert-to-standard-btn"
                onClick={() => setActiveScenarioId(null)}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11.5px] cursor-pointer transition-colors"
              >
                Return to Standard Route
              </button>
            </div>
          </div>
        )}

        <div className="relative flex flex-col">
          {mapData.phases.map((phase, idx) => {
            const isLast = idx === mapData.phases.length - 1;
            const isNodeActive = activePhaseIndex === idx;
            const isPhaseAlternate = !!(activeScenario && activeScenario.targetPhases.includes(phase.phaseNumber));

            // Color palette mappings for emerald and terracotta nodes
            const nodeStyles = isPhaseAlternate
              ? {
                  bg: 'bg-[#c85a32]',
                  border: 'border-[#c85a32]',
                  ring: 'ring-orange-200',
                  line: 'bg-[#c85a32]',
                  badge: 'bg-orange-100 text-[#9c3e1e] border-orange-300'
                }
              : {
                  emerald: {
                    bg: 'bg-emerald-600',
                    border: 'border-emerald-600',
                    ring: 'ring-emerald-100',
                    line: 'bg-emerald-500',
                    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  },
                  terracotta: {
                    bg: 'bg-[#c85a32]',
                    border: 'border-[#c85a32]',
                    ring: 'ring-orange-100',
                    line: 'bg-[#c85a32]',
                    badge: 'bg-orange-50 text-[#9c3e1e] border-orange-200'
                  },
                  navy: {
                    bg: 'bg-[#0a192f]',
                    border: 'border-[#0a192f]',
                    ring: 'ring-slate-200',
                    line: 'bg-[#0a192f]',
                    badge: 'bg-slate-100 text-[#0a192f] border-slate-300'
                  },
                  crimson: {
                    bg: 'bg-[#dc2626]',
                    border: 'border-[#dc2626]',
                    ring: 'ring-red-100',
                    line: 'bg-[#dc2626]',
                    badge: 'bg-red-50 text-red-800 border-red-200'
                  }
                }[phase.colorScheme];

            return (
              <div
                key={phase.phaseId}
                id={`phase-${phase.phaseId}`}
                className="relative flex items-start gap-4 sm:gap-7 pb-10 last:pb-2 group"
                onClick={() => setActivePhaseIndex(idx)}
              >
                {/* Left Side: Vertical Metro-Line & Glowing Circular Node */}
                <div className="flex flex-col items-center self-stretch flex-shrink-0">
                  {/* Glowing Node Button */}
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative z-10 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center text-white shadow-md cursor-pointer transition-all duration-300 ring-4 ${
                      nodeStyles.bg
                    } ${nodeStyles.ring} ${
                      isNodeActive ? 'scale-105 ring-8 shadow-lg' : 'opacity-90'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px] sm:text-[23px]">
                      {phase.icon}
                    </span>

                    {/* Step Number Ping Indicator */}
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-[#0a192f] text-[10px] font-extrabold flex items-center justify-center shadow-xs border border-slate-200">
                      {phase.phaseNumber}
                    </span>
                  </motion.div>

                  {/* Vertical Metro Line connecting to next node */}
                  {!isLast && (
                    <div className="w-1 flex-1 my-1 bg-slate-200 rounded-full relative overflow-hidden">
                      <div
                        className={`w-full h-full transition-all duration-500 ${nodeStyles.line}`}
                      />
                    </div>
                  )}
                </div>

                {/* Right Side: Rich Content Phase Card */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className={`flex-1 bg-white rounded-2xl p-4 sm:p-6 border transition-all duration-300 shadow-2xs ${
                    isNodeActive
                      ? 'border-slate-300 ring-1 ring-slate-200/70 shadow-md translate-x-0.5'
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  {/* Phase Header Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border ${nodeStyles.badge}`}>
                        {phase.name}
                      </span>
                      <span className="text-[14px] font-bold text-[#0a192f]">
                        {phase.tagline}
                      </span>
                    </div>

                    {/* Meta Badges */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-slate-500">schedule</span>
                        <span>{phase.durationBadge}</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-semibold flex items-center gap-1 border border-emerald-200/60">
                        <span className="material-symbols-outlined text-[13px] text-emerald-600">payments</span>
                        <span>{phase.costBadge}</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-900 text-[11px] font-semibold flex items-center gap-1 border border-blue-200/60">
                        <span className="material-symbols-outlined text-[13px] text-blue-600">check_circle</span>
                        <span>{phase.gatewayBadge}</span>
                      </span>

                      {/* "What If?" Dynamic Branching Button for High-Friction Milestones */}
                      {(phase.phaseId === 'next' || phase.phaseId === 'tertiary') && (
                        <button
                          id={`what-if-branch-btn-${phase.phaseId}`}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenAltDrawer(phase.phaseId === 'next' ? 'low-utme' : 'low-funds');
                          }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold transition-all shadow-2xs hover:scale-105 cursor-pointer ${
                            isPhaseAlternate
                              ? 'bg-[#c85a32] text-white hover:bg-[#b04b26]'
                              : 'bg-orange-100/90 text-[#9c3e1e] border border-orange-300 hover:bg-orange-200'
                          }`}
                          title="Open Nigerian scenario drawer: Low UTME, tuition aid, faster license or subject deficiency"
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {isPhaseAlternate ? 'check_circle' : 'alt_route'}
                          </span>
                          <span>
                            {isPhaseAlternate ? 'Alternate Branch Active' : 'What If? Branch Here'}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Alternate Branch Visual Route Box (When activated for this phase) */}
                  {isPhaseAlternate && activeScenario && (
                    <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-orange-50/90 via-amber-50/40 to-white border-2 border-[#c85a32] shadow-sm flex flex-col gap-3.5">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-orange-200/70 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#c85a32] text-white text-[10px] font-extrabold uppercase tracking-wide">
                            Alternate Path Activated
                          </span>
                          <span className="text-[12px] font-bold text-[#7c2d12]">
                            {activeScenario.shortLabel}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenAltDrawer();
                            }}
                            className="text-[11px] font-bold text-[#c85a32] hover:underline cursor-pointer"
                          >
                            Explore Other Scenarios
                          </button>
                          <span className="text-slate-300">|</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveScenarioId(null);
                            }}
                            className="text-[11px] font-bold text-slate-600 hover:text-slate-900 underline cursor-pointer"
                          >
                            Revert to Standard
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <h4 className="font-serif-headline text-[16px] font-bold text-[#0a192f]">
                          {activeScenario.branchTitle}
                        </h4>
                        <p className="text-[12.5px] text-slate-700 leading-relaxed font-medium">
                          {activeScenario.coreSprout}
                        </p>
                      </div>

                      {/* 3 Step Trajectory */}
                      <div className="flex flex-col gap-2 pt-1">
                        {activeScenario.pathwaySteps.map((step, sIdx) => (
                          <div key={sIdx} className="p-3 rounded-xl bg-white border border-orange-200/80 shadow-2xs flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-[#c85a32] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <span className="text-[12.5px] font-bold text-[#0a192f]">{step.stepTitle}</span>
                                <span className="text-[10px] font-semibold text-orange-900 bg-orange-100 px-2 py-0.5 rounded-md">
                                  {step.duration}
                                </span>
                              </div>
                              <p className="text-[12px] text-slate-600 mt-0.5 leading-relaxed">{step.details}</p>
                              <span className="text-[11px] text-slate-500 font-medium mt-1">
                                🏛 <strong>Accredited Centers:</strong> {step.institutionExamples}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Direct Entry Bridge & Savings */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
                        <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex flex-col gap-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#c85a32]">
                            {activeScenario.directEntryBridge.title}
                          </span>
                          <span className="text-slate-800 font-semibold">{activeScenario.directEntryBridge.mechanism}</span>
                          <span className="text-slate-500 text-[11px]">{activeScenario.directEntryBridge.requirements}</span>
                        </div>

                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col gap-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                            Financial Relief Profile
                          </span>
                          <span className="text-slate-800 font-semibold">{activeScenario.costComparison.alternateCost}</span>
                          <span className="text-emerald-700 text-[11px]">{activeScenario.costComparison.financialUpside}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Primary Narrative & Action Items */}
                  <div className="pt-3.5 flex flex-col gap-3">
                    <h3 className="font-serif-headline text-[17px] font-bold text-[#0a192f]">
                      {phase.primaryDetails.title}
                    </h3>
                    <p className="text-[13px] text-slate-600 leading-relaxed">
                      {phase.primaryDetails.description}
                    </p>

                    {/* Bullet Items */}
                    {phase.primaryDetails.items && (
                      <ul className="space-y-1.5 pt-1">
                        {phase.primaryDetails.items.map((item, i) => (
                          <li key={i} className="text-[12.5px] text-slate-700 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c85a32] mt-2 flex-shrink-0" />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Key Requirements Grid with 'Explain Like I'm 15' Popovers */}
                  <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {phase.keyRequirements.map((req, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500">
                            {req.label}
                          </span>
                          {req.explainKey && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveGlossaryKey(req.explainKey!);
                              }}
                              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-white border border-slate-200 text-[#0a192f] hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 text-[10px] font-bold transition-all cursor-pointer shadow-2xs"
                              title="Explain Like I'm 15"
                            >
                              <span>Explain</span>
                              <span className="material-symbols-outlined text-[12px]">help</span>
                            </button>
                          )}
                        </div>
                        <span className="text-[12.5px] font-semibold text-[#0a192f] leading-snug">
                          {req.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Phase Specific Cards: Free Resources, Cost Breakdowns, or Milestones */}
                  {phase.freeResources && phase.freeResources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#065f46] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[15px]">free_cancellation</span>
                          <span>Zero-Naira Skills &amp; Platforms (Start Today)</span>
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {phase.freeResources.map((res, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-200/60 flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-[12px] font-bold text-emerald-950 line-clamp-1">{res.name}</span>
                                <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-900">
                                  {res.tag}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 mt-1 leading-snug">{res.description}</p>
                            </div>
                            <span className="text-[10px] text-emerald-700 font-semibold mt-2">
                              Platform: {res.platform}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cost Breakdown Table (Phase 2) */}
                  {phase.costBreakdown && phase.costBreakdown.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#c85a32] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">receipt_long</span>
                        <span>Transparent Cost Realities in Nigeria (Naira Breakdown)</span>
                      </span>
                      <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                        <table className="w-full text-left text-[12px]">
                          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                            <tr>
                              <th className="p-2.5">Official Requirement / Material</th>
                              <th className="p-2.5">Estimated Cost</th>
                              <th className="p-2.5 hidden sm:table-cell">Context &amp; Tips</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-800">
                            {phase.costBreakdown.map((cost, i) => (
                              <tr key={i} className="hover:bg-slate-50/80">
                                <td className="p-2.5 font-medium text-[#0a192f]">{cost.item}</td>
                                <td className="p-2.5 font-bold text-[#c85a32] whitespace-nowrap">{cost.estimatedCost}</td>
                                <td className="p-2.5 text-slate-500 hidden sm:table-cell">{cost.notes}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Year-by-Year Milestones (Phase 3) */}
                  {phase.careerMilestones && phase.careerMilestones.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0a192f] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">timeline</span>
                        <span>Academic Level-by-Level Progression</span>
                      </span>
                      <div className="flex flex-col gap-1.5">
                        {phase.careerMilestones.map((m, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
                          >
                            <span className="px-2 py-0.5 rounded-md bg-[#0a192f] text-white text-[11px] font-bold whitespace-nowrap mt-0.5">
                              {m.year}
                            </span>
                            <span className="text-[12px] text-slate-700 leading-snug">{m.milestone}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Insider Counselor Advice Box */}
                  <div className="mt-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 text-[12px] text-amber-950 flex items-start gap-2">
                    <span className="material-symbols-outlined text-amber-700 text-[18px] flex-shrink-0 mt-0.5">
                      lightbulb
                    </span>
                    <div className="leading-snug">
                      <strong>Insider Counselor Tip: </strong>
                      {phase.insiderAdvice}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* High-Priority "My Next 90 Days" Action Missions Section */}
        <NinetyDaysActionEngine
          careerAmbition={careerAmbition}
          activeAlternateScenarioTitle={activeScenario?.branchTitle}
        />

        {/* "Someone Like Me" Mentorship Proof Section: Non-Linear Routes */}
        <SomeoneLikeMeSection
          careerAmbition={careerAmbition}
          onGoToMentorAI={onGoToMentorAI}
          className="mt-8"
        />
          </>
        )}
      </div>

      {/* Bottom Footer & Mentor AI Discussion Prompt */}
      <div className="px-5 sm:px-8 py-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-slate-600 text-[13px]">
          <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold flex-shrink-0">
            🇳🇬
          </span>
          <span>
            Every cut-off, syllabus combination, and salary projection is grounded in current JAMB, NUC, and Nigerian council guidelines.
          </span>
        </div>

        {onGoToMentorAI && (
          <button
            id="career-map-discuss-mentor-btn"
            type="button"
            onClick={() => {
              if (onClose) onClose();
              onGoToMentorAI(
                `I just reviewed my CarEdPath NG Career Map for ${mapData.careerTitle}. Can you help me review the exact WAEC subjects, cut-off benchmarks, and how to start Phase 1 right now?`
              );
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#dc2626] text-white font-semibold text-[13px] flex items-center justify-center gap-2 shadow-md hover:bg-[#b91c1c] active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Discuss This Map with Mentor AI</span>
          </button>
        )}
      </div>

      {/* Sticky Mobile Bar at Bottom with Quick Actions */}
      <div className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 flex sm:hidden items-center justify-between gap-2 shadow-lg no-print">
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('career-map-header');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex-1 py-2 px-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[15px]">arrow_upward</span>
          <span>Back to Map</span>
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="flex-1 py-2 px-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[15px]">picture_as_pdf</span>
          <span>Save as PDF</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (onClose) onClose();
            if (onExploreOpportunities) onExploreOpportunities();
          }}
          className="flex-1 py-2 px-1.5 rounded-xl bg-[#dc2626] text-white hover:bg-[#b91c1c] text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-sm whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-[15px]">school</span>
          <span>Opportunities</span>
        </button>
      </div>

      {/* "EXPLAIN LIKE I'M 15" MODAL / POPOVER */}
      <AnimatePresence>
        {activeGlossary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="glossary-modal-root">
            {/* Dimmed Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#0a192f]/70 backdrop-blur-xs"
              onClick={() => setActiveGlossaryKey(null)}
              aria-hidden="true"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 z-10 p-5 sm:p-6 flex flex-col gap-3 text-slate-900 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">psychology</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-700">
                      Explain Like I'm 15 • Nigerian Edition
                    </span>
                    <h4 className="font-serif-headline text-[18px] font-bold text-[#0a192f]">
                      {activeGlossary.term}
                    </h4>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveGlossaryKey(null)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close explanation"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              {/* Simplified Title */}
              <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200/70 text-[12.5px] font-semibold">
                💡 In Simple Words: {activeGlossary.simplifiedTitle}
              </div>

              {/* Explanation */}
              <div className="flex flex-col gap-2 text-[13px] text-slate-700 leading-relaxed">
                <p>{activeGlossary.explanation}</p>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0a192f] block mb-0.5">
                    How it Works in Nigeria:
                  </span>
                  <span>{activeGlossary.nigerianContext}</span>
                </div>
              </div>

              {/* Real Example */}
              <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200/70 text-[12.5px] text-orange-950">
                <strong>Real Life Example: </strong>
                {activeGlossary.example}
              </div>

              {/* Dismiss Button */}
              <button
                type="button"
                onClick={() => setActiveGlossaryKey(null)}
                className="w-full py-2.5 rounded-xl bg-[#0a192f] text-white font-semibold text-[13px] hover:bg-[#132644] transition-colors cursor-pointer mt-1"
              >
                Got It, Thanks!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* "WHAT IF?" ALTERNATIVE ROUTE ENGINE DRAWER */}
      <AnimatePresence>
        {isAltDrawerOpen && (
          <AlternativeRouteDrawer
            isOpen={isAltDrawerOpen}
            onClose={() => setIsAltDrawerOpen(false)}
            activeScenarioId={activeScenarioId}
            onSelectScenario={(id) => setActiveScenarioId(id)}
            initialFocusedScenario={initialDrawerScenario}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
