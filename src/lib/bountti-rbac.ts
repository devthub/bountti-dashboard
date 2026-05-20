export const BOUNTTI_ROLES = [
  "super-admin",
  "admin",
  "affiliate-l1",
  "affiliate-l2",
  "affiliate-l3",
  "merchant",
] as const;

export type BounttiRole = (typeof BOUNTTI_ROLES)[number];

export const BOUNTTI_PERMISSIONS = [
  "dashboard:view",
  "apm:view",
  "apm:manage",
  "users:view",
  "users:manage",
  "affiliates:view",
  "affiliates:manage",
  "merchants:view-all",
  "merchants:view-own",
  "merchants:manage-sub-users",
  "reports:view-platform",
  "reports:view-own-network",
  "reports:view-own-transactions",
  "settings:view",
  "settings:manage-platform",
  "permissions:view",
] as const;

export type BounttiPermission = (typeof BOUNTTI_PERMISSIONS)[number];

export type BounttiNavKey =
  | "dashboard"
  | "apm"
  | "users"
  | "affiliates"
  | "merchants"
  | "reports"
  | "settings"
  | "permissions";

export type BounttiRoleConfig = {
  label: string;
  initials: string;
  displayName: string;
  permissions: BounttiPermission[];
  nav: BounttiNavKey[];
};

const allPermissions: BounttiPermission[] = [...BOUNTTI_PERMISSIONS];

export const BOUNTTI_ROLE_CONFIG: Record<BounttiRole, BounttiRoleConfig> = {
  "super-admin": {
    label: "Super Admin",
    initials: "SA",
    displayName: "Alex Thornton",
    permissions: allPermissions,
    nav: [
      "dashboard",
      "apm",
      "users",
      "affiliates",
      "merchants",
      "reports",
      "settings",
      "permissions",
    ],
  },
  admin: {
    label: "Admin",
    initials: "AD",
    displayName: "James Diaz",
    permissions: [
      "dashboard:view",
      "apm:view",
      "apm:manage",
      "users:view",
      "users:manage",
      "affiliates:view",
      "affiliates:manage",
      "merchants:view-all",
      "merchants:view-own",
      "merchants:manage-sub-users",
      "reports:view-platform",
      "reports:view-own-network",
      "reports:view-own-transactions",
      "settings:view",
      "settings:manage-platform",
    ],
    nav: [
      "dashboard",
      "apm",
      "users",
      "affiliates",
      "merchants",
      "reports",
      "settings",
    ],
  },
  "affiliate-l1": {
    label: "Affiliate L1",
    initials: "L1",
    displayName: "Sara Kim",
    permissions: [
      "dashboard:view",
      "affiliates:view",
      "merchants:view-own",
      "reports:view-own-network",
      "settings:view",
    ],
    nav: ["dashboard", "affiliates", "merchants", "reports", "settings"],
  },
  "affiliate-l2": {
    label: "Affiliate L2",
    initials: "L2",
    displayName: "Raj Mehta",
    permissions: [
      "dashboard:view",
      "affiliates:view",
      "merchants:view-own",
      "reports:view-own-network",
      "settings:view",
    ],
    nav: ["dashboard", "affiliates", "merchants", "reports", "settings"],
  },
  "affiliate-l3": {
    label: "Affiliate L3",
    initials: "L3",
    displayName: "Tom Fisher",
    permissions: [
      "dashboard:view",
      "affiliates:view",
      "merchants:view-own",
      "reports:view-own-network",
      "settings:view",
    ],
    nav: ["dashboard", "affiliates", "merchants", "reports", "settings"],
  },
  merchant: {
    label: "Merchant",
    initials: "MR",
    displayName: "Nordic Retail AB",
    permissions: [
      "dashboard:view",
      "merchants:view-own",
      "reports:view-own-transactions",
      "settings:view",
    ],
    nav: ["dashboard", "merchants", "reports", "settings"],
  },
};

export function hasBounttiPermission(
  role: BounttiRole,
  permission: BounttiPermission,
) {
  return BOUNTTI_ROLE_CONFIG[role].permissions.includes(permission);
}

export function canAccessBounttiNav(role: BounttiRole, navKey: BounttiNavKey) {
  return BOUNTTI_ROLE_CONFIG[role].nav.includes(navKey);
}

export function getBounttiRoleConfig(role: BounttiRole) {
  return BOUNTTI_ROLE_CONFIG[role];
}
