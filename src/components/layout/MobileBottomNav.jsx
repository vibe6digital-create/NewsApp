import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLang();

  const navItems = [
    { icon: 'fas fa-home', labelKey: 'home', path: '/' },
    { icon: 'fas fa-search', labelKey: 'search', path: '/search' },
    { icon: 'fas fa-folder', labelKey: 'categories', path: '/category/education' },
    { icon: 'fas fa-envelope', labelKey: 'subscribeCTA', action: 'scroll' },
  ];

  const handleClick = (item) => {
    if (item.action === 'scroll') {
      const el = document.getElementById('subscription-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const target = document.getElementById('subscription-section');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 500);
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
