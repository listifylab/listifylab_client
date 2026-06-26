import InfoRow from '../../components/ui/InfoRow';
import { PLAN_LABELS, PLAN_COLOR, PLAN_UI } from '../../constants/plans';

export default function SubscriptionTab({ sub, subLoading, payConfig, configLoading, paying, handlePay }) {
  const isCurrentPlan = (planKey) => sub?.plan === planKey && sub?.isActive;

  return (
    <div className="space-y-5">

      {/* Current plan card */}
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
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">Lifetime</span>
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

      {/* Upgrade section */}
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
                        Active Plan
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
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
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
                </a>{' '}to upgrade.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
