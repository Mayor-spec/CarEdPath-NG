import React from 'react';
import { motion } from 'motion/react';
import { PRIMARY_CASE_STUDY } from '../data/careerData';

interface SampleRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToMentorAI: (prompt?: string) => void;
}

export const SampleRoadmapModal: React.FC<SampleRoadmapModalProps> = ({
  isOpen,
  onClose,
  onGoToMentorAI
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed inset-0 bg-[#0a192f]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content with smooth slow-motion entry */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 18 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 18 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-10 overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#dc2626] text-[22px]">map</span>
            <div className="flex flex-col">
              <h3 className="font-serif-headline text-[18px] font-bold text-[#0a192f]">
                Example Journey: How CarEdPath NG Works
              </h3>
              <span className="text-[12px] text-slate-500">Sample Student Pathway: Secondary School to Diagnostic Specialist</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex flex-col gap-5">
          {/* Example Journey Notice Banner */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[12px] text-amber-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-600 text-[18px] flex-shrink-0">info</span>
            <span>
              <strong>Example Journey:</strong> This is an illustrative sample pathway demonstrating how a secondary student can navigate UTME cut-offs and tertiary admission in Nigeria.
            </span>
          </div>

          {/* Candidate Card */}
          <div className="p-4 rounded-xl bg-blue-950/5 border border-blue-900/10 flex items-center gap-3.5">
            <img
              src={PRIMARY_CASE_STUDY.avatarUrl}
              alt={PRIMARY_CASE_STUDY.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-[#dc2626]/40"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 self-start">
                Sample Student Pathway
              </span>
              <span className="font-serif-headline text-[17px] font-bold text-[#0a192f] truncate mt-0.5">
                {PRIMARY_CASE_STUDY.name} — {PRIMARY_CASE_STUDY.location}
              </span>
              <span className="text-[12px] text-slate-600">
                {PRIMARY_CASE_STUDY.subRole}
              </span>
            </div>
          </div>

          {/* Detailed Timeline Stages */}
          <div className="flex flex-col gap-4">
            <span className="text-[13px] font-bold text-[#0a192f] uppercase tracking-wider">
              Step-by-Step Trajectory
            </span>

            {/* Stage 1 */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#0a192f] text-white">
                  Stage 1: SS3 Year
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Secondary School</span>
              </div>
              <h4 className="text-[14px] font-bold text-[#0a192f]">WAEC &amp; NECO Credit Locking</h4>
              <p className="text-[12px] text-slate-600 leading-relaxed">
                Focused on 5 core credits: English Language (B3), General Mathematics (B2), Biology (A1), Chemistry (B3), and Physics (C4). Prepared past questions from 2014–2024.
              </p>
            </div>

            {/* Stage 2 - Crucial decision point with Touch of Red */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#dc2626] text-white shadow-xs">
                  Stage 2: UTME Result &amp; Pivot
                </span>
                <span className="text-[11px] text-[#dc2626] font-bold">Crucial Decision Point</span>
              </div>
              <h4 className="text-[14px] font-bold text-[#0a192f]">JAMB Score: 218 (University cut-off was 245)</h4>
              <p className="text-[12px] text-slate-600 leading-relaxed">
                Rather than staying at home for a whole year to re-sit JAMB, Amina accepted an admission offer into an NBTE-accredited Science Laboratory Technology (SLT) National Diploma program.
              </p>
              <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-[11px] text-[#991b1b]">
                💡 <strong>Strategy:</strong> SLT curricula matches 70% of Year 1 &amp; 2 University Medical Lab curricula.
              </div>
            </div>

            {/* Stage 3 */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#1e3a8a] text-white">
                  Stage 3: Direct Entry (DE) Transfer
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Entering 200 Level</span>
              </div>
              <h4 className="text-[14px] font-bold text-[#0a192f]">Secured Upper Credit (CGPA 3.48)</h4>
              <p className="text-[12px] text-slate-600 leading-relaxed">
                Purchased JAMB Direct Entry form and gained direct admission into 200 Level Medical Laboratory Science at the University of Ilorin without repeating 100 Level.
              </p>
            </div>

            {/* Stage 4 */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#0a192f] text-white">
                  Stage 4: Licensure &amp; Clinical Career
                </span>
                <span className="text-[11px] text-[#dc2626] font-bold">Goal Achieved</span>
              </div>
              <h4 className="text-[14px] font-bold text-[#0a192f]">MLSCN Induction &amp; Internship</h4>
              <p className="text-[12px] text-slate-600 leading-relaxed">
                Completed 1-year internship with a federal medical center, licensed by Medical Laboratory Science Council of Nigeria, now earning ₦380,000/month in Lagos diagnostic pathology.
              </p>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex flex-col gap-1.5">
            <span className="text-[12px] font-bold text-[#0a192f]">Estimated Savings:</span>
            <ul className="text-[12px] text-blue-900 list-disc list-inside flex flex-col gap-0.5">
              <li>Avoided 2 wasted gap years waiting for UTME re-takes</li>
              <li>Saved over ₦320,000 in repeat lesson fees &amp; form purchases</li>
              <li>Graduated with both ND credential and Bachelor of Medical Laboratory Science (B.MLS)</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-[13px] font-medium text-slate-600 hover:bg-slate-200 cursor-pointer"
            type="button"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onGoToMentorAI("I saw the Example Journey for Medical Laboratory Science. Can you help me map a similar Direct Entry or backup strategy for my target course?");
            }}
            className="px-4 py-2.5 rounded-xl bg-[#0a192f] text-white text-[13px] font-semibold hover:bg-[#152a4d] cursor-pointer flex items-center gap-1.5 shadow-sm"
            type="button"
          >
            <span>Ask Mentor About This</span>
            <span className="material-symbols-outlined text-[16px]">chat</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
