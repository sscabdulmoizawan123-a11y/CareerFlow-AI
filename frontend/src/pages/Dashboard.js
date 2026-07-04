import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const careerPeople = [
  { img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop&crop=face', role: 'Software Engineer', company: 'Google', salary: '$150k+', color: '#7c3aed', tag: '🔥 Hot' },
  { img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=400&fit=crop&crop=face', role: 'Medical Doctor', company: 'Mayo Clinic', salary: '$180k+', color: '#10b981', tag: '🏥 Healthcare' },
  { img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=400&fit=crop&crop=face', role: 'Business Executive', company: 'McKinsey', salary: '$200k+', color: '#f59e0b', tag: '💼 Business' },
  { img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=400&fit=crop&crop=face', role: 'Data Scientist', company: 'Tesla', salary: '$140k+', color: '#ec4899', tag: '📊 Analytics' },
  { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face', role: 'Product Manager', company: 'Meta', salary: '$160k+', color: '#3b82f6', tag: '🚀 Tech' },
  { img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=400&fit=crop&crop=face', role: 'Nurse Practitioner', company: 'Johns Hopkins', salary: '$120k+', color: '#06b6d4', tag: '💊 Medical' },
];

const STATUS_COLORS = {
  bookmarked: '#7c3aed', applied: '#3b82f6', interview: '#f59e0b',
  offer: '#10b981', rejected: '#ef4444', withdrawn: '#64748b',
};

const tips = [
  { icon: '🎯', text: 'Tailor resume keywords to each job' },
  { icon: '🔑', text: 'Add quantifiable achievements' },
  { icon: '📈', text: 'Follow up within 5-7 days' },
  { icon: '🤝', text: 'Network on LinkedIn daily' },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentApps, setRecentApps] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/dashboard/stats`).then(res => setStats(res.data.data)).catch(console.error);
    axios.get(`${process.env.REACT_APP_API_URL}/applications`).then(res => setRecentApps(res.data.data.slice(0, 4))).catch(console.error);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const h = currentTime.getHours();
    if (h < 12) return '🌅 Good morning';
    if (h < 17) return '☀️ Good afternoon';
    return '🌙 Good evening';
  };

  const getCount = (status) => stats?.byStatus?.find(s => s._id === status)?.count ?? 0;

  const cards = [
    { label: 'Total Applications', value: stats?.total ?? 0, icon: '📋', gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)' },
    { label: 'Interviews', value: getCount('interview'), icon: '🎤', gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
    { label: 'Offers', value: getCount('offer'), icon: '🎉', gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
    { label: 'Rejected', value: getCount('rejected'), icon: '❌', gradient: 'linear-gradient(135deg, #ef4444, #f87171)' },
  ];

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif', background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 30%, #2d1b69 60%, #1a1a3e 100%)', position: 'relative', overflow: 'hidden' }}>

      {/* Animated background blobs */}
      <div style={{ position: 'fixed', top: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', top: '50%', right: '5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)', animation: 'floatReverse 10s ease-in-out infinite', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '10%', left: '30%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', animation: 'float 12s ease-in-out infinite', pointerEvents: 'none', zIndex: 0 }} />

      {/* Navbar */}
      <nav style={{ background: 'rgba(15,15,35,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 2rem', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 4px 15px rgba(124,58,237,0.5)' }}>🚀</div>
            <span style={{ fontWeight: 900, fontSize: '1.2rem', background: 'linear-gradient(135deg, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CareerFlow AI</span>
          </div>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {[['🏠', 'Dashboard', '/dashboard'], ['📋', 'Applications', '/applications'], ['📄', 'Resume AI', '/resume']].map(([icon, label, path]) => (
              <Link key={path} to={path} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', borderRadius: 10, textDecoration: 'none', color: '#c4b5fd', fontSize: '0.875rem', fontWeight: 500, transition: 'all 0.2s', background: 'rgba(255,255,255,0.05)' }}>
                {icon} {label}
              </Link>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.875rem', color: 'white' }}>{user?.name}</p>
            <p style={{ margin: 0, fontSize: '0.72rem', color: '#a78bfa' }}>Pro Member ✨</p>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1rem', boxShadow: '0 4px 15px rgba(124,58,237,0.4)' }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <button onClick={logout} style={{ padding: '0.5rem 1.1rem', background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: '0.82rem', fontFamily: 'Inter, sans-serif' }}>Logout</button>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem', position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <div style={{ borderRadius: 24, padding: '2.5rem 3rem', marginBottom: '2rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', animation: 'fadeInUp 0.6s ease', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)' }} />
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#a78bfa', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>{getGreeting()}</p>
              <h1 style={{ color: 'white', fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.75rem', lineHeight: 1.2 }}>
                {user?.name} 👋<br />
                <span style={{ background: 'linear-gradient(135deg, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Your Career Dashboard</span>
              </h1>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.75rem' }}>{stats?.total ?? 0} applications tracked • Keep pushing forward!</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/applications" style={{ padding: '0.75rem 1.75rem', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: 'white', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 4px 20px rgba(124,58,237,0.5)' }}>+ Add Application</Link>
                <Link to="/resume" style={{ padding: '0.75rem 1.75rem', background: 'rgba(255,255,255,0.08)', color: 'white', borderRadius: 12, textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.15)' }}>🤖 AI Resume Check</Link>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[{ label: 'Applied', value: getCount('applied'), color: '#a78bfa' }, { label: 'Interviews', value: getCount('interview'), color: '#fbbf24' }, { label: 'Offers', value: getCount('offer'), color: '#34d399' }].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '1.5rem', textAlign: 'center', minWidth: 90 }}>
                  <h3 style={{ color: s.color, fontSize: '2rem', fontWeight: 900, margin: 0 }}>{s.value}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.78rem', margin: '0.25rem 0 0' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
          {cards.map((card, i) => (
            <div key={i} className="card-hover" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '1.5rem', animation: `fadeInUp 0.5s ease ${i * 0.1}s both` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: card.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>{card.icon}</div>
              </div>
              <h3 style={{ fontSize: '2.4rem', fontWeight: 900, color: 'white', margin: '0 0 0.25rem' }}>{card.value}</h3>
              <p style={{ color: '#64748b', fontSize: '0.82rem', margin: 0 }}>{card.label}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Recent Apps */}
          <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1rem', color: 'white', margin: 0 }}>Recent Applications</h3>
              <Link to="/applications" style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 700, textDecoration: 'none', background: 'rgba(167,139,250,0.15)', padding: '0.3rem 0.875rem', borderRadius: 20 }}>View all →</Link>
            </div>
            {recentApps.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📭</p>
                <Link to="/applications" style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>Add your first application →</Link>
              </div>
            ) : recentApps.map((app, i) => (
              <div key={app._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem 0', borderBottom: i < recentApps.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(124,58,237,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>🏢</div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'white', margin: 0 }}>{app.jobTitle}</p>
                    <p style={{ color: '#64748b', fontSize: '0.78rem', margin: '0.1rem 0 0' }}>{app.companyName}</p>
                  </div>
                </div>
                <span style={{ background: STATUS_COLORS[app.status] + '25', color: STATUS_COLORS[app.status], padding: '0.25rem 0.75rem', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700 }}>{app.status}</span>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div style={{ background: 'rgba(124,58,237,0.12)', backdropFilter: 'blur(20px)', border: '1px solid rgba(124,58,237,0.25)', borderRadius: 18, padding: '1.75rem' }}>
            <h3 style={{ fontWeight: 800, fontSize: '1rem', color: 'white', marginBottom: '1.25rem' }}>💡 Career Tips</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {tips.map((tip, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', padding: '0.875rem', background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{tip.icon}</span>
                  <p style={{ color: '#c4b5fd', fontSize: '0.82rem', margin: 0, lineHeight: 1.5 }}>{tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Career People Section */}
        <div style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: 'white', margin: 0 }}>🌟 Career Paths & Opportunities</h3>
              <p style={{ color: '#64748b', fontSize: '0.8rem', margin: '0.25rem 0 0' }}>Real professionals, real opportunities</p>
            </div>
            <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700, background: 'rgba(16,185,129,0.15)', padding: '0.3rem 0.875rem', borderRadius: 20, border: '1px solid rgba(16,185,129,0.3)' }}>● Live Openings</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {careerPeople.map((career, i) => (
              <div key={i} className="card-hover" style={{ borderRadius: 16, overflow: 'hidden', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', animation: `fadeInUp 0.5s ease ${i * 0.08}s both` }}>
                <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                  <img src={career.img} alt={career.role} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.8))' }} />
                  <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(0,0,0,0.7)', color: 'white', fontSize: '0.72rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: 20, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)' }}>{career.tag}</span>
                  <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.875rem', right: '0.875rem' }}>
                    <p style={{ color: 'white', fontWeight: 800, fontSize: '0.9rem', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{career.role}</p>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', margin: '0.1rem 0 0' }}>{career.company}</p>
                  </div>
                </div>
                <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ color: career.color, fontSize: '0.95rem', fontWeight: 800 }}>{career.salary}</span>
                    <p style={{ color: '#64748b', fontSize: '0.72rem', margin: '0.1rem 0 0' }}>avg. salary</p>
                  </div>
                  <Link to="/applications" style={{ fontSize: '0.78rem', color: 'white', fontWeight: 700, textDecoration: 'none', background: `linear-gradient(135deg, ${career.color}, ${career.color}99)`, padding: '0.4rem 1rem', borderRadius: 20, boxShadow: `0 4px 12px ${career.color}40` }}>Apply Now →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
