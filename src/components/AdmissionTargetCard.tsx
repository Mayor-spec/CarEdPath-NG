/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  InstitutionId,
  SUPPORTED_INSTITUTIONS,
  normalizeInstitutionId,
  VerifiedAdmissionRequirement,
  VerifiedAdmissionFact,
  getVerifiedAdmissionData,
  getAvailableInstitutionsForProgramme,
  getAvailableProgrammesForInstitution,
  getVerifiedAdmissionFacts,
  compareStudentReadiness,
  StudentReadinessComparison
} from '../data/verifiedAdmissionData';

interface AdmissionTargetCardProps {
  careerTitle: string;
  initialInstitution?: string;
  initialSession?: string;
  enteredUtmeScore?: number;
  enteredOlevelGrades?: Record<string, string>;
  onSwitchInstitution?: (newInstitution: string, newInstId?: InstitutionId) => void;
  onExploreAlternativeProgramme?: (programmeName: string) => void;
}

export const AdmissionTargetCard: React.FC<AdmissionTargetCardProps> = ({
  careerTitle,
  initialInstitution = 'University of Ilorin',
  initialSession = '2026/2027',
  enteredUtmeScore: propUtme,
  enteredOlevelGrades: propOlevel,
  onSwitchInstitution,
  onExploreAlternativeProgramme
}) => {
  // Primary unique institution identifier key
  const [selectedInstId, setSelectedInstId] = useState<InstitutionId>(() => {
    return normalizeInstitutionId(initialInstitution) || 'unilorin';
  });

  // Strict synchronization: update selected institution when initialInstitution prop updates
  useEffect(() => {
    if (initialInstitution) {
      const normalized = normalizeInstitutionId(initialInstitution);
      if (normalized && normalized !== selectedInstId) {
        setSelectedInstId(normalized);
      }
    }
  }, [initialInstitution]);

  const [activeSession, setActiveSession] = useState<string>(initialSession);
  const [showSourcesModal, setShowSourcesModal] = useState<boolean>(false);
  const [showReadinessCheck, setShowReadinessCheck] = useState<boolean>(false);
  // Collapsible sections: Minimum Requirements and Cut-off Data collapsed by default
  const [isMinimumReqOpen, setIsMinimumReqOpen] = useState<boolean>(false);
  const [isCutoffDataOpen, setIsCutoffDataOpen] = useState<boolean>(false);

  // Student inputs for interactive aggregate & readiness evaluation
  const [studentUtme, setStudentUtme] = useState<string>(propUtme ? propUtme.toString() : '');
  const [studentPostUtme, setStudentPostUtme] = useState<string>('');
  const [studentOlevel, setStudentOlevel] = useState<Record<string, string>>(
    propOlevel || {
      'English Language': 'B3',
      'Mathematics': 'B3',
      'Biology': 'B2',
      'Chemistry': 'B2',
      'Physics': 'B3'
    }
  );

  // Query verified admission database strictly by institution ID and programme
  const admissionReq: VerifiedAdmissionRequirement | null = getVerifiedAdmissionData(
    careerTitle,
    selectedInstId,
    activeSession
  );

  // Validation Rule #9: Validate selectedInstitutionId === data.institutionId
  const isDataValidForSelectedInstitution = Boolean(
    admissionReq && admissionReq.institutionId === selectedInstId
  );

  const availableInstitutions = getAvailableInstitutionsForProgramme(careerTitle);
  const availableProgrammesAtSelectedInst = getAvailableProgrammesForInstitution(selectedInstId);
  const selectedInstMeta = SUPPORTED_INSTITUTIONS[selectedInstId];

  const handleSelectInstitution = (instId: InstitutionId) => {
    setSelectedInstId(instId);
    // When switching institutions, clear or validate post-UTME if out of range for target institution
    if (instId === 'unilag' && studentPostUtme && parseFloat(studentPostUtme) > 30) {
      setStudentPostUtme('');
    } else if (instId === 'oau' && studentPostUtme && parseFloat(studentPostUtme) > 40) {
      setStudentPostUtme('');
    }
    const meta = SUPPORTED_INSTITUTIONS[instId];
    if (onSwitchInstitution) {
      onSwitchInstitution(meta.fullName, instId);
    }
  };

  const handleGradeChange = (subject: string, grade: string) => {
    setStudentOlevel(prev => ({
      ...prev,
      [subject]: grade
    }));
  };

  // Rule 7 & 9: Strict Institution Isolation Fallback
  // If verified data for the selected institution is unavailable or IDs do not match,
  // do NOT silently display another institution's data!
  if (!isDataValidForSelectedInstitution || !admissionReq) {
    return (
      <div className="bg-white rounded-2xl border-2 border-stone-200 overflow-hidden my-6 shadow-sm">
        {/* Header with Institution Pill Switcher */}
        <div className="bg-[#0b291b] text-white p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider border border-amber-400/30">
                  Strict Institution Isolation Active
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/90 text-[11px] font-semibold border border-white/15">
                  Session: {activeSession}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-headline text-white">
                {careerTitle}
              </h2>
              <p className="text-xs text-emerald-100/80 mt-0.5">
                Target Institution: <strong className="text-white">{selectedInstMeta.fullName} ({selectedInstMeta.shortName})</strong>
              </p>
            </div>
          </div>

          {/* Institution Selector Pills */}
          <div className="mt-4 pt-3 border-t border-emerald-800/60 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[11px] text-emerald-300/80 font-semibold uppercase tracking-wider flex-shrink-0">
              Institution:
            </span>
            {(Object.keys(SUPPORTED_INSTITUTIONS) as InstitutionId[]).map((instKey) => {
              const inst = SUPPORTED_INSTITUTIONS[instKey];
              const isSelected = selectedInstId === inst.id;
              return (
                <button
                  key={inst.id}
                  type="button"
                  onClick={() => handleSelectInstitution(inst.id)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all flex-shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-amber-950 font-bold shadow-xs ring-2 ring-amber-300'
                      : 'bg-white/10 text-white/90 hover:bg-white/20 border border-white/10'
                  }`}
                >
                  {inst.shortName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Unavailable Body Notice */}
        <div className="p-6 sm:p-8 text-center bg-stone-50/50">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4 text-amber-700 shadow-xs">
            <span className="material-symbols-outlined text-2xl">domain_disabled</span>
          </div>

          <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200 mb-2">
            No Silent Substitution Guarantee
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-serif-headline text-[#0a192f] mb-2 max-w-xl mx-auto">
            Verified data for {selectedInstMeta.fullName} ({selectedInstMeta.shortName}) is currently unavailable for {careerTitle}
          </h3>

          <p className="text-sm text-stone-600 max-w-xl mx-auto mb-6 leading-relaxed">
            Verified data for this institution/programme is currently unavailable. Please check the institution's official admission portal or official publication.
            Under no circumstance does CarEdPath NG substitute cut-off marks, Post-UTME formulas, or admission criteria from another university.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <a
              href={selectedInstMeta.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#0b291b] hover:bg-[#071c12] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-emerald-400">open_in_new</span>
              <span>Visit Official {selectedInstMeta.shortName} Portal</span>
            </a>
          </div>

          {/* Alternative Verified Institutions for this Programme */}
          {availableInstitutions.length > 0 && (
            <div className="p-4 rounded-xl bg-white border border-stone-200 max-w-lg mx-auto text-left mb-4 shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-2">
                Universities with verified admission data for {careerTitle}:
              </span>
              <div className="flex flex-wrap gap-2">
                {availableInstitutions.map((inst) => (
                  <button
                    key={inst.id}
                    type="button"
                    onClick={() => handleSelectInstitution(inst.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    Switch to {inst.shortName} ({inst.name})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Alternative Programmes Verified at the Selected Institution */}
          {availableProgrammesAtSelectedInst.length > 0 && (
            <div className="p-4 rounded-xl bg-white border border-stone-200 max-w-lg mx-auto text-left shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-2">
                Verified programmes indexed at {selectedInstMeta.shortName}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {availableProgrammesAtSelectedInst.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => onExploreAlternativeProgramme && onExploreAlternativeProgramme(p.programme)}
                    className="px-2.5 py-1 rounded-md text-[11.5px] font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    {p.programme}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Evaluate readiness with strictly matched institution data
  const parsedUtme = parseInt(studentUtme, 10) || undefined;
  const parsedPostUtme = parseFloat(studentPostUtme) || undefined;
  const readiness: StudentReadinessComparison | null = compareStudentReadiness(
    selectedInstId,
    admissionReq,
    {
      utmeScore: parsedUtme,
      postUtmeScore: parsedPostUtme,
      olevelGrades: studentOlevel
    }
  );

  if (!readiness) {
    return null;
  }

  const verifiedFacts: VerifiedAdmissionFact[] = getVerifiedAdmissionFacts(admissionReq);

  return (
    <div className="bg-white rounded-2xl border-2 border-emerald-900/15 shadow-sm overflow-hidden mb-6">
      {/* 1. Header Bar: Programme + Institution Lock + Academic Session */}
      <div className="bg-[#0b291b] text-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold uppercase tracking-wider border border-emerald-500/30">
                Official Admission Guidance
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/90 text-[11px] font-semibold border border-white/15">
                Session: {activeSession}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 text-[10px] font-mono border border-emerald-700/40">
                ID: {admissionReq.institutionId}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-headline text-white flex items-center gap-2">
              <span>{admissionReq.programme}</span>
              <span className="text-emerald-400 text-sm font-sans font-normal hidden sm:inline">
                ({admissionReq.degree})
              </span>
            </h2>
            <p className="text-xs text-emerald-100/80 mt-0.5">
              {admissionReq.faculty} • <strong className="text-white">{admissionReq.institution}</strong> ({admissionReq.institutionShortName})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSourcesModal(true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-emerald-600/50 cursor-pointer shadow-xs"
              title="View verification sources, JAMB IBASS citation, and regulatory accreditation"
            >
              <span className="material-symbols-outlined text-[16px] text-emerald-300">verified</span>
              <span>Verify Sources</span>
            </button>
          </div>
        </div>

        {/* Institution Selector Pills */}
        <div className="mt-4 pt-3 border-t border-emerald-800/60 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-[11px] text-emerald-300/80 font-semibold uppercase tracking-wider flex-shrink-0">
            Institution:
          </span>
          {(Object.keys(SUPPORTED_INSTITUTIONS) as InstitutionId[]).map((instKey) => {
            const inst = SUPPORTED_INSTITUTIONS[instKey];
            const isSelected = selectedInstId === inst.id;
            return (
              <button
                key={inst.id}
                type="button"
                onClick={() => handleSelectInstitution(inst.id)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all flex-shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-400 text-emerald-950 font-bold shadow-xs ring-2 ring-emerald-300'
                    : 'bg-white/10 text-white/90 hover:bg-white/20 border border-white/10'
                }`}
              >
                {inst.shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Primary Comparative Grid: Target to Aim For vs Minimum Requirement */}
      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* CARD A: TARGET TO AIM FOR (COMPETITIVE PREPARATION) */}
        <div className="rounded-xl border-2 border-emerald-600/30 bg-emerald-50/40 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-900 bg-emerald-200/80 px-2.5 py-1 rounded-md border border-emerald-300">
                <span className="material-symbols-outlined text-[15px] text-emerald-800">adjust</span>
                Target to Aim For
              </span>
              <span className="text-[11px] text-emerald-700 font-medium">
                Preparation Goal (Competitive)
              </span>
            </div>

            <p className="text-xs text-slate-700 mb-3">
              Aim for these benchmarks to compete strongly for National Merit admission at <strong>{admissionReq.institutionShortName}</strong>:
            </p>

            {/* WAEC Breakdown */}
            <div className="mb-4">
              <h4 className="text-xs font-bold uppercase text-slate-800 tracking-wider mb-2 flex items-center justify-between">
                <span>WAEC / O'Level Target Grades</span>
                <span className="text-[10px] text-emerald-800 font-normal">CarEdPath target</span>
              </h4>
              <div className="space-y-1.5">
                {admissionReq.targetGrades.map((tg) => (
                  <div
                    key={tg.subject}
                    className="flex items-center justify-between p-2 rounded-lg bg-white border border-emerald-200/60 text-xs"
                  >
                    <span className="font-semibold text-slate-800">{tg.subject}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500 hidden sm:inline">{tg.basis}</span>
                      <span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                        {tg.target}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* UTME & Post-UTME Targets */}
            <div className="grid grid-cols-2 gap-2.5 mb-3">
              <div className="p-3 rounded-lg bg-white border border-emerald-200/80">
                <div className="text-[11px] font-bold uppercase text-slate-600">UTME Target</div>
                <div className="text-xl font-bold text-emerald-900 mt-0.5">
                  {admissionReq.targetUtme}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Aim for {admissionReq.targetUtme} at {admissionReq.institutionShortName}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white border border-emerald-200/80">
                <div className="text-[11px] font-bold uppercase text-slate-600">Post-UTME Target</div>
                <div className="text-lg font-bold text-emerald-900 mt-0.5 truncate">
                  {admissionReq.targetPostUtme}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Competitive {admissionReq.institutionShortName} screening target
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-emerald-200/60 text-[11px] text-emerald-900/80 italic">
            * Targets are preparation goals based on verified admission data for {admissionReq.institutionShortName}, not guaranteed admission.
          </div>
        </div>

        {/* CARD B: MINIMUM REQUIREMENT (OFFICIAL THRESHOLD) - Collapsible on Tap */}
        <div className="rounded-xl border border-slate-300 bg-slate-50/70 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div 
              onClick={() => setIsMinimumReqOpen(!isMinimumReqOpen)}
              className="flex items-center justify-between cursor-pointer select-none group"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-slate-600">rule</span>
                <span className="text-sm font-bold text-slate-800">
                  Minimum Requirements ({admissionReq.institutionShortName})
                </span>
                <span className="text-[11px] font-medium text-slate-500 hidden sm:inline">
                  • Official Eligibility Base
                </span>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 group-hover:text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs"
                aria-expanded={isMinimumReqOpen}
              >
                <span>{isMinimumReqOpen ? 'Collapse' : 'Expand'}</span>
                <span className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${isMinimumReqOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
            </div>

            {/* Collapsed Preview Summary */}
            {!isMinimumReqOpen && (
              <div 
                onClick={() => setIsMinimumReqOpen(true)}
                className="mt-3 pt-3 border-t border-slate-200/80 cursor-pointer text-xs text-slate-600 hover:text-slate-800 flex items-center justify-between gap-2"
              >
                <span>
                  WAEC: <strong>5 Credits ({admissionReq.olevelRequirements.length} subjects)</strong> • UTME Min: <strong>{admissionReq.utmeMinimum}</strong> • Screening: <strong>Compulsory</strong>
                </span>
                <span className="text-[11px] font-medium text-emerald-800 underline flex-shrink-0">
                  View breakdown
                </span>
              </div>
            )}

            {/* Expanded Detailed Requirements */}
            {isMinimumReqOpen && (
              <div className="mt-3 pt-3 border-t border-slate-200/80">
                <p className="text-xs text-slate-700 mb-3">
                  Published baseline criteria required to participate in <strong>{admissionReq.institutionShortName}</strong> admission screening:
                </p>

                <div className="space-y-3 mb-4">
                  {/* O'Level Minimum */}
                  <div className="p-3 rounded-lg bg-white border border-slate-200">
                    <div className="text-[11px] font-bold uppercase text-slate-600 mb-1 flex items-center justify-between">
                      <span>O'Level / WAEC Minimum</span>
                      <span className="text-[10px] text-slate-500">5 Credits (C6)</span>
                    </div>
                    <div className="text-xs text-slate-800 font-medium">
                      5 Credit passes: {admissionReq.olevelRequirements.join(', ')}.
                    </div>
                    <div className="mt-1.5 inline-block text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {admissionReq.olevelSittings}
                    </div>
                  </div>

                  {/* UTME Minimum */}
                  <div className="p-3 rounded-lg bg-white border border-slate-200">
                    <div className="text-[11px] font-bold uppercase text-slate-600 mb-1">
                      UTME Minimum &amp; Subjects
                    </div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-slate-600">Official Minimum Score:</span>
                      <span className="text-sm font-bold text-slate-900 px-2 py-0.5 bg-slate-100 rounded border border-slate-300">
                        {admissionReq.utmeMinimum}
                      </span>
                    </div>
                    <div className="text-xs text-slate-700">
                      <strong className="text-slate-800">Required Combination: </strong>
                      {admissionReq.utmeSubjects.join(' + ')}
                    </div>
                  </div>

                  {/* Post-UTME Minimum */}
                  <div className="p-3 rounded-lg bg-white border border-slate-200">
                    <div className="text-[11px] font-bold uppercase text-slate-600 mb-1 flex items-center justify-between">
                      <span>Post-UTME Screening Requirement</span>
                      <span className="text-[10px] text-emerald-800 font-bold">Compulsory</span>
                    </div>
                    <div className="text-xs text-slate-800">
                      {admissionReq.postUtmeMinimum}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                  Failing to meet {admissionReq.institutionShortName}'s minimum causes disqualification during portal verification.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Recent Cut-Off & Verified Source Details Box - Collapsible on Tap */}
      <div className="px-4 sm:px-6 pb-4">
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
          <div 
            onClick={() => setIsCutoffDataOpen(!isCutoffDataOpen)}
            className="flex items-center justify-between cursor-pointer select-none group"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-slate-600">analytics</span>
              <span className="text-sm font-bold text-slate-900">
                Official Cut-Off &amp; Benchmark Data ({admissionReq.institutionShortName})
              </span>
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                • Session: {admissionReq.recentCutoff.session}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 hidden sm:inline">
                Merit Benchmark: {admissionReq.recentCutoff.score}
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 group-hover:text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs"
                aria-expanded={isCutoffDataOpen}
              >
                <span>{isCutoffDataOpen ? 'Collapse' : 'Expand'}</span>
                <span className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${isCutoffDataOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
            </div>
          </div>

          {/* Collapsed Preview Summary */}
          {!isCutoffDataOpen && (
            <div 
              onClick={() => setIsCutoffDataOpen(true)}
              className="mt-2 pt-2 border-t border-slate-200/70 cursor-pointer flex flex-wrap items-center justify-between text-xs text-slate-600 hover:text-slate-800"
            >
              <span>
                Recent Official Merit Cut-Off: <strong className="text-slate-900">{admissionReq.recentCutoff.score}</strong> ({admissionReq.recentCutoff.session})
              </span>
              <span className="text-[11px] font-medium text-emerald-800 underline">
                View source &amp; verification details
              </span>
            </div>
          )}

          {/* Expanded Cut-off Details */}
          {isCutoffDataOpen && (
            <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="text-sm font-bold text-slate-900">
                  Recent Official Merit Benchmark: <span className="text-emerald-800 font-extrabold">{admissionReq.recentCutoff.score}</span>
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Academic Session: <strong>{admissionReq.recentCutoff.session}</strong> • Verified Source: {admissionReq.sources[0]?.title} • Verified Date: {admissionReq.verifiedDate}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowReadinessCheck(!showReadinessCheck)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[17px]">calculate</span>
                <span>{showReadinessCheck ? 'Hide Readiness Calculator' : 'Check My Readiness & Aggregate'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4. Aggregate Formula Breakdown Banner (Strictly Institution-Specific) */}
      <div className="px-4 sm:px-6 pb-4">
        <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700">
          <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#c85a32]">functions</span>
            <span>{admissionReq.aggregateFormula.name}: {admissionReq.aggregateFormula.description}</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            {admissionReq.aggregateFormula.formulaExplanation}
          </p>
        </div>
      </div>

      {/* 5. Interactive Student Personalization & Readiness Assessment Drawer */}
      <AnimatePresence>
        {showReadinessCheck && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-slate-200 bg-slate-50 p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-700 text-[18px]">person_check</span>
                  <span>Student Readiness &amp; Aggregate Calculator ({admissionReq.institutionShortName})</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Enter your grades to compare against {admissionReq.institutionShortName}'s {admissionReq.programme} targets.
                </p>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Your UTME Score (out of 400)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 280"
                  value={studentUtme}
                  onChange={(e) => setStudentUtme(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-700"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Minimum: {admissionReq.utmeMinimum} • Target: {admissionReq.targetUtme}
                </p>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  {admissionReq.institutionId === 'unilorin'
                    ? 'UNILORIN Post-UTME CBT (out of 100)'
                    : admissionReq.institutionId === 'unilag'
                    ? 'UNILAG Post-UTME CBT (out of 30)'
                    : admissionReq.institutionId === 'unn'
                    ? 'UNN Post-UTME CBT (out of 400)'
                    : admissionReq.institutionId === 'oau'
                    ? 'OAU Post-UTME Screening (out of 40)'
                    : 'Post-UTME CBT Score (out of 100)'}
                </label>
                <input
                  type="number"
                  placeholder={
                    admissionReq.institutionId === 'unilorin'
                      ? 'e.g. 78'
                      : admissionReq.institutionId === 'unilag'
                      ? 'e.g. 24'
                      : admissionReq.institutionId === 'unn'
                      ? 'e.g. 290'
                      : admissionReq.institutionId === 'oau'
                      ? 'e.g. 32'
                      : 'e.g. 75'
                  }
                  value={studentPostUtme}
                  onChange={(e) => setStudentPostUtme(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:border-emerald-700"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  {admissionReq.institutionId === 'unilorin'
                    ? 'UNILORIN tests CBT out of 100 (Pass mark: 50/100, Target: 75+/100). Contributes 50% to aggregate (Score ÷ 2).'
                    : admissionReq.institutionId === 'unilag'
                    ? 'UNILAG scores CBT out of 30 (Min: 15/30, Target: 24+/30). If entered as %, it scales to /30.'
                    : admissionReq.institutionId === 'unn'
                    ? 'UNN scores CBT out of 400 (Combined Average: [UTME + Post-UTME] ÷ 2).'
                    : admissionReq.institutionId === 'oau'
                    ? 'OAU Post-UTME screening is scored out of 40 marks and directly contributes 40 marks to aggregate (Pass mark: 20/40, Target: 32+/40). UTME contributes 50, O\'Level 10.'
                    : 'CBT screening out of 100 (Pass mark: 50/100). Contributes 50% to aggregate.'}
                </p>
              </div>

              <div className="sm:col-span-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  O'Level Sittings
                </label>
                <div className="p-2 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-800">
                  {admissionReq.olevelSittings}
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Verified policy at {admissionReq.institutionShortName}
                </p>
              </div>
            </div>

            {/* Subject Grade Selectors */}
            <div className="mb-4">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                O'Level Grades (WAEC / NECO) — {admissionReq.institutionShortName} Requirements
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {admissionReq.olevelRequirements.map((subj) => (
                  <div key={subj} className="p-2 rounded-lg bg-white border border-slate-200">
                    <div className="text-[11px] font-medium text-slate-700 truncate" title={subj}>
                      {subj}
                    </div>
                    <select
                      value={studentOlevel[subj] || 'B3'}
                      onChange={(e) => handleGradeChange(subj, e.target.value)}
                      className="w-full mt-1 px-2 py-1 rounded bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900"
                    >
                      {['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9'].map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Evaluation Results */}
            <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 mb-4 shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px] text-emerald-700">insights</span>
                  <span>Readiness &amp; Target Evaluation ({admissionReq.institutionShortName})</span>
                </h4>
                <span className="text-[11px] font-mono text-slate-500">
                  Data ID: {admissionReq.institutionId} • Session: {admissionReq.academicSession}
                </span>
              </div>

              {/* RULE 5: DISTINCT SEPARATION OF REQUIREMENT (ELIGIBILITY) FROM READINESS (COMPETITIVENESS) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {/* 1. Official Eligibility Box (Baseline Threshold) */}
                <div className={`p-3.5 rounded-xl border ${
                  readiness.eligibility.isEligible
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50/80 border-rose-300 text-rose-950'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">
                        {readiness.eligibility.isEligible ? 'verified' : 'cancel'}
                      </span>
                      <span>1. Official Eligibility Status</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      readiness.eligibility.isEligible
                        ? 'bg-emerald-200 text-emerald-900 border border-emerald-400'
                        : 'bg-rose-200 text-rose-900 border border-rose-400'
                    }`}>
                      {readiness.eligibility.status}
                    </span>
                  </div>
                  {readiness.eligibility.isEligible ? (
                    <p className="text-xs text-emerald-900 leading-relaxed">
                      ✓ Satisfies published baseline requirements for {admissionReq.programme} at {admissionReq.institutionShortName} (UTME ≥ {admissionReq.utmeMinimum}, 5 core O'Level credit passes).
                    </p>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-rose-900">
                        Disqualifying deficits preventing screening eligibility:
                      </p>
                      <ul className="text-xs text-rose-800 list-disc list-inside space-y-0.5">
                        {readiness.eligibility.disqualifications.map((disq, i) => (
                          <li key={i}>{disq}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* 2. Competitiveness & Readiness Score (Preparation Benchmark) */}
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-emerald-700">target</span>
                      <span>2. Competitiveness &amp; Readiness</span>
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase border ${
                      readiness.readiness.level === 'Highly Ready & Competitive'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : readiness.readiness.level === 'Ready / On Track'
                        ? 'bg-teal-100 text-teal-900 border-teal-300'
                        : readiness.readiness.level === 'Borderline / Needs Targeted Prep'
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : readiness.readiness.level === 'Below Competitive Benchmark'
                        ? 'bg-orange-100 text-orange-900 border-orange-300'
                        : 'bg-rose-100 text-rose-900 border-rose-300'
                    }`}>
                      {readiness.readiness.level}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 my-1">
                    <div className="text-2xl font-black text-slate-900">
                      {readiness.readiness.percentage}%
                    </div>
                    <div className="flex-1 bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          readiness.readiness.percentage >= 95
                            ? 'bg-emerald-600'
                            : readiness.readiness.percentage >= 80
                            ? 'bg-teal-600'
                            : readiness.readiness.percentage >= 60
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${readiness.readiness.percentage}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-snug">
                    {readiness.readiness.summary}
                  </p>
                </div>
              </div>

              {/* RULE 6: TARGET SCORE CALCULATION & EXPLICIT NUMERICAL GAPS */}
              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-2">
                  Component Targets &amp; Preparation Gap Analysis:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* UTME Target & Gap Card */}
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-slate-800">JAMB UTME (out of 400)</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        readiness.targets.utme.status === 'exceeds-target'
                          ? 'bg-emerald-100 text-emerald-800'
                          : readiness.targets.utme.status === 'needs-improvement'
                          ? 'bg-amber-100 text-amber-800'
                          : readiness.targets.utme.status === 'below-minimum'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {readiness.targets.utme.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center py-2 bg-white rounded border border-slate-200 my-1.5">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">Your Score</div>
                        <div className="text-sm font-bold text-slate-900">{readiness.targets.utme.currentScore || 'None'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">Target</div>
                        <div className="text-sm font-bold text-emerald-800">{readiness.targets.utme.recommendedTargetDisplay}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">Gap to Target</div>
                        <div className="text-sm font-bold text-amber-900">{readiness.targets.utme.gapDisplay}</div>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-tight">
                      {readiness.targets.utme.feedback}
                    </p>
                  </div>

                  {/* Post-UTME Target & Gap Card */}
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-slate-800">
                        {admissionReq.institutionShortName} Post-UTME Screening
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        readiness.targets.postUtme?.status === 'exceeds-target'
                          ? 'bg-emerald-100 text-emerald-800'
                          : readiness.targets.postUtme?.status === 'needs-improvement'
                          ? 'bg-amber-100 text-amber-800'
                          : readiness.targets.postUtme?.status === 'below-minimum'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {readiness.targets.postUtme?.status === 'pending' ? 'Pending CBT' : readiness.targets.postUtme?.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center py-2 bg-white rounded border border-slate-200 my-1.5">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">Your Score</div>
                        <div className="text-sm font-bold text-slate-900">
                          {readiness.targets.postUtme?.currentScore !== undefined
                            ? `${readiness.targets.postUtme.currentScore} / ${readiness.targets.postUtme.maxPossible}`
                            : 'Pending'}
                        </div>
                        {readiness.targets.postUtme?.percentagePerformance !== undefined && (
                          <div className="text-[10px] text-emerald-700 font-semibold">
                            ({readiness.targets.postUtme.percentagePerformance}% perf.)
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">Target</div>
                        <div className="text-sm font-bold text-emerald-800">
                          {readiness.targets.postUtme?.recommendedTargetDisplay}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">Min Pass</div>
                        <div className="text-sm font-bold text-slate-700">
                          {readiness.targets.postUtme?.minimumRequired} / {readiness.targets.postUtme?.maxPossible}
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-tight">
                      {readiness.targets.postUtme?.feedback}
                    </p>
                  </div>
                </div>
              </div>

              {/* O'Level Status Checklist */}
              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                  WAEC / NECO Subject Requirements Check ({admissionReq.institutionShortName}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {readiness.targets.olevel.map((item) => (
                    <div
                      key={item.subject}
                      className="p-2 rounded bg-slate-50 text-xs border border-slate-200 flex items-center justify-between gap-1"
                    >
                      <div className="truncate">
                        <span className="font-semibold text-slate-800">{item.subject}</span>
                        <div className="text-[10px] text-slate-500">
                          Grade: <strong>{item.userGrade || 'None'}</strong> • Target: {item.targetGrade}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase flex-shrink-0 ${
                          item.status === 'on-track'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.status === 'needs-improvement'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {item.status === 'on-track' ? 'On track' : item.status === 'needs-improvement' ? 'Passes min' : 'Below min'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RULE 4 & 5: CALCULATED INSTITUTIONAL AGGREGATE RESULT */}
              {readiness.calculatedAggregate && (
                <div className="p-4 rounded-xl bg-emerald-50/90 border border-emerald-300 mb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-emerald-200">
                    <div>
                      <div className="text-[11px] font-bold uppercase text-emerald-900 tracking-wider">
                        Institutional Admission Aggregate ({admissionReq.institutionShortName})
                      </div>
                      <div className="text-2xl font-black text-emerald-950">
                        {readiness.calculatedAggregate.score}{' '}
                        <span className="text-sm font-semibold text-emerald-800">
                          / {readiness.calculatedAggregate.maxScore}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                        readiness.calculatedAggregate.status === 'Competitive'
                          ? 'bg-emerald-200 text-emerald-950 border-emerald-400'
                          : readiness.calculatedAggregate.status === 'Close to Benchmark'
                          ? 'bg-teal-200 text-teal-950 border-teal-400'
                          : readiness.calculatedAggregate.status === 'Pending Post-UTME'
                          ? 'bg-amber-200 text-amber-950 border-amber-400'
                          : 'bg-rose-200 text-rose-950 border-rose-400'
                      }`}>
                        {readiness.calculatedAggregate.status}
                      </span>
                      <div className="text-[11px] font-semibold text-emerald-900 mt-1">
                        {readiness.calculatedAggregate.gapDisplay}
                      </div>
                    </div>
                  </div>

                  {/* Component Breakdown Grid (Explicit institutional contributions) */}
                  {readiness.calculatedAggregate.components && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-2.5">
                      <div className="bg-white/90 p-2.5 rounded-lg border border-emerald-200 text-center">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">UTME Contribution</div>
                        <div className="text-base font-black text-slate-900 mt-0.5">
                          {readiness.calculatedAggregate.components.utme.score}/{readiness.calculatedAggregate.components.utme.max}
                        </div>
                        {readiness.calculatedAggregate.components.utme.percentage !== undefined && (
                          <div className="text-[10px] text-slate-500 font-medium">({readiness.calculatedAggregate.components.utme.percentage}%)</div>
                        )}
                      </div>
                      {readiness.calculatedAggregate.components.postUtme && (
                        <div className="bg-white/90 p-2.5 rounded-lg border border-emerald-200 text-center">
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Post-UTME</div>
                          <div className="text-base font-black text-slate-900 mt-0.5">
                            {readiness.calculatedAggregate.components.postUtme.score}/{readiness.calculatedAggregate.components.postUtme.max}
                          </div>
                          {readiness.calculatedAggregate.components.postUtme.percentage !== undefined && (
                            <div className="text-[10px] text-emerald-700 font-semibold">({readiness.calculatedAggregate.components.postUtme.percentage}% perf.)</div>
                          )}
                        </div>
                      )}
                      {readiness.calculatedAggregate.components.olevel && (
                        <div className="bg-white/90 p-2.5 rounded-lg border border-emerald-200 text-center">
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">O'Level Points</div>
                          <div className="text-base font-black text-slate-900 mt-0.5">
                            {readiness.calculatedAggregate.components.olevel.score}/{readiness.calculatedAggregate.components.olevel.max}
                          </div>
                          {readiness.calculatedAggregate.components.olevel.percentage !== undefined && (
                            <div className="text-[10px] text-slate-500 font-medium">({readiness.calculatedAggregate.components.olevel.percentage}%)</div>
                          )}
                        </div>
                      )}
                      <div className="bg-emerald-100/90 p-2.5 rounded-lg border border-emerald-300 text-center">
                        <div className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider">Final Aggregate</div>
                        <div className="text-base font-black text-emerald-950 mt-0.5">
                          {readiness.calculatedAggregate.score}/{readiness.calculatedAggregate.maxScore}
                        </div>
                        <div className="text-[10px] text-emerald-800 font-semibold">{readiness.calculatedAggregate.status}</div>
                      </div>
                    </div>
                  )}

                  <div className="text-xs font-mono font-medium text-emerald-950 bg-emerald-100/80 px-3 py-2 rounded-lg border border-emerald-300/80 mb-2 leading-relaxed">
                    {readiness.calculatedAggregate.breakdownText}
                  </div>

                  <div className="text-[11px] text-slate-700 flex flex-wrap items-center justify-between gap-2">
                    <span>
                      Recent Official Merit Cut-Off: <strong>{readiness.calculatedAggregate.cutOffBenchmark}</strong>
                    </span>
                    <span className="text-slate-500 font-medium">
                      Session: {readiness.calculatedAggregate.benchmarkSession}
                    </span>
                  </div>
                </div>
              )}

              {/* ACTIONABLE RECOMMENDATIONS */}
              {readiness.recommendations.length > 0 && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined text-[16px] text-emerald-700">playlist_add_check</span>
                    <span>Strategic Preparation Recommendations:</span>
                  </div>
                  <div className="space-y-2">
                    {readiness.recommendations.map((rec, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900">{rec.title}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            rec.priority === 'Critical'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : rec.priority === 'High'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}>
                            {rec.priority} Priority
                          </span>
                        </div>
                        <p className="text-slate-700">{rec.action}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{rec.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* WHAT IF? ADVICE SECTION */}
            <div className="p-4 rounded-xl bg-white border-2 border-dashed border-[#c85a32]/40">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8a3314] flex items-center gap-1.5 mb-1.5">
                <span className="material-symbols-outlined text-[16px]">alt_route</span>
                <span>What If? Alternative Preparation Route ({admissionReq.institutionShortName})</span>
              </div>
              <p className="text-xs text-slate-700 mb-2">
                {admissionReq.alternativeAdvice.shortNote}
              </p>
              <ul className="space-y-1.5">
                {admissionReq.alternativeAdvice.options.map((opt, idx) => (
                  <li key={idx} className="text-xs text-slate-800 flex items-start gap-2">
                    <span className="text-[#c85a32] font-bold">•</span>
                    <span>{opt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Official Sources & Data Structure Verification Modal (Rule 8) */}
      <AnimatePresence>
        {showSourcesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-700 text-[22px]">verified</span>
                  <div>
                    <h3 className="font-serif-headline text-lg font-bold text-slate-900">
                      Admission Verification Facts ({admissionReq.institutionShortName})
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Institution ID: <strong className="font-mono">{admissionReq.institutionId}</strong> • Verified: {admissionReq.verifiedDate}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSourcesModal(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="text-xs text-slate-600 mb-4 leading-relaxed">
                CarEdPath NG maintains strict institutional isolation. Every admission fact below is verified directly from official releases of <strong>{admissionReq.institution}</strong> and statutory regulatory councils.
              </div>

              {/* Structured Fact List (Rule 8) */}
              <div className="space-y-2.5 mb-5">
                {verifiedFacts.map((fact, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                        {fact.dataType}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        inst_id: {fact.institutionId}
                      </span>
                    </div>
                    <div className="text-slate-800 font-semibold mb-1">
                      {fact.fact}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center justify-between">
                      <span>Source: {fact.source}</span>
                      <span>Verified: {fact.verifiedDate}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Citation Sources */}
              <div className="space-y-2.5 mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                  Authoritative Publications
                </span>
                {admissionReq.sources.map((src, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">{src.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-200 text-emerald-900">
                        {src.type}
                      </span>
                    </div>
                    {src.url && (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-blue-700 underline truncate block mb-1"
                      >
                        {src.url}
                      </a>
                    )}
                    <div className="text-[10px] text-slate-500">
                      Verified Date: <strong>{src.verifiedDate}</strong>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowSourcesModal(false)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close Verification Info
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
