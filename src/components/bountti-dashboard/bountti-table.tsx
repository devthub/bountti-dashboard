import type React from 'react';

import { cn } from '@/lib/utils';

type BounttiTableProps = {
  headers: string[];
  children: React.ReactNode;
  className?: string;
};

export function BounttiTable({ headers, children, className }: BounttiTableProps) {
  return (
    <div className={cn('bg-card overflow-hidden rounded-xl border', className)}>
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-muted/50 border-b">
            {headers.map((header) => (
              <th
                key={header}
                className="text-muted-foreground px-5 py-3 text-xs font-semibold tracking-wide uppercase"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-border divide-y">{children}</tbody>
      </table>
    </div>
  );
}
