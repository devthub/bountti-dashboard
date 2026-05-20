import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { BounttiRole } from '@/lib/bountti-rbac';
import { hasBounttiPermission } from '@/lib/bountti-rbac';

type SettingsPageProps = {
  role: BounttiRole;
};

export function SettingsPage({ role }: SettingsPageProps) {
  const canManagePlatform = hasBounttiPermission(role, 'settings:manage-platform');

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1 text-sm">Platform configuration and preferences</p>
        </div>
        <Button disabled={!canManagePlatform} className="bg-bountti-cyan text-bountti-dark hover:bg-bountti-cyan/90">
          Save Changes
        </Button>
      </div>

      <Card className="ring-border grid overflow-hidden rounded-xl lg:grid-cols-[220px_1fr]">
        <div className="border-b p-4 lg:border-r lg:border-b-0">
          {[
            'Company Profile',
            'Branding',
            'Notifications',
            'Billing & Fees',
            'Compliance / KYC',
            'Webhooks',
            'Security & 2FA',
            'Danger Zone',
          ].map((item, index) => (
            <button
              key={item}
              type="button"
              className={
                index === 0
                  ? 'bg-bountti-cyan-light text-bountti-cyan w-full rounded-lg px-4 py-2 text-left text-sm font-semibold'
                  : item === 'Danger Zone'
                    ? 'text-bountti-red hover:bg-muted w-full rounded-lg px-4 py-2 text-left text-sm'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground w-full rounded-lg px-4 py-2 text-left text-sm'
              }
            >
              {item}
            </button>
          ))}
        </div>

        <div className="space-y-5 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Company Name" value="Bountti Ltd" disabled={!canManagePlatform} />
            <Field label="Registration Number" value="IE-2024-88411" disabled={!canManagePlatform} />
            <Field label="Support Email" value="support@bountti.io" disabled={!canManagePlatform} />
            <Field label="Billing Currency" value="EUR" disabled={!canManagePlatform} />
          </div>
          <Field label="Platform Domain" value="https://app.bountti.io" disabled={!canManagePlatform} />

          <div className="border-t pt-5">
            <h2 className="mb-4 text-sm font-semibold">Default Commission Thresholds</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="RP+ Rate (L1)" value="55%" disabled={!canManagePlatform} />
              <Field label="RP1 Rate (L1)" value="25%" disabled={!canManagePlatform} />
            </div>
            <div className="mt-4 max-w-md">
              <Field label="Tier 2 Rate (L2 / L3 — both models)" value="10%" disabled={!canManagePlatform} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Field({ label, value, disabled }: { label: string; value: string; disabled: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold">{label}</span>
      <input
        disabled={disabled}
        defaultValue={value}
        className="bg-background focus:border-bountti-cyan h-10 w-full rounded-lg border px-3 text-sm transition-colors outline-none disabled:opacity-70"
      />
    </label>
  );
}
