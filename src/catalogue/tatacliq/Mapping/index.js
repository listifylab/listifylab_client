/**
 * Tatacliq field mappings
 * Source: catalog/utils/tatacliqMapping.js
 */

// ─── Size mapping ─────────────────────────────────────────────────────────────

export const TATACLIQ_SIZE_MAPPING = {
  XXS: 'XXS', XS: 'XS', S: 'S', M: 'M', L: 'L',
  XL: 'XL', XXL: 'XXL', XXXL: '3XL', XXXXL: '4XL', XXXXXL: '5XL',
};

// ─── HSN code ─────────────────────────────────────────────────────────────────

const HSN_MAPPING = {
  Dress:       { Cotton: '61044200', Silk: '62044300', Wool: '62044200', Synthetic: '61044300', Blended: '61044400' },
  'Shirt Dress': { Cotton: '61044200', Silk: '62044300', Wool: '62044200', Synthetic: '61044300', Blended: '61044400' },
  Kaftan:      { Cotton: '61044200', Silk: '62044300', Wool: '62044200', Synthetic: '61044300', Blended: '61044400' },
  Top:         { Cotton: '62063000', Silk: '62064000', Wool: '62062000', Synthetic: '61061000', Blended: '61062000' },
  Shirt:       { Cotton: '62063000', Silk: '62064000', Wool: '62062000', Synthetic: '61061000', Blended: '61062000' },
  Skirt:       { Cotton: '62045200', Silk: '62045300', Wool: '62045200', Synthetic: '61045300', Blended: '61045400' },
  Pant:        { Cotton: '62046200', Silk: '62046300', Wool: '62046200', Synthetic: '61046300', Blended: '61046400' },
  Trouser:     { Cotton: '62046200', Silk: '62046300', Wool: '62046200', Synthetic: '61046300', Blended: '61046400' },
  Plazzo:      { Cotton: '62046200', Silk: '62046300', Wool: '62046200', Synthetic: '61046300', Blended: '61046400' },
  Jacket:      { Cotton: '62033200', Silk: '62033300', Wool: '62033100', Synthetic: '62043400', Blended: '62044400' },
  Coat:        { Cotton: '62033200', Silk: '62033300', Wool: '62033100', Synthetic: '62043400', Blended: '62044400' },
};

export function getTatacliqFabricFamily(fabricName = '') {
  const f = fabricName.toLowerCase().trim();
  if (f.includes('cotton')) return 'Cotton';
  if (f.includes('silk') || f.includes('satin') || f.includes('chiffon') || f.includes('georgette')) return 'Silk';
  if (f.includes('wool') || f.includes('fleece') || f.includes('knit')) return 'Wool';
  if (
    f.includes('polyester') || f.includes('nylon') || f.includes('acrylic') ||
    f.includes('spandex') || f.includes('lycra') || f.includes('viscose') || f.includes('rayon')
  ) return 'Synthetic';
  if (f.includes('blend') || f.includes('mix') || f.includes('linen')) return 'Blended';
  return 'Blended';
}

export function getTatacliqHsnCode(styleType = '', fabricName = '') {
  const garmentMap = HSN_MAPPING[styleType?.trim()];
  if (!garmentMap) return '62114290';
  const family = getTatacliqFabricFamily(fabricName);
  return garmentMap[family] || '62114290';
}

// ─── Fitting type ─────────────────────────────────────────────────────────────

export const TATACLIQ_FITTING_MAP = {
  'Loose Fit': 'Relaxed Fit',
  'Regular Fit': 'Regular Fit',
  'Slim Fit': 'Slim Fit',
  'Relaxed Fit': 'Relaxed Fit',
  'Stretch Fit': 'Slim Fit',
  Oversized: 'Relaxed Fit',
  'Regular Fit, Loose Fit': 'Regular Fit',
  'Regular Fit, Western': 'Regular Fit',
  'Regular Fit, Loose Fit, Classic': 'Regular Fit',
  'Regular Fit, Loose Fit, Western': 'Regular Fit',
  'Regular Fit, Western, Relaxed': 'Regular Fit',
  'Regular Fit, Loose Fit, Relaxed': 'Regular Fit',
  'Regular Fit, Relaxed': 'Regular Fit',
  'Regular Fit, Slim Fit, Relaxed': 'Regular Fit',
  'Regular Fit, Slim Fit, Western, Classic': 'Regular Fit',
  'Regular Fit, Slim Fit, Classic': 'Regular Fit',
  'Loose Fit, Western, Fusion': 'Relaxed Fit',
  'Regular Fit, Loose Fit, Western, Relaxed': 'Regular Fit',
  'Loose Fit, Western, Relaxed': 'Relaxed Fit',
  'Loose Fit, Western, Fusion, Relaxed': 'Relaxed Fit',
  'Slim Fit, Relaxed': 'Slim Fit',
  'Regular Fit, Western, Regular fit': 'Regular Fit',
  'Western, Fusion, Relaxed': 'Relaxed Fit',
  'Regular Fit, Loose Fit, Western, Fusion': 'Regular Fit',
  'Fit & Flare': 'Flared Fit',
  Bodycon: 'Slim Fit',
};

export function mapTatacliqFitting(fittingType = '') {
  return TATACLIQ_FITTING_MAP[fittingType] || fittingType;
}

// ─── Occasion ─────────────────────────────────────────────────────────────────

export function mapTatacliqOccasion(occasion = '') {
  if (!occasion || typeof occasion !== 'string') return 'Casual Wear';
  const lower = occasion.toLowerCase();
  if (lower.includes('evening') || lower.includes('festival')) return 'Evening Wear';
  if (lower.includes('casual')) return 'Casual Wear';
  return 'Casual Wear';
}

// ─── Pattern (print) ──────────────────────────────────────────────────────────

export const TATACLIQ_PRINT_MAP = {
  solid: 'Solid', 'solid,': 'Solid', 'solid, pastels': 'Solid', 'solid, brocade': 'Solid',
  'solid, printed': 'Print', 'solid, paisley': 'Paisley', 'solid, geometric': 'Geometric',
  'solid, heart': 'Print', 'solid, abstract': 'Print', 'solid, zebra': 'Animal Print',
  'solid, leopard': 'Animal Print', 'solid, animal, leopard': 'Animal Print',
  'solid, check': 'Checks', 'solid, tropical': 'Print', 'solid, polka': 'Polka Dot',
  'solid, pastels, floral': 'Floral',
  floral: 'Floral', 'floral solid': 'Floral', 'floral, polka': 'Floral',
  'abstract, floral': 'Floral', 'pastels, floral': 'Floral',
  stripe: 'Stripes', striped: 'Stripes', 'chevron stripe': 'Stripes',
  'tropical, stripe': 'Stripes', 'geometric, stripe': 'Stripes',
  animal: 'Animal Print', 'animal, floral': 'Animal Print', 'animal, leopard': 'Animal Print',
  leopard: 'Animal Print', zebra: 'Animal Print', tiger: 'Animal Print', cow: 'Animal Print',
  polka: 'Polka Dot', 'polka dots': 'Polka Dot', 'polka dot': 'Polka Dot',
  'multi dot print': 'Polka Dot', 'swiss-dot': 'Polka Dot', 'pastels, polka': 'Polka Dot',
  checked: 'Checks', check: 'Checks', 'check, plaid': 'Checks', plaid: 'Checks',
  gingham: 'Checks', 'hounds tooth': 'Checks', houndstooth: 'Checks',
  geometric: 'Geometric', 'geometric, pastels': 'Geometric', 'abstract, geometric': 'Geometric',
  'geometric, embroidered': 'Embroidery',
  paisley: 'Paisley', 'ikat paisley': 'Paisley', 'ajrakh paisley': 'Paisley',
  embellished: 'Embellished', embroidered: 'Embroidery', schiffli: 'Embroidery',
  'thread work': 'Embroidery', zari: 'Embroidery', sequenced: 'Embellished',
  abstract: 'Print', tropical: 'Print', graphic: 'Print', printed: 'Print', print: 'Print',
  'panel print': 'Print', 'border print': 'Print', 'heart print': 'Print', hearts: 'Print',
  'block print': 'Print',
  colourblocked: 'Color-Block', colorblock: 'Color-Block', 'color-block': 'Color-Block',
  'tie & dye': 'Other', 'tie-dye': 'Other', 'tie dye': 'Other', leheriya: 'Other',
  tribal: 'Other', camouflage: 'Other', ombre: 'Other', pastels: 'Other', ikat: 'Other',
  batik: 'Other',
  tweed: 'Structured', lace: 'Lace',
};

const TATACLIQ_PRINT_KEYWORDS = [
  { keywords: ['leopard', 'tiger', 'zebra', 'cow', 'animal'], value: 'Animal Print' },
  { keywords: ['polka', 'swiss-dot', 'dot'], value: 'Polka Dot' },
  { keywords: ['embroidered', 'embroidery', 'schiffli', 'zari', 'thread work'], value: 'Embroidery' },
  { keywords: ['sequenced', 'embellished'], value: 'Embellished' },
  { keywords: ['lace'], value: 'Lace' },
  { keywords: ['paisley', 'ajrakh'], value: 'Paisley' },
  { keywords: ['floral'], value: 'Floral' },
  { keywords: ['check', 'plaid', 'gingham', 'houndstooth'], value: 'Checks' },
  { keywords: ['geometric'], value: 'Geometric' },
  { keywords: ['stripe', 'striped', 'chevron'], value: 'Stripes' },
  { keywords: ['colorblock', 'colourblock', 'color-block'], value: 'Color-Block' },
  { keywords: ['tie & dye', 'tie-dye', 'tie dye', 'leheriya', 'bandhani'], value: 'Other' },
  { keywords: ['tweed', 'structured'], value: 'Structured' },
  { keywords: ['ikat', 'batik', 'block print', 'tribal', 'ethnic', 'ombre', 'camouflage'], value: 'Print' },
  { keywords: ['solid'], value: 'Solid' },
  { keywords: ['abstract', 'tropical', 'graphic', 'panel', 'border', 'heart', 'print', 'printed'], value: 'Print' },
];

export function mapTatacliqPattern(rawPrint = '') {
  if (!rawPrint || typeof rawPrint !== 'string') return 'Print';
  const normalised = rawPrint.toLowerCase().trim();
  if (TATACLIQ_PRINT_MAP[normalised]) return TATACLIQ_PRINT_MAP[normalised];
  for (const { keywords, value } of TATACLIQ_PRINT_KEYWORDS) {
    if (keywords.some((kw) => normalised.includes(kw))) return value;
  }
  return 'Print';
}

// ─── Sleeve length ────────────────────────────────────────────────────────────

export const TATACLIQ_SLEEVE_MAPPING = {
  Full:            'Long Sleeves',
  'Three Quarter': 'Three-Quarter Sleeves',
  Half:            'Short Sleeves',
  Short:           'Short Sleeves',
  Quarter:         'Three-Quarter Sleeves',
  'Elbow Length':  'Three-Quarter Sleeves',
  Sleeveless:      'Sleeveless',
  'Above Elbow Length': 'Short Sleeves',
};

export function mapTatacliqSleeveLength(sleeveLength = '') {
  return TATACLIQ_SLEEVE_MAPPING[sleeveLength] || 'Sleeveless';
}

// ─── Neckline ─────────────────────────────────────────────────────────────────

const TATACLIQ_NECK_MAPPING = {
  'V Neck': 'V-Neck', 'Wide Collar V Neck': 'V-Neck',
  'Boat Neck': 'Boat Neck',
  'Classic Shirt': 'Shirt Collar', 'Classic Shirt Collar': 'Shirt Collar',
  'Classic Collar': 'Shirt Collar', 'Button Front': 'Shirt Collar',
  'Shawl Collar': 'Shawl Neck', 'Shawl': 'Shawl Neck',
  'Mandarin Collar': 'Mandarin Collar', 'Banded Collar': 'Band Collar',
  'Not Applicable': 'Others', NA: 'Others',
  'Halter Neck': 'Halter Neck',
  'Off Shoulder': 'Off-Shoulder', 'Off-Shoulder': 'Off-Shoulder',
  'Square Neck': 'Square Neck', 'Round Neck': 'Round Neck',
  'Scoop Neck': 'Scoop Neck',
  'Sweat heart Neck': 'Sweetheart Neck', 'Sweetheart Neck': 'Sweetheart Neck',
  'Keyhole neck': 'Keyhole Neck', 'Keyhole Neck': 'Keyhole Neck',
  Hooded: 'Hooded', hoodie: 'Hooded',
  'One Shoulder': 'One Shoulder',
  'Tie or Bow': 'Tie-Up Neck', 'Tie-Up Neck': 'Tie-Up Neck',
  Tuxedo: 'Lapel Collar', 'Notch Collar': 'Lapel Collar', Notch: 'Lapel Collar',
  'Spaghetti Strap': 'Shoulder Straps',
  'Cowl Neck': 'Cowl Neck', 'Crew Neck': 'High Neck',
  Peterpan: 'Stylised Neck', Other: 'Others', 'Wide Collar Neck': 'Others',
};

export function mapTatacliqNeckline(rawNeck = '') {
  if (!rawNeck || typeof rawNeck !== 'string') return 'Others';
  const trimmed = rawNeck.trim();
  if (TATACLIQ_NECK_MAPPING[trimmed]) return TATACLIQ_NECK_MAPPING[trimmed];
  const lower = trimmed.toLowerCase();
  const found = Object.entries(TATACLIQ_NECK_MAPPING).find(([key]) => key.toLowerCase() === lower);
  return found ? found[1] : 'Others';
}

// ─── Color family ─────────────────────────────────────────────────────────────

export function mapTatacliqColorFamily(primaryColor = '') {
  const lower = primaryColor.toLowerCase().trim();
  if (lower.includes(' pink') || lower === 'pink') return 'Pink';
  if (lower.includes('lavendar') || lower.includes('lavender')) return 'Purple';
  if (lower.includes('wine')) return 'Maroon';
  if (lower.includes('olive')) return 'Khaki';
  if (lower.includes('gray')) return 'Grey';
  if (lower.includes('burgundy')) return 'Maroon';
  if (lower.includes('magenta')) return 'Pink';
  if (lower.includes(' yellow') || lower === 'yellow') return 'Yellow';
  if (lower.includes(' blue') || lower === 'blue') return 'Blue';
  if (lower.includes('rust')) return 'Orange';
  if (lower.includes('green')) return 'Green';
  if (lower.includes('teal')) return 'Turquoise';
  return '';
}
