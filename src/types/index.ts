// Core species and conservation types for WildTrace

// Species and Conservation Types
export interface Species {
  id: string;
  scientificName: string;
  commonName: string;
  conservationStatus: 'CR' | 'EN' | 'VU' | 'NT' | 'LC' | 'DD' | 'EX' | 'EW';
  kingdom: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  description: string;
  threats: string[];
  habitat: string;
  population: number | null;
  populationTrend: 'increasing' | 'decreasing' | 'stable' | 'unknown';
  lastAssessed: Date;
  imageUrl: string | null;
  iucnId: string | null;
  gbifId: string | null;
  location: {
    latitude: number;
    longitude: number;
    region: string;
    country: string;
    protectedArea?: string;
  };
}

export interface ConservationProject {
  id: string;
  title: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    region: string;
    country: string;
  };
  targetSpecies: Species[];
  organization: string;
  website: string | null;
  donationUrl: string | null;
  volunteerUrl: string | null;
  fundingGoal: number | null;
  fundingRaised: number | null;
  status: 'active' | 'completed' | 'planning' | 'paused';
  startDate: Date;
  endDate: Date | null;
  impact: {
    speciesProtected: number;
    habitatRestored: number; // in hectares
    communityMembers: number;
  };
  images: string[];
  contactEmail: string | null;
}

export interface WildlifeSanctuary {
  id: string;
  name: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    region: string;
    country: string;
    address: string;
  };
  area: number; // in hectares
  establishedYear: number;
  speciesCount: number;
  endangeredSpecies: Species[];
  facilities: string[];
  programs: {
    education: boolean;
    research: boolean;
    breeding: boolean;
    rehabilitation: boolean;
    volunteer: boolean;
  };
  visitingHours: {
    open: string;
    close: string;
    days: string[];
  };
  admissionFee: number | null;
  donationGoal: number | null;
  donationRaised: number | null;
  website: string | null;
  phone: string | null;
  email: string | null;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  images: string[];
  achievements: string[];
}

export interface SchoolProject {
  id: string;
  schoolName: string;
  projectTitle: string;
  description: string;
  targetSpecies: Species;
  targetSanctuary: WildlifeSanctuary | null;
  students: {
    count: number;
    ageGroup: string;
    grade: string;
  };
  teacher: {
    name: string;
    email: string;
  };
  fundraisingGoal: number;
  fundraisingRaised: number;
  activities: string[];
  timeline: {
    startDate: Date;
    endDate: Date;
    milestones: {
      date: Date;
      description: string;
      completed: boolean;
    }[];
  };
  location: {
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    country: string;
  };
  status: 'planning' | 'active' | 'completed' | 'paused';
  impact: {
    fundsRaised: number;
    studentsInvolved: number;
    communityReach: number;
  };
  images: string[];
  updates: {
    date: Date;
    title: string;
    content: string;
    images: string[];
  }[];
}

export interface RegionData {
  id: string;
  name: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  endangeredSpecies: Species[];
  conservationProjects: ConservationProject[];
  wildlifeSanctuaries: WildlifeSanctuary[];
  schoolProjects: SchoolProject[];
  statistics: {
    totalSpecies: number;
    endangeredCount: number;
    criticallyEndangeredCount: number;
    protectedAreas: number;
    activeProjects: number;
    fundingNeeded: number;
    successStories: number;
  };
}

export interface MapFilters {
  conservationStatus: string[];
  animalClass: string[];
  region: string[];
  showProjects: boolean;
  showSanctuaries: boolean;
  showSchoolProjects: boolean;
  threatLevel: 'all' | 'high' | 'medium' | 'low';
}

export interface FundraisingCampaign {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  currency: string;
  endDate: Date;
  beneficiary: WildlifeSanctuary | ConservationProject;
  donorCount: number;
  updates: {
    date: Date;
    title: string;
    content: string;
    images: string[];
  }[];
  rewards: {
    amount: number;
    title: string;
    description: string;
    estimatedDelivery: Date;
  }[];
}
