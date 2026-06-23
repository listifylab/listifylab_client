/**
 * Ajio field mappings
 * Source: catalog/utils/ajioMapping.js
 */

// ─── Size mapping ─────────────────────────────────────────────────────────────

export const AJIO_SIZE_MAPPING = {
  XXS: 'XXS', XS: 'XS', S: 'S', M: 'M', L: 'L',
  XL: 'XL', XXL: '2XL', XXXL: '3XL', XXXXL: '4XL', XXXXXL: '5XL',
};

export const AJIO_PLUS_SIZE_MAPPING = {
  L: 'L', XL: 'XL', XXL: '2XL', XXXL: '3XL', XXXXL: '4XL', XXXXXL: '5XL',
};

// ─── Color ────────────────────────────────────────────────────────────────────

export const AJIO_COLOR_FAMILY = new Set([
  'Aqua', 'Beige', 'Black', 'Blue', 'Bronze', 'Brown', 'Copper', 'Cream',
  'Gold', 'Green', 'Grey', 'Khaki', 'Magenta', 'Maroon', 'Metallic', 'Multi',
  'Mustard', 'Navy', 'Nude', 'Olive', 'Orange', 'Peach', 'Pink', 'Purple',
  'Red', 'Rust', 'Silver', 'Tan', 'Teal', 'White', 'Yellow', 'Clear',
  'Rose Gold', 'Fuchsia', 'Charcoal', 'Coffee', 'Grey Melange', 'Lime',
  'Off White', 'Turquoise', 'Coral', 'Burgundy', 'Indigo', 'Ecru', 'Lavender',
  'Violet', 'Wine', 'Mauve', 'Sea Green', 'Taupe',
]);

const AJIO_COLOR_ALIASES = {
  gray:             'Grey',
  'lavender blush': 'Lavender',
  'sky blue':       'Blue',
  'mint green':     'Green',
  'neon yellow':    'Yellow',
  ivory:            'Off White',
  'royal blue':     'Blue',
};

export function mapAjioColor(primaryColor = '') {
  const trimmed = primaryColor.trim();
  if (!trimmed) return '';
  if (AJIO_COLOR_FAMILY.has(trimmed)) return trimmed;
  const alias = AJIO_COLOR_ALIASES[trimmed.toLowerCase()];
  if (alias) return alias;
  const lower = trimmed.toLowerCase();
  if (lower.includes('navy')) return 'Navy';
  if (lower.includes('wine')) return 'Burgundy';
  return trimmed;
}

export function mapAjioColorShade(primaryColor = '') {
  if (!primaryColor.trim()) return '';
  return primaryColor.trim().toLowerCase() === 'pastel' ? 'Light' : 'Dark';
}

// ─── Fabric ───────────────────────────────────────────────────────────────────

export const AJIO_FABRIC_LIST = new Set([
  'Acrylic', 'Art Silk', 'Banarasi', 'Cambric', 'Chanderi', 'Chiffon',
  'Corduroy', 'Cotton', 'Crepe', 'Denim', 'Dobby', 'Dupion', 'Fleece',
  'Georgette', 'Ikat', 'Jacquard', 'Kanjeevaram', 'Leather', 'Linen',
  'Modal', 'Muslin', 'Mysore Silk', 'Net', 'Nylon', 'Organza', 'Pashmina',
  'Polyester', 'PU', 'Raw Silk', 'Rayon', 'Satin', 'Silk', 'Synthetic',
  'Velvet', 'Viscose', 'Wool', 'Bamboo', 'Brocade', 'Canvas', 'Cashmere',
  'Chambray', 'Flannel', 'Flex', 'Handloom', 'Khadi', 'Knit', 'Kosa',
  'Lace', 'Linen Blend', 'Organic Cotton', 'Others', 'Phulkari', 'Seersucker',
  'Terry', 'Elastane',
]);

export function mapAjioFabric(fabricName = '') {
  if (!fabricName?.trim()) return 'Others';
  const trimmed = fabricName.trim();
  return AJIO_FABRIC_LIST.has(trimmed) ? trimmed : 'Others';
}

// ─── Pattern ──────────────────────────────────────────────────────────────────

export const AJIO_PATTERN_LIST = new Set([
  'Solid', 'Stripes', 'Textured', 'Tie & Dye', 'Typographic', 'Applique',
  'Self-design', 'Abstract', 'Animal', 'Aztec', 'Block Print', 'Cartoon',
  'Chevrons', 'Geometric', 'Graphic', 'Heathered', 'Indian', 'Leaf',
  'Micro Print', 'Nailhead', 'Novelty', 'Numeric', 'Paisley', 'Quilted',
  'Reptilian', 'Tropical', 'Baroque', 'Embroidery', 'Holographic', 'Monochrome',
  'Nautical', 'Others', 'Ribbed', 'Ruffles', 'Colourblock', 'Crochet',
  'Patch-work', 'Camouflage', 'Checks', 'Embellished', 'Floral', 'Lace',
  'Ombre-dyed', 'Polka-dot', 'Washed', 'Tribal',
]);

const AJIO_PATTERN_ALIASES = {
  Ombre:   'Ombre-dyed',
  Polka:   'Polka-dot',
  Leopard: 'Animal',
};

export function mapAjioPattern(prints = '') {
  if (!prints?.trim()) return 'Others';
  const trimmed = prints.trim();
  const lower = trimmed.toLowerCase();
  for (const pattern of AJIO_PATTERN_LIST) {
    if (lower.includes(pattern.toLowerCase())) return pattern;
  }
  return AJIO_PATTERN_ALIASES[trimmed] || 'Others';
}

// ─── Sleeve length ────────────────────────────────────────────────────────────

export const AJIO_SLEEVE_MAPPING = {
  Half:            'Short sleeve',
  'Three Quarter': '3/4th sleeve',
  Full:            'Full-length sleeve',
  Sleeveless:      'Sleeveless',
  Short:           'Short sleeve',
  Quarter:         'Short sleeve',
};

export function mapAjioSleeveLength(sleeveLength = '') {
  const key = typeof sleeveLength === 'string' ? sleeveLength.trim() : '';
  return AJIO_SLEEVE_MAPPING[key] || sleeveLength;
}

// ─── Wash care ────────────────────────────────────────────────────────────────

export const AJIO_WASH_CARE_MAPPING = {
  'Machine Wash':   'Machine wash',
  'Dry Clean Only': 'Dry clean',
  'Hand Wash':      'Hand wash',
};

export function mapAjioWashCare(washCare = '') {
  const key = typeof washCare === 'string' ? washCare.trim() : '';
  return AJIO_WASH_CARE_MAPPING[key] || 'Not Specified';
}

// ─── Fitting ──────────────────────────────────────────────────────────────────

export const AJIO_FITTING_LIST = new Set([
  'Relaxed Fit', 'Slim Fit', 'Boxy Fit', 'Extra Slim Fit', 'Fitted',
  'Loose Fit', 'Maternity Fit', 'Regular Fit', 'Stylised Fit', 'Tailored Fit',
]);

export function mapAjioFitting(fittingType = '') {
  if (!fittingType?.trim()) return '';
  for (const fit of AJIO_FITTING_LIST) {
    if (fit.toLowerCase() === fittingType.trim().toLowerCase()) return fit;
  }
  return '';
}

// ─── Neckline ─────────────────────────────────────────────────────────────────

export const AJIO_NECKLINE_LIST = new Set([
  'V', 'Round', 'Boat', 'Square', 'High', 'Collar',
  'Scoop', 'Off Shoulder', 'Cowl',
]);

export function mapAjioNeckline(neckStyle = '') {
  if (!neckStyle?.trim()) return '';
  for (const neck of AJIO_NECKLINE_LIST) {
    if (neckStyle.toLowerCase().includes(neck.toLowerCase())) return neck;
  }
  return '';
}
