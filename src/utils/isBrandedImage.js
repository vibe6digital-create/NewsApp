/**
 * Detects image URLs that likely contain embedded publisher branding.
 * Used at render-time to swap branded images for neutral category fallbacks.
 *
 * Detection is URL-based (no runtime image analysis):
 *   1. Publisher domains confirmed to watermark their article thumbnail images
 *   2. URL path/query patterns indicating a social/OG template (typically branded)
 */

// Publisher domains confirmed to embed their name or logo into article thumbnails.
// Extend this list when additional branded publishers are identified.
const BRANDED_DOMAINS = [
  'navhindtimes.com',
];

// URL substrings that strongly indicate a social/OG template image (typically carries publisher branding).
const BRANDED_PATH_PATTERNS = [
  'og-image', 'og_image', 'opengraph-image',
  'social-share', 'social_share', 'social-image', 'social_image',
  'preview-image', 'preview_image',
  'noimage', 'no-image', 'no_image',
  'default-thumb', 'default_thumb', 'default-image', 'default_image',
  '/placeholder',
  'watermark',
];

/**
 * Returns true if the image URL is likely to display embedded publisher branding.
 * Returns false on URL parse errors so broken URLs fall through to the onError handler.
 */
export const isBrandedImage = (imageUrl) => {
  if (!imageUrl) return false;
  try {
    const url = new URL(imageUrl);
    const hostname = url.hostname.toLowerCase();
    const fullPath = (url.pathname + url.search).toLowerCase();

    if (BRANDED_DOMAINS.some(d => hostname === d || hostname.endsWith('.' + d))) {
      return true;
    }

    if (BRANDED_PATH_PATTERNS.some(p => fullPath.includes(p))) {
      return true;
    }

    return false;
  } catch {
    // Invalid URL — pass through; the img onError handler will catch broken images
    return false;
  }
};
