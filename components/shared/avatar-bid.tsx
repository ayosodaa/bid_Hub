'use client';

import { cn } from '@/lib/utils';

interface AvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'bid' | 'blue' | 'amber' | 'red' | 'green' | 'gray';
  className?: string;
}

const sizeStyles = {
  sm: 'w-6 h-6 text-[9px]',
  md: 'w-7 h-7 text-[9px]',
  lg: 'w-10 h-10 text-[11px]',
};

const colorStyles = {
  bid: 'bg-bid-light text-bid-dark',
  blue: 'bg-info-light text-info-foreground',
  amber: 'bg-warning-light text-warning-foreground',
  red: 'bg-error-light text-error-foreground',
  green: 'bg-success-light text-success-foreground',
  gray: 'bg-gray-light text-gray',
};

export function Avatar({ initials, size = 'md', colorScheme = 'bid', className }: AvatarProps) {
  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-semibold flex-shrink-0',
        sizeStyles[size],
        colorStyles[colorScheme],
        className
      )}
    >
      {initials}
    </div>
  );
}
