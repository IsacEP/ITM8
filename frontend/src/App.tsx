import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PipelinePage from "./pages/PipelinePage";
import RowersPage from "./pages/RowersPage";
import RowersChartPage from "./pages/RowersChartPage";
import SalesToolPage from "./pages/SalestoolPage";
import WinRoomPage from "./pages/WinRoomPage";
import SettingsPage from "./pages/SettingsPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Theme for the Rowers page (if needed)
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
    <Router basename="/ITM8">
      {/* Header is always rendered */}
      <Header />
      <Routes>
        {/* New HomePage */}
        <Route path="/" element={<HomePage />} />
        <Route path="/PipelinePage" element={<PipelinePage />} />
        <Route
          path="/RowersPage"
          element={
            <ThemeProvider theme={Rowertheme}>
              <RowersPage />
            </ThemeProvider>
          }
        />
        <Route path="/RowersChartPage" element={<RowersChartPage />} />
        <Route path="/SalestoolPage" element={<SalesToolPage />} />
        <Route path="/WinRoomPage" element={<WinRoomPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
