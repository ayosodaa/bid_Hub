import type { Activity, Notification, PlatformStats, ProgramStats } from '@/lib/types';

export const mockActivities: Activity[] = [
  {
    id: 'act-1',
    type: 'training_completed',
    title: 'Completed Module 9: Investor Pitch Fundamentals',
    description: 'Module completed',
    entrepreneurId: 'ent-1',
    entrepreneurName: 'Amara Osei',
    timestamp: '2h ago',
  },
  {
    id: 'act-2',
    type: 'feedback_received',
    title: 'BID Team left feedback on Q1 Report.pdf',
    description: 'Feedback added',
    entrepreneurId: 'ent-1',
    entrepreneurName: 'Amara Osei',
    timestamp: 'Yesterday',
  },
  {
    id: 'act-3',
    type: 'deliverable_submitted',
    title: 'Business Model Canvas due in 3 days',
    description: 'Deadline reminder',
    entrepreneurId: 'ent-1',
    entrepreneurName: 'Amara Osei',
    timestamp: 'Apr 11',
  },
  {
    id: 'act-4',
    type: 'session_booked',
    title: 'Session booked: Office Hours with Kofi Mensah',
    description: 'Session scheduled',
    entrepreneurId: 'ent-1',
    entrepreneurName: 'Amara Osei',
    timestamp: 'Apr 8',
  },
  {
    id: 'act-5',
    type: 'entrepreneur_added',
    title: 'New entrepreneur Tunde Kola added',
    description: 'Self-registered',
    timestamp: 'Today · 08:32',
  },
  {
    id: 'act-6',
    type: 'document_generated',
    title: 'DD doc generated for HealthFirst',
    description: 'Document created',
    entrepreneurId: 'ent-3',
    entrepreneurName: 'Nadia Asante',
    timestamp: 'Yesterday',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    title: 'BID team reviewed your Q1 Report',
    message: 'Feedback added · 2 hours ago',
    type: 'info',
    read: false,
    createdAt: '2025-04-09T11:00',
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    title: 'Business Model Canvas due in 3 days',
    message: 'Apr 18 · Reminder',
    type: 'deadline',
    read: false,
    createdAt: '2025-04-09T09:00',
  },
  {
    id: 'notif-3',
    userId: 'user-1',
    title: 'New module added to your programme',
    message: 'Legal Structures for Startups',
    type: 'info',
    read: false,
    createdAt: '2025-04-08T14:00',
  },
];

export const mockPlatformStats: PlatformStats = {
  totalEntrepreneurs: 47,
  activeEntrepreneurs: 44,
  unassignedEntrepreneurs: 3,
  graduatedEntrepreneurs: 18,
  activeTrainers: 9,
  avgTrainingProgress: 61,
  pendingDeliverables: 23,
  sessionsThisMonth: 18,
  totalFundingRaised: 2400000,
  jobsCreated: 62,
  jobsWomen: 38,
  jobsMen: 24,
  fundsMobilised: 340000,
  updateSubmissionRate: 58,
};

export const mockProgramStats: ProgramStats[] = [
  {
    programId: 'prog-1',
    programName: 'BID Accelerator',
    jobsCreated: 38,
    jobsWomen: 24,
    jobsMen: 14,
    fundsMobilised: 150000,
    entrepreneurs: 25,
    trainers: 4,
  },
  {
    programId: 'prog-2',
    programName: 'Investment Readiness',
    jobsCreated: 19,
    jobsWomen: 11,
    jobsMen: 8,
    fundsMobilised: 190000,
    entrepreneurs: 16,
    trainers: 3,
  },
  {
    programId: 'prog-3',
    programName: 'Women Economic Empowerment',
    jobsCreated: 5,
    jobsWomen: 3,
    jobsMen: 2,
    fundsMobilised: 0,
    entrepreneurs: 6,
    trainers: 2,
  },
];

export const mockOverdueUpdates = [
  { entrepreneurId: 'ent-2', name: 'FarmLink GH', program: 'BID Accelerator', lastUpdate: 'Q3 2024', programId: 'prog-1' },
  { entrepreneurId: 'ent-4', name: 'Edify Learn', program: 'BID Accelerator', lastUpdate: 'Never submitted', programId: 'prog-1' },
  { entrepreneurId: 'ent-3', name: 'HealthFirst', program: 'Investment Readiness', lastUpdate: 'Q4 2024', programId: 'prog-2' },
];

export const mockPendingActions = {
  deliverablesAwaitingReview: 12,
  unassignedEntrepreneurs: 3,
  toolRequestsPending: 2,
  documentsToGenerate: 4,
};

export const mockRecentlyJoined = [
  { id: 'ent-6', name: 'Tunde Kola', business: 'BuildIt', source: 'self-registered' as const, status: 'unassigned' as const },
  { id: 'ent-7', name: 'Grace Nana', business: 'MediScan', source: 'self-registered' as const, status: 'unassigned' as const },
  { id: 'ent-8', name: 'Kofi Adu', business: 'Adu Logistics', source: 'admin-invited' as const, status: 'active' as const },
];
