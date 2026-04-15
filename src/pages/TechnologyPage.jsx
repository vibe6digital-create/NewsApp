import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'bootstrap';
import { useNews } from '../context/NewsContext';
import { useLang } from '../context/LanguageContext';
import SubSection from '../components/national/SubSection';
import AdBanner from '../components/layout/AdBanner';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Sidebar from '../components/layout/Sidebar';
import { PORTAL_NAME } from '../utils/constants';
import { getCategoryFallbackImage, SAFE_FALLBACK } from '../utils/categoryImages';
import { timeAgo } from '../utils/formatDate';
import '../styles/hero.css';
import '../styles/national.css';

// ── Subsection definitions ──────────────────────────────────────
const TECH_SUBSECTIONS = [
  { key: 'ai',           label: 'AI और मशीन लर्निंग',        labelEn: 'AI & Machine Learning',      color: '#6366F1' },
  { key: 'smartphones',  label: 'स्मार्टफोन और गैजेट्स',     labelEn: 'Smartphones & Gadgets',      color: '#06B6D4' },
  { key: 'cybersecurity',label: 'साइबर सुरक्षा',              labelEn: 'Cybersecurity',               color: '#EF4444' },
  { key: 'internet',     label: 'इंटरनेट और सोशल मीडिया',    labelEn: 'Internet & Social Media',    color: '#10B981' },
  { key: 'space',        label: 'अंतरिक्ष और विज्ञान',        labelEn: 'Space & Science',             color: '#8B5CF6' },
  { key: 'startups',     label: 'स्टार्टअप और बिज़नेस',       labelEn: 'Startups & Business',        color: '#F59E0B' },
  { key: 'indiantech',   label: 'भारतीय तकनीक',               labelEn: 'Indian Tech & Digital',      color: '#CC0000' },
  { key: 'gaming',       label: 'गेमिंग और ई-स्पोर्ट्स',      labelEn: 'Gaming & Esports',           color: '#EC4899' },
  { key: 'ev',           label: 'इलेक्ट्रिक वाहन और ग्रीन टेक', labelEn: 'EV & Green Tech',         color: '#22C55E' },
  { key: 'crypto',       label: 'क्रिप्टो और ब्लॉकचेन',        labelEn: 'Crypto & Blockchain',        color: '#F97316' },
  { key: 'cloud',        label: 'क्लाउड और एंटरप्राइज टेक',    labelEn: 'Cloud & Enterprise Tech',    color: '#0EA5E9' },
  { key: 'telecom',      label: 'टेलीकॉम और नेटवर्क',          labelEn: 'Telecom & Networks',         color: '#A855F7' },
  { key: 'apps',         label: 'ऐप्स और सॉफ्टवेयर',           labelEn: 'Apps & Software',            color: '#14B8A6' },
];

// ── Per-subsection keywords ──────────────────────────────────────
const TECH_KEYWORDS = {
  ai: [
    'artificial intelligence', 'machine learning', 'deep learning', 'ChatGPT', 'OpenAI',
    'GPT-4', 'GPT-5', 'Gemini AI', 'Bard', 'Claude AI', 'LLM', 'generative AI',
    'AI model', 'AI chip', 'neural network', 'robotics', 'automation', 'AI assistant',
    'large language model', 'text to image', 'Midjourney', 'Stable Diffusion', 'Sora AI',
    'आर्टिफिशियल इंटेलिजेंस', 'मशीन लर्निंग', 'एआई', 'रोबोटिक्स',
  ],
  smartphones: [
    'smartphone', 'phone launch', 'mobile phone', 'iPhone', 'Samsung Galaxy',
    'OnePlus', 'Xiaomi', 'Redmi', 'Realme', 'Oppo', 'Vivo', 'Nothing Phone',
    'laptop', 'tablet', 'smartwatch', 'earbuds', 'TWS', 'gadget', 'wearable',
    'processor', 'Snapdragon', 'MediaTek', 'display', 'camera specs', 'foldable phone',
    'Google Pixel', 'Motorola', 'Nokia', 'Honor', 'Tecno',
    'स्मार्टफोन', 'मोबाइल फोन', 'लैपटॉप', 'गैजेट', 'स्मार्टवॉच',
  ],
  cybersecurity: [
    'cybersecurity', 'cyber attack', 'hacking', 'data breach', 'ransomware',
    'malware', 'phishing', 'cyber crime', 'data leak', 'password leak',
    'vulnerability', 'zero-day', 'cyber fraud', 'online scam', 'deepfake',
    'spyware', 'identity theft', 'account hack', 'cyber espionage', 'dark web',
    'साइबर सुरक्षा', 'साइबर अपराध', 'साइबर हमला', 'डेटा चोरी', 'हैकिंग',
  ],
  internet: [
    'social media', 'Meta', 'Facebook', 'Instagram', 'WhatsApp', 'Twitter', 'X platform',
    'YouTube', 'TikTok', 'Snapchat', 'LinkedIn', 'internet shutdown',
    'broadband', 'Wi-Fi', 'streaming', 'Netflix', 'OTT platform', 'Disney+',
    'Amazon Prime Video', 'internet speed', 'internet ban',
    'सोशल मीडिया', 'इंटरनेट', 'स्ट्रीमिंग', 'ओटीटी',
  ],
  space: [
    'ISRO', 'NASA', 'SpaceX', 'space mission', 'satellite launch', 'rocket launch',
    'moon mission', 'Chandrayaan', 'Gaganyaan', 'Mars mission', 'asteroid',
    'telescope', 'James Webb', 'space station', 'astronaut', 'Blue Origin',
    'Virgin Galactic', 'Artemis mission', 'solar storm', 'exoplanet',
    'इसरो', 'अंतरिक्ष', 'उपग्रह', 'रॉकेट', 'मिशन', 'गगनयान', 'चंद्रयान',
  ],
  startups: [
    'startup', 'unicorn', 'funding round', 'Series A', 'Series B', 'IPO tech',
    'venture capital', 'fintech', 'edtech', 'healthtech', 'SaaS', 'angel investor',
    'Flipkart', 'Zomato', 'Swiggy', 'Paytm', 'Razorpay', 'BYJU', 'Ola',
    'Meesho', 'PhonePe', 'CRED', 'Nykaa', 'startup ecosystem',
    'स्टार्टअप', 'यूनिकॉर्न', 'फंडिंग', 'फिनटेक', 'एंजेल इन्वेस्टर',
  ],
  indiantech: [
    'Digital India', 'Make in India tech', 'IT sector', 'Infosys', 'TCS', 'Wipro',
    'HCL Technologies', 'Tech Mahindra', 'NASSCOM', 'India tech', 'PLI scheme',
    'semiconductor India', 'IT exports', 'BPO', 'IT jobs India', 'IT layoffs India',
    'डिजिटल इंडिया', 'आईटी सेक्टर', 'मेड इन इंडिया', 'सेमीकंडक्टर',
  ],
  gaming: [
    'gaming', 'video game', 'esports', 'PlayStation', 'Xbox', 'Nintendo Switch',
    'PC gaming', 'mobile gaming', 'BGMI', 'Battlegrounds', 'Free Fire', 'PUBG',
    'Valorant', 'Call of Duty', 'game launch', 'game update', 'gaming tournament',
    'Steam', 'Epic Games', 'Nvidia GPU', 'AMD GPU', 'game streaming',
    'गेमिंग', 'वीडियो गेम', 'ई-स्पोर्ट्स', 'मोबाइल गेमिंग',
  ],
  ev: [
    'electric vehicle', 'EV', 'Tesla', 'electric car', 'EV charging', 'battery',
    'Tata EV', 'MG Electric', 'Ola Electric', 'Ather Energy', 'Revolt', 'electric bike',
    'EV policy', 'EV subsidy', 'green energy', 'renewable energy', 'solar power',
    'wind energy', 'clean energy', 'carbon neutral', 'net zero',
    'इलेक्ट्रिक वाहन', 'ईवी', 'सौर ऊर्जा', 'हरित ऊर्जा', 'इलेक्ट्रिक बाइक',
  ],
  crypto: [
    'cryptocurrency', 'Bitcoin', 'Ethereum', 'blockchain', 'crypto', 'NFT',
    'Web3', 'DeFi', 'crypto exchange', 'crypto ban', 'crypto regulation',
    'Binance', 'Coinbase', 'crypto price', 'altcoin', 'stablecoin',
    'क्रिप्टोकरेंसी', 'बिटकॉइन', 'ब्लॉकचेन', 'क्रिप्टो',
  ],
  cloud: [
    'cloud computing', 'Amazon Web Services', 'AWS', 'Microsoft Azure', 'Google Cloud',
    'cloud storage', 'data center', 'enterprise software', 'SaaS', 'PaaS',
    'IBM Cloud', 'Oracle Cloud', 'cloud migration', 'edge computing',
    'quantum computing', 'supercomputer', 'server', 'API',
    'क्लाउड कंप्यूटिंग', 'डेटा सेंटर', 'क्वांटम कंप्यूटिंग',
  ],
  telecom: [
    '5G', '5G launch', '5G rollout', 'Jio', 'Airtel', 'Vi', 'BSNL',
    'telecom', 'spectrum auction', 'mobile data', 'broadband plan',
    'fiber internet', 'satellite internet', 'Starlink India', '6G',
    'telecom policy', 'TRAI', 'network outage',
    '5जी', 'जियो', 'एयरटेल', 'टेलीकॉम', 'ब्रॉडबैंड', 'स्टारलिंक',
  ],
  apps: [
    'app launch', 'app update', 'Android', 'iOS', 'Google Play', 'App Store',
    'WhatsApp update', 'Instagram feature', 'app ban', 'new app',
    'Windows update', 'macOS', 'Linux', 'software update', 'antivirus',
    'Microsoft Office', 'Adobe', 'open source', 'GitHub',
    'ऐप', 'एंड्रॉयड', 'सॉफ्टवेयर', 'ऐप अपडेट', 'ऐप बैन',
  ],
};

// ── Strict top-level filter ──────────────────────────────────────
const TECH_STRICT_KEYWORDS = [
  // AI
  'artificial intelligence', 'machine learning', 'ChatGPT', 'OpenAI', 'GPT-4', 'GPT-5',
  'Gemini AI', 'generative AI', 'LLM', 'deep learning', 'neural network', 'AI model',
  // Smartphones
  'smartphone', 'iPhone', 'Samsung Galaxy', 'OnePlus', 'Xiaomi', 'Redmi', 'Realme',
  'Oppo', 'Vivo', 'Nothing Phone', 'Snapdragon', 'MediaTek', 'foldable phone',
  // Cybersecurity
  'cybersecurity', 'cyber attack', 'hacking', 'data breach', 'ransomware', 'malware',
  'phishing', 'cyber crime', 'cyber fraud', 'deepfake', 'spyware',
  // Internet & Social
  'WhatsApp update', 'Instagram update', 'YouTube update', 'Meta', 'internet shutdown',
  // Space
  'ISRO', 'SpaceX', 'satellite launch', 'rocket launch', 'Chandrayaan', 'Gaganyaan',
  // Startups
  'startup funding', 'unicorn', 'fintech', 'edtech',
  // Indian Tech
  'Digital India', 'IT sector India', 'Infosys', 'TCS', 'Wipro', 'HCL Technologies',
  'semiconductor India', 'NASSCOM',
  // Gaming
  'esports', 'BGMI', 'video game launch', 'gaming tournament', 'PC gaming',
  // EV & Green
  'electric vehicle', 'EV charging', 'Ola Electric', 'Ather Energy', 'Tesla India',
  'solar power India', 'renewable energy India',
  // Crypto
  'cryptocurrency', 'Bitcoin', 'Ethereum', 'blockchain', 'NFT', 'Web3', 'DeFi',
  'crypto exchange', 'crypto ban',
  // Cloud
  'cloud computing', 'Amazon Web Services', 'Microsoft Azure', 'Google Cloud',
  'quantum computing', 'data center',
  // Telecom
  '5G rollout', '5G launch', 'Jio 5G', 'Airtel 5G', 'spectrum auction',
  'Starlink India', 'TRAI',
  // Apps
  'app launch', 'app ban', 'Android update', 'iOS update', 'Windows update',
  // Hindi
  'आर्टिफिशियल इंटेलिजेंस', 'मशीन लर्निंग', 'एआई', 'स्मार्टफोन',
  'साइबर सुरक्षा', 'साइबर अपराध', 'साइबर हमला', 'डेटा चोरी',
  'सोशल मीडिया', '5जी', 'इसरो', 'स्टार्टअप', 'डिजिटल इंडिया',
  'इलेक्ट्रिक वाहन', 'फिनटेक', 'क्रिप्टोकरेंसी', 'ब्लॉकचेन',
  'गेमिंग', 'क्लाउड कंप्यूटिंग', 'टेलीकॉम', 'ब्रॉडबैंड',
];

function isTechArticle(article) {
  return article.category === 'technology';
}

function filterByTechSubsection(techArticles, key) {
  const keywords = TECH_KEYWORDS[key] || [];
  return techArticles
    .filter(a => keywords.some(kw =>
      (a.title + ' ' + (a.summary || '')).toLowerCase().includes(kw.toLowerCase())
    ))
    .slice(0, 12);
}

// ── Hero Slider ──────────────────────────────────────────────────
const TechHeroSlider = ({ slides, lang }) => {
  const navigate = useNavigate();
  const touchStartX = useRef(0);
  const swiping = useRef(false);
  const carouselRef = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; swiping.current = false; };
  const handleTouchMove = (e) => { if (Math.abs(e.touches[0].clientX - touchStartX.current) > 30) swiping.current = true; };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || Carousel.getInstance(el)) return;
    new Carousel(el);
  }, [slides.length]);

  if (!slides.length) return null;
  return (
    <div className="hero-slider" style={{ margin: 0, padding: 0 }}>
      <div ref={carouselRef} id="techCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="4500">
        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button key={i} type="button" data-bs-target="#techCarousel"
              data-bs-slide-to={i} className={i === 0 ? 'active' : ''}
              aria-current={i === 0 ? 'true' : undefined} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <div className="carousel-inner">
          {slides.map((article, i) => {
            const img = article.image || getCategoryFallbackImage('technology', article.id, article.title, article.summary);
            return (
              <div key={article.id} className={`carousel-item ${i === 0 ? 'active' : ''}`}
                onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}
                onClick={() => { if (!swiping.current) navigate(`/article/${article.id}`); }} style={{ cursor: 'pointer' }}>
                <img src={img} alt={article.title} className="d-block w-100"
                  onError={e => {
                    const fb = getCategoryFallbackImage('technology', article.id, article.title, article.summary);
                    e.target.src = e.target.src === fb ? SAFE_FALLBACK : fb;
                  }} />
                <div className="hero-overlay" />
                <div className="hero-content">
                  <span className="hero-category" style={{ backgroundColor: '#06B6D4' }}>
                    {lang === 'EN' ? 'Technology' : 'तकनीक'}
                  </span>
                  <h2 className="hero-title">{article.title}</h2>
                  <div className="hero-meta">
                    <span>{timeAgo(article.pubDate, lang.toLowerCase())}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#techCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#techCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

// ── Fallback header (when < 3 hero slides) ───────────────────────
const TechHeader = ({ lang }) => (
  <div style={{
    background: 'linear-gradient(135deg, #020617 0%, #0c1a3a 50%, #020617 100%)',
    borderBottom: '3px solid #06B6D4',
    padding: '32px 0 24px',
  }}>
    <div className="container">
      <div>
        <h1 style={{
          fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
          fontSize: '2rem', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2,
        }}>
          {lang === 'EN' ? 'Technology News' : 'तकनीक समाचार'}
        </h1>
        <p style={{ color: '#aaa', fontSize: 13, margin: '6px 0 0', lineHeight: 1.4 }}>
          {lang === 'EN'
            ? 'AI, smartphones, cybersecurity, space, EV, crypto, gaming, cloud, telecom & more'
            : 'AI, स्मार्टफोन, साइबर सुरक्षा, अंतरिक्ष, EV, क्रिप्टो, गेमिंग, क्लाउड, टेलीकॉम और अधिक'}
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          {(lang === 'EN'
            ? ['AI', 'Smartphones', 'Cybersecurity', 'Internet', 'Space', 'Startups', 'Digital India', 'Gaming', 'EV', 'Crypto', 'Cloud', 'Telecom', 'Apps']
            : ['AI', 'स्मार्टफोन', 'साइबर सुरक्षा', 'इंटरनेट', 'अंतरिक्ष', 'स्टार्टअप', 'डिजिटल इंडिया', 'गेमिंग', 'EV', 'क्रिप्टो', 'क्लाउड', 'टेलीकॉम', 'ऐप्स']
          ).map(tag => (
            <span key={tag} style={{
              background: '#06B6D422', border: '1px solid #06B6D444',
              color: '#67E8F9', borderRadius: 20, padding: '3px 10px', fontSize: 11,
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ── Main Page ────────────────────────────────────────────────────
const TechnologyPage = () => {
  const { allArticles, rawArticles, loading } = useNews();
  const { lang, t } = useLang();
  const [sortOrder, setSortOrder] = useState('latest');

  const techArticles = useMemo(() => {
    let result = allArticles.filter(isTechArticle);
    // Fallback: older tech articles (same language) from cache if current fetch has none
    if (result.length === 0) {
      const preferredLang = lang === 'EN' ? 'en' : 'hi';
      result = rawArticles.filter(a => isTechArticle(a) && a.lang === preferredLang);
    }
    if (sortOrder === 'oldest') {
      return [...result].sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate));
    }
    return result;
  }, [allArticles, rawArticles, sortOrder, lang]);

  // Hero slides — computed first so IDs can be excluded below
  const heroSlides = useMemo(() => {
    const withImg = techArticles.filter(a => a.image);
    if (withImg.length >= 3) return withImg.slice(0, 5);
    const withoutImg = techArticles.filter(a => !a.image);
    return [...withImg, ...withoutImg].slice(0, 5);
  }, [techArticles]);

  // Subsections — each article in at most one; hero articles excluded
  const subsectionMap = useMemo(() => {
    const map = {};
    const claimedIds = new Set(heroSlides.map(a => a.id));
    TECH_SUBSECTIONS.forEach(s => {
      const articles = filterByTechSubsection(techArticles, s.key)
        .filter(a => !claimedIds.has(a.id));
      articles.forEach(a => claimedIds.add(a.id));
      map[s.key] = articles;
    });
    return map;
  }, [techArticles, heroSlides]);

  // Latest — articles not in hero or any subsection
  const latestTech = useMemo(() => {
    const heroIds = new Set(heroSlides.map(a => a.id));
    const subsectionIds = new Set(Object.values(subsectionMap).flat().map(a => a.id));
    return techArticles
      .filter(a => !heroIds.has(a.id) && !subsectionIds.has(a.id))
      .slice(0, 12);
  }, [techArticles, heroSlides, subsectionMap]);

  const showHero = heroSlides.length >= 3;
  const activeSections = TECH_SUBSECTIONS.filter(s => subsectionMap[s.key]?.length > 0);

  return (
    <>
      <Helmet>
        <title>{lang === 'EN' ? 'Technology News' : 'तकनीक समाचार'} | {PORTAL_NAME}</title>
        <meta name="description" content="AI, स्मार्टफोन, साइबर सुरक्षा, ISRO, स्टार्टअप, गेमिंग, EV, क्रिप्टो, क्लाउड, टेलीकॉम और डिजिटल इंडिया की ताज़ा तकनीक खबरें।" />
        <link rel="canonical" href="/category/technology" />
      </Helmet>

      <div className="container-fluid px-0">

        {showHero
          ? <TechHeroSlider slides={heroSlides} lang={lang} />
          : <TechHeader lang={lang} />
        }

        <div className="container my-2">
          <AdBanner size="728x90" index={0} />
        </div>

        {loading ? (
          <div className="container py-4">
            <LoadingSpinner count={6} />
          </div>
        ) : (
          <div className="container py-3">

            {/* Sort row */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                {techArticles.length} {t('articlesFound')}
              </span>
              <select
                className="form-select form-select-sm"
                style={{ background: 'var(--input-bg)', color: 'var(--text-primary)', border: '1px solid var(--input-border)', width: 'auto' }}
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
              >
                <option value="latest">{t('sortLatest')}</option>
                <option value="oldest">{t('sortOldest')}</option>
              </select>
            </div>

            <div className="row g-4">
              {/* Main Content */}
              <div className="col-lg-8">

                {/* Latest unclaimed articles */}
                {latestTech.length > 0 && (
                  <>
                    <SubSection
                      subsection={{ key: 'latest', label: 'ताज़ा तकनीक खबरें', labelEn: 'Latest Tech News', color: '#06B6D4' }}
                      articles={latestTech}
                      lang={lang === 'EN' ? 'en' : 'hi'}
                      aosDelay={0}
                    />
                    {activeSections.length > 0 && <hr className="section-divider" />}
                  </>
                )}

                {/* Subsections */}
                {activeSections.map((s, idx) => (
                  <React.Fragment key={s.key}>
                    <SubSection
                      subsection={s}
                      articles={subsectionMap[s.key]}
                      lang={lang === 'EN' ? 'en' : 'hi'}
                      aosDelay={idx * 80}
                    />
                    {idx < activeSections.length - 1 && <hr className="section-divider" />}
                    {(idx + 1) % 2 === 0 && (
                      <div className="my-3">
                        <AdBanner size="728x90" index={idx + 1} />
                      </div>
                    )}
                  </React.Fragment>
                ))}

                {/* Empty state */}
                {techArticles.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                    <p style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 15 }}>
                      {lang === 'EN' ? 'No technology news available right now.' : 'अभी कोई तकनीक खबर उपलब्ध नहीं है।'}
                    </p>
                  </div>
                )}

              </div>

              {/* Sidebar */}
              <div className="col-lg-4 d-none d-lg-block">
                <Sidebar articles={techArticles} />
              </div>
            </div>
          </div>
        )}

        <div className="container my-2">
          <AdBanner size="970x90" index={5} />
        </div>
      </div>
    </>
  );
};

export default TechnologyPage;
