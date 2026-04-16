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
      /^#{1,6}\s*/,                                          // Markdown headers (##, ###, ####)
      /^markdown\s*content\s*:/i,
      /^(close\s+)?search(\s+for)?\s*:/i,
      /^posted\s+in\b/i,
      /^by\s+\S/i,
      /^share\s*(this)?\s*:?$/i,
      /^(click\s+to\s+share|opens?\s+in\s+new\s+window)/i,
      /^(facebook|twitter|whatsapp|telegram|instagram|linkedin|pinterest|reddit|tumblr|koo|email|print|copy\s*(url|link))\s*$/i,
      /facebook.*twitter|twitter.*whatsapp|whatsapp.*instagram/i, // concatenated social links
      /^(top\s+stories|also\s+read|related(\s+posts?)?|more\s+(news|stories)?|next\s+story|trending\s+news|ट्रेंडिंग\s+न्यूज़)\s*:?$/i,
      /^(home|menu|navigation|subscribe|newsletter)\s*$/i,
      /^(national|world|technology|health|education|sports|entertainment|business|politics|state)\s*$/i,
      /^add\s+.{3,60}\s+as\s+your\s+preferred\s+source/i,
      /^our\s+land\s+our\s+news/i,
      /style\s*=\s*["'][^"']*["']/i,
      /^https?:\/\/\S+$/i,                                   // bare URLs
      /\bndtv\.in\b/i,                                       // NDTV domain attribution
      /ताज़ातरीन\s+खबरों\s+को\s+ट्रैक/i,                   // NDTV tagline
      /पूरी\s+स्टोरी\s+पढ़ें/i,                            // "Read full story"
      /read\s+(full\s+)?(story|article|more)/i,              // "Read full story / Read more"
      /^\s*[*\-–•]\s*(click|share|open|follow)\b/i,
    ];

    const cleanText = (t) => {
      if (!t) return '';
      // 1. Strip HTML tags and attributes
      let text = t
        .replace(/<[^>]+>/g, ' ')
        .replace(/&[a-z#0-9]+;/gi, ' ');
      // 2. Strip markdown formatting (headers, bold, italic, bullets)
      text = text
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/^\s*[\*\-]\s+/gm, '');
      // 3. Remove lines matching junk patterns
      text = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && !JUNK_LINE.some(re => re.test(line)))
        .join('\n');
      // 4. Collapse excess whitespace
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
            content: 'Write a concise news summary in 3-4 sentences (80-120 words). Be factual and direct. Write in the same language as the input (Hindi or English). Do NOT use markdown, bullet points, headers, or any formatting symbols. Write plain prose only. Do NOT mention any source name, website, domain, author, or publication.',
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
