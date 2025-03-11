// src/pages/StakeHolderPage.tsx
import React from "react";
import { Grid, Card, CardContent } from "@mui/material";
import { StakeholderHeatMap } from "../components/StakeholderHeatMap";
import { StakeholderScatterChart } from "../components/StakeHolderScatterMap";
import PageLayout from "../components/PageLayout";

const StakeHolderPage: React.FC = () => {
  return (
    <PageLayout title="StakeHolder">
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="stretch"
        sx={{ width: "100%", mb: 6, p: 0 }}
      >
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <StakeholderHeatMap />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ height: "100%" }}>
              <StakeholderScatterChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default StakeHolderPage;
