import { MentorStory, CareerCluster } from '../types';

export const MENTOR_STORIES: MentorStory[] = [
  // Health Sciences Cluster
  {
    id: 'sample-health-1',
    name: 'Example Student: Allied Health to Informatics',
    currentRole: 'Biomedical Data Analyst & Clinical Informatics Lead',
    location: 'Kaduna / Lagos',
    cluster: 'Health Sciences',
    hurdleTag: 'Low UTME Score Pivot',
    routeStory: 'Scenario: A secondary student scores 198 in JAMB and misses the competitive MBBS cutoff mark. Instead of staying at home for repeat exams, she enrolls in Health Information Management at an accredited polytechnic. Concurrently learning health data analytics and database management, she pivots smoothly into international hospital analytics.',
    advice: 'Your UTME score does not measure your lifelong potential—it only points out your starting lane. Entering the hospital system via allied health or health technology builds rare technical skills that healthcare institutions actively demand.',
    currentOrganization: 'Health Informatics Collaborative (Illustrative Example)'
  },
  {
    id: 'sample-health-2',
    name: 'Example Student: College of Nursing Route',
    currentRole: 'Public Health Epidemiologist & Licensed Nurse',
    location: 'Enugu / Abuja',
    cluster: 'Health Sciences',
    hurdleTag: 'Financial Barrier Safety Net',
    routeStory: 'Scenario: Facing high university fee hurdles after secondary school, this student applies to an accredited State College of Nursing Sciences. She attains her Registered Nurse (RN) license with state subsidised fees, secures clinical earnings, and subsequently advances to a post-RN B.N.Sc degree.',
    advice: 'Professional licensing programmes like Registered Nursing (RN) provide early qualification and clinical certainty. Secondary students can always advance to university degree qualifications while practicing actively.',
    currentOrganization: 'Health Research Directorate (Illustrative Example)'
  },
  {
    id: 'sample-health-3',
    name: 'Example Student: Pure Science to Pharma QC',
    currentRole: 'Industrial Quality Control Chemist & Pharma Specialist',
    location: 'Kano / Ibadan',
    cluster: 'Health Sciences',
    hurdleTag: 'Course Change on JAMB CAPS',
    routeStory: 'Scenario: After missing Pharmacy on JAMB CAPS, she accepts Pure Chemistry at a public university. Leaning into phytochemistry and pharmaceutical formulation during her studies, she develops expertise in herbal medicine standardization and quality assurance.',
    advice: 'Do not despair if offered Pure Chemistry or Biochemistry instead of Pharmacy. In manufacturing industries, formulation chemists and quality control scientists are vital and lead production lines.',
    currentOrganization: 'Pharmaceutical Research Lab (Illustrative Example)'
  },

  // Tech Cluster
  {
    id: 'sample-tech-1',
    name: 'Example Student: Secondary to Cloud Computing',
    currentRole: 'Senior Cloud Infrastructure Engineer',
    location: 'Ogun / Remote',
    cluster: 'Tech',
    hurdleTag: 'No Early Tech Equipment',
    routeStory: 'Scenario: Finishing secondary school with zero home laptop, she utilizes free mobile learning resources and attends free community technology bootcamps (such as She Code Africa and 3MTT) to learn Linux and cloud infrastructure fundamentals.',
    advice: 'Technology is an open equalizer in Nigeria because practical GitHub repositories and cloud projects carry immense weight. Secondary students can begin learning core programming logic on mobile phones.',
    currentOrganization: 'Fintech Cloud Core (Illustrative Example)'
  },
  {
    id: 'sample-tech-2',
    name: 'Example Student: Design & UI/UX Pathway',
    currentRole: 'Lead Product Designer & UX Researcher',
    location: 'Lagos',
    cluster: 'Tech',
    hurdleTag: 'Self-Directed Portfolio Route',
    routeStory: 'Scenario: After completing secondary school, she focuses on visual communication principles and digital interface design using free community software and tutorial exercises, building 3 case studies before tertiary graduation.',
    advice: 'Curiosity and relentless practical portfolio building open immense doors. Build 3 small real projects for local schools or small businesses before seeking internships.',
    currentOrganization: 'Digital Banking Atelier (Illustrative Example)'
  },
  {
    id: 'sample-tech-3',
    name: 'Example Student: Low UTME to Cybersecurity',
    currentRole: 'Cybersecurity Threat Intelligence Analyst',
    location: 'Abuja / Zaria',
    cluster: 'Tech',
    hurdleTag: 'UTME Quota Realignment',
    routeStory: 'Scenario: When a 204 JAMB score closes university Computer Science, she accepts Physics and actively participates in student developer clubs and cyber security competitions, gaining foundational certifications.',
    advice: 'Do not let a single university departmental quota halt your technological ambition. Practical capture-the-flag competitions and junior certifications speak volumes in digital security.',
    currentOrganization: 'Cyber Threat Intelligence Bureau (Illustrative Example)'
  },

  // Engineering Cluster
  {
    id: 'sample-eng-1',
    name: 'Example Student: Secondary to Renewable Energy',
    currentRole: 'Off-Grid Renewable Energy Engineer',
    location: 'Sokoto / Abuja',
    cluster: 'Engineering',
    hurdleTag: 'First in Family to Enter STEM',
    routeStory: 'Scenario: Moving from secondary school sciences into Electrical/Electronics Engineering, she directs her academic projects toward solar mini-grids for primary healthcare centers and rural electrification.',
    advice: 'Engineering solves direct human problems. Seeing renewable power bring electricity to a community clinic confirms why mastering secondary mathematics and physics was worth the effort.',
    currentOrganization: 'Rural Electrification Network (Illustrative Example)'
  },
  {
    id: 'sample-eng-2',
    name: 'Example Student: Polytechnic to University Civil Eng',
    currentRole: 'Structural Site Engineer & BIM Consultant',
    location: 'Port Harcourt / Lagos',
    cluster: 'Engineering',
    hurdleTag: 'National Diploma to Direct Entry',
    routeStory: 'Scenario: Unable to secure direct federal university admission after secondary school, she enrolls in an Ordinary National Diploma (OND) in Civil Engineering with Upper Credit, qualifying for 200-Level Direct Entry.',
    advice: 'Polytechnic diplomas give students hands-on survey, drafting, and laboratory competence that construction site managers appreciate. It is a legitimate, proven route into engineering.',
    currentOrganization: 'Engineering Infrastructure Group (Illustrative Example)'
  },
  {
    id: 'sample-eng-3',
    name: 'Example Student: Mechatronics & Automation Track',
    currentRole: 'Mechatronics & Industrial Automation Specialist',
    location: 'Benin City / Ogun',
    cluster: 'Engineering',
    hurdleTag: 'Overcoming Academic Calendar Delays',
    routeStory: 'Scenario: Confronting public tertiary calendar delays, this student takes an apprenticeship at an industrial packaging facility to master PLC wiring and pneumatic machinery.',
    advice: 'Use any unexpected school holiday or delay as an opportunity for practical industrial exposure. Industrial workshops teach practical diagnostics that lecture rooms alone cannot convey.',
    currentOrganization: 'Consumer Goods Manufacturing Hub (Illustrative Example)'
  },

  // Creative STEM Cluster
  {
    id: 'sample-stem-1',
    name: 'Example Student: Architecture & Heritage Planning',
    currentRole: 'Architectural Heritage & Sustainable Urban Planner',
    location: 'Ibadan / Lagos',
    cluster: 'Creative STEM',
    hurdleTag: 'No Technical Drawing in Secondary',
    routeStory: 'Scenario: Her secondary school lacked a Technical Drawing teacher. Rather than forfeiting Architecture, she spends 4 months mastering freehand drawing and CAD drafting basics prior to admission screening.',
    advice: 'Missing a secondary school subject can be bridged through focused self-study and community mentorship. Showing proactive portfolio drawings impresses university admission interviewers.',
    currentOrganization: 'Urban Sustainability Atelier (Illustrative Example)'
  },
  {
    id: 'sample-stem-2',
    name: 'Example Student: Agricultural Biotechnology Route',
    currentRole: 'Agricultural Biotechnology Specialist & Bio-Entrepreneur',
    location: 'Owerri / Ibadan',
    cluster: 'Creative STEM',
    hurdleTag: 'Choosing Agribusiness over Medicine',
    routeStory: 'Scenario: Choosing Agricultural Science and tissue culture biotechnology over medicine, she masters crop yield optimization and seed propagation, securing innovation seed grants.',
    advice: 'Modern agricultural science is high-tech biotechnology and national food security. Scientific farming and bio-pest management create durable economic independence.',
    currentOrganization: 'AgroBio Innovations Group (Illustrative Example)'
  },
  {
    id: 'sample-stem-3',
    name: 'Example Student: Biochemistry to Data Science',
    currentRole: 'Bioinformatics Analyst & Scientific Writer',
    location: 'Ilorin / Remote',
    cluster: 'Creative STEM',
    hurdleTag: 'Bridging Wet Lab with Digital Coding',
    routeStory: 'Scenario: Enrolling in Biochemistry after secondary school, she connects molecular biology concepts with open-source genomic sequencing data and statistical programming in Python and R.',
    advice: 'The intersection of secondary school sciences with computational coding is where tremendous global opportunities lie. Learn simple data analysis alongside your natural science subjects.',
    currentOrganization: 'Genomic Research Initiative (Illustrative Example)'
  }
];

export function getClusterForCareer(careerAmbition: string): CareerCluster {
  const query = (careerAmbition || '').toLowerCase();
  
  if (
    query.includes('medic') || 
    query.includes('nurs') || 
    query.includes('pharm') || 
    query.includes('health') || 
    query.includes('biomed') || 
    query.includes('doctor') || 
    query.includes('dent') || 
    query.includes('physio') || 
    query.includes('lab') ||
    query.includes('optom')
  ) {
    return 'Health Sciences';
  }

  if (
    query.includes('engin') || 
    query.includes('civil') || 
    query.includes('mech') || 
    query.includes('elect') || 
    query.includes('renew') || 
    query.includes('solar') || 
    query.includes('petrol') || 
    query.includes('mechatron')
  ) {
    return 'Engineering';
  }

  if (
    query.includes('tech') || 
    query.includes('code') || 
    query.includes('software') || 
    query.includes('data') || 
    query.includes('cloud') || 
    query.includes('cyber') || 
    query.includes('ui') || 
    query.includes('ux') || 
    query.includes('product') || 
    query.includes('web') || 
    query.includes('developer') || 
    query.includes('ai')
  ) {
    return 'Tech';
  }

  return 'Creative STEM';
}
