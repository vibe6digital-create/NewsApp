import { useState, useEffect, useCallback, memo } from 'react';
import { useLang } from '../../context/LanguageContext';

// ── YouTube Channel Config ────────────────────────────────────
const YT_CHANNEL = {
  handle: '@kaushalprimenation',
  url: 'https://www.youtube.com/@kaushalprimenation',
  name: 'Kaushal Prime Nation',
};

// CORS proxies (same as rssService) — for fetching YouTube RSS
const CORS_PROXIES = [
  { url: 'https://api.allorigins.win/get?url=', key: 'contents' },
  { url: 'https://api.codetabs.com/v1/proxy?quest=', key: null },
  { url: 'https://corsproxy.io/?', key: null },
];

// Try to resolve the channel ID from the YouTube page, then fetch RSS
const fetchYouTubeVideos = async () => {
  // Step 1: Resolve channel page to get the channel ID
  const pageUrl = `${YT_CHANNEL.url}/videos`;
  let channelId = null;

  for (const proxy of CORS_PROXIES) {
    try {
      const res = await fetch(`${proxy.url}${encodeURIComponent(pageUrl)}`, {
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const raw = proxy.key ? (await res.json())[proxy.key] : await res.text();
      if (!raw) continue;
      // Extract channel ID from page HTML
      const m = raw.match(/(?:channel_id|channelId|externalChannelId)['":\s=]+['"]?(UC[\w-]{22})/);
      if (m) { channelId = m[1]; break; }
      // Also try browse_id pattern
      const m2 = raw.match(/"browseId"\s*:\s*"(UC[\w-]{22})"/);
      if (m2) { channelId = m2[1]; break; }
    } catch (_) {}
  }

  if (!channelId) return [];

  // Step 2: Fetch YouTube RSS feed using channel ID
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  for (const proxy of CORS_PROXIES) {
    try {
      const res = await fetch(`${proxy.url}${encodeURIComponent(rssUrl)}`, {
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const xml = proxy.key ? (await res.json())[proxy.key] : await res.text();
      if (!xml || xml.length < 100) continue;

      const doc = new DOMParser().parseFromString(xml, 'text/xml');
      const entries = doc.querySelectorAll('entry');
      return Array.from(entries).slice(0, 8).map(entry => {
        const videoId = entry.querySelector('id')?.textContent?.replace('yt:video:', '') || '';
        const title = entry.querySelector('title')?.textContent?.trim() || '';
        const published = entry.querySelector('published')?.textContent || '';
        return { videoId, title, published };
      }).filter(v => v.videoId);
    } catch (_) {}
  }
  return [];
};

// ── Component ─────────────────────────────────────────────────
const VideoNewsSection = () => {
  const { lang } = useLang();
  const [videos, setVideos] = useState([]);
  const [playing, setPlaying] = useState(null); // videoId of currently playing
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchYouTubeVideos().then(vids => {
      if (!cancelled && vids.length > 0) setVideos(vids);
      setLoaded(true);
    }).catch(() => setLoaded(true));
    return () => { cancelled = true; };
  }, []);

  const handlePlay = useCallback((videoId) => {
    setPlaying(prev => prev === videoId ? null : videoId);
  }, []);

  if (loaded && videos.length === 0) return null;
  if (!loaded) return null; // don't show skeleton — section appears when ready

  const featured = videos[0];
  const grid = videos.slice(1, 7);

  return (
    <section className="video-news-section py-4" data-aos="fade-up">
      {/* Section Header */}
      <div className="d-flex justify-content-between align-items-center mb-4" data-aos="fade-right">
        <div style={{ borderLeft: '4px solid #CC0000', paddingLeft: 15 }}>
          <h2 style={{
            fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
            fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.2,
          }}>
            <i className="fa-solid fa-play-circle me-2" style={{ color: '#CC0000' }} />
            {lang === 'EN' ? 'KPN Exclusives' : 'KPN एक्सक्लूसिव'}
            <span style={{ display: 'inline-block', width: 40, height: 3, backgroundColor: 'var(--accent)', marginLeft: 10, verticalAlign: 'middle' }} />
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0' }}>
            {lang === 'EN' ? 'Video news from our YouTube channel' : 'हमारे YouTube चैनल से वीडियो समाचार'}
          </p>
        </div>
        <a
          href={YT_CHANNEL.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm"
          style={{
            background: '#CC0000', color: '#fff', borderRadius: 20,
            padding: '6px 16px', fontSize: 13, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          <i className="fa-brands fa-youtube" />
          Subscribe
        </a>
      </div>

      {/* Featured Video (large) */}
      {featured && (
        <div className="mb-3" data-aos="fade-up" data-aos-delay="100">
          <VideoCard
            video={featured}
            playing={playing === featured.videoId}
            onPlay={handlePlay}
            height={360}
            titleSize="1.15rem"
            lang={lang}
            featured
          />
        </div>
      )}

      {/* Grid of smaller videos */}
      {grid.length > 0 && (
        <div className="row g-3">
          {grid.map((video, i) => (
            <div className="col-md-6 col-lg-4" key={video.videoId} data-aos="fade-up" data-aos-delay={150 + i * 50}>
              <VideoCard
                video={video}
                playing={playing === video.videoId}
                onPlay={handlePlay}
                height={195}
                titleSize="0.85rem"
                lang={lang}
              />
            </div>
          ))}
        </div>
      )}

      {/* View All on YouTube */}
      <div className="text-center mt-3">
        <a
          href={YT_CHANNEL.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#CC0000', fontSize: 14, fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          {lang === 'EN' ? 'View all videos on YouTube →' : 'YouTube पर सभी वीडियो देखें →'}
        </a>
      </div>
    </section>
  );
};

// ── Video Card ────────────────────────────────────────────────
const VideoCard = memo(({ video, playing, onPlay, height, titleSize, lang, featured }) => {
  const thumb = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
  const timeAgo = getTimeAgo(video.published, lang);

  if (playing) {
    return (
      <div className="video-card">
        <div style={{ position: 'relative', paddingBottom: featured ? '56.25%' : '56.25%', height: 0 }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              borderRadius: 10, border: 'none',
            }}
          />
        </div>
        <div style={{ padding: '10px 4px 4px' }}>
          <h4 style={{
            fontFamily: "'Noto Sans Devanagari', 'Noto Sans', sans-serif",
            fontSize: titleSize, fontWeight: 700, color: 'var(--text-primary)',
            margin: 0, lineHeight: 1.4,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {video.title}
          </h4>
        </div>
      </div>
    );
  }

  return (
    <div
      className="video-card"
      onClick={() => onPlay(video.videoId)}
      style={{ cursor: 'pointer' }}
    >
      {/* Thumbnail */}
      <div style={{
        position: 'relative', borderRadius: 10, overflow: 'hidden',
        height, background: '#111',
      }}>
        <img
          src={thumb}
          alt={video.title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)',
        }} />
        {/* Play button */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: featured ? 64 : 48, height: featured ? 64 : 48,
          borderRadius: '50%', background: 'rgba(204, 0, 0, 0.9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s, background 0.2s',
        }}>
          <i className="fa-solid fa-play" style={{ color: '#fff', fontSize: featured ? 22 : 16, marginLeft: 3 }} />
        </div>
        {/* Duration-style badge */}
        <span style={{
          position: 'absolute', top: 8, left: 8,
          background: '#CC0000', color: '#fff', fontSize: 9, fontWeight: 700,
          padding: '2px 8px', borderRadius: 3, textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <i className="fa-solid fa-video" style={{ fontSize: 8 }} /> VIDEO
        </span>
        {/* Title on image for featured */}
        {featured && (
          <div style={{ position: 'absolute', bottom: 12, left: 14, right: 14 }}>
            <h3 style={{
              fontFamily: "'Noto Sans Devanagari', 'Noto Sans', sans-serif",
              fontSize: '1.2rem', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.4,
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              textShadow: '0 2px 8px rgba(0,0,0,0.7)',
            }}>
              {video.title}
            </h3>
            {timeAgo && <span style={{ color: '#ccc', fontSize: 11 }}>{timeAgo}</span>}
          </div>
        )}
      </div>
      {/* Title below image for non-featured */}
      {!featured && (
        <div style={{ padding: '8px 4px 4px' }}>
          <h4 style={{
            fontFamily: "'Noto Sans Devanagari', 'Noto Sans', sans-serif",
            fontSize: titleSize, fontWeight: 700, color: 'var(--text-primary)',
            margin: 0, lineHeight: 1.4,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {video.title}
          </h4>
          {timeAgo && <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>{timeAgo}</span>}
        </div>
      )}
    </div>
  );
});

// ── Time ago helper ───────────────────────────────────────────
function getTimeAgo(dateStr, lang) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (lang === 'EN') {
    if (mins < 60) return `${mins}m ago`;
    if (hrs < 24) return `${hrs}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  }
  if (mins < 60) return `${mins} मिनट पहले`;
  if (hrs < 24) return `${hrs} घंटे पहले`;
  if (days < 7) return `${days} दिन पहले`;
  return new Date(dateStr).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short' });
}

export default VideoNewsSection;
