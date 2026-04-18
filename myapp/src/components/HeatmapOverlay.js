// components/HeatmapOverlay.js
import React, { useState } from "react";
import { Box, Paper, Typography, Chip, Stack, IconButton, Collapse } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const COLORS = {
  genuine: "#4CAF50",
  suspicious: "#FFC107",
  forged: "#F44336",
  unknown: "#9E9E9E",
};

const HeatmapRegion = styled(Box)(({ severity }) => ({
  padding: "12px",
  borderRadius: "12px",
  backgroundColor: severity === "genuine" ? alpha(COLORS.genuine, 0.08) : severity === "suspicious" ? alpha(COLORS.suspicious, 0.08) : alpha(COLORS.forged, 0.08),
  borderLeft: `4px solid ${severity === "genuine" ? COLORS.genuine : severity === "suspicious" ? COLORS.suspicious : COLORS.forged}`,
  marginBottom: "12px",
}));

const HeatmapOverlay = ({ regions, documentId }) => {
  const [expanded, setExpanded] = useState(true);

  const getSeverityIcon = (severity) => {
    if (severity === "genuine") return <CheckCircleIcon sx={{ color: COLORS.genuine, fontSize: 18 }} />;
    if (severity === "suspicious") return <WarningIcon sx={{ color: COLORS.suspicious, fontSize: 18 }} />;
    return <WarningIcon sx={{ color: COLORS.forged, fontSize: 18 }} />;
  };

  const getSeverityLabel = (severity) => {
    return severity === "genuine" ? "Genuine" : severity === "suspicious" ? "Suspicious" : "Forgery Detected";
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          🔥 Forensic Heatmap Analysis
        </Typography>
        <IconButton onClick={() => setExpanded(!expanded)} size="small">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
          Color-coded regions based on multi-agent forensic analysis
        </Typography>

        {regions.map((region, idx) => (
          <HeatmapRegion key={idx} severity={region.severity}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {getSeverityIcon(region.severity)}
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {region.name}
                </Typography>
              </Box>
              <Chip
                label={getSeverityLabel(region.severity)}
                size="small"
                sx={{
                  bgcolor: region.severity === "genuine" ? alpha(COLORS.genuine, 0.1) : region.severity === "suspicious" ? alpha(COLORS.suspicious, 0.1) : alpha(COLORS.forged, 0.1),
                  color: region.severity === "genuine" ? COLORS.genuine : region.severity === "suspicious" ? COLORS.suspicious : COLORS.forged,
                  fontWeight: 500,
                }}
              />
            </Box>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
              {region.description}
            </Typography>
            {region.agents && (
              <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
                {region.agents.map((agent, i) => (
                  <Chip
                    key={i}
                    label={agent}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: "0.65rem", height: 20 }}
                  />
                ))}
              </Stack>
            )}
          </HeatmapRegion>
        ))}

        {/* Legend */}
        <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid", borderColor: "divider" }}>
          <Typography variant="caption" sx={{ fontWeight: 600, display: "block", mb: 1 }}>
            Legend
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Chip
              icon={<CheckCircleIcon sx={{ fontSize: 14 }} />}
              label="Genuine"
              size="small"
              sx={{ bgcolor: alpha(COLORS.genuine, 0.1), color: COLORS.genuine }}
            />
            <Chip
              icon={<WarningIcon sx={{ fontSize: 14 }} />}
              label="Suspicious"
              size="small"
              sx={{ bgcolor: alpha(COLORS.suspicious, 0.1), color: COLORS.suspicious }}
            />
            <Chip
              icon={<WarningIcon sx={{ fontSize: 14 }} />}
              label="Forgery Detected"
              size="small"
              sx={{ bgcolor: alpha(COLORS.forged, 0.1), color: COLORS.forged }}
            />
          </Stack>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default HeatmapOverlay;