import Badge from '../../components/ui/Badge';

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' }) : '—';

const getDisplayStatus = (t) =>
  t.subscriptionStatus === 'cancelled' ? 'cancelled' : !t.isActive ? 'expired' : 'active';

const ActionBtn = ({ onClick, disabled, color, children }) => (
  <button onClick={onClick} disabled={disabled}
    className="px-2.5 py-1 text-[11px] font-semibold rounded-lg transition disabled:opacity-40 whitespace-nowrap"
    style={{ background: color + '18', color, border: `1px solid ${color}30` }}>
    {children}
  </button>
);

const TABLE_HEADERS = ['Company', 'Owner', 'Plan', 'Status', 'Days Left', 'Products', 'Joined', 'Actions'];

export default function TenantTable({
  tenants, loading, error, pagination,
  setPage, actionLoading,
  onLifetime, onActivate, onCancelConfirm, onDeleteConfirm,
}) {
  return (
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <p className="text-sm text-gray-400">No tenants found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {TABLE_HEADERS.map((h) => (
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
                    <td className="px-4 py-3.5"><Badge type={t.plan} label={t.plan} /></td>
                    <td className="px-4 py-3.5"><Badge type={dispStatus} label={dispStatus} /></td>
                    <td className="px-4 py-3.5 text-xs font-medium">
                      {t.isLifetime ? (
                        <span className="text-purple-600 font-bold">∞</span>
                      ) : t.daysLeft !== null ? (
                        <span className={t.daysLeft <= 3 ? 'text-red-600' : 'text-gray-700'}>{t.daysLeft}d</span>
                      ) : '—'}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-600 font-medium">{t.productCount}</td>
                    <td className="px-4 py-3.5 text-[11px] text-gray-400">{formatDate(t.createdAt)}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {!t.isLifetime && (
                          <ActionBtn onClick={() => onLifetime(t._id)}
                            disabled={actionLoading === t._id + '_lifetime'} color="#7c3aed">
                            {actionLoading === t._id + '_lifetime' ? '…' : 'Lifetime'}
                          </ActionBtn>
                        )}
                        <ActionBtn onClick={() => onActivate(t)} color="#4f46e5">Activate</ActionBtn>
                        {t.subscriptionStatus !== 'cancelled' && (
                          <ActionBtn onClick={() => onCancelConfirm(t)}
                            disabled={actionLoading === t._id + '_cancel'} color="#f97316">
                            Cancel
                          </ActionBtn>
                        )}
                        <ActionBtn onClick={() => onDeleteConfirm(t)}
                          disabled={actionLoading === t._id + '_delete'} color="#ef4444">
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
  );
}
