import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAdmin } from '../../context/AdminContext';
import AdminSidebar from './AdminSidebar';
import { CATEGORIES } from '../../utils/constants';
import { formatNewsDate } from '../../utils/formatDate';
import '../../styles/admin.css';

const ManageArticles = () => {
  const { isLoggedIn, getArticles, deleteArticle, toggleVisibility } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);

  const ITEMS_PER_PAGE = 10;

  if (!isLoggedIn) {
    return <Navigate to="/admin" />;
  }

  const articles = getArticles() || [];

  const filteredArticles = articles.filter((article) => {
    const title = (article.titleHindi || article.title || '').toLowerCase();
    const matchesSearch = title.includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || article.category === categoryFilter;
    const matchesStatus = !statusFilter || article.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedArticles.map((a) => a.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete article "${title}"?`)) {
      deleteArticle(id);
      setSelectedIds((prev) => prev.filter((i) => i !== id));
      toast.success('Article deleted');
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Delete ${selectedIds.length} selected article(s)?`)) {
      selectedIds.forEach((id) => deleteArticle(id));
      setSelectedIds([]);
      toast.success('Selected articles deleted');
    }
  };

  const handleToggleVisibility = (id) => {
    toggleVisibility(id);
    toast.success('Visibility toggled');
  };

  return (
    <div className="admin-layout">
      <AdminSidebar activePage="manage" />
      <div className="admin-content">
        <h1 className="admin-page-title">Manage Articles</h1>

        <div className="admin-filters">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="form-control"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.emoji} {cat.label} ({cat.labelEn})
              </option>
            ))}
          </select>
          <select
            className="form-control"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {selectedIds.length > 0 && (
          <div className="bulk-actions">
            <span>{selectedIds.length} selected</span>
            <button className="btn-danger" onClick={handleBulkDelete}>
              <i className="fas fa-trash"></i> Delete Selected
            </button>
          </div>
        )}

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      paginatedArticles.length > 0 &&
                      paginatedArticles.every((a) => selectedIds.includes(a.id))
                    }
                  />
                </th>
                <th style={{ width: 60 }}>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedArticles.length > 0 ? (
                paginatedArticles.map((article) => (
                  <tr key={article.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(article.id)}
                        onChange={() => handleSelectOne(article.id)}
                      />
                    </td>
                    <td>
                      <img
                        src={article.featuredImage || article.image || '/placeholder.png'}
                        alt=""
                        style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
                      />
                    </td>
                    <td>{article.titleHindi || article.title}</td>
                    <td>{article.category}</td>
                    <td>
                      <span className={`badge badge-${article.status}`}>
                        {article.status}
                      </span>
                    </td>
                    <td>{formatNewsDate(article.date || article.createdAt)}</td>
                    <td className="actions">
                      <Link to={`/admin/edit/${article.id}`} className="action-btn edit" title="Edit">
                        <i className="fas fa-pencil-alt"></i>
                      </Link>
                      <button
                        className="action-btn visibility"
                        onClick={() => handleToggleVisibility(article.id)}
                        title={article.status === 'published' ? 'Unpublish' : 'Publish'}
                      >
                        <i className={`fas ${article.status === 'published' ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(article.id, article.titleHindi || article.title)}
                        title="Delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="empty-state">
                    No articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="admin-pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={currentPage === page ? 'active' : ''}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageArticles;
