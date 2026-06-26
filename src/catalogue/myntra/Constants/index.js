/**
 * Myntra platform constants
 */

// ── Size mappings per size range ───────────────────────────────────────────────
// Key = internal/brand size label, Value = Myntra display label
export const MYNTRA_SIZE_RANGES = {
  'xxs-5xl': {
    'XXS': 'XXS',
    'XS': 'XS',
    'S': 'S',
    'M': 'M',
    'L': 'L',
    'XL': '1XL',
    '2XL': '2XL',
    '3XL': '3XL',
    '4XL': '4XL',
    '5XL': '5XL',
  },
  'xxs-2xl': {
    'XXS': 'XXS',
    'XS': 'XS',
    'S': 'S',
    'M': 'M',
    'L': 'L',
    'XL': '1XL',
    '2XL': '2XL',
  },
  's-l': {
    'S': 'S',
    'M': 'M',
    'L': 'L',
  },
  'xs-xl': {
    'XS': 'XS',
    'S': 'S',
    'M': 'M',
    'L': 'L',
    'XL': '1XL',
  },
};

// Default size mapping (used when no admin preference is set)
export const MYNTRA_SIZE_MAPPING = MYNTRA_SIZE_RANGES['xxs-5xl'];

// Myntra standard size mapping (brand size → standard size label)
export function getMyntraStandardSize(brandSize = '') {
  const map = {
    'XXS': 'XXS',
    'XS': 'XS',
    'S': 'S',
    'M': 'M',
    'L': 'L',
    'XL': 'XL',
    '2XL': 'XXL',
    '3XL': '3XL',
    '4XL': '4XL',
    '5XL': '5XL',
  };
  return map[brandSize] || brandSize;
}

// ── Brand info ────────────────────────────────────────────────────────────────
export const MYNTRA_BRAND_DEFAULTS = {
  brand: 'Qurvii',
  manufacturerAddress: 'Qurvii, B-149, Sector 6, Noida, UP 201301, India',
  packerAddress: 'Qurvii, B-149, Sector 6, Noida, UP 201301, India',
  countryOfOrigin: 'India',
};

// ── HSN codes per category ────────────────────────────────────────────────────
export const MYNTRA_HSN_CODES = {
  'Dresses': '62114290',
  'Women Dresses': '62114290',
  'Tops': '61061000',
  'Women Tops': '61061000',
  'Kurtas': '62042900',
  'Women Kurtas': '62042900',
  'Skirts': '62045900',
  'Women Skirts': '62045900',
  'Palazzos': '62046900',
  'Women Palazzos': '62046900',
  'Shirts': '62052000',
  'Men Shirts': '62052000',
  'Trousers': '62034200',
  'Men Trousers': '62034200',
  'Jackets': '62019300',
  'default': '62114290',
};

export function getMyntraHSN(category = '') {
  return MYNTRA_HSN_CODES[category] || MYNTRA_HSN_CODES['default'];
}

// ── Article types per category ────────────────────────────────────────────────
export const MYNTRA_ARTICLE_TYPES = {
  'Women Dresses': 'Dresses',
  'Dresses': 'Dresses',
  'Women Tops': 'Tops',
  'Tops': 'Tops',
  'Women Kurtas': 'Kurtas',
  'Kurtas': 'Kurtas',
  'Women Skirts': 'Skirts',
  'Skirts': 'Skirts',
  'Women Palazzos': 'Palazzos',
  'Palazzos': 'Palazzos',
  'Men Shirts': 'Shirts',
  'Shirts': 'Shirts',
  'Men Trousers': 'Trousers',
  'Trousers': 'Trousers',
};

// ── Package contents per category ─────────────────────────────────────────────
export const MYNTRA_PACKAGE_CONTENTS = {
  'Dresses': '1 Dress',
  'Tops': '1 Top',
  'Kurtas': '1 Kurta',
  'Skirts': '1 Skirt',
  'Palazzos': '1 Palazzo',
  'Shirts': '1 Shirt',
  'Trousers': '1 Trouser',
  'default': '1 Piece',
};

// ── Age groups ────────────────────────────────────────────────────────────────
export const MYNTRA_AGE_GROUPS = {
  'Women': 'Adults-Women',
  'Men': 'Adults-Men',
  'Girls': 'Girls',
  'Boys': 'Boys',
  'Kids': 'Kids',
  'default': 'Adults-Women',
};
