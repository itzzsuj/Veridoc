import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Divider,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Alert,
  Chip,
  Avatar,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SecurityIcon from "@mui/icons-material/Security";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import GppGoodIcon from "@mui/icons-material/GppGood";
import DescriptionIcon from "@mui/icons-material/Description";

/* 🔥 FIREBASE */
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";

const COLORS = {
  primary: "#1A237E",
  secondary: "#00BCD4",
  accent: "#FF5722",
  success: "#4CAF50",
  warning: "#FFC107",
  error: "#F44336",
  background: "#F8F9FA",
  textDark: "#2C3E50",
  textLight: "#FFFFFF",
  info: "#2196F3",
  gradient: "linear-gradient(135deg, #1A237E 0%, #00BCD4 50%, #FF5722 100%)",
};

const LoginContainer = styled(Box)({
  minHeight: "100vh",
  background: `linear-gradient(135deg, ${alpha(
    COLORS.primary,
    0.04
  )}, ${alpha(COLORS.secondary, 0.06)})`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  position: "relative",
  overflow: "hidden",
});

const FloatingIcon = styled(Box)(({ delay }) => ({
  position: "absolute",
  animation: `float 6s ease-in-out infinite`,
  animationDelay: delay || "0s",
  opacity: 0.05,
  zIndex: 0,
  "@keyframes float": {
    "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
    "50%": { transform: "translateY(-20px) rotate(5deg)" },
  },
}));

const StyledPaper = styled(Paper)({
  width: "100%",
  maxWidth: 480,
  padding: "48px 40px",
  borderRadius: "32px",
  background: "rgba(255, 255, 255, 0.98)",
  backdropFilter: "blur(10px)",
  border: `1px solid ${alpha(COLORS.primary, 0.12)}`,
  boxShadow: `0 25px 60px ${alpha(COLORS.primary, 0.15)}`,
  position: "relative",
  zIndex: 2,
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    backgroundColor: alpha(COLORS.primary, 0.02),
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: alpha(COLORS.primary, 0.04),
    },
    "&.Mui-focused": {
      backgroundColor: "white",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: COLORS.primary,
        borderWidth: "2px",
      },
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: COLORS.primary,
  },
  "& .MuiInputAdornment-root .MuiSvgIcon-root": {
    color: alpha(COLORS.textDark, 0.4),
  },
});

const GradientButton = styled(Button)({
  background: COLORS.gradient,
  color: "white",
  borderRadius: "40px",
  padding: "14px 24px",
  fontWeight: 700,
  textTransform: "none",
  fontSize: "1rem",
  boxShadow: `0 8px 20px ${alpha(COLORS.primary, 0.25)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 12px 28px ${alpha(COLORS.primary, 0.35)}`,
  },
  "&:disabled": {
    background: alpha(COLORS.primary, 0.3),
    color: "white",
  },
});

const GoogleButton = styled(Button)({
  borderRadius: "40px",
  padding: "14px 24px",
  backgroundColor: "#FFFFFF",
  color: "#757575",
  border: `1px solid ${alpha(COLORS.textDark, 0.15)}`,
  textTransform: "none",
  fontWeight: 600,
  fontSize: "1rem",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#F8F9FA",
    borderColor: COLORS.primary,
    boxShadow: `0 8px 16px ${alpha(COLORS.primary, 0.1)}`,
    transform: "translateY(-2px)",
  },
  "& .MuiButton-startIcon": {
    marginRight: "12px",
  },
});

const BackButton = styled(Button)({
  color: COLORS.primary,
  textTransform: "none",
  fontWeight: 500,
  fontSize: "0.9rem",
  padding: "6px 12px",
  borderRadius: "30px",
  "&:hover": {
    background: alpha(COLORS.primary, 0.08),
  },
});

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("✅ Logged in:", userCredential.user.email);
      
      // ✅ Save auth state
      localStorage.setItem('auth_token', userCredential.user.accessToken);
      localStorage.setItem('user_email', userCredential.user.email);
      localStorage.setItem('user_uid', userCredential.user.uid);
      
      // ✅ Update parent state
      if (setIsAuthenticated) {
        setIsAuthenticated(true);
      }
      
      // ✅ Navigate to dashboard (lowercase!)
      navigate("/dashboard");
      
    } catch (err) {
      console.error("Login error:", err);

      if (err.code === "auth/user-not-found") {
        setError("No verification officer account found with this email");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address");
      } else if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else {
        setError("Login failed. Please try again.");
      }
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account"
      });

      const result = await signInWithPopup(auth, provider);
      console.log("✅ Google user:", result.user.email);
      
      // ✅ Save auth state
      localStorage.setItem('auth_token', result.user.accessToken);
      localStorage.setItem('user_email', result.user.email);
      localStorage.setItem('user_uid', result.user.uid);
      
      // ✅ Update parent state
      if (setIsAuthenticated) {
        setIsAuthenticated(true);
      }
      
      // ✅ Navigate to dashboard (lowercase!)
      navigate("/dashboard");
      
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google sign-in failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <FloatingIcon delay="0s" sx={{ top: "15%", left: "8%" }}>
        <SecurityIcon sx={{ fontSize: 120, color: COLORS.primary }} />
      </FloatingIcon>
      <FloatingIcon delay="1.2s" sx={{ bottom: "15%", right: "10%" }}>
        <FingerprintIcon sx={{ fontSize: 100, color: COLORS.secondary }} />
      </FloatingIcon>
      <FloatingIcon delay="0.6s" sx={{ top: "60%", left: "15%" }}>
        <DescriptionIcon sx={{ fontSize: 80, color: COLORS.accent }} />
      </FloatingIcon>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: 480, position: "relative", zIndex: 2 }}
      >
        <StyledPaper>
          <BackButton
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{ mb: 3 }}
          >
            Back to Home
          </BackButton>

          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Avatar
              sx={{
                width: 70,
                height: 70,
                margin: "0 auto 16px",
                background: COLORS.gradient,
                color: "white",
                fontSize: "2rem",
                fontWeight: 700,
              }}
            >
              <GppGoodIcon sx={{ fontSize: 36 }} />
            </Avatar>
            
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: COLORS.textDark, mb: 1 }}
            >
              Verification Officer Portal
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: alpha(COLORS.textDark, 0.6) }}
            >
              Sign in to access the 5-agent forensic document verification system
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                borderRadius: "12px",
                "& .MuiAlert-icon": { color: COLORS.error }
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <StyledTextField
                fullWidth
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: alpha(COLORS.textDark, 0.5) }}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
              }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      sx={{
                        color: alpha(COLORS.primary, 0.5),
                        "&.Mui-checked": { color: COLORS.primary },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: alpha(COLORS.textDark, 0.7) }}>
                      Remember me
                    </Typography>
                  }
                />
                <Typography
                  variant="body2"
                  sx={{ 
                    color: COLORS.primary, 
                    cursor: "pointer",
                    fontWeight: 500,
                    "&:hover": { textDecoration: "underline" }
                  }}
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </Typography>
              </Box>

              <GradientButton 
                type="submit" 
                fullWidth 
                disabled={loading}
                size="large"
              >
                {loading ? "Authenticating..." : "Access Forensic System"}
              </GradientButton>

              <Divider sx={{ my: 2 }}>
                <Chip 
                  label="OR" 
                  size="small"
                  sx={{ 
                    bgcolor: alpha(COLORS.primary, 0.05),
                    color: alpha(COLORS.textDark, 0.6),
                    fontWeight: 500,
                  }}
                />
              </Divider>

              <GoogleButton
                fullWidth
                onClick={handleGoogleLogin}
                disabled={loading}
                startIcon={<GoogleIcon sx={{ color: "#4285F4" }} />}
              >
                Continue with Google
              </GoogleButton>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2" sx={{ color: alpha(COLORS.textDark, 0.6) }}>
                  New verification officer?{" "}
                  <Box
                    component="span"
                    sx={{
                      color: COLORS.primary,
                      fontWeight: 700,
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    onClick={() => navigate("/signup")}
                  >
                    Request Access
                  </Box>
                </Typography>
              </Box>

              <Stack spacing={1.5} sx={{ mt: 2 }}>
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  gap: 1.5,
                  flexWrap: "wrap",
                }}>
                  <Chip
                    icon={<VerifiedIcon sx={{ fontSize: 16 }} />}
                    label="5-Agent Forensic System"
                    size="small"
                    sx={{ 
                      bgcolor: alpha(COLORS.success, 0.1), 
                      color: COLORS.success,
                      fontWeight: 500,
                    }}
                  />
                  <Chip
                    icon={<GppGoodIcon sx={{ fontSize: 16 }} />}
                    label="256-bit Encryption"
                    size="small"
                    sx={{ 
                      bgcolor: alpha(COLORS.info, 0.1), 
                      color: COLORS.info,
                      fontWeight: 500,
                    }}
                  />
                </Box>
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  gap: 1,
                  flexWrap: "wrap",
                }}>
                  <Chip
                    label="TNBSE"
                    size="small"
                    sx={{ 
                      bgcolor: alpha(COLORS.primary, 0.08), 
                      color: COLORS.primary,
                    }}
                  />
                  <Chip
                    label="Anna University"
                    size="small"
                    sx={{ 
                      bgcolor: alpha(COLORS.secondary, 0.08), 
                      color: COLORS.secondary,
                    }}
                  />
                  <Chip
                    label="CBSE"
                    size="small"
                    sx={{ 
                      bgcolor: alpha(COLORS.success, 0.08), 
                      color: COLORS.success,
                    }}
                  />
                </Box>
              </Stack>
            </Stack>
          </form>
        </StyledPaper>
      </motion.div>
    </LoginContainer>
  );
};

export default Login;