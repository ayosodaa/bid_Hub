'use client';

import { Sidebar, Topbar } from '@/components/shared';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalFooter } from '@/components/shared';
import { useState } from 'react';
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
import { toast } from 'sonner';

export default function EntrepreneurLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookModalOpen, setBookModalOpen] = useState(false);

  const handleBookSession = () => {
    setBookModalOpen(true);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        userType="entrepreneur"
        userName="Amara Osei"
        userRole="Stage 2 · Fintech"
        userInitials="AO"
      />
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <Topbar
          title="Dashboard"
          notificationCount={3}
          onBookMeeting={handleBookSession}
        />
        <main className="p-5 flex-1 overflow-y-auto bg-background-secondary">
          {children}
        </main>
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
