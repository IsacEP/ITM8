// src/components/Header.tsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "white", boxShadow: "none", position: "relative" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Left: Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />
        </Box>

        {/* Center: Title (Completely centered on the screen) */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: "rgb(95,37,159)",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
          }}
        >
          Sales Opportunity Analyzer
        </Typography>

        {/* Right: Navigation Buttons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "rgb(95,37,159)" }}
            onClick={() => navigate("/")}
          >
            HomePage
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "rgb(95,37,159)" }}
            onClick={() => alert("Information button clicked")}
          >
            Information
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "rgb(95,37,159)" }}
            onClick={() => navigate("/settings")}
          >
            Settings
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "rgb(95,37,159)" }}
            onClick={() => {
              /* Logout functionality (not implemented yet) */
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
