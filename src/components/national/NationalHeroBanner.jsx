import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const NationalHeroBanner = ({ articleCount }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="800"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #1a0000 0%, #330000 50%, #0A0A0A 100%)'
          : 'linear-gradient(135deg, #fff5f5 0%, #ffe0e0 50%, #ffffff 100%)',
        padding: '48px 20px 36px',
        textAlign: 'center',
        borderBottom: '2px solid #CC0000',
      }}
    >
      <h1 style={{
        fontFamily: "'Noto Sans Devanagari', 'Noto Sans', sans-serif",
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
        fontWeight: 800,
        color: isDark ? '#fff' : '#111',
        margin: '0 0 12px',
      }}>
        देश की खबरें
      </h1>
      <div style={{
        borderLeft: '4px solid #FFD700',
        paddingLeft: '16px',
        display: 'inline-block',
        textAlign: 'left',
        marginBottom: '20px',
      }}>
        <p style={{
          fontFamily: "'Noto Sans Devanagari', 'Noto Sans', sans-serif",
          fontSize: 'clamp(0.85rem, 2vw, 1rem)',
          color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.65)',
          margin: 0,
          lineHeight: 1.6,
        }}>
          राजनीति, संसद, अर्थव्यवस्था, रक्षा और देश के हर कोने की ताज़ी खबरें
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', marginTop: '8px' }}>
        {[
          { label: 'कुल खबरें', value: articleCount || '...' },
          { label: 'स्रोत', value: '6' },
          { label: 'अपडेट', value: '30 मिनट पहले' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFD700' }}>{stat.value}</div>
            <div style={{ fontSize: '11px', color: isDark ? '#888' : '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NationalHeroBanner;
