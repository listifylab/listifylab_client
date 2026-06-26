import { C } from '../../constants/home';
import HomeLogo from './HomeLogo';

export default function HomeNav({ onGetStarted, onSignIn }) {
  return (
    <header
      className="fixed top-0 inset-x-0 z-30 backdrop-blur-md border-b"
      style={{ background: 'rgba(255,255,255,0.92)', borderColor: C.border }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <HomeLogo />
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <a
            href="#features"
            className="transition hover:opacity-70"
            style={{ color: C.muted }}
          >
            Features
          </a>
          <a
            href="#pricing"
            className="transition hover:opacity-70"
            style={{ color: C.muted }}
          >
            Pricing
          </a>
          <a
            href="#support"
            className="transition hover:opacity-70"
            style={{ color: C.muted }}
          >
            Support
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={onSignIn}
            className="px-4 py-2 text-sm font-medium rounded-lg transition hover:bg-gray-50"
            style={{ color: C.dark }}
          >
            Sign in
          </button>
          <button
            onClick={onGetStarted}
            className="px-4 py-2 text-sm font-semibold rounded-xl transition hover:opacity-90 shadow-sm"
            style={{ background: C.blue, color: '#fff' }}
          >
            Free trial →
          </button>
        </div>
      </div>
    </header>
  );
}
