import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useNews } from '../context/NewsContext';
import { useAdmin } from '../context/AdminContext';
import { useLang } from '../context/LanguageContext';
import { PORTAL_NAME } from '../utils/constants';
import ArticleDetail from '../components/news/ArticleDetail';
import RelatedNews from '../components/news/RelatedNews';
import AdBanner from '../components/layout/AdBanner';
import ShareButtons from '../components/common/ShareButtons';

const ArticlePage = () => {
  const { id } = useParams();
  const { getArticleById, allArticles } = useNews();
  const { getArticle } = useAdmin();
  const { t } = useLang();

  const article = getArticleById(id) || getArticle(id);

  if (!article) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
        <div style={{ fontSize: '5rem', marginBottom: '16px' }}>🔍</div>
        <h2
          style={{
            fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
            fontSize: '2rem',
            color: '#fff',
          }}
        >
          {t('articleNotFound')}
        </h2>
        <p style={{ color: '#999' }}>
          {t('articleNotFoundDesc')}
        </p>
        <Link
          to="/"
          className="btn btn-danger mt-3"
          style={{ borderRadius: '30px', padding: '8px 24px' }}
        >
          {t('goToHomepage')}
        </Link>
      </div>
    );
  }

  // Related articles from the same category
  const relatedArticles = allArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 6);

  const articleUrl = `${window.location.origin}/article/${id}`;

  return (
    <>
      <Helmet>
        <title>{article.title} | {PORTAL_NAME}</title>
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary || ''} />
        <meta property="og:image" content={article.image || ''} />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.summary || ''} />
        <meta name="twitter:image" content={article.image || ''} />
      </Helmet>

      <div className="container py-4">
        <div className="row">
          {/* Main Content */}
          <div className="col-lg-8" data-aos="fade-up">
            <ArticleDetail article={article} />
            <ShareButtons url={articleUrl} title={article.title} />
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div data-aos="fade-up" data-aos-delay="100">
              <RelatedNews
                articles={relatedArticles}
                title={t('relatedNewsTitle')}
              />
            </div>

            <div className="mt-4" data-aos="fade-up" data-aos-delay="200">
              <AdBanner size="300x250" />
            </div>

            {/* Mini Subscription Widget */}
            <div
              className="mt-4 p-3"
              data-aos="fade-up"
              data-aos-delay="300"
              style={{
                backgroundColor: '#1A1A2E',
                border: '1px solid #333',
                borderRadius: '12px',
                textAlign: 'center',
              }}
            >
              <h6
                style={{
                  fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
                  color: '#f5c518',
                  fontSize: '1.3rem',
                }}
              >
                {t('newsletterSidebarTitle')}
              </h6>
              <p style={{ color: '#999', fontSize: '13px', marginBottom: '12px' }}>
                {t('newsletterSidebarDesc')}
              </p>
              <input
                type="email"
                className="form-control form-control-sm mb-2"
                placeholder={t('yourEmail')}
                style={{
                  backgroundColor: '#111',
                  border: '1px solid #333',
                  color: '#fff',
                }}
              />
              <button
                className="btn btn-danger btn-sm w-100"
                style={{ borderRadius: '20px', fontWeight: 600 }}
              >
                {t('subscribeBtn')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlePage;
