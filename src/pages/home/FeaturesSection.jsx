import { C, FEATURES } from '../../constants/home';

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 px-6 border-y"
      style={{ background: C.card, borderColor: C.border }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: C.mint }}>
            Features
          </span>
          <h2 className="font-heading text-3xl font-black mt-2 mb-3" style={{ color: C.dark }}>
            Everything your catalogue needs
          </h2>
          <p className="text-sm max-w-sm mx-auto leading-relaxed" style={{ color: C.muted }}>
            Built specifically for fashion — not a generic product database.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature: f }) {
  return (
    <div
      className="group relative rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1 overflow-hidden cursor-default"
      style={{
        background: C.card,
        borderColor: C.border,
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 8px 28px ${C.blue}18`;
        e.currentTarget.style.borderColor = `${C.blue}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
        e.currentTarget.style.borderColor = C.border;
      }}
    >
      {/* Top gradient accent on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: `linear-gradient(90deg, ${C.blue}, ${C.mint})` }}
      />

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{ background: `${C.blue}10`, border: `1px solid ${C.blue}20` }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke={C.blue}
          viewBox="0 0 24 24"
          dangerouslySetInnerHTML={{ __html: f.icon }}
        />
      </div>

      {/* Tag */}
      <span
        className="inline-block text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-2.5"
        style={{ background: `${C.mint}15`, color: C.mint }}
      >
        {f.tag}
      </span>

      <h3 className="font-heading font-bold mb-2 leading-snug" style={{ color: C.dark }}>
        {f.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
        {f.desc}
      </p>
    </div>
  );
}
