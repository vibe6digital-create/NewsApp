import React from 'react';
import { useLang } from '../../context/LanguageContext';
import NewsCardHorizontal from './NewsCardHorizontal';

const RelatedNews = ({ articles = [], title }) => {
  const { t } = useLang();
  const displayArticles = articles.slice(0, 6);
  const heading = title || t('relatedNewsTitle');

  return (
    <section className="related-news">
      <h4
        className="section-title mb-3"
        style={{
          borderLeft: '4px solid #f5c518',
          paddingLeft: '10px',
          fontWeight: 700,
        }}
      >
        {heading}
      </h4>

      {displayArticles.map((article, index) => (
        <div key={article.id || index} data-aos="fade-left" data-aos-delay={index * 100}>
          <NewsCardHorizontal article={article} />
        </div>
      ))}
    </section>
  );
};

export default RelatedNews;
