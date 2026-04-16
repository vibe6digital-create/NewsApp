/**
 * Strips source/publisher attribution and share-widget text from article text.
 * Used wherever article.summary or body text is rendered to the user.
 */
export const stripSourceAttribution = (text, source) => {
  if (!text) return text;
  let result = text;

  // Strip WordPress "The post ... appeared first on ..." tail
  result = result.replace(/\s*The post\s.+$/i, '').trim();

  // Strip social share widget text — cut everything from the first share-list keyword
  result = result.replace(
    /\s*(share(\s*this)?[\s:]*|related\s*posts?|also\s*read)[\s\S]*(facebook|twitter|whatsapp|telegram|koo|pinterest|linkedin|instagram|tumblr|reddit|email|print)[\s\S]*$/i,
    ''
  ).trim();
  // Also strip if share keywords appear at start of a "list" (no preceding real text)
  result = result.replace(
    /\n?(facebook|twitter|whatsapp|telegram|koo|pinterest|linkedin|instagram|tumblr|reddit|email|print|copy url|copy link)(\s*\n[\s\S]*)?$/i,
    ''
  ).trim();

  if (source) {
    const esc = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result
      .replace(new RegExp(`\\s*[-–—|/]\\s*${esc}[\\s.,]*$`, 'gi'), '')
      .replace(new RegExp(`\\s*\\(${esc}\\)[\\s.,]*$`, 'gi'), '')
      .replace(new RegExp(`(source|साभार|सौजन्य)\\s*:?\\s*${esc}`, 'gi'), '');
  }
  // Generic trailing attribution patterns
  result = result
    .replace(/\s*[-–—]\s*[A-Z][a-zA-Z\s]{2,30}[a-z]\s*$/, '')
    .replace(/\s*\|\s*[A-Z][a-zA-Z\s]{2,30}[a-z]\s*$/, '')
    // "Source: XYZ" anywhere in text
    .replace(/\s*(source|publisher|by)\s*:\s*\S[^\n.]{0,50}/gi, '')
    .trim();
  return result;
};
