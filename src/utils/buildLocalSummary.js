/**
 * generateSummary(article, lang)
 *
 * Builds a structured 100–200 word summary from article content.
 * - Combines body + summary + title
 * - Cleans HTML, URLs, source names, junk
 * - Splits into sentences, scores by informativeness
 * - Picks top sentences matching the active language
 * - Returns 2–3 paragraphs, enforcing 100–200 word range
 *
 * Never shows raw content directly — always summarizes.
 */
import { stripSourceAttribution } from './stripSource';

// ── Constants ────────────────────────────────────────────────
const DEVANAGARI = /[\u0900-\u097F]/;
const LATIN      = /[a-zA-Z]/;

const JUNK = [
  /ndtv\.in|ndtv\s+group|dnpa\s+code/i,
  /©|copyright|all\s+rights\s+reserved/i,
  /get\s+app\s+(for\s+)?better\s+experience/i,
  /jiosaavn|listen\s+to\s+the\s+latest\s+songs/i,
  /only\s+on\s+(jiosaavn|spotify|gaana|wynk)/i,
  /ताज़ातरीन\s+खबर|पूरी\s+स्टोरी\s+पढ़ें|ट्रेंडिंग\s+न्यूज़/i,
  /अन्य\s+समाचार.*वीडियो/i,
  /facebook.*twitter|youtube.*instagram|instagram.*threads/i,
  /read\s+(full\s+)?(story|article|more)/i,
  /click\s+(here|to\s+read)/i,
  /subscribe\s+to\s+our\s+newsletter/i,
  /^(source|by|via|साभार|सौजन्य)\s*:/i,
  /^https?:\/\/\S+$/,
  /share\s*this\s*(article|story|post)?/i,
  /also\s+read|related\s+posts?|more\s+news/i,
  /^(home|menu|navigation|search)\s*$/i,
];

// ── Step 1: Clean text ────────────────────────────────────────
const cleanText = (raw, source) => {
  if (!raw) return '';
  let text = raw
    // Strip HTML tags
    .replace(/<[^>]+>/g, ' ')
    // Decode common entities
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#?\w+;/gi, ' ')
    // Remove bare URLs
    .replace(/https?:\/\/\S+/g, '')
    // Remove markdown formatting
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*?([^*]+)\*\*?/g, '$1')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    .trim();

  // Strip source attribution patterns
  return stripSourceAttribution(text, source);
};

// ── Step 2: Split into sentences ─────────────────────────────
const splitSentences = (text) => {
  if (!text) return [];
  return text
    // Insert newline after each sentence-ending punctuation + space
    .replace(/([।.!?])\s+/g, '$1\n')
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length >= 15 && !JUNK.some(re => re.test(s)));
};

// ── Step 3: Language filter ───────────────────────────────────
// Returns true if the sentence matches the desired language.
// Hindi articles from Hindi feeds are already Hindi, so this
// is a defensive guard against stray English boilerplate in Hindi bodies.
const matchesLang = (sentence, lang) => {
  const isHi = (lang || '').toLowerCase() === 'hi';
  if (isHi) {
    // For Hindi mode: allow sentences with ANY Devanagari OR both scripts
    // (Hindi articles legitimately contain English proper nouns)
    // Only reject sentences that are pure Latin with zero Devanagari
    return DEVANAGARI.test(sentence) || !LATIN.test(sentence);
  }
  // For English mode: reject sentences that are predominantly Devanagari
  const devCount = (sentence.match(/[\u0900-\u097F]/g) || []).length;
  const latCount = (sentence.match(/[a-zA-Z]/g) || []).length;
  return latCount >= devCount;
};

// ── Step 4: Score sentence by informativeness ─────────────────
const scoreSentence = (s) => {
  let score = 0;
  score += s.length * 0.5;              // longer = more information
  score += (s.match(/\d/g) || []).length * 3; // numbers / dates = specific facts
  if (s.length > 80)  score += 10;     // bonus for substantial sentences
  if (s.length < 30)  score -= 20;     // penalty for very short
  if (/[।.!?]$/.test(s)) score += 5;  // complete sentences preferred
  return score;
};

// ── Step 5: Word count ────────────────────────────────────────
const wordCount = (text) => text.split(/\s+/).filter(Boolean).length;

// ── Step 6: Build paragraphs from selected sentences ─────────
// Distributes sentences evenly across 2–3 paragraphs.
const buildParagraphs = (sentences) => {
  if (sentences.length === 0) return null;

  const total = sentences.length;
  // Para sizes: try to split roughly into thirds, min 1 sentence each
  const p1End = Math.ceil(total / 3);
  const p2End = Math.ceil((total * 2) / 3);

  const groups = [
    sentences.slice(0, p1End),
    sentences.slice(p1End, p2End),
    sentences.slice(p2End),
  ].filter(g => g.length > 0);

  return groups.map(g => g.join(' '));
};

// ── Main export ───────────────────────────────────────────────
/**
 * @param {object} article  - article object with body, summary, title, source
 * @param {string} lang     - 'HI'/'hi' or 'EN'/'en'
 * @returns {string[] | null} array of paragraph strings, or null if content too weak
 */
export const buildLocalSummary = (article, lang) => {
  if (!article) return null;

  const activeLang = (lang || 'hi').toLowerCase();

  // ── Step 1: Combine all content sources (body richest, then summary, then title)
  const bodyClean    = cleanText(article.body    || '', article.source);
  const summaryClean = cleanText(article.summary || '', article.source);
  const titleClean   = cleanText(article.title   || '', article.source);

  // ── Step 2: Split into sentences
  const bodySents    = splitSentences(bodyClean);
  const summarySents = splitSentences(summaryClean);
  const titleSents   = splitSentences(titleClean);

  // ── Step 3: Deduplicate (body > summary > title priority)
  const seen = new Set();
  const pool = [];
  for (const s of [...bodySents, ...summarySents, ...titleSents]) {
    const key = s.toLowerCase().replace(/\s+/g, '').substring(0, 50);
    if (!seen.has(key)) {
      seen.add(key);
      pool.push(s);
    }
  }

  if (pool.length === 0) return null;

  // ── Step 4: Filter by language
  const langFiltered = pool.filter(s => matchesLang(s, activeLang));
  // If language filter is too aggressive (removes everything), use full pool
  const candidates = langFiltered.length >= 2 ? langFiltered : pool;

  // ── Step 5: Score and select top 8 sentences
  const scored = candidates
    .map(s => ({ s, score: scoreSentence(s) }))
    .sort((a, b) => b.score - a.score)
    .map(x => x.s);

  // ── Step 6: Enforce 100–200 word range
  const selected = [];
  let total = 0;

  for (const sentence of scored) {
    const w = wordCount(sentence);
    if (total + w > 200) break;
    selected.push(sentence);
    total += w;
    if (total >= 100 && selected.length >= 6) break;
  }

  // If still under 100 words, add more sentences (relaxing the 200 cap slightly)
  if (total < 100) {
    for (const sentence of scored) {
      if (selected.includes(sentence)) continue;
      const w = wordCount(sentence);
      if (total + w > 220) break;
      selected.push(sentence);
      total += w;
      if (total >= 100) break;
    }
  }

  if (selected.length === 0 || total < 10) return null;

  // ── Step 7: Restore document order (so paragraphs read naturally)
  const originalOrder = pool.filter(s => selected.includes(s));

  // ── Step 8: Build 2–3 paragraphs
  return buildParagraphs(originalOrder);
};
