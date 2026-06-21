'use client';

import { Badge, ProgressBar, Modal, ModalContent, ModalHeader, ModalTitle, ModalBody } from '@/components/shared';
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
import { mockModules, mockContentItems } from '@/lib/mock-data';
import { Upload, Play, FileText, Wrench, Link2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AdminContentPage() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'videos' | 'resources' | 'tools' | 'templates'>('videos');

  const trackColors: Record<string, 'bid' | 'amber' | 'blue' | 'green' | 'gray' | 'error'> = {
    Foundations: 'gray',
    'Business Model': 'amber',
    Fundraising: 'error',
    Operations: 'green',
    Legal: 'gray',
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-[16px] font-medium text-app-primary">Content library</h2>
          <p className="text-[11px] text-app-secondary mt-0.5">Manage training videos, resources and tools</p>
        </div>
        <Button
          className="bg-bid hover:bg-bid-dark text-white h-7 text-[11px]"
          onClick={() => setAddModalOpen(true)}
        >
          + Upload content
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 bg-app-secondary rounded-lg p-0.5 w-fit">
        {(['videos', 'resources', 'tools', 'templates'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-md text-[11px] transition-all ${
              activeTab === tab
                ? 'bg-app-primary text-app-primary font-medium border border-app-tertiary'
                : 'text-app-secondary hover:text-app-primary'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Table */}
      <div className="card-bid">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-medium text-app-primary">
            {activeTab === 'videos' ? 'Video modules' : activeTab === 'resources' ? 'Resources' : activeTab === 'tools' ? 'Tools' : 'Templates'}
          </span>
          <Select defaultValue="all-tracks">
            <SelectTrigger className="h-7 text-[10px] w-auto px-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-tracks">All tracks</SelectItem>
              <SelectItem value="foundations">Foundations</SelectItem>
              <SelectItem value="business-model">Business Model</SelectItem>
              <SelectItem value="fundraising">Fundraising</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <table className="table-bid">
            <thead>
              <tr>
                <th>Title</th>
                <th>Module</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Program usage</th>
                <th>Views</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mockContentItems.map((item) => {
                const typeIcons = { video: Play, pdf: FileText, tool: Wrench };
                const IconComponent = typeIcons[item.type];
                return (
                  <tr key={item.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-3.5 h-3.5 text-app-tertiary" />
                        <span>{item.title}</span>
                      </div>
                    </td>
                    <td className="text-[11px] text-app-secondary">{item.moduleName}</td>
                    <td>
                      <Badge variant="gray" className="text-[9px]">{item.type}</Badge>
                    </td>
                    <td className="font-mono-bid text-[11px]">{item.duration || '—'}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Link2 className="w-3 h-3 text-app-tertiary" />
                        <span className="text-[10px] text-app-secondary">{item.programName}</span>
                      </div>
                    </td>
                    <td className="text-[11px]">{item.views}</td>
                    <td>
                      <Badge variant={item.status === 'published' ? 'green' : 'amber'}>
                        {item.status === 'published' ? 'Published' : 'Draft'}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="outline" className="h-6 text-[9px] px-2">
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Content Modal */}
      <Modal open={addModalOpen} onOpenChange={setAddModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Upload content</ModalTitle>
          </ModalHeader>
          <ModalBody className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Content type</Label>
              <Select defaultValue="video">
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video module</SelectItem>
                  <SelectItem value="pdf">PDF resource</SelectItem>
                  <SelectItem value="template">Template</SelectItem>
                  <SelectItem value="tool">Tool</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Title</Label>
              <Input placeholder="e.g. Fundraising Masterclass" className="h-8 text-[11px]" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Track</Label>
              <Select defaultValue="Foundations">
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Foundations">Foundations</SelectItem>
                  <SelectItem value="Business Model">Business Model</SelectItem>
                  <SelectItem value="Fundraising">Fundraising</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Trainer / presenter</Label>
              <Select>
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue placeholder="Select trainer..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kofi">Kofi Mensah</SelectItem>
                  <SelectItem value="esi">Esi Adu</SelectItem>
                  <SelectItem value="james">James Tetteh</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div
              className="border-2 border-dashed border-app-secondary rounded-lg p-5 text-center cursor-pointer hover:border-bid transition-colors"
              onClick={() => toast.info('File picker opened')}
            >
              <Upload className="w-5 h-5 text-bid mx-auto mb-2" />
              <p className="text-[11px] text-app-secondary">
                Click to upload file
                <br />
                <strong className="text-bid">MP4, PDF, PPTX, DOCX</strong>
              </p>
            </div>
          </ModalBody>
          <div className="mt-4">
            <Button
              className="w-full bg-bid hover:bg-bid-dark text-white h-8 text-[11px]"
              onClick={() => {
                toast.success('Content uploaded!');
                setAddModalOpen(false);
              }}
            >
              Upload & publish
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
