// src/pages/UploadPage.js
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Alert,
  LinearProgress,
  Chip,
  Stack,
} from "@mui/material";
import { CloudUpload as CloudUploadIcon, Description as DescriptionIcon } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

const UploadPage = () => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    // API call will go here
    setTimeout(() => setUploading(false), 2000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Upload Document for Verification
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
        Upload academic marksheets (PDF format) for 5-agent forensic analysis
      </Typography>

      <Paper
        {...getRootProps()}
        sx={{
          p: 6,
          textAlign: "center",
          border: "2px dashed",
          borderColor: isDragActive ? "primary.main" : "grey.300",
          bgcolor: isDragActive ? "action.hover" : "background.paper",
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "primary.main",
            bgcolor: "action.hover",
          },
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {isDragActive ? "Drop your PDF here" : "Drag & drop your PDF here"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          or click to browse
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
          Supported formats: PDF (TNBSE, Anna University, CBSE marksheets)
        </Typography>
      </Paper>

      {file && (
        <Paper sx={{ mt: 3, p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <DescriptionIcon color="primary" />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={500}>{file.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Verify Document"}
            </Button>
          </Stack>
          {uploading && <LinearProgress sx={{ mt: 2 }} />}
        </Paper>
      )}
    </Container>
  );
};

export default UploadPage;