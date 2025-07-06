// Core species and conservation types for WildTrace

export interface Species {
  id: string;
  scientificName: string;
  commonName: string;
  taxonomyKingdom: string;
  taxonomyPhylum: string;
  taxonomyClass: string;
  taxonomyOrder: string;
  taxonomyFamily: string;
  taxonomyGenus: string;
  conservationStatus: ConservationStatus;
  populationTrend: PopulationTrend;
  lastAssessment: string;
  description?: string;
  imageUrl?: string;
  habitat: string[];
  threats: Threat[];
  geographicRange: GeographicRange[];
  createdAt: string;
  updatedAt: string;
}

export enum ConservationStatus {
  EXTINCT = 'EX',
  EXTINCT_IN_WILD = 'EW',
  CRITICALLY_ENDANGERED = 'CR',
  ENDANGERED = 'EN',
  VULNERABLE = 'VU',
  NEAR_THREATENED = 'NT',
  LEAST_CONCERN = 'LC',
  DATA_DEFICIENT = 'DD',
  NOT_EVALUATED = 'NE',
}

export enum PopulationTrend {
  INCREASING = 'increasing',
  STABLE = 'stable',
  DECREASING = 'decreasing',
  UNKNOWN = 'unknown',
}

export interface Threat {
  id: string;
  category: ThreatCategory;
  severity: ThreatSeverity;
  description: string;
  timing: ThreatTiming;
}

export enum ThreatCategory {
  HABITAT_LOSS = 'habitat_loss',
  OVEREXPLOITATION = 'overexploitation',
  INVASIVE_SPECIES = 'invasive_species',
  CLIMATE_CHANGE = 'climate_change',
  POLLUTION = 'pollution',
  DISEASE = 'disease',
  HUMAN_DISTURBANCE = 'human_disturbance',
}

export enum ThreatSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high',
}

export enum ThreatTiming {
  PAST = 'past',
  ONGOING = 'ongoing',
  FUTURE = 'future',
}

export interface GeographicRange {
  id: string;
  country: string;
  region?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  boundingBox?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  occurrenceType: OccurrenceType;
  lastSeen?: string;
  populationEstimate?: number;
}

export enum OccurrenceType {
  NATIVE = 'native',
  INTRODUCED = 'introduced',
  VAGRANT = 'vagrant',
  EXTINCT = 'extinct',
  POSSIBLY_EXTINCT = 'possibly_extinct',
}

export interface ConservationProject {
  id: string;
  name: string;
  description: string;
  organization: Organization;
  targetSpecies: Species[];
  location: GeographicRange;
  startDate: string;
  endDate?: string;
  status: ProjectStatus;
  budget?: number;
  fundingGoal?: number;
  supporters: number;
  outcomes: ProjectOutcome[];
  tags: string[];
  websiteUrl?: string;
  contactEmail?: string;
  createdAt: string;
  updatedAt: string;
}

export enum ProjectStatus {
  PLANNING = 'planning',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled',
}

export interface ProjectOutcome {
  id: string;
  description: string;
  measuredValue?: number;
  targetValue?: number;
  unit?: string;
  achievedAt?: string;
}

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  contactEmail?: string;
  headquarters?: GeographicRange;
  verified: boolean;
  createdAt: string;
}

export enum OrganizationType {
  NGO = 'ngo',
  GOVERNMENT = 'government',
  RESEARCH = 'research',
  COMMUNITY = 'community',
  CORPORATE = 'corporate',
  INTERNATIONAL = 'international',
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: UserRole;
  organization?: Organization;
  interests: string[];
  location?: GeographicRange;
  verifiedResearcher: boolean;
  createdAt: string;
  lastActive: string;
}

export enum UserRole {
  PUBLIC = 'public',
  RESEARCHER = 'researcher',
  CONSERVATIONIST = 'conservationist',
  EDUCATOR = 'educator',
  ADMIN = 'admin',
}

export interface Observation {
  id: string;
  species: Species;
  observer: User;
  location: GeographicRange;
  observedAt: string;
  count?: number;
  behavior?: string;
  habitat?: string;
  weather?: string;
  photos?: string[];
  verified: boolean;
  verifiedBy?: User;
  verifiedAt?: string;
  notes?: string;
  createdAt: string;
}

export interface MapLayerData {
  type: 'species' | 'threats' | 'projects' | 'protected_areas';
  data: any[];
  visible: boolean;
  opacity: number;
  color?: string;
}

export interface SearchFilters {
  conservationStatus?: ConservationStatus[];
  taxonomyClass?: string[];
  threats?: ThreatCategory[];
  region?: string[];
  populationTrend?: PopulationTrend[];
  lastAssessmentAfter?: string;
  hasActiveProjects?: boolean;
}

export interface DashboardStats {
  totalSpecies: number;
  endangeredSpecies: number;
  activeProjects: number;
  countriesCovered: number;
  recentObservations: number;
  monthlyTrends: {
    month: string;
    newObservations: number;
    newProjects: number;
  }[];
}
