import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PORTAL_NAME, PORTAL_NAME_EN } from '../../utils/constants';
import { formatNewsDate, formatNewsDateHindi } from '../../utils/formatDate';
import { useLang } from '../../context/LanguageContext';
import { useNews } from '../../context/NewsContext';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/header.css';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { lang, setLang, t } = useLang();
  useNews();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) { navigate(`/search?q=${encodeURIComponent(q)}`); setIsSearchOpen(false); setSearchQuery(''); }
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribeClick = () => {
    const section = document.getElementById('subscription-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('subscription-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  const formattedDate = lang === 'EN'
    ? formatNewsDate(currentTime)
    : formatNewsDateHindi(currentTime);

  return (
    <header className="site-header">
      {/* ── Top strip ── */}
      <div className="header-topstrip">
        <div className="container d-flex justify-content-between align-items-center">
          <span className="header-date">
            <i className="far fa-calendar-alt me-1" />
            {formattedDate}
          </span>
          <div className="d-flex align-items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              style={{
                background: 'none', border: '1px solid #2a2a2a',
                color: '#fff', borderRadius: '4px',
                padding: '2px 9px', fontSize: '13px',
                cursor: 'pointer', lineHeight: 1.6,
              }}
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Language toggle */}
            <div className="lang-toggle">
              <span className={lang === 'HI' ? 'active' : ''} onClick={() => setLang('HI')}>हिंदी</span>
              <span className={lang === 'EN' ? 'active' : ''} onClick={() => setLang('EN')}>EN</span>
            </div>
            {/* Social icons */}
            <div className="header-social d-none d-md-flex">
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp" /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f" /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube" /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Logo row ── */}
      <div className="header-logo-row">
        <div className="container d-flex justify-content-between align-items-center">
          {isSearchOpen ? (
            <form onSubmit={handleSearchSubmit} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder') || 'खबर खोजें...'}
                style={{
                  flex: 1, padding: '6px 14px', fontSize: '14px',
                  background: 'var(--input-bg)', border: '1.5px solid var(--primary)',
                  borderRadius: '6px', color: 'var(--text-primary)', outline: 'none',
                  fontFamily: "'Noto Sans Devanagari', sans-serif",
                }}
              />
              <button type="submit" className="btn-search" aria-label="Search">
                <i className="fas fa-search" />
              </button>
              <button type="button" className="btn-search" onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} aria-label="Close">
                <i className="fas fa-times" />
              </button>
            </form>
          ) : (
            <>
              <Link to="/" className="text-decoration-none">
                <div className="portal-brand">
                  <img
                    src="/logo.png"
                    alt="Kaushal Prime Nation"
                    className="brand-logo"
                    style={{ width: 'auto', objectFit: 'contain' }}
                  />
                  <span className="brand-hindi">{lang === 'EN' ? PORTAL_NAME_EN : PORTAL_NAME}</span>
                </div>
              </Link>
              <div className="header-actions">
                <button className="btn-search" onClick={() => setIsSearchOpen(true)} aria-label="Search">
                  <i className="fas fa-search" />
                </button>
                <button className="btn-subscribe" onClick={handleSubscribeClick}>
                  {t('subscribeCTA')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
