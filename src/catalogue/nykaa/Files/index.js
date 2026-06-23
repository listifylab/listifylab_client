/**
 * Nykaa Fashion listing generators
 * TODO: Add Nykaa-specific template generators per category.
 * Currently delegates to Myntra generators as a placeholder.
 */
import { generateMyntraDressListing, MYNTRA_DRESS_HEADERS } from '../../myntra/Files/myntra_dress_listing.js';
import { generateMyntraTopsListing, MYNTRA_TOPS_HEADERS } from '../../myntra/Files/myntra_tops_listing.js';
import { NYKAA_SIZE_MAPPING } from '../Constants/index.js';
import { downloadCsv } from '../../shared/csvUtils.js';

export const NYKAA_GENERATORS = {
  'Dresses': {
    generate: (data, sizeMap, headers, customMaps) =>
      generateMyntraDressListing(data, sizeMap || NYKAA_SIZE_MAPPING, headers, customMaps),
    defaultHeaders: MYNTRA_DRESS_HEADERS,
    filename: 'Nykaa_Dress_listing.csv',
  },
  'Tops & Tunics': {
    generate: (data, sizeMap, headers, customMaps) =>
      generateMyntraTopsListing(data, sizeMap || NYKAA_SIZE_MAPPING, headers, customMaps),
    defaultHeaders: MYNTRA_TOPS_HEADERS,
    filename: 'Nykaa_Tops_listing.csv',
  },
};

export { NYKAA_SIZE_MAPPING };
