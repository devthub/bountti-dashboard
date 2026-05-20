import { Bell, BookOpen, Grid2X2, LifeBuoy, MonitorPause, Radio, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { previewRoles } from '@/lib/bountti-dashboard-data';
import type { BounttiRole } from '@/lib/bountti-rbac';
import { cn } from '@/lib/utils';

const tools = [
  { label: 'Overview', icon: Grid2X2 },
  { label: 'Live Transactions', icon: Radio },
  { label: 'Monitoring', icon: MonitorPause },
  { label: 'API Docs', icon: BookOpen },
  { label: 'Support', icon: LifeBuoy },
] as const;

type BounttiTopbarProps = {
  role: BounttiRole;
  onRoleChange: (role: BounttiRole) => void;
  activeTool: string;
  onToolChange: (tool: string) => void;
};

export function BounttiTopbar({ role, onRoleChange, activeTool, onToolChange }: BounttiTopbarProps) {
  return (
    <header className="bg-card flex h-[60px] shrink-0 items-center gap-2 border-b px-6">
      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.label;

          return (
            <Button
              key={tool.label}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onToolChange(tool.label)}
              className={cn(
                'text-muted-foreground h-8 gap-2',
                isActive &&
                  'bg-bountti-cyan-light text-bountti-cyan hover:bg-bountti-cyan-light hover:text-bountti-cyan',
              )}
            >
              <Icon className="size-4" />
              {tool.label}
            </Button>
          );
        })}
      </div>

      <div className="ml-auto flex items-center gap-3">
        <label className="bg-background text-muted-foreground flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium">
          <User className="size-3.5" />
          <span className="hidden sm:inline">Preview as:</span>
          <select
            value={role}
            onChange={(event) => onRoleChange(event.target.value as BounttiRole)}
            className="text-foreground bg-transparent text-xs font-semibold outline-none"
          >
            {previewRoles.map((previewRole) => (
              <option key={previewRole.value} value={previewRole.value}>
                {previewRole.label}
              </option>
            ))}
          </select>
        </label>

        <Button type="button" variant="outline" size="icon-lg" className="relative">
          <Bell className="size-4" />
          <span className="border-card bg-bountti-cyan absolute top-1.5 right-1.5 size-2 rounded-full border" />
        </Button>
      </div>
    </header>
  );
}
