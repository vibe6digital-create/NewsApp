import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNews } from '../../context/NewsContext';
import { useLang } from '../../context/LanguageContext';

const BreakingTicker = () => {
  const navigate = useNavigate();
  const { getBreakingNews, allArticles, loading } = useNews();
  const { t } = useLang();

  const tickerArticles = (() => {
    const b = getBreakingNews();
    return b.length > 0 ? b : allArticles.slice(0, 10);
  })();

  const handleClick = (article) => {
    if (article.id) {
      navigate(`/article/${article.id}`);
    }
  };

  const items = loading
    ? <span style={{ color: '#fff', fontSize: '12px' }}>{t('loadingNews')}</span>
    : tickerArticles.map((item, i) => (
        <React.Fragment key={i}>
          <span
            onClick={() => handleClick(item)}
            style={{
              color: '#fff',
              fontSize: '12.5px',
              fontFamily: "'Mukta','Noto Sans Devanagari',sans-serif",
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              padding: '0 6px',
              transition: 'opacity .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '.7'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            {item.title}
          </span>
          <span style={{ color: 'rgba(255,255,255,.35)', fontSize: '6px', margin: '0 10px' }}>◆</span>
        </React.Fragment>
      ));

  return (
    <div style={{ background: '#CC0000', width: '100%' }}>
    <div className="container" style={{ padding: 0 }}>
    <div style={{
      display: 'flex',
      alignItems: 'stretch',
      height: '34px',
      overflow: 'hidden',
      width: '100%',
    }}>
      {/* Label */}
      <div style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '0 14px',
        background: '#000',
        borderRight: '1px solid rgba(255,255,255,.15)',
        whiteSpace: 'nowrap',
      }}>
        <span style={{
          width: '6px', height: '6px',
          borderRadius: '50%',
          background: '#CC0000',
          flexShrink: 0,
          animation: 'tickerDotPulse 1.2s ease-in-out infinite',
        }} />
        <span style={{
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#fff',
        }}>
          {t('breakingNews')}
        </span>
      </div>

      {/* Scrolling text */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          paddingLeft: '20px',
          animation: loading ? 'none' : 'tickerScroll 45s linear infinite',
        }}
          onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>{items}</span>
          {!loading && <span style={{ display: 'inline-flex', alignItems: 'center' }} aria-hidden="true">{items}</span>}
        </div>
      </div>

      <style>{`
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes tickerDotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .3; transform: scale(.6); }
        }
      `}</style>
    </div>
    </div>
    </div>
  );
};

export default BreakingTicker;
