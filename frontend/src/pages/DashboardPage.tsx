import React from "react";
import { Box, CssBaseline, Toolbar, Container } from "@mui/material";
import SideMenu from "../components/SideMenu.tsx";
import Header from "../components/Header.tsx";
import AppNavbar from "../components/AppNavbar.tsx";
import MainGrid from "../components/MainGrid.tsx";

const DashboardPage: React.FC = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <Header />
      <SideMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <AppNavbar />
        <Container>
          <MainGrid />
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;
