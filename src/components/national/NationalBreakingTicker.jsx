import React, { useState, useEffect } from 'react';

const BREAKING_KEYWORDS = ['breaking','ब्रेकिंग','urgent','अर्जेंट','alert','अलर्ट'];

const NationalBreakingTicker = ({ articles }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const headlines = (() => {
    const breaking = articles.filter(a =>
      BREAKING_KEYWORDS.some(kw => a.title.toLowerCase().includes(kw.toLowerCase()))
    );
    return (breaking.length > 0 ? breaking : articles).slice(0, 6);
  })();

  useEffect(() => {
    if (!headlines.length) return;
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % headlines.length);
        setVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(timer);
  }, [headlines.length]);

  if (!headlines.length) return null;

  return (
    <div style={{ background: '#CC0000', display: 'flex', alignItems: 'center', height: '36px', overflow: 'hidden' }}>
      <span style={{
        background: 'rgba(0,0,0,0.25)', color: '#FFD700', fontWeight: 700,
        letterSpacing: '2px', padding: '4px 12px', fontSize: '11px', whiteSpace: 'nowrap', flexShrink: 0,
      }}>
        🔴 ब्रेकिंग
      </span>
      <div
        className={visible ? 'ticker-animate' : ''}
        style={{
          color: '#fff', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis',
          whiteSpace: 'nowrap', flex: 1, padding: '0 12px',
          opacity: visible ? 1 : 0, transition: 'opacity 0.3s',
        }}
      >
        {headlines[index]?.title}
      </div>
      <span style={{
        color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', fontSize: '10px',
        letterSpacing: '2px', padding: '0 12px', flexShrink: 0,
      }}>
        LIVE
      </span>
    </div>
  );
};

export default NationalBreakingTicker;
