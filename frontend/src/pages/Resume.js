import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const careerExamples = [
  { icon: '👨‍💻', role: 'Software Engineer', company: 'Google', score: 92 },
  { icon: '👩‍⚕️', role: 'Medical Doctor', company: 'Mayo Clinic', score: 88 },
  { icon: '👨‍🎨', role: 'UX Designer', company: 'Apple', score: 85 },
  { icon: '👩‍💼', role: 'Product Manager', company: 'Meta', score: 91 },
];

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

  const getScoreLabel = (score) => {
    if (score >= 75) return 'Excellent';
    if (score >= 50) return 'Good';
    return 'Needs Work';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
      {/* Navbar */}
      <nav style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#64748b', fontSize: '0.875rem', fontWeight: 500 }}>← Dashboard</Link>
          <span style={{ color: '#e2e8f0' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.1rem' }}>📄</span>
            <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>AI Resume Optimizer</span>
          </div>
        </div>
        <span style={{ fontSize: '0.8rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>Powered by AI 🤖</span>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem' }}>

        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)', borderRadius: 20, padding: '2.5rem', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)' }} />
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>AI Resume Optimizer 🤖</h1>
              <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: 500 }}>Upload your resume and get instant ATS score, missing keywords, and personalized suggestions to land more interviews.</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {careerExamples.map((c, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '1rem', textAlign: 'center', minWidth: 100 }}>
                  <p style={{ fontSize: '1.8rem', margin: '0 0 0.25rem' }}>{c.icon}</p>
                  <p style={{ color: 'white', fontSize: '0.72rem', fontWeight: 600, margin: '0 0 0.25rem' }}>{c.role}</p>
                  <p style={{ color: '#10b981', fontSize: '0.72rem', fontWeight: 700, margin: 0 }}>{c.score}% ATS</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Upload Form */}
          <div style={{ background: 'white', borderRadius: 16, padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a', marginBottom: '1.5rem' }}>📎 Upload & Analyze</h3>
            <form onSubmit={handleAnalyze}>
              {/* File Upload */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Resume (PDF only)</label>
                <label style={{ display: 'block', border: '2px dashed #c7d2fe', borderRadius: 12, padding: '2rem', textAlign: 'center', cursor: 'pointer', background: file ? '#eef2ff' : '#fafbff', transition: 'all 0.3s ease' }}>
                  <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} style={{ display: 'none' }} />
                  {file ? (
                    <div>
                      <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</p>
                      <p style={{ color: '#6366f1', fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>{file.name}</p>
                      <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: '0.25rem 0 0' }}>Click to change file</p>
                    </div>
                  ) : (
                    <div>
                      <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</p>
                      <p style={{ color: '#6366f1', fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>Click to upload PDF</p>
                      <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: '0.25rem 0 0' }}>Max size: 20MB</p>
                    </div>
                  )}
                </label>
              </div>

              {/* Job Description */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>Job Description</label>
                <textarea className="input-modern" placeholder="Paste the full job description here..." value={jobDescription} onChange={e => setJobDescription(e.target.value)} style={{ height: 180, resize: 'vertical' }} />
              </div>

              {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '0.875rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.875rem' }}>⚠️ {error}</div>
              )}

              <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.875rem', background: loading ? '#94a3b8' : 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.3s ease' }}>
                {loading ? '🔄 Analyzing your resume...' : '🚀 Analyze Resume'}
              </button>
            </form>
          </div>

          {/* Results */}
          <div>
            {!result ? (
              <div style={{ background: 'white', borderRadius: 16, padding: '3rem', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🤖</p>
                <h3 style={{ color: '#0f172a', fontWeight: 700, marginBottom: '0.5rem' }}>Ready to Analyze</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: 280, lineHeight: 1.6 }}>Upload your resume and paste a job description to get your personalized ATS report.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2rem', width: '100%', maxWidth: 280 }}>
                  {['ATS Compatibility Score', 'Job Match Percentage', 'Missing Keywords', 'Improvement Suggestions'].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c7d2fe', flexShrink: 0 }} />
                      <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'fadeInUp 0.5s ease' }}>
                {/* Score cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {[
                    { label: 'ATS Score', value: result.ats_score, icon: '🎯' },
                    { label: 'Job Match', value: result.match_percentage, icon: '📊' },
                  ].map((card, i) => (
                    <div key={i} style={{ background: 'white', borderRadius: 14, padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', textAlign: 'center', borderTop: `4px solid ${getScoreColor(card.value)}` }}>
                      <p style={{ fontSize: '1.5rem', margin: '0 0 0.5rem' }}>{card.icon}</p>
                      <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: getScoreColor(card.value), margin: '0 0 0.25rem' }}>{card.value}%</h2>
                      <p style={{ color: '#64748b', fontSize: '0.82rem', margin: '0 0 0.25rem' }}>{card.label}</p>
                      <span style={{ background: getScoreColor(card.value) + '20', color: getScoreColor(card.value), fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 20 }}>{getScoreLabel(card.value)}</span>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div style={{ background: 'white', borderRadius: 14, padding: '1.25rem', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                  <h4 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', fontSize: '0.9rem' }}>📋 Overall Assessment</h4>
                  <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{result.summary}</p>
                </div>

                {/* Keywords */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ background: 'white', borderRadius: 14, padding: '1.25rem', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                    <h4 style={{ fontWeight: 700, color: '#10b981', marginBottom: '0.75rem', fontSize: '0.9rem' }}>✅ Strong Keywords</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {result.strong_keywords?.map((kw, i) => (
                        <span key={i} style={{ background: '#d1fae5', color: '#065f46', padding: '0.25rem 0.65rem', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600 }}>{kw}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ background: 'white', borderRadius: 14, padding: '1.25rem', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                    <h4 style={{ fontWeight: 700, color: '#ef4444', marginBottom: '0.75rem', fontSize: '0.9rem' }}>❌ Missing Keywords</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {result.missing_keywords?.map((kw, i) => (
                        <span key={i} style={{ background: '#fee2e2', color: '#991b1b', padding: '0.25rem 0.65rem', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600 }}>{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div style={{ background: 'white', borderRadius: 14, padding: '1.25rem', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                  <h4 style={{ fontWeight: 700, color: '#6366f1', marginBottom: '0.75rem', fontSize: '0.9rem' }}>💡 Improvement Suggestions</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {result.suggestions?.map((s, i) => (
                      <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: 8 }}>
                        <span style={{ color: '#6366f1', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>{i + 1}.</span>
                        <p style={{ color: '#475569', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
