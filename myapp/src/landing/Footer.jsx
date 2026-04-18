// src/components/Footer.js
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import SecurityIcon from "@mui/icons-material/Security";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import VerifiedIcon from "@mui/icons-material/Verified";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SpeedIcon from "@mui/icons-material/Speed";
import GppGoodIcon from "@mui/icons-material/GppGood";

const COLORS = {
  primary: "#1A237E",
  secondary: "#00BCD4",
  accent: "#FF5722",
  success: "#4CAF50",
  textDark: "#2C3E50",
  textLight: "#FFFFFF",
};

const StyledFooter = styled(Box)({
  background: `linear-gradient(135deg, ${COLORS.textDark}, #1a1a2e)`,
  color: COLORS.textLight,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary}, ${COLORS.accent})`,
  },
});

const FooterLink = styled(Typography)({
  color: alpha(COLORS.textLight, 0.7),
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    color: COLORS.secondary,
    transform: "translateX(4px)",
  },
});

const StatsBadge = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px 12px",
  background: alpha(COLORS.secondary, 0.1),
  borderRadius: "40px",
  border: `1px solid ${alpha(COLORS.secondary, 0.2)}`,
});

const Footer = () => {
  return (
    <StyledFooter>
      <Container maxWidth="xl" sx={{ pt: 6, pb: 3 }}>
        {/* Main Footer Content */}
        <Grid container spacing={4}>
          {/* Company Info & Stats */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <SecurityIcon sx={{ color: COLORS.secondary, fontSize: 36 }} />
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                FORENSURE
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: alpha(COLORS.textLight, 0.7), mb: 3, lineHeight: 1.8 }}>
              5-agent AI-powered document forgery detection system designed for 
              Indian academic marksheets. Real-time forensic analysis with 98.7% accuracy.
            </Typography>
            
            {/* Stats */}
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              <StatsBadge>
                <VerifiedIcon sx={{ fontSize: 18, color: COLORS.success }} />
                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                  12,847 Documents Verified
                </Typography>
              </StatsBadge>
              <StatsBadge>
                <AnalyticsIcon sx={{ fontSize: 18, color: COLORS.secondary }} />
                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                  98.7% Detection Accuracy
                </Typography>
              </StatsBadge>
              <StatsBadge>
                <SpeedIcon sx={{ fontSize: 18, color: COLORS.accent }} />
                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                  &lt;30s Average Analysis Time
                </Typography>
              </StatsBadge>
            </Stack>

            {/* Social Links */}
            <Stack direction="row" spacing={1}>
              <IconButton sx={{ color: alpha(COLORS.textLight, 0.7), "&:hover": { color: COLORS.secondary } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: alpha(COLORS.textLight, 0.7), "&:hover": { color: COLORS.secondary } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: alpha(COLORS.textLight, 0.7), "&:hover": { color: COLORS.secondary } }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton sx={{ color: alpha(COLORS.textLight, 0.7), "&:hover": { color: COLORS.secondary } }}>
                <GitHubIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, color: COLORS.secondary, fontWeight: 600 }}>
              Platform
            </Typography>
            <Stack spacing={1.5}>
              {["Upload Document", "Forensic Analysis", "Template Library", "Verification History"].map((item) => (
                <FooterLink key={item} variant="body2">
                  {item}
                </FooterLink>
              ))}
            </Stack>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, color: COLORS.secondary, fontWeight: 600 }}>
              Resources
            </Typography>
            <Stack spacing={1.5}>
              {["API Documentation", "Forensic Methodology", "Case Studies", "Research Papers"].map((item) => (
                <FooterLink key={item} variant="body2">
                  {item}
                </FooterLink>
              ))}
            </Stack>
          </Grid>

          {/* Contact & Support */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, color: COLORS.secondary, fontWeight: 600 }}>
              Contact Support
            </Typography>
            <Stack spacing={2} sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <EmailIcon sx={{ color: COLORS.secondary, fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: alpha(COLORS.textLight, 0.7) }}>
                  support@forensure.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <PhoneIcon sx={{ color: COLORS.secondary, fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: alpha(COLORS.textLight, 0.7) }}>
                  +91 44 1234 5678
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <LocationOnIcon sx={{ color: COLORS.secondary, fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: alpha(COLORS.textLight, 0.7) }}>
                  Chennai, Tamil Nadu, India
                </Typography>
              </Box>
            </Stack>

            {/* Newsletter */}
            <Typography variant="body2" sx={{ color: alpha(COLORS.textLight, 0.7), mb: 1.5 }}>
              Get forensic alerts & updates
            </Typography>
            <Box component="form" sx={{ display: "flex", gap: 1 }}>
              <TextField
                size="small"
                placeholder="Email address"
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    color: COLORS.textLight,
                    backgroundColor: alpha(COLORS.textLight, 0.05),
                    "& fieldset": {
                      borderColor: alpha(COLORS.textLight, 0.2),
                    },
                    "&:hover fieldset": {
                      borderColor: COLORS.secondary,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: COLORS.secondary,
                    },
                  },
                  "& .MuiInputBase-input": {
                    "&::placeholder": {
                      color: alpha(COLORS.textLight, 0.5),
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Agent Status Banner */}
        <Box 
          sx={{ 
            mt: 4, 
            p: 2, 
            background: alpha(COLORS.secondary, 0.05),
            borderRadius: "16px",
            border: `1px solid ${alpha(COLORS.secondary, 0.15)}`,
          }}
        >
          <Stack 
            direction={{ xs: "column", md: "row" }} 
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <GppGoodIcon sx={{ color: COLORS.secondary, fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                5 Forensic Agents Active:
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {[
                { name: "PDF Metadata", color: COLORS.primary },
                { name: "OpenCV Visual", color: COLORS.secondary },
                { name: "CNN Seal/Stamp", color: COLORS.success },
                { name: "Gemini + GPT-4o", color: "#2196F3" },
                { name: "Pinecone RAG", color: "#FFC107" },
              ].map((agent, idx) => (
                <Chip
                  key={idx}
                  label={agent.name}
                  size="small"
                  sx={{
                    bgcolor: alpha(agent.color, 0.15),
                    color: agent.color,
                    border: `1px solid ${alpha(agent.color, 0.3)}`,
                    "& .MuiChip-label": { fontSize: "0.7rem", fontWeight: 500 },
                  }}
                />
              ))}
            </Stack>
            <Chip
              icon={<GppGoodIcon sx={{ fontSize: 14 }} />}
              label="ISO 27001 Certified"
              size="small"
              sx={{
                bgcolor: alpha(COLORS.success, 0.15),
                color: COLORS.success,
              }}
            />
          </Stack>
        </Box>

        <Divider sx={{ my: 3, borderColor: alpha(COLORS.textLight, 0.1) }} />

        {/* Bottom Bar */}
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: alpha(COLORS.textLight, 0.5) }}>
            © 2024 FORENSURE. All rights reserved. | Made with 🔍 for document forensics
          </Typography>
          <Stack direction="row" spacing={3}>
            <FooterLink variant="caption">Privacy Policy</FooterLink>
            <FooterLink variant="caption">Terms of Service</FooterLink>
            <FooterLink variant="caption">Security</FooterLink>
            <FooterLink variant="caption">GDPR Compliance</FooterLink>
          </Stack>
        </Box>

        {/* Support Institutions */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: alpha(COLORS.textLight, 0.4) }}>
            Specialized for: TNBSE | Anna University | CBSE
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;