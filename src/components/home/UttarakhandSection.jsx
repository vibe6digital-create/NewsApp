import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNews } from '../../context/NewsContext';
import { useLang } from '../../context/LanguageContext';
import { timeAgo } from '../../utils/formatDate';
import { CATEGORY_KEYWORDS } from '../../utils/constants';
import { getCategoryFallbackImage } from '../../utils/categoryImages';
import { stripSourceAttribution } from '../../utils/stripSource';
import NewsCardHorizontal from '../news/NewsCardHorizontal';
import LoadingSpinner from '../common/LoadingSpinner';

const UK_KEYWORDS = CATEGORY_KEYWORDS.uttarakhand || [
  'uttarakhand', 'देहरादून', 'haridwar', 'rishikesh', 'nainital',
  'mussoorie', 'kedarnath', 'badrinath', 'chardham', 'उत्तराखंड',
];

const UKFeaturedCard = ({ article }) => {
  const navigate = useNavigate();
  const { lang, t } = useLang();
  if (!article) return null;
  const img = article.image || getCategoryFallbackImage(article.category, article.id, article.title, article.summary);

  const handleClick = () => {
    navigate(`/article/${article.id}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'relative',
        height: '360px',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#111',
      }}
      className="world-collage-card"
    >
      <img
        src={img}
        alt={article.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
        onError={(e) => { e.target.onerror = null; e.target.src = getCategoryFallbackImage(article.category, article.id, article.title, article.summary); }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.1) 100%)',
      }} />
      {/* Uttarakhand badge */}
      <div style={{
        position: 'absolute', top: '14px', left: '14px',
        background: 'linear-gradient(135deg, #22C55E, #16A34A)',
        color: '#fff', padding: '5px 14px',
        borderRadius: '20px', fontSize: '11px', fontWeight: 700,
        display: 'flex', alignItems: 'center', gap: '5px',
      }}>
        {t('uttarakhandBadge')}
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px' }}>
        <h2 style={{
          fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
          fontSize: '1.7rem', fontWeight: 800,
          color: '#fff', lineHeight: 1.3, margin: 0, marginBottom: '10px',
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {article.title}
        </h2>
        {article.summary && (
          <p style={{
            fontSize: '13px', color: 'rgba(255,255,255,0.7)',
            margin: 0, marginBottom: '10px',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {stripSourceAttribution(article.summary, article.source)}
          </p>
        )}
        <div style={{ fontSize: '11px', color: '#aaa' }}>
          <span>{timeAgo(article.pubDate, lang.toLowerCase())}</span>
        </div>
      </div>
    </div>
  );
};

const UKSmallCard = ({ article }) => {
  const navigate = useNavigate();
  const { lang } = useLang();
  if (!article) return null;
  const img = article.image || getCategoryFallbackImage(article.category, article.id, article.title, article.summary);

  const handleClick = () => {
    navigate(`/article/${article.id}`);
  };

  return (
    <div onClick={handleClick} style={{
      position: 'relative', height: '170px',
      borderRadius: '10px', overflow: 'hidden',
      cursor: 'pointer', background: '#111',
    }} className="world-collage-card">
      <img
        src={img} alt={article.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
        onError={(e) => { e.target.onerror = null; e.target.src = getCategoryFallbackImage(article.category, article.id, article.title, article.summary); }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 100%)',
      }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 12px' }}>
        <p style={{
          fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
          fontSize: '13px', fontWeight: 700, color: '#fff',
          margin: 0, lineHeight: 1.3,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {article.title}
        </p>
        <span style={{ fontSize: '10px', color: '#FFD700' }}>{timeAgo(article.pubDate, lang.toLowerCase())}</span>
      </div>
    </div>
  );
};

const filterUK = (articles) =>
  articles.filter((a) => {
    if (a.category === 'uttarakhand') return true;
    const text = `${a.title || ''} ${a.summary || ''} ${a.source || ''}`.toLowerCase();
    return UK_KEYWORDS.some((kw) => text.includes(kw.toLowerCase()));
  });

const UttarakhandSection = () => {
  const { allArticles, rawArticles, loading } = useNews();
  const { lang, t } = useLang();

  const ukArticles = useMemo(() => {
    const primary = filterUK(allArticles);
    if (primary.length > 0) return primary.slice(0, 30);
    // Fallback: older Uttarakhand articles, same language
    const preferredLang = lang === 'EN' ? 'en' : 'hi';
    return filterUK(rawArticles.filter(a => a.lang === preferredLang)).slice(0, 30);
  }, [allArticles, rawArticles, lang]);

  if (loading) return <div><LoadingSpinner /></div>;
  if (ukArticles.length === 0) return null;

  const [a1, a2, a3, a4, a5, a6, a7, a8, ...rest] = ukArticles;

  return (
    <section className="py-4" data-aos="fade-up">
      {/* Section header with special Uttarakhand styling */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '20px',
        borderLeft: '4px solid #22C55E', paddingLeft: '15px',
      }}>
        <div>
          <h2 style={{
            fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
            fontSize: '2rem', fontWeight: 800,
            color: 'var(--text-primary)', margin: 0, lineHeight: 1.2,
          }}>
            {t('uttarakhandNews')}
            <span style={{
              display: 'inline-block', width: '40px', height: '3px',
              background: '#FFD700', marginLeft: '10px', verticalAlign: 'middle',
            }} />
          </h2>
          <p style={{ color: '#22C55E', fontSize: '13px', margin: '2px 0 0', fontWeight: 600 }}>
            {t('uttarakhandSubtitle')}
          </p>
        </div>
      </div>

      {/* Row 1: Large feature + 2 stacked */}
      <div className="row g-2 mb-2">
        <div className="col-lg-7">
          {a1 && <UKFeaturedCard article={a1} />}
        </div>
        <div className="col-lg-5 d-flex flex-column gap-2">
          {a2 && <UKSmallCard article={a2} />}
          {a3 && <UKSmallCard article={a3} />}
        </div>
      </div>

      {/* Row 2: 4 equal small cards */}
      {(a4 || a5 || a6 || a7) && (
        <div className="row g-2 mb-2">
          {[a4, a5, a6, a7].filter(Boolean).map((article) => (
            <div className="col-lg-3 col-6" key={article.id}>
              <UKSmallCard article={article} />
            </div>
          ))}
        </div>
      )}

      {/* Row 3: another 4 small cards */}
      {(a8) && (
        <div className="row g-2 mb-2">
          {[a8, ...rest.slice(0, 3)].filter(Boolean).map((article) => (
            <div className="col-lg-3 col-6" key={article.id}>
              <UKSmallCard article={article} />
            </div>
          ))}
        </div>
      )}

      {/* Row 4: Horizontal list for remaining */}
      {rest.length > 3 && (
        <div className="mt-2">
          {rest.slice(3, 11).map((article) => (
            <NewsCardHorizontal key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
};

export default UttarakhandSection;
