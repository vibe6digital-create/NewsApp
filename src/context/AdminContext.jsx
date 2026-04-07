import React, { createContext, useContext, useState, useCallback } from 'react';
import { ADMIN_USER, ADMIN_PASS } from '../utils/constants';
import * as adminService from '../services/adminService';
import * as subService from '../services/subscriptionService';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('adminToken') === 'logged_in';
  });

  const login = useCallback((username, password) => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem('adminToken', 'logged_in');
      setIsLoggedIn(true);
      return { success: true };
    }
    return { success: false, message: 'गलत यूजरनेम या पासवर्ड!' };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
  }, []);

  const getArticles = useCallback(() => {
    return adminService.getAllAdminArticles();
  }, []);

  const getArticle = useCallback((id) => {
    return adminService.getAdminArticle(id);
  }, []);

  const addArticle = useCallback((data) => {
    return adminService.addArticle(data);
  }, []);

  const updateArticle = useCallback((id, data) => {
    return adminService.updateArticle(id, data);
  }, []);

  const deleteArticle = useCallback((id) => {
    return adminService.deleteArticle(id);
  }, []);

  const toggleVisibility = useCallback((id) => {
    return adminService.toggleArticleVisibility(id);
  }, []);

  const getSubscribers = useCallback(() => {
    return subService.getAllSubscribers();
  }, []);

  const addSubscriber = useCallback((email, mobile) => {
    return subService.addSubscriber(email, mobile);
  }, []);

  const exportSubscribers = useCallback(() => {
    return subService.exportSubscribersCSV();
  }, []);

  const value = {
    isLoggedIn,
    login,
    logout,
    getArticles,
    getArticle,
    addArticle,
    updateArticle,
    deleteArticle,
    toggleVisibility,
    getSubscribers,
    addSubscriber,
    exportSubscribers,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
