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
import { filterBySubsection } from '../services/nationalRssService';
import { SUBSECTIONS } from '../utils/nationalSubsections';
import { PORTAL_NAME } from '../utils/constants';
import { getCategoryColor, getCategoryLabel, getCategoryLabelEn } from '../utils/categoryColors';
import { getCategoryFallbackImage, SAFE_FALLBACK } from '../utils/categoryImages';
import { timeAgo } from '../utils/formatDate';
import '../styles/hero.css';
import '../styles/national.css';

const NationalHeroSlider = ({ slides, lang }) => {
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
    <div className="hero-slider" data-aos="fade" style={{ margin: 0, padding: 0 }}>
      <div
        ref={carouselRef}
        id="nationalCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button key={i} type="button" data-bs-target="#nationalCarousel"
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
        <button className="carousel-control-prev" type="button" data-bs-target="#nationalCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#nationalCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

const NationalNewsPage = () => {
  const { allArticles, rawArticles, loading } = useNews();
  const { lang, t } = useLang();
  const [sortOrder, setSortOrder] = useState('latest');

  const nationalArticles = useMemo(() => {
    const langCode = lang === 'EN' ? 'en' : 'hi';
    let result = allArticles.filter(a =>
      a.category === 'national' && a.lang === langCode
    );
    // Fallback: older national articles (same language) from cache if current fetch has none
    if (result.length === 0) result = rawArticles.filter(a => a.category === 'national' && a.lang === langCode);
    if (sortOrder === 'oldest') {
      return [...result].sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate));
    }
    return result;
  }, [allArticles, rawArticles, sortOrder, lang]);

  const filteredMap = useMemo(() => {
    const map = {};
    SUBSECTIONS.forEach(s => {
      map[s.key] = filterBySubsection(nationalArticles, s.key);
    });
    return map;
  }, [nationalArticles]);

  // Articles not matched by any subsection go into "Latest" catch-all
  const latestArticles = useMemo(() => {
    const claimedIds = new Set(
      Object.values(filteredMap).flat().map(a => a.id)
    );
    const unclaimed = nationalArticles.filter(a => !claimedIds.has(a.id));
    // If subsections have very few matches, also add top articles to latest
    const totalSubsectionCount = Object.values(filteredMap).reduce((s, arr) => s + arr.length, 0);
    if (totalSubsectionCount < 10) {
      return nationalArticles.slice(0, 12);
    }
    return unclaimed.slice(0, 12);
  }, [nationalArticles, filteredMap]);

  return (
    <>
      <Helmet>
        <title>{lang === 'EN' ? 'National News' : 'देश की खबरें'} | {PORTAL_NAME}</title>
        <meta name="description" content="राजनीति, संसद, अर्थव्यवस्था, रक्षा, शिक्षा, स्वास्थ्य सहित देश की सभी ताज़ी खबरें पढ़ें।" />
        <meta property="og:title" content="देश की खबरें — National News" />
        <meta property="og:description" content="India's latest national news in Hindi and English." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/category/national" />
      </Helmet>

      <div className="container-fluid px-0">
        <NationalHeroSlider slides={nationalArticles.slice(0, 5)} lang={lang} />

        <div className="container my-2">
          <AdBanner size="728x90" index={0} />
        </div>

        {loading ? (
          <div className="container py-2">
            <LoadingSpinner count={6} />
          </div>
        ) : (
          <div className="container py-2">
            {/* Filter row */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                {nationalArticles.length} {t('articlesFound')}
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
              {/* Main content */}
              <div className="col-lg-8">
                {/* Latest national news catch-all */}
                {latestArticles.length > 0 && (
                  <SubSection
                    subsection={{ key: 'latest', label: 'ताज़ा खबरें', labelEn: 'Latest News', emoji: '🔥', color: '#CC0000' }}
                    articles={latestArticles}
                    lang={lang === 'EN' ? 'en' : 'hi'}
                    aosDelay={0}
                  />
                )}
                {latestArticles.length > 0 && <hr className="section-divider" />}

                {SUBSECTIONS.map((s, idx) => (
                  <React.Fragment key={s.key}>
                    <SubSection
                      subsection={s}
                      articles={filteredMap[s.key]}
                      lang={lang === 'EN' ? 'en' : 'hi'}
                      aosDelay={idx * 80}
                    />
                    {idx < SUBSECTIONS.length - 1 && <hr className="section-divider" />}
                    {(idx + 1) % 2 === 0 && (
                      <div className="my-3">
                        <AdBanner size="728x90" index={idx} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Sidebar */}
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

export default NationalNewsPage;
