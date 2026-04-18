import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, FileSearch, Shield, TrendingUp, AlertCircle, 
  CheckCircle, Clock, Activity, ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Stats data
  const stats = [
    { label: 'Documents Analyzed', value: '1,284', icon: FileSearch, color: '#6366f1', trend: '+12%' },
    { label: 'Forgeries Detected', value: '342', icon: AlertCircle, color: '#ef4444', trend: '+5%' },
    { label: 'Genuine Verified', value: '942', icon: CheckCircle, color: '#10b981', trend: '+8%' },
    { label: 'Accuracy Rate', value: '94.2%', icon: TrendingUp, color: '#f59e0b', trend: '+2.1%' },
  ];
  
  // Recent cases
  const recentCases = [
    { id: 'a7f3b9c2', filename: '12th_marksheet_tn.pdf', verdict: 'Genuine', confidence: 0.94, date: '2026-04-18', language: 'ta' },
    { id: 'b8e4c1d3', filename: 'degree_certificate_anna.pdf', verdict: 'Suspicious', confidence: 0.67, date: '2026-04-17', language: 'ta' },
    { id: 'c9d5e2f4', filename: 'cbse_10th_marksheet.pdf', verdict: 'Genuine', confidence: 0.91, date: '2026-04-17', language: 'hi' },
    { id: 'd1e6f3g5', filename: 'karnataka_puc.pdf', verdict: 'High Risk', confidence: 0.23, date: '2026-04-16', language: 'kn' },
  ];
  
  // Agent status
  const agents = [
    { name: 'Structural Agent', status: 'online', lastActive: '2 min ago' },
    { name: 'Visual Forensics', status: 'online', lastActive: '5 min ago' },
    { name: 'Stamp CNN', status: 'online', lastActive: '1 min ago' },
    { name: 'Vision LLM', status: 'online', lastActive: '3 min ago' },
    { name: 'Embeddings Agent', status: 'online', lastActive: '4 min ago' },
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">
            Welcome back! Here's your document verification overview.
          </p>
        </div>
        <button 
          className="upload-cta"
          onClick={() => navigate('/upload')}
        >
          <Upload size={18} />
          New Verification
        </button>
      </div>
      
      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="stat-card">
              <div className="stat-header">
                <span className="stat-label">{stat.label}</span>
                <Icon size={22} color={stat.color} />
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-trend">{stat.trend} from last week</div>
            </div>
          );
        })}
      </div>
      
      {/* Two Column Layout */}
      <div className="dashboard-grid">
        {/* Left Column - Recent Cases */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">Recent Verifications</h2>
            <button 
              className="view-all"
              onClick={() => navigate('/history')}
            >
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="cases-list">
            {recentCases.map((case_) => (
              <div key={case_.id} className="case-item">
                <div className="case-info">
                  <div className="case-filename">{case_.filename}</div>
                  <div className="case-meta">
                    <span className="case-id">{case_.id}</span>
                    <span className="case-language">{case_.language.toUpperCase()}</span>
                    <span className="case-date">{case_.date}</span>
                  </div>
                </div>
                <div className="case-result">
                  <span className={`verdict-badge ${case_.verdict.toLowerCase().replace(' ', '-')}`}>
                    {case_.verdict}
                  </span>
                  <span className="confidence">{Math.round(case_.confidence * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Column - System Status & Quick Info */}
        <div className="dashboard-side">
          {/* Agent Status Card */}
          <div className="dashboard-card">
            <div className="card-header">
              <h2 className="card-title">Agent Status</h2>
              <Activity size={18} color="#10b981" />
            </div>
            <div className="agents-list">
              {agents.map((agent, idx) => (
                <div key={idx} className="agent-item">
                  <div className="agent-info">
                    <span className={`status-dot ${agent.status}`}></span>
                    <span className="agent-name">{agent.name}</span>
                  </div>
                  <span className="agent-last-active">{agent.lastActive}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Actions Card */}
          <div className="dashboard-card">
            <h2 className="card-title">Quick Actions</h2>
            <div className="quick-actions">
              <button className="quick-action-btn" onClick={() => navigate('/upload')}>
                <Upload size={18} />
                Upload Document
              </button>
              <button className="quick-action-btn" onClick={() => navigate('/reports')}>
                <FileSearch size={18} />
                View Reports
              </button>
              <button className="quick-action-btn" onClick={() => navigate('/analysis')}>
                <Activity size={18} />
                Live Analysis
              </button>
            </div>
          </div>
          
          {/* System Info */}
          <div className="dashboard-card system-info">
            <div className="system-row">
              <span>System Version</span>
              <strong>v1.0.0</strong>
            </div>
            <div className="system-row">
              <span>API Status</span>
              <span className="status-badge online">Online</span>
            </div>
            <div className="system-row">
              <span>Firebase</span>
              <span className="status-badge online">Connected</span>
            </div>
            <div className="system-row">
              <span>OCR Languages</span>
              <strong>5 Loaded</strong>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .dashboard-container {
          padding: 32px;
          background: #f8fafc;
          min-height: 100vh;
        }
        
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }
        
        .dashboard-title {
          font-size: 28px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }
        
        .dashboard-subtitle {
          color: #64748b;
          font-size: 15px;
        }
        
        .upload-cta {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          transition: transform 0.2s;
        }
        
        .upload-cta:hover {
          transform: translateY(-2px);
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }
        
        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
        }
        
        .stat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        
        .stat-label {
          color: #64748b;
          font-size: 14px;
          font-weight: 500;
        }
        
        .stat-value {
          font-size: 36px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 8px;
        }
        
        .stat-trend {
          color: #10b981;
          font-size: 13px;
          font-weight: 500;
        }
        
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 24px;
        }
        
        .dashboard-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
          margin-bottom: 24px;
        }
        
        .dashboard-side .dashboard-card:last-child {
          margin-bottom: 0;
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .card-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
        }
        
        .view-all {
          background: none;
          border: none;
          color: #6366f1;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .cases-list {
          display: flex;
          flex-direction: column;
        }
        
        .case-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .case-item:last-child {
          border-bottom: none;
        }
        
        .case-info {
          flex: 1;
        }
        
        .case-filename {
          font-weight: 500;
          color: #1e293b;
          margin-bottom: 6px;
        }
        
        .case-meta {
          display: flex;
          gap: 16px;
          font-size: 12px;
          color: #94a3b8;
        }
        
        .case-id {
          font-family: monospace;
        }
        
        .case-result {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .verdict-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .verdict-badge.genuine {
          background: #dcfce7;
          color: #166534;
        }
        
        .verdict-badge.suspicious {
          background: #fef3c7;
          color: #92400e;
        }
        
        .verdict-badge.high-risk {
          background: #fee2e2;
          color: #991b1b;
        }
        
        .confidence {
          font-weight: 600;
          color: #1e293b;
        }
        
        .agents-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .agent-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .agent-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
        }
        
        .status-dot.online {
          animation: pulse 2s infinite;
        }
        
        .agent-name {
          font-size: 14px;
          color: #1e293b;
        }
        
        .agent-last-active {
          font-size: 12px;
          color: #94a3b8;
        }
        
        .quick-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .quick-action-btn {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #1e293b;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.2s;
        }
        
        .quick-action-btn:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }
        
        .system-info {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .system-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: #64748b;
        }
        
        .system-row strong {
          color: #1e293b;
        }
        
        .status-badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .status-badge.online {
          background: #dcfce7;
          color: #166534;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;