import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../utils/constants';
import { useLang } from '../../context/LanguageContext';
import '../../styles/hero.css';

const CategoryQuickLinks = () => {
  const { lang } = useLang();

  return (
    <div className="category-quicklinks" data-aos="fade-up">
      <div className="category-quicklinks-inner">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            to={`/category/${cat.slug}`}
            className="quick-pill"
          >
            <span>{cat.emoji}</span>
            <span>{lang === 'EN' ? cat.labelEn : cat.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryQuickLinks;
