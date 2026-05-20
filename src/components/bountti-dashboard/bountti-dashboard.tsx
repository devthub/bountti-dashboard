"use client";

import { useMemo, useState } from "react";

import type { BounttiNavKey, BounttiRole } from "@/lib/bountti-rbac";
import { canAccessBounttiNav } from "@/lib/bountti-rbac";

import { AffiliatePortal } from "./affiliate-portal";
import { ApmControls } from "./apm-controls";
import { BounttiSidebar } from "./bountti-sidebar";
import { BounttiTopbar } from "./bountti-topbar";
import { DashboardOverview } from "./dashboard-overview";
import { MerchantAccess } from "./merchant-access";
import { PermissionMatrix } from "./permission-matrix";
import { ReportsPage } from "./reports-page";
import { SettingsPage } from "./settings-page";
import { UserManagement } from "./user-management";

const defaultPageByRole = {
  "super-admin": "dashboard",
  admin: "dashboard",
  "affiliate-l1": "dashboard",
  "affiliate-l2": "dashboard",
  "affiliate-l3": "dashboard",
  merchant: "dashboard",
} satisfies Record<BounttiRole, BounttiNavKey>;

export function BounttiDashboard() {
  const [role, setRole] = useState<BounttiRole>("super-admin");
  const [activePage, setActivePage] = useState<BounttiNavKey>("dashboard");
  const [activeTool, setActiveTool] = useState("Overview");

  const safeActivePage = useMemo(() => {
    if (canAccessBounttiNav(role, activePage)) {
      return activePage;
    }

    return defaultPageByRole[role];
  }, [activePage, role]);

  function handleRoleChange(nextRole: BounttiRole) {
    setRole(nextRole);
    setActivePage((currentPage) =>
      canAccessBounttiNav(nextRole, currentPage)
        ? currentPage
        : defaultPageByRole[nextRole],
    );
  }

  return (
    <div className="bg-background text-foreground flex h-dvh overflow-hidden">
      <BounttiSidebar
        role={role}
        activePage={safeActivePage}
        onNavigate={setActivePage}
      />
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <BounttiTopbar
          role={role}
          onRoleChange={handleRoleChange}
          activeTool={activeTool}
          onToolChange={setActiveTool}
        />
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1680px] space-y-6 px-6 py-6 lg:px-7 lg:py-7">
            {safeActivePage === "dashboard" ? <DashboardOverview /> : null}
            {safeActivePage === "apm" ? <ApmControls /> : null}
            {safeActivePage === "users" ? <UserManagement role={role} /> : null}
            {safeActivePage === "affiliates" ? (
              <AffiliatePortal role={role} />
            ) : null}
            {safeActivePage === "merchants" ? (
              <MerchantAccess role={role} />
            ) : null}
            {safeActivePage === "reports" ? <ReportsPage /> : null}
            {safeActivePage === "settings" ? (
              <SettingsPage role={role} />
            ) : null}
            {safeActivePage === "permissions" ? <PermissionMatrix /> : null}
          </div>
        </div>
      </main>
    </div>
  );
}
