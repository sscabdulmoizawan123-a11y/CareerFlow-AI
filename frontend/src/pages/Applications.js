import React from 'react';
import { Link } from 'react-router-dom';

const Applications = () => (
  <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
    <Link to="/dashboard" style={{ color: '#6366f1', textDecoration: 'none' }}>← Back to Dashboard</Link>
    <h2 style={{ marginTop: '1rem' }}>📋 My Applications</h2>
    <p style={{ color: '#64748b', marginTop: '.5rem' }}>Application tracking UI — coming in Week 2!</p>
  </div>
);

export default Applications;
