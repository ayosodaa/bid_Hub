import type { Session, CalendarEvent } from '@/lib/types';

export const mockSessions: Session[] = [
  {
    id: 'sess-1',
    type: '1:1 Mentor Check-in',
    entrepreneurId: 'ent-1',
    entrepreneurName: 'Amara Osei',
    trainerId: 'trainer-1',
    trainerName: 'Kofi Mensah',
    scheduledAt: '2025-04-14T10:00',
    duration: 45,
    status: 'confirmed',
    meetingUrl: 'https://zoom.us/j/123456',
    createdAt: '2025-04-08',
    updatedAt: '2025-04-09',
  },
  {
    id: 'sess-2',
    type: 'Office Hours (Group)',
    trainerId: 'trainer-1',
    trainerName: 'Kofi Mensah',
    scheduledAt: '2025-04-16T14:00',
    duration: 90,
    status: 'scheduled',
    meetingUrl: 'https://zoom.us/j/789012',
    createdAt: '2025-04-01',
    updatedAt: '2025-04-01',
  },
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'ce-1',
    date: '2025-04-14',
    time: '10:00',
    endTime: '10:45',
    title: 'Mentor check-in – Kofi Mensah',
    type: 'session',
    status: 'confirmed',
    entrepreneurId: 'ent-1',
    trainerId: 'trainer-1',
  },
  {
    id: 'ce-2',
    date: '2025-04-16',
    time: '14:00',
    endTime: '15:30',
    title: 'BID Office Hours (group)',
    type: 'office_hours',
    trainerId: 'trainer-1',
  },
  {
    id: 'ce-3',
    date: '2025-04-18',
    title: 'Business Model Canvas – due',
    type: 'deadline',
    entrepreneurId: 'ent-1',
  },
  {
    id: 'ce-4',
    date: '2025-04-04',
    title: 'Training Session',
    type: 'session',
    status: 'completed',
  },
];
