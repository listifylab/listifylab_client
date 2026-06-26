import { C, PRICING_PLANS } from '../../constants/home';

function CheckIcon({ color }) {
  return (
    <svg
      style={{ color }}
      className="w-4 h-4 mt-0.5 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function PricingSection({ onGetStarted }) {
  return (
    <section
      id="pricing"
      className="py-24 px-6 border-y"
      style={{ background: C.bg, borderColor: C.border }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: C.mint }}>
          Pricing
        </span>
        <h2 className="font-heading text-3xl font-black mt-2 mb-3" style={{ color: C.dark }}>
          Simple, transparent pricing
        </h2>
        <p className="text-sm mb-14" style={{ color: C.muted }}>
          Start free. Upgrade when your team is ready.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-start">
          {PRICING_PLANS.map((plan) => (
            <PlanCard key={plan.label} plan={plan} onGetStarted={onGetStarted} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCard({ plan: p, onGetStarted }) {
  return (
    <div
      className="relative rounded-2xl border p-6 text-left flex flex-col transition-all duration-200"
      style={{
        background: p.accent ? C.blue : C.card,
        borderColor: p.accent ? C.blue : C.border,
        boxShadow: p.accent ? `0 20px 48px ${C.blue}38` : '0 1px 6px rgba(0,0,0,0.06)',
        transform: p.accent ? 'scale(1.04)' : 'scale(1)',
      }}
    >
      {/* Popular / Best Value badge */}
      {p.tag && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span
            className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white shadow"
            style={{ background: p.accent ? C.dark : C.mint }}
          >
            {p.tag}
          </span>
        </div>
      )}

      {/* Label */}
      <div
        className="text-[11px] font-bold uppercase tracking-widest mb-4"
        style={{ color: p.accent ? 'rgba(255,255,255,0.6)' : C.subtle }}
      >
        {p.label}
      </div>

      {/* Price */}
      <div
        className="font-heading text-4xl font-black mb-0.5"
        style={{ color: p.accent ? '#fff' : C.dark }}
      >
        {p.price}
      </div>
      <div
        className="text-xs mb-7"
        style={{ color: p.accent ? 'rgba(255,255,255,0.5)' : C.subtle }}
      >
        {p.duration}
      </div>

      {/* Features */}
      <ul className="space-y-2.5 mb-6 flex-1">
        {p.features.map((feat) => (
          <li
            key={feat}
            className="text-sm flex items-start gap-2.5"
            style={{ color: p.accent ? 'rgba(255,255,255,0.85)' : '#475569' }}
          >
            <CheckIcon color={p.accent ? '#a5f3d4' : C.mint} />
            {feat}
          </li>
        ))}
      </ul>

      {/* Maintenance note (Lifetime only) */}
      {p.note && (
        <div
          className="mb-5 rounded-xl px-4 py-3 border"
          style={{ background: '#fffbeb', borderColor: '#fde68a' }}
        >
          <p
            className="text-[11px] font-black uppercase tracking-wider mb-0.5"
            style={{ color: '#92400e' }}
          >
            {p.note.headline}
          </p>
          <p className="text-xs leading-relaxed" style={{ color: '#92400e' }}>
            {p.note.body}
          </p>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={onGetStarted}
        className="w-full py-2.5 rounded-xl text-sm font-semibold transition hover:opacity-90 mt-auto"
        style={{
          background: p.accent ? '#fff' : C.blue,
          color: p.accent ? C.blue : '#fff',
        }}
      >
        Get started
      </button>
    </div>
  );
}
