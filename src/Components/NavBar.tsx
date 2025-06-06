import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSquadStore } from "../store/useSquadStore";
import { shallow } from "zustand/shallow";

import "../index.css";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { setIsDropZoneSelected } = useSquadStore(
    (s) => ({
      setIsDropZoneSelected: s.setIsDropZoneSelected,
    }),
    shallow
  );
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
        padding: "10px",
        background: "#f0f0f0",
        // borderBottom: "1px solid #ccc",
        backgroundColor: "var(--background-color)",
      }}
    >
      <Button
        className="nav-menu-button"
        // onClick={() => (window.location.href = "/")}
        onClick={() => {
          setIsDropZoneSelected(false);
          navigate("/");
        }}
      >
        Recruit
      </Button>
      <Button
        className="nav-menu-button"
        onClick={() => {
          setIsDropZoneSelected(false);
          navigate("/squad");
        }}
      >
        Team Builder
      </Button>
      <Button
        className="nav-menu-button"
        onClick={() => {
          setIsDropZoneSelected(false);
          navigate("/league");
        }}
      >
        League
      </Button>
      <Button
        className="nav-menu-button"
        onClick={() => {
          setIsDropZoneSelected(false);
          navigate("/tournament");
        }}
      >
        Tournament
      </Button>
    </div>
  );
};

export default NavBar;
