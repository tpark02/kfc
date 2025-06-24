import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSquadStore } from "../store/useSquadStore";
import { shallow } from "zustand/shallow";
import { useTheme } from "@mui/material/styles";
import { useSquadGetters } from "../hooks/useSquadGetters";
import { useLoadingMyCoin } from "../hooks/useLoadingMyCoin";

const NavBar: React.FC = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { setIsDropZoneSelected } = useSquadStore(
    (s) => ({
      setIsDropZoneSelected: s.setIsDropZoneSelected,
    }),
    shallow
  );
  const { myUserId, myCoin } = useSquadGetters();
  const { reload } = useLoadingMyCoin(myUserId);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: "50px",
        display: "flex",
        alignItems: "center",
        padding: "10px",
        gap: "10px",
        backgroundColor: theme.palette.navbar.main,
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
      }}
    >
      {/* 🏷️ LOGO */}
      <Box
        component="img"
        src="/img/hero.png" // or "/assets/logo.png" based on your structure
        alt="Logo"
        onClick={() => navigate("/squad")}
        sx={{
          height: "50px",
          cursor: "pointer",          
        }}
      />
      {token && (
        <>
          <Button
            onClick={() => {
              reload();
              setIsDropZoneSelected(false);
              navigate("/players");
            }}
          >
            Recruit
          </Button>
          <Button
            onClick={() => {
              reload();
              setIsDropZoneSelected(false);
              navigate("/squad");
            }}
          >
            Club
          </Button>
          <Button
            onClick={() => {
              reload();
              setIsDropZoneSelected(false);
              navigate("/league");
            }}
          >
            League
          </Button>
        </>
      )}
      {token ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "auto",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",              
            }}
          >
            {" "}
            🪙 {myCoin}
          </Box>
          {token ? (
            <Button
              onClick={handleLogout}
              sx={{
                height: "40px",
              }}
            >
              Log out
            </Button>
          ) : (
            <Button onClick={() => navigate("/login")}>Sign In</Button>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "auto",
            gap: "1rem",
          }}
        >
          <Button onClick={() => navigate("/login")}>Log In</Button>
        </Box>
      )}
    </Box>
  );
};

export default NavBar;
