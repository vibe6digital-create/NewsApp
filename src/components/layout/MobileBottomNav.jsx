import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLang();
  const { user, openAuthModal } = useAuth();

  const navItems = [
    { icon: 'fas fa-home', labelKey: 'home', path: '/' },
    { icon: 'fas fa-search', labelKey: 'search', path: '/search' },
    { icon: 'fas fa-folder', labelKey: 'categories', path: '/category/education' },
    { icon: 'fas fa-bell', labelKey: 'subscribeCTA', action: 'subscribe' },
  ];

  const handleClick = (item) => {
    if (item.action === 'subscribe') {
      if (user) {
        // Already subscribed — scroll to subscription section
        const el = document.getElementById('subscription-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        openAuthModal();
      }
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="mobile-bottom-nav d-flex d-md-none">
      {navItems.map((item, idx) => (
        <div
          key={idx}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => handleClick(item)}
        >
          <i className={item.icon}></i>
          <span>{t(item.labelKey)}</span>
        </div>
      ))}
    </div>
  );
};

export default MobileBottomNav;
