// components/LoadingSpinner.js
import React from "react";
import { Box, CircularProgress, Typography, Paper } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SecurityIcon from "@mui/icons-material/Security";

const StyledBox = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: alpha("#000", 0.5),
  zIndex: 9999,
});

const LoadingCard = styled(Paper)({
  padding: "32px",
  borderRadius: "24px",
  textAlign: "center",
  background: "white",
  minWidth: "280px",
});

const LoadingSpinner = ({ message = "Analyzing document with 5 forensic agents..." }) => {
  return (
    <StyledBox>
      <LoadingCard elevation={3}>
        <Box sx={{ position: "relative", display: "inline-block", mb: 2 }}>
          <CircularProgress size={60} thickness={4} sx={{ color: "#1A237E" }} />
          <SecurityIcon
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#00BCD4",
              fontSize: 24,
            }}
          />
        </Box>
        <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
          {message}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Agent 1: Intake • Agent 2A-2E: Analysis • Agent 3: Aggregation • Agent 4: Report • Agent 5: Learning
        </Typography>
      </LoadingCard>
    </StyledBox>
  );
};

export default LoadingSpinner;