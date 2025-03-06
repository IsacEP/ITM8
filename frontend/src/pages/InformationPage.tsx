import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import PageLayout from "../components/PageLayout";

const InformationPage: React.FC = () => {
  // List of sub-tools with descriptions
  const tools = [
    {
      title: "Pipeline Tool",
      description:
        "Monitor and manage sales pipelines efficiently, track progress, and forecast sales outcomes.",
    },
    {
      title: "Rowers Overview",
      description:
        "Get a complete overview of rowers (sales representatives), their performance, and key metrics.",
    },
    {
      title: "Rowers Chart",
      description:
        "Visualize sales data and trends with interactive charts to make informed decisions.",
    },
    {
      title: "Sales Tool",
      description:
        "Access powerful sales data analytics, track conversions, and optimize sales strategies.",
    },
    {
      title: "Win Room",
      description:
        "A dedicated space to analyze successful sales deals and refine winning strategies.",
    },
    {
      title: "Canvas",
      description:
        "A flexible workspace to map out sales strategies, brainstorm, and create actionable plans.",
    },
  ];

  return (
    <PageLayout title="Information">
      <Container maxWidth="md" sx={{ mb: 6 }}>
        {/* Title Section */}
        <Paper
          elevation={3}
          sx={{ p: 4, textAlign: "center", bgcolor: "#f5f5f5" }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome to the Sales Analysis Tool
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Learn how to use the platform efficiently and make data-driven sales
            decisions.
          </Typography>
        </Paper>

        {/* Features Section */}
        <Box mt={4}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            🔧 Features & Tools
          </Typography>
          <List>
            {tools.map((tool, index) => (
              <React.Fragment key={tool.title}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="h6" fontWeight="bold">
                        {tool.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body1">
                        {tool.description}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < tools.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* Technical Section */}
        <Box mt={6} p={3} sx={{ bgcolor: "#e3f2fd", borderRadius: 2 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            🛠️ Technical Overview
          </Typography>
          <Typography variant="body1" paragraph>
            This tool is built using <strong>React</strong> with{" "}
            <strong>Vite</strong> for fast development and performance
            optimization. The UI is powered by <strong>MUI</strong>, including
            specialized & tailored styling, for a modern and responsive
            experience. The usage of popular API's & Libraries such as{" "}
            <strong>MUI & TlDraw</strong> makes the tool easily developed and
            flexible.
          </Typography>
          <Typography variant="body1" paragraph>
            The architecture follows a modular approach with the following
            concepts:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="🔹 Component-based structure for scalability." />
            </ListItem>
            <ListItem>
              <ListItemText primary="🔹 State management using React hooks and context (if applicable)." />
            </ListItem>
            <ListItem>
              <ListItemText primary="🔹 Routing handled by React Router for seamless navigation." />
            </ListItem>
            <ListItem>
              <ListItemText primary="🔹 Optimized performance using lazy loading and efficient API calls." />
            </ListItem>
          </List>
        </Box>

        {/* Footer */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            📌 Need help? Reach out to the development team!
          </Typography>
        </Box>
      </Container>
    </PageLayout>
  );
};

export default InformationPage;
