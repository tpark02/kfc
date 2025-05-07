import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
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
        borderBottom: "1px solid #ccc",
      }}
    >
      <button
        style={{ marginRight: "10px" }}
        onClick={() => (window.location.href = "/")}
      >
        Players
      </button>
      <button onClick={() => navigate("/squad")}>Team Builder</button>
    </div>
  );
};

export default NavBar;
