// Vercel serverless RSS proxy — never sleeps, replaces Render backend for RSS fetching
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { url } = req.query;
  if (!url) return res.status(400).send('Missing url param');

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 9000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
        'Accept-Language': 'hi-IN,hi;q=0.9,en-IN;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate',
        'Cache-Control': 'no-cache',
        'Referer': new URL(url).origin + '/',
      },
      redirect: 'follow',
    });

    clearTimeout(timer);
    if (!response.ok) return res.status(response.status).end();

    const xml = await response.text();
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.status(200).send(xml);
  } catch {
    res.status(502).end();
  }
}
