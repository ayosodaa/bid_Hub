'use client';

import { StatCard, Badge, Avatar, ProgressBar } from '@/components/shared';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockEntrepreneurs } from '@/lib/mock-data';

export default function TrackerPage() {
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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-[16px] font-medium text-app-primary">Entrepreneur Tracker</h2>
          <p className="text-[11px] text-app-secondary mt-0.5">BID team view — cohort overview and lifecycle</p>
        </div>
        <Button className="bg-bid hover:bg-bid-dark text-white h-7 text-[11px]">
          + Add entrepreneur
        </Button>
      </div>

      {/* Stat Grid */}
      <div className="grid grid-cols-4 gap-2.5">
        <StatCard label="Active entrepreneurs" value="47" subLabel="3 cohorts" />
        <StatCard label="Avg. training" value="61" valueSuffix="%" />
        <StatCard label="Pending deliverables" value="23" className="[&>div:nth-child(2)]:text-bid" />
        <StatCard label="Sessions this month" value="18" />
      </div>

      {/* Entrepreneurs Table */}
      <div className="card-bid">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-medium text-app-primary">Cohort 6 · 2024</span>
          <div className="flex gap-1.5">
            <Select defaultValue="all-stages">
              <SelectTrigger className="h-7 text-[10px] w-auto px-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-stages">All stages</SelectItem>
                <SelectItem value="stage-1">Stage 1</SelectItem>
                <SelectItem value="stage-2">Stage 2</SelectItem>
                <SelectItem value="stage-3">Stage 3</SelectItem>
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
                <SelectItem value="healthtech">Healthtech</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table-bid">
            <thead>
              <tr>
                <th>Entrepreneur</th>
                <th>Business</th>
                <th>Sector</th>
                <th>Stage</th>
                <th>Training</th>
                <th>Deliverables</th>
                <th>Funding</th>
                <th>Last active</th>
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
                        colorScheme={
                          ent.sector === 'Fintech'
                            ? 'bid'
                            : ent.sector === 'Agritech'
                            ? 'blue'
                            : ent.sector === 'Healthtech'
                            ? 'amber'
                            : 'gray'
                        }
                      />
                      <span className="text-app-primary">{ent.firstName} {ent.lastName}</span>
                    </div>
                  </td>
                  <td className="text-app-primary">{ent.businessName}</td>
                  <td>
                    <Badge variant={sectorColors[ent.sector] || 'gray'}>{ent.sector}</Badge>
                  </td>
                  <td>
                    <Badge variant={stageColors[ent.stage] || 'bid'}>{ent.stage}</Badge>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <ProgressBar value={ent.trainingProgress} className="w-[65px]" />
                      <span className="text-app-secondary text-[10px]">{ent.trainingProgress}%</span>
                    </div>
                  </td>
                  <td className="text-app-primary">{ent.deliverablesCompleted}/{ent.deliverablesTotal}</td>
                  <td className="text-app-primary">${(ent.totalFundingRaised / 1000).toFixed(0)}k</td>
                  <td className="text-app-primary">{ent.lastActive}</td>
                  <td>
                    <Button variant="outline" className="h-6 text-[9px] px-2">
                      View
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
