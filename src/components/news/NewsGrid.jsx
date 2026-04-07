import React from 'react';
import NewsCard from './NewsCard';
import NewsCardHorizontal from './NewsCardHorizontal';

const NewsGrid = ({
  articles = [],
  columns = 3,
  showHorizontal = false,
  horizontalCount = 4,
}) => {
  const colClass = `col-md-${12 / columns}`;

  return (
    <>
      <div className="row">
        {articles.map((article, index) => (
          <div
            className={colClass}
            key={article.id || index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <NewsCard article={article} />
          </div>
        ))}
      </div>

      {showHorizontal && articles.length > 0 && (
        <div className="mt-4">
          {articles.slice(0, horizontalCount).map((article, index) => (
            <div
              key={`h-${article.id || index}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <NewsCardHorizontal article={article} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NewsGrid;
