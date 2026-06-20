
import { useState } from 'react';

const BG = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1400&q=80';

export default function RegisterPage({ onRegister, onSwitchToLogin }) {
  const [form, setForm]       = useState({ name: '', companyName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const submit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try { await onRegister(form); }
    catch (err) { setError(err.message || 'Registration failed'); }
    finally { setLoading(false); }
  };

  const F = ({ label, fkey, type = 'text', placeholder = '', required = true }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
        {!required && <span className="ml-1.5 font-normal text-gray-400 normal-case tracking-normal text-[11px]">optional</span>}
      </label>
      <input type={type} required={required} placeholder={placeholder} value={form[fkey]}
        onChange={(e) => setForm({ ...form, [fkey]: e.target.value })}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-end p-12 relative overflow-hidden"
        style={{ backgroundImage: `url(${BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10">
          <div className="mb-4 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
            <span className="text-white/90 text-xs font-bold uppercase tracking-widest">CMS</span>
            <span className="text-white/50 text-xs">Catalog Management System</span>
          </div>
          <p className="font-display text-5xl text-white leading-tight mb-3">
            Your catalogue,<br /><em>elevated.</em>
          </p>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
            Start your 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-wrap gap-2">
            {['CSV Import', 'Dynamic Fields', 'Bulk Update', 'Multi-Brand'].map((t) => (
              <span key={t} className="text-xs text-white/70 bg-white/10 border border-white/20 rounded-full px-3 py-1">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 bg-white overflow-y-auto">
        <div className="max-w-sm w-full mx-auto py-10">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-black">C</span>
              </div>
              <span className="font-bold text-gray-900 text-sm tracking-tight">Catalog Management System</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
            <p className="text-gray-400 text-sm mt-1">14-day free trial · No credit card</p>
          </div>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <F label="Your Name"          fkey="name"        placeholder="Jane Smith" />
            <F label="Company / Brand"    fkey="companyName" placeholder="Acme Fashion" required={false} />
            <F label="Email Address"      fkey="email"       type="email" placeholder="you@company.com" />
            <F label="Password"           fkey="password"    type="password" placeholder="Min 8 characters" />
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-50 transition mt-2">
              {loading ? 'Creating account...' : 'Start free trial →'}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-400">
            No credit card required · Cancel any time
          </p>
          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="font-semibold text-slate-900 hover:underline">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
}
