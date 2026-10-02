export interface ActionMission {
  id: string;
  categoryNumber: 1 | 2 | 3;
  categoryLabel: 'Academic & Subject Mastery' | 'Practical Skill & Discovery' | 'Network & Guidance';
  title: string;
  concreteAction: string;
  recommendedResource: {
    name: string;
    platform: string;
    badge: string;
  };
  dailyTimeCommitment: string;
  deliverable: string;
  mentorTip: string;
}

export interface Career90DayPlan {
  careerKey: string;
  careerTitle: string;
  missions: ActionMission[];
}

export const NINETY_DAY_PLANS: Record<string, Career90DayPlan> = {
  'mls': {
    careerKey: 'mls',
    careerTitle: 'Medical Laboratory Science & Clinical Diagnostics',
    missions: [
      {
        id: 'mls-m1',
        categoryNumber: 1,
        categoryLabel: 'Academic & Subject Mastery',
        title: 'JAMB & WAEC Core Drill (Biology & Chemistry)',
        concreteAction: 'Complete 5 past JAMB series in Biology & Chemistry on the Myschool app; master mole concept and cell biology.',
        recommendedResource: {
          name: 'Myschool JAMB CBT App & The Organic Chemistry Tutor',
          platform: 'Mobile App & YouTube',
          badge: 'High Yield'
        },
        dailyTimeCommitment: '45 mins daily (1 past series every weekend)',
        deliverable: 'A score log tracking progression from 55% to 75%+ in 5 consecutive timed CBT simulations.',
        mentorTip: 'Focus intensely on Cell Physiology and Stoichiometry. JAMB repeats these two topics across 30% of their chemistry questions every single year.'
      },
      {
        id: 'mls-m2',
        categoryNumber: 2,
        categoryLabel: 'Practical Skill & Discovery',
        title: 'Clinical Diagnostics & Specimen Prep Immersion',
        concreteAction: 'Watch a free 3-hour intro to clinical lab diagnostics on YouTube; summarize 5 key takeaways in a notebook.',
        recommendedResource: {
          name: 'Ninja Nerd Medicine & Armando Hasudungan Clinical Labs',
          platform: 'Free YouTube Masterclass',
          badge: 'Zero Naira'
        },
        dailyTimeCommitment: '30 mins every alternate day',
        deliverable: 'A physical notebook with hand-drawn diagrams of blood cell types (WBC, RBC, Platelets) and basic centrifuge safety protocols.',
        mentorTip: 'Keep this notebook! Showing a hand-written diagnostic log during your university faculty departmental orientation or scholarship interviews sets you apart instantly.'
      },
      {
        id: 'mls-m3',
        categoryNumber: 3,
        categoryLabel: 'Network & Guidance',
        title: 'University Mentor & Admission Sisterhood Outreach',
        concreteAction: 'Identify and reach out to one female student currently in 300L at your target university or join a verified student academic mentorship circle.',
        recommendedResource: {
          name: 'Association of Female Medical Laboratory Scientists of Nigeria (AFMLSN) Student Wing',
          platform: 'Official Student Association Portal / LinkedIn',
          badge: 'Sisterhood'
        },
        dailyTimeCommitment: '1 weekend outreach session',
        deliverable: 'A 15-minute introductory voice note or chat asking about their 100L booklist, hostel safety, and departmental cut-off history.',
        mentorTip: 'Template message: "Good day senior sister, I am an aspiring B.MLS candidate targeting [University Name]. I admire your progress and would love to ask 2 quick questions about preparing for 100L!"'
      }
    ]
  },

  'software': {
    careerKey: 'software',
    careerTitle: 'Software Engineering & Cloud Computing',
    missions: [
      {
        id: 'soft-m1',
        categoryNumber: 1,
        categoryLabel: 'Academic & Subject Mastery',
        title: 'Mathematics, Logic & Physics Problem Solving',
        concreteAction: 'Solve 15 past UTME math questions on Algebra, Sets, and Probability; complete 10 logic puzzle challenges weekly.',
        recommendedResource: {
          name: 'JAMB Syllabus & Khan Academy Logic & Discrete Math',
          platform: 'Web & Myschool App',
          badge: 'Foundation'
        },
        dailyTimeCommitment: '45 mins daily',
        deliverable: 'A formulas cheat-sheet covering quadratic graphs, matrices, and permutations with zero memorization errors.',
        mentorTip: 'Computer science departments prioritize high mathematics scores in JAMB. Scoring 70+ in maths guarantees high aggregate points even with moderate English scores.'
      },
      {
        id: 'soft-m2',
        categoryNumber: 2,
        categoryLabel: 'Practical Skill & Discovery',
        title: 'Hands-On Python or Frontend Web Development',
        concreteAction: 'Watch a free 3-hour intro to HTML/CSS & JavaScript on freeCodeCamp; build a simple one-page personal portfolio.',
        recommendedResource: {
          name: 'freeCodeCamp Responsive Web Design & Scrimba',
          platform: 'Interactive Free Web',
          badge: 'Zero Naira'
        },
        dailyTimeCommitment: '1 hour every evening',
        deliverable: 'A live GitHub repository or deployed web page showing your name, your ambition in Nigerian tech, and 3 favorite coding tutorials.',
        mentorTip: 'You do not need a MacBook to start! You can write and test HTML/Python directly on an Android phone using the Termux or Replit mobile app.'
      },
      {
        id: 'soft-m3',
        categoryNumber: 3,
        categoryLabel: 'Network & Guidance',
        title: 'Join a Verified Nigerian Female Tech Community',
        concreteAction: 'Join She Code Africa (SCA) or Web3Ladies community; attend one virtual monthly community hangout or Twitter Space.',
        recommendedResource: {
          name: 'She Code Africa (SCA) Community & NITDA 3MTT Circle',
          platform: 'Community Portal & Discord',
          badge: 'Community'
        },
        dailyTimeCommitment: '1 hour weekly',
        deliverable: 'Introduce yourself in the #introductions channel and connect with at least one Nigerian female software developer currently in university.',
        mentorTip: 'SCA and Ingressive for Good regularly distribute free laptops and paid Coursera certifications to active female community members!'
      }
    ]
  },

  'law': {
    careerKey: 'law',
    careerTitle: 'Law & Legal Advocacy (LL.B)',
    missions: [
      {
        id: 'law-m1',
        categoryNumber: 1,
        categoryLabel: 'Academic & Subject Mastery',
        title: 'Literature, Government & Use of English Mastery',
        concreteAction: 'Read all 4 current prescribed JAMB literary texts; complete 5 past series of Literature-in-English and Government.',
        recommendedResource: {
          name: 'JAMB Literature Syllabi & Myschool CBT Portal',
          platform: 'Texts & Mobile App',
          badge: 'High Yield'
        },
        dailyTimeCommitment: '1 hour daily',
        deliverable: 'A character and theme index for every recommended novel and play with 50 past question answers annotated.',
        mentorTip: 'Law cut-offs are among the highest in Nigeria (270+). Scoring 80+ in Use of English and Literature is the secret to clearing the faculty benchmark.'
      },
      {
        id: 'law-m2',
        categoryNumber: 2,
        categoryLabel: 'Practical Skill & Discovery',
        title: 'Judicial Logic & Landmark Nigerian Cases Study',
        concreteAction: 'Watch 3 moot court simulations on YouTube; read a summary of 2 landmark Supreme Court of Nigeria human rights decisions.',
        recommendedResource: {
          name: 'LawPavilion Primers & Legalnaija Case Summaries',
          platform: 'YouTube & Web Articles',
          badge: 'Practical'
        },
        dailyTimeCommitment: '45 mins 3x weekly',
        deliverable: 'A 2-page handwritten essay on a fundamental human right under the 1999 Nigerian Constitution (e.g., Section 35 or 38).',
        mentorTip: 'Practicing formal argumentative writing now will prepare you for Law Clinic and Moot Court competitions in 100 Level.'
      },
      {
        id: 'law-m3',
        categoryNumber: 3,
        categoryLabel: 'Network & Guidance',
        title: 'Connect with a Female Law Student or FIDA Youth Wing',
        concreteAction: 'Reach out to a female law student in 300L/400L or follow International Federation of Women Lawyers (FIDA Nigeria) youth seminars.',
        recommendedResource: {
          name: 'FIDA Nigeria & Nigerian Bar Association (NBA) Women Forum',
          platform: 'LinkedIn & Instagram',
          badge: 'Mentorship'
        },
        dailyTimeCommitment: '1 weekend session',
        deliverable: 'Learn the exact admission post-UTME weighting system and text requirements for your chosen faculty of law.',
        mentorTip: 'Ask them about the law library culture and the reality of surviving "Legal Methods" in your first year.'
      }
    ]
  },

  'accounting': {
    careerKey: 'accounting',
    careerTitle: 'Accounting & Corporate Finance (ICAN)',
    missions: [
      {
        id: 'acc-m1',
        categoryNumber: 1,
        categoryLabel: 'Academic & Subject Mastery',
        title: 'Financial Accounting & Economics Speed Drills',
        concreteAction: 'Master ledger balancing, double-entry bookkeeping, and national income calculations across 5 past JAMB series.',
        recommendedResource: {
          name: 'Myschool Accounting Past Questions & Frank Wood Accounting',
          platform: 'Mobile CBT & Textbook',
          badge: 'High Yield'
        },
        dailyTimeCommitment: '50 mins daily',
        deliverable: 'Solve 10 complex balance sheet exercises without error within a timed 30-minute window.',
        mentorTip: 'In JAMB Economics, watch out for elasticity calculations and inflation indices. They appear in almost every test paper.'
      },
      {
        id: 'acc-m2',
        categoryNumber: 2,
        categoryLabel: 'Practical Skill & Discovery',
        title: 'Excel & Financial Modeling Basics',
        concreteAction: 'Complete a free 2-hour beginner Excel course; build a simple automated personal budget spreadsheet with formulas (SUM, VLOOKUP, IF).',
        recommendedResource: {
          name: 'Excel Is Fun YouTube & Coursera Audit Mode',
          platform: 'Free Online Course',
          badge: 'In-Demand'
        },
        dailyTimeCommitment: '40 mins alternate days',
        deliverable: 'A working .xlsx spreadsheet calculating revenues, expenses, and automated variance analysis.',
        mentorTip: 'Nigerian audit firms (PwC, KPMG, Deloitte) test Excel in entry-level aptitude screenings. Learning it now puts you years ahead of your peers.'
      },
      {
        id: 'acc-m3',
        categoryNumber: 3,
        categoryLabel: 'Network & Guidance',
        title: 'Connect with an ICAN Student Member / Society',
        concreteAction: 'Identify an ICAN ATSWA student coordinator or female chartered accountant (ACA) on LinkedIn or ICAN District Student Desk.',
        recommendedResource: {
          name: 'Society of Women Accountants of Nigeria (SWAN) Student Wing',
          platform: 'ICAN District Society / LinkedIn',
          badge: 'Chartered'
        },
        dailyTimeCommitment: '1 weekend connection session',
        deliverable: 'Discover how to register for ICAN ATSWA foundation exams alongside your first year of university.',
        mentorTip: 'SWAN offers annual bursaries and textbook donations to promising female accounting students in public tertiary institutions!'
      }
    ]
  }
};

export function get90DayPlanForCareer(careerQuery: string): Career90DayPlan {
  const q = careerQuery.toLowerCase().trim();
  if (q.includes('lab') || q.includes('mls') || q.includes('patholog') || q.includes('medic') || q.includes('doctor') || q.includes('nurs')) {
    return NINETY_DAY_PLANS['mls'];
  }
  if (q.includes('soft') || q.includes('comput') || q.includes('tech') || q.includes('code') || q.includes('cyber') || q.includes('web')) {
    return NINETY_DAY_PLANS['software'];
  }
  if (q.includes('law') || q.includes('legal') || q.includes('advoca')) {
    return NINETY_DAY_PLANS['law'];
  }
  if (q.includes('account') || q.includes('financ') || q.includes('bank') || q.includes('ican') || q.includes('audit')) {
    return NINETY_DAY_PLANS['accounting'];
  }
  // Smart fallback
  return NINETY_DAY_PLANS['mls'];
}
