'use client';

import { Badge, Modal, ModalContent, ModalHeader, ModalTitle, ModalBody } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { mockCalendarEvents, mockSessions } from '@/lib/mock-data';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SchedulePage() {
  const [bookModalOpen, setBookModalOpen] = useState(false);

  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const calendarDays: { day: number; other?: boolean; hasEvent?: boolean; today?: boolean }[] = [];

  // Build calendar for April 2025
  for (let i = 31; i > 30; i--) {
    calendarDays.push({ day: i, other: true });
  }

  const eventDays = [4, 14, 16, 18];
  const todayDay = 9;

  for (let i = 1; i <= 30; i++) {
    calendarDays.push({
      day: i,
      hasEvent: eventDays.includes(i),
      today: i === todayDay,
    });
  }

  for (let i = 1; i <= 4; i++) {
    calendarDays.push({ day: i, other: true });
  }

  const sessionTypes = [
    { name: '1:1 Mentor Check-in', duration: '45 min · Mon, Wed, Fri' },
    { name: 'Office Hours (Group)', duration: '90 min · Wednesdays' },
    { name: 'Investor Prep', duration: '60 min · By request' },
  ];

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-[16px] font-medium text-app-primary">Schedule</h2>
          <p className="text-[11px] text-app-secondary mt-0.5">Book sessions and manage your calendar</p>
        </div>
        <Button
          className="bg-bid hover:bg-bid-dark text-white h-7 text-[11px]"
          onClick={() => setBookModalOpen(true)}
        >
          + Book session
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Calendar */}
        <div className="card-bid">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-medium text-app-primary">April 2025</span>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-6 w-6">
                <ChevronLeft className="w-3 h-3" />
              </Button>
              <Button variant="outline" size="icon" className="h-6 w-6">
                <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 mt-2">
            {days.map((d) => (
              <div key={d} className="text-center text-[9px] font-medium text-app-tertiary py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-0.5 mt-1">
            {calendarDays.slice(0, 35).map((d, i) => (
              <div
                key={i}
                className={`text-center py-1.5 text-[10px] cursor-pointer rounded-md transition-colors ${
                  d.other
                    ? 'text-app-tertiary opacity-30'
                    : d.today
                    ? 'bg-bid text-white font-semibold'
                    : d.hasEvent
                    ? 'bg-bid-light text-bid-dark font-medium'
                    : 'text-app-secondary hover:bg-app-secondary'
                }`}
              >
                {d.day}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card-bid">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-medium text-app-primary">Upcoming events</span>
          </div>
          <div className="space-y-2">
            {mockCalendarEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className={`px-3 py-2.5 rounded-lg border-l-[3px] bg-app-secondary ${
                  event.type === 'session'
                    ? 'border-l-bid'
                    : event.type === 'office_hours'
                    ? 'border-l-info'
                    : 'border-l-warning'
                }`}
              >
                <div className="text-[10px] text-app-secondary font-mono-bid mb-0.5">
                  {event.date} {event.time && `· ${event.time}${event.endTime ? `–${event.endTime}` : ''}`}
                </div>
                <div className="text-[11px] font-medium text-app-primary">{event.title}</div>
                <div className="mt-1.5">
                  <Badge
                    variant={
                      event.type === 'session' && event.status === 'confirmed'
                        ? 'bid'
                        : event.type === 'office_hours'
                        ? 'blue'
                        : 'amber'
                    }
                    className="text-[9px]"
                  >
                    {event.type === 'deadline' ? 'Deadline' : event.status === 'confirmed' ? 'Confirmed' : 'Virtual'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Session Types */}
      <div className="card-bid">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-medium text-app-primary">Book a session type</span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {sessionTypes.map((type) => (
            <div
              key={type.name}
              className="border border-app-tertiary rounded-lg px-3 py-3 cursor-pointer hover:border-bid transition-colors"
              onClick={() => setBookModalOpen(true)}
            >
              <div className="text-[11px] font-medium text-app-primary mb-1">{type.name}</div>
              <div className="text-[10px] text-app-secondary">{type.duration}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Session Modal */}
      <Modal open={bookModalOpen} onOpenChange={setBookModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Book a session</ModalTitle>
          </ModalHeader>
          <ModalBody className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Session type</Label>
              <Select defaultValue="mentor-checkin">
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mentor-checkin">1:1 Mentor Check-in (45 min)</SelectItem>
                  <SelectItem value="office-hours">Office Hours – Group (90 min)</SelectItem>
                  <SelectItem value="investor-prep">Investor Prep Session (60 min)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">BID team member</Label>
              <Select defaultValue="kofi">
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kofi">Kofi Mensah – Mentor</SelectItem>
                  <SelectItem value="ama">Ama Darko – Programme Lead</SelectItem>
                  <SelectItem value="emmanuel">Emmanuel Osei – Investment Analyst</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-app-secondary">Date</Label>
                <Input type="date" defaultValue="2025-04-14" className="h-8 text-[11px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-app-secondary">Time</Label>
                <Select defaultValue="10:00">
                  <SelectTrigger className="h-8 text-[11px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Notes (optional)</Label>
              <Textarea
                rows={3}
                placeholder="What would you like to discuss?"
                className="text-[11px] resize-none"
              />
            </div>
          </ModalBody>
          <div className="mt-4">
            <Button
              className="w-full bg-bid hover:bg-bid-dark text-white h-8 text-[11px]"
              onClick={() => {
                toast.success('Session request sent!');
                setBookModalOpen(false);
              }}
            >
              Request session
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
