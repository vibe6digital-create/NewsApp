import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { PORTAL_NAME, PORTAL_SLOGAN, PORTAL_SLOGAN_EN } from '../../utils/constants';
import '../../styles/admin.css';

const AdminSidebar = ({ activePage }) => {
  const { logout } = useAdmin();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const closeSidebar = () => setIsOpen(false);

  const navItems = [
    { name: 'dashboard', label: 'Dashboard', icon: 'fa-tachometer-alt', path: '/admin/dashboard' },
    { name: 'add', label: 'Add Article', icon: 'fa-plus-circle', path: '/admin/add' },
    { name: 'manage', label: 'Manage Articles', icon: 'fa-newspaper', path: '/admin/manage' },
    { name: 'subscribers', label: 'Subscribers', icon: 'fa-users', path: '/admin/subscribers' },
  ];

  return (
    <>
      {/* Mobile hamburger button */}
      <button className="mobile-menu-btn" onClick={() => setIsOpen(true)}>
        <i className="fas fa-bars"></i>
      </button>

      {/* Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

      <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="sidebar-close-btn" onClick={closeSidebar}>
            <i className="fas fa-times"></i>
          </button>
          <h2 className="sidebar-logo">{PORTAL_NAME}</h2>
          <p className="sidebar-slogan">{PORTAL_SLOGAN} | {PORTAL_SLOGAN_EN}</p>
          <p className="sidebar-subtitle">Admin Panel</p>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-item ${activePage === item.name ? 'active' : ''}`}
              onClick={closeSidebar}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.label}</span>
            </Link>
          ))}
          <Link to="/" className="nav-item" onClick={closeSidebar}>
            <i className="fas fa-globe"></i>
            <span>Back to Site</span>
          </Link>
          <button className="nav-item logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;
