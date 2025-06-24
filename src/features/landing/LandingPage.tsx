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
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,        
      }}
    >
      <Box
        component="img"
        src="/img/hero.png" 
        alt="background football"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          opacity: 0.4,
          width: "40%",
          zIndex: 0,
          pointerEvents: "none",          
        }}
      />
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          color: theme.palette.primary.main,
          textAlign: "center",
          mt: "18rem",          
        }}
      >
        Welcome to KFC Simulator
      </Typography>

      <Typography
        sx={{
          color: theme.palette.text.secondary,
          maxWidth: "800px",
          opacity: "0.5",
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
