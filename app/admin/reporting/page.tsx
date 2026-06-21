'use client';

import { StatCard, Badge } from '@/components/shared';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockProgramStats, mockPlatformStats, mockOverdueUpdates } from '@/lib/mock-data';
import { toast } from 'sonner';
import { AlertTriangle, Info } from 'lucide-react';
import { useState } from 'react';

export default function AdminReportingPage() {
  const [selectedProgram, setSelectedProgram] = useState('all');

  const programData: Record<string, { jobs: number; jobsSplit: string; funds: string; fundsDetail: string; submission: number; submissionDetail: string; completion: number }> = {
    all: { jobs: mockPlatformStats.jobsCreated, jobsSplit: `${mockPlatformStats.jobsWomen} women · ${mockPlatformStats.jobsMen} men`, funds: `$${(mockPlatformStats.fundsMobilised / 1000).toFixed(0)}k`, fundsDetail: 'Across 12 entrepreneurs', submission: mockPlatformStats.updateSubmissionRate, submissionDetail: '27 of 47 this quarter', completion: mockPlatformStats.avgTrainingProgress },
    'prog-1': { jobs: 38, jobsSplit: '24 women · 14 men', funds: '$150k', fundsDetail: 'Across 6 entrepreneurs', submission: 64, submissionDetail: '16 of 25 this quarter', completion: 68 },
    'prog-2': { jobs: 19, jobsSplit: '11 women · 8 men', funds: '$190k', fundsDetail: 'Across 5 entrepreneurs', submission: 55, submissionDetail: '9 of 16 this quarter', completion: 54 },
    'prog-3': { jobs: 5, jobsSplit: '3 women · 2 men', funds: '$0', fundsDetail: 'Across 1 entrepreneur', submission: 33, submissionDetail: '2 of 6 this quarter', completion: 41 },
  };

  const data = programData[selectedProgram] || programData['all'];

  const filteredOverdue = selectedProgram === 'all'
    ? mockOverdueUpdates
    : mockOverdueUpdates.filter(item => item.programId === selectedProgram);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-[16px] font-medium text-app-primary">Reporting & analytics</h2>
          <p className="text-[11px] text-app-secondary mt-0.5">Programme performance, jobs created and funds mobilised</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedProgram} onValueChange={setSelectedProgram}>
            <SelectTrigger className="h-8 text-[11px] w-auto px-3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All programmes</SelectItem>
              {mockProgramStats.map((prog) => (
                <SelectItem key={prog.programId} value={prog.programId}>
                  {prog.programName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="bg-bid hover:bg-bid-dark text-white h-8 text-[11px]"
            onClick={() => toast.info('Exporting report...')}
          >
            Export PDF report
          </Button>
        </div>
      </div>

      {/* Notice */}
      <div className="bg-app-secondary rounded-lg p-3 flex items-start gap-2">
        <Info className="w-3.5 h-3.5 text-info flex-shrink-0 mt-0.5" />
        <div className="text-[10px] text-app-secondary leading-relaxed">
          <strong>How this data is collected:</strong> entrepreneurs submit a periodic update (quarterly, from their profile) reporting jobs created (by gender) and funds mobilised. Admins can also enter or correct figures directly from an entrepreneur's profile. Figures below reflect submitted updates only — data prior to this feature launching is not available.
        </div>
      </div>

      {/* Stat Grid */}
      <div className="grid grid-cols-4 gap-2.5">
        <div className="card-bid">
          <div className="text-[10px] text-app-secondary mb-1">Jobs created (period)</div>
          <div className="text-[22px] font-semibold text-app-primary">{data.jobs}</div>
          <div className="text-[10px] text-app-secondary mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-bid" />
            {data.jobsSplit}
          </div>
        </div>
        <div className="card-bid">
          <div className="text-[10px] text-app-secondary mb-1">Funds mobilised (period)</div>
          <div className="text-[16px] font-semibold text-app-primary mt-1">{data.funds}</div>
          <div className="text-[10px] text-app-secondary mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-info" />
            {data.fundsDetail}
          </div>
        </div>
        <div className="card-bid">
          <div className="text-[10px] text-app-secondary mb-1">Update submission rate</div>
          <div className="text-[22px] font-semibold text-app-primary">
            {data.submission}
            <span className="text-[13px] text-app-secondary font-normal">%</span>
          </div>
          <div className="text-[10px] text-app-secondary mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-warning" />
            {data.submissionDetail}
          </div>
        </div>
        <div className="card-bid">
          <div className="text-[10px] text-app-secondary mb-1">Training completion rate</div>
          <div className="text-[22px] font-semibold text-app-primary">
            {data.completion}
            <span className="text-[13px] text-app-secondary font-normal">%</span>
          </div>
        </div>
      </div>

      {/* Jobs & Funds by Programme */}
      <div className="grid grid-cols-2 gap-3">
        {/* Jobs created by programme */}
        <div className="card-bid">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-medium text-app-primary">Jobs created by programme</span>
          </div>
          <div className="space-y-2">
            {mockProgramStats
              .filter(prog => selectedProgram === 'all' || prog.programId === selectedProgram)
              .map((prog, idx) => {
                const maxJobs = Math.max(...mockProgramStats.map(p => p.jobsCreated));
                const percent = (prog.jobsCreated / maxJobs) * 100;
                const colors = ['bg-bid', 'bg-info', 'bg-success'];
                return (
                  <div key={prog.programId} className="flex items-center gap-2">
                    <div className="text-[10px] text-app-secondary w-[110px] text-right flex-shrink-0">
                      {prog.programName}
                    </div>
                    <div className="flex-1 h-2 bg-app-secondary rounded overflow-hidden">
                      <div
                        className={`h-full rounded ${colors[idx] || 'bg-bid'}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-app-secondary w-10 text-right font-mono-bid">
                      {prog.jobsCreated}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Funds mobilised by programme */}
        <div className="card-bid">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-medium text-app-primary">Funds mobilised by programme</span>
          </div>
          <div className="space-y-2">
            {mockProgramStats
              .filter(prog => selectedProgram === 'all' || prog.programId === selectedProgram)
              .map((prog, idx) => {
                const maxFunds = Math.max(...mockProgramStats.map(p => p.fundsMobilised));
                const percent = maxFunds > 0 ? (prog.fundsMobilised / maxFunds) * 100 : 0;
                const colors = ['bg-bid', 'bg-info', 'bg-success'];
                return (
                  <div key={prog.programId} className="flex items-center gap-2">
                    <div className="text-[10px] text-app-secondary w-[110px] text-right flex-shrink-0">
                      {prog.programName}
                    </div>
                    <div className="flex-1 h-2 bg-app-secondary rounded overflow-hidden">
                      <div
                        className={`h-full rounded ${colors[idx] || 'bg-bid'}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-app-secondary w-10 text-right font-mono-bid">
                      ${(prog.fundsMobilised / 1000).toFixed(0)}k
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Overdue Updates */}
      <div className="card-bid">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[12px] font-medium text-app-primary">Entrepreneurs with overdue updates</span>
        </div>
        {filteredOverdue.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-bid">
              <thead>
                <tr>
                  <th>Entrepreneur</th>
                  <th>Programme</th>
                  <th>Last update</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredOverdue.map((item) => (
                  <tr key={item.entrepreneurId}>
                    <td>{item.name}</td>
                    <td>{item.program}</td>
                    <td>
                      <Badge variant="error" className="text-[9px]">
                        {item.lastUpdate}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="outline" className="h-6 text-[9px] px-2" onClick={() => toast.success('Reminder sent!')}>
                        Send reminder
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-5 text-[11px] text-app-secondary">
            No overdue updates for this programme 🎉
          </div>
        )}
      </div>
    </div>
  );
}
