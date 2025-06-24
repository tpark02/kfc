import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Box } from "@mui/system";

const Layout: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // 전체 layout이 100vh 보장
      }}
    >
      <NavBar />
      <Box sx={{ margin: "2rem" }}></Box>
      <Box
        sx={{
          flex: 1, // ✅ 핵심: Outlet이 flex-grow 1 해야 Footer 밀림
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
