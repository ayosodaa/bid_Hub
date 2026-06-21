'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  size = 'sm',
  color = 'bg-bid',
  className,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('flex-1 bg-app-secondary rounded overflow-hidden', sizeStyles[size])}>
        <div
          className={cn('h-full rounded transition-all duration-300', color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-[10px] text-app-secondary min-w-[32px] text-right font-mono-bid">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}
