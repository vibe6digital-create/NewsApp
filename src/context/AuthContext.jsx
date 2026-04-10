import React, { createContext, useContext, useState, useCallback } from 'react';
import { addSubscriber, getAllSubscribers } from '../services/subscriptionService';
import { API_BASE } from '../utils/constants';
import AuthModal from '../components/common/AuthModal';

const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

const USER_KEY = 'kpn_user';
const TOKEN_KEY = 'kpn_token';
const API = API_BASE ? `${API_BASE}/api/auth` : '/api/auth';

/** Try a server API call; returns null if server unavailable */
const tryServer = async (path, body, token = null) => {
  try {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`${API}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return null;
    return await res.json();
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });
  const [showAuthModal, setShowAuthModal] = useState(false);

  const checkUser = useCallback(async (email, mobile) => {
    // Try server first
    const data = await tryServer('/check', { email, mobile });
    if (data?.exists && data?.user) {
      const u = data.user;
      localStorage.setItem(USER_KEY, JSON.stringify(u));
      if (data.token) localStorage.setItem(TOKEN_KEY, data.token);
      setUser(u);
      setShowAuthModal(false);
      return { exists: true };
    }
    if (data?.exists === false) return { exists: false };

    // Local fallback
    const subs = getAllSubscribers() || [];
    const found = subs.find(s =>
      (email && s.email === email) || (mobile && s.mobile === mobile)
    );
    if (found) {
      const u = { id: found.id, name: found.name || email || mobile, email: email || found.email || '', mobile: mobile || found.mobile || '' };
      localStorage.setItem(USER_KEY, JSON.stringify(u));
      setUser(u);
      setShowAuthModal(false);
      setTimeout(() => window.location.reload(), 300);
      return { exists: true };
    }
    return { exists: false };
  }, []);

  const subscribe = useCallback(async (name, email, mobile) => {
    // Always save locally
    addSubscriber(email, mobile, name);

    // Try server
    const data = await tryServer('/subscribe', { name, email, mobile });
    if (data?.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      if (data.token) localStorage.setItem(TOKEN_KEY, data.token);
      setUser(data.user);
    } else {
      // Local only
      const u = { id: 'u_' + Date.now(), name, email: email || '', mobile: mobile || '' };
      localStorage.setItem(USER_KEY, JSON.stringify(u));
      setUser(u);
    }
    setShowAuthModal(false);
    setTimeout(() => window.location.reload(), 300);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const unsubscribe = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      await tryServer('/unsubscribe', {}, token);
    }
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const openAuthModal = useCallback(() => setShowAuthModal(true), []);
  const closeAuthModal = useCallback(() => setShowAuthModal(false), []);

  const isSubscribed = !!user;

  return (
    <AuthContext.Provider value={{ user, loading: false, isSubscribed, checkUser, subscribe, logout, unsubscribe, openAuthModal, closeAuthModal, showAuthModal }}>
      {children}
      {showAuthModal && <AuthModal />}
    </AuthContext.Provider>
  );
};
