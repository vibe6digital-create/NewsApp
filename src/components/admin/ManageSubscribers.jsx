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
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'unsubscribed'
  const [subscribers, setSubscribers] = useState([]);
  const [unsubscribed, setUnsubscribed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubscribers = async () => {
      const localSubs = getSubscribers() || [];

      try {
        const res = await fetch('/api/admin/subscribers');
        if (res.ok) {
          const data = await res.json();
          const serverActive = (data.subscribers || []).map(s => ({ ...s, source: 'server' }));
          const serverUnsub = (data.unsubscribed || []).map(s => ({ ...s, source: 'server' }));

          // Merge active: server first, then localStorage (dedupe by email)
          const emailSet = new Set();
          const mergedActive = [];
          for (const sub of serverActive) {
            if (sub.email && !emailSet.has(sub.email)) { emailSet.add(sub.email); mergedActive.push(sub); }
          }
          for (const sub of localSubs) {
            if (sub.email && !emailSet.has(sub.email)) { emailSet.add(sub.email); mergedActive.push(sub); }
          }

          setSubscribers(mergedActive);
          setUnsubscribed(serverUnsub);
        } else {
          setSubscribers(localSubs);
        }
      } catch {
        setSubscribers(localSubs);
      }
      setLoading(false);
    };

    loadSubscribers();
  }, [getSubscribers]);

  if (!isLoggedIn) return <Navigate to="/admin" />;

  const list = activeTab === 'active' ? subscribers : unsubscribed;
  const filtered = list.filter(sub => {
    const term = searchTerm.toLowerCase();
    return (
      (sub.name || '').toLowerCase().includes(term) ||
      (sub.email || '').toLowerCase().includes(term) ||
      (sub.mobile || '').toLowerCase().includes(term)
    );
  });

  const handleExport = () => {
    try { exportSubscribers(); toast.success('Exported successfully!'); }
    catch { toast.error('Export failed.'); }
  };

  const handleDelete = async (sub) => {
    if (!window.confirm(`Remove "${sub.email || sub.name}"?`)) return;
    try {
      if (sub.source === 'server') {
        await fetch(`/api/admin/subscribers/${sub.id}`, { method: 'DELETE' });
      }
      if (activeTab === 'active') {
        setSubscribers(prev => prev.filter(s => s.id !== sub.id));
      } else {
        setUnsubscribed(prev => prev.filter(s => s.id !== sub.id));
      }
      toast.success('Subscriber removed');
    } catch {
      toast.error('Failed to remove subscriber');
    }
  };

  const tabStyle = (tab) => ({
    padding: '8px 24px',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
    background: activeTab === tab ? '#CC0000' : '#2a2a2a',
    color: activeTab === tab ? '#fff' : '#aaa',
    transition: 'all 0.2s',
  });

  return (
    <div className="admin-layout">
      <AdminSidebar activePage="subscribers" />
      <div className="admin-content">
        <h1 className="admin-page-title">Manage Subscribers</h1>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button style={tabStyle('active')} onClick={() => setActiveTab('active')}>
            ✅ Active ({subscribers.length})
          </button>
          <button style={tabStyle('unsubscribed')} onClick={() => setActiveTab('unsubscribed')}>
            ❌ Unsubscribed ({unsubscribed.length})
          </button>
        </div>

        <div className="subscribers-header">
          <h2 className="subscriber-count">
            {activeTab === 'active'
              ? `Active Subscribers: ${subscribers.length}`
              : `Unsubscribed: ${unsubscribed.length}`}
          </h2>
          {activeTab === 'active' && (
            <button className="btn-primary-red" onClick={handleExport}>
              <i className="fas fa-file-csv"></i> Export CSV
            </button>
          )}
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
          <div className="empty-state">Loading...</div>
        ) : filtered.length > 0 ? (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: 50 }}>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>{activeTab === 'active' ? 'Joined' : 'Unsubscribed On'}</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((sub, index) => (
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
                        title="Remove"
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
            <p>{activeTab === 'active' ? 'No active subscribers.' : 'No unsubscribed users.'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSubscribers;
