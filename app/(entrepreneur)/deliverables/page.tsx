'use client';

import { StatCard, Badge, Modal, ModalContent, ModalHeader, ModalTitle, ModalBody } from '@/components/shared';
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
import { mockDeliverables } from '@/lib/mock-data';
import { FileText, Upload } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DeliverablesPage() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const statusColors: Record<string, 'bid' | 'amber' | 'blue' | 'gray'> = {
    reviewed: 'bid',
    submitted: 'bid',
    pending: 'amber',
    in_review: 'blue',
  };

  const iconColors: Record<string, string> = {
    reviewed: 'bg-bid-light',
    submitted: 'bg-bid-light',
    pending: 'bg-warning-light',
    in_review: 'bg-info-light',
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-[16px] font-medium text-app-primary">Deliverables</h2>
          <p className="text-[11px] text-app-secondary mt-0.5">Track, upload and manage submissions to the BID team</p>
        </div>
        <Button
          className="bg-bid hover:bg-bid-dark text-white h-7 text-[11px]"
          onClick={() => setUploadModalOpen(true)}
        >
          + Upload file
        </Button>
      </div>

      {/* Stat Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        <StatCard label="Completed" value="4" />
        <StatCard label="Pending" value="3" className="[&>div:nth-child(2)]:text-bid" />
        <StatCard label="In review" value="1" className="[&>div:nth-child(2)]:text-info" />
      </div>

      {/* Deliverables List */}
      <div className="card-bid">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-medium text-app-primary">All deliverables</span>
        </div>
        <div className="space-y-0">
          {mockDeliverables.map((del) => (
            <div key={del.id} className="flex items-center gap-2.5 py-2.5 border-b border-app-tertiary last:border-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${iconColors[del.status]}`}>
                <FileText className="w-3.5 h-3.5 text-bid" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-medium text-app-primary">{del.title}</div>
                <div className="text-[10px] text-app-secondary">
                  {del.uploadedAt
                    ? `Uploaded ${del.uploadedAt.split('-')[2]} ${del.uploadedAt.split('-')[1]} · ${del.fileType} · ${del.fileSize}`
                    : `Due ${del.dueDate.split('-')[2]} ${del.dueDate.split('-')[1]} · Not yet uploaded`}
                </div>
              </div>
              <Badge variant={statusColors[del.status] || 'gray'}>
                {del.status === 'in_review' ? 'In review' : del.status.charAt(0).toUpperCase() + del.status.slice(1)}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      <Modal open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Upload deliverable</ModalTitle>
          </ModalHeader>
          <ModalBody className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Deliverable type</Label>
              <Select defaultValue="bmc">
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bmc">Business Model Canvas</SelectItem>
                  <SelectItem value="financial">Financial Model</SelectItem>
                  <SelectItem value="pitch">Pitch Deck</SelectItem>
                  <SelectItem value="report">Progress Report</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div
              className="border-2 border-dashed border-app-secondary rounded-lg p-5 text-center cursor-pointer hover:border-bid hover:bg-bid-light transition-colors"
              onClick={() => toast.info('File picker opened')}
            >
              <Upload className="w-6 h-6 text-bid mx-auto mb-2" />
              <p className="text-[11px] text-app-secondary">
                Click to browse or drag file here
                <br />
                <strong className="text-bid">PDF, PPTX, DOCX, XLSX</strong> up to 25 MB
              </p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Notes (optional)</Label>
              <Textarea
                rows={2}
                placeholder="Any context for BID team..."
                className="text-[11px] resize-none"
              />
            </div>

            <Button
              className="w-full bg-bid hover:bg-bid-dark text-white h-8 text-[11px]"
              onClick={() => {
                toast.success('Deliverable uploaded!');
                setUploadModalOpen(false);
              }}
            >
              Submit
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
