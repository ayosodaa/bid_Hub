'use client';

import { StatCard, Badge, Avatar, ProgressBar, Modal, ModalContent, ModalHeader, ModalTitle, ModalBody } from '@/components/shared';
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
import { mockEntrepreneurs } from '@/lib/mock-data';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AdminEntrepreneursPage() {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const sectorColors: Record<string, 'bid' | 'blue' | 'green' | 'amber' | 'gray'> = {
    Fintech: 'blue',
    Agritech: 'green',
    Healthtech: 'blue',
    Edtech: 'amber',
    Logistics: 'gray',
  };

  const stageColors: Record<string, 'bid' | 'amber' | 'blue'> = {
    'Stage 1': 'amber',
    'Stage 2': 'bid',
    'Stage 3': 'blue',
  };

  const statusColors: Record<string, 'green' | 'red' | 'gray'> = {
    active: 'green',
    unassigned: 'red',
    graduated: 'gray',
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-[16px] font-medium text-app-primary">Entrepreneurs</h2>
          <p className="text-[11px] text-app-secondary mt-0.5">Add, edit and manage all entrepreneurs across cohorts</p>
        </div>
        <Button
          className="bg-bid hover:bg-bid-dark text-white h-7 text-[11px]"
          onClick={() => setAddModalOpen(true)}
        >
          + Add entrepreneur
        </Button>
      </div>

      {/* Stat Grid */}
      <div className="grid grid-cols-4 gap-2.5">
        <StatCard label="Total" value="47" />
        <StatCard label="Active" value="44" />
        <StatCard label="Unassigned" value="2" className="[&>div:nth-child(2)]:text-bid" />
        <StatCard label="Graduated" value="18" />
      </div>

      {/* Entrepreneurs Table */}
      <div className="card-bid">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-medium text-app-primary">All entrepreneurs</span>
          <div className="flex gap-1.5">
            <Select defaultValue="all-cohorts">
              <SelectTrigger className="h-7 text-[10px] w-auto px-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-cohorts">All cohorts</SelectItem>
                <SelectItem value="cohort-6">Cohort 6</SelectItem>
                <SelectItem value="cohort-5">Cohort 5</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-sectors">
              <SelectTrigger className="h-7 text-[10px] w-auto px-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-sectors">All sectors</SelectItem>
                <SelectItem value="fintech">Fintech</SelectItem>
                <SelectItem value="agritech">Agritech</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-sources">
              <SelectTrigger className="h-7 text-[10px] w-auto px-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-sources">All sources</SelectItem>
                <SelectItem value="admin-invited">Admin invited</SelectItem>
                <SelectItem value="self-registered">Self-registered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table-bid">
            <thead>
              <tr>
                <th>Name</th>
                <th>Business</th>
                <th>Sector</th>
                <th>Stage</th>
                <th>Source</th>
                <th>Cohort</th>
                <th>Trainer</th>
                <th>Training</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mockEntrepreneurs.map((ent) => (
                <tr key={ent.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <Avatar
                        initials={`${ent.firstName[0]}${ent.lastName[0]}`}
                        size="sm"
                        colorScheme={ent.sector === 'Fintech' ? 'bid' : ent.sector === 'Agritech' ? 'blue' : 'amber'}
                      />
                      <span>{ent.firstName} {ent.lastName}</span>
                    </div>
                  </td>
                  <td>{ent.businessName}</td>
                  <td>
                    <Badge variant={sectorColors[ent.sector] || 'gray'}>{ent.sector}</Badge>
                  </td>
                  <td>
                    <Badge variant={stageColors[ent.stage] || 'bid'}>{ent.stage}</Badge>
                  </td>
                  <td>
                    <span className="text-[11px] text-app-secondary">
                      {ent.source === 'self-registered' ? 'Self-registered' : 'Admin invited'}
                    </span>
                  </td>
                  <td>{ent.cohortName || '—'}</td>
                  <td>{ent.trainerName || '—'}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <ProgressBar value={ent.trainingProgress} className="w-[65px]" />
                      <span className="text-[10px]">{ent.trainingProgress}%</span>
                    </div>
                  </td>
                  <td>
                    <Badge variant={statusColors[ent.status] || 'gray'}>
                      {ent.status === 'active' ? 'Active' : ent.status === 'unassigned' ? 'Unassigned' : 'Graduated'}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex gap-1.5">
                      <Button variant="outline" className="h-6 text-[9px] px-2">Edit</Button>
                      <Button className="bg-bid hover:bg-bid-dark text-white h-6 text-[9px] px-2">View</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Entrepreneur Modal */}
      <Modal open={addModalOpen} onOpenChange={setAddModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Add entrepreneur</ModalTitle>
          </ModalHeader>
          <ModalBody className="space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-app-secondary">First name</Label>
                <Input placeholder="e.g. Amara" className="h-8 text-[11px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-app-secondary">Last name</Label>
                <Input placeholder="e.g. Osei" className="h-8 text-[11px]" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Email</Label>
              <Input type="email" placeholder="amara@example.com" className="h-8 text-[11px]" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Business name</Label>
              <Input placeholder="e.g. PayBridge Africa Ltd" className="h-8 text-[11px]" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-app-secondary">Sector</Label>
                <Select defaultValue="Fintech">
                  <SelectTrigger className="h-8 text-[11px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fintech">Fintech</SelectItem>
                    <SelectItem value="Agritech">Agritech</SelectItem>
                    <SelectItem value="Healthtech">Healthtech</SelectItem>
                    <SelectItem value="Edtech">Edtech</SelectItem>
                    <SelectItem value="Logistics">Logistics</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-app-secondary">Stage</Label>
                <Select defaultValue="Stage 1">
                  <SelectTrigger className="h-8 text-[11px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Stage 1">Stage 1 – Idea</SelectItem>
                    <SelectItem value="Stage 2">Stage 2 – Growth</SelectItem>
                    <SelectItem value="Stage 3">Stage 3 – Scale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-app-secondary">Assign to program</Label>
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
                <Label className="text-[10px] font-medium text-app-secondary">Assign trainer</Label>
                <Select defaultValue="unassigned">
                  <SelectTrigger className="h-8 text-[11px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">– Unassigned –</SelectItem>
                    <SelectItem value="kofi">Kofi Mensah</SelectItem>
                    <SelectItem value="esi">Esi Adu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Country</Label>
              <Input placeholder="e.g. Ghana" className="h-8 text-[11px]" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Total funding raised (USD)</Label>
              <Input placeholder="e.g. 50000" className="h-8 text-[11px]" />
            </div>
          </ModalBody>
          <div className="mt-4">
            <Button
              className="w-full bg-bid hover:bg-bid-dark text-white h-8 text-[11px]"
              onClick={() => {
                toast.success('Entrepreneur added!');
                setAddModalOpen(false);
              }}
            >
              Add entrepreneur
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
