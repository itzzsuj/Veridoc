// components/ConfirmationDialog.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import VerifiedIcon from "@mui/icons-material/Verified";
import ErrorIcon from "@mui/icons-material/Error";

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "24px",
    padding: "8px",
    maxWidth: "480px",
  },
});

const ConfirmationDialog = ({ open, onClose, onConfirm, verdict, confidence, documentName }) => {
  const isGenuine = verdict === "genuine";

  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle sx={{ textAlign: "center", pt: 3 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: isGenuine ? alpha("#4CAF50", 0.1) : alpha("#F44336", 0.1),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          {isGenuine ? (
            <VerifiedIcon sx={{ color: "#4CAF50", fontSize: 40 }} />
          ) : (
            <ErrorIcon sx={{ color: "#F44336", fontSize: 40 }} />
          )}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Confirm Verification Result
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary", mb: 2 }}>
          Document: <strong>{documentName}</strong>
        </Typography>

        <Box
          sx={{
            p: 2,
            borderRadius: "16px",
            bgcolor: isGenuine ? alpha("#4CAF50", 0.08) : alpha("#F44336", 0.08),
            textAlign: "center",
            mb: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isGenuine ? "#4CAF50" : "#F44336" }}>
            {isGenuine ? "GENUINE DOCUMENT" : "FORGERY DETECTED"}
          </Typography>
          <Typography variant="caption">
            Confidence: {confidence}% • 5-Agent Consensus
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          By confirming this result, you agree to:
        </Typography>

        <Stack spacing={1}>
          <Chip
            label="Save embedding to Pinecone for future learning"
            size="small"
            variant="outlined"
          />
          <Chip
            label="Update verification history"
            size="small"
            variant="outlined"
          />
          <Chip
            label="Generate final forensic report"
            size="small"
            variant="outlined"
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0, gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={onClose}
          sx={{ borderRadius: "40px", py: 1 }}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={onConfirm}
          sx={{
            borderRadius: "40px",
            py: 1,
            background: isGenuine ? "#4CAF50" : "#F44336",
            "&:hover": {
              background: isGenuine ? "#388E3C" : "#D32F2F",
            },
          }}
        >
          Confirm & Save
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default ConfirmationDialog;