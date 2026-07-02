import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Resume = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file) return setError('Please upload a PDF resume');
    if (!jobDescription) return setError('Please enter a job description');
    setError('');
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobDescription', jobDescription);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/resume/analyze`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
    }
    setLoading(false);
  };

  const getScoreColor = (score) => {
    if (score >= 75) return '#10b981';
    if (score >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <Link to="/dashboard" style={{ color: '#6366f1', textDecoration: 'none' }}>← Dashboard</Link>
      <h2 style={{ marginTop: '.5rem' }}>📄 AI Resume Optimizer</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Upload your resume and paste a job description to get AI-powered feedback.</p>

      <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,.08)' }}>
        <form onSubmit={handleAnalyze}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '.5rem' }}>📎 Upload Resume (PDF only)</label>
            <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} style={{ width: '100%', padding: '.75rem', border: '2px dashed #e2e8f0', borderRadius: 8, cursor: 'pointer' }} />
            {file && <p style={{ color: '#10b981', marginTop: '.25rem', fontSize: '.9rem' }}>✅ {file.name} selected</p>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '.5rem' }}>📋 Job Description</label>
            <textarea
              placeholder="Paste the full job description here..."
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              style={{ width: '100%', padding: '.75rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '1rem', height: 150, resize: 'vertical' }}
            />
          </div>

          {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '.75rem', background: loading ? '#94a3b8' : '#6366f1', color: '#fff', border: 'none', borderRadius: 8, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? '🔄 Analyzing your resume...' : '🚀 Analyze Resume'}
          </button>
        </form>
      </div>

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'ATS Score', value: `${result.ats_score}%`, color: getScoreColor(result.ats_score) },
              { label: 'Job Match', value: `${result.match_percentage}%`, color: getScoreColor(result.match_percentage) },
            ].map(card => (
              <div key={card.label} style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,.08)', textAlign: 'center', borderTop: `4px solid ${card.color}` }}>
                <p style={{ color: '#64748b', margin: 0 }}>{card.label}</p>
                <h2 style={{ color: card.color, fontSize: '2.5rem', margin: '.25rem 0' }}>{card.value}</h2>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,.08)', marginBottom: '1rem' }}>
            <h3>📊 Overall Assessment</h3>
            <p style={{ color: '#64748b', marginTop: '.5rem', lineHeight: 1.6 }}>{result.summary}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,.08)' }}>
              <h3 style={{ color: '#10b981' }}>✅ Strong Keywords</h3>
              <div style={{ marginTop: '.75rem', display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
                {result.strong_keywords?.map((kw, i) => (
                  <span key={i} style={{ background: '#d1fae5', color: '#065f46', padding: '.3rem .75rem', borderRadius: 20, fontSize: '.85rem' }}>{kw}</span>
                ))}
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,.08)' }}>
              <h3 style={{ color: '#ef4444' }}>❌ Missing Keywords</h3>
              <div style={{ marginTop: '.75rem', display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
                {result.missing_keywords?.map((kw, i) => (
                  <span key={i} style={{ background: '#fee2e2', color: '#991b1b', padding: '.3rem .75rem', borderRadius: 20, fontSize: '.85rem' }}>{kw}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,.08)' }}>
            <h3 style={{ color: '#6366f1' }}>💡 Improvement Suggestions</h3>
            <ul style={{ marginTop: '.75rem', paddingLeft: '1.5rem' }}>
              {result.suggestions?.map((s, i) => (
                <li key={i} style={{ color: '#64748b', marginBottom: '.5rem', lineHeight: 1.6 }}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume;
