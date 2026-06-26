const fmt = (key) =>
  key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const BADGE_FIELDS = ['style_type', 'fabric_type', 'fitting_type', 'occasion', 'season', 'sleeve_type', 'neck_style'];
const SKIP = ['brand', 'style_name', 'style_description', 'mrp', 'style_status', 'style_primary_color', 'style_secondary_color', 'premium_style', 'checked'];

const COLOR_MAP = {
  white: '#f5f5f0', black: '#1a1a1a', red: '#c0392b', blue: '#2471a3',
  green: '#1e8449', yellow: '#f1c40f', pink: '#e91e8c', purple: '#7d3c98',
  orange: '#e67e22', grey: '#7f8c8d', gray: '#7f8c8d', beige: '#d4b896',
  brown: '#795548', navy: '#1a237e', maroon: '#7b1fa2', olive: '#827717',
  cream: '#fff8e1', charcoal: '#2d2d2d', teal: '#00838f', coral: '#e8614d',
};

const getColorDot = (colorName) => {
  if (!colorName) return null;
  const key = colorName.toLowerCase().trim();
  return COLOR_MAP[key] || '#c0c0c0';
};

const StatusPill = ({ value }) => {
  if (!value) return null;
  const v = String(value).toLowerCase();
  const styles = {
    active:   { background: '#d1fae5', color: '#065f46' },
    inactive: { background: '#fee2e2', color: '#991b1b' },
    pending:  { background: '#fef3c7', color: '#92400e' },
  };
  const s = styles[v] || { background: '#f3f4f6', color: '#374151' };
  return (
    <span style={{
      display: 'inline-block', fontSize: 10, fontWeight: 500,
      padding: '2px 9px', borderRadius: 999, letterSpacing: '0.05em', ...s
    }}>
      {value}
    </span>
  );
};

const ColorChip = ({ label }) => {
  if (!label) return null;
  const dot = getColorDot(label);
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: 11, fontWeight: 500, padding: '2px 8px',
      borderRadius: 4, background: 'rgba(0,0,0,0.04)',
      border: '0.5px solid rgba(0,0,0,0.1)', color: '#374151',
    }}>
      <span style={{
        width: 9, height: 9, borderRadius: '50%',
        background: dot, border: '0.5px solid rgba(0,0,0,0.15)',
        flexShrink: 0,
      }} />
      {label}
    </span>
  );
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
    <div style={{
      background: '#ffffff',
      borderRadius: 16,
      border: '0.5px solid rgba(0,0,0,0.1)',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      transition: 'box-shadow 0.2s',
    }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {/* Style accent */}
        <div style={{
          background: '#1e1b4b',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '1.25rem 1rem', minWidth: 80, gap: 4,
        }}>
          <span style={{
            fontSize: 9, fontWeight: 500, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: '#6366f1',
          }}>Style</span>
          <span style={{
            fontSize: 13, fontWeight: 500, color: '#e0e7ff',
            textAlign: 'center', lineHeight: 1.3, letterSpacing: '0.02em',
          }}>
            {product.styleNumber}
          </span>
        </div>

        {/* Main info */}
        <div style={{
          flex: 1, padding: '1rem 1.25rem',
          display: 'flex', flexDirection: 'column', gap: 10,
          borderLeft: '0.5px solid rgba(99,102,241,0.15)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              {brand && (
                <p style={{
                  fontSize: 10, fontWeight: 500, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: '#6366f1', margin: '0 0 3px',
                }}>
                  {brand}
                </p>
              )}
              {styleName ? (
                <h3 style={{
                  fontSize: 14, fontWeight: 500, color: '#111827',
                  lineHeight: 1.4, margin: 0,
                  overflow: 'hidden', display: '-webkit-box',
                  WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                }}>
                  {styleName}
                </h3>
              ) : (
                <h3 style={{ fontSize: 14, color: '#9ca3af', fontStyle: 'italic', margin: 0 }}>
                  Untitled Style
                </h3>
              )}
            </div>

            {/* Price + status */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
              {mrp !== undefined && (
                <span style={{ fontSize: 22, fontWeight: 500, color: '#111827', letterSpacing: '-0.02em' }}>
                  ₹{typeof mrp === 'number' ? mrp.toLocaleString('en-IN') : mrp}
                </span>
              )}
              <StatusPill value={status} />
              {premium && (
                <span style={{
                  fontSize: 10, fontWeight: 500, padding: '2px 9px',
                  borderRadius: 999, background: '#ede9fe', color: '#5b21b6',
                  border: '0.5px solid #c4b5fd', letterSpacing: '0.04em',
                }}>
                  ✦ Premium
                </span>
              )}
            </div>
          </div>

          {/* Color chips */}
          {(primaryColor || secondColor) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, color: '#9ca3af' }}>Color</span>
              <ColorChip label={primaryColor} />
              {secondColor && <ColorChip label={secondColor} />}
            </div>
          )}
        </div>
      </div>

      {/* Attribute badges */}
      {badgeEntries.length > 0 && (
        <div style={{
          padding: '0.75rem 1.25rem',
          borderTop: '0.5px solid rgba(0,0,0,0.06)',
          display: 'flex', flexWrap: 'wrap', gap: 6,
        }}>
          {badgeEntries.map(([key, val]) => (
            <span key={key} style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontSize: 11, padding: '3px 10px', borderRadius: 999,
              background: '#f9fafb', border: '0.5px solid rgba(0,0,0,0.1)',
            }}>
              <span style={{ color: '#9ca3af' }}>{fmt(key)}:</span>
              <span style={{ color: '#111827', fontWeight: 500 }}>{String(val)}</span>
            </span>
          ))}
        </div>
      )}

      {/* Expandable extra fields */}
      {otherKeys.length > 0 && (
        <details style={{ borderTop: '0.5px solid rgba(0,0,0,0.06)' }}>
          <summary style={{
            padding: '0.6rem 1.25rem', fontSize: 11, color: '#9ca3af',
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            gap: 6, userSelect: 'none', listStyle: 'none',
          }}>
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {otherKeys.length} more field{otherKeys.length !== 1 ? 's' : ''}
          </summary>
          <div style={{
            padding: '0.75rem 1.25rem 1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '12px 20px',
          }}>
            {otherKeys.map((k) => (
              <div key={k}>
                <span style={{
                  display: 'block', fontSize: 10, textTransform: 'uppercase',
                  letterSpacing: '0.1em', color: '#9ca3af', fontWeight: 500, marginBottom: 2,
                }}>
                  {fmt(k)}
                </span>
                <span style={{ fontSize: 12, fontWeight: 500, color: '#111827' }}>
                  {String(f[k])}
                </span>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
};

export default ProductCard;