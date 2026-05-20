import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { users } from "@/lib/bountti-dashboard-data";
import type { BounttiRole } from "@/lib/bountti-rbac";
import { hasBounttiPermission } from "@/lib/bountti-rbac";

import { BounttiTable } from "./bountti-table";
import { StatusBadge } from "./status-badge";

type UserManagementProps = {
  role: BounttiRole;
};

export function UserManagement({ role }: UserManagementProps) {
  const canManage = hasBounttiPermission(role, "users:manage");

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Create and manage platform users across all roles
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <label className="bg-card text-muted-foreground flex h-9 w-72 items-center gap-2 rounded-lg border px-3">
            <Search className="size-4" />
            <input
              className="text-foreground w-full bg-transparent text-sm outline-none"
              placeholder="Search users..."
            />
          </label>
          <Button
            disabled={!canManage}
            className="bg-bountti-cyan text-bountti-dark hover:bg-bountti-cyan/90"
          >
            <Plus className="size-4" />
            Invite User
          </Button>
        </div>
      </div>

      <div className="bg-card overflow-hidden rounded-xl border">
        <div className="flex gap-0 border-b">
          {[
            "All Users (12)",
            "Admins (2)",
            "Affiliates (6)",
            "Merchants (4)",
          ].map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={
                index === 0
                  ? "border-bountti-cyan text-bountti-cyan border-b-2 px-5 py-3 text-sm font-medium"
                  : "text-muted-foreground hover:text-foreground px-5 py-3 text-sm font-medium"
              }
            >
              {tab}
            </button>
          ))}
        </div>
        <BounttiTable
          headers={["Name", "Email", "Role", "Model", "Status", "Joined"]}
          className="rounded-none border-0"
        >
          {users.map((user) => (
            <tr key={user.email} className="hover:bg-muted/40">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="bg-muted text-muted-foreground flex size-8 items-center justify-center rounded-full text-xs font-bold">
                    {user.initials}
                  </div>
                  <span>{user.name}</span>
                </div>
              </td>
              <td className="text-muted-foreground px-5 py-3">{user.email}</td>
              <td className="px-5 py-3">
                <StatusBadge tone={user.role === "Admin" ? "dark" : "neutral"}>
                  {user.role}
                </StatusBadge>
              </td>
              <td className="px-5 py-3">{user.model}</td>
              <td className="px-5 py-3">
                <StatusBadge tone={user.status}>{user.status}</StatusBadge>
              </td>
              <td className="text-muted-foreground px-5 py-3">{user.joined}</td>
            </tr>
          ))}
        </BounttiTable>
      </div>
    </div>
  );
}
