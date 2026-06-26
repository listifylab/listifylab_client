import { C } from '../../constants/home';

export default function CTASection({ onGetStarted }) {
  return (
    <section
      className="py-28 px-6 text-center relative overflow-hidden"
      style={{ background: C.dark }}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full opacity-[0.09] blur-3xl"
          style={{ background: C.blue }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-[0.06] blur-2xl"
          style={{ background: C.mint }}
        />
      </div>

      <div className="relative max-w-2xl mx-auto">
        <span
          className="inline-block text-xs font-bold uppercase tracking-widest mb-5 px-3 py-1 rounded-full"
          style={{ background: `${C.mint}20`, color: C.mint }}
        >
          Get started today
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
          Ready to organise your catalogue?
        </h2>
        <p className="mb-10 text-sm" style={{ color: C.subtle }}>
          3 days free. No card. Cancel any time.
        </p>
        <button
          onClick={onGetStarted}
          className="px-10 py-4 font-bold rounded-2xl text-white transition hover:opacity-90 shadow-xl"
          style={{
            background: C.blue,
            boxShadow: `0 16px 44px ${C.blue}55`,
          }}
        >
          Start your free trial →
        </button>
      </div>
    </section>
  );
}
