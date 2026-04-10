import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { fetchAllFeeds, fetchPriorityFeeds, filterByCategory, searchArticles as searchFn } from '../services/rssService';
import { getPublishedAdminArticles, getBreakingArticles, getFeaturedArticles } from '../services/adminService';
import { useLang } from './LanguageContext';
import { AUTO_REFRESH_INTERVAL } from '../utils/constants';

const NewsContext = createContext();

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) throw new Error('useNews must be used within NewsProvider');
  return context;
};

/** Merge incoming articles into existing ones — newer real articles win, never removes content */
const mergeArticles = (existing, incoming) => {
  const map = new Map(existing.map(a => [a.id, a]));
  incoming.forEach(a => map.set(a.id, a));        // real RSS overwrites sample placeholders
  const merged = Array.from(map.values());
  merged.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  return merged;
};

export const NewsProvider = ({ children }) => {
  const [rawArticles, setRawArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { lang } = useLang();

  const fetchNews = useCallback(async (force = false) => {
    setError(null);
    const adminArticles = getPublishedAdminArticles();

    try {
      // Step 1: priority / cached feeds — fast
      const priorityArticles = await fetchPriorityFeeds();
      if (priorityArticles.length > 0) {
        setRawArticles(prev => mergeArticles(prev, [...adminArticles, ...priorityArticles]));
      }
      setLoading(false);

      // Step 2: remaining feeds — background, never clears existing content
      const allRss = await fetchAllFeeds(force);
      if (allRss.length > 0) {
        setRawArticles(prev => mergeArticles(prev, [...adminArticles, ...allRss]));
      }
    } catch (err) {
      console.error('Feed fetch error:', err);
      setError('कुछ समाचार स्रोतों से कनेक्ट नहीं हो पाया।');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(false);
    const interval = setInterval(() => fetchNews(true), AUTO_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchNews]);

  // Strictly filter by selected language — no exceptions.
  const allArticles = useMemo(() => {
    const preferredLang = lang === 'EN' ? 'en' : 'hi';
    return rawArticles
      .filter(a => a.lang === preferredLang)
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  }, [rawArticles, lang]);

  const getBreakingNews = useCallback(() => {
    const adminBreaking = getBreakingArticles();
    if (adminBreaking.length > 0) return adminBreaking;
    const breaking = allArticles.filter(a => a.breaking);
    return breaking.length > 0 ? breaking.slice(0, 5) : allArticles.slice(0, 5);
  }, [allArticles]);

  const getFeatured = useCallback(() => {
    const adminFeatured = getFeaturedArticles();
    if (adminFeatured.length > 0) return adminFeatured;
    const featured = allArticles.filter(a => a.featured);
    if (featured.length >= 3) return featured.slice(0, 5);
    return allArticles.slice(0, 5);
  }, [allArticles]);

  const getByCategory = useCallback((cat) => {
    return filterByCategory(allArticles, cat);
  }, [allArticles]);

  const getBySource = useCallback((sources) => {
    return allArticles.filter(a => sources.includes(a.source));
  }, [allArticles]);

  const searchNews = useCallback((query) => {
    return searchFn(allArticles, query);
  }, [allArticles]);

  const getArticleById = useCallback((id) => {
    return rawArticles.find(a => a.id === id) || null;
  }, [rawArticles]);

  const value = {
    allArticles,
    loading,
    error,
    fetchNews,
    getBreakingNews,
    getFeatured,
    getByCategory,
    getBySource,
    searchNews,
    getArticleById,
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
};
