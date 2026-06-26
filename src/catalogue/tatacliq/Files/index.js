import { generateMyntraDressListing, MYNTRA_DRESS_HEADERS } from '../../myntra/Files/myntra_dress_listing.js';
import { TATACLIQ_SIZE_MAPPING } from '../Constants/index.js';

export const TATACLIQ_GENERATORS = {
  'All Categories': {
    generate: (data, sizeMap, headers, customMaps) =>
      generateMyntraDressListing(data, sizeMap || TATACLIQ_SIZE_MAPPING, headers, customMaps),
    defaultHeaders: MYNTRA_DRESS_HEADERS,
    filename: 'TataCliq_listing.csv',
  },
};
export { TATACLIQ_SIZE_MAPPING };
