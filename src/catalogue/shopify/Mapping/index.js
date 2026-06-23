/**
 * Shopify field mappings
 * Shopify accepts most values as-is but we normalise for consistency.
 */

export function mapShopifyColor(color = '') {
  return color || '';
}

export function mapShopifyFabric(fabric = '') {
  return fabric || '';
}

export function mapShopifyPattern(pattern = '') {
  // Shopify doesn't have a dropdown — goes into tags/metafields freely
  return pattern || '';
}

export function mapShopifyOccasion(occasion = '') {
  return occasion || '';
}

export function mapShopifySleeveLength(sleeve = '') {
  return sleeve || '';
}

export function mapShopifyStatus(status = '') {
  if (!status) return 'active';
  return ['active', 'draft', 'archived'].includes(status.toLowerCase())
    ? status.toLowerCase()
    : 'active';
}
