import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PORTAL_NAME } from '../utils/constants';
import { useLang } from '../context/LanguageContext';

const NotFoundPage = () => {
  const { t } = useLang();

  return (
    <>
      <Helmet>
        <title>404 | {PORTAL_NAME}</title>
      </Helmet>
      <div
        className="d-flex flex-column align-items-center justify-content-center text-center"
        style={{ minHeight: '60vh', padding: '40px 20px' }}
      >
        <h1
          style={{
            fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
            fontSize: '8rem',
            fontWeight: 700,
            color: '#CC0000',
            lineHeight: 1,
            marginBottom: '8px',
          }}
        >
          404
        </h1>
        <p style={{ color: '#888', fontSize: '20px', marginBottom: '24px' }}>
          {t('pageNotFound')}
        </p>
        <Link
          to="/"
          className="btn btn-primary-red px-4 py-2"
        >
          <i className="fas fa-home me-2"></i>
          {t('goHome')}
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
