import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentApps, setRecentApps] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/dashboard/stats`)
      .then(res => setStats(res.data.data))
      .catch(console.error);
    axios.get(`${process.env.REACT_APP_API_URL}/applications`)
      .then(res => setRecentApps(res.data.data.slice(0, 5)))
      .catch(console.error);
  }, []);

  const getCount = (status) => stats?.byStatus?.find(s => s._id === status)?.count ?? 0;

  const cards = [
    { label: 'Total Applications', value: stats?.total ?? '—', color: '#6366f1' },
    { label: 'Interviews',         value: getCount('interview'),  color: '#f59e0b' },
    { label: 'Offers',             value: getCount('offer'),      color: '#10b981' },
    { label: 'Rejected',           value: getCount('rejected'),   color: '#ef4444' },
  ];

  const STATUS_COLORS = {
    bookmarked: '#6366f1', applied: '#3b82f6', interview: '#f59e0b',
    offer: '#10b981', rejected: '#ef4444', withdrawn: '#64748b',
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#6366f1' }}>🚀 CareerFlow AI</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: '#64748b' }}>👤 {user?.name}</span>
          <button onClick={logout} style={{ padding: '.5rem 1rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      <h2 style={{ marginTop: '1.5rem', color: '#1e293b' }}>Welcome back, {user?.name}! 👋</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
        {cards.map(card => (
          <div key={card.label} style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,.08)', borderTop: `4px solid ${card.color}` }}>
            <p style={{ color: '#64748b', fontSize: '.85rem' }}>{card.label}</p>
            <h3 style={{ fontSize: '2rem', color: card.color, margin: '.25rem 0' }}>{card.value}</h3>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,.08)' }}>
          <h3>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem', marginTop: '1rem' }}>
            <Link to="/applications" style={{ padding: '.75rem 1rem', background: '#6366f1', color: '#fff', borderRadius: 8, textDecoration: 'none', textAlign: 'center' }}>📋 View All Applications</Link>
            <Link to="/applications" style={{ padding: '.75rem 1rem', background: '#10b981', color: '#fff', borderRadius: 8, textDecoration: 'none', textAlign: 'center' }}>➕ Add New Application</Link>
            <Link to="/resume" style={{ padding: '.75rem 1rem', background: '#f59e0b', color: '#fff', borderRadius: 8, textDecoration: 'none', textAlign: 'center' }}>📄 AI Resume Optimizer</Link>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,.08)' }}>
          <h3>Recent Applications</h3>
          {recentApps.length === 0 ? (
            <p style={{ color: '#64748b', marginTop: '1rem' }}>No applications yet. Add your first one!</p>
          ) : (
            <div style={{ marginTop: '1rem' }}>
              {recentApps.map(app => (
                <div key={app._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
                  <div>
                    <p style={{ fontWeight: 600, margin: 0 }}>{app.jobTitle}</p>
                    <p style={{ color: '#64748b', fontSize: '.85rem', margin: 0 }}>{app.companyName}</p>
                  </div>
                  <span style={{ background: STATUS_COLORS[app.status], color: '#fff', padding: '.2rem .6rem', borderRadius: 20, fontSize: '.75rem' }}>{app.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
