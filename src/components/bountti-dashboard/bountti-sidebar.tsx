import { BarChart3, Boxes, Building2, ChevronRight, Gauge, Lock, Settings, ShieldCheck, Users } from 'lucide-react';
import type React from 'react';

import { bounttiNavSections } from '@/lib/bountti-dashboard-data';
import type { BounttiNavKey, BounttiRole } from '@/lib/bountti-rbac';
import { canAccessBounttiNav, getBounttiRoleConfig } from '@/lib/bountti-rbac';
import { cn } from '@/lib/utils';

const navIcons = {
  dashboard: Gauge,
  apm: Boxes,
  users: Users,
  affiliates: Users,
  merchants: Building2,
  reports: BarChart3,
  settings: Settings,
  permissions: ShieldCheck,
} satisfies Record<BounttiNavKey, React.ComponentType<{ className?: string }>>;

type BounttiSidebarProps = {
  role: BounttiRole;
  activePage: BounttiNavKey;
  onNavigate: (page: BounttiNavKey) => void;
};

export function BounttiSidebar({ role, activePage, onNavigate }: BounttiSidebarProps) {
  const roleConfig = getBounttiRoleConfig(role);

  return (
    <aside className="bg-sidebar text-sidebar-foreground flex h-dvh w-60 shrink-0 flex-col overflow-y-auto">
      <div className="border-sidebar-border flex items-center gap-2 border-b px-5 py-5">
        <div className="text-[22px] leading-none font-bold tracking-[-0.03em] text-white">
          boun<span className="text-bountti-cyan">t</span>ti
        </div>
        <ChevronRight className="size-5 text-white" strokeWidth={2.5} />
      </div>

      <div className="border-bountti-cyan/25 bg-bountti-cyan/10 mx-4 mt-3 flex items-center gap-2 rounded-md border px-3 py-2">
        <span className="bg-bountti-cyan size-2 rounded-full" />
        <span className="text-bountti-cyan text-[11px] font-semibold tracking-wide uppercase">{roleConfig.label}</span>
      </div>

      <nav className="flex-1 py-3">
        {bounttiNavSections.map((section) => (
          <div key={section.title} className="py-1">
            <div className="px-5 py-2 text-[10px] font-semibold tracking-[0.16em] text-white/25 uppercase">
              {section.title}
            </div>

            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = navIcons[item.key];
                const isAllowed = canAccessBounttiNav(role, item.key);
                const isActive = activePage === item.key;

                return (
                  <button
                    key={item.key}
                    type="button"
                    disabled={!isAllowed}
                    onClick={() => onNavigate(item.key)}
                    className={cn(
                      'relative flex w-full items-center gap-3 px-5 py-2.5 text-left text-[13px] transition-colors',
                      isActive &&
                        'bg-sidebar-accent text-sidebar-accent-foreground before:bg-bountti-cyan font-medium before:absolute before:inset-y-1 before:left-0 before:w-0.5 before:rounded-r',
                      !isActive && 'text-white/55 hover:bg-white/5 hover:text-white',
                      !isAllowed && 'cursor-not-allowed opacity-30 hover:bg-transparent hover:text-white/55',
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    {item.badge && isAllowed ? (
                      <span className="bg-bountti-cyan text-bountti-dark rounded-full px-1.5 py-0.5 text-[10px] font-bold">
                        {item.badge}
                      </span>
                    ) : null}
                    {!isAllowed ? <Lock className="size-3" /> : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-sidebar-border border-t p-4">
        <div className="flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-white/5">
          <div className="from-bountti-cyan flex size-8 items-center justify-center rounded-full bg-linear-to-br to-cyan-700 text-xs font-bold text-white">
            {roleConfig.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-semibold text-white">{roleConfig.displayName}</div>
            <div className="text-[11px] text-white/45">{roleConfig.label}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
