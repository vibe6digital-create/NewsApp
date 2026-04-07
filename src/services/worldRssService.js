/**
 * Filter world articles into region/topic subsections.
 */
export const filterByWorldSubsection = (articles, key, keywords) => {
  return articles.filter(a => {
    const text = `${a.title || ''} ${a.summary || ''} ${a.source || ''}`.toLowerCase();
    return keywords.some(kw => text.includes(kw.toLowerCase()));
  });
};
