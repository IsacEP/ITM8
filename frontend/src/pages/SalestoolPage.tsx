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
import OpportunityScoringTool from "../components/OpportunityScoringTool";
import SalesPredictionTool from "../components/SalesPredictionTool";
import PageLayout from "../components/PageLayout";

const SalesToolPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Define the tools to display
  const tools = [
    {
      title: "Opportunity Scoring Tool",
      description:
        "Prioritize sales opportunities based on budget, likelihood, and revenue.",
      component: <OpportunityScoringTool />,
      color: theme.palette.primary.main,
    },
    {
      title: "Sales Prediction Tool",
      description:
        "Predict future sales based on historical data using linear regression. This prediction is based on the asumption that sales data is linear.",
      component: <SalesPredictionTool />,
      color: theme.palette.secondary.main,
    },
  ];

  return (
    <PageLayout title="Sales Tools">
      <Box width="100%" sx={{ p: 3 }}>
        {/* 
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", mb: 4 }}
        >
          Sales Tools
        </Typography>
        */}

        {/* Tool Grid */}
        <Grid container spacing={3} justifyContent="center">
          {tools.map((tool, index) => (
            <Grid item xs={12} sm={6} md={6} key={index} margin={"5px"}>
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
    </PageLayout>
  );
};

export default SalesToolPage;
