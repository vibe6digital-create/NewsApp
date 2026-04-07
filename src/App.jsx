import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import AOS from 'aos';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/globals.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/newscard.css';
import './styles/footer.css';
import './styles/admin.css';

import { NewsProvider } from './context/NewsContext';
import { AdminProvider } from './context/AdminContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import BreakingTicker from './components/layout/BreakingTicker';
import Footer from './components/layout/Footer';
import MobileBottomNav from './components/layout/MobileBottomNav';
import MobileCategoryBar from './components/layout/MobileCategoryBar';
import LoadingSpinner from './components/common/LoadingSpinner';
import ScrollToTop from './components/common/ScrollToTop';

import HomePage from './pages/HomePage';
import NationalNewsPage from './pages/NationalNewsPage';
import WorldNewsPage from './pages/WorldNewsPage';
import EducationPage from './pages/EducationPage';
import JobsPage from './pages/JobsPage';
import HealthPage from './pages/HealthPage';
import TechnologyPage from './pages/TechnologyPage';
import CategoryPage from './pages/CategoryPage';
import AstrologyPage from './pages/AstrologyPage';
import ArticlePage from './pages/ArticlePage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';
import StatePage from './pages/StatePage';

const AdminLogin = lazy(() => import('./components/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const AddEditArticle = lazy(() => import('./components/admin/AddEditArticle'));
const ManageArticles = lazy(() => import('./components/admin/ManageArticles'));
const ManageSubscribers = lazy(() => import('./components/admin/ManageSubscribers'));

const AdminFallback = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: 'var(--dark)' }}>
    <LoadingSpinner count={1} />
  </div>
);

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <ThemeProvider>
        <LanguageProvider>
        <AdminProvider>
          <NewsProvider>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />

            <Routes>
              <Route path="/admin" element={
                <Suspense fallback={<AdminFallback />}>
                  <AdminLogin />
                </Suspense>
              } />
              <Route path="/admin/dashboard" element={
                <Suspense fallback={<AdminFallback />}>
                  <AdminDashboard />
                </Suspense>
              } />
              <Route path="/admin/add" element={
                <Suspense fallback={<AdminFallback />}>
                  <AddEditArticle />
                </Suspense>
              } />
              <Route path="/admin/edit/:id" element={
                <Suspense fallback={<AdminFallback />}>
                  <AddEditArticle />
                </Suspense>
              } />
              <Route path="/admin/manage" element={
                <Suspense fallback={<AdminFallback />}>
                  <ManageArticles />
                </Suspense>
              } />
              <Route path="/admin/subscribers" element={
                <Suspense fallback={<AdminFallback />}>
                  <ManageSubscribers />
                </Suspense>
              } />

              <Route path="*" element={
                <>
                  <Header />
                  <BreakingTicker />
                  <div className="d-none d-lg-block">
                    <Navbar />
                  </div>
                  <MobileCategoryBar />
                  <main style={{ minHeight: '60vh' }}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/category/national" element={<NationalNewsPage />} />
                      <Route path="/category/world" element={<WorldNewsPage />} />
                      <Route path="/category/education" element={<EducationPage />} />
                      <Route path="/category/jobs" element={<JobsPage />} />
                      <Route path="/category/health" element={<HealthPage />} />
                      <Route path="/category/technology" element={<TechnologyPage />} />
                      <Route path="/category/astro" element={<AstrologyPage />} />
                      <Route path="/category/:slug" element={<CategoryPage />} />
                      <Route path="/article/:id" element={<ArticlePage />} />
                      <Route path="/state/:slug" element={<StatePage />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </main>
                  <Footer />
                  <MobileBottomNav />
                </>
              } />
            </Routes>
          </NewsProvider>
        </AdminProvider>
        </LanguageProvider>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
