import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategoryColor, getCategoryLabel, getCategoryLabelEn } from '../../utils/categoryColors';
import { timeAgo } from '../../utils/formatDate';
import { useLang } from '../../context/LanguageContext';
import { getCategoryFallbackImage, SAFE_FALLBACK } from '../../utils/categoryImages';
import '../../styles/newscard.css';

const NewsCard = ({ article, size = 'md' }) => {
  const navigate = useNavigate();
  const { lang, t } = useLang();

  const fallback = getCategoryFallbackImage(article.category, article.id, article.title, article.summary);
  const imageSrc = article.image || fallback;

  const catLabel = lang === 'EN'
    ? getCategoryLabelEn(article.category)
    : getCategoryLabel(article.category);

  const handleClick = () => {
    navigate(`/article/${article.id}`);
  };

  return (
    <div className={`news-card card-${size}`} onClick={handleClick}>
      <div className="card-img-container">
        <img
          src={imageSrc}
          alt={article.title}
          loading="lazy"
          onError={(e) => {
            if (e.target.src === fallback) {
              e.target.onerror = null;
              e.target.src = SAFE_FALLBACK;
            } else {
              e.target.src = fallback;
            }
          }}
        />
        <div className="img-overlay" />
        <span
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            backgroundColor: getCategoryColor(article.category),
            color: '#fff',
            padding: '3px 10px',
            borderRadius: '4px',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 1.4,
            zIndex: 2,
          }}
        >
          {catLabel}
        </span>
        {article.breaking && (
          <div className="breaking-badge">{t('breaking')}</div>
        )}
      </div>

      <div className="card-body-content">
        <h3 className="card-headline">{article.title}</h3>

        {(size === 'lg' || size === 'md') && article.summary && (
          <p className="card-summary">{article.summary}</p>
        )}

        <div className="card-footer-info">
          <span className="card-time">{timeAgo(article.pubDate, lang.toLowerCase())}</span>
          <span className="card-share" onClick={(e) => e.stopPropagation()}>
            <i className="fas fa-share-alt"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
