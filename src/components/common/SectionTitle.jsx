import React from 'react';

const SectionTitle = ({ title, subtitle, aos = 'fade-right' }) => {
  return (
    <div className="section-title-wrapper mb-4" data-aos={aos}>
      <div
        style={{
          borderLeft: '4px solid var(--primary)',
          paddingLeft: '15px',
          position: 'relative',
        }}
      >
        <h2
          style={{
            fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
            fontSize: '2rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {title}
          <span
            style={{
              display: 'inline-block',
              width: '40px',
              height: '3px',
              backgroundColor: 'var(--accent)',
              marginLeft: '10px',
              verticalAlign: 'middle',
            }}
          />
        </h2>
        {subtitle && (
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              margin: '5px 0 0 0',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionTitle;
