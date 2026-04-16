// Vercel serverless function — summarizes article via Groq API (free)
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { title, summary } = req.query;
  if (!title && !summary) return res.status(200).json({ summary: null });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(200).json({ summary: null });

  try {
    // Pattern-based line-level cleaner — removes junk lines, keeps real article text
    const JUNK_LINE = [
      /^markdown\s*content\s*:/i,                          // "Markdown Content:"
      /^(close\s+)?search(\s+for)?\s*:/i,                  // "Search for:", "Close Search for:"
      /^posted\s+in\b/i,                                   // "Posted in Assam"
      /^by\s+\S/i,                                         // "By Karthik", "byNE NOW NEWS"
      /^share\s*(this)?\s*:?$/i,                           // "Share this:", "Share:"
      /^(click\s+to\s+share|opens?\s+in\s+new\s+window)/i, // share button text
      /^(facebook|twitter|whatsapp|telegram|instagram|linkedin|pinterest|reddit|tumblr|koo|email|print|copy\s*(url|link))\s*$/i,
      /^(top\s+stories|also\s+read|related(\s+posts?)?|more\s+(news|stories)?|next\s+story)\s*:?$/i,
      /^(home|menu|navigation|subscribe|newsletter)\s*$/i,
      /^(national|world|technology|health|education|sports|entertainment|business|politics|state)\s*$/i,
      /^add\s+.{3,60}\s+as\s+your\s+preferred\s+source/i,  // "Add X as your preferred source"
      /^our\s+land\s+our\s+news/i,
      /style\s*=\s*["'][^"']*["']/i,                       // inline CSS remnants
      /^https?:\/\/\S+$/i,                                 // bare URLs
      /^\s*[*\-–•]\s*(click|share|open|follow)\b/i,        // bullet share items
    ];

    const cleanText = (t) => {
      if (!t) return '';
      // 1. Strip HTML tags and attributes
      let text = t
        .replace(/<[^>]+>/g, ' ')
        .replace(/&[a-z#0-9]+;/gi, ' ');
      // 2. Remove lines matching junk patterns
      text = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && !JUNK_LINE.some(re => re.test(line)))
        .join('\n');
      // 3. Collapse excess whitespace
      return text.replace(/[ \t]{2,}/g, ' ').trim();
    };

    const cleanedTitle = cleanText(title);
    const cleanedSummary = cleanText(summary);
    const input = [cleanedTitle, cleanedSummary].filter(s => s && s.length > 3).join('\n\n');

    if (!input || input.length < 20) return res.status(200).json({ summary: null });

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 250,
        messages: [
          {
            role: 'system',
            content: 'Write a concise news summary in 3-4 sentences (80-120 words). Be factual and direct. Write in the same language as the input (Hindi or English). Do NOT mention any source name, website, author, or publication. Do not use "according to" or "reported by".',
          },
          {
            role: 'user',
            content: input,
          },
        ],
      }),
    });

    if (!groqRes.ok) return res.status(200).json({ summary: null });

    const data = await groqRes.json();
    const raw = data?.choices?.[0]?.message?.content || null;
    const result = raw ? cleanText(raw) : null;

    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
    return res.status(200).json({ summary: result });
  } catch (err) {
    console.error('summarize-article error:', err);
    return res.status(200).json({ summary: null });
  }
}
