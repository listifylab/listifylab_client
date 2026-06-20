import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '../api';

// ── Badge helpers ─────────────────────────────────────────────────────────────
const PLAN_STYLE = {
  trial:     { bg: '#eff6ff', color: '#1d4ed8', dot: '#3b82f6' },
  monthly:   { bg: '#f0fdf4', color: '#15803d', dot: '#22c55e' },
  yearly:    { bg: '#ecfdf5', color: '#047857', dot: '#10b981' },
  lifetime:  { bg: '#f5f3ff', color: '#6d28d9', dot: '#8b5cf6' },
  cancelled: { bg: '#fff1f2', color: '#be123c', dot: '#f43f5e' },
  expired:   { bg: '#fff7ed', color: '#c2410c', dot: '#f97316' },
  active:    { bg: '#f0fdf4', color: '#15803d', dot: '#22c55e' },
};

const Badge = ({ type, label }) => {
  const s = PLAN_STYLE[type] || { bg: '#f9fafb', color: '#6b7280', dot: '#9ca3af' };
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
      style={{ background: s.bg, color: s.color }}>
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.dot }} />
      {label || type}
    </span>
  );
};

// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, accent }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: accent + '18' }}>
      <span className="text-lg" style={{ color: accent }}>{icon}</span>
    </div>
    <div>
      <p className="text-2xl font-black text-gray-900 leading-none">{value ?? '—'}</p>
      <p className="text-xs text-gray-400 mt-0.5 font-medium">{label}</p>
    </div>
  </div>
);

// ── Confirm modal ─────────────────────────────────────────────────────────────
function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed mb-5">{message}</p>
        <div className="flex gap-2 justify-end">
          <button onClick={onCancel}
            className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={onConfirm}
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-red-600 text-white hover:bg-red-700 transition">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Activate modal ────────────────────────────────────────────────────────────
function ActivateModal({ tenant, onActivate, onClose }) {
  const [plan, setPlan]     = useState('monthly');
  const [months, setMonths] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    try {
      await onActivate(tenant._id, { plan, durationMonths: months ? Number(months) : undefined });
      onClose();
    } catch (e) { alert(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Activate Subscription</h3>
            <p className="text-xs text-gray-400">{tenant.name}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Plan</label>
            <select value={plan} onChange={(e) => setPlan(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Duration (months) <span className="text-gray-300 font-normal normal-case">— optional</span>
            </label>
            <input type="number" min="1" placeholder={plan === 'yearly' ? '12' : '1'} value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-5">
          <button onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={handle} disabled={loading}
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition">
            {loading ? 'Activating...' : 'Activate'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Toggle switch ─────────────────────────────────────────────────────────────
const Toggle = ({ checked, onChange, disabled }) => (
  <button onClick={onChange} disabled={disabled}
    className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50 ${checked ? 'bg-emerald-500' : 'bg-gray-200'}`}>
    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

// ── Main page ─────────────────────────────────────────────────────────────────
export default function SuperAdminPage() {
  const [stats, setStats]             = useState(null);
  const [tenants, setTenants]         = useState([]);
  const [pagination, setPagination]   = useState({});
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage]               = useState(1);
  const [actionLoading, setActionLoading] = useState('');
  const [confirm, setConfirm]         = useState(null);
  const [activateTarget, setActivateTarget] = useState(null);
  const [error, setError]             = useState('');
  const [activeTab, setActiveTab]     = useState('tenants');

  const [settings, setSettings]           = useState({ paymentGatewayEnabled: false });
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsMsg, setSettingsMsg]     = useState('');

  const loadStats = useCallback(async () => {
    try { const res = await apiFetch('/superadmin/stats'); setStats(res.data); } catch {}
  }, []);

  const loadTenants = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 15 });
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      const res = await apiFetch(`/superadmin/tenants?${params}`);
      setTenants(res.data.tenants || []);
      setPagination(res.data.pagination || {});
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, [page, search, statusFilter]);

  useEffect(() => { loadStats(); }, [loadStats]);
  useEffect(() => { setPage(1); }, [search, statusFilter]);
  useEffect(() => { loadTenants(); }, [loadTenants]);
  useEffect(() => {
    apiFetch('/superadmin/settings').then((r) => setSettings(r.data)).catch(() => {});
  }, []);

  const saveSettings = async (patch) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    setSettingsLoading(true);
    setSettingsMsg('');
    try {
      await apiFetch('/superadmin/settings', { method: 'PUT', body: JSON.stringify(next) });
      setSettingsMsg('saved');
      setTimeout(() => setSettingsMsg(''), 2500);
    } catch (e) { setSettingsMsg('error:' + e.message); }
    finally { setSettingsLoading(false); }
  };

  const refresh = () => { loadStats(); loadTenants(); };

  const handleLifetime = async (tenantId) => {
    setActionLoading(tenantId + '_lifetime');
    try { await apiFetch(`/superadmin/tenants/${tenantId}/lifetime`, { method: 'POST' }); refresh(); }
    catch (e) { alert(e.message); }
    finally { setActionLoading(''); }
  };

  const handleActivate = async (tenantId, body) => {
    await apiFetch(`/superadmin/tenants/${tenantId}/activate`, { method: 'POST', body: JSON.stringify(body) });
    refresh();
  };

  const handleCancel = async (tenantId) => {
    setActionLoading(tenantId + '_cancel');
    try { await apiFetch(`/superadmin/tenants/${tenantId}/cancel`, { method: 'POST' }); refresh(); }
    catch (e) { alert(e.message); }
    finally { setActionLoading(''); }
  };

  const handleDelete = async (tenantId) => {
    setActionLoading(tenantId + '_delete');
    try { await apiFetch(`/superadmin/tenants/${tenantId}`, { method: 'DELETE' }); refresh(); }
    catch (e) { alert(e.message); }
    finally { setActionLoading(''); setConfirm(null); }
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' }) : '—';
  const getDisplayStatus = (t) => t.subscriptionStatus === 'cancelled' ? 'cancelled' : !t.isActive ? 'expired' : 'active';

  const STAT_CARDS = [
    { label: 'Total', value: stats?.total,     icon: '🏢', accent: '#64748b' },
    { label: 'Trial',     value: stats?.trial,     icon: '🔵', accent: '#3b82f6' },
    { label: 'Monthly',   value: stats?.monthly,   icon: '📅', accent: '#22c55e' },
    { label: 'Yearly',    value: stats?.yearly,    icon: '🗓️', accent: '#10b981' },
    { label: 'Lifetime',  value: stats?.lifetime,  icon: '♾️', accent: '#8b5cf6' },
    { label: 'Cancelled', value: stats?.cancelled, icon: '🔴', accent: '#f43f5e' },
    { label: 'Expired',   value: stats?.expired,   icon: '⏰', accent: '#f97316' },
  ];

  // ── Action button helper
  const ActionBtn = ({ onClick, disabled, color, children }) => (
    <button onClick={onClick} disabled={disabled}
      className="px-2.5 py-1 text-[11px] font-semibold rounded-lg transition disabled:opacity-40 whitespace-nowrap"
      style={{ background: color + '18', color, border: `1px solid ${color}30` }}>
      {children}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Super Admin</h2>
          <p className="text-sm text-gray-400 mt-0.5">Manage tenants, subscriptions, and platform settings</p>
        </div>
        <button onClick={refresh}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Refresh
        </button>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {[{ id: 'tenants', label: 'Tenants' }, { id: 'settings', label: 'Settings' }].map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`px-5 py-1.5 rounded-lg text-sm font-medium transition ${
              activeTab === t.id ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── SETTINGS TAB ─────────────────────────────────────────────────── */}
      {activeTab === 'settings' && (
        <div className="max-w-lg space-y-4">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Payment Gateway</h3>
            </div>
            <div className="px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Enable Razorpay Payments</p>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Users see Pay Now buttons and can self-subscribe without contacting you.
                  </p>
                </div>
                <Toggle
                  checked={settings.paymentGatewayEnabled}
                  onChange={() => saveSettings({ paymentGatewayEnabled: !settings.paymentGatewayEnabled })}
                  disabled={settingsLoading}
                />
              </div>

              {settingsMsg && (
                <div className={`mt-4 flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg ${
                  settingsMsg.startsWith('error')
                    ? 'bg-red-50 text-red-600'
                    : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {settingsMsg.startsWith('error')
                    ? settingsMsg.replace('error:', '')
                    : '✓ Settings saved'}
                </div>
              )}
            </div>

            <div className="px-6 py-5 border-t border-gray-50 bg-gray-50/50">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">API Keys Setup</p>
              <div className="space-y-2">
                {[
                  { label: 'Key ID', env: 'RAZORPAY_KEY_ID' },
                  { label: 'Secret', env: 'RAZORPAY_KEY_SECRET' },
                ].map((k) => (
                  <div key={k.env} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-2.5">
                    <span className="text-xs text-gray-400 w-10 shrink-0">{k.label}</span>
                    <code className="text-xs font-mono text-gray-700 flex-1">{k.env}</code>
                    <span className="text-[10px] text-gray-400">backend .env</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Get keys at{' '}
                <a href="https://dashboard.razorpay.com/app/keys" target="_blank" rel="noreferrer"
                  className="text-indigo-600 underline underline-offset-2">
                  Razorpay Dashboard → Settings → API Keys
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── TENANTS TAB ──────────────────────────────────────────────────── */}
      {activeTab === 'tenants' && (
        <div className="space-y-5">
          {/* Stat cards */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {STAT_CARDS.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>
          )}

          {/* Filters */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input type="text" placeholder="Search by company name or code…" value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-800"
                />
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-800 bg-white">
                <option value="">All Plans</option>
                <option value="trial">Trial</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="lifetime">Lifetime</option>
                <option value="cancelled">Cancelled</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            {error && (
              <div className="px-5 py-3 text-sm text-red-600 bg-red-50 border-b border-red-100">{error}</div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-7 w-7 border-2 border-slate-800 border-t-transparent" />
              </div>
            ) : tenants.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <p className="text-sm text-gray-400">No tenants found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      {['Company', 'Owner', 'Plan', 'Status', 'Days Left', 'Products', 'Joined', 'Actions'].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {tenants.map((t) => {
                      const dispStatus = getDisplayStatus(t);
                      return (
                        <tr key={t._id} className="hover:bg-gray-50/60 transition">
                          <td className="px-4 py-3.5">
                            <p className="font-semibold text-gray-900 text-xs">{t.name}</p>
                            <p className="text-[11px] text-gray-400 font-mono">{t.code}</p>
                          </td>
                          <td className="px-4 py-3.5">
                            <p className="text-gray-700 text-xs">{t.user?.name || '—'}</p>
                            <p className="text-[11px] text-gray-400">{t.user?.email || '—'}</p>
                          </td>
                          <td className="px-4 py-3.5">
                            <Badge type={t.plan} label={t.plan} />
                          </td>
                          <td className="px-4 py-3.5">
                            <Badge type={dispStatus} label={dispStatus} />
                          </td>
                          <td className="px-4 py-3.5 text-xs font-medium">
                            {t.isLifetime ? (
                              <span className="text-purple-600 font-bold">∞</span>
                            ) : t.daysLeft !== null ? (
                              <span className={t.daysLeft <= 3 ? 'text-red-600' : 'text-gray-700'}>
                                {t.daysLeft}d
                              </span>
                            ) : '—'}
                          </td>
                          <td className="px-4 py-3.5 text-xs text-gray-600 font-medium">{t.productCount}</td>
                          <td className="px-4 py-3.5 text-[11px] text-gray-400">{formatDate(t.createdAt)}</td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {!t.isLifetime && (
                                <ActionBtn onClick={() => handleLifetime(t._id)}
                                  disabled={actionLoading === t._id + '_lifetime'}
                                  color="#7c3aed">
                                  {actionLoading === t._id + '_lifetime' ? '…' : 'Lifetime'}
                                </ActionBtn>
                              )}
                              <ActionBtn onClick={() => setActivateTarget(t)} color="#4f46e5">
                                Activate
                              </ActionBtn>
                              {t.subscriptionStatus !== 'cancelled' && (
                                <ActionBtn
                                  onClick={() => setConfirm({ msg: `Cancel subscription for "${t.name}"?`, action: () => handleCancel(t._id) })}
                                  disabled={actionLoading === t._id + '_cancel'}
                                  color="#f97316">
                                  Cancel
                                </ActionBtn>
                              )}
                              <ActionBtn
                                onClick={() => setConfirm({
                                  msg: `DELETE tenant "${t.name}" and ALL their data? This cannot be undone.`,
                                  action: () => handleDelete(t._id),
                                })}
                                disabled={actionLoading === t._id + '_delete'}
                                color="#ef4444">
                                Delete
                              </ActionBtn>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                <span className="text-xs text-gray-400">
                  {pagination.total} tenants · page {pagination.page} of {pagination.totalPages}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setPage((p) => p - 1)} disabled={pagination.page <= 1}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-500 hover:bg-white disabled:opacity-40 transition">
                    ← Prev
                  </button>
                  <button onClick={() => setPage((p) => p + 1)} disabled={pagination.page >= pagination.totalPages}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-500 hover:bg-white disabled:opacity-40 transition">
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {confirm && <ConfirmModal message={confirm.msg} onConfirm={confirm.action} onCancel={() => setConfirm(null)} />}
      {activateTarget && <ActivateModal tenant={activateTarget} onActivate={handleActivate} onClose={() => setActivateTarget(null)} />}
    </div>
  );
}
