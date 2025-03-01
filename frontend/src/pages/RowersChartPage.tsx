import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PageLayout from "../components/PageLayout";
import html2canvas from "html2canvas";

type RowerData = {
  name: string;
  value: number;
};

const RowersChartPage: React.FC = () => {
  // Load data from localStorage or use default values
  const loadData = (): RowerData[] => {
    const savedData = localStorage.getItem("rowersData");
    return savedData
      ? JSON.parse(savedData)
      : [
          { name: "Roadblock", value: 0 },
          { name: "Ownership", value: 0 },
          { name: "Win Likelihood", value: 0 },
          { name: "Economic Value", value: 0 },
          { name: "Risk", value: 0 },
          { name: "Stakeholders", value: 0 },
        ];
  };

  // State for ROWERS values
  const [rowersData, setRowersData] = useState<RowerData[]>(loadData());

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("rowersData", JSON.stringify(rowersData));
  }, [rowersData]);

  // Handle input change
  const handleInputChange = (index: number, value: number) => {
    if (value < 0 || value > 5) return; // Ensure value is between 1 and 5
    const newData = [...rowersData];
    newData[index].value = value;
    setRowersData(newData);
  };

  // Generate gradient colors based on value
  const getColor = (value: number) => {
    const intensity = (value / 5) * 255; // Map value to a color intensity
    return `rgba(0, 123, 255, ${intensity / 255})`; // Blue gradient
  };

  const CustomBarShape: React.FC<any> = (props) => {
    const { x, y, width, height, payload } = props;
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={getColor(payload.value)}
      />
    );
  };

  // Create a ref for the chart container
  const chartRef = useRef<HTMLDivElement>(null);

  // Handler for the "Extract Chart" button
  const handleExtractChart = async () => {
    if (chartRef.current) {
      try {
        const canvas = await html2canvas(chartRef.current, {
          backgroundColor: "#fff", // optional: set background color if needed
        });
        // Convert the canvas to a data URL and create a link to download
        const link = document.createElement("a");
        link.download = "rowers-chart.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      } catch (error) {
        console.error("Error capturing chart:", error);
      }
    }
  };

  return (
    <PageLayout title="ROWERS Opportunity Qualification Chart">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 0,
          m: 0,
        }}
      >
        {/* Input Section - Two Rows of 3 Boxes Each */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", mb: 4, p: 0 }}
        >
          {rowersData.map((rower, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {rower.name}
                  </Typography>
                  <TextField
                    fullWidth
                    label="Value (1-5)"
                    type="number"
                    inputProps={{ min: 1, max: 5 }}
                    value={rower.value}
                    onChange={(e) =>
                      handleInputChange(index, parseInt(e.target.value, 10))
                    }
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Chart Section with ref */}
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            p: 0,
            m: 4,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ textAlign: "center" }}
            p="20px"
          >
            ROWERS Bar Chart
          </Typography>
          <Box ref={chartRef}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={rowersData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  name="ROWERS Score"
                  shape={<CustomBarShape />}
                  animationDuration={0}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>

        {/* "Extract Chart" Button */}
        <Button
          variant="contained"
          onClick={handleExtractChart}
          sx={{ mt: 4, mb: 8, backgroundColor: "rgb(0, 123, 255)" }}
        >
          Extract Chart
        </Button>
      </Box>
    </PageLayout>
  );
};

export default RowersChartPage;
