import { C } from '../../constants/home';
import HomeLogo from './HomeLogo';

const SUPPORT_EMAIL = 'sachin.saroj@qurvii.com';

export default function HomeFooter({ onGetStarted, onSignIn }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const columns = [
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
        { label: 'Privacy Policy', action: () => scrollTo('policy') },
        { label: 'Terms', action: () => scrollTo('policy') },
      ],
    },
    {
      heading: 'Support',
      links: [
        { label: 'Email Us', action: () => (window.location.href = `mailto:${SUPPORT_EMAIL}`) },
        { label: 'Contact', action: () => scrollTo('support') },
      ],
    },
  ];

  return (
    <footer className="py-14 px-6" style={{ background: '#020817' }}>
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <HomeLogo light />
            <p className="text-sm mt-3 leading-relaxed" style={{ color: '#475569' }}>
              Fashion catalogue management built for brands that care about precision and speed.
            </p>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-3 gap-8 text-sm">
            {columns.map((col) => (
              <div key={col.heading}>
                <div
                  className="font-heading text-[11px] font-bold uppercase tracking-wider mb-3"
                  style={{ color: '#334155' }}
                >
                  {col.heading}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <button
                        onClick={l.action}
                        className="text-left transition hover:text-white"
                        style={{ color: '#64748b' }}
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

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs border-t"
          style={{ borderColor: '#1e293b', color: '#334155' }}
        >
          <span>© {new Date().getFullYear()} ListifyLab. All rights reserved.</span>
          <span>Built for fashion brands.</span>
        </div>
      </div>
    </footer>
  );
}
