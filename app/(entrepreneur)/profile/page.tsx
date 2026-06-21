'use client';

import { Badge, StatCard } from '@/components/shared';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockFundingRounds, mockEntrepreneurs } from '@/lib/mock-data';
import { toast } from 'sonner';
import { useState } from 'react';
import { Users, DollarSign, Target } from 'lucide-react';

export default function ProfilePage() {
  const [focusAreas, setFocusAreas] = useState<string[]>(['Product', 'Fundraising', 'Fintech']);

  const allFocusAreas = ['Product', 'Fundraising', 'Fintech', 'Marketing', 'Operations', 'Legal'];

  const toggleFocusArea = (area: string) => {
    setFocusAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const entrepreneur = mockEntrepreneurs[0];

  return (
    <div className="space-y-4">
      {/* Profile Banner */}
      <div className="bg-bid rounded-[10px] p-5 text-white flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-[16px] font-semibold flex-shrink-0">
          {entrepreneur.firstName[0]}{entrepreneur.lastName[0]}
        </div>
        <div className="flex-1">
          <div className="text-[16px] font-semibold">{entrepreneur.firstName} {entrepreneur.lastName}</div>
          <div className="text-[11px] opacity-80">{entrepreneur.stage} Phase · {entrepreneur.sector} · {entrepreneur.city || entrepreneur.country}</div>
          <div className="flex gap-2 mt-2">
            <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-[10px]">{entrepreneur.cohortName}</span>
            <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-[10px]">{entrepreneur.goalType}</span>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="text-center">
            <div className="text-[18px] font-semibold">${(entrepreneur.totalFundingRaised / 1000).toFixed(0)}k</div>
            <div className="text-[9px] opacity-70 mt-0.5">Raised</div>
          </div>
          <div className="text-center">
            <div className="text-[18px] font-semibold">{entrepreneur.trainingProgress}%</div>
            <div className="text-[9px] opacity-70 mt-0.5">Training</div>
          </div>
          <div className="text-center">
            <div className="text-[18px] font-semibold">{entrepreneur.deliverablesCompleted}/{entrepreneur.deliverablesTotal}</div>
            <div className="text-[9px] opacity-70 mt-0.5">Delivered</div>
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="card-bid">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-info" />
            <span className="text-[11px] font-medium text-app-primary">Jobs Created</span>
          </div>
          <div className="text-[24px] font-semibold text-app-primary font-mono-bid">{entrepreneur.jobsCreated || 0}</div>
          <div className="text-[9px] text-app-tertiary mt-1">{entrepreneur.jobsWomen || 0} women, {entrepreneur.jobsMen || 0} men</div>
        </div>
        <div className="card-bid">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-success" />
            <span className="text-[11px] font-medium text-app-primary">Funds Mobilised</span>
          </div>
          <div className="text-[24px] font-semibold text-app-primary font-mono-bid">${((entrepreneur.fundsMobilised || 0) / 1000).toFixed(0)}k</div>
          <div className="text-[9px] text-app-tertiary mt-1">This year</div>
        </div>
        <div className="card-bid">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-bid" />
            <span className="text-[11px] font-medium text-app-primary">Funding Goal</span>
          </div>
          <div className="text-[24px] font-semibold text-app-primary font-mono-bid">
            {entrepreneur.goalAmount ? `$${(entrepreneur.goalAmount / 1000).toFixed(0)}k` : '—'}
          </div>
          <div className="text-[9px] text-app-tertiary mt-1">{entrepreneur.goalType}</div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-3">
        {/* Business Details */}
        <Card className="border border-app-tertiary rounded-[10px]">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[12px] font-medium text-app-primary">Business details</CardTitle>
              <Button variant="outline" className="text-[10px] h-6 px-2.5">
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Business name</Label>
              <Input defaultValue="PayBridge Africa Ltd" className="h-8 text-[11px]" />
            </div>
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
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Stage</Label>
              <Select defaultValue="Growth">
                <SelectTrigger className="h-8 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Idea">Idea</SelectItem>
                  <SelectItem value="Early stage">Early stage</SelectItem>
                  <SelectItem value="Growth">Growth</SelectItem>
                  <SelectItem value="Scale">Scale</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-medium text-app-secondary">Total funding raised (USD)</Label>
              <Input defaultValue="$120,000" className="h-8 text-[11px]" />
            </div>
            <Button
              className="w-full bg-bid hover:bg-bid-dark text-white h-8 text-[11px]"
              onClick={() => toast.success('Profile saved!')}
            >
              Save changes
            </Button>
          </CardContent>
        </Card>

        {/* Fundraising History */}
        <Card className="border border-app-tertiary rounded-[10px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-[12px] font-medium text-app-primary">Fundraising history</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="table-bid">
                <thead>
                  <tr>
                    <th>Round</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockFundingRounds.map((round) => (
                    <tr key={round.id}>
                      <td className="text-app-primary">{round.round}</td>
                      <td className="text-app-primary">{round.amount ? `$${(round.amount / 1000).toFixed(0)}k` : '—'}</td>
                      <td className="text-app-primary">{round.date}</td>
                      <td>
                        <Badge variant={round.status === 'closed' ? 'bid' : 'amber'}>
                          {round.status === 'closed' ? 'Closed' : 'Planning'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divider-bid" />

            <div className="text-[12px] font-medium text-app-primary mb-2">Key focus areas</div>
            <div className="flex flex-wrap gap-1.5">
              {allFocusAreas.map((area) => (
                <button
                  key={area}
                  onClick={() => toggleFocusArea(area)}
                  className={`px-2.5 py-1 rounded-full text-[10px] border transition-all ${
                    focusAreas.includes(area)
                      ? 'bg-bid text-white border-bid'
                      : 'border-app-secondary text-app-secondary hover:bg-app-secondary'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
