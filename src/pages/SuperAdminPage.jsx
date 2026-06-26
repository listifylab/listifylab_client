import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '../api';
import { STAT_CARD_CONFIG } from '../constants/admin';
import StatCard from '../components/ui/StatCard';
import Toggle from '../components/ui/Toggle';
import ConfirmModal from './superadmin/ConfirmModal';
import ActivateModal from './superadmin/ActivateModal';
import TenantTable from './superadmin/TenantTable';

export default function SuperAdminPage() {
  const [stats, setStats] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [activateTarget, setActivateTarget] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('tenants');

  const [settings, setSettings] = useState({ paymentGatewayEnabled: false });
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState('');

  const loadStats = useCallback(async () => {
    try {
      const res = await apiFetch('/superadmin/stats');
      setStats(res.data);
    } catch {}
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
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);
  useEffect(() => {
    loadTenants();
  }, [loadTenants]);
  useEffect(() => {
    apiFetch('/superadmin/settings')
      .then((r) => setSettings(r.data))
      .catch(() => {});
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
    } catch (e) {
      setSettingsMsg('error:' + e.message);
    } finally {
      setSettingsLoading(false);
    }
  };

  const refresh = () => {
    loadStats();
    loadTenants();
  };

  const handleLifetime = async (tenantId) => {
    setActionLoading(tenantId + '_lifetime');
    try {
      await apiFetch(`/superadmin/tenants/${tenantId}/lifetime`, { method: 'POST' });
      refresh();
    } catch (e) {
      alert(e.message);
    } finally {
      setActionLoading('');
    }
  };

  const handleActivate = async (tenantId, body) => {
    await apiFetch(`/superadmin/tenants/${tenantId}/activate`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    refresh();
  };

  const handleCancel = async (tenantId) => {
    setActionLoading(tenantId + '_cancel');
    try {
      await apiFetch(`/superadmin/tenants/${tenantId}/cancel`, { method: 'POST' });
      refresh();
    } catch (e) {
      alert(e.message);
    } finally {
      setActionLoading('');
    }
  };

  const handleDelete = async (tenantId) => {
    setActionLoading(tenantId + '_delete');
    try {
      await apiFetch(`/superadmin/tenants/${tenantId}`, { method: 'DELETE' });
      refresh();
    } catch (e) {
      alert(e.message);
    } finally {
      setActionLoading('');
      setConfirm(null);
    }
  };

  const statCards = STAT_CARD_CONFIG.map((s) => ({ ...s, value: stats?.[s.key] }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Super Admin</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Manage tenants, subscriptions, and platform settings
          </p>
        </div>
        <button
          onClick={refresh}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {[
          { id: 'tenants', label: 'Tenants' },
          { id: 'settings', label: 'Settings' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-5 py-1.5 rounded-lg text-sm font-medium transition ${
              activeTab === t.id
                ? 'bg-white shadow text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── SETTINGS TAB ── */}
      {activeTab === 'settings' && (
        <div className="max-w-lg space-y-4">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Payment Gateway
              </h3>
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
                  onChange={() =>
                    saveSettings({ paymentGatewayEnabled: !settings.paymentGatewayEnabled })
                  }
                  disabled={settingsLoading}
                />
              </div>
              {settingsMsg && (
                <div
                  className={`mt-4 flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg ${
                    settingsMsg.startsWith('error')
                      ? 'bg-red-50 text-red-600'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  {settingsMsg.startsWith('error')
                    ? settingsMsg.replace('error:', '')
                    : '✓ Settings saved'}
                </div>
              )}
            </div>
            <div className="px-6 py-5 border-t border-gray-50 bg-gray-50/50">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                API Keys Setup
              </p>
              <div className="space-y-2">
                {[
                  { label: 'Key ID', env: 'RAZORPAY_KEY_ID' },
                  { label: 'Secret', env: 'RAZORPAY_KEY_SECRET' },
                ].map((k) => (
                  <div
                    key={k.env}
                    className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-2.5"
                  >
                    <span className="text-xs text-gray-400 w-10 shrink-0">{k.label}</span>
                    <code className="text-xs font-mono text-gray-700 flex-1">{k.env}</code>
                    <span className="text-[10px] text-gray-400">backend .env</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Get keys at{' '}
                <a
                  href="https://dashboard.razorpay.com/app/keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 underline underline-offset-2"
                >
                  Razorpay Dashboard → Settings → API Keys
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── TENANTS TAB ── */}
      {activeTab === 'tenants' && (
        <div className="space-y-5">
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {statCards.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>
          )}

          {/* Filters */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search by company name or code…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-800"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-800 bg-white"
              >
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

          <TenantTable
            tenants={tenants}
            loading={loading}
            error={error}
            pagination={pagination}
            setPage={setPage}
            actionLoading={actionLoading}
            onLifetime={handleLifetime}
            onActivate={(t) => setActivateTarget(t)}
            onCancelConfirm={(t) =>
              setConfirm({
                msg: `Cancel subscription for "${t.name}"?`,
                action: () => handleCancel(t._id),
              })
            }
            onDeleteConfirm={(t) =>
              setConfirm({
                msg: `DELETE tenant "${t.name}" and ALL their data? This cannot be undone.`,
                action: () => handleDelete(t._id),
              })
            }
          />
        </div>
      )}

      {confirm && (
        <ConfirmModal
          message={confirm.msg}
          onConfirm={confirm.action}
          onCancel={() => setConfirm(null)}
        />
      )}
      {activateTarget && (
        <ActivateModal
          tenant={activateTarget}
          onActivate={handleActivate}
          onClose={() => setActivateTarget(null)}
        />
      )}
    </div>
  );
}
