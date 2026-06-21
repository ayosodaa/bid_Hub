'use client';

import { Badge, ProgressBar, Modal, ModalContent, ModalHeader, ModalTitle, ModalBody } from '@/components/shared';
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
import { mockPrograms, mockModules, mockContentItems } from '@/lib/mock-data';
import { Plus, ChevronDown, ChevronRight, Play, FileText, Wrench } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AdminProgramsPage() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<string[]>(['mod-1', 'mod-2']);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const trackColors: Record<string, 'bid' | 'amber' | 'blue' | 'green' | 'gray' | 'error'> = {
    Foundations: 'gray',
    'Business Model': 'amber',
    Fundraising: 'error',
    Operations: 'green',
    Legal: 'gray',
  };

  const contentIcons = {
    video: Play,
    pdf: FileText,
    tool: Wrench,
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-[16px] font-medium text-app-primary">Programs</h2>
          <p className="text-[11px] text-app-secondary mt-0.5">Manage program structures, cohorts and content tracks</p>
        </div>
        <Button
          className="bg-bid hover:bg-bid-dark text-white h-7 text-[11px]"
          onClick={() => setAddModalOpen(true)}
        >
          + New program
        </Button>
      </div>

      {/* Program Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        {mockPrograms.map((program) => (
          <div
            key={program.id}
            className="card-bid border-l-[3px] border-l-bid rounded-r-[10px] rounded-l-none"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-[12px] font-medium">{program.name}</div>
                <div className="text-[10px] text-app-secondary mt-0.5">
                  {new Date(program.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} –{' '}
                  {new Date(program.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
              </div>
              <Badge variant={program.status === 'active' ? 'green' : 'blue'}>
                {program.status === 'active' ? 'Active' : 'Wrapping up'}
              </Badge>
            </div>
            <div className="text-[10px] text-app-secondary mb-2">
              Entrepreneurs: <strong>{program.entrepreneurCount}</strong> · Trainers: <strong>{program.trainerCount}</strong> · Modules: <strong>{program.moduleCount}</strong>
            </div>
            <ProgressBar value={program.progress} className="mb-2 h-[5px]" />
            <div className="text-[9px] text-app-tertiary mb-2">Program progress: {program.progress}%</div>
            <div className="flex gap-1.5">
              <Button variant="outline" className="h-6 text-[9px] px-2">Edit</Button>
              <Button className="bg-bid hover:bg-bid-dark text-white h-6 text-[9px] px-2">View</Button>
            </div>
          </div>
        ))}

        {/* Add New Program Card */}
        <div
          className="card-bid border-2 border-dashed border-app-secondary cursor-pointer flex items-center justify-center flex-col gap-2 min-h-[120px] hover:border-bid transition-colors"
          onClick={() => setAddModalOpen(true)}
        >
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-app-secondary flex items-center justify-center text-lg text-app-tertiary">
            +
          </div>
          <div className="text-[11px] text-app-tertiary">New program</div>
        </div>
      </div>

      {/* Modules Tree */}
      <div className="card-bid">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-medium text-app-primary">Program modules – Cohort 6</span>
          <Button className="bg-bid hover:bg-bid-dark text-white h-6 text-[10px] px-2.5">
            + Add module
          </Button>
        </div>

        <div className="space-y-1">
          {mockModules.slice(0, 5).map((mod) => {
            const isExpanded = expandedModules.includes(mod.id);
            const moduleContent = mockContentItems.filter(c => c.moduleId === mod.id);

            return (
              <div key={mod.id}>
                {/* Module Row */}
                <div
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-app-secondary cursor-pointer hover:bg-app-tertiary/20 transition-colors"
                  onClick={() => toggleModule(mod.id)}
                >
                  <button className="p-0.5 rounded hover:bg-app-tertiary/30">
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-app-tertiary" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-app-tertiary" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-medium text-app-primary">{mod.title}</div>
                    <div className="text-[9px] text-app-tertiary mt-0.5">
                      {mod.track} · {mod.duration || `${mod.contentCount} items`} · {mod.trainerName}
                    </div>
                  </div>
                  <Badge variant={trackColors[mod.track || ''] || 'gray'} className="text-[9px]">
                    {mod.track}
                  </Badge>
                  <div className="flex items-center gap-2 w-[100px]">
                    <ProgressBar value={mod.completionRate || 0} className="w-[60px]" />
                    <span className="text-[10px] text-app-secondary">{mod.completionRate || 0}%</span>
                  </div>
                  <Badge variant={mod.status === 'published' ? 'green' : 'amber'} className="text-[9px]">
                    {mod.status === 'published' ? 'Published' : 'Draft'}
                  </Badge>
                </div>

                {/* Content Items */}
                {isExpanded && moduleContent.length > 0 && (
                  <div className="ml-8 mt-1 space-y-1">
                    {moduleContent.map((item) => {
                      const IconComponent = contentIcons[item.type];
                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 p-2 rounded-lg bg-background-secondary hover:bg-app-secondary transition-colors"
                        >
                          <IconComponent className="w-3 h-3 text-app-tertiary" />
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] text-app-primary">{item.title}</div>
                            <div className="text-[9px] text-app-tertiary">
                              {item.type} · {item.duration || `${item.views} views`}
                            </div>
                          </div>
                          <Badge variant="gray" className="text-[9px]">
                            {item.type}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Program Modal */}
      <Modal open={addModalOpen} onOpenChange={setAddModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>New program</ModalTitle>
          </ModalHeader>
          <ModalBody className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Program name</Label>
              <Input placeholder="e.g. BID Accelerator – Cohort 7" className="h-8 text-[11px]" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-app-secondary">Start date</Label>
                <Input type="date" className="h-8 text-[11px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-app-secondary">End date</Label>
                <Input type="date" className="h-8 text-[11px]" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Max entrepreneurs</Label>
              <Input type="number" placeholder="e.g. 20" className="h-8 text-[11px]" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Description</Label>
              <Textarea rows={2} placeholder="Brief program description..." className="text-[11px] resize-none" />
            </div>
          </ModalBody>
          <div className="mt-4">
            <Button
              className="w-full bg-bid hover:bg-bid-dark text-white h-8 text-[11px]"
              onClick={() => {
                toast.success('Program created!');
                setAddModalOpen(false);
              }}
            >
              Create program
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
