const C = {
  dark:   '#0F172A',
  blue:   '#2563eb',
  mint:   '#10b981',
  bg:     '#f8fafc',
  card:   '#ffffff',
  border: '#e2e8f0',
};

const FEATURES = [
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

const STEPS = [
  { n: '01', title: 'Register & get 3 days free', desc: 'Create your account in 30 seconds. Full access from day one — no credit card.' },
  { n: '02', title: 'Upload your CSV',            desc: 'Export from Excel, drop the file, and every column becomes a searchable field automatically.' },
  { n: '03', title: 'Browse & manage styles',     desc: 'Search by style number, filter by attributes, keep your catalogue in sync.' },
  { n: '04', title: 'Upgrade when ready',         desc: 'Choose monthly or lifetime. Admin activates your plan after payment.' },
];

const POLICIES = [
  { icon: '🔒', title: 'Data Privacy',          body: 'Your data lives exclusively in your tenant workspace. All traffic is encrypted in transit and at rest. We never access your product data.' },
  { icon: '💳', title: 'Subscription & Billing', body: 'Plans activate manually after payment. The 3-day trial includes full access. Data is preserved after expiry — only management locks.' },
  { icon: '🗄️', title: 'Data Retention',        body: 'On deletion, all styles, fields, and users are permanently removed. Cancelled subscriptions retain data for 30 days.' },
  { icon: '⏱️', title: 'Service Availability',  body: 'We target 99.5% uptime. Scheduled maintenance runs during low-traffic hours with 24 hours advance notice.' },
];

const CheckIcon = ({ color }) => (
  <svg style={{ color }} className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const Logo = ({ light }) => (
  <div className="flex items-center gap-2.5">
    <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm"
      style={{ background: light ? C.card : C.dark }}>
      <span className="text-xs font-black" style={{ color: light ? C.dark : C.card }}>L</span>
    </div>
    <span className="text-sm font-bold tracking-tight" style={{ color: light ? C.card : C.dark }}>
      ListifyLab
    </span>
  </div>
);

export default function HomePage({ onGetStarted, onSignIn }) {
  return (
    <div className="min-h-screen font-sans antialiased" style={{ background: C.bg, color: C.dark }}>

      {/* ── NAV ── */}
      <header className="fixed top-0 inset-x-0 z-30 backdrop-blur-md border-b"
        style={{ background: 'rgba(255,255,255,0.92)', borderColor: C.border }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <button onClick={onSignIn}
              className="px-4 py-2 text-sm font-medium rounded-lg transition hover:opacity-80"
              style={{ color: C.dark }}>
              Sign in
            </button>
            <button onClick={onGetStarted}
              className="px-4 py-2 text-sm font-semibold rounded-xl transition hover:opacity-90 shadow-sm"
              style={{ background: C.blue, color: '#fff' }}>
              Free trial →
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="pt-32 pb-28 px-6 relative overflow-hidden">
        {/* Mesh gradient blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: C.blue }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
            style={{ background: C.mint }} />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full text-xs font-semibold border"
            style={{ background: `${C.blue}12`, borderColor: `${C.blue}30`, color: C.blue }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.blue }} />
            Fashion ERP · Style Listing Management
          </div>

          <h1 className="font-display text-5xl sm:text-6xl leading-[1.08] mb-6" style={{ color: C.dark }}>
            Your entire catalogue,{' '}
            <span style={{
              background: `linear-gradient(135deg, ${C.blue}, ${C.mint})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              organised at last.
            </span>
          </h1>

          <p className="text-lg max-w-lg mx-auto mb-10 leading-relaxed" style={{ color: '#64748b' }}>
            ListifyLab helps fashion brands manage styles, fabrics, measurements and more — with bulk CSV import, dynamic fields, and a clean dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={onGetStarted}
              className="px-8 py-3.5 text-sm font-semibold rounded-2xl transition hover:opacity-90 shadow-lg"
              style={{ background: C.blue, color: '#fff', boxShadow: `0 8px 24px ${C.blue}40` }}>
              Start 3-day free trial →
            </button>
            <button onClick={onSignIn}
              className="px-8 py-3.5 text-sm font-semibold rounded-2xl border transition hover:opacity-80"
              style={{ borderColor: C.border, color: C.dark, background: C.card }}>
              Sign in to account
            </button>
          </div>

          <p className="mt-4 text-xs tracking-wide" style={{ color: '#94a3b8' }}>
            No credit card · Full access · Cancel any time
          </p>

          {/* Stats strip */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-sm mx-auto">
            {[['3-day', 'Free trial'], ['30+', 'Style fields'], ['∞', 'CSV imports']].map(([val, label]) => (
              <div key={label} className="rounded-2xl border p-4"
                style={{ background: C.card, borderColor: C.border }}>
                <div className="text-2xl font-black mb-0.5" style={{ color: C.blue }}>{val}</div>
                <div className="text-xs" style={{ color: '#94a3b8' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-6 border-y" style={{ background: C.card, borderColor: C.border }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.mint }}>Features</span>
            <h2 className="text-3xl font-bold mt-2 mb-3" style={{ color: C.dark }}>Everything your catalogue needs</h2>
            <p className="text-sm max-w-sm mx-auto" style={{ color: '#64748b' }}>
              Built specifically for fashion — not a generic product database.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title}
                className="group relative rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1 overflow-hidden"
                style={{ background: C.card, borderColor: C.border, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 24px ${C.blue}15`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'}>
                {/* Blue top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, ${C.blue}, ${C.mint})` }} />
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${C.blue}12`, border: `1px solid ${C.blue}20` }}>
                  <svg className="w-5 h-5" fill="none" stroke={C.blue} viewBox="0 0 24 24"
                    dangerouslySetInnerHTML={{ __html: f.icon }} />
                </div>
                <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-2"
                  style={{ background: `${C.mint}15`, color: C.mint }}>
                  {f.tag}
                </span>
                <h3 className="font-bold mb-2 leading-snug" style={{ color: C.dark }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6" style={{ background: C.dark }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.mint }}>Process</span>
            <h2 className="text-3xl font-bold mt-2 mb-3 text-white">How it works</h2>
            <p className="text-sm" style={{ color: '#94a3b8' }}>From signup to organised catalogue in minutes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {STEPS.map((s) => (
              <div key={s.n} className="relative rounded-2xl p-6 overflow-hidden border"
                style={{ background: '#1e293b', borderColor: '#334155' }}>
                <div className="absolute top-4 right-5 text-[72px] font-black leading-none select-none"
                  style={{ color: '#1e293b', textShadow: '0 0 0 #334155', opacity: 0.8, WebkitTextStroke: '1px #334155' }}>
                  {s.n}
                </div>
                <div className="relative">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black mb-4"
                    style={{ background: C.blue }}>
                    {s.n}
                  </div>
                  <h3 className="font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 px-6 border-y" style={{ background: C.bg, borderColor: C.border }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.mint }}>Pricing</span>
          <h2 className="text-3xl font-bold mt-2 mb-3" style={{ color: C.dark }}>Simple, transparent pricing</h2>
          <p className="text-sm mb-14" style={{ color: '#64748b' }}>Start free. Upgrade when your team is ready.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-start">
            {[
              {
                label: 'Free Trial', price: '₹0', duration: '3 days', tag: '',
                features: ['Full platform access', 'CSV import', 'Dynamic fields', 'No credit card'],
                accent: false,
              },
              {
                label: 'Monthly', price: '₹999', duration: 'per month', tag: 'Most Popular',
                features: ['Everything in trial', 'Priority support', 'Team access', 'Unlimited styles'],
                accent: true,
              },
              {
                label: 'Lifetime', price: '₹14,999', duration: 'one-time', tag: 'Best Value',
                features: ['Everything in monthly', 'Forever access', 'All future features', 'Dedicated support', '2 years free maintenance'],
                accent: false,
              },
            ].map((p) => (
              <div key={p.label} className="relative rounded-2xl border p-6 text-left flex flex-col"
                style={{
                  background: p.accent ? C.blue : C.card,
                  borderColor: p.accent ? C.blue : C.border,
                  boxShadow: p.accent ? `0 16px 40px ${C.blue}35` : '0 1px 4px rgba(0,0,0,0.06)',
                  transform: p.accent ? 'scale(1.04)' : 'scale(1)',
                }}>
                {p.tag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                      style={{ background: p.accent ? C.dark : C.mint }}>
                      {p.tag}
                    </span>
                  </div>
                )}
                <div className="text-[11px] font-bold uppercase tracking-widest mb-4"
                  style={{ color: p.accent ? 'rgba(255,255,255,0.6)' : '#94a3b8' }}>
                  {p.label}
                </div>
                <div className="text-4xl font-black mb-0.5" style={{ color: p.accent ? '#fff' : C.dark }}>
                  {p.price}
                </div>
                <div className="text-xs mb-7" style={{ color: p.accent ? 'rgba(255,255,255,0.5)' : '#94a3b8' }}>
                  {p.duration}
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.features.map((feat) => (
                    <li key={feat} className="text-sm flex items-start gap-2.5"
                      style={{ color: p.accent ? 'rgba(255,255,255,0.85)' : '#475569' }}>
                      <CheckIcon color={p.accent ? '#a5f3d4' : C.mint} />
                      {feat}
                    </li>
                  ))}
                </ul>
                {p.label === 'Lifetime' && (
                  <div className="mb-5 rounded-xl px-4 py-3 border"
                    style={{ background: '#fffbeb', borderColor: '#fde68a' }}>
                    <p className="text-[11px] font-black uppercase tracking-wider mb-0.5" style={{ color: '#92400e' }}>
                      Maintenance Policy
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: '#92400e' }}>
                      2 years free maintenance included. Charges apply separately after 2 years.
                    </p>
                  </div>
                )}
                <button onClick={onGetStarted}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold transition hover:opacity-90"
                  style={{
                    background: p.accent ? '#fff' : C.blue,
                    color: p.accent ? C.blue : '#fff',
                  }}>
                  Get started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POLICY ── */}
      <section id="policy" className="py-24 px-6" style={{ background: C.card }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.mint }}>Legal</span>
            <h2 className="text-3xl font-bold mt-2 mb-3" style={{ color: C.dark }}>Policies & Terms</h2>
            <p className="text-sm max-w-sm mx-auto" style={{ color: '#64748b' }}>Simple, honest, and transparent.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {POLICIES.map((p) => (
              <div key={p.title} className="rounded-2xl border p-6 transition hover:-translate-y-0.5"
                style={{ background: C.bg, borderColor: C.border }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 border"
                  style={{ background: C.card, borderColor: C.border }}>
                  {p.icon}
                </div>
                <h3 className="font-bold mb-2" style={{ color: C.dark }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPPORT ── */}
      <section id="support" className="py-24 px-6 border-y" style={{ background: C.bg, borderColor: C.border }}>
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.mint }}>Help</span>
          <h2 className="text-3xl font-bold mt-2 mb-3" style={{ color: C.dark }}>Support</h2>
          <p className="text-sm mb-10 max-w-md mx-auto leading-relaxed" style={{ color: '#64748b' }}>
            Question, issue, or feature request? We respond to every message within one business day.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="mailto:sachin.saroj@qurvii.com"
              className="group flex items-center gap-4 rounded-2xl px-6 py-5 border transition hover:-translate-y-0.5"
              style={{ background: C.card, borderColor: C.border }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.boxShadow = `0 4px 16px ${C.blue}20`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = 'none'; }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg transition"
                style={{ background: `${C.blue}12`, color: C.blue }}>
                ✉
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: '#94a3b8' }}>Email Support</div>
                <div className="text-sm font-semibold" style={{ color: C.dark }}>sachin.saroj@qurvii.com</div>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-2xl px-6 py-5 border"
              style={{ background: C.card, borderColor: C.border }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg"
                style={{ background: `${C.mint}15`, color: C.mint }}>
                ⏰
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: '#94a3b8' }}>Response Time</div>
                <div className="text-sm font-semibold" style={{ color: C.dark }}>Within 1 business day</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6 text-center relative overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
            style={{ background: C.blue }} />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: `${C.mint}20`, color: C.mint }}>
            Get started today
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-4 leading-tight">
            Ready to organise your catalogue?
          </h2>
          <p className="mb-10 text-sm" style={{ color: '#94a3b8' }}>3 days free. No card. Cancel any time.</p>
          <button onClick={onGetStarted}
            className="px-10 py-4 font-bold rounded-2xl text-white transition hover:opacity-90 shadow-xl"
            style={{ background: C.blue, boxShadow: `0 16px 40px ${C.blue}50` }}>
            Start your free trial →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-14 px-6" style={{ background: '#020817' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between gap-10 mb-10">
            <div className="max-w-xs">
              <Logo light />
              <p className="text-sm mt-3 leading-relaxed" style={{ color: '#64748b' }}>
                Fashion catalogue management built for brands that care about precision and speed.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 text-sm">
              {[
                { heading: 'Product', links: [{ label: 'Start Trial', action: onGetStarted }, { label: 'Sign In', action: onSignIn }] },
                { heading: 'Legal', links: [
                  { label: 'Privacy Policy', action: () => document.getElementById('policy')?.scrollIntoView({ behavior: 'smooth' }) },
                  { label: 'Terms',          action: () => document.getElementById('policy')?.scrollIntoView({ behavior: 'smooth' }) },
                ]},
                { heading: 'Support', links: [
                  { label: 'Email Us', action: () => (window.location.href = 'mailto:sachin.saroj@qurvii.com') },
                  { label: 'Contact',  action: () => document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' }) },
                ]},
              ].map((col) => (
                <div key={col.heading}>
                  <div className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: '#475569' }}>
                    {col.heading}
                  </div>
                  <ul className="space-y-2.5">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <button onClick={l.action} className="text-left transition hover:opacity-80"
                          style={{ color: '#64748b' }}>
                          {l.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs border-t"
            style={{ borderColor: '#1e293b', color: '#334155' }}>
            <span>© {new Date().getFullYear()} ListifyLab. All rights reserved.</span>
            <span>Built for fashion brands.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
