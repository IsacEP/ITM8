import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

const SalesPredictionTool: React.FC = () => {
  // State for input values
  const [historicalData, setHistoricalData] = useState<number[]>([]);
  const [predictions, setPredictions] = useState<number[]>([]); // Store predictions for the next 6 time units
  const [inputMethod, setInputMethod] = useState<"csv" | "manual">("csv");
  const [numDataPoints, setNumDataPoints] = useState<number>(0);
  const [manualData, setManualData] = useState<number[]>([]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedHistoricalData = localStorage.getItem("historicalData");
    const savedManualData = localStorage.getItem("manualData");

    if (savedHistoricalData) {
      setHistoricalData(JSON.parse(savedHistoricalData));
    }
    if (savedManualData) {
      setManualData(JSON.parse(savedManualData));
      setNumDataPoints(JSON.parse(savedManualData).length);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("historicalData", JSON.stringify(historicalData));
  }, [historicalData]);

  useEffect(() => {
    localStorage.setItem("manualData", JSON.stringify(manualData));
  }, [manualData]);

  // Clear excess manual data when reducing the number of data points
  useEffect(() => {
    if (manualData.length > numDataPoints) {
      setManualData(manualData.slice(0, numDataPoints));
    }
  }, [numDataPoints]);

  // Predict sales using linear regression
  const predictSales = (data: number[]): number[] => {
    const n = data.length;
    const x = data.map((_, index) => index + 1); // Time periods (1, 2, 3, ...)
    const y = data; // Sales data

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.map((xi, i) => xi * y[i]).reduce((a, b) => a + b, 0);
    const sumX2 = x.map((xi) => xi * xi).reduce((a, b) => a + b, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Predict the next 6 time units
    const nextPredictions = Array.from({ length: 6 }, (_, i) => {
      const nextX = n + i + 1;
      return slope * nextX + intercept;
    });

    return nextPredictions;
  };

  // Handle prediction
  const handlePredictSales = () => {
    const data = inputMethod === "csv" ? historicalData : manualData;
    const nextPredictions = predictSales(data);
    setPredictions(nextPredictions);
  };

  // Handle CSV input change
  const handleCsvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value.split(",").map(Number);
    setHistoricalData(values);
  };

  // Handle manual data input change
  const handleManualDataChange = (index: number, value: string) => {
    const newData = [...manualData];
    newData[index] = parseFloat(value) || 0; // Default to 0 if input is invalid
    setManualData(newData);
  };

  // Render manual data input fields
  const renderManualInputFields = () => {
    return Array.from({ length: numDataPoints }, (_, index) => (
      <Grid item xs={6} sm={4} md={3} key={index}>
        <TextField
          label={`Data Point ${index + 1}`}
          type="number"
          fullWidth
          value={manualData[index] || ""}
          onChange={(e) => handleManualDataChange(index, e.target.value)}
          inputProps={{ disableScroll: true }} // Disable scroll/arrows
        />
      </Grid>
    ));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Sales Prediction Tool
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Input Method Toggle */}
          <Grid item xs={12}>
            <ToggleButtonGroup
              value={inputMethod}
              exclusive
              onChange={(_, newMethod) => setInputMethod(newMethod)}
              aria-label="input method"
            >
              <ToggleButton value="csv" aria-label="csv">
                CSV Input
              </ToggleButton>
              <ToggleButton value="manual" aria-label="manual">
                Manual Input
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          {/* CSV Input */}
          {inputMethod === "csv" && (
            <Grid item xs={12}>
              <TextField
                label="Historical Sales Data (comma-separated)"
                fullWidth
                value={historicalData.join(",")}
                onChange={handleCsvChange}
              />
            </Grid>
          )}

          {/* Manual Input */}
          {inputMethod === "manual" && (
            <>
              <Grid item xs={12}>
                <TextField
                  label="Number of Data Points"
                  type="number"
                  fullWidth
                  value={numDataPoints}
                  onChange={(e) =>
                    setNumDataPoints(parseInt(e.target.value, 10))
                  }
                  inputProps={{ min: 0 }}
                />
              </Grid>
              {numDataPoints > 0 && (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {renderManualInputFields()}
                </Grid>
              )}
            </>
          )}

          {/* Predict Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePredictSales}
              fullWidth
            >
              Predict Future Sales
            </Button>
          </Grid>

          {/* Display Predictions */}
          {predictions.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                Predicted Sales for the Next 6 Time Units:
              </Typography>
              <Grid container spacing={2}>
                {predictions.map((prediction, index) => (
                  <Grid item xs={4} sm={4} md={4} key={index}>
                    <Typography variant="body1">
                      Time Unit {index + 1}: {prediction.toFixed(2)}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default SalesPredictionTool;
