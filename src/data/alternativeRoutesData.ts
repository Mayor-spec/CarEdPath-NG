export interface AlternativeScenario {
  id: string;
  scenarioQuestion: string;
  shortLabel: string;
  branchTitle: string;
  targetPhases: number[]; // e.g. [2, 3]
  icon: string;
  coreSprout: string;
  description: string;
  pathwaySteps: {
    stepTitle: string;
    duration: string;
    details: string;
    institutionExamples: string;
  }[];
  credentialsEarned: string[];
  costComparison: {
    standardCost: string;
    alternateCost: string;
    financialUpside: string;
  };
  directEntryBridge: {
    title: string;
    mechanism: string;
    requirements: string;
  };
  insiderSecret: string;
}

export const ALTERNATIVE_SCENARIOS: Record<string, AlternativeScenario> = {
  'low-utme': {
    id: 'low-utme',
    scenarioQuestion: 'What if my UTME score is too low for university admission?',
    shortLabel: 'Low UTME Score (Under 200/240)',
    branchTitle: 'JUPEB / IJMB (Direct Entry into 200 Level) or Polytechnic ND Transfer',
    targetPhases: [2, 3],
    icon: 'route',
    coreSprout: 'Sprout Alternate Branch: JUPEB / IJMB (Direct Entry into 200 Level), Pre-Degree, or National Diploma (ND) via Polytechnic, transferring later.',
    description: 'Rather than sitting at home for a whole year to re-write JAMB, take an accredited Nigerian gateway that enters you into 200 Level (Year 2) without losing academic progress.',
    pathwaySteps: [
      {
        stepTitle: 'Step 1: Choose JUPEB, IJMB, or Polytechnic ND',
        duration: '9 to 18 Months',
        details: 'JUPEB (Joint Universities Preliminary Examinations Board) or IJMB is an intensive A-Level program where you take your 3 core subjects. Alternatively, accept an NBTE-accredited ND in Science Lab Tech, Computer Science, or Business Admin.',
        institutionExamples: 'JUPEB at UNILAG, UNILORIN, OAU, UNN; IJMB at ABU Zaria; ND at YABATECH, Fed Poly Offa, MAPOLY.'
      },
      {
        stepTitle: 'Step 2: Excel with Benchmark Points',
        duration: 'Examination Window',
        details: 'Aim for 8–12 points in JUPEB/IJMB or an Upper Credit (CGPA 3.00+) in your National Diploma. This fulfills official JAMB minimums for Direct Entry into top federal universities.',
        institutionExamples: 'Lectures run directly on university/polytechnic campuses with intensive lab practicals.'
      },
      {
        stepTitle: 'Step 3: Direct Entry (DE) Matriculation into 200L',
        duration: 'Matriculate Straight to Year 2',
        details: 'Purchase the JAMB Direct Entry form. You bypass 100 Level general courses (GST/CHM 101) and join continuing 200 Level students in your original target degree.',
        institutionExamples: 'Recognized across 95% of Federal and State universities in Nigeria.'
      }
    ],
    credentialsEarned: [
      'JUPEB / IJMB Advanced Level Certificate (Equivalent to Cambridge A-Levels)',
      'National Diploma (ND) Certificate (NBTE accredited)',
      'Guaranteed 200 Level Direct Entry Admission Slip'
    ],
    costComparison: {
      standardCost: 'Retaking JAMB: ₦7,700 + ₦150,000 lesson center fees per idle gap year.',
      alternateCost: 'JUPEB: ₦180,000–₦280,000 (once) | Poly ND: ₦45,000–₦65,000/year.',
      financialUpside: 'Zero wasted years. In the polytechnic route, your tuition is 40% lower than university 100L while keeping pace with peers.'
    },
    directEntryBridge: {
      title: 'Direct Entry Transfer Protocol',
      mechanism: 'JAMB DE Portal Registration (Opens March–May annually)',
      requirements: 'Minimum 8–10 JUPEB Points or Upper Credit (CGPA 3.0+) in accredited ND program.'
    },
    insiderSecret: 'Many top department heads in Nigerian federal universities secretly prefer Direct Entry students because JUPEB and ND practicals prepare students far better than secondary school cramming!'
  },

  'low-funds': {
    id: 'low-funds',
    scenarioQuestion: 'What if my family cannot afford university tuition?',
    shortLabel: 'Tuition & Financial Constraint',
    branchTitle: 'State-Subsidized Work-Study, NOUN Flexible Hybrid & Tech Fellowships',
    targetPhases: [2, 3],
    icon: 'savings',
    coreSprout: 'Sprout Alternate Branch: State-subsidized programs, National Open University of Nigeria (NOUN) flexible work-study, Federal/State technical colleges, or free vetted tech bootcamps with laptop loan schemes.',
    description: 'Higher education does not require heavy lump sums. This subsidized and flexible route enables you to earn, self-sponsor, and access zero-interest laptop loans while earning an accredited federal degree.',
    pathwaySteps: [
      {
        stepTitle: 'Step 1: Enroll in NOUN or State Subsidized College',
        duration: 'Self-Paced / 4 Years',
        details: 'The National Open University of Nigeria (NOUN) charges modular pay-per-course fees (roughly ₦18,000–₦32,000 per semester) with no strikes, no hostel fees, and total flexibility.',
        institutionExamples: 'Over 100 NOUN Study Centres across all 36 Nigerian states; State Technical Colleges (e.g. LASTVEB Lagos).'
      },
      {
        stepTitle: 'Step 2: Pair with Vetted Female Tech & Skill Fellowships',
        duration: 'Month 3 to 12',
        details: 'Enroll in free government & philanthropic programs (3MTT Nigeria, She Code Africa, ALX Africa, Ingressive for Good) that offer free data allowances and laptop loan/grant schemes for young women.',
        institutionExamples: 'Federal Ministry of Communications 3MTT Cohorts, She Code Africa Academy, EdoJobs / Lagos Innovates.'
      },
      {
        stepTitle: 'Step 3: Work-Study & Remote Earnings',
        duration: 'Year 2 Onwards',
        details: 'Leverage data entry, junior tech support, pharmacy assistant, or digital marketing gigs to earn ₦60,000–₦120,000/month, completely covering your semester fees with spare savings.',
        institutionExamples: 'Remote internships, local clinic labs, SME bookkeeping, teleperformance hubs in Lagos/Abuja.'
      }
    ],
    credentialsEarned: [
      'B.Sc Degree accredited by the National Universities Commission (NUC)',
      'NYSC Letter of Exclusion or Exemption / Regularization',
      'Professional Tech / Vocational Certifications with Portfolio'
    ],
    costComparison: {
      standardCost: 'Private/State University: ₦350,000 – ₦1,200,000/year + ₦300k accommodation.',
      alternateCost: 'NOUN / Subsidized: ₦45,000 – ₦65,000/year + zero hostel overhead.',
      financialUpside: 'Save over ₦2,000,000 across your program while building 2+ years of real work experience.'
    },
    directEntryBridge: {
      title: 'NELFUND & Corporate Bursary Integration',
      mechanism: 'Nigeria Student Loan Fund (NELFUND) & NNPC/Total Female Scholarships',
      requirements: 'Admission letter + NIN + Bank Verification Number (BVN) for 100% tuition coverage + upkeep stipends.'
    },
    insiderSecret: 'NOUN certificates carry the exact same legal weight with the Federal Civil Service and NYSC as conventional universities, but you graduate debt-free and already employed!'
  },

  'mlt-health': {
    id: 'mlt-health',
    scenarioQuestion: 'What if I want a laboratory/health career without going through MBBS or 5-year B.MLS?',
    shortLabel: 'Faster 3-Year Health Licensure (MLT)',
    branchTitle: 'Medical Laboratory Technician (MLT) via College of Health Technology',
    targetPhases: [2, 3],
    icon: 'biotech',
    coreSprout: 'Sprout Alternate Branch: Medical Laboratory Technician (MLT) via College of Health Technology (3-year license) with future Direct Entry upgrade routes.',
    description: 'Get your official laboratory practicing license in 3 years instead of 5–6 years. Start working legally in hospital diagnostic centers, then use Direct Entry to complete your full degree while earning a salary.',
    pathwaySteps: [
      {
        stepTitle: 'Step 1: Entrance into College of Health Technology',
        duration: 'Year 1',
        details: 'Colleges of Health Technology organize their own internal entrance screening without high UTME cut-offs (only requiring 5 O\'Level credits in English, Maths, Biology, Chemistry, Physics).',
        institutionExamples: 'Lagos State College of Health Tech (LASCOHET), Ogun State College of Health Tech, Shehu Idris College Makarfi, Abia State College of Health.'
      },
      {
        stepTitle: 'Step 2: 3-Year Clinical Training & Hospital Postings',
        duration: 'Year 2 & 3',
        details: 'Intensive practical training in haematology, chemical pathology, medical microbiology, and blood banking, with direct clinical rotations in state general hospitals.',
        institutionExamples: 'State Teaching Hospitals and General Hospital Diagnostic Centers.'
      },
      {
        stepTitle: 'Step 3: MLSCN National Licensure Exam & Practice',
        duration: 'Year 3 (Induction)',
        details: 'Sit for the Medical Laboratory Science Council of Nigeria (MLSCN) national licensing exam. Receive your MLT License and practicing registration pin.',
        institutionExamples: 'Accredited and supervised nationwide by MLSCN.'
      }
    ],
    credentialsEarned: [
      'Medical Laboratory Technician (MLT) Professional Diploma',
      'MLSCN Practicing License & Annual Practicing Seal',
      'Eligibility for immediate employment in government and private medical laboratories'
    ],
    costComparison: {
      standardCost: '5-Year B.MLS / 6-Year MBBS: 5–6 years + strike delays + clinical levies.',
      alternateCost: '3-Year MLT: ₦50,000–₦85,000/year at State Colleges of Health Tech.',
      financialUpside: 'You start earning legal diagnostic income at age 20 or 21, two years ahead of university classmates.'
    },
    directEntryBridge: {
      title: 'Direct Entry Degree Upgrade (B.MLS Conversion)',
      mechanism: 'MLSCN / University B.MLS DE Conversion Program',
      requirements: 'MLT License + 2 years work experience allows Direct Entry into 200L or 300L B.MLS at institutions like UNILORIN, UNIMAID, or Rivers State University.'
    },
    insiderSecret: 'Hospitals and diagnostic chains (e.g. Synlab, Clinix, Mecure) hire 4 MLTs for every 1 chief scientist. Your employment chances right after graduation are actually higher than fresh university graduates!'
  },

  'no-physics': {
    id: 'no-physics',
    scenarioQuestion: "What if I don't have Physics or Further Math in O'Level?",
    shortLabel: 'No Physics / Further Math in WAEC',
    branchTitle: 'Applied Health Info Management, Data Analysis & Agricultural Biotech Pathways',
    targetPhases: [2, 3],
    icon: 'query_stats',
    coreSprout: 'Sprout Alternate Branch: Alternative STEM pathways (Health Information Management, Data Analysis, Agricultural Biotechnology) that waive heavy math/physics requirements.',
    description: 'Missing Physics or Further Math does NOT lock you out of high-paying STEM and healthcare careers. Nigerian universities and regulatory councils offer premier STEM pathways accepting Biology, Chemistry, English, and Maths.',
    pathwaySteps: [
      {
        stepTitle: 'Step 1: Target STEM Programs Waiving Physics',
        duration: 'Admission Window',
        details: 'Programs such as Health Information Management (B.HIM), Agricultural Biotechnology, Food Science, Nutrition & Dietetics, or Computer Science (via polytechnics accepting Economics/Agric).',
        institutionExamples: 'Teaching Hospitals (UCH Ibadan, LUTH, OAUTH), Federal University of Agriculture Abeokuta (FUNAAB), FUTO.'
      },
      {
        stepTitle: 'Step 2: 4-Year Applied Analytics & Clinical Data Rigor',
        duration: 'Year 1 to 3',
        details: 'Master health data pipelines, electronic medical records (EMR), biostatistics, epidemiology, and clinical informatics without dealing with electromagnetism or calculus.',
        institutionExamples: 'Accredited by Health Records Officers Registration Board of Nigeria (HRORBN) and NUC.'
      },
      {
        stepTitle: 'Step 3: Clinical Internships & Tech Cross-Skilling',
        duration: 'Year 4 & NYSC',
        details: 'Pair your healthcare degree with free data analytics certifications (Google Data Analytics, SQL, Python). Become a clinical data manager or bioinformatics analyst.',
        institutionExamples: 'Federal Ministry of Health, WHO Nigeria, UNICEF, USAID health implementing partners.'
      }
    ],
    credentialsEarned: [
      'B.Sc / B.HIM in Health Information Management or Applied Bioscience',
      'HRORBN Professional Practicing License',
      'Google / IBM Data Analytics Professional Certificate'
    ],
    costComparison: {
      standardCost: 'Repeated WAEC GCE registration + physics cram centers: ₦65,000 per attempt.',
      alternateCost: 'Immediate enrollment in accredited program: ₦45,000–₦75,000/year (Federal).',
      financialUpside: 'No wasted years waiting for WAEC GCE physics results; immediate matriculation into accredited healthcare track.'
    },
    directEntryBridge: {
      title: 'Global Health & Health-Tech Career Pathway',
      mechanism: 'Direct licensing by HRORBN + International Health Informatics Certification',
      requirements: '5 O\'Level Credits: English, Mathematics, Biology, Chemistry, and any 1 Social Science or Agric Science.'
    },
    insiderSecret: 'Health Information Managers and Clinical Data Analysts earn significantly higher starting salaries in international NGOs (Doctors Without Borders, Clinton Health Access Initiative) than traditional bench scientists!'
  }
};
