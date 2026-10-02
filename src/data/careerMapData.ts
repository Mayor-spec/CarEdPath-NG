export interface RoadmapPhase {
  phaseNumber: number;
  phaseId: 'now' | 'next' | 'tertiary' | 'launch';
  name: string;
  tagline: string;
  durationBadge: string;
  costBadge: string;
  gatewayBadge: string;
  colorScheme: 'emerald' | 'terracotta' | 'navy' | 'crimson';
  icon: string;
  primaryDetails: {
    title: string;
    description: string;
    items?: string[];
  };
  keyRequirements: {
    label: string;
    value: string;
    explainKey?: string;
  }[];
  freeResources?: {
    name: string;
    platform: string;
    description: string;
    tag: string;
  }[];
  costBreakdown?: {
    item: string;
    estimatedCost: string;
    notes: string;
  }[];
  careerMilestones?: {
    year: string;
    milestone: string;
  }[];
  insiderAdvice: string;
}

export interface CareerMapData {
  careerId: string;
  careerTitle: string;
  degreeTitle: string;
  faculty: string;
  discipline: string;
  regulatoryBody: string;
  regulatoryExplainKey?: string;
  overview: string;
  isUnavailable?: boolean;
  phases: RoadmapPhase[];
}

export interface GlossaryTerm {
  term: string;
  simplifiedTitle: string;
  explanation: string;
  nigerianContext: string;
  example: string;
}

export const GLOSSARY_TERMS: Record<string, GlossaryTerm> = {
  'direct-entry': {
    term: 'Direct Entry (DE)',
    simplifiedTitle: 'Skipping Year 1 Straight into 200 Level',
    explanation: 'A special admission portal organized by JAMB for students who already hold an accredited 2-year National Diploma (ND), Nigeria Certificate in Education (NCE), or Cambridge A-Levels/JUPEB.',
    nigerianContext: 'Instead of retaking UTME and starting from 100 Level with freshmen, you matriculate straight into 200 Level in a university.',
    example: 'Amina completed ND Science Lab Tech at Federal Poly Offa with Upper Credit, then gained Direct Entry into 200L Medical Laboratory Science at UNILORIN.'
  },
  'olevel-deficiency': {
    term: "O'Level Deficiency",
    simplifiedTitle: 'Missing a Required WAEC/NECO Credit',
    explanation: 'When you fail to secure at least a C6 (Credit) in one of your compulsory core subjects (such as Mathematics, English, Biology, or Literature).',
    nigerianContext: 'Even if you score 300 in JAMB, universities will automatically disqualify you during Post-UTME physical screening if you have an O\'Level deficiency.',
    example: 'Scoring D7 in English Language when applying for Law or Pharmacy disqualifies your admission until you retake WAEC GCE.'
  },
  'post-utme': {
    term: 'Post-UTME Screening',
    simplifiedTitle: 'The University’s Own Second Exam',
    explanation: 'An institutional entrance screening organized by each Nigerian tertiary institution for candidates who met their JAMB cut-off benchmark.',
    nigerianContext: 'Some universities (like UNILAG and UI) write computer-based tests, while others (like OAU or UNN) use aggregate points combining your WAEC grades and UTME score.',
    example: 'Post-UTME portal fee is fixed at ₦2,000 across all federal universities by the Federal Ministry of Education.'
  },
  'induction': {
    term: 'Council Induction & Oath',
    simplifiedTitle: 'Getting Your Official License to Practice',
    explanation: 'A formal legal ceremony where professional regulatory bodies confer licensed practicing status and a registration pin onto new graduates.',
    nigerianContext: 'Without induction, you hold a certificate but cannot legally treat patients, sign medical lab results, represent clients in court, or audit company books.',
    example: 'Medical Laboratory Science graduates are inducted by MLSCN into professional practice right after their 500 Level final examinations.'
  },
  'catchment': {
    term: 'Catchment Area Quotas',
    simplifiedTitle: 'Home-State Cut-Off Advantage',
    explanation: 'A federal admission policy reserving 35% of university admission slots for candidates originating from the states geographically surrounding that federal institution.',
    nigerianContext: 'If your state of origin matches the university’s catchment zone, your cut-off mark can be 15 to 30 points lower than the National Merit cut-off.',
    example: 'For UNILAG, applicants from Lagos, Ogun, Osun, Oyo, Ondo, and Ekiti enjoy catchment cut-offs for competitive courses.'
  },
  'caps': {
    term: 'JAMB CAPS',
    simplifiedTitle: 'Central Admissions Processing System',
    explanation: 'The official digital admission engine where Nigerian universities submit their proposed admission lists and where JAMB verifies candidate credentials.',
    nigerianContext: 'You must log into the JAMB CAPS portal on your smartphone to officially ACCEPT your admission offer. If left unaccepted for weeks, JAMB can withdraw it.',
    example: 'Always monitor your CAPS profile to see when your status changes from "Not Admitted" to "Admission in Progress" (AIP).'
  },
  'siwes': {
    term: 'SIWES / Industrial Attachment',
    simplifiedTitle: 'Hands-On Company Internship',
    explanation: 'Students Industrial Work Experience Scheme: a mandatory practical training program created by the Industrial Training Fund (ITF) for engineering, tech, science, and environmental students.',
    nigerianContext: 'Typically takes place during the second semester of 300 Level or 400 Level for 3 to 6 months, giving you real work experience before graduation.',
    example: 'Software engineering students intern at fintech startups like Paystack or Moniepoint during SIWES.'
  },
  'mlscn': {
    term: 'MLSCN Regulatory Board',
    simplifiedTitle: 'Medical Laboratory Science Council of Nigeria',
    explanation: 'The statutory government parastatal regulating the education and practice of Medical Laboratory Scientists in Nigeria.',
    nigerianContext: 'Ensures only accredited university diagnostic laboratories train students, and inspects hospitals before approving internship slots.',
    example: 'Graduates must be registered with MLSCN and receive a valid annual practicing license to work in any hospital or research lab.'
  },
  'coren': {
    term: 'COREN Accreditation',
    simplifiedTitle: 'Council for the Regulation of Engineering in Nigeria',
    explanation: 'The apex statutory body governing the engineering profession, standards, and university degree programs in Nigeria.',
    nigerianContext: 'Attending a university without COREN accreditation means your engineering degree will not qualify you to practice as a Registered Engineer.',
    example: 'COREN conducts rigorous physical inspections of workshop equipment, wind tunnels, and electronics labs in universities.'
  },
  'one-sitting': {
    term: 'One Sitting vs Two Sittings',
    simplifiedTitle: 'WAEC Exam Frequency Rule',
    explanation: 'One sitting means all 5 required credits were obtained in a single exam series (e.g., WAEC May/June). Two sittings means combining certificates from two different exam years.',
    nigerianContext: 'Extremely competitive disciplines like Medicine, Pharmacy, and Law in premier federal institutions heavily favor candidates with single-sitting results.',
    example: 'Most federal universities accept combining WAEC and NECO for engineering, commercial, and art courses, provided all 5 core credits are met.'
  },
  'internship': {
    term: 'Mandatory 1-Year Clinical Internship',
    simplifiedTitle: 'Paid Hospital Housemanship Year',
    explanation: 'A compulsory 12-month post-graduation internship for medical, pharmacy, medical lab, and nursing graduates before National Youth Service (NYSC).',
    nigerianContext: 'Unlike student industrial attachment, internship is a fully paid clinical post in accredited teaching hospitals or federal medical centers (CONMESS / CONHESS pay scales).',
    example: 'Intern Medical Laboratory Scientists currently earn between ₦180,000 and ₦260,000 monthly in federal teaching hospitals during their internship.'
  },
  'nysc': {
    term: 'NYSC Youth Service',
    simplifiedTitle: '1-Year National Youth Service Scheme',
    explanation: 'A mandatory one-year paramilitary and community service program for all Nigerian graduates from universities and polytechnics under 30 years of age.',
    nigerianContext: 'You receive a monthly federal government allowance (allawee) while posted to teach in secondary schools, work in public hospitals, or serve in private enterprises.',
    example: 'You must possess an official NYSC Discharge Certificate or Exemption Letter before you can be hired into formal corporate or civil service employment in Nigeria.'
  }
};

export const MOCK_CAREER_MAPS: Record<string, CareerMapData> = {
  'mls': {
    careerId: 'mls',
    careerTitle: 'Medical Laboratory Science',
    degreeTitle: 'Bachelor of Medical Laboratory Science (B.MLS)',
    faculty: 'Basic Medical Sciences / Allied Health Sciences',
    discipline: 'Medical & Health Sciences',
    regulatoryBody: 'Medical Laboratory Science Council of Nigeria (MLSCN)',
    regulatoryExplainKey: 'mlscn',
    overview: 'Medical Laboratory Scientists form the diagnostic backbone of modern healthcare, analyzing blood, tissue, and pathogens to detect infectious diseases, monitor cancer therapies, and conduct clinical research.',
    phases: [
      {
        phaseNumber: 1,
        phaseId: 'now',
        name: 'Phase 1: NOW',
        tagline: 'Immediate Secondary Preparation & Free Skill Foundation',
        durationBadge: 'SS1 to SS3 (1–3 Years)',
        costBadge: 'Est. Cost: ₦0 (100% Free Resources)',
        gatewayBadge: 'Gateway: 5 WAEC/NECO Credits',
        colorScheme: 'emerald',
        icon: 'biotech',
        primaryDetails: {
          title: 'Secondary School Prerequisites & Foundation',
          description: 'Secure credit passes in all core biological and physical sciences. Avoid common subject deficiency pitfalls before registering for your senior school certificate.',
          items: [
            'Compulsory 5 O’Level Credits: English Language, Mathematics, Biology, Chemistry, and Physics.',
            'Sitting Policy: One sitting is strictly preferred by premier medical faculties (UI, UNILAG, UNN, ABU). Two sittings (WAEC + NECO combined) are accepted by state universities if all 5 credits are verified.',
            'Target at least B3 in Biology and Chemistry to give yourself a competitive edge in university screening aggregate calculations.'
          ]
        },
        keyRequirements: [
          { label: 'O’Level Core', value: 'English, Maths, Biology, Chemistry, Physics', explainKey: 'olevel-deficiency' },
          { label: 'Sitting Preference', value: '1 Sitting preferred (2 sittings accepted in state unis)', explainKey: 'one-sitting' },
          { label: 'Key Habit', value: 'Mastering laboratory apparatus diagrams and chemistry equation balancing' }
        ],
        freeResources: [
          {
            name: 'Khan Academy Biology & Human Anatomy',
            platform: 'YouTube & Mobile App',
            description: 'Free comprehensive visual modules covering cellular biology, immunology, and organ physiology.',
            tag: 'Free'
          },
          {
            name: 'CrashCourse Chemistry & Hematology',
            platform: 'YouTube',
            description: 'Fast-paced, memorable video breakdowns of chemical reactions, blood groups, and pathology.',
            tag: 'Free'
          },
          {
            name: 'Myschool Past Questions CBT App',
            platform: 'Android / Offline',
            description: 'Practice 15+ years of authentic WAEC and JAMB past questions offline on any basic Android phone.',
            tag: 'Offline App'
          }
        ],
        insiderAdvice: 'Do not ignore Physics! Many students mistakenly think Medical Laboratory Science only needs Biology and Chemistry. Physics is strictly compulsory in both WAEC and JAMB.'
      },
      {
        phaseNumber: 2,
        phaseId: 'next',
        name: 'Phase 2: NEXT',
        tagline: 'The Nigerian Entry Gateway (JAMB UTME & Screening)',
        durationBadge: '6–9 Months Prep Cycle',
        costBadge: 'Est. Gateway Fees: ~₦36,700 – ₦45,000',
        gatewayBadge: 'Gateway: UTME 235+ & CAPS Clearance',
        colorScheme: 'terracotta',
        icon: 'how_to_reg',
        primaryDetails: {
          title: 'JAMB UTME Subject Combination & Target Scores',
          description: 'Achieve a top-tier UTME score to qualify for merit admission quotas in accredited federal and state medical faculties.',
          items: [
            'Compulsory JAMB Combination: English Language, Biology, Chemistry, and Physics (Strict 4-subject combination).',
            'Target Scores: Aim for 245–270+ for premier Federal Universities (UNILAG, UI, UNN, UNILORIN). State universities (LASU, DELSU, AAU) generally benchmark 220–245.',
            'Catchment Strategy: If your home state hosts a federal university, leverage your state catchment quota where cutoffs can drop by 15–20 points.'
          ]
        },
        keyRequirements: [
          { label: 'JAMB UTME Subjects', value: 'English, Biology, Chemistry, Physics' },
          { label: 'Federal Merit Target', value: '245 – 275+ UTME Score' },
          { label: 'Catchment Target', value: '220 – 240 UTME Score', explainKey: 'catchment' },
          { label: 'CAPS Verification', value: 'Monitor CAPS closely for admission recommendations', explainKey: 'caps' }
        ],
        costBreakdown: [
          { item: 'JAMB UTME Registration (with Mock Exam & Reading Text)', estimatedCost: '₦7,700', notes: 'Standard official JAMB CBT center fee' },
          { item: 'WAEC Senior School Certificate Examination (SSCE)', estimatedCost: '₦27,000', notes: 'Official council registration in public secondary schools' },
          { item: 'University Post-UTME Screening Portal Fee', estimatedCost: '₦2,000', notes: 'Statutory national ceiling for all universities' },
          { item: 'Biometric Verification & Document Clearance Slip', estimatedCost: '₦1,500', notes: 'Local cyber cafe printing and verification' }
        ],
        insiderAdvice: 'If your JAMB score lands between 190–225, do not lose a whole year! Accept an accredited National Diploma in Science Laboratory Technology (SLT) at YABATECH or Fed Poly Offa, and apply via Direct Entry into 200L B.MLS.'
      },
      {
        phaseNumber: 3,
        phaseId: 'tertiary',
        name: 'Phase 3: TERTIARY TRAINING',
        tagline: 'University Degree, Clinical Rotations & Accreditation',
        durationBadge: '5 Academic Years (Full-Time)',
        costBadge: 'Est. Tuition: ₦65k–₦120k/session (Federal) | Living: ~₦250k–₦380k/yr',
        gatewayBadge: 'Gateway: B.MLS Degree & Professional Exam',
        colorScheme: 'navy',
        icon: 'school',
        primaryDetails: {
          title: 'Accredited Curriculum & Diagnostic Laboratory Rigor',
          description: 'A 5-year rigorous professional program integrating didactic lectures with extensive hospital laboratory postings in pathology, clinical chemistry, hematology, and medical microbiology.',
          items: [
            'Degree Awarded: Bachelor of Medical Laboratory Science (B.MLS).',
            'Accreditation Requirement: Ensure your university department is dual-accredited by both the National Universities Commission (NUC) and the Medical Laboratory Science Council of Nigeria (MLSCN).',
            'Clinicals & SIWES: 400 Level features 6 months of mandatory hospital laboratory rotations where you handle real patient specimens.'
          ]
        },
        keyRequirements: [
          { label: 'Program Length', value: '5 Years (10 Semesters)' },
          { label: 'Regulatory Council', value: 'MLSCN (Statutory Board)', explainKey: 'mlscn' },
          { label: 'Clinical Posting', value: '400L Mandatory 6-Month Hospital Attachment', explainKey: 'siwes' },
          { label: 'Professional Exams', value: 'Part 1 (400L) & Part 2 Final Professional Exams' }
        ],
        careerMilestones: [
          { year: '100 Level', milestone: 'Basic Sciences (Pre-Med Biology, Chemistry, Physics, Botany, Zoology) with high GPA focus.' },
          { year: '200 Level', milestone: 'Foundation Anatomy, Physiology, Medical Biochemistry, and Introductory Laboratory Instrumentation.' },
          { year: '300 Level', milestone: 'Core Pathology: Hematology, Histopathology, Medical Microbiology, and Chemical Pathology.' },
          { year: '400 Level', milestone: 'Hospital Clinical Rotations & First Professional MLSCN Licensing Board Examination.' },
          { year: '500 Level', milestone: 'Sub-specialization defense, final professional exams, and solemn MLSCN Council Induction & Oath taking.' }
        ],
        insiderAdvice: 'Living expenses in federal universities (hostel fees ~₦35k–₦75k/year, food & books ~₦200k/year) are far larger than tuition. Apply for the Agbami Medical Scholarship (₦200,000/year) or NNPC/Chevron awards in 100 Level.'
      },
      {
        phaseNumber: 4,
        phaseId: 'launch',
        name: 'Phase 4: CAREER LAUNCH',
        tagline: 'Internship, Licensure, NYSC & Earning Trajectory',
        durationBadge: 'Year 1 Post-Graduation & Beyond',
        costBadge: 'Earnings: ₦220,000 – ₦650,000/month in Nigeria',
        gatewayBadge: 'Gateway: Full MLSCN License & NYSC Discharge',
        colorScheme: 'crimson',
        icon: 'workspace_premium',
        primaryDetails: {
          title: 'Clinical Practice, Industry Roles & Professional Standing',
          description: 'From hospital diagnostics to international health organizations, Medical Laboratory Scientists hold essential clinical credentials recognized globally.',
          items: [
            'Mandatory Paid 1-Year Clinical Internship: Following graduation and induction, you complete a paid 12-month internship at an accredited teaching hospital or medical center.',
            'NYSC Deployment: Deployment to hospitals, community clinics, or research institutes nationwide with monthly allawee.',
            'Full Practicing License: Upon completing your internship and submitting your logbook to MLSCN, you receive your unrestricted practicing license.'
          ]
        },
        keyRequirements: [
          { label: 'Internship Period', value: '1 Year Paid Clinical Posting (₦180k–₦260k/mo)', explainKey: 'internship' },
          { label: 'Induction Oath', value: 'Formal MLSCN Induction & Practicing Pin', explainKey: 'induction' },
          { label: 'NYSC Requirement', value: '1 Year National Youth Service', explainKey: 'nysc' }
        ],
        freeResources: [
          {
            name: 'Entry-Level Roles in Nigeria',
            platform: 'Public & Private Health',
            description: 'Clinical Laboratory Scientist (Hospitals), Blood Bank Specialist, Pharmaceutical QA Officer, Forensic Lab Analyst, Molecular Diagnostic Specialist.',
            tag: 'Career Options'
          },
          {
            name: 'Starting Salary Benchmark',
            platform: 'Nigerian Labor Market',
            description: 'Interns earn ₦180k–₦260k/month. Post-NYSC staff scientists start at ₦220k–₦450k/month in diagnostic centers and up to ₦650k+ in private international labs.',
            tag: 'Salary Insight'
          }
        ],
        insiderAdvice: 'B.MLS degrees from Nigeria are highly valued abroad. If you wish to practice internationally later, the MLSCN curriculum aligns directly with the UK HCPC and US ASCPi certification pathways.'
      }
    ]
  },
  'software': {
    careerId: 'software',
    careerTitle: 'Software Engineering & Cloud Computing',
    degreeTitle: 'B.Sc / B.Eng Software Engineering or Computer Science',
    faculty: 'Engineering & Computing',
    discipline: 'Computing & Information Technology',
    regulatoryBody: 'Computer Professionals Registration Council of Nigeria (CPN) & COREN',
    regulatoryExplainKey: 'coren',
    overview: 'Software engineers build resilient digital infrastructure, cloud services, and user applications powering fintech, healthcare, agriculture, and global commerce.',
    phases: [
      {
        phaseNumber: 1,
        phaseId: 'now',
        name: 'Phase 1: NOW',
        tagline: 'Secondary Foundations, Mathematics & Zero-Naira Coding',
        durationBadge: 'SS1 to SS3 (1–3 Years)',
        costBadge: 'Est. Cost: ₦0 (100% Free Online Platforms)',
        gatewayBadge: 'Gateway: 5 WAEC Credits including Further Maths/Physics',
        colorScheme: 'emerald',
        icon: 'code',
        primaryDetails: {
          title: 'Secondary Foundations & Free Smartphone Coding',
          description: 'Strengthen quantitative reasoning and computer principles. You do not need an expensive laptop to write your first lines of code.',
          items: [
            'Compulsory 5 O’Level Credits: English Language, Mathematics, Physics, and 2 from Chemistry, Further Mathematics, Computer Studies, or Technical Drawing.',
            'Further Mathematics in WAEC gives a massive advantage in university algorithm courses and technical problem-solving.',
            'Start practicing computational logic on your smartphone using free web playgrounds (Replit, SoloLearn, or freeCodeCamp).'
          ]
        },
        keyRequirements: [
          { label: 'O’Level Core', value: 'English, Maths, Physics, Chemistry / Further Maths', explainKey: 'olevel-deficiency' },
          { label: 'Sitting Preference', value: '1 or 2 Sittings widely accepted across all universities', explainKey: 'one-sitting' },
          { label: 'Essential Practice', value: 'Algorithmic thinking and basic HTML/CSS/Python script writing' }
        ],
        freeResources: [
          {
            name: 'freeCodeCamp Responsive Web Design',
            platform: 'Browser (Mobile & PC)',
            description: '100% free, interactive curriculum teaching HTML5, CSS3, and modern web responsive design with certificates.',
            tag: 'Free Certificate'
          },
          {
            name: 'CS50 Introduction to Computer Science',
            platform: 'Harvard / YouTube',
            description: 'World-renowned foundational lectures on algorithms, C, Python, memory management, and databases.',
            tag: 'Free Course'
          },
          {
            name: 'SoloLearn Mobile Coding App',
            platform: 'Android / iOS',
            description: 'Bite-sized, gamified programming lessons for practicing Python and JavaScript on a budget mobile phone.',
            tag: 'Mobile App'
          }
        ],
        insiderAdvice: 'Don’t wait for university resumption to write code! 15-year-olds who build simple GitHub projects before 100L often land paid remote internships by 200L.'
      },
      {
        phaseNumber: 2,
        phaseId: 'next',
        name: 'Phase 2: NEXT',
        tagline: 'JAMB UTME Subject Combination & Free National Tech Cohorts',
        durationBadge: '6–9 Months Preparation',
        costBadge: 'Est. Gateway Fees: ~₦36,700 – ₦45,000',
        gatewayBadge: 'Gateway: UTME 230+ & Tech Cohort Enrollment',
        colorScheme: 'terracotta',
        icon: 'terminal',
        primaryDetails: {
          title: 'JAMB UTME Combinations & Strategic Institution Selection',
          description: 'Secure admission into top engineering and computing universities while participating in national tech talent pipelines.',
          items: [
            'Compulsory JAMB Combination: English Language, Mathematics, Physics, and Chemistry or Computer Studies.',
            'Target Scores: Aim for 240–280+ for premier federal tech schools (FUTA Akure, UNILAG, OAU, UNN). State universities (LASU, OOU) benchmark 200–235.',
            'Join the free Federal Ministry 3MTT (3 Million Technical Talents) program and She Code Africa cohorts to receive free community mentorship.'
          ]
        },
        keyRequirements: [
          { label: 'JAMB UTME Subjects', value: 'English, Mathematics, Physics, Chemistry/Computer' },
          { label: 'Federal Merit Target', value: '240 – 275+ UTME Score' },
          { label: 'State & Poly Target', value: '190 – 225 UTME Score', explainKey: 'catchment' },
          { label: 'Direct Entry Route', value: 'ND Computer Science (Upper Credit) -> 200L DE', explainKey: 'direct-entry' }
        ],
        costBreakdown: [
          { item: 'JAMB UTME Registration + Official Novel', estimatedCost: '₦7,700', notes: 'Accredited JAMB CBT Center' },
          { item: 'WAEC Examination Registration', estimatedCost: '₦27,000', notes: 'Public secondary school standard fee' },
          { item: 'Post-UTME Screening Portal Fee', estimatedCost: '₦2,000', notes: 'Statutory ceiling' },
          { item: 'Practice CBT Software / Internet Data Bundle', estimatedCost: '₦3,500', notes: 'Monthly prep and online mock practice' }
        ],
        insiderAdvice: 'If university strikes or admission quotas slow you down, enroll in an accredited ND Computer Science at Yaba College of Technology or Kaduna Poly. You can build projects and transfer directly into 200L via JAMB Direct Entry.'
      },
      {
        phaseNumber: 3,
        phaseId: 'tertiary',
        name: 'Phase 3: TERTIARY TRAINING',
        tagline: 'University Degree, GitHub Portfolio & SIWES Internship',
        durationBadge: '4 to 5 Academic Years',
        costBadge: 'Est. Tuition: ₦70k–₦130k/session (Federal) | Living: ~₦280k–₦420k/yr',
        gatewayBadge: 'Gateway: B.Sc / B.Eng Degree & Live GitHub Deployments',
        colorScheme: 'navy',
        icon: 'laptop_mac',
        primaryDetails: {
          title: 'Computing Theory, Software Architecture & Industrial SIWES',
          description: 'A 4–5 year balance of theoretical data structures, algorithms, system design, and practical software engineering sprints.',
          items: [
            'Curriculum: Data Structures, Object-Oriented Programming, Database Management (SQL/NoSQL), Operating Systems, and Cloud Architecture.',
            'SIWES Industrial Attachment: Mandatory 3 to 6 months of corporate internship at Nigerian tech companies, banks, or startups.',
            'Portfolio Mandate: Employers in tech prioritize live portfolio links, open-source pull requests, and deployed applications over GPA alone.'
          ]
        },
        keyRequirements: [
          { label: 'Program Length', value: '4 Years (B.Sc) / 5 Years (B.Eng)' },
          { label: 'Accreditation', value: 'CPN & COREN (Engineering Tracks)', explainKey: 'coren' },
          { label: 'SIWES Internship', value: '3–6 Months corporate tech attachment', explainKey: 'siwes' },
          { label: 'Graduation Benchmark', value: 'Final Year Capstone Software System' }
        ],
        careerMilestones: [
          { year: '100 Level', milestone: 'Foundational Calculus, Discrete Mathematics, Physics, and Introduction to Algorithms (C / Python).' },
          { year: '200 Level', milestone: 'Data Structures, Object-Oriented Programming in Java/C++, and building personal web projects.' },
          { year: '300 Level', milestone: 'Database Systems, Software Engineering Methodologies, and 6-Month SIWES Industry Attachment.' },
          { year: '400/500 Level', milestone: 'Distributed Cloud Systems, Cyber Security, Capstone Project Defense, and Tech Job Applications.' }
        ],
        insiderAdvice: 'Apply for the MTN Science & Technology Scholarship (₦300,000/year for STEM students with CGPA 3.5+) in your second year to cover laptop upgrades and living expenses.'
      },
      {
        phaseNumber: 4,
        phaseId: 'launch',
        name: 'Phase 4: CAREER LAUNCH',
        tagline: 'Global Remote Work, NYSC & High-Growth Tech Salaries',
        durationBadge: 'Immediate Post-Graduation',
        costBadge: 'Earnings: ₦300,000 – ₦1,200,000+/month',
        gatewayBadge: 'Gateway: Tech Portfolio, NYSC & Global Contracts',
        colorScheme: 'crimson',
        icon: 'rocket_launch',
        primaryDetails: {
          title: 'Remote Engineering, FinTech Dominance & Global Portability',
          description: 'Nigerian software engineers are in exceptional demand locally in fintechs and logistics, as well as remotely for US, UK, and European companies.',
          items: [
            'Entry-Level Roles: Junior Frontend/Backend Engineer, Cloud Support Associate, Mobile App Developer (Flutter/React Native), DevOps Intern, QA Automation Tester.',
            'NYSC Tech Deployment: Deploy to tech hubs, banks, or remote incubators where you can earn your monthly federal allawee plus company salaries.',
            'Global Currency Earnings: Highly skilled junior engineers frequently secure remote contracts paid in USD ($500–$1,500/month) while residing in Nigeria.'
          ]
        },
        keyRequirements: [
          { label: 'Entry Earning', value: '₦300,000 – ₦700,000/mo (Local) | $600–$1,500/mo (Remote)' },
          { label: 'NYSC Requirement', value: '1 Year National Service (Tech Posting)', explainKey: 'nysc' },
          { label: 'Essential Artifact', value: 'Verified GitHub Profile & Live Deployed Apps' }
        ],
        freeResources: [
          {
            name: 'ALX Africa Software Fellowship',
            platform: 'Virtual Cohort',
            description: 'Free intensive professional program preparing African software engineers for global remote employment.',
            tag: 'Top Fellowship'
          },
          {
            name: 'She Code Africa Mentorship Cohorts',
            platform: 'Community & Grants',
            description: 'Female-led mentorship program connecting aspiring ladies with seasoned engineering directors and laptop grants.',
            tag: 'Mentorship'
          }
        ],
        insiderAdvice: 'Your code portfolio speaks louder than your certificate. Keep your GitHub active with commit history, documentation, and clean readable code.'
      }
    ]
  },
  'law': {
    careerId: 'law',
    careerTitle: 'Law & Corporate Advocacy',
    degreeTitle: 'Bachelor of Laws (LL.B) + Barrister-at-Law (B.L)',
    faculty: 'Faculty of Law',
    discipline: 'Law & Legal Studies',
    regulatoryBody: 'Council of Legal Education (CLE) & Nigerian Bar Association (NBA)',
    regulatoryExplainKey: 'induction',
    overview: 'Lawyers in Nigeria champion human rights, structure billion-naira investment contracts, navigate intellectual property in tech, and advocate at the commercial bar.',
    phases: [
      {
        phaseNumber: 1,
        phaseId: 'now',
        name: 'Phase 1: NOW',
        tagline: 'Literature Rigor, Public Speaking & Secondary Mastery',
        durationBadge: 'SS1 to SS3 (1–3 Years)',
        costBadge: 'Est. Cost: ₦0 (Free Reading & Debate Clubs)',
        gatewayBadge: 'Gateway: 5 WAEC Credits with Literature-in-English',
        colorScheme: 'emerald',
        icon: 'gavel',
        primaryDetails: {
          title: 'Secondary Foundations & Literature-in-English Command',
          description: 'Law requires exceptional analytical reading, writing speed, and critical reasoning. Literature-in-English is strictly non-negotiable.',
          items: [
            'Compulsory 5 O’Level Credits: English Language, Literature-in-English, Mathematics, Government, and CRS/IRS or History.',
            'Literature-in-English Rule: You CANNOT study Law in any accredited Nigerian university without a credit in Literature-in-English.',
            'Sitting Policy: Premier federal law faculties (UNILAG, UI, OAU, UNN, ABU) heavily prefer one sitting with B-grades in English and Literature.'
          ]
        },
        keyRequirements: [
          { label: 'O’Level Core', value: 'English, Literature-in-English, Maths, Government, CRS/IRS', explainKey: 'olevel-deficiency' },
          { label: 'Sitting Preference', value: '1 Sitting strictly preferred in top law faculties', explainKey: 'one-sitting' },
          { label: 'Key Habit', value: 'Daily editorial analysis, essay drafting, and school debate participation' }
        ],
        freeResources: [
          {
            name: 'Nigeria Law Resources & Supreme Court Judgments',
            platform: 'Online Law Pavilions',
            description: 'Free public case law summaries and Nigerian constitutional articles.',
            tag: 'Free Case Law'
          },
          {
            name: 'LitCharts & SparkNotes Classic Literature',
            platform: 'Web & Mobile App',
            description: 'Deep analytical chapter breakdowns of WAEC prescribed African and non-African drama and prose.',
            tag: 'Study Guides'
          },
          {
            name: 'Myschool JAMB Literature CBT Prep',
            platform: 'Mobile App',
            description: 'Past exam tests covering literary terms, poetry analyses, and recommended Nigerian drama texts.',
            tag: 'CBT Practice'
          }
        ],
        insiderAdvice: 'Do not neglect Mathematics! Even though Law is an Arts/Social Science discipline, a credit pass in Mathematics (at least C6) in WAEC is mandatory for university clearance.'
      },
      {
        phaseNumber: 2,
        phaseId: 'next',
        name: 'Phase 2: NEXT',
        tagline: 'JAMB UTME Combinations, High Cut-Offs & Screening',
        durationBadge: '6–9 Months Preparation',
        costBadge: 'Est. Gateway Fees: ~₦36,700 – ₦45,000',
        gatewayBadge: 'Gateway: UTME 265+ & Merit List Clearance',
        colorScheme: 'terracotta',
        icon: 'balance',
        primaryDetails: {
          title: 'JAMB UTME Subject Combination & Cut-Off Reality',
          description: 'Law is one of the three most competitive courses in Nigeria alongside Medicine and Pharmacy.',
          items: [
            'Compulsory JAMB Combination: English Language, Literature-in-English, and any 2 Arts or Social Science subjects (Government and CRS/IRS are most common).',
            'Target Scores: Aim for 265–285+ for premier Federal Universities (UNILAG, UI, UNN, OAU, ABU Zaria). State universities benchmark 240–260.',
            'Catchment Strategy: Catchment quotas provide a vital cushion for indigenous applicants applying to their regional federal universities.'
          ]
        },
        keyRequirements: [
          { label: 'JAMB UTME Subjects', value: 'English, Literature-in-English, Government, CRS/IRS' },
          { label: 'Federal Merit Target', value: '265 – 285+ UTME Score' },
          { label: 'State Uni Target', value: '240 – 260 UTME Score', explainKey: 'catchment' },
          { label: 'Plan B Alternative', value: 'University Diploma in Law -> 200L DE', explainKey: 'direct-entry' }
        ],
        costBreakdown: [
          { item: 'JAMB UTME Registration + Reading Text', estimatedCost: '₦7,700', notes: 'JAMB Accredited CBT Center' },
          { item: 'WAEC Examination Registration Fee', estimatedCost: '₦27,000', notes: 'National secondary school registration' },
          { item: 'University Post-UTME Screening Fee', estimatedCost: '₦2,000', notes: 'Statutory national ceiling' },
          { item: 'JAMB Change of Course / Institution (Backup Reserve)', estimatedCost: '₦2,500', notes: 'Available on JAMB portal if score falls borderline' }
        ],
        insiderAdvice: 'If your JAMB score is between 210–235, immediately pivot on CAPS to Criminology & Security Studies or Political Science. Alternatively, enroll in an accredited University Diploma in Law (e.g. at LASU or UNIJOS) to enter 200L Law via Direct Entry.'
      },
      {
        phaseNumber: 3,
        phaseId: 'tertiary',
        name: 'Phase 3: TERTIARY TRAINING',
        tagline: '5-Year LL.B University Degree & Moot Court Mock Trials',
        durationBadge: '5 Academic Years (LL.B)',
        costBadge: 'Est. Tuition: ₦65k–₦120k/session (Federal) | Living: ~₦260k–₦390k/yr',
        gatewayBadge: 'Gateway: LL.B Degree & CLE Admission',
        colorScheme: 'navy',
        icon: 'account_balance',
        primaryDetails: {
          title: 'University Law Curriculum & Clinical Legal Education',
          description: 'A 5-year bachelor of laws degree dissecting constitutional law, criminal law, contracts, torts, commercial transactions, and international human rights.',
          items: [
            'Degree Awarded: Bachelor of Laws (LL.B).',
            'Accreditation Requirement: Confirm the university law faculty is fully accredited by the Council of Legal Education (CLE) with an approved student quota.',
            'Moot Court Competitions: Represent your faculty in national and international mock court trial competitions to build courtroom litigation grit.'
          ]
        },
        keyRequirements: [
          { label: 'Program Length', value: '5 Years (10 Semesters LL.B)' },
          { label: 'Accreditation Body', value: 'Council of Legal Education (CLE)', explainKey: 'induction' },
          { label: 'Chamber Internship', value: 'Long vacation law firm attachment (400L)', explainKey: 'siwes' },
          { label: 'Graduation Benchmark', value: 'Final-Year Degree Legal Research Thesis' }
        ],
        careerMilestones: [
          { year: '100 Level', milestone: 'Legal Methods, Nigerian Legal System, Philosophy, and General Social Sciences.' },
          { year: '200 Level', milestone: 'Constitutional Law, Law of Contract, and African Customary Law.' },
          { year: '300 Level', milestone: 'Criminal Law, Law of Torts, Commercial Law, and joining the Student Moot Society.' },
          { year: '400 Level', milestone: 'Land Law, Equity and Trusts, Law of Evidence, and law firm vacation attachments.' },
          { year: '500 Level', milestone: 'Jurisprudence, Company Law, Family Law/Maritime Law, and Final LL.B Degree Defense.' }
        ],
        insiderAdvice: 'Participate actively in the Law Students’ Association of Nigeria (LAWSAN) and chamber attachments during university long vacations to secure mentorship from Senior Advocates of Nigeria (SAN).'
      },
      {
        phaseNumber: 4,
        phaseId: 'launch',
        name: 'Phase 4: CAREER LAUNCH',
        tagline: 'Nigerian Law School, Call to the Bar, NYSC & Practice',
        durationBadge: '1 Year Law School + NYSC',
        costBadge: 'Earnings: ₦250,000 – ₦1,500,000+/month',
        gatewayBadge: 'Gateway: Call to the Bar (B.L) & NBA Seal',
        colorScheme: 'crimson',
        icon: 'verified',
        primaryDetails: {
          title: 'Nigerian Law School, Call to the Bar & High-Income Practice',
          description: 'Completing the Nigerian Law School (B.L) and taking the solemn barrister’s oath before the Body of Benchers to officially practice law in Nigeria.',
          items: [
            'Nigerian Law School (1 Year): Intensive bar preparation across Abuja, Lagos, Kano, Enugu, Yola, or Yenagoa campuses, culminating in Bar Final Exams.',
            'Call to the Bar Ceremony: Official admission to the Nigerian Bar and conferment of the title Barrister and Solicitor of the Supreme Court of Nigeria.',
            'NYSC Legal Posting: Serve in the Ministry of Justice, legal departments of banks, commercial law firms, or the Legal Aid Council.'
          ]
        },
        keyRequirements: [
          { label: 'Law School Duration', value: '1 Year Intensive Bar Final (B.L)' },
          { label: 'Bar Call Ceremony', value: 'Formal Oath & Supreme Court Enrollment', explainKey: 'induction' },
          { label: 'NYSC Requirement', value: '1 Year National Youth Service (Legal Unit)', explainKey: 'nysc' }
        ],
        freeResources: [
          {
            name: 'Nigerian Bar Association (NBA) Young Lawyers Forum',
            platform: 'Professional Body',
            description: 'Mentorship, legal drafting workshops, and career advancement programs for newly called legal practitioners.',
            tag: 'Bar Community'
          },
          {
            name: 'Corporate & Tech Law Opportunities',
            platform: 'Nigerian Commercial Market',
            description: 'Starting salaries in top commercial law firms range from ₦250k–₦600k/month; senior associates and corporate counsel earn ₦1M–₦2.5M/month.',
            tag: 'Earnings Outlook'
          }
        ],
        insiderAdvice: 'Tech law, intellectual property, data privacy, and maritime corporate law are booming in Lagos and Abuja, offering high earnings outside traditional courtroom litigation.'
      }
    ]
  },
  'accounting': {
    careerId: 'accounting',
    careerTitle: 'Chartered Accounting & Financial Management',
    degreeTitle: 'Bachelor of Science (B.Sc) in Accounting + ACA Certification',
    faculty: 'Management & Social Sciences',
    discipline: 'Commercial & Management',
    regulatoryBody: 'Institute of Chartered Accountants of Nigeria (ICAN) & ANAN',
    regulatoryExplainKey: 'induction',
    overview: 'Chartered Accountants safeguard corporate financial integrity, execute forensic audits, optimize tax strategies, and steer treasury investments for banks and multinationals.',
    phases: [
      {
        phaseNumber: 1,
        phaseId: 'now',
        name: 'Phase 1: NOW',
        tagline: 'Commercial Fundamentals, Mathematics & ICAN ATSWA Foundation',
        durationBadge: 'SS1 to SS3 (1–3 Years)',
        costBadge: 'Est. Cost: ₦0 (Free Resources & ATSWA Option)',
        gatewayBadge: 'Gateway: 5 WAEC Credits with Mathematics & Economics',
        colorScheme: 'emerald',
        icon: 'calculate',
        primaryDetails: {
          title: 'Commercial Secondary Foundations & Numerical Precision',
          description: 'Establish strong mastery of ledger bookkeeping, algebra, and commercial economics before tertiary screening.',
          items: [
            'Compulsory 5 O’Level Credits: English Language, Mathematics, Economics, Financial Accounting, and Commerce / Government.',
            'Mathematics is non-negotiable: All accredited university accounting departments require at least a credit in general mathematics.',
            'You can write the ICAN Accounting Technicians Scheme (ATSWA) exams right after secondary school to secure professional exemptions.'
          ]
        },
        keyRequirements: [
          { label: 'O’Level Core', value: 'English, Maths, Economics, Financial Accounting, Commerce', explainKey: 'olevel-deficiency' },
          { label: 'Sitting Preference', value: '1 or 2 Sittings widely accepted across all institutions', explainKey: 'one-sitting' },
          { label: 'ATSWA Fast-Track', value: 'Option to begin ICAN technician exams immediately', explainKey: 'direct-entry' }
        ],
        freeResources: [
          {
            name: 'AccountingCoach & OpenStax Financial Accounting',
            platform: 'Web & Mobile',
            description: 'Free comprehensive balance sheet, profit & loss ledger tutorials, and debits/credits drills.',
            tag: 'Free Tutorials'
          },
          {
            name: 'ICAN Student Learning Materials Portal',
            platform: 'ICAN Official Website',
            description: 'Free downloadable syllabus outlines, study packs, and past examination papers for student members.',
            tag: 'Official Syllabus'
          },
          {
            name: 'Myschool Economics & Accounting CBT App',
            platform: 'Mobile App (Offline)',
            description: 'Practice hundreds of authentic WAEC and JAMB financial calculations and macroeconomics questions.',
            tag: 'CBT Practice'
          }
        ],
        insiderAdvice: 'If you register for ICAN ATSWA right after secondary school, passing all three stages qualifies you for direct 200 Level entry in Nigerian universities with multiple ICAN professional exemptions!'
      },
      {
        phaseNumber: 2,
        phaseId: 'next',
        name: 'Phase 2: NEXT',
        tagline: 'JAMB UTME Subject Combination & Poly Direct Entry Backup',
        durationBadge: '6–9 Months Preparation',
        costBadge: 'Est. Gateway Fees: ~₦36,700 – ₦45,000',
        gatewayBadge: 'Gateway: UTME 235+ & CAPS Clearance',
        colorScheme: 'terracotta',
        icon: 'savings',
        primaryDetails: {
          title: 'JAMB UTME Subject Combination & Top Business Schools',
          description: 'Navigate admission benchmarks for top commercial faculties across federal and state universities.',
          items: [
            'Compulsory JAMB Combination: English Language, Mathematics, Economics, and Financial Accounting or Commerce.',
            'Target Scores: Benchmark 240–265+ for premier institutions (UNILAG, UI, OAU, UNN, Covenant). State universities benchmark 210–235.',
            'Polytechnic ND Route: Yaba College of Technology and Federal Poly Ilaro have top-rated ND Accountancy programs with direct 200L university linkage.'
          ]
        },
        keyRequirements: [
          { label: 'JAMB UTME Subjects', value: 'English, Mathematics, Economics, Accounting/Commerce' },
          { label: 'Federal Merit Target', value: '240 – 265+ UTME Score' },
          { label: 'State & Poly Target', value: '200 – 230 UTME Score', explainKey: 'catchment' },
          { label: 'Direct Entry Route', value: 'ND Accountancy (Upper Credit) -> 200L DE', explainKey: 'direct-entry' }
        ],
        costBreakdown: [
          { item: 'JAMB UTME Registration (with Mock & Novel)', estimatedCost: '₦7,700', notes: 'Official JAMB Center' },
          { item: 'WAEC Examination Registration Fee', estimatedCost: '₦27,000', notes: 'Public school senior certificate' },
          { item: 'Post-UTME Screening Portal Fee', estimatedCost: '₦2,000', notes: 'National statutory maximum' },
          { item: 'ICAN Student Registration & ID Kit (Optional Early Start)', estimatedCost: '₦12,000', notes: 'Direct with ICAN secretariat' }
        ],
        insiderAdvice: 'Don’t rely on university degrees alone in finance! Employers in Nigerian commercial banks and Big 4 audit firms recruit students who wrote their ICAN professional exams during university.'
      },
      {
        phaseNumber: 3,
        phaseId: 'tertiary',
        name: 'Phase 3: TERTIARY TRAINING',
        tagline: 'University B.Sc Degree & Concurrent ICAN Professional Exams',
        durationBadge: '4 Academic Years (B.Sc)',
        costBadge: 'Est. Tuition: ₦60k–₦110k/session (Federal) | Living: ~₦250k–₦380k/yr',
        gatewayBadge: 'Gateway: B.Sc Degree & ICAN Skills Level Clearance',
        colorScheme: 'navy',
        icon: 'domain',
        primaryDetails: {
          title: 'Auditing, Corporate Taxation & Financial Reporting Rigor',
          description: 'A 4-year comprehensive university degree accompanied by student registration with ICAN or ACCA.',
          items: [
            'Degree Awarded: Bachelor of Science (B.Sc) in Accounting.',
            'Concurrent ICAN Exams: You can sit for ICAN professional examinations during semester vacations. Many students graduate with their B.Sc and their ACA chartered status in the same year!',
            'SIWES / Internship: 3-month mandatory internship in an audit firm, commercial bank, or corporate accounting department during 300 Level.'
          ]
        },
        keyRequirements: [
          { label: 'Program Length', value: '4 Years (8 Semesters)' },
          { label: 'Professional Body', value: 'ICAN (Chartered Status)', explainKey: 'induction' },
          { label: 'SIWES Internship', value: 'Audit Firm or Corporate Treasury Attachment', explainKey: 'siwes' },
          { label: 'Graduation Benchmark', value: 'Financial Statement Analysis & Senior Project' }
        ],
        careerMilestones: [
          { year: '100 Level', milestone: 'Principles of Accounting, Business Mathematics, Micro/Macroeconomics, and Commercial Law.' },
          { year: '200 Level', milestone: 'Financial Accounting, Cost Accounting, Business Statistics, and writing ICAN Foundation exams.' },
          { year: '300 Level', milestone: 'Management Accounting, Auditing & Assurance, Corporate Taxation, and 3-Month Internship.' },
          { year: '400 Level', milestone: 'Advanced Financial Reporting, Forensic Accounting, ICAN Skills exams, and Degree Defense.' }
        ],
        insiderAdvice: 'Apply for the PwC Tertiary Scholarship or Federal Government Merit Bursary in your second year to support your exam fees and study materials.'
      },
      {
        phaseNumber: 4,
        phaseId: 'launch',
        name: 'Phase 4: CAREER LAUNCH',
        tagline: 'Big 4 Audit, Banking Treasury, NYSC & ACA Induction',
        durationBadge: 'Year 1 Post-Graduation & Beyond',
        costBadge: 'Earnings: ₦220,000 – ₦850,000+/month',
        gatewayBadge: 'Gateway: ICAN ACA Induction & NYSC Discharge',
        colorScheme: 'crimson',
        icon: 'monetization_on',
        primaryDetails: {
          title: 'Chartered Status, Forensic Auditing & Financial Leadership',
          description: 'Holding both a B.Sc and an ACA qualification opens lucrative opportunities across commercial banks, FMCGs, fintech startups, and global audit networks.',
          items: [
            'Entry-Level Roles: Audit Associate (PwC, KPMG, EY, Deloitte), Financial Analyst, Tax Consultant, Treasury Officer, Internal Control Associate.',
            'NYSC Deployment: Deployment to commercial banks, accounting firms, or government finance ministries.',
            'ICAN ACA Induction: Induction as an Associate Chartered Accountant (ACA) confers statutory authority to sign and audit financial reports.'
          ]
        },
        keyRequirements: [
          { label: 'Chartered Induction', value: 'Formal ICAN ACA Induction & Seal', explainKey: 'induction' },
          { label: 'NYSC Requirement', value: '1 Year National Youth Service', explainKey: 'nysc' },
          { label: 'Salary Benchmark', value: '₦220k–₦450k/mo (Entry) | ₦800k–₦1.5M/mo (Chartered Senior)' }
        ],
        freeResources: [
          {
            name: 'PwC & KPMG Graduate Trainee Portals',
            platform: 'Corporate Careers',
            description: 'Annual aptitude tests and graduate programs hiring hundreds of fresh Nigerian accounting and economics graduates.',
            tag: 'Graduate Trainee'
          },
          {
            name: 'Financial Modeling & Excel Masterclass',
            platform: 'YouTube & LinkedIn',
            description: 'Free tutorials on Advanced Excel, DCF valuation models, and PowerBI dashboards required by top financial institutions.',
            tag: 'In-Demand Skills'
          }
        ],
        insiderAdvice: 'Combine Accounting with PowerBI and SQL! Nigerian fintechs pay premium salaries to accountants who understand automated data pipelines and analytics.'
      }
    ]
  },

  'medicine': {
    careerId: 'medicine',
    careerTitle: 'Medicine & Surgery',
    degreeTitle: 'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
    faculty: 'College of Medicine / Faculty of Clinical Sciences',
    discipline: 'Medical & Health Sciences',
    regulatoryBody: 'Medical and Dental Council of Nigeria (MDCN)',
    regulatoryExplainKey: 'internship',
    overview: 'Medical Doctors diagnose acute illnesses, perform surgical interventions, prescribe pharmacological therapies, and manage patient health in clinical and hospital systems under the regulation of the Medical and Dental Council of Nigeria (MDCN).',
    phases: [
      {
        phaseNumber: 1,
        phaseId: 'now',
        name: 'Phase 1: NOW',
        tagline: 'Senior Secondary Mastery & Clinical Science Foundation',
        durationBadge: 'SS1 to SS3 (1–3 Years)',
        costBadge: 'Est. Cost: ₦0 (100% Free Resources)',
        gatewayBadge: 'Gateway: 5 WAEC Credits (1 Sitting Strictly Preferred)',
        colorScheme: 'emerald',
        icon: 'stethoscope',
        primaryDetails: {
          title: 'Secondary School Prerequisites & O\'Level Distinctions',
          description: 'Secure credit passes in all 5 core sciences. Premier medical faculties strictly evaluate O\'Level grades in screening aggregate point calculations.',
          items: [
            'Compulsory 5 O\'Level Credits: English Language, Mathematics, Biology, Chemistry, and Physics.',
            'Sitting Policy: Strictly ONE sitting is required or heavily favored for MBBS by top federal universities (UNILAG, UI, OAU, UNN, ABU, UNILORIN).',
            'Target at least B2 in Biology and Chemistry and B3 in Physics, English, and Mathematics to maximize your admission aggregate points.'
          ]
        },
        keyRequirements: [
          { label: 'O\'Level Core', value: 'English, Maths, Biology, Chemistry, Physics', explainKey: 'olevel-deficiency' },
          { label: 'Sitting Preference', value: '1 Sitting strictly required in top medical colleges', explainKey: 'one-sitting' },
          { label: 'Key Habit', value: 'Microscopic specimen diagrams, organ system anatomy, stoichiometry calculations' }
        ],
        freeResources: [
          {
            name: 'Khan Academy Anatomy & Physiology',
            platform: 'YouTube & Mobile App',
            description: 'Free comprehensive visual breakdown of circulatory, nervous, respiratory, and endocrine systems.',
            tag: 'Free'
          },
          {
            name: 'Geeky Medics Clinical Basics',
            platform: 'Web & YouTube',
            description: 'Clinical anatomy and medical physiology explanations made simple for aspiring medical doctors.',
            tag: 'Free'
          },
          {
            name: 'Myschool Past Questions CBT App',
            platform: 'Android / Offline',
            description: 'Master authentic WAEC and JAMB past questions offline with detailed explanations.',
            tag: 'Offline App'
          }
        ],
        insiderAdvice: 'Do not neglect Physics or English! In the aggregate formula for premier universities like UNILAG, every A1 and B2 in your 5 core subjects directly awards points towards the 80+ cutoff.'
      },
      {
        phaseNumber: 2,
        phaseId: 'next',
        name: 'Phase 2: NEXT',
        tagline: 'The Nigerian Entry Gateway (JAMB UTME & Post-UTME Screening)',
        durationBadge: '6–9 Months Prep Cycle',
        costBadge: 'Est. Gateway Fees: ~₦36,700 – ₦45,000',
        gatewayBadge: 'Gateway: UTME 280+ & Post-UTME Screening',
        colorScheme: 'terracotta',
        icon: 'how_to_reg',
        primaryDetails: {
          title: 'JAMB UTME Combination & Competitive Target Scores',
          description: 'Medicine & Surgery is the most competitive academic course in Nigeria. You must target high scores to surpass departmental merit thresholds.',
          items: [
            'Compulsory JAMB UTME Combination: English Language, Biology, Chemistry, and Physics (Strict 4-subject combination; any deviation causes instant disqualification).',
            'Target Scores: Aim for 280–300+ for federal merit quotas (UNILAG, UI, OAU, UNN, UNILORIN). State universities generally cut off around 250–270.',
            'Catchment Strategy: Check if your state of origin has a federal university with catchment allocations where the cut-off may be 15–20 points lower.'
          ]
        },
        keyRequirements: [
          { label: 'JAMB UTME Subjects', value: 'English, Biology, Chemistry, Physics' },
          { label: 'Federal Merit Target', value: '280 – 310+ UTME Score' },
          { label: 'Post-UTME Benchmark', value: '80%+ in CBT screening (24+/30 at UNILAG, 78+/100 at UI)', explainKey: 'post-utme' },
          { label: 'CAPS Verification', value: 'Monitor JAMB CAPS for Medical Council quota clearance', explainKey: 'caps' }
        ],
        costBreakdown: [
          { item: 'JAMB UTME Registration (with Mock Exam & Reading Text)', estimatedCost: '₦7,700', notes: 'Official JAMB CBT center fee' },
          { item: 'WAEC Senior School Certificate Examination (SSCE)', estimatedCost: '₦27,000', notes: 'Official registration in recognized schools' },
          { item: 'University Post-UTME Screening Portal Fee', estimatedCost: '₦2,000', notes: 'Statutory national ceiling for all universities' },
          { item: 'Biometric Verification & Medical Clearance Slip', estimatedCost: '₦1,500', notes: 'Document verification & printing' }
        ],
        insiderAdvice: 'If your JAMB score lands between 230–260, do not sit at home! Pivot early on JAMB CAPS to Human Physiology, Anatomy, Medical Laboratory Science, or Nursing to preserve your academic momentum.'
      },
      {
        phaseNumber: 3,
        phaseId: 'tertiary',
        name: 'Phase 3: TERTIARY TRAINING',
        tagline: 'Pre-Clinical Sciences, Clinical Clerkships & Professional 2nd/3rd MBBS Exams',
        durationBadge: '6 Academic Years (Full-Time)',
        costBadge: 'Est. Tuition: ₦80k–₦150k/session (Federal) | Living: ~₦280k–₦420k/yr',
        gatewayBadge: 'Gateway: MBBS Degree & MDCN Provisional Licensure',
        colorScheme: 'navy',
        icon: 'school',
        primaryDetails: {
          title: 'Accredited Curriculum & Hospital Ward Rotations',
          description: 'A 6-year rigorous medical education comprising Pre-Med (100L), Pre-Clinical Sciences (200L–300L), and Clinical Hospital Rotations (400L–600L).',
          items: [
            '100 Level: General basic sciences (PHY 101, CHM 101, BIO 101, GST courses) with minimum CGPA requirements (often 4.0+ to proceed to 200L Anatomy & Physiology).',
            '200L–300L Pre-Clinical: Gross Anatomy with cadaveric dissection, Medical Biochemistry, Systemic Physiology, and Histology, culminating in the high-stakes 2nd MBBS Professional Examination.',
            '400L–600L Clinical Clerkships: Pathology, Medical Microbiology, Pharmacology, Internal Medicine, General Surgery, Pediatrics, and Obstetrics & Gynaecology (O&G) at accredited Teaching Hospitals.',
            'Final MBBS Examination: Clinical bedside examinations, OSCE clinical tests, and oral viva voce defense.'
          ]
        },
        keyRequirements: [
          { label: '100L Clearance', value: 'Pass all basic science prerequisites with high CGPA' },
          { label: '2nd MBBS Exam', value: 'Pass Gross Anatomy, Medical Biochemistry & Physiology (No carryover permitted; resit or repeat year)' },
          { label: 'Clinical Postings', value: 'Ward rounds, theatre assistances, emergency room casualty calls' },
          { label: 'Degree Awarded', value: 'Bachelor of Medicine, Bachelor of Surgery (MBBS)' }
        ],
        costBreakdown: [
          { item: 'Federal University Tuition & Lab Charges', estimatedCost: '₦80,000 – ₦150,000 / year', notes: 'Subsidized federal medical faculty rate' },
          { item: 'Medical Textbooks & Surgical Instruments', estimatedCost: '₦65,000 – ₦110,000', notes: 'Stethoscope, tendon hammer, lab coat, clinical guides' },
          { item: 'Hostel Accommodation (College of Medicine)', estimatedCost: '₦40,000 – ₦85,000 / year', notes: 'On-campus clinical accommodation' },
          { item: 'Living Stipend & Clinical Meals', estimatedCost: '₦25,000 – ₦45,000 / month', notes: 'Nutrition during intensive hospital calls' }
        ],
        insiderAdvice: 'In medical school, the 2nd MBBS professional exam is the most critical hurdle. Group study and consistent past questions revision in cadaveric gross anatomy are essential to avoid referral or repeat years.'
      },
      {
        phaseNumber: 4,
        phaseId: 'launch',
        name: 'Phase 4: CAREER LAUNCH',
        tagline: 'Housemanship, Full MDCN Licensure, NYSC & Medical Specialization',
        durationBadge: '1 Year Internship + 1 Year NYSC + Residency',
        costBadge: 'Earning Phase: Paid Hospital Salary (CONMESS)',
        gatewayBadge: 'Gateway: Full MDCN Practicing License & Fellowship',
        colorScheme: 'crimson',
        icon: 'medical_services',
        primaryDetails: {
          title: 'Paid Internship (Housemanship), Medical Licensure & Clinical Career',
          description: 'Transition from medical graduate to fully licensed medical doctor through structured housemanship rotations and national service.',
          items: [
            'Compulsory 1-Year Housemanship: 12-month rotating internship in 4 major departments: Internal Medicine (3 months), General Surgery (3 months), Pediatrics (3 months), and Obstetrics & Gynaecology (3 months).',
            'Earning: House officers earn a full clinical salary (₦220,000 – ₦350,000 monthly) under the Consolidated Medical Salary Structure (CONMESS) in Federal Teaching Hospitals and State Specialist Hospitals.',
            'Full MDCN License: Upon successful sign-off of your internship logbook by supervising consultants, MDCN issues your permanent license and practicing pin.',
            'NYSC Deployment: Posted as a Medical Officer in public hospitals, rural clinics, or military bases across Nigeria.',
            'Specialization: Sit for Primary Fellowship Examinations (National Postgraduate Medical College of Nigeria or West African College of Physicians/Surgeons) to become a Consultant Surgeon, Cardiologist, Pediatrician, etc.'
          ]
        },
        keyRequirements: [
          { label: 'Provisional License', value: 'Granted by MDCN upon university medical oath', explainKey: 'induction' },
          { label: 'Housemanship Postings', value: '4 mandatory clinical rotations completed', explainKey: 'internship' },
          { label: 'Full MDCN License', value: 'Permanent practicing number and annual practicing stamp' },
          { label: 'NYSC Medical Posting', value: '1 year of national service as a Medical Officer', explainKey: 'nysc' }
        ],
        careerMilestones: [
          { year: 'Month 1–12 Post-Grad', milestone: 'Compulsory Paid Housemanship at Accredited Teaching Hospital (CONMESS)' },
          { year: 'Month 13', milestone: 'Induction & Full MDCN Practicing License Award' },
          { year: 'Month 14–26', milestone: 'NYSC Deployment as Medical Officer with Hospital Stipends' },
          { year: 'Year 2–6 Post-Grad', milestone: 'Residency Training (WACS / WACP / NPMCN) towards Consultant status or Global Licensure (PLAB / USMLE)' }
        ],
        insiderAdvice: 'Register on the MDCN Housemanship Portal on the very day results are uploaded. Federal teaching hospital slots (LUTH, UCH, ABUTH, UNTH) fill up in minutes!'
      }
    ]
  },

  'nursing': {
    careerId: 'nursing',
    careerTitle: 'Nursing Science & Public Health',
    degreeTitle: 'Bachelor of Nursing Science (B.N.Sc) / Registered Nurse (RN)',
    faculty: 'Faculty of Nursing Sciences / Clinical Sciences',
    discipline: 'Medical & Health Sciences',
    regulatoryBody: 'Nursing and Midwifery Council of Nigeria (NMCN)',
    regulatoryExplainKey: 'induction',
    overview: 'Nurses provide direct patient care, emergency triage, maternal and child healthcare, and clinical health leadership in Nigerian and international healthcare settings under NMCN regulation.',
    phases: [
      {
        phaseNumber: 1,
        phaseId: 'now',
        name: 'Phase 1: NOW',
        tagline: 'Secondary School Science Mastery & Foundation',
        durationBadge: 'SS1 to SS3 (1–3 Years)',
        costBadge: 'Est. Cost: ₦0 (100% Free Resources)',
        gatewayBadge: 'Gateway: 5 WAEC Credits (1 Sitting Strictly Preferred)',
        colorScheme: 'emerald',
        icon: 'health_and_safety',
        primaryDetails: {
          title: 'Compulsory O\'Level Requirements for Nursing',
          description: 'Secure credit passes in all biological and physical sciences at one sitting for university faculties of nursing.',
          items: [
            'Compulsory 5 O\'Level Credits: English Language, Mathematics, Biology, Chemistry, and Physics.',
            'Sitting Policy: Single sitting is required by federal university nursing faculties (UNILAG, UI, OAU, UNILORIN). State colleges of nursing may accept two sittings.',
            'Target at least B2 in Biology and Chemistry and B3 in Physics and English.'
          ]
        },
        keyRequirements: [
          { label: 'O\'Level Core', value: 'English, Maths, Biology, Chemistry, Physics', explainKey: 'olevel-deficiency' },
          { label: 'Sitting Preference', value: '1 Sitting required for federal universities', explainKey: 'one-sitting' },
          { label: 'Key Habit', value: 'Mastering human anatomy systems, hygiene protocols, and cellular biology' }
        ],
        insiderAdvice: 'Nursing competition is now as fierce as Medicine due to global demand. Give equal attention to Physics and Chemistry alongside Biology!'
      },
      {
        phaseNumber: 2,
        phaseId: 'next',
        name: 'Phase 2: NEXT',
        tagline: 'JAMB UTME Gateway & College of Nursing Options',
        durationBadge: '6–9 Months Prep Cycle',
        costBadge: 'Est. Gateway Fees: ~₦36,700 – ₦45,000',
        gatewayBadge: 'Gateway: UTME 260+ or State College of Nursing Exam',
        colorScheme: 'terracotta',
        icon: 'how_to_reg',
        primaryDetails: {
          title: 'JAMB Subjects & Alternative Dual Pathways',
          description: 'Compulsory JAMB combination: English Language, Biology, Chemistry, and Physics.',
          items: [
            'JAMB UTME Target: Aim for 260–280+ for university merit admission.',
            'Plan B Gateway: State Colleges of Nursing Sciences offer 3-year Registered Nurse (RN) diploma programs with entry via college screening tests and moderate fees.'
          ]
        },
        keyRequirements: [
          { label: 'JAMB UTME Subjects', value: 'English, Biology, Chemistry, Physics' },
          { label: 'Federal Merit Target', value: '260 – 280+ UTME Score' },
          { label: 'College of Nursing Route', value: 'Available at State Teaching Hospitals with RN licensure', explainKey: 'direct-entry' }
        ],
        insiderAdvice: 'If your JAMB score is between 190–230, immediately purchase the admission form for your State College of Nursing (e.g. LASCON in Lagos, Oyo State College of Nursing Eleyele) to earn your RN license in 3 years.'
      },
      {
        phaseNumber: 3,
        phaseId: 'tertiary',
        name: 'Phase 3: TERTIARY TRAINING',
        tagline: 'Clinical Postings, Midwifery & NMCN Professional Examinations',
        durationBadge: '5 Academic Years (B.N.Sc) or 3 Years (College of Nursing)',
        costBadge: 'Est. Tuition: ₦75k–₦140k/session (Federal)',
        gatewayBadge: 'Gateway: B.N.Sc Degree & NMCN Licenses (RN, RM, RPHN)',
        colorScheme: 'navy',
        icon: 'school',
        primaryDetails: {
          title: 'Clinical Rotations & Dual/Triple Licensure',
          description: 'University B.N.Sc graduates sit for professional examinations qualifying them as Registered Nurse (RN), Registered Midwife (RM), and Registered Public Health Nurse (RPHN).',
          items: [
            'Clinical rotations in medical, surgical, pediatric, psychiatric, and community health wards.',
            'Hospital shift postings under the direct supervision of Nursing Officers and Ward Sisters.',
            'Professional NMCN qualifying examination written in Year 4 and Year 5.'
          ]
        },
        keyRequirements: [
          { label: 'Hospital Postings', value: 'Complete certified clinical hours across all specialties' },
          { label: 'NMCN Qualifying Exams', value: 'Pass Council professional exams for RN & RM' },
          { label: 'Degree Awarded', value: 'Bachelor of Nursing Science (B.N.Sc)' }
        ],
        insiderAdvice: 'Maintain a pristine clinical logbook and never skip ward shift sign-offs; ward sisters verify your clinical attendance strictly before NMCN registration.'
      },
      {
        phaseNumber: 4,
        phaseId: 'launch',
        name: 'Phase 4: CAREER LAUNCH',
        tagline: '1-Year Clinical Internship, NYSC, NMCN License & Global Mobility',
        durationBadge: '1 Year Paid Internship + NYSC',
        costBadge: 'Earning Phase: Paid Clinical Salary (CONHESS)',
        gatewayBadge: 'Gateway: NMCN Full Practicing License & Global Portability',
        colorScheme: 'crimson',
        icon: 'verified_user',
        primaryDetails: {
          title: 'Internship, Clinical Practice & International Certification',
          description: 'B.N.Sc graduates complete a paid 1-year clinical internship in accredited tertiary hospitals before proceeding to NYSC.',
          items: [
            'Paid Internship: Earn ₦160,000 – ₦240,000 monthly under CONHESS in teaching hospitals.',
            'Full NMCN License: Induction and license to practice anywhere in Nigeria.',
            'Global Mobility: High eligibility for international verification (NCLEX for USA/Canada, CBT/OSCE for UK NMC) with huge overseas demand.'
          ]
        },
        keyRequirements: [
          { label: 'Internship Logbook', value: 'Complete 12 months clinical postings', explainKey: 'internship' },
          { label: 'Full NMCN License', value: 'Official registration pin & practicing license', explainKey: 'induction' },
          { label: 'NYSC Deployment', value: '1 year of national service as a Nursing Officer', explainKey: 'nysc' }
        ],
        insiderAdvice: 'Obtain your NMCN verification transcript early if planning international practice; Nigerian nurses are among the most respected internationally.'
      }
    ]
  },

  'pharmacy': {
    careerId: 'pharmacy',
    careerTitle: 'Doctor of Pharmacy',
    degreeTitle: 'Doctor of Pharmacy (Pharm.D)',
    faculty: 'Faculty of Pharmacy',
    discipline: 'Pharmacy & Pharmaceutical Sciences',
    regulatoryBody: 'Pharmacy Council of Nigeria (PCN)',
    regulatoryExplainKey: 'internship',
    overview: 'Pharmacists formulate medications, evaluate drug-drug interactions, dispense prescriptions, manage clinical pharmacotherapy, and lead pharmaceutical manufacturing under PCN regulation.',
    phases: [
      {
        phaseNumber: 1,
        phaseId: 'now',
        name: 'Phase 1: NOW',
        tagline: 'Senior Secondary Chemistry & Biological Mastery',
        durationBadge: 'SS1 to SS3 (1–3 Years)',
        costBadge: 'Est. Cost: ₦0 (100% Free Resources)',
        gatewayBadge: 'Gateway: 5 WAEC Credits (1 Sitting Required)',
        colorScheme: 'emerald',
        icon: 'vaccines',
        primaryDetails: {
          title: 'Secondary School O\'Level Prerequisites',
          description: 'Secure credit passes in English, Mathematics, Biology, Chemistry, and Physics at a single sitting for accredited pharmacy faculties.',
          items: [
            'Compulsory 5 O\'Level Credits: English, Mathematics, Biology, Chemistry, and Physics.',
            'Sitting Policy: Strictly ONE sitting required by UNILAG, UI, OAU, UNIBEN, UNN, ABU.',
            'Target B2+ in Chemistry and Biology to stand out during university screening.'
          ]
        },
        keyRequirements: [
          { label: 'O\'Level Core', value: 'English, Maths, Biology, Chemistry, Physics', explainKey: 'olevel-deficiency' },
          { label: 'Sitting Preference', value: '1 Sitting strictly required', explainKey: 'one-sitting' },
          { label: 'Key Habit', value: 'Organic reaction mechanisms, chemical stoichiometry, quantitative titration' }
        ],
        insiderAdvice: 'Chemistry is the soul of Pharmacy! Practice titration calculations and periodic trends thoroughly before WAEC.'
      },
      {
        phaseNumber: 2,
        phaseId: 'next',
        name: 'Phase 2: NEXT',
        tagline: 'JAMB UTME Gateway & Faculty Selection',
        durationBadge: '6–9 Months Prep Cycle',
        costBadge: 'Est. Gateway Fees: ~₦36,700 – ₦45,000',
        gatewayBadge: 'Gateway: UTME 265+ & Post-UTME Screening',
        colorScheme: 'terracotta',
        icon: 'how_to_reg',
        primaryDetails: {
          title: 'JAMB UTME Subject Combination & Cut-Offs',
          description: 'Compulsory JAMB combination: English Language, Biology, Chemistry, and Physics.',
          items: [
            'Target Scores: Aim for 265–285+ for premier federal pharmacy faculties.',
            'Degree Structure: Nigeria has fully transitioned to the 6-year clinical Doctor of Pharmacy (Pharm.D) degree benchmarked by NUC and PCN.'
          ]
        },
        keyRequirements: [
          { label: 'JAMB UTME Subjects', value: 'English, Biology, Chemistry, Physics' },
          { label: 'Federal Merit Target', value: '265 – 285+ UTME Score' },
          { label: 'Degree Benchmark', value: 'Pharm.D (6-Year Clinical Degree)' }
        ],
        insiderAdvice: 'If your score is around 220–245, explore Pharmacology & Therapeutics (B.Sc) or Industrial Chemistry, which offer excellent pathways to pharmaceutical research.'
      },
      {
        phaseNumber: 3,
        phaseId: 'tertiary',
        name: 'Phase 3: TERTIARY TRAINING',
        tagline: 'Pharmaceutics, Clinical Pharmacokinetics & Hospital Postings',
        durationBadge: '6 Academic Years (Pharm.D)',
        costBadge: 'Est. Tuition: ₦80k–₦150k/session (Federal)',
        gatewayBadge: 'Gateway: Pharm.D Degree & PCN Induction',
        colorScheme: 'navy',
        icon: 'school',
        primaryDetails: {
          title: 'Pharmaceutical Rigor & Clinical Ward Rounds',
          description: 'Curriculum covers Pharmaceutical Chemistry, Pharmacognosy, Pharmacology, Pharmaceutics & Industrial Compounding, and Clinical Pharmacy clerkships.',
          items: [
            'Laboratory compounding of suspensions, tablets, ointments, and sterile intravenous fluids.',
            'Hospital ward rounds alongside medical doctors to audit drug prescriptions and dosing.',
            'Final year research project in drug synthesis, herbal medicine extraction, or clinical outcomes.'
          ]
        },
        keyRequirements: [
          { label: 'Pre-Clinical Clearance', value: 'Pass 200L Basic Medical Sciences' },
          { label: 'Laboratory Practical Exam', value: 'Pass dispensing and analytical chemistry practicals' },
          { label: 'Degree Awarded', value: 'Doctor of Pharmacy (Pharm.D)' }
        ],
        insiderAdvice: 'Clinical pharmacy clerkship in 500L/600L requires strong interpersonal rapport with patients and physicians on ward rounds.'
      },
      {
        phaseNumber: 4,
        phaseId: 'launch',
        name: 'Phase 4: CAREER LAUNCH',
        tagline: '1-Year Paid Internship, Full PCN License, NYSC & Industry',
        durationBadge: '1 Year Paid Internship + NYSC',
        costBadge: 'Earning Phase: Paid Hospital/Industry Salary (CONHESS)',
        gatewayBadge: 'Gateway: Full PCN Practicing License & Superintendent Pharmacist',
        colorScheme: 'crimson',
        icon: 'verified',
        primaryDetails: {
          title: 'Internship, Professional Licensure & Career Pathways',
          description: 'Transition from graduate pharmacist to fully licensed pharmacist through a paid 1-year internship in hospital, community, or industrial pharmacy.',
          items: [
            'Paid Internship: Earn ₦180,000 – ₦260,000 monthly in federal teaching hospitals, NAFDAC, or pharmaceutical companies.',
            'Full PCN License: Certified to practice, operate a community retail pharmacy, or serve as a Superintendent Pharmacist in pharmaceutical manufacturing.',
            'NYSC Deployment: Posted as a Pharmacist in military, state, or federal healthcare facilities.'
          ]
        },
        keyRequirements: [
          { label: 'Pre-Registration Exam (PEP)', value: 'Pass PCN Professional Examination for Pharmacists' },
          { label: 'Internship Sign-Off', value: '12 months supervised pharmaceutical practice', explainKey: 'internship' },
          { label: 'Full PCN License', value: 'Official registration pin & annual practicing license', explainKey: 'induction' }
        ],
        insiderAdvice: 'Pharmacists in Nigeria enjoy immense commercial autonomy: you can open your own licensed pharmacy chain or work in multinational pharmaceutical FMCGs.'
      }
    ]
  },

  'computerscience': {
    careerId: 'computerscience',
    careerTitle: 'Computer Science & Software',
    degreeTitle: 'Bachelor of Science (B.Sc) / Bachelor of Technology (B.Tech)',
    faculty: 'Faculty of Science / School of Computing',
    discipline: 'Computing & Information Technology',
    regulatoryBody: 'Computer Professionals Registration Council of Nigeria (CPN)',
    regulatoryExplainKey: 'siwes',
    overview: 'Computer Scientists design computing architectures, build scalable software, implement machine learning algorithms, and secure digital infrastructure under CPN regulation.',
    phases: [
      {
        phaseNumber: 1,
        phaseId: 'now',
        name: 'Phase 1: NOW',
        tagline: 'Secondary School Mathematics, Logic & Coding Foundations',
        durationBadge: 'SS1 to SS3 (1–3 Years)',
        costBadge: 'Est. Cost: ₦0 (100% Free Resources)',
        gatewayBadge: 'Gateway: 5 WAEC Credits (Maths & Physics Compulsory)',
        colorScheme: 'emerald',
        icon: 'terminal',
        primaryDetails: {
          title: 'Secondary School Academic Prerequisites',
          description: 'Secure credit passes in Mathematics, English, Physics, Chemistry, and Further Maths or Computer Studies.',
          items: [
            'Compulsory 5 O\'Level Credits: Mathematics, English Language, Physics, Chemistry, and 1 relevant science subject.',
            'Mathematics is strictly mandatory: target A1 or B2 to prepare for university calculus and discrete mathematics.',
            'Start coding for free on a smartphone or basic PC using Python or HTML/CSS/JavaScript.'
          ]
        },
        keyRequirements: [
          { label: 'Compulsory WAEC Core', value: 'Mathematics, English, Physics, Chemistry' },
          { label: 'Recommended Subject', value: 'Further Mathematics or Computer Studies' },
          { label: 'Self-Study Habit', value: 'Problem-solving, algorithmic thinking, building simple web pages' }
        ],
        freeResources: [
          {
            name: 'CS50x: Introduction to Computer Science',
            platform: 'Harvard / edX / YouTube',
            description: 'World-renowned foundational computer science course covering C, Python, SQL, algorithms, and memory management.',
            tag: 'Free'
          },
          {
            name: 'freeCodeCamp.org',
            platform: 'Web & Mobile',
            description: '100% free interactive curriculum covering responsive web design, JavaScript algorithms, and databases.',
            tag: 'Free'
          }
        ],
        insiderAdvice: 'Do not wait for university lectures to start coding! The most successful Nigerian tech professionals started building personal projects in secondary school.'
      },
      {
        phaseNumber: 2,
        phaseId: 'next',
        name: 'Phase 2: NEXT',
        tagline: 'JAMB UTME Gateway & Polytechnic/Fellowship Bridges',
        durationBadge: '6–9 Months Prep Cycle',
        costBadge: 'Est. Gateway Fees: ~₦36,700 – ₦45,000',
        gatewayBadge: 'Gateway: UTME 250+ & GitHub Portfolio',
        colorScheme: 'terracotta',
        icon: 'how_to_reg',
        primaryDetails: {
          title: 'JAMB Subject Combination & Top Tech Universities',
          description: 'Compulsory JAMB combination: English Language, Mathematics, Physics, and Chemistry (or Biology in select faculties).',
          items: [
            'Target Scores: Aim for 250–280+ for top universities (UNILAG, FUTA, UI, OAU, UNN).',
            'Alternative Bridge: 2-year National Diploma in Computer Science at YABATECH or Federal Poly Offa allows direct transfer into 200L B.Sc.'
          ]
        },
        keyRequirements: [
          { label: 'JAMB UTME Subjects', value: 'English, Mathematics, Physics, Chemistry' },
          { label: 'Federal Merit Target', value: '250 – 280+ UTME Score' },
          { label: 'Direct Entry Route', value: 'Upper Credit in ND Computer Science → 200L', explainKey: 'direct-entry' }
        ],
        insiderAdvice: 'Apply for free fellowships like the Federal Government 3MTT Nigeria, She Code Africa, or ALX Africa to get free internet data and laptops.'
      },
      {
        phaseNumber: 3,
        phaseId: 'tertiary',
        name: 'Phase 3: TERTIARY TRAINING',
        tagline: 'Algorithms, Software Engineering, SIWES & Open Source',
        durationBadge: '4 Academic Years (B.Sc) / 5 Years (B.Tech)',
        costBadge: 'Est. Tuition: ₦60k–₦120k/session (Federal)',
        gatewayBadge: 'Gateway: B.Sc Degree & Production Portfolio',
        colorScheme: 'navy',
        icon: 'school',
        primaryDetails: {
          title: 'Degree Curriculum & Tech Industry Preparation',
          description: 'A rigorous academic program combined with continuous self-driven software engineering and internship experience.',
          items: [
            'Core subjects: Data Structures & Algorithms, Operating Systems, Database Management Systems (SQL/NoSQL), Computer Networks, and Artificial Intelligence.',
            '6-Month SIWES Internship in 300L/400L with Nigerian tech companies (Paystack, Flutterwave, Moniepoint, Interswitch).',
            'Active open-source contributions on GitHub and participation in hackathons.'
          ]
        },
        keyRequirements: [
          { label: 'Core Competency', value: 'Data Structures, Algorithms, System Design' },
          { label: 'Mandatory Internship', value: '6-Month SIWES in tech enterprise', explainKey: 'siwes' },
          { label: 'Degree Awarded', value: 'Bachelor of Science (B.Sc) in Computer Science' }
        ],
        insiderAdvice: 'In tech, your degree opens the door, but your GitHub portfolio and LeetCode problem-solving skills get you the job offer.'
      },
      {
        phaseNumber: 4,
        phaseId: 'launch',
        name: 'Phase 4: CAREER LAUNCH',
        tagline: 'Software Engineering, FinTech, NYSC & Global Remote Roles',
        durationBadge: 'Post-Graduation Career Path',
        costBadge: 'Earning Phase: ₦350k – ₦1.5M/month (Local/Global)',
        gatewayBadge: 'Gateway: CPN Membership & Senior Engineer Role',
        colorScheme: 'crimson',
        icon: 'rocket_launch',
        primaryDetails: {
          title: 'Corporate Placement, Tech Fellowships & High-Earning Remote Work',
          description: 'Computer Science graduates enjoy the highest degree of global mobility and remote earning potential in Nigeria.',
          items: [
            'Roles: Full-Stack Software Engineer, Cloud Architect (AWS/GCP), Mobile App Developer, Data Engineer, or Cybersecurity Analyst.',
            'Earning: Junior software engineers in Nigerian tech start at ₦250k–₦500k monthly; remote engineers working for US/UK/European startups earn $1,500–$5,000+ monthly.',
            'CPN Registration: Become an inducted member of the Computer Professionals Registration Council of Nigeria.'
          ]
        },
        keyRequirements: [
          { label: 'CPN Registration', value: 'Professional certification as a Computer Scientist', explainKey: 'induction' },
          { label: 'NYSC Tech Posting', value: 'Served at fintechs, software firms, or bank IT departments', explainKey: 'nysc' },
          { label: 'Production Portfolio', value: 'Deployed scalable applications used by real users' }
        ],
        insiderAdvice: 'Master Cloud computing (AWS or Google Cloud) and modern TypeScript/Python. Nigerian banks and international firms pay top dollar for cloud reliability engineers.'
      }
    ]
  },

  'engineering': {
    careerId: 'engineering',
    careerTitle: 'Mechanical & Industrial Engineering',
    degreeTitle: 'Bachelor of Engineering (B.Eng) / Bachelor of Technology (B.Tech)',
    faculty: 'Faculty of Engineering / School of Engineering Technology',
    discipline: 'Engineering & Applied Technology',
    regulatoryBody: 'Council for the Regulation of Engineering in Nigeria (COREN)',
    regulatoryExplainKey: 'coren',
    overview: 'Engineers design energy systems, industrial manufacturing machinery, vehicles, and automation pipelines under COREN regulation.',
    phases: [
      {
        phaseNumber: 1,
        phaseId: 'now',
        name: 'Phase 1: NOW',
        tagline: 'Secondary School Physics, Mathematics & Technical Foundations',
        durationBadge: 'SS1 to SS3 (1–3 Years)',
        costBadge: 'Est. Cost: ₦0 (100% Free Resources)',
        gatewayBadge: 'Gateway: 5 WAEC Credits (Maths & Physics Compulsory)',
        colorScheme: 'emerald',
        icon: 'precision_manufacturing',
        primaryDetails: {
          title: 'Secondary School Academic Prerequisites',
          description: 'Secure credit passes in Mathematics, English, Physics, Chemistry, and Technical Drawing or Further Mathematics.',
          items: [
            'Compulsory 5 O\'Level Credits: Mathematics, Physics, Chemistry, English Language, and Further Maths/Technical Drawing.',
            'Mathematics and Physics are the non-negotiable anchors: target A1 or B2 in both.',
            'Technical Drawing provides an immense advantage during first-year engineering drawing juries.'
          ]
        },
        keyRequirements: [
          { label: 'Compulsory WAEC Core', value: 'Mathematics, Physics, Chemistry, English' },
          { label: 'Key Asset Subject', value: 'Technical Drawing or Further Mathematics' },
          { label: 'Essential Habit', value: 'Calculus, Newtonian mechanics, vector resolution' }
        ],
        insiderAdvice: 'Do not neglect Chemistry! Engineering faculties require Chemistry in WAEC and JAMB for materials science and thermodynamics modules.'
      },
      {
        phaseNumber: 2,
        phaseId: 'next',
        name: 'Phase 2: NEXT',
        tagline: 'JAMB UTME Gateway & Polytechnic Direct Entry Paths',
        durationBadge: '6–9 Months Prep Cycle',
        costBadge: 'Est. Gateway Fees: ~₦36,700 – ₦45,000',
        gatewayBadge: 'Gateway: UTME 250+ & Screening',
        colorScheme: 'terracotta',
        icon: 'how_to_reg',
        primaryDetails: {
          title: 'JAMB Subjects & Competitive Target Scores',
          description: 'Compulsory JAMB combination: English Language, Mathematics, Physics, and Chemistry.',
          items: [
            'Target Scores: Aim for 250–280+ for premier faculties (UNILAG, FUTA, OAU, UI, UNN).',
            'Direct Entry Option: An accredited ND in Mechanical/Electrical Engineering with Upper Credit from YABATECH, Fed Poly Ilaro, or KadPoly qualifies for direct entry into 200L B.Eng.'
          ]
        },
        keyRequirements: [
          { label: 'JAMB UTME Subjects', value: 'English, Mathematics, Physics, Chemistry' },
          { label: 'Federal Merit Target', value: '250 – 280+ UTME Score' },
          { label: 'Direct Entry Route', value: 'ND Upper Credit → Direct Entry to 200L B.Eng', explainKey: 'direct-entry' }
        ],
        insiderAdvice: 'If your JAMB score is under 220, taking the polytechnic ND route saves you from sitting at home and gives superior workshop practical skills!'
      },
      {
        phaseNumber: 3,
        phaseId: 'tertiary',
        name: 'Phase 3: TERTIARY TRAINING',
        tagline: 'Thermodynamics, Machine Design, CAD & 6-Month SIWES Internship',
        durationBadge: '5 Academic Years (Full-Time)',
        costBadge: 'Est. Tuition: ₦70k–₦140k/session (Federal)',
        gatewayBadge: 'Gateway: B.Eng Degree (COREN Accredited)',
        colorScheme: 'navy',
        icon: 'school',
        primaryDetails: {
          title: 'Rigorous Engineering Didactics & Workshop Practicality',
          description: 'A 5-year full-time professional engineering curriculum combining rigorous applied mathematics, machine design, and industrial attachment.',
          items: [
            'Foundational years (100L–200L): Engineering Mathematics, Applied Mechanics, Strength of Materials, and CAD Drafting.',
            'Specialization (300L–500L): Thermodynamics, Fluid Mechanics, Control Systems, Heat Transfer, and Machine Component Design.',
            '6-Month Mandatory SIWES Internship in oil & gas, manufacturing plants, FMCGs, or power generation stations.',
            'Final Year Capstone Design Project: Fabricating a working mechanical or automation prototype.'
          ]
        },
        keyRequirements: [
          { label: 'COREN Accreditation', value: 'University program must be accredited by COREN', explainKey: 'coren' },
          { label: 'Mandatory Industrial SIWES', value: '6 months hands-on plant training', explainKey: 'siwes' },
          { label: 'Degree Awarded', value: 'Bachelor of Engineering (B.Eng)' }
        ],
        insiderAdvice: 'Master CAD software (SolidWorks, AutoCAD, Fusion 360) early in 200L; certified CAD draftspersons earn good freelance income while in school.'
      },
      {
        phaseNumber: 4,
        phaseId: 'launch',
        name: 'Phase 4: CAREER LAUNCH',
        tagline: 'Industrial Deployment, COREN / NSE Licensure & Engineering Practice',
        durationBadge: 'NYSC + 4 Years Professional Practice to R.Eng',
        costBadge: 'Earning Phase: ₦300k – ₦1.2M/month',
        gatewayBadge: 'Gateway: Registered Engineer (R.Eng) Licensure',
        colorScheme: 'crimson',
        icon: 'settings_suggest',
        primaryDetails: {
          title: 'Professional Registration, NYSC & Energy/Manufacturing Careers',
          description: 'Transition from graduate engineer to Registered Engineer through structured industrial experience and Nigerian Society of Engineers (NSE) examinations.',
          items: [
            'Careers: Energy & Oil/Gas, Automotive & Assembly, FMCG Plant Maintenance (Nestle, Unilever, Dangote), Renewable Energy, and Automation.',
            'NYSC Deployment: Posted to industrial factories, Ministry of Works, or infrastructure engineering firms.',
            'Professional Licensure: After 4 years of documented post-graduation engineering experience under a Registered Engineer, sit for NSE/COREN professional interview to obtain the prestigious R.Eng title.'
          ]
        },
        keyRequirements: [
          { label: 'NSE Graduate Member', value: 'Induction into Nigerian Society of Engineers' },
          { label: 'COREN License (R.Eng)', value: 'Official legal practicing license for Nigerian engineers', explainKey: 'coren' },
          { label: 'NYSC Service', value: '1 year of national service in engineering operations', explainKey: 'nysc' }
        ],
        insiderAdvice: 'Join the Nigerian Society of Engineers (NSE) as a student member in 300L. It connects you directly with senior mentors and internship sponsors.'
      }
    ]
  },

  'masscomm': {
    careerId: 'masscomm',
    careerTitle: 'Mass Communication & Media Production',
    degreeTitle: 'Bachelor of Science (B.Sc) / Bachelor of Arts (B.A) in Mass Communication',
    faculty: 'Faculty of Social Sciences / Faculty of Communication & Information Sciences',
    discipline: 'Media, Communication & Social Sciences',
    regulatoryBody: 'Advertising Regulatory Council of Nigeria (ARCON) & Nigerian Union of Journalists (NUJ)',
    regulatoryExplainKey: 'induction',
    overview: 'Mass communicators report investigative journalism, produce broadcast television and radio programmes, manage public relations campaigns, and drive digital brand strategies across Nigerian and global media ecosystems.',
    phases: [
      {
        phaseNumber: 1,
        phaseId: 'now',
        name: 'Phase 1: NOW',
        tagline: 'Literature Command, Public Speaking & School Media Practice',
        durationBadge: 'SS1 to SS3 (1–3 Years)',
        costBadge: 'Est. Cost: ₦0 (Free School Press & Debate Clubs)',
        gatewayBadge: 'Gateway: 5 WAEC Credits with Literature-in-English',
        colorScheme: 'emerald',
        icon: 'campaign',
        primaryDetails: {
          title: 'Secondary Foundations & Compulsory Literature Command',
          description: 'Strong writing speed, editorial analysis, and verbal communication are non-negotiable. Literature-in-English is strictly compulsory for Mass Communication across Nigerian universities.',
          items: [
            'Compulsory 5 O’Level Credits: English Language, Literature-in-English, Mathematics, and two Social Science or Arts subjects (Government, Economics, CRS/IRS, or Civic Education).',
            'Literature-in-English Rule: You cannot study Mass Communication in any accredited Nigerian university without a credit pass in Literature-in-English.',
            'Start a personal blog, podcast, or contribute actively to your secondary school press club and editorial board.'
          ]
        },
        keyRequirements: [
          { label: 'O’Level Core', value: 'English Language, Literature-in-English, Mathematics, Government, Economics/CRS', explainKey: 'olevel-deficiency' },
          { label: 'Sitting Policy', value: '1 or 2 sittings accepted across federal and state universities', explainKey: 'one-sitting' },
          { label: 'Practical Habit', value: 'Audio podcasting, feature article writing, and school debate speaking' }
        ],
        freeResources: [
          {
            name: 'BBC Academy Journalism & Storytelling',
            platform: 'Online Free Portal',
            description: 'Free masterclasses on ethical interviewing, news writing, radio presenting, and mobile video journalism.',
            tag: 'Free Course'
          },
          {
            name: 'Myschool JAMB Literature & Government CBT',
            platform: 'Mobile App (Offline)',
            description: 'Practice thousands of authentic past questions covering prose, drama, poetry, and Nigerian political history.',
            tag: 'CBT Practice'
          }
        ],
        insiderAdvice: 'Build a published writing portfolio or audio clips before university! Media organizations and campus radio stations recruit students who have already shown practical initiative.'
      },
      {
        phaseNumber: 2,
        phaseId: 'next',
        name: 'Phase 2: NEXT',
        tagline: 'JAMB UTME Subject Combination & Polytechnic ND Route',
        durationBadge: '6–9 Months Preparation',
        costBadge: 'Est. Gateway Fees: ~₦36,700 – ₦45,000',
        gatewayBadge: 'Gateway: UTME 245+ & Merit List Clearance',
        colorScheme: 'terracotta',
        icon: 'podcasts',
        primaryDetails: {
          title: 'JAMB UTME Subject Combination & Strategic Polytechnic Gateways',
          description: 'Mass Communication is among the most sought-after social science programmes in Nigeria.',
          items: [
            'Compulsory JAMB Combination: English Language, Literature-in-English, and any two Arts or Social Science subjects (e.g. Government, Economics, CRS/IRS).',
            'Target Scores: Aim for 245–270+ for premier federal universities (UNILAG, UNN Nsukka, UI Communication & Language Arts). State universities benchmark 220–245.',
            'Polytechnic Alternative: Yaba College of Technology, Moshood Abiola Poly (MAPOLY), and Federal Poly Ilaro operate renowned ND Mass Comm programs offering Direct Entry into 200L.'
          ]
        },
        keyRequirements: [
          { label: 'JAMB UTME Subjects', value: 'English, Literature-in-English, Government, Economics / CRS' },
          { label: 'Federal Merit Target', value: '245 – 275+ UTME Score' },
          { label: 'State & Catchment Target', value: '220 – 245 UTME Score', explainKey: 'catchment' },
          { label: 'Direct Entry Route', value: 'ND Mass Communication (Upper Credit) -> 200L DE', explainKey: 'direct-entry' }
        ],
        costBreakdown: [
          { item: 'JAMB UTME Registration + Official Novel', estimatedCost: '₦7,700', notes: 'Accredited JAMB CBT Center' },
          { item: 'WAEC Examination Registration Fee', estimatedCost: '₦27,000', notes: 'Public secondary school standard fee' },
          { item: 'University Post-UTME Screening Portal Fee', estimatedCost: '₦2,000', notes: 'Statutory national ceiling' },
          { item: 'Data Bundle for Media Portfolio & CBT Prep', estimatedCost: '₦3,500', notes: 'Monthly prep and online writing' }
        ],
        insiderAdvice: 'If your JAMB score falls between 205–235, do not waste a year! Accept an ND in Mass Communication at YABATECH or MAPOLY. A 2-year Upper Credit diploma transfers straight into 200L university degree without re-writing JAMB.'
      },
      {
        phaseNumber: 3,
        phaseId: 'tertiary',
        name: 'Phase 3: TERTIARY TRAINING',
        tagline: 'Broadcast Studios, Campus Radio & 6-Month Media SIWES',
        durationBadge: '4 Academic Years (B.Sc / B.A)',
        costBadge: 'Est. Tuition: ₦65k–₦120k/session (Federal) | Living: ~₦250k–₦380k/yr',
        gatewayBadge: 'Gateway: B.Sc / B.A Degree & Media SIWES Completion',
        colorScheme: 'navy',
        icon: 'tv',
        primaryDetails: {
          title: 'Broadcast Production, Media Law & Corporate Communications',
          description: 'A 4-year degree balancing news writing, television studio production, radio presentation, media law, and public relations.',
          items: [
            'Curriculum Tracks: Journalism, Broadcasting, Public Relations & Advertising, Development Communication.',
            'Campus Media: Train actively on university FM radio stations (e.g. UNILAG 103.1 FM, Diamond 101.1 FM UI, Lion FM UNN).',
            'Media SIWES: Mandatory 3 to 6 months internship at national broadcast networks (Channels TV, TVC, NTA), newspapers (Punch, Guardian, Premium Times), or PR agencies.'
          ]
        },
        keyRequirements: [
          { label: 'Program Length', value: '4 Years (B.Sc or B.A)' },
          { label: 'Campus Practical', value: 'Studio production & campus radio broadcast hours' },
          { label: 'SIWES Media Internship', value: '3–6 Months media house attachment', explainKey: 'siwes' },
          { label: 'Final Year Project', value: 'Investigative documentary or research thesis' }
        ],
        careerMilestones: [
          { year: '100 Level', milestone: 'Introduction to Mass Communication, History of Nigerian Media, and African Literature.' },
          { year: '200 Level', milestone: 'News Writing and Reporting, Broadcast Production Fundamentals, and Media Photography.' },
          { year: '300 Level', milestone: 'Media Law and Ethics, PR Campaigns, and 6-Month SIWES Internship at a recognized media firm.' },
          { year: '400 Level', milestone: 'Investigative Journalism, Digital Media Analytics, Documentary Defense, and Degree Graduation.' }
        ],
        insiderAdvice: 'Join your university radio or press club in 100L. By 300L, your practical on-air tape and bylines will make getting top media internships effortless.'
      },
      {
        phaseNumber: 4,
        phaseId: 'launch',
        name: 'Phase 4: CAREER LAUNCH',
        tagline: 'ARCON/NUJ Induction, NYSC Media Posting & Corporate PR',
        durationBadge: 'Immediate Post-Graduation',
        costBadge: 'Earnings: ₦220,000 – ₦850,000+/month',
        gatewayBadge: 'Gateway: Professional ARCON / NIPR Induction & Portfolio',
        colorScheme: 'crimson',
        icon: 'mic',
        primaryDetails: {
          title: 'Broadcast Media, Corporate PR & Digital Content Leadership',
          description: 'Nigerian media professionals command influential positions across television networks, investigative journalism desks, corporate communications, and global digital agencies.',
          items: [
            'Entry Roles: News Anchor/Reporter, Multimedia Producer, PR Communications Officer, Social Media Manager, Brand Strategist.',
            'NYSC Deployment: Serve in state broadcasting corporations, private television networks, or corporate corporate affairs units.',
            'Professional Bodies: Advertising Regulatory Council of Nigeria (ARCON), Nigerian Institute of Public Relations (NIPR), Nigerian Union of Journalists (NUJ).'
          ]
        },
        keyRequirements: [
          { label: 'Entry Earning', value: '₦220,000 – ₦500,000/mo (Media & PR) | ₦700k+ (Corporate/Remote)' },
          { label: 'Professional Body', value: 'ARCON Associate Member / NIPR Certification', explainKey: 'induction' },
          { label: 'NYSC Requirement', value: '1 Year National Youth Service (Media Unit)', explainKey: 'nysc' }
        ],
        freeResources: [
          {
            name: 'Wole Soyinka Centre for Investigative Journalism (WSCIJ)',
            platform: 'Professional Community',
            description: 'Workshops, mentorship fellowships, and awards for young Nigerian journalists and media producers.',
            tag: 'Fellowships'
          },
          {
            name: 'International Center for Journalists (ICFJ)',
            platform: 'Global Grants',
            description: 'Reporting grants and digital storytelling fellowships for African multimedia communicators.',
            tag: 'Grants'
          }
        ],
        insiderAdvice: 'Master digital content tools like Adobe Premiere, DaVinci Resolve, and SEO analytics alongside your writing skills. Digital multimedia journalists earn twice as much as traditional print reporters!'
      }
    ]
  },

  'economics': {
    careerId: 'economics',
    careerTitle: 'Economics & Data Analytics',
    degreeTitle: 'Bachelor of Science (B.Sc) in Economics',
    faculty: 'Faculty of Social Sciences / Faculty of Economics & Management Sciences',
    discipline: 'Economics, Quantitative Analytics & Finance',
    regulatoryBody: 'Nigerian Economic Society (NES) & Chartered Institute of Bankers of Nigeria (CIBN)',
    regulatoryExplainKey: 'induction',
    overview: 'Economists evaluate macroeconomic trends, formulate fiscal and monetary policy, conduct econometric modeling, and steer corporate strategy for investment banks, fintechs, government bodies, and international development agencies.',
    phases: [
      {
        phaseNumber: 1,
        phaseId: 'now',
        name: 'Phase 1: NOW',
        tagline: 'Mathematical Precision, Microeconomics & Analytical Foundations',
        durationBadge: 'SS1 to SS3 (1–3 Years)',
        costBadge: 'Est. Cost: ₦0 (Free Math & Economics Platforms)',
        gatewayBadge: 'Gateway: 5 WAEC Credits with Mathematics & Economics',
        colorScheme: 'emerald',
        icon: 'analytics',
        primaryDetails: {
          title: 'Secondary School Prerequisites & Quantitative Foundations',
          description: 'Economics is a rigorous quantitative social science. Mathematics and Economics are strictly non-negotiable for university admission.',
          items: [
            'Compulsory 5 O’Level Credits: English Language, Mathematics, Economics, and two from Government, Commerce, Financial Accounting, or Geography.',
            'Mathematics Rule: All premier federal universities (UI, UNILAG, OAU, UNN, ABU) require at least a C5/C4 in General Mathematics for Economics.',
            'Begin exploring introductory statistics, data analysis, and basic Python or Excel modeling to gain a massive head start.'
          ]
        },
        keyRequirements: [
          { label: 'O’Level Core', value: 'English, Mathematics, Economics, Government/Commerce', explainKey: 'olevel-deficiency' },
          { label: 'Sitting Policy', value: '1 or 2 sittings accepted across all Nigerian institutions', explainKey: 'one-sitting' },
          { label: 'Core Skill', value: 'Quantitative algebra, statistical graphing, and fiscal policy comprehension' }
        ],
        freeResources: [
          {
            name: 'Khan Academy Micro & Macroeconomics',
            platform: 'Browser & Mobile App',
            description: 'Free comprehensive visual modules on supply/demand curves, GDP calculations, inflation, and market elasticity.',
            tag: 'Free Course'
          },
          {
            name: 'Myschool JAMB Economics & Mathematics CBT',
            platform: 'Mobile App (Offline)',
            description: 'Practice thousands of authentic past questions covering elasticity formulas, national income, and calculus.',
            tag: 'CBT Practice'
          }
        ],
        insiderAdvice: 'Do not choose Economics if you dislike Mathematics! University economics involves calculus, linear algebra, and econometrics. Strengthen your algebra early in SS2.'
      },
      {
        phaseNumber: 2,
        phaseId: 'next',
        name: 'Phase 2: NEXT',
        tagline: 'JAMB UTME Subject Combination & Cut-Off Strategy',
        durationBadge: '6–9 Months Preparation',
        costBadge: 'Est. Gateway Fees: ~₦36,700 – ₦45,000',
        gatewayBadge: 'Gateway: UTME 240+ & Merit List Clearance',
        colorScheme: 'terracotta',
        icon: 'trending_up',
        primaryDetails: {
          title: 'JAMB UTME Subject Combination & Top Economics Faculties',
          description: 'Achieve a top-tier UTME score to qualify for merit admission quotas in accredited federal business and social science faculties.',
          items: [
            'Compulsory JAMB Combination: English Language, Mathematics, Economics, and one other Social Science or Arts subject (e.g. Government, Commerce).',
            'Target Scores: Aim for 240–270+ for premier universities (UI, UNILAG, OAU, UNN, ABU). State universities benchmark 215–240.',
            'Direct Entry Gateway: An ND in Financial Studies or Statistics (Upper Credit) secures direct 200L university admission.'
          ]
        },
        keyRequirements: [
          { label: 'JAMB UTME Subjects', value: 'English, Mathematics, Economics, Government/Commerce' },
          { label: 'Federal Merit Target', value: '240 – 270+ UTME Score' },
          { label: 'Catchment Target', value: '220 – 240 UTME Score', explainKey: 'catchment' },
          { label: 'DE Alternative', value: 'ND Statistics or Banking (Upper Credit) -> 200L DE', explainKey: 'direct-entry' }
        ],
        costBreakdown: [
          { item: 'JAMB UTME Registration + Official Novel', estimatedCost: '₦7,700', notes: 'Accredited JAMB CBT Center' },
          { item: 'WAEC Senior School Examination Fee', estimatedCost: '₦27,000', notes: 'Standard public secondary school registration' },
          { item: 'University Post-UTME Screening Portal Fee', estimatedCost: '₦2,000', notes: 'Statutory national ceiling' },
          { item: 'Monthly Internet Data for Quantitative Practice', estimatedCost: '₦3,500', notes: 'Online tutorials and CBT tests' }
        ],
        insiderAdvice: 'Mathematics is compulsory in JAMB for Economics in almost all federal universities. Do not substitute Mathematics with another subject when registering for JAMB.'
      },
      {
        phaseNumber: 3,
        phaseId: 'tertiary',
        name: 'Phase 3: TERTIARY TRAINING',
        tagline: 'Econometrics, Quantitative Modeling & Banking Internship',
        durationBadge: '4 Academic Years (B.Sc)',
        costBadge: 'Est. Tuition: ₦65k–₦120k/session (Federal) | Living: ~₦250k–₦380k/yr',
        gatewayBadge: 'Gateway: B.Sc Degree & Econometric Research Thesis',
        colorScheme: 'navy',
        icon: 'account_balance',
        primaryDetails: {
          title: 'Macroeconomic Policy, Econometric Software & Financial SIWES',
          description: 'A 4-year degree developing expertise in macroeconomic theory, econometrics, public finance, monetary economics, and statistical software.',
          items: [
            'Curriculum: Microeconomics, Macroeconomics, Econometrics, Mathematical Economics, Public Sector Economics, Monetary Economics.',
            'Software Proficiency: Learn Stata, R, Python, and Advanced Excel used for empirical research and corporate forecasting.',
            'SIWES Attachment: 3 to 6 months of industrial attachment at commercial banks, research institutes (NISER), stockbrokerages, or fintech startups.'
          ]
        },
        keyRequirements: [
          { label: 'Program Length', value: '4 Years (B.Sc Economics)' },
          { label: 'Quantitative Core', value: 'Econometrics, calculus & statistical regression analysis' },
          { label: 'SIWES Internship', value: '3–6 Months financial or corporate attachment', explainKey: 'siwes' },
          { label: 'Senior Thesis', value: 'Empirical econometric research paper on Nigerian economy' }
        ],
        careerMilestones: [
          { year: '100 Level', milestone: 'Principles of Economics, Calculus for Social Sciences, and Nigerian Economy Introduction.' },
          { year: '200 Level', milestone: 'Intermediate Micro/Macroeconomics, Statistics for Economists, and Business Finance.' },
          { year: '300 Level', milestone: 'Econometric Theory, Monetary Economics, Public Finance, and 6-Month SIWES Internship.' },
          { year: '400 Level', milestone: 'Advanced Econometrics, International Trade, Senior Research Thesis, and Degree Defense.' }
        ],
        insiderAdvice: 'Pair your Economics degree with Python and SQL. FinTechs and management consultancies in Lagos pay top salaries to economics graduates who can analyze datasets.'
      },
      {
        phaseNumber: 4,
        phaseId: 'launch',
        name: 'Phase 4: CAREER LAUNCH',
        tagline: 'Central Bank, Investment Banking, FinTech & NES Membership',
        durationBadge: 'Immediate Post-Graduation',
        costBadge: 'Earnings: ₦250,000 – ₦1,200,000+/month',
        gatewayBadge: 'Gateway: B.Sc Degree, NYSC & NES / CIBN Certification',
        colorScheme: 'crimson',
        icon: 'show_chart',
        primaryDetails: {
          title: 'Financial Strategy, Central Banking & Quantitative Consulting',
          description: 'Economics graduates thrive across commercial banks, investment firms, the Central Bank of Nigeria (CBN), multilateral organizations (World Bank, AfDB), and tech startups.',
          items: [
            'Entry Roles: Macroeconomic Research Analyst, Risk Management Associate, Investment Banking Analyst, Corporate Strategy Officer, Data Analyst.',
            'NYSC Deployment: Postings to the Central Bank of Nigeria, Debt Management Office (DMO), commercial banks, or multinational consultancies.',
            'Professional Certifications: Nigerian Economic Society (NES), Chartered Institute of Bankers of Nigeria (CIBN), or CFA Level 1.'
          ]
        },
        keyRequirements: [
          { label: 'Entry Earning', value: '₦250,000 – ₦600,000/mo (Banking & Corp) | ₦800k+ (Investment/Remote)' },
          { label: 'Professional Body', value: 'Nigerian Economic Society (NES) / CIBN', explainKey: 'induction' },
          { label: 'NYSC Requirement', value: '1 Year National Youth Service', explainKey: 'nysc' }
        ],
        freeResources: [
          {
            name: 'Central Bank of Nigeria (CBN) Economic Reports',
            platform: 'Official CBN Website',
            description: 'Free access to monthly monetary policy communiqués, statistical bulletins, and inflation data.',
            tag: 'Official Data'
          },
          {
            name: 'World Bank Open Knowledge Repository',
            platform: 'Research Portal',
            description: 'Free macroeconomic reports, development indicators, and poverty assessments on Nigeria and West Africa.',
            tag: 'Global Research'
          }
        ],
        insiderAdvice: 'Start preparing for the CFA (Chartered Financial Analyst) Level 1 exam in your final year. Having passed CFA Level 1 guarantees interviews with premier investment banks and private equity firms in Lagos.'
      }
    ]
  },

  'architecture': {
    careerId: 'architecture',
    careerTitle: 'Architecture & Environmental Design',
    degreeTitle: 'Bachelor of Science (B.Sc) / Bachelor of Technology (B.Tech) in Architecture',
    faculty: 'Faculty of Environmental Sciences / School of Environmental Technology',
    discipline: 'Architecture, Spatial Modeling & Built Environment',
    regulatoryBody: 'Architects Registration Council of Nigeria (ARCON) & Nigerian Institute of Architects (NIA)',
    regulatoryExplainKey: 'induction',
    overview: 'Architects design sustainable buildings, create spatial and structural master plans, oversee construction compliance, and pioneer climate-resilient urban development under the statutory regulation of ARCON.',
    phases: [
      {
        phaseNumber: 1,
        phaseId: 'now',
        name: 'Phase 1: NOW',
        tagline: 'Technical Drawing, Spatial Thinking & Freehand Sketching',
        durationBadge: 'SS1 to SS3 (1–3 Years)',
        costBadge: 'Est. Cost: ₦0 (Sketching Pads & Free CAD Tutorials)',
        gatewayBadge: 'Gateway: 5 WAEC Credits with Physics & Mathematics',
        colorScheme: 'emerald',
        icon: 'design_services',
        primaryDetails: {
          title: 'Secondary Foundations & Spatial Design Prerequisites',
          description: 'Architecture merges creative artistry with physical and mathematical precision. Technical Drawing or Fine Art provides an immense early advantage.',
          items: [
            'Compulsory 5 O’Level Credits: English Language, Mathematics, Physics, and two from Technical Drawing, Fine Art, Chemistry, Geography, or Economics.',
            'Technical Drawing Advantage: While not compulsory in every university, students who take Technical Drawing in secondary school adapt to university studio drafting with ease.',
            'Build a physical sketchpad of buildings, isometric projections, and spatial perspectives.'
          ]
        },
        keyRequirements: [
          { label: 'O’Level Core', value: 'English, Mathematics, Physics, Tech Drawing / Chemistry / Fine Art', explainKey: 'olevel-deficiency' },
          { label: 'Sitting Policy', value: '1 or 2 sittings accepted across universities', explainKey: 'one-sitting' },
          { label: 'Essential Practice', value: 'Freehand spatial sketching, scale conversion, and geometric perspective' }
        ],
        freeResources: [
          {
            name: 'AutoCAD & SketchUp Beginner Architecture Tutorials',
            platform: 'YouTube & Free Student Licenses',
            description: 'Free video guides teaching 2D floor plan drafting, 3D modeling, and architectural elevations.',
            tag: 'Design Software'
          },
          {
            name: 'Myschool JAMB Physics & Mathematics CBT',
            platform: 'Mobile App (Offline)',
            description: 'Practice thousands of authentic past questions covering mechanics, optics, vectors, and geometry.',
            tag: 'CBT Practice'
          }
        ],
        insiderAdvice: 'Download Autodesk student edition for free once you have a school email. Learning Revit or SketchUp before 100L will put you ahead of 90% of your architecture classmates.'
      },
      {
        phaseNumber: 2,
        phaseId: 'next',
        name: 'Phase 2: NEXT',
        tagline: 'JAMB UTME Subject Combination & Poly ND Architecture Gateway',
        durationBadge: '6–9 Months Preparation',
        costBadge: 'Est. Gateway Fees: ~₦36,700 – ₦45,000',
        gatewayBadge: 'Gateway: UTME 240+ & Merit List Clearance',
        colorScheme: 'terracotta',
        icon: 'apartment',
        primaryDetails: {
          title: 'JAMB UTME Subject Combination & Strategic Polytechnic Gateways',
          description: 'Secure admission into accredited federal and state schools of architecture.',
          items: [
            'Compulsory JAMB Combination: English Language, Mathematics, Physics, and Technical Drawing or Chemistry.',
            'Target Scores: Aim for 240–265+ for premier universities (ABU Zaria, UNILAG, FUTA Akure, UNN, OAU). State universities benchmark 215–235.',
            'Polytechnic Alternative: Yaba College of Technology and Kaduna Polytechnic have renowned ND Architectural Technology programs that feed directly into 200L university degrees.'
          ]
        },
        keyRequirements: [
          { label: 'JAMB UTME Subjects', value: 'English, Mathematics, Physics, Tech Drawing / Chemistry' },
          { label: 'Federal Merit Target', value: '240 – 265+ UTME Score' },
          { label: 'Catchment Target', value: '220 – 240 UTME Score', explainKey: 'catchment' },
          { label: 'Direct Entry Route', value: 'ND Architectural Tech (Upper Credit) -> 200L DE', explainKey: 'direct-entry' }
        ],
        costBreakdown: [
          { item: 'JAMB UTME Registration + Official Novel', estimatedCost: '₦7,700', notes: 'Accredited JAMB CBT Center' },
          { item: 'WAEC Senior School Examination Fee', estimatedCost: '₦27,000', notes: 'Public secondary school standard fee' },
          { item: 'University Post-UTME Screening Portal Fee', estimatedCost: '₦2,000', notes: 'Statutory national ceiling' },
          { item: 'Drafting Board & T-Square Kit', estimatedCost: '₦12,000', notes: 'Foundational manual drafting tools' }
        ],
        insiderAdvice: 'If your JAMB score is between 200–230, immediately obtain the ND form for YABATECH or Kaduna Poly. Their hands-on drafting curriculum produces some of Nigeria’s sharpest architects, who easily enter university at 200L.'
      },
      {
        phaseNumber: 3,
        phaseId: 'tertiary',
        name: 'Phase 3: TERTIARY TRAINING',
        tagline: 'Architectural Studios, Design Juries & 6-Month Firm SIWES',
        durationBadge: '4 to 5 Academic Years (B.Sc / B.Tech)',
        costBadge: 'Est. Tuition: ₦75k–₦140k/session (Federal) | Living: ~₦280k–₦420k/yr',
        gatewayBadge: 'Gateway: B.Sc / B.Tech Degree & Studio Portfolio Defense',
        colorScheme: 'navy',
        icon: 'architecture',
        primaryDetails: {
          title: 'Design Studios, Building Climatology & Professional SIWES',
          description: 'A 4–5 year intense studio-driven curriculum where theoretical design meets structural mechanics, building materials, and construction technology.',
          items: [
            'Studio Juries: Weekly architectural design studio projects defended before a jury panel of registered architects and visiting academics.',
            'Digital Architecture: Mastery of Revit Architecture, BIM, Lumion 3D rendering, and sustainable green building standards.',
            'SIWES Firm Internship: Mandatory 3 to 6 months of corporate attachment at ARCON-registered architectural consulting practices.'
          ]
        },
        keyRequirements: [
          { label: 'Program Length', value: '4 Years (B.Sc) or 5 Years (B.Tech)' },
          { label: 'Accreditation', value: 'ARCON and NIA Full Accreditation Status' },
          { label: 'Studio Defense', value: 'Rigorous semester jury critiques of building models' },
          { label: 'SIWES Attachment', value: '3–6 Months architectural firm experience', explainKey: 'siwes' }
        ],
        careerMilestones: [
          { year: '100 Level', milestone: 'Basic Design Graphics, Freehand Drawing, Mathematics, Physics, and History of Architecture.' },
          { year: '200 Level', milestone: 'Architectural Design Studio I, Building Construction Materials, and Computer-Aided Design.' },
          { year: '300 Level', milestone: 'Complex Building Designs, Climatology, Structural Analysis, and 6-Month SIWES Internship.' },
          { year: '400/500 Level', milestone: 'Urban Design, Environmental Systems, Capstone Architectural Design Project, and Degree Defense.' }
        ],
        insiderAdvice: 'Architecture requires late-night studio work. Invest in a reliable laptop with a dedicated graphics card (NVIDIA GPU) by Year 2 to handle 3D rendering smoothly.'
      },
      {
        phaseNumber: 4,
        phaseId: 'launch',
        name: 'Phase 4: CAREER LAUNCH',
        tagline: 'M.Arch Degree, ARCON PPE Licensure & Principal Practice',
        durationBadge: '2 Years M.Arch + ARCON Exam',
        costBadge: 'Earnings: ₦250,000 – ₦1,500,000+/month',
        gatewayBadge: 'Gateway: Full ARCON Registration & NIA Stamp',
        colorScheme: 'crimson',
        icon: 'draw',
        primaryDetails: {
          title: 'Professional Licensure, ARCON Seal & Architectural Practice',
          description: 'In Nigeria, the title "Architect" is legally protected by ARCON. Practicing fully requires a 2-year post-B.Sc Master of Architecture (M.Arch) and passing the ARCON Professional Practice Examination (PPE).',
          items: [
            'Master of Architecture (M.Arch): 2-year terminal professional degree required by ARCON to sit for the professional practice exam.',
            'Pupilage & PPE: Complete 2 years of supervised pupilage under a registered ARCON architect and pass the Professional Practice Exam (PPE).',
            'Licensed Practice: Receive your official ARCON seal, stamp, and registration number allowing you to approve architectural drawings and establish private practice.'
          ]
        },
        keyRequirements: [
          { label: 'M.Arch Degree', value: '2-Year Professional Master of Architecture' },
          { label: 'ARCON PPE', value: 'Professional Practice Examination pass & seal award', explainKey: 'induction' },
          { label: 'Earnings Outlook', value: '₦250k–₦500k/mo (Junior) | ₦1.2M–₦3M+/mo (Licensed Principal)' }
        ],
        freeResources: [
          {
            name: 'Architects Registration Council of Nigeria (ARCON)',
            platform: 'Statutory Regulatory Body',
            description: 'Official registry of accredited architecture schools, approved pupilage firms, and PPE examination dates.',
            tag: 'Official Regulatory Body'
          },
          {
            name: 'Nigerian Institute of Architects (NIA) Young Architects Forum',
            platform: 'Professional Community',
            description: 'Mentorship, design competitions, and networking events for architecture graduates preparing for professional exams.',
            tag: 'Professional Society'
          }
        ],
        insiderAdvice: 'Do not stop at the B.Sc degree! In Nigeria, an initial B.Sc in Architecture is considered a pre-professional degree. You need the M.Arch and ARCON seal to legally stamp drawings and earn top fees.'
      }
    ]
  }
};

function isolateCareerMapForInstitution(careerMap: CareerMapData, institutionName?: string): CareerMapData {
  if (!institutionName) return careerMap;
  const inLower = institutionName.toLowerCase();
  const isUnilorin = inLower.includes('ilorin');
  const isUnilag = inLower.includes('lagos') || inLower.includes('unilag');
  const isUi = inLower.includes('ibadan') || inLower.includes('ui');

  for (const phase of careerMap.phases) {
    if (phase.insiderAdvice) {
      if (isUnilorin) {
        phase.insiderAdvice = phase.insiderAdvice.replace(
          /In the aggregate formula for premier universities like UNILAG, every A1 and B2 in your 5 core subjects directly awards points towards the 80\+ cutoff\./g,
          'In UNILORIN’s 50:50 aggregate formula, your UTME score and Post-UTME CBT contribute equally to determine your placement above the 80+ merit cutoff.'
        );
      } else if (isUi) {
        phase.insiderAdvice = phase.insiderAdvice.replace(
          /In the aggregate formula for premier universities like UNILAG, every A1 and B2 in your 5 core subjects directly awards points towards the 80\+ cutoff\./g,
          'In UI’s 50:50 aggregate formula, your UTME score and Post-UTME CBT contribute equally to determine your placement above the 80+ merit cutoff.'
        );
      }
    }

    if (phase.keyRequirements) {
      for (const req of phase.keyRequirements) {
        if (req.explainKey === 'post-utme' && req.value.includes('at UNILAG')) {
          if (isUnilorin) {
            req.value = '80%+ in CBT screening (80+/100 at UNILORIN)';
          } else if (isUi) {
            req.value = '80%+ in CBT screening (78+/100 at UI)';
          } else if (isUnilag) {
            req.value = '80%+ in CBT screening (24+/30 at UNILAG)';
          } else {
            req.value = `80%+ in CBT screening (${institutionName})`;
          }
        }
      }
    }
  }
  return careerMap;
}

export function generateCareerMap(careerQuery: string, institutionName?: string): CareerMapData {
  const q = careerQuery.toLowerCase().trim();

  // 1. STRICT ISOLATED PRIORITY MATCHING:
  // Medicine & Surgery (MBBS) - MDCN
  if (q.includes('medic') || q.includes('doctor') || q.includes('surg') || q.includes('mbbs') || q.includes('physician')) {
    const med = JSON.parse(JSON.stringify(MOCK_CAREER_MAPS['medicine'])) as CareerMapData;
    if (institutionName) {
      med.overview = `${med.overview} (Targeting admission at ${institutionName}).`;
    }
    return isolateCareerMapForInstitution(med, institutionName);
  }

  // Medical Laboratory Science (B.MLS) - MLSCN
  if (q.includes('lab') || q.includes('mls') || q.includes('patholog') || q.includes('diagnost')) {
    const mls = JSON.parse(JSON.stringify(MOCK_CAREER_MAPS['mls'])) as CareerMapData;
    if (institutionName) {
      mls.overview = `${mls.overview} (Targeting admission at ${institutionName}).`;
    }
    return isolateCareerMapForInstitution(mls, institutionName);
  }

  // Nursing Science (B.N.Sc) - NMCN
  if (q.includes('nurs') || q.includes('midwi')) {
    const nurs = JSON.parse(JSON.stringify(MOCK_CAREER_MAPS['nursing'])) as CareerMapData;
    if (institutionName) {
      nurs.overview = `${nurs.overview} (Targeting admission at ${institutionName}).`;
    }
    return isolateCareerMapForInstitution(nurs, institutionName);
  }

  // Pharmacy (Pharm.D) - PCN
  if (q.includes('pharm') || q.includes('drug') || q.includes('pharmacolog')) {
    const pharm = JSON.parse(JSON.stringify(MOCK_CAREER_MAPS['pharmacy'])) as CareerMapData;
    if (institutionName) {
      pharm.overview = `${pharm.overview} (Targeting admission at ${institutionName}).`;
    }
    return isolateCareerMapForInstitution(pharm, institutionName);
  }

  // Law & Legal Studies (LL.B) - CLE & NBA
  if (q.includes('law') || q.includes('legal') || q.includes('ll.b') || q.includes('advoca') || q.includes('barrister') || q.includes('solicitor')) {
    const law = JSON.parse(JSON.stringify(MOCK_CAREER_MAPS['law'])) as CareerMapData;
    if (institutionName) {
      law.overview = `${law.overview} (Targeting admission at ${institutionName}).`;
    }
    return isolateCareerMapForInstitution(law, institutionName);
  }

  // Chartered Accounting & Finance (B.Sc) - ICAN & ANAN
  if (q.includes('account') || q.includes('financ') || q.includes('bank') || q.includes('ican') || q.includes('audit')) {
    const acc = JSON.parse(JSON.stringify(MOCK_CAREER_MAPS['accounting'])) as CareerMapData;
    if (institutionName) {
      acc.overview = `${acc.overview} (Targeting admission at ${institutionName}).`;
    }
    return isolateCareerMapForInstitution(acc, institutionName);
  }

  // Mass Communication & Media (B.Sc / B.A) - ARCON & NUJ
  if (q.includes('mass') || q.includes('comm') || q.includes('media') || q.includes('journalis') || q.includes('broadcast')) {
    const mc = JSON.parse(JSON.stringify(MOCK_CAREER_MAPS['masscomm'])) as CareerMapData;
    if (institutionName) {
      mc.overview = `${mc.overview} (Targeting admission at ${institutionName}).`;
    }
    return isolateCareerMapForInstitution(mc, institutionName);
  }

  // Economics & Data Analytics (B.Sc) - NES & CIBN
  if (q.includes('econom')) {
    const eco = JSON.parse(JSON.stringify(MOCK_CAREER_MAPS['economics'])) as CareerMapData;
    if (institutionName) {
      eco.overview = `${eco.overview} (Targeting admission at ${institutionName}).`;
    }
    return isolateCareerMapForInstitution(eco, institutionName);
  }

  // Architecture & Environmental Design (B.Sc / B.Tech) - ARCON & NIA
  if (q.includes('architec') || q.includes('built env') || q.includes('environmental design')) {
    const arch = JSON.parse(JSON.stringify(MOCK_CAREER_MAPS['architecture'])) as CareerMapData;
    if (institutionName) {
      arch.overview = `${arch.overview} (Targeting admission at ${institutionName}).`;
    }
    return isolateCareerMapForInstitution(arch, institutionName);
  }

  // Software Engineering & Cloud - CPN
  if (q.includes('soft') || q.includes('web') || q.includes('cloud') || q.includes('code')) {
    const sw = JSON.parse(JSON.stringify(MOCK_CAREER_MAPS['software'])) as CareerMapData;
    if (institutionName) {
      sw.overview = `${sw.overview} (Targeting admission at ${institutionName}).`;
    }
    return isolateCareerMapForInstitution(sw, institutionName);
  }

  // Computer Science & Computing - CPN
  if (q.includes('comput') || q.includes('data') || q.includes('cyber') || q.includes('ai') || q.includes('machine learning')) {
    const cs = JSON.parse(JSON.stringify(MOCK_CAREER_MAPS['computerscience'])) as CareerMapData;
    if (institutionName) {
      cs.overview = `${cs.overview} (Targeting admission at ${institutionName}).`;
    }
    return isolateCareerMapForInstitution(cs, institutionName);
  }

  // Engineering (Mechanical, Electrical, Civil) - COREN
  if (q.includes('engin') || q.includes('mech') || q.includes('elect') || q.includes('civil') || q.includes('solar')) {
    const eng = JSON.parse(JSON.stringify(MOCK_CAREER_MAPS['engineering'])) as CareerMapData;
    if (institutionName) {
      eng.overview = `${eng.overview} (Targeting admission at ${institutionName}).`;
    }
    return isolateCareerMapForInstitution(eng, institutionName);
  }

  // STRICT ISOLATION FALLBACK:
  // If a course is missing or ambiguous, output an explicit unavailable state.
  // NEVER substitute data from Medicine or any other field!
  return {
    careerId: 'unavailable',
    careerTitle: careerQuery,
    degreeTitle: 'Degree Information Pending Verification',
    faculty: 'Academic Faculty Pending Audit',
    discipline: 'Academic Discipline Isolated',
    regulatoryBody: 'Regulatory Verification Pending',
    isUnavailable: true,
    overview: `Information for "${careerQuery}" is currently unavailable. CarEdPath NG enforces strict course isolation and does not substitute requirements from other disciplines or fields.`,
    phases: []
  };
}

