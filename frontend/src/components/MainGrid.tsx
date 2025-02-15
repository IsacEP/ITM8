import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

const MainGrid: React.FC = () => {
  return (
    <Grid container spacing={3} style={{ padding: "20px" }}>
      <Grid item xs={12} md={6} lg={4}>
        <Paper style={{ padding: "20px" }}>
          <Typography variant="h6">Users</Typography>
          <Typography variant="body1">14K Last 30 days</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper style={{ padding: "20px" }}>
          <Typography variant="h6">Connections</Typography>
          <Typography variant="body1">325 Last 30 days</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper style={{ padding: "20px" }}>
          <Typography variant="h6">Event Count</Typography>
          <Typography variant="body1">200k Last 30 days</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MainGrid;
