import { NYAKAA_GLOBAL_HEADERS, NYKAA_SIZE_MAPPING } from '../Constants/index.js';
import { downloadCsv } from '../../shared/csvUtils.js';
import generateNykaaDressListing from './Nykaa_Dresses_Listing.js';
import generateNykaaTopsListing from './Nykaa_Tops_Listing.js';
import { getCategoryHeaders } from './categoryTemplateStore.js';
import generateNykaaShirtsListing from './Nykaa_Shirt_Listing.js';
import generateNykaaShrugAndJacketListing from './Nykaa_Shrug_And_Jacket_Listing.js';

export const NYKAA_GENERATORS = {
  Dresses: {
    generate: (data, sizeMap, headers, customMaps) =>
      generateNykaaDressListing(data, sizeMap || NYKAA_SIZE_MAPPING, headers, customMaps),
    defaultHeaders: NYAKAA_GLOBAL_HEADERS,
    filename: 'Nykaa_Dress_listing.csv',
    filter: 'dress',
  },
  Tops: {
    generate: (data, sizeMap, headers, customMaps) =>
      generateNykaaTopsListing(data, sizeMap || NYKAA_SIZE_MAPPING, headers, customMaps),
    defaultHeaders: NYAKAA_GLOBAL_HEADERS,
    filename: 'Nykaa_Tops_listing.csv',
    filter: 'top',
  },

  Shirts: {
    generate: (data, sizeMap, headers, customMaps) =>
      generateNykaaShirtsListing(data, sizeMap || NYKAA_SIZE_MAPPING, headers, customMaps),
    defaultHeaders: NYAKAA_GLOBAL_HEADERS,
    filename: 'Nykaa_Shirts_listing.csv',
    filter: 'shirt',
  },
  SweatShirts: {
    generate: (data, sizeMap, headers, customMaps) =>
      generateNykaaShirtsListing(data, sizeMap || NYKAA_SIZE_MAPPING, headers, customMaps),
    defaultHeaders: NYAKAA_GLOBAL_HEADERS,
    filename: 'Nykaa_Shirts_listing.csv',
    filter: 'sweatshirt',
  },
  'Jacket & Shrugs': {
    generate: (data, sizeMap, headers, customMaps) =>
      generateNykaaShrugAndJacketListing(data, sizeMap || NYKAA_SIZE_MAPPING, headers, customMaps),
    defaultHeaders: NYAKAA_GLOBAL_HEADERS,
    filename: 'Nykaa_Shrug_And_Jacket_listing.csv',
    filter: 'shrug & jacket',
  },
};
export const downloadNykaaListing = (category, selectedData, customMaps) => {
  const config = NYKAA_GENERATORS[category];
  if (!config) {
    throw new Error(`No generator registered for "${category}"`);
  }

  const headers = getCategoryHeaders(category) || config.defaultHeaders;
  config.generate(selectedData, NYKAA_SIZE_MAPPING, headers, customMaps);
};

export { NYKAA_SIZE_MAPPING };

export * from './Nykaa_Dresses_Listing.js';
export * from './Nykaa_Tops_Listing.js';
export * from './Nykaa_Shirt_Listing.js';
export * from './Nykaa_Sweatshirt_Listing.js';
export * from './Nykaa_Shrug_And_Jacket_Listing.js';
