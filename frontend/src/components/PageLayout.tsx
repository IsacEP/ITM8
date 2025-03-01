import React from "react";
import { Container, Typography, Box } from "@mui/material";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: "10px",
        mb: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, color: "rgb(95,37,159)" }}>
        {title}
      </Typography>
      <Box>{children}</Box>
    </Container>
  );
};

export default PageLayout;
