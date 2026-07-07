import { NYKAA_SIZE_MAPPING } from '../Constants/index.js';
import { downloadCsv } from '../../shared/csvUtils.js';
import { resolveField } from './nykaaFieldResolvers.js';

const generateNykaaDressListing = (selectedData, sizeMap, headers, customMaps) => {
  const sizeMapping = sizeMap || NYKAA_SIZE_MAPPING;
  const sizes = Object.keys(sizeMapping);

  const csvData = selectedData
    .filter((product) => {
      const styleType = product.fields?.style_type?.toLowerCase() || '';
      return (
        styleType === 'dress' ||
        styleType === 'dresses' ||
        styleType === 'kaftan' ||
        styleType.includes('shirt dress')
      );
    })
    .flatMap((product) => {
      const f = product.fields || {};

      return sizes.map((size) => {
        const mappedSize = sizeMapping[size];
        const context = { product, f, size, mappedSize, customMaps };

        const row = {};
        headers.forEach((header) => {
          row[header] = resolveField(header, context);
        });
        return row;
      });
    });

  downloadCsv('Nykaa_Dress_listing.csv', headers, csvData);
};

export default generateNykaaDressListing;
