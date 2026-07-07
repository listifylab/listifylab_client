import { NYKAA_SIZE_MAPPING } from '../Mapping/index.js';
import { downloadCsv } from '../../shared/csvUtils.js';
import { resolveField } from './nykaaFieldResolvers.js';
import { getCategoryHeaders } from './categoryTemplateStore.js';

// category -> which `fields.style_type` values belong to it.
// Add a new line here whenever a new category needs support --
// nothing else in this file needs to change.
const CATEGORY_STYLE_TYPES = {
  dress: ['dress', 'dresses', 'kaftan', 'shirt dress'],
  tops: ['top', 'tops', 'shirt', 'shirts', 'blouse'],
  jacket: ['jacket', 'jackets', 'coat', 'coats'],
  shrug: ['shrug', 'shrugs'],
  pants: ['pant', 'pants', 'trouser', 'trousers'],
  shorts: ['short', 'shorts'],
  sweatshirt: ['sweatshirt', 'sweatshirts', 'hoodie'],
};

// Alternative to editing the object above directly -- useful if category
// list ever needs to be registered dynamically (e.g. from an admin UI).
export const registerCategoryStyleTypes = (category, styleTypes) => {
  CATEGORY_STYLE_TYPES[category.toLowerCase().trim()] = styleTypes.map((s) => s.toLowerCase());
};

const matchesCategory = (styleType, category) => {
  const list = CATEGORY_STYLE_TYPES[category.toLowerCase().trim()] || [];
  const normalized = (styleType || '').toLowerCase();
  return list.some((match) => normalized === match || normalized.includes(match));
};

// Works for ANY category, as long as:
//  1) that category's header template has been uploaded via
//     loadCategoryHeaderTemplate(category, file)
//  2) CATEGORY_STYLE_TYPES has (or registerCategoryStyleTypes was called
//     with) an entry for that category
const generateNykaaListing = (selectedData, category) => {
  const csvHeaders = getCategoryHeaders(category);

  if (!csvHeaders) {
    throw new Error(
      `No header template loaded for category "${category}". Upload its template CSV first.`
    );
  }

  const sizeMapping = NYKAA_SIZE_MAPPING;
  const sizes = Object.keys(sizeMapping);

  const csvData = selectedData
    .filter((product) => matchesCategory(product.fields?.style_type, category))
    .flatMap((product) => {
      const f = product.fields || {};

      return sizes.map((size) => {
        const mappedSize = sizeMapping[size];
        const context = { product, f, size, mappedSize };

        const row = {};
        csvHeaders.forEach((header) => {
          row[header] = resolveField(header, context);
        });
        return row;
      });
    });

  downloadCsv(`Nykaa_${category}_listing.csv`, csvHeaders, csvData);
};

export default generateNykaaListing;
