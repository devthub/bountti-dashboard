import type React from 'react';

import { cn } from '@/lib/utils';

const statusStyles = {
  active: 'bg-bountti-green/15 text-green-800',
  approved: 'bg-bountti-green/15 text-green-800',
  pending: 'bg-bountti-amber/20 text-amber-800',
  review: 'bg-bountti-amber/20 text-amber-800',
  declined: 'bg-bountti-red/15 text-red-800',
  enabled: 'bg-bountti-cyan-light text-cyan-800',
  disabled: 'bg-muted text-muted-foreground',
  dark: 'bg-primary text-primary-foreground',
  neutral: 'bg-muted text-muted-foreground',
} as const;

type StatusBadgeProps = {
  children: React.ReactNode;
  tone?: keyof typeof statusStyles;
  className?: string;
};

export function StatusBadge({ children, tone = 'neutral', className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
        statusStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
