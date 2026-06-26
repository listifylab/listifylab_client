// Stat card used in SuperAdmin dashboard
export default function StatCard({ label, value, icon, accent }) {
  return (
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
}
