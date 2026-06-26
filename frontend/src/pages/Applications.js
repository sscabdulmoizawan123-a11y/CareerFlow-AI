import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const STATUS_COLORS = {
  bookmarked: '#6366f1',
  applied: '#3b82f6',
  interview: '#f59e0b',
  offer: '#10b981',
  rejected: '#ef4444',
  withdrawn: '#64748b',
};

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [form, setForm] = useState({ companyName: '', jobTitle: '', jobType: 'full-time', status: 'applied', location: '', jobUrl: '', notes: '' });

  useEffect(() => { fetchApplications(); }, []);

  useEffect(() => {
    if (statusFilter === 'all') setFiltered(applications);
    else setFiltered(applications.filter(a => a.status === statusFilter));
  }, [statusFilter, applications]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/applications`);
      setApplications(res.data.data);
    } catch (err) { console.error(err); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingApp) {
        await axios.put(`${process.env.REACT_APP_API_URL}/applications/${editingApp._id}`, form);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/applications`, form);
      }
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

  return (
    <div style={{ padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/dashboard" style={{ color: '#6366f1', textDecoration: 'none' }}>← Dashboard</Link>
          <h2 style={{ marginTop: '.5rem' }}>📋 My Applications</h2>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: '.75rem 1.5rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '1rem' }}>
          {showForm ? 'Cancel' : '+ Add Application'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginTop: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,.08)' }}>
          <h3>{editingApp ? 'Edit Application' : 'Add New Application'}</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input placeholder="Company Name *" value={form.companyName} onChange={e => setForm({ ...form, companyName: e.target.value })} required style={inputStyle} />
            <input placeholder="Job Title *" value={form.jobTitle} onChange={e => setForm({ ...form, jobTitle: e.target.value })} required style={inputStyle} />
            <select value={form.jobType} onChange={e => setForm({ ...form, jobType: e.target.value })} style={inputStyle}>
              <option value="full-time">Full Time</option>
              <option value="internship">Internship</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
            </select>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={inputStyle}>
              <option value="bookmarked">Bookmarked</option>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
            <input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} style={inputStyle} />
            <input placeholder="Job URL" value={form.jobUrl} onChange={e => setForm({ ...form, jobUrl: e.target.value })} style={inputStyle} />
            <textarea placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ ...inputStyle, gridColumn: '1 / -1', height: 80, resize: 'vertical' }} />
            <button type="submit" style={{ gridColumn: '1 / -1', padding: '.75rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, fontSize: '1rem', cursor: 'pointer' }}>
              {editingApp ? 'Update Application' : 'Add Application'}
            </button>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', gap: '.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
        {['all', 'bookmarked', 'applied', 'interview', 'offer', 'rejected', 'withdrawn'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '.4rem 1rem', borderRadius: 20, border: 'none', cursor: 'pointer', background: statusFilter === s ? '#6366f1' : '#e2e8f0', color: statusFilter === s ? '#fff' : '#64748b', fontWeight: statusFilter === s ? 600 : 400 }}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b', background: '#fff', borderRadius: 12 }}>
            <p style={{ fontSize: '1.2rem' }}>No applications yet!</p>
            <p>Click "Add Application" to get started.</p>
          </div>
        ) : (
          filtered.map(app => (
            <div key={app._id} style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem', boxShadow: '0 2px 10px rgba(0,0,0,.08)', borderLeft: `4px solid ${STATUS_COLORS[app.status]}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: 0 }}>{app.jobTitle}</h3>
                  <p style={{ color: '#64748b', margin: '.25rem 0' }}>🏢 {app.companyName} {app.location && `• 📍 ${app.location}`}</p>
                  <span style={{ background: STATUS_COLORS[app.status], color: '#fff', padding: '.2rem .75rem', borderRadius: 20, fontSize: '.8rem' }}>{app.status}</span>
                  <span style={{ marginLeft: '.5rem', color: '#64748b', fontSize: '.85rem' }}>{app.jobType}</span>
                  {app.notes && <p style={{ marginTop: '.5rem', color: '#64748b', fontSize: '.9rem' }}>📝 {app.notes}</p>}
                </div>
                <div style={{ display: 'flex', gap: '.5rem' }}>
                  {app.jobUrl && <a href={app.jobUrl} target="_blank" rel="noreferrer" style={{ padding: '.4rem .8rem', background: '#e2e8f0', borderRadius: 6, textDecoration: 'none', color: '#64748b', fontSize: '.85rem' }}>🔗 Link</a>}
                  <button onClick={() => handleEdit(app)} style={{ padding: '.4rem .8rem', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>✏️ Edit</button>
                  <button onClick={() => handleDelete(app._id)} style={{ padding: '.4rem .8rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>🗑️ Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const inputStyle = { width: '100%', padding: '.75rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '1rem' };

export default Applications;
