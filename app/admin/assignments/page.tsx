'use client';

import { Badge, Avatar, Modal, ModalContent, ModalHeader, ModalTitle, ModalBody } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockEntrepreneurs, mockTrainers } from '@/lib/mock-data';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AdminAssignmentsPage() {
  const [bulkModalOpen, setBulkModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-[16px] font-medium text-app-primary">Assignments</h2>
          <p className="text-[11px] text-app-secondary mt-0.5">Assign entrepreneurs to programs and trainers</p>
        </div>
        <Button
          className="bg-bid hover:bg-bid-dark text-white h-7 text-[11px]"
          onClick={() => setBulkModalOpen(true)}
        >
          + Bulk assign
        </Button>
      </div>

      {/* Assignment Forms */}
      <div className="grid grid-cols-2 gap-3">
        {/* Assign to Program */}
        <div className="card-bid">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-medium text-app-primary">Assign to program</span>
          </div>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Entrepreneur</Label>
              <Select>
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue placeholder="Select entrepreneur..." />
                </SelectTrigger>
                <SelectContent>
                  {mockEntrepreneurs.map((ent) => (
                    <SelectItem key={ent.id} value={ent.id}>
                      {ent.firstName} {ent.lastName} – {ent.businessName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Program</Label>
              <Select defaultValue="cohort-6">
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cohort-6">BID Accelerator – Cohort 6</SelectItem>
                  <SelectItem value="cohort-5">BID Accelerator – Cohort 5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Start date</Label>
              <Input type="date" defaultValue="2025-04-14" className="h-8 text-[11px]" />
            </div>
            <Button
              className="w-full bg-bid hover:bg-bid-dark text-white h-8 text-[11px]"
              onClick={() => toast.success('Entrepreneur assigned to program!')}
            >
              Assign to program
            </Button>
          </div>
        </div>

        {/* Assign to Trainer */}
        <div className="card-bid">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-medium text-app-primary">Assign to trainer</span>
          </div>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Entrepreneur</Label>
              <Select>
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue placeholder="Select entrepreneur..." />
                </SelectTrigger>
                <SelectContent>
                  {mockEntrepreneurs.map((ent) => (
                    <SelectItem key={ent.id} value={ent.id}>
                      {ent.firstName} {ent.lastName} – {ent.businessName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Trainer</Label>
              <Select>
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue placeholder="Select trainer..." />
                </SelectTrigger>
                <SelectContent>
                  {mockTrainers.map((trainer) => (
                    <SelectItem key={trainer.id} value={trainer.id}>
                      {trainer.firstName} {trainer.lastName} – {trainer.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Engagement type</Label>
              <Select defaultValue="full">
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full mentorship</SelectItem>
                  <SelectItem value="guest">Guest session only</SelectItem>
                  <SelectItem value="workshop">Workshop facilitator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="w-full bg-bid hover:bg-bid-dark text-white h-8 text-[11px]"
              onClick={() => toast.success('Trainer assigned successfully!')}
            >
              Assign trainer
            </Button>
          </div>
        </div>
      </div>

      {/* Current Assignments */}
      <div className="card-bid">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-medium text-app-primary">Current assignments</span>
        </div>
        <div className="overflow-x-auto">
          <table className="table-bid">
            <thead>
              <tr>
                <th>Entrepreneur</th>
                <th>Program</th>
                <th>Trainer</th>
                <th>Assigned</th>
                <th>Stage</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mockEntrepreneurs.slice(0, 3).map((ent) => (
                <tr key={ent.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <Avatar initials={`${ent.firstName[0]}${ent.lastName[0]}`} size="sm" />
                      <span>{ent.firstName} {ent.lastName}</span>
                    </div>
                  </td>
                  <td>{ent.cohortName}</td>
                  <td>
                    {ent.trainerName || <span className="text-error">Unassigned</span>}
                  </td>
                  <td>{new Date(ent.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td>
                    <Badge variant={ent.stage === 'Growth' ? 'bid' : 'amber'}>{ent.stage}</Badge>
                  </td>
                  <td>
                    <Button variant="outline" className="h-6 text-[9px] px-2">
                      {ent.trainerName ? 'Reassign' : 'Assign now'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Assign Modal */}
      <Modal open={bulkModalOpen} onOpenChange={setBulkModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Bulk assignment</ModalTitle>
          </ModalHeader>
          <ModalBody className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Select program</Label>
              <Select defaultValue="cohort-6">
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cohort-6">BID Accelerator – Cohort 6</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Assign to trainer</Label>
              <Select>
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue placeholder="Select trainer..." />
                </SelectTrigger>
                <SelectContent>
                  {mockTrainers.map((trainer) => (
                    <SelectItem key={trainer.id} value={trainer.id}>
                      {trainer.firstName} {trainer.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="border border-app-tertiary rounded-lg p-2.5">
              <div className="text-[10px] font-medium mb-2 text-app-secondary">Select entrepreneurs</div>
              <div className="space-y-1.5">
                {mockEntrepreneurs.slice(0, 3).map((ent) => (
                  <label key={ent.id} className="flex items-center gap-2 text-[11px] cursor-pointer">
                    <input type="checkbox" className="accent-bid" />
                    {ent.firstName} {ent.lastName} – {ent.businessName}
                  </label>
                ))}
              </div>
            </div>
          </ModalBody>
          <div className="mt-4">
            <Button
              className="w-full bg-bid hover:bg-bid-dark text-white h-8 text-[11px]"
              onClick={() => {
                toast.success('Bulk assignment saved!');
                setBulkModalOpen(false);
              }}
            >
              Save assignments
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
