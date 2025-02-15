import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SalesDashboard from "../components/SalesDashboard"; // Import the SalesDashboard component

const WinRoomPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Define the tools to display
  const tools = [
    {
      title: "Win Room Board",
      description:
        "Manage and track sales opportunities with detailed descriptions, responsibilities, and deadlines.",
      component: <SalesDashboard />, // Render the SalesDashboard component
      color: theme.palette.primary.main,
    },
    // Add more tools here if needed
  ];

  return (
    <Box
      width="100%"
      sx={{
        p: 3,
        overflowX: "hidden", // Prevent horizontal scrollbar
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        Win Room Tools
      </Typography>

      {/* Tool Grid */}
      <Grid container spacing={3} justifyContent="center">
        {tools.map((tool, index) => (
          <Grid item xs={12} key={index} margin={"5px"}>
            {" "}
            {/* Adjusted to xs={12} for full width */}
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderLeft: `6px solid ${tool.color}`,
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ color: tool.color, fontWeight: "bold", mb: 2 }}
                >
                  {tool.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {tool.description}
                </Typography>
                <Divider sx={{ my: 2 }} />
                {/* Render the tool component */}
                {tool.component}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Centered Button (Optional) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 8,
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/")} // Navigate to home or another page
          sx={{
            fontSize: "1.2rem",
            padding: "10px 20px",
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default WinRoomPage;
