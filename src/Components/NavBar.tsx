import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSquadStore } from "../store/useSquadStore";
import { shallow } from "zustand/shallow";
import { useTheme } from "@mui/material/styles";
import { useSquadGetters } from "./hooks/useSquadGetters";
import { useLoadingSpinnerStore } from "../store/useLoadingSpinnerStore";
import { useSquadSetters } from "./hooks/useSquadSetter";
import axiosInstance from "../axiosInstance";
import { useLoadingMyCoin } from "./hooks/useLoadingMyCoin";

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
  const { error, reload } = useLoadingMyCoin(myUserId);

  // const { myCoin } = useSquadGetters();
  // const { setMyCoin } = useSquadSetters();

  // const fetchMyCoin = async () => {
  //   try {
  //     const res = await axiosInstance.get("/api/me", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     const { myCoin } = res.data;
  //     setMyCoin(myCoin);
  //   } catch (e) {
  //     console.error("Failed to fetch my coin:", e);
  //   } finally {
  //     useLoadingSpinnerStore.getState().setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   useLoadingSpinnerStore.getState().setIsLoading(true);
  //   console.log("🪙 my coin");
  //   fetchMyCoin();
  // });

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
      <Button
        className="nav-menu-button"
        onClick={() => {
          reload();
          setIsDropZoneSelected(false);
          navigate("/");
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
        My Club
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
      {/* <Button className="nav-menu-button" onClick={() => { setIsDropZoneSelected(false); navigate("/tournament"); }}>
        Tournament
      </Button> */}
      {/* <Button className="nav-menu-button" onClick={() => { setIsDropZoneSelected(false); navigate("/register"); }}>
        Register
      </Button> */}
      {/* 오른쪽 끝에 로그인/로그아웃 버튼 */}

      <Box sx={{ display: "flex", gap: 4, marginLeft: "auto" }}>
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
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button variant="contained" onClick={() => navigate("/login")}>
            Sign In
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default NavBar;
