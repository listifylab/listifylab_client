
import { useState, useEffect } from 'react';
import { useSubscription } from '../hooks/useSubscription';
import { useFields } from '../hooks/useFields';
import { usePaymentConfig } from '../hooks/usePaymentConfig';
import { apiFetch } from '../api';

const PLAN_LABELS = { trial: 'Free Trial', monthly: 'Monthly', yearly: 'Yearly', lifetime: 'Lifetime' };
const PLAN_COLOR  = {
  trial:    'bg-blue-50 text-blue-700',
  monthly:  'bg-green-50 text-green-700',
  yearly:   'bg-emerald-50 text-emerald-700',
  lifetime: 'bg-purple-50 text-purple-700',
};

const PLAN_UI = [
  {
    key: 'monthly',
    label: 'Monthly',
    price: '₹999',
    sub: 'per month',
    color: 'border-slate-200',
    badge: '',
    features: ['Full catalogue access', 'CSV import & export', 'Dynamic fields', 'Email support'],
  },
  {
    key: 'yearly',
    label: 'Yearly',
    price: '₹9,999',
    sub: 'per year · save 17%',
    color: 'border-indigo-300',
    badge: 'Popular',
    features: ['Everything in Monthly', 'Priority support', 'Early feature access'],
  },
  {
    key: 'lifetime',
    label: 'Lifetime',
    price: '₹14,999',
    sub: 'one-time · 2 yrs free maintenance',
    color: 'border-purple-300',
    badge: 'Best value',
    features: ['Everything in Yearly', 'Permanent access', 'All future updates', 'Maintenance after 2 yrs billed separately'],
  },
];

const InfoRow = ({ label, children }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
    <span className="text-sm text-gray-400">{label}</span>
    <span className="text-sm font-semibold text-gray-800">{children}</span>
  </div>
);

const Btn = ({ onClick, disabled, variant = 'primary', children, className = '' }) => {
  const base = 'px-4 py-2 rounded-xl text-sm font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed';
  const v = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800',
    outline: 'border border-gray-200 text-gray-700 hover:bg-gray-50',
    indigo:  'bg-indigo-600 text-white hover:bg-indigo-700',
    purple:  'bg-purple-600 text-white hover:bg-purple-700',
  };
  return <button onClick={onClick} disabled={disabled} className={`${base} ${v[variant]} ${className}`}>{children}</button>;
};

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function AdminPage({ user }) {
  const [tab, setTab] = useState('subscription');
  const { sub, loading: subLoading, refetch: refetchSub } = useSubscription(user);
  const { fields, loading: fieldsLoading, addField, deleteField } = useFields();
  const { config: payConfig, loading: configLoading } = usePaymentConfig();

  const [newField, setNewField] = useState({ name: '', key: '', type: 'string' });
  const [msg, setMsg]     = useState('');
  const [err, setErr]     = useState('');
  const [busy, setBusy]   = useState('');
  const [paying, setPaying] = useState('');

  const clear = () => { setMsg(''); setErr(''); };

  const run = async (key, fn, successMsg) => {
    clear(); setBusy(key);
    try { await fn(); setMsg(successMsg); }
    catch (e) { setErr(e.message); }
    finally { setBusy(''); }
  };

  const handlePay = async (planKey) => {
    clear();
    setPaying(planKey);
    try {
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error('Could not load Razorpay. Check your internet connection.');

      // 1. Create order on backend
      const res = await apiFetch('/payment/create-order', {
        method: 'POST',
        body: JSON.stringify({ plan: planKey }),
      });
      const { orderId, amount, currency, planLabel, keyId, tenantName } = res.data;

      // 2. Open Razorpay checkout
      await new Promise((resolve, reject) => {
        const rzp = new window.Razorpay({
          key: keyId,
          amount,
          currency,
          order_id: orderId,
          name: 'CMS — Catalog Management System',
          description: `${planLabel} Plan`,
          prefill: {
            name: user?.name || tenantName,
            email: user?.email || '',
          },
          theme: { color: '#0f172a' },
          handler: async (response) => {
            try {
              // 3. Verify payment on backend → auto-activates subscription
              await apiFetch('/payment/verify', {
                method: 'POST',
                body: JSON.stringify({
                  razorpay_order_id:   response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature:  response.razorpay_signature,
                  plan: planKey,
                }),
              });
              await refetchSub();
              setMsg(`Payment successful! Your ${planLabel} plan is now active.`);
              resolve();
            } catch (e) {
              reject(e);
            }
          },
          modal: {
            ondismiss: () => reject(new Error('Payment cancelled.')),
          },
        });
        rzp.open();
      });
    } catch (e) {
      if (e.message !== 'Payment cancelled.') setErr(e.message);
    } finally {
      setPaying('');
    }
  };

  const tabs = [
    { id: 'subscription', label: 'Subscription' },
    { id: 'fields',       label: 'Field Definitions' },
  ];

  const isCurrentPlan = (planKey) => sub?.plan === planKey && sub?.isActive;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
        <p className="text-sm text-gray-400 mt-0.5">Manage your subscription and custom fields</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => { setTab(t.id); clear(); }}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              tab === t.id ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {msg && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {msg}
        </div>
      )}
      {err && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          {err}
        </div>
      )}

      {/* ── SUBSCRIPTION TAB ── */}
      {tab === 'subscription' && (
        <div className="space-y-5">

          {/* Current plan status */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Current Plan</h3>
            {subLoading ? (
              <div className="h-16 flex items-center justify-center">
                <div className="animate-spin w-5 h-5 border-2 border-slate-800 border-t-transparent rounded-full" />
              </div>
            ) : sub ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${PLAN_COLOR[sub.plan] || 'bg-gray-100 text-gray-600'}`}>
                    {PLAN_LABELS[sub.plan] || sub.plan}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${sub.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {sub.isActive ? 'Active' : 'Inactive'}
                  </span>
                  {sub.isLifetime && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                      Lifetime
                    </span>
                  )}
                </div>
                <div>
                  {sub.plan === 'trial' && sub.trialEndDate && (
                    <InfoRow label="Trial Ends">
                      {new Date(sub.trialEndDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </InfoRow>
                  )}
                  {!sub.isLifetime && sub.daysLeft !== null && (
                    <InfoRow label="Days Remaining">
                      <span className={sub.daysLeft <= 3 ? 'text-red-600' : ''}>{sub.daysLeft} days</span>
                    </InfoRow>
                  )}
                  {sub.subscriptionEndDate && !sub.isLifetime && (
                    <InfoRow label="Expires">
                      {new Date(sub.subscriptionEndDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </InfoRow>
                  )}
                  <InfoRow label="Company">{sub.tenantName}</InfoRow>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-400">Unable to load subscription info.</p>
            )}
          </div>

          {/* Plan cards — shown only when payment gateway is enabled */}
          {configLoading ? null : payConfig.enabled ? (
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Upgrade Your Plan</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PLAN_UI.map((p) => {
                  const current = isCurrentPlan(p.key) || (sub?.isLifetime && p.key === 'lifetime');
                  const isPaying = paying === p.key;
                  const accent = p.key === 'lifetime' ? { bg: '#7c3aed', light: '#f5f3ff', ring: '#ddd6fe' }
                               : p.key === 'yearly'   ? { bg: '#4f46e5', light: '#eef2ff', ring: '#c7d2fe' }
                               :                        { bg: '#0f172a', light: '#f8fafc', ring: '#e2e8f0' };
                  return (
                    <div key={p.key}
                      className="relative rounded-2xl overflow-hidden flex flex-col"
                      style={{
                        background: current ? accent.bg : '#fff',
                        border: `1px solid ${current ? accent.bg : '#e5e7eb'}`,
                        boxShadow: current ? `0 4px 20px ${accent.ring}` : '0 1px 4px rgba(0,0,0,0.05)',
                      }}>

                      {/* Badge */}
                      {(p.badge || current) && (
                        <div className="absolute top-3 right-3">
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={current
                              ? { background: 'rgba(255,255,255,0.2)', color: '#fff' }
                              : { background: accent.light, color: accent.bg, border: `1px solid ${accent.ring}` }}>
                            {current ? 'Current' : p.badge}
                          </span>
                        </div>
                      )}

                      {/* Card body */}
                      <div className="p-5 flex-1 flex flex-col">
                        <p className="text-xs font-bold uppercase tracking-widest mb-3"
                          style={{ color: current ? 'rgba(255,255,255,0.6)' : '#9ca3af' }}>
                          {p.label}
                        </p>

                        <div className="mb-4">
                          <span className="text-2xl font-black" style={{ color: current ? '#fff' : '#111827' }}>
                            {p.price}
                          </span>
                          <span className="text-[11px] ml-1.5 font-medium" style={{ color: current ? 'rgba(255,255,255,0.55)' : '#9ca3af' }}>
                            {p.sub}
                          </span>
                        </div>

                        <ul className="space-y-2 flex-1 mb-5">
                          {p.features.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-xs"
                              style={{ color: current ? 'rgba(255,255,255,0.75)' : '#6b7280' }}>
                              <svg className="w-3.5 h-3.5 mt-0.5 shrink-0"
                                style={{ color: current ? 'rgba(255,255,255,0.9)' : '#10b981' }}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                              {f}
                            </li>
                          ))}
                        </ul>

                        {current ? (
                          <div className="w-full py-2.5 rounded-xl text-xs font-bold text-center"
                            style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                            ✓ Active Plan
                          </div>
                        ) : (
                          <button
                            disabled={!!paying}
                            onClick={() => handlePay(p.key)}
                            className="w-full py-2.5 rounded-xl text-xs font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ background: accent.light, color: accent.bg, border: `1px solid ${accent.ring}` }}>
                            {isPaying ? (
                              <span className="flex items-center justify-center gap-1.5">
                                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                </svg>
                                Processing...
                              </span>
                            ) : 'Pay Now'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-[11px] text-gray-400 mt-3 text-center">
                Secured by Razorpay · UPI · Cards · Netbanking · Wallets
              </p>
            </div>
          ) : (
            /* Gateway disabled — contact admin notice */
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">Want to upgrade your plan?</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Online payments are not yet enabled. Contact your account manager or reach us at{' '}
                    <a href="mailto:support@cms.app" className="text-slate-800 font-semibold underline underline-offset-2">
                      support@cms.app
                    </a> to upgrade.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ── FIELDS TAB ── */}
      {tab === 'fields' && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Add Field</h3>
            <p className="text-xs text-gray-400 mb-5">Fields are also auto-registered when you import a CSV with new column headers.</p>
            <div className="flex flex-wrap gap-3 items-end">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Display Name</label>
                <input type="text" value={newField.name} placeholder="e.g. Fabric Type"
                  onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                  className="w-36 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Key (slug)</label>
                <input type="text" value={newField.key} placeholder="fabric_type"
                  onChange={(e) => setNewField({ ...newField, key: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_') })}
                  className="w-36 border border-gray-200 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Type</label>
                <select value={newField.type} onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800">
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                  <option value="date">Date</option>
                </select>
              </div>
              <Btn disabled={busy === 'addField'}
                onClick={() => {
                  if (!newField.name.trim() || !newField.key.trim()) { setErr('Name and Key are required'); return; }
                  run('addField', () => addField(newField).then(() => setNewField({ name: '', key: '', type: 'string' })), 'Field added.');
                }}>
                {busy === 'addField' ? 'Adding...' : 'Add Field'}
              </Btn>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Registered Fields {!fieldsLoading && `(${fields.length})`}
              </h3>
            </div>
            {fieldsLoading ? (
              <div className="flex items-center justify-center p-10">
                <div className="animate-spin w-5 h-5 border-2 border-slate-800 border-t-transparent rounded-full" />
              </div>
            ) : fields.length === 0 ? (
              <div className="p-10 text-center text-sm text-gray-400">
                No fields yet — upload a CSV or add one above.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    <th className="px-6 py-3">Display Name</th>
                    <th className="px-6 py-3">Key</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {fields.map((f) => (
                    <tr key={f._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-3 font-medium text-gray-800">{f.name}</td>
                      <td className="px-6 py-3 font-mono text-xs text-gray-500">{f.key}</td>
                      <td className="px-6 py-3">
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-medium">{f.type}</span>
                      </td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => { if (confirm(`Delete "${f.name}"?`)) deleteField(f._id).catch((e) => setErr(e.message)); }}
                          className="text-xs text-red-400 hover:text-red-600 font-medium transition">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
