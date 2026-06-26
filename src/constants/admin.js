// Admin panel constants — listing settings, mappings, superadmin stats

// Size range options for SKU generation
export const SIZE_RANGE_OPTIONS = [
  { value: 'xxs-5xl', label: 'XXS - 5XL', sizes: 'XXS, XS, S, M, L, XL, 1XL, 2XL, 3XL, 4XL, 5XL' },
  { value: 'xxs-2xl', label: 'XXS - 2XL', sizes: 'XXS, XS, S, M, L, XL, 1XL, 2XL' },
  { value: 'xs-xl',   label: 'XS - XL',   sizes: 'XS, S, M, L, XL' },
  { value: 's-l',     label: 'S - L',      sizes: 'S, M, L' },
  { value: 'custom',  label: 'Custom',     sizes: 'Define your own sizes' },
];

// Marketplace options for custom value mappings
export const MARKETPLACE_OPTIONS = [
  { id: 'myntra',   name: 'Myntra',        accent: '#FF3F6C' },
  { id: 'nykaa',    name: 'Nykaa Fashion', accent: '#FC2779' },
  { id: 'ajio',     name: 'Ajio',          accent: '#8B2FC9' },
  { id: 'tatacliq', name: 'Tata CLiQ',     accent: '#DC143C' },
  { id: 'shopify',  name: 'Shopify',       accent: '#96BF48' },
];

// Fields available for custom value mapping per channel
export const MAPPING_FIELDS = [
  { id: 'color',          label: 'Color / Colour' },
  { id: 'fabric',         label: 'Fabric / Material' },
  { id: 'fabricType',     label: 'Fabric Type' },
  { id: 'pattern',        label: 'Pattern / Print' },
  { id: 'occasion',       label: 'Occasion' },
  { id: 'sleeveLength',   label: 'Sleeve Length' },
  { id: 'fittingType',    label: 'Fitting Type' },
  { id: 'neckStyle',      label: 'Neck Style / Neckline' },
  { id: 'season',         label: 'Season' },
  { id: 'closure',        label: 'Closure' },
  { id: 'washCare',       label: 'Wash Care' },
  { id: 'prominentColor', label: 'Prominent Colour' },
];

// Stat cards config for SuperAdmin dashboard
export const STAT_CARD_CONFIG = [
  { key: 'total',     label: 'Total',     icon: '🏢', accent: '#64748b' },
  { key: 'trial',     label: 'Trial',     icon: '🔵', accent: '#3b82f6' },
  { key: 'monthly',   label: 'Monthly',   icon: '📅', accent: '#22c55e' },
  { key: 'yearly',    label: 'Yearly',    icon: '🗓️', accent: '#10b981' },
  { key: 'lifetime',  label: 'Lifetime',  icon: '♾️', accent: '#8b5cf6' },
  { key: 'cancelled', label: 'Cancelled', icon: '🔴', accent: '#f43f5e' },
  { key: 'expired',   label: 'Expired',   icon: '⏰', accent: '#f97316' },
];
