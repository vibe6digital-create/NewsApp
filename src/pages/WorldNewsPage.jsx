import React, { useState, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { useLang } from '../context/LanguageContext';
import SubSection from '../components/national/SubSection';
import AdBanner from '../components/layout/AdBanner';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Sidebar from '../components/layout/Sidebar';
import { filterByWorldSubsection } from '../services/worldRssService';
import { WORLD_SUBSECTIONS } from '../utils/worldSubsections';
import { PORTAL_NAME } from '../utils/constants';
import { getCategoryColor, getCategoryLabel, getCategoryLabelEn } from '../utils/categoryColors';
import { getCategoryFallbackImage, SAFE_FALLBACK } from '../utils/categoryImages';
import { timeAgo } from '../utils/formatDate';
import '../styles/hero.css';
import '../styles/national.css';


const WorldHeroSlider = ({ slides, lang }) => {
  const navigate = useNavigate();
  const touchStartX = useRef(0);
  const swiping = useRef(false);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; swiping.current = false; };
  const handleTouchMove = (e) => { if (Math.abs(e.touches[0].clientX - touchStartX.current) > 8) swiping.current = true; };
  if (!slides.length) return null;
  return (
    <div className="hero-slider" data-aos="fade" style={{ margin: 0, padding: 0 }}>
      <div
        id="worldCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button key={i} type="button" data-bs-target="#worldCarousel"
              data-bs-slide-to={i} className={i === 0 ? 'active' : ''}
              aria-current={i === 0 ? 'true' : undefined} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <div className="carousel-inner">
          {slides.map((article, i) => {
            const img = article.image || getCategoryFallbackImage(article.category, article.id, article.title, article.summary);
            const catLabel = lang === 'EN' ? getCategoryLabelEn(article.category) : getCategoryLabel(article.category);
            return (
              <div key={article.id} className={`carousel-item ${i === 0 ? 'active' : ''}`}
                onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}
                onClick={() => { if (!swiping.current) navigate(`/article/${article.id}`); }}
                style={{ cursor: 'pointer' }}>
                <img src={img} alt={article.title} className="d-block w-100"
                  onError={e => {
                    const fb = getCategoryFallbackImage(article.category, article.id, article.title, article.summary);
                    e.target.src = e.target.src === fb ? SAFE_FALLBACK : fb;
                  }} />
                <div className="hero-overlay" />
                <div className="hero-content">
                  <span className="hero-category" style={{ backgroundColor: getCategoryColor(article.category) }}>
                    {catLabel}
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
        <button className="carousel-control-prev" type="button" data-bs-target="#worldCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#worldCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

const WorldNewsPage = () => {
  const { allArticles, loading } = useNews();
  const { lang, t } = useLang();
  const [sortOrder, setSortOrder] = useState('latest');

  const worldArticles = useMemo(() => {
    const result = allArticles.filter(a => a.category === 'world');
    if (sortOrder === 'oldest') {
      return [...result].sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate));
    }
    return result;
  }, [allArticles, sortOrder]);

  // Build subsections with strict deduplication — each article appears in ONE section only
  const { filteredMap, latestArticles, activeSubsections } = useMemo(() => {
    const claimedIds = new Set();
    const map = {};

    WORLD_SUBSECTIONS.forEach(s => {
      const matches = filterByWorldSubsection(worldArticles, s.key, s.keywords)
        .filter(a => !claimedIds.has(a.id));
      matches.forEach(a => claimedIds.add(a.id));
      map[s.key] = matches;
    });

    // Only subsections that actually have articles
    const active = WORLD_SUBSECTIONS.filter(s => map[s.key].length > 0);

    // Latest = whatever wasn't claimed by any subsection
    const latest = worldArticles.filter(a => !claimedIds.has(a.id)).slice(0, 12);

    return { filteredMap: map, latestArticles: latest, activeSubsections: active };
  }, [worldArticles]);

  return (
    <>
      <Helmet>
        <title>{lang === 'EN' ? 'World News' : 'विदेश की खबरें'} | {PORTAL_NAME}</title>
        <meta name="description" content="अमेरिका, चीन, पाकिस्तान, रूस, यूरोप सहित दुनिया भर की ताज़ी खबरें हिंदी में पढ़ें।" />
        <meta property="og:title" content="विदेश की खबरें — World News" />
        <meta property="og:description" content="Latest international news in Hindi and English." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/category/world" />
      </Helmet>

      <div className="container-fluid px-0">
        <WorldHeroSlider slides={worldArticles.slice(0, 5)} lang={lang} />

        <div className="container my-2">
          <AdBanner size="728x90" index={0} />
        </div>

        {loading ? (
          <div className="container py-2">
            <LoadingSpinner count={6} />
          </div>
        ) : (
          <div className="container py-2">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                {worldArticles.length} {t('articlesFound')}
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
              <div className="col-lg-8">
                {latestArticles.length > 0 && (
                  <SubSection
                    subsection={{ key: 'latest', label: 'ताज़ा विदेश खबरें', labelEn: 'Latest World News', emoji: '🌍', color: '#6366F1' }}
                    articles={latestArticles}
                    lang={lang === 'EN' ? 'en' : 'hi'}
                    aosDelay={0}
                  />
                )}
                {latestArticles.length > 0 && <hr className="section-divider" />}

                {activeSubsections.map((s, idx) => (
                  <React.Fragment key={s.key}>
                    <SubSection
                      subsection={s}
                      articles={filteredMap[s.key]}
                      lang={lang === 'EN' ? 'en' : 'hi'}
                      aosDelay={idx * 80}
                    />
                    {idx < activeSubsections.length - 1 && <hr className="section-divider" />}
                    {(idx + 1) % 2 === 0 && (
                      <div className="my-3">
                        <AdBanner size="728x90" index={idx} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="col-lg-4 d-none d-lg-block">
                <Sidebar />
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

export default WorldNewsPage;
