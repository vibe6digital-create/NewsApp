import { RSS_FEEDS, CACHE_KEY, CACHE_DURATION, CATEGORY_KEYWORDS } from '../utils/constants';

// Multiple CORS proxies — tried in order until one succeeds
const CORS_PROXIES = [
  { url: 'https://api.allorigins.win/get?url=', responseKey: 'contents' },
  { url: 'https://api.codetabs.com/v1/proxy?quest=', responseKey: null },   // returns raw text
  { url: 'https://corsproxy.io/?', responseKey: null },                      // returns raw text
];

/**
 * Detect actual language from title script, overriding the feed's tagged lang.
 * If a "hi" feed has an English-only title, reclassify as 'en' (and vice versa).
 */
const detectLang = (title, feedLang) => {
  if (!title) return feedLang;
  const devanagari = (title.match(/[\u0900-\u097F]/g) || []).length;
  const latin      = (title.match(/[a-zA-Z]/g) || []).length;
  if (devanagari >= 3) return 'hi';   // has meaningful Hindi script → Hindi
  if (latin >= 5 && devanagari === 0) return 'en'; // pure Latin → English
  return feedLang;                     // mixed / short → trust feed tag
};

const generateId = (title, source) => {
  const str = `${title}-${source}`.toLowerCase().replace(/[^a-z0-9]/g, '');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return 'rss_' + Math.abs(hash).toString(36);
};

const extractImage = (item) => {
  // 1. enclosure tag
  const enclosure = item.querySelector('enclosure');
  if (enclosure) {
    const url = enclosure.getAttribute('url');
    if (url && url.match(/\.(jpg|jpeg|png|gif|webp)/i)) return url;
  }

  // 2. media:content — getElementsByTagName required for XML namespaces
  const mediaContent = item.getElementsByTagName('media:content');
  for (let i = 0; i < mediaContent.length; i++) {
    const url = mediaContent[i].getAttribute('url');
    if (url && url.match(/\.(jpg|jpeg|png|gif|webp)/i)) return url;
  }

  // 3. media:thumbnail
  const mediaThumbnail = item.getElementsByTagName('media:thumbnail');
  for (let i = 0; i < mediaThumbnail.length; i++) {
    const url = mediaThumbnail[i].getAttribute('url');
    if (url) return url;
  }

  // 4. image tag inside description HTML
  const desc = item.querySelector('description');
  if (desc) {
    const html = desc.textContent || '';
    const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (m) return m[1];
  }

  // 5. content:encoded (full article body with HTML)
  const encoded = item.getElementsByTagName('content:encoded')[0];
  if (encoded) {
    const html = encoded.textContent || '';
    const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (m) return m[1];
  }

  // 6. itunes:image
  const itunesImg = item.getElementsByTagName('itunes:image')[0];
  if (itunesImg) {
    const url = itunesImg.getAttribute('href');
    if (url) return url;
  }

  return null;
};

// Categories that have dedicated feeds — articles must stay strictly in their category
const SPECIALIST_CATS = new Set(['education', 'jobs', 'health', 'technology', 'astro', 'rental', 'podcast', 'quiz']);

// Ordered list used when reclassifying national/world articles
const RECLASSIFY_ORDER = ['jobs', 'education', 'health', 'technology', 'astro'];

const categorizeFeedItem = (title, description, feedCategories) => {
  const text = `${title} ${description}`.toLowerCase();
  const primaryCat = feedCategories[0] || 'national';

  // 1. Uttarakhand keywords always win — highest priority
  const ukKeywords = CATEGORY_KEYWORDS.uttarakhand || [];
  if (ukKeywords.some(kw => text.includes(kw.toLowerCase()))) return 'uttarakhand';

  // 2. Specialist feeds: trust the feed's designated category completely.
  //    A health article about "India" must NOT become national.
  if (SPECIALIST_CATS.has(primaryCat)) return primaryCat;

  // 3. National / world feeds: try to reclassify into a specific category
  //    using keyword scoring — require 2+ distinct keyword hits to avoid false positives.
  for (const cat of RECLASSIFY_ORDER) {
    const keywords = CATEGORY_KEYWORDS[cat] || [];
    let hits = 0;
    for (const kw of keywords) {
      if (text.includes(kw.toLowerCase())) {
        hits++;
        if (hits >= 2) return cat;
      }
    }
  }

  return primaryCat;
};

const parseFeed = (xmlText, feedConfig) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'text/xml');

    const parseError = doc.querySelector('parsererror');
    if (parseError) return [];

    const items = doc.querySelectorAll('item');
    if (items.length === 0) {
      // Try Atom format
      const entries = doc.querySelectorAll('entry');
      return Array.from(entries).slice(0, 10).map(entry => {
        const title = entry.querySelector('title')?.textContent?.trim() || '';
        const contentEl = entry.querySelector('content');
        const summary = entry.querySelector('summary')?.textContent?.trim() ||
                        contentEl?.textContent?.trim() || '';
        const fullBody = contentEl?.textContent?.trim() || '';
        const link = entry.querySelector('link')?.getAttribute('href') || '';
        const pubDate = entry.querySelector('published')?.textContent ||
                       entry.querySelector('updated')?.textContent || new Date().toISOString();
        const image = extractImage(entry);

        return {
          id: generateId(title, feedConfig.name),
          title,
          summary: summary.replace(/<[^>]*>/g, '').substring(0, 300),
          body: fullBody.length > 200 ? fullBody : null,
          image,
          link,
          pubDate: new Date(pubDate).toISOString(),
          category: categorizeFeedItem(title, summary, feedConfig.categories),
          source: feedConfig.name,
          lang: detectLang(title, feedConfig.lang),
          stateSlug: feedConfig.state || null,
          isRss: true
        };
      }).filter(item => item.title);
    }

    return Array.from(items).slice(0, 10).map(item => {
      const title = item.querySelector('title')?.textContent?.trim() || '';
      const description = item.querySelector('description')?.textContent?.trim() || '';
      const link = item.querySelector('link')?.textContent?.trim() || '';
      const pubDate = item.querySelector('pubDate')?.textContent ||
                     item.querySelector('date')?.textContent || new Date().toISOString();
      const image = extractImage(item);
      const category = item.querySelector('category')?.textContent?.trim() || '';

      // Extract full article body from content:encoded if available
      const encodedEl = item.getElementsByTagName('content:encoded')[0];
      const fullBody = encodedEl?.textContent?.trim() || '';

      return {
        id: generateId(title, feedConfig.name),
        title,
        summary: description.replace(/<[^>]*>/g, '').substring(0, 300),
        body: fullBody.length > 200 ? fullBody : null,
        image,
        link,
        pubDate: new Date(pubDate).toISOString(),
        category: categorizeFeedItem(title, description + ' ' + category, feedConfig.categories),
        source: feedConfig.name,
        lang: detectLang(title, feedConfig.lang),
        stateSlug: feedConfig.state || null,
        isRss: true
      };
    }).filter(item => item.title);
  } catch (err) {
    console.warn(`Parse error for ${feedConfig.name}:`, err);
    return [];
  }
};

const fetchWithTimeout = (url, ms = 6000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
};

const fetchSingleFeed = async (feedConfig) => {
  for (const proxy of CORS_PROXIES) {
    try {
      const proxyUrl = `${proxy.url}${encodeURIComponent(feedConfig.url)}`;
      const response = await fetchWithTimeout(proxyUrl, 7000);

      if (!response.ok) continue;

      let xmlText;
      if (proxy.responseKey) {
        const data = await response.json();
        xmlText = data[proxy.responseKey];
      } else {
        xmlText = await response.text();
      }

      if (!xmlText || xmlText.length < 100) continue;

      const articles = parseFeed(xmlText, feedConfig);
      if (articles.length > 0) return articles;
    } catch (err) {
      // Try next proxy
    }
  }
  console.warn(`All proxies failed for ${feedConfig.name}`);
  return [];
};

const deduplicateArticles = (articles) => {
  const seenTitles = new Set();
  const seenLinks = new Set();
  return articles.filter(article => {
    // Deduplicate by URL
    if (article.link) {
      const linkKey = article.link.split('?')[0].toLowerCase().replace(/\/$/, '');
      if (seenLinks.has(linkKey)) return false;
      seenLinks.add(linkKey);
    }
    // Deduplicate by title (first 60 normalized chars — catches same story, different sources)
    const titleKey = article.title.toLowerCase().replace(/[^a-z0-9\u0900-\u097f]/g, '').substring(0, 60);
    if (seenTitles.has(titleKey)) return false;
    seenTitles.add(titleKey);
    return true;
  });
};

const processResults = (results) => {
  let articles = [];
  results.forEach(r => {
    if (r.status === 'fulfilled') articles = [...articles, ...r.value];
  });
  articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  return deduplicateArticles(articles);
};

export const fetchPriorityFeeds = async () => {
  // Use cache if available — fastest possible response
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data; // full cached data, instant
      }
    }
  } catch (e) {}

  // No cache — fetch only priority feeds from network
  const priority = RSS_FEEDS.filter(f => f.priority);
  const results = await Promise.allSettled(priority.map(f => fetchSingleFeed(f)));
  return processResults(results);
};

export const fetchAllFeeds = async (force = false) => {
  // Remove old cache keys from previous versions
  ['rss_cache', 'rss_cache_v2', 'rss_cache_v3', 'rss_cache_v4', 'rss_cache_v5', 'rss_cache_v6', 'rss_cache_v7', 'rss_cache_v8', 'rss_cache_v9', 'rss_cache_v10', 'rss_cache_v11', 'rss_cache_v12', 'rss_cache_v13', 'rss_cache_v14', 'rss_cache_v15', 'rss_cache_v16', 'rss_cache_v17', 'rss_cache_v18', 'rss_cache_v19'].forEach(k => localStorage.removeItem(k));

  // Check current cache (skip if force refresh)
  if (!force) {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data;
        }
      }
    } catch (e) {
      // Cache read failed, continue with fetch
    }
  }

  // Fetch feeds in batches of 6 to avoid overwhelming the CORS proxy
  const BATCH_SIZE = 6;
  let allResults = [];
  for (let i = 0; i < RSS_FEEDS.length; i += BATCH_SIZE) {
    const batch = RSS_FEEDS.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.allSettled(batch.map(feed => fetchSingleFeed(feed)));
    allResults = allResults.concat(batchResults);
  }
  let allArticles = processResults(allResults);

  // Cache results
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: allArticles,
      timestamp: Date.now()
    }));
  } catch (e) {
    // localStorage full, clear cache and try again
    localStorage.removeItem(CACHE_KEY);
  }

  return allArticles;
};

export const filterByCategory = (articles, category) => {
  return articles.filter(a => a.category === category);
};

export const filterBySource = (articles, sources) => {
  return articles.filter(a => sources.includes(a.source));
};

export const searchArticles = (articles, query) => {
  const q = query.toLowerCase();
  return articles.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.summary.toLowerCase().includes(q) ||
    a.source.toLowerCase().includes(q)
  );
};
