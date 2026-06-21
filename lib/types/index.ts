// ============================================
// BID Hub - TypeScript Type Definitions
// ============================================

// Enums
export type Sector =
  | 'Fintech'
  | 'Agritech'
  | 'Healthtech'
  | 'Edtech'
  | 'Logistics'
  | 'Cleantech'
  | 'Construction'
  | 'Other';

export type Stage = 'Idea' | 'Growth' | 'Scale';

export type UserRole = 'entrepreneur' | 'trainer' | 'admin';

export type DeliverableStatus = 'pending' | 'submitted' | 'in_review' | 'reviewed' | 'approved';

export type SessionType = '1:1 Mentor Check-in' | 'Office Hours (Group)' | 'Investor Prep' | 'Workshop';

export type SessionStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled';

export type ContentStatus = 'draft' | 'published' | 'archived';

export type ContentTrack = 'Foundations' | 'Business Model' | 'Fundraising' | 'Operations' | 'Legal';

export type DocumentType = 'memo' | 'dd_report' | 'progress_report';

export type DocumentStatus = 'draft' | 'final' | 'sent';

export type TrainerRole = 'Mentor' | 'Trainer' | 'Guest Expert' | 'Investment Analyst';

export type EntrepreneurStatus = 'active' | 'graduated' | 'inactive' | 'unassigned';

export type EntrepreneurSource = 'admin-invited' | 'self-registered';

export type GoalType = 'Fundraising' | 'Programme completion' | 'Milestone-based';

export type AccessLevel = 'full' | 'guest';

// ============================================
// Core Entities
// ============================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Entrepreneur {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  businessName: string;
  sector: Sector;
  stage: Stage;
  cohortId: string;
  cohortName: string;
  trainerId?: string;
  trainerName?: string;
  country: string;
  city?: string;
  totalFundingRaised: number;
  trainingProgress: number;
  deliverablesCompleted: number;
  deliverablesTotal: number;
  lastActive: string;
  status: EntrepreneurStatus;
  source: EntrepreneurSource;
  goalType: GoalType;
  goalAmount?: number;
  goalDescription?: string;
  jobsCreated?: number;
  jobsWomen?: number;
  jobsMen?: number;
  fundsMobilised?: number;
  lastUpdateSubmitted?: string;
  focusAreas: string[];
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Trainer {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: TrainerRole;
  accessLevel: AccessLevel;
  accessExpires?: string;
  specialisms: string[];
  assignedEntrepreneurs: number;
  sessionsThisMonth: number;
  avgSatisfaction: number;
  satisfactionCount: number;
  status: 'active' | 'guest' | 'inactive' | 'expiring';
  maxEntrepreneurs: number;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Cohort {
  id: string;
  name: string;
  programId: string;
  year: number;
  startDate: string;
  endDate: string;
  entrepreneurCount: number;
  trainerCount: number;
  moduleCount: number;
  progress: number;
  status: 'active' | 'wrapping_up' | 'completed';
}

export interface Program {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  maxEntrepreneurs: number;
  entrepreneurCount: number;
  trainerCount: number;
  moduleCount: number;
  progress: number;
  status: 'active' | 'draft' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  track?: ContentTrack;
  duration?: string;
  trainerId: string;
  trainerName: string;
  programIds: string[];
  programNames: string[];
  contentCount: number;
  completionRate?: number;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'tool';
  moduleId: string;
  moduleName: string;
  programId: string;
  programName: string;
  duration?: string;
  views: number;
  status: ContentStatus;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Deliverable {
  id: string;
  entrepreneurId: string;
  entrepreneurName: string;
  title: string;
  type: string;
  programId?: string;
  programName?: string;
  dueDate: string;
  uploadedAt?: string;
  fileName?: string;
  fileSize?: string;
  fileType?: string;
  status: DeliverableStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  type: SessionType;
  entrepreneurId?: string;
  entrepreneurName?: string;
  trainerId: string;
  trainerName: string;
  scheduledAt: string;
  duration: number; // minutes
  status: SessionStatus;
  notes?: string;
  meetingUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Content {
  id: string;
  title: string;
  description?: string;
  type: 'video' | 'resource' | 'tool' | 'template';
  track: ContentTrack;
  duration?: string;
  trainerId?: string;
  trainerName?: string;
  programIds: string[];
  programUsages: { programId: string; programName: string; moduleName: string }[];
  views: number;
  completionRate: number;
  status: ContentStatus;
  fileUrl?: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  entrepreneurId?: string;
  entrepreneurName?: string;
  cohortId?: string;
  generatedAt: string;
  generatedBy: string;
  status: DocumentStatus;
  fileUrl?: string;
  sections?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  type: 'investment_memo' | 'progress_report' | 'dd_report';
  fileName: string;
  uploadedAt: string;
  fields: string[];
}

export interface Activity {
  id: string;
  type: 'training_completed' | 'deliverable_submitted' | 'feedback_received' | 'session_booked' | 'document_generated' | 'entrepreneur_added';
  title: string;
  description: string;
  entrepreneurId?: string;
  entrepreneurName?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'deadline';
  read: boolean;
  createdAt: string;
}

// ============================================
// Funding History
// ============================================

export interface FundingRound {
  id: string;
  entrepreneurId: string;
  round: string;
  amount: number;
  date: string;
  source?: string;
  status: 'closed' | 'planning' | 'active';
}

// ============================================
// Calendar & Events
// ============================================

export interface CalendarEvent {
  id: string;
  date: string;
  time?: string;
  endTime?: string;
  title: string;
  type: 'session' | 'deadline' | 'office_hours' | 'workshop';
  status?: SessionStatus;
  entrepreneurId?: string;
  trainerId?: string;
}

// ============================================
// Analytics & Reporting
// ============================================

export interface PlatformStats {
  totalEntrepreneurs: number;
  activeEntrepreneurs: number;
  unassignedEntrepreneurs: number;
  graduatedEntrepreneurs: number;
  activeTrainers: number;
  avgTrainingProgress: number;
  pendingDeliverables: number;
  sessionsThisMonth: number;
  totalFundingRaised: number;
  jobsCreated: number;
  jobsWomen: number;
  jobsMen: number;
  fundsMobilised: number;
  updateSubmissionRate: number;
}

export interface ProgramStats {
  programId: string;
  programName: string;
  jobsCreated: number;
  jobsWomen: number;
  jobsMen: number;
  fundsMobilised: number;
  entrepreneurs: number;
  trainers: number;
}

export interface CohortStats {
  cohortId: string;
  cohortName: string;
  entrepreneurs: number;
  completed: number;
  avgTraining: number;
  totalFunding: number;
  jobsCreated: number;
  activeBusinesses: number;
}

export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

// ============================================
// Stage & Sector Definitions
// ============================================

export interface StageDefinition {
  stage: Stage;
  definition: string;
}

export interface SectorDefinition {
  sector: Sector;
  description?: string;
}

// ============================================
// Form Data Types
// ============================================

export interface EntrepreneurFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  businessName: string;
  sector: Sector;
  stage: Stage;
  programId?: string;
  trainerId?: string;
  country: string;
  goalType: GoalType;
  goalAmount?: number;
}

export interface TrainerFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: TrainerRole;
  accessLevel: AccessLevel;
  accessExpires?: string;
  specialisms: string[];
  maxEntrepreneurs: number;
}

export interface SessionFormData {
  type: SessionType;
  trainerSelection: 'specific' | 'any';
  trainerId?: string;
  date: string;
  time: string;
  notes?: string;
}

export interface DeliverableFormData {
  title: string;
  file?: File;
  notes?: string;
}

export interface ProgramFormData {
  name: string;
  startDate: string;
  endDate: string;
  maxEntrepreneurs: number;
  description?: string;
}

export interface ModuleFormData {
  title: string;
  description?: string;
}

export interface DocumentFormData {
  entrepreneurId?: string;
  template: string;
}

export interface PeriodicUpdateFormData {
  period: string;
  jobsWomen: number;
  jobsMen: number;
  fundsMobilised: number;
  notes?: string;
}

export interface FundingRoundFormData {
  round: string;
  amount: number;
  date: string;
  source?: string;
}
