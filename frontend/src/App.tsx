import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import PipelinePage from "./pages/PipelinePage";
import RowersPage from "./pages/RowersPage";
import RowersChartPage from "./pages/RowersChartPage";
import SalesToolPage from "./pages/SalestoolPage";
import WinRoomPage from "./pages/WinRoomPage";
import SettingsPage from "./pages/SettingsPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Themes for the cards in Rowers page. Can be changes if you want.
const Rowertheme = createTheme({
  palette: {
    primary: {
      main: "#9900cc", // Purple
    },
    secondary: {
      main: "#f50057", // Pink
    },
    success: {
      main: "#4caf50", // Green
    },
    warning: {
      main: "#ff9800", // Orange
    },
    error: {
      main: "#f44336", // Red
    },
    info: {
      main: "#2196f3", // Blue
    },
  },
});

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <DashboardPage />
            </Layout>
          }
        />
        <Route
          path="/PipelinePage"
          element={
            <Layout>
              <PipelinePage />
            </Layout>
          }
        />
        <Route
          path="/RowersPage"
          element={
            <Layout>
              <ThemeProvider theme={Rowertheme}>
                <RowersPage />
              </ThemeProvider>
            </Layout>
          }
        />
        <Route
          path="/RowersChartPage"
          element={
            <Layout>
              <RowersChartPage />
            </Layout>
          }
        />
        <Route
          path="/SalestoolPage"
          element={
            <Layout>
              <SalesToolPage />
            </Layout>
          }
        />
        <Route
          path="/WinRoomPage"
          element={
            <Layout>
              <WinRoomPage />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <SettingsPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
