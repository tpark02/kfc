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
      className="tab-bar"
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
      {token && (
        <>
          <Button
            className="nav-menu-button"
            onClick={() => {
              reload();
              setIsDropZoneSelected(false);
              navigate("/players");
            }}            
          >
            Recruit
          </Button>
          <Button
            className="nav-menu-button"
            onClick={() => {
              reload();
              setIsDropZoneSelected(false);
              navigate("/squad");
            }}            
          >
            Club
          </Button>
          <Button
            className="nav-menu-button"
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
      <Box sx={{ display: "flex", gap: 2, marginLeft: "auto" }}>
        {token ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              🪙 {myCoin}
            </Box>
            {token ? (
              <Button onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button onClick={() => navigate("/login")}>
                Sign In
              </Button>
            )}
          </>
        ) : (
          <Button onClick={() => navigate("/login")}>
            Sign In
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default NavBar;
