import type { BounttiNavKey, BounttiRole } from '@/lib/bountti-rbac';

export type BounttiStatus = 'active' | 'approved' | 'pending' | 'review' | 'declined' | 'enabled' | 'disabled';

export type BounttiNavSection = {
  title: string;
  items: Array<{
    key: BounttiNavKey;
    label: string;
    badge?: string;
  }>;
};

export const bounttiNavSections: BounttiNavSection[] = [
  {
    title: 'Overview',
    items: [{ key: 'dashboard', label: 'Dashboard' }],
  },
  {
    title: 'Administration',
    items: [
      { key: 'apm', label: 'APM API Controls' },
      { key: 'users', label: 'User Management', badge: '12' },
    ],
  },
  {
    title: 'Affiliates',
    items: [{ key: 'affiliates', label: 'Affiliate Portal' }],
  },
  {
    title: 'Commerce',
    items: [{ key: 'merchants', label: 'Merchant Access' }],
  },
  {
    title: 'Analytics',
    items: [{ key: 'reports', label: 'Reports' }],
  },
  {
    title: 'System',
    items: [
      { key: 'settings', label: 'Settings' },
      { key: 'permissions', label: 'Permissions' },
    ],
  },
];

export const previewRoles: Array<{ value: BounttiRole; label: string }> = [
  { value: 'super-admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'affiliate-l1', label: 'Affiliate L1' },
  { value: 'affiliate-l2', label: 'Affiliate L2' },
  { value: 'affiliate-l3', label: 'Affiliate L3' },
  { value: 'merchant', label: 'Merchant' },
];

export const dashboardStats = [
  { label: 'Total Volume (MTD)', value: '$2.84M', change: '+18.4% vs last month', trend: 'up', highlight: true },
  { label: 'Active Merchants', value: '143', change: '+7 this month', trend: 'up' },
  { label: 'Affiliate Network', value: '67', change: '+12 this month', trend: 'up' },
  { label: 'Approval Rate', value: '96.2%', change: '-0.3% vs last week', trend: 'down' },
] as const;

export const recentTransactions = [
  { id: '#TXN-8841', merchant: 'Nordic Retail AB', amount: '€1,240.00', status: 'approved' },
  { id: '#TXN-8840', merchant: 'BlueOcean GmbH', amount: '€380.50', status: 'pending' },
  { id: '#TXN-8839', merchant: 'Solstice Shop', amount: '€92.00', status: 'approved' },
  { id: '#TXN-8838', merchant: 'UrbanPay Ltd', amount: '€4,500.00', status: 'declined' },
  { id: '#TXN-8837', merchant: 'Nordic Retail AB', amount: '€670.00', status: 'approved' },
] as const;

export const apmVolume = [
  { name: 'Visa / Mastercard', amount: '$1.42M', value: 64 },
  { name: 'Open Banking', amount: '$680K', value: 38 },
  { name: 'Apple Pay / Google Pay', amount: '$490K', value: 28 },
  { name: 'Crypto Rail', amount: '$190K', value: 12 },
] as const;

export const paymentMethods = [
  { icon: '💳', name: 'Card Processing', type: 'Visa · Mastercard · Amex', enabled: true },
  { icon: '🏦', name: 'Open Banking', type: 'PSD2 · SEPA · Faster Pay', enabled: true },
  { icon: '📱', name: 'Apple Pay', type: 'Wallet · NFC', enabled: true },
  { icon: '🔵', name: 'Google Pay', type: 'Wallet · Tap to Pay', enabled: true },
  { icon: '₿', name: 'Crypto Rail', type: 'BTC · ETH · USDC', enabled: false },
  { icon: '🧾', name: 'BNPL', type: 'Klarna · Afterpay', enabled: false },
] as const;

export const users = [
  {
    initials: 'JD',
    name: 'James Diaz',
    email: 'james@bountti.io',
    role: 'Admin',
    model: '—',
    status: 'active',
    joined: 'Jan 2025',
  },
  {
    initials: 'SK',
    name: 'Sara Kim',
    email: 'sara.kim@email.com',
    role: 'Affiliate L1',
    model: 'RP+ 55%',
    status: 'active',
    joined: 'Mar 2025',
  },
  {
    initials: 'RM',
    name: 'Raj Mehta',
    email: 'raj@growpartners.io',
    role: 'Affiliate L2',
    model: 'RP1 25%',
    status: 'active',
    joined: 'Apr 2025',
  },
  {
    initials: 'TF',
    name: 'Tom Fisher',
    email: 'tom@nordic.se',
    role: 'Affiliate L3',
    model: 'RP1 10%',
    status: 'pending',
    joined: 'May 2025',
  },
  {
    initials: 'NR',
    name: 'Nordic Retail AB',
    email: 'ops@nordic-retail.se',
    role: 'Merchant',
    model: '—',
    status: 'active',
    joined: 'Feb 2025',
  },
] as const;

export const affiliateStats = [
  { label: 'L1 Affiliates', value: '8', description: 'RP1: 4 · RP+: 4', highlight: true },
  { label: 'L2 Affiliates', value: '24', description: 'Earning 10% (both models)' },
  { label: 'L3 Affiliates', value: '35', description: 'End of chain' },
] as const;

export const merchants = [
  {
    name: 'Nordic Retail AB',
    source: 'Via Sara Kim (L1) · RP+',
    status: 'active',
    mid: 'MID-004421',
    volume: '€142,300',
    approvalRate: '97.1%',
    chargebackRate: '0.12%',
    users: [
      { initials: 'AH', name: 'Anna Holmberg', role: 'Owner · Full access', status: 'active' },
      { initials: 'PL', name: 'Per Lindgren', role: 'Finance · Reports only', status: 'active' },
    ],
  },
  {
    name: 'BlueOcean GmbH',
    source: 'Via Raj Mehta (L2) · RP1',
    status: 'review',
    mid: 'MID-004422',
    volume: '€38,100',
    approvalRate: '88.4%',
    chargebackRate: '1.84%',
    users: [],
  },
] as const;

export const commissionRows = [
  { affiliate: 'Sara Kim', level: 'L1', model: 'RP+ 55%', merchants: 8, volume: '$338K', commission: '$18,590' },
  { affiliate: 'Marco Bianchi', level: 'L1', model: 'RP1 25%', merchants: 5, volume: '$188K', commission: '$4,700' },
  { affiliate: 'Raj Mehta', level: 'L2', model: 'RP1 10%', merchants: 4, volume: '$98K', commission: '$9,800' },
  { affiliate: 'Tom Fisher', level: 'L3', model: 'RP1 10%', merchants: 2, volume: '$27K', commission: '$2,700' },
] as const;

export const permissionMatrix = [
  {
    group: 'Administration',
    rows: [
      { feature: 'APM API Controls', roles: ['super-admin', 'admin'] },
      { feature: 'Create Admin', roles: ['super-admin'] },
      { feature: 'Create Affiliate (any level)', roles: ['super-admin', 'admin'] },
    ],
  },
  {
    group: 'Affiliate Network',
    rows: [
      { feature: 'Recruit L2 Affiliate', roles: ['super-admin', 'admin', 'affiliate-l1'] },
      { feature: 'Recruit L3 Affiliate', roles: ['super-admin', 'admin', 'affiliate-l2'] },
      {
        feature: 'View own network tree',
        roles: ['super-admin', 'admin', 'affiliate-l1', 'affiliate-l2', 'affiliate-l3'],
      },
    ],
  },
  {
    group: 'Merchants',
    rows: [
      { feature: 'View all merchants', roles: ['super-admin', 'admin'] },
      {
        feature: 'View own merchants',
        roles: ['super-admin', 'admin', 'affiliate-l1', 'affiliate-l2', 'affiliate-l3'],
      },
      { feature: 'Merchant own dashboard', roles: ['merchant'] },
      { feature: 'Add merchant sub-users', roles: ['super-admin', 'admin', 'merchant'] },
    ],
  },
  {
    group: 'Reports & Settings',
    rows: [
      { feature: 'Full platform reports', roles: ['super-admin', 'admin'] },
      {
        feature: 'Own network reports',
        roles: ['super-admin', 'admin', 'affiliate-l1', 'affiliate-l2', 'affiliate-l3'],
      },
      { feature: 'Own transaction reports', roles: ['super-admin', 'admin', 'merchant'] },
      { feature: 'Platform settings', roles: ['super-admin', 'admin'] },
      {
        feature: 'Own profile / settings',
        roles: ['super-admin', 'admin', 'affiliate-l1', 'affiliate-l2', 'affiliate-l3', 'merchant'],
      },
    ],
  },
] satisfies Array<{
  group: string;
  rows: Array<{ feature: string; roles: BounttiRole[] }>;
}>;
