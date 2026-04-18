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
  CircularProgress,
} from "@mui/material";
import { 
  CloudUpload as CloudUploadIcon, 
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setUploadResult(null);
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setError(null);
    setUploadResult(null);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', 'auto');
    
    try {
      console.log('📤 Uploading to backend:', file.name);
      
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Upload failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Upload success:', data);
      
      setUploadResult(data);
      
      // Store case_id in localStorage
      localStorage.setItem('current_case_id', data.case_id);
      localStorage.setItem('current_case_data', JSON.stringify(data));
      
      // Clear file after successful upload (optional)
      // setFile(null);
      
    } catch (err) {
      console.error('❌ Upload failed:', err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleViewAnalysis = () => {
    if (uploadResult?.case_id) {
      navigate(`/analysis/${uploadResult.case_id}`);
    }
  };

  const handleReset = () => {
    setFile(null);
    setUploadResult(null);
    setError(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Upload Document for Verification
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
        Upload academic marksheets (PDF format) for 5-agent forensic analysis
      </Typography>

      {/* Error Alert */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={() => setError(null)}
        >
          <Typography variant="body2" fontWeight={500}>Upload Failed</Typography>
          <Typography variant="caption">{error}</Typography>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Make sure backend is running on http://localhost:8000
          </Typography>
        </Alert>
      )}

      {/* Success Alert */}
      {uploadResult && (
        <Alert 
          severity="success" 
          icon={<CheckCircleIcon />}
          sx={{ mb: 3 }}
        >
          <Typography variant="body2" fontWeight={500}>
            ✅ Document Processed Successfully
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
            <Chip 
              label={`Case ID: ${uploadResult.case_id?.slice(0, 12)}...`} 
              size="small" 
              variant="outlined"
            />
            <Chip 
              label={`Language: ${uploadResult.detected_language?.toUpperCase()}`} 
              size="small" 
              color="primary"
            />
            <Chip 
              label={`Status: ${uploadResult.status}`} 
              size="small" 
              color={uploadResult.cached ? "default" : "success"}
            />
          </Stack>
          <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
            OCR Preview: {uploadResult.ocr_text_preview?.slice(0, 150)}...
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button 
              size="small" 
              variant="contained" 
              onClick={handleViewAnalysis}
            >
              View Live Analysis
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              onClick={handleReset}
            >
              Upload Another Document
            </Button>
          </Stack>
        </Alert>
      )}

      {/* Dropzone */}
      {!uploadResult && (
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
            Supported formats: PDF, PNG, JPG (TNBSE, Anna University, CBSE marksheets)
          </Typography>
        </Paper>
      )}

      {/* Selected File */}
      {file && !uploadResult && (
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
              startIcon={uploading && <CircularProgress size={16} color="inherit" />}
            >
              {uploading ? "Processing..." : "Verify Document"}
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              disabled={uploading}
            >
              Cancel
            </Button>
          </Stack>
          {uploading && <LinearProgress sx={{ mt: 2 }} />}
        </Paper>
      )}

      {/* Supported Boards */}
      <Paper sx={{ mt: 4, p: 2, bgcolor: 'grey.50' }}>
        <Typography variant="caption" color="text.secondary" fontWeight={500}>
          Supported Boards:
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
          <Chip label="TNBSE" size="small" variant="outlined" />
          <Chip label="Anna University" size="small" variant="outlined" />
          <Chip label="CBSE" size="small" variant="outlined" />
          <Chip label="Karnataka PUC" size="small" variant="outlined" />
          <Chip label="Telangana SSC" size="small" variant="outlined" />
        </Stack>
      </Paper>
    </Container>
  );
};

export default UploadPage;