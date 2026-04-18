// src/pages/TemplateLibrary.js
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Description as DescriptionIcon } from "@mui/icons-material";

const TemplateLibrary = () => {
  const [templates] = useState([
    { id: 1, name: "TNBSE Marksheet Template", institution: "TNBSE", date: "2024-01-15" },
    { id: 2, name: "Anna University Grade Sheet", institution: "Anna University", date: "2024-01-20" },
    { id: 3, name: "CBSE Class XII Certificate", institution: "CBSE", date: "2024-02-01" },
  ]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Template Library
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Upload genuine document templates for the system to learn from
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />}>
          Upload Template
        </Button>
      </Box>

      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid item xs={12} md={4} key={template.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <DescriptionIcon color="primary" sx={{ fontSize: 40 }} />
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>{template.name}</Typography>
                <Typography variant="body2" color="text.secondary">{template.institution}</Typography>
                <Typography variant="caption" color="text.secondary">Added: {template.date}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TemplateLibrary;