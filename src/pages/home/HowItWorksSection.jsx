import { C, STEPS } from '../../constants/home';

export default function HowItWorksSection() {
  return (
    <section className="py-24 px-6" style={{ background: C.dark }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: C.mint }}>
            Process
          </span>
          <h2 className="font-heading text-3xl font-black mt-2 mb-3 text-white">How it works</h2>
          <p className="text-sm" style={{ color: C.subtle }}>
            From signup to organised catalogue in minutes.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {STEPS.map((s, i) => (
            <StepCard key={s.n} step={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step: s }) {
  return (
    <div
      className="relative rounded-2xl p-6 overflow-hidden border transition-all duration-200 hover:-translate-y-0.5"
      style={{ background: '#1e293b', borderColor: '#334155' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${C.blue}50`;
        e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#334155';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Ghost number */}
      <div
        className="absolute top-3 right-4 text-[72px] font-black leading-none select-none"
        style={{
          opacity: 0.6,
          WebkitTextStroke: '1px #334155',
          color: '#1e293b',
        }}
      >
        {s.n}
      </div>

      <div className="relative">
        {/* Step badge */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black mb-5"
          style={{ background: C.blue }}
        >
          {s.n}
        </div>
        <h3 className="font-heading font-bold text-white mb-2 leading-snug">{s.title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: C.subtle }}>
          {s.desc}
        </p>
      </div>
    </div>
  );
}
