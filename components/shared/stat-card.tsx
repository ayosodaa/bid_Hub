'use client';

import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  subLabel?: string;
  subLabelColor?: string;
  valueSuffix?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  subLabel,
  subLabelColor = 'bg-bid',
  valueSuffix,
  className,
}: StatCardProps) {
  return (
    <div className={cn('stat-card-bid', className)}>
      <div className="text-[10px] text-app-secondary mb-1.5">{label}</div>
      <div className="text-[22px] font-medium leading-none text-app-primary">
        {value}
        {valueSuffix && (
          <span className="text-[13px] text-app-secondary ml-0.5">
            {valueSuffix}
          </span>
        )}
      </div>
      {subLabel && (
        <div className="text-[10px] text-app-secondary mt-1">
          <span className={cn('inline-block w-1.5 h-1.5 rounded-full mr-1', subLabelColor)} />
          {subLabel}
        </div>
      )}
    </div>
  );
}
