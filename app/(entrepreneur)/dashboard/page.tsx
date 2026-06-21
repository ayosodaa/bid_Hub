'use client';

import { StatCard, Badge, ProgressBar, Avatar } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { mockActivities, mockCalendarEvents } from '@/lib/mock-data';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function EntrepreneurDashboard() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-[16px] font-medium text-app-primary">Good morning, Amara 👋</h2>
          <p className="text-[11px] text-app-secondary mt-0.5">Your journey at a glance · April 2025</p>
        </div>
        <Link href="/training">
          <Button variant="outline" className="text-[11px] h-7">
            Continue learning →
          </Button>
        </Link>
      </div>

      {/* Stat Grid */}
      <div className="grid grid-cols-4 gap-2.5">
        <StatCard
          label="Training progress"
          value="68"
          valueSuffix="%"
          subLabel="17 of 25 modules"
        />
        <StatCard
          label="Deliverables"
          value="4/7"
          subLabel="3 pending"
          subLabelColor="bg-warning"
        />
        <StatCard
          label="Next session"
          value="Apr 14"
          subLabel="Mentor check-in"
          subLabelColor="bg-info"
        />
        <StatCard
          label="Business stage"
          value="Stage 2"
          subLabel="Growth phase"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-3">
        {/* Recent Activity */}
        <div className="card-bid">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-medium text-app-primary">Recent activity</span>
            <Badge variant="bid">Live</Badge>
          </div>
          <div className="space-y-0">
            {mockActivities.slice(0, 4).map((activity) => (
              <div key={activity.id} className="flex gap-2 py-2 border-b border-app-tertiary last:border-0">
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${
                    activity.type === 'training_completed'
                      ? 'bg-bid'
                      : activity.type === 'feedback_received'
                      ? 'bg-info'
                      : activity.type === 'deliverable_submitted'
                      ? 'bg-warning'
                      : 'bg-gray-400'
                  }`}
                />
                <div>
                  <div className="text-[11px] text-app-primary leading-relaxed">
                    {activity.title}
                  </div>
                  <div className="text-[9px] text-app-tertiary font-mono-bid mt-0.5">
                    {activity.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress by Track */}
        <div className="card-bid">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-medium text-app-primary">Progress by track</span>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-3">
            <div>
              <div className="text-[9px] text-app-tertiary mb-1">Foundations</div>
              <ProgressBar value={100} color="bg-bid" />
            </div>
            <div>
              <div className="text-[9px] text-app-tertiary mb-1">Business Model</div>
              <ProgressBar value={80} color="bg-bid" />
            </div>
            <div>
              <div className="text-[9px] text-app-tertiary mb-1">Fundraising</div>
              <ProgressBar value={40} color="bg-bid" />
            </div>
            <div>
              <div className="text-[9px] text-app-tertiary mb-1">Operations</div>
              <ProgressBar value={15} color="bg-bid" />
            </div>
          </div>

          <div className="divider-bid" />

          <div className="text-[12px] font-medium text-app-primary mb-2">Monthly logins</div>
          <div className="flex items-end gap-1 h-[70px]">
            {[
              { month: 'Nov', value: 35 },
              { month: 'Dec', value: 55 },
              { month: 'Jan', value: 45 },
              { month: 'Feb', value: 72 },
              { month: 'Mar', value: 88 },
              { month: 'Apr', value: 60, current: true },
            ].map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-full rounded-t cursor-pointer transition-colors ${
                    item.current ? 'bg-bid' : 'bg-bid-light hover:bg-bid'
                  }`}
                  style={{ height: `${item.value}%` }}
                />
                <div className="text-[8px] text-app-tertiary mt-1 font-mono-bid">{item.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming */}
      <div className="card-bid">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-medium text-app-primary">Upcoming</span>
          <Link href="/schedule">
            <Button variant="outline" className="text-[10px] h-6 px-2.5">
              View all
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {mockCalendarEvents.slice(0, 3).map((event) => (
            <div
              key={event.id}
              className={`px-3 py-2.5 rounded-lg border-l-[3px] bg-app-secondary ${
                event.type === 'session'
                  ? 'border-l-bid'
                  : event.type === 'office_hours'
                  ? 'border-l-info'
                  : 'border-l-warning'
              }`}
            >
              <div className="text-[10px] text-app-secondary font-mono-bid mb-0.5">
                {event.date} {event.time && `· ${event.time}${event.endTime ? `–${event.endTime}` : ''}`}
              </div>
              <div className="text-[11px] font-medium text-app-primary">{event.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
