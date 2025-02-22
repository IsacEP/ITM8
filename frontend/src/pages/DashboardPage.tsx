import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import SalesChart from "../components/data/testChart";

const DashboardPage: React.FC = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box width="100%">
        <Typography variant="h4" gutterBottom textAlign="center">
          Welcome, User!
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ backgroundColor: "#1e1e1e", borderRadius: "12px" }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: "#4caf50" }}>
                  💰 200k
                </Typography>
                <Typography variant="body1">Revenue Last 30 days</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ backgroundColor: "#1e1e1e", borderRadius: "12px" }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: "#2196f3" }}>
                  👥 14K
                </Typography>
                <Typography variant="body1">Users Last 30 days</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ backgroundColor: "#1e1e1e", borderRadius: "12px" }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: "#ff9800" }}>
                  🔗 325
                </Typography>
                <Typography variant="body1">
                  Connections Last 30 days
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card
              sx={{
                backgroundColor: "#1e1e1e",
                borderRadius: "12px",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom textAlign="center">
                  Sales Overview
                </Typography>
                <SalesChart />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default DashboardPage;
