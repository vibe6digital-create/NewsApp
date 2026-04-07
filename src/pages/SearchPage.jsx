import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useNews } from '../context/NewsContext';
import { useLang } from '../context/LanguageContext';
import { PORTAL_NAME } from '../utils/constants';
import NewsCard from '../components/news/NewsCard';
const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { searchNews, loading } = useNews();
  const { t } = useLang();

  const results = query ? searchNews(query) : [];

  return (
    <>
      <Helmet>
        <title>{query ? `"${query}" — ${t('searchResults')}` : t('typeToSearch')} | {PORTAL_NAME}</title>
      </Helmet>

      <div className="container py-4">
        {!query ? (
          <div className="text-center py-5">
            <i className="fas fa-search" style={{ fontSize: '4rem', color: '#333', marginBottom: '20px', display: 'block' }}></i>
            <p style={{ color: '#888', fontSize: '18px' }}>{t('typeToSearch')}</p>
          </div>
        ) : loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <h2
              style={{
                fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
                fontSize: '1.5rem',
                color: '#fff',
                marginBottom: '20px',
              }}
            >
              "{query}" {t('searchResults')} — {results.length}
            </h2>

            {results.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-exclamation-circle" style={{ fontSize: '3rem', color: '#CC0000', marginBottom: '16px', display: 'block' }}></i>
                <p style={{ color: '#888', fontSize: '16px' }}>{t('noResults')}</p>
              </div>
            ) : (
              <div className="row g-3">
                {results.map((article) => (
                  <div className="col-lg-4 col-md-6" key={article.id} data-aos="fade-up">
                    <NewsCard article={article} size="sm" />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SearchPage;



