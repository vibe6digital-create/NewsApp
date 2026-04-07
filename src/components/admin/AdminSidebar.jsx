import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import '../../styles/admin.css';

const AdminSidebar = ({ activePage }) => {
  const { logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const navItems = [
    { name: 'dashboard', label: 'Dashboard', icon: 'fa-tachometer-alt', path: '/admin' },
    { name: 'add', label: 'Add Article', icon: 'fa-plus-circle', path: '/admin/add' },
    { name: 'manage', label: 'Manage Articles', icon: 'fa-newspaper', path: '/admin/manage' },
    { name: 'subscribers', label: 'Subscribers', icon: 'fa-users', path: '/admin/subscribers' },
  ];

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-logo">खबर का सफर</h2>
        <p className="sidebar-subtitle">Admin Panel</p>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`sidebar-nav-item ${activePage === item.name ? 'active' : ''}`}
          >
            <i className={`fas ${item.icon}`}></i>
            <span>{item.label}</span>
          </Link>
        ))}
        <Link to="/" className="sidebar-nav-item">
          <i className="fas fa-globe"></i>
          <span>Back to Site</span>
        </Link>
        <button className="sidebar-nav-item sidebar-logout" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
