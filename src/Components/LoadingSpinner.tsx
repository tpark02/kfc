// components/LoadingSpinner.tsx
import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";

const LoadingSpinner: React.FC = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={2000}
      sx={{ backdropFilter: "blur(4px)", backgroundColor: "rgba(0,0,0,0.3)" }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderRadius: "12px",
          padding: "32px 48px",
          textAlign: "center",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>          
        </Typography>
        <CircularProgress size={48} thickness={4} color="inherit" />
      </Box>
    </Box>
  );
};

export default LoadingSpinner;
