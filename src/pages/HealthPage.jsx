import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'bootstrap';
import { useNews } from '../context/NewsContext';
import { useLang } from '../context/LanguageContext';
import { isValidArticle } from '../utils/isValidArticle';
import SubSection from '../components/national/SubSection';
import AdBanner from '../components/layout/AdBanner';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Sidebar from '../components/layout/Sidebar';
import { PORTAL_NAME } from '../utils/constants';
import { getCategoryFallbackImage, SAFE_FALLBACK } from '../utils/categoryImages';
import { timeAgo } from '../utils/formatDate';
import '../styles/hero.css';
import '../styles/national.css';

// ── Subsection definitions ────────────────────────────────────
const HEALTH_SUBSECTIONS = [
  { key: 'diseases',    label: 'बीमारी और उपचार',             labelEn: 'Diseases & Treatment',        emoji: '🔬', color: '#EF4444' },
  { key: 'govtschemes', label: 'सरकारी स्वास्थ्य योजनाएं',    labelEn: 'Government Health Schemes',   emoji: '🏛️', color: '#2563EB' },
  { key: 'mental',      label: 'मानसिक स्वास्थ्य',             labelEn: 'Mental Health & Wellness',    emoji: '🧠', color: '#7C3AED' },
  { key: 'yoga',        label: 'योग, फिटनेस और आयुर्वेद',     labelEn: 'Yoga, Fitness & Ayurveda',    emoji: '🧘', color: '#059669' },
  { key: 'hospitals',   label: 'अस्पताल और चिकित्सा अनुसंधान', labelEn: 'Hospitals & Medical Research', emoji: '🏥', color: '#D97706' },
  { key: 'globalhealth',label: 'वैश्विक स्वास्थ्य (WHO)',      labelEn: 'Global Health & WHO',         emoji: '🌐', color: '#0891B2' },
];

// ── Subsection keywords — run only on already-filtered health articles ──
// These can be broader since the pool is already health-only
const HEALTH_KEYWORDS = {
  diseases: [
    'cancer', 'tumour', 'tumor', 'oncology', 'chemotherapy',
    'dengue', 'malaria', 'tuberculosis', 'TB cases', 'TB patient',
    'diabetes', 'diabetic', 'insulin', 'blood sugar',
    'heart disease', 'heart attack', 'cardiac', 'cardiovascular', 'heart failure',
    'brain stroke', 'blood pressure', 'hypertension', 'kidney disease', 'liver disease',
    'COVID', 'coronavirus', 'H1N1', 'bird flu', 'swine flu', 'monkeypox',
    'cholera', 'typhoid', 'hepatitis', 'HIV', 'AIDS',
    'drug resistant', 'antibiotic resistance', 'clinical trial',
    'vaccination drive', 'vaccination campaign', 'immunization',
    'mRNA vaccine', 'HPV vaccine',
    'कैंसर', 'डेंगू', 'मलेरिया', 'टीबी', 'मधुमेह', 'डायबिटीज',
    'हृदय रोग', 'दिल का दौरा', 'रक्तचाप', 'कोरोना', 'कोविड',
    'संक्रमण', 'टीकाकरण', 'वैक्सीन',
  ],
  govtschemes: [
    'Ayushman Bharat', 'PM-JAY', 'Jan Arogya', 'Jan Aushadhi',
    'National Health Mission', 'NHM', 'ASHA worker', 'health ministry',
    'health scheme', 'free treatment', 'free medicine', 'health insurance scheme',
    'health budget', 'health policy', 'Pradhan Mantri Swasthya',
    'आयुष्मान भारत', 'स्वास्थ्य मंत्रालय', 'जन औषधि', 'राष्ट्रीय स्वास्थ्य मिशन',
    'आशा कार्यकर्ता', 'मुफ्त इलाज', 'स्वास्थ्य योजना', 'स्वास्थ्य बीमा',
  ],
  mental: [
    'mental health', 'mental illness', 'depression', 'anxiety disorder',
    'anxiety attack', 'NIMHANS', 'psychiatry', 'PTSD', 'schizophrenia',
    'bipolar disorder', 'insomnia', 'suicide prevention', 'burnout',
    'digital detox', 'smartphone overuse',
    'मानसिक स्वास्थ्य', 'डिप्रेशन', 'एंग्जाइटी', 'अनिद्रा', 'मानसिक बीमारी',
  ],
  yoga: [
    'yoga day', 'International Yoga', 'Ayurveda', 'AYUSH',
    'naturopathy', 'homeopathy', 'pranayama', 'wellness',
    'योग दिवस', 'आयुर्वेद', 'आयुष', 'प्राणायाम',
  ],
  hospitals: [
    'AIIMS', 'ICMR', 'eSanjeevani', 'telemedicine',
    'medical research', 'organ transplant', 'heart transplant', 'robotic surgery',
    'primary health centre', 'drug discovery', 'pharmaceutical research',
    'एम्स', 'टेलीमेडिसिन', 'चिकित्सा अनुसंधान',
  ],
  globalhealth: [
    'World Health Organization', 'WHO report', 'WHO warns', 'WHO launches',
    'global health', 'mRNA vaccine', 'HPV vaccine', 'HIV vaccine',
    'antibiotic resistance', 'antimicrobial', 'health emergency',
    'विश्व स्वास्थ्य संगठन', 'एंटीबायोटिक प्रतिरोध', 'वैश्विक स्वास्थ्य', 'महामारी',
  ],
};


function isHealthArticle(article) {
  return article.category === 'health';
}

function filterByHealthSubsection(healthArticles, key) {
  const keywords = HEALTH_KEYWORDS[key] || [];
  return healthArticles
    .filter(a => keywords.some(kw =>
      (a.title + ' ' + a.summary).toLowerCase().includes(kw.toLowerCase())
    ))
    .slice(0, 12);
}

// ── Hero Slider ───────────────────────────────────────────────
const HealthHeroSlider = ({ slides, lang }) => {
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
      <div ref={carouselRef} id="healthCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="4500">
        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button key={i} type="button" data-bs-target="#healthCarousel"
              data-bs-slide-to={i} className={i === 0 ? 'active' : ''}
              aria-current={i === 0 ? 'true' : undefined} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <div className="carousel-inner">
          {slides.map((article, i) => {
            const img = article.image || getCategoryFallbackImage('health', article.id, article.title, article.summary);
            return (
              <div key={article.id} className={`carousel-item ${i === 0 ? 'active' : ''}`}
                onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}
                onClick={() => { if (!swiping.current) navigate(`/article/${article.id}`); }} style={{ cursor: 'pointer' }}>
                <img src={img} alt={article.title} className="d-block w-100"
                  onError={e => {
                    const fb = getCategoryFallbackImage('health', article.id, article.title, article.summary);
                    e.target.src = e.target.src === fb ? SAFE_FALLBACK : fb;
                  }} />
                <div className="hero-overlay" />
                <div className="hero-content">
                  <span className="hero-category" style={{ backgroundColor: '#EF4444' }}>
                    {lang === 'EN' ? 'Health' : 'स्वास्थ्य'}
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
        <button className="carousel-control-prev" type="button" data-bs-target="#healthCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#healthCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

// ── Category Header (shown when no hero images) ───────────────
const HealthHeader = ({ lang, count }) => (
  <div style={{
    background: 'linear-gradient(135deg, #1a0505 0%, #2d0808 50%, #1a0505 100%)',
    borderBottom: '3px solid #EF4444',
    padding: '32px 0 24px',
  }}>
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div>
          <h1 style={{
            fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
            fontSize: '2rem', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2,
          }}>
            {lang === 'EN' ? 'Health News' : 'स्वास्थ्य समाचार'}
          </h1>
          <p style={{ color: '#aaa', fontSize: 13, margin: '6px 0 0', lineHeight: 1.4 }}>
            {lang === 'EN'
              ? 'Diseases, treatment, Ayushman Bharat, AIIMS, mental health, yoga & WHO updates'
              : 'बीमारी, उपचार, आयुष्मान भारत, AIIMS, मानसिक स्वास्थ्य, योग और WHO की ताज़ा खबरें'}
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            {(lang === 'EN'
              ? ['Disease', 'Govt Scheme', 'Mental Health', 'Yoga', 'AIIMS', 'WHO']
              : ['बीमारी', 'सरकारी योजना', 'मानसिक स्वास्थ्य', 'योग', 'AIIMS', 'WHO']
            ).map(tag => (
              <span key={tag} style={{
                background: '#EF444422', border: '1px solid #EF444444',
                color: '#fca5a5', borderRadius: 20, padding: '3px 10px', fontSize: 11,
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ── Main Page ─────────────────────────────────────────────────
const HealthPage = () => {
  const { allArticles, rawArticles, loading, feedsComplete } = useNews();
  const { lang, t } = useLang();
  const [sortOrder, setSortOrder] = useState('latest');

  const healthArticles = useMemo(() => {
    let result = allArticles.filter(isHealthArticle);
    // Fallback: older health articles (same language) from cache if current fetch has none
    if (result.length === 0) {
      const preferredLang = lang === 'EN' ? 'en' : 'hi';
      result = rawArticles.filter(a => isHealthArticle(a) && a.lang === preferredLang && isValidArticle(a));
    }
    // Tier 3: general valid articles so page is never empty
    if (result.length === 0) {
      result = allArticles.slice(0, 8);
    }
    if (sortOrder === 'oldest') {
      return [...result].sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate));
    }
    return result;
  }, [allArticles, rawArticles, sortOrder, lang]);

  // Hero slides — computed first so their IDs can be excluded below
  const heroSlides = useMemo(() => {
    const withImg = healthArticles.filter(a => a.image);
    if (withImg.length >= 3) return withImg.slice(0, 5);
    // Not enough images — pad with fallback-image articles to reach at least 3-4 slides
    const withoutImg = healthArticles.filter(a => !a.image);
    return [...withImg, ...withoutImg].slice(0, 5);
  }, [healthArticles]);

  // Subsections — each article can appear in at most one subsection;
  // hero slide articles are excluded to avoid repeats
  const subsectionMap = useMemo(() => {
    const map = {};
    const claimedIds = new Set(heroSlides.map(a => a.id));
    HEALTH_SUBSECTIONS.forEach(s => {
      const articles = filterByHealthSubsection(healthArticles, s.key)
        .filter(a => !claimedIds.has(a.id));
      articles.forEach(a => claimedIds.add(a.id));
      map[s.key] = articles;
    });
    return map;
  }, [healthArticles, heroSlides]);

  // Latest: articles not in hero OR any subsection
  const latestHealth = useMemo(() => {
    const heroIds = new Set(heroSlides.map(a => a.id));
    const subsectionIds = new Set(Object.values(subsectionMap).flat().map(a => a.id));
    return healthArticles
      .filter(a => !heroIds.has(a.id) && !subsectionIds.has(a.id))
      .slice(0, 12);
  }, [healthArticles, heroSlides, subsectionMap]);
  const showHero = heroSlides.length >= 3;

  const activeSections = HEALTH_SUBSECTIONS.filter(s => subsectionMap[s.key]?.length > 0);

  return (
    <>
      <Helmet>
        <title>{lang === 'EN' ? 'Health News' : 'स्वास्थ्य समाचार'} | {PORTAL_NAME}</title>
        <meta name="description" content="बीमारी, उपचार, Ayushman Bharat, AIIMS, मानसिक स्वास्थ्य, योग, आयुर्वेद और WHO की ताज़ा स्वास्थ्य खबरें।" />
        <link rel="canonical" href="/category/health" />
      </Helmet>

      <div className="container-fluid px-0">

        {showHero
          ? <HealthHeroSlider slides={heroSlides} lang={lang} />
          : <HealthHeader lang={lang} count={healthArticles.length} />
        }

        <div className="container my-2">
          <AdBanner size="728x90" index={0} />
        </div>

        {loading || (!feedsComplete && healthArticles.length === 0) ? (
          <div className="container py-4">
            <LoadingSpinner count={6} />
          </div>
        ) : (
          <div className="container py-3">

            {/* Sort row */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                {healthArticles.length} {t('articlesFound')}
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
              {/* ── Main Content ── */}
              <div className="col-lg-8">

                {/* Latest — only unclaimed articles */}
                {latestHealth.length > 0 && (
                  <>
                    <SubSection
                      subsection={{ key: 'latest', label: 'ताज़ा स्वास्थ्य खबरें', labelEn: 'Latest Health News', emoji: '🔔', color: '#EF4444' }}
                      articles={latestHealth}
                      lang={lang === 'EN' ? 'en' : 'hi'}
                      aosDelay={0}
                    />
                    {activeSections.length > 0 && <hr className="section-divider" />}
                  </>
                )}

                {/* Subsections — only render if they have articles */}
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
                {healthArticles.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                    <p style={{ fontSize: 48, margin: '0 0 12px' }}>💊</p>
                    <p style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 15 }}>
                      {lang === 'EN' ? 'No health news available right now.' : 'अभी कोई स्वास्थ्य खबर उपलब्ध नहीं है।'}
                    </p>
                  </div>
                )}

              </div>

              {/* ── Sidebar ── */}
              <div className="col-lg-4 d-none d-lg-block">
                <Sidebar articles={healthArticles} />
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

export default HealthPage;
