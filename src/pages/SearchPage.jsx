import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useNews } from '../context/NewsContext';
import { useLang } from '../context/LanguageContext';
import { PORTAL_NAME } from '../utils/constants';
import NewsCard from '../components/news/NewsCard';
import VideoNewsSection from '../components/home/VideoNewsSection';

const YT_CHANNEL_URL = 'https://www.youtube.com/@kaushalprimenation';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { searchNews, loading } = useNews();
  const { t, lang } = useLang();

  const isVideoSearch = ['video', 'videos', 'वीडियो'].includes(query.trim().toLowerCase());


  const results = query && !isVideoSearch ? searchNews(query) : [];

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

        ) : isVideoSearch ? (
          <div className="py-2">
            <div className="d-flex align-items-center gap-3 mb-4">
              <i className="fa-brands fa-youtube" style={{ fontSize: '2rem', color: '#CC0000' }} />
              <h2 style={{ fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif", fontSize: '1.5rem', color: '#fff', margin: 0 }}>
                {lang === 'EN' ? 'KPN YouTube Videos' : 'KPN YouTube वीडियो'}
              </h2>
              <a
                href={YT_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#CC0000', color: '#fff', borderRadius: 20,
                  padding: '6px 18px', fontSize: 13, fontWeight: 600,
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginLeft: 'auto',
                }}
              >
                <i className="fa-brands fa-youtube" />
                {lang === 'EN' ? 'View Channel' : 'चैनल देखें'}
              </a>
            </div>
            <VideoNewsSection />
          </div>

        ) : loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>

        ) : (
          <>
            <h2 style={{
              fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
              fontSize: '1.5rem', color: '#fff', marginBottom: '20px',
            }}>
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
