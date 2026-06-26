import { generateMyntraDressListing, MYNTRA_DRESS_HEADERS } from '../../myntra/Files/myntra_dress_listing.js';
import { generateMyntraTopsListing, MYNTRA_TOPS_HEADERS } from '../../myntra/Files/myntra_tops_listing.js';
import { AJIO_SIZE_MAPPING } from '../Constants/index.js';

export const AJIO_GENERATORS = {
  'Women Dresses': {
    generate: (data, sizeMap, headers, customMaps) =>
      generateMyntraDressListing(data, sizeMap || AJIO_SIZE_MAPPING, headers, customMaps),
    defaultHeaders: MYNTRA_DRESS_HEADERS,
    filename: 'Ajio_Dress_listing.csv',
  },
  'Women Tops': {
    generate: (data, sizeMap, headers, customMaps) =>
      generateMyntraTopsListing(data, sizeMap || AJIO_SIZE_MAPPING, headers, customMaps),
    defaultHeaders: MYNTRA_TOPS_HEADERS,
    filename: 'Ajio_Tops_listing.csv',
  },
};
export { AJIO_SIZE_MAPPING };
