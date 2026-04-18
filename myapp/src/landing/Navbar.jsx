import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Container,
  Slide,
  Avatar,
  Chip,
  useMediaQuery,
  Badge,
  Divider,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";
import SecurityIcon from "@mui/icons-material/Security";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = {
  primary: "#1A237E",        // Deep Indigo - Trust & Security
  secondary: "#00BCD4",      // Cyan - Technology & Forensics
  accent: "#FF5722",         // Deep Orange - Alerts & Detection
  success: "#4CAF50",        // Green - Verified/Genuine
  warning: "#FFC107",        // Amber - Suspicious
  error: "#F44336",          // Red - Forgery Detected
  background: "#F8F9FA",     // Light Gray - Clean & Professional
  textDark: "#2C3E50",       // Dark Blue-Gray - Readability
  textLight: "#FFFFFF",      // White - Contrast
  hover: "#E8EAF6",          // Light Indigo - Interactions
  gradientStart: "#1A237E",
  gradientMid: "#00BCD4",
  gradientEnd: "#FF5722",
  glow: "rgba(26, 35, 126, 0.15)",
};

const StyledAppBar = styled(AppBar)(({ scrolled }) => ({
  background: scrolled
    ? alpha(COLORS.background, 0.98)
    : "transparent",
  backdropFilter: scrolled ? "blur(12px)" : "none",
  boxShadow: scrolled
    ? `0 4px 30px ${alpha(COLORS.primary, 0.12)}`
    : "none",
  transition: "all 0.3s ease-in-out",
  borderBottom: scrolled 
    ? `1px solid ${alpha(COLORS.primary, 0.08)}` 
    : "none",
}));

const NavButton = styled(Button)(({ active }) => ({
  color: active ? COLORS.primary : COLORS.textDark,
  fontSize: "0.95rem",
  fontWeight: active ? 600 : 500,
  textTransform: "none",
  padding: "8px 18px",
  position: "relative",
  overflow: "visible",
  borderRadius: "40px",
  transition: "all 0.3s ease",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: alpha(COLORS.primary, 0.05),
    borderRadius: "40px",
    opacity: active ? 1 : 0,
    transition: "opacity 0.3s ease",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "6px",
    left: "50%",
    transform: active
      ? "translateX(-50%) scaleX(1)"
      : "translateX(-50%) scaleX(0)",
    width: "24px",
    height: "3px",
    background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
    borderRadius: "3px",
    transition: "transform 0.3s ease-in-out",
  },
  "&:hover": {
    backgroundColor: "transparent",
    color: COLORS.primary,
    "&::before": {
      opacity: 1,
    },
    "&::after": {
      transform: "translateX(-50%) scaleX(1)",
    },
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
  color: COLORS.textLight,
  fontWeight: 600,
  textTransform: "none",
  fontSize: "0.95rem",
  padding: "8px 28px",
  borderRadius: "40px",
  boxShadow: `0 4px 15px ${alpha(COLORS.primary, 0.3)}`,
  transition: "all 0.3s ease-in-out",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, transparent, ${alpha(COLORS.textLight, 0.2)}, transparent)`,
    transition: "left 0.5s ease",
  },
  "&:hover": {
    background: `linear-gradient(135deg, ${COLORS.secondary}, ${COLORS.primary})`,
    transform: "translateY(-2px)",
    boxShadow: `0 6px 20px ${alpha(COLORS.primary, 0.4)}`,
    "&::before": {
      left: "100%",
    },
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary}, ${COLORS.accent})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 800,
  fontSize: "1.8rem",
  cursor: "pointer",
  letterSpacing: "0.5px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  position: "relative",
  "& .logo-icon": {
    fontSize: "2rem",
    color: COLORS.primary,
    filter: `drop-shadow(0 2px 8px ${alpha(COLORS.primary, 0.3)})`,
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    background: `linear-gradient(135deg, ${COLORS.background}, #FFFFFF)`,
    width: "100%",
    maxWidth: "380px",
    boxShadow: `-4px 0 30px ${alpha(COLORS.primary, 0.15)}`,
    borderLeft: `1px solid ${alpha(COLORS.primary, 0.1)}`,
  },
}));

const MobileNavItem = styled(ListItem)(({ active }) => ({
  borderRadius: "12px",
  marginBottom: "8px",
  padding: "12px 16px",
  background: active 
    ? `linear-gradient(135deg, ${alpha(COLORS.primary, 0.08)}, ${alpha(COLORS.secondary, 0.08)})`
    : "transparent",
  border: active ? `1px solid ${alpha(COLORS.primary, 0.2)}` : "none",
  transition: "all 0.2s ease",
  "&:hover": {
    background: alpha(COLORS.secondary, 0.12),
    transform: "translateX(4px)",
  },
}));

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveLink(id);
      setDrawerOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: <HomeIcon />, description: "Go to homepage" },
    { id: "about", label: "About Us", icon: <InfoIcon />, description: "Learn about VERIDOC" },
    { id: "contact", label: "Contact", icon: <ContactMailIcon />, description: "Get in touch with us" },
  ];

  return (
    <>
      <Slide appear={false} direction="down" in={!scrolled}>
        <StyledAppBar position="fixed" scrolled={scrolled ? 1 : 0} elevation={0}>
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ height: { xs: 70, md: 80 } }}>
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Logo variant="h4" onClick={() => scrollToSection("home")}>
                  <VerifiedIcon className="logo-icon" />
                  VERIDOC
                </Logo>
              </motion.div>

              {/* Desktop Navigation */}
              <Box sx={{ 
                flexGrow: 1, 
                display: { xs: "none", md: "flex" }, 
                justifyContent: "center", 
                gap: 1 
              }}>
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <NavButton
                      active={activeLink === item.id ? 1 : 0}
                      onClick={() => scrollToSection(item.id)}
                      startIcon={item.icon}
                    >
                      {item.label}
                    </NavButton>
                  </motion.div>
                ))}
              </Box>

              {/* Desktop Login Button */}
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <LoginButton 
                    onClick={() => navigate("/login")} 
                    endIcon={<ArrowForwardIcon />}
                  >
                    Officer Login
                  </LoginButton>
                </motion.div>
              </Box>

              {/* Mobile Menu Icon */}
              <IconButton
                sx={{
                  display: { xs: "flex", md: "none" },
                  color: COLORS.primary,
                  ml: "auto",
                  background: alpha(COLORS.primary, 0.1),
                  width: 45,
                  height: 45,
                  "&:hover": {
                    background: alpha(COLORS.primary, 0.2),
                  },
                }}
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </StyledAppBar>
      </Slide>

      {/* Mobile Drawer */}
      <StyledDrawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
          {/* Drawer Header */}
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            mb: 3 
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <VerifiedIcon sx={{ color: COLORS.primary, fontSize: 32 }} />
              <Typography variant="h6" sx={{ color: COLORS.primary, fontWeight: 700 }}>
                VERIDOC
              </Typography>
            </Box>
            <IconButton 
              onClick={() => setDrawerOpen(false)}
              sx={{ 
                color: COLORS.primary,
                background: alpha(COLORS.primary, 0.1),
                "&:hover": {
                  background: alpha(COLORS.primary, 0.2),
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Profile Section */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Box
                  sx={{
                    width: 14,
                    height: 14,
                    background: COLORS.success,
                    borderRadius: '50%',
                    border: `2px solid ${COLORS.background}`,
                    boxShadow: `0 0 0 2px ${alpha(COLORS.success, 0.3)}`,
                  }}
                />
              }
            >
              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  margin: "0 auto",
                  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                  fontSize: "2rem",
                  fontWeight: "bold",
                  border: `3px solid ${COLORS.primary}`,
                  boxShadow: `0 4px 20px ${alpha(COLORS.primary, 0.3)}`,
                }}
              >
                VD
              </Avatar>
            </Badge>
            <Typography variant="h6" sx={{ color: COLORS.textDark, mt: 2, fontWeight: 600 }}>
              Welcome to VERIDOC
            </Typography>
            <Chip
              label="Document Verification System"
              size="small"
              sx={{
                mt: 1,
                background: alpha(COLORS.secondary, 0.15),
                color: COLORS.primary,
                fontWeight: 500,
                border: `1px solid ${alpha(COLORS.primary, 0.2)}`,
              }}
            />
          </Box>

          <Divider sx={{ my: 2, background: alpha(COLORS.primary, 0.1) }} />

          {/* Navigation Items */}
          <List sx={{ flex: 1 }}>
            <AnimatePresence>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <MobileNavItem
                    button
                    active={activeLink === item.id ? 1 : 0}
                    onClick={() => scrollToSection(item.id)}
                  >
                    <ListItemIcon sx={{ 
                      color: activeLink === item.id ? COLORS.primary : alpha(COLORS.textDark, 0.7),
                      minWidth: 42,
                    }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.label}
                      secondary={item.description}
                      sx={{
                        "& .MuiListItemText-primary": {
                          color: activeLink === item.id ? COLORS.primary : COLORS.textDark,
                          fontWeight: activeLink === item.id ? 600 : 500,
                          fontSize: "1rem",
                        },
                        "& .MuiListItemText-secondary": {
                          color: alpha(COLORS.textDark, 0.6),
                          fontSize: "0.8rem",
                        },
                      }}
                    />
                  </MobileNavItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>

          {/* Login Button at Bottom */}
          <Box sx={{ mt: "auto", pt: 3 }}>
            <LoginButton
              fullWidth
              onClick={() => {
                setDrawerOpen(false);
                navigate("/login");
              }}
              endIcon={<LoginIcon />}
              sx={{ py: 1.8 }}
            >
              Officer Login
            </LoginButton>
            
            <Typography 
              variant="caption" 
              sx={{ 
                display: "block", 
                textAlign: "center", 
                mt: 2,
                color: alpha(COLORS.textDark, 0.5),
                cursor: "pointer",
                "&:hover": { color: COLORS.primary }
              }}
              onClick={() => {
                setDrawerOpen(false);
                navigate("/signup");
              }}
            >
              Don't have an account? <strong>Request Access</strong>
            </Typography>
          </Box>
        </Box>
      </StyledDrawer>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        
        .logo-icon {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;