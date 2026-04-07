import React, { useMemo } from 'react';
import { useNews } from '../../context/NewsContext';
import { useLang } from '../../context/LanguageContext';
import NewsCard from '../news/NewsCard';
import NewsCardHorizontal from '../news/NewsCardHorizontal';
import SectionTitle from '../common/SectionTitle';
import AdBanner from '../layout/AdBanner';
import LoadingSpinner from '../common/LoadingSpinner';

const INDIA_SOURCES = ['Dainik Bhaskar', 'Amar Ujala', 'Dainik Jagran', 'The Hindu', 'Hindustan Times'];

const IndiaSection = () => {
  const { getByCategory, getBySource, loading } = useNews();
  const { t } = useLang();

  const articles = useMemo(() => {
    const catArticles = getByCategory('national');
    const sourceArticles = getBySource(INDIA_SOURCES);
    const merged = [...catArticles];
    sourceArticles.forEach(a => {
      if (!merged.find(m => m.id === a.id)) merged.push(a);
    });
    return merged.slice(0, 10);
  }, [getByCategory, getBySource]);

  if (loading) return <div className="container"><LoadingSpinner /></div>;
  if (articles.length === 0) return null;

  const leadArticle = articles[0];
  const gridArticles = articles.slice(1, 5);
  const horizontalArticles = articles.slice(5, 10);

  return (
    <section className="py-4" data-aos="fade-up">
      <SectionTitle title={t('indiaNews')} />

      <div className="row g-3">
        <div className="col-lg-5" data-aos="fade-up" data-aos-delay="100">
          <NewsCard article={leadArticle} size="lg" />
        </div>
        <div className="col-lg-7">
          <div className="row g-3">
            {gridArticles.map((article, i) => (
              <div className="col-6" key={article.id} data-aos="fade-up" data-aos-delay={150 + i * 50}>
                <NewsCard article={article} size="sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-3">
        <AdBanner size="728x90" />
      </div>

      {horizontalArticles.length > 0 && (
        <div className="mt-3">
          {horizontalArticles.map((article, i) => (
            <div key={article.id} data-aos="fade-up" data-aos-delay={100 + i * 50}>
              <NewsCardHorizontal article={article} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default IndiaSection;
