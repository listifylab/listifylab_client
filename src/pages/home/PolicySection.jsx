import { C, POLICIES } from '../../constants/home';

export default function PolicySection() {
  return (
    <section
      id="policy"
      className="py-24 px-6"
      style={{ background: C.card }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: C.mint }}>
            Legal
          </span>
          <h2 className="font-heading text-3xl font-black mt-2 mb-3" style={{ color: C.dark }}>
            Policies &amp; Terms
          </h2>
          <p className="text-sm max-w-sm mx-auto" style={{ color: C.muted }}>
            Simple, honest, and transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {POLICIES.map((p) => (
            <PolicyCard key={p.title} policy={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PolicyCard({ policy: p }) {
  return (
    <div
      className="rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5"
      style={{ background: C.bg, borderColor: C.border }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.07)`;
        e.currentTarget.style.borderColor = `${C.blue}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = C.border;
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 border"
        style={{ background: C.card, borderColor: C.border }}
      >
        {p.icon}
      </div>
      <h3 className="font-heading font-bold mb-2" style={{ color: C.dark }}>
        {p.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
        {p.body}
      </p>
    </div>
  );
}
