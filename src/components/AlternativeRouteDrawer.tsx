import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ALTERNATIVE_SCENARIOS, AlternativeScenario } from '../data/alternativeRoutesData';

interface AlternativeRouteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeScenarioId: string | null;
  onSelectScenario: (scenarioId: string | null) => void;
  initialFocusedScenario?: string | null;
}

export const AlternativeRouteDrawer: React.FC<AlternativeRouteDrawerProps> = ({
  isOpen,
  onClose,
  activeScenarioId,
  onSelectScenario,
  initialFocusedScenario
}) => {
  const scenariosList = Object.values(ALTERNATIVE_SCENARIOS);
  const [expandedScenarioId, setExpandedScenarioId] = useState<string | null>(
    initialFocusedScenario || activeScenarioId || 'low-utme'
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end" id="alternative-route-drawer-root">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-[#0a192f]/70 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Drawer Sheet from Right */}
      <motion.div
        initial={{ x: '100%', opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0.5 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col z-10 overflow-hidden text-slate-900 border-l border-slate-200"
      >
        {/* Top Nigerian Terracotta & Navy Trim */}
        <div className="w-full h-1.5 bg-gradient-to-r from-[#c85a32] via-[#ea580c] to-[#0a192f]" />

        {/* Header Bar */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0a192f] text-white flex items-center justify-center shadow-xs flex-shrink-0">
              <span className="material-symbols-outlined text-[22px] text-red-400">alt_route</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-500 font-medium">4 Realistic Nigerian Pivot Pathways</span>
              <h3 className="font-serif-headline text-[18px] sm:text-[20px] font-bold text-[#0a192f] leading-tight mt-0.5">
                "What If?" Career Pivot Pathways
              </h3>
            </div>
          </div>

          <button
            id="close-alt-drawer-btn"
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close alternative route drawer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Motivational Nigerian Reality Sub-banner */}
        <div className="px-5 sm:px-6 py-3 bg-[#fdf6f3] border-b border-orange-200/60 flex items-start gap-2.5 text-[12px] text-[#7c2d12]">
          <span className="material-symbols-outlined text-[#c85a32] text-[18px] flex-shrink-0 mt-0.5">
            lightbulb
          </span>
          <p className="leading-relaxed">
            <strong>In Nigeria, the direct road is rarely the only road.</strong> If cut-off marks, finances, or subject grades become high friction points, sprout a verified alternate branch. You reach the exact same professional destination without losing years at home.
          </p>
        </div>

        {/* Scrollable Scenario Cards */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4">
          {activeScenarioId && (
            <div className="p-3.5 rounded-xl bg-orange-50 border border-orange-300 flex items-center justify-between gap-3 text-[12px]">
              <div className="flex items-center gap-2 text-[#9c3e1e] font-semibold">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>An Alternate Path is currently active on your roadmap</span>
              </div>
              <button
                type="button"
                id="reset-to-standard-route-btn"
                onClick={() => {
                  onSelectScenario(null);
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-[11px] cursor-pointer shadow-2xs transition-colors"
              >
                Reset to Standard Route
              </button>
            </div>
          )}

          {scenariosList.map((scenario) => {
            const isExpanded = expandedScenarioId === scenario.id;
            const isActivated = activeScenarioId === scenario.id;

            return (
              <div
                key={scenario.id}
                id={`scenario-card-${scenario.id}`}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isActivated
                    ? 'border-[#c85a32] ring-2 ring-orange-200 shadow-md bg-white'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Scenario Card Header / Accordion Trigger */}
                <div
                  className={`p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer transition-colors ${
                    isActivated ? 'bg-orange-50/50' : 'hover:bg-slate-50/70'
                  }`}
                  onClick={() => setExpandedScenarioId(isExpanded ? null : scenario.id)}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isActivated
                          ? 'bg-[#c85a32] text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {scenario.icon}
                      </span>
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          {scenario.shortLabel}
                        </span>
                        {isActivated && (
                          <span className="px-2 py-0.5 rounded-full bg-[#c85a32] text-white text-[10px] font-bold uppercase tracking-wide">
                            Alternate Path Activated
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif-headline text-[15px] sm:text-[16px] font-bold text-[#0a192f] mt-0.5 leading-snug">
                        {scenario.scenarioQuestion}
                      </h4>
                      <p className="text-[12px] text-slate-600 mt-1 line-clamp-2">
                        {scenario.coreSprout}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 flex-shrink-0 mt-1"
                    aria-label="Expand scenario details"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                </div>

                {/* Expanded Detailed Alternate Path Specs */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-100 p-4 sm:p-5 flex flex-col gap-4 bg-slate-50/50"
                    >
                      {/* Branch Title & Description */}
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 flex flex-col gap-1.5 shadow-2xs">
                        <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#c85a32]">
                          Accredited Alternative Branch
                        </span>
                        <h5 className="font-serif-headline text-[16px] font-bold text-[#0a192f] leading-tight">
                          {scenario.branchTitle}
                        </h5>
                        <p className="text-[12.5px] text-slate-600 leading-relaxed">
                          {scenario.description}
                        </p>
                      </div>

                      {/* 3 Step Trajectory Preview */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                          How This Alternate Branch Unfolds:
                        </span>
                        <div className="flex flex-col gap-2">
                          {scenario.pathwaySteps.map((step, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-start gap-3"
                            >
                              <div className="w-6 h-6 rounded-full bg-[#0a192f] text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                                {idx + 1}
                              </div>
                              <div className="flex flex-col min-w-0">
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                  <span className="text-[13px] font-bold text-[#0a192f]">
                                    {step.stepTitle}
                                  </span>
                                  <span className="text-[10px] font-semibold text-orange-800 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-md">
                                    {step.duration}
                                  </span>
                                </div>
                                <p className="text-[12px] text-slate-600 mt-0.5 leading-relaxed">
                                  {step.details}
                                </p>
                                <span className="text-[11px] text-slate-500 font-medium mt-1">
                                  🏛 <strong>Where to apply:</strong> {step.institutionExamples}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Financial Comparison & Upside */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="p-3 rounded-xl bg-red-50/80 border border-red-200/80 flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-[#991b1b] uppercase tracking-wider">
                            Cost of Waiting at Home (Standard)
                          </span>
                          <span className="text-[12px] text-slate-800 leading-snug">
                            {scenario.costComparison.standardCost}
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                            Alternate Financial Profile
                          </span>
                          <span className="text-[12px] text-slate-800 font-semibold leading-snug">
                            {scenario.costComparison.alternateCost}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 text-[12px] text-blue-950">
                        <strong>Financial Advantage: </strong>
                        {scenario.costComparison.financialUpside}
                      </div>

                      {/* Direct Entry Bridge Mechanism */}
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-[#0a192f]">
                          <span className="material-symbols-outlined text-[18px] text-[#c85a32]">
                            compare_arrows
                          </span>
                          <span className="text-[11px] font-bold uppercase tracking-wider">
                            {scenario.directEntryBridge.title}
                          </span>
                        </div>
                        <p className="text-[12px] text-slate-700">
                          <strong>Portal &amp; Timing: </strong>
                          {scenario.directEntryBridge.mechanism}
                        </p>
                        <p className="text-[11.5px] text-slate-600">
                          <strong>Benchmark: </strong>
                          {scenario.directEntryBridge.requirements}
                        </p>
                      </div>

                      {/* Insider Advice */}
                      <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-[12px] text-amber-950 flex items-start gap-2">
                        <span className="material-symbols-outlined text-amber-700 text-[18px] flex-shrink-0 mt-0.5">
                          tips_and_updates
                        </span>
                        <div className="leading-snug">
                          <strong>Nigerian Counselor Secret: </strong>
                          {scenario.insiderSecret}
                        </div>
                      </div>

                      {/* Activation Action Button */}
                      <div className="pt-2 flex items-center gap-2">
                        <button
                          type="button"
                          id={`activate-scenario-btn-${scenario.id}`}
                          onClick={() => {
                            onSelectScenario(scenario.id);
                            onClose();
                          }}
                          className={`flex-1 py-3 px-4 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer ${
                            isActivated
                              ? 'bg-[#0a192f] text-white hover:bg-[#132644]'
                              : 'bg-[#c85a32] text-white hover:bg-[#b04b26]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isActivated ? 'check' : 'fork_right'}
                          </span>
                          <span>
                            {isActivated
                              ? 'Alternate Path Active (View on Roadmap)'
                              : 'Sprout This Alternate Branch on My Roadmap'}
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-[12px] text-slate-500">
          <span>You can switch between the standard and alternate branches at any time.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-semibold text-[12px] hover:bg-slate-300 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
