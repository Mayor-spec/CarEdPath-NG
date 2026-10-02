/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AggregateFormulaConfig {
  name: string;
  description: string;
  formulaExplanation: string;
  utmeWeight: number; // e.g. 50
  postUtmeWeight: number; // e.g. 30
  olevelWeight: number; // e.g. 20
  calculate?: (utme: number, postUtme: number, olevelGrades: Record<string, string>) => number;
}

export interface VerifiedAdmissionRequirement {
  id: string;
  institutionId: InstitutionId;
  institution: string;
  institutionShortName: string;
  programme: string;
  degree: string;
  faculty: string;
  academicSession: string; // e.g. "2026/2027"
  olevelRequirements: string[];
  olevelMinimumGrades: { subject: string; minGrade: string }[];
  olevelSittings: string;
  utmeSubjects: string[];
  utmeMinimum: number;
  recentCutoff: {
    score: string;
    session: string;
    category: string;
    details?: string;
  };
  postUtmeRequired: boolean;
  postUtmeMinimum: string;
  postUtmeBenchmark: string;
  aggregateFormula: AggregateFormulaConfig;
  targetGrades: {
    subject: string;
    target: string;
    basis: string;
    statusLabel?: 'CarEdPath target' | 'Official minimum' | 'Recent benchmark';
  }[];
  targetUtme: string;
  targetPostUtme: string;
  sources: {
    title: string;
    url?: string;
    type: 'Official University Portal' | 'JAMB IBASS Brochure' | 'Regulatory Council' | 'Official Admission Committee';
    verifiedDate: string;
  }[];
  verifiedDate: string;
  alternativeAdvice: {
    shortNote: string;
    options: string[];
  };
}

// O'Level Grade Point helpers for Nigerian Universities
// UNILAG 20-Point Scale (5 subjects): A1=4.0, B2=3.6, B3=3.2, C4=2.8, C5=2.4, C6=2.0 (Max = 20)
export function getUnilagOlevelPoint(grade: string): number {
  const g = grade.toUpperCase().trim();
  switch (g) {
    case 'A1': return 4.0;
    case 'B2': return 3.6;
    case 'B3': return 3.2;
    case 'C4': return 2.8;
    case 'C5': return 2.4;
    case 'C6': return 2.0;
    default: return 0.0;
  }
}

// OAU 10-Point Scale (5 subjects):
// In OAU's 50:40:10 formula, the 5 core O'Level subjects are graded:
// A1=10 pts, B2=9 pts, B3=8 pts, C4=7 pts, C5=6 pts, C6=5 pts (Total pts ÷ 5 = O'Level contribution out of 10)
// Equivalently per subject: A1=2.0, B2=1.8, B3=1.6, C4=1.4, C5=1.2, C6=1.0. Max = 10.0 marks.
export function getOauOlevelPoint(grade: string): number {
  const g = grade.toUpperCase().trim();
  switch (g) {
    case 'A1': return 2.0;
    case 'B2': return 1.8;
    case 'B3': return 1.6;
    case 'C4': return 1.4;
    case 'C5': return 1.2;
    case 'C6': return 1.0;
    default: return 0.0;
  }
}

export type InstitutionId = 'unilorin' | 'unilag' | 'ui' | 'oau' | 'abu' | 'unn' | 'futa';

export interface InstitutionMetadata {
  id: InstitutionId;
  shortName: string;
  fullName: string;
  state: string;
  portalUrl: string;
  postUtmeFormulaName: string;
  postUtmeMethodology: string;
}

export const SUPPORTED_INSTITUTIONS: Record<InstitutionId, InstitutionMetadata> = {
  unilorin: {
    id: 'unilorin',
    shortName: 'UNILORIN',
    fullName: 'University of Ilorin',
    state: 'Kwara',
    portalUrl: 'https://uilugportal.unilorin.edu.ng',
    postUtmeFormulaName: 'UNILORIN 50:50 Aggregate Formula',
    postUtmeMethodology: '(UTME ÷ 8) + (Post-UTME CBT ÷ 2) = 100%. UTME provides 50%, Post-UTME provides 50%. O\'Level 5 core credits are mandatory eligibility prerequisites.'
  },
  unilag: {
    id: 'unilag',
    shortName: 'UNILAG',
    fullName: 'University of Lagos',
    state: 'Lagos',
    portalUrl: 'https://admissions.unilag.edu.ng',
    postUtmeFormulaName: 'UNILAG 50:30:20 Aggregate Model',
    postUtmeMethodology: '(UTME ÷ 8) [50 marks] + Post-UTME CBT [30 marks] + O\'Level Points [20 marks: A1=4.0, B2=3.6, B3=3.2, C4=2.8, C5=2.4, C6=2.0] = 100 marks.'
  },
  ui: {
    id: 'ui',
    shortName: 'UI',
    fullName: 'University of Ibadan',
    state: 'Oyo',
    portalUrl: 'https://admissions.ui.edu.ng',
    postUtmeFormulaName: 'UI 50:50 Aggregate Formula',
    postUtmeMethodology: '(UTME ÷ 8) [50 marks] + (Post-UTME CBT ÷ 2) [50 marks] = 100 marks.'
  },
  oau: {
    id: 'oau',
    shortName: 'OAU',
    fullName: 'Obafemi Awolowo University',
    state: 'Osun',
    portalUrl: 'https://admissions.oauife.edu.ng',
    postUtmeFormulaName: 'OAU 50:40:10 Aggregate Formula',
    postUtmeMethodology: '(UTME ÷ 8) [50 marks] + Post-UTME Screening [40 marks] + O\'Level Points [10 marks: 5 core subjects (A1=10, B2=9, B3=8, C4=7, C5=6, C6=5) ÷ 5] = 100 marks.'
  },
  abu: {
    id: 'abu',
    shortName: 'ABU',
    fullName: 'Ahmadu Bello University',
    state: 'Kaduna',
    portalUrl: 'https://abu.edu.ng',
    postUtmeFormulaName: 'ABU Zaria 50:50 Aggregate Formula',
    postUtmeMethodology: '(UTME ÷ 8) [50 marks] + (Post-UTME CBT ÷ 2) [50 marks] = 100 marks.'
  },
  unn: {
    id: 'unn',
    shortName: 'UNN',
    fullName: 'University of Nigeria, Nsukka',
    state: 'Enugu',
    portalUrl: 'https://unn.edu.ng',
    postUtmeFormulaName: 'UNN Combined Average Formula',
    postUtmeMethodology: '(UTME [400] + Post-UTME [400]) ÷ 2 = Combined Average out of 400.'
  },
  futa: {
    id: 'futa',
    shortName: 'FUTA',
    fullName: 'Federal University of Technology, Akure',
    state: 'Ondo',
    portalUrl: 'https://futa.edu.ng',
    postUtmeFormulaName: 'FUTA 50:50 Aggregate Formula',
    postUtmeMethodology: '(UTME ÷ 8) [50 marks] + (Post-UTME CBT ÷ 2) [50 marks] = 100 marks.'
  }
};

export function normalizeInstitutionId(input?: string): InstitutionId | null {
  if (!input) return null;
  const s = input.toLowerCase().trim();
  if (s === 'unilorin' || s.includes('ilorin')) return 'unilorin';
  if (s === 'unilag' || s.includes('lagos')) return 'unilag';
  if (s === 'ui' || s.includes('ibadan')) return 'ui';
  if (s === 'oau' || s.includes('ife') || s.includes('awolowo')) return 'oau';
  if (s === 'abu' || s.includes('zaria') || s.includes('bello')) return 'abu';
  if (s === 'unn' || s.includes('nsukka') || s.includes('nigeria, nsukka')) return 'unn';
  if (s === 'futa' || s.includes('akure') || s.includes('technology, akure')) return 'futa';
  return null;
}

export interface VerifiedAdmissionFact {
  institutionId: InstitutionId;
  institutionName: string;
  programme: string;
  academicSession: string;
  dataType: 'cut-off' | 'post-utme-formula' | 'utme-requirement' | 'olevel-requirement' | 'screening-policy';
  fact: string;
  source: string;
  verifiedDate: string;
}

export function getVerifiedAdmissionFacts(req: VerifiedAdmissionRequirement): VerifiedAdmissionFact[] {
  return [
    {
      institutionId: req.institutionId,
      institutionName: req.institution,
      programme: req.programme,
      academicSession: req.academicSession,
      dataType: 'cut-off',
      fact: `${req.recentCutoff.score} (${req.recentCutoff.category}, Session: ${req.recentCutoff.session})`,
      source: req.sources[0]?.title || `${req.institution} Official Portal`,
      verifiedDate: req.verifiedDate
    },
    {
      institutionId: req.institutionId,
      institutionName: req.institution,
      programme: req.programme,
      academicSession: req.academicSession,
      dataType: 'post-utme-formula',
      fact: `${req.aggregateFormula.name}: ${req.aggregateFormula.formulaExplanation}`,
      source: req.sources[0]?.title || `${req.institution} Admissions Board`,
      verifiedDate: req.verifiedDate
    },
    {
      institutionId: req.institutionId,
      institutionName: req.institution,
      programme: req.programme,
      academicSession: req.academicSession,
      dataType: 'utme-requirement',
      fact: `UTME Subjects: ${req.utmeSubjects.join(', ')} (Eligibility Minimum: ${req.utmeMinimum})`,
      source: 'JAMB IBASS & Institutional Brochure',
      verifiedDate: req.verifiedDate
    },
    {
      institutionId: req.institutionId,
      institutionName: req.institution,
      programme: req.programme,
      academicSession: req.academicSession,
      dataType: 'olevel-requirement',
      fact: `WAEC/NECO: 5 credits in ${req.olevelRequirements.join(', ')} (${req.olevelSittings})`,
      source: req.sources[0]?.title || `${req.institution} Admissions Board`,
      verifiedDate: req.verifiedDate
    },
    {
      institutionId: req.institutionId,
      institutionName: req.institution,
      programme: req.programme,
      academicSession: req.academicSession,
      dataType: 'screening-policy',
      fact: req.postUtmeRequired ? `Post-UTME Screening Required (Minimum: ${req.postUtmeMinimum}, Target: ${req.postUtmeBenchmark})` : 'Pure O\'Level Point Screening',
      source: req.sources[0]?.title || `${req.institution} Admissions Board`,
      verifiedDate: req.verifiedDate
    }
  ];
}

export const VERIFIED_ADMISSION_DATABASE: Record<string, VerifiedAdmissionRequirement> = {
  // =========================================================================
  // 1. MEDICINE & SURGERY (MBBS)
  // =========================================================================
  'medicine-surgery-unilag': {
    id: 'medicine-surgery-unilag',
    institutionId: 'unilag',
    institution: 'University of Lagos',
    institutionShortName: 'UNILAG',
    programme: 'Medicine & Surgery',
    degree: 'MBBS (6 Years)',
    faculty: 'College of Medicine / Clinical Sciences',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Biology', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' }
    ],
    olevelSittings: 'Strictly 1 sitting required for College of Medicine',
    utmeSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '84.40 Merit Aggregate (Catchment: 78.50 – 81.25)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '15 / 30 (50% in UNILAG Post-UTME CBT)',
    postUtmeBenchmark: '24+ / 30 (80%+)',
    aggregateFormula: {
      name: 'UNILAG 50:30:20 Aggregate Model',
      description: 'UTME 50% + Post-UTME 30% + O\'Level 20% (Total: 100%)',
      formulaExplanation: 'UTME score ÷ 8 (max 50) + Post-UTME score (out of 30) + 5 O\'Level subject points (A1=4.0, B2=3.6, B3=3.2, C4=2.8, C5=2.4, C6=2.0; max 20).',
      utmeWeight: 50,
      postUtmeWeight: 30,
      olevelWeight: 20
    },
    targetGrades: [
      { subject: 'Biology', target: 'B2+ target', basis: 'CarEdPath target based on UNILAG 20-point O\'Level grading where high points are needed for 84+ aggregate', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B2+ target', basis: 'CarEdPath target based on UNILAG 20-point O\'Level grading', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B3+ target', basis: 'CarEdPath target based on UNILAG 20-point O\'Level grading', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target based on UNILAG 20-point O\'Level grading', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B3+ target', basis: 'CarEdPath target based on UNILAG 20-point O\'Level grading', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '285+',
    targetPostUtme: '24+ / 30 (80%+)',
    sources: [
      { title: 'UNILAG Official Admissions Portal (admissions.unilag.edu.ng)', url: 'https://admissions.unilag.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'JAMB IBASS Official Brochure (College of Medicine Prerequisites)', url: 'https://ibass.jamb.gov.ng', type: 'JAMB IBASS Brochure', verifiedDate: 'September 2026' },
      { title: 'Medical and Dental Council of Nigeria (MDCN) Accredited Quotas', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If your aggregate falls below 82.00, consider high-demand clinical or health sciences before registration closes:',
      options: [
        'Explore Human Physiology or Medical Anatomy at UNILAG (allows transfer if CGPA > 4.0 in 100L)',
        'Check UNILAG catchment states (Lagos, Ogun, Osun, Oyo, Ondo, Ekiti) where cut-off drops to 78.50',
        'Consider Medical Laboratory Science or Nursing Science'
      ]
    }
  },

  'medicine-surgery-ui': {
    id: 'medicine-surgery-ui',
    institutionId: 'ui',
    institution: 'University of Ibadan',
    institutionShortName: 'UI',
    programme: 'Medicine & Surgery',
    degree: 'MBBS (6 Years)',
    faculty: 'College of Medicine / Clinical Sciences',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Biology', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' }
    ],
    olevelSittings: 'Strictly 1 sitting required for College of Medicine',
    utmeSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '81.75 Merit Aggregate',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100 CBT)',
    postUtmeBenchmark: '78+ / 100',
    aggregateFormula: {
      name: 'UI 50:50 Aggregate Model',
      description: 'UTME 50% + Post-UTME 50% (Total: 100%)',
      formulaExplanation: '(UTME score ÷ 8) + (Post-UTME score ÷ 2) = 100%. (O\'Level is a qualifying prerequisite of 5 credits at one sitting; no numerical points assigned).',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Biology', target: 'B2+ target', basis: 'CarEdPath target for foundational medical mastery (UI requires 5 credits at 1 sitting)', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B2+ target', basis: 'CarEdPath target for foundational medical mastery', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B3+ target', basis: 'CarEdPath target for foundational medical mastery', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for comprehension & communication', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B3+ target', basis: 'CarEdPath target for analytical reasoning', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '280+',
    targetPostUtme: '78+ / 100',
    sources: [
      { title: 'University of Ibadan Undergraduate Admissions Office (ui.edu.ng)', url: 'https://admissions.ui.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'JAMB IBASS System (University of Ibadan Faculty of Medicine)', type: 'JAMB IBASS Brochure', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If your UI aggregate is under 78.00:',
      options: [
        'Explore Dentistry & Dental Surgery (BDS) at UI (aggregate cut-off ~75.50)',
        'Explore Medical Laboratory Science (B.MLS) or Human Nutrition at UI',
        'Prepare for state university MBBS admission (e.g. LAUTECH, OOU) with 240+ UTME'
      ]
    }
  },

  'medicine-surgery-oau': {
    id: 'medicine-surgery-oau',
    institutionId: 'oau',
    institution: 'Obafemi Awolowo University',
    institutionShortName: 'OAU',
    programme: 'Medicine & Surgery',
    degree: 'MBBS (6 Years)',
    faculty: 'College of Health Sciences',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Biology', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' }
    ],
    olevelSittings: 'Strictly 1 sitting required for Health Sciences',
    utmeSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '82.50 Aggregate Benchmark',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '20 / 40 (50% Pass Mark in OAU Post-UTME Screening)',
    postUtmeBenchmark: '32+ / 40',
    aggregateFormula: {
      name: 'OAU 50:40:10 Aggregate Formula',
      description: 'UTME 50% + Post-UTME 40% + O\'Level 10%',
      formulaExplanation: 'UTME score ÷ 8 (max 50) + Post-UTME screening score (max 40) + O\'Level 5 core grades (A1=10, B2=9, B3=8, C4=7, C5=6, C6=5 ÷ 5; max 10).',
      utmeWeight: 50,
      postUtmeWeight: 40,
      olevelWeight: 10
    },
    targetGrades: [
      { subject: 'Biology', target: 'A1/B2 target', basis: 'CarEdPath target based on OAU 10-point O\'Level calculation (A1=2.0 pts)', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'A1/B2 target', basis: 'CarEdPath target based on OAU 10-point O\'Level calculation', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B2+ target', basis: 'CarEdPath target based on OAU 10-point O\'Level calculation', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B2+ target', basis: 'CarEdPath target based on OAU 10-point O\'Level calculation', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B2+ target', basis: 'CarEdPath target based on OAU 10-point O\'Level calculation', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '280+',
    targetPostUtme: '32+ / 40',
    sources: [
      { title: 'OAU Admissions Portal (admissions.oauife.edu.ng)', url: 'https://admissions.oauife.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'JAMB IBASS (OAU College of Health Sciences)', type: 'JAMB IBASS Brochure', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If OAU aggregate is under 78.00:',
      options: [
        'Explore Medical Rehabilitation (Physiotherapy / Occupational Therapy) at OAU',
        'Check catchment quotas for Osun, Oyo, Ogun, Ondo, Ekiti, Lagos states',
        'Explore Nursing Science at OAU'
      ]
    }
  },

  'medicine-surgery-abu': {
    id: 'medicine-surgery-abu',
    institutionId: 'abu',
    institution: 'Ahmadu Bello University',
    institutionShortName: 'ABU',
    programme: 'Medicine & Surgery',
    degree: 'MBBS (6 Years)',
    faculty: 'Faculty of Clinical Sciences',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Biology', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' }
    ],
    olevelSittings: '1 sitting strictly preferred for MBBS',
    utmeSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '275+ UTME (Merit Benchmark) / 240+ (Catchment/ELDS)',
      session: '2025/2026',
      category: 'Departmental Cut-Off Benchmark'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100)',
    postUtmeBenchmark: '70+ / 100',
    aggregateFormula: {
      name: 'ABU 50:50 CBT Screening Formula',
      description: 'UTME 50% + Post-UTME CBT 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Biology', target: 'B2+ target', basis: 'CarEdPath target for competitive clinical standing', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B2+ target', basis: 'CarEdPath target for competitive clinical standing', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B3+ target', basis: 'CarEdPath target for competitive clinical standing', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for competitive clinical standing', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B3+ target', basis: 'CarEdPath target for competitive clinical standing', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '275+',
    targetPostUtme: '72+ / 100',
    sources: [
      { title: 'ABU Zaria Academic Affairs & Portal (abu.edu.ng)', url: 'https://abu.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'JAMB IBASS (Faculty of Clinical Sciences, ABU)', type: 'JAMB IBASS Brochure', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If ABU score is between 220–250:',
      options: [
        'Explore Northern catchment/ELDS admission quotas at ABU Zaria',
        'Consider Human Physiology or Medical Biochemistry at ABU',
        'Consider Nursing Science or Medical Laboratory Science'
      ]
    }
  },

  'medicine-surgery-unn': {
    id: 'medicine-surgery-unn',
    institutionId: 'unn',
    institution: 'University of Nigeria, Nsukka',
    institutionShortName: 'UNN',
    programme: 'Medicine & Surgery',
    degree: 'MBBS (6 Years)',
    faculty: 'College of Medicine (Enugu Campus)',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Biology', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' }
    ],
    olevelSittings: '1 sitting strictly preferred for MBBS',
    utmeSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '305+ Combined Average (Merit) / 285+ (Catchment)',
      session: '2025/2026',
      category: 'Departmental Combined Average Benchmark'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '180 / 400 (45%)',
    postUtmeBenchmark: '290+ / 400 (72.5%)',
    aggregateFormula: {
      name: 'UNN Combined Average Model',
      description: '(UTME Score + Post-UTME CBT Score) ÷ 2 = Combined Score out of 400',
      formulaExplanation: 'UNN adds your UTME score (out of 400) to your Post-UTME score (out of 400) and divides by 2 to determine the departmental cut-off placement.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Biology', target: 'B2+ target', basis: 'CarEdPath target for competitive standing', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B2+ target', basis: 'CarEdPath target for competitive standing', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B3+ target', basis: 'CarEdPath target for competitive standing', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for competitive standing', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B3+ target', basis: 'CarEdPath target for competitive standing', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '285+',
    targetPostUtme: '290+ / 400 (72.5%+)',
    sources: [
      { title: 'UNN Admissions Office (unn.edu.ng)', url: 'https://unn.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'JAMB IBASS (UNN College of Medicine)', type: 'JAMB IBASS Brochure', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If combined average is under 290:',
      options: [
        'Explore Medical Laboratory Science (B.MLS) at UNN (benchmark ~260+)',
        'Explore Medical Rehabilitation / Physiotherapy at UNN Enugu Campus',
        'Explore Medical Radiography at UNN'
      ]
    }
  },

  'medicine-surgery-unilorin': {
    id: 'medicine-surgery-unilorin',
    institutionId: 'unilorin',
    institution: 'University of Ilorin',
    institutionShortName: 'UNILORIN',
    programme: 'Medicine & Surgery',
    degree: 'MBBS (6 Years)',
    faculty: 'College of Health Sciences',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Biology', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' }
    ],
    olevelSittings: '1 sitting strictly required',
    utmeSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '81.50 Aggregate Benchmark (Catchment: 76.00)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100)',
    postUtmeBenchmark: '78+ / 100',
    aggregateFormula: {
      name: 'UNILORIN 50:50 Aggregate Formula',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Biology', target: 'B2+ target', basis: 'CarEdPath target for clinical admission competitiveness', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B2+ target', basis: 'CarEdPath target for clinical admission competitiveness', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B3+ target', basis: 'CarEdPath target for clinical admission competitiveness', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for clinical admission competitiveness', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B3+ target', basis: 'CarEdPath target for clinical admission competitiveness', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '280+',
    targetPostUtme: '78+ / 100',
    sources: [
      { title: 'UNILORIN Portal & Academic Board (uilugportal.unilorin.edu.ng)', url: 'https://unilorin.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'JAMB IBASS (UNILORIN College of Health Sciences)', type: 'JAMB IBASS Brochure', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNILORIN aggregate is under 78.00:',
      options: [
        'Explore Medical Laboratory Science (B.MLS) at UNILORIN (cut-off ~71.00)',
        'Explore Human Anatomy or Physiology at UNILORIN',
        'Explore Nursing Science at UNILORIN (cut-off ~74.00)'
      ]
    }
  },

  // =========================================================================
  // 2. MEDICAL LABORATORY SCIENCE (B.MLS)
  // =========================================================================
  'medical-lab-science-unilag': {
    id: 'medical-lab-science-unilag',
    institutionId: 'unilag',
    institution: 'University of Lagos',
    institutionShortName: 'UNILAG',
    programme: 'Medical Laboratory Science',
    degree: 'B.MLS (5 Years)',
    faculty: 'College of Medicine / Allied Health Sciences',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Biology', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' }
    ],
    olevelSittings: '1 sitting strictly preferred for College of Medicine',
    utmeSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '75.25 Merit Aggregate (Catchment: 68.50 – 72.00)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '15 / 30 (50% in UNILAG Post-UTME CBT)',
    postUtmeBenchmark: '21+ / 30 (70%+)',
    aggregateFormula: {
      name: 'UNILAG 50:30:20 Aggregate Model',
      description: 'UTME 50% + Post-UTME 30% + O\'Level 20%',
      formulaExplanation: 'UTME ÷ 8 + Post-UTME (out of 30) + O\'Level grades (A1=4.0, B2=3.6, B3=3.2, C4=2.8, C5=2.4, C6=2.0).',
      utmeWeight: 50,
      postUtmeWeight: 30,
      olevelWeight: 20
    },
    targetGrades: [
      { subject: 'Biology', target: 'B3+ target', basis: 'CarEdPath target for competitive B.MLS aggregate', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B3+ target', basis: 'CarEdPath target for competitive B.MLS aggregate', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'C4+ target', basis: 'CarEdPath target for competitive B.MLS aggregate', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for competitive B.MLS aggregate', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'C4+ target', basis: 'CarEdPath target for competitive B.MLS aggregate', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '250+',
    targetPostUtme: '21+ / 30 (70%+)',
    sources: [
      { title: 'UNILAG Admissions Committee Bulletins', url: 'https://admissions.unilag.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Medical Laboratory Science Council of Nigeria (MLSCN) Regulations', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNILAG aggregate is below 70.00:',
      options: [
        'Amina\'s Track: 2-year National Diploma in Science Laboratory Tech (SLT) at YABATECH → Direct Entry to 200L B.MLS',
        'Switch to Biochemistry or Cell Biology & Genetics at UNILAG',
        'Consider State University B.MLS (e.g. LASU or EKSU)'
      ]
    }
  },

  'medical-lab-science-unilorin': {
    id: 'medical-lab-science-unilorin',
    institutionId: 'unilorin',
    institution: 'University of Ilorin',
    institutionShortName: 'UNILORIN',
    programme: 'Medical Laboratory Science',
    degree: 'B.MLS (5 Years)',
    faculty: 'Faculty of Basic Medical Sciences',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Biology', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' }
    ],
    olevelSittings: '1 or 2 sittings accepted with 5 credits',
    utmeSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
    utmeMinimum: 180,
    recentCutoff: {
      score: '71.50 Aggregate Benchmark',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100)',
    postUtmeBenchmark: '68+ / 100',
    aggregateFormula: {
      name: 'UNILORIN 50:50 Aggregate Formula',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Biology', target: 'B3+ target', basis: 'CarEdPath target for diagnostic science preparedness', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B3+ target', basis: 'CarEdPath target for clinical chemistry', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'C4+ target', basis: 'CarEdPath target for biophysics', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for academic communication', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'C4+ target', basis: 'CarEdPath target for statistical laboratory analysis', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '245+',
    targetPostUtme: '68+ / 100',
    sources: [
      { title: 'UNILORIN Academic Portal (unilorin.edu.ng)', url: 'https://unilorin.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'MLSCN Approved Training Institutions Roster', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNILORIN score is under 220:',
      options: [
        'ND in Science Laboratory Technology at Federal Poly Offa → Direct Entry to 200L B.MLS at UNILORIN',
        'Switch to Biochemistry or Microbiology at UNILORIN',
        'Explore KWASU (Kwara State University) Medical Lab Science'
      ]
    }
  },

  // =========================================================================
  // 3. NURSING SCIENCE (B.N.Sc)
  // =========================================================================
  'nursing-science-unilag': {
    id: 'nursing-science-unilag',
    institutionId: 'unilag',
    institution: 'University of Lagos',
    institutionShortName: 'UNILAG',
    programme: 'Nursing Science',
    degree: 'B.N.Sc (5 Years)',
    faculty: 'College of Medicine / Faculty of Clinical Sciences',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Biology', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' }
    ],
    olevelSittings: 'Strictly 1 sitting required for College of Medicine',
    utmeSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '77.85 Merit Aggregate (Catchment: 71.00 – 74.50)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '15 / 30 (50% in UNILAG Post-UTME CBT)',
    postUtmeBenchmark: '22+ / 30 (73%+)',
    aggregateFormula: {
      name: 'UNILAG 50:30:20 Aggregate Model',
      description: 'UTME 50% + Post-UTME 30% + O\'Level 20%',
      formulaExplanation: 'UTME ÷ 8 + Post-UTME (out of 30) + O\'Level points (A1=4.0, B2=3.6, B3=3.2, C4=2.8, C5=2.4, C6=2.0).',
      utmeWeight: 50,
      postUtmeWeight: 30,
      olevelWeight: 20
    },
    targetGrades: [
      { subject: 'Biology', target: 'B2+ target', basis: 'CarEdPath target for competitive clinical nursing aggregate', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B2+ target', basis: 'CarEdPath target for pharmacology & pathophysiology', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B3+ target', basis: 'CarEdPath target for clinical equipment', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for patient communication', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B3+ target', basis: 'CarEdPath target for drug dosage calculations', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '265+',
    targetPostUtme: '22+ / 30 (73%+)',
    sources: [
      { title: 'UNILAG Admissions Board Official Bulletin', url: 'https://admissions.unilag.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Nursing and Midwifery Council of Nigeria (NMCN) Accreditation List', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If score is under 240:',
      options: [
        'Apply to Lagos State College of Nursing (LASCON, Igando) for 3-year Registered Nurse (RN) licensure',
        'Explore Public Health (B.Sc) at accredited federal universities',
        'Consider College of Nursing Sciences at federal teaching hospitals (LUTH College of Nursing)'
      ]
    }
  },

  'nursing-science-ui': {
    id: 'nursing-science-ui',
    institutionId: 'ui',
    institution: 'University of Ibadan',
    institutionShortName: 'UI',
    programme: 'Nursing Science',
    degree: 'B.N.Sc (5 Years)',
    faculty: 'Faculty of Clinical Sciences',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Biology', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' }
    ],
    olevelSittings: '1 sitting strictly required',
    utmeSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '74.50 Merit Aggregate',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100)',
    postUtmeBenchmark: '72+ / 100',
    aggregateFormula: {
      name: 'UI 50:50 Aggregate Model',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Biology', target: 'B2+ target', basis: 'CarEdPath target for clinical readiness', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B2+ target', basis: 'CarEdPath target for pharmacology', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B3+ target', basis: 'CarEdPath target for medical physics', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for patient rapport', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B3+ target', basis: 'CarEdPath target for clinical calculation', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '265+',
    targetPostUtme: '72+ / 100',
    sources: [
      { title: 'UI Undergraduate Admissions (ui.edu.ng)', url: 'https://admissions.ui.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'NMCN Nursing Standards Board', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UI Nursing aggregate is below 70.00:',
      options: [
        'UCH Ibadan College of Nursing Sciences for Registered Nurse (RN) diploma',
        'Explore Human Nutrition & Dietetics at UI',
        'Apply for Direct Entry later using RN diploma into 200L/300L B.N.Sc'
      ]
    }
  },

  'nursing-science-unilorin': {
    id: 'nursing-science-unilorin',
    institutionId: 'unilorin',
    institution: 'University of Ilorin',
    institutionShortName: 'UNILORIN',
    programme: 'Nursing Science',
    degree: 'B.N.Sc (5 Years)',
    faculty: 'Faculty of Clinical Sciences / Nursing Science',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Biology', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' }
    ],
    olevelSittings: '1 sitting strictly required',
    utmeSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
    utmeMinimum: 220,
    recentCutoff: {
      score: '74.50 Aggregate Benchmark (Catchment: 69.50)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100 in UNILORIN CBT)',
    postUtmeBenchmark: '74+ / 100',
    aggregateFormula: {
      name: 'UNILORIN 50:50 Aggregate Formula',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Biology', target: 'B2+ target', basis: 'CarEdPath target for clinical nursing admission competitiveness', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B2+ target', basis: 'CarEdPath target for clinical nursing admission competitiveness', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B3+ target', basis: 'CarEdPath target for clinical nursing admission competitiveness', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for clinical nursing admission competitiveness', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B3+ target', basis: 'CarEdPath target for clinical nursing admission competitiveness', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '265+',
    targetPostUtme: '74+ / 100',
    sources: [
      { title: 'UNILORIN Academic Affairs & Admissions Portal (uilugportal.unilorin.edu.ng)', url: 'https://unilorin.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'JAMB IBASS (UNILORIN Nursing Science Departmental Requirements)', type: 'JAMB IBASS Brochure', verifiedDate: 'September 2026' },
      { title: 'Nursing and Midwifery Council of Nigeria (NMCN) Accreditation Records', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNILORIN aggregate is under 74.00:',
      options: [
        'Explore Medical Laboratory Science at UNILORIN (cut-off ~71.00)',
        'Explore Human Physiology or Anatomy at UNILORIN',
        'State College of Nursing Ilorin or Oke-Ode (RN track with subsequent B.N.Sc Direct Entry)'
      ]
    }
  },

  // =========================================================================
  // 4. PHARMACY (Pharm.D)
  // =========================================================================
  'pharmacy-unilag': {
    id: 'pharmacy-unilag',
    institutionId: 'unilag',
    institution: 'University of Lagos',
    institutionShortName: 'UNILAG',
    programme: 'Pharmacy',
    degree: 'Doctor of Pharmacy (Pharm.D - 6 Years)',
    faculty: 'Faculty of Pharmacy',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Biology', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' }
    ],
    olevelSittings: 'Strictly 1 sitting required for Faculty of Pharmacy',
    utmeSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '78.50 Merit Aggregate (Catchment: 72.00 – 75.50)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '15 / 30 (50% in UNILAG Post-UTME CBT)',
    postUtmeBenchmark: '22+ / 30 (73%+)',
    aggregateFormula: {
      name: 'UNILAG 50:30:20 Aggregate Model',
      description: 'UTME 50% + Post-UTME 30% + O\'Level 20%',
      formulaExplanation: 'UTME ÷ 8 + Post-UTME (out of 30) + O\'Level points (A1=4.0, B2=3.6, B3=3.2, C4=2.8, C5=2.4, C6=2.0).',
      utmeWeight: 50,
      postUtmeWeight: 30,
      olevelWeight: 20
    },
    targetGrades: [
      { subject: 'Biology', target: 'B2+ target', basis: 'CarEdPath target for pharmacognosy & physiology', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B2+ target', basis: 'CarEdPath target for pharmaceutical & organic chemistry', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B3+ target', basis: 'CarEdPath target for physical pharmacy', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for professional pharmaceutical communication', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B3+ target', basis: 'CarEdPath target for posology & dispensing calculation', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '270+',
    targetPostUtme: '22+ / 30 (73%+)',
    sources: [
      { title: 'UNILAG Faculty of Pharmacy Official Handbook', url: 'https://admissions.unilag.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Pharmacy Council of Nigeria (PCN) Pharm.D Benchmark Guidelines', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If score is below 250:',
      options: [
        'Explore Pharmacology & Therapeutics (B.Sc) at UNILAG College of Medicine',
        'Explore Industrial Chemistry or Biochemistry at UNILAG',
        'Consider state university pharmacy faculties (e.g. OOU)'
      ]
    }
  },

  'pharmacy-ui': {
    id: 'pharmacy-ui',
    institutionId: 'ui',
    institution: 'University of Ibadan',
    institutionShortName: 'UI',
    programme: 'Pharmacy',
    degree: 'Doctor of Pharmacy (Pharm.D - 6 Years)',
    faculty: 'Faculty of Pharmacy',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Biology', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' }
    ],
    olevelSittings: '1 sitting strictly required',
    utmeSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '75.25 Merit Aggregate',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100)',
    postUtmeBenchmark: '72+ / 100',
    aggregateFormula: {
      name: 'UI 50:50 Aggregate Model',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Biology', target: 'B2+ target', basis: 'CarEdPath target for pharmacognosy', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B2+ target', basis: 'CarEdPath target for pharmaceutical chemistry', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B3+ target', basis: 'CarEdPath target for pharmaceutical technology', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for professional consultation', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B3+ target', basis: 'CarEdPath target for quantitative formulation', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '270+',
    targetPostUtme: '72+ / 100',
    sources: [
      { title: 'UI Undergraduate Admissions (ui.edu.ng)', url: 'https://admissions.ui.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Pharmacy Council of Nigeria (PCN)', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UI aggregate is under 72.00:',
      options: [
        'Explore Pharmacology at UI Faculty of Basic Medical Sciences',
        'Explore Industrial Chemistry or Biochemistry at UI',
        'Consider other PCN-accredited federal universities (e.g. UNIBEN, OAU, UNN)'
      ]
    }
  },

  'pharmacy-unilorin': {
    id: 'pharmacy-unilorin',
    institutionId: 'unilorin',
    institution: 'University of Ilorin',
    institutionShortName: 'UNILORIN',
    programme: 'Pharmacy',
    degree: 'Pharm.D (6 Years)',
    faculty: 'Faculty of Pharmaceutical Sciences',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Biology', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' }
    ],
    olevelSittings: '1 sitting strictly required',
    utmeSubjects: ['English Language', 'Biology', 'Chemistry', 'Physics'],
    utmeMinimum: 220,
    recentCutoff: {
      score: '76.25 Aggregate Benchmark (Catchment: 71.00)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100 in UNILORIN CBT)',
    postUtmeBenchmark: '75+ / 100',
    aggregateFormula: {
      name: 'UNILORIN 50:50 Aggregate Formula',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Chemistry', target: 'A1/B2 target', basis: 'CarEdPath target for pharmaceutical sciences', statusLabel: 'CarEdPath target' },
      { subject: 'Biology', target: 'B2+ target', basis: 'CarEdPath target for pharmaceutical sciences', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B3+ target', basis: 'CarEdPath target for pharmaceutical sciences', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for pharmaceutical sciences', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B3+ target', basis: 'CarEdPath target for pharmaceutical sciences', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '270+',
    targetPostUtme: '75+ / 100',
    sources: [
      { title: 'UNILORIN Faculty of Pharmaceutical Sciences Portal', url: 'https://unilorin.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Pharmacy Council of Nigeria (PCN) Quota Allocation Register', type: 'Regulatory Council', verifiedDate: 'September 2026' },
      { title: 'JAMB IBASS (UNILORIN Pharmacy Prerequisites)', type: 'JAMB IBASS Brochure', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNILORIN aggregate is under 75.00:',
      options: [
        'Explore Pharmacology at UNILORIN (B.Sc)',
        'Explore Biochemistry or Industrial Chemistry at UNILORIN',
        'Explore Medical Laboratory Science at UNILORIN'
      ]
    }
  },

  // =========================================================================
  // 5. COMPUTER SCIENCE (B.Sc)
  // =========================================================================
  'computer-science-unilag': {
    id: 'computer-science-unilag',
    institutionId: 'unilag',
    institution: 'University of Lagos',
    institutionShortName: 'UNILAG',
    programme: 'Computer Science',
    degree: 'B.Sc Computer Science (4 Years)',
    faculty: 'Faculty of Science',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Further Maths or Computer Studies or Biology'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Further Maths or Computer Studies', minGrade: 'C6' }
    ],
    olevelSittings: '1 or 2 sittings accepted with 5 credits',
    utmeSubjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '80.15 Merit Aggregate (Catchment: 74.00 – 77.50)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '15 / 30 (50% in UNILAG Post-UTME CBT)',
    postUtmeBenchmark: '23+ / 30 (76%+)',
    aggregateFormula: {
      name: 'UNILAG 50:30:20 Aggregate Model',
      description: 'UTME 50% + Post-UTME 30% + O\'Level 20%',
      formulaExplanation: 'UTME ÷ 8 + Post-UTME (out of 30) + O\'Level points (A1=4.0, B2=3.6, B3=3.2, C4=2.8, C5=2.4, C6=2.0).',
      utmeWeight: 50,
      postUtmeWeight: 30,
      olevelWeight: 20
    },
    targetGrades: [
      { subject: 'Mathematics', target: 'A1/B2 target', basis: 'CarEdPath target for discrete mathematics & algorithms', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B2+ target', basis: 'CarEdPath target for hardware architectures & electronics', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B3+ target', basis: 'CarEdPath target for science faculty prerequisite', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for technical documentation', statusLabel: 'CarEdPath target' },
      { subject: 'Further Maths / Computer Studies', target: 'B3+ target', basis: 'CarEdPath target for algorithmic logic', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '275+',
    targetPostUtme: '23+ / 30 (76%+)',
    sources: [
      { title: 'UNILAG Faculty of Science Prospectus', url: 'https://admissions.unilag.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Computer Professionals Registration Council of Nigeria (CPN)', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If aggregate falls between 68.00–76.00:',
      options: [
        'Explore ND in Computer Science at YABATECH (Upper Credit) → Direct Entry to 200L university',
        'Switch to Systems Engineering or Mathematics/Statistics at UNILAG',
        'Pair self-taught tech certifications (3MTT, ALX, She Code Africa) with any STEM degree'
      ]
    }
  },

  'computer-science-futa': {
    id: 'computer-science-futa',
    institutionId: 'futa',
    institution: 'Federal University of Technology, Akure',
    institutionShortName: 'FUTA',
    programme: 'Computer Science',
    degree: 'B.Tech Computer Science (5 Years)',
    faculty: 'School of Computing (SOC)',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology / Agricultural Science / Further Maths'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Biology / Further Maths', minGrade: 'C6' }
    ],
    olevelSittings: '1 or 2 sittings accepted with 5 credits',
    utmeSubjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '72.75 Merit Aggregate',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100)',
    postUtmeBenchmark: '70+ / 100',
    aggregateFormula: {
      name: 'FUTA 50:50 Screening Aggregate Formula',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Mathematics', target: 'B2+ target', basis: 'CarEdPath target for computational theory at FUTA', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B2+ target', basis: 'CarEdPath target for computer architecture', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B3+ target', basis: 'CarEdPath target for technical foundation', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for technical communication', statusLabel: 'CarEdPath target' },
      { subject: 'Further Maths / Biology', target: 'B3+ target', basis: 'CarEdPath target for algorithmic reasoning', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '260+',
    targetPostUtme: '70+ / 100',
    sources: [
      { title: 'FUTA Admissions Portal (futa.edu.ng)', url: 'https://futa.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'JAMB IBASS (FUTA School of Computing)', type: 'JAMB IBASS Brochure', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If FUTA aggregate is under 70.00:',
      options: [
        'Explore Information Technology or Cyber Security at FUTA School of Computing',
        'Explore Software Engineering at FUTA',
        'Explore Computer Engineering at FUTA School of Engineering & Engineering Technology'
      ]
    }
  },

  'computer-science-unilorin': {
    id: 'computer-science-unilorin',
    institutionId: 'unilorin',
    institution: 'University of Ilorin',
    institutionShortName: 'UNILORIN',
    programme: 'Computer Science',
    degree: 'B.Sc (4 Years)',
    faculty: 'Faculty of Communication & Information Sciences (CIS)',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology / Computer Studies'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Biology / Computer Studies', minGrade: 'C6' }
    ],
    olevelSittings: 'Maximum 2 sittings accepted',
    utmeSubjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry or Biology'],
    utmeMinimum: 210,
    recentCutoff: {
      score: '72.00 Aggregate Benchmark (Catchment: 66.50)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100 in UNILORIN CBT)',
    postUtmeBenchmark: '72+ / 100',
    aggregateFormula: {
      name: 'UNILORIN 50:50 Aggregate Formula',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Mathematics', target: 'B2+ target', basis: 'CarEdPath target for algorithmic computing', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B2+ target', basis: 'CarEdPath target for computing systems', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for tech communications', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B3+ target', basis: 'CarEdPath target for foundational science', statusLabel: 'CarEdPath target' },
      { subject: 'Biology / Computer Studies', target: 'B3+ target', basis: 'CarEdPath target for elective credit', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '260+',
    targetPostUtme: '72+ / 100',
    sources: [
      { title: 'UNILORIN Faculty of CIS Portal (cis.unilorin.edu.ng)', url: 'https://unilorin.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Computer Professionals Registration Council of Nigeria (CPN)', type: 'Regulatory Council', verifiedDate: 'September 2026' },
      { title: 'JAMB IBASS (UNILORIN Computer Science)', type: 'JAMB IBASS Brochure', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNILORIN aggregate is under 71.00:',
      options: [
        'Explore Information & Communication Science (ICS) at UNILORIN (CIS Faculty)',
        'Explore Telecommunication Science at UNILORIN',
        'National Diploma in Computer Science at Kwara State Poly or Federal Poly Offa for 200L Direct Entry'
      ]
    }
  },

  // =========================================================================
  // 6. ENGINEERING (B.Eng / B.Tech)
  // =========================================================================
  'engineering-unilag': {
    id: 'engineering-unilag',
    institutionId: 'unilag',
    institution: 'University of Lagos',
    institutionShortName: 'UNILAG',
    programme: 'Mechanical Engineering',
    degree: 'B.Sc / B.Eng Mechanical Engineering (5 Years)',
    faculty: 'Faculty of Engineering',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Further Maths or Technical Drawing'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Further Maths / Tech Drawing', minGrade: 'C6' }
    ],
    olevelSittings: '1 or 2 sittings accepted with 5 credits',
    utmeSubjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '81.25 Merit Aggregate (Catchment: 74.50 – 78.00)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '15 / 30 (50% in UNILAG Post-UTME CBT)',
    postUtmeBenchmark: '23+ / 30 (76%+)',
    aggregateFormula: {
      name: 'UNILAG 50:30:20 Aggregate Model',
      description: 'UTME 50% + Post-UTME 30% + O\'Level 20%',
      formulaExplanation: 'UTME ÷ 8 + Post-UTME (out of 30) + O\'Level points (A1=4.0, B2=3.6, B3=3.2, C4=2.8, C5=2.4, C6=2.0).',
      utmeWeight: 50,
      postUtmeWeight: 30,
      olevelWeight: 20
    },
    targetGrades: [
      { subject: 'Mathematics', target: 'A1/B2 target', basis: 'CarEdPath target for engineering calculus', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'A1/B2 target', basis: 'CarEdPath target for thermodynamics & applied mechanics', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B3+ target', basis: 'CarEdPath target for materials science', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for technical report writing', statusLabel: 'CarEdPath target' },
      { subject: 'Further Maths / Tech Drawing', target: 'B3+ target', basis: 'CarEdPath target for engineering drafting & vector mechanics', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '275+',
    targetPostUtme: '23+ / 30 (76%+)',
    sources: [
      { title: 'UNILAG Faculty of Engineering Prospectus', url: 'https://admissions.unilag.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Council for the Regulation of Engineering in Nigeria (COREN) Accreditation Register', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNILAG aggregate is under 77.00:',
      options: [
        'Explore Metallurgical & Materials Engineering or Marine Engineering at UNILAG',
        'National Diploma in Mechanical Engineering from YABATECH (Upper Credit) → Direct Entry to 200L',
        'Explore Biomedical Engineering or Surveying & Geoinformatics at UNILAG'
      ]
    }
  },

  'engineering-futa': {
    id: 'engineering-futa',
    institutionId: 'futa',
    institution: 'Federal University of Technology, Akure',
    institutionShortName: 'FUTA',
    programme: 'Mechanical Engineering',
    degree: 'B.Eng Mechanical Engineering (5 Years)',
    faculty: 'School of Engineering & Engineering Technology (SEET)',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Technical Drawing / Further Maths'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Technical Drawing / Further Maths', minGrade: 'C6' }
    ],
    olevelSittings: '1 or 2 sittings accepted with 5 credits',
    utmeSubjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '71.25 Merit Aggregate',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100)',
    postUtmeBenchmark: '68+ / 100',
    aggregateFormula: {
      name: 'FUTA 50:50 Screening Aggregate Formula',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Mathematics', target: 'B2+ target', basis: 'CarEdPath target for engineering analysis', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B2+ target', basis: 'CarEdPath target for mechanics & dynamics', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B3+ target', basis: 'CarEdPath target for materials chemistry', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for technical documentation', statusLabel: 'CarEdPath target' },
      { subject: 'Further Maths / Tech Drawing', target: 'B3+ target', basis: 'CarEdPath target for design drafting', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '255+',
    targetPostUtme: '68+ / 100',
    sources: [
      { title: 'FUTA School of Engineering Prospectus', url: 'https://futa.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'COREN Official Accreditation Register', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If FUTA engineering aggregate is under 68.00:',
      options: [
        'Explore Industrial & Production Engineering or Agricultural Engineering at FUTA',
        'Explore Materials & Metallurgical Engineering at FUTA',
        'Consider Polytechnic ND with Direct Entry into 200L B.Eng'
      ]
    }
  },

  'engineering-unilorin': {
    id: 'engineering-unilorin',
    institutionId: 'unilorin',
    institution: 'University of Ilorin',
    institutionShortName: 'UNILORIN',
    programme: 'Engineering (Mechanical / Electrical / Civil / Biomedical)',
    degree: 'B.Eng (5 Years)',
    faculty: 'Faculty of Engineering & Technology',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Technical Drawing / Further Maths'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Technical Drawing / Further Maths', minGrade: 'C6' }
    ],
    olevelSittings: 'Maximum 2 sittings accepted',
    utmeSubjects: ['English Language', 'Mathematics', 'Physics', 'Chemistry'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '71.50 Aggregate Benchmark (Catchment: 66.00)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100 in UNILORIN CBT)',
    postUtmeBenchmark: '70+ / 100',
    aggregateFormula: {
      name: 'UNILORIN 50:50 Aggregate Formula',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Mathematics', target: 'B2+ target', basis: 'CarEdPath target for engineering mathematics', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B2+ target', basis: 'CarEdPath target for mechanics and electromagnetism', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B3+ target', basis: 'CarEdPath target for materials chemistry', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for engineering documentation', statusLabel: 'CarEdPath target' },
      { subject: 'Technical Drawing / Further Maths', target: 'B3+ target', basis: 'CarEdPath target for spatial modeling', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '255+',
    targetPostUtme: '70+ / 100',
    sources: [
      { title: 'UNILORIN Faculty of Engineering & Technology Portal', url: 'https://unilorin.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Council for the Regulation of Engineering in Nigeria (COREN)', type: 'Regulatory Council', verifiedDate: 'September 2026' },
      { title: 'JAMB IBASS (UNILORIN Engineering Faculty)', type: 'JAMB IBASS Brochure', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNILORIN aggregate is under 70.00:',
      options: [
        'Explore Agricultural and Biosystems Engineering at UNILORIN',
        'Explore Materials & Metallurgical Engineering at UNILORIN',
        'National Diploma in Engineering at Federal Poly Offa with 200L Direct Entry transfer'
      ]
    }
  },

  // =========================================================================
  // 7. LAW (LL.B) - Regulated by Council of Legal Education (CLE) & NBA
  // =========================================================================
  'law-unilag': {
    id: 'law-unilag',
    institutionId: 'unilag',
    institution: 'University of Lagos',
    institutionShortName: 'UNILAG',
    programme: 'Law',
    degree: 'Bachelor of Laws (LL.B, 5 Years)',
    faculty: 'Faculty of Law',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Literature-in-English', 'Mathematics', 'Government', 'CRS or IRS'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Literature-in-English', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Government', minGrade: 'C6' },
      { subject: 'CRS or IRS', minGrade: 'C6' }
    ],
    olevelSittings: '1 sitting strictly required (UNILAG Faculty of Law single-sitting rule)',
    utmeSubjects: ['English Language', 'Literature-in-English', 'Government', 'CRS or IRS'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '79.25 Merit Aggregate (Catchment: 73.00 – 76.50)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '15 / 30 (50% in UNILAG Post-UTME CBT)',
    postUtmeBenchmark: '23+ / 30 (76%+)',
    aggregateFormula: {
      name: 'UNILAG 50:30:20 Aggregate Model',
      description: 'UTME 50% + Post-UTME 30% + O\'Level 20%',
      formulaExplanation: 'UTME ÷ 8 + Post-UTME (out of 30) + O\'Level points (A1=4.0, B2=3.6, B3=3.2, C4=2.8, C5=2.4, C6=2.0).',
      utmeWeight: 50,
      postUtmeWeight: 30,
      olevelWeight: 20
    },
    targetGrades: [
      { subject: 'English Language', target: 'A1/B2 target', basis: 'CarEdPath target for legal drafting & argumentation', statusLabel: 'CarEdPath target' },
      { subject: 'Literature-in-English', target: 'A1/B2 target', basis: 'CarEdPath target for statutory textual analysis', statusLabel: 'CarEdPath target' },
      { subject: 'Government', target: 'B2+ target', basis: 'CarEdPath target for constitutional law fundamentals', statusLabel: 'CarEdPath target' },
      { subject: 'CRS or IRS', target: 'B2+ target', basis: 'CarEdPath target for jurisprudence ethics', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B3+ target', basis: 'CarEdPath target for analytical reasoning', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '280+',
    targetPostUtme: '23+ / 30 (76%+)',
    sources: [
      { title: 'UNILAG Faculty of Law Prospectus & Admissions Brochure', url: 'https://law.unilag.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Council of Legal Education (CLE) Accreditation Quota List', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNILAG Law aggregate is under 75.00:',
      options: [
        'Explore Criminology & Security Studies or Political Science at UNILAG Faculty of Social Sciences',
        'Consider 2-Year Diploma in Law at state universities (LASU, OOU) with Direct Entry into 200L LL.B',
        'Explore Philosophy or History & Strategic Studies with a view to graduate law entry'
      ]
    }
  },

  'law-ui': {
    id: 'law-ui',
    institutionId: 'ui',
    institution: 'University of Ibadan',
    institutionShortName: 'UI',
    programme: 'Law',
    degree: 'Bachelor of Laws (LL.B, 5 Years)',
    faculty: 'Faculty of Law',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Literature-in-English', 'Mathematics', 'Government', 'CRS or IRS or Economics'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Literature-in-English', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Government', minGrade: 'C6' },
      { subject: 'CRS or IRS or Economics', minGrade: 'C6' }
    ],
    olevelSittings: '1 sitting strictly required by UI Faculty of Law',
    utmeSubjects: ['English Language', 'Literature-in-English', 'Government', 'CRS or IRS or Economics'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '76.50 Merit Aggregate (Catchment: 71.00 – 74.00)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100 in UI Post-UTME CBT)',
    postUtmeBenchmark: '74+ / 100',
    aggregateFormula: {
      name: 'UI 50:50 Composite Screening Model',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'English Language', target: 'A1/B2 target', basis: 'CarEdPath target for legal literacy & advocacy', statusLabel: 'CarEdPath target' },
      { subject: 'Literature-in-English', target: 'A1/B2 target', basis: 'CarEdPath target for critical reading & analysis', statusLabel: 'CarEdPath target' },
      { subject: 'Government', target: 'B2+ target', basis: 'CarEdPath target for civic institutions', statusLabel: 'CarEdPath target' },
      { subject: 'CRS or IRS or Economics', target: 'B2+ target', basis: 'CarEdPath target for jurisprudence', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B3+ target', basis: 'CarEdPath target for general computational competence', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '280+',
    targetPostUtme: '74+ / 100',
    sources: [
      { title: 'University of Ibadan Admissions Office (admissions.ui.edu.ng)', url: 'https://admissions.ui.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'CLE Law Accreditation Register', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UI Law aggregate is under 72.00:',
      options: [
        'Explore Political Science or Sociology at UI Faculty of the Social Sciences',
        'Explore Communication & Language Arts (CLA) at UI Faculty of Arts',
        'Consider transfer to accredited state university law faculties with lower cutoff benchmarks'
      ]
    }
  },

  'law-oau': {
    id: 'law-oau',
    institutionId: 'oau',
    institution: 'Obafemi Awolowo University',
    institutionShortName: 'OAU',
    programme: 'Law',
    degree: 'Bachelor of Laws (LL.B, 5 Years)',
    faculty: 'Faculty of Law',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Literature-in-English', 'Mathematics', 'Government', 'CRS or IRS'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Literature-in-English', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Government', minGrade: 'C6' },
      { subject: 'CRS or IRS', minGrade: 'C6' }
    ],
    olevelSittings: '1 or 2 sittings accepted with 5 credits',
    utmeSubjects: ['English Language', 'Literature-in-English', 'Government', 'CRS or IRS'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '77.20 Merit Aggregate',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '20 / 40 in OAU Post-UTME Screening',
    postUtmeBenchmark: '32+ / 40',
    aggregateFormula: {
      name: 'OAU 50:40:10 Aggregate Formula',
      description: 'UTME 50% + Post-UTME 40% + O\'Level 10%',
      formulaExplanation: 'UTME score ÷ 8 (max 50) + Post-UTME screening score (max 40) + O\'Level points (max 10).',
      utmeWeight: 50,
      postUtmeWeight: 40,
      olevelWeight: 10
    },
    targetGrades: [
      { subject: 'English Language', target: 'A1/B2 target', basis: 'CarEdPath target for legal discourse', statusLabel: 'CarEdPath target' },
      { subject: 'Literature-in-English', target: 'A1/B2 target', basis: 'CarEdPath target for statutory interpretation', statusLabel: 'CarEdPath target' },
      { subject: 'Government', target: 'B2+ target', basis: 'CarEdPath target for constitutional principles', statusLabel: 'CarEdPath target' },
      { subject: 'CRS or IRS', target: 'B2+ target', basis: 'CarEdPath target for ethical frameworks', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B3+ target', basis: 'CarEdPath target for quantitative logic', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '280+',
    targetPostUtme: '32+ / 40',
    sources: [
      { title: 'OAU Admissions Portal (admissions.oauife.edu.ng)', url: 'https://admissions.oauife.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Council of Legal Education Approved Law Faculties', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If OAU Law aggregate is under 74.00:',
      options: [
        'Explore International Relations or Political Science at OAU Faculty of Administration',
        'Explore English Language or Dramatic Arts at OAU Faculty of Arts',
        'Consider Law at accredited state universities (e.g. EKSU, OOU)'
      ]
    }
  },

  'law-unn': {
    id: 'law-unn',
    institutionId: 'unn',
    institution: 'University of Nigeria, Nsukka',
    institutionShortName: 'UNN',
    programme: 'Law',
    degree: 'Bachelor of Laws (LL.B, 5 Years)',
    faculty: 'Faculty of Law',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Literature-in-English', 'Mathematics', 'Government', 'CRS or IRS'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Literature-in-English', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Government', minGrade: 'C6' },
      { subject: 'CRS or IRS', minGrade: 'C6' }
    ],
    olevelSittings: '1 or 2 sittings accepted with 5 credits',
    utmeSubjects: ['English Language', 'Literature-in-English', 'Government', 'CRS or IRS'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '298.50 Combined Average (Catchment: 280.00 – 290.00)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '180 / 400 (UNN Post-UTME CBT)',
    postUtmeBenchmark: '290+ / 400',
    aggregateFormula: {
      name: 'UNN 50:50 Combined Average Model',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME Score + Post-UTME Score) ÷ 2 = Combined Average (Max 400).',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'English Language', target: 'A1/B2 target', basis: 'CarEdPath target for legal literacy', statusLabel: 'CarEdPath target' },
      { subject: 'Literature-in-English', target: 'A1/B2 target', basis: 'CarEdPath target for critical argumentation', statusLabel: 'CarEdPath target' },
      { subject: 'Government', target: 'B2+ target', basis: 'CarEdPath target for jurisprudence', statusLabel: 'CarEdPath target' },
      { subject: 'CRS or IRS', target: 'B2+ target', basis: 'CarEdPath target for moral theology', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B3+ target', basis: 'CarEdPath target for logical consistency', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '285+',
    targetPostUtme: '290+ / 400',
    sources: [
      { title: 'UNN Admissions Office (unn.edu.ng)', url: 'https://unn.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'CLE Annual Report & Quota Allocation', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNN Combined Average is under 280.00:',
      options: [
        'Explore Political Science or Public Administration & Local Government (PALG) at UNN',
        'Explore Mass Communication at UNN Faculty of Arts',
        'Direct Entry into 200L Law after completing a first degree in Social Sciences'
      ]
    }
  },

  'law-unilorin': {
    id: 'law-unilorin',
    institutionId: 'unilorin',
    institution: 'University of Ilorin',
    institutionShortName: 'UNILORIN',
    programme: 'Law (Common & Islamic Law)',
    degree: 'LL.B (5 Years)',
    faculty: 'Faculty of Law',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Literature-in-English', 'Mathematics', 'Government / History', 'CRS / IRS / Arabic'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Literature-in-English', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Government / History', minGrade: 'C6' },
      { subject: 'CRS / IRS / Arabic', minGrade: 'C6' }
    ],
    olevelSittings: '1 sitting heavily preferred',
    utmeSubjects: ['English Language', 'Literature-in-English', 'Government', 'CRS / IRS / Economics'],
    utmeMinimum: 220,
    recentCutoff: {
      score: '75.50 Aggregate Benchmark (Catchment: 70.00)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100 in UNILORIN CBT)',
    postUtmeBenchmark: '74+ / 100',
    aggregateFormula: {
      name: 'UNILORIN 50:50 Aggregate Formula',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Literature-in-English', target: 'B2+ target', basis: 'CarEdPath target for legal text interpretation', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B2+ target', basis: 'CarEdPath target for advocacy and brief writing', statusLabel: 'CarEdPath target' },
      { subject: 'Government / History', target: 'B2+ target', basis: 'CarEdPath target for constitutional law', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'C4+ target', basis: 'CarEdPath target for foundational logic', statusLabel: 'CarEdPath target' },
      { subject: 'CRS / IRS / Arabic', target: 'B3+ target', basis: 'CarEdPath target for jurisprudence', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '270+',
    targetPostUtme: '74+ / 100',
    sources: [
      { title: 'UNILORIN Faculty of Law Portal (law.unilorin.edu.ng)', url: 'https://unilorin.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Council of Legal Education / Nigerian Law School', type: 'Regulatory Council', verifiedDate: 'September 2026' },
      { title: 'JAMB IBASS (UNILORIN Faculty of Law Requirements)', type: 'JAMB IBASS Brochure', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNILORIN aggregate is under 74.00:',
      options: [
        'Explore Criminology & Security Studies at UNILORIN',
        'Explore Political Science or History & International Studies at UNILORIN',
        'Enroll in an accredited University Diploma in Law for 200L Direct Entry'
      ]
    }
  },

  // =========================================================================
  // 8. ACCOUNTING (B.Sc) - Regulated by ICAN & ANAN
  // =========================================================================
  'accounting-unilag': {
    id: 'accounting-unilag',
    institutionId: 'unilag',
    institution: 'University of Lagos',
    institutionShortName: 'UNILAG',
    programme: 'Accounting',
    degree: 'Bachelor of Science (B.Sc, 4 Years)',
    faculty: 'Faculty of Management Sciences',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Economics', 'Financial Accounting', 'Commerce or Government'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Economics', minGrade: 'C6' },
      { subject: 'Financial Accounting', minGrade: 'C6' },
      { subject: 'Commerce or Government', minGrade: 'C6' }
    ],
    olevelSittings: '1 or 2 sittings accepted with 5 credits',
    utmeSubjects: ['English Language', 'Mathematics', 'Economics', 'Financial Accounting or Commerce'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '76.00 Merit Aggregate (Catchment: 69.50 – 73.00)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '15 / 30 (50% in UNILAG Post-UTME CBT)',
    postUtmeBenchmark: '22+ / 30 (73%+)',
    aggregateFormula: {
      name: 'UNILAG 50:30:20 Aggregate Model',
      description: 'UTME 50% + Post-UTME 30% + O\'Level 20%',
      formulaExplanation: 'UTME ÷ 8 + Post-UTME (out of 30) + O\'Level points (A1=4.0, B2=3.6, B3=3.2, C4=2.8, C5=2.4, C6=2.0).',
      utmeWeight: 50,
      postUtmeWeight: 30,
      olevelWeight: 20
    },
    targetGrades: [
      { subject: 'Mathematics', target: 'A1/B2 target', basis: 'CarEdPath target for financial mathematics & statistics', statusLabel: 'CarEdPath target' },
      { subject: 'Economics', target: 'A1/B2 target', basis: 'CarEdPath target for macroeconomic analysis', statusLabel: 'CarEdPath target' },
      { subject: 'Financial Accounting', target: 'B2+ target', basis: 'CarEdPath target for double-entry bookkeeping', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for corporate reporting', statusLabel: 'CarEdPath target' },
      { subject: 'Commerce or Government', target: 'B3+ target', basis: 'CarEdPath target for corporate governance', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '270+',
    targetPostUtme: '22+ / 30 (73%+)',
    sources: [
      { title: 'UNILAG Faculty of Management Sciences Prospectus', url: 'https://admissions.unilag.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Institute of Chartered Accountants of Nigeria (ICAN) Accreditation List', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNILAG Accounting aggregate is under 72.00:',
      options: [
        'Explore Finance, Banking, or Insurance at UNILAG Faculty of Management Sciences',
        'National Diploma in Accountancy at YABATECH (Upper Credit) → 200L Direct Entry',
        'Register for ICAN ATSWA immediately for professional chartered fast-track'
      ]
    }
  },

  'accounting-ui': {
    id: 'accounting-ui',
    institutionId: 'ui',
    institution: 'University of Ibadan',
    institutionShortName: 'UI',
    programme: 'Accounting',
    degree: 'Bachelor of Science (B.Sc, 4 Years)',
    faculty: 'Faculty of Economics & Management Sciences',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Economics', 'Financial Accounting', 'Commerce or Government'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Economics', minGrade: 'C6' },
      { subject: 'Financial Accounting', minGrade: 'C6' },
      { subject: 'Commerce or Government', minGrade: 'C6' }
    ],
    olevelSittings: '1 or 2 sittings accepted with 5 credits',
    utmeSubjects: ['English Language', 'Mathematics', 'Economics', 'Financial Accounting or Commerce'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '73.25 Merit Aggregate',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100 in UI Post-UTME CBT)',
    postUtmeBenchmark: '70+ / 100',
    aggregateFormula: {
      name: 'UI 50:50 Screening Aggregate Formula',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Mathematics', target: 'B2+ target', basis: 'CarEdPath target for business mathematics', statusLabel: 'CarEdPath target' },
      { subject: 'Economics', target: 'B2+ target', basis: 'CarEdPath target for managerial economics', statusLabel: 'CarEdPath target' },
      { subject: 'Financial Accounting', target: 'B2+ target', basis: 'CarEdPath target for audit & taxation', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for business communication', statusLabel: 'CarEdPath target' },
      { subject: 'Commerce or Government', target: 'B3+ target', basis: 'CarEdPath target for commercial law', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '265+',
    targetPostUtme: '70+ / 100',
    sources: [
      { title: 'University of Ibadan Admissions Office (admissions.ui.edu.ng)', url: 'https://admissions.ui.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'ICAN University Accreditation Directory', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UI Accounting aggregate is under 70.00:',
      options: [
        'Explore Banking & Finance at UI',
        'Explore Economics at UI Faculty of Economics & Management Sciences',
        'Enroll in ICAN ATSWA professional stages concurrently'
      ]
    }
  },

  'accounting-unilorin': {
    id: 'accounting-unilorin',
    institutionId: 'unilorin',
    institution: 'University of Ilorin',
    institutionShortName: 'UNILORIN',
    programme: 'Accounting',
    degree: 'B.Sc (4 Years)',
    faculty: 'Faculty of Management Sciences',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Economics', 'Financial Accounting / Commerce', 'Government'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Economics', minGrade: 'C6' },
      { subject: 'Financial Accounting / Commerce', minGrade: 'C6' },
      { subject: 'Government', minGrade: 'C6' }
    ],
    olevelSittings: 'Maximum 2 sittings accepted',
    utmeSubjects: ['English Language', 'Mathematics', 'Economics', 'Financial Accounting or Commerce'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '69.50 Aggregate Benchmark (Catchment: 64.50)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100 in UNILORIN CBT)',
    postUtmeBenchmark: '68+ / 100',
    aggregateFormula: {
      name: 'UNILORIN 50:50 Aggregate Formula',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Economics', target: 'B2+ target', basis: 'CarEdPath target for macroeconomic accounting', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B2+ target', basis: 'CarEdPath target for financial mathematics', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for corporate reporting', statusLabel: 'CarEdPath target' },
      { subject: 'Financial Accounting / Commerce', target: 'B2+ target', basis: 'CarEdPath target for book-keeping mastery', statusLabel: 'CarEdPath target' },
      { subject: 'Government', target: 'B3+ target', basis: 'CarEdPath target for commercial regulatory frameworks', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '250+',
    targetPostUtme: '68+ / 100',
    sources: [
      { title: 'UNILORIN Faculty of Management Sciences Portal', url: 'https://unilorin.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Institute of Chartered Accountants of Nigeria (ICAN) Accreditation', type: 'Regulatory Council', verifiedDate: 'September 2026' },
      { title: 'JAMB IBASS (UNILORIN Accounting)', type: 'JAMB IBASS Brochure', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNILORIN aggregate is under 68.00:',
      options: [
        'Explore Finance or Banking at UNILORIN',
        'Explore Business Administration at UNILORIN',
        'Enroll in ICAN ATSWA certification track'
      ]
    }
  },

  // =========================================================================
  // 9. MASS COMMUNICATION (B.Sc / B.A) - Regulated by ARCON & NUJ
  // =========================================================================
  'mass-communication-unilag': {
    id: 'mass-communication-unilag',
    institutionId: 'unilag',
    institution: 'University of Lagos',
    institutionShortName: 'UNILAG',
    programme: 'Mass Communication',
    degree: 'Bachelor of Science (B.Sc, 4 Years)',
    faculty: 'Faculty of Social Sciences',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Literature-in-English', 'Mathematics', 'Government', 'Economics or CRS'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Literature-in-English', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Government', minGrade: 'C6' },
      { subject: 'Economics or CRS', minGrade: 'C6' }
    ],
    olevelSittings: '1 or 2 sittings accepted with 5 credits',
    utmeSubjects: ['English Language', 'Literature-in-English', 'Government', 'Economics or CRS'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '75.25 Merit Aggregate (Catchment: 68.00 – 72.00)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '15 / 30 (50% in UNILAG Post-UTME CBT)',
    postUtmeBenchmark: '22+ / 30 (73%+)',
    aggregateFormula: {
      name: 'UNILAG 50:30:20 Aggregate Model',
      description: 'UTME 50% + Post-UTME 30% + O\'Level 20%',
      formulaExplanation: 'UTME ÷ 8 + Post-UTME (out of 30) + O\'Level points (A1=4.0, B2=3.6, B3=3.2, C4=2.8, C5=2.4, C6=2.0).',
      utmeWeight: 50,
      postUtmeWeight: 30,
      olevelWeight: 20
    },
    targetGrades: [
      { subject: 'English Language', target: 'A1/B2 target', basis: 'CarEdPath target for broadcast & print journalism', statusLabel: 'CarEdPath target' },
      { subject: 'Literature-in-English', target: 'A1/B2 target', basis: 'CarEdPath target for literary criticism & scriptwriting', statusLabel: 'CarEdPath target' },
      { subject: 'Government', target: 'B2+ target', basis: 'CarEdPath target for public affairs reporting', statusLabel: 'CarEdPath target' },
      { subject: 'Economics or CRS', target: 'B3+ target', basis: 'CarEdPath target for development communication', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B3+ target', basis: 'CarEdPath target for quantitative research methods', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '265+',
    targetPostUtme: '22+ / 30 (73%+)',
    sources: [
      { title: 'UNILAG Department of Mass Communication Handbook', url: 'https://admissions.unilag.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Advertising Regulatory Council of Nigeria (ARCON) Guidelines', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNILAG Mass Comm aggregate is under 71.00:',
      options: [
        'Explore Creative Arts or Theatre Arts at UNILAG Faculty of Arts',
        'ND Mass Communication at Yaba College of Technology (Upper Credit) → 200L Direct Entry',
        'Explore Sociology or Political Science at UNILAG'
      ]
    }
  },

  'mass-communication-unn': {
    id: 'mass-communication-unn',
    institutionId: 'unn',
    institution: 'University of Nigeria, Nsukka',
    institutionShortName: 'UNN',
    programme: 'Mass Communication',
    degree: 'Bachelor of Arts (B.A, 4 Years)',
    faculty: 'Faculty of Arts',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Literature-in-English', 'Mathematics', 'Government', 'Economics or CRS'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Literature-in-English', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Government', minGrade: 'C6' },
      { subject: 'Economics or CRS', minGrade: 'C6' }
    ],
    olevelSittings: '1 or 2 sittings accepted with 5 credits',
    utmeSubjects: ['English Language', 'Literature-in-English', 'Government', 'Economics or CRS'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '278.00 Combined Average',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '180 / 400',
    postUtmeBenchmark: '275+ / 400',
    aggregateFormula: {
      name: 'UNN 50:50 Combined Average Model',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME Score + Post-UTME Score) ÷ 2 = Combined Average (Max 400).',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'English Language', target: 'A1/B2 target', basis: 'CarEdPath target for editorial writing', statusLabel: 'CarEdPath target' },
      { subject: 'Literature-in-English', target: 'A1/B2 target', basis: 'CarEdPath target for investigative narrative', statusLabel: 'CarEdPath target' },
      { subject: 'Government', target: 'B2+ target', basis: 'CarEdPath target for political communication', statusLabel: 'CarEdPath target' },
      { subject: 'Economics or CRS', target: 'B3+ target', basis: 'CarEdPath target for social analysis', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B3+ target', basis: 'CarEdPath target for data literacy', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '265+',
    targetPostUtme: '275+ / 400',
    sources: [
      { title: 'UNN Department of Mass Communication Admissions Portal', url: 'https://unn.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'JAMB IBASS UNN Arts Faculty Brochure', type: 'JAMB IBASS Brochure', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNN Mass Comm average is under 270.00:',
      options: [
        'Explore Theatre & Film Studies at UNN Faculty of Arts',
        'Explore English & Literary Studies at UNN',
        'Polytechnic ND in Mass Communication with Direct Entry to 200L'
      ]
    }
  },

  'mass-communication-unilorin': {
    id: 'mass-communication-unilorin',
    institutionId: 'unilorin',
    institution: 'University of Ilorin',
    institutionShortName: 'UNILORIN',
    programme: 'Mass Communication',
    degree: 'B.Sc (4 Years)',
    faculty: 'Faculty of Communication & Information Sciences (CIS)',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Literature-in-English', 'Government / History', 'Economics / CRS'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Literature-in-English', minGrade: 'C6' },
      { subject: 'Government / History', minGrade: 'C6' },
      { subject: 'Economics / CRS', minGrade: 'C6' }
    ],
    olevelSittings: 'Maximum 2 sittings accepted',
    utmeSubjects: ['English Language', 'Literature-in-English', 'Government', 'Any other Arts or Social Science subject'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '68.50 Aggregate Benchmark (Catchment: 63.50)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100 in UNILORIN CBT)',
    postUtmeBenchmark: '68+ / 100',
    aggregateFormula: {
      name: 'UNILORIN 50:50 Aggregate Formula',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Literature-in-English', target: 'B2+ target', basis: 'CarEdPath target for narrative journalism', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B2+ target', basis: 'CarEdPath target for broadcast and print copy', statusLabel: 'CarEdPath target' },
      { subject: 'Government / History', target: 'B3+ target', basis: 'CarEdPath target for political reportage', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'C5+ target', basis: 'CarEdPath target for quantitative research', statusLabel: 'CarEdPath target' },
      { subject: 'Economics / CRS', target: 'B3+ target', basis: 'CarEdPath target for socioeconomic media', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '245+',
    targetPostUtme: '68+ / 100',
    sources: [
      { title: 'UNILORIN Faculty of CIS Portal', url: 'https://unilorin.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Advertising Regulatory Council of Nigeria (ARCON)', type: 'Regulatory Council', verifiedDate: 'September 2026' },
      { title: 'JAMB IBASS (UNILORIN Mass Communication)', type: 'JAMB IBASS Brochure', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNILORIN aggregate is under 67.00:',
      options: [
        'Explore Information & Communication Science at UNILORIN',
        'Explore Performing Arts at UNILORIN',
        'National Diploma in Mass Communication at Kwara State Poly for 200L Direct Entry'
      ]
    }
  },

  // =========================================================================
  // 10. ECONOMICS (B.Sc) - Regulated by NES & CIBN
  // =========================================================================
  'economics-unilag': {
    id: 'economics-unilag',
    institutionId: 'unilag',
    institution: 'University of Lagos',
    institutionShortName: 'UNILAG',
    programme: 'Economics',
    degree: 'Bachelor of Science (B.Sc, 4 Years)',
    faculty: 'Faculty of Social Sciences',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Economics', 'Government', 'Commerce or Geography'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Economics', minGrade: 'C6' },
      { subject: 'Government', minGrade: 'C6' },
      { subject: 'Commerce or Geography', minGrade: 'C6' }
    ],
    olevelSittings: '1 or 2 sittings accepted with 5 credits',
    utmeSubjects: ['English Language', 'Mathematics', 'Economics', 'Government or Commerce'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '74.50 Merit Aggregate (Catchment: 67.00 – 71.50)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '15 / 30 (50% in UNILAG Post-UTME CBT)',
    postUtmeBenchmark: '21+ / 30 (70%+)',
    aggregateFormula: {
      name: 'UNILAG 50:30:20 Aggregate Model',
      description: 'UTME 50% + Post-UTME 30% + O\'Level 20%',
      formulaExplanation: 'UTME ÷ 8 + Post-UTME (out of 30) + O\'Level points (A1=4.0, B2=3.6, B3=3.2, C4=2.8, C5=2.4, C6=2.0).',
      utmeWeight: 50,
      postUtmeWeight: 30,
      olevelWeight: 20
    },
    targetGrades: [
      { subject: 'Mathematics', target: 'A1/B2 target', basis: 'CarEdPath target for econometrics & mathematical economics', statusLabel: 'CarEdPath target' },
      { subject: 'Economics', target: 'A1/B2 target', basis: 'CarEdPath target for macroeconomic theory', statusLabel: 'CarEdPath target' },
      { subject: 'Government', target: 'B2+ target', basis: 'CarEdPath target for public sector economics', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for policy briefs', statusLabel: 'CarEdPath target' },
      { subject: 'Commerce or Geography', target: 'B3+ target', basis: 'CarEdPath target for trade & environmental economics', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '265+',
    targetPostUtme: '21+ / 30 (70%+)',
    sources: [
      { title: 'UNILAG Department of Economics Prospectus', url: 'https://admissions.unilag.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Nigerian Economic Society (NES) Academic Charter', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNILAG Economics aggregate is under 70.00:',
      options: [
        'Explore Finance or Insurance at UNILAG Faculty of Management Sciences',
        'Explore Employment Relations & Human Resource Management (ER&HRM) at UNILAG',
        'National Diploma in Statistics or Banking & Finance with Direct Entry to 200L'
      ]
    }
  },

  'economics-ui': {
    id: 'economics-ui',
    institutionId: 'ui',
    institution: 'University of Ibadan',
    institutionShortName: 'UI',
    programme: 'Economics',
    degree: 'Bachelor of Science (B.Sc, 4 Years)',
    faculty: 'Faculty of Economics & Management Sciences',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Economics', 'Government', 'Commerce or Geography'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Economics', minGrade: 'C6' },
      { subject: 'Government', minGrade: 'C6' },
      { subject: 'Commerce or Geography', minGrade: 'C6' }
    ],
    olevelSittings: '1 or 2 sittings accepted with 5 credits',
    utmeSubjects: ['English Language', 'Mathematics', 'Economics', 'Government or Commerce'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '72.00 Merit Aggregate',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100 in UI Post-UTME CBT)',
    postUtmeBenchmark: '68+ / 100',
    aggregateFormula: {
      name: 'UI 50:50 Screening Aggregate Formula',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Mathematics', target: 'B2+ target', basis: 'CarEdPath target for quantitative economic theory', statusLabel: 'CarEdPath target' },
      { subject: 'Economics', target: 'B2+ target', basis: 'CarEdPath target for microeconomic modeling', statusLabel: 'CarEdPath target' },
      { subject: 'Government', target: 'B3+ target', basis: 'CarEdPath target for development economics', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for economic reports', statusLabel: 'CarEdPath target' },
      { subject: 'Commerce or Geography', target: 'B3+ target', basis: 'CarEdPath target for market structures', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '260+',
    targetPostUtme: '68+ / 100',
    sources: [
      { title: 'University of Ibadan Admissions Office (admissions.ui.edu.ng)', url: 'https://admissions.ui.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'JAMB IBASS UI Brochure (Faculty of Economics & Management Sciences)', type: 'JAMB IBASS Brochure', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UI Economics aggregate is under 68.00:',
      options: [
        'Explore Agricultural Economics at UI Faculty of Agriculture',
        'Explore Sociology or Psychology at UI Faculty of the Social Sciences',
        'Consider transfer or Direct Entry after ND in Financial Studies'
      ]
    }
  },

  'economics-unilorin': {
    id: 'economics-unilorin',
    institutionId: 'unilorin',
    institution: 'University of Ilorin',
    institutionShortName: 'UNILORIN',
    programme: 'Economics',
    degree: 'B.Sc (4 Years)',
    faculty: 'Faculty of Social Sciences',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Economics', 'Government', 'Commerce / Geography'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Economics', minGrade: 'C6' },
      { subject: 'Government', minGrade: 'C6' },
      { subject: 'Commerce / Geography', minGrade: 'C6' }
    ],
    olevelSittings: 'Maximum 2 sittings accepted',
    utmeSubjects: ['English Language', 'Economics', 'Mathematics', 'Government or Commerce'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '68.00 Aggregate Benchmark (Catchment: 63.00)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100 in UNILORIN CBT)',
    postUtmeBenchmark: '68+ / 100',
    aggregateFormula: {
      name: 'UNILORIN 50:50 Aggregate Formula',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Economics', target: 'B2+ target', basis: 'CarEdPath target for macroeconomic theory', statusLabel: 'CarEdPath target' },
      { subject: 'Mathematics', target: 'B2+ target', basis: 'CarEdPath target for econometrics', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for economic analytical writing', statusLabel: 'CarEdPath target' },
      { subject: 'Government', target: 'B3+ target', basis: 'CarEdPath target for public policy', statusLabel: 'CarEdPath target' },
      { subject: 'Commerce / Geography', target: 'B3+ target', basis: 'CarEdPath target for commercial systems', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '245+',
    targetPostUtme: '68+ / 100',
    sources: [
      { title: 'UNILORIN Faculty of Social Sciences Portal', url: 'https://unilorin.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Nigerian Economic Society (NES)', type: 'Regulatory Council', verifiedDate: 'September 2026' },
      { title: 'JAMB IBASS (UNILORIN Economics)', type: 'JAMB IBASS Brochure', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNILORIN aggregate is under 67.00:',
      options: [
        'Explore Agricultural Economics at UNILORIN',
        'Explore Political Science or Sociology at UNILORIN',
        'National Diploma in Banking & Finance at Federal Poly Offa for Direct Entry'
      ]
    }
  },

  // =========================================================================
  // 11. ARCHITECTURE (B.Sc / B.Tech) - Regulated by ARCON & NIA
  // =========================================================================
  'architecture-unilag': {
    id: 'architecture-unilag',
    institutionId: 'unilag',
    institution: 'University of Lagos',
    institutionShortName: 'UNILAG',
    programme: 'Architecture',
    degree: 'Bachelor of Science (B.Sc, 4 Years)',
    faculty: 'Faculty of Environmental Sciences',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Technical Drawing or Fine Art'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Technical Drawing or Fine Art', minGrade: 'C6' }
    ],
    olevelSittings: '1 or 2 sittings accepted with 5 credits',
    utmeSubjects: ['English Language', 'Mathematics', 'Physics', 'Technical Drawing or Chemistry'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '74.00 Merit Aggregate (Catchment: 66.50 – 70.00)',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '15 / 30 (50% in UNILAG Post-UTME CBT)',
    postUtmeBenchmark: '21+ / 30 (70%+)',
    aggregateFormula: {
      name: 'UNILAG 50:30:20 Aggregate Model',
      description: 'UTME 50% + Post-UTME 30% + O\'Level 20%',
      formulaExplanation: 'UTME ÷ 8 + Post-UTME (out of 30) + O\'Level points (A1=4.0, B2=3.6, B3=3.2, C4=2.8, C5=2.4, C6=2.0).',
      utmeWeight: 50,
      postUtmeWeight: 30,
      olevelWeight: 20
    },
    targetGrades: [
      { subject: 'Mathematics', target: 'B2+ target', basis: 'CarEdPath target for structural mechanics & trigonometry', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B2+ target', basis: 'CarEdPath target for statics & environmental physics', statusLabel: 'CarEdPath target' },
      { subject: 'Technical Drawing / Fine Art', target: 'B2+ target', basis: 'CarEdPath target for orthographic & perspective projection', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B3+ target', basis: 'CarEdPath target for building materials chemistry', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for design specifications', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '265+',
    targetPostUtme: '21+ / 30 (70%+)',
    sources: [
      { title: 'UNILAG Faculty of Environmental Sciences Handbook', url: 'https://admissions.unilag.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'Architects Registration Council of Nigeria (ARCON) Register', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If UNILAG Architecture aggregate is under 70.00:',
      options: [
        'Explore Building Technology or Quantity Surveying at UNILAG Faculty of Environmental Sciences',
        'National Diploma in Architectural Technology at YABATECH (Upper Credit) → 200L Direct Entry',
        'Explore Urban & Regional Planning at UNILAG'
      ]
    }
  },

  'architecture-futa': {
    id: 'architecture-futa',
    institutionId: 'futa',
    institution: 'Federal University of Technology, Akure',
    institutionShortName: 'FUTA',
    programme: 'Architecture',
    degree: 'Bachelor of Technology (B.Tech, 5 Years)',
    faculty: 'School of Environmental Technology (SET)',
    academicSession: '2026/2027',
    olevelRequirements: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Technical Drawing or Fine Art'],
    olevelMinimumGrades: [
      { subject: 'English Language', minGrade: 'C6' },
      { subject: 'Mathematics', minGrade: 'C6' },
      { subject: 'Physics', minGrade: 'C6' },
      { subject: 'Chemistry', minGrade: 'C6' },
      { subject: 'Technical Drawing or Fine Art', minGrade: 'C6' }
    ],
    olevelSittings: '1 or 2 sittings accepted with 5 credits',
    utmeSubjects: ['English Language', 'Mathematics', 'Physics', 'Technical Drawing or Chemistry'],
    utmeMinimum: 200,
    recentCutoff: {
      score: '69.50 Merit Aggregate',
      session: '2025/2026',
      category: 'Merit Cut-Off Aggregate'
    },
    postUtmeRequired: true,
    postUtmeMinimum: '50% (50 / 100 in FUTA Post-UTME CBT)',
    postUtmeBenchmark: '66+ / 100',
    aggregateFormula: {
      name: 'FUTA 50:50 Screening Aggregate Formula',
      description: 'UTME 50% + Post-UTME 50%',
      formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100% aggregate score.',
      utmeWeight: 50,
      postUtmeWeight: 50,
      olevelWeight: 0
    },
    targetGrades: [
      { subject: 'Mathematics', target: 'B2+ target', basis: 'CarEdPath target for structural design calculus', statusLabel: 'CarEdPath target' },
      { subject: 'Physics', target: 'B2+ target', basis: 'CarEdPath target for building climatology', statusLabel: 'CarEdPath target' },
      { subject: 'Technical Drawing / Fine Art', target: 'B2+ target', basis: 'CarEdPath target for architectural graphics', statusLabel: 'CarEdPath target' },
      { subject: 'Chemistry', target: 'B3+ target', basis: 'CarEdPath target for materials science', statusLabel: 'CarEdPath target' },
      { subject: 'English Language', target: 'B3+ target', basis: 'CarEdPath target for technical documentation', statusLabel: 'CarEdPath target' }
    ],
    targetUtme: '250+',
    targetPostUtme: '66+ / 100',
    sources: [
      { title: 'FUTA School of Environmental Technology Prospectus', url: 'https://futa.edu.ng', type: 'Official University Portal', verifiedDate: 'September 2026' },
      { title: 'ARCON & NIA Professional Accreditation Register', type: 'Regulatory Council', verifiedDate: 'September 2026' }
    ],
    verifiedDate: 'September 2026',
    alternativeAdvice: {
      shortNote: 'If FUTA Architecture aggregate is under 66.00:',
      options: [
        'Explore Building Technology or Quantity Surveying at FUTA SET',
        'Explore Industrial Design at FUTA',
        'Polytechnic ND in Architectural Technology with 200L Direct Entry transfer'
      ]
    }
  }
};

/**
 * Normalizes user queries into canonical programme key.
 * STRICT COURSE ISOLATION:
 * Returns null if the query does not correspond to an authentic verified programme.
 * NEVER default or fallback to medicine-surgery!
 */
export function getCanonicalProgrammeKey(query: string): string | null {
  const q = query.toLowerCase().trim();
  // Medical Laboratory Science MUST be matched before general medicine because "Medical Laboratory Science" contains "medic"
  if (q.includes('lab') || q.includes('mls') || q.includes('medical laboratory') || q.includes('patholog') || q.includes('diagnost')) {
    return 'medical-lab-science';
  }
  if (q.includes('medic') || q.includes('mbbs') || q.includes('doctor') || q.includes('surg') || q.includes('physician')) {
    return 'medicine-surgery';
  }
  if (q.includes('nurs') || q.includes('midwi')) {
    return 'nursing-science';
  }
  if (q.includes('pharm') || q.includes('drug') || q.includes('pharmacolog')) {
    return 'pharmacy';
  }
  if (q.includes('law') || q.includes('legal') || q.includes('ll.b') || q.includes('barrister') || q.includes('solicitor') || q.includes('advoca')) {
    return 'law';
  }
  if (q.includes('account') || q.includes('financ') || q.includes('bank') || q.includes('ican') || q.includes('audit')) {
    return 'accounting';
  }
  if (q.includes('mass') || q.includes('comm') || q.includes('media') || q.includes('journalis') || q.includes('broadcast')) {
    return 'mass-communication';
  }
  if (q.includes('econom')) {
    return 'economics';
  }
  if (q.includes('architec') || q.includes('built env') || q.includes('environmental design')) {
    return 'architecture';
  }
  if (q.includes('comput') || q.includes('software') || q.includes('tech') || q.includes('code') || q.includes('cloud') || q.includes('cyber') || q.includes('data')) {
    return 'computer-science';
  }
  if (q.includes('engin') || q.includes('mech') || q.includes('elect') || q.includes('civil') || q.includes('solar')) {
    return 'engineering';
  }
  return null;
}

/**
 * Retrieves the strict verified admission record for a programme + institution.
 * Returns null if no verified records exist for the course.
 */
/**
 * Retrieves the strict verified admission record for a programme + institution.
 * STRICT DATA ISOLATION:
 * - Must belong strictly to the institution specified by institutionQuery.
 * - Under NO circumstance falls back to UNILAG or any other institution.
 * - Returns null if no verified records exist for this exact institution + programme pair.
 */
export function getVerifiedAdmissionData(
  programmeQuery: string,
  institutionQuery?: string,
  academicSession: string = '2026/2027'
): VerifiedAdmissionRequirement | null {
  const programmeKey = getCanonicalProgrammeKey(programmeQuery);
  if (!programmeKey) {
    return null;
  }

  const instId = normalizeInstitutionId(institutionQuery);
  if (!instId) {
    // If no specific or valid institution query is passed, never guess or default to UNILAG
    return null;
  }

  const targetKey = `${programmeKey}-${instId}`;
  const record = VERIFIED_ADMISSION_DATABASE[targetKey];

  // STRICT ISOLATION VALIDATION:
  // Must match both the compound key AND internal institutionId
  if (record && record.institutionId === instId) {
    return record;
  }

  // NO SILENT FALLBACK TO UNILAG OR ANY OTHER INSTITUTION!
  return null;
}

/**
 * Returns available verified institutions for a specific programme.
 * Returns empty array if programme is unverified or unknown.
 */
export function getAvailableInstitutionsForProgramme(programmeQuery: string): { name: string; shortName: string; key: InstitutionId; id: InstitutionId }[] {
  const programmeKey = getCanonicalProgrammeKey(programmeQuery);
  if (!programmeKey) {
    return [];
  }
  const results: { name: string; shortName: string; key: InstitutionId; id: InstitutionId }[] = [];

  for (const [key, item] of Object.entries(VERIFIED_ADMISSION_DATABASE)) {
    if (key.startsWith(programmeKey)) {
      results.push({
        name: item.institution,
        shortName: item.institutionShortName,
        key: item.institutionId,
        id: item.institutionId
      });
    }
  }

  return results;
}

/**
 * Returns all verified academic programmes offered by a specific institution.
 */
export function getAvailableProgrammesForInstitution(institutionQuery?: string): { programme: string; degree: string; key: string }[] {
  const instId = normalizeInstitutionId(institutionQuery);
  if (!instId) return [];

  const results: { programme: string; degree: string; key: string }[] = [];
  for (const item of Object.values(VERIFIED_ADMISSION_DATABASE)) {
    if (item.institutionId === instId) {
      results.push({
        programme: item.programme,
        degree: item.degree,
        key: item.id
      });
    }
  }
  return results;
}

/**
 * Compares student input against verified targets and minimums.
 * STRICT INSTITUTION ISOLATION:
 * Validates selectedInstitutionId === req.institutionId. Returns null on any mismatch.
 */
export interface ReadinessTargetComponent {
  currentScore?: number | string;
  minimumRequired: number | string;
  recommendedTarget: number | string;
  recommendedTargetDisplay: string;
  gap?: number;
  gapDisplay: string;
  status: 'exceeds-target' | 'on-track' | 'needs-improvement' | 'below-minimum' | 'pending';
  feedback: string;
}

export interface StudentReadinessComparison {
  programme: string;
  institutionId: InstitutionId;
  institution: string;
  institutionShortName: string;
  academicSession: string;

  // Rule 5: Separation of Requirement (Eligibility) from Competitiveness (Readiness)
  eligibility: {
    isEligible: boolean;
    status: 'Eligible' | 'Not Eligible';
    reasons: string[];
    disqualifications: string[];
  };

  // Rule 2 & 6: Quantitative Readiness & Level
  readiness: {
    score: number;
    percentage: number;
    level: 'Highly Ready & Competitive' | 'Ready / On Track' | 'Borderline / Needs Targeted Prep' | 'Below Competitive Benchmark' | 'Not Eligible';
    summary: string;
  };

  // Rule 6: Target Scores, Current Performance & Gaps
  targets: {
    utme: ReadinessTargetComponent & {
      currentScore?: number;
      minimumRequired: number;
      recommendedTarget: number;
    };
    postUtme?: ReadinessTargetComponent & {
      required: boolean;
      currentScore?: number;
      minimumRequired: number;
      recommendedTarget: number;
      maxPossible: number;
      projectedNeededForCutoff?: number;
      percentagePerformance?: number;
      aggregateContribution?: number;
    };
    olevel: {
      subject: string;
      userGrade?: string;
      minimumGrade: string;
      targetGrade: string;
      meetsMinimum: boolean;
      meetsTarget: boolean;
      status: 'on-track' | 'needs-improvement' | 'below-minimum' | 'not-entered';
      feedback: string;
    }[];
  };

  // Institutional Aggregate Calculation
  calculatedAggregate?: {
    institutionId: InstitutionId;
    institutionName: string;
    formulaName: string;
    formulaExplanation: string;
    isComplete: boolean;
    score: number;
    maxScore: number;
    cutOffBenchmark: string;
    numericBenchmark: number;
    benchmarkSession: string;
    gapToBenchmark: number;
    gapDisplay: string;
    status: 'Competitive' | 'Close to Benchmark' | 'Below Benchmark' | 'Pending Post-UTME';
    breakdownText: string;
    components?: {
      utme: { score: number; max: number; label: string; percentage?: number };
      postUtme?: { score: number; max: number; label: string; percentage?: number };
      olevel?: { score: number; max: number; label: string; percentage?: number };
    };
  };

  // Strategic Actionable Recommendations
  recommendations: {
    title: string;
    action: string;
    impact: string;
    priority: 'Critical' | 'High' | 'Medium';
  }[];

  // Backwards compatibility bindings
  utmeStatus: {
    label: string;
    type: 'on-track' | 'needs-improvement' | 'below-minimum' | 'not-verified';
    userScore?: number;
    targetScore: string;
    minimumScore: number;
    feedback: string;
  };
  postUtmeStatus?: {
    label: string;
    type: 'on-track' | 'needs-improvement' | 'below-minimum' | 'not-verified';
    userScore?: number;
    targetScore: string;
    feedback: string;
  };
  olevelComparison: {
    subject: string;
    userGrade?: string;
    targetGrade: string;
    minimumGrade: string;
    status: 'on-track' | 'needs-improvement' | 'below-minimum' | 'not-verified';
    feedback: string;
  }[];
}

export function compareStudentReadiness(
  selectedInstitutionId: InstitutionId,
  req: VerifiedAdmissionRequirement,
  studentData: {
    utmeScore?: number;
    postUtmeScore?: number;
    olevelGrades?: Record<string, string>;
    olevelScore?: number;
  }
): StudentReadinessComparison | null {
  // RULE 1: STRICT INSTITUTION ISOLATION & VALIDATION
  // Before calculating: selectedInstitutionId === calculationData.institutionId
  // If they do not match, stop the calculation immediately!
  if (!selectedInstitutionId || !req || selectedInstitutionId !== req.institutionId) {
    return null;
  }

  const disqualifications: string[] = [];
  const eligibilityReasons: string[] = [];
  const recommendations: { title: string; action: string; impact: string; priority: 'Critical' | 'High' | 'Medium' }[] = [];

  // Grade hierarchy for WAEC / NECO / NABTEB
  const gradeRank: Record<string, number> = {
    'A1': 9, 'B2': 8, 'B3': 7, 'C4': 6, 'C5': 5, 'C6': 4,
    'D7': 3, 'E8': 2, 'F9': 1
  };

  // -------------------------------------------------------------
  // 1. O'LEVEL EVALUATION (Eligibility Baseline & Targets)
  // -------------------------------------------------------------
  let olevelFailCount = 0;
  let olevelMetTargetCount = 0;

  const olevelComparison = req.olevelRequirements.map(subject => {
    const userGrade = studentData.olevelGrades?.[subject] || studentData.olevelGrades?.[subject.toLowerCase()] || undefined;
    const targetObj = req.targetGrades.find(t => t.subject.toLowerCase() === subject.toLowerCase());
    const targetGrade = targetObj ? targetObj.target : 'B3+ target';
    const minObj = req.olevelMinimumGrades.find(m => m.subject.toLowerCase() === subject.toLowerCase());
    const minGrade = minObj ? minObj.minGrade : 'C6';

    let status: 'on-track' | 'needs-improvement' | 'below-minimum' | 'not-entered' = 'not-entered';
    let feedback = `Awaiting grade entry. Official minimum: ${minGrade} (Credit).`;
    let meetsMinimum = false;
    let meetsTarget = false;

    if (userGrade) {
      const uRank = gradeRank[userGrade.toUpperCase()] || 0;
      const mRank = gradeRank[minGrade.toUpperCase()] || 4;
      const tClean = targetGrade.substring(0, 2).toUpperCase();
      const tRank = gradeRank[tClean] || 7;

      meetsMinimum = uRank >= mRank;
      meetsTarget = uRank >= tRank;

      if (!meetsMinimum) {
        status = 'below-minimum';
        olevelFailCount++;
        feedback = `Below official minimum (${minGrade}). Disqualifying unless retaken.`;
        disqualifications.push(`O'Level: ${subject} grade (${userGrade}) is below the required credit pass of ${minGrade} for ${req.programme} at ${req.institutionShortName}.`);
        recommendations.push({
          title: `Retake ${subject} (O'Level)`,
          action: `Register for WAEC/NECO GCE to upgrade ${subject} from ${userGrade} to at least ${minGrade}.`,
          impact: 'Critical prerequisite. Failure to present 5 core credit passes prevents screening registration.',
          priority: 'Critical'
        });
      } else if (meetsTarget) {
        status = 'on-track';
        olevelMetTargetCount++;
        feedback = `Competitive grade (${userGrade}) meets or exceeds recommendation (${targetGrade}).`;
        eligibilityReasons.push(`O'Level: ${subject} grade (${userGrade}) satisfies requirements.`);
      } else {
        status = 'needs-improvement';
        feedback = `Passes minimum credit (${minGrade}), but below competitive target (${targetGrade}).`;
        eligibilityReasons.push(`O'Level: ${subject} grade (${userGrade}) satisfies minimum eligibility.`);
      }
    }

    return {
      subject,
      userGrade,
      targetGrade,
      minimumGrade: minGrade,
      meetsMinimum,
      meetsTarget,
      status,
      feedback
    };
  });

  // -------------------------------------------------------------
  // 2. UTME EVALUATION (Eligibility Threshold vs Competitive Goal)
  // -------------------------------------------------------------
  const utmeMatch = req.targetUtme.match(/(\d+)/);
  const targetUtmeNumber = utmeMatch ? parseInt(utmeMatch[1], 10) : 280;
  const userUtme = studentData.utmeScore;
  let utmeStatusType: 'exceeds-target' | 'on-track' | 'needs-improvement' | 'below-minimum' | 'pending' = 'pending';
  let utmeGap = 0;
  let utmeGapDisplay = 'Score not entered';
  let utmeFeedback = `Official minimum: ${req.utmeMinimum}. Competitive target: ${req.targetUtme} at ${req.institutionShortName}.`;

  if (userUtme !== undefined && userUtme > 0) {
    if (userUtme < req.utmeMinimum) {
      utmeStatusType = 'below-minimum';
      utmeGap = req.utmeMinimum - userUtme;
      utmeGapDisplay = `${userUtme - req.utmeMinimum} (Below Minimum)`;
      utmeFeedback = `Your score of ${userUtme} is below the published ${req.institutionShortName} minimum of ${req.utmeMinimum}. You are not eligible for Post-UTME screening in ${req.programme}.`;
      disqualifications.push(`UTME: Score of ${userUtme} is below official minimum of ${req.utmeMinimum} for ${req.programme} at ${req.institutionShortName}.`);
      recommendations.push({
        title: 'JAMB Change of Institution or Course',
        action: `Apply for JAMB Change of Course or Institution to an accredited programme where your UTME score (${userUtme}) meets the cutoff.`,
        impact: 'Essential. Candidates below institutional cutoffs cannot be processed on JAMB CAPS.',
        priority: 'Critical'
      });
    } else if (userUtme >= targetUtmeNumber) {
      utmeStatusType = 'exceeds-target';
      utmeGap = 0;
      utmeGapDisplay = '0 (Target Met)';
      utmeFeedback = `Your score of ${userUtme} meets or exceeds the competitive merit preparation target (${req.targetUtme}).`;
      eligibilityReasons.push(`UTME: Score of ${userUtme} comfortably clears ${req.institutionShortName} minimum (${req.utmeMinimum}).`);
    } else {
      utmeStatusType = 'needs-improvement';
      utmeGap = targetUtmeNumber - userUtme;
      utmeGapDisplay = `+${utmeGap} points needed`;
      utmeFeedback = `Your score of ${userUtme} satisfies the minimum (${req.utmeMinimum}), but is ${utmeGap} marks below the competitive benchmark (${req.targetUtme}). A strong Post-UTME score will be required.`;
      eligibilityReasons.push(`UTME: Score of ${userUtme} meets minimum screening threshold (${req.utmeMinimum}).`);
      recommendations.push({
        title: 'Intensive Post-UTME Preparation',
        action: `Compensate for UTME gap (${utmeGap} marks) with targeted ${req.institutionShortName} Post-UTME CBT past questions.`,
        impact: `Every additional mark in Post-UTME directly closes the gap to the ${req.recentCutoff.score} merit cutoff.`,
        priority: 'High'
      });
    }
  }

  // -------------------------------------------------------------
  // 3. POST-UTME & SCREENING BENCHMARK (Institution-Specific Model)
  // -------------------------------------------------------------
  // Parse numeric merit cutoff benchmark
  const cutoffMatch = req.recentCutoff.score.match(/(\d+(\.\d+)?)/);
  const numericCutoff = cutoffMatch ? parseFloat(cutoffMatch[1]) : (req.institutionId === 'unn' ? 295 : 74.0);

  // Institution-specific Post-UTME scales and minimums
  let postUtmeMaxPossible = 100;
  let postUtmeMinPass = 50;
  let postUtmeTargetNumber = 75;

  if (req.institutionId === 'unilag') {
    postUtmeMaxPossible = 30;
    postUtmeMinPass = 15;
    postUtmeTargetNumber = 24;
  } else if (req.institutionId === 'unn') {
    postUtmeMaxPossible = 400;
    postUtmeMinPass = 180;
    postUtmeTargetNumber = 290;
  } else if (req.institutionId === 'oau') {
    postUtmeMaxPossible = 40;
    postUtmeMinPass = 20;
    const pMatch = req.targetPostUtme.match(/(\d+)/);
    postUtmeTargetNumber = pMatch ? parseInt(pMatch[1], 10) : 32;
  } else if (req.institutionId === 'unilorin') {
    postUtmeMaxPossible = 100;
    postUtmeMinPass = 50;
    const pMatch = req.targetPostUtme.match(/(\d+)/);
    postUtmeTargetNumber = pMatch ? parseInt(pMatch[1], 10) : 78;
  } else {
    // UI, ABU, FUTA
    postUtmeMaxPossible = 100;
    postUtmeMinPass = 50;
    const pMatch = req.targetPostUtme.match(/(\d+)/);
    postUtmeTargetNumber = pMatch ? parseInt(pMatch[1], 10) : 75;
  }

  // Calculate needed Post-UTME score to reach merit cutoff
  let projectedNeededPostUtme: number | undefined = undefined;
  if (userUtme && userUtme >= req.utmeMinimum) {
    const utmePart = userUtme / 8;
    if (req.institutionId === 'unilorin' || req.institutionId === 'ui' || req.institutionId === 'futa' || req.institutionId === 'abu') {
      // Cutoff = (UTME / 8) + (Post-UTME / 2) => Post-UTME = 2 * (Cutoff - (UTME / 8))
      const needed = (numericCutoff - utmePart) * 2;
      projectedNeededPostUtme = parseFloat(Math.min(100, Math.max(0, needed)).toFixed(1));
    } else if (req.institutionId === 'unilag') {
      // Cutoff = (UTME / 8) + Post-UTME (out of 30) + OLevel (out of 20)
      let olevelSum = 0;
      if (studentData.olevelGrades) {
        for (const subj of req.olevelRequirements) {
          const g = studentData.olevelGrades[subj] || studentData.olevelGrades[subj.toLowerCase()] || 'C4';
          olevelSum += getUnilagOlevelPoint(g);
        }
      } else {
        olevelSum = 16.0;
      }
      const needed = numericCutoff - utmePart - olevelSum;
      projectedNeededPostUtme = parseFloat(Math.min(30, Math.max(0, needed)).toFixed(1));
    } else if (req.institutionId === 'oau') {
      let olevelSum = 0;
      if (studentData.olevelScore !== undefined) {
        olevelSum = studentData.olevelScore;
      } else if (studentData.olevelGrades) {
        for (const subj of req.olevelRequirements) {
          const g = studentData.olevelGrades[subj] || studentData.olevelGrades[subj.toLowerCase()] || 'B3';
          olevelSum += getOauOlevelPoint(g);
        }
      } else {
        olevelSum = 8.0;
      }
      const needed = numericCutoff - utmePart - olevelSum;
      projectedNeededPostUtme = parseFloat(Math.min(40, Math.max(0, needed)).toFixed(1));
    } else if (req.institutionId === 'unn') {
      // Cutoff = (UTME + Post-UTME) / 2 => Post-UTME = 2 * Cutoff - UTME
      const needed = (numericCutoff * 2) - userUtme;
      projectedNeededPostUtme = parseFloat(Math.min(400, Math.max(0, needed)).toFixed(0));
    }
  }

  // Normalized Post-UTME user score
  let normalizedUserPostUtme: number | undefined = undefined;
  let postUtmeGap: number | undefined = undefined;
  let postUtmeGapDisplay = projectedNeededPostUtme !== undefined 
    ? `Target: ${projectedNeededPostUtme} / ${postUtmeMaxPossible} to hit merit cutoff`
    : 'Awaiting score entry';
  let postUtmeStatusType: 'exceeds-target' | 'on-track' | 'needs-improvement' | 'below-minimum' | 'pending' = 'pending';
  let postUtmeFeedback = projectedNeededPostUtme !== undefined
    ? `Based on your UTME score (${userUtme}), aim for at least ${projectedNeededPostUtme}/${postUtmeMaxPossible} in ${req.institutionShortName} Post-UTME CBT to reach the ${req.recentCutoff.score} benchmark.`
    : `Official screening pass mark: ${postUtmeMinPass}/${postUtmeMaxPossible}.`;

  if (studentData.postUtmeScore !== undefined && studentData.postUtmeScore > 0) {
    const raw = studentData.postUtmeScore;
    if (req.institutionId === 'unilag') {
      normalizedUserPostUtme = raw > 30 ? (raw / 100) * 30 : raw;
    } else if (req.institutionId === 'oau') {
      // In OAU, Post-UTME screening is scored out of 40 and directly contributes 40 marks to aggregate.
      // If user provided a percentage or score out of 100 (raw > 40), scale it: (raw / 100) * 40.
      // Otherwise raw <= 40 is already the direct score out of 40.
      normalizedUserPostUtme = raw > 40 ? (raw / 100) * 40 : raw;
    } else if (req.institutionId === 'unn') {
      normalizedUserPostUtme = raw <= 100 ? raw * 4 : raw;
    } else {
      normalizedUserPostUtme = raw;
    }

    if (normalizedUserPostUtme < postUtmeMinPass) {
      postUtmeStatusType = 'below-minimum';
      postUtmeGap = parseFloat((postUtmeMinPass - normalizedUserPostUtme).toFixed(1));
      postUtmeGapDisplay = `${normalizedUserPostUtme.toFixed(1)} / ${postUtmeMaxPossible} (Below Minimum Pass Mark)`;
      postUtmeFeedback = `Your score of ${normalizedUserPostUtme.toFixed(1)} is below the official ${req.institutionShortName} pass mark (${postUtmeMinPass}/${postUtmeMaxPossible}). Disqualifying.`;
      disqualifications.push(`Post-UTME: Score (${normalizedUserPostUtme.toFixed(1)}) failed ${req.institutionShortName} screening pass mark of ${postUtmeMinPass}/${postUtmeMaxPossible}.`);
    } else if (normalizedUserPostUtme >= postUtmeTargetNumber) {
      postUtmeStatusType = 'exceeds-target';
      postUtmeGap = 0;
      postUtmeGapDisplay = '0 (Target Met)';
      postUtmeFeedback = `Your screening score of ${normalizedUserPostUtme.toFixed(1)}/${postUtmeMaxPossible} meets or exceeds competitive targets.`;
      eligibilityReasons.push(`Post-UTME: Screening pass mark met (${normalizedUserPostUtme.toFixed(1)}/${postUtmeMaxPossible}).`);
    } else {
      postUtmeStatusType = 'needs-improvement';
      postUtmeGap = parseFloat((postUtmeTargetNumber - normalizedUserPostUtme).toFixed(1));
      postUtmeGapDisplay = `+${postUtmeGap} points needed`;
      postUtmeFeedback = `Your screening score of ${normalizedUserPostUtme.toFixed(1)}/${postUtmeMaxPossible} clears minimum pass mark (${postUtmeMinPass}), but is below competitive target (${postUtmeTargetNumber}).`;
      eligibilityReasons.push(`Post-UTME: Screening pass mark met (${normalizedUserPostUtme.toFixed(1)}/${postUtmeMaxPossible}).`);
    }
  }

  // -------------------------------------------------------------
  // 4. INSTITUTIONAL AGGREGATE CALCULATION (Strictly per institution)
  // -------------------------------------------------------------
  let calculatedAggregate: StudentReadinessComparison['calculatedAggregate'] = undefined;

  if (userUtme && userUtme >= req.utmeMinimum) {
    const isPostUtmeProvided = normalizedUserPostUtme !== undefined && normalizedUserPostUtme > 0;
    const utmePart = userUtme / 8;

    if (req.institutionId === 'unilorin') {
      // UNILORIN Official Model: (UTME ÷ 8) + (Post-UTME CBT ÷ 2) = 100
      // UTME = 50% (Max 50)
      // Post-UTME CBT = 50% (Max 50)
      // O'Level 5 core credits are mandatory baseline eligibility (not aggregated into points)
      if (isPostUtmeProvided) {
        const postUtmePart = normalizedUserPostUtme! / 2;
        const total = parseFloat((utmePart + postUtmePart).toFixed(2));
        const gapToBm = parseFloat((total - numericCutoff).toFixed(2));
        const status = total >= numericCutoff ? 'Competitive' : total >= (numericCutoff - 4.5) ? 'Close to Benchmark' : 'Below Benchmark';

        calculatedAggregate = {
          institutionId: 'unilorin',
          institutionName: 'University of Ilorin',
          formulaName: 'UNILORIN 50:50 Aggregate Formula',
          formulaExplanation: '(UTME ÷ 8) + (Post-UTME CBT ÷ 2) = 100%. UTME provides 50%, Post-UTME CBT provides 50%.',
          isComplete: true,
          score: total,
          maxScore: 100,
          cutOffBenchmark: req.recentCutoff.score,
          numericBenchmark: numericCutoff,
          benchmarkSession: req.recentCutoff.session,
          gapToBenchmark: gapToBm,
          gapDisplay: gapToBm >= 0 ? `+${gapToBm} above merit benchmark` : `${gapToBm} below merit benchmark`,
          status,
          breakdownText: `UNILORIN 50:50 Model: UTME (${userUtme} ÷ 8 = ${utmePart.toFixed(2)}/50) + Post-UTME CBT (${normalizedUserPostUtme!.toFixed(0)} ÷ 2 = ${postUtmePart.toFixed(2)}/50) = ${total.toFixed(2)}/100`,
          components: {
            utme: { score: parseFloat(utmePart.toFixed(1)), max: 50, label: 'UTME (÷ 8)', percentage: parseFloat(((utmePart / 50) * 100).toFixed(1)) },
            postUtme: { score: parseFloat(postUtmePart.toFixed(1)), max: 50, label: 'Post-UTME CBT (÷ 2)', percentage: parseFloat(normalizedUserPostUtme!.toFixed(1)) }
          }
        };
      } else {
        const currentInterim = parseFloat(utmePart.toFixed(2));
        const neededPost = projectedNeededPostUtme || 76;
        calculatedAggregate = {
          institutionId: 'unilorin',
          institutionName: 'University of Ilorin',
          formulaName: 'UNILORIN 50:50 Aggregate Formula',
          formulaExplanation: '(UTME ÷ 8) + (Post-UTME CBT ÷ 2) = 100%. UTME provides 50%, Post-UTME CBT provides 50%.',
          isComplete: false,
          score: currentInterim,
          maxScore: 100,
          cutOffBenchmark: req.recentCutoff.score,
          numericBenchmark: numericCutoff,
          benchmarkSession: req.recentCutoff.session,
          gapToBenchmark: parseFloat((currentInterim - numericCutoff).toFixed(2)),
          gapDisplay: `Need ${neededPost.toFixed(1)}/100 on Post-UTME CBT`,
          status: 'Pending Post-UTME',
          breakdownText: `UNILORIN 50:50 Model: UTME (${userUtme} ÷ 8 = ${utmePart.toFixed(2)}/50). Post-UTME CBT contributes remaining 50 marks (Target: ${neededPost.toFixed(1)}/100 to hit ${req.recentCutoff.score}).`,
          components: {
            utme: { score: parseFloat(utmePart.toFixed(1)), max: 50, label: 'UTME (÷ 8)', percentage: parseFloat(((utmePart / 50) * 100).toFixed(1)) }
          }
        };
      }
    } else if (req.institutionId === 'unilag') {
      // UNILAG Official Model: (UTME ÷ 8) + Post-UTME CBT (out of 30) + O'Level Points (out of 20) = 100
      let olevelPart = 0;
      if (studentData.olevelGrades && Object.keys(studentData.olevelGrades).length > 0) {
        for (const subj of req.olevelRequirements) {
          const g = studentData.olevelGrades[subj] || studentData.olevelGrades[subj.toLowerCase()] || 'C4';
          olevelPart += getUnilagOlevelPoint(g);
        }
      } else {
        olevelPart = 16.0;
      }

      if (isPostUtmeProvided) {
        const postUtmePart = normalizedUserPostUtme!;
        const total = parseFloat((utmePart + postUtmePart + olevelPart).toFixed(2));
        const gapToBm = parseFloat((total - numericCutoff).toFixed(2));
        const status = total >= numericCutoff ? 'Competitive' : total >= (numericCutoff - 5.5) ? 'Close to Benchmark' : 'Below Benchmark';

        calculatedAggregate = {
          institutionId: 'unilag',
          institutionName: 'University of Lagos',
          formulaName: 'UNILAG 50:30:20 Aggregate Model',
          formulaExplanation: '(UTME ÷ 8) + Post-UTME CBT (30%) + O\'Level Points (20%) = 100%.',
          isComplete: true,
          score: total,
          maxScore: 100,
          cutOffBenchmark: req.recentCutoff.score,
          numericBenchmark: numericCutoff,
          benchmarkSession: req.recentCutoff.session,
          gapToBenchmark: gapToBm,
          gapDisplay: gapToBm >= 0 ? `+${gapToBm} above merit benchmark` : `${gapToBm} below merit benchmark`,
          status,
          breakdownText: `UNILAG 50:30:20 Model: UTME (${utmePart.toFixed(2)}/50) + Post-UTME CBT (${postUtmePart.toFixed(1)}/30) + O'Level (${olevelPart.toFixed(1)}/20) = ${total.toFixed(2)}/100`,
          components: {
            utme: { score: parseFloat(utmePart.toFixed(1)), max: 50, label: 'UTME (÷ 8)', percentage: parseFloat(((utmePart / 50) * 100).toFixed(1)) },
            postUtme: { score: parseFloat(postUtmePart.toFixed(1)), max: 30, label: 'Post-UTME CBT', percentage: parseFloat(((postUtmePart / 30) * 100).toFixed(1)) },
            olevel: { score: parseFloat(olevelPart.toFixed(1)), max: 20, label: "O'Level Points", percentage: parseFloat(((olevelPart / 20) * 100).toFixed(1)) }
          }
        };
      } else {
        const currentInterim = parseFloat((utmePart + olevelPart).toFixed(2));
        const neededPost = projectedNeededPostUtme || 24;
        calculatedAggregate = {
          institutionId: 'unilag',
          institutionName: 'University of Lagos',
          formulaName: 'UNILAG 50:30:20 Aggregate Model',
          formulaExplanation: '(UTME ÷ 8) + Post-UTME CBT (30%) + O\'Level Points (20%) = 100%.',
          isComplete: false,
          score: currentInterim,
          maxScore: 100,
          cutOffBenchmark: req.recentCutoff.score,
          numericBenchmark: numericCutoff,
          benchmarkSession: req.recentCutoff.session,
          gapToBenchmark: parseFloat((currentInterim - numericCutoff).toFixed(2)),
          gapDisplay: `Need ${neededPost.toFixed(1)}/30 on Post-UTME CBT`,
          status: 'Pending Post-UTME',
          breakdownText: `UNILAG 50:30:20 Model: UTME (${utmePart.toFixed(2)}/50) + O'Level (${olevelPart.toFixed(1)}/20) = ${currentInterim}/70. Post-UTME contributes remaining 30 marks (Target: ${neededPost.toFixed(1)}/30).`
        };
      }
    } else if (req.institutionId === 'ui') {
      // UI Model: (UTME ÷ 8) + (Post-UTME ÷ 2) = 100
      if (isPostUtmeProvided) {
        const postUtmePart = normalizedUserPostUtme! / 2;
        const total = parseFloat((utmePart + postUtmePart).toFixed(2));
        const gapToBm = parseFloat((total - numericCutoff).toFixed(2));
        const status = total >= numericCutoff ? 'Competitive' : total >= (numericCutoff - 5) ? 'Close to Benchmark' : 'Below Benchmark';

        calculatedAggregate = {
          institutionId: 'ui',
          institutionName: 'University of Ibadan',
          formulaName: 'UI 50:50 Aggregate Formula',
          formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100%.',
          isComplete: true,
          score: total,
          maxScore: 100,
          cutOffBenchmark: req.recentCutoff.score,
          numericBenchmark: numericCutoff,
          benchmarkSession: req.recentCutoff.session,
          gapToBenchmark: gapToBm,
          gapDisplay: gapToBm >= 0 ? `+${gapToBm} above merit benchmark` : `${gapToBm} below merit benchmark`,
          status,
          breakdownText: `UI 50:50 Model: UTME (${utmePart.toFixed(2)}/50) + Post-UTME CBT (${postUtmePart.toFixed(2)}/50) = ${total.toFixed(2)}/100`
        };
      } else {
        const currentInterim = parseFloat(utmePart.toFixed(2));
        const neededPost = projectedNeededPostUtme || 76;
        calculatedAggregate = {
          institutionId: 'ui',
          institutionName: 'University of Ibadan',
          formulaName: 'UI 50:50 Aggregate Formula',
          formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100%.',
          isComplete: false,
          score: currentInterim,
          maxScore: 100,
          cutOffBenchmark: req.recentCutoff.score,
          numericBenchmark: numericCutoff,
          benchmarkSession: req.recentCutoff.session,
          gapToBenchmark: parseFloat((currentInterim - numericCutoff).toFixed(2)),
          gapDisplay: `Need ${neededPost.toFixed(1)}/100 on Post-UTME`,
          status: 'Pending Post-UTME',
          breakdownText: `UI 50:50 Model: UTME (${utmePart.toFixed(2)}/50). Post-UTME contributes remaining 50 marks (Target: ${neededPost.toFixed(1)}/100).`
        };
      }
    } else if (req.institutionId === 'oau') {
      // OAU Model: UTME (UTME ÷ 8, max 50) + Post-UTME Screening (max 40) + O'Level Points (max 10) = 100
      let olevelPart = 0;
      if (studentData.olevelScore !== undefined) {
        olevelPart = studentData.olevelScore;
      } else if (studentData.olevelGrades && Object.keys(studentData.olevelGrades).length > 0) {
        for (const subj of req.olevelRequirements) {
          const g = studentData.olevelGrades[subj] || studentData.olevelGrades[subj.toLowerCase()] || 'B3';
          olevelPart += getOauOlevelPoint(g);
        }
        olevelPart = parseFloat(olevelPart.toFixed(1));
      } else {
        olevelPart = 8.0;
      }

      if (isPostUtmeProvided) {
        const postUtmePart = normalizedUserPostUtme!; // raw score out of 40
        const postUtmePercentage = parseFloat(((postUtmePart / 40) * 100).toFixed(1));
        const total = parseFloat((utmePart + postUtmePart + olevelPart).toFixed(2));
        const gapToBm = parseFloat((total - numericCutoff).toFixed(2));
        const status = total >= numericCutoff ? 'Competitive' : total >= (numericCutoff - 5) ? 'Close to Benchmark' : 'Below Benchmark';

        calculatedAggregate = {
          institutionId: 'oau',
          institutionName: 'Obafemi Awolowo University',
          formulaName: 'OAU 50:40:10 Aggregate Formula',
          formulaExplanation: 'UTME (UTME ÷ 8, max 50) + Post-UTME Screening (max 40) + O\'Level Points (max 10) = 100.',
          isComplete: true,
          score: total,
          maxScore: 100,
          cutOffBenchmark: req.recentCutoff.score,
          numericBenchmark: numericCutoff,
          benchmarkSession: req.recentCutoff.session,
          gapToBenchmark: gapToBm,
          gapDisplay: gapToBm >= 0 ? `+${gapToBm} above merit benchmark` : `${gapToBm} below merit benchmark`,
          status,
          breakdownText: `OAU Admission Aggregate: UTME (${utmePart.toFixed(1)}/50) + Post-UTME (${postUtmePart.toFixed(1)}/40, ${postUtmePercentage}%) + O'Level (${olevelPart.toFixed(1)}/10) = ${total.toFixed(2)}/100`,
          components: {
            utme: { score: parseFloat(utmePart.toFixed(1)), max: 50, label: 'UTME (÷ 8)', percentage: parseFloat(((utmePart / 50) * 100).toFixed(1)) },
            postUtme: { score: parseFloat(postUtmePart.toFixed(1)), max: 40, label: 'Post-UTME Screening', percentage: postUtmePercentage },
            olevel: { score: parseFloat(olevelPart.toFixed(1)), max: 10, label: "O'Level Points", percentage: parseFloat(((olevelPart / 10) * 100).toFixed(1)) }
          }
        };
      } else {
        const currentInterim = parseFloat((utmePart + olevelPart).toFixed(2));
        const neededPost = projectedNeededPostUtme !== undefined ? projectedNeededPostUtme : 28.0;
        calculatedAggregate = {
          institutionId: 'oau',
          institutionName: 'Obafemi Awolowo University',
          formulaName: 'OAU 50:40:10 Aggregate Formula',
          formulaExplanation: 'UTME (UTME ÷ 8, max 50) + Post-UTME Screening (max 40) + O\'Level Points (max 10) = 100.',
          isComplete: false,
          score: currentInterim,
          maxScore: 100,
          cutOffBenchmark: req.recentCutoff.score,
          numericBenchmark: numericCutoff,
          benchmarkSession: req.recentCutoff.session,
          gapToBenchmark: parseFloat((currentInterim - numericCutoff).toFixed(2)),
          gapDisplay: `Need ${neededPost.toFixed(1)}/40 on Post-UTME`,
          status: 'Pending Post-UTME',
          breakdownText: `OAU 50:40:10 Model: UTME (${utmePart.toFixed(1)}/50) + O'Level (${olevelPart.toFixed(1)}/10) = ${currentInterim}/60. Post-UTME screening contributes remaining 40 marks (Need: ${neededPost.toFixed(1)}/40).`,
          components: {
            utme: { score: parseFloat(utmePart.toFixed(1)), max: 50, label: 'UTME (÷ 8)', percentage: parseFloat(((utmePart / 50) * 100).toFixed(1)) },
            olevel: { score: parseFloat(olevelPart.toFixed(1)), max: 10, label: "O'Level Points", percentage: parseFloat(((olevelPart / 10) * 100).toFixed(1)) }
          }
        };
      }
    } else if (req.institutionId === 'unn') {
      // UNN Model: (UTME + Post-UTME) ÷ 2 = Combined Average out of 400
      if (isPostUtmeProvided) {
        const total = parseFloat(((userUtme + normalizedUserPostUtme!) / 2).toFixed(1));
        const gapToBm = parseFloat((total - numericCutoff).toFixed(1));
        const status = total >= numericCutoff ? 'Competitive' : total >= (numericCutoff - 20) ? 'Close to Benchmark' : 'Below Benchmark';

        calculatedAggregate = {
          institutionId: 'unn',
          institutionName: 'University of Nigeria, Nsukka',
          formulaName: 'UNN Combined Average Formula',
          formulaExplanation: '[UTME (400) + Post-UTME (400)] ÷ 2 = Combined Average out of 400.',
          isComplete: true,
          score: total,
          maxScore: 400,
          cutOffBenchmark: req.recentCutoff.score,
          numericBenchmark: numericCutoff,
          benchmarkSession: req.recentCutoff.session,
          gapToBenchmark: gapToBm,
          gapDisplay: gapToBm >= 0 ? `+${gapToBm} above merit benchmark` : `${gapToBm} below merit benchmark`,
          status,
          breakdownText: `UNN Model: [UTME (${userUtme}/400) + Post-UTME (${normalizedUserPostUtme!.toFixed(0)}/400)] ÷ 2 = ${total.toFixed(1)}/400`
        };
      } else {
        const neededPost = projectedNeededPostUtme || 290;
        calculatedAggregate = {
          institutionId: 'unn',
          institutionName: 'University of Nigeria, Nsukka',
          formulaName: 'UNN Combined Average Formula',
          formulaExplanation: '[UTME (400) + Post-UTME (400)] ÷ 2 = Combined Average out of 400.',
          isComplete: false,
          score: userUtme,
          maxScore: 400,
          cutOffBenchmark: req.recentCutoff.score,
          numericBenchmark: numericCutoff,
          benchmarkSession: req.recentCutoff.session,
          gapToBenchmark: parseFloat((userUtme - numericCutoff).toFixed(1)),
          gapDisplay: `Need ${neededPost.toFixed(0)}/400 on Post-UTME`,
          status: 'Pending Post-UTME',
          breakdownText: `UNN Model: UTME is ${userUtme}/400. Post-UTME CBT contributes second 400 (Target: ${neededPost.toFixed(0)}/400 to hit ${req.recentCutoff.score}).`
        };
      }
    } else {
      // Standard ABU / FUTA 50:50 Model
      if (isPostUtmeProvided) {
        const postUtmePart = normalizedUserPostUtme! / 2;
        const total = parseFloat((utmePart + postUtmePart).toFixed(2));
        const gapToBm = parseFloat((total - numericCutoff).toFixed(2));
        const status = total >= numericCutoff ? 'Competitive' : total >= (numericCutoff - 5) ? 'Close to Benchmark' : 'Below Benchmark';

        calculatedAggregate = {
          institutionId: req.institutionId,
          institutionName: req.institution,
          formulaName: `${req.institutionShortName} 50:50 Aggregate Formula`,
          formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100%.',
          isComplete: true,
          score: total,
          maxScore: 100,
          cutOffBenchmark: req.recentCutoff.score,
          numericBenchmark: numericCutoff,
          benchmarkSession: req.recentCutoff.session,
          gapToBenchmark: gapToBm,
          gapDisplay: gapToBm >= 0 ? `+${gapToBm} above merit benchmark` : `${gapToBm} below merit benchmark`,
          status,
          breakdownText: `${req.institutionShortName} 50:50 Model: UTME (${utmePart.toFixed(2)}/50) + Post-UTME (${postUtmePart.toFixed(2)}/50) = ${total.toFixed(2)}/100`
        };
      } else {
        const currentInterim = parseFloat(utmePart.toFixed(2));
        const neededPost = projectedNeededPostUtme || 72;
        calculatedAggregate = {
          institutionId: req.institutionId,
          institutionName: req.institution,
          formulaName: `${req.institutionShortName} 50:50 Aggregate Formula`,
          formulaExplanation: '(UTME ÷ 8) + (Post-UTME ÷ 2) = 100%.',
          isComplete: false,
          score: currentInterim,
          maxScore: 100,
          cutOffBenchmark: req.recentCutoff.score,
          numericBenchmark: numericCutoff,
          benchmarkSession: req.recentCutoff.session,
          gapToBenchmark: parseFloat((currentInterim - numericCutoff).toFixed(2)),
          gapDisplay: `Need ${neededPost.toFixed(1)}/100 on Post-UTME`,
          status: 'Pending Post-UTME',
          breakdownText: `${req.institutionShortName} 50:50 Model: UTME (${utmePart.toFixed(2)}/50). Post-UTME contributes remaining 50 marks.`
        };
      }
    }
  }

  // -------------------------------------------------------------
  // 5. ELIGIBILITY EVALUATION (Rule 5: Baseline Qualification)
  // -------------------------------------------------------------
  const isEligible = disqualifications.length === 0 && (userUtme ? userUtme >= req.utmeMinimum : true);
  const eligibilityStatus: 'Eligible' | 'Not Eligible' = isEligible ? 'Eligible' : 'Not Eligible';

  // -------------------------------------------------------------
  // 6. QUANTITATIVE READINESS SCORE & LEVEL (Rule 2 & 5)
  // -------------------------------------------------------------
  let readinessPercentage = 0;
  let readinessScore = 0;
  let readinessLevel: 'Highly Ready & Competitive' | 'Ready / On Track' | 'Borderline / Needs Targeted Prep' | 'Below Competitive Benchmark' | 'Not Eligible' = 'Not Eligible';
  let readinessSummary = '';

  if (!isEligible) {
    readinessLevel = 'Not Eligible';
    readinessScore = 25;
    readinessPercentage = 25;
    readinessSummary = `Ineligible for ${req.programme} at ${req.institutionShortName}. Minimum admission thresholds not satisfied (${disqualifications[0] || 'Requirements unmet'}).`;
  } else if (calculatedAggregate && calculatedAggregate.isComplete) {
    readinessScore = calculatedAggregate.score;
    const ratio = calculatedAggregate.score / numericCutoff;
    readinessPercentage = Math.min(100, Math.round(ratio * 100));

    if (calculatedAggregate.score >= numericCutoff) {
      readinessLevel = 'Highly Ready & Competitive';
      readinessSummary = `Your aggregate of ${calculatedAggregate.score} exceeds ${req.institutionShortName}'s recent merit cutoff (${req.recentCutoff.score}). You are strongly positioned for first-batch merit admission.`;
    } else if (calculatedAggregate.score >= (numericCutoff - (numericCutoff * 0.06))) {
      readinessLevel = 'Ready / On Track';
      readinessSummary = `Your aggregate of ${calculatedAggregate.score} is within competitive range of the ${req.recentCutoff.score} benchmark. Highly viable on catchment or supplementary lists.`;
    } else if (calculatedAggregate.score >= (numericCutoff - (numericCutoff * 0.20))) {
      readinessLevel = 'Borderline / Needs Targeted Prep';
      readinessSummary = `Your aggregate of ${calculatedAggregate.score} is below the merit benchmark by ${(numericCutoff - calculatedAggregate.score).toFixed(2)} marks. Targeted preparation or exploring related courses is advised.`;
    } else {
      readinessLevel = 'Below Competitive Benchmark';
      readinessSummary = `Your aggregate of ${calculatedAggregate.score} is significantly below the merit cutoff (${req.recentCutoff.score}). Consider exploring allied programmes.`;
    }
  } else if (userUtme && userUtme >= req.utmeMinimum) {
    // Post-UTME Pending: readiness based on UTME + O'Level progress towards target
    readinessScore = userUtme;
    const utmeRatio = Math.min(1.0, userUtme / targetUtmeNumber);
    const olevelRatio = req.olevelRequirements.length > 0 ? (olevelMetTargetCount / req.olevelRequirements.length) : 1.0;
    readinessPercentage = Math.min(95, Math.round((utmeRatio * 0.7 + olevelRatio * 0.3) * 100));

    if (userUtme >= targetUtmeNumber) {
      readinessLevel = 'Ready / On Track';
      readinessSummary = `UTME target achieved (${userUtme}/${targetUtmeNumber}). Scoring at least ${projectedNeededPostUtme?.toFixed(0) || 75}/${postUtmeMaxPossible} in ${req.institutionShortName} Post-UTME CBT will secure merit admission.`;
    } else if (userUtme >= targetUtmeNumber - 30) {
      readinessLevel = 'Borderline / Needs Targeted Prep';
      readinessSummary = `Eligible for screening, but your UTME score requires ${projectedNeededPostUtme?.toFixed(0) || 78}/${postUtmeMaxPossible} in ${req.institutionShortName} Post-UTME CBT to reach merit benchmark.`;
    } else {
      readinessLevel = 'Below Competitive Benchmark';
      readinessSummary = `Eligible for screening, but current UTME score makes reaching the ${req.recentCutoff.score} merit cutoff challenging.`;
    }
  } else {
    readinessLevel = 'Borderline / Needs Targeted Prep';
    readinessScore = 50;
    readinessPercentage = 50;
    readinessSummary = `Enter your UTME score and O'Level grades to calculate readiness against verified ${req.institutionShortName} admission benchmarks.`;
  }

  // Default recommendations if eligible and on-track
  if (isEligible && recommendations.length === 0) {
    recommendations.push({
      title: 'Maintain Strong Academic Momentum',
      action: `Prepare thoroughly for ${req.institutionShortName} Post-UTME CBT screening using verified departmental past questions.`,
      impact: 'Secures performance above the departmental merit cutoff.',
      priority: 'High'
    });
  }

  return {
    programme: req.programme,
    institutionId: req.institutionId,
    institution: req.institution,
    institutionShortName: req.institutionShortName,
    academicSession: req.academicSession,

    eligibility: {
      isEligible,
      status: eligibilityStatus,
      reasons: eligibilityReasons,
      disqualifications
    },

    readiness: {
      score: readinessScore,
      percentage: readinessPercentage,
      level: readinessLevel,
      summary: readinessSummary
    },

    targets: {
      utme: {
        currentScore: userUtme,
        minimumRequired: req.utmeMinimum,
        recommendedTarget: targetUtmeNumber,
        recommendedTargetDisplay: req.targetUtme,
        gap: utmeGap,
        gapDisplay: utmeGapDisplay,
        status: utmeStatusType,
        feedback: utmeFeedback
      },
      postUtme: {
        required: req.postUtmeRequired,
        currentScore: normalizedUserPostUtme,
        minimumRequired: postUtmeMinPass,
        recommendedTarget: postUtmeTargetNumber,
        recommendedTargetDisplay: req.targetPostUtme,
        maxPossible: postUtmeMaxPossible,
        gap: postUtmeGap,
        gapDisplay: postUtmeGapDisplay,
        projectedNeededForCutoff: projectedNeededPostUtme,
        percentagePerformance: normalizedUserPostUtme !== undefined ? parseFloat(((normalizedUserPostUtme / postUtmeMaxPossible) * 100).toFixed(1)) : undefined,
        aggregateContribution: normalizedUserPostUtme !== undefined ? (
          req.institutionId === 'oau'
            ? normalizedUserPostUtme
            : req.institutionId === 'unilorin' || req.institutionId === 'ui' || req.institutionId === 'abu' || req.institutionId === 'futa'
            ? normalizedUserPostUtme / 2
            : req.institutionId === 'unilag'
            ? normalizedUserPostUtme
            : normalizedUserPostUtme
        ) : undefined,
        status: postUtmeStatusType,
        feedback: postUtmeFeedback
      },
      olevel: olevelComparison
    },

    calculatedAggregate,
    recommendations,

    // Backward compatibility bindings for components
    utmeStatus: {
      label: utmeStatusType === 'exceeds-target' 
        ? 'On track' 
        : utmeStatusType === 'below-minimum' 
        ? 'Below published minimum' 
        : utmeStatusType === 'needs-improvement' 
        ? 'Needs improvement' 
        : 'Target not verified',
      type: utmeStatusType === 'exceeds-target' ? 'on-track' : utmeStatusType === 'pending' ? 'not-verified' : utmeStatusType,
      userScore: userUtme,
      targetScore: req.targetUtme,
      minimumScore: req.utmeMinimum,
      feedback: utmeFeedback
    },
    postUtmeStatus: {
      label: postUtmeStatusType === 'exceeds-target'
        ? 'On track'
        : postUtmeStatusType === 'below-minimum'
        ? 'Below published minimum'
        : postUtmeStatusType === 'needs-improvement'
        ? 'Needs improvement'
        : 'Target not verified',
      type: postUtmeStatusType === 'exceeds-target' ? 'on-track' : postUtmeStatusType === 'pending' ? 'not-verified' : postUtmeStatusType,
      userScore: normalizedUserPostUtme,
      targetScore: req.targetPostUtme,
      feedback: postUtmeFeedback
    },
    olevelComparison: olevelComparison.map(item => ({
      subject: item.subject,
      userGrade: item.userGrade,
      targetGrade: item.targetGrade,
      minimumGrade: item.minimumGrade,
      status: item.status === 'not-entered' ? 'not-verified' : item.status,
      feedback: item.feedback
    }))
  };
}
