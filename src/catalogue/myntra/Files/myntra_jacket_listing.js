/**
 * Myntra Coat Listing Generator
 * Generates a Myntra-compatible listing CSV for Coat category products.
 */

import {
  mapMyntraColor,
  mapMyntraFabric,
  mapMyntraFabricType,
  mapOccasion,
  mapSeason,
  mapNeckline,
  mapPattern,
  mapClosure,
  mapWashCare,
  MYNTRA_SLEEVE_MAPPING,
} from '../Mapping/index.js';
import {
  MYNTRA_SIZE_MAPPING,
  getMyntraStandardSize,
  MYNTRA_BRAND_DEFAULTS,
  getMyntraHSN,
} from '../Constants/index.js';
import { downloadCsv } from '../../shared/csvUtils.js';

// Default CSV headers matching Myntra's jacket    template
export const MYNTRA_JACKET_HEADERS = [
  'styleId',
  'styleGroupId',
  'vendorSkuCode',
  'vendorArticleNumber',
  'vendorArticleName',
  'brand',
  'Manufacturer Name and Address with Pincode',
  'Packer Name and Address with Pincode',
  'Importer Name and Address with Pincode',
  'Country Of Origin',
  'Country Of Origin2',
  'Country Of Origin3',
  'Country Of Origin4',
  'Country Of Origin5',
  'articleType',
  'Brand Size',
  'Standard Size',
  'is Standard Size present on Label',
  'Brand Colour (Remarks)',
  'GTIN',
  'HSN',
  'SKUCode',
  'MRP',
  'AgeGroup',
  'Prominent Colour',
  'Second Prominent Colour',
  'Third Prominent Colour',
  'FashionType',
  'Usage',
  'Year',
  'season',
  'Product Details',
  'styleNote',
  'materialCareDescription',
  'sizeAndFitDescription',
  'productDisplayName',
  'tags',
  'addedDate',
  'Color Variant GroupId',
  'Fabric',
  'Occasion',
  'Shape',
  'Neck',
  'Pattern',
  'Fabric 2',
  'Fabric 3',
  'Length',
  'Sleeve Length',
  'Knit or Woven',
  'Hemline',
  'Print or Pattern Type',
  'Surface Styling',
  'Body Shape ID',
  'Main Trend',
  'Sleeve Styling',
  'Transparency',
  'Fabric Type',
  'Lining',
  'Wash Care',
  'Body or Garment Size',
  'Closure',
  'Add-Ons',
  'Stitch',
  'Character',
  'Sustainable',
  'Number of Pockets',
  'Multipack Set',
  'Number of Items',
  'Net Quantity Unit',
  'Theme',
  'Contact Brand or Retailer for pre-sales product queries',
  'Where-to-wear',
  'Style Tip',
  'Care for me',
  'Collection Name',
  'Package Contains',
  'BIS Expiry Date',
  'BIS Certificate Image URL',
  'BIS Certificate Number',
  'Net Quantity',
  'Bust ( Inches )',
  'Chest ( Inches )',
  'Front Length ( Inches )',
  'Hips ( Inches )',
  'Waist ( Inches )',
  'Across Shoulder ( Inches )',
  'Sleeve-Length ( Inches )',
  'To Fit Bust ( Inches )',
  'To Fit Hip ( Inches )',
  'To Fit Waist ( Inches )',
  'Front Image',
  'Side Image',
  'Back Image',
  'Detail Angle',
  'Look Shot Image',
  'Additional Image 1',
  'Additional Image 2',
];

/**
 * @param {Object[]} selectedData - array of product objects from API
 * @param {Object}   sizeMapping  - size mapping to use (from admin settings or default)
 * @param {string[]} csvHeaders   - headers to use (from uploaded template or default)
 * @param {Object}   customMaps   - tenant custom mappings { color: {}, fabric: {} ... }
 */
export function generateMyntraJacketListing(
  selectedData,
  sizeMapping = MYNTRA_SIZE_MAPPING,
  csvHeaders = MYNTRA_JACKET_HEADERS,
  customMaps = {},
  userDetails = {}
) {
  const manufacturerAddr =
    userDetails.manufacturerDetails || MYNTRA_BRAND_DEFAULTS.manufacturerAddress;
  const packerAddr = userDetails.packerDetails || MYNTRA_BRAND_DEFAULTS.packerAddress;

  const mergedColorMap = { ...{}, ...customMaps.color };
  const getColor = (c) => mergedColorMap[c] || mapMyntraColor(c);

  const sizes = Object.keys(sizeMapping);

  const jacketCategoryFilter = (product) => {
    const f = product.fields || {};
    const type = (f.style_type || f.styleType || f.category || f.type || '').toLowerCase();
    return type.includes('jacket') || type.includes('jackets');
  };

  const csvData = selectedData.filter(jacketCategoryFilter).flatMap((product, index) => {
    const f = product.fields || {};
    const get = (...keys) => {
      for (const k of keys) if (f[k]) return f[k];
      return '';
    };

    const prominentColor = getColor(
      get('style_primary_color', 'stylePrimaryColor', 'primary_color', 'color', 'colour')
    );
    const season = mapSeason(get('season'));
    const mappedFabric = mapMyntraFabric(get('fabric', 'fabric_type', 'material'));
    const mappedFabricType = mapMyntraFabricType(get('fabric', 'fabric_type', 'material'));
    const mappedOccasion = mapOccasion(get('occasion'));
    const mappedNeckline = mapNeckline(get('neckStyle', 'neck_style', 'neck'));
    const mappedPattern = mapPattern(get('prints', 'pattern', 'print'));
    const mappedClosure = mapClosure(get('closure'));
    const mappedWashCare = mapWashCare(get('washCare', 'wash_care', 'care'));

    const frontLengthBase = Number(get('frontLengthXS', 'front_length_xs', 'front_length')) || 0;
    const lining = (get('lining') || '').toLowerCase();

    return sizes.map((size, sizeIdx) => {
      const mappedSize = sizeMapping[size];
      const styleGroupId = index + 1;
      const frontLength = frontLengthBase > 0 ? frontLengthBase + sizeIdx * 0.5 : '';

      return {
        styleId: '',
        styleGroupId: styleGroupId,
        vendorSkuCode: `${product.styleNumber}-${get('style_primary_color', 'color', 'colour') || 'NA'}-${mappedSize}`,
        vendorArticleNumber: product.styleNumber || '',
        vendorArticleName: get('styleName', 'style_name', 'product_name', 'name') || '',
        brand: get('brand') || userDetails.tenantName || MYNTRA_BRAND_DEFAULTS.brand,
        'Manufacturer Name and Address with Pincode': manufacturerAddr,
        'Packer Name and Address with Pincode': packerAddr,
        'Importer Name and Address with Pincode': '',
        'Country Of Origin': MYNTRA_BRAND_DEFAULTS.countryOfOrigin,
        'Country Of Origin2': '',
        'Country Of Origin3': '',
        'Country Of Origin4': '',
        'Country Of Origin5': '',
        articleType: 'Blazers',
        'Brand Size': mappedSize,
        'Standard Size': getMyntraStandardSize(mappedSize),
        'is Standard Size present on Label': 'Yes',
        'Brand Colour (Remarks)': get('stylePrimaryColor', 'primary_color', 'color') || '',
        GTIN: '',
        HSN: getMyntraHSN('Blazers'),
        SKUCode: '',
        MRP: get('mrp', 'price', 'selling_price') || '',
        AgeGroup: 'Adults-Women',
        'Prominent Colour': prominentColor,
        'Second Prominent Colour': '',
        'Third Prominent Colour': '',
        FashionType: 'Fashion',
        Usage: '',
        Year: new Date().getFullYear(),
        season: season,
        'Product Details': get('styleDescription', 'description', 'product_description') || '',
        styleNote: '',
        materialCareDescription: get('fabric', 'material') || '',
        sizeAndFitDescription: '',
        productDisplayName: '',
        tags: '',
        addedDate: '',
        'Color Variant GroupId': '',
        Fabric: mappedFabric,
        Occasion: mappedOccasion,
        Shape: '',
        Neck: mappedNeckline,
        Pattern: mappedPattern,
        'Fabric 2': '',
        'Fabric 3': '',
        Length: '',
        'Sleeve Length':
          MYNTRA_SLEEVE_MAPPING[get('sleeveLength', 'sleeve_length', 'sleeve')?.trim()] || '',
        'Knit or Woven': mappedFabricType === 'Knit' ? 'Knit' : 'Woven',
        Hemline: '',
        'Print or Pattern Type': mappedPattern,
        'Surface Styling': '',
        'Body Shape ID': '',
        'Main Trend': '',
        'Sleeve Styling': '',
        Transparency: 'Opaque',
        'Fabric Type': mappedFabricType,
        Lining:
          lining.includes('without') || lining.includes('no') ? 'NA' : lining ? 'Has a lining' : '',
        'Wash Care': mappedWashCare,
        'Body or Garment Size': 'To-Fit Denotes Body Measurements in',
        Closure: mappedClosure,
        'Add-Ons': 'NA',
        Stitch: '',
        Character: '',
        Sustainable: '',
        'Number of Pockets': 'NA',
        'Multipack Set': 'NA',
        'Number of Items': 1,
        'Net Quantity Unit': 'Piece',
        Theme: 'NA',
        'Contact Brand or Retailer for pre-sales product queries': '',
        'Where-to-wear': '',
        'Style Tip': '',
        'Care for me': '',
        'Collection Name': '',
        'Package Contains': '1 Coat',
        'BIS Expiry Date': '',
        'BIS Certificate Image URL': '',
        'BIS Certificate Number': '',
        'Net Quantity': 1,
        'Bust ( Inches )': '',
        'Chest ( Inches )': '',
        'Front Length ( Inches )': frontLength,
        'Hips ( Inches )': '',
        'Waist ( Inches )': '',
        'Across Shoulder ( Inches )': '',
        'Sleeve-Length ( Inches )': '',
        'To Fit Bust ( Inches )': '',
        'To Fit Hip ( Inches )': '',
        'To Fit Waist ( Inches )': '',
        'Front Image': '',
        'Side Image': '',
        'Back Image': '',
        'Detail Angle': '',
        'Look Shot Image': '',
        'Additional Image 1': '',
        'Additional Image 2': '',
      };
    });
  });

  if (csvData.length === 0) {
    throw new Error('No jacket-category products found in selected data.');
  }

  downloadCsv('Myntra_Jackets_listing.csv', csvHeaders, csvData);
  return csvData.length;
}
