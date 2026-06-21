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
import { Card, CardContent } from '@/components/ui/card';
import { mockDocuments, mockEntrepreneurs } from '@/lib/mock-data';
import { FileText, Upload, Download, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AdminDocumentsPage() {
  const [memoModalOpen, setMemoModalOpen] = useState(false);
  const [ddModalOpen, setDdModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-[16px] font-medium text-app-primary">Generate documents</h2>
        <p className="text-[11px] text-app-secondary mt-0.5">Create investment memos, DD reports and programme documents</p>
      </div>

      {/* Document Type Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Investment Memo */}
        <Card
          className="border border-app-tertiary rounded-[10px] p-4 cursor-pointer hover:border-bid transition-colors"
          onClick={() => setMemoModalOpen(true)}
        >
          <CardContent className="p-0">
            <div className="w-9 h-9 rounded-lg bg-bid-light flex items-center justify-center mb-2.5">
              <FileText className="w-4.5 h-4.5 text-bid" />
            </div>
            <div className="text-[12px] font-medium mb-1">Investment memo</div>
            <div className="text-[10px] text-app-secondary leading-relaxed">
              Auto-generate a structured investment memo for any entrepreneur using their profile, financials and program data.
            </div>
            <Button className="w-full mt-2.5 bg-bid hover:bg-bid-dark text-white h-7 text-[10px]">
              Generate memo
            </Button>
          </CardContent>
        </Card>

        {/* DD Report */}
        <Card
          className="border border-app-tertiary rounded-[10px] p-4 cursor-pointer hover:border-bid transition-colors"
          onClick={() => setDdModalOpen(true)}
        >
          <CardContent className="p-0">
            <div className="w-9 h-9 rounded-lg bg-info-light flex items-center justify-center mb-2.5">
              <FileText className="w-4.5 h-4.5 text-info" />
            </div>
            <div className="text-[12px] font-medium mb-1">Due diligence report</div>
            <div className="text-[10px] text-app-secondary leading-relaxed">
              Compile a DD document pulling from submitted deliverables, financials, and training record.
            </div>
            <Button className="w-full mt-2.5 bg-info hover:bg-info/80 text-white h-7 text-[10px]">
              Generate DD report
            </Button>
          </CardContent>
        </Card>

        {/* Progress Report */}
        <Card className="border border-app-tertiary rounded-[10px] p-4 cursor-pointer hover:border-bid transition-colors">
          <CardContent className="p-0">
            <div className="w-9 h-9 rounded-lg bg-success-light flex items-center justify-center mb-2.5">
              <FileText className="w-4.5 h-4.5 text-success" />
            </div>
            <div className="text-[12px] font-medium mb-1">Progress report</div>
            <div className="text-[10px] text-app-secondary leading-relaxed">
              Generate a cohort-level or individual progress report for donors, board and programme team.
            </div>
            <Button className="w-full mt-2.5 bg-success hover:bg-success/80 text-white h-7 text-[10px]">
              Generate report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Document Templates */}
      <div className="card-bid">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-medium text-app-primary">Document templates</span>
          <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-bid hover:text-bid hover:bg-bid/10">
            <Upload className="w-3 h-3 mr-1" />
            Upload template
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 rounded-lg bg-app-secondary flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-bid-light flex items-center justify-center flex-shrink-0">
              <FileText className="w-3.5 h-3.5 text-bid" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-medium text-app-primary">Investment Memo</div>
              <div className="text-[9px] text-app-tertiary">Updated Apr 2, 2025</div>
            </div>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Download className="w-3 h-3 text-app-tertiary" />
            </Button>
          </div>
          <div className="p-3 rounded-lg bg-app-secondary flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-info-light flex items-center justify-center flex-shrink-0">
              <FileText className="w-3.5 h-3.5 text-info" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-medium text-app-primary">DD Report</div>
              <div className="text-[9px] text-app-tertiary">Updated Mar 15, 2025</div>
            </div>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Download className="w-3 h-3 text-app-tertiary" />
            </Button>
          </div>
          <div className="p-3 rounded-lg bg-app-secondary flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-success-light flex items-center justify-center flex-shrink-0">
              <FileText className="w-3.5 h-3.5 text-success" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-medium text-app-primary">Progress Report</div>
              <div className="text-[9px] text-app-tertiary">Updated Feb 28, 2025</div>
            </div>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Download className="w-3 h-3 text-app-tertiary" />
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="card-bid">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-medium text-app-primary">Recent documents</span>
        </div>
        <div className="overflow-x-auto">
          <table className="table-bid">
            <thead>
              <tr>
                <th>Document</th>
                <th>Type</th>
                <th>Entrepreneur</th>
                <th>Generated</th>
                <th>By</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mockDocuments.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.title}</td>
                  <td>
                    <Badge variant={doc.type === 'memo' ? 'bid' : doc.type === 'dd_report' ? 'blue' : 'green'}>
                      {doc.type === 'memo' ? 'Memo' : doc.type === 'dd_report' ? 'DD' : 'Report'}
                    </Badge>
                  </td>
                  <td>{doc.entrepreneurName || doc.cohortId}</td>
                  <td>{doc.generatedAt.split('-')[2]} {new Date(2025, parseInt(doc.generatedAt.split('-')[1]) - 1).toLocaleDateString('en-US', { month: 'short' })} 2025</td>
                  <td>{doc.generatedBy}</td>
                  <td>
                    <Badge variant={doc.status === 'final' ? 'green' : doc.status === 'draft' ? 'amber' : 'bid'}>
                      {doc.status === 'final' ? 'Final' : doc.status === 'draft' ? 'Draft' : 'Sent'}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline" className="h-6 text-[9px] px-2">
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Investment Memo Modal */}
      <Modal open={memoModalOpen} onOpenChange={setMemoModalOpen}>
        <ModalContent className="max-w-[500px]">
          <ModalHeader>
            <ModalTitle>Generate investment memo</ModalTitle>
          </ModalHeader>
          <ModalBody className="space-y-3">
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
              <Label className="text-[10px] font-medium text-app-secondary">Investment ask (USD)</Label>
              <Input placeholder="e.g. 500000" className="h-8 text-[11px]" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Memo type</Label>
              <Select defaultValue="full">
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full investment memo</SelectItem>
                  <SelectItem value="summary">Executive summary only</SelectItem>
                  <SelectItem value="grant">Grant application memo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="border border-app-tertiary rounded-lg p-3">
              <div className="text-[10px] font-medium mb-2 text-app-secondary">Sections to include</div>
              <div className="space-y-1.5">
                {['Executive Summary', 'Company Overview & Problem', 'Market Opportunity', 'Financial Highlights', 'BID Programme Journey', 'Risk Assessment'].map((section, i) => (
                  <label key={section} className="flex items-center gap-2 text-[11px] cursor-pointer">
                    <input type="checkbox" defaultChecked={i < 5} className="accent-bid" />
                    {section}
                  </label>
                ))}
              </div>
            </div>
          </ModalBody>
          <div className="mt-4">
            <Button
              className="w-full bg-bid hover:bg-bid-dark text-white h-8 text-[11px]"
              onClick={() => {
                toast.success('Investment memo generated!');
                setMemoModalOpen(false);
              }}
            >
              Generate memo (PDF)
            </Button>
          </div>
        </ModalContent>
      </Modal>

      {/* DD Report Modal */}
      <Modal open={ddModalOpen} onOpenChange={setDdModalOpen}>
        <ModalContent className="max-w-[500px]">
          <ModalHeader>
            <ModalTitle>Generate due diligence report</ModalTitle>
          </ModalHeader>
          <ModalBody className="space-y-3">
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
              <Label className="text-[10px] font-medium text-app-secondary">Report scope</Label>
              <Select defaultValue="full">
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full DD report</SelectItem>
                  <SelectItem value="financial">Financial DD only</SelectItem>
                  <SelectItem value="legal">Legal & compliance DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="border border-app-tertiary rounded-lg p-3">
              <div className="text-[10px] font-medium mb-2 text-app-secondary">Auto-pull from platform data</div>
              <div className="space-y-1.5">
                {['All submitted deliverables', 'Training record & completion', 'Fundraising history', 'Mentor notes & session logs', 'External company registry check'].map((item, i) => (
                  <label key={item} className="flex items-center gap-2 text-[11px] cursor-pointer">
                    <input type="checkbox" defaultChecked={i < 4} className="accent-bid" />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </ModalBody>
          <div className="mt-4">
            <Button
              className="w-full bg-info hover:bg-info/80 text-white h-8 text-[11px]"
              onClick={() => {
                toast.success('DD report generated!');
                setDdModalOpen(false);
              }}
            >
              Generate DD report (PDF)
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
