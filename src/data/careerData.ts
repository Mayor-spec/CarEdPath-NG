import { CareerDetail, CaseStudy, GrantOpportunity } from '../types';

export const LOGO_URL = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" fill="none"><rect x="4" y="4" width="72" height="72" rx="18" fill="%230a192f" stroke="%23dc2626" stroke-width="2.5"/><path d="M40 18L64 30L40 42L16 30Z" fill="%23ffffff"/><path d="M63 31V45" stroke="%23f59e0b" stroke-width="2.5" stroke-linecap="round"/><circle cx="63" cy="47" r="2" fill="%23f59e0b"/><path d="M26 36V46C26 50 32 54 40 54C48 54 54 50 54 46V36" stroke="%2393c5fd" stroke-width="2.2" stroke-linecap="round"/><path d="M18 56C24 50 34 49 44 53C50 56 56 61 60 65" stroke="%23dc2626" stroke-width="3" stroke-linecap="round"/><polygon points="61,60 63,66 56,66" fill="%23dc2626"/><text x="90" y="52" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" font-weight="800" font-size="34" fill="%23ffffff" letter-spacing="-0.5">CarEd<tspan fill="%23ef4444">Path</tspan></text><rect x="258" y="28" width="46" height="26" rx="6" fill="%23059669" stroke="%2310b981" stroke-width="1.2"/><text x="267" y="46" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" font-weight="900" font-size="14" fill="%23ffffff" letter-spacing="0.5">NG</text></svg>`;

export const AMINA_AVATAR_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuCvbmFgCANjNgUibeTNM2q_MSQsBh3E21i3T4aQvTgHVXaOMYxUpdwFF4ZfnzxwPrITQCeMBymBmG1BO1LUrYiBkaQgKMNjSJofWaEa8_j6jxsvo71g8PtuGUc-eA1rDbdk30N1xWXtkWQMyK6RjglaScrpoyqCW0aJHXBYLZyJqOPJjTuYNL2BHT-AK3wF-vKelXIBozD1tC0Ca1PbhBAzb-95E5K8Nm0MVrni0k4eoQYMlzwym2vDuQ";

export const CAREER_LIST: CareerDetail[] = [
  {
    id: "medicine",
    title: "Medicine & Surgery (MBBS)",
    badge: "Clinical & Health Sciences",
    duration: "6 Years (MBBS) + 1 Yr Housemanship",
    subjects: "English, Biology, Chemistry, Physics",
    schools: "UNILAG, UI, OAU, UNN, ABU Zaria, UNILORIN, UNIBEN, LASU",
    alt: "Human Physiology or Anatomy (B.Sc) → 200L Intra-transfer or Graduate Entry MBBS",
    salary: "₦250k - ₦650k/month (Housemanship & Medical Officer CONMESS)",
    cutOffBenchmark: "275 - 295+ UTME Merit (Catchment: 245 - 270)",
    catchmentTip: "Strictly 1 sitting is required in WAEC for College of Medicine in top federal universities. Target 285+ in UTME and 80+ in Post-UTME for merit quota.",
    keySkills: ["Clinical Diagnosis", "Surgical Therapeutics", "Pathology", "Patient Care"],
    description: "Diagnose acute illnesses, perform surgical interventions, and lead healthcare teams through full licensure by the Medical and Dental Council of Nigeria (MDCN)."
  },
  {
    id: "mls",
    title: "Medical Laboratory Science",
    badge: "Health & Diagnostics",
    duration: "5 Years (B.MLS)",
    subjects: "English, Mathematics, Biology, Chemistry, Physics",
    schools: "UNILAG, UNN, UI, ABU, BUK, OAU, UNIBEN",
    alt: "SLT (Science Laboratory Tech) via ND/HND → Direct Entry to 200L",
    salary: "₦250k - ₦450k/month + High Diagnostic Lab Demand",
    cutOffBenchmark: "235 - 260 UTME Merit (Catchment: 215 - 230)",
    catchmentTip: "Check your state's federal university first (e.g. UNIMAID, UNIPORT, UNILORIN) where catchment quotas offer lower cut-off scores.",
    keySkills: ["Clinical Pathology", "Microbiology", "Hematology", "Diagnostic Equipment"],
    description: "Medical Laboratory Scientists work at the core of Nigerian healthcare, diagnosing infectious diseases, conducting blood work, and driving medical research under the MLSCN."
  },
  {
    id: "nursing",
    title: "Nursing Science & Public Health",
    badge: "Health & Diagnostics",
    duration: "5 Years (B.N.Sc) / 3 Years (College of Nursing)",
    subjects: "English, Biology, Chemistry, Physics",
    schools: "OAU, UI, UNILAG, UNIBEN, UNICAL, UNIMAID, UNILORIN",
    alt: "State College of Nursing (RN Licensure) → Post-Basic / Direct Entry to Degree",
    salary: "₦220k - ₦550k/month + Global Portability (NMCN / NCLEX)",
    cutOffBenchmark: "245 - 280 UTME",
    catchmentTip: "State Colleges of Nursing Sciences offer direct Registered Nurse (RN) certification in 3 years with affordable state fees.",
    keySkills: ["Patient Triage", "Pediatric Care", "Maternal Health", "Clinical Pharmacology"],
    description: "Frontline patient care, midwifery, and community health leadership with strong international mobility and local clinical leadership under NMCN."
  },
  {
    id: "pharmacy",
    title: "Doctor of Pharmacy (Pharm.D)",
    badge: "Pharmaceutical Sciences",
    duration: "6 Years (Pharm.D)",
    subjects: "English, Biology, Chemistry, Physics",
    schools: "UNILAG, UI, OAU, UNIBEN, UNN, ABU, UNILORIN",
    alt: "B.Sc Pharmacology or Industrial Chemistry → Post-Graduate Pharm.D Entry",
    salary: "₦260k - ₦600k/month (Clinical Pharmacy & Drug Manufacturing)",
    cutOffBenchmark: "260 - 280 UTME Merit",
    catchmentTip: "PCN requires 6-year Pharm.D curriculum. High demand in clinical pharmacotherapy and local pharmaceutical compounding.",
    keySkills: ["Pharmacotherapy", "Drug Formulation", "Clinical Pharmacology", "Toxicology"],
    description: "Master pharmacological compounds, dispense life-saving medication, and manage clinical drug trials under the Pharmacy Council of Nigeria (PCN)."
  },
  {
    id: "computerscience",
    title: "Computer Science & Computing",
    badge: "Tech & Computing",
    duration: "4 Years (B.Sc) / 5 Years (B.Tech)",
    subjects: "English, Mathematics, Physics, Chemistry / Further Maths",
    schools: "UNILAG, FUTA, UI, OAU, UNN, Covenant, ABU",
    alt: "ND Computer Science (Upper Credit) from Yabatech → Direct Entry to 200L + 3MTT / ALX Fellowship",
    salary: "₦350k - ₦1.2M/month (FinTech, Cloud & Global Remote)",
    cutOffBenchmark: "250 - 280 UTME Merit",
    catchmentTip: "Mathematics is compulsory in JAMB and WAEC. Build GitHub repositories and take tech fellowships while in school.",
    keySkills: ["Algorithms & Data Structures", "Python/TypeScript", "Database Systems", "Cloud Computing"],
    description: "Develop scalable software architectures, algorithms, machine learning models, and enterprise systems."
  },
  {
    id: "engineering",
    title: "Mechanical & Industrial Engineering",
    badge: "Engineering & Tech",
    duration: "5 Years (B.Eng / B.Tech)",
    subjects: "English, Mathematics, Physics, Chemistry",
    schools: "UNILAG, FUTA, OAU, UI, UNN, ABU Zaria, UNILORIN",
    alt: "ND Mechanical Engineering (Upper Credit) → Direct Entry to 200L B.Eng (COREN Accredited)",
    salary: "₦300k - ₦950k/month (Energy, Manufacturing & Automation)",
    cutOffBenchmark: "250 - 280 UTME Merit",
    catchmentTip: "Technical Drawing or Further Maths gives high advantage in Year 1 and 2 university engineering design courses.",
    keySkills: ["Thermodynamics", "CAD/SolidWorks", "Fluid Mechanics", "Robotics & Automation"],
    description: "Design industrial machines, renewable energy systems, and automotive solutions regulated by COREN."
  },
  {
    id: "law",
    title: "Law & Corporate Advocacy",
    badge: "Law & Legal Studies",
    duration: "5 Years (LL.B)",
    subjects: "English, Literature-in-English, Government, CRS/IRS or Economics",
    schools: "UNILAG, UI, UNN, OAU, ABU Zaria, UNILORIN, LASU, UNIBEN",
    alt: "University Diploma in Law / Cambridge A-Levels -> Direct Entry to 200L LL.B",
    salary: "₦300k - ₦1.5M/month (Corporate Tech Law, Maritime & Commercial Bar)",
    cutOffBenchmark: "265 - 285 UTME Merit (Catchment: 245 - 260)",
    catchmentTip: "Literature-in-English is mandatory in both WAEC and JAMB. If score is under 240, switch to Criminology or Political Science to avoid losing a year.",
    keySkills: ["Legal Drafting", "Constitutional Law", "Corporate Governance", "Litigation Advocacy"],
    description: "Defend human rights, structure major corporate investment deals, and navigate Nigerian regulatory policy through the legal bar."
  },
  {
    id: "accounting",
    title: "Chartered Accounting & Finance",
    badge: "Business & Finance",
    duration: "4 Years (B.Sc)",
    subjects: "English, Mathematics, Economics, Financial Accounting / Commerce",
    schools: "UNILAG, OAU, UI, UNN, Covenant, ABU, UNILORIN, LASU",
    alt: "ICAN ATSWA Certification or ND Accountancy (Upper Credit) -> Direct Entry to 200L with ICAN exam exemptions",
    salary: "₦280k - ₦900k/month (Big 4 Audit, Commercial Banking & Fintech Treasury)",
    cutOffBenchmark: "240 - 265 UTME Merit (Catchment: 220 - 240)",
    catchmentTip: "Begin writing ICAN (Institute of Chartered Accountants of Nigeria) student professional exams early to graduate as a Chartered Accountant.",
    keySkills: ["Financial Reporting", "IFRS Auditing", "Tax Compliance", "Budgetary Forecasting"],
    description: "Manage capital operations, corporate audit compliance, and forensic financial integrity for banks, multinationals, and public institutions."
  },
  {
    id: "masscomm",
    title: "Mass Communication & Media Production",
    badge: "Media & Social Sciences",
    duration: "4 Years (B.Sc / B.A)",
    subjects: "English, Literature-in-English, Government, Economics or CRS/IRS",
    schools: "UNILAG, UNN, UI, UNIJOS, LASU, UNILORIN, BUK Kano, AAUA",
    alt: "ND in Mass Communication (Upper Credit) from YABATECH or MAPOLY -> Direct Entry into 200L",
    salary: "₦250k - ₦750k/month (Broadcast Media, PR Agencies, Digital Journalism & Nollywood)",
    cutOffBenchmark: "245 - 270 UTME Merit (Catchment: 225 - 245)",
    catchmentTip: "NUC CCMAS now allows specialized tracks in Journalism, Public Relations, and Broadcasting. Start building a published writing portfolio or podcast early.",
    keySkills: ["Investigative Journalism", "Media Production", "Public Relations", "Digital Content Strategy"],
    description: "Produce impactful news, manage corporate communications, and direct creative broadcast content across television, radio, and digital media."
  },
  {
    id: "economics",
    title: "Economics & Data Analytics",
    badge: "Business & Finance",
    duration: "4 Years (B.Sc)",
    subjects: "English, Mathematics, Economics, Government / Commerce",
    schools: "UI, UNILAG, OAU, UNN, ABU, Covenant, UNILORIN",
    alt: "ND in Financial Studies or Statistics -> Direct Entry to 200L Economics",
    salary: "₦300k - ₦950k/month (Fintech Analytics, Central Bank, Investment Banks & NGOs)",
    cutOffBenchmark: "235 - 260 UTME Merit (Catchment: 215 - 235)",
    catchmentTip: "Mathematics is strictly mandatory in JAMB for Economics in federal universities. Pair Economics with Python or SQL for massive hiring appeal.",
    keySkills: ["Econometric Modeling", "Micro/Macro Analysis", "Data Visualization", "Policy Forecasting"],
    description: "Analyze market dynamics, shape national fiscal policy, and optimize quantitative growth models for commercial enterprises."
  },
  {
    id: "architecture",
    title: "Architecture & Environmental Design",
    badge: "Environmental Design",
    duration: "4-5 Years (B.Sc / B.Tech)",
    subjects: "English, Mathematics, Physics, Tech Drawing / Chemistry / Fine Art",
    schools: "ABU Zaria, UNILAG, FUTA, UNN, OAU, Covenant, FUTO",
    alt: "ND in Architectural Technology (Upper Credit) from YABATECH or KadPoly -> Direct Entry to 200L",
    salary: "₦280k - ₦850k/month (Commercial Architecture, BIM Design & Urban Development)",
    cutOffBenchmark: "240 - 265 UTME Merit (Catchment: 220 - 240)",
    catchmentTip: "Technical Drawing or Fine Art in secondary school gives a massive advantage in university studio juries and CAD certifications.",
    keySkills: ["Revit & AutoCAD", "Sustainable Building", "Spatial Modeling", "Urban Zoning"],
    description: "Design climate-resilient residences, civic centers, and commercial skyscrapers defining Nigeria’s modern urban landscape."
  },
  {
    id: "education",
    title: "Educational Leadership & STEM Teaching",
    badge: "Education & Teaching",
    duration: "4 Years (B.Ed / B.Sc. Ed)",
    subjects: "English, Mathematics, and relevant teaching subjects (Sciences or Arts)",
    schools: "UI, UNN, UNILAG, OAU, TASUED, ABU, UNILORIN",
    alt: "NCE (Nigeria Certificate in Education) with Credit / Merit -> Direct Entry to 200L B.Ed",
    salary: "₦180k - ₦450k/month + Federal Government Bursary Allowance",
    cutOffBenchmark: "190 - 215 UTME Merit (Catchment: 175 - 190)",
    catchmentTip: "The Federal Ministry of Education provides tuition bursary stipends for education majors in public universities, with high post-graduation employment in international schools.",
    keySkills: ["Instructional Design", "Curriculum Planning", "EdTech Tools", "Classroom Evaluation"],
    description: "Inspire next-generation leaders, develop modern educational curricula, and lead educational technology reforms in Nigeria."
  },
  {
    id: "english",
    title: "English & Literary Studies",
    badge: "Arts & Humanities",
    duration: "4 Years (B.A)",
    subjects: "English, Literature-in-English, Government, CRS/IRS",
    schools: "UI, UNILAG, OAU, UNN, UNIBEN, UNILORIN, ABU",
    alt: "NCE English or ND Mass Comm -> Direct Entry to 200L English",
    salary: "₦220k - ₦600k/month (Publishing, Corporate Comms & Diplomatic Missions)",
    cutOffBenchmark: "220 - 245 UTME Merit (Catchment: 200 - 220)",
    catchmentTip: "Literature-in-English in JAMB is compulsory. Excellent foundation for international fellowships, diplomatic entry, and corporate advertising.",
    keySkills: ["Critical Analysis", "Professional Editing", "Creative Writing", "Corporate Speechwriting"],
    description: "Master world literature, rhetoric, and cultural narratives for careers spanning publishing, foreign service, and corporate branding."
  },
  {
    id: "software",
    title: "Software Engineering & Cloud",
    badge: "Tech & Computing",
    duration: "4 Years (B.Sc / B.Eng)",
    subjects: "English, Mathematics, Physics + (Chem or Further Maths)",
    schools: "FUTA, UNILAG, Covenant, Landmark, OAU, UNN",
    alt: "ALX / 3MTT / NIIT Diploma → Remote Tech Internships + HND Transfer",
    salary: "₦350k - ₦1.2M/month (Global & Local Remote Demand)",
    cutOffBenchmark: "240 - 275 UTME (State Tech Colleges: 190+)",
    catchmentTip: "Don't let university strike delays hold you back: start building GitHub projects and taking free ALX or Coursera certifications from Year 1.",
    keySkills: ["TypeScript / Python", "Full-Stack Web", "Cloud (AWS/GCP)", "Database Systems"],
    description: "Build digital solutions solving Nigerian and African challenges in FinTech, EdTech, HealthTech, and eCommerce."
  },
  {
    id: "solar",
    title: "Renewable Energy Engineering",
    badge: "Clean Tech & Climate",
    duration: "5 Years (B.Eng)",
    subjects: "English, Mathematics, Physics, Chemistry, Tech Drawing",
    schools: "UNILORIN, FUTO, UI, Covenant, UNIPORT",
    alt: "Electrical/Electronic ND/HND → Solar Installation Certifications",
    salary: "₦280k - ₦600k/month (Off-Grid Solar Booming in Nigeria)",
    cutOffBenchmark: "210 - 245 UTME",
    catchmentTip: "Nigeria's off-grid solar boom means micro-grid technicians and solar energy engineers are in very high demand across commercial estates and rural communities.",
    keySkills: ["Photovoltaic Design", "Battery Inverters", "Energy Auditing", "Micro-Grid Systems"],
    description: "Powering Nigerian households, hospitals, and businesses through decentralized solar and green energy solutions."
  },
  {
    id: "data",
    title: "Data Science & Analytics",
    badge: "Tech & Computing",
    duration: "4 Years (B.Sc)",
    subjects: "English, Mathematics, Economics/Physics, Chemistry",
    schools: "UNILAG, Covenant, Babcock, UI, ABU",
    alt: "B.Sc Statistics / Computer Science → Google/IBM Professional Certs",
    salary: "₦300k - ₦800k/month (Fintech, Banking & Telco)",
    cutOffBenchmark: "220 - 250 UTME",
    catchmentTip: "Banks and telecom giants like MTN, Flutterwave, and Moniepoint actively hire student interns with proven SQL and PowerBI portfolios.",
    keySkills: ["Python & Pandas", "SQL & PowerBI", "Machine Learning", "Financial Analytics"],
    description: "Transform raw data into business strategy and fraud detection algorithms for Nigeria's booming financial technology space."
  },
  {
    id: "biotech",
    title: "Agricultural Biotechnology",
    badge: "Agri-Tech & Bio-Science",
    duration: "4-5 Years (B.Sc)",
    subjects: "English, Biology, Chemistry, Agricultural Science/Maths",
    schools: "FUNAAB, UI, FUTA, UNIMAID, UNN",
    alt: "National Diploma in Science Tech → Direct Entry to Biotech 200L",
    salary: "₦200k - ₦500k/month (FMCG, Seed Research & Brewery Labs)",
    cutOffBenchmark: "200 - 230 UTME",
    catchmentTip: "Federal Universities of Agriculture (FUNAAB, FUAM, UMUDIKE) often have lower cut-off bars for girls entering bio-sciences and high scholarship support.",
    keySkills: ["Genetic Modification", "Crop Yield Optimization", "Fermentation Tech", "Food Safety"],
    description: "Drive Nigerian food security and industrial production with genetically improved seeds, pest resistance, and agricultural bio-products."
  }
];

export const PRIMARY_CASE_STUDY: CaseStudy = {
  id: "sample-secondary-mls",
  name: "Example Journey (Sample Student)",
  role: "Example Journey: Secondary to Medical Laboratory Science",
  subRole: "SS3 Science Student to University Diagnostic Specialist",
  location: "Ilorin → Lagos (Illustrative Roadmap)",
  avatarUrl: AMINA_AVATAR_URL,
  steps: [
    {
      number: 1,
      title: "WAEC Senior School Prep (SS3)",
      description: "5 Credits locked: English, Maths, Biology, Chemistry & Physics",
      badgeColor: "bg-primary text-on-primary"
    },
    {
      number: 2,
      title: "JAMB UTME & Cut-Off Safety Plan",
      description: "Target 240+ in UTME (Eng, Bio, Chem, Phy); Prepared SLT Direct Entry Backup",
      badgeColor: "bg-secondary text-on-secondary"
    },
    {
      number: 3,
      title: "University Admission & Direct Entry Route",
      description: "Secured university B.MLS admission via accredited federal merit/backup track",
      badgeColor: "bg-primary-container text-on-primary"
    },
    {
      number: 4,
      title: "MLSCN Licensure & Clinical Internship",
      description: "5-year clinical degree completion, internship, and professional licensing",
      badgeColor: "bg-primary text-on-primary"
    }
  ],
  insight: "Illustrative Methodology: When a secondary school student faces a high cutoff bar for Medicine or competitive health courses, CarEdPath NG recommends accredited Science Laboratory Technology (SLT) or Pre-Degree backups to avoid missing academic years.",
  keyStats: [
    "WAEC: 5 Core Science Credits",
    "JAMB: Bio, Chem, Phy, Eng",
    "Target: B.MLS (Unilorin / UI / UNN)"
  ]
};

export const GRANTS_LIST: GrantOpportunity[] = [
  {
    id: "mtn-stem",
    title: "MTN Foundation Science & Technology Scholarship",
    organization: "MTN Nigeria Foundation",
    award: "₦200,000 / year until graduation",
    eligibility: "High-achieving Science Secondary Leavers & Tertiary Entrants in Public Institutions",
    deadline: "Annual Window (May – August)",
    category: "STEM",
    applicationStage: "Open for preparation",
    verified: true
  },
  {
    id: "shell-spdc",
    title: "Shell SPDC Joint Venture University Scholarship",
    organization: "Shell Petroleum Development Company",
    award: "Full Tuition & Living Stipend (₦150k - ₦300k/yr)",
    eligibility: "100L Nigerian students in accredited Federal & State Universities in STEM fields",
    deadline: "July 31 annually",
    category: "STEM",
    applicationStage: "Applications verified",
    verified: true
  },
  {
    id: "3mtt",
    title: "Federal 3 Million Tech Talents (3MTT) Fellowship",
    organization: "Federal Ministry of Communications, Innovation & Digital Economy",
    award: "100% Free Training, Laptops for Top 10% & Placement",
    eligibility: "Nigerian girls & youths (SSCE or Graduate). All 36 States & FCT.",
    deadline: "Rolling cohorts",
    category: "Tech",
    applicationStage: "Cohort 3 Enrolling",
    verified: true
  },
  {
    id: "she-code-africa",
    title: "She Code Africa Mentorship & Academy Program",
    organization: "She Code Africa NGO",
    award: "Free Tech Hardware, Data Stipends & 1-on-1 Senior Female Mentors",
    eligibility: "Nigerian & African women looking to enter Cloud, DevOps, Frontend, Data, or Product",
    deadline: "Quarterly Application Windows",
    category: "Tech",
    applicationStage: "Active Application",
    verified: true
  },
  {
    id: "seplat-jv",
    title: "SEPLAT National Tertiary Scholarship Scheme",
    organization: "Seplat Energy JV",
    award: "₦150,000 / session until degree completion",
    eligibility: "200L students in Federal and State Universities in Engineering, Medical, Agriculture & Tech",
    deadline: "September annually",
    category: "STEM",
    applicationStage: "Upcoming review",
    verified: true
  },
  {
    id: "agbami",
    title: "Agbami Medical & Engineering Professionals Award",
    organization: "Star Deep Water Petroleum (Chevron)",
    award: "₦100,000 - ₦200,000 / year",
    eligibility: "100L & 200L Medicine, Surgery, Dentistry, Pharmacy & Engineering students",
    deadline: "August annually",
    category: "Health",
    applicationStage: "Verified past cycle",
    verified: true
  }
];

export const NIGERIAN_CATCHMENT_GUIDE: Record<string, string[]> = {
  "Lagos": ["UNILAG (University of Lagos)", "LASU (Lagos State University)", "YABATECH"],
  "Oyo": ["UI (University of Ibadan)", "LAUTECH (Ladoke Akintola)", "The Polytechnic, Ibadan"],
  "Kwara": ["UNILORIN (University of Ilorin)", "Kwara State University", "Federal Poly Offa"],
  "Enugu": ["UNN (University of Nigeria, Nsukka)", "ESUT", "IMT Enugu"],
  "Kaduna": ["ABU (Ahmadu Bello University)", "KASU", "Kaduna Polytechnic"],
  "Rivers": ["UNIPORT (University of Port Harcourt)", "RSU", "Federal Poly Oil & Gas"],
  "Edo": ["UNIBEN (University of Benin)", "Ambrose Alli University", "Auchi Polytechnic"],
  "Ondo": ["FUTA (Federal University of Tech, Akure)", "AAUA", "Rufus Giwa Poly"],
  "Kano": ["BUK (Bayero University Kano)", "KUST Wudil", "Kano State Poly"],
  "Ogun": ["FUNAAB (Federal Univ of Agriculture)", "OOU Ago-Iwoye", "Moshood Abiola Poly"]
};
