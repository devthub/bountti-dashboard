import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { affiliateStats } from '@/lib/bountti-dashboard-data';
import type { BounttiRole } from '@/lib/bountti-rbac';
import { hasBounttiPermission } from '@/lib/bountti-rbac';

import { StatCard } from './stat-card';

type AffiliatePortalProps = {
  role: BounttiRole;
};

export function AffiliatePortal({ role }: AffiliatePortalProps) {
  const canManage = hasBounttiPermission(role, 'affiliates:manage');

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Affiliate Portal</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Two-tier network · Grandchild hierarchy · All levels tracked
          </p>
        </div>
        <Button disabled={!canManage} className="bg-bountti-cyan text-bountti-dark hover:bg-bountti-cyan/90">
          <Plus className="size-4" />
          Add Affiliate
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {affiliateStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <Card className="ring-border rounded-xl">
        <CardHeader className="border-b">
          <CardTitle>Commission Models</CardTitle>
          <p className="text-muted-foreground text-xs">Applied per affiliate at onboarding</p>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="border-bountti-cyan bg-bountti-cyan-light rounded-xl border p-5">
            <div className="text-bountti-cyan mb-1 text-xs font-bold tracking-wider uppercase">RP+ Model</div>
            <div className="font-mono text-3xl font-bold">55%</div>
            <div className="text-muted-foreground mt-1 text-sm">Tier 1 commission</div>
            <div className="border-bountti-cyan-mid text-muted-foreground mt-4 border-t pt-3 text-sm">
              Tier 2: <strong className="text-foreground">10%</strong>
            </div>
          </div>
          <div className="rounded-xl border p-5">
            <div className="text-muted-foreground mb-1 text-xs font-bold tracking-wider uppercase">RP1 Model</div>
            <div className="font-mono text-3xl font-bold">25%</div>
            <div className="text-muted-foreground mt-1 text-sm">Tier 1 commission</div>
            <div className="text-muted-foreground mt-4 border-t pt-3 text-sm">
              Tier 2: <strong className="text-foreground">10%</strong>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="ring-border rounded-xl">
        <CardHeader className="border-b">
          <CardTitle>Network Tree</CardTitle>
          <p className="text-muted-foreground text-xs">L1 → L2 → L3 → Merchants</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <TreeNode label="Level 1 · RP+" name="Sara Kim" meta="3 L2s · 8 merchants · $186K" active />
            <TreeNode label="Level 1 · RP1" name="Marco Bianchi" meta="2 L2s · 5 merchants · $94K" />
          </div>
          <div className="border-bountti-cyan-mid ml-7 border-l-2 pl-6">
            <div className="flex flex-wrap gap-4">
              <TreeNode label="Level 2 · 10%" name="Raj Mehta" meta="2 L3s · 4 merchants · $62K" />
              <TreeNode label="Level 2 · 10%" name="Lena Vogel" meta="1 L3 · 3 merchants · $41K" />
            </div>
            <div className="border-border mt-4 border-l-2 pl-6">
              <div className="flex flex-wrap gap-4">
                <TreeNode label="Level 3 · 10%" name="Tom Fisher" meta="2 merchants · $18K" />
                <TreeNode label="Level 3 · 10%" name="Priya Nair" meta="1 merchant · $9K" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TreeNode({ label, name, meta, active }: { label: string; name: string; meta: string; active?: boolean }) {
  return (
    <div
      className={
        active
          ? 'border-bountti-cyan bg-bountti-cyan-light min-w-44 rounded-xl border p-4'
          : 'bg-card min-w-44 rounded-xl border p-4'
      }
    >
      <div className="text-muted-foreground mb-1 text-[10px] font-semibold tracking-wider uppercase">{label}</div>
      <div className="font-semibold">{name}</div>
      <div className="text-muted-foreground mt-1 text-xs">{meta}</div>
    </div>
  );
}
