// Plan labels, colors and UI config used across Admin and SuperAdmin

export const PLAN_LABELS = {
  trial:    'Free Trial',
  monthly:  'Monthly',
  yearly:   'Yearly',
  lifetime: 'Lifetime',
};

export const PLAN_COLOR = {
  trial:    'bg-blue-50 text-blue-700',
  monthly:  'bg-green-50 text-green-700',
  yearly:   'bg-emerald-50 text-emerald-700',
  lifetime: 'bg-purple-50 text-purple-700',
};

// Upgrade plan cards shown in AdminPage → Subscription tab
export const PLAN_UI = [
  {
    key:      'monthly',
    label:    'Monthly',
    price:    '₹999',
    sub:      'per month',
    color:    'border-slate-200',
    badge:    '',
    features: ['Full catalogue access', 'CSV import & export', 'Dynamic fields', 'Email support'],
  },
  {
    key:      'yearly',
    label:    'Yearly',
    price:    '₹9,999',
    sub:      'per year · save 17%',
    color:    'border-indigo-300',
    badge:    'Popular',
    features: ['Everything in Monthly', 'Priority support', 'Early feature access'],
  },
  {
    key:      'lifetime',
    label:    'Lifetime',
    price:    '₹14,999',
    sub:      'one-time · 2 yrs free maintenance',
    color:    'border-purple-300',
    badge:    'Best value',
    features: ['Everything in Yearly', 'Permanent access', 'All future updates', 'Maintenance after 2 yrs billed separately'],
  },
];
