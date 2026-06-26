/**
 * Shopify listing generators index.
 */
import { generateShopifyListing, SHOPIFY_PRODUCT_HEADERS } from './shopify_listing.js';

const shopifyGen = (category) => ({
  generate: generateShopifyListing,
  defaultHeaders: SHOPIFY_PRODUCT_HEADERS,
  filename: `Shopify_${category.replace(/\s+/g, '_')}_listing.csv`,
});

export const SHOPIFY_GENERATORS = {
  'Women Dresses':         shopifyGen('Women_Dresses'),
  'Women Tops':            shopifyGen('Women_Tops'),
  'Women Kurtas':          shopifyGen('Women_Kurtas'),
  'Women Skirts':          shopifyGen('Women_Skirts'),
  'Women Palazzos':        shopifyGen('Women_Palazzos'),
  'Women Sarees':          shopifyGen('Women_Sarees'),
  'Women Lehenga':         shopifyGen('Women_Lehenga'),
  'Women Jackets & Coats': shopifyGen('Women_Jackets'),
  'Men Shirts':            shopifyGen('Men_Shirts'),
  'Men T-Shirts':          shopifyGen('Men_TShirts'),
  'Men Trousers':          shopifyGen('Men_Trousers'),
  'Men Kurtas':            shopifyGen('Men_Kurtas'),
  'All Categories':        shopifyGen('All'),
};
