// ── Brand colours ─────────────────────────────────────────────────────────────
export const C = {
  dark:   '#0F172A',
  blue:   '#2563eb',
  mint:   '#10b981',
  bg:     '#f8fafc',
  card:   '#ffffff',
  border: '#e2e8f0',
  muted:  '#64748b',
  subtle: '#94a3b8',
};

// ── Feature cards ─────────────────────────────────────────────────────────────
export const FEATURES = [
  {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>`,
    tag: 'Catalogue',
    title: 'Style Catalogue',
    desc: 'Store every style with 30+ fashion-specific fields — fabric, fit, occasion, measurements, and more.',
  },
  {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>`,
    tag: 'Import',
    title: 'Bulk CSV Import',
    desc: 'Upload thousands of styles in one go. Re-importing the same Style Number updates — never duplicates.',
  },
  {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z"/>`,
    tag: 'Flexible',
    title: 'Dynamic Fields',
    desc: 'New CSV column headers auto-register as field definitions. Adapt your data model on the fly.',
  },
  {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>`,
    tag: 'Multi-tenant',
    title: 'Multi-Brand Ready',
    desc: 'Each company gets a fully isolated workspace. Data never crosses between tenants.',
  },
  {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>`,
    tag: 'Security',
    title: 'Secure by Default',
    desc: 'JWT auth, HTTP-only cookies, bcrypt passwords, rate limiting, and per-request subscription checks.',
  },
  {
    icon: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>`,
    tag: 'Admin',
    title: 'Admin Dashboard',
    desc: 'Manage subscription plans, field definitions, and user access from a single clean panel.',
  },
];

// ── How it works steps ────────────────────────────────────────────────────────
export const STEPS = [
  { n: '01', title: 'Register & get 3 days free',  desc: 'Create your account in 30 seconds. Full access from day one — no credit card.' },
  { n: '02', title: 'Upload your CSV',              desc: 'Export from Excel, drop the file, and every column becomes a searchable field automatically.' },
  { n: '03', title: 'Browse & manage styles',       desc: 'Search by style number, filter by attributes, keep your catalogue in sync.' },
  { n: '04', title: 'Upgrade when ready',           desc: 'Choose monthly or lifetime. Admin activates your plan after payment.' },
];

// ── Pricing plans ─────────────────────────────────────────────────────────────
export const PRICING_PLANS = [
  {
    label:    'Free Trial',
    price:    '₹0',
    duration: '3 days',
    tag:      '',
    accent:   false,
    features: ['Full platform access', 'CSV import', 'Dynamic fields', 'No credit card'],
  },
  {
    label:    'Monthly',
    price:    '₹999',
    duration: 'per month',
    tag:      'Most Popular',
    accent:   true,
    features: ['Everything in trial', 'Priority support', 'Team access', 'Unlimited styles'],
  },
  {
    label:    'Lifetime',
    price:    '₹14,999',
    duration: 'one-time',
    tag:      'Best Value',
    accent:   false,
    features: ['Everything in monthly', 'Forever access', 'All future features', 'Dedicated support', '2 years free maintenance'],
    note: { headline: 'Maintenance Policy', body: '2 years free maintenance included. Charges apply separately after 2 years.' },
  },
];

// ── Policy cards ─────────────────────────────────────────────────────────────
export const POLICIES = [
  { icon: '🔒', title: 'Data Privacy',           body: 'Your data lives exclusively in your tenant workspace. All traffic is encrypted in transit and at rest. We never access your product data.' },
  { icon: '💳', title: 'Subscription & Billing', body: 'Plans activate manually after payment. The 3-day trial includes full access. Data is preserved after expiry — only management locks.' },
  { icon: '🗄️', title: 'Data Retention',         body: 'On deletion, all styles, fields, and users are permanently removed. Cancelled subscriptions retain data for 30 days.' },
  { icon: '⏱️', title: 'Service Availability',   body: 'We target 99.5% uptime. Scheduled maintenance runs during low-traffic hours with 24 hours advance notice.' },
];

// ── Hero stats strip ──────────────────────────────────────────────────────────
export const HERO_STATS = [
  { val: '3-day', label: 'Free trial' },
  { val: '30+',   label: 'Style fields' },
  { val: '∞',     label: 'CSV imports' },
];
