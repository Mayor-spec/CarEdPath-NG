export type StageType = 'SS1 (Senior Secondary 1)' | 'SS2 (Senior Secondary 2)' | 'SS3 (WAEC & NECO Prep)' | 'SS3 Leaver (Awaiting JAMB)';

export type PassionType = 
  | 'Medicine & Health' 
  | 'Law & Legal Studies'
  | 'Business & Accounting'
  | 'Media & Social Sciences'
  | 'Tech & Coding' 
  | 'Arts & Humanities'
  | 'Education & Teaching'
  | 'Engineering & Environment'
  | 'Lab & Pure Sciences';

export type TabType = 'hub' | 'fields' | 'mentor' | 'grants' | 'profile';

export interface UserIntakeProfile {
  currentStage: string;
  careerAmbition: string;
  favoriteSubjects: string[];
  realWorldConstraint: string;
  studyPreference: string;
  targetInstitution?: string;
  targetInstitutionId?: string;
  academicSession?: string;
  enteredUtmeScore?: number;
  enteredPostUtmeScore?: number;
  enteredOlevelGrades?: Record<string, string>;
  generatedRoadmap?: {
    careerTitle: string;
    targetInstitutions: string[];
    waecUtmeRequirements: string;
    meritAndCatchmentAdvice: string;
    planBFallback: string;
    milestones: {
      step: number;
      period: string;
      title: string;
      detail: string;
    }[];
    grantOpportunity: string;
  };
}

export interface StrictProgrammeIdentity {
  careerName: string;
  programmeName: string;
  degree: string;
  institution: string;
  academicSession: string;
  utmeSubjects: string[];
  olevelRequirements: string[];
  utmeMinimum: number;
  postUtmeRequirement: string;
  cutoffData: string;
  aggregateFormula: string;
  sources: string[];
  verifiedDate: string;
}


export interface CareerDetail {
  id: string;
  title: string;
  badge: string;
  duration: string;
  subjects: string;
  schools: string;
  alt: string;
  salary: string;
  cutOffBenchmark?: string;
  catchmentTip?: string;
  keySkills?: string[];
  description?: string;
}

export interface CaseStudy {
  id: string;
  name: string;
  role: string;
  subRole: string;
  location: string;
  avatarUrl: string;
  steps: {
    number: number;
    title: string;
    description: string;
    badgeColor?: string;
  }[];
  insight: string;
  keyStats: string[];
}

export interface GrantOpportunity {
  id: string;
  title: string;
  organization: string;
  award: string;
  eligibility: string;
  deadline: string;
  category: 'STEM' | 'Health' | 'Tech' | 'All Girls';
  applicationStage: string;
  verified: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
  actionLink?: {
    text: string;
    path: string;
  };
}

export interface GeneratedRoadmap {
  stage: StageType;
  passion: PassionType;
  primaryPathway: string;
  timeline: {
    year: string;
    focus: string;
    actions: string[];
  }[];
  planBSafetyNet: {
    title: string;
    description: string;
    estimatedCost: string;
  };
  recommendedFreePrograms: string[];
  mentorAdvice: string;
}

export type CareerCluster = 'Health Sciences' | 'Engineering' | 'Tech' | 'Creative STEM';

export interface MentorStory {
  id: string;
  name: string;
  currentRole: string;
  location: string;
  cluster: CareerCluster;
  hurdleTag: string;
  routeStory: string;
  advice: string;
  avatarUrl?: string;
  currentOrganization?: string;
}

export type OpportunityCategory = 
  | 'All'
  | 'Tertiary Admission Scholarships' 
  | 'Secondary School Competitions' 
  | 'Free Tech Bootcamps' 
  | 'Mentorship Communities';

export interface OpportunityItem {
  id: string;
  title: string;
  organization: string;
  category: 'Tertiary Admission Scholarships' | 'Secondary School Competitions' | 'Free Tech Bootcamps' | 'Mentorship Communities';
  eligibilityBadge: string;
  coverage: string;
  portalUrl: string;
  deadline: string;
  verifiedStatus: string;
  description: string;
}
