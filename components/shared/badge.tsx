'use client';

import { cn } from '@/lib/utils';

type BadgeVariant =
  | 'bid'
  | 'amber'
  | 'blue'
  | 'gray'
  | 'red'
  | 'green'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  bid: 'bg-bid-light text-bid-dark',
  amber: 'bg-warning-light text-warning-foreground',
  blue: 'bg-info-light text-info-foreground',
  gray: 'bg-gray-light text-gray',
  red: 'bg-error-light text-error-foreground',
  green: 'bg-success-light text-success-foreground',
  info: 'bg-info-light text-info-foreground',
  success: 'bg-success-light text-success-foreground',
  warning: 'bg-warning-light text-warning-foreground',
  error: 'bg-error-light text-error-foreground',
};

export function Badge({ children, variant = 'bid', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
