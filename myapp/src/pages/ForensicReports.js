import React from "react";
import { Container, Typography, Paper } from "@mui/material";

const ForensicReports = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Forensic Reports
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Generated forensic reports will appear here.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ForensicReports;