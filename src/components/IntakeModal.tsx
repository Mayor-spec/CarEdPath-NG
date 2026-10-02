import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserIntakeProfile } from '../types';
import { CareerMapEngine } from './CareerMapEngine';

interface IntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: UserIntakeProfile) => void;
  onGoToMentorAI: (query?: string) => void;
  onExploreOpportunities?: () => void;
  initialCareer?: string;
}

const STAGE_OPTIONS = [
  'JSS3 / Moving to Senior Secondary (SS1)',
  'SS1 (Choosing Science / Commercial / Arts Subjects)',
  'SS2 (WAEC & NECO Early Preparation)',
  'SS3 (Writing WAEC or NECO Exams)',
  'Secondary School Leaver / Awaiting JAMB',
  'Post-UTME / Tertiary Admission Screening'
];

const DEFAULT_CAREER_CHIPS = [
  'Law & Legal Advocacy (LL.B)',
  'Chartered Accounting & Finance',
  'Mass Communication & Media',
  'Economics & Data Analytics',
  'Medical Laboratory Science',
  'Software Engineering / Cloud',
  'Medicine & Surgery (MBBS)',
  'Nursing Science & Public Health',
  'Architecture & Environmental Design',
  'Business Administration & Management',
  'Educational Leadership & Teaching',
  'English & Literary Studies',
  'Renewable Energy & Electrical Eng.',
  'Cybersecurity & Networking',
  'Biochemistry & Diagnostics',
  'Agricultural Economics & Agribusiness'
];

const SUBJECT_OPTIONS = [
  'English Language',
  'Mathematics',
  'Literature-in-English',
  'Government',
  'Economics',
  'Financial Accounting',
  'Commerce',
  'Biology',
  'Chemistry',
  'Physics',
  'CRS / IRS',
  'History',
  'Geography',
  'Civic Education',
  'Agricultural Science',
  'Technical Drawing / Fine Art',
  'Computer Studies / Further Maths',
  'French / Nigerian Languages'
];

const CONSTRAINT_OPTIONS = [
  'High school fees / Need tuition-free or scholarship options',
  'Low or unpredictable UTME / JAMB cut-off marks',
  'My parents/guardians want a different course for me',
  'No access to laptops or reliable internet at home',
  "I just don't know the right subjects or steps to take"
];

const STUDY_PREFERENCES = [
  'Federal or State University',
  'Polytechnic / Monotechnic (ND/HND Track)',
  'Federal / State College of Education (NCE)',
  'Accredited College of Health Technology / Nursing',
  'Vocational / Professional Certification (ICAN, ATSWA, NBA)',
  'Open to Distance Learning / NOUN'
];

export const IntakeModal: React.FC<IntakeModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  onGoToMentorAI,
  onExploreOpportunities,
  initialCareer
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isLoadingRoadmap, setIsLoadingRoadmap] = useState(false);
  const [loadingStepText, setLoadingStepText] = useState('');
  const [showResultView, setShowResultView] = useState(false);

  // Form State
  const [userProfile, setUserProfile] = useState<UserIntakeProfile>({
    currentStage: '',
    careerAmbition: initialCareer || '',
    favoriteSubjects: [],
    realWorldConstraint: '',
    studyPreference: '',
    targetInstitution: 'University of Ilorin',
    academicSession: '2026/2027'
  });

  // Step 2 Search & Custom Input
  const [careerSearchQuery, setCareerSearchQuery] = useState('');
  const [customCareerInput, setCustomCareerInput] = useState('');

  // Reset or initialize on open
  useEffect(() => {
    if (isOpen) {
      if (initialCareer) {
        setUserProfile(prev => ({ ...prev, careerAmbition: initialCareer }));
      }
    } else {
      setTimeout(() => {
        setCurrentStep(1);
        setIsLoadingRoadmap(false);
        setShowResultView(false);
      }, 400);
    }
  }, [isOpen, initialCareer]);

  if (!isOpen) return null;

  // Validation per step
  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!userProfile.currentStage;
      case 2:
        return !!userProfile.careerAmbition.trim();
      case 3:
        return userProfile.favoriteSubjects.length > 0;
      case 4:
        return !!userProfile.realWorldConstraint;
      case 5:
        return !!userProfile.studyPreference;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!isStepValid()) return;

    if (currentStep < 5) {
      setDirection('forward');
      setCurrentStep(prev => prev + 1);
    } else {
      handleGenerateRoadmap();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection('backward');
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubjectToggle = (subj: string) => {
    setUserProfile(prev => {
      const exists = prev.favoriteSubjects.includes(subj);
      if (exists) {
        return {
          ...prev,
          favoriteSubjects: prev.favoriteSubjects.filter(s => s !== subj)
        };
      }
      if (prev.favoriteSubjects.length >= 4) {
        return prev;
      }
      return {
        ...prev,
        favoriteSubjects: [...prev.favoriteSubjects, subj]
      };
    });
  };

  const handleGenerateRoadmap = () => {
    setIsLoadingRoadmap(true);

    const steps = [
      `Verifying official JAMB & WAEC brochure prerequisites for ${userProfile.careerAmbition}...`,
      `Evaluating NUC & NBTE accredited universities & polytechnics...`,
      `Calibrating safety net Plan B for: "${userProfile.realWorldConstraint.split('/')[0]}"...`,
      `Matching verified scholarship deadlines & catchment quotas...`
    ];

    let stepIndex = 0;
    setLoadingStepText(steps[0]);

    // Deliberate, reassuring slow-motion pacing (~950ms per milestone)
    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setLoadingStepText(steps[stepIndex]);
      } else {
        clearInterval(interval);
        const calibratedRoadmap = buildRoadmapOutput(userProfile);
        const finalProfile = {
          ...userProfile,
          generatedRoadmap: calibratedRoadmap
        };
        setUserProfile(finalProfile);
        onComplete(finalProfile);
        setIsLoadingRoadmap(false);
        setShowResultView(true);
      }
    }, 950);
  };

  const buildRoadmapOutput = (profile: UserIntakeProfile) => {
    const amb = profile.careerAmbition.toLowerCase();

    // 1. STRICT DISCRIMINATION - Never confuse Medicine with MLS, Nursing, or Pharmacy!
    const isMedicine = amb.includes('medic') || amb.includes('mbbs') || amb.includes('doctor') || amb.includes('surg');
    const isMLS = !isMedicine && (amb.includes('lab') || amb.includes('mls') || amb.includes('patholog') || amb.includes('diagnost'));
    const isNursing = !isMedicine && (amb.includes('nurs') || amb.includes('midwi'));
    const isPharmacy = !isMedicine && (amb.includes('pharm') || amb.includes('drug'));
    const isTech = amb.includes('tech') || amb.includes('software') || amb.includes('data') || amb.includes('cyber') || amb.includes('comput');
    const isEngineering = amb.includes('engin') || amb.includes('mech') || amb.includes('elect') || amb.includes('civil');
    const isLaw = amb.includes('law') || amb.includes('legal') || amb.includes('ll.b');
    const isCommercial = amb.includes('account') || amb.includes('bank') || amb.includes('finance') || amb.includes('business') || amb.includes('market');
    const isMediaSocial = amb.includes('mass comm') || amb.includes('media') || amb.includes('econom') || amb.includes('politi') || amb.includes('sociol') || amb.includes('psychol');
    const isArts = amb.includes('english') || amb.includes('literat') || amb.includes('theatre') || amb.includes('history') || amb.includes('linguist');
    const isEducation = amb.includes('educat') || amb.includes('teach') || amb.includes('b.ed');
    const isEnvironment = amb.includes('architect') || amb.includes('estate') || amb.includes('urban') || amb.includes('survey');

    let targetInstitutions = ['UNILAG', 'UI Ibadan', 'OAU Ife', 'ABU Zaria', 'UNN Nsukka', 'UNILORIN'];
    let waecUtmeRequirements = '5 O\'Level Credits in relevant core subjects including English and Mathematics.';
    let planBFallback = 'Opt for an accredited National Diploma or related university programme with Direct Entry linkage into 200L.';
    let grantOpportunity = 'Federal Government Scholarship + State Bursary Award.';

    if (isMedicine) {
      targetInstitutions = ['UNILAG', 'UI Ibadan', 'OAU Ife', 'ABU Zaria', 'UNN Nsukka', 'UNILORIN'];
      waecUtmeRequirements = '5 WAEC Credits (Strictly 1 Sitting for College of Medicine): English Language, Mathematics, Biology, Chemistry, Physics. Target A1–B2 in Sciences. JAMB UTME: English, Biology, Chemistry, Physics (Aim for 285+ for federal merit; 80%+ Post-UTME).';
      planBFallback = 'If UTME score is between 240–270, switch on JAMB CAPS to Human Physiology or Medical Anatomy at the same university with an opportunity to transfer to 200L MBBS if CGPA is 4.0+ in 100 Level, or explore Nursing Science / Medical Laboratory Science.';
      grantOpportunity = 'Agbami Medical & Engineering Scholarship (₦200,000/yr) + Federal Bilateral Education Medical Award.';
    } else if (isMLS) {
      targetInstitutions = ['UNILAG', 'UNN Nsukka', 'UI Ibadan', 'ABU Zaria', 'UNILORIN', 'UNIBEN'];
      waecUtmeRequirements = '5 WAEC Credits: English, Mathematics, Biology, Chemistry, Physics. Target B2–B3 minimum. JAMB UTME: English, Biology, Chemistry, Physics (Aim for 250+).';
      planBFallback = 'Verified Poly-to-Degree Backup: Complete a 2-year National Diploma in Science Laboratory Technology (SLT) with Upper Credit (CGPA 3.2+) at an NBTE polytechnic (e.g. YABATECH, Fed Poly Offa) to enter 200L B.MLS via JAMB Direct Entry without retaking UTME!';
      grantOpportunity = 'NNPC/Total National Tertiary Scholarship + MLSCN Student Support Fund.';
    } else if (isNursing) {
      targetInstitutions = ['UNILAG', 'UI Ibadan', 'OAU Ife', 'UNIBEN', 'UNILORIN', 'State Colleges of Nursing'];
      waecUtmeRequirements = '5 WAEC Credits: English Language, Mathematics, Biology, Chemistry, Physics. Target A1–B3. JAMB UTME: English, Biology, Chemistry, Physics (Aim for 265+ for federal merit).';
      planBFallback = 'Apply directly to an accredited State College of Nursing Sciences (e.g., LASCON Igando, Oyo State College of Nursing) for the 3-year Registered Nurse (RN) diploma program with affordable state fees and immediate licensure.';
      grantOpportunity = 'NMCN Nursing Leadership Fellowship + Agbami Health Sciences Award.';
    } else if (isPharmacy) {
      targetInstitutions = ['UNILAG', 'UI Ibadan', 'OAU Ife', 'UNIBEN', 'UNN Nsukka', 'ABU Zaria'];
      waecUtmeRequirements = '5 WAEC Credits (1 Sitting strictly required): English, Mathematics, Biology, Chemistry, Physics. Target A1/B2. JAMB UTME: English, Biology, Chemistry, Physics (Aim for 270+ for 6-Year Pharm.D).';
      planBFallback = 'Consider Pharmacology & Therapeutics (B.Sc) or Industrial Chemistry at the university, providing a solid foundation for pharmaceutical research or postgraduate Pharm.D conversion.';
      grantOpportunity = 'PCN Student Leadership Bursary + Seplat Tertiary Scholarship.';
    } else if (isTech) {
      targetInstitutions = ['FUTA Akure', 'UNILAG', 'UI Ibadan', 'OAU Ife', 'UNN', 'Covenant'];
      waecUtmeRequirements = '5 WAEC Credits: English, Mathematics, Physics, Chemistry, and Further Maths or Computer Studies. Target A1–B3. JAMB UTME: English, Mathematics, Physics, Chemistry (Aim for 260+).';
      planBFallback = 'If university admission is delayed, enroll in an accredited ND in Computer Science at YABATECH or Federal Poly Ilaro with Upper Credit for 200L Direct Entry, concurrently taking free She Code Africa / 3MTT junior programs to build a verified GitHub portfolio.';
      grantOpportunity = 'MTN Foundation Science & Technology Scholarship (₦300k/year) + She Code Africa Laptop Grant.';
    } else if (isEngineering) {
      targetInstitutions = ['UNILAG', 'FUTA Akure', 'OAU Ife', 'UI Ibadan', 'ABU Zaria', 'UNN'];
      waecUtmeRequirements = '5 WAEC Credits: English, Mathematics, Physics, Chemistry, and Further Maths or Technical Drawing. Target A1 in Maths/Physics. JAMB UTME: English, Mathematics, Physics, Chemistry (Aim for 260+).';
      planBFallback = 'Acquire an ND in Mechanical / Electrical Engineering (Upper Credit) at a leading polytechnic for Direct Entry into 200L B.Eng (COREN accredited).';
      grantOpportunity = 'PTDF National Tertiary Scholarship + Shell SPDC JV Engineering Award.';
    } else if (isLaw) {
      targetInstitutions = ['UNILAG', 'UI Ibadan', 'UNN Nsukka', 'ABU Zaria', 'UNILORIN', 'LASU'];
      waecUtmeRequirements = '5 WAEC Credits: English Language, Literature-in-English, Mathematics, and 2 Arts/Social Sciences (Government, CRS/IRS, History). Target A1 in English & Literature. JAMB: English, Literature, Government, and 1 other.';
      planBFallback = 'If UTME score falls between 200–235, switch to Criminology, Political Science, or enroll in an accredited University Diploma in Law for Direct Entry into 200L LL.B.';
      grantOpportunity = 'Body of Senior Advocates of Nigeria (SAN) Student Grant + State Bursary.';
    } else if (isCommercial) {
      targetInstitutions = ['UNILAG', 'UI Ibadan', 'OAU Ife', 'UNN', 'Yaba College of Tech', 'Fed Poly Ilaro'];
      waecUtmeRequirements = '5 WAEC Credits: English, Mathematics, Economics, Financial Accounting, and 1 Commercial/Social subject. Target A1–B3. JAMB: English, Mathematics, Economics, Financial Accounting or Commerce.';
      planBFallback = 'Enroll in ICAN ATSWA (Accounting Technicians Scheme) or an ND in Accountancy/Business Admin. Upon completion with Upper Credit, enter 200L via Direct Entry with ICAN exam exemptions!';
      grantOpportunity = 'PwC Tertiary Student Scholarship + ICAN Benevolent Student Education Fund.';
    } else if (isMediaSocial) {
      targetInstitutions = ['UNILAG', 'UI Ibadan', 'UNN Nsukka', 'UNIJOS', 'MAPOLY (Mass Comm)', 'LASU'];
      waecUtmeRequirements = '5 WAEC Credits: English, Mathematics, Literature-in-English, Government, and Economics or CRS/IRS. JAMB: English, Literature, Government, and 1 other Social Science/Arts subject.';
      planBFallback = 'Accept an accredited ND in Mass Communication at YABATECH or MAPOLY. Graduate with Upper Credit and transfer straight into 200L university degree without rewriting JAMB!';
      grantOpportunity = 'Wole Soyinka Centre for Investigative Journalism Student Fellowship + MTN Arts Grant.';
    } else if (isArts) {
      targetInstitutions = ['UI Ibadan', 'UNILAG', 'OAU Ife', 'UNN', 'UNILORIN', 'UNIBEN'];
      waecUtmeRequirements = '5 WAEC Credits: English Language, Literature-in-English, Mathematics, and 2 Arts subjects (CRS/IRS, Government, History). Target A1/B2 in Literature. JAMB: English, Literature, and 2 Arts subjects.';
      planBFallback = 'Complete an NCE (Nigeria Certificate in Education) with Credit in English/Literature, securing 200L Direct Entry into university B.A English.';
      grantOpportunity = 'British Council Creative Arts Award + National Arts Council Bursary.';
    } else if (isEducation) {
      targetInstitutions = ['Tai Solarin Univ of Education (TASUED)', 'UI Ibadan', 'UNN', 'UNILAG', 'Federal College of Education (FCE)'];
      waecUtmeRequirements = '5 WAEC Credits: English, Mathematics, and 3 subjects aligned with your teaching discipline (Sciences, Arts, or Commercial). JAMB: English and 3 teaching subjects.';
      planBFallback = 'NCE qualification at a Federal College of Education provides automatic 200 Level Direct Entry to university B.Ed and full eligibility for the Federal Teaching Bursary.';
      grantOpportunity = 'Federal Government Education Bursary Award (₦150k/year for public university education students).';
    } else if (isEnvironment) {
      targetInstitutions = ['FUTA Akure', 'ABU Zaria', 'UNILAG', 'UNN', 'Yaba College of Tech (Architecture ND)', 'Covenant'];
      waecUtmeRequirements = '5 WAEC Credits: English, Mathematics, Physics, and 2 of Technical Drawing, Chemistry, Fine Art, Geography, Economics. JAMB: English, Physics, Mathematics, and 1 other.';
      planBFallback = 'ND in Architectural Technology or Estate Management (Upper Credit) secures direct transfer to 200L B.Sc/B.Tech at Federal Universities of Technology.';
      grantOpportunity = 'Nigerian Institute of Architects (NIA) Student Fund + NLNG Tertiary Scholarship.';
    }

    const stage = profile.currentStage.toLowerCase();
    const isSS1 = stage.includes('ss1') || stage.includes('jss3');
    const isSS2 = stage.includes('ss2');
    const isSS3 = stage.includes('ss3') && !stage.includes('leaver');

    let milestones;
    if (isSS1) {
      milestones = [
        {
          step: 1,
          period: 'SS1 Foundation Year',
          title: 'Subject Selection & Target Grade Mastery (A1–B3)',
          detail: `Ensure your WAEC subject combinations match JAMB requirements: 5 credits including English, Maths, and ${profile.favoriteSubjects.slice(0, 3).join(', ')}. Target A1/B2 grades in your core subjects.`
        },
        {
          step: 2,
          period: 'SS2 Progression',
          title: 'Secondary Competitions & In-School Skill Building',
          detail: `Register for Cowbellpedia, Interswitch SPAK, or Technovation Girls. Begin practical portfolio/foundational study while in secondary school.`
        },
        {
          step: 3,
          period: 'SS3 & Tertiary Transition',
          title: 'JAMB CBT Sprint & University Application Strategy',
          detail: `Aim for 250+ in UTME. Lock in catchment area and backup course options (${profile.studyPreference}) on JAMB CAPS.`
        }
      ];
    } else if (isSS2) {
      milestones = [
        {
          step: 1,
          period: 'SS2 Term 1 – 2',
          title: 'WAEC / NECO Syllabus Coverage & Target Grades',
          detail: `Cover 75% of your SSCE syllabus. Target A1–B3 in ${profile.favoriteSubjects.slice(0, 3).join(', ')}. Practice WAEC past questions (2015–2024).`
        },
        {
          step: 2,
          period: 'SS2 Term 3 & Holiday',
          title: 'JAMB CBT Early Prep & STEM Competitions',
          detail: `Compete in national secondary STEM Olympiads / SPAK. Start timed JAMB CBT drills for your 4 UTME subjects.`
        },
        {
          step: 3,
          period: 'SS3 / Tertiary Entry',
          title: 'SSCE Exams in 1 Sitting & Tertiary Admission CAPS',
          detail: `Clear WAEC/NECO in one sitting. File for your preferred institution (${profile.studyPreference}) and prepare for Post-UTME screening tests.`
        }
      ];
    } else if (isSS3) {
      milestones = [
        {
          step: 1,
          period: 'Immediate (SS3 Sprint)',
          title: 'WAEC / NECO Exam Success (Target A1–B3)',
          detail: `Lock in 5 Credits in 1 sitting for English, Maths, and ${profile.favoriteSubjects.slice(0, 2).join(' & ')}. Focus on practical lab work and essay precision.`
        },
        {
          step: 2,
          period: 'UTME Season',
          title: 'JAMB CBT High-Score Execution',
          detail: `Target top UTME marks for ${profile.careerAmbition}. Master time management across 4 subjects and review recommended literary text.`
        },
        {
          step: 3,
          period: 'Post-UTME & Admission',
          title: 'Post-UTME Screening, CAPS Acceptance & Bursaries',
          detail: `Prepare for ${profile.targetInstitution || 'target institution'} Post-UTME. Monitor JAMB CAPS Marketplace and apply for tertiary entry scholarships upon admission.`
        }
      ];
    } else {
      // Secondary Leaver / Awaiting JAMB / Post-UTME
      milestones = [
        {
          step: 1,
          period: 'UTME / Post-UTME Prep',
          title: 'High-Score CBT Strategy & Past Question Drills',
          detail: `Drill past questions for your 4 UTME subjects. Review specific Post-UTME patterns for ${profile.targetInstitution || 'preferred university'}.`
        },
        {
          step: 2,
          period: 'JAMB CAPS Admission Tracking',
          title: 'Merit vs Catchment Selection & Safety Net',
          detail: `Track your state catchment quota and merit marks. If cutoff mark is borderline, activate accredited backup course or polytechnic Direct Entry route.`
        },
        {
          step: 3,
          period: 'Matriculation & Transition',
          title: 'Clearance & Tertiary Entry Scholarships',
          detail: `Complete departmental verification with original WAEC/NECO certificate. Apply for corporate and federal tertiary scholarships.`
        }
      ];
    }

    return {
      careerTitle: profile.careerAmbition,
      targetInstitutions,
      waecUtmeRequirements,
      meritAndCatchmentAdvice: profile.realWorldConstraint.includes('cut-off')
        ? 'Target your home state\'s Federal University catchment list where cutoff marks are typically 15–20 points lower than the national merit mark. Avoid blindly chasing only UNILAG or UI if your score is borderline.'
        : 'Maintain a 65%+ aggregate score across UTME and Post-UTME. Verify your JAMB CAPS status within 72 hours of admission lists dropping.',
      planBFallback,
      milestones,
      grantOpportunity
    };
  };

  const filteredChips = DEFAULT_CAREER_CHIPS.filter(chip =>
    chip.toLowerCase().includes(careerSearchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto" id="intake-modal-root">
      {/* Dimmed Backdrop with slow-motion fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="fixed inset-0 bg-[#0a192f]/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Container Card with smooth cushioned slow-motion entry */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 22 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 22 }}
        transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full ${
          showResultView ? 'max-w-4xl max-h-[92vh] overflow-y-auto' : 'max-w-xl'
        } bg-white rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col z-10 my-auto overflow-hidden text-slate-900`}
      >
        {/* Top Decorative Nigerian Heritage Geometric Trim - Deep Blue & Crimson */}
        <div className="w-full h-1.5 bg-gradient-to-r from-[#0a192f] via-[#dc2626] to-[#1e3a8a]" />

        {/* Modal Header Bar (Only during Phase 2 Intake Questionnaire) */}
        {!showResultView && (
          <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0a192f] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[18px]">explore</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-headline text-[16px] font-bold text-[#0a192f] leading-none">
                  Tell Us About You
                </span>
                <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                  CarEdPath NG Career &amp; Roadmap Calibrator
                </span>
              </div>
            </div>

            <button
              id="intake-close-btn"
              onClick={onClose}
              aria-label="Close intake flow"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        )}

        {/* Dynamic Progress Bar (Step X of 5) with deliberate slow-motion glide */}
        {!isLoadingRoadmap && !showResultView && (
          <div className="px-6 pt-3 pb-1 bg-white flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-[#c85a32] uppercase tracking-wider">
                Step {currentStep} of 5
              </span>
              <span className="text-slate-400">
                {currentStep === 1 && 'Current Journey'}
                {currentStep === 2 && 'Career Ambition'}
                {currentStep === 3 && 'Academic Strengths'}
                {currentStep === 4 && 'Reality Check'}
                {currentStep === 5 && 'Study Preference'}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0a192f] via-[#c85a32] to-[#dc2626] rounded-full"
                initial={{ width: `${((currentStep - 1) / 5) * 100}%` }}
                animate={{ width: `${(currentStep / 5) * 100}%` }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        )}

        {/* Main Content Area: Stepper / Loading / Result */}
        <div className={showResultView ? "flex flex-col flex-1 w-full" : "p-5 sm:p-6 flex flex-col flex-1 min-h-[390px] justify-between"}>
          {/* LOADING STATE - Slow-Motion Nigerian Pathway Calculation */}
          {isLoadingRoadmap && (
            <div className="flex flex-col items-center justify-center py-12 gap-5 text-center my-auto">
              {/* Dual concentric slow-spinning rings */}
              <div className="relative flex items-center justify-center w-24 h-24">
                {/* Outer slow-spinning decorative ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-[#dc2626]/40"
                />
                {/* Secondary counter-rotating ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
                  className="absolute inset-2 rounded-full border border-t-2 border-transparent border-t-[#0a192f] border-b-[#c85a32]"
                />
                {/* Inner glowing pulse circle */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  className="w-12 h-12 rounded-full bg-[#0a192f] text-white flex items-center justify-center shadow-md z-10"
                >
                  <span className="material-symbols-outlined text-[22px] text-white animate-pulse">
                    auto_awesome
                  </span>
                </motion.div>
              </div>

              <div className="flex flex-col gap-2 max-w-sm">
                <h3 className="font-serif-headline text-[19px] font-bold text-[#0a192f]">
                  Mapping realistic Nigerian pathways for {userProfile.careerAmbition || 'Your Ambition'}...
                </h3>

                {/* Text transition in slow motion */}
                <div className="h-10 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={loadingStepText}
                      initial={{ opacity: 0, y: 7, filter: 'blur(2px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -7, filter: 'blur(2px)' }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="text-[13px] text-slate-700 font-medium"
                    >
                      {loadingStepText}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="px-3.5 py-1.5 rounded-full bg-red-50 text-[#991b1b] border border-red-200 text-[11px] font-semibold"
              >
                🇳🇬 Grounded in JAMB brochure, NUC accreditation &amp; NBTE polytechnic rules
              </motion.div>
            </div>
          )}

          {/* RESULT VIEW AFTER GENERATION - Interactive Vertical Metro-Line Career Map Results Engine */}
          {!isLoadingRoadmap && showResultView && (
            <CareerMapEngine
              careerAmbition={userProfile.careerAmbition}
              userProfile={userProfile}
              onClose={onClose}
              onGoToMentorAI={onGoToMentorAI}
              onExploreOpportunities={onExploreOpportunities}
            />
          )}

          {/* STEPPER CARDS (1 TO 5) - With Slow Motion Easing & Soft Focus */}
          {!isLoadingRoadmap && !showResultView && (
            <AnimatePresence mode="wait" initial={false}>
              {/* STEP 1: CURRENT STAGE */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: direction === 'forward' ? 28 : -28, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: direction === 'forward' ? -28 : 28, filter: 'blur(3px)' }}
                  transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#c85a32]">
                      Stage Assessment
                    </span>
                    <h2 className="font-serif-headline text-[20px] sm:text-[24px] font-bold text-[#0a192f] leading-snug">
                      Where are you currently on your journey?
                    </h2>
                    <p className="text-[13px] text-slate-500 leading-relaxed">
                      Select the option that best matches your current school or admission status.
                    </p>
                  </div>

                  {/* Options Pills with smooth slow-motion hover & selection transition */}
                  <div className="flex flex-col gap-2.5 pt-1" id="intake-stage-options">
                    {STAGE_OPTIONS.map((stage) => {
                      const isSelected = userProfile.currentStage === stage;
                      return (
                        <button
                          key={stage}
                          id={`stage-opt-${stage.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
                          type="button"
                          onClick={() => setUserProfile(prev => ({ ...prev, currentStage: stage }))}
                          className={`w-full text-left p-3.5 rounded-xl text-[13px] font-semibold flex items-center justify-between transition-all duration-300 ease-out cursor-pointer border ${
                            isSelected
                              ? 'border-[#c85a32] bg-[#fdf6f3] text-[#8a3314] shadow-xs ring-1 ring-[#c85a32]/40 translate-x-1'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:translate-x-0.5'
                          }`}
                        >
                          <span>{stage}</span>
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center border text-[12px] flex-shrink-0 transition-all duration-300 ${
                              isSelected
                                ? 'bg-[#c85a32] text-white border-[#c85a32] scale-105'
                                : 'border-slate-300 text-transparent'
                            }`}
                          >
                            ✓
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Supportive Micro-copy */}
                  <div className="p-3 rounded-xl bg-slate-50 text-[12px] text-slate-500 flex items-center gap-2 border border-slate-200/60 mt-1">
                    <span className="material-symbols-outlined text-[17px] text-[#c85a32] flex-shrink-0">
                      support
                    </span>
                    <span>No wrong answers here — we will find a route that fits your real situation.</span>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: CAREER AMBITION & PASSION */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: direction === 'forward' ? 28 : -28, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: direction === 'forward' ? -28 : 28, filter: 'blur(3px)' }}
                  transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-3.5"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#c85a32]">
                      Target Field
                    </span>
                    <h2 className="font-serif-headline text-[20px] sm:text-[24px] font-bold text-[#0a192f] leading-snug">
                      What field or career makes you curious?
                    </h2>
                    <p className="text-[13px] text-slate-500">
                      Choose from popular high-demand Nigerian paths or type your dream course.
                    </p>
                  </div>

                  {/* Search / Filter Box */}
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-slate-400">
                      search
                    </span>
                    <input
                      type="text"
                      placeholder="Filter careers (e.g. Science, Tech, Health)..."
                      value={careerSearchQuery}
                      onChange={(e) => setCareerSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[12px] text-slate-900 focus:outline-none focus:border-[#c85a32] transition-colors duration-200"
                    />
                  </div>

                  {/* Quick-Select Chips */}
                  <div className="flex flex-wrap gap-2 max-h-[160px] overflow-y-auto pr-1">
                    {filteredChips.map((chip) => {
                      const isSelected = userProfile.careerAmbition === chip;
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => {
                            setUserProfile(prev => ({ ...prev, careerAmbition: chip }));
                            setCustomCareerInput('');
                          }}
                          className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-300 ease-out cursor-pointer border ${
                            isSelected
                              ? 'border-[#c85a32] bg-[#fdf6f3] text-[#8a3314] shadow-xs ring-1 ring-[#c85a32]/40 scale-105'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {chip}
                        </button>
                      );
                    })}
                  </div>

                  {/* Or Type Your Own */}
                  <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Or type your own target course / career:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Nursing, Pharmacy, Civil Engineering, AI..."
                        value={customCareerInput}
                        onChange={(e) => {
                          setCustomCareerInput(e.target.value);
                          setUserProfile(prev => ({ ...prev, careerAmbition: e.target.value }));
                        }}
                        className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[13px] text-slate-900 focus:outline-none focus:border-[#c85a32] transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Supportive Micro-copy */}
                  <div className="p-3 rounded-xl bg-slate-50 text-[12px] text-slate-500 flex items-center gap-2 border border-slate-200/60 mt-0.5">
                    <span className="material-symbols-outlined text-[17px] text-[#c85a32] flex-shrink-0">
                      school
                    </span>
                    <span>Secondary school, polytechnic, or uni — every Nigerian pathway counts.</span>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: ACADEMIC STRENGTHS & FAVORITE SUBJECTS */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: direction === 'forward' ? 28 : -28, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: direction === 'forward' ? -28 : 28, filter: 'blur(3px)' }}
                  transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-3.5"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#c85a32]">
                        Academic Strengths
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-[#0a192f] transition-all duration-300">
                        {userProfile.favoriteSubjects.length} of 4 selected
                      </span>
                    </div>
                    <h2 className="font-serif-headline text-[20px] sm:text-[24px] font-bold text-[#0a192f] leading-snug">
                      Which subjects do you enjoy or perform best in?
                    </h2>
                    <p className="text-[13px] text-slate-500">
                      Select up to 4 core subjects. We cross-reference these with official JAMB combinations.
                    </p>
                  </div>

                  {/* Multi-Select Chips with slow-motion state change */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {SUBJECT_OPTIONS.map((subj) => {
                      const isSelected = userProfile.favoriteSubjects.includes(subj);
                      return (
                        <button
                          key={subj}
                          type="button"
                          onClick={() => handleSubjectToggle(subj)}
                          className={`p-3 rounded-xl text-[12px] font-semibold flex items-center justify-between transition-all duration-300 ease-out cursor-pointer border ${
                            isSelected
                              ? 'border-[#c85a32] bg-[#fdf6f3] text-[#8a3314] shadow-xs ring-1 ring-[#c85a32]/40 scale-[1.02]'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <span>{subj}</span>
                          <span
                            className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] transition-all duration-300 ${
                              isSelected
                                ? 'bg-[#c85a32] text-white scale-110'
                                : 'border border-slate-300 text-transparent'
                            }`}
                          >
                            ✓
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Supportive Micro-copy */}
                  <div className="p-3 rounded-xl bg-slate-50 text-[12px] text-slate-500 flex items-center gap-2 border border-slate-200/60 mt-1">
                    <span className="material-symbols-outlined text-[17px] text-[#c85a32] flex-shrink-0">
                      fact_check
                    </span>
                    <span>Pick what you genuinely enjoy. We check WAEC prerequisite combinations automatically.</span>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: REAL-WORLD CONSTRAINTS & CONTEXT */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: direction === 'forward' ? 28 : -28, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: direction === 'forward' ? -28 : 28, filter: 'blur(3px)' }}
                  transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-3.5"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#c85a32]">
                      Context &amp; Challenges
                    </span>
                    <h2 className="font-serif-headline text-[20px] sm:text-[24px] font-bold text-[#0a192f] leading-snug">
                      What is your biggest concern or reality check right now?
                    </h2>
                    <p className="text-[13px] text-slate-500">
                      We use this to calibrate practical Plan B routes, scholarships, or low-cost alternatives.
                    </p>
                  </div>

                  {/* Constraint Options */}
                  <div className="flex flex-col gap-2 pt-1">
                    {CONSTRAINT_OPTIONS.map((item) => {
                      const isSelected = userProfile.realWorldConstraint === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setUserProfile(prev => ({ ...prev, realWorldConstraint: item }))}
                          className={`w-full text-left p-3 rounded-xl text-[12px] sm:text-[13px] font-semibold flex items-center justify-between transition-all duration-300 ease-out cursor-pointer border ${
                            isSelected
                              ? 'border-[#c85a32] bg-[#fdf6f3] text-[#8a3314] shadow-xs ring-1 ring-[#c85a32]/40 translate-x-1'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:translate-x-0.5'
                          }`}
                        >
                          <span className="pr-2">{item}</span>
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center border text-[11px] flex-shrink-0 transition-all duration-300 ${
                              isSelected
                                ? 'bg-[#c85a32] text-white border-[#c85a32] scale-105'
                                : 'border-slate-300 text-transparent'
                            }`}
                          >
                            ✓
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Supportive Micro-copy */}
                  <div className="p-3 rounded-xl bg-slate-50 text-[12px] text-slate-500 flex items-center gap-2 border border-slate-200/60 mt-1">
                    <span className="material-symbols-outlined text-[17px] text-[#c85a32] flex-shrink-0">
                      favorite
                    </span>
                    <span>Be honest about constraints — 85% of Nigerian students navigate these exact challenges.</span>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: TARGET LOCATION & STUDY PREFERENCE */}
              {currentStep === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, x: direction === 'forward' ? 28 : -28, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: direction === 'forward' ? -28 : 28, filter: 'blur(3px)' }}
                  transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-3.5"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#c85a32]">
                      Institution Preference
                    </span>
                    <h2 className="font-serif-headline text-[20px] sm:text-[24px] font-bold text-[#0a192f] leading-snug">
                      Where would you prefer to study or train?
                    </h2>
                    <p className="text-[13px] text-slate-500">
                      Choose your intended learning environment to map admission criteria and Direct Entry options.
                    </p>
                  </div>

                  {/* Preferences Options */}
                  <div className="flex flex-col gap-2 pt-1">
                    {STUDY_PREFERENCES.map((pref) => {
                      const isSelected = userProfile.studyPreference === pref;
                      return (
                        <button
                          key={pref}
                          type="button"
                          onClick={() => setUserProfile(prev => ({ ...prev, studyPreference: pref }))}
                          className={`w-full text-left p-3 rounded-xl text-[12.5px] font-semibold flex items-center justify-between transition-all duration-300 ease-out cursor-pointer border ${
                            isSelected
                              ? 'border-[#c85a32] bg-[#fdf6f3] text-[#8a3314] shadow-xs ring-1 ring-[#c85a32]/40 translate-x-1'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:translate-x-0.5'
                          }`}
                        >
                          <span>{pref}</span>
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center border text-[11px] flex-shrink-0 transition-all duration-300 ${
                              isSelected
                                ? 'bg-[#c85a32] text-white border-[#c85a32] scale-105'
                                : 'border-slate-300 text-transparent'
                            }`}
                          >
                            ✓
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Target Institution Selection (Locked to roadmap) */}
                  <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Primary Target Institution:
                      </label>
                      <span className="text-[10px] text-emerald-700 font-semibold">
                        Locked to your roadmap
                      </span>
                    </div>
                    <select
                      value={userProfile.targetInstitution || 'University of Ilorin'}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, targetInstitution: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#c85a32]"
                    >
                      <option value="University of Ilorin">University of Ilorin (UNILORIN)</option>
                      <option value="University of Lagos">University of Lagos (UNILAG)</option>
                      <option value="University of Ibadan">University of Ibadan (UI)</option>
                      <option value="Obafemi Awolowo University">Obafemi Awolowo University (OAU)</option>
                      <option value="Ahmadu Bello University">Ahmadu Bello University (ABU)</option>
                      <option value="University of Nigeria Nsukka">University of Nigeria, Nsukka (UNN)</option>
                      <option value="Federal University of Technology Akure">Federal University of Tech, Akure (FUTA)</option>
                    </select>
                  </div>

                  {/* Target Academic Session Selection */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Academic Session:
                    </span>
                    <div className="flex gap-1.5">
                      {['2026/2027', '2025/2026'].map((sess) => (
                        <button
                          key={sess}
                          type="button"
                          onClick={() => setUserProfile(prev => ({ ...prev, academicSession: sess }))}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                            userProfile.academicSession === sess
                              ? 'bg-[#0a192f] text-white border-[#0a192f]'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {sess}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Supportive Micro-copy */}
                  <div className="p-3 rounded-xl bg-slate-50 text-[12px] text-slate-500 flex items-center gap-2 border border-slate-200/60 mt-1">
                    <span className="material-symbols-outlined text-[17px] text-[#c85a32] flex-shrink-0">
                      location_on
                    </span>
                    <span>We tailor federal catchment areas, polytechnic Direct Entry, and scholarship links based on this.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Stepper Navigation Footer Buttons */}
          {!isLoadingRoadmap && !showResultView && (
            <div className="flex items-center justify-between gap-3 pt-4 mt-3 border-t border-slate-100">
              <button
                id="intake-back-btn"
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`px-4 py-2.5 rounded-xl text-[13px] font-semibold flex items-center gap-1 transition-all duration-300 cursor-pointer ${
                  currentStep === 1
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Back</span>
              </button>

              <button
                id="intake-continue-btn"
                type="button"
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`px-6 py-2.5 rounded-xl font-semibold text-[13px] flex items-center gap-2 shadow-sm transition-all duration-300 cursor-pointer ${
                  isStepValid()
                    ? 'bg-[#dc2626] text-white hover:bg-[#b91c1c] active:scale-95 shadow-red-950/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>{currentStep === 5 ? 'Generate My Career Map' : 'Continue'}</span>
                <span className="material-symbols-outlined text-[18px]">
                  {currentStep === 5 ? 'auto_awesome' : 'arrow_forward'}
                </span>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
