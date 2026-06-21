'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  LayoutDashboard,
  Timer,
  BarChart3,
  Calculator,
  FileText,
  Target,
} from 'lucide-react';

const tools = [
  {
    id: 'bmc',
    name: 'Business Model Canvas',
    description: 'Build and iterate on your BMC. Export to PDF when ready.',
    icon: LayoutDashboard,
  },
  {
    id: 'financial',
    name: 'Financial Model Builder',
    description: 'Guided 3-year model with revenue projections and burn rate.',
    icon: FileText,
  },
  {
    id: 'pitch-timer',
    name: 'Pitch Timer',
    description: 'Practice your investor pitch with structured timing cues.',
    icon: Timer,
  },
  {
    id: 'pitch-scorer',
    name: 'Pitch Deck Scorer',
    description: 'Self-assess against BID&apos;s investor-readiness checklist.',
    icon: BarChart3,
  },
  {
    id: 'market-sizing',
    name: 'Market Sizing Calculator',
    description: 'Estimate TAM, SAM and SOM with auto-calculations.',
    icon: Calculator,
  },
  {
    id: 'goals',
    name: 'Goal Tracker',
    description: 'Set quarterly goals and share progress with your mentor.',
    icon: Target,
  },
];

export default function ToolsPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-[16px] font-medium text-app-primary">Entrepreneur Tools</h2>
        <p className="text-[11px] text-app-secondary mt-0.5">Interactive tools available directly on the platform</p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        {tools.map((tool) => (
          <Card
            key={tool.id}
            className="border border-app-tertiary rounded-[10px] p-4 cursor-pointer hover:border-bid transition-colors"
          >
            <CardContent className="p-0">
              <div className="w-9 h-9 rounded-lg bg-bid-light flex items-center justify-center mb-2.5">
                <tool.icon className="w-4.5 h-4.5 text-bid stroke-[1.5]" />
              </div>
              <div className="text-[12px] font-medium text-app-primary mb-1">{tool.name}</div>
              <div className="text-[10px] text-app-secondary leading-relaxed">{tool.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
