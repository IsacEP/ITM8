import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
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

  return (
    <PageLayout title="ROWERS Opportunity Qualification Chart">
      <Box
        sx={{
          width: "100%",
          display: "flex", // Use flexbox for centering
          flexDirection: "column", // Stack children vertically
          alignItems: "center", // Center children horizontally
          p: 0, // Remove default padding
          m: 0, // Remove default margin
        }}
      >
        {/*
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", mb: 4 }}
        >
          ROWERS Opportunity Qualification Chart
        </Typography>
        */}

        {/* Input Section - Horizontal Layout */}
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", mb: 4, flexWrap: "wrap", p: 0 }}
        >
          {rowersData.map((rower, index) => (
            <Grid item key={index} sx={{ flex: "0 0 auto", minWidth: 200 }}>
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

        {/* Bar Chart Section */}
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            p: 0,
            m: 4, // Remove default margin
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
        </Paper>
      </Box>
    </PageLayout>
  );
};

export default RowersChartPage;
