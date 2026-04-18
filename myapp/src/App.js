import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import HomePage from './landing/HomePage';
import UploadPage from './pages/UploadPage';
import AnalysisPage from './pages/AnalysisPage';
import ForensicReports from './pages/ForensicReports';
import VerificationHistory from './pages/VerificationHistory';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

// Layout with Sidebar
const DashboardLayout = ({ children }) => {
  const [activePage, setActivePage] = React.useState('dashboard');
  
  const handleNavigate = (pageId, path) => {
    setActivePage(pageId);
    window.location.href = path;
  };
  
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />
      <div style={{ flex: 1, marginLeft: '260px' }}>
        {children}
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  
  // Check if user is logged in
  React.useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user_email');
    console.log('Auth check - token:', !!token, 'user:', !!user);
    if (token || user) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <Login setIsAuthenticated={setIsAuthenticated} />
          } 
        />
        
        {/* Protected Routes with Sidebar */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/upload"
          element={
            isAuthenticated ? (
              <DashboardLayout>
                <UploadPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/analysis/:caseId?"
          element={
            isAuthenticated ? (
              <DashboardLayout>
                <AnalysisPage />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/reports"
          element={
            isAuthenticated ? (
              <DashboardLayout>
                <ForensicReports />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/history"
          element={
            isAuthenticated ? (
              <DashboardLayout>
                <VerificationHistory />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/settings"
          element={
            isAuthenticated ? (
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        {/* 404 */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;