import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  Avatar,
  Divider,
  LinearProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Icons
import SecurityIcon from "@mui/icons-material/Security";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import TimelineIcon from "@mui/icons-material/Timeline";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FolderIcon from "@mui/icons-material/Folder";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import InsightsIcon from "@mui/icons-material/Insights";
import GppGoodIcon from "@mui/icons-material/GppGood";
import SpeedIcon from "@mui/icons-material/Speed";
import LayersIcon from "@mui/icons-material/Layers";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ScienceIcon from "@mui/icons-material/Science";
import MergeIcon from "@mui/icons-material/Merge";
import ArticleIcon from "@mui/icons-material/Article";
import LoopIcon from "@mui/icons-material/Loop";
import ShareIcon from "@mui/icons-material/Share";

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

const HeroSection = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  background: `linear-gradient(135deg, ${alpha(
    COLORS.primary,
    0.04
  )}, ${alpha(COLORS.secondary, 0.08)})`,
  paddingTop: "100px",
  position: "relative",
  overflow: "hidden",
});

const FloatingIcon = styled(Box)(({ delay }) => ({
  position: "absolute",
  animation: `float 6s ease-in-out infinite`,
  animationDelay: delay || "0s",
  opacity: 0.06,
  zIndex: 0,
  "@keyframes float": {
    "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
    "50%": { transform: "translateY(-20px) rotate(5deg)" },
  },
}));

const GlassCard = styled(Paper)({
  padding: "32px",
  borderRadius: "32px",
  backdropFilter: "blur(14px)",
  background: "rgba(255,255,255,0.92)",
  border: `1px solid ${alpha(COLORS.primary, 0.12)}`,
  boxShadow: `0 25px 50px ${alpha(COLORS.primary, 0.12)}`,
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
  },
});

const PremiumCard = styled(Card)({
  height: "100%",
  borderRadius: "24px",
  border: `1px solid ${alpha(COLORS.primary, 0.1)}`,
  boxShadow: `0 12px 28px ${alpha(COLORS.primary, 0.08)}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: `0 20px 40px ${alpha(COLORS.primary, 0.15)}`,
  },
});

const GradientText = styled(Typography)({
  background: COLORS.gradient,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 800,
});

const SectionTitle = styled(Typography)({
  fontWeight: 700,
  marginBottom: "16px",
  color: COLORS.textDark,
  position: "relative",
  display: "inline-block",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-8px",
    left: 0,
    width: "60px",
    height: "4px",
    background: COLORS.gradient,
    borderRadius: "2px",
  },
});

const AgentCard = styled(Paper)(({ agentcolor }) => ({
  padding: "24px",
  borderRadius: "20px",
  background: "white",
  borderLeft: `4px solid ${agentcolor || COLORS.primary}`,
  transition: "all 0.3s ease",
  height: "100%",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: `0 12px 28px ${alpha(agentcolor || COLORS.primary, 0.15)}`,
  },
}));

const ParallelAgentCard = styled(Paper)(({ agentcolor }) => ({
  padding: "20px",
  borderRadius: "16px",
  background: "white",
  border: `1px solid ${alpha(agentcolor, 0.2)}`,
  transition: "all 0.3s ease",
  height: "100%",
  textAlign: "center",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: `0 8px 20px ${alpha(agentcolor, 0.15)}`,
    borderColor: agentcolor,
  },
}));

const HomePage = () => {
  return (
    <Box sx={{ background: COLORS.background, overflowX: "hidden" }}>
      <Navbar />

      {/* =====================================================
         HERO SECTION — DOCUMENT FORGERY DETECTION
      ===================================================== */}

      <HeroSection id="home">
        {/* Floating Background Icons */}
        <FloatingIcon delay="0s" sx={{ top: "12%", left: "8%" }}>
          <SecurityIcon sx={{ fontSize: 110, color: COLORS.primary }} />
        </FloatingIcon>

        <FloatingIcon delay="1.5s" sx={{ top: "70%", right: "8%" }}>
          <FingerprintIcon sx={{ fontSize: 90, color: COLORS.secondary }} />
        </FloatingIcon>

        <FloatingIcon delay="0.8s" sx={{ bottom: "15%", left: "12%" }}>
          <AnalyticsIcon sx={{ fontSize: 70, color: COLORS.accent }} />
        </FloatingIcon>

        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 2,
            height: "calc(100vh - 120px)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              gap: { xs: 6, md: 10 },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* LEFT SIDE */}
            <Box
              sx={{
                flex: 1,
                maxWidth: 600,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: COLORS.primary,
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      mb: 2,
                      fontSize: "0.9rem",
                    }}
                  >
                    5-AGENT · 5-LAYER FORENSIC SYSTEM
                  </Typography>

                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "2.5rem", md: "3rem", lg: "3.4rem" },
                      fontWeight: 700,
                      mb: 2.5,
                      lineHeight: 1.2,
                      color: COLORS.textDark,
                    }}
                  >
                    AI-Powered Document
                    <br />
                    Forgery Detection for
                    <GradientText component="span"> Indian Academia</GradientText>
                  </Typography>

                  <Typography
                    sx={{
                      color: alpha(COLORS.textDark, 0.7),
                      mb: 4,
                      lineHeight: 1.7,
                      fontSize: "1.05rem",
                      maxWidth: 500,
                    }}
                  >
                    Specialized for TNBSE, Anna University & CBSE marksheets.
                    Multi-agent forensic analysis with 98.7% accuracy and
                    explainable AI reports.
                  </Typography>

                  <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                    <Button
                      variant="contained"
                      endIcon={<CloudUploadIcon />}
                      sx={{
                        background: COLORS.primary,
                        borderRadius: "40px",
                        px: 4,
                        py: 1.3,
                        fontWeight: 600,
                        textTransform: "none",
                        boxShadow: `0 8px 16px ${alpha(COLORS.primary, 0.2)}`,
                      }}
                    >
                      Upload Document
                    </Button>

                    <Button
                      variant="outlined"
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        borderColor: COLORS.primary,
                        color: COLORS.primary,
                        fontWeight: 600,
                        textTransform: "none",
                        borderRadius: "40px",
                      }}
                    >
                      Watch Demo
                    </Button>
                  </Stack>

                  <Stack direction="row" spacing={3}>
                    {[
                      { label: "5 Forensic Agents", color: COLORS.primary },
                      { label: "98.7% Accuracy", color: COLORS.success },
                      { label: "Real-time Analysis", color: COLORS.secondary },
                    ].map((item, i) => (
                      <Chip
                        key={i}
                        label={item.label}
                        sx={{
                          bgcolor: alpha(item.color, 0.1),
                          color: item.color,
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Stack>
                </motion.div>
              </Box>
            </Box>

            {/* RIGHT SIDE — FORENSIC DASHBOARD */}
            <Box
              sx={{
                flex: 1,
                maxWidth: 520,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ width: "100%" }}
              >
                <Box sx={{ position: "relative" }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: "28px",
                      background: "white",
                      border: `1px solid ${alpha(COLORS.primary, 0.12)}`,
                      boxShadow: `0 25px 50px ${alpha(COLORS.primary, 0.15)}`,
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {/* Header */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: COLORS.success,
                          animation: "pulse 2s infinite",
                          "@keyframes pulse": {
                            "0%, 100%": { opacity: 1 },
                            "50%": { opacity: 0.5 },
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: alpha(COLORS.textDark, 0.5), fontWeight: 500 }}
                      >
                        LIVE FORENSIC ANALYSIS · 5 AGENTS ACTIVE
                      </Typography>
                    </Box>

                    {/* Document Type Chips */}
                    <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
                      <Chip
                        icon={<DescriptionIcon />}
                        label="TNBSE Marksheet"
                        size="small"
                        sx={{ background: alpha(COLORS.primary, 0.08) }}
                      />
                      <Chip
                        icon={<DescriptionIcon />}
                        label="Anna University"
                        size="small"
                        sx={{ background: alpha(COLORS.secondary, 0.08) }}
                      />
                      <Chip
                        icon={<DescriptionIcon />}
                        label="CBSE"
                        size="small"
                        sx={{ background: alpha(COLORS.success, 0.08) }}
                      />
                    </Box>

                    {/* 5 Agents Status */}
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                      Forensic Agents Status
                    </Typography>
                    
                    {[
                      { name: "Agent 2A · PDF Metadata", status: "Analyzed", confidence: 96, color: COLORS.primary },
                      { name: "Agent 2B · OpenCV Visual", status: "Analyzed", confidence: 94, color: COLORS.secondary },
                      { name: "Agent 2C · CNN Seal/Stamp", status: "Analyzed", confidence: 98, color: COLORS.success },
                      { name: "Agent 2D · Gemini + GPT-4o", status: "Analyzed", confidence: 97, color: COLORS.info },
                      { name: "Agent 2E · Pinecone RAG", status: "Matched", confidence: 95, color: COLORS.warning },
                    ].map((agent, idx) => (
                      <Box key={idx} sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                          <Typography variant="caption" sx={{ fontWeight: 500 }}>
                            {agent.name}
                          </Typography>
                          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                            <Chip
                              label={agent.status}
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: "0.7rem",
                                bgcolor: alpha(agent.color, 0.1),
                                color: agent.color,
                              }}
                            />
                            <Typography variant="caption" sx={{ fontWeight: 600 }}>
                              {agent.confidence}%
                            </Typography>
                          </Box>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={agent.confidence}
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            bgcolor: alpha(agent.color, 0.1),
                            "& .MuiLinearProgress-bar": {
                              bgcolor: agent.color,
                              borderRadius: 2,
                            },
                          }}
                        />
                      </Box>
                    ))}

                    <Divider sx={{ my: 2 }} />

                    {/* Aggregated Verdict */}
                    <Alert
                      severity="success"
                      icon={<VerifiedIcon />}
                      sx={{
                        borderRadius: "16px",
                        bgcolor: alpha(COLORS.success, 0.08),
                        "& .MuiAlert-icon": { color: COLORS.success },
                      }}
                    >
                      <AlertTitle sx={{ fontWeight: 700, color: COLORS.success }}>
                        Weighted Voting Result: GENUINE
                      </AlertTitle>
                      <Typography variant="caption">
                        All 5 agents consensus · 96.2% confidence · No forgery indicators detected
                      </Typography>
                    </Alert>

                    {/* Heatmap Preview */}
                    <Box sx={{ mt: 2, p: 2, bgcolor: alpha(COLORS.primary, 0.03), borderRadius: "12px" }}>
                      <Typography variant="caption" sx={{ color: alpha(COLORS.textDark, 0.6), display: "block", mb: 1 }}>
                        🔥 Heatmap Regions (Color-coded)
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Chip label="Seal Region: Genuine" size="small" sx={{ bgcolor: alpha(COLORS.success, 0.1), color: COLORS.success }} />
                        <Chip label="Signature: Verified" size="small" sx={{ bgcolor: alpha(COLORS.success, 0.1), color: COLORS.success }} />
                        <Chip label="Watermark: Present" size="small" sx={{ bgcolor: alpha(COLORS.success, 0.1), color: COLORS.success }} />
                        <Chip label="Metadata: Consistent" size="small" sx={{ bgcolor: alpha(COLORS.success, 0.1), color: COLORS.success }} />
                      </Box>
                    </Box>
                  </Paper>

                  {/* Decorative Glow */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -30,
                      right: -30,
                      width: 180,
                      height: 180,
                      background: `radial-gradient(circle, ${alpha(COLORS.primary, 0.08)} 0%, transparent 70%)`,
                      borderRadius: "50%",
                      zIndex: 1,
                    }}
                  />
                </Box>
              </motion.div>
            </Box>
          </Box>
        </Container>
      </HeroSection>

      {/* =====================================================
         5-AGENT FORENSIC ARCHITECTURE - FLEXBOX VERSION
      ===================================================== */}

      <Container maxWidth="lg" sx={{ py: 12 }} id="about">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <SectionTitle variant="h2" sx={{ "&::after": { left: "50%", transform: "translateX(-50%)" } }}>
              5-Agent Forensic Architecture
            </SectionTitle>
            <Typography sx={{ mt: 2, color: alpha(COLORS.textDark, 0.7), maxWidth: 700, mx: "auto" }}>
              Parallel processing pipeline with Claude-powered agents for comprehensive document forensics
            </Typography>
          </Box>

          {/* Agent 1 - Intake Layer - Flexbox */}
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, justifyContent: "center" }}>
              <Box sx={{ width: 48, height: 48, borderRadius: "50%", background: COLORS.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography sx={{ color: "white", fontWeight: 700 }}>1</Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Intake & Pre-processing Layer
              </Typography>
            </Box>
            
            <AgentCard agentcolor={COLORS.primary}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3, flexWrap: "wrap" }}>
                <Box sx={{ flex: "2 1 300px" }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: COLORS.primary }}>Agent 1 · Intake & Hash Check</Typography>
                  <Typography variant="body2" sx={{ color: alpha(COLORS.textDark, 0.8), mb: 2 }}>
                    Receives uploaded PDF → Computes SHA-256 hash → Checks Firebase for duplicates → Dispatches to 5 forensic agents
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip icon={<UploadFileIcon />} label="PDF Upload" size="small" />
                    <Chip icon={<FingerprintIcon />} label="SHA-256 Hash" size="small" />
                    <Chip icon={<StorageIcon />} label="Firebase Check" size="small" />
                    <Chip icon={<ShareIcon />} label="Parallel Dispatch" size="small" color="primary" />
                  </Box>
                </Box>
                <Box sx={{ flex: "1 1 200px", bgcolor: alpha(COLORS.primary, 0.05), p: 2, borderRadius: "12px" }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: COLORS.primary }}>Output →</Typography>
                  <Typography variant="caption" sx={{ color: alpha(COLORS.textDark, 0.7), display: "block" }}>
                    5 Parallel Agent Tasks Dispatched
                  </Typography>
                </Box>
              </Box>
            </AgentCard>
          </Box>

          {/* Agents 2A-2E - Parallel Analysis Layer - Flexbox Grid */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, textAlign: "center" }}>
              Parallel Forensic Analysis Layer
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center", color: alpha(COLORS.textDark, 0.6), mb: 4 }}>
              Five Claude-powered agents analyze the document simultaneously for comprehensive forensic coverage
            </Typography>
            
            <Box sx={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: 3, 
              justifyContent: "center" 
            }}>
              {[
                { 
                  name: "Agent 2A", 
                  title: "PDF Metadata Analysis", 
                  desc: "Analyzes creation date, author, PDF version, modification history, and embedded metadata anomalies", 
                  color: COLORS.primary, 
                  icon: <DescriptionIcon />,
                  features: ["Creation Date", "Author Info", "PDF Version", "Mod History"]
                },
                { 
                  name: "Agent 2B", 
                  title: "OpenCV Visual Forensics", 
                  desc: "Clone detection, JPEG ghost artifacts, Error Level Analysis (ELA), and pixel-level tampering detection", 
                  color: COLORS.secondary, 
                  icon: <CameraAltIcon />,
                  features: ["Clone Detection", "JPEG Ghost", "ELA Analysis", "Pixel Tampering"]
                },
                { 
                  name: "Agent 2C", 
                  title: "CNN Seal & Stamp Verification", 
                  desc: "MobileNetV2 deep learning model trained on official seal/stamp images from TNBSE, Anna University & CBSE", 
                  color: COLORS.success, 
                  icon: <GppGoodIcon />,
                  features: ["Seal Detection", "Stamp Matching", "Pattern Recognition", "Deep Learning"]
                },
                { 
                  name: "Agent 2D", 
                  title: "Multimodal LLM Analysis", 
                  desc: "Gemini 1.5 Pro + GPT-4o visual document understanding for semantic and contextual anomaly detection", 
                  color: COLORS.info, 
                  icon: <PsychologyAltIcon />,
                  features: ["Visual LLM", "Context Analysis", "Semantic Check", "Anomaly Detection"]
                },
                { 
                  name: "Agent 2E", 
                  title: "Pinecone RAG Matching", 
                  desc: "OCR text embedding extraction and semantic search against genuine templates and confirmed forgery database", 
                  color: COLORS.warning, 
                  icon: <StorageIcon />,
                  features: ["OCR Embeddings", "Vector Search", "Template Matching", "Forgery DB"]
                },
              ].map((agent, idx) => (
                <Box key={idx} sx={{ 
                  flex: "1 1 200px",
                  minWidth: "200px",
                  maxWidth: { xs: "100%", sm: "calc(50% - 16px)", md: "calc(20% - 16px)" }
                }}>
                  <ParallelAgentCard agentcolor={agent.color}>
                    <Box sx={{ color: agent.color, mb: 1.5 }}>{agent.icon}</Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: agent.color }}>{agent.name}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, mt: 1, mb: 1 }}>{agent.title}</Typography>
                    <Typography variant="caption" sx={{ color: alpha(COLORS.textDark, 0.6), display: "block", mb: 1.5 }}>
                      {agent.desc}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", justifyContent: "center" }}>
                      {agent.features.map((feature, i) => (
                        <Chip key={i} label={feature} size="small" sx={{ fontSize: "0.6rem", height: 20, bgcolor: alpha(agent.color, 0.08) }} />
                      ))}
                    </Box>
                    <Box sx={{ mt: 1.5, pt: 1, borderTop: `1px solid ${alpha(agent.color, 0.2)}` }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: agent.color }}>Output: Verdict + Confidence</Typography>
                    </Box>
                  </ParallelAgentCard>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Agents 3, 4, 5 - Post-Processing Layer - Flexbox */}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: "center" }}>
              Aggregation & Learning Layer
            </Typography>
            
            <Box sx={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: 3, 
              justifyContent: "center" 
            }}>
              <Box sx={{ flex: "1 1 300px", minWidth: "280px" }}>
                <AgentCard agentcolor={COLORS.info}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: "50%", bgcolor: alpha(COLORS.info, 0.1), display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <MergeIcon sx={{ color: COLORS.info }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: COLORS.info }}>Agent 3 · Aggregator</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: alpha(COLORS.textDark, 0.8), mb: 2 }}>
                    Collects verdicts from all 5 agents → Applies weighted voting system → Detects conflicts between agents → Merges color-coded heatmap regions
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip label="Weighted Voting" size="small" sx={{ bgcolor: alpha(COLORS.info, 0.1), color: COLORS.info }} />
                    <Chip label="Conflict Detection" size="small" sx={{ bgcolor: alpha(COLORS.info, 0.1), color: COLORS.info }} />
                    <Chip label="Heatmap Fusion" size="small" sx={{ bgcolor: alpha(COLORS.info, 0.1), color: COLORS.info }} />
                  </Box>
                </AgentCard>
              </Box>

              <Box sx={{ flex: "1 1 300px", minWidth: "280px" }}>
                <AgentCard agentcolor={COLORS.success}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: "50%", bgcolor: alpha(COLORS.success, 0.1), display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ArticleIcon sx={{ color: COLORS.success }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: COLORS.success }}>Agent 4 · Report Generator</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: alpha(COLORS.textDark, 0.8), mb: 2 }}>
                    Claude Sonnet generates plain-English forensic report for verification officer with explainable AI insights and actionable recommendations
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip label="Plain-English" size="small" sx={{ bgcolor: alpha(COLORS.success, 0.1), color: COLORS.success }} />
                    <Chip label="Explainable AI" size="small" sx={{ bgcolor: alpha(COLORS.success, 0.1), color: COLORS.success }} />
                    <Chip label="Actionable Insights" size="small" sx={{ bgcolor: alpha(COLORS.success, 0.1), color: COLORS.success }} />
                  </Box>
                </AgentCard>
              </Box>

              <Box sx={{ flex: "1 1 300px", minWidth: "280px" }}>
                <AgentCard agentcolor={COLORS.accent}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: "50%", bgcolor: alpha(COLORS.accent, 0.1), display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <LoopIcon sx={{ color: COLORS.accent }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: COLORS.accent }}>Agent 5 · Learning Loop</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: alpha(COLORS.textDark, 0.8), mb: 2 }}>
                    Officer confirms or corrects verdict → Document embedding saved to Pinecone → System learns and improves → Higher confidence for similar documents
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Chip label="Continuous Learning" size="small" sx={{ bgcolor: alpha(COLORS.accent, 0.1), color: COLORS.accent }} />
                    <Chip label="Embedding Storage" size="small" sx={{ bgcolor: alpha(COLORS.accent, 0.1), color: COLORS.accent }} />
                    <Chip label="Improved Accuracy" size="small" sx={{ bgcolor: alpha(COLORS.accent, 0.1), color: COLORS.accent }} />
                  </Box>
                </AgentCard>
              </Box>
            </Box>
          </Box>

          {/* Pipeline Flow Indicator - Flexbox */}
          <Box sx={{ mt: 5, pt: 3, textAlign: "center" }}>
            <Paper
              sx={{
                p: 2,
                bgcolor: alpha(COLORS.primary, 0.03),
                borderRadius: "40px",
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Chip label="📄 PDF Upload" sx={{ bgcolor: alpha(COLORS.primary, 0.08) }} />
              <ArrowForwardIcon sx={{ fontSize: 16, color: alpha(COLORS.textDark, 0.5) }} />
              <Chip label="🔐 SHA-256 Hash" sx={{ bgcolor: alpha(COLORS.primary, 0.08) }} />
              <ArrowForwardIcon sx={{ fontSize: 16, color: alpha(COLORS.textDark, 0.5) }} />
              <Chip label="⚡ 5 Parallel Agents" color="primary" />
              <ArrowForwardIcon sx={{ fontSize: 16, color: alpha(COLORS.textDark, 0.5) }} />
              <Chip label="⚖️ Weighted Voting" sx={{ bgcolor: alpha(COLORS.info, 0.1), color: COLORS.info }} />
              <ArrowForwardIcon sx={{ fontSize: 16, color: alpha(COLORS.textDark, 0.5) }} />
              <Chip label="📊 Forensic Report" sx={{ bgcolor: alpha(COLORS.success, 0.1), color: COLORS.success }} />
              <ArrowForwardIcon sx={{ fontSize: 16, color: alpha(COLORS.textDark, 0.5) }} />
              <Chip label="🔄 Learning Loop" sx={{ bgcolor: alpha(COLORS.accent, 0.1), color: COLORS.accent }} />
            </Paper>
          </Box>
        </motion.div>
      </Container>

      {/* =====================================================
         FORENSIC CAPABILITIES GRID
      ===================================================== */}

      <Container maxWidth="lg" sx={{ pb: 12 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <SectionTitle variant="h2" sx={{ "&::after": { left: "50%", transform: "translateX(-50%)" } }}>
              Advanced Forensic Capabilities
            </SectionTitle>
          </Box>
        </motion.div>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {[
            {
              icon: <FingerprintIcon sx={{ fontSize: 40 }} />,
              title: "SHA-256 Hash Verification",
              desc: "Cryptographic hash matching to detect duplicate submissions",
              color: COLORS.primary,
              detail: "Prevents re-analysis of identical documents",
            },
            {
              icon: <CameraAltIcon sx={{ fontSize: 40 }} />,
              title: "JPEG Ghost Detection",
              desc: "Identifies multiple compression artifacts from tampering",
              color: COLORS.secondary,
              detail: "OpenCV-based forensic analysis",
            },
            {
              icon: <GppGoodIcon sx={{ fontSize: 40 }} />,
              title: "Seal & Stamp Verification",
              desc: "MobileNetV2 CNN trained on official Indian academic seals",
              color: COLORS.success,
              detail: "TNBSE, Anna University, CBSE patterns",
            },
            {
              icon: <PsychologyAltIcon sx={{ fontSize: 40 }} />,
              title: "Multimodal LLM Analysis",
              desc: "Gemini 1.5 Pro + GPT-4o visual document understanding",
              color: COLORS.info,
              detail: "Detects semantic inconsistencies",
            },
            {
              icon: <StorageIcon sx={{ fontSize: 40 }} />,
              title: "Pinecone Vector Database",
              desc: "Semantic search against genuine templates & forgeries",
              color: COLORS.warning,
              detail: "RAG-based similarity matching",
            },
            {
              icon: <InsightsIcon sx={{ fontSize: 40 }} />,
              title: "Explainable AI Reports",
              desc: "Color-coded heatmaps and plain-English explanations",
              color: COLORS.accent,
              detail: "Claude Sonnet generated forensic reports",
            },
          ].map((capability, i) => (
            <Box
              key={i}
              sx={{
                flex: "1 1 300px",
                minWidth: { xs: "100%", sm: "280px", md: "300px" },
                maxWidth: { xs: "100%", sm: "calc(50% - 16px)", md: "calc(33.333% - 16px)" },
                display: "flex",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true }}
                style={{ width: "100%", display: "flex" }}
              >
                <PremiumCard sx={{ flex: 1 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ color: capability.color, mb: 2 }}>{capability.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                      {capability.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: alpha(COLORS.textDark, 0.7), mb: 2 }}>
                      {capability.desc}
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Typography variant="caption" sx={{ color: alpha(COLORS.textDark, 0.6), fontStyle: "italic" }}>
                      {capability.detail}
                    </Typography>
                  </CardContent>
                </PremiumCard>
              </motion.div>
            </Box>
          ))}
        </Box>
      </Container>

      {/* =====================================================
         SUPPORTED INSTITUTIONS
      ===================================================== */}

      <Box sx={{ py: 8, background: alpha(COLORS.primary, 0.03) }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <SectionTitle variant="h2" sx={{ "&::after": { left: "50%", transform: "translateX(-50%)" } }}>
                Supported Institutions
              </SectionTitle>
              <Typography sx={{ mt: 2, color: alpha(COLORS.textDark, 0.7) }}>
                Specialized forensic models for India's leading academic boards
              </Typography>
            </Box>

            <Box sx={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: 4, 
              justifyContent: "center" 
            }}>
              {[
                { name: "TNBSE", fullName: "Tamil Nadu Board of Secondary Education", color: COLORS.primary },
                { name: "Anna University", fullName: "Anna University, Chennai", color: COLORS.secondary },
                { name: "CBSE", fullName: "Central Board of Secondary Education", color: COLORS.success },
              ].map((board, idx) => (
                <Box key={idx} sx={{ flex: "1 1 250px", minWidth: "250px", maxWidth: "350px" }}>
                  <Paper sx={{ p: 3, textAlign: "center", borderRadius: "20px", background: "white" }}>
                    <AccountBalanceIcon sx={{ fontSize: 48, color: board.color, mb: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: board.color, mb: 1 }}>
                      {board.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: alpha(COLORS.textDark, 0.6) }}>
                      {board.fullName}
                    </Typography>
                    <Chip
                      label="Trained Models"
                      size="small"
                      sx={{ mt: 2, bgcolor: alpha(board.color, 0.1), color: board.color }}
                    />
                  </Paper>
                </Box>
              ))}
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* =====================================================
         CTA SECTION
      ===================================================== */}

      <Box sx={{ py: 12, background: COLORS.gradient, position: "relative", overflow: "hidden" }}>
        <FloatingIcon delay="0s" sx={{ top: "20%", left: "10%", opacity: 0.1 }}>
          <SecurityIcon sx={{ fontSize: 80, color: "white" }} />
        </FloatingIcon>
        <FloatingIcon delay="1.5s" sx={{ bottom: "20%", right: "10%", opacity: 0.1 }}>
          <FingerprintIcon sx={{ fontSize: 80, color: "white" }} />
        </FloatingIcon>

        <Container maxWidth="md" sx={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                color: "white",
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Ready to Verify Academic Documents?
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.9)",
                mb: 4,
                fontSize: "1.2rem",
                lineHeight: 1.6,
              }}
            >
              Join verification officers using multi-agent AI to detect forgeries with 98.7% accuracy.
            </Typography>

            <Button
              variant="contained"
              size="large"
              endIcon={<CloudUploadIcon />}
              sx={{
                background: "white",
                color: COLORS.primary,
                borderRadius: "40px",
                px: 6,
                py: 2,
                fontWeight: 700,
                fontSize: "1.1rem",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                "&:hover": {
                  background: "rgba(255,255,255,0.95)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Upload Document for Verification
            </Button>
          </motion.div>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default HomePage;