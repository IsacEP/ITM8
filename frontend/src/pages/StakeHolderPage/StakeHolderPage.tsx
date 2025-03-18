import React from "react";
import StakeholderScatterChart from "../../components/StakeholderScatterChart";
import { Box, Container } from "@mui/material";
import "./StakeHolderPage.css";

const StakeHolderPage: React.FC = () => {
  return (
    <Box className="bg-gray-50 min-h-screen py-8">
      <Container maxWidth="md">
        <StakeholderScatterChart />
      </Container>
    </Box>
  );
};

export default StakeHolderPage;
