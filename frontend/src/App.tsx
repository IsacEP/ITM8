import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./services/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import Header from "./components/Layout/Header";
import HomePage from "./pages/HomePage/HomePage";
import PipelinePage from "./pages/PipelinePage/PipelinePage";
import RowersPage from "./pages/RowersPage/RowersPage";
import RowersChartPage from "./pages/RowersChartPage/RowersChartPage";
import SalesToolPage from "./pages/SalestoolPage/SalestoolPage";
import WinRoomPage from "./pages/WinRoomPage/WinRoomPage";
import CanvasPage from "./pages/CanvasPage/CanvasPage";
import StakeHolderPage from "./pages/StakeHolderPage/StakeHolderPage";
import FlowPage from "./pages/FlowPage/Flow";
import SalesFunnelAnalysis from "./pages/SalesFunnelAnalysis/SalesFunnelAnalysis";
import InformationPage from "./pages/InformationPage/InformationPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
            <Route
              path="/SalesFunnelAnalysis"
              element={<SalesFunnelAnalysis />}
            />
            <Route path="/information" element={<InformationPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
