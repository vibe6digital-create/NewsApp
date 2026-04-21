// Vercel serverless function — summarizes article via Groq API (free)
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { title, summary, body } = req.query;
  if (!title && !summary && !body) return res.status(200).json({ summary: null });

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
      /facebook.*twitter|twitter.*whatsapp|whatsapp.*instagram|youtube.*instagram|instagram.*threads/i, // concatenated social links
      /^(top\s+stories|also\s+read|related(\s+posts?)?|more\s+(news|stories)?|next\s+story|trending\s+news|ट्रेंडिंग\s+न्यूज़)\s*:?$/i,
      /^(home|menu|navigation|subscribe|newsletter)\s*$/i,
      /^(national|world|technology|health|education|sports|entertainment|business|politics|state)\s*$/i,
      /^add\s+.{3,60}\s+as\s+your\s+preferred\s+source/i,
      /^our\s+land\s+our\s+news/i,
      /style\s*=\s*["'][^"']*["']/i,
      /^https?:\/\/\S+$/i,                                   // bare URLs
      /\bndtv\.in\b/i,                                       // NDTV domain attribution
      /ndtv\s+group\s+sites/i,                               // NDTV footer heading
      /dnpa\s+code\s+of\s+ethics/i,                          // NDTV/DNPA ethics notice
      /©|copyright\s.*all\s+rights\s+reserved/i,             // copyright lines
      /all\s+rights\s+reserved/i,
      /get\s+app\s+(for\s+)?better\s+experience/i,           // app download prompt
      /jiosaavn/i,                                            // JioSaavn promo
      /अन्य\s+समाचार.*वीडियो.*फोटो/i,                       // NDTV "search" prompt
      /ताज़ातरीन\s+खबरों\s+को\s+ट्रैक/i,                   // NDTV tagline
      /ताज़ातरीन\s+खबरें/i,                                  // NDTV "latest news"
      /पूरी\s+स्टोरी\s+पढ़ें/i,                            // "Read full story"
      /read\s+(full\s+)?(story|article|more)/i,              // "Read full story / Read more"
      /^\s*[*\-–•]\s*(click|share|open|follow)\b/i,
      /listen\s+to\s+the\s+latest\s+songs/i,                 // music streaming promo
      /only\s+on\s+(jiosaavn|spotify|gaana|wynk)/i,
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
    const cleanedBody = cleanText(body);
    // Include body content (up to 1200 chars after cleaning) as additional context for the AI
    const bodyContext = cleanedBody.length > 10 ? cleanedBody.substring(0, 1200) : '';
    const input = [cleanedTitle, cleanedSummary, bodyContext].filter(s => s && s.length > 3).join('\n\n');

    if (!input || input.length < 20) return res.status(200).json({ summary: null });

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
