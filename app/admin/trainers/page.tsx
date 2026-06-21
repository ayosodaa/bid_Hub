'use client';

import { Badge, Avatar, ProgressBar, Modal, ModalContent, ModalHeader, ModalTitle, ModalBody } from '@/components/shared';
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
import { mockTrainers } from '@/lib/mock-data';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AdminTrainersPage() {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const roleColors: Record<string, 'bid' | 'amber' | 'green' | 'blue'> = {
    Mentor: 'bid',
    Trainer: 'green',
    'Guest Expert': 'amber',
    'Investment Analyst': 'blue',
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-[16px] font-medium text-app-primary">Trainers</h2>
          <p className="text-[11px] text-app-secondary mt-0.5">Manage trainer profiles, specialisms and workload</p>
        </div>
        <Button
          className="bg-bid hover:bg-bid-dark text-white h-7 text-[11px]"
          onClick={() => setAddModalOpen(true)}
        >
          + Add trainer
        </Button>
      </div>

      {/* Trainer Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        {mockTrainers.slice(0, 3).map((trainer) => (
          <div key={trainer.id} className="card-bid flex gap-3 items-start">
            <Avatar
              initials={`${trainer.firstName[0]}${trainer.lastName[0]}`}
              size="lg"
              colorScheme={trainer.role === 'Mentor' ? 'bid' : trainer.role === 'Trainer' ? 'blue' : 'amber'}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[12px] font-medium">{trainer.firstName} {trainer.lastName}</span>
                <Badge variant={trainer.accessLevel === 'full' ? 'green' : 'amber'} className="text-[9px]">
                  {trainer.accessLevel === 'full' ? 'Full' : 'Guest'}
                </Badge>
              </div>
              <div className="text-[10px] text-app-secondary mb-1.5">
                {trainer.role} · {trainer.specialisms.join(' / ')}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-1.5">
                {trainer.specialisms.slice(0, 2).map((s) => (
                  <Badge key={s} variant={s === 'Fintech' ? 'blue' : 'gray'} className="text-[9px]">
                    {s}
                  </Badge>
                ))}
              </div>
              <div className="text-[10px] text-app-secondary">
                Assigned: <strong className="text-app-primary">{trainer.assignedEntrepreneurs}/{trainer.maxEntrepreneurs} entrepreneurs</strong>
              </div>
              {trainer.accessExpires && (
                <div className="text-[9px] text-amber-600 mt-0.5">
                  Access expires: {trainer.accessExpires}
                </div>
              )}
              <div className="flex gap-1.5 mt-2">
                <Button variant="outline" className="h-6 text-[9px] px-2">Edit</Button>
                <Button className="bg-bid hover:bg-bid-dark text-white h-6 text-[9px] px-2">Manage</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trainer Table */}
      <div className="card-bid">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-medium text-app-primary">Trainer workload overview</span>
        </div>
        <div className="overflow-x-auto">
          <table className="table-bid">
            <thead>
              <tr>
                <th>Trainer</th>
                <th>Role</th>
                <th>Access</th>
                <th>Specialisms</th>
                <th>Entrepreneurs</th>
                <th>Sessions (Apr)</th>
                <th>Satisfaction</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockTrainers.map((trainer) => (
                <tr key={trainer.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <Avatar
                        initials={`${trainer.firstName[0]}${trainer.lastName[0]}`}
                        size="sm"
                        colorScheme={trainer.role === 'Mentor' ? 'bid' : 'blue'}
                      />
                      <span>{trainer.firstName} {trainer.lastName}</span>
                    </div>
                  </td>
                  <td>{trainer.role}</td>
                  <td>
                    <Badge variant={trainer.accessLevel === 'full' ? 'green' : 'amber'}>
                      {trainer.accessLevel === 'full' ? 'Full' : 'Guest'}
                    </Badge>
                  </td>
                  <td>{trainer.specialisms.join(', ')}</td>
                  <td>{trainer.assignedEntrepreneurs}/{trainer.maxEntrepreneurs}</td>
                  <td>{trainer.sessionsThisMonth}</td>
                  <td>{trainer.avgSatisfaction}/5 ({trainer.satisfactionCount})</td>
                  <td>
                    <Badge variant={trainer.status === 'active' ? 'green' : 'amber'}>
                      {trainer.status === 'active' ? 'Active' : trainer.status === 'expiring' ? 'Expiring' : 'Guest'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Trainer Modal */}
      <Modal open={addModalOpen} onOpenChange={setAddModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Add trainer</ModalTitle>
          </ModalHeader>
          <ModalBody className="space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-app-secondary">First name</Label>
                <Input placeholder="First name" className="h-8 text-[11px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-app-secondary">Last name</Label>
                <Input placeholder="Last name" className="h-8 text-[11px]" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Email</Label>
              <Input type="email" placeholder="trainer@example.com" className="h-8 text-[11px]" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Role</Label>
              <Select defaultValue="Mentor">
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mentor">Mentor</SelectItem>
                  <SelectItem value="Trainer">Trainer</SelectItem>
                  <SelectItem value="Guest Expert">Guest Expert</SelectItem>
                  <SelectItem value="Investment Analyst">Investment Analyst</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Access level</Label>
              <Select defaultValue="full">
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full access</SelectItem>
                  <SelectItem value="guest">Guest (limited)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Specialisms (comma separated)</Label>
              <Input placeholder="e.g. Fintech, Fundraising, Strategy" className="h-8 text-[11px]" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Max entrepreneurs</Label>
              <Input type="number" placeholder="e.g. 10" className="h-8 text-[11px]" />
            </div>
          </ModalBody>
          <div className="mt-4">
            <Button
              className="w-full bg-bid hover:bg-bid-dark text-white h-8 text-[11px]"
              onClick={() => {
                toast.success('Trainer added!');
                setAddModalOpen(false);
              }}
            >
              Add trainer
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
