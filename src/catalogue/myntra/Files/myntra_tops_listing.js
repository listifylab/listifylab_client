/**
 * Myntra Tops Listing Generator
 */

import {
  mapMyntraColor, mapMyntraFabric, mapMyntraFabricType,
  mapOccasion, mapSeason, mapNeckline, mapPattern,
  mapClosure, mapWashCare, MYNTRA_SLEEVE_MAPPING,
} from '../Mapping/index.js';
import {
  MYNTRA_SIZE_MAPPING, getMyntraStandardSize,
  MYNTRA_BRAND_DEFAULTS, getMyntraHSN,
} from '../Constants/index.js';
import { downloadCsv } from '../../shared/csvUtils.js';

export const MYNTRA_TOPS_HEADERS = [
  'styleId', 'styleGroupId', 'vendorSkuCode', 'vendorArticleNumber',
  'vendorArticleName', 'brand',
  'Manufacturer Name and Address with Pincode',
  'Packer Name and Address with Pincode',
  'Importer Name and Address with Pincode',
  'Country Of Origin', 'Country Of Origin2', 'Country Of Origin3',
  'Country Of Origin4', 'Country Of Origin5',
  'articleType', 'Brand Size', 'Standard Size',
  'is Standard Size present on Label', 'Brand Colour (Remarks)', 'GTIN', 'HSN',
  'SKUCode', 'MRP', 'AgeGroup', 'Prominent Colour', 'Second Prominent Colour',
  'Third Prominent Colour', 'FashionType', 'Usage', 'Year', 'season',
  'Product Details', 'styleNote', 'materialCareDescription',
  'sizeAndFitDescription', 'productDisplayName', 'tags', 'addedDate',
  'Color Variant GroupId', 'Fabric', 'Occasion', 'Neck', 'Pattern',
  'Fabric 2', 'Fabric 3', 'Sleeve Length', 'Knit or Woven',
  'Print or Pattern Type', 'Surface Styling', 'Sleeve Styling',
  'Transparency', 'Fabric Type', 'Wash Care',
  'Body or Garment Size', 'Closure', 'Add-Ons', 'Fit',
  'Number of Pockets', 'Multipack Set', 'Number of Items',
  'Net Quantity Unit', 'Theme', 'Collection Name',
  'Package Contains', 'Net Quantity',
  'Bust ( Inches )', 'Front Length ( Inches )',
  'Across Shoulder ( Inches )', 'Sleeve-Length ( Inches )',
  'Front Image', 'Side Image', 'Back Image', 'Detail Angle',
  'Look Shot Image', 'Additional Image 1', 'Additional Image 2',
];

const TOPS_CATEGORY_FILTER = ['top', 'shirt', 'blouse', 't-shirt', 'tee', 'tank', 'crop'];

export function generateMyntraTopsListing(
  selectedData,
  sizeMapping = MYNTRA_SIZE_MAPPING,
  csvHeaders = MYNTRA_TOPS_HEADERS,
  customMaps = {},
  userDetails = {}
) {
  const manufacturerAddr = userDetails.manufacturerDetails || MYNTRA_BRAND_DEFAULTS.manufacturerAddress;
  const packerAddr       = userDetails.packerDetails       || MYNTRA_BRAND_DEFAULTS.packerAddress;

  const mergedColorMap = { ...{}, ...customMaps.color };
  const getColor = (c) => mergedColorMap[c] || mapMyntraColor(c);

  const sizes = Object.keys(sizeMapping);

  const topsFilter = (product) => {
    const f = product.fields || {};
    const type = (f.style_type || f.styleType || f.category || f.type || '').toLowerCase();
    return TOPS_CATEGORY_FILTER.some((t) => type.includes(t));
  };

  const csvData = selectedData
    .filter(topsFilter)
    .flatMap((product, index) => {
      const f = product.fields || {};
      const get = (...keys) => { for (const k of keys) if (f[k]) return f[k]; return ''; };

      const prominentColor = getColor(get('style_primary_color', 'primary_color', 'color'));
      const mappedFabric = mapMyntraFabric(get('fabric', 'fabric_type', 'material'));
      const mappedFabricType = mapMyntraFabricType(get('fabric', 'fabric_type', 'material'));
      const frontLengthBase = Number(get('frontLengthXS', 'front_length_xs', 'front_length')) || 0;

      return sizes.map((size, sizeIdx) => {
        const mappedSize = sizeMapping[size];
        const frontLength = frontLengthBase > 0 ? frontLengthBase + sizeIdx * 0.5 : '';

        return {
          'styleId': '',
          'styleGroupId': index + 1,
          'vendorSkuCode': `${product.styleNumber}-${get('style_primary_color', 'color') || 'NA'}-${mappedSize}`,
          'vendorArticleNumber': product.styleNumber || '',
          'vendorArticleName': get('styleName', 'style_name', 'product_name', 'name') || '',
          'brand': get('brand') || userDetails.tenantName || MYNTRA_BRAND_DEFAULTS.brand,
          'Manufacturer Name and Address with Pincode': manufacturerAddr,
          'Packer Name and Address with Pincode': packerAddr,
          'Importer Name and Address with Pincode': '',
          'Country Of Origin': MYNTRA_BRAND_DEFAULTS.countryOfOrigin,
          'Country Of Origin2': '', 'Country Of Origin3': '',
          'Country Of Origin4': '', 'Country Of Origin5': '',
          'articleType': 'Tops',
          'Brand Size': mappedSize,
          'Standard Size': getMyntraStandardSize(mappedSize),
          'is Standard Size present on Label': 'Yes',
          'Brand Colour (Remarks)': get('stylePrimaryColor', 'primary_color', 'color') || '',
          'GTIN': '',
          'HSN': getMyntraHSN('Tops'),
          'SKUCode': '',
          'MRP': get('mrp', 'price', 'selling_price') || '',
          'AgeGroup': 'Adults-Women',
          'Prominent Colour': prominentColor,
          'Second Prominent Colour': '',
          'Third Prominent Colour': '',
          'FashionType': 'Fashion',
          'Usage': '',
          'Year': new Date().getFullYear(),
          'season': mapSeason(get('season')),
          'Product Details': get('styleDescription', 'description', 'product_description') || '',
          'styleNote': '',
          'materialCareDescription': get('fabric', 'material') || '',
          'sizeAndFitDescription': '',
          'productDisplayName': '',
          'tags': '',
          'addedDate': '',
          'Color Variant GroupId': '',
          'Fabric': mappedFabric,
          'Occasion': mapOccasion(get('occasion')),
          'Neck': mapNeckline(get('neckStyle', 'neck_style', 'neck')),
          'Pattern': mapPattern(get('prints', 'pattern', 'print')),
          'Fabric 2': '', 'Fabric 3': '',
          'Sleeve Length': MYNTRA_SLEEVE_MAPPING[get('sleeveLength', 'sleeve_length')?.trim()] || '',
          'Knit or Woven': mappedFabricType === 'Knit' ? 'Knit' : 'Woven',
          'Print or Pattern Type': mapPattern(get('prints', 'pattern')),
          'Surface Styling': '',
          'Sleeve Styling': '',
          'Transparency': 'Opaque',
          'Fabric Type': mappedFabricType,
          'Wash Care': mapWashCare(get('washCare', 'wash_care', 'care')),
          'Body or Garment Size': 'To-Fit Denotes Body Measurements in',
          'Closure': mapClosure(get('closure')),
          'Add-Ons': 'NA',
          'Fit': get('fit') || '',
          'Number of Pockets': 'NA',
          'Multipack Set': 'NA',
          'Number of Items': 1,
          'Net Quantity Unit': 'Piece',
          'Theme': 'NA',
          'Collection Name': '',
          'Package Contains': '1 Top',
          'Net Quantity': 1,
          'Bust ( Inches )': '',
          'Front Length ( Inches )': frontLength,
          'Across Shoulder ( Inches )': '',
          'Sleeve-Length ( Inches )': '',
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
    throw new Error('No tops-category products found in selected data.');
  }

  downloadCsv('Myntra_Tops_listing.csv', csvHeaders, csvData);
  return csvData.length;
}
