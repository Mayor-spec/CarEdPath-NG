import React, { useState } from 'react';
import { NIGERIAN_CATCHMENT_GUIDE } from '../data/careerData';
import { UserIntakeProfile } from '../types';

interface ProfileViewProps {
  onGoToMentorAI: (query?: string) => void;
  onOpenPivotModal: () => void;
  onOpenSampleRoadmap: () => void;
  userProfile?: UserIntakeProfile;
  onOpenIntakeModal?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onGoToMentorAI,
  onOpenPivotModal,
  onOpenSampleRoadmap,
  userProfile,
  onOpenIntakeModal
}) => {
  const menteeName = 'Secondary School Scholar';
  const currentLevel = userProfile?.currentStage || 'SS3 (WAEC & JAMB Preparation)';
  const targetDiscipline = userProfile?.careerAmbition || 'Medical Laboratory Science';
  const [targetScore, setTargetScore] = useState(240);
  const [stateOfOrigin, setStateOfOrigin] = useState('Kwara');

  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    step1: true,
    step2: true,
    step3: false,
    step4: false,
    step5: false
  });

  const availableStates = Object.keys(NIGERIAN_CATCHMENT_GUIDE);
  const catchmentInstitutions = NIGERIAN_CATCHMENT_GUIDE[stateOfOrigin] || ['Federal University in Catchment Area'];

  const toggleChecklistItem = (key: string) => {
    setChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / Object.keys(checklist).length) * 100);

  return (
    <div className="flex flex-col gap-5 px-4 py-8 max-w-4xl mx-auto w-full">
      {/* Profile Header Card */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white shadow-sm border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#0a192f] text-white flex items-center justify-center font-bold text-[22px] ring-4 ring-slate-100 shadow-md flex-shrink-0">
            <span className="material-symbols-outlined text-[28px] text-white">person</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="font-serif-headline text-[20px] sm:text-[24px] font-bold text-[#0a192f]">
                {menteeName}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold uppercase tracking-wider">
                Secondary Student Profile
              </span>
            </div>
            <p className="text-[13px] text-slate-600">
              {currentLevel} • Target: <strong className="text-[#0a192f]">{targetDiscipline}</strong>
            </p>
            <span className="text-[12px] text-slate-500 flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[14px] text-[#dc2626]">location_on</span>
              <span>State of Origin: <strong>{stateOfOrigin} State</strong></span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          <button
            onClick={onOpenSampleRoadmap}
            className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-800 text-[12px] font-semibold hover:bg-slate-200 cursor-pointer"
            type="button"
          >
            Sample Roadmap
          </button>
          <button
            onClick={() => onGoToMentorAI(`Hi Adaeze, I am a Nigerian secondary-school student from ${stateOfOrigin} State targeting ${targetDiscipline} with a target UTME score of ${targetScore}. What is your personalized advice for my admission & catchment strategy?`)}
            className="px-3.5 py-2 rounded-xl bg-[#0a192f] text-white text-[12px] font-semibold hover:bg-[#152a4d] cursor-pointer shadow-sm flex items-center gap-1.5"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>Ask Mentor</span>
          </button>
        </div>
      </div>

      {/* Intake Profile Status Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c85a32] text-[20px]">explore</span>
            <h3 className="font-serif-headline text-[17px] font-bold text-[#0a192f]">
              Personalized Intake Profile
            </h3>
          </div>
          {onOpenIntakeModal && (
            <button
              id="profile-reopen-intake-btn"
              onClick={onOpenIntakeModal}
              className="text-[12px] font-bold text-[#dc2626] hover:underline flex items-center gap-1 cursor-pointer"
              type="button"
            >
              <span>{userProfile?.generatedRoadmap ? 'Update Intake Answers' : 'Take 5-Step Intake'}</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5 text-[12px]">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Current Stage</span>
            <span className="text-slate-800 font-semibold mt-0.5 truncate">
              {userProfile?.currentStage || 'SS3 / Writing WAEC'}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Target Ambition</span>
            <span className="text-[#0a192f] font-semibold mt-0.5 truncate">
              {userProfile?.careerAmbition || 'Medical Laboratory Science'}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Target Institution</span>
            <span className="text-emerald-900 font-semibold mt-0.5 truncate" title={userProfile?.targetInstitution || 'University of Ilorin'}>
              {userProfile?.targetInstitution || 'University of Ilorin'}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Core Subjects</span>
            <span className="text-slate-800 font-semibold mt-0.5 truncate">
              {userProfile?.favoriteSubjects && userProfile.favoriteSubjects.length > 0
                ? userProfile.favoriteSubjects.join(', ')
                : 'Bio, Chem, Phys, Maths'}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Study Preference</span>
            <span className="text-slate-800 font-semibold mt-0.5 truncate">
              {userProfile?.studyPreference || 'Federal or State University'}
            </span>
          </div>
        </div>

        {userProfile?.realWorldConstraint && (
          <div className="p-2.5 rounded-xl bg-[#fdf6f3] border border-[#c85a32]/20 text-[12px] text-[#8a3314] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#c85a32] flex-shrink-0">info</span>
            <span>
              <strong>Primary Reality Check:</strong> {userProfile.realWorldConstraint}
            </span>
          </div>
        )}
      </div>

      {/* Target Progress Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-2">
        <div className="flex items-center justify-between text-[13px]">
          <span className="font-bold text-[#0a192f]">90-Day Admission Readiness Score</span>
          <span className="font-bold text-[#dc2626]">{progressPercent}% Completed</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#0a192f] via-[#1e3a8a] to-[#dc2626] transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* State Catchment & Target Planner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Catchment University Matcher */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#dc2626] text-[20px]">account_balance</span>
            <h3 className="font-serif-headline text-[17px] font-bold text-[#0a192f]">
              Catchment Area Institutions
            </h3>
          </div>
          <p className="text-[12px] text-slate-600 leading-relaxed">
            Select your State of Origin to see universities where you receive lower cut-off requirements under Nigerian federal admission quotas:
          </p>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Change State of Origin:
            </label>
            <select
              value={stateOfOrigin}
              onChange={(e) => setStateOfOrigin(e.target.value)}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[13px] text-slate-900 font-medium"
            >
              {availableStates.map(st => (
                <option key={st} value={st}>{st} State</option>
              ))}
            </select>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-950/5 border border-blue-900/10 flex flex-col gap-1.5 mt-1">
            <span className="text-[11px] font-bold text-[#0a192f] uppercase tracking-wider">
              Your State's Catchment Institutions:
            </span>
            <div className="flex flex-col gap-1">
              {catchmentInstitutions.map((inst, i) => (
                <div key={i} className="flex items-center gap-2 text-[12px] text-slate-800">
                  <span className="material-symbols-outlined text-[15px] text-[#dc2626]">verified</span>
                  <span>{inst}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-1 italic">
              💡 Candidates from {stateOfOrigin} State often gain admission with 15–25 points lower than national merit list here.
            </p>
          </div>
        </div>

        {/* Goal Calibration Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0a192f] text-[20px]">tune</span>
            <h3 className="font-serif-headline text-[17px] font-bold text-[#0a192f]">
              My UTME Target &amp; Fallback
            </h3>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-slate-600">Target UTME Score:</span>
              <strong className="text-[#0a192f] text-[16px]">{targetScore} / 400</strong>
            </div>
            <input
              type="range"
              min="180"
              max="320"
              step="5"
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              className="accent-[#dc2626] cursor-pointer"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 flex flex-col gap-1 text-[12px]">
            <span className="font-bold text-[#0a192f]">Calibrated Recommendation:</span>
            <p className="text-slate-600 leading-relaxed">
              At <strong>{targetScore}</strong>, you have high probability for {targetDiscipline} within {stateOfOrigin}'s catchment institutions. If your score drops under 220, activate your pre-configured Direct Entry polytechnic backup!
            </p>
          </div>

          <button
            onClick={onOpenPivotModal}
            className="w-full py-2.5 rounded-xl bg-red-50 text-[#b91c1c] border border-red-200 text-[12px] font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-auto"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">alt_route</span>
            <span>Simulate JAMB Score Pivots</span>
          </button>
        </div>
      </div>

      {/* 90-Day Action Checklist */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#dc2626] text-[22px]">checklist</span>
            <h3 className="font-serif-headline text-[18px] font-bold text-[#0a192f]">
              My 90-Day Tertiary Milestone Tracker
            </h3>
          </div>
          <span className="text-[12px] font-bold text-slate-500">
            {completedCount} / 5 Done
          </span>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          {[
            { key: 'step1', title: 'Lock 5 WAEC/NECO science credits in one sitting (Eng, Math, Bio, Chem, Phys)' },
            { key: 'step2', title: 'Verify JAMB brochure four-subject combination before registration' },
            { key: 'step3', title: 'Identify 2 accredited polytechnics offering SLT or Computer Science as Plan B' },
            { key: 'step4', title: 'Submit application for 3MTT, She Code Africa, or MTN scholarship alert' },
            { key: 'step5', title: 'Simulate score on JAMB Cut-Off Pivot Tool and discuss with AI Mentor' }
          ].map(item => (
            <label
              key={item.key}
              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              onClick={() => toggleChecklistItem(item.key)}
            >
              <input
                type="checkbox"
                checked={checklist[item.key]}
                onChange={() => {}}
                className="w-4 h-4 rounded text-[#0a192f] accent-[#0a192f] mt-0.5 cursor-pointer"
              />
              <span className={`text-[13px] leading-relaxed ${checklist[item.key] ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                {item.title}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
