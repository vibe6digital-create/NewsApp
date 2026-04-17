import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { timeAgo } from '../../utils/formatDate';
import { stripSourceAttribution } from '../../utils/stripSource';
import { isBrandedImage } from '../../utils/isBrandedImage';

const NationalNewsCard = ({ article, lang, isLead, accentColor, subsectionKey }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const isPhoto    = subsectionKey === 'photo';
  const isOpinion  = subsectionKey === 'opinion';
  const isFactcheck = subsectionKey === 'factcheck';
  const isElection  = subsectionKey === 'election';

  // Use placeholder for branded RSS thumbnails so publisher logos never appear in the card
  const safeImage = (article.image && !isBrandedImage(article.image)) ? article.image : '/placeholder.jpg';

  const factStatus = isFactcheck
    ? (['true','verified','सच'].some(k => article.title.toLowerCase().includes(k)) ? 'verified'
      : ['false','fake','झूठ'].some(k => article.title.toLowerCase().includes(k)) ? 'debunked'
      : null)
    : null;

  const cardClass = [
    'ncard',
    isFactcheck && factStatus === 'verified' ? 'card-verified' : '',
    isFactcheck && factStatus === 'debunked'  ? 'card-debunked'  : '',
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    navigate(`/article/${article.id}`);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const text = encodeURIComponent(article.title);
    const url  = encodeURIComponent(`${window.location.origin}/article/${article.id}`);
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank', 'noopener noreferrer');
  };

  const imageHeight = isPhoto ? 220 : isLead ? 240 : 170;


  if (isPhoto) {
    return (
      <div
        className={cardClass}
        onClick={handleClick}
        style={{
          position: 'relative', borderRadius: '10px', overflow: 'hidden',
          cursor: 'pointer', height: imageHeight, background: 'var(--dark-2)',
          border: `1px solid var(--card-border)`,
          transform: hovered ? 'translateY(-4px)' : 'none',
          boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.5)' : 'none',
          transition: 'all 0.25s',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={safeImage}
          alt={article.title}
          loading="lazy"
          className="ncard-img"
          onError={e => { e.target.onerror = null; e.target.src = '/placeholder.jpg'; }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)' }} />
        <div className="photo-overlay">
          <p style={{
            fontFamily: "'Noto Sans Devanagari', 'Noto Sans', sans-serif",
            fontSize: '13px', fontWeight: 700, color: '#fff', margin: 0,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {article.title}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cardClass}
      onClick={handleClick}
      style={{
        background: 'var(--dark-2)', border: `1px solid ${hovered ? accentColor : 'var(--card-border)'}`,
        borderRadius: '10px', overflow: 'hidden', cursor: 'pointer',
        height: '100%', display: 'flex', flexDirection: 'column',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.5)' : 'none',
        transition: 'all 0.25s',
        position: 'relative',
        minHeight: isOpinion ? '320px' : 'auto',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isOpinion && <div className="opinion-quote">"</div>}

      {/* Image */}
      <div style={{ height: imageHeight, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={safeImage}
          alt={article.title}
          loading="lazy"
          className="ncard-img"
          onError={e => { e.target.onerror = null; e.target.src = '/placeholder.jpg'; }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 55%)' }} />

        {/* Breaking badge */}
        {article.breaking && (
          <span className="live-badge" style={{
            position: 'absolute', top: '8px', left: '8px',
            background: '#CC0000', color: '#fff', fontSize: '9px', fontWeight: 700,
            padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase',
          }}>
            Breaking
          </span>
        )}

        {/* Election LIVE badge */}
        {isElection && (
          <span className="live-badge" style={{
            position: 'absolute', top: '8px', left: '8px',
            background: '#CC0000', color: '#fff', fontSize: '9px', fontWeight: 700,
            padding: '2px 8px', borderRadius: '3px',
          }}>
            🔴 LIVE
          </span>
        )}

        {/* Fact check badge */}
        {factStatus && (
          <span style={{
            position: 'absolute', top: '8px', left: '8px',
            background: factStatus === 'verified' ? '#22C55E' : '#EF4444',
            color: '#fff', fontSize: '9px', fontWeight: 700,
            padding: '2px 8px', borderRadius: '3px',
          }}>
            {factStatus === 'verified' ? '✅ Verified' : '❌ Debunked'}
          </span>
        )}

        {/* Category badge */}
        <span style={{
          position: 'absolute', bottom: '8px', left: '8px',
          background: accentColor, color: '#fff', fontSize: '8px', fontWeight: 700,
          padding: '2px 8px', borderRadius: '3px', textTransform: 'uppercase',
        }}>
          national
        </span>

        {/* Source badge removed */}
      </div>

      {/* Card body */}
      <div style={{ padding: '12px 14px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {isOpinion && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', flexShrink: 0,
            }}>
              ✍️
            </div>
          </div>
        )}

        <h3 style={{
          fontFamily: "'Noto Sans Devanagari', 'Noto Sans', sans-serif",
          fontSize: isLead ? '17px' : '14px',
          fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          lineHeight: 1.4,
        }}>
          {article.title}
        </h3>

        {article.summary && (
          <p style={{
            fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 10px',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            lineHeight: 1.5,
          }}>
            {stripSourceAttribution(article.summary, article.source)}
          </p>
        )}

        {isElection && article.title.toLowerCase().match(/phase|चरण/) && (
          <span style={{
            display: 'inline-block', background: '#7F1D1D', color: '#FFD700',
            fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', marginBottom: '8px',
          }}>
            🗳️ Election Phase
          </span>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>🕐 {timeAgo(article.pubDate, lang.toLowerCase())}</span>
          </div>
          <button
            onClick={handleShare}
            style={{
              background: 'transparent', border: `1px solid var(--card-border)`, color: '#25D366',
              borderRadius: '6px', padding: '4px 10px', fontSize: '12px', cursor: 'pointer',
            }}
            title="Share on WhatsApp"
          >
            📲
          </button>
        </div>
      </div>
    </div>
  );
};

export default NationalNewsCard;
