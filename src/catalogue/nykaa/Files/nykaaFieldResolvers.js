import {
  NYKAA_SIZE_MAPPING,
  mapNykaaFitting,
  mapNykaaNeckStyle,
  mapNykaaColor,
  mapNykaaFabric,
  mapNykaaSeason,
  mapNykaaPattern,
  mapNykaaOccasion,
} from '../Mapping/index.js';

const SIZE_ORDER = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL', 'XXXXXL'];

// Grading increments per size step (in inches). Tune these to your brand's
// actual grading rules.
const GRADE_STEP = {
  bust: 2,
  chest: 2,
  waist: 2,
  hip: 2,
  shoulder: 0.5,
  length: 0.5,
  inseam: 0.25,
  bottomLength: 0.5,
};

// Builds a per-size measurement from a product's own XS baseline field
// (e.g. fields.bust_inches_xs), since each style carries its own base
// measurements rather than a shared/global size chart.
const gradeFromXsBase = (baseXs, size, step) => {
  const base = Number(baseXs);
  if (!base || Number.isNaN(base)) return '';
  const sizeIndex = SIZE_ORDER.indexOf(size);
  if (sizeIndex === -1) return '';
  return +(base + (sizeIndex - 1) * step).toFixed(2);
};

const sleeveTypeFor = (sleeveType) => {
  if (sleeveType === 'Full') return 'Full Sleeves';
  if (sleeveType === 'Three Quarter') return 'Three Fourth Sleeves';
  if (['Half', 'Short', 'Quarter', 'Elbow Length', 'Above Elbow Length'].includes(sleeveType)) {
    return 'Half Sleeves';
  }
  return 'Sleeveless';
};

// -----------------------------------------------------------------------
// FIELD_RESOLVERS: single source of truth for "header name -> how to get
// its value". Every function receives the same context object:
//   { product, f (= product.fields), size, mappedSize, customMaps }
// and must return the value to put in that CSV cell.
//
// generateNykaaListing only ever calls resolveField() for the headers a
// category's uploaded template actually contains -- so a resolver existing
// here for a header a category doesn't use is harmless (simply unused).
// -----------------------------------------------------------------------
export const FIELD_RESOLVERS = {
  'Vendor SKU Code': ({ product, f, mappedSize }) =>
    `${product.styleNumber}-${f.style_primary_color}-${mappedSize}`,
  Gender: () => 'Women',
  'Brand Name': () => 'Qurvii',
  'Style Code': ({ product }) => product.styleNumber || '',
  'Product Name': ({ f }) => f.style_name || '',
  Description: ({ f }) => f.style_description || '',
  Price: ({ f }) => f.mrp || '',
  Color: ({ f }) => mapNykaaColor(f.style_primary_color) || f.style_primary_color || '',
  'Country of Origin': () => 'India',
  'Manufacturer Name': () => 'Qurvii',
  'Manufacturer Address': () => 'B-149, Sector 6, Noida, UP 201301, India',
  'Ean Codes': () => '',
  'brand  size': ({ mappedSize }) => mappedSize,
  'Design Code': () => '',
  'Multipack Set': () => 'Single',
  Occasion: ({ f }) => mapNykaaOccasion(f.occasion) || f.occasion || '',
  Season: ({ f }) => mapNykaaSeason(f.season) || f.season || '',
  'Care Instruction': ({ f }) => f.wash_care || '',
  'HSN Codes': ({ f }) => f.hsn || '62044490',
  'Ships In Days': () => 2,
  'Pack Contains': ({ f }) => (f.style_type ? `1 ${f.style_type}` : ''),
  'Net Qty': () => '1N',
  Material: ({ f }) => mapNykaaFabric(f.fabric_1_name || f.fabric_type || ''),
  'Responsibility Criteria': () => '',
  'Pocket Description': () => '',
  Pattern: ({ f }) => mapNykaaPattern(f.prints) || f.prints || '',
  Disclaimer: () =>
    'Qurvii styles specially for curvy women of all sizes. Your size in our brand might be different from the other brands. Please check our size chart before ordering',
  'Dress Shape': ({ f }) => f.hemline || '',
  'Collections Function': () => '',
  Closure: ({ f }) =>
    f.closure?.toLowerCase().trim() === 'not applicable' ? 'Other' : f.closure || '',
  'Dresses Type': () => '',
  'Character/Collection Shop': () => '',
  Neckline: ({ f }) => mapNykaaNeckStyle(f.neck_style) || f.neck_style || '',
  'Sleeve length Type': ({ f }) => sleeveTypeFor(f.sleeve_type),
  'Style Bucket': () => 'Fashion',
  'Model details': () => 'Model is 5ft 9in tall and is wearing size XS',
  Fit: ({ f }) => mapNykaaFitting(f.fitting_type) || '',
  Age: () => '',
  'Bust for Garment (Inches)': ({ f, size }) =>
    gradeFromXsBase(f.bust_inches_xs, size, GRADE_STEP.bust),
  'Chest for Garment (Inches)': ({ f, size }) =>
    gradeFromXsBase(f.chest_inches_xs, size, GRADE_STEP.chest),
  'Waist for Garment (Inches)': ({ f, size }) =>
    gradeFromXsBase(f.waist_inches_xs, size, GRADE_STEP.waist),
  'Hip for Garment (Inches)': ({ f, size }) => gradeFromXsBase(f.hips_inches, size, GRADE_STEP.hip),
  'Shoulder for Garment (Inches)': ({ f, size }) =>
    gradeFromXsBase(f.across_shoulder_inches_xs, size, GRADE_STEP.shoulder),
  'Sleeve Length (Inches)': () => '',
  'Bust For Body (Inches)': ({ f, size }) =>
    gradeFromXsBase(f.bust_inches_xs, size, GRADE_STEP.bust),
  'Chest For Body (Inches)': ({ f, size }) =>
    gradeFromXsBase(f.chest_inches_xs, size, GRADE_STEP.chest),
  'Waist For Body (Inches)': ({ f, size }) =>
    gradeFromXsBase(f.waist_inches_xs, size, GRADE_STEP.waist),
  'Hip For Body (Inches)': ({ f, size }) => gradeFromXsBase(f.hips_inches, size, GRADE_STEP.hip),
  'Shoulder For Body (Inches)': ({ f, size }) =>
    gradeFromXsBase(f.across_shoulder_inches_xs, size, GRADE_STEP.shoulder),
  'Length For Body (Inches)': ({ f, size }) =>
    gradeFromXsBase(f.front_length_inches_xs, size, GRADE_STEP.length),

  // ---- Tops / Bottoms / Jackets specific headers ----
  // These use best-guess `fields.xxx` names since only dress-category sample
  // data was shared. Update the right-hand field name to match whatever key
  // actually holds this data for that category's Style documents.
  'Category Classification': ({ f }) => f.category_classification || '',
  'Type of Work': ({ f }) => f.type_of_work || '',
  'Topwear Length': ({ f }) => f.topwear_length || '',
  'Length (Inches)': ({ f, size }) =>
    gradeFromXsBase(f.front_length_inches_xs, size, GRADE_STEP.length),
  'Age Group': ({ f }) => f.age_group || 'Adult',
  Activity: ({ f }) => f.activity || '',
  'Shirts Tops and Crop Tops Subcategory': ({ f }) => f.tops_subcategory || '',
  'Rise Style': ({ f }) => f.rise_style || '',
  'Bottoms Pants and Trousers Subcategory': ({ f }) => f.bottoms_subcategory || '',
  'Bottom Length for Garment (Inches)': ({ f, size }) =>
    gradeFromXsBase(f.bottom_length_inches_xs, size, GRADE_STEP.bottomLength),
  'Inseam for Garment (Inches)': ({ f, size }) =>
    gradeFromXsBase(f.inseam_inches_xs, size, GRADE_STEP.inseam),
  'Inseam For Body (Inches)': ({ f, size }) =>
    gradeFromXsBase(f.inseam_inches_xs, size, GRADE_STEP.inseam),
  'Bottom Length For Body (Inches)': ({ f, size }) =>
    gradeFromXsBase(f.bottom_length_inches_xs, size, GRADE_STEP.bottomLength),
  'Skirts Subcategory': ({ f }) => f.skirts_subcategory || '',
  'Front Styling': ({ f }) => f.front_styling || '',
  'Jackets and Coats Subcategory': ({ f }) => f.jackets_subcategory || '',
  'Leg Style': ({ f }) => f.leg_style || '',
  'Front Image': ({ f }) => f.front_image || '',
  'Back Image': ({ f }) => f.back_image || '',
  'Additional Image 1': ({ f }) => f.additional_image_1 || '',
  'Additional Image 2': ({ f }) => f.additional_image_2 || '',
  'Additional Image 3': ({ f }) => f.additional_image_3 || '',
  'Additional Image 4': ({ f }) => f.additional_image_4 || '',
  'Additional Image 5': ({ f }) => f.additional_image_5 || '',
  'Additional Image 6': ({ f }) => f.additional_image_6 || '',
  'Additional Image 7': ({ f }) => f.additional_image_7 || '',
  'Additional Image 8': ({ f }) => f.additional_image_8 || '',
};

// Safe lookup: unknown header -> '' (never crashes a category's download
// just because that header has no resolver yet). customMaps (agar diya
// gaya ho) hamesha default resolver se pehle check hota hai, taaki
// per-call ek-off override kiya ja sake.
export const resolveField = (headerName, context) => {
  const override = context.customMaps?.[headerName];
  if (override !== undefined) {
    return typeof override === 'function' ? override(context) : override;
  }

  const resolver = FIELD_RESOLVERS[headerName];
  if (!resolver) return '';
  try {
    return resolver(context);
  } catch (err) {
    console.error(`Resolver failed for header "${headerName}":`, err);
    return '';
  }
};
