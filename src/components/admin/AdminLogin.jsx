import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAdmin } from '../../context/AdminContext';
import { PORTAL_NAME, PORTAL_SLOGAN, PORTAL_SLOGAN_EN } from '../../utils/constants';
import '../../styles/admin.css';

const AdminLogin = () => {
  const { isLoggedIn, login } = useAdmin();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) {
    return <Navigate to="/admin/dashboard" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const result = login(username.trim(), password.trim());
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setShake(true);
      toast.error(result.message || 'Invalid username or password');
      setTimeout(() => setShake(false), 600);
    }
    setLoading(false);
  };

  return (
    <div className="admin-login">
      <div className={`login-card ${shake ? 'shake' : ''}`}>
        <div className="login-header">
          <h1 className="login-logo">{PORTAL_NAME}</h1>
          <p className="login-slogan">{PORTAL_SLOGAN} | {PORTAL_SLOGAN_EN}</p>
          <p className="login-subtitle">Admin Panel</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="btn-primary-red" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
