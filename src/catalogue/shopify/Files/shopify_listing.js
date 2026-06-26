/**
 * Shopify Listing Generator
 * Generates a Shopify-compatible products CSV for bulk import.
 * One product = multiple rows (one per size/color variant).
 * Shopify's import format: first row has title/description, subsequent rows only have variant data.
 */

import { downloadCsv } from '../../shared/csvUtils.js';
import {
  SHOPIFY_DEFAULT_VENDOR,
  SHOPIFY_INVENTORY_TRACKER,
  SHOPIFY_INVENTORY_POLICY,
  SHOPIFY_FULFILLMENT_SERVICE,
  SHOPIFY_WEIGHT_UNIT,
} from '../Constants/index.js';

export const SHOPIFY_PRODUCT_HEADERS = [
  'Handle',
  'Title',
  'Body (HTML)',
  'Vendor',
  'Product Category',
  'Type',
  'Tags',
  'Published',
  'Option1 Name',
  'Option1 Value',
  'Option2 Name',
  'Option2 Value',
  'Variant SKU',
  'Variant Grams',
  'Variant Inventory Tracker',
  'Variant Inventory Qty',
  'Variant Inventory Policy',
  'Variant Fulfillment Service',
  'Variant Price',
  'Variant Compare At Price',
  'Variant Requires Shipping',
  'Variant Taxable',
  'Image Src',
  'Image Position',
  'Image Alt Text',
  'Gift Card',
  'SEO Title',
  'SEO Description',
  'Status',
  'Manufacturer',
  'Packer',
  'Country of Origin',
];

/**
 * Convert a product name to a URL-safe handle.
 * @param {string} name
 * @param {string} styleNumber
 */
function toHandle(name, styleNumber) {
  const base = (name || styleNumber || 'product')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);
  return `${base}-${styleNumber || ''}`.replace(/-$/, '');
}

/**
 * Build a tags string from product fields.
 */
function buildTags(f, category) {
  const parts = [
    category,
    f.stylePrimaryColor || f.primary_color || f.color,
    f.fabric || f.fabric_type || f.material,
    f.occasion,
    f.season,
    f.prints || f.pattern,
  ].filter(Boolean);
  return [...new Set(parts)].join(', ');
}

/**
 * Build HTML body from product fields.
 */
function buildBody(f) {
  const lines = [];
  if (f.fabric || f.fabric_type || f.material) lines.push(`<p><strong>Fabric:</strong> ${f.fabric || f.fabric_type || f.material}</p>`);
  if (f.occasion) lines.push(`<p><strong>Occasion:</strong> ${f.occasion}</p>`);
  if (f.neckStyle || f.neck_style) lines.push(`<p><strong>Neck Style:</strong> ${f.neckStyle || f.neck_style}</p>`);
  if (f.sleeveLength || f.sleeve_length) lines.push(`<p><strong>Sleeve Length:</strong> ${f.sleeveLength || f.sleeve_length}</p>`);
  if (f.washCare || f.wash_care) lines.push(`<p><strong>Care:</strong> ${f.washCare || f.wash_care}</p>`);
  if (f.description || f.product_description) lines.push(`<p>${f.description || f.product_description}</p>`);
  return lines.join('\n');
}

/**
 * @param {Object[]} selectedData  - fetched products
 * @param {Object}   sizeMapping   - { XXS: 'XXS', XS: 'XS', ... }
 * @param {string[]} csvHeaders    - columns to include
 * @param {Object}   customMaps    - tenant custom value maps
 * @param {Object}   userDetails   - { manufacturerDetails, packerDetails }
 * @returns {number} - number of rows written
 */
export function generateShopifyListing(
  selectedData,
  sizeMapping = {},
  csvHeaders = SHOPIFY_PRODUCT_HEADERS,
  customMaps = {},
  userDetails = {}
) {
  const sizes = Object.keys(sizeMapping);
  const manufacturer = userDetails.manufacturerDetails || SHOPIFY_DEFAULT_VENDOR;
  const packer       = userDetails.packerDetails       || SHOPIFY_DEFAULT_VENDOR;

  const rows = [];

  selectedData.forEach((product) => {
    const f = product.fields || {};
    const get = (...keys) => { for (const k of keys) if (f[k]) return f[k]; return ''; };

    const styleNumber  = product.styleNumber || '';
    const title        = get('styleName', 'style_name', 'product_name', 'name') || styleNumber;
    const vendor       = get('brand') || userDetails.tenantName || SHOPIFY_DEFAULT_VENDOR;
    const productType  = get('style_type', 'styleType', 'category', 'type') || '';
    const handle       = toHandle(title, styleNumber);
    const color        = get('style_primary_color', 'primary_color', 'color', 'colour') || '';
    const mrp          = get('mrp', 'price', 'selling_price') || '';
    const tags         = buildTags(f, productType);
    const bodyHtml     = buildBody(f);
    const imageUrl     = get('frontImage', 'front_image', 'image_url', 'image') || '';
    const seoTitle     = title;
    const seoDesc      = `${title} — ${color}`.replace(/^ — $/, '');

    sizes.forEach((size, sizeIdx) => {
      const mappedSize = sizeMapping[size] || size;
      const sku = `${styleNumber}-${color || 'NA'}-${mappedSize}`;
      const isFirstRow = sizeIdx === 0;

      rows.push({
        Handle:                         handle,
        Title:                          isFirstRow ? title : '',
        'Body (HTML)':                  isFirstRow ? bodyHtml : '',
        Vendor:                         isFirstRow ? vendor : '',
        'Product Category':             isFirstRow ? productType : '',
        Type:                           isFirstRow ? productType : '',
        Tags:                           isFirstRow ? tags : '',
        Published:                      isFirstRow ? 'true' : '',
        'Option1 Name':                 isFirstRow ? 'Size' : '',
        'Option1 Value':                mappedSize,
        'Option2 Name':                 isFirstRow ? 'Color' : '',
        'Option2 Value':                color,
        'Variant SKU':                  sku,
        'Variant Grams':                '300',
        'Variant Inventory Tracker':    SHOPIFY_INVENTORY_TRACKER,
        'Variant Inventory Qty':        '10',
        'Variant Inventory Policy':     SHOPIFY_INVENTORY_POLICY,
        'Variant Fulfillment Service':  SHOPIFY_FULFILLMENT_SERVICE,
        'Variant Price':                mrp,
        'Variant Compare At Price':     '',
        'Variant Requires Shipping':    'true',
        'Variant Taxable':              'true',
        'Image Src':                    isFirstRow ? imageUrl : '',
        'Image Position':               isFirstRow ? '1' : '',
        'Image Alt Text':               isFirstRow ? title : '',
        'Gift Card':                    'false',
        'SEO Title':                    isFirstRow ? seoTitle : '',
        'SEO Description':              isFirstRow ? seoDesc : '',
        Status:                         'active',
        Manufacturer:                   isFirstRow ? manufacturer : '',
        Packer:                         isFirstRow ? packer : '',
        'Country of Origin':            isFirstRow ? 'India' : '',
      });
    });
  });

  if (!rows.length) throw new Error('No products to export for Shopify.');

  // Map rows to CSV using csvHeaders order
  const csvRows = rows.map((row) =>
    csvHeaders.map((h) => {
      const val = row[h] ?? '';
      const str = String(val);
      return str.includes(',') || str.includes('"') || str.includes('\n')
        ? `"${str.replace(/"/g, '""')}"`
        : str;
    })
  );

  const content = [csvHeaders.join(','), ...csvRows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([content], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Shopify_products_import.csv';
  a.click();
  URL.revokeObjectURL(url);

  return rows.length;
}
