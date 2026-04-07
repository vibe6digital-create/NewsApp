import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../utils/constants';
import { useLang } from '../../context/LanguageContext';
import { STATES_CONFIG } from '../../pages/StatePage';
import '../../styles/header.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [statesOpen, setStatesOpen] = useState(false);
  const { lang, t } = useLang();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setStatesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navCategories = CATEGORIES.filter(cat =>
    ['national', 'world', 'education', 'jobs', 'health', 'technology', 'astro'].includes(cat.slug)
  );

  const handleStateClick = (slug) => {
    setStatesOpen(false);
    setCollapsed(true);
    navigate(`/state/${slug}`);
  };

  return (
    <nav className={`main-navbar navbar navbar-expand-lg ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          aria-expanded={!collapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${collapsed ? '' : 'show'}`}>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setCollapsed(true)}
              >
                {t('home')}
              </NavLink>
            </li>

            {navCategories.map((cat) => (
              <li className="nav-item" key={cat.slug}>
                <NavLink
                  to={`/category/${cat.slug}`}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setCollapsed(true)}
                >
                  {lang === 'EN' ? cat.labelEn : cat.label}
                </NavLink>
              </li>
            ))}

            {/* States Dropdown */}
            <li className="nav-item" ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                className="nav-link"
                onClick={() => setStatesOpen(prev => !prev)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  color: statesOpen ? '#fff' : 'var(--text-secondary)',
                  padding: '11px 14px',
                  fontSize: '14px',
                  fontWeight: 500,
                  width: '100%',
                }}
              >
                {lang === 'EN' ? 'States' : 'राज्य'}
                <span style={{
                  fontSize: '8px',
                  transform: statesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  display: 'inline-block',
                }}>▼</span>
              </button>

              {statesOpen && (
                <div className="states-dropdown" style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  background: 'var(--dark-2)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '8px',
                  minWidth: '180px',
                  zIndex: 1000,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                  padding: '6px 0',
                  maxHeight: '320px',
                  overflowY: 'auto',
                }}>
                  {STATES_CONFIG.map(state => (
                    <button
                      key={state.slug}
                      onClick={() => handleStateClick(state.slug)}
                      style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        background: 'none', border: 'none', cursor: 'pointer',
                        padding: '9px 18px',
                        color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 500,
                        transition: 'background 0.15s, color 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--dark-3)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >
                      {state.emoji} {lang === 'EN' ? state.labelEn : state.labelHi}
                    </button>
                  ))}
                </div>
              )}
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
