import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const stats = [
  { value: '50K+', label: 'Jobs Tracked' },
  { value: '12K+', label: 'Users Hired' },
  { value: '95%', label: 'ATS Success' },
  { value: '4.9★', label: 'User Rating' },
];

const features = [
  { icon: '🎯', title: 'Smart Job Tracking', desc: 'Track every application in one place' },
  { icon: '🤖', title: 'AI Resume Optimizer', desc: 'Beat ATS with AI-powered suggestions' },
  { icon: '📊', title: 'Career Analytics', desc: 'Insights to land more interviews' },
  { icon: '🔔', title: 'Deadline Reminders', desc: 'Never miss an opportunity' },
];

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      {/* Left Panel */}
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>🚀</div>
            <span style={{ color: 'white', fontSize: '1.4rem', fontWeight: 800 }}>CareerFlow AI</span>
          </div>

          <h1 style={{ color: 'white', fontSize: '2.6rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            Start Your<br />
            <span style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Career Journey</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, maxWidth: 360, marginBottom: '2.5rem' }}>
            Join thousands of professionals who landed their dream jobs using CareerFlow AI.
          </p>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '1.25rem', animation: `fadeInUp 0.5s ease ${i * 0.1}s both` }}>
                <p style={{ color: 'white', fontSize: '1.8rem', fontWeight: 800, margin: 0, background: 'linear-gradient(135deg, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</p>
                <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', animation: `slideInLeft 0.5s ease ${i * 0.1}s both` }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <p style={{ color: 'white', fontSize: '0.875rem', fontWeight: 600, margin: 0 }}>{f.title}</p>
                  <p style={{ color: '#64748b', fontSize: '0.78rem', margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ position: 'relative', zIndex: 1, color: '#334155', fontSize: '0.78rem' }}>© 2024 CareerFlow AI • All rights reserved</p>
      </div>

      {/* Right Panel */}
      <div style={{ width: 480, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Create account</h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Free forever. No credit card required.</p>
          </div>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '0.875rem 1rem', marginBottom: '1.5rem', color: '#dc2626', fontSize: '0.9rem' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Full Name</label>
              <input className="input-modern" type="text" placeholder="Abdul Moiz" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Email address</label>
              <input className="input-modern" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Password</label>
              <input className="input-modern" type="password" placeholder="Min. 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>

            <button type="submit" disabled={loading} style={{ marginTop: '0.5rem', padding: '0.875rem', background: loading ? '#94a3b8' : 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease', fontFamily: 'Inter, sans-serif' }}>
              {loading ? '🔄 Creating account...' : 'Get Started Free →'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#6366f1', fontWeight: 700, textDecoration: 'none' }}>Sign in →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
