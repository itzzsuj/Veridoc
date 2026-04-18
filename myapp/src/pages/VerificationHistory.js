import React from "react";
import { Container, Typography, Paper } from "@mui/material";

const VerificationHistory = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Verification History
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Your verification history will appear here.
        </Typography>
      </Paper>
    </Container>
  );
};

export default VerificationHistory;