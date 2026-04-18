import React from "react";
import { Container, Typography, Paper } from "@mui/material";

const Settings = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Settings
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body2" color="text.secondary">
          User settings and preferences will appear here.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Settings;