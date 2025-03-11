import React from "react";
import { Container, Grid, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import CompanySelector from "../components/CompanySelector";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const tools = [
    {
      title: "Pipeline Tool",
      path: "/PipelinePage",
      description:
        "Manage pipelines efficiently with parameter-based calculations to streamline your processes.",
    },
    {
      title: "Rowers Overview",
      path: "/RowersPage",
      description:
        "Get a quick view of all rowers and understand each letter in ROWERS for deeper metric insights.",
    },
    {
      title: "Rowers Chart",
      path: "/RowersChartPage",
      description:
        "Visualize rowers' performance in a bar chart for easy comparison and analysis over time.",
    },
    {
      title: "Sales Tool",
      path: "/SalestoolPage",
      description:
        "Predict future sales through linear regression or calculate weighted opportunities. ",
    },
    {
      title: "Win Room",
      path: "/WinRoomPage",
      description:
        "Showcase your wins and opportunities, keeping track of achievements for ongoing motivation.",
    },
    {
      title: "Canvas",
      path: "/CanvasPage",
      description:
        "Create and manage canvases to visualize ideas, making it easier to plan and execute projects.",
    },
    {
      title: "Flow Chart",
      path: "/FlowPage",
      description:
        "Design and analyze flow charts to outline and optimize workflows for improved efficiency.",
    },
  ];

  return (
    <PageLayout title="Home Page">
      <Container sx={{ marginTop: 4 }}>
        <Grid container spacing={4}>
          {tools.map((tool, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {tool.title}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "rgb(95,37,159)" }}
                  onClick={() => navigate(tool.path)}
                >
                  Go to {tool.title}
                </Button>
                <Typography variant="body2" gutterBottom sx={{ marginTop: 1 }}>
                  {tool.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </PageLayout>
  );
};

export default HomePage;
