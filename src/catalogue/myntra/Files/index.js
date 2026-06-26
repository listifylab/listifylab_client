/**
 * Myntra listing generators index.
 * Each entry maps a category label → { generate, defaultHeaders, filename }
 */

import { generateMyntraDressListing, MYNTRA_DRESS_HEADERS } from './myntra_dress_listing.js';
import { generateMyntraTopsListing, MYNTRA_TOPS_HEADERS } from './myntra_tops_listing.js';
import { MYNTRA_SIZE_MAPPING } from '../Constants/index.js';
import { generateMyntraShirtListing } from './myntra_shirt_listing.js';

export const MYNTRA_GENERATORS = {
  'Women Dresses': {
    generate: generateMyntraDressListing,
    defaultHeaders: MYNTRA_DRESS_HEADERS,
    filename: 'Myntra_Dress_listing.csv',
    filter: 'dress',
  },
  'Women Tops': {
    generate: generateMyntraTopsListing,
    defaultHeaders: MYNTRA_TOPS_HEADERS,
    filename: 'Myntra_Tops_listing.csv',
    filter: 'top',
  },
  // Stub generators for other categories — they fall back to generic dress generator
  'Women Shirt': {
    generate: (data, sizeMap, headers, customMaps) =>
      generateMyntraShirtListing(data, sizeMap, headers, customMaps),
    defaultHeaders: MYNTRA_DRESS_HEADERS,
    filename: 'Myntra_Shirt_listing.csv',
    filter: 'kurta',
  },
  'Women Skirts': {
    generate: (data, sizeMap, headers, customMaps) =>
      generateMyntraSkirtListing(data, sizeMap, headers, customMaps),
    defaultHeaders: MYNTRA_DRESS_HEADERS,
    filename: 'Myntra_Skirts_listing.csv',
    filter: 'skirt',
  },
  'Women Palazzos': {
    generate: (data, sizeMap, headers, customMaps) =>
      generateMyntraDressListing(data, sizeMap, headers, customMaps),
    defaultHeaders: MYNTRA_DRESS_HEADERS,
    filename: 'Myntra_Palazzos_listing.csv',
    filter: 'palazzo',
  },
};

export { MYNTRA_SIZE_MAPPING };
export * from './myntra_dress_listing.js';
export * from './myntra_tops_listing.js';
export * from './myntra_shirt_listing.js'
export * from './myntra_skirts_listing.js'
