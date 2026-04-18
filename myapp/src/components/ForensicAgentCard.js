// components/ForensicAgentCard.js
import React from "react";
import { Box, Paper, Typography, LinearProgress, Chip, Tooltip } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import ErrorIcon from "@mui/icons-material/Error";

const StyledPaper = styled(Paper)(({ theme, agentColor }) => ({
  padding: "16px",
  borderRadius: "16px",
  borderLeft: `4px solid ${agentColor}`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateX(4px)",
    boxShadow: `0 8px 24px ${alpha(agentColor, 0.15)}`,
  },
}));

const ForensicAgentCard = ({ agent, status, confidence, findings, color }) => {
  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon sx={{ color: "#4CAF50", fontSize: 20 }} />;
      case "processing":
        return <PendingIcon sx={{ color: "#FFC107", fontSize: 20 }} />;
      case "error":
        return <ErrorIcon sx={{ color: "#F44336", fontSize: 20 }} />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "#4CAF50";
      case "processing":
        return "#FFC107";
      case "error":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  return (
    <StyledPaper agentColor={color}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
            {agent}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Forensic Analysis
          </Typography>
        </Box>
        <Tooltip title={status}>
          {getStatusIcon()}
        </Tooltip>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Confidence Score
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600, color }}>
            {confidence}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={confidence}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: alpha(color, 0.1),
            "& .MuiLinearProgress-bar": {
              bgcolor: color,
              borderRadius: 3,
            },
          }}
        />
      </Box>

      {findings && findings.length > 0 && (
        <Box>
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 1 }}>
            Key Findings:
          </Typography>
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {findings.map((finding, idx) => (
              <Chip
                key={idx}
                label={finding}
                size="small"
                sx={{
                  fontSize: "0.7rem",
                  height: 24,
                  bgcolor: alpha(color, 0.08),
                  color: color,
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      <Box sx={{ mt: 2, pt: 1, borderTop: `1px solid ${alpha(color, 0.1)}` }}>
        <Typography variant="caption" sx={{ color: getStatusColor() }}>
          Status: {status === "completed" ? "Analysis Complete" : status === "processing" ? "Processing..." : "Error"}
        </Typography>
      </Box>
    </StyledPaper>
  );
};

export default ForensicAgentCard;