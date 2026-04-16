import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useNews } from '../context/NewsContext';
import { useAdmin } from '../context/AdminContext';
import { useLang } from '../context/LanguageContext';
import { PORTAL_NAME } from '../utils/constants';
import ArticleDetail from '../components/news/ArticleDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ArticlePage = () => {
  const { id } = useParams();
  const { getArticleById, rawArticles, loading } = useNews();
  const { getArticle } = useAdmin();
  const { t, lang } = useLang();
  const preferredLang = lang === 'EN' ? 'en' : 'hi';

  // getArticleById already filters by lang; apply same check to admin fallback
  const rawAdmin = getArticle(id);
  const article = getArticleById(id) ||
    ((rawAdmin?.lang || 'hi') === preferredLang ? rawAdmin : null);

  // Still fetching feeds — don't show "not found" yet
  if (!article && loading) {
    return (
      <div className="container py-5" style={{ minHeight: '60vh' }}>
        <LoadingSpinner count={3} />
      </div>
    );
  }

  if (!article) {
    // Article exists but is in the other language
    const existsInOtherLang = rawArticles.some(a => a.id === id) ||
      (rawAdmin && (rawAdmin.lang || 'hi') !== preferredLang);
    const langMismatchMsg = lang === 'EN'
      ? 'This article is not available in English.'
      : 'यह खबर हिंदी में उपलब्ध नहीं है।';

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
          {existsInOtherLang ? langMismatchMsg : t('articleNotFoundDesc')}
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
        <div className="row justify-content-center">
          <div className="col-lg-8" data-aos="fade-up" style={{ maxWidth: '780px' }}>
            <ArticleDetail article={article} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlePage;
