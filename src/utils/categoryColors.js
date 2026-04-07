import { CATEGORIES } from './constants';

export const getCategoryColor = (slug) => {
  const cat = CATEGORIES.find(c => c.slug === slug);
  return cat ? cat.color : '#CC0000';
};

export const getCategoryLabel = (slug) => {
  const cat = CATEGORIES.find(c => c.slug === slug);
  return cat ? cat.label : slug;
};

export const getCategoryLabelEn = (slug) => {
  const cat = CATEGORIES.find(c => c.slug === slug);
  return cat ? cat.labelEn : slug;
};

export const getCategoryEmoji = (slug) => {
  const cat = CATEGORIES.find(c => c.slug === slug);
  return cat ? cat.emoji : '📰';
};

export const getCategoryBySlug = (slug) => {
  return CATEGORIES.find(c => c.slug === slug) || null;
};
