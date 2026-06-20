import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const inputStyle = { width: '100%', padding: '.75rem', margin: '.5rem 0', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '1rem', display: 'block' };
const btnStyle = { width: '100%', padding: '.75rem', marginTop: '1rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, fontSize: '1rem', cursor: 'pointer' };

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '5rem auto', padding: '2rem', background: '#fff', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,.1)' }}>
      <h2 style={{ color: '#6366f1', marginBottom: '1.5rem' }}>🚀 CareerFlow AI</h2>
      <h3>Sign In</h3>
      {error && <p style={{ color: 'red', marginTop: '.5rem' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required style={inputStyle} />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={inputStyle} />
        <button type="submit" style={btnStyle}>Login</button>
      </form>
      <p style={{ marginTop: '1rem' }}>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
