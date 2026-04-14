import React, { useState, useMemo, useRef, useEffect } from 'react';
import '../styles/hero.css';
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel } from 'bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNews } from '../context/NewsContext';
import { useLang } from '../context/LanguageContext';
import { CATEGORIES, PORTAL_NAME } from '../utils/constants';
import { getCategoryFallbackImage, SAFE_FALLBACK } from '../utils/categoryImages';
import { timeAgo } from '../utils/formatDate';
import NewsCard from '../components/news/NewsCard';
import NewsCardHorizontal from '../components/news/NewsCardHorizontal';
import AdBanner from '../components/layout/AdBanner';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CategoryCarousel = ({ slides, catColor, lang }) => {
  const navigate = useNavigate();
  const touchStartX = useRef(0);
  const swiping = useRef(false);
  const carouselRef = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    swiping.current = false;
  };
  const handleTouchMove = (e) => {
    if (Math.abs(e.touches[0].clientX - touchStartX.current) > 30) {
      swiping.current = true;
    }
  };

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
        id="categoryCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#categoryCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : undefined}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="carousel-inner">
          {slides.map((article, index) => {
            const img = article.image || getCategoryFallbackImage(article.category, article.id, article.title, article.summary);
            return (
              <div
                key={article.id}
                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onClick={() => { if (!swiping.current) navigate(`/article/${article.id}`); }}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={img}
                  alt={article.title}
                  className="d-block w-100"
                  onError={(e) => {
                    const fb = getCategoryFallbackImage(article.category, article.id, article.title, article.summary);
                    e.target.src = e.target.src === fb ? SAFE_FALLBACK : fb;
                  }}
                />
                <div className="hero-overlay" />
                <div className="hero-content">
                  <span
                    className="hero-category"
                    style={{ backgroundColor: catColor }}
                  >
                    {article.category}
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

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#categoryCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#categoryCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

const CategoryPage = () => {
  const { slug } = useParams();
  const { getCategoryWithFallback, allArticles, loading } = useNews();
  const { lang, t } = useLang();
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortOrder, setSortOrder] = useState('latest');

  const category = CATEGORIES.find(c => c.slug === slug);
  const catLabel = category ? (lang === 'EN' ? category.labelEn : category.label) : (slug === 'latest' ? (lang === 'EN' ? 'Latest News' : 'ताज़ा खबरें') : slug);
  const catEmoji = category ? category.emoji : '📰';
  const catColor = category ? category.color : '#CC0000';

  const articles = useMemo(() => {
    // If slug doesn't match a known category, show all articles
    let result = category ? getCategoryWithFallback(slug) : allArticles;

    // Sort
    if (sortOrder === 'oldest') {
      result = [...result].sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate));
    }

    return result;
  }, [slug, category, getCategoryWithFallback, allArticles, sortOrder]);

  const carouselSlides = useMemo(() => {
    const source = category ? getCategoryWithFallback(slug) : allArticles;
    return source.filter(a => a.image).slice(0, 5);
  }, [slug, category, getCategoryWithFallback, allArticles]);

  const topStories = articles.filter(a => a.image).slice(0, 5);

  if (loading) {
    return (
      <div className="container py-4">
        <LoadingSpinner count={6} />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{catLabel} | {PORTAL_NAME}</title>
        <meta name="description" content={`${catLabel} - ${PORTAL_NAME}`} />
      </Helmet>


      {carouselSlides.length >= 2 && (
        <CategoryCarousel slides={carouselSlides} catColor={catColor} lang={lang} />
      )}

      <div className="container py-4">

        {/* Filter Row */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <span style={{ color: '#888', fontSize: '14px' }}>
            {articles.length} {t('articlesFound')}
          </span>
          <div className="d-flex gap-2">
            <select
              className="form-select form-select-sm"
              style={{ background: '#1A1A1A', color: '#fff', border: '1px solid #333', width: 'auto' }}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="latest">{t('sortLatest')}</option>
              <option value="oldest">{t('sortOldest')}</option>
            </select>
          </div>
        </div>

        <div className="row g-4">
          {/* Main Grid */}
          <div className="col-lg-8">
            {articles.length === 0 ? (
              <div className="text-center py-5">
                <span style={{ fontSize: '4rem' }}>{catEmoji}</span>
                <p className="mt-3" style={{ color: '#888', fontSize: '16px' }}>
                  {slug === 'podcast' || slug === 'quiz'
                    ? t('comingSoon')
                    : t('noCategoryArticles')}
                </p>
              </div>
            ) : (
              <>
                <div className="row g-3">
                  {articles.slice(0, visibleCount).map((article, i) => (
                    <div className="col-lg-4 col-md-6" key={article.id} data-aos="fade-up" data-aos-delay={i % 6 * 50}>
                      <NewsCard article={article} size="sm" />
                    </div>
                  ))}
                </div>

                {visibleCount < articles.length && (
                  <div className="text-center mt-4">
                    <button
                      className="btn btn-primary-red px-4 py-2"
                      onClick={() => setVisibleCount(prev => prev + 12)}
                    >
                      {t('loadMore')} <i className="fas fa-chevron-down ms-2"></i>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-lg-4" data-aos="fade-left">
            <AdBanner size="300x250" />
            <div className="mt-4">
              <h5
                style={{
                  fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
                  fontSize: '1.3rem',
                  color: '#CC0000',
                  borderBottom: '2px solid #222',
                  paddingBottom: '8px',
                  marginBottom: '16px',
                }}
              >
                {t('topStories')}
              </h5>
              {topStories.map(article => (
                <NewsCardHorizontal key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
