import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SubmitContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'opportunity' | 'story';
}

export const SubmitContributionModal: React.FC<SubmitContributionModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'opportunity'
}) => {
  const [submissionType, setSubmissionType] = useState<'opportunity' | 'story'>(defaultType);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form states for Opportunity
  const [oppTitle, setOppTitle] = useState('');
  const [oppOrg, setOppOrg] = useState('');
  const [oppCategory, setOppCategory] = useState('Tertiary Admission Scholarships');
  const [oppEligibility, setOppEligibility] = useState('');
  const [oppCoverage, setOppCoverage] = useState('');
  const [oppUrl, setOppUrl] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');

  // Form states for Mentor Story
  const [storyName, setStoryName] = useState('');
  const [storyRole, setStoryRole] = useState('');
  const [storyLocation, setStoryLocation] = useState('');
  const [storyCluster, setStoryCluster] = useState('Tech');
  const [storyHurdle, setStoryHurdle] = useState('');
  const [storyRoute, setStoryRoute] = useState('');
  const [storyAdvice, setStoryAdvice] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0a192f]/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-10 overflow-hidden my-6"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#dc2626] text-[22px]">
              handshake
            </span>
            <div className="flex flex-col">
              <h3 className="font-serif-headline text-[17px] sm:text-[18px] font-bold text-[#0a192f]">
                Community Contribution
              </h3>
              <span className="text-[11.5px] text-slate-500">
                Help secondary-school students discover verified scholarships, competitions &amp; educational resources
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[28px]">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <h4 className="text-[18px] font-bold text-[#0a192f]">
                Thank You for Your Contribution!
              </h4>
              <p className="text-[13px] text-slate-600 max-w-sm">
                Your suggestion has been received for editorial verification. We confirm all criteria, portals, and past questions before presenting resources to students.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Contribution Type Toggle */}
              <div className="flex rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setSubmissionType('opportunity')}
                  className={`flex-1 py-2 text-[12px] font-semibold rounded-lg transition-all cursor-pointer ${
                    submissionType === 'opportunity'
                      ? 'bg-white text-[#0a192f] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Submit an Opportunity
                </button>
                <button
                  type="button"
                  onClick={() => setSubmissionType('story')}
                  className={`flex-1 py-2 text-[12px] font-semibold rounded-lg transition-all cursor-pointer ${
                    submissionType === 'story'
                      ? 'bg-white text-[#0a192f] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Suggest Sample Pathway
                </button>
              </div>

              {submissionType === 'opportunity' ? (
                <>
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                      Program / Scholarship Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={oppTitle}
                      onChange={(e) => setOppTitle(e.target.value)}
                      placeholder="e.g. Chevron JV Tertiary National Merit Award"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[13px] focus:outline-none focus:border-[#0a192f]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                        Sponsoring Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={oppOrg}
                        onChange={(e) => setOppOrg(e.target.value)}
                        placeholder="e.g. Chevron Nigeria / NNPC"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[13px] focus:outline-none focus:border-[#0a192f]"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                        Category
                      </label>
                      <select
                        value={oppCategory}
                        onChange={(e) => setOppCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[13px] focus:outline-none focus:border-[#0a192f] bg-white"
                      >
                        <option value="Tertiary Admission Scholarships">Tertiary Admission Scholarships</option>
                        <option value="Secondary School Competitions">Secondary School Competitions</option>
                        <option value="Free Tech Bootcamps">Free Tech Bootcamps</option>
                        <option value="Mentorship Communities">Mentorship Communities</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                      Eligibility (Who qualifies?) *
                    </label>
                    <input
                      type="text"
                      required
                      value={oppEligibility}
                      onChange={(e) => setOppEligibility(e.target.value)}
                      placeholder="e.g. Secondary school leavers, SS3 students, or incoming tertiary science students"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[13px] focus:outline-none focus:border-[#0a192f]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                      Award &amp; Coverage (What do recipients get?) *
                    </label>
                    <input
                      type="text"
                      required
                      value={oppCoverage}
                      onChange={(e) => setOppCoverage(e.target.value)}
                      placeholder="e.g. ₦200,000 annually + Free laptop"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[13px] focus:outline-none focus:border-[#0a192f]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                      Official Portal Link *
                    </label>
                    <input
                      type="url"
                      required
                      value={oppUrl}
                      onChange={(e) => setOppUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[13px] focus:outline-none focus:border-[#0a192f]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                      Your Email (for verification only)
                    </label>
                    <input
                      type="email"
                      value={submitterEmail}
                      onChange={(e) => setSubmitterEmail(e.target.value)}
                      placeholder="youremail@example.com"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[13px] focus:outline-none focus:border-[#0a192f]"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                        Pathway / Archetype Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={storyName}
                        onChange={(e) => setStoryName(e.target.value)}
                        placeholder="e.g. Sample Student: SS3 to Software Engineering"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[13px] focus:outline-none focus:border-[#0a192f]"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                        Target Career / Focus Field *
                      </label>
                      <input
                        type="text"
                        required
                        value={storyRole}
                        onChange={(e) => setStoryRole(e.target.value)}
                        placeholder="e.g. Cloud Security Engineer"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[13px] focus:outline-none focus:border-[#0a192f]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                        Origin &amp; University Destination *
                      </label>
                      <input
                        type="text"
                        required
                        value={storyLocation}
                        onChange={(e) => setStoryLocation(e.target.value)}
                        placeholder="e.g. Kano → ABU Zaria"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[13px] focus:outline-none focus:border-[#0a192f]"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                        Career Cluster
                      </label>
                      <select
                        value={storyCluster}
                        onChange={(e) => setStoryCluster(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[13px] focus:outline-none focus:border-[#0a192f] bg-white"
                      >
                        <option value="Health Sciences">Health Sciences</option>
                        <option value="Tech">Tech &amp; Digital</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Creative STEM">Creative STEM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                      Secondary School Hurdle / Key Challenge *
                    </label>
                    <input
                      type="text"
                      required
                      value={storyHurdle}
                      onChange={(e) => setStoryHurdle(e.target.value)}
                      placeholder="e.g. Low initial UTME score, switched from Commercial to Science, Post-UTME cutoff"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[13px] focus:outline-none focus:border-[#0a192f]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                      Illustrative Pathway Transition (3-4 Sentences) *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={storyRoute}
                      onChange={(e) => setStoryRoute(e.target.value)}
                      placeholder="1. Secondary school background and subject focus. 2. What exam or admission strategy helped? 3. Which tertiary course/milestone is the target?"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[12.5px] focus:outline-none focus:border-[#0a192f]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                      Recommended Practical Tip for Secondary Students *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={storyAdvice}
                      onChange={(e) => setStoryAdvice(e.target.value)}
                      placeholder="A concrete, practical tip for students preparing for WAEC, JAMB, or course selection..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-[12.5px] focus:outline-none focus:border-[#0a192f]"
                    />
                  </div>
                </>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-[12px] font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#dc2626] text-white hover:bg-[#b91c1c] text-[12px] font-semibold transition-all shadow-sm cursor-pointer"
                >
                  Submit for Editorial Review
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
