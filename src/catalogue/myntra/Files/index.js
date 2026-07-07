/**
 * Myntra listing generators index.
 * Each entry maps a category label → { generate, defaultHeaders, filename }
 */

import { generateMyntraDressListing, MYNTRA_DRESS_HEADERS } from './myntra_dress_listing.js';
import { generateMyntraTopsListing, MYNTRA_TOPS_HEADERS } from './myntra_tops_listing.js';
import { generateMyntraSkirtListing } from './myntra_skirts_listing.js';
import { generateMyntraBlazerListing, MYNTRA_BLAZER_HEADERS } from './myntra_blazers_listing.js';
import { generateMyntraShirtListing } from './myntra_shirt_listing.js';
import { generateMyntraCoatListing, MYNTRA_COAT_HEADERS } from './myntra_coat_listing.js';
import { generateMyntraJacketListing, MYNTRA_JACKET_HEADERS } from './myntra_jacket_listing.js';
import { generateMyntraShrugListing, MYNTRA_SHRUGS_HEADERS } from './myntra_shrug_listing.js';

import { MYNTRA_SIZE_MAPPING } from '../Constants/index.js';

export const MYNTRA_GENERATORS = {
  'Women Dresses': {
    generate: (data, sizeMap, headers, customMaps) =>
      generateMyntraDressListing(data, sizeMap, headers, customMaps),
    defaultHeaders: MYNTRA_DRESS_HEADERS,
    filename: 'Myntra_Dress_listing.csv',
    filter: 'dress',
  },
  'Women Tops': {
    generate: (data, sizeMap, headers, customMaps) =>
      generateMyntraTopsListing(data, sizeMap, headers, customMaps),
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
  'Women Blazers': {
    generate: (data, sizeMap, headers, customMaps) =>
      generateMyntraBlazerListing(data, sizeMap, headers, customMaps),
    defaultHeaders: MYNTRA_BLAZER_HEADERS,
    filename: 'Myntra_BLAZER_listing.csv',
    filter: 'blazer',
  },
  'Women Coats': {
    generate: (data, sizeMap, headers, customMaps) =>
      generateMyntraCoatListing(data, sizeMap, headers, customMaps),
    defaultHeaders: MYNTRA_BLAZER_HEADERS,
    filename: 'Myntra_Coats_listing.csv',
    filter: 'coat',
  },
  'Women Jackets': {
    generate: (data, sizeMap, headers, customMaps) =>
      generateMyntraJacketListing(data, sizeMap, headers, customMaps),
    defaultHeaders: MYNTRA_JACKET_HEADERS,
    filename: 'Myntra_Jackets_listing.csv',
    filter: 'jacket',
  },
  'Women Shrugs': {
    generate: (data, sizeMap, headers, customMaps) =>
      generateMyntraShrugListing(data, sizeMap, headers, customMaps),
    defaultHeaders: MYNTRA_SHRUGS_HEADERS,
    filename: 'Myntra_Shrugs_listing.csv',
    filter: 'shrug',
  },
};

export { MYNTRA_SIZE_MAPPING };
export * from './myntra_dress_listing.js';
export * from './myntra_tops_listing.js';
export * from './myntra_shirt_listing.js';
export * from './myntra_skirts_listing.js';
export * from './myntra_blazers_listing.js';
export * from './myntra_coat_listing.js';
export * from './myntra_jacket_listing.js';
export * from './myntra_shrug_listing.js';
