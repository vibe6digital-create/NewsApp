import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNews } from '../../context/NewsContext';
import { useLang } from '../../context/LanguageContext';
import { CATEGORIES } from '../../utils/constants';
import { timeAgo } from '../../utils/formatDate';
import { addSubscriber } from '../../services/subscriptionService';
import { getCategoryFallbackImage } from '../../utils/categoryImages';
import AdBanner from './AdBanner';

/* ── Latest News Widget ─────────────────────────────── */
const LatestWidget = ({ articles }) => {
  const navigate = useNavigate();
  const { lang, t } = useLang();

  return (
    <div className="sidebar-widget">
      <div className="sidebar-widget__title">
        <span className="sidebar-widget__bar" />
        {t('latestNews')}
      </div>
      <div className="sidebar-widget__body">
        {articles.slice(0, 6).map((article) => {
          const img = article.image || getCategoryFallbackImage(article.category, article.id, article.title, article.summary);
          const handleClick = () => {
            navigate(`/article/${article.id}`);
          };
          return (
            <div key={article.id} className="sidebar-news-item" onClick={handleClick}>
              <div className="sidebar-news-item__img">
                <img
                  src={img}
                  alt={article.title}
                  loading="lazy"
                  onError={(e) => { e.target.onerror = null; e.target.src = getCategoryFallbackImage(article.category, article.id, article.title, article.summary); }}
                />
              </div>
              <div className="sidebar-news-item__text">
                <p className="sidebar-news-item__headline">{article.title}</p>
                <span className="sidebar-news-item__time">{timeAgo(article.pubDate, lang.toLowerCase())}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Categories Widget ──────────────────────────────── */
const CategoriesWidget = () => {
  const { lang, t } = useLang();
  return (
  <div className="sidebar-widget">
    <div className="sidebar-widget__title">
      <span className="sidebar-widget__bar" />
      {t('categories')}
    </div>
    <div className="sidebar-widget__body">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            to={`/category/${cat.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 14px',
              background: `${cat.color}18`,
              border: `1px solid ${cat.color}44`,
              borderRadius: '20px',
              color: 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${cat.color}44`; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${cat.color}18`; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <span>{cat.emoji}</span>
            <span>{lang === 'EN' ? cat.labelEn : cat.label}</span>
          </Link>
        ))}
      </div>
    </div>
  </div>
  );
};

/* ── Trending Topics Widget ─────────────────────────── */
const TrendingWidget = ({ articles }) => {
  const navigate = useNavigate();
  const { t } = useLang();
  const trending = articles.filter(a => a.image).slice(0, 5);

  return (
    <div className="sidebar-widget">
      <div className="sidebar-widget__title">
        <span className="sidebar-widget__bar" style={{ background: '#FFD700' }} />
        {t('trendingNow')}
      </div>
      <div className="sidebar-widget__body">
        {trending.map((article, i) => {
          const handleClick = () => {
            navigate(`/article/${article.id}`);
          };
          return (
            <div
              key={article.id}
              onClick={handleClick}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '10px 0',
                borderBottom: i < trending.length - 1 ? '1px solid var(--card-border)' : 'none',
                cursor: 'pointer',
              }}
            >
              <span style={{
                fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
                fontSize: '2rem',
                fontWeight: 700,
                color: i === 0 ? '#CC0000' : 'var(--text-muted)',
                lineHeight: 1,
                flexShrink: 0,
                width: '28px',
                textAlign: 'center',
              }}>
                {i + 1}
              </span>
              <p style={{
                fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
                fontSize: '14px',
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: 1.3,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {article.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Subscribe Widget ───────────────────────────────── */
const SubscribeWidget = () => {
  const [email, setEmail] = useState('');
  const { t } = useLang();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    const result = addSubscriber(email, '');
    if (result.success) {
      toast.success(t('subscribeSuccess'));
      setEmail('');
    } else {
      toast.info(t('subscribeDuplicate'));
    }
  };

  return (
    <div className="sidebar-widget" style={{
      background: 'linear-gradient(135deg, #1a0000 0%, #330000 100%)',
      border: '1px solid #CC000044',
    }}>
      <div className="sidebar-widget__title" style={{ color: '#FFD700' }}>
        <span className="sidebar-widget__bar" style={{ background: '#FFD700' }} />
        {t('newsletter')}
      </div>
      <div className="sidebar-widget__body">
        <p style={{ color: '#aaa', fontSize: '12px', marginBottom: '12px', lineHeight: 1.5 }}>
          {t('newsletterWidgetDesc')}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder={t('emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              background: '#0a0a0a',
              border: '1px solid #333',
              color: '#fff',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '13px',
              marginBottom: '8px',
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              background: '#CC0000',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#990000'}
            onMouseLeave={e => e.currentTarget.style.background = '#CC0000'}
          >
            {t('subscribeBtn')} →
          </button>
        </form>
      </div>
    </div>
  );
};

/* ── Social Follow Widget ───────────────────────────── */
const SocialWidget = () => {
  const { t } = useLang();
  const platforms = [
    { name: 'WhatsApp', icon: 'fab fa-whatsapp', color: '#25D366', bg: '#0d1f14', count: '2.4K' },
    { name: 'Facebook', icon: 'fab fa-facebook-f', color: '#1877F2', bg: '#0d1220', count: '8.1K' },
    { name: 'Instagram', icon: 'fab fa-instagram', color: '#E1306C', bg: '#1f0d14', count: '5.6K' },
    { name: 'YouTube', icon: 'fab fa-youtube', color: '#FF0000', bg: '#1f0a0a', count: '3.2K' },
    { name: 'Twitter', icon: 'fab fa-twitter', color: '#1DA1F2', bg: '#0d1620', count: '1.9K' },
  ];

  return (
    <div className="sidebar-widget">
      <div className="sidebar-widget__title">
        <span className="sidebar-widget__bar" style={{ background: '#1DA1F2' }} />
        {t('followUs')}
      </div>
      <div className="sidebar-widget__body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {platforms.map((p) => (
            <a
              key={p.name}
              href="/"
              onClick={(e) => e.preventDefault()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: p.bg,
                border: `1px solid ${p.color}33`,
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = p.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = `${p.color}33`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className={p.icon} style={{ color: p.color, fontSize: '16px', width: '18px' }} />
                <span style={{ color: '#ccc', fontSize: '13px', fontWeight: 500 }}>{p.name}</span>
              </div>
              <span style={{ color: p.color, fontSize: '12px', fontWeight: 700 }}>{p.count}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Main Sidebar ───────────────────────────────────── */
const Sidebar = ({ articles: articlesProp } = {}) => {
  const { allArticles } = useNews();
  const articles = articlesProp || allArticles;

  return (
    <aside className="sidebar-sticky">
      {/* Ad 1 */}
      <AdBanner size="300x250" index={0} />

      {/* Latest News */}
      <LatestWidget articles={articles} />

      {/* Ad 2 */}
      <AdBanner size="300x250" index={1} />

      {/* Trending */}
      <TrendingWidget articles={articles.slice(5, 20)} />

      {/* Categories */}
      <CategoriesWidget />

      {/* Subscribe */}
      <SubscribeWidget />

      {/* Ad 3 */}
      <AdBanner size="300x250" index={2} />

      {/* Social Follow */}
      <SocialWidget />
    </aside>
  );
};

export default Sidebar;
