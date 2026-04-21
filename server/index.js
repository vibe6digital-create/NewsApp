const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'kpn_jwt_secret_change_in_prod';
const JWT_EXPIRY = '30d';

app.use(cors({ origin: true }));
app.use(express.json());

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// In-memory RSS feed cache — survives between requests while server is warm
const feedCache = new Map();
const FEED_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// RSS feed proxy — fetches any RSS/Atom feed server-side (no CORS limits)
app.get('/api/rss', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send('Missing url param');

  // Serve from cache if still fresh
  const cached = feedCache.get(url);
  if (cached && Date.now() - cached.ts < FEED_CACHE_TTL) {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'max-age=300');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.send(cached.xml);
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return res.status(502).send('Feed fetch failed');
    const xml = await response.text();
    feedCache.set(url, { xml, ts: Date.now() });
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'max-age=300');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(xml);
  } catch (err) {
    res.status(502).send('Feed fetch failed');
  }
});

// Article content proxy — fetches full article HTML server-side (no CORS limits)
app.get('/api/fetch-article', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send('');
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'hi-IN,hi;q=0.9,en-IN;q=0.8,en;q=0.7',
      },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return res.status(502).send('');
    const html = await response.text();
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'max-age=300');
    res.send(html);
  } catch {
    res.status(502).send('');
  }
});

// ── Article summarizer — calls Groq API ──
const SUMMARIZE_JUNK = [
  /^#{1,6}\s*/,
  /^markdown\s*content\s*:/i,
  /^(close\s+)?search(\s+for)?\s*:/i,
  /^posted\s+in\b/i,
  /^by\s+\S/i,
  /^share\s*(this)?\s*:?$/i,
  /^(click\s+to\s+share|opens?\s+in\s+new\s+window)/i,
  /^(facebook|twitter|whatsapp|telegram|instagram|linkedin|pinterest|reddit|tumblr|koo|email|print|copy\s*(url|link))\s*$/i,
  /facebook.*twitter|twitter.*whatsapp|whatsapp.*instagram|youtube.*instagram|instagram.*threads/i,
  /^(top\s+stories|also\s+read|related(\s+posts?)?|more\s+(news|stories)?|next\s+story|trending\s+news|ट्रेंडिंग\s+न्यूज़)\s*:?$/i,
  /^(home|menu|navigation|subscribe|newsletter)\s*$/i,
  /^(national|world|technology|health|education|sports|entertainment|business|politics|state)\s*$/i,
  /^https?:\/\/\S+$/i,
  /\bndtv\.in\b/i,
  /ndtv\s+group\s+sites/i,
  /dnpa\s+code\s+of\s+ethics/i,
  /©|copyright\s.*all\s+rights\s+reserved/i,
  /all\s+rights\s+reserved/i,
  /get\s+app\s+(for\s+)?better\s+experience/i,
  /jiosaavn/i,
  /अन्य\s+समाचार.*वीडियो.*फोटो/i,
  /ताज़ातरीन\s+खबरों\s+को\s+ट्रैक/i,
  /ताज़ातरीन\s+खबरें/i,
  /पूरी\s+स्टोरी\s+पढ़ें/i,
  /read\s+(full\s+)?(story|article|more)/i,
  /^\s*[*\-–•]\s*(click|share|open|follow)\b/i,
  /listen\s+to\s+the\s+latest\s+songs/i,
  /only\s+on\s+(jiosaavn|spotify|gaana|wynk)/i,
];

const cleanForSummary = (t) => {
  if (!t) return '';
  let text = t
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ');
  text = text
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^\s*[\*\-]\s+/gm, '');
  text = text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && !SUMMARIZE_JUNK.some(re => re.test(line)))
    .join('\n');
  return text.replace(/[ \t]{2,}/g, ' ').trim();
};

app.get('/api/summarize-article', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { title, summary, body } = req.query;
  if (!title && !summary && !body) return res.json({ summary: null });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.json({ summary: null });

  try {
    const cleanedTitle   = cleanForSummary(title);
    const cleanedSummary = cleanForSummary(summary);
    const cleanedBody    = cleanForSummary(body);
    const bodyContext    = cleanedBody.length > 10 ? cleanedBody.substring(0, 1200) : '';
    const input = [cleanedTitle, cleanedSummary, bodyContext].filter(s => s && s.length > 3).join('\n\n');

    if (!input || input.length < 20) return res.json({ summary: null });

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 800,
        messages: [
          {
            role: 'system',
            content: 'Write a structured news summary in exactly 3 paragraphs (150-200 words total). Paragraph 1 (2-3 sentences): describe the main event — what happened and why it matters. Paragraph 2 (2-3 sentences): cover key details — who is involved, where, when, and how. Paragraph 3 (2-3 sentences): provide additional context, background, or impact. Separate paragraphs with a blank line. Each paragraph must have at least 2 complete sentences. Be factual, informative, and easy to read. Write in the same language as the input — if the input is in Hindi, respond entirely in Hindi; if in English, respond entirely in English. Do NOT use markdown, bullet points, headers, bold, italic, or any formatting symbols. Write plain prose only. Do NOT mention any source name, news agency, website, domain, author, publication, or media outlet.',
          },
          { role: 'user', content: input },
        ],
      }),
      signal: AbortSignal.timeout(25000),
    });

    if (!groqRes.ok) return res.json({ summary: null });

    const data = await groqRes.json();
    const raw = data?.choices?.[0]?.message?.content || null;
    const result = raw ? cleanForSummary(raw) : null;

    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.json({ summary: result });
  } catch (err) {
    console.error('summarize-article error:', err.message);
    return res.json({ summary: null });
  }
});

// ── Helpers ──
const signToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

const sanitiseUser = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  mobile: row.mobile,
  isSubscribed: !!row.is_subscribed,
});

// ── Auth middleware ──
const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ error: 'Token required' });
  try {
    req.user = jwt.verify(header.split(' ')[1], JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// ── POST /api/auth/check ── (check if user exists by email or mobile)
app.post('/api/auth/check', (req, res) => {
  const { email, mobile } = req.body;
  const cleanMobile = mobile ? mobile.replace(/\D/g, '').slice(-10) : '';
  let user = null;
  if (email) user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user && cleanMobile) user = db.prepare('SELECT * FROM users WHERE mobile = ?').get(cleanMobile);
  if (user) {
    const token = signToken(user);
    return res.json({ exists: true, token, user: sanitiseUser(user) });
  }
  res.json({ exists: false });
});

// ── POST /api/auth/subscribe ── (no password needed)
app.post('/api/auth/subscribe', (req, res) => {
  const { name, email, mobile } = req.body;
  if (!name || (!email && !mobile))
    return res.status(400).json({ error: 'Name and email or mobile required' });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: 'Invalid email' });
  if (mobile && !/^\d{10}$/.test(mobile.replace(/\D/g, '').slice(-10)))
    return res.status(400).json({ error: 'Invalid mobile number' });

  const cleanMobile = mobile ? mobile.replace(/\D/g, '').slice(-10) : '';

  // Check if already exists by email
  if (email) {
    const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (existing) {
      // Already subscribed — just log them in
      const token = signToken(existing);
      return res.json({ token, user: sanitiseUser(existing) });
    }
  }

  // Check if already exists by mobile
  if (cleanMobile) {
    const existing = db.prepare('SELECT * FROM users WHERE mobile = ?').get(cleanMobile);
    if (existing) {
      const token = signToken(existing);
      return res.json({ token, user: sanitiseUser(existing) });
    }
  }

  const info = db.prepare(
    'INSERT INTO users (name, email, mobile, password_hash) VALUES (?, ?, ?, ?)'
  ).run(name, email || null, cleanMobile || null, '');

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid);
  const token = signToken(user);
  res.status(201).json({ token, user: sanitiseUser(user) });
});

// ── GET /api/auth/me ──
app.get('/api/auth/me', auth, (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user: sanitiseUser(user) });
});

// ── POST /api/auth/unsubscribe ── (marks user as unsubscribed, keeps record)
// Accepts either JWT token (via auth header) or email/mobile in body
app.post('/api/auth/unsubscribe', (req, res) => {
  // Try JWT first
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    try {
      const decoded = jwt.verify(header.split(' ')[1], JWT_SECRET);
      db.prepare('UPDATE users SET is_subscribed = 0 WHERE id = ?').run(decoded.id);
      return res.json({ success: true });
    } catch {}
  }
  // Fallback: match by email or mobile from body
  const { email, mobile } = req.body;
  const cleanMobile = mobile ? mobile.replace(/\D/g, '').slice(-10) : '';
  let updated = false;
  if (email) {
    const r = db.prepare('UPDATE users SET is_subscribed = 0 WHERE email = ?').run(email);
    if (r.changes > 0) updated = true;
  }
  if (!updated && cleanMobile) {
    db.prepare('UPDATE users SET is_subscribed = 0 WHERE mobile = ?').run(cleanMobile);
  }
  res.json({ success: true });
});

// ── DELETE /api/admin/subscribers/:id ──
app.delete('/api/admin/subscribers/:id', (req, res) => {
  const result = db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Subscriber not found' });
  res.json({ success: true });
});

// ── GET /api/admin/subscribers ──
app.get('/api/admin/subscribers', (req, res) => {
  const users = db.prepare(
    'SELECT id, name, email, mobile, is_subscribed, created_at FROM users ORDER BY created_at DESC'
  ).all();
  const subscribers = users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    mobile: u.mobile,
    isSubscribed: !!u.is_subscribed,
    subscribedAt: u.created_at,
  }));
  res.json({
    subscribers: subscribers.filter(s => s.isSubscribed),
    unsubscribed: subscribers.filter(s => !s.isSubscribed),
  });
});

// Serve React build in production (must be after all API routes)
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../build');
  app.use(express.static(buildPath));
  app.get('*', (_, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
