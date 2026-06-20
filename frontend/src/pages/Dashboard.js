import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/dashboard/stats`)
      .then(res => setStats(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#6366f1' }}>🚀 CareerFlow AI</h1>
        <button onClick={logout} style={{ padding: '.5rem 1rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Logout</button>
      </div>
      <h2 style={{ marginTop: '1.5rem' }}>Welcome back, {user?.name}! 👋</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        {[
          { label: 'Total Applications', value: stats?.total ?? '—', color: '#6366f1' },
          { label: 'Interviews', value: stats?.byStatus?.find(s => s._id === 'interview')?.count ?? 0, color: '#10b981' },
          { label: 'Offers', value: stats?.byStatus?.find(s => s._id === 'offer')?.count ?? 0, color: '#f59e0b' },
          { label: 'Rejected', value: stats?.byStatus?.find(s => s._id === 'rejected')?.count ?? 0, color: '#ef4444' },
        ].map(card => (
          <div key={card.label} style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,.08)', borderTop: `4px solid ${card.color}` }}>
            <p style={{ color: '#64748b', fontSize: '.85rem' }}>{card.label}</p>
            <h3 style={{ fontSize: '2rem', color: card.color }}>{card.value}</h3>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '2rem', background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,.08)' }}>
        <h3>Quick Links</h3>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          {[['📋 Applications', '/applications'], ['📄 Resume AI', '/resume']].map(([label, href]) => (
            <a key={href} href={href} style={{ padding: '.75rem 1.5rem', background: '#6366f1', color: '#fff', borderRadius: 8, textDecoration: 'none' }}>{label}</a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
