import { C } from '../../constants/home';

const SUPPORT_EMAIL = 'sachin.saroj@qurvii.com';

export default function SupportSection() {
  return (
    <section
      id="support"
      className="py-24 px-6 border-y"
      style={{ background: C.bg, borderColor: C.border }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: C.mint }}>
          Help
        </span>
        <h2 className="font-heading text-3xl font-black mt-2 mb-3" style={{ color: C.dark }}>
          Support
        </h2>
        <p
          className="text-sm mb-10 max-w-md mx-auto leading-relaxed"
          style={{ color: C.muted }}
        >
          Question, issue, or feature request? We respond to every message within one business day.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email card */}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="group flex items-center gap-4 rounded-2xl px-6 py-5 border transition-all duration-200 hover:-translate-y-0.5 no-underline"
            style={{ background: C.card, borderColor: C.border }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = C.blue;
              e.currentTarget.style.boxShadow = `0 4px 20px ${C.blue}22`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = C.border;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0"
              style={{ background: `${C.blue}12`, color: C.blue }}
            >
              ✉
            </div>
            <div className="text-left">
              <div
                className="text-[10px] font-bold uppercase tracking-wider mb-0.5"
                style={{ color: C.subtle }}
              >
                Email Support
              </div>
              <div className="text-sm font-semibold" style={{ color: C.dark }}>
                {SUPPORT_EMAIL}
              </div>
            </div>
          </a>

          {/* Response time card */}
          <div
            className="flex items-center gap-4 rounded-2xl px-6 py-5 border"
            style={{ background: C.card, borderColor: C.border }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0"
              style={{ background: `${C.mint}15`, color: C.mint }}
            >
              ⏰
            </div>
            <div className="text-left">
              <div
                className="text-[10px] font-bold uppercase tracking-wider mb-0.5"
                style={{ color: C.subtle }}
              >
                Response Time
              </div>
              <div className="text-sm font-semibold" style={{ color: C.dark }}>
                Within 1 business day
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
