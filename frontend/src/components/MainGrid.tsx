import React from "react";
import { Grid, Box, Typography, Paper } from "@mui/material";
import SalesChart from "../components/data/SalesChart.tsx";

// Mock data for StatCard
type StatCardProps = {
  title: string;
  value: string;
  interval: string;
  trend: "up" | "down" | "neutral";
  data: number[];
};

const mockData: StatCardProps[] = [
  {
    title: "Users",
    value: "14k",
    interval: "Last 30 days",
    trend: "up",
    data: Array.from({ length: 30 }, (_, i) => 100 + i * 10),
  },
  {
    title: "Conversions",
    value: "325",
    interval: "Last 30 days",
    trend: "down",
    data: Array.from({ length: 30 }, (_, i) => 200 - i * 5),
  },
  {
    title: "Event count",
    value: "200k",
    interval: "Last 30 days",
    trend: "neutral",
    data: Array.from({ length: 30 }, (_, i) => 500 + i * 20),
  },
];

// Placeholder component for StatCard
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  interval,
  trend,
}) => (
  <Paper
    sx={{
      p: 2,
      display: "flex",
      flexDirection: "column",
      height: "100%", // Fills grid cell
    }}
  >
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h4">{value}</Typography>
    <Typography variant="body2">{interval}</Typography>
    <Typography variant="body2">Trend: {trend}</Typography>
  </Paper>
);

const HighlightedCard = () => (
  <Paper
    sx={{
      p: 2,
      display: "flex",
      flexDirection: "column",
      height: "100%", // Fills grid cell
    }}
  >
    <Typography variant="h6">Highlighted Card</Typography>
    <Typography>Additional details go here.</Typography>
  </Paper>
);

const MainGrid: React.FC = () => {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, pb: 4 }}>
      {/* Overview Section */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
        {mockData.map((card, index) => (
          <Grid key={index} item xs={12} sm={6} lg={3}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} lg={3}>
          <HighlightedCard />
        </Grid>
      </Grid>

      {/* Sales Data Section */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Sales Data
      </Typography>
      <Box
        sx={{
          p: 2,
          border: "1px solid #ddd",
          borderRadius: "8px",
          height: "500px", // Set explicit height
          backgroundColor: "#f9f9f9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SalesChart />
      </Box>
    </Box>
  );
};

export default MainGrid;
