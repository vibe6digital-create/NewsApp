import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { fetchAllFeeds, fetchPriorityFeeds, filterByCategory, searchArticles as searchFn, wakeUpBackend } from '../services/rssService';
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
  const [feedsComplete, setFeedsComplete] = useState(false);
  const [error, setError] = useState(null);
  const { lang } = useLang();

  const fetchNews = useCallback(async (force = false) => {
    setError(null);
    setFeedsComplete(false);
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
      setFeedsComplete(true);
    } catch (err) {
      console.error('Feed fetch error:', err);
      setError('कुछ समाचार स्रोतों से कनेक्ट नहीं हो पाया।');
      setLoading(false);
      setFeedsComplete(true);
    }
  }, []);

  useEffect(() => {
    // Wake up Render backend immediately (free tier cold-starts in 30-45s)
    wakeUpBackend();
    fetchNews(false);
    // Warmup refreshes: Render wakes in 30-60s — re-fetch state feeds once warm.
    const warmupTimer1 = setTimeout(() => fetchNews(true), 45000);
    const warmupTimer2 = setTimeout(() => fetchNews(true), 90000); // backup for slow cold starts
    const interval = setInterval(() => fetchNews(true), AUTO_REFRESH_INTERVAL);
    return () => {
      clearTimeout(warmupTimer1);
      clearTimeout(warmupTimer2);
      clearInterval(interval);
    };
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

  // Returns category-filtered articles from allArticles; falls back to rawArticles
  // (same language) so sections are never empty.
  const getCategoryWithFallback = useCallback((cat) => {
    const primary = filterByCategory(allArticles, cat);
    if (primary.length > 0) return primary;
    const preferredLang = lang === 'EN' ? 'en' : 'hi';
    return rawArticles.filter(a => a.category === cat && a.lang === preferredLang);
  }, [allArticles, rawArticles, lang]);

  const value = {
    allArticles,
    rawArticles,
    loading,
    feedsComplete,
    error,
    fetchNews,
    getBreakingNews,
    getFeatured,
    getByCategory,
    getCategoryWithFallback,
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
