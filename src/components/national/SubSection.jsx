import React, { useState, useRef } from 'react';
import NewsCard from '../news/NewsCard';

const SubSection = ({ subsection, articles, lang, aosDelay }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const sectionRef = useRef(null);

  const isPhoto    = subsection.key === 'photo';

  const displayArticles = isPhoto
    ? articles.filter(a => a.image && a.image !== '/placeholder.jpg').slice(0, visibleCount)
    : articles.slice(0, visibleCount);

  const totalCount = isPhoto
    ? articles.filter(a => a.image && a.image !== '/placeholder.jpg').length
    : articles.length;

  return (
    <section
      id={`section-${subsection.key}`}
      ref={sectionRef}
      data-aos="fade-up"
      data-aos-delay={aosDelay}
      style={{ marginBottom: 32, scrollMarginTop: 120 }}
    >
      {/* Section header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 16,
        borderLeft: `4px solid ${subsection.color}`,
        paddingLeft: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h2 style={{
            fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', margin: 0,
            fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
            display: 'inline',
          }}>
            {lang === 'hi' ? subsection.label : subsection.labelEn}
          </h2>
          {totalCount > 0 && (
            <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
              {totalCount} {lang === 'hi' ? 'खबरें' : 'stories'}
            </span>
          )}
        </div>
{/* Load more button below handles showing more articles */}
      </div>

      {/* Empty state */}
      {totalCount === 0 && (
        <div style={{
          textAlign: 'center', padding: '32px 20px',
          color: 'var(--text-muted)', border: '1px dashed var(--card-border)', borderRadius: 10,
        }}>
          <p style={{ fontSize: 24, margin: '0 0 6px' }}>📭</p>
          <p style={{ fontFamily: "'Noto Sans Devanagari', 'Noto Sans', sans-serif", fontSize: 13 }}>
            {lang === 'hi' ? 'आज कोई खबर उपलब्ध नहीं' : 'No news available for today'}
          </p>
        </div>
      )}

      {/* Card grid */}
      {totalCount > 0 && (
        <div className="row g-3">
          {displayArticles.map((article, i) => (
            <div
              key={article.id}
              className={i === 0 ? 'col-12 col-md-8' : 'col-12 col-sm-6 col-md-4'}
              data-aos="fade-up"
              data-aos-delay={i * 60}
            >
              <NewsCard article={article} size={i === 0 ? 'lg' : 'sm'} />
            </div>
          ))}
        </div>
      )}

      {/* Load more */}
      {totalCount > visibleCount && (
        <div data-aos="zoom-in" style={{ textAlign: 'center', marginTop: 20 }}>
          <button
            onClick={() => setVisibleCount(v => v + 4)}
            className="btn btn-primary-red px-4 py-2"
          >
            {lang === 'hi' ? 'और खबरें देखें' : 'Load More'} <i className="fas fa-chevron-down ms-2"></i>
          </button>
        </div>
      )}
    </section>
  );
};

export default SubSection;
