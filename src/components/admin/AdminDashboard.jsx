import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import AdminSidebar from './AdminSidebar';
import { formatNewsDate } from '../../utils/formatDate';
import '../../styles/admin.css';

const AdminDashboard = () => {
  const { isLoggedIn, getArticles, getSubscribers, deleteArticle } = useAdmin();
  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const loadCount = async () => {
      const localSubs = getSubscribers() || [];
      try {
        const res = await fetch('/api/admin/subscribers', { signal: controller.signal });
        if (res.ok) {
          const data = await res.json();
          // Deduplicate by email
          const emails = new Set();
          (data.subscribers || []).forEach(s => s.email && emails.add(s.email));
          localSubs.forEach(s => s.email && emails.add(s.email));
          setSubscriberCount(emails.size);
        } else {
          setSubscriberCount(localSubs.length);
        }
      } catch (e) {
        if (!controller.signal.aborted) setSubscriberCount(localSubs.length);
      }
    };
    loadCount();
    return () => controller.abort();
  }, []); // getSubscribers is stable (useCallback with [] deps in AdminContext)

  if (!isLoggedIn) {
    return <Navigate to="/admin" />;
  }

  const articles = getArticles() || [];
  const publishedCount = articles.filter((a) => a.status === 'published').length;
  const draftCount = articles.filter((a) => a.status === 'draft').length;
  const recentArticles = articles.slice(-5).reverse();

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete article "${title}"?`)) {
      deleteArticle(id);
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar activePage="dashboard" />
      <div className="admin-content">
        <h1 className="admin-page-title">Dashboard</h1>

        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-newspaper"></i>
            </div>
            <div className="stat-info">
              <h3>{articles.length}</h3>
              <p>Total Articles</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon published">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-info">
              <h3>{publishedCount}</h3>
              <p>Published</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon draft">
              <i className="fas fa-pencil-alt"></i>
            </div>
            <div className="stat-info">
              <h3>{draftCount}</h3>
              <p>Draft</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon subscribers">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-info">
              <h3>{subscriberCount}</h3>
              <p>Subscribers</p>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <Link to="/admin/add" className="btn-primary-red">
              <i className="fas fa-plus-circle"></i> Add Article
            </Link>
            <Link to="/admin/manage" className="btn-primary-red">
              <i className="fas fa-newspaper"></i> Manage Articles
            </Link>
            <Link to="/admin/subscribers" className="btn-primary-red">
              <i className="fas fa-users"></i> View Subscribers
            </Link>
          </div>
        </div>

        <div className="recent-articles">
          <h2>Recent Articles</h2>
          {recentArticles.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentArticles.map((article) => (
                  <tr key={article.id}>
                    <td>{article.titleHindi || article.title}</td>
                    <td>{article.category}</td>
                    <td>
                      <span className={`badge badge-${article.status}`}>
                        {article.status}
                      </span>
                    </td>
                    <td>{formatNewsDate(article.date || article.createdAt)}</td>
                    <td className="actions">
                      <Link to={`/admin/edit/${article.id}`} className="action-btn edit">
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(article.id, article.titleHindi || article.title)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="empty-state">No articles yet. Start by adding one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
