import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PORTAL_NAME, PORTAL_NAME_EN, PORTAL_SLOGAN, PORTAL_SLOGAN_EN } from '../../utils/constants';
import { formatNewsDate, formatNewsDateHindi } from '../../utils/formatDate';
import { useLang } from '../../context/LanguageContext';
import { useNews } from '../../context/NewsContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import '../../styles/header.css';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { lang, setLang, t } = useLang();
  useNews();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, unsubscribe, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
              <a href="https://www.facebook.com/KaushalPrimeNation/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f" /></a>
              <a href="https://www.instagram.com/kaushalprimenation/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /></a>
              <a href="https://youtube.com/@kaushalprimenation" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube" /></a>
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
                  <div className="brand-top">
                    <img
                      src="/logo.png"
                      alt="Kaushal Prime Nation"
                      className="brand-logo"
                      style={{ width: 'auto', objectFit: 'contain' }}
                    />
                    <span className="brand-hindi">{lang === 'EN' ? PORTAL_NAME_EN : PORTAL_NAME}</span>
                  </div>
                  <span className="brand-slogan">{lang === 'EN' ? PORTAL_SLOGAN_EN : PORTAL_SLOGAN}</span>
                </div>
              </Link>
              <div className="header-actions">
                <button className="btn-search" onClick={() => setIsSearchOpen(true)} aria-label="Search">
                  <i className="fas fa-search" />
                </button>
                {user ? (
                  <div className="user-profile-dropdown" style={{ position: 'relative' }}>
                    <button
                      className="user-avatar-btn"
                      onClick={() => {
                        const el = document.getElementById('userDropdown');
                        if (el) el.style.display = el.style.display === 'block' ? 'none' : 'block';
                      }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                      }}
                    >
                      <div
                        style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: '#CC0000', color: '#fff', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          fontWeight: 700, fontSize: 14, textTransform: 'uppercase',
                        }}
                      >
                        {user.name?.charAt(0)}
                      </div>
                      <span style={{ color: 'var(--text-primary)', fontSize: 13, fontWeight: 600, maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {user.name}
                      </span>
                      <i className="fas fa-chevron-down" style={{ fontSize: 10, color: 'var(--text-muted)' }}></i>
                    </button>
                    <div
                      id="userDropdown"
                      style={{
                        display: 'none', position: 'absolute', top: '100%', right: 0,
                        background: 'var(--dark-2)', border: '1px solid var(--card-border)',
                        borderRadius: 8, padding: '8px 0', minWidth: 180, zIndex: 999,
                        marginTop: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                      }}
                    >
                      <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--card-border)', marginBottom: 4 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{user.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{user.email}</div>
                      </div>
                      <button
                        onClick={async () => {
                          if (!window.confirm(lang === 'EN'
                            ? 'Are you sure you want to unsubscribe? Your account will be removed.'
                            : 'क्या आप सदस्यता रद्द करना चाहते हैं? आपका खाता हटा दिया जाएगा।'
                          )) return;
                          try {
                            await unsubscribe();
                            document.getElementById('userDropdown').style.display = 'none';
                          } catch {}
                        }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                          background: 'none', border: 'none', padding: '8px 16px',
                          color: '#ef4444', fontSize: 13,
                          cursor: 'pointer', textAlign: 'left',
                        }}
                      >
                        <i className="fas fa-bell-slash"></i>
                        {lang === 'EN' ? 'Unsubscribe' : 'सदस्यता रद्द करें'}
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          document.getElementById('userDropdown').style.display = 'none';
                        }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                          background: 'none', border: 'none', padding: '8px 16px',
                          color: 'var(--text-muted)', fontSize: 13,
                          cursor: 'pointer', textAlign: 'left',
                        }}
                      >
                        <i className="fas fa-sign-out-alt"></i>
                        {t('logout')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="btn-subscribe"
                    onClick={openAuthModal}
                    style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <i className="fas fa-user" /> {t('subscribeCTA')}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
