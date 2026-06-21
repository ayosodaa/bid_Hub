'use client';

import { useState } from 'react';
import { StatCard, Badge } from '@/components/shared';
import { mockPlatformStats, mockActivities, mockPendingActions, mockRecentlyJoined, mockEntrepreneurs } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { UserPlus, Clock, FileText, Users, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedEntrepreneur, setSelectedEntrepreneur] = useState<string | null>(null);

  const pendingActionItems = [
    { icon: FileText, label: 'Deliverables awaiting review', count: mockPendingActions.deliverablesAwaitingReview, variant: 'amber' as const },
    { icon: Users, label: 'Unassigned entrepreneurs', count: mockPendingActions.unassignedEntrepreneurs, variant: 'error' as const },
    { icon: AlertCircle, label: 'Tool requests pending', count: mockPendingActions.toolRequestsPending, variant: 'blue' as const },
    { icon: FileText, label: 'Documents to generate', count: mockPendingActions.documentsToGenerate, variant: 'gray' as const },
  ];

  const entrepreneursByStage = [
    { label: 'Idea', value: 13, percent: 28 },
    { label: 'Growth', value: 26, percent: 55 },
    { label: 'Scale', value: 8, percent: 17 },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-[16px] font-medium text-app-primary">Platform overview</h2>
        <p className="text-[11px] text-app-secondary mt-0.5">Live data across all cohorts and programs</p>
      </div>

      {/* Stat Grid */}
      <div className="grid grid-cols-4 gap-2.5">
        <StatCard
          label="Total entrepreneurs"
          value={mockPlatformStats.totalEntrepreneurs.toString()}
          subLabel={`${mockPlatformStats.activeEntrepreneurs} active`}
        />
        <StatCard
          label="Active trainers"
          value={mockPlatformStats.activeTrainers.toString()}
          subLabel="Across programs"
          subLabelColor="bg-info"
        />
        <StatCard
          label="Avg. training progress"
          value={mockPlatformStats.avgTrainingProgress.toString()}
          valueSuffix="%"
          subLabel="+8% vs last cohort"
          subLabelColor="bg-success"
        />
        <StatCard
          label="Unassigned"
          value={mockPlatformStats.unassignedEntrepreneurs.toString()}
          subLabel="Need assignment"
          subLabelColor="bg-warning"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-3">
        {/* Pending Actions */}
        <div className="card-bid">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-medium text-app-primary">Pending actions</span>
          </div>
          <div className="space-y-2">
            {pendingActionItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <item.icon className="w-3.5 h-3.5 text-app-tertiary" />
                  <span className="text-[11px] text-app-primary">{item.label}</span>
                </div>
                <Badge variant={item.variant}>{item.count}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Entrepreneurs by Stage */}
        <div className="card-bid">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-medium text-app-primary">Entrepreneurs by stage</span>
          </div>
          <div className="space-y-2">
            {entrepreneursByStage.map((row) => (
              <div key={row.label} className="flex items-center gap-2">
                <div className="text-[10px] text-app-secondary w-auto flex-shrink-0">
                  {row.label}
                </div>
                <div className="flex-1 h-2 bg-app-secondary rounded overflow-hidden">
                  <div
                    className="h-full bg-bid rounded"
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
                <div className="text-[10px] text-app-secondary w-8 text-right font-mono-bid">
                  {row.value}
                </div>
              </div>
            ))}
          </div>

          <div className="divider-bid" />

          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-medium text-app-primary">Impact metrics</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-app-secondary rounded-lg">
              <div className="text-[10px] text-app-tertiary">Jobs created</div>
              <div className="text-[18px] font-semibold text-app-primary font-mono-bid">{mockPlatformStats.jobsCreated}</div>
              <div className="text-[9px] text-app-tertiary">{mockPlatformStats.jobsWomen} women, {mockPlatformStats.jobsMen} men</div>
            </div>
            <div className="p-2 bg-app-secondary rounded-lg">
              <div className="text-[10px] text-app-tertiary">Funds mobilised</div>
              <div className="text-[18px] font-semibold text-app-primary font-mono-bid">${(mockPlatformStats.fundsMobilised / 1000).toFixed(0)}K</div>
              <div className="text-[9px] text-app-tertiary">By portfolio</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Joined */}
      <div className="card-bid">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-medium text-app-primary">Recently joined</span>
          <span className="text-[10px] text-app-tertiary">Last 7 days</span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-app-tertiary">
              <th className="text-[9px] font-medium text-app-tertiary text-left pb-2">NAME</th>
              <th className="text-[9px] font-medium text-app-tertiary text-left pb-2">BUSINESS</th>
              <th className="text-[9px] font-medium text-app-tertiary text-left pb-2">SOURCE</th>
              <th className="text-[9px] font-medium text-app-tertiary text-left pb-2">STATUS</th>
              <th className="text-[9px] font-medium text-app-tertiary text-right pb-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {mockRecentlyJoined.map((ent) => (
              <tr key={ent.id} className="border-b border-app-tertiary last:border-0">
                <td className="py-2.5 text-[11px] text-app-primary">{ent.name}</td>
                <td className="py-2.5 text-[11px] text-app-secondary">{ent.business}</td>
                <td className="py-2.5">
                  <span className="text-[10px] text-app-secondary">
                    {ent.source === 'self-registered' ? 'Self-registered' : 'Admin invited'}
                  </span>
                </td>
                <td className="py-2.5">
                  <Badge variant={ent.status === 'unassigned' ? 'error' : 'success'}>
                    {ent.status === 'unassigned' ? 'Unassigned' : 'Active'}
                  </Badge>
                </td>
                <td className="py-2.5 text-right">
                  {ent.status === 'unassigned' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-[10px] px-2 text-bid hover:text-bid hover:bg-bid/10"
                      onClick={() => {
                        setSelectedEntrepreneur(ent.id);
                        setShowAssignModal(true);
                      }}
                    >
                      <UserPlus className="w-3 h-3 mr-1" />
                      Assign
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Activity */}
      <div className="card-bid">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-medium text-app-primary">Recent activity</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {mockActivities.slice(0, 3).map((activity) => (
            <div key={activity.id} className="text-[11px] p-2.5 rounded-lg bg-app-secondary">
              <div className="text-[9px] text-app-tertiary font-mono-bid mb-0.5">{activity.timestamp}</div>
              {activity.title}
            </div>
          ))}
        </div>
      </div>

      {/* Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-5 w-[400px]">
            <h3 className="text-[14px] font-medium text-app-primary mb-4">Assign entrepreneur</h3>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-app-tertiary mb-1 block">Program</label>
                <select className="w-full h-8 px-2 text-[11px] border border-app-tertiary rounded bg-app-secondary">
                  <option>BID Accelerator – Cohort 6</option>
                  <option>Investment Readiness for Fintech</option>
                  <option>Women Economic Empowerment</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-app-tertiary mb-1 block">Trainer</label>
                <select className="w-full h-8 px-2 text-[11px] border border-app-tertiary rounded bg-app-secondary">
                  <option>Kofi Mensah (8/10)</option>
                  <option>Esi Adu (6/8)</option>
                  <option>James Tetteh (5/8)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" size="sm" onClick={() => setShowAssignModal(false)}>
                Cancel
              </Button>
              <Button size="sm" className="bg-bid text-white hover:bg-bid/90" onClick={() => setShowAssignModal(false)}>
                Assign
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
