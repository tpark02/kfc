import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSquadStore } from "../store/useSquadStore";
import { shallow } from "zustand/shallow";

import "../index.css";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { setIsDropZoneSelected } = useSquadStore(
    (s) => ({
      setIsDropZoneSelected: s.setIsDropZoneSelected,
    }),
    shallow
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className="tab-bar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: "50px",
        display: "flex",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "var(--background-color)",
      }}
    >
      <Button className="nav-menu-button" onClick={() => { setIsDropZoneSelected(false); navigate("/"); }}>
        Recruit
      </Button>
      <Button className="nav-menu-button" onClick={() => { setIsDropZoneSelected(false); navigate("/squad"); }}>
        Team Builder
      </Button>
      <Button className="nav-menu-button" onClick={() => { setIsDropZoneSelected(false); navigate("/league"); }}>
        League
      </Button>
      <Button className="nav-menu-button" onClick={() => { setIsDropZoneSelected(false); navigate("/tournament"); }}>
        Tournament
      </Button>

      {/* 오른쪽 끝에 로그인/로그아웃 버튼 */}
      <div style={{ marginLeft: "auto" }}>
        {token ? (
          <Button variant="outlined" color="error" onClick={handleLogout}>
            로그아웃
          </Button>
        ) : (
          <Button variant="contained" onClick={() => navigate("/login")}>
            로그인
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
