import React from 'react';
import { NavLink } from 'react-router-dom';
import { CATEGORIES } from '../../utils/constants';
import { useLang } from '../../context/LanguageContext';

const MobileCategoryBar = () => {
  const { lang } = useLang();

  return (
    <div className="mobile-cat-bar d-lg-none">
      {CATEGORIES.map((cat) => (
        <NavLink
          key={cat.slug}
          to={`/category/${cat.slug}`}
          className={({ isActive }) => `mobile-cat-pill${isActive ? ' active' : ''}`}
        >
          <span className="mobile-cat-emoji">{cat.emoji}</span>
          <span className="mobile-cat-label">{lang === 'EN' ? cat.labelEn : cat.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default MobileCategoryBar;
