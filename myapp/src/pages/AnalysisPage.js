// src/pages/AnalysisPage.js
import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  LinearProgress,
  Divider,
  Chip,
} from "@mui/material";
import {
  Security as SecurityIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";

const AnalysisPage = () => {
  const agents = [
    { name: "Agent 2A · PDF Metadata", status: "passed", confidence: 96, color: "#1A237E" },
    { name: "Agent 2B · OpenCV Visual", status: "passed", confidence: 94, color: "#00BCD4" },
    { name: "Agent 2C · CNN Seal/Stamp", status: "passed", confidence: 98, color: "#4CAF50" },
    { name: "Agent 2D · Gemini + GPT-4o", status: "passed", confidence: 97, color: "#2196F3" },
    { name: "Agent 2E · Pinecone RAG", status: "warning", confidence: 85, color: "#FFC107" },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Forensic Analysis Results
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
        5-agent parallel analysis with weighted voting
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Agent Analysis Results</Typography>
            {agents.map((agent, idx) => (
              <Box key={idx} sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <SecurityIcon sx={{ color: agent.color, fontSize: 20 }} />
                    <Typography variant="body2" fontWeight={500}>{agent.name}</Typography>
                  </Box>
                  <Chip
                    label={agent.status === "passed" ? "Verified" : "Review Needed"}
                    size="small"
                    sx={{
                      bgcolor: agent.status === "passed" ? "#4CAF5020" : "#FFC10720",
                      color: agent.status === "passed" ? "#4CAF50" : "#FFC107",
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={agent.confidence}
                    sx={{ flex: 1, height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="caption" fontWeight={600}>
                    {agent.confidence}%
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, bgcolor: "#4CAF5010", border: "1px solid #4CAF5030" }}>
            <VerifiedIcon sx={{ fontSize: 48, color: "#4CAF50", mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#4CAF50" }}>
              GENUINE
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Weighted Voting Result: 96.2% Confidence
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              All 5 agents reached consensus. No forgery indicators detected.
            </Typography>
          </Paper>

          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
              🔥 Heatmap Analysis
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Chip label="Seal Region: Genuine" color="success" size="small" />
              <Chip label="Signature: Verified" color="success" size="small" />
              <Chip label="Watermark: Present" color="success" size="small" />
              <Chip label="Metadata: Consistent" color="success" size="small" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnalysisPage;