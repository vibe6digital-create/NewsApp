import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAdmin } from '../../context/AdminContext';
import AdminSidebar from './AdminSidebar';
import { formatNewsDate } from '../../utils/formatDate';
import '../../styles/admin.css';

const ManageSubscribers = () => {
  const { isLoggedIn, getSubscribers, exportSubscribers } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isLoggedIn) {
    return <Navigate to="/admin" />;
  }

  const subscribers = getSubscribers() || [];

  const filteredSubscribers = subscribers.filter((sub) => {
    const term = searchTerm.toLowerCase();
    return (
      (sub.email || '').toLowerCase().includes(term) ||
      (sub.mobile || '').toLowerCase().includes(term)
    );
  });

  const handleExport = () => {
    try {
      exportSubscribers();
      toast.success('Subscribers exported successfully!');
    } catch (err) {
      toast.error('Failed to export subscribers.');
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar activePage="subscribers" />
      <div className="admin-content">
        <h1 className="admin-page-title">Manage Subscribers</h1>

        <div className="subscribers-header">
          <h2 className="subscriber-count">कुल सदस्य: {subscribers.length}</h2>
          <button className="btn-primary-red" onClick={handleExport}>
            <i className="fas fa-file-csv"></i> Export CSV
          </button>
        </div>

        <div className="filters-bar">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search by email or mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredSubscribers.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Subscribed On</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.map((sub, index) => (
                <tr key={sub.id || index}>
                  <td>{index + 1}</td>
                  <td>{sub.email || '-'}</td>
                  <td>{sub.mobile || '-'}</td>
                  <td>{formatNewsDate(sub.subscribedOn || sub.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <i className="fas fa-users empty-icon"></i>
            <p>No subscribers found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSubscribers;
