import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const careers = [
  { icon: '👨‍💻', title: 'Software Engineer', company: 'Google', salary: '$120k+' },
  { icon: '👩‍⚕️', title: 'Medical Doctor', company: 'Johns Hopkins', salary: '$180k+' },
  { icon: '👨‍🎨', title: 'UI/UX Designer', company: 'Apple', salary: '$95k+' },
  { icon: '👩‍💼', title: 'Product Manager', company: 'Meta', salary: '$140k+' },
  { icon: '👨‍🔬', title: 'Data Scientist', company: 'Tesla', salary: '$130k+' },
  { icon: '👩‍⚖️', title: 'Corporate Lawyer', company: 'McKinsey', salary: '$160k+' },
  { icon: '👨‍🏗️', title: 'Civil Engineer', company: 'AECOM', salary: '$85k+' },
  { icon: '👩‍🎓', title: 'ML Researcher', company: 'OpenAI', salary: '$200k+' },
];

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      {/* Left Panel */}
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
        {/* Animated circles */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)', animation: 'float 6s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite reverse' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>🚀</div>
            <span style={{ color: 'white', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>CareerFlow AI</span>
          </div>

          <h1 style={{ color: 'white', fontSize: '2.8rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            Land Your<br />
            <span style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dream Career</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: 380 }}>
            AI-powered tools to track applications, optimize your resume, and get hired faster.
          </p>
        </div>

        {/* Career cards */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Professionals using CareerFlow</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {careers.map((c, i) => (
              <div key={i} className="card-hover" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.75rem', animation: `fadeInUp 0.5s ease ${i * 0.1}s both` }}>
                <span style={{ fontSize: '1.5rem' }}>{c.icon}</span>
                <div>
                  <p style={{ color: 'white', fontSize: '0.8rem', fontWeight: 600, margin: 0 }}>{c.title}</p>
                  <p style={{ color: '#64748b', fontSize: '0.72rem', margin: 0 }}>{c.company} • {c.salary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ width: 480, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Welcome back</h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Sign in to continue your career journey</p>
          </div>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '0.875rem 1rem', marginBottom: '1.5rem', color: '#dc2626', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Email address</label>
              <input className="input-modern" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Password</label>
              <input className="input-modern" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>

            <button type="submit" disabled={loading} style={{ marginTop: '0.5rem', padding: '0.875rem', background: loading ? '#94a3b8' : 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease', fontFamily: 'Inter, sans-serif' }}>
              {loading ? '🔄 Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div style={{ marginTop: '2rem', padding: '1.25rem', background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#6366f1', fontWeight: 700, textDecoration: 'none' }}>Create one free →</Link>
            </p>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {['🔒 Secure', '⚡ Fast', '🤖 AI-Powered'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: '#94a3b8' }}>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
