import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: 4,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          color: theme.palette.primary.main,
          marginBottom: 4,
          textAlign: "center",
        }}
      >
        Welcome to KFC Simulator
      </Typography>

      <Typography
        variant="h6"
        sx={{
          color: theme.palette.text.secondary,
          maxWidth: "600px",
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        Manage your own football club. Recruit players, build your dream squad,
        and dominate the league.
      </Typography>
      <Box sx={{ display: "flex", gap: 4 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            paddingX: 4,
            paddingY: 1,
          }}
          onClick={() => navigate("/signup")}
        >
          Get Started
        </Button>        
      </Box>
    </Box>
  );
};

export default LandingPage;
