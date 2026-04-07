import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import { timeAgo } from '../../utils/formatDate';
import { getCategoryFallbackImage } from '../../utils/categoryImages';
import '../../styles/newscard.css';

const NewsCardHorizontal = ({ article }) => {
  const navigate = useNavigate();
  const { lang } = useLang();

  const imageSrc = article.image || getCategoryFallbackImage(article.category, article.id, article.title, article.summary);

  const handleClick = () => {
    navigate(`/article/${article.id}`);
  };

  return (
    <div className="news-card-horizontal" onClick={handleClick}>
      <div className="card-img-side">
        <img
          src={imageSrc}
          alt={article.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getCategoryFallbackImage(article.category, article.id, article.title, article.summary);
          }}
        />
      </div>
      <div className="card-body-side">
        <h4 className="card-headline">{article.title}</h4>
        <div className="card-meta">
          <span className="time" style={{ color: '#999' }}>
            {timeAgo(article.pubDate, lang.toLowerCase())}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCardHorizontal;
