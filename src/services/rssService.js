import { RSS_FEEDS, CACHE_KEY, CACHE_DURATION, CATEGORY_KEYWORDS, API_BASE } from '../utils/constants';
import { stripSourceAttribution } from '../utils/stripSource';

// Backend RSS proxy — uses relative /api/rss which Vercel rewrites to Render backend
// Falls back to public CORS proxies if backend is unavailable
const BACKEND_RSS_PROXY = `${API_BASE}/api/rss?url=`;

// Public CORS proxies as fallback
const CORS_PROXIES = [
  { url: 'https://api.allorigins.win/get?url=', responseKey: 'contents' },
  { url: 'https://api.codetabs.com/v1/proxy?quest=', responseKey: null },
  { url: 'https://corsproxy.io/?', responseKey: null },
];

/**
 * Use the feed's tagged language as the article's language.
 * Feed lang is the source of truth — Hindi feeds often use English words
 * in titles (e.g., "PM Modi", "SSC CGL") but are still Hindi articles.
 *
 * When feedLang is not set, fall back to Unicode-range detection:
 *   – Devanagari characters (U+0900–U+097F) → Hindi
 *   – Latin characters with no Devanagari         → English
 */
const DEVANAGARI_RE = /[\u0900-\u097F]/;

const detectLang = (title, feedLang) => {
  // Feed language tag is always the primary source of truth
  if (feedLang) return feedLang;

  // Fallback: detect from title text using Unicode ranges
  if (DEVANAGARI_RE.test(title)) return 'hi';
  return 'en';
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

// Keywords that confirm an article is about India (unambiguous India-specific terms)
const INDIA_INDICATORS = [
  'india', 'indian', 'भारत', 'भारतीय', 'modi', 'मोदी', 'bjp', 'aap',
  'lok sabha', 'rajya sabha', 'new delhi', 'delhi', 'mumbai', 'rupee', 'rbi',
  'pm modi', 'narendra modi', 'amit shah', 'राजनाथ', 'अमित शाह',
  'केंद्र सरकार', 'भारत सरकार', 'नई दिल्ली', 'election commission of india',
  'supreme court of india', 'isro', 'भारतीय जनता',
];

// Keywords that strongly indicate non-India international news
const WORLD_INDICATORS = [
  // Countries
  'pakistan', 'china', 'united states', 'america', 'russia', 'ukraine',
  'israel', 'gaza', 'iran', 'nato', 'imf', 'world bank', 'european union',
  'africa', 'brazil', 'canada', 'australia', 'japan', 'north korea', 'south korea',
  'france', 'germany', 'saudi arabia', 'turkey', 'egypt', 'myanmar', 'afghanistan',
  'taiwan', 'hong kong', 'sri lanka', 'bangladesh', 'nepal', 'indonesia',
  'malaysia', 'singapore', 'vietnam', 'thailand', 'kenya', 'nigeria', 'mexico',
  'argentina', 'colombia', 'iran', 'iraq', 'syria', 'lebanon', 'yemen', 'qatar',
  'morocco', 'ethiopia', 'ukraine', 'poland', 'sweden', 'norway', 'denmark',
  'netherlands', 'spain', 'italy', 'portugal', 'greece', 'hungary',
  // World leaders & institutions
  'trump', 'biden', 'putin', 'zelensky', 'netanyahu', 'xi jinping', 'erdogan',
  'white house', 'kremlin', 'pentagon', 'european commission',
  // Hindi country names
  'पाकिस्तान', 'चीन', 'अमेरिका', 'रूस', 'यूक्रेन', 'इजरायल', 'ईरान',
  'ट्रम्प', 'ट्रंप', 'बाइडेन', 'पुतिन', 'श्रीलंका', 'बांग्लादेश', 'नेपाल',
  'अफगानिस्तान', 'सऊदी अरब', 'जापान', 'फ्रांस', 'जर्मनी', 'ब्राजील',
];

const categorizeFeedItem = (title, description, feedCategories) => {
  const text = `${title} ${description}`.toLowerCase();
  const primaryCat = feedCategories[0] || 'national';

  // 1. Uttarakhand keywords always win — highest priority
  const ukKeywords = CATEGORY_KEYWORDS.uttarakhand || [];
  if (ukKeywords.some(kw => text.includes(kw.toLowerCase()))) return 'uttarakhand';

  // 2. Specialist feeds (health, jobs, technology, astro, education): trust completely.
  if (SPECIALIST_CATS.has(primaryCat)) return primaryCat;

  // 3. For ALL national-primary articles: if content is clearly about a foreign country/entity
  //    and has no India-specific context, reclassify as world.
  if (primaryCat === 'national') {
    const hasWorldIndicator = WORLD_INDICATORS.some(kw => text.includes(kw));
    const hasIndiaIndicator = INDIA_INDICATORS.some(kw => text.includes(kw));
    if (hasWorldIndicator && !hasIndiaIndicator) return 'world';
  }

  // 4. Multi-category feeds (e.g. ["national","education"] or ["national","jobs"]):
  //    reclassify ONLY to categories the feed itself lists — never to unrelated ones.
  //    Pick the secondary category with the MOST keyword hits (min 1).
  let bestCat = null;
  let bestHits = 0;
  for (const cat of feedCategories.slice(1)) {
    if (!SPECIALIST_CATS.has(cat)) continue;
    const keywords = CATEGORY_KEYWORDS[cat] || [];
    let hits = 0;
    for (const kw of keywords) {
      if (text.includes(kw.toLowerCase())) hits++;
    }
    if (hits > bestHits) {
      bestHits = hits;
      bestCat = cat;
    }
  }
  if (bestHits >= 1 && bestCat) return bestCat;

  return primaryCat;
};

// Decode HTML entities AND strip tags — handles doubly-encoded RSS descriptions
const htmlToText = (html) => {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return (tmp.textContent || '').replace(/\s+/g, ' ').trim();
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
        const rawTitle = entry.querySelector('title')?.textContent?.trim() || '';
        const contentEl = entry.querySelector('content');
        const summaryRaw = entry.querySelector('summary')?.textContent?.trim() ||
                        contentEl?.textContent?.trim() || '';
        const fullBody = contentEl?.textContent?.trim() || '';
        const link = entry.querySelector('link')?.getAttribute('href') || '';
        const pubDate = entry.querySelector('published')?.textContent ||
                       entry.querySelector('updated')?.textContent || new Date().toISOString();
        const image = extractImage(entry);

        // Only use content element as body — summary is already stored in summary field
        const cleanSummary = htmlToText(summaryRaw);
        const body = fullBody.length > 100 ? fullBody : null;
        const title = stripSourceAttribution(rawTitle, feedConfig.name);

        return {
          id: generateId(rawTitle, feedConfig.name),
          title,
          summary: stripSourceAttribution(cleanSummary, feedConfig.name).substring(0, 600),
          body,
          image,
          link,
          pubDate: new Date(pubDate).toISOString(),
          category: categorizeFeedItem(title, summaryRaw, feedConfig.categories),
          source: feedConfig.name,
          lang: detectLang(title, feedConfig.lang),
          stateSlug: feedConfig.state || null,
          isRss: true
        };
      }).filter(item => item.title);
    }

    return Array.from(items).slice(0, 10).map(item => {
      const rawTitle = item.querySelector('title')?.textContent?.trim() || '';
      const description = item.querySelector('description')?.textContent?.trim() || '';
      const link = item.querySelector('link')?.textContent?.trim() || '';
      const pubDate = item.querySelector('pubDate')?.textContent ||
                     item.querySelector('date')?.textContent || new Date().toISOString();
      const image = extractImage(item);
      const category = item.querySelector('category')?.textContent?.trim() || '';

      // Extract full article body from content:encoded if available
      const encodedEl = item.getElementsByTagName('content:encoded')[0];
      const fullBody = encodedEl?.textContent?.trim() || '';

      // Only use content:encoded as body — description is already stored in summary
      const cleanDesc = htmlToText(description);
      const body = fullBody.length > 100 ? fullBody : null;
      const title = stripSourceAttribution(rawTitle, feedConfig.name);

      return {
        id: generateId(rawTitle, feedConfig.name),
        title,
        summary: stripSourceAttribution(cleanDesc, feedConfig.name).substring(0, 600),
        body,
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

// Fire-and-forget ping to wake Render backend (free tier sleeps after 15 min)
export const wakeUpBackend = () => {
  if (!BACKEND_RSS_PROXY) return;
  fetchWithTimeout('/api/rss', 5000).catch(() => {});
};

const tryBackendProxy = async (feedConfig, timeoutMs) => {
  const proxyUrl = `${BACKEND_RSS_PROXY}${encodeURIComponent(feedConfig.url)}`;
  const response = await fetchWithTimeout(proxyUrl, timeoutMs);
  if (!response.ok) return null;
  const xmlText = await response.text();
  if (!xmlText || xmlText.length < 100) return null;
  const articles = parseFeed(xmlText, feedConfig);
  return articles.length > 0 ? articles : null;
};

const fetchSingleFeed = async (feedConfig) => {
  // Backend proxy first (instant if Render is warm)
  if (BACKEND_RSS_PROXY) {
    try {
      const articles = await tryBackendProxy(feedConfig, 8000);
      if (articles) return articles;
    } catch {} // cold start or error → fall through to CORS proxies
  }

  // CORS proxies fallback (works for open/Western feeds)
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
    } catch {}
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

  // No cache — fetch all priority feeds in one parallel round (Vercel handles concurrency)
  const priority = RSS_FEEDS.filter(f => f.priority);
  const BATCH_SIZE = 30;
  let allResults = [];
  for (let i = 0; i < priority.length; i += BATCH_SIZE) {
    const batch = priority.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.allSettled(batch.map(f => fetchSingleFeed(f)));
    allResults = allResults.concat(batchResults);
  }
  const articles = processResults(allResults);

  // Save priority results to cache immediately — this also prevents fetchAllFeeds(false)
  // from re-fetching the same feeds seconds later (it will find fresh cache and return).
  if (articles.length > 0) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data: articles, timestamp: Date.now() }));
    } catch (e) {
      localStorage.removeItem(CACHE_KEY);
    }
  }

  return articles;
};

export const fetchAllFeeds = async (force = false) => {
  // Remove old cache keys from previous versions
  ['rss_cache', 'rss_cache_v2', 'rss_cache_v3', 'rss_cache_v4', 'rss_cache_v5', 'rss_cache_v6', 'rss_cache_v7', 'rss_cache_v8', 'rss_cache_v9', 'rss_cache_v10', 'rss_cache_v11', 'rss_cache_v12', 'rss_cache_v13', 'rss_cache_v14', 'rss_cache_v15', 'rss_cache_v16', 'rss_cache_v17', 'rss_cache_v18', 'rss_cache_v19', 'rss_cache_v20', 'rss_cache_v21', 'rss_cache_v22', 'rss_cache_v23', 'rss_cache_v24', 'rss_cache_v25', 'rss_cache_v26', 'rss_cache_v27', 'rss_cache_v28', 'rss_cache_v29', 'rss_cache_v30', 'rss_cache_v31', 'rss_cache_v32', 'rss_cache_v33', 'rss_cache_v34', 'rss_cache_v35', 'rss_cache_v36', 'rss_cache_v37', 'rss_cache_v38', 'rss_cache_v39', 'rss_cache_v40', 'rss_cache_v41'].forEach(k => localStorage.removeItem(k));

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

  // Fetch feeds in larger batches — Vercel serverless handles concurrency well
  const BATCH_SIZE = 20;
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
    a.summary.toLowerCase().includes(q)
  );
};
