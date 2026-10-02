export type NigerianDiscipline =
  | 'Law & Legal Studies'
  | 'Commercial & Management'
  | 'Social Sciences & Media'
  | 'Arts & Humanities'
  | 'Medical & Health'
  | 'Pharmacy'
  | 'Computing & Tech'
  | 'Engineering'
  | 'Pure & Applied Sciences'
  | 'Education & Teaching'
  | 'Environmental Sciences'
  | 'Agriculture & Food Sciences';

export interface NigerianCourse {
  id: string;
  name: string;
  degree: string;
  discipline: NigerianDiscipline;
  faculty: string;
  meritCutoff: number;
  catchmentCutoff: number;
  stateUniCutoff: number;
  topFederalUnis: string[];
  waecSubjects: string;
  jambSubjects: string;
  polyDirectEntryRoute: string;
  fallbacks: Array<{
    name: string;
    cutoff: string;
    route: string;
  }>;
  keyAdvice: string;
}

export const NIGERIAN_DISCIPLINES: NigerianDiscipline[] = [
  'Law & Legal Studies',
  'Commercial & Management',
  'Social Sciences & Media',
  'Arts & Humanities',
  'Medical & Health',
  'Pharmacy',
  'Computing & Tech',
  'Engineering',
  'Pure & Applied Sciences',
  'Education & Teaching',
  'Environmental Sciences',
  'Agriculture & Food Sciences'
];

export const NIGERIAN_COURSES_LIST: NigerianCourse[] = [
  // ==========================================
  // 1. LAW & LEGAL STUDIES (Arts / Social Science Stream)
  // ==========================================
  {
    id: 'law-common',
    name: 'Law (Common Law / Civil Law)',
    degree: 'LL.B (5 Years)',
    discipline: 'Law & Legal Studies',
    faculty: 'Faculty of Law',
    meritCutoff: 265,
    catchmentCutoff: 245,
    stateUniCutoff: 220,
    topFederalUnis: ['UNILAG', 'UI', 'UNN', 'OAU', 'ABU', 'UNILORIN', 'UNIBEN', 'LASU'],
    waecSubjects: '5 Credits: English Language, Literature-in-English, Mathematics, and any 2 Arts or Social Science subjects (e.g. Government, CRS/IRS, History, Economics)',
    jambSubjects: 'English Language, Literature-in-English, and any 2 of Government, History, Economics, CRS/IRS',
    polyDirectEntryRoute: 'Accredited University Diploma in Law (Credit / Merit) or Cambridge A-Levels / JUPEB -> Direct Entry to 200L LL.B.',
    fallbacks: [
      { name: 'Criminology & Security Studies (B.Sc)', cutoff: '205 - 225', route: 'Strong legal and investigative foundation; high demand in legal tech, justice commissions, and forensic agencies' },
      { name: 'Political Science / Public Admin', cutoff: '210 - 230', route: 'Pre-law track; enables graduate conversion to LL.B or legal compliance careers' },
      { name: 'Philosophy (B.A)', cutoff: '185 - 205', route: 'Rigorous training in ethics, logic, and argumentation; traditional gateway into Nigerian Law School via Direct Entry' }
    ],
    keyAdvice: 'Literature-in-English is strictly mandatory for Law in both WAEC and JAMB. A high UTME score without Literature will lead to outright disqualification on JAMB CAPS. If your score is 210–230, consider Criminology or Political Science to avoid losing a year.'
  },
  {
    id: 'law-islamic',
    name: 'Islamic Law / Sharia & Common Law',
    degree: 'LL.B (5 Years)',
    discipline: 'Law & Legal Studies',
    faculty: 'Faculty of Law',
    meritCutoff: 235,
    catchmentCutoff: 215,
    stateUniCutoff: 195,
    topFederalUnis: ['ABU Zaria', 'BUK Kano', 'UNILORIN', 'UDUS Sokoto', 'KASU'],
    waecSubjects: '5 Credits: English Language, Islamic Religious Studies (IRS) or Arabic, Literature or History, Mathematics, and 1 Social Science subject',
    jambSubjects: 'English Language, Islamic Religious Studies (IRS), and any 2 Arts or Social Science subjects',
    polyDirectEntryRoute: 'Diploma in Sharia and Civil Law (Credit) from recognized judicial institutes -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Islamic Studies (B.A)', cutoff: '175 - 195', route: 'Focus on Islamic jurisprudence, international contracts, and comparative law' },
      { name: 'Arabic Language & Literature', cutoff: '170 - 185', route: 'Translation, diplomatic missions, and judicial court registrar pathways' }
    ],
    keyAdvice: 'Offered widely in Northern federal and state universities as well as UNILORIN. Provides direct licensure eligibility for the Nigerian Bar through the Nigerian Law School.'
  },

  // ==========================================
  // 2. COMMERCIAL & MANAGEMENT SCIENCES (Commercial Stream)
  // ==========================================
  {
    id: 'accounting',
    name: 'Accounting / Accountancy',
    degree: 'B.Sc (4 Years)',
    discipline: 'Commercial & Management',
    faculty: 'Faculty of Management / Administration',
    meritCutoff: 240,
    catchmentCutoff: 220,
    stateUniCutoff: 195,
    topFederalUnis: ['UNILAG', 'UI', 'OAU', 'UNN', 'ABU', 'UNIBEN', 'UNILORIN', 'LASU'],
    waecSubjects: '5 Credits: English Language, Mathematics, Economics, Financial Accounting, and 1 other Commercial/Social Science subject (Commerce, Government)',
    jambSubjects: 'English Language, Mathematics, Economics, and Financial Accounting or Commerce',
    polyDirectEntryRoute: 'National Diploma (ND) in Accountancy with Upper Credit from YABATECH, Federal Poly Ilaro, or Kaduna Poly -> Direct Entry to 200L. Also ATSWA (ICAN) certificate holders qualify for direct entry & ICAN exam exemptions.',
    fallbacks: [
      { name: 'Banking & Finance (B.Sc)', cutoff: '200 - 220', route: 'Direct banking operations, fintech treasury, and investment risk management' },
      { name: 'Insurance & Actuarial Science', cutoff: '190 - 210', route: 'High earning potential in risk modeling, pension funds, and multinational underwriting' },
      { name: 'Taxation (B.Sc)', cutoff: '185 - 205', route: 'High demand with Federal Inland Revenue Service (FIRS) and corporate tax advisories' }
    ],
    keyAdvice: 'Mathematics and Economics are compulsory in JAMB. If your score is under 210, do not risk waiting for merit accounting at UNILAG or UI; switch early to Banking & Finance or enroll in an ICAN ATSWA accredited program.'
  },
  {
    id: 'banking-finance',
    name: 'Banking & Finance',
    degree: 'B.Sc (4 Years)',
    discipline: 'Commercial & Management',
    faculty: 'Faculty of Management Sciences',
    meritCutoff: 220,
    catchmentCutoff: 200,
    stateUniCutoff: 180,
    topFederalUnis: ['UNN', 'UNILAG', 'UNIBEN', 'UNIPORT', 'ABU', 'EKSU'],
    waecSubjects: '5 Credits: English Language, Mathematics, Economics, and 2 other Commercial or Social Science subjects',
    jambSubjects: 'English Language, Mathematics, Economics, and Commerce or Government',
    polyDirectEntryRoute: 'ND Banking & Finance (Upper Credit) from accredited polytechnics -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Business Administration', cutoff: '195 - 215', route: 'Broad commercial management track with Chartered Institute of Bankers (CIBN) exam synergy' },
      { name: 'Cooperative & Rural Development', cutoff: '175 - 190', route: 'Microfinance banking and agricultural finance institutions' }
    ],
    keyAdvice: 'CIBN accreditation linkages in Nigerian universities allow students to write professional banking exams while on campus, saving years of post-graduation qualification.'
  },
  {
    id: 'business-administration',
    name: 'Business Administration & Management',
    degree: 'B.Sc (4 Years)',
    discipline: 'Commercial & Management',
    faculty: 'Faculty of Administration / Management Sciences',
    meritCutoff: 225,
    catchmentCutoff: 205,
    stateUniCutoff: 185,
    topFederalUnis: ['UNILAG', 'OAU', 'UNN', 'ABU', 'UNILORIN', 'UNIBEN', 'LASU'],
    waecSubjects: '5 Credits: English Language, Mathematics, Economics, and 2 from Commerce, Business Methods, Government, Accounting',
    jambSubjects: 'English Language, Mathematics, Economics, and 1 other Commercial or Social Science subject',
    polyDirectEntryRoute: 'ND Business Administration (Upper Credit) -> Direct Entry into 200L in federal and state universities.',
    fallbacks: [
      { name: 'Marketing (B.Sc)', cutoff: '185 - 205', route: 'Brand management, digital ad agency operations, and corporate FMCG distribution' },
      { name: 'Human Resource Management', cutoff: '190 - 210', route: 'Corporate talent acquisition, labor law compliance, and employee relations' },
      { name: 'Entrepreneurship Studies', cutoff: '175 - 190', route: 'Venture incubation, SME scaling, and BOI/SMEDAN funding eligibility' }
    ],
    keyAdvice: 'Business Administration is one of the most versatile degrees in Nigeria, accepting both Commercial and Social Science students with Mathematics and Economics.'
  },
  {
    id: 'marketing',
    name: 'Marketing & Consumer Analytics',
    degree: 'B.Sc (4 Years)',
    discipline: 'Commercial & Management',
    faculty: 'Faculty of Management Sciences',
    meritCutoff: 205,
    catchmentCutoff: 190,
    stateUniCutoff: 175,
    topFederalUnis: ['UNN', 'UNILAG', 'UNIPORT', 'UNIBEN', 'LASU', 'OOU'],
    waecSubjects: '5 Credits: English Language, Mathematics, Economics, Marketing or Commerce, and 1 other subject',
    jambSubjects: 'English Language, Mathematics, Economics, and 1 other Commercial subject (Commerce, Marketing, Government)',
    polyDirectEntryRoute: 'ND in Marketing or Business Studies -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Mass Communication (Advertising track)', cutoff: '200 - 220', route: 'Creative ad copywriting and digital media agency campaign planning' },
      { name: 'Retail & Supply Chain Management', cutoff: '180 - 195', route: 'E-commerce logistics management (Jumia, Konga, FMCG multinationals)' }
    ],
    keyAdvice: 'Modern Nigerian marketing programs now integrate digital advertising, SEO, and social commerce. High employment prospects across telecommunications, banking, and startups.'
  },
  {
    id: 'human-resource-management',
    name: 'Human Resource Management / IRPM',
    degree: 'B.Sc (4 Years)',
    discipline: 'Commercial & Management',
    faculty: 'Faculty of Management Sciences',
    meritCutoff: 215,
    catchmentCutoff: 195,
    stateUniCutoff: 180,
    topFederalUnis: ['UNILAG', 'Covenant', 'OAU', 'UNILORIN', 'LASU'],
    waecSubjects: '5 Credits: English Language, Mathematics, Economics, Government, and 1 other subject',
    jambSubjects: 'English Language, Economics, Government, and Mathematics or Commerce',
    polyDirectEntryRoute: 'ND in Business Administration or Public Administration -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Industrial Relations & Personnel Management', cutoff: '190 - 210', route: 'Direct CIPM (Chartered Institute of Personnel Management) exam synergy' },
      { name: 'Public Administration', cutoff: '185 - 205', route: 'Civil service administration and corporate organizational governance' }
    ],
    keyAdvice: 'CIPM student membership enables graduates to earn chartered HR specialist status early, making them highly competitive in multinational and banking recruitment drives.'
  },

  // ==========================================
  // 3. SOCIAL SCIENCES & MEDIA (Social Science / Arts Stream)
  // ==========================================
  {
    id: 'mass-communication',
    name: 'Mass Communication & Media Studies',
    degree: 'B.Sc / B.A (4 Years)',
    discipline: 'Social Sciences & Media',
    faculty: 'Faculty of Communication & Media Studies / Social Sciences',
    meritCutoff: 245,
    catchmentCutoff: 225,
    stateUniCutoff: 195,
    topFederalUnis: ['UNILAG', 'UNN', 'UI', 'UNIJOS', 'UNILORIN', 'LASU', 'BUK', 'AAUA'],
    waecSubjects: '5 Credits: English Language, Literature-in-English, Mathematics, and 2 from Government, Economics, History, CRS/IRS, Civic Education',
    jambSubjects: 'English Language, Literature-in-English, and any 2 of Government, Economics, History, CRS/IRS',
    polyDirectEntryRoute: 'National Diploma in Mass Communication with Upper Credit from YABATECH, Fed Poly Ilaro, or MAPOLY -> Direct Entry into 200L Mass Comm.',
    fallbacks: [
      { name: 'Linguistics & Communication Studies', cutoff: '190 - 210', route: 'Speech pathology, corporate PR, copy editing, and bilingual broadcast media' },
      { name: 'Theatre & Film Studies', cutoff: '195 - 215', route: 'Nollywood screenwriting, broadcast television production, and multimedia storytelling' },
      { name: 'Information & Media Studies', cutoff: '190 - 205', route: 'New NUC-approved media track focusing on digital journalism and podcasting' }
    ],
    keyAdvice: 'Under the new NUC CCMAS curriculum, Mass Communication is frequently offered as specialized degrees (Journalism & Media Studies, Public Relations, Advertising & Broadcasting). Literature-in-English is compulsory for most federal universities.'
  },
  {
    id: 'economics',
    name: 'Economics',
    degree: 'B.Sc (4 Years)',
    discipline: 'Social Sciences & Media',
    faculty: 'Faculty of Social Sciences',
    meritCutoff: 235,
    catchmentCutoff: 215,
    stateUniCutoff: 190,
    topFederalUnis: ['UI', 'UNILAG', 'OAU', 'UNN', 'ABU', 'UNIBEN', 'UNILORIN'],
    waecSubjects: '5 Credits: English Language, Mathematics, Economics, and 2 from Commerce, Government, Financial Accounting, Geography',
    jambSubjects: 'English Language, Mathematics, Economics, and 1 other Social Science/Commercial subject (Government, Geography, Commerce)',
    polyDirectEntryRoute: 'ND in Financial Studies, Statistics, or Business Administration (Upper Credit) -> Direct Entry to 200L Economics.',
    fallbacks: [
      { name: 'Demography & Social Statistics', cutoff: '190 - 210', route: 'High demand in UN agencies, census boards, population research, and market analytics' },
      { name: 'Agricultural Economics', cutoff: '185 - 205', route: 'Offered in premier agriculture faculties; lower cut-off with identical financial modeling skills' },
      { name: 'Banking & Finance', cutoff: '195 - 215', route: 'Commercial banking operations and financial analytics' }
    ],
    keyAdvice: 'Mathematics is strictly mandatory in JAMB for Economics in almost all federal universities. Pairing Economics with Python or SQL data analytics in university gives massive employment advantage in Nigerian fintechs.'
  },
  {
    id: 'political-science',
    name: 'Political Science & International Relations',
    degree: 'B.Sc (4 Years)',
    discipline: 'Social Sciences & Media',
    faculty: 'Faculty of Social Sciences',
    meritCutoff: 230,
    catchmentCutoff: 210,
    stateUniCutoff: 185,
    topFederalUnis: ['UI', 'UNILAG', 'OAU', 'UNN', 'ABU', 'UNILORIN', 'Covenant'],
    waecSubjects: '5 Credits: English Language, Government or History, Mathematics, and 2 from Economics, Literature, Civic Education, CRS/IRS',
    jambSubjects: 'English Language, Government or History, and 2 other Arts/Social Science subjects (Economics, Literature, CRS/IRS)',
    polyDirectEntryRoute: 'ND in Public Administration or Local Government Studies (Upper Credit) -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Public Administration (B.Sc)', cutoff: '190 - 210', route: 'Direct civil service track, policy drafting, and municipal management' },
      { name: 'Peace & Conflict Resolution', cutoff: '180 - 195', route: 'High relevance for NGO field coordinators, mediation, and security agencies' },
      { name: 'Sociology', cutoff: '195 - 210', route: 'Social impact research, corporate CSR, and development agency monitoring' }
    ],
    keyAdvice: 'Government is the anchor subject in JAMB. If applying to UNILAG, UI, or OAU, verify your state catchment advantages as political science has high regional applicant numbers.'
  },
  {
    id: 'psychology',
    name: 'Psychology',
    degree: 'B.Sc (4 Years)',
    discipline: 'Social Sciences & Media',
    faculty: 'Faculty of Social Sciences',
    meritCutoff: 220,
    catchmentCutoff: 200,
    stateUniCutoff: 180,
    topFederalUnis: ['UI', 'UNILAG', 'UNN', 'UNIZIK', 'OAU', 'UNIBEN'],
    waecSubjects: '5 Credits: English Language, Mathematics, Biology, and 2 other Arts or Social Science subjects',
    jambSubjects: 'English Language, and any 3 subjects from Biology, Economics, Government, Literature, Physics, Chemistry',
    polyDirectEntryRoute: 'ND in Social Development or Health Education -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Sociology (B.Sc)', cutoff: '190 - 205', route: 'Broad behavioral dynamics and community research' },
      { name: 'Guidance & Counselling (B.Ed)', cutoff: '175 - 195', route: 'School counseling, student psychology, and HR training' }
    ],
    keyAdvice: 'Notice that Biology in WAEC is required by many top faculties (like UI and UNILAG) for Psychology because of neuro-behavioral and physiological psychology modules.'
  },
  {
    id: 'sociology',
    name: 'Sociology & Criminology',
    degree: 'B.Sc (4 Years)',
    discipline: 'Social Sciences & Media',
    faculty: 'Faculty of Social Sciences',
    meritCutoff: 215,
    catchmentCutoff: 195,
    stateUniCutoff: 180,
    topFederalUnis: ['UI', 'UNILAG', 'ABU', 'UNN', 'UNILORIN', 'UNIPORT'],
    waecSubjects: '5 Credits: English Language, Mathematics, and 3 from Government, History, Economics, Geography, CRS/IRS, Civic Education',
    jambSubjects: 'English Language, Government or History, and any 2 Social Science or Arts subjects',
    polyDirectEntryRoute: 'ND in Social Works or Crime Management -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Social Work (B.Sc)', cutoff: '180 - 195', route: 'Hospital patient advocacy, social rehabilitation, and correctional facility welfare' },
      { name: 'Public Administration', cutoff: '185 - 200', route: 'Policy implementation in state and local government services' }
    ],
    keyAdvice: 'Sociology provides versatile career versatility into market research, UX research, humanitarian NGOs, and corporate social responsibility (CSR).'
  },

  // ==========================================
  // 4. ARTS & HUMANITIES (Arts Stream)
  // ==========================================
  {
    id: 'english-literary-studies',
    name: 'English & Literary Studies',
    degree: 'B.A (4 Years)',
    discipline: 'Arts & Humanities',
    faculty: 'Faculty of Arts',
    meritCutoff: 220,
    catchmentCutoff: 200,
    stateUniCutoff: 180,
    topFederalUnis: ['UI', 'UNILAG', 'OAU', 'UNN', 'ABU', 'UNILORIN', 'UNIBEN'],
    waecSubjects: '5 Credits: English Language, Literature-in-English, Mathematics, and 2 Arts/Social Science subjects (CRS/IRS, Government, History)',
    jambSubjects: 'English Language, Literature-in-English, 1 Arts subject, and 1 other Arts or Social Science subject',
    polyDirectEntryRoute: 'NCE (Nigeria Certificate in Education) with Credit in English/Literature or ND Mass Communication -> Direct Entry into 200L English.',
    fallbacks: [
      { name: 'Linguistics (B.A)', cutoff: '185 - 205', route: 'Phonetics, natural language processing, speech technology, and lexicography' },
      { name: 'English Education (B.A. Ed)', cutoff: '175 - 195', route: 'Secondary school teaching and curriculum publishing with FG bursary eligibility' },
      { name: 'Theatre & Performing Arts', cutoff: '190 - 210', route: 'Creative writing, dramatic literature, and voice acting' }
    ],
    keyAdvice: 'Literature-in-English in JAMB is mandatory. Excellent foundation for editorial work, corporate communications, advertising copywriting, and graduate law entry.'
  },
  {
    id: 'history-international-studies',
    name: 'History & International / Strategic Studies',
    degree: 'B.A (4 Years)',
    discipline: 'Arts & Humanities',
    faculty: 'Faculty of Arts',
    meritCutoff: 215,
    catchmentCutoff: 195,
    stateUniCutoff: 175,
    topFederalUnis: ['UI', 'UNILAG', 'UNN', 'OAU', 'ABU', 'UNILORIN'],
    waecSubjects: '5 Credits: English Language, History or Government, and 3 other Arts or Social Science subjects',
    jambSubjects: 'English Language, History or Government, and any 2 other Arts/Social Science subjects',
    polyDirectEntryRoute: 'NCE in History / Social Studies (Credit) or ND in Law/Public Admin -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Archaeology & Heritage Tourism', cutoff: '170 - 190', route: 'Museum curation, tourism management, and cultural diplomacy' },
      { name: 'Philosophy (B.A)', cutoff: '180 - 195', route: 'Strategic critical reasoning, ethics, and diplomatic analysis' }
    ],
    keyAdvice: 'Historical and diplomatic training is favored by the Ministry of Foreign Affairs, intelligence agencies, international NGOs, and think-tanks.'
  },
  {
    id: 'theatre-film-studies',
    name: 'Theatre & Film / Performing Arts',
    degree: 'B.A (4 Years)',
    discipline: 'Arts & Humanities',
    faculty: 'Faculty of Arts',
    meritCutoff: 215,
    catchmentCutoff: 195,
    stateUniCutoff: 180,
    topFederalUnis: ['UNILAG', 'UI', 'UNN', 'UNIPORT', 'UNIJOS', 'UNILORIN', 'LASU'],
    waecSubjects: '5 Credits: English Language, Literature-in-English, and 3 other Arts or Social Science subjects',
    jambSubjects: 'English Language, Literature-in-English, and 2 other Arts or Social Science subjects',
    polyDirectEntryRoute: 'ND in Theatre Arts, Music Technology, or Mass Communication -> Direct Entry into 200L.',
    fallbacks: [
      { name: 'Creative Arts / Music (B.A)', cutoff: '180 - 195', route: 'Sound engineering, scoring, and contemporary art curation' },
      { name: 'Linguistics & African Languages', cutoff: '175 - 190', route: 'Subtitling, voice dubbing, and indigenous cultural preservation' }
    ],
    keyAdvice: 'Nollywood and creative media streaming platforms (Netflix Nigeria, Prime Video) actively scout university drama productions. Practical acting and directing audits are part of Post-UTME screening.'
  },
  {
    id: 'linguistics-nigerian-languages',
    name: 'Linguistics & Nigerian Languages',
    degree: 'B.A (4 Years)',
    discipline: 'Arts & Humanities',
    faculty: 'Faculty of Arts',
    meritCutoff: 200,
    catchmentCutoff: 185,
    stateUniCutoff: 170,
    topFederalUnis: ['UI', 'UNILAG', 'UNN', 'UNIBEN', 'ABU', 'UNILORIN'],
    waecSubjects: '5 Credits: English Language, 1 Nigerian Language (Yoruba, Igbo, or Hausa) or Literature, Mathematics, and 2 other Arts subjects',
    jambSubjects: 'English Language, 1 Nigerian Language or Literature, and 2 other Arts or Social Science subjects',
    polyDirectEntryRoute: 'NCE in Nigerian Languages / English (Credit) -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'French & Foreign Languages', cutoff: '180 - 195', route: 'International diplomatic translation and bilingual corporate relations' },
      { name: 'Mass Communication', cutoff: '210+', route: 'Broadcast media in indigenous languages (BBC Yoruba/Hausa/Igbo)' }
    ],
    keyAdvice: 'AI tech giants (Google, Meta) actively contract Nigerian language computational linguists to train large language models on Yoruba, Hausa, Igbo, and Pidgin.'
  },

  // ==========================================
  // 5. EDUCATION & TEACHING (All Secondary Streams)
  // ==========================================
  {
    id: 'educational-management',
    name: 'Educational Management & Planning',
    degree: 'B.Ed (4 Years)',
    discipline: 'Education & Teaching',
    faculty: 'Faculty of Education',
    meritCutoff: 200,
    catchmentCutoff: 185,
    stateUniCutoff: 165,
    topFederalUnis: ['UI', 'UNILAG', 'UNN', 'OAU', 'UNILORIN', 'TASUED', 'LASU'],
    waecSubjects: '5 Credits: English Language, Mathematics, Economics, and 2 other Arts, Commercial, or Science subjects',
    jambSubjects: 'English Language, Economics, Mathematics, and 1 other subject',
    polyDirectEntryRoute: 'NCE (Nigeria Certificate in Education) with Merit / Credit in relevant teaching subjects -> Direct Entry to 200L B.Ed.',
    fallbacks: [
      { name: 'Guidance & Counselling (B.Ed)', cutoff: '175 - 190', route: 'School psychological evaluation, adolescent counseling, and HR talent development' },
      { name: 'Adult Education & Community Dev.', cutoff: '165 - 180', route: 'NGO literacy programs, community mobilization, and civil training' },
      { name: 'Early Childhood Education (B.Ed)', cutoff: '165 - 180', route: 'Montessori primary school administration and curriculum design' }
    ],
    keyAdvice: 'Federal Government offers educational bursary grants for students in public university faculties of education. Lower cut-offs make this a high-security route into top institutions like UI and UNILAG.'
  },
  {
    id: 'english-education',
    name: 'English Education (B.A. Ed)',
    degree: 'B.A. (Ed) (4 Years)',
    discipline: 'Education & Teaching',
    faculty: 'Faculty of Education',
    meritCutoff: 205,
    catchmentCutoff: 190,
    stateUniCutoff: 170,
    topFederalUnis: ['UNN', 'UI', 'UNILAG', 'ABU', 'UNILORIN', 'OAU', 'TASUED'],
    waecSubjects: '5 Credits: English Language, Literature-in-English, Mathematics, and 2 other Arts subjects',
    jambSubjects: 'English Language, Literature-in-English, and 2 other Arts or Social Science subjects',
    polyDirectEntryRoute: 'NCE English (Credit / Merit) -> Direct Entry to 200L B.A.(Ed) in federal and state universities.',
    fallbacks: [
      { name: 'Adult Education with English', cutoff: '170 - 185', route: 'Literacy training and corporate English communication coaching' },
      { name: 'Library & Information Science (B.LIS)', cutoff: '175 - 190', route: 'Knowledge management, academic archiving, and digital library systems' }
    ],
    keyAdvice: 'Literature-in-English is required in both WAEC and JAMB. Graduating with a B.A. (Ed) gives dual qualification for school leadership, editing, and corporate communications.'
  },
  {
    id: 'science-education',
    name: 'Science Education (Biology / Chemistry / Physics / Maths)',
    degree: 'B.Sc. (Ed) (4 Years)',
    discipline: 'Education & Teaching',
    faculty: 'Faculty of Education',
    meritCutoff: 195,
    catchmentCutoff: 180,
    stateUniCutoff: 165,
    topFederalUnis: ['UI', 'UNILAG', 'UNN', 'ABU', 'UNILORIN', 'TASUED', 'OAU'],
    waecSubjects: '5 Credits: English Language, Mathematics, and 3 relevant sciences (Biology, Chemistry, Physics, Agricultural Science)',
    jambSubjects: 'English Language, and 3 subjects relevant to your chosen science specialty (e.g. Maths, Physics, Chemistry for Physics Ed)',
    polyDirectEntryRoute: 'NCE in Integrated Science, Biology/Chemistry, or Physics/Maths (Credit) -> Direct Entry to 200L B.Sc.(Ed).',
    fallbacks: [
      { name: 'Health Education (B.Sc. Ed)', cutoff: '170 - 185', route: 'Community health educator, school hygiene, and maternal health advocacy' },
      { name: 'Computer Science Education', cutoff: '180 - 195', route: 'STEM coding instruction, EdTech curriculum development, and school IT administration' }
    ],
    keyAdvice: 'Huge shortage of qualified STEM teachers in Nigeria and internationally (UK, Canada). Very high employment certainty immediately after graduation and NYSC.'
  },

  // ==========================================
  // 6. ENVIRONMENTAL SCIENCES (Science / Tech / Arts Blend)
  // ==========================================
  {
    id: 'architecture',
    name: 'Architecture',
    degree: 'B.Sc / B.Tech (4 - 5 Years)',
    discipline: 'Environmental Sciences',
    faculty: 'Faculty of Environmental Sciences / Environmental Design',
    meritCutoff: 240,
    catchmentCutoff: 220,
    stateUniCutoff: 195,
    topFederalUnis: ['ABU Zaria', 'UNILAG', 'FUTA', 'UNN', 'OAU', 'FUTO', 'Covenant'],
    waecSubjects: '5 Credits: English Language, Mathematics, Physics, and 2 from Chemistry, Technical Drawing, Geography, Fine Art, Economics',
    jambSubjects: 'English Language, Physics, Mathematics, and 1 of Chemistry, Geography, Technical Drawing, Fine Art',
    polyDirectEntryRoute: 'ND in Architectural Technology (Upper Credit) from Yabatech, Fed Poly Nekede, or KadPoly -> Direct Entry to 200L Architecture.',
    fallbacks: [
      { name: 'Urban & Regional Planning', cutoff: '185 - 205', route: 'Municipal town planning, GIS mapping, and smart city infrastructure design' },
      { name: 'Estate Management & Valuation', cutoff: '195 - 215', route: 'Commercial property valuation, real estate asset management, and brokerage' },
      { name: 'Building Technology (B.Tech)', cutoff: '190 - 210', route: 'Construction project supervision, structural materials, and site engineering' }
    ],
    keyAdvice: 'Technical Drawing or Fine Art in secondary school is a huge asset. If your score falls short for Architecture at UNILAG or ABU, switching to Urban Planning or Estate Management guarantees admission in Environmental Sciences.'
  },
  {
    id: 'estate-management',
    name: 'Estate Management & Valuation',
    degree: 'B.Sc / B.Tech (5 Years)',
    discipline: 'Environmental Sciences',
    faculty: 'Faculty of Environmental Sciences',
    meritCutoff: 215,
    catchmentCutoff: 195,
    stateUniCutoff: 180,
    topFederalUnis: ['UNILAG', 'OAU', 'FUTA', 'UNN', 'ABU', 'UNILORIN'],
    waecSubjects: '5 Credits: English Language, Mathematics, Economics, and 2 from Geography, Physics, Chemistry, Biology, Tech Drawing',
    jambSubjects: 'English Language, Mathematics, Economics, and 1 of Geography, Physics, Chemistry',
    polyDirectEntryRoute: 'ND in Estate Management (Upper Credit) -> Direct Entry to 200L in accredited universities.',
    fallbacks: [
      { name: 'Quantity Surveying (B.Sc)', cutoff: '190 - 210', route: 'Cost estimating, bill of quantities (BOQ), and construction finance auditing' },
      { name: 'Urban & Regional Planning', cutoff: '180 - 195', route: 'Land-use zoning and physical development permits' }
    ],
    keyAdvice: 'Estate Surveyors and Valuers (NIESV) enjoy high commercial autonomy in Nigeria’s bustling real estate hubs (Lagos, Abuja, Port Harcourt). Open to Commercial and Science students who have Mathematics and Economics.'
  },
  {
    id: 'quantity-surveying',
    name: 'Quantity Surveying & Cost Engineering',
    degree: 'B.Sc / B.Tech (5 Years)',
    discipline: 'Environmental Sciences',
    faculty: 'Faculty of Environmental Sciences',
    meritCutoff: 210,
    catchmentCutoff: 190,
    stateUniCutoff: 175,
    topFederalUnis: ['FUTA', 'UNILAG', 'ABU', 'OAU', 'FUTO', 'UNILORIN'],
    waecSubjects: '5 Credits: English Language, Mathematics, Physics, and 2 from Chemistry, Economics, Technical Drawing, Geography',
    jambSubjects: 'English Language, Physics, Mathematics, and 1 of Chemistry, Economics, Technical Drawing',
    polyDirectEntryRoute: 'ND in Quantity Surveying (Upper Credit) -> Direct Entry to 200L in federal universities.',
    fallbacks: [
      { name: 'Building Technology', cutoff: '185 - 200', route: 'Construction execution and structural site engineering' },
      { name: 'Land Surveying & Geoinformatics', cutoff: '190 - 205', route: 'Satellite geodesy, drone mapping, and cadastral boundary verification' }
    ],
    keyAdvice: 'Quantity Surveyors are the accountants of the construction sector. High starting pay on infrastructure, highway, and skyscraper projects across Nigeria.'
  },

  // ==========================================
  // 7. MEDICAL & HEALTH SCIENCES (Science Stream)
  // ==========================================
  {
    id: 'medicine-surgery',
    name: 'Medicine & Surgery (MBBS)',
    degree: 'MBBS (6 Years)',
    discipline: 'Medical & Health',
    faculty: 'Faculty of Clinical Sciences / Basic Medical Sciences',
    meritCutoff: 265,
    catchmentCutoff: 245,
    stateUniCutoff: 230,
    topFederalUnis: ['UI', 'UNILAG', 'UNN', 'OAU', 'ABU', 'UNILORIN', 'UNIBEN'],
    waecSubjects: '5 Credits: English Language, Mathematics, Biology, Chemistry, Physics (1 sitting preferred)',
    jambSubjects: 'English Language, Biology, Chemistry, Physics',
    polyDirectEntryRoute: 'Accredited ND Science Laboratory Technology (Upper Credit) -> Direct Entry to 200L B.MLS or Year 2 Medical Physiology.',
    fallbacks: [
      { name: 'Human Physiology / Anatomy', cutoff: '190 - 210', route: 'Strong medical foundation; allows 200L intra-faculty transfer if Year 1 CGPA is 4.0+' },
      { name: 'Medical Laboratory Science (B.MLS)', cutoff: '225 - 245', route: '5-year professional clinical diagnostic degree with MLSCN license' },
      { name: 'State College of Nursing Sciences', cutoff: '180+ or Exam', route: '3-year Registered Nurse (RN) diploma with affordable state fees' }
    ],
    keyAdvice: 'Direct Medicine at Federal universities has intense competition (over 4,000 applicants for ~150 slots). If your score is under 240, execute a JAMB CAPS change of course early to Human Physiology or Medical Lab Science to avoid sitting at home.'
  },
  {
    id: 'nursing-science',
    name: 'Nursing Science (B.N.Sc)',
    degree: 'B.N.Sc (5 Years)',
    discipline: 'Medical & Health',
    faculty: 'Faculty of Nursing Sciences / Clinical Sciences',
    meritCutoff: 250,
    catchmentCutoff: 230,
    stateUniCutoff: 215,
    topFederalUnis: ['UNILAG', 'UI', 'OAU', 'UNN', 'UNILORIN', 'ABU'],
    waecSubjects: '5 Credits: English Language, Mathematics, Biology, Chemistry, Physics (1 sitting preferred)',
    jambSubjects: 'English Language, Biology, Chemistry, Physics',
    polyDirectEntryRoute: 'Registered Nurse (RN) diploma from an accredited College of Nursing allows Direct Entry into 200L/300L B.N.Sc.',
    fallbacks: [
      { name: 'State College of Nursing Sciences (RN)', cutoff: '180 - 200', route: 'Guarantees NMCN practicing license and hospital postings without university JAMB bottleneck' },
      { name: 'Public Health (B.Sc)', cutoff: '195 - 215', route: 'High demand in WHO, UNICEF, and NGO community health programs' },
      { name: 'Human Nutrition & Dietetics', cutoff: '190 - 210', route: 'Clinical hospital dietitian roles and maternal child wellness' }
    ],
    keyAdvice: 'Nursing is currently one of the most competitive courses in Nigeria due to global healthcare relocation opportunities. If your score is below 230, applying to your state’s College of Nursing or changing to Public Health is a high-probability strategy.'
  },
  {
    id: 'medical-lab-science',
    name: 'Medical Laboratory Science (B.MLS)',
    degree: 'B.MLS (5 Years)',
    discipline: 'Medical & Health',
    faculty: 'Faculty of Allied Health Sciences',
    meritCutoff: 240,
    catchmentCutoff: 220,
    stateUniCutoff: 205,
    topFederalUnis: ['UNN', 'UNILAG', 'UNIBEN', 'UNILORIN', 'ABU', 'BUK'],
    waecSubjects: '5 Credits: English Language, Mathematics, Biology, Chemistry, Physics',
    jambSubjects: 'English Language, Biology, Chemistry, Physics',
    polyDirectEntryRoute: '2-Year ND in Science Laboratory Technology (SLT) at YABATECH, Fed Poly Offa, or Auchi Poly -> Direct Entry into 200L B.MLS.',
    fallbacks: [
      { name: 'Science Laboratory Technology (ND/HND)', cutoff: '160 - 180', route: 'Amina\'s exact track: 2 years ND then direct entry into university Year 2' },
      { name: 'Biochemistry (B.Sc)', cutoff: '195 - 210', route: 'Allows post-graduate clinical pathology or pharmaceutical research transition' },
      { name: 'Microbiology (B.Sc)', cutoff: '190 - 205', route: 'Hospital pathology labs and food safety quality control' }
    ],
    keyAdvice: 'MLS offers automatic clinical internship postings and induction into the Medical Laboratory Science Council of Nigeria (MLSCN). Upper Credit in Polytechnic SLT is widely accepted for university Direct Entry.'
  },
  {
    id: 'dentistry',
    name: 'Dentistry & Dental Surgery (BDS)',
    degree: 'BDS (6 Years)',
    discipline: 'Medical & Health',
    faculty: 'Faculty of Dentistry',
    meritCutoff: 255,
    catchmentCutoff: 235,
    stateUniCutoff: 220,
    topFederalUnis: ['UI', 'UNILAG', 'OAU', 'UNN', 'UNIBEN'],
    waecSubjects: '5 Credits: English Language, Mathematics, Biology, Chemistry, Physics',
    jambSubjects: 'English Language, Biology, Chemistry, Physics',
    polyDirectEntryRoute: 'Dental Technology or Dental Therapy ND -> Direct Entry to 200L in accredited dental faculties.',
    fallbacks: [
      { name: 'Dental Technology / Therapy (ND)', cutoff: '170 - 190', route: 'Offered at Federal School of Dental Technology & Therapy, Enugu' },
      { name: 'Human Anatomy (B.Sc)', cutoff: '190 - 210', route: 'Allows foundational dental ergonomics with possible intra-transfer' }
    ],
    keyAdvice: 'Dentistry shares the pre-clinical curriculum with MBBS for the first 3 years. Federal slots are limited (typically 30–50 students per university).'
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy / Medical Rehabilitation',
    degree: 'B.MR / DPT (5 - 6 Years)',
    discipline: 'Medical & Health',
    faculty: 'Faculty of Basic Medical / Allied Health Sciences',
    meritCutoff: 240,
    catchmentCutoff: 220,
    stateUniCutoff: 205,
    topFederalUnis: ['UI', 'UNILAG', 'OAU', 'UNN', 'UNIBEN', 'BUK'],
    waecSubjects: '5 Credits: English Language, Mathematics, Biology, Chemistry, Physics',
    jambSubjects: 'English Language, Biology, Chemistry, Physics',
    polyDirectEntryRoute: 'ND in Health Technology or Physical Therapy Assistance -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Human Kinetics / Sports Science', cutoff: '180 - 195', route: 'Athletic sports rehabilitation and fitness coaching' },
      { name: 'Human Physiology (B.Sc)', cutoff: '190 - 210', route: 'Biomechanics and neuromuscular functional studies' }
    ],
    keyAdvice: 'Nigeria has moved towards the Doctor of Physiotherapy (DPT) degree benchmark. High demand in orthopedic hospitals, sports clubs, and private neuro-rehab clinics.'
  },
  {
    id: 'public-health',
    name: 'Public Health',
    degree: 'B.Sc (4 Years)',
    discipline: 'Medical & Health',
    faculty: 'Faculty of Public Health / Health Sciences',
    meritCutoff: 215,
    catchmentCutoff: 195,
    stateUniCutoff: 180,
    topFederalUnis: ['UI', 'BUK', 'UNICAL', 'FUTO', 'KWASU', 'Babcock'],
    waecSubjects: '5 Credits: English Language, Mathematics, Biology, Chemistry, and Physics or Economics',
    jambSubjects: 'English Language, Biology, Chemistry, and Physics or Mathematics',
    polyDirectEntryRoute: 'ND in Community Health Extension (CHEW) or Environmental Health Tech -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Environmental Health Science', cutoff: '180 - 195', route: 'Sanitary inspection, industrial safety, and municipal health management' },
      { name: 'Health Information Management (ND/HND)', cutoff: '170 - 185', route: 'Electronic health records and hospital data systems' }
    ],
    keyAdvice: 'Public Health offers international development opportunities with WHO, UNICEF, and MSF. Great alternative for candidates passionate about health without the clinical surgery grind.'
  },

  // ==========================================
  // 8. PHARMACY (Science Stream)
  // ==========================================
  {
    id: 'pharmacy',
    name: 'Doctor of Pharmacy (Pharm.D)',
    degree: 'Pharm.D (6 Years)',
    discipline: 'Pharmacy',
    faculty: 'Faculty of Pharmacy',
    meritCutoff: 260,
    catchmentCutoff: 240,
    stateUniCutoff: 225,
    topFederalUnis: ['UNILAG', 'UI', 'OAU', 'UNIBEN', 'UNN', 'ABU', 'UNILORIN'],
    waecSubjects: '5 Credits: English Language, Mathematics, Biology, Chemistry, Physics',
    jambSubjects: 'English Language, Biology, Chemistry, Physics',
    polyDirectEntryRoute: 'National Diploma in Science Laboratory Technology (Chemistry/Biochemistry option) with Distinction -> Direct Entry to 200L Pharm.D in select universities.',
    fallbacks: [
      { name: 'Pharmacology & Therapeutics (B.Sc)', cutoff: '205 - 225', route: 'Drug mechanism research and clinical trials; allows graduate entry into Pharm.D' },
      { name: 'Industrial Chemistry (B.Sc)', cutoff: '190 - 210', route: 'Pharmaceutical formulation, quality assurance, and compounding' },
      { name: 'Biochemistry (B.Sc)', cutoff: '195 - 215', route: 'Bio-active compound extraction and biochemical assays' }
    ],
    keyAdvice: 'NUC and the Pharmacy Council of Nigeria (PCN) have fully transitioned the curriculum to the 6-year clinical Doctor of Pharmacy (Pharm.D) degree. If your score is 200–225, switch to Pharmacology to stay in the pharmaceutical sciences track.'
  },

  // ==========================================
  // 9. COMPUTING & TECH (Science & Technical Stream)
  // ==========================================
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    degree: 'B.Sc / B.Eng (4 Years)',
    discipline: 'Computing & Tech',
    faculty: 'Faculty of Computing / Information Technology',
    meritCutoff: 245,
    catchmentCutoff: 225,
    stateUniCutoff: 200,
    topFederalUnis: ['FUTA', 'UNILAG', 'OAU', 'UNN', 'ABU', 'Covenant', 'Landmark'],
    waecSubjects: '5 Credits: English Language, Mathematics, Physics, Chemistry, and Further Maths or Computer Studies',
    jambSubjects: 'English Language, Mathematics, Physics, and Chemistry or Computer Studies',
    polyDirectEntryRoute: 'National Diploma (ND) in Computer Science (Upper Credit) from YABATECH, Fed Poly Ilaro, or Kaduna Poly -> Direct Entry into 200L Software Engineering.',
    fallbacks: [
      { name: 'Computer Science (B.Sc)', cutoff: '220 - 240', route: 'Broader computing foundational degree with high industry hiring rates' },
      { name: 'Information Technology (B.Sc)', cutoff: '200 - 220', route: 'Cloud systems administration, enterprise networks, and database engineering' },
      { name: 'Computer Engineering (B.Eng)', cutoff: '215 - 235', route: 'Hardware-software embedded IoT architectures' }
    ],
    keyAdvice: 'Nigerian tech employers focus primarily on live deployed GitHub projects, problem-solving skills, and open-source contributions rather than degree name alone. Pair your university degree with free cohorts like ALX Africa or She Code Africa.'
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    degree: 'B.Sc (4 Years)',
    discipline: 'Computing & Tech',
    faculty: 'Faculty of Computing / Science',
    meritCutoff: 235,
    catchmentCutoff: 215,
    stateUniCutoff: 190,
    topFederalUnis: ['UNILAG', 'UI', 'OAU', 'FUTA', 'UNN', 'ABU', 'UNIBEN'],
    waecSubjects: '5 Credits: English Language, Mathematics, Physics, and 2 from Chemistry, Further Maths, Biology, Computer Studies',
    jambSubjects: 'English Language, Mathematics, Physics, and Chemistry or Biology or Computer Studies',
    polyDirectEntryRoute: 'ND Computer Science (Upper Credit) -> Direct Entry to 200L in accredited universities nationwide.',
    fallbacks: [
      { name: 'Cybersecurity (B.Sc)', cutoff: '210 - 230', route: 'Offered widely under the new NUC Computing faculty; high demand in banking' },
      { name: 'Information Systems', cutoff: '190 - 210', route: 'Enterprise ERP software and corporate tech governance' },
      { name: 'Mathematics & Computer Science', cutoff: '185 - 205', route: 'Heavy algorithmic foundation; lower cut-off than pure Computer Science' }
    ],
    keyAdvice: 'Computer Science is offered in nearly every university in Nigeria. Mathematics in JAMB is strictly compulsory. Great alternative if Software Engineering cut-off is missed.'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    degree: 'B.Sc (4 Years)',
    discipline: 'Computing & Tech',
    faculty: 'Faculty of Computing',
    meritCutoff: 230,
    catchmentCutoff: 210,
    stateUniCutoff: 195,
    topFederalUnis: ['FUTA', 'FUTO', 'UNILORIN', 'ABU', 'Air Force Institute of Tech (AFIT)'],
    waecSubjects: '5 Credits: English Language, Mathematics, Physics, and 2 from Chemistry, Further Maths, Computer Studies',
    jambSubjects: 'English Language, Mathematics, Physics, and Chemistry or Computer Studies',
    polyDirectEntryRoute: 'ND Computer Science or Cybercrime Tech -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Information Technology (B.Sc)', cutoff: '195 - 215', route: 'Network administration and perimeter defense security' },
      { name: 'Computer Science (B.Sc)', cutoff: '210 - 230', route: 'General computing with security focus' }
    ],
    keyAdvice: 'With the rise of fintech fraud and cybersecurity regulations in Nigeria (CBN directives), certified cybersecurity graduates command premium entry-level compensation.'
  },
  {
    id: 'data-science-ai',
    name: 'Data Science & Artificial Intelligence',
    degree: 'B.Sc (4 Years)',
    discipline: 'Computing & Tech',
    faculty: 'Faculty of Computing',
    meritCutoff: 230,
    catchmentCutoff: 210,
    stateUniCutoff: 195,
    topFederalUnis: ['UNILAG', 'FUTA', 'UI', 'Covenant', 'Babcock', 'ABU'],
    waecSubjects: '5 Credits: English Language, Mathematics, Physics, and 2 from Chemistry, Economics, Further Maths, Computer Studies',
    jambSubjects: 'English Language, Mathematics, Physics, and Chemistry or Economics',
    polyDirectEntryRoute: 'ND in Statistics or Computer Science (Upper Credit) -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Statistics (B.Sc)', cutoff: '185 - 205', route: 'Traditional mathematical modeling foundation; massive crossover into data science' },
      { name: 'Mathematics (B.Sc)', cutoff: '180 - 200', route: 'Algorithmic machine learning and quantitative finance' }
    ],
    keyAdvice: 'NUC formally established Data Science as a distinct degree in 2023. Can be accessed with either Physics or Economics as the 4th JAMB subject in many institutions.'
  },

  // ==========================================
  // 10. ENGINEERING & TECHNOLOGY (Science Stream)
  // ==========================================
  {
    id: 'electrical-engineering',
    name: 'Electrical & Electronics Engineering',
    degree: 'B.Eng (5 Years)',
    discipline: 'Engineering',
    faculty: 'Faculty of Engineering',
    meritCutoff: 245,
    catchmentCutoff: 225,
    stateUniCutoff: 200,
    topFederalUnis: ['UNILAG', 'UI', 'OAU', 'FUTA', 'UNN', 'ABU', 'UNIBEN'],
    waecSubjects: '5 Credits: English Language, Mathematics, Physics, Chemistry, and Further Maths or Technical Drawing',
    jambSubjects: 'English Language, Mathematics, Physics, Chemistry',
    polyDirectEntryRoute: 'ND in Electrical/Electronic Engineering (Upper Credit) -> Direct Entry to 200L in accredited university engineering faculties.',
    fallbacks: [
      { name: 'Renewable Energy Engineering', cutoff: '200 - 220', route: 'High demand in solar microgrids and off-grid power solutions across Nigeria' },
      { name: 'Computer Engineering (B.Eng)', cutoff: '215 - 235', route: 'Hardware architecture and network engineering' },
      { name: 'Physics with Electronics (B.Sc)', cutoff: '185 - 205', route: '4-year science degree with high overlap in electronics labs' }
    ],
    keyAdvice: 'Engineering at Federal universities strictly requires Physics, Chemistry, and Mathematics in both WAEC and JAMB. Upper Credit from an accredited polytechnic is widely accepted for 200L Direct Entry.'
  },
  {
    id: 'mechanical-engineering',
    name: 'Mechanical Engineering',
    degree: 'B.Eng (5 Years)',
    discipline: 'Engineering',
    faculty: 'Faculty of Engineering',
    meritCutoff: 240,
    catchmentCutoff: 220,
    stateUniCutoff: 195,
    topFederalUnis: ['FUTA', 'UNILAG', 'ABU', 'UI', 'OAU', 'UNN', 'UNIBEN'],
    waecSubjects: '5 Credits: English Language, Mathematics, Physics, Chemistry, and Technical Drawing or Further Maths',
    jambSubjects: 'English Language, Mathematics, Physics, Chemistry',
    polyDirectEntryRoute: 'ND Mechanical Engineering (Upper Credit) -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Mechatronics Engineering (B.Eng)', cutoff: '215 - 235', route: 'Robotics, automation, and industrial PLC control' },
      { name: 'Agricultural & Environmental Engineering', cutoff: '185 - 205', route: 'Tractor hydraulics, food processing machinery, and irrigation' },
      { name: 'Metallurgical & Materials Engineering', cutoff: '190 - 210', route: 'Steel manufacturing, pipeline integrity, and materials testing' }
    ],
    keyAdvice: 'Technical Drawing gives a great advantage in 100L/200L engineering graphics. If cut-off is missed, switching to Mechatronics or Materials Engineering is a smart move.'
  },
  {
    id: 'civil-engineering',
    name: 'Civil Engineering',
    degree: 'B.Eng (5 Years)',
    discipline: 'Engineering',
    faculty: 'Faculty of Engineering',
    meritCutoff: 235,
    catchmentCutoff: 215,
    stateUniCutoff: 190,
    topFederalUnis: ['UNILAG', 'ABU', 'UI', 'UNN', 'FUTA', 'UNILORIN', 'OAU'],
    waecSubjects: '5 Credits: English Language, Mathematics, Physics, Chemistry, and Technical Drawing or Geography',
    jambSubjects: 'English Language, Mathematics, Physics, Chemistry',
    polyDirectEntryRoute: 'ND in Civil Engineering (Upper Credit) -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Building (B.Tech / B.Sc)', cutoff: '190 - 210', route: 'Structural execution, site supervision, and building safety management' },
      { name: 'Water Resources & Environmental Eng.', cutoff: '185 - 205', route: 'Dams, municipal water treatment, and flood control systems' }
    ],
    keyAdvice: 'Council for the Regulation of Engineering in Nigeria (COREN) accreditation is essential. Ensure your choice university engineering program is fully COREN accredited.'
  },
  {
    id: 'chemical-engineering',
    name: 'Chemical Engineering',
    degree: 'B.Eng (5 Years)',
    discipline: 'Engineering',
    faculty: 'Faculty of Engineering',
    meritCutoff: 235,
    catchmentCutoff: 215,
    stateUniCutoff: 190,
    topFederalUnis: ['OAU', 'UNILAG', 'UNIBEN', 'ABU', 'UNIPORT', 'FUTO'],
    waecSubjects: '5 Credits: English Language, Mathematics, Physics, Chemistry, and Further Maths or Biology',
    jambSubjects: 'English Language, Mathematics, Physics, Chemistry',
    polyDirectEntryRoute: 'ND in Chemical Engineering (Upper Credit) -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Petroleum & Gas Engineering', cutoff: '210 - 230', route: 'Upstream oil and gas exploration and refining' },
      { name: 'Industrial Chemistry (B.Sc)', cutoff: '185 - 205', route: 'Polymer synthesis, FMCG cosmetics formulation, and petrochemicals' }
    ],
    keyAdvice: 'Chemical engineering focuses on industrial process scaling rather than bench chemistry. Very strong career linkages with multinational energy and manufacturing firms.'
  },

  // ==========================================
  // 11. PURE & APPLIED SCIENCES (Science Stream)
  // ==========================================
  {
    id: 'biochemistry',
    name: 'Biochemistry',
    degree: 'B.Sc (4 Years)',
    discipline: 'Pure & Applied Sciences',
    faculty: 'Faculty of Science / Basic Medical Sciences',
    meritCutoff: 215,
    catchmentCutoff: 195,
    stateUniCutoff: 180,
    topFederalUnis: ['UI', 'UNILAG', 'OAU', 'UNN', 'ABU', 'UNILORIN', 'UNIBEN'],
    waecSubjects: '5 Credits: English Language, Mathematics, Biology, Chemistry, Physics',
    jambSubjects: 'English Language, Biology, Chemistry, and Physics or Mathematics',
    polyDirectEntryRoute: 'ND Science Laboratory Technology (Chemistry/Biochemistry option) -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Biotechnology (B.Sc)', cutoff: '190 - 210', route: 'Genetic modification, enzyme technology, and pharmaceutical bioprocessing' },
      { name: 'Industrial Chemistry (B.Sc)', cutoff: '185 - 200', route: 'Chemical manufacturing and analytical quality control' }
    ],
    keyAdvice: 'Biochemistry has broad versatility. It accepts students who missed MBBS/Pharmacy and offers strong medical research and clinical laboratory opportunities.'
  },
  {
    id: 'microbiology',
    name: 'Microbiology',
    degree: 'B.Sc (4 Years)',
    discipline: 'Pure & Applied Sciences',
    faculty: 'Faculty of Science / Life Sciences',
    meritCutoff: 210,
    catchmentCutoff: 190,
    stateUniCutoff: 180,
    topFederalUnis: ['UNILAG', 'UI', 'OAU', 'UNN', 'ABU', 'UNILORIN'],
    waecSubjects: '5 Credits: English Language, Mathematics, Biology, Chemistry, Physics',
    jambSubjects: 'English Language, Biology, Chemistry, and Physics or Mathematics',
    polyDirectEntryRoute: 'ND Science Laboratory Technology (Microbiology option) -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Science Laboratory Technology (B.Tech)', cutoff: '180 - 195', route: 'Direct practical analytical bench instrumentation' },
      { name: 'Plant Biology & Biotechnology', cutoff: '170 - 185', route: 'Seed pathology and crop pest protection' }
    ],
    keyAdvice: 'Microbiology graduates find direct employment in brewery laboratories (Nigerian Breweries, Guinness), food quality agencies (NAFDAC, SON), and clinical diagnostic centers.'
  },

  // ==========================================
  // 12. AGRICULTURE & FOOD SCIENCES (Science & Commercial)
  // ==========================================
  {
    id: 'agricultural-economics',
    name: 'Agricultural Economics & Agribusiness',
    degree: 'B.Agric / B.Sc (5 Years)',
    discipline: 'Agriculture & Food Sciences',
    faculty: 'Faculty of Agriculture',
    meritCutoff: 195,
    catchmentCutoff: 180,
    stateUniCutoff: 165,
    topFederalUnis: ['UI', 'FUNAAB', 'UNN', 'ABU', 'OAU', 'FUTA', 'FUAM'],
    waecSubjects: '5 Credits: English Language, Mathematics, Chemistry, Agricultural Science or Biology, and Economics or Physics',
    jambSubjects: 'English Language, Chemistry, Biology/Agric Science, and Mathematics or Economics',
    polyDirectEntryRoute: 'ND in Agricultural Technology or Agribusiness (Upper Credit) -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Food Science & Technology (B.Sc)', cutoff: '190 - 210', route: 'Commercial food preservation, packaging, and industrial manufacturing' },
      { name: 'Animal Science & Fisheries', cutoff: '175 - 190', route: 'Commercial livestock farming, feed formulation, and hatchery management' },
      { name: 'Soil Science & Land Management', cutoff: '170 - 185', route: 'Soil fertility testing and environmental agronomy' }
    ],
    keyAdvice: 'Federal Universities of Agriculture (FUNAAB Abeokuta, FUAM Makurdi, UMUDIKE) offer generous admission quotas and lower cut-offs for agricultural sciences. Commercial students with Economics and Agric can also qualify in several universities.'
  },
  {
    id: 'food-science-tech',
    name: 'Food Science & Technology',
    degree: 'B.Sc / B.Tech (5 Years)',
    discipline: 'Agriculture & Food Sciences',
    faculty: 'Faculty of Agriculture / Technology',
    meritCutoff: 210,
    catchmentCutoff: 190,
    stateUniCutoff: 175,
    topFederalUnis: ['FUNAAB', 'UI', 'FUTA', 'UNN', 'UNIBEN', 'UNILORIN'],
    waecSubjects: '5 Credits: English Language, Mathematics, Chemistry, Biology/Agricultural Science, and Physics',
    jambSubjects: 'English Language, Chemistry, Mathematics or Physics, and Biology or Agricultural Science',
    polyDirectEntryRoute: 'ND in Food Technology (Upper Credit) from accredited polytechnics -> Direct Entry to 200L.',
    fallbacks: [
      { name: 'Nutrition & Dietetics (B.Sc)', cutoff: '190 - 205', route: 'Hospital patient dietary plans and maternal nutrition' },
      { name: 'Industrial Chemistry', cutoff: '185 - 200', route: 'Quality assurance in food and beverage plants' }
    ],
    keyAdvice: 'Food Science graduates are in high demand in FMCG multinational food companies (Nestlé, Cadbury, FrieslandCampina WAMCO, Flour Mills of Nigeria).'
  }
];
