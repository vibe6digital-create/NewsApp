import React, { useState } from 'react';
import NewsCard from '../news/NewsCard';
import NewsCardHorizontal from '../news/NewsCardHorizontal';
import SectionTitle from '../common/SectionTitle';

const StateSection = ({ title, emoji, articles = [], showTabs = false, tabs = [] }) => {
  const [activeTab, setActiveTab] = useState(tabs.length > 0 ? tabs[0] : '');

  if (articles.length === 0) return null;

  // If tabs exist, filter articles by active tab keyword
  let filteredArticles = articles;
  if (showTabs && activeTab) {
    const keyword = activeTab.toLowerCase();
    const filtered = articles.filter(a => {
      const text = `${a.title} ${a.summary} ${a.source}`.toLowerCase();
      return text.includes(keyword);
    });
    filteredArticles = filtered.length > 0 ? filtered : articles;
  }

  const gridArticles = filteredArticles.slice(0, 6);
  const horizontalArticles = filteredArticles.slice(6, 10);

  return (
    <section className="py-4" data-aos="fade-up">
      <SectionTitle title={title} />

      {showTabs && tabs.length > 0 && (
        <div className="d-flex gap-2 flex-wrap mb-3" data-aos="flip-up">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`quick-pill ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              style={{ fontSize: '12px', padding: '5px 14px', border: 'none', cursor: 'pointer' }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {showTabs ? (
        <div
          className="d-flex gap-3 pb-2"
          style={{ overflowX: 'auto', scrollbarWidth: 'none' }}
          data-aos="slide-right"
        >
          {gridArticles.map((article) => (
            <div key={article.id} style={{ minWidth: '280px', flex: '0 0 auto' }}>
              <NewsCard article={article} size="sm" />
            </div>
          ))}
        </div>
      ) : (
        <div className="row g-3">
          {gridArticles.map((article, i) => (
            <div className="col-md-4 col-6" key={article.id} data-aos="fade-up" data-aos-delay={100 + i * 50}>
              <NewsCard article={article} size="sm" />
            </div>
          ))}
        </div>
      )}

      {horizontalArticles.length > 0 && !showTabs && (
        <div className="mt-3">
          {horizontalArticles.map((article) => (
            <NewsCardHorizontal key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
};

export default StateSection;
