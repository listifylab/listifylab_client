import { C, HERO_STATS } from '../../constants/home';

export default function HeroSection({ onGetStarted, onSignIn }) {
  return (
    <section className="pt-32 pb-28 px-6 relative overflow-hidden">
      {/* Mesh gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.08] blur-3xl"
          style={{ background: C.blue }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-[0.07] blur-3xl"
          style={{ background: C.mint }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full text-xs font-semibold border"
          style={{
            background: `${C.blue}12`,
            borderColor: `${C.blue}30`,
            color: C.blue,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: C.blue }}
          />
          Fashion ERP · Style Listing Management
        </div>

        <h1
          className="font-heading text-5xl sm:text-6xl font-black leading-[1.06] mb-6"
          style={{ color: C.dark }}
        >
          Your entire catalogue,{' '}
          <span
            style={{
              background: `linear-gradient(135deg, ${C.blue}, ${C.mint})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            organised at last.
          </span>
        </h1>

        <p
          className="text-lg max-w-lg mx-auto mb-10 leading-relaxed"
          style={{ color: C.muted }}
        >
          ListifyLab helps fashion brands manage styles, fabrics, measurements and more — with
          bulk CSV import, dynamic fields, and a clean dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onGetStarted}
            className="px-8 py-3.5 text-sm font-semibold rounded-2xl transition hover:opacity-90 shadow-lg"
            style={{
              background: C.blue,
              color: '#fff',
              boxShadow: `0 8px 28px ${C.blue}45`,
            }}
          >
            Start 3-day free trial →
          </button>
          <button
            onClick={onSignIn}
            className="px-8 py-3.5 text-sm font-semibold rounded-2xl border transition hover:bg-white/80"
            style={{ borderColor: C.border, color: C.dark, background: C.card }}
          >
            Sign in to account
          </button>
        </div>

        <p className="mt-4 text-xs tracking-wide" style={{ color: C.subtle }}>
          No credit card · Full access · Cancel any time
        </p>

        {/* Stats strip */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-sm mx-auto">
          {HERO_STATS.map(({ val, label }) => (
            <div
              key={label}
              className="rounded-2xl border p-4 hover:-translate-y-0.5 transition-transform"
              style={{ background: C.card, borderColor: C.border }}
            >
              <div className="text-2xl font-black mb-0.5" style={{ color: C.blue }}>
                {val}
              </div>
              <div className="text-xs" style={{ color: C.subtle }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
