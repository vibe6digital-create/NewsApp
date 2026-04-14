import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNews } from '../../context/NewsContext';
import { useLang } from '../../context/LanguageContext';
import { getCategoryColor } from '../../utils/categoryColors';
import { timeAgo } from '../../utils/formatDate';
import { getCategoryFallbackImage } from '../../utils/categoryImages';
import SectionTitle from '../common/SectionTitle';
import LoadingSpinner from '../common/LoadingSpinner';

const CollageCard = ({ article, height = '220px', fontSize = '16px' }) => {
  const navigate = useNavigate();
  const { lang } = useLang();
  const fallback = getCategoryFallbackImage(article.category, article.id, article.title, article.summary);
  const imageSrc = article.image || fallback;

  const handleClick = () => {
    navigate(`/article/${article.id}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'relative',
        height,
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#111',
      }}
      className="world-collage-card"
    >
      <img
        src={imageSrc}
        alt={article.title}
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallback;
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.5s ease',
        }}
      />
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
      }} />
      {/* Category badge */}
      <span style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: getCategoryColor(article._topicSlug || article.category),
        color: '#fff',
        padding: '3px 10px',
        borderRadius: '4px',
        fontSize: '10px',
        fontWeight: 700,
        textTransform: 'uppercase',
      }}>
        {article._topicLabel || article.category || 'world'}
      </span>
      {/* Text content */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '12px 14px',
      }}>
        <h3 style={{
          fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
          fontSize,
          fontWeight: 600,
          color: '#fff',
          lineHeight: 1.25,
          margin: 0,
          marginBottom: '6px',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {article.title}
        </h3>
        <div style={{ fontSize: '10px', color: '#aaa' }}>
          <span>{timeAgo(article.pubDate, lang.toLowerCase())}</span>
        </div>
      </div>
    </div>
  );
};


const WorldSection = () => {
  const { allArticles, rawArticles, loading } = useNews();
  const { lang, t } = useLang();

  const articles = useMemo(() => {
    const primary = allArticles.filter(a => a.category === 'world');
    if (primary.length > 0) return primary.slice(0, 10);
    // Fallback: older world articles, same language
    const preferredLang = lang === 'EN' ? 'en' : 'hi';
    return rawArticles.filter(a => a.category === 'world' && a.lang === preferredLang).slice(0, 10);
  }, [allArticles, rawArticles, lang]);

  if (loading) return <div className="container"><LoadingSpinner /></div>;
  if (articles.length === 0) return null;

  const [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10] = articles;

  return (
    <section className="py-4" data-aos="fade-up">
      <SectionTitle title={t('worldNews')} />

      {/* Row 1: Big feature + 2 stacked */}
      <div className="row g-2 mb-2">
        <div className="col-lg-7 col-md-7">
          {a1 && <CollageCard article={a1} height="360px" fontSize="22px" />}
        </div>
        <div className="col-lg-5 col-md-5 d-flex flex-column gap-2">
          {a2 && <CollageCard article={a2} height="174px" fontSize="15px" />}
          {a3 && <CollageCard article={a3} height="174px" fontSize="15px" />}
        </div>
      </div>

      {/* Row 2: 4-column grid */}
      <div className="row g-2">
        {[a4, a5, a6, a7].filter(Boolean).map((article) => (
          <div className="col-lg-3 col-md-6 col-6" key={article.id}>
            <CollageCard article={article} height="180px" fontSize="13px" />
          </div>
        ))}
      </div>

      {/* Row 3: 3-column extras if available */}
      {(a8 || a9 || a10) && (
        <div className="row g-2 mt-0">
          {[a8, a9, a10].filter(Boolean).map((article) => (
            <div className="col-lg-4 col-md-4 col-12" key={article.id}>
              <CollageCard article={article} height="160px" fontSize="13px" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default WorldSection;
