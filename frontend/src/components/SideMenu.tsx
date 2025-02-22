import React, { useState } from "react";
import {
  List,
  ListItemIcon,
  ListItemText,
  Drawer,
  IconButton,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../public/logo.png";

const SideMenu: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: isExpanded ? 200 : 60,
        transition: "width 0.3s",
        flexShrink: 0,
        overflowY: "auto", // Allow vertical scrolling if needed
        overflowX: "hidden", // Prevent horizontal scrolling
        "& .MuiDrawer-paper": {
          width: isExpanded ? 200 : 60,
          transition: "width 0.3s",
          boxSizing: "border-box",
          overflowY: "auto", // Allow vertical scrolling if needed
          overflowX: "hidden", // Prevent horizontal scrolling
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: isExpanded ? "100px" : "0",
            transition: "width 0.3s",
          }}
        />
        <IconButton
          onClick={toggleSidebar}
          sx={{
            "&:focus": {
              outline: "none",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <Button
          fullWidth
          onClick={() => navigate("/")}
          sx={{
            textAlign: "left",
            justifyContent: "flex-start",
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            sx={{ opacity: isExpanded ? 1 : 0, transition: "opacity 0.3s" }}
          />
        </Button>
        {["Pipeline", "Rowers", "RowersChart", "Salestool", "WinRoom"].map(
          (text, index) => (
            <Button
              fullWidth
              key={text}
              onClick={() => navigate(`/${text + "Page"}`)}
              sx={{
                textAlign: "left",
                justifyContent: "flex-start",
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ opacity: isExpanded ? 1 : 0, transition: "opacity 0.3s" }}
              />
            </Button>
          )
        )}
      </List>
      <Box sx={{ mt: "auto" }}>
        <Divider />
        <List>
          <Button
            fullWidth
            onClick={() => navigate("/settings")}
            sx={{ textAlign: "left", justifyContent: "flex-start" }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              sx={{ opacity: isExpanded ? 1 : 0, transition: "opacity 0.3s" }}
            />
          </Button>
          <Button
            fullWidth
            onClick={() => alert("Logout?")}
            sx={{ textAlign: "left", justifyContent: "flex-start" }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{ opacity: isExpanded ? 1 : 0, transition: "opacity 0.3s" }}
            />
          </Button>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
