'use client';

import { Badge } from '@/components/shared';
import { mockModules } from '@/lib/mock-data';
import { Play } from 'lucide-react';
import { useState } from 'react';

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'in_progress' | 'completed'>('all');

  const trackColors: Record<string, string> = {
    Foundations: 'bg-bid-light text-bid-dark',
    'Business Model': 'bg-warning-light text-warning-foreground',
    Fundraising: 'bg-error-light text-error-foreground',
    Operations: 'bg-success-light text-success-foreground',
    Legal: 'bg-gray-light text-gray',
  };

  const progressColors: Record<string, string> = {
    completed: 'bg-bid-light text-bid-dark',
    'in-progress': 'bg-warning-light text-warning-foreground',
    'not-started': 'bg-gray-light text-gray',
  };

  const thumbColors: Record<string, string> = {
    Foundations: 'bg-bid-light',
    'Business Model': 'bg-warning-light',
    Fundraising: 'bg-error-light',
    Operations: 'bg-success-light',
    Legal: 'bg-gray-light',
  };

  const playColors: Record<string, string> = {
    Foundations: 'bg-bid',
    'Business Model': 'bg-warning',
    Fundraising: 'bg-error',
    Operations: 'bg-success',
    Legal: 'bg-gray',
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-[16px] font-medium text-app-primary">Training Library</h2>
        <p className="text-[11px] text-app-secondary mt-0.5">On-demand video modules for your programme</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 bg-app-secondary rounded-lg p-0.5 w-fit">
        {(['all', 'in_progress', 'completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-md text-[11px] transition-all ${
              activeTab === tab
                ? 'bg-app-primary text-app-primary font-medium border border-app-tertiary'
                : 'text-app-secondary hover:text-app-primary'
            }`}
          >
            {tab === 'all' ? 'All' : tab === 'in_progress' ? 'In progress' : 'Completed'}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-3 gap-3">
        {mockModules.map((module) => {
          const rate = module.completionRate || 0;
          const progress = rate === 100 ? 'completed' : rate > 0 ? 'in-progress' : 'not-started';
          const isDisabled = progress === 'not-started';

          return (
            <div
              key={module.id}
              className={`bg-app-primary border border-app-tertiary rounded-[10px] overflow-hidden cursor-pointer transition-all hover:border-bid ${
                isDisabled ? 'opacity-75' : ''
              }`}
            >
              {/* Thumbnail */}
              <div
                className={`h-[88px] flex items-center justify-center relative ${thumbColors[module.track || ''] || 'bg-gray-light'}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${playColors[module.track || ''] || 'bg-gray'}`}
                >
                  <Play className="w-3 h-3 text-white ml-0.5" fill="white" />
                </div>
                {module.duration !== '—' && (
                  <span className="absolute bottom-1.5 right-1.5 text-[9px] bg-black/40 text-white px-1.5 py-0.5 rounded font-mono-bid">
                    {module.duration}
                  </span>
                )}
              </div>

              {/* Meta */}
              <div className="p-2.5">
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${trackColors[module.track || ''] || 'bg-gray-light text-gray'}`}>
                  {module.track}
                </span>
                <div className="text-[11px] font-medium mt-1.5 mb-1 leading-relaxed text-app-primary">
                  {module.title}
                </div>
                <Badge
                  variant={
                    progress === 'completed'
                      ? 'bid'
                      : progress === 'in-progress'
                      ? 'amber'
                      : 'gray'
                  }
                  className="text-[9px]"
                >
                  {progress === 'completed'
                    ? 'Completed'
                    : progress === 'in-progress'
                    ? `In progress · ${rate}%`
                    : 'Not started'}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
