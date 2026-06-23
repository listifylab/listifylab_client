import { useState } from 'react';

const BG =
  'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1400&q=80';

// ── Extracted outside component to prevent focus-loss on re-render ────────────
function Field({ label, fkey, type = 'text', placeholder = '', required = true, value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label}
        {!required && (
          <span className="ml-1.5 font-normal text-gray-400 normal-case tracking-normal text-[11px]">
            optional
          </span>
        )}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(fkey, e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition"
      />
    </div>
  );
}

export default function RegisterPage({ onRegister, onSwitchToLogin }) {
  const [form, setForm] = useState({
    name: '',
    companyName: '',
    email: '',
    password: '',
    manufacturerDetails: '',
    packerDetails: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onRegister(form);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-end p-12 relative overflow-hidden"
        style={{ backgroundImage: `url(${BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10">
          <div className="mb-4 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
            <span className="text-white/90 text-xs font-bold uppercase tracking-widest">ListifyLab</span>
          </div>
          <p className="font-display text-5xl text-white leading-tight mb-3">
            Your catalogue,<br /><em>elevated.</em>
          </p>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
            Start your 3-day free trial. No credit card required.
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
                <span className="text-white text-xs font-black">L</span>
              </div>
              <span className="font-bold text-gray-900 text-sm tracking-tight">ListifyLab</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
            <p className="text-gray-400 text-sm mt-1">3-day free trial · No credit card</p>
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
            <Field label="Your Name"       fkey="name"        placeholder="Jane Smith"       value={form.name}        onChange={handleChange} />
            <Field label="Company / Brand" fkey="companyName" placeholder="Acme Fashion"     value={form.companyName} onChange={handleChange} required={false} />
            <Field label="Email Address"   fkey="email"       placeholder="you@company.com"  value={form.email}       onChange={handleChange} type="email" />
            <Field label="Password"        fkey="password"    placeholder="Min 6 characters" value={form.password}    onChange={handleChange} type="password" />

            <div className="pt-2 pb-1 border-t border-gray-100">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Manufacturer & Packer Details</p>
              <p className="text-[11px] text-gray-400">Used in marketplace listing files. Can be updated later in Admin settings.</p>
            </div>

            <Field
              label="Manufacturer Name & Address with Pincode"
              fkey="manufacturerDetails"
              placeholder="e.g. Acme Fashion, B-149, Sector 6, Noida, UP 201301, India"
              value={form.manufacturerDetails}
              onChange={handleChange}
            />
            <Field
              label="Packer Name & Address with Pincode"
              fkey="packerDetails"
              placeholder="Same as manufacturer, or different packer address"
              value={form.packerDetails}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-50 transition mt-2"
            >
              {loading ? 'Creating account...' : 'Start free trial →'}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-400">No credit card required · Cancel any time</p>
          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="font-semibold text-slate-900 hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
