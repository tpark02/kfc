import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Box } from "@mui/system";

const Layout: React.FC = () => {
  return (
    <Box
      className="app-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",        
      }}
    >
      {/* Header */}
      <NavBar />

      {/* Body */}
      <Box sx={{ flex: 1, mt: 10}}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
