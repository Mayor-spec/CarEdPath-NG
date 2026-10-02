import React, { useState } from 'react';
import { PassionType, StageType } from '../types';

interface RoadmapGeneratorProps {
  onGoToMentorAI: (query?: string) => void;
  onOpenSampleRoadmap: () => void;
  onOpenIntakeModal?: () => void;
}

export const RoadmapGenerator: React.FC<RoadmapGeneratorProps> = ({
  onGoToMentorAI,
  onOpenSampleRoadmap,
  onOpenIntakeModal
}) => {
  const [selectedStage, setSelectedStage] = useState<StageType>('SS3 (WAEC & NECO Prep)');
  const [selectedPassion, setSelectedPassion] = useState<PassionType>('Tech & Coding');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const stages: { label: StageType; icon: string }[] = [
    { label: 'SS1 (Senior Secondary 1)', icon: 'school' },
    { label: 'SS2 (Senior Secondary 2)', icon: 'auto_stories' },
    { label: 'SS3 (WAEC & NECO Prep)', icon: 'edit_note' },
    { label: 'SS3 Leaver (Awaiting JAMB)', icon: 'schedule' }
  ];

  const passions: PassionType[] = [
    'Medicine & Health',
    'Law & Legal Studies',
    'Business & Accounting',
    'Media & Social Sciences',
    'Tech & Coding',
    'Arts & Humanities',
    'Education & Teaching',
    'Engineering & Environment',
    'Lab & Pure Sciences'
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      const el = document.getElementById('ai-result');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 800);
  };

  const getCustomizedAdvice = () => {
    if (selectedPassion === 'Law & Legal Studies') {
      return {
        target: 'Target 265+ in JAMB (English, Literature-in-English, Government, CRS/IRS or Economics).',
        action: 'Literature-in-English is strictly mandatory. Read prescribed texts early and master legal essay arguments for Post-UTME screening.',
        planB: 'If UTME is between 210–235, switch course to Criminology & Security Studies or enroll in an accredited University Diploma in Law for Direct Entry into 200L LL.B.'
      };
    }
    if (selectedPassion === 'Business & Accounting') {
      return {
        target: 'Target 235+ in JAMB (English, Mathematics, Economics, Financial Accounting / Commerce).',
        action: 'Enroll in ICAN ATSWA classes concurrently or prioritize business math. Check catchment universities like UNILAG, UNIBEN, or OAU.',
        planB: 'National Diploma in Accountancy or Business Admin with Upper Credit guarantees 200L Direct Entry into Federal Universities with ICAN exam exemptions!'
      };
    }
    if (selectedPassion === 'Media & Social Sciences') {
      return {
        target: 'Target 240+ in JAMB (English, Literature-in-English, Government, Economics or CRS/IRS).',
        action: 'Build a published writing portfolio, blog, or podcast. Media departments prioritize applicants with demonstrated communicative talent.',
        planB: 'Accept an ND in Mass Communication at YABATECH, MAPOLY, or Fed Poly Ilaro. A 2-year Upper Credit diploma transfers straight into university Year 2.'
      };
    }
    if (selectedPassion === 'Arts & Humanities') {
      return {
        target: 'Target 220+ in JAMB (English, Literature-in-English, and 2 Arts subjects like History/CRS/Govt).',
        action: 'Maintain strong grades in English and Literature. Explore international creative writing fellowships and editorial internships.',
        planB: 'NCE in English/Literature or ND in Theatre Arts grants direct 200L entry into university English, Linguistics, or Performing Arts.'
      };
    }
    if (selectedPassion === 'Education & Teaching') {
      return {
        target: 'Target 195+ in JAMB (English and 3 teaching subjects aligned with your discipline).',
        action: 'Apply for the Federal Government Teacher Education Bursary (₦150k/year) available to students in public university education faculties.',
        planB: 'NCE at an accredited Federal College of Education provides automatic 200 Level Direct Entry into B.Ed programs with high employment certainty in secondary schools.'
      };
    }
    if (selectedPassion === 'Engineering & Environment') {
      return {
        target: 'Target 235+ in JAMB (English, Mathematics, Physics, Chemistry / Tech Drawing).',
        action: 'Master technical drafting or CAD fundamentals. Explore COREN-accredited institutions like FUTA, UNILAG, ABU, and Covenant.',
        planB: 'ND in Electrical, Mechanical, Civil, or Architectural Technology allows 200L Direct Entry into university B.Eng/B.Tech programs.'
      };
    }
    if (selectedPassion === 'Tech & Coding') {
      return {
        target: 'Target 225+ in JAMB (Maths, Physics, English, Chemistry or Computer Studies).',
        action: 'Concurrently register for the free NITDA / 3MTT Cohort or She Code Africa to gain web and cloud fundamentals before matriculation.',
        planB: 'If UTME score falls between 180-210, apply immediately for Computer Science National Diploma at YABATECH, Kaduna Poly or Offa Poly for Direct Entry into 200L.'
      };
    }
    if (selectedPassion === 'Medicine & Health') {
      return {
        target: 'Target 250+ in JAMB (Biology, Chemistry, Physics, English).',
        action: 'Lock in at least 5 B-grades in WAEC sciences. Explore State of Origin catchment universities (e.g. UNILAG, UI, UNN) where cutoffs are adjusted.',
        planB: 'If cut-off mark is under 240, switch JAMB CAPS course to Medical Laboratory Science, Nursing Science, or Physiology in Year 1.'
      };
    }
    return {
      target: 'Target 205+ in UTME (Biology, Chemistry, Physics/Maths).',
      action: 'Apply to accredited SLT (Science Laboratory Technology) programs with MLSCN or NUC linkage to secure diagnostic hospital placements.',
      planB: 'National Diploma in SLT allows direct transfer to 200 Level B.MLS or Biochemistry, saving you from repeating UTME.'
    };
  };

  const advice = getCustomizedAdvice();

  return (
    <section 
      className="px-4 py-8 sm:py-10 flex flex-col gap-5 bg-slate-50 border-t border-slate-200 scroll-mt-20" 
      id="builder"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-5">
        {/* Section Header with Touch of Red */}
        <div className="flex flex-col gap-1.5 text-center items-center">
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#dc2626] text-white uppercase tracking-widest shadow-xs">
            Instant Career Generator
          </span>
          <h2 className="font-serif-headline text-[24px] sm:text-[30px] font-bold text-[#0a192f]">
            Generate Your Custom 3-Year Plan
          </h2>
          <p className="text-[14px] text-slate-600 max-w-md">
            Tell us where you are today. We will calibrate a realistic trajectory around Nigerian tertiary realities.
          </p>
        </div>

        {/* Generator Form Box */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white shadow-md border border-slate-200 flex flex-col gap-5">
          {onOpenIntakeModal && (
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-red-50 to-orange-50/50 border border-red-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#dc2626] text-[22px]">contact_support</span>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-[#0a192f]">
                    Want a precise Nigerian roadmap calibrated to your exact subjects &amp; constraints?
                  </span>
                  <span className="text-[12px] text-slate-600">
                    Take the 5-step conversational stepper: "Tell Us About You"
                  </span>
                </div>
              </div>
              <button
                id="launch-intake-flow-btn"
                type="button"
                onClick={onOpenIntakeModal}
                className="px-4 py-2 rounded-xl bg-[#dc2626] text-white text-[12px] font-semibold flex items-center gap-1.5 shadow-sm hover:bg-[#b91c1c] active:scale-95 transition-all cursor-pointer whitespace-nowrap self-stretch sm:self-auto justify-center"
              >
                <span>Start 5-Step Intake</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          )}

          {/* Question 1: Stage */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[13px] font-bold text-[#0a192f]">
              Step 1: What stage are you in right now?
            </label>
            <div className="grid grid-cols-2 gap-2.5" id="stage-selector">
              {stages.map(st => {
                const isSelected = selectedStage === st.label;
                return (
                  <button
                    key={st.label}
                    id={`stage-btn-${st.label.replace(/\s+/g, '-').toLowerCase()}`}
                    className={`stage-btn p-3 rounded-xl text-left text-[12px] font-semibold transition-all active:scale-95 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#0a192f] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    onClick={() => setSelectedStage(st.label)}
                    type="button"
                  >
                    <span>{st.label}</span>
                    <span 
                      className={`material-symbols-outlined text-[16px] ${
                        isSelected ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {isSelected ? 'done' : st.icon}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Passion */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[13px] font-bold text-[#0a192f]">
              Step 2: What is your primary passion?
            </label>
            <div className="flex flex-wrap gap-2" id="passion-selector">
              {passions.map(p => {
                const isSelected = selectedPassion === p;
                return (
                  <button
                    key={p}
                    id={`passion-btn-${p.replace(/\s+/g, '-').toLowerCase()}`}
                    className={`passion-btn px-3.5 py-2 rounded-xl text-[12px] font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0a192f] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    onClick={() => setSelectedPassion(p)}
                    type="button"
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generator Trigger Button - Touch of Red */}
          <button
            id="generate-btn"
            disabled={isGenerating}
            onClick={handleGenerate}
            className="w-full py-3.5 px-4 rounded-xl bg-[#dc2626] text-white font-semibold text-[14px] flex items-center justify-center gap-2 shadow-md shadow-red-950/20 hover:bg-[#b91c1c] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-75"
            type="button"
          >
            <span className={`material-symbols-outlined text-[20px] ${isGenerating ? 'animate-spin' : ''}`}>
              {isGenerating ? 'refresh' : 'auto_awesome'}
            </span>
            <span id="generate-btn-text">
              {isGenerating ? 'Calibrating Nigerian Roadmaps...' : 'Generate My 3-Year Plan'}
            </span>
          </button>

          {/* Generated Result Container */}
          {hasGenerated && (
            <div 
              className="p-4 sm:p-5 rounded-xl bg-blue-950/5 border border-blue-900/15 flex flex-col gap-3.5 animate-in fade-in duration-300" 
              id="ai-result"
            >
              <div className="flex items-center gap-2 text-[#0a192f] text-[13px] font-bold">
                <span className="material-symbols-outlined text-[#dc2626] text-[20px]">check_circle</span>
                <span>Success! Your 3-Year Plan for {selectedPassion} ({selectedStage}):</span>
              </div>

              <div className="flex flex-col gap-2.5 text-[13px] text-slate-800 leading-relaxed">
                <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <strong className="text-[#0a192f]">Immediate Target:</strong> {advice.target}
                </div>
                <div className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <strong className="text-[#0a192f]">Recommended Next Action:</strong> {advice.action}
                </div>
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-[#991b1b]">
                  <strong>Realistic Plan B (Safety Net):</strong> {advice.planB}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1 flex-wrap">
                {onOpenIntakeModal && (
                  <button
                    id="open-full-intake-roadmap-btn"
                    onClick={onOpenIntakeModal}
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#dc2626] text-white text-[12px] font-bold hover:bg-[#b91c1c] transition-colors cursor-pointer shadow-xs"
                    type="button"
                  >
                    <span>Explore Complete Career Timeline</span>
                    <span className="material-symbols-outlined text-[16px]">alt_route</span>
                  </button>
                )}
                <button
                  id="discuss-mentor-btn"
                  onClick={() => onGoToMentorAI(`I am currently at the ${selectedStage} stage and interested in ${selectedPassion}. What specific federal universities and cut-off pivot options do you recommend for me?`)}
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#0a192f] text-white text-[12px] font-semibold hover:bg-[#152a4d] transition-colors cursor-pointer"
                  type="button"
                >
                  <span>Discuss with CarEdPath NG Mentor AI</span>
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                </button>
                <button
                  id="view-full-sample-btn"
                  onClick={onOpenSampleRoadmap}
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white text-[#0a192f] border border-slate-200 text-[12px] font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                  type="button"
                >
                  <span>View Example Journey Blueprint</span>
                  <span className="material-symbols-outlined text-[16px]">map</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
