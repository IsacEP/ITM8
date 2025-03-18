import React from "react";
import { Container, Typography } from "@mui/material";
import PageLayout from "../../components/Layout/PageLayout";
import ToolCard from "../../components/ToolCard";
import "./HomePage.css";

const HomePage: React.FC = () => {
  const tools = [
    {
      title: "Pipeline Tool",
      path: "/PipelinePage",
      description:
        "Manage pipelines with parameter-based calculations to streamline your processes.",
    },
    {
      title: "Win Room",
      path: "/WinRoomPage",
      description:
        "Showcase your wins and opportunities, keeping track of achievements for motivation.",
    },
    {
      title: "Stakeholder Map",
      path: "/StakeholderPage",
      description:
        "Visualize stakeholder support and influence to prioritize relationships.",
    },
    {
      title: "Rowers Overview",
      path: "/RowersPage",
      description:
        "Get a quick view of rowers and understand each letter in ROWERS for deeper metric insights.",
    },
    {
      title: "Rowers Chart",
      path: "/RowersChartPage",
      description:
        "Visualize rowers performance in a bar chart for easy comparison and analysis over time.",
    },
    {
      title: "Sales Tool",
      path: "/SalestoolPage",
      description:
        "Predict future sales through regression or calculate weighted opportunities.",
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
      {/* HERO SECTION */}
      <Container maxWidth={false} disableGutters>
        <div className="hero-fade-out relative ">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-24 px-4 rounded-lg">
            <div className="max-w-7xl mx-auto pl-8">
              <Typography variant="h3" className="font-bold mb-4">
                Sales Opportunity Analyzer
              </Typography>
              <Typography
                variant="h6"
                className="mb-6 max-w-2xl leading-relaxed"
              >
                Analyze, plan, and optimize your sales strategies in one place.
              </Typography>
            </div>
          </div>
          {/* Fade from purple -> white at the bottom of hero */}
          <div className="fade-bottom"></div>
        </div>
      </Container>

      {/* TOOLS SECTION */}
      <div className="bg-white pt-6 pb-12">
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <ToolCard key={index} tool={tool} />
            ))}
          </div>
        </Container>
      </div>
    </PageLayout>
  );
};

export default HomePage;
