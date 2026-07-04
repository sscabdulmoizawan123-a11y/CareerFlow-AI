import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const STATUS_COLORS = {
  bookmarked: '#6366f1', applied: '#3b82f6', interview: '#f59e0b',
  offer: '#10b981', rejected: '#ef4444', withdrawn: '#64748b',
};

const STATUS_BG = {
  bookmarked: '#eef2ff', applied: '#eff6ff', interview: '#fffbeb',
  offer: '#f0fdf4', rejected: '#fef2f2', withdrawn: '#f8fafc',
};

const COMPANY_ICONS = ['🏢', '💼', '🏗️', '🏥', '⚖️', '🔬', '🎨', '💻', '🏦', '✈️'];

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ companyName: '', jobTitle: '', jobType: 'full-time', status: 'applied', location: '', jobUrl: '', notes: '' });

  useEffect(() => { fetchApplications(); }, []);

  useEffect(() => {
    let result = applications;
    if (statusFilter !== 'all') result = result.filter(a => a.status === statusFilter);
    if (search) result = result.filter(a => a.companyName.toLowerCase().includes(search.toLowerCase()) || a.jobTitle.toLowerCase().includes(search.toLowerCase()));
    setFiltered(result);
  }, [statusFilter, applications, search]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/applications`);
      setApplications(res.data.data);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingApp) await axios.put(`${process.env.REACT_APP_API_URL}/applications/${editingApp._id}`, form);
      else await axios.post(`${process.env.REACT_APP_API_URL}/applications`, form);
      fetchApplications();
      resetForm();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    await axios.delete(`${process.env.REACT_APP_API_URL}/applications/${id}`);
    fetchApplications();
  };

  const handleEdit = (app) => {
    setEditingApp(app);
    setForm({ companyName: app.companyName, jobTitle: app.jobTitle, jobType: app.jobType, status: app.status, location: app.location || '', jobUrl: app.jobUrl || '', notes: app.notes || '' });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingApp(null);
    setForm({ companyName: '', jobTitle: '', jobType: 'full-time', status: 'applied', location: '', jobUrl: '', notes: '' });
  };

  const statusCounts = ['bookmarked', 'applied', 'interview', 'offer', 'rejected'].reduce((acc, s) => {
    acc[s] = applications.filter(a => a.status === s).length;
    return acc;
  }, {});

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
      {/* Navbar */}
      <nav style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#64748b', fontSize: '0.875rem', fontWeight: 500 }}>← Dashboard</Link>
          <span style={{ color: '#e2e8f0' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.1rem' }}>📋</span>
            <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>My Applications</span>
          </div>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: '0.6rem 1.25rem', background: showForm ? '#f1f5f9' : 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: showForm ? '#64748b' : 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem', fontFamily: 'Inter, sans-serif', transition: 'all 0.3s ease' }}>
          {showForm ? '✕ Cancel' : '+ Add Application'}
        </button>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem' }}>

        {/* Status summary bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)} className="card-hover" style={{ background: 'white', borderRadius: 12, padding: '1rem', cursor: 'pointer', border: `2px solid ${statusFilter === status ? STATUS_COLORS[status] : 'transparent'}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0, fontWeight: 500, textTransform: 'capitalize' }}>{status}</p>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLORS[status] }} />
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: STATUS_COLORS[status], margin: '0.25rem 0 0' }}>{count}</h3>
            </div>
          ))}
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div style={{ background: 'white', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', animation: 'fadeInUp 0.3s ease' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a', marginBottom: '1.5rem' }}>
              {editingApp ? '✏️ Edit Application' : '➕ Add New Application'}
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { label: 'Company Name *', key: 'companyName', placeholder: 'e.g. Google, Apple, Meta' },
                { label: 'Job Title *', key: 'jobTitle', placeholder: 'e.g. Software Engineer' },
                { label: 'Location', key: 'location', placeholder: 'e.g. Remote, New York' },
                { label: 'Job URL', key: 'jobUrl', placeholder: 'https://...' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>{label}</label>
                  <input className="input-modern" placeholder={placeholder} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} required={label.includes('*')} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Job Type</label>
                <select className="input-modern" value={form.jobType} onChange={e => setForm({ ...form, jobType: e.target.value })}>
                  {['full-time', 'internship', 'part-time', 'contract', 'remote'].map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Status</label>
                <select className="input-modern" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Notes</label>
                <textarea className="input-modern" placeholder="Any notes about this application..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ height: 80, resize: 'vertical' }} />
              </div>
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem' }}>
                <button type="submit" style={{ flex: 1, padding: '0.875rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                  {editingApp ? '✅ Update Application' : '➕ Add Application'}
                </button>
                <button type="button" onClick={resetForm} style={{ padding: '0.875rem 1.5rem', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Search + Filter */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>🔍</span>
            <input className="input-modern" placeholder="Search by company or job title..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '2.5rem', background: 'white' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['all', ...Object.keys(STATUS_COLORS)].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '0.5rem 1rem', borderRadius: 20, border: 'none', cursor: 'pointer', background: statusFilter === s ? STATUS_COLORS[s] || '#6366f1' : 'white', color: statusFilter === s ? 'white' : '#64748b', fontWeight: 600, fontSize: '0.8rem', fontFamily: 'Inter, sans-serif', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', transition: 'all 0.2s' }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Applications list */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</p>
            <h3 style={{ color: '#0f172a', fontWeight: 700, marginBottom: '0.5rem' }}>No applications found</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Start tracking your job applications</p>
            <button onClick={() => setShowForm(true)} style={{ padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>+ Add First Application</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {filtered.map((app, i) => (
              <div key={app._id} className="card-hover" style={{ background: 'white', borderRadius: 14, padding: '1.25rem 1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `4px solid ${STATUS_COLORS[app.status]}`, animation: `fadeInUp 0.4s ease ${i * 0.05}s both` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: STATUS_BG[app.status], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
                    {COMPANY_ICONS[i % COMPANY_ICONS.length]}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', margin: '0 0 0.25rem' }}>{app.jobTitle}</h4>
                    <p style={{ color: '#64748b', fontSize: '0.82rem', margin: '0 0 0.5rem' }}>🏢 {app.companyName} {app.location && `• 📍 ${app.location}`}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{ background: STATUS_BG[app.status], color: STATUS_COLORS[app.status], padding: '0.2rem 0.75rem', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700 }}>{app.status}</span>
                      <span style={{ background: '#f1f5f9', color: '#64748b', padding: '0.2rem 0.75rem', borderRadius: 20, fontSize: '0.75rem', fontWeight: 500 }}>{app.jobType}</span>
                      {app.notes && <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>📝 {app.notes.substring(0, 40)}...</span>}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  {app.jobUrl && <a href={app.jobUrl} target="_blank" rel="noreferrer" style={{ padding: '0.5rem 0.875rem', background: '#f1f5f9', borderRadius: 8, textDecoration: 'none', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>🔗 Link</a>}
                  <button onClick={() => handleEdit(app)} style={{ padding: '0.5rem 0.875rem', background: '#fffbeb', color: '#d97706', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>✏️ Edit</button>
                  <button onClick={() => handleDelete(app._id)} style={{ padding: '0.5rem 0.875rem', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
