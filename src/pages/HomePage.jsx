const FEATURES = [
  {
    color: 'from-indigo-500 to-indigo-600',
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    border: 'border-indigo-100',
    tag: 'Catalogue',
    title: 'Style Catalogue',
    desc: 'Store every style with 30+ fashion-specific fields — fabric, fit, occasion, measurements, and more. Built for real fashion workflows.',
    svg: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>`,
  },
  {
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-100',
    tag: 'Import',
    title: 'Bulk CSV Import',
    desc: 'Upload thousands of styles in one go. Re-importing the same Style Number updates the record — never duplicates. Drag-and-drop supported.',
    svg: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>`,
  },
  {
    color: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-100',
    tag: 'Flexible',
    title: 'Dynamic Fields',
    desc: 'New CSV column headers auto-register as field definitions. Adapt your data model on the fly — no migrations, no downtime.',
    svg: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z"/>`,
  },
  {
    color: 'from-sky-500 to-sky-600',
    bg: 'bg-sky-50',
    text: 'text-sky-600',
    border: 'border-sky-100',
    tag: 'Multi-tenant',
    title: 'Multi-Brand Ready',
    desc: 'Each company gets a fully isolated workspace. Data never crosses between tenants. Scale from one brand to hundreds.',
    svg: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>`,
  },
  {
    color: 'from-rose-500 to-rose-600',
    bg: 'bg-rose-50',
    text: 'text-rose-600',
    border: 'border-rose-100',
    tag: 'Security',
    title: 'Secure by Default',
    desc: 'JWT auth, HTTP-only cookies, bcrypt passwords, rate limiting, and per-request subscription checks. Security is not an afterthought.',
    svg: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>`,
  },
  {
    color: 'from-violet-500 to-violet-600',
    bg: 'bg-violet-50',
    text: 'text-violet-600',
    border: 'border-violet-100',
    tag: 'Admin',
    title: 'Admin Dashboard',
    desc: 'Manage subscription plans, field definitions, and user access from a single clean panel. Full visibility, full control.',
    svg: `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>`,
  },
];

const STEPS = [
  {
    n: '01',
    title: 'Register & get 14 days free',
    desc: 'Create your account in 30 seconds. Full access from day one — no credit card.',
  },
  {
    n: '02',
    title: 'Upload your CSV',
    desc: 'Export from Excel, drop the file, and every column becomes a searchable field automatically.',
  },
  {
    n: '03',
    title: 'Browse & manage styles',
    desc: 'Search by style number, filter by attributes, and keep your catalogue in sync with re-imports.',
  },
  {
    n: '04',
    title: 'Upgrade when ready',
    desc: 'Choose monthly, yearly, or lifetime. Admin activates your plan after payment confirmation.',
  },
];

const POLICIES = [
  {
    icon: '🔒',
    title: 'Data Privacy',
    body: 'Your data is stored exclusively in your tenant workspace. We never share or access your product data. All traffic is encrypted in transit (HTTPS) and at rest.',
  },
  {
    icon: '💳',
    title: 'Subscription & Billing',
    body: 'Plans activate manually after payment. The 14-day trial includes full access. After expiry your data is preserved — only management features lock until renewal.',
  },
  {
    icon: '🗄️',
    title: 'Data Retention',
    body: 'On account deletion, all styles, fields, and users are permanently removed. Cancelled subscriptions retain data for 30 days to allow reactivation.',
  },
  {
    icon: '⏱️',
    title: 'Service Availability',
    body: 'We target 99.5% uptime. Scheduled maintenance runs during low-traffic hours with at least 24 hours advance notice via email.',
  },
];

const Logo = ({ light }) => (
  <div className="flex items-center gap-2.5">
    <div
      className={`w-8 h-8 rounded-lg flex items-center justify-center ${light ? 'bg-white' : 'bg-slate-900'}`}
    >
      <span className={`text-xs font-black ${light ? 'text-slate-900' : 'text-white'}`}>C</span>
    </div>
    <div>
      <div className={`text-sm font-bold leading-none ${light ? 'text-white' : 'text-gray-900'}`}>
        CMS
      </div>
      <div
        className={`text-[10px] leading-none mt-0.5 ${light ? 'text-white/50' : 'text-gray-400'}`}
      >
        Catalog Management System
      </div>
    </div>
  </div>
);

export default function HomePage({ onGetStarted, onSignIn }) {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <button
              onClick={onSignIn}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition"
            >
              Sign in
            </button>
            <button
              onClick={onGetStarted}
              className="px-4 py-2 text-sm font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition"
            >
              Free trial →
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-32 pb-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.08),transparent)]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 border border-indigo-100 bg-indigo-50 text-indigo-600 text-xs font-semibold px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
            Fashion ERP · Style Catalog Management
          </div>
          <h1 className="font-display text-5xl sm:text-6xl leading-[1.1] text-gray-900 mb-6">
            Your entire catalogue,
            <br />
            <em className="text-indigo-600">organised at last.</em>
          </h1>
          <p className="text-lg text-gray-500 max-w-lg mx-auto mb-10 leading-relaxed">
            CMS helps fashion brands manage styles, fabrics, measurements and more — with bulk CSV
            import, dynamic fields, and a clean dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onGetStarted}
              className="px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-2xl hover:bg-slate-800 transition text-sm shadow-lg shadow-slate-900/20"
            >
              Start 14-day free trial →
            </button>
            <button
              onClick={onSignIn}
              className="px-8 py-3.5 border border-gray-200 text-gray-700 font-semibold rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition text-sm"
            >
              Sign in to account
            </button>
          </div>
          <p className="mt-4 text-xs text-gray-400 tracking-wide">
            No credit card · Full access · Cancel any time
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Features
            </span>
            <h2 className="text-3xl font-bold mt-2 mb-3">Everything your catalogue needs</h2>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              Built specifically for fashion — not a generic product database.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className={`group relative bg-white border ${f.border} rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden`}
              >
                {/* Gradient top bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${f.color}`}
                />
                {/* Icon */}
                <div
                  className={`w-11 h-11 ${f.bg} ${f.border} border rounded-xl flex items-center justify-center mb-5`}
                >
                  <svg
                    className={`w-5 h-5 ${f.text}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    dangerouslySetInnerHTML={{ __html: f.svg }}
                  />
                </div>
                {/* Tag pill */}
                <span
                  className={`inline-block text-[10px] font-black uppercase tracking-widest ${f.text} ${f.bg} px-2 py-0.5 rounded-full mb-2`}
                >
                  {f.tag}
                </span>
                <h3 className="font-bold text-gray-900 mb-2 leading-snug">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Process
            </span>
            <h2 className="text-3xl font-bold mt-2 mb-3">How it works</h2>
            <p className="text-gray-400 text-sm">From signup to organised catalogue in minutes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="relative bg-gray-50 border border-gray-100 rounded-2xl p-6 overflow-hidden"
              >
                <div className="absolute top-4 right-5 text-[72px] font-black text-gray-100 leading-none select-none">
                  {s.n}
                </div>
                <div className="relative">
                  <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center text-white text-xs font-black mb-4">
                    {s.n}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Pricing</span>
          <h2 className="text-3xl font-bold mt-2 mb-3">Simple, transparent pricing</h2>
          <p className="text-gray-400 text-sm mb-14">
            Start free. Upgrade when your team is ready.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-start">
            {[
              {
                label: 'Free Trial',
                price: '₹0',
                duration: '14 days',
                tag: '',
                features: [
                  'Full platform access',
                  'CSV import',
                  'Dynamic fields',
                  'No credit card',
                ],
                dark: false,
              },
              {
                label: 'Monthly',
                price: '₹999',
                duration: 'per month',
                tag: 'Popular',
                features: [
                  'Everything in trial',
                  'Priority support',
                  'Team access',
                  'Unlimited styles',
                ],
                dark: true,
              },
              {
                label: 'Lifetime',
                price: '₹14,999',
                duration: 'one-time payment',
                tag: 'Best value',
                features: [
                  'Everything in monthly',
                  'Forever platform access',
                  'All future features',
                  'Dedicated support',
                  '2 years free maintenance',
                  'Maintenance charged separately after 2 yrs',
                ],
                dark: false,
              },
            ].map((p) => (
              <div
                key={p.label}
                className={`relative rounded-2xl border p-6 text-left flex flex-col ${
                  p.dark
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/30'
                    : 'bg-white border-gray-100 shadow-sm'
                }`}
              >
                {p.tag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${p.dark ? 'bg-indigo-500 text-white' : 'bg-gray-900 text-white'}`}
                    >
                      {p.tag}
                    </span>
                  </div>
                )}
                <div
                  className={`text-[11px] font-bold uppercase tracking-widest mb-4 ${p.dark ? 'text-slate-400' : 'text-gray-400'}`}
                >
                  {p.label}
                </div>
                <div
                  className={`text-4xl font-bold mb-0.5 ${p.dark ? 'text-white' : 'text-gray-900'}`}
                >
                  {p.price}
                </div>
                <div className={`text-xs mb-7 ${p.dark ? 'text-slate-500' : 'text-gray-400'}`}>
                  {p.duration}
                </div>
                <ul className="space-y-2.5 mb-5 flex-1">
                  {p.features.map((feat) => (
                    <li
                      key={feat}
                      className={`text-sm flex items-start gap-2.5 ${p.dark ? 'text-slate-300' : 'text-gray-600'}`}
                    >
                      <svg
                        className={`w-4 h-4 mt-0.5 shrink-0 ${p.dark ? 'text-indigo-400' : 'text-emerald-500'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                {p.label === 'Lifetime' && (
                  <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                    <p className="text-[11px] font-black text-amber-700 uppercase tracking-wider mb-0.5">
                      Maintenance Policy
                    </p>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      2 years free maintenance included. After 2 years, maintenance & support
                      charges apply separately.
                    </p>
                  </div>
                )}
                <button
                  onClick={onGetStarted}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${
                    p.dark
                      ? 'bg-white text-slate-900 hover:bg-slate-100'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  Get started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POLICY */}
      <section id="policy" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Legal</span>
            <h2 className="text-3xl font-bold mt-2 mb-3">Policies & Terms</h2>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              Simple, honest, and transparent.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {POLICIES.map((p) => (
              <div
                key={p.title}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-sm transition"
              >
                <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-xl mb-4 shadow-sm">
                  {p.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section id="support" className="py-24 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Help</span>
          <h2 className="text-3xl font-bold mt-2 mb-3">Support</h2>
          <p className="text-gray-500 text-sm mb-10 max-w-md mx-auto leading-relaxed">
            Question, issue, or feature request? We respond to every message within one business
            day.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="mailto:sachin.saroj@qurvii.com"
              className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-5 hover:border-slate-300 hover:shadow-md transition"
            >
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-lg group-hover:bg-slate-900 group-hover:text-white transition">
                ✉
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                  Email Support
                </div>
                <div className="text-sm font-semibold text-gray-800">sachin.saroj@qurvii.com</div>
              </div>
            </a>
            <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-5">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-lg">
                ⏰
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                  Response Time
                </div>
                <div className="text-sm font-semibold text-gray-800">Within 1 business day</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-slate-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(99,102,241,0.2),transparent)]" />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="font-display text-4xl text-white mb-4">
            Ready to organise your catalogue?
          </h2>
          <p className="text-slate-400 text-sm mb-8">14 days free. No card. Cancel any time.</p>
          <button
            onClick={onGetStarted}
            className="px-10 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition shadow-xl"
          >
            Start your free trial →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-500 py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between gap-10 mb-10">
            <div className="max-w-xs">
              <Logo light />
              <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                Fashion catalogue management built for brands that care about precision and speed.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 text-sm">
              {[
                {
                  heading: 'Product',
                  links: [
                    { label: 'Start Trial', action: onGetStarted },
                    { label: 'Sign In', action: onSignIn },
                  ],
                },
                {
                  heading: 'Legal',
                  links: [
                    {
                      label: 'Privacy Policy',
                      action: () =>
                        document.getElementById('policy')?.scrollIntoView({ behavior: 'smooth' }),
                    },
                    {
                      label: 'Terms',
                      action: () =>
                        document.getElementById('policy')?.scrollIntoView({ behavior: 'smooth' }),
                    },
                  ],
                },
                {
                  heading: 'Support',
                  links: [
                    {
                      label: 'Email Us',
                      action: () => (window.location.href = 'mailto:sachin.saroj@qurvii.com'),
                    },
                    {
                      label: 'Contact',
                      action: () =>
                        document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' }),
                    },
                  ],
                },
              ].map((col) => (
                <div key={col.heading}>
                  <div className="text-slate-400 font-semibold mb-3 text-[11px] uppercase tracking-wider">
                    {col.heading}
                  </div>
                  <ul className="space-y-2.5">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <button
                          onClick={l.action}
                          className="hover:text-white transition text-left"
                        >
                          {l.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-600">
            <span>
              © {new Date().getFullYear()} CMS — Catalog Management System. All rights reserved.
            </span>
            <span>Built for fashion brands.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
