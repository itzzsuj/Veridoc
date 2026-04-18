// components/FileUploader.js
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  Alert,
  Button,
  Chip,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const COLORS = {
  primary: "#1A237E",
  secondary: "#00BCD4",
  success: "#4CAF50",
  error: "#F44336",
};

const DropzoneContainer = styled(Paper)(({ isDragActive, hasError }) => ({
  padding: "40px",
  textAlign: "center",
  cursor: "pointer",
  border: `2px dashed ${isDragActive ? COLORS.primary : hasError ? COLORS.error : alpha(COLORS.primary, 0.2)}`,
  backgroundColor: isDragActive ? alpha(COLORS.primary, 0.02) : "transparent",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: COLORS.primary,
    backgroundColor: alpha(COLORS.primary, 0.02),
  },
}));

const FileUploader = ({ onFileAccepted, acceptTypes = [".pdf"], maxSize = 10 * 1024 * 1024 }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    setError(null);
    
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0].errors[0];
      if (rejection.code === "file-too-large") {
        setError(`File too large. Maximum size is ${maxSize / 1024 / 1024}MB`);
      } else if (rejection.code === "file-invalid-type") {
        setError(`Invalid file type. Please upload ${acceptTypes.join(", ")} files`);
      }
      return;
    }

    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    
    // Simulate upload progress
    setUploading(true);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress(i);
    }
    
    setUploading(false);
    onFileAccepted(selectedFile);
  }, [onFileAccepted, maxSize, acceptTypes]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    setError(null);
  };

  return (
    <Box>
      {!file && !uploading && (
        <DropzoneContainer {...getRootProps()} isDragActive={isDragActive} hasError={!!error}>
          <input {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: 64, color: COLORS.primary, mb: 2, opacity: 0.7 }} />
          <Typography variant="h6" gutterBottom>
            {isDragActive ? "Drop your PDF here" : "Drag & drop your document here"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            or click to browse
          </Typography>
          <Box sx={{ display: "flex", gap: 1, justifyContent: "center", flexWrap: "wrap" }}>
            {acceptTypes.map((type) => (
              <Chip key={type} label={type.toUpperCase()} size="small" variant="outlined" />
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
            Maximum file size: {maxSize / 1024 / 1024}MB
          </Typography>
        </DropzoneContainer>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {uploading && (
        <Paper sx={{ p: 3, mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <DescriptionIcon color="primary" />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={500}>{file?.name}</Typography>
              <LinearProgress variant="determinate" value={uploadProgress} sx={{ mt: 1, height: 6, borderRadius: 3 }} />
            </Box>
            <Typography variant="caption" fontWeight={600}>{uploadProgress}%</Typography>
          </Box>
        </Paper>
      )}

      {file && !uploading && (
        <Paper sx={{ p: 3, mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CheckCircleIcon sx={{ color: COLORS.success }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={500}>{file.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </Typography>
            </Box>
            <Button size="small" color="error" onClick={removeFile}>
              Remove
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default FileUploader;