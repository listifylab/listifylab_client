const fmt = (key) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const BADGE_FIELDS = ['style_type', 'fabric_type', 'fitting_type', 'occasion', 'season', 'sleeve_type', 'neck_style'];
const SKIP = ['brand', 'style_name', 'style_description', 'mrp', 'style_status', 'style_primary_color', 'style_secondary_color', 'premium_style', 'checked'];

const StatusPill = ({ value }) => {
  if (!value) return null;
  const v = String(value).toLowerCase();
  const color =
    v === 'active' ? 'bg-emerald-100 text-emerald-700' :
    v === 'inactive' ? 'bg-red-100 text-red-700' :
    v === 'pending' ? 'bg-amber-100 text-amber-700' :
    'bg-gray-100 text-gray-600';
  return <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide ${color}`}>{value}</span>;
};

const ProductCard = ({ product }) => {
  const f = product.fields || {};

  const brand        = f.brand;
  const styleName    = f.style_name || f.style_description;
  const mrp          = f.mrp;
  const status       = f.style_status;
  const primaryColor = f.style_primary_color;
  const secondColor  = f.style_secondary_color;
  const premium      = f.premium_style;

  const badgeEntries = BADGE_FIELDS.filter((k) => f[k]).map((k) => [k, f[k]]);
  const otherKeys = Object.keys(f).filter((k) => !BADGE_FIELDS.includes(k) && !SKIP.includes(k));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden font-sans">
      {/* Top bar */}
      <div className="flex items-stretch">
        {/* Style number accent */}
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 text-white flex flex-col items-center justify-center px-5 py-4 min-w-[88px]">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Style</span>
          <span className="text-base font-bold tracking-tight leading-tight text-center">{product.styleNumber}</span>
        </div>

        {/* Main info */}
        <div className="flex-1 px-5 py-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div>
              {brand && (
                <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-500 mb-0.5">{brand}</p>
              )}
              {styleName && (
                <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{styleName}</h3>
              )}
              {!styleName && !brand && (
                <h3 className="text-sm font-semibold text-gray-500 italic">Untitled Style</h3>
              )}
            </div>

            <div className="flex flex-col items-end gap-1 shrink-0">
              {mrp !== undefined && (
                <span className="text-xl font-bold text-gray-900">
                  ₹{typeof mrp === 'number' ? mrp.toLocaleString('en-IN') : mrp}
                </span>
              )}
              <StatusPill value={status} />
              {premium && (
                <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
                  Premium
                </span>
              )}
            </div>
          </div>

          {/* Color dots */}
          {(primaryColor || secondColor) && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] text-gray-400 font-medium">Color:</span>
              {primaryColor && (
                <span className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">{primaryColor}</span>
              )}
              {secondColor && (
                <span className="text-[11px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded border border-gray-200">{secondColor}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Attribute badges */}
      {badgeEntries.length > 0 && (
        <div className="px-5 py-3 border-t border-gray-50 flex flex-wrap gap-1.5">
          {badgeEntries.map(([key, val]) => (
            <span key={key} className="inline-flex items-center gap-1 text-[11px] bg-slate-50 text-slate-600 border border-slate-200 rounded-full px-2.5 py-0.5 font-medium">
              <span className="text-slate-400">{fmt(key)}:</span>
              <span className="text-slate-700">{String(val)}</span>
            </span>
          ))}
        </div>
      )}

      {/* Expandable extra fields */}
      {otherKeys.length > 0 && (
        <details className="border-t border-gray-50">
          <summary className="px-5 py-2 text-[11px] text-gray-400 cursor-pointer hover:text-gray-600 select-none list-none flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {otherKeys.length} more field{otherKeys.length !== 1 ? 's' : ''}
          </summary>
          <div className="px-5 pb-4 pt-2 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
            {otherKeys.map((k) => (
              <div key={k}>
                <span className="block text-[10px] text-gray-400 uppercase tracking-wide font-medium">{fmt(k)}</span>
                <span className="text-xs text-gray-700 font-medium">{String(f[k])}</span>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
};

export default ProductCard;
