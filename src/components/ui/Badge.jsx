// Status/plan badge with dot indicator
const PLAN_STYLE = {
  trial:     { bg: '#eff6ff', color: '#1d4ed8', dot: '#3b82f6' },
  monthly:   { bg: '#f0fdf4', color: '#15803d', dot: '#22c55e' },
  yearly:    { bg: '#ecfdf5', color: '#047857', dot: '#10b981' },
  lifetime:  { bg: '#f5f3ff', color: '#6d28d9', dot: '#8b5cf6' },
  cancelled: { bg: '#fff1f2', color: '#be123c', dot: '#f43f5e' },
  expired:   { bg: '#fff7ed', color: '#c2410c', dot: '#f97316' },
  active:    { bg: '#f0fdf4', color: '#15803d', dot: '#22c55e' },
};

export default function Badge({ type, label }) {
  const s = PLAN_STYLE[type] ?? { bg: '#f9fafb', color: '#6b7280', dot: '#9ca3af' };
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
      style={{ background: s.bg, color: s.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.dot }} />
      {label ?? type}
    </span>
  );
}
