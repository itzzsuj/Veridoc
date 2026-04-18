import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Upload, FileSearch, History, Settings, Home, Shield, Activity 
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'upload', label: 'Upload Document', icon: Upload, path: '/upload' },
    { id: 'analysis', label: 'Live Analysis', icon: Activity, path: '/analysis', badge: 'LIVE' },
    { id: 'reports', label: 'Forensic Reports', icon: FileSearch, path: '/reports' },
    { id: 'history', label: 'History', icon: History, path: '/history' },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  // Determine active page from current URL
  const getActivePage = () => {
    const path = location.pathname;
    if (path.includes('/upload')) return 'upload';
    if (path.includes('/analysis')) return 'analysis';
    if (path.includes('/reports')) return 'reports';
    if (path.includes('/history')) return 'history';
    if (path.includes('/settings')) return 'settings';
    return 'home';
  };

  const activePage = getActivePage();

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <div className="logo">
          <Shield size={28} className="logo-icon" />
          <span className="logo-text">VeriDoc AI</span>
        </div>
        <div className="logo-badge">Forensic Suite</div>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavigate(item.path)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="sidebar-footer">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavigate(item.path)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Status */}
      <div className="sidebar-status">
        <div className="status-indicator online">
          <span className="status-dot"></span>
          <span>System Online</span>
        </div>
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span>5 Agents Ready</span>
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          background: linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%);
          color: #ffffff;
          display: flex;
          flex-direction: column;
          padding: 20px 12px;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          position: fixed;
          left: 0;
          top: 0;
        }

        .sidebar-header {
          margin-bottom: 32px;
          padding: 0 8px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .logo-icon {
          color: #6366f1;
        }

        .logo-text {
          font-size: 20px;
          font-weight: 700;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-badge {
          font-size: 11px;
          color: #a0aec0;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-left: 38px;
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: transparent;
          border: none;
          color: #a0aec0;
          font-size: 14px;
          font-weight: 500;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          text-align: left;
          position: relative;
        }

        .nav-item:hover {
          background: rgba(99, 102, 241, 0.1);
          color: #ffffff;
        }

        .nav-item.active {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .nav-badge {
          margin-left: auto;
          font-size: 10px;
          padding: 2px 6px;
          background: #ef4444;
          color: white;
          border-radius: 4px;
          font-weight: 600;
        }

        .sidebar-footer {
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 20px;
        }

        .sidebar-status {
          padding: 16px 8px 8px;
          font-size: 12px;
          color: #a0aec0;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
        }

        .status-indicator.online .status-dot {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;