// src/components/Sidebar.js
import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  Chip,
  Collapse,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";

// Icons
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ScienceIcon from "@mui/icons-material/Science";
import DescriptionIcon from "@mui/icons-material/Description";
import HistoryIcon from "@mui/icons-material/History";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GppGoodIcon from "@mui/icons-material/GppGood";
import VerifiedIcon from "@mui/icons-material/Verified";

const COLORS = {
  primary: "#1A237E",
  secondary: "#00BCD4",
  accent: "#FF5722",
  success: "#4CAF50",
  background: "#F8F9FA",
  textDark: "#2C3E50",
  sidebarBg: "#FFFFFF",
  sidebarWidth: 280,
};

const StyledDrawer = styled(Drawer)({
  width: COLORS.sidebarWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: COLORS.sidebarWidth,
    boxSizing: "border-box",
    background: COLORS.sidebarBg,
    borderRight: `1px solid ${alpha(COLORS.primary, 0.08)}`,
    boxShadow: "4px 0 20px rgba(0, 0, 0, 0.02)",
  },
});

const LogoBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "24px 20px",
  borderBottom: `1px solid ${alpha(COLORS.primary, 0.08)}`,
  marginBottom: "16px",
});

const StyledListItemButton = styled(ListItemButton)(({ active }) => ({
  borderRadius: "12px",
  margin: "4px 12px",
  padding: "10px 16px",
  backgroundColor: active ? alpha(COLORS.primary, 0.08) : "transparent",
  color: active ? COLORS.primary : alpha(COLORS.textDark, 0.7),
  "&:hover": {
    backgroundColor: alpha(COLORS.primary, 0.05),
  },
  "& .MuiListItemIcon-root": {
    color: active ? COLORS.primary : alpha(COLORS.textDark, 0.5),
    minWidth: "40px",
  },
}));

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openReports, setOpenReports] = useState(false);

  const handleReportsClick = () => {
    setOpenReports(!openReports);
  };

  const navItems = [
    {
      section: "Verification",
      items: [
        { path: "/upload", label: "Upload Document", icon: <UploadFileIcon /> },
        { path: "/analysis", label: "Forensic Analysis", icon: <ScienceIcon /> },
      ],
    },
    {
      section: "Management",
      items: [
        { path: "/templates", label: "Template Library", icon: <DescriptionIcon /> },
        { path: "/history", label: "Verification History", icon: <HistoryIcon /> },
      ],
    },
    {
      section: "Reports & Settings",
      items: [
        { 
          label: "Forensic Reports", 
          icon: <AssessmentIcon />,
          hasSubmenu: true,
          subItems: [
            { path: "/reports/daily", label: "Daily Reports" },
            { path: "/reports/monthly", label: "Monthly Summary" },
            { path: "/reports/audit", label: "Audit Logs" },
          ]
        },
        { path: "/settings", label: "Settings", icon: <SettingsIcon /> },
      ],
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    // Add logout logic here
    navigate("/login");
  };

  return (
    <StyledDrawer variant="permanent" anchor="left">
      {/* Logo */}
      <LogoBox>
        <GppGoodIcon sx={{ color: COLORS.primary, fontSize: 32 }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          VERIDOC
        </Typography>
      </LogoBox>

      {/* User Profile */}
      <Box sx={{ px: 3, mb: 3, textAlign: "center" }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            margin: "0 auto",
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
            mb: 2,
          }}
        >
          VO
        </Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Verification Officer
        </Typography>
        <Chip
          label="Active"
          size="small"
          sx={{
            mt: 1,
            bgcolor: alpha(COLORS.success, 0.1),
            color: COLORS.success,
            fontSize: "0.7rem",
          }}
        />
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Navigation */}
      <Box sx={{ flex: 1 }}>
        {navItems.map((section, idx) => (
          <Box key={idx}>
            <Typography
              variant="caption"
              sx={{
                px: 3,
                py: 1,
                display: "block",
                color: alpha(COLORS.textDark, 0.5),
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              {section.section}
            </Typography>
            <List disablePadding>
              {section.items.map((item, itemIdx) => (
                <React.Fragment key={itemIdx}>
                  {item.hasSubmenu ? (
                    <>
                      <StyledListItemButton onClick={handleReportsClick}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                        {openReports ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </StyledListItemButton>
                      <Collapse in={openReports} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {item.subItems.map((subItem, subIdx) => (
                            <ListItemButton
                              key={subIdx}
                              sx={{
                                pl: 7,
                                borderRadius: "12px",
                                margin: "2px 12px",
                                "&:hover": {
                                  backgroundColor: alpha(COLORS.primary, 0.05),
                                },
                              }}
                              onClick={() => navigate(subItem.path)}
                            >
                              <ListItemText
                                primary={subItem.label}
                                primaryTypographyProps={{ variant: "body2" }}
                              />
                            </ListItemButton>
                          ))}
                        </List>
                      </Collapse>
                    </>
                  ) : (
                    <StyledListItemButton
                      active={isActive(item.path) ? 1 : 0}
                      onClick={() => navigate(item.path)}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                      {isActive(item.path) && (
                        <VerifiedIcon sx={{ fontSize: 16, color: COLORS.success }} />
                      )}
                    </StyledListItemButton>
                  )}
                </React.Fragment>
              ))}
            </List>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Footer - Logout */}
      <Box sx={{ p: 2, mb: 2 }}>
        <StyledListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledListItemButton>

        {/* Agent Status Indicator */}
        <Box sx={{ mt: 2, px: 2 }}>
          <Typography variant="caption" sx={{ color: alpha(COLORS.textDark, 0.5), display: "block", mb: 1 }}>
            5 Agents Active
          </Typography>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {["PDF", "CV", "CNN", "LLM", "RAG"].map((agent, i) => (
              <Chip
                key={i}
                label={agent}
                size="small"
                sx={{
                  fontSize: "0.65rem",
                  height: 20,
                  bgcolor: alpha(COLORS.secondary, 0.1),
                  color: COLORS.secondary,
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;