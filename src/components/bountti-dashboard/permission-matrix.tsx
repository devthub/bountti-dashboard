import { Check, Minus } from 'lucide-react';

import { permissionMatrix, previewRoles } from '@/lib/bountti-dashboard-data';

export function PermissionMatrix() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Permission Matrix</h1>
        <p className="text-muted-foreground mt-1 text-sm">Grandchild access model · Role-based controls</p>
      </div>

      <div className="bg-card overflow-x-auto rounded-xl border">
        <table className="w-full min-w-225 border-collapse text-left text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="text-muted-foreground px-4 py-3 text-xs font-semibold tracking-wide uppercase">
                Feature / Action
              </th>
              {previewRoles.map((role) => (
                <th
                  key={role.value}
                  className="text-muted-foreground px-4 py-3 text-xs font-semibold tracking-wide uppercase"
                >
                  {role.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissionMatrix.map((group) => (
              <FragmentRows key={group.group} group={group} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FragmentRows({ group }: { group: (typeof permissionMatrix)[number] }) {
  return (
    <>
      <tr className="bg-muted/40">
        <td colSpan={7} className="text-muted-foreground px-4 py-2 text-xs font-bold tracking-wide uppercase">
          {group.group}
        </td>
      </tr>
      {group.rows.map((row) => (
        <tr key={row.feature} className="hover:bg-muted/30 border-t">
          <td className="px-4 py-3 font-medium">{row.feature}</td>
          {previewRoles.map((role) => {
            const allowed = row.roles.includes(role.value);
            return (
              <td key={role.value} className="px-4 py-3">
                {allowed ? (
                  <Check className="text-bountti-green size-4" />
                ) : (
                  <Minus className="text-muted-foreground/40 size-4" />
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}
