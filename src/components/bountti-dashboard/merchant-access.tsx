import { Plus, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { merchants } from '@/lib/bountti-dashboard-data';
import type { BounttiRole } from '@/lib/bountti-rbac';
import { hasBounttiPermission } from '@/lib/bountti-rbac';

import { StatusBadge } from './status-badge';

type MerchantAccessProps = {
  role: BounttiRole;
};

export function MerchantAccess({ role }: MerchantAccessProps) {
  const canManageSubUsers = hasBounttiPermission(role, 'merchants:manage-sub-users');
  const canViewAll = hasBounttiPermission(role, 'merchants:view-all');

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Merchant Access</h1>
          <p className="text-muted-foreground mt-1 text-sm">Merchant accounts, users, and read-only reporting</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <label className="bg-card text-muted-foreground flex h-9 w-72 items-center gap-2 rounded-lg border px-3">
            <Search className="size-4" />
            <input
              className="text-foreground w-full bg-transparent text-sm outline-none"
              placeholder="Search merchants..."
            />
          </label>
          <Button disabled={!canViewAll}>
            <Plus className="size-4" />
            Add Merchant
          </Button>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {merchants.map((merchant) => (
          <Card key={merchant.mid} className="ring-border rounded-xl">
            <CardHeader className="flex-row items-center justify-between border-b">
              <div>
                <CardTitle>{merchant.name}</CardTitle>
                <p className="text-muted-foreground text-xs">{merchant.source}</p>
              </div>
              <StatusBadge tone={merchant.status}>{merchant.status}</StatusBadge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 border-b pb-4">
                <Metric label="MID" value={merchant.mid} mono />
                <Metric label="MTD Volume" value={merchant.volume} mono />
                <Metric label="Approval Rate" value={merchant.approvalRate} tone="success" />
                <Metric
                  label="Chargeback Rate"
                  value={merchant.chargebackRate}
                  tone={merchant.status === 'review' ? 'danger' : undefined}
                />
              </div>

              <div>
                <div className="text-muted-foreground mb-3 text-xs font-semibold tracking-wide uppercase">
                  Sub-Users
                </div>
                {merchant.users.length > 0 ? (
                  <div className="space-y-2">
                    {merchant.users.map((subUser) => (
                      <div key={subUser.name} className="flex items-center gap-3 rounded-lg border p-3">
                        <div className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-full text-xs font-bold">
                          {subUser.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium">{subUser.name}</div>
                          <div className="text-muted-foreground text-xs">{subUser.role}</div>
                        </div>
                        <StatusBadge tone={subUser.status}>{subUser.status}</StatusBadge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground rounded-lg border border-dashed p-6 text-center text-sm">
                    No sub-users configured
                  </div>
                )}
                <Button disabled={!canManageSubUsers} variant="outline" size="sm" className="mt-3">
                  Manage sub-users
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  mono,
  tone,
}: {
  label: string;
  value: string;
  mono?: boolean;
  tone?: 'success' | 'danger';
}) {
  return (
    <div>
      <div className="text-muted-foreground mb-1 text-[11px] font-medium">{label}</div>
      <div
        className={
          mono
            ? 'font-mono text-xs'
            : tone === 'success'
              ? 'text-bountti-green text-sm font-semibold'
              : tone === 'danger'
                ? 'text-bountti-red text-sm font-semibold'
                : 'text-sm font-semibold'
        }
      >
        {value}
      </div>
    </div>
  );
}
