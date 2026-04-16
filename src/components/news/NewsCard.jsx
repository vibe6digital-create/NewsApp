import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategoryColor, getCategoryLabel, getCategoryLabelEn } from '../../utils/categoryColors';
import { timeAgo } from '../../utils/formatDate';
import { useLang } from '../../context/LanguageContext';
import { getCategoryFallbackImage, SAFE_FALLBACK } from '../../utils/categoryImages';
import '../../styles/newscard.css';
import { stripSourceAttribution } from '../../utils/stripSource';

const NewsCard = ({ article, size = 'md' }) => {
  const navigate = useNavigate();
  const { lang, t } = useLang();
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef(null);

  const fallback = getCategoryFallbackImage(article.category, article.id, article.title, article.summary);
  const imageSrc = article.image || fallback;

  const catLabel = lang === 'EN'
    ? getCategoryLabelEn(article.category)
    : getCategoryLabel(article.category);

  const shareUrl = `${window.location.origin}/article/${article.id}`;
  const encoded = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(article.title);

  useEffect(() => {
    if (!showShare) return;
    const handleClickOutside = (e) => {
      if (shareRef.current && !shareRef.current.contains(e.target)) setShowShare(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showShare]);

  const handleClick = () => {
    navigate(`/article/${article.id}`);
  };

  const toggleShare = (e) => {
    e.stopPropagation();
    setShowShare((prev) => !prev);
  };

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => { setCopied(false); setShowShare(false); }, 1500);
    });
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
          <p className="card-summary">{stripSourceAttribution(article.summary, article.source)}</p>
        )}

        <div className="card-footer-info">
          <span className="card-time">{timeAgo(article.pubDate, lang.toLowerCase())}</span>
          <span className="card-share-wrap" ref={shareRef}>
            <span className="card-share" onClick={toggleShare} title={t('shareArticle')}>
              <i className="fas fa-share-alt" />
            </span>
            {showShare && (
              <div className="share-popup" onClick={(e) => e.stopPropagation()}>
                <a href={`https://wa.me/?text=${encodedTitle}%20${encoded}`} target="_blank" rel="noopener noreferrer" className="share-icon whatsapp" title="WhatsApp">
                  <i className="fab fa-whatsapp" />
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`} target="_blank" rel="noopener noreferrer" className="share-icon facebook" title="Facebook">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`} target="_blank" rel="noopener noreferrer" className="share-icon twitter" title="Twitter">
                  <i className="fab fa-twitter" />
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} target="_blank" rel="noopener noreferrer" className="share-icon linkedin" title="LinkedIn">
                  <i className="fab fa-linkedin-in" />
                </a>
                <button onClick={handleCopy} className={`share-icon copy ${copied ? 'copied' : ''}`} title={copied ? 'Copied!' : 'Copy Link'}>
                  <i className={copied ? 'fas fa-check' : 'fas fa-link'} />
                </button>
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
