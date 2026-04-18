// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// Components
import Sidebar from "./components/Sidebar";

// Existing Pages
import Main from "./landing/Main";
import Login from "./login";
import Signup from "./signup";

// New Forensic Pages
import UploadPage from "./pages/UploadPage";
import AnalysisPage from "./pages/AnalysisPage";
import TemplateLibrary from "./pages/TemplateLibrary";
import VerificationHistory from "./pages/VerificationHistory";
import ForensicReports from "./pages/ForensicReports";
import Settings from "./pages/Settings";

const MainContent = styled(Box)({
  flex: 1,
  marginLeft: "280px",
  minHeight: "100vh",
  background: "#F8F9FA",
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - no sidebar */}
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected routes with sidebar */}
        <Route
          path="/upload"
          element={
            <Box sx={{ display: "flex" }}>
              <Sidebar />
              <MainContent>
                <UploadPage />
              </MainContent>
            </Box>
          }
        />
        
        <Route
          path="/analysis"
          element={
            <Box sx={{ display: "flex" }}>
              <Sidebar />
              <MainContent>
                <AnalysisPage />
              </MainContent>
            </Box>
          }
        />
        
        <Route
          path="/templates"
          element={
            <Box sx={{ display: "flex" }}>
              <Sidebar />
              <MainContent>
                <TemplateLibrary />
              </MainContent>
            </Box>
          }
        />
        
        <Route
          path="/history"
          element={
            <Box sx={{ display: "flex" }}>
              <Sidebar />
              <MainContent>
                <VerificationHistory />
              </MainContent>
            </Box>
          }
        />
        
        <Route
          path="/reports"
          element={
            <Box sx={{ display: "flex" }}>
              <Sidebar />
              <MainContent>
                <ForensicReports />
              </MainContent>
            </Box>
          }
        />
        
        <Route
          path="/settings"
          element={
            <Box sx={{ display: "flex" }}>
              <Sidebar />
              <MainContent>
                <Settings />
              </MainContent>
            </Box>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;