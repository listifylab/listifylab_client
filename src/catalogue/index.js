/**
 * Master catalogue index
 * Maps marketplace ID → generators registry
 */

import { MYNTRA_GENERATORS } from './myntra/Files/index.js';
import { NYKAA_GENERATORS } from './nykaa/Files/index.js';
import { AJIO_GENERATORS } from './ajio/Files/index.js';
import { TATACLIQ_GENERATORS } from './tatacliq/Files/index.js';
import { SHOPIFY_GENERATORS } from './shopify/Files/index.js';
import { MYNTRA_SIZE_RANGES } from './myntra/Constants/index.js';

export { MYNTRA_SIZE_RANGES };

export const CATALOGUE_REGISTRY = {
  myntra:   MYNTRA_GENERATORS,
  nykaa:    NYKAA_GENERATORS,
  ajio:     AJIO_GENERATORS,
  tatacliq: TATACLIQ_GENERATORS,
  shopify:  SHOPIFY_GENERATORS,
};

/**
 * Run the listing generator for a given marketplace + category.
 * @param {string}   marketplaceId  e.g. 'myntra'
 * @param {string}   category       e.g. 'Women Dresses'
 * @param {Object[]} products       fetched product array
 * @param {Object}   sizeMapping    from admin settings
 * @param {string[]} csvHeaders     from uploaded template or default
 * @param {Object}   customMaps     tenant custom mappings
 * @param {Object}   userDetails    { manufacturerDetails, packerDetails } from logged-in user
 * @returns {number} row count generated
 */
export function runListingGenerator(
  marketplaceId,
  category,
  products,
  sizeMapping,
  csvHeaders,
  customMaps = {},
  userDetails = {}
) {
  const registry = CATALOGUE_REGISTRY[marketplaceId];
  if (!registry) throw new Error(`No generator registry for marketplace: ${marketplaceId}`);

  const gen = registry[category];
  if (!gen) throw new Error(`No generator for ${marketplaceId} › ${category}`);

  const headers = csvHeaders || gen.defaultHeaders;
  return gen.generate(products, sizeMapping, headers, customMaps, userDetails);
}
