// src/components/Header.tsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const tools = [
    { label: "Pipeline Tool", path: "/PipelinePage" },
    { label: "Rowers Overview", path: "/RowersPage" },
    { label: "Rowers Chart", path: "/RowersChartPage" },
    { label: "Sales Tool", path: "/SalestoolPage" },
    { label: "Win Room", path: "/WinRoomPage" },
  ];

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        position: "relative",
        borderBottom: "3px solid rgb(95,37,159)",
        paddingBottom: "5px",
      }}
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
          variant="h4"
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

          {/* Dropdown (replacing old Information button) */}
          <Button
            variant="contained"
            sx={{ backgroundColor: "rgb(95,37,159)" }}
            onClick={handleMenuOpen}
          >
            Tools
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {tools.map((tool) => (
              <MenuItem
                key={tool.path}
                onClick={() => {
                  navigate(tool.path);
                  handleMenuClose();
                }}
              >
                {tool.label}
              </MenuItem>
            ))}
          </Menu>

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
            onClick={() => {}}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
