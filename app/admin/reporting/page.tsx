'use client';

import { StatCard, Badge, Avatar, ProgressBar } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { mockProgramStats, mockPlatformStats, mockOverdueUpdates } from '@/lib/mock-data';
import { toast } from 'sonner';
import { Users, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

export default function AdminReportingPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-[16px] font-medium text-app-primary">Reporting & analytics</h2>
          <p className="text-[11px] text-app-secondary mt-0.5">Programme performance, engagement and outcomes</p>
        </div>
        <Button
          className="bg-bid hover:bg-bid-dark text-white h-7 text-[11px]"
          onClick={() => toast.info('Exporting report...')}
        >
          Export PDF report
        </Button>
      </div>

      {/* Stat Grid */}
      <div className="grid grid-cols-4 gap-2.5">
        <StatCard label="Training completion rate" value={mockPlatformStats.avgTrainingProgress.toString()} valueSuffix="%" subLabel="+8pp vs C5" />
        <StatCard label="Jobs created" value={mockPlatformStats.jobsCreated.toString()} subLabel={`${mockPlatformStats.jobsWomen} women, ${mockPlatformStats.jobsMen} men`} subLabelColor="bg-info" />
        <StatCard label="Funds mobilised" value={`$${(mockPlatformStats.fundsMobilised / 1000).toFixed(0)}k`} subLabel="This year" subLabelColor="bg-success" />
        <StatCard label="Update submission rate" value={mockPlatformStats.updateSubmissionRate.toString()} valueSuffix="%" subLabel="Portolio updates" />
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="card-bid">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-bid-light flex items-center justify-center">
              <Users className="w-3.5 h-3.5 text-bid" />
            </div>
            <span className="text-[12px] font-medium text-app-primary">Jobs Impact</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-app-secondary rounded-lg">
              <div className="text-[10px] text-app-tertiary">Total jobs</div>
              <div className="text-[20px] font-semibold text-app-primary font-mono-bid">{mockPlatformStats.jobsCreated}</div>
            </div>
            <div className="p-2 bg-app-secondary rounded-lg">
              <div className="text-[10px] text-app-tertiary">Women</div>
              <div className="text-[20px] font-semibold text-app-primary font-mono-bid">{mockPlatformStats.jobsWomen}</div>
            </div>
          </div>
        </div>
        <div className="card-bid">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-success-light flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5 text-success" />
            </div>
            <span className="text-[12px] font-medium text-app-primary">Funding Raised</span>
          </div>
          <div className="p-2 bg-app-secondary rounded-lg">
            <div className="text-[10px] text-app-tertiary">Total portfolio</div>
            <div className="text-[20px] font-semibold text-app-primary font-mono-bid">
              ${(mockPlatformStats.totalFundingRaised / 1000000).toFixed(1)}M
            </div>
          </div>
        </div>
        <div className="card-bid">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-info-light flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-info" />
            </div>
            <span className="text-[12px] font-medium text-app-primary">Program Performance</span>
          </div>
          <div className="p-2 bg-app-secondary rounded-lg">
            <div className="text-[10px] text-app-tertiary">Active entrepreneurs</div>
            <div className="text-[20px] font-semibold text-app-primary font-mono-bid">
              {mockPlatformStats.activeEntrepreneurs}/{mockPlatformStats.totalEntrepreneurs}
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-3">
        {/* Training by Cohort */}
        <div className="card-bid">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-medium text-app-primary">Training completion by cohort</span>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Cohort 3 (2022)', value: 88 },
              { label: 'Cohort 4 (2023)', value: 79 },
              { label: 'Cohort 5 (2024)', value: 71 },
              { label: 'Cohort 6 (2025)', value: 61 },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-2">
                <div className="text-[10px] text-app-secondary w-[100px] text-right flex-shrink-0">
                  {row.label}
                </div>
                <div className="flex-1 h-2 bg-app-secondary rounded overflow-hidden">
                  <div
                    className="h-full bg-bid rounded"
                    style={{ width: `${row.value}%` }}
                  />
                </div>
                <div className="text-[10px] text-app-secondary w-8 text-right font-mono-bid">
                  {row.value}%
                </div>
              </div>
            ))}
          </div>

          <div className="divider-bid" />

          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-medium text-app-primary">Funding raised by stage</span>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Stage 1', value: 380, percent: 18, color: 'bg-success' },
              { label: 'Stage 2', value: 1200, percent: 55, color: 'bg-info' },
              { label: 'Stage 3', value: 820, percent: 38, color: 'bg-bid' },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-2">
                <div className="text-[10px] text-app-secondary w-[100px] text-right flex-shrink-0">
                  {row.label}
                </div>
                <div className="flex-1 h-2 bg-app-secondary rounded overflow-hidden">
                  <div
                    className={`h-full rounded ${row.color}`}
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
                <div className="text-[10px] text-app-secondary w-12 text-right font-mono-bid">
                  ${row.value}k
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="card-bid">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-medium text-app-primary">Engagement metrics – Cohort 6</span>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Avg. login / week', value: 70, display: '3.5x' },
              { label: 'Video completion', value: 61, display: '61%' },
              { label: 'Deliverable on-time', value: 74, display: '74%' },
              { label: 'Session attendance', value: 82, display: '82%' },
              { label: 'Tool usage', value: 45, display: '45%', color: 'bg-info' },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-2">
                <div className="text-[10px] text-app-secondary w-[100px] text-right flex-shrink-0">
                  {row.label}
                </div>
                <div className="flex-1 h-2 bg-app-secondary rounded overflow-hidden">
                  <div
                    className={`h-full rounded ${row.color || 'bg-bid'}`}
                    style={{ width: `${row.value}%` }}
                  />
                </div>
                <div className="text-[10px] text-app-secondary w-8 text-right font-mono-bid">
                  {row.display}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Outcomes Summary */}
      <div className="card-bid">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-medium text-app-primary">Program performance</span>
          <Button variant="outline" className="h-6 text-[10px] px-2.5" onClick={() => toast.info('Exporting data...')}>
            Export CSV
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="table-bid">
            <thead>
              <tr>
                <th>Program</th>
                <th>Entrepreneurs</th>
                <th>Trainers</th>
                <th>Jobs created</th>
                <th>Women</th>
                <th>Men</th>
                <th>Funds mobilised</th>
              </tr>
            </thead>
            <tbody>
              {mockProgramStats.map((prog) => (
                <tr key={prog.programId}>
                  <td>{prog.programName}</td>
                  <td>{prog.entrepreneurs}</td>
                  <td>{prog.trainers}</td>
                  <td>{prog.jobsCreated}</td>
                  <td>{prog.jobsWomen}</td>
                  <td>{prog.jobsMen}</td>
                  <td>${(prog.fundsMobilised / 1000).toFixed(0)}k</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Overdue Updates */}
      <div className="card-bid border-l-[3px] border-l-warning rounded-r-[10px] rounded-l-none">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-warning" />
          <span className="text-[12px] font-medium text-app-primary">Overdue quarterly updates</span>
        </div>
        <div className="overflow-x-auto">
          <table className="table-bid">
            <thead>
              <tr>
                <th>Entrepreneur</th>
                <th>Program</th>
                <th>Last update</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mockOverdueUpdates.map((item) => (
                <tr key={item.entrepreneurId}>
                  <td>{item.name}</td>
                  <td>{item.program}</td>
                  <td>
                    <Badge variant="error" className="text-[9px]">
                      {item.lastUpdate}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline" className="h-6 text-[9px] px-2">
                      Send reminder
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
