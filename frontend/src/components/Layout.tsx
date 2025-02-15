import React from "react";
import { Box } from "@mui/material";
import SideMenu from "./SideMenu";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box display="flex" sx={{ height: "100vh", overflowX: "hidden" }}>
      {/* Side Menu */}
      <SideMenu />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row", // Ensure row layout
          padding: "24px",
          width: "100%",
          overflowY: "auto", // Allow scroll if needed
          overflowX: "hidden", // Prevent horizontal scroll
        }}
      >
        <Box sx={{ width: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
