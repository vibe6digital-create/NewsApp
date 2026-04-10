import React, { useRef, useEffect } from 'react';
import { Carousel } from 'bootstrap';
import { useNavigate } from 'react-router-dom';
import { useNews } from '../../context/NewsContext';
import { useLang } from '../../context/LanguageContext';
import { getCategoryColor, getCategoryLabel, getCategoryLabelEn } from '../../utils/categoryColors';
import { timeAgo } from '../../utils/formatDate';
import { getCategoryFallbackImage, SAFE_FALLBACK } from '../../utils/categoryImages';
import '../../styles/hero.css';

const SLIDE_CATEGORIES = ['uttarakhand', 'national', 'world', 'technology', 'education', 'health'];

const HeroSlider = () => {
  const navigate = useNavigate();
  const { allArticles, getFeatured, loading } = useNews();
  const { lang, t } = useLang();
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

  // Pick one fresh article from each category for variety
  const slides = (() => {
    const adminFeatured = getFeatured();
    if (adminFeatured.length >= 3) {
      return adminFeatured.slice(0, 6).map(a => ({
        ...a, image: a.image || getCategoryFallbackImage(a.category, a.id, a.title)
      }));
    }
    const seen = new Set();
    const picks = [];
    for (const cat of SLIDE_CATEGORIES) {
      const article = allArticles.find(a => a.category === cat && !seen.has(a.id));
      if (article) { seen.add(article.id); picks.push(article); }
    }
    // Fill remaining slots with latest articles from any category
    for (const a of allArticles) {
      if (picks.length >= 6) break;
      if (!seen.has(a.id)) { seen.add(a.id); picks.push(a); }
    }
    return picks.map(a => ({ ...a, image: a.image || getCategoryFallbackImage(a.category, a.id, a.title) }));
  })();

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || Carousel.getInstance(el)) return;
    new Carousel(el);
  }, [slides.length]);

  if (loading) {
    return (
      <div className="hero-slider" data-aos="fade">
        <div style={{
          height: '450px',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          borderRadius: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div className="text-center">
            <div className="spinner-border text-danger" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-3">{t('loadingNews')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (slides.length === 0) return null;

  return (
    <div className="hero-slider" data-aos="fade">
      <div
        ref={carouselRef}
        id="heroCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : undefined}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="carousel-inner">
          {slides.map((article, index) => {
            const catLabel = lang === 'EN'
              ? getCategoryLabelEn(article.category)
              : getCategoryLabel(article.category);

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
                  src={article.image}
                  alt={article.title}
                  className="d-block w-100"
                  onError={(e) => {
                    e.target.onerror = null;
                    const fb = getCategoryFallbackImage(article.category, article.id, article.title, article.summary);
                    e.target.src = e.target.src === fb ? SAFE_FALLBACK : fb;
                  }}
                />
                <div className="hero-overlay" />
                <div className="hero-content">
                  <span
                    className="hero-category"
                    style={{ backgroundColor: getCategoryColor(article.category) }}
                  >
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

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
