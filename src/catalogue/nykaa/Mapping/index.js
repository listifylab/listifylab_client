/**
 * Nykaa Fashion field mappings
 * Source: catalog/utils/nykaaMapping.js
 */

// ─── Size mapping ─────────────────────────────────────────────────────────────

export const NYKAA_SIZE_MAPPING = {
  XXS: 'XXS', XS: 'XS', S: 'S', M: 'M', L: 'L',
  XL: 'XL', XXL: '2XL', XXXL: '3XL', XXXXL: '4XL', XXXXXL: '5XL',
};

// ─── Fitting type ─────────────────────────────────────────────────────────────

const NYKAA_REGULAR_FIT_VARIANTS = new Set([
  'Regular Fit', 'Regular Fit, Loose Fit', 'Regular Fit, Western',
  'Regular Fit, Loose Fit, Classic', 'Regular Fit, Loose Fit, Western',
  'Regular Fit, Western, Relaxed', 'Regular Fit, Loose Fit, Relaxed',
  'Regular Fit, Relaxed', 'Regular Fit, Slim Fit, Relaxed',
  'Regular Fit, Slim Fit, Western, Classic', 'Regular Fit, Slim Fit, Classic',
  'Regular Fit, Loose Fit, Western, Relaxed', 'Regular Fit, Western, Regular fit',
  'Regular Fit, Loose Fit, Western, Fusion', 'Regular Fit, Western, Fusion',
]);

const NYKAA_RELAXED_FIT_VARIANTS = new Set([
  'Relaxed Fit', 'Other', 'Loose Fit, Western, Fusion', 'Loose Fit, Western, Relaxed',
  'Loose Fit, Western, Fusion, Relaxed', 'Slim Fit, Relaxed', 'Western, Fusion, Relaxed',
  'Regular Fit, Western',
]);

export function mapNykaaFitting(fittingType = '') {
  if (!fittingType) return fittingType;
  if (fittingType === 'Loose Fit')    return 'Loose';
  if (NYKAA_REGULAR_FIT_VARIANTS.has(fittingType)) return 'Regular';
  if (NYKAA_RELAXED_FIT_VARIANTS.has(fittingType)) return 'Relaxed';
  if (fittingType === 'Slim Fit')     return 'Slim';
  if (fittingType === 'Stretch Fit')  return 'Bodycon';
  if (fittingType === 'Oversized')    return 'Oversized';
  if (fittingType === 'Fit & Flare')  return 'Flared';
  return fittingType;
}

// ─── Neckline ─────────────────────────────────────────────────────────────────

const NYKAA_NECK_STYLE_MAPPING = {
  'V Neck':             'V-Neck',
  'Wide Collar V Neck': 'V-Neck',
  'Shawl Collar':       'Shawl Lapel',
  'Shawl':              'Shawl Lapel',
  'Mandarin Collar':    'Mandarin Neck',
  'Tie or Bow':         'Tie Up Neck',
};

export function mapNykaaNeckStyle(neckStyle = '') {
  return NYKAA_NECK_STYLE_MAPPING[neckStyle] || neckStyle;
}

// ─── Sleeve length ────────────────────────────────────────────────────────────

export function mapNykaaSleeveLength(sleeveLength = '') {
  if (sleeveLength === 'Full')          return 'Full Sleeves';
  if (sleeveLength === 'Three Quarter') return 'Three Fourth Sleeves';
  if (
    sleeveLength === 'Half' ||
    sleeveLength === 'Short' ||
    sleeveLength === 'Quarter' ||
    sleeveLength === 'Elbow Length' ||
    sleeveLength === 'Above Elbow Length'
  ) return 'Half Sleeves';
  if (sleeveLength === 'Sleeveless') return 'Sleeveless';
  return '';
}

// ─── Color ────────────────────────────────────────────────────────────────────

const NYKAA_COLOR_ALIASES = {
  Multi:          'Multi-color',
  Navy:           'Navy Blue',
  Gray:           'Grey',
  'fuchia pink':  'Pink',
  'Fucia Pink':   'Pink',
  'Fuchia Pink':  'Pink',
  'Fuchia pink':  'Pink',
  'fucia pink':   'Pink',
  'Mint Green':   'Green',
  'mint green':   'Green',
};

export function mapNykaaColor(primaryColor = '') {
  return NYKAA_COLOR_ALIASES[primaryColor] || primaryColor;
}

// ─── Fabric ───────────────────────────────────────────────────────────────────

export const NYKAA_FABRIC_MAPPING = {
  'French crepe': 'Poly Silk', 'French Crepe': 'Poly Silk', 'French Crepe Silk': 'Poly Silk',
  'Vamika crepe': 'Crepe', 'Vamika Crepe': 'Crepe', 'Capri Crepe': 'Crepe',
  Crepe: 'Crepe', 'Crepe silk': 'Crepe', 'Printed crepe': 'Crepe', 'Solid Crepe': 'Crepe',
  Harnaz: 'Georgette', Cosmic: 'Georgette', 'Harnaz Georgette': 'Georgette', Georgette: 'Georgette',
  Satin: 'Satin', 'Black Satin': 'Satin', 'Floral Satin': 'Satin',
  'Roman Silk': 'Silk', 'Amalfi silk': 'Silk', 'Noritake silk': 'Silk',
  'Burfi silk': 'Silk', 'Burfii silk': 'Silk', 'Burfi Silk': 'Silk',
  'Moss crepe': 'Moss Crepe', 'Black moss crepe': 'Moss Crepe',
  Telsa: 'Lycra', Lycra: 'Lycra', 'Telsa Lycra': 'Lycra',
  Rayon: 'Rayon', Reyon: 'Rayon', 'Crinkle Rayon': 'Rayon', 'Rayon Twill': 'Rayon',
  Jersey: 'Jersey',
  'Cotton Slub': 'Cotton', 'Cotton slub': 'Cotton', Cotton: 'Cotton',
  Velvet: 'Velvet', Velvit: 'Velvet',
  Fleece: 'Fleece', 'Anti-Piling Fleece': 'Fleece', 'Sherpa Fleece': 'Fleece',
  Wool: 'Wool',
  Suede: 'Suede', 'Couture soft': 'Suede',
  'Rabbit fur': 'Fur',
  Net: 'Net', 'Net Fabric': 'Net',
  Sequins: 'Sequin',
  'Poly Crepe': 'Poly Silk', 'Poly Silk': 'Poly Silk',
  Poplin: 'Poplin', Chambray: 'Chambray', Twill: 'Twill', Chiffon: 'Chiffon', Rib: 'Rib',
};

export function mapNykaaFabric(fabricName = '') {
  return NYKAA_FABRIC_MAPPING[fabricName] || fabricName;
}

// ─── Season ───────────────────────────────────────────────────────────────────

const NYKAA_SEASON_MAPPING = {
  'Summer,Spring': 'Spring/Summer', 'Summer, Spring': 'Spring/Summer',
  Summer: 'Summer', Fall: 'Winter', fall: 'Winter', Spring: 'Spring',
  'Winter, Fall': 'Winter', Winter: 'Winter',
  'Summer, Winter, Fall': 'Autumn/Winter',
  'Summer, Spring, Fall': 'Spring/Summer',
  'Summer, Winter, Spring, Fall': 'Spring/Summer',
  'Autum/ Fall': 'Autumn',
};

export function mapNykaaSeason(season = '') {
  return NYKAA_SEASON_MAPPING[season] || season;
}

// ─── Pattern ──────────────────────────────────────────────────────────────────

export const NYKAA_PATTERN_MAPPING = {
  Solid: 'Solid/Plain', 'Solid,': 'Solid/Plain', solid: 'Solid/Plain',
  'Solid, Floral': 'Solid/Plain', 'Solid, Stripe': 'Solid/Plain',
  'Solid, Pastels': 'Solid/Plain', 'Solid, Brocade': 'Solid/Plain',
  'Solid, printed': 'Solid/Plain', 'Solid, Check': 'Solid/Plain',
  'Solid, Heart': 'Solid/Plain', 'Solid, Abstract': 'Solid/Plain',
  'Solid, Paisley': 'Solid/Plain', 'Solid, Geometric': 'Solid/Plain',
  'Solid/Plain, Floral': 'Solid/Plain, Floral',
  'Solid/Plain, Stripes': 'Solid/Plain, Floral',
  'Animal, Floral': 'Animal Print', 'Animal, Pastels': 'Animal Print',
  'Animal, Leopard': 'Animal Print', 'Solid, Animal, Leopard': 'Animal Print',
  'Tie & dye': 'Tie & Dye', 'tie & dye': 'Tie & Dye', 'Tie & Dye': 'Tie & Dye',
  Polka: 'Polka Dots', 'Polka Dots': 'Polka Dots',
  Tropical: 'Nature', Nature: 'Nature',
  Abstract: 'Abstract', 'Abstract, Pastels': 'Abstract',
  Geometric: 'Geometric', 'Geometric, Pastels': 'Geometric',
  Zebra: 'Animal Print', 'Animal Print': 'Animal Print',
  Printed: 'Printed', Check: 'Printed', Camouflage: 'Printed',
  Pastels: 'Printed', Plaid: 'Printed',
  Embroidered: 'Embroidered',
  COLORBLOCK: 'Colorblock', Stripe: 'Stripes',
};

export function mapNykaaPattern(prints = '') {
  return NYKAA_PATTERN_MAPPING[prints] || prints;
}

// ─── Occasion ─────────────────────────────────────────────────────────────────

export const NYKAA_OCCASION_MAPPING = {
  'Evening, Party, Festival': 'Evening Wear',
  'Evening, Party, Casual, Festival': 'Evening Wear',
  'Party, Festival': 'Evening Wear',
  'Festival, Party': 'Evening Wear',
  Festival: 'Festive Wear',
  'Casual, Festival': 'Festive Wear',
  'Casual, Daily, Day, Smart Casual': 'Casual',
  'Casual, Office, Daily': 'Casual',
  'Casual, Daily': 'Casual',
  'Casual, Formal': 'Casual',
  'Casual, Office': 'Casual',
  'Evening, Festival, Night': 'Evening Wear',
  'Evening, Smart Casual': 'Evening Wear',
  'Semi Formal': 'Semi Formal',
  'Semi Formal, Office, Smart Casual': 'Semi Formal',
  Active: 'Sporty',
  Evening: 'Evening Wear',
};

export function mapNykaaOccasion(occasion = '') {
  return NYKAA_OCCASION_MAPPING[occasion] || occasion;
}
