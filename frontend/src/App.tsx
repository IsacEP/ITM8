import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./services/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PipelinePage from "./pages/PipelinePage";
import RowersPage from "./pages/RowersPage";
import RowersChartPage from "./pages/RowersChartPage";
import SalesToolPage from "./pages/SalestoolPage";
import WinRoomPage from "./pages/WinRoomPage";
import CanvasPage from "./pages/CanvasPage";
import StakeHolderPage from "./pages/StakeHolderPage";
import FlowPage from "./pages/Flow";
import InformationPage from "./pages/InformationPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginPage from "./pages/LoginPage";

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
    <AuthProvider>
      <Router basename="/ITM8">
        <Header />
        <Routes>
          {/* Login Route (Public) */}
          <Route path="/login" element={<LoginPage />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
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
            <Route path="/CanvasPage" element={<CanvasPage />} />
            <Route path="/FlowPage" element={<FlowPage />} />
            <Route path="/StakeholderPage" element={<StakeHolderPage />} />
            <Route path="/information" element={<InformationPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
