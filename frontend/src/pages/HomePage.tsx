import React from "react";
import { Container, Grid, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const tools = [
    { title: "Pipeline Tool", path: "/PipelinePage" },
    { title: "Rowers Overview", path: "/RowersPage" },
    { title: "Rowers Chart", path: "/RowersChartPage" },
    { title: "Sales Tool", path: "/SalestoolPage" },
    { title: "Win Room", path: "/WinRoomPage" },
    { title: "Canvas", path: "/CanvasPage" },
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
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </PageLayout>
  );
};

export default HomePage;
