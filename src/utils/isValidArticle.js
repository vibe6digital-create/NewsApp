/**
 * Validates that an RSS article has real, usable content.
 * Admin articles (isRss: false) are always considered valid.
 * Returns false if the article is a stub, broken, or access-denied page.
 */

const INVALID_PATTERNS = [
  /access\s+denied/i,
  /you\s+don['']t\s+have\s+permission/i,
  /reference\s+#\s*\d+/i,
  /errors\.edgesuite\.net/i,
  /403\s+forbidden/i,
  /cf-error-details/i,
  /ray\s+id\s*:/i,
  /error\s+1020/i,
];

export const isValidArticle = (article) => {
  if (!article) return false;

  // Admin-written articles are always valid
  if (!article.isRss) return true;

  const title   = article.title   || '';
  const summary = article.summary || '';
  const body    = article.body    || '';

  // Fail if any error/access-denied pattern appears anywhere in the content
  const combined = `${title} ${summary} ${body}`;
  if (INVALID_PATTERNS.some(re => re.test(combined))) return false;

  // Reject stubs: no body AND very short summary (likely just an external link stub)
  const summaryText = summary.replace(/<[^>]*>/g, '').trim();
  if (summaryText.length < 50 && !body) return false;

  return true;
};
