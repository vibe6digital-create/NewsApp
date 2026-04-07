import { ARTICLES_KEY } from '../utils/constants';

const getArticles = () => {
  try {
    const data = localStorage.getItem(ARTICLES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveArticles = (articles) => {
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
};

export const getAllAdminArticles = () => {
  return getArticles();
};

export const getAdminArticle = (id) => {
  const articles = getArticles();
  return articles.find(a => a.id === id) || null;
};

export const addArticle = (articleData) => {
  const articles = getArticles();
  const newArticle = {
    ...articleData,
    id: 'admin_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 0,
    isAdmin: true,
    isRss: false,
  };
  articles.unshift(newArticle);
  saveArticles(articles);
  return newArticle;
};

export const updateArticle = (id, data) => {
  const articles = getArticles();
  const index = articles.findIndex(a => a.id === id);
  if (index === -1) return null;
  articles[index] = { ...articles[index], ...data, updatedAt: new Date().toISOString() };
  saveArticles(articles);
  return articles[index];
};

export const deleteArticle = (id) => {
  const articles = getArticles();
  const filtered = articles.filter(a => a.id !== id);
  saveArticles(filtered);
  return true;
};

export const toggleArticleVisibility = (id) => {
  const articles = getArticles();
  const article = articles.find(a => a.id === id);
  if (!article) return null;
  article.status = article.status === 'published' ? 'draft' : 'published';
  article.updatedAt = new Date().toISOString();
  saveArticles(articles);
  return article;
};

export const getPublishedAdminArticles = () => {
  return getArticles().filter(a => a.status === 'published');
};

export const getFeaturedArticles = () => {
  return getArticles().filter(a => a.featured && a.status === 'published');
};

export const getBreakingArticles = () => {
  return getArticles().filter(a => a.breaking && a.status === 'published');
};
