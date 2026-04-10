import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAdmin } from '../../context/AdminContext';
import AdminSidebar from './AdminSidebar';
import { formatNewsDate } from '../../utils/formatDate';
import '../../styles/admin.css';

const ManageSubscribers = () => {
  const { isLoggedIn, getSubscribers, exportSubscribers } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [allSubscribers, setAllSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubscribers = async () => {
      // Get localStorage subscribers
      const localSubs = getSubscribers() || [];

      // Try fetching from server DB
      try {
        const res = await fetch('/api/admin/subscribers');
        if (res.ok) {
          const data = await res.json();
          const serverSubs = (data.subscribers || []).map(s => ({
            ...s,
            source: 'server',
          }));

          // Merge: deduplicate by email
          const emailSet = new Set();
          const merged = [];
          for (const sub of serverSubs) {
            if (sub.email && !emailSet.has(sub.email)) {
              emailSet.add(sub.email);
              merged.push(sub);
            }
          }
          for (const sub of localSubs) {
            if (sub.email && !emailSet.has(sub.email)) {
              emailSet.add(sub.email);
              merged.push(sub);
            }
          }
          setAllSubscribers(merged);
        } else {
          setAllSubscribers(localSubs);
        }
      } catch {
        // Server not running — fall back to localStorage only
        setAllSubscribers(localSubs);
      }
      setLoading(false);
    };

    loadSubscribers();
  }, [getSubscribers]);

  if (!isLoggedIn) {
    return <Navigate to="/admin" />;
  }

  const filteredSubscribers = allSubscribers.filter((sub) => {
    const term = searchTerm.toLowerCase();
    return (
      (sub.name || '').toLowerCase().includes(term) ||
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

  const handleDelete = async (sub) => {
    if (!window.confirm(`Remove subscriber "${sub.email}"?`)) return;
    try {
      // If from server DB, delete via API
      if (sub.source === 'server') {
        await fetch(`/api/admin/subscribers/${sub.id}`, { method: 'DELETE' });
      }
      setAllSubscribers(prev => prev.filter(s => s.id !== sub.id));
      toast.success('Subscriber removed');
    } catch {
      toast.error('Failed to remove subscriber');
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar activePage="subscribers" />
      <div className="admin-content">
        <h1 className="admin-page-title">Manage Subscribers</h1>

        <div className="subscribers-header">
          <h2 className="subscriber-count">Total Subscribers: {allSubscribers.length}</h2>
          <button className="btn-primary-red" onClick={handleExport}>
            <i className="fas fa-file-csv"></i> Export CSV
          </button>
        </div>

        <div className="admin-filters">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, email or mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="empty-state">Loading subscribers...</div>
        ) : filteredSubscribers.length > 0 ? (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: 50 }}>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((sub, index) => (
                  <tr key={sub.id || index}>
                    <td>{index + 1}</td>
                    <td>{sub.name || '-'}</td>
                    <td>{sub.email || '-'}</td>
                    <td>{sub.mobile || '-'}</td>
                    <td>{formatNewsDate(sub.subscribedAt || sub.created_at || sub.createdAt)}</td>
                    <td>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(sub)}
                        title="Remove subscriber"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <i className="fas fa-users" style={{ fontSize: 32, marginBottom: 12, display: 'block' }}></i>
            <p>No subscribers found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSubscribers;
