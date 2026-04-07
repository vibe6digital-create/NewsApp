import React from 'react';

const SubNavTabs = ({ subsections, activeTab, onTabChange, lang }) => {
  const handleClick = (key) => {
    onTabChange(key);
    setTimeout(() => {
      document.getElementById(`section-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div className="subnav-tabs" data-aos="fade-down" data-aos-duration="500">
      {subsections.map(s => {
        const isActive = activeTab === s.key;
        return (
          <button
            key={s.key}
            onClick={() => handleClick(s.key)}
            style={{
              padding: '10px 16px',
              minHeight: '44px',
              border: 'none',
              background: 'transparent',
              color: isActive ? '#FFD700' : 'var(--text-muted)',
              borderBottom: isActive ? `3px solid ${s.color}` : '3px solid transparent',
              fontWeight: isActive ? 700 : 400,
              fontSize: 13,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              flexShrink: 0,
              fontFamily: "'Noto Sans Devanagari', 'Noto Sans', sans-serif",
            }}
          >
            <span>{s.emoji}</span>
            <span>{lang === 'hi' ? s.label : s.labelEn}</span>
            {isActive && (
              <span style={{
                display: 'none',
                width: '6px', height: '6px', borderRadius: '50%',
                background: s.color, marginLeft: '2px',
              }} className="d-sm-none d-block" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default SubNavTabs;
