import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  TextField,
  Box,
} from "@mui/material";

const PipelinePage: React.FC = () => {
  /*
   * Currently using local storage for all data instead of the django backend
   * In a production environment we would create a new model, new routes,
   * and store all the data in the backend instead. But this works now.
   */
  const [budget, setBudget] = useState<number>(
    Number(localStorage.getItem("budget")) || 0
  );
  const [sellCycleLength, setSellCycleLength] = useState<number>(
    Number(localStorage.getItem("sellCycleLength")) || 0
  );
  const [avgOpportunitySize, setAvgOpportunitySize] = useState<number>(
    Number(localStorage.getItem("avgOpportunitySize")) || 0
  );
  const [monthsLeft, setMonthsLeft] = useState<number>(
    Number(localStorage.getItem("monthsLeft")) || 0
  );
  const [yearToDateAttainment, setYearToDateAttainment] = useState<number>(
    Number(localStorage.getItem("yearToDateAttainment")) || 0
  );
  const [identifyRevenue, setIdentifyRevenue] = useState<number>(
    Number(localStorage.getItem("identifyRevenue")) || 0
  );
  const [qualifyRevenue, setQualifyRevenue] = useState<number>(
    Number(localStorage.getItem("qualifyRevenue")) || 0
  );
  const [validateRevenue, setValidateRevenue] = useState<number>(
    Number(localStorage.getItem("validateRevenue")) || 0
  );
  const [proveRevenue, setProveRevenue] = useState<number>(
    Number(localStorage.getItem("proveRevenue")) || 0
  );
  const [presentRevenue, setPresentRevenue] = useState<number>(
    Number(localStorage.getItem("presentRevenue")) || 0
  );
  const [closeRevenue, setCloseRevenue] = useState<number>(
    Number(localStorage.getItem("closeRevenue")) || 0
  );

  // Save data to localStorage when inputs change
  useEffect(() => {
    localStorage.setItem("budget", String(budget));
    localStorage.setItem("sellCycleLength", String(sellCycleLength));
    localStorage.setItem("avgOpportunitySize", String(avgOpportunitySize));
    localStorage.setItem("monthsLeft", String(monthsLeft));
    localStorage.setItem("yearToDateAttainment", String(yearToDateAttainment));
    localStorage.setItem("identifyRevenue", String(identifyRevenue));
    localStorage.setItem("qualifyRevenue", String(qualifyRevenue));
    localStorage.setItem("validateRevenue", String(validateRevenue));
    localStorage.setItem("proveRevenue", String(proveRevenue));
    localStorage.setItem("presentRevenue", String(presentRevenue));
    localStorage.setItem("closeRevenue", String(closeRevenue));
  }, [
    budget,
    sellCycleLength,
    avgOpportunitySize,
    monthsLeft,
    yearToDateAttainment,
    identifyRevenue,
    qualifyRevenue,
    validateRevenue,
    proveRevenue,
    presentRevenue,
    closeRevenue,
  ]);

  const calculateYield = (revenue: number, percentage: number) =>
    revenue * (percentage / 100);

  const totalYield =
    calculateYield(identifyRevenue, 10) +
    calculateYield(qualifyRevenue, 25) +
    calculateYield(validateRevenue, 50) +
    calculateYield(proveRevenue, 75) +
    calculateYield(presentRevenue, 90) +
    calculateYield(closeRevenue, 100);

  const projectedYield = (totalYield / sellCycleLength) * monthsLeft;
  const gap = budget - projectedYield - yearToDateAttainment;
  const additionalLeads = (gap / avgOpportunitySize) * 10;

  return (
    <Box
      width="100%"
      sx={{
        pl: 3,
        pr: 3,
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        position: "relative",
        pt: 8,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#9900cc",
          position: "absolute", // Absolute positioning to place it above everything else
          top: 0, // Align it at the top of the Box
          left: "50%", // Horizontally center
          transform: "translateX(-50%)", // Correct centering by shifting half its width
          zIndex: 10, // Make sure the text stays on top of other content
        }}
      >
        ITM8 - Pipeline Volume Assessment Tool
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        display="flex"
        flexDirection="row"
      >
        {/* Inputs Section */}
        <Grid item xs={3}>
          <Paper elevation={3} sx={{ p: 2, pb: 5 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
              Pipeline Metrics
            </Typography>
            {[
              { label: "Budget (SEK)", value: budget, setValue: setBudget },
              {
                label: "Average Sell Cycle Length (months)",
                value: sellCycleLength,
                setValue: setSellCycleLength,
              },
              {
                label: "Average Size of Opportunities",
                value: avgOpportunitySize,
                setValue: setAvgOpportunitySize,
              },
              {
                label: "Months Left in the Year",
                value: monthsLeft,
                setValue: setMonthsLeft,
              },
              {
                label: "Year-to-Date Attainment",
                value: yearToDateAttainment,
                setValue: setYearToDateAttainment,
              },
            ].map((input, index) => (
              <TextField
                key={index}
                fullWidth
                label={input.label}
                type="number"
                value={input.value || ""}
                onChange={(e) => input.setValue(Number(e.target.value))}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  step: 1,
                }}
                sx={{ mb: 2 }}
              />
            ))}
          </Paper>
        </Grid>

        {/* Step Completed Section */}
        <Grid item xs={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Revenue in Pipeline Sections
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                {[
                  {
                    label: "IDENTIFY",
                    value: identifyRevenue,
                    setValue: setIdentifyRevenue,
                    percentage: 10,
                  },
                  {
                    label: "QUALIFY",
                    value: qualifyRevenue,
                    setValue: setQualifyRevenue,
                    percentage: 25,
                  },
                  {
                    label: "VALIDATE",
                    value: validateRevenue,
                    setValue: setValidateRevenue,
                    percentage: 50,
                  },
                ].map((step, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">{step.label}</Typography>
                    <TextField
                      fullWidth
                      label="Revenue"
                      type="number"
                      value={step.value || ""}
                      onChange={(e) => step.setValue(Number(e.target.value))}
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        step: 1,
                      }}
                    />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Yield:{" "}
                      {calculateYield(
                        step.value,
                        step.percentage
                      ).toLocaleString()}{" "}
                      SEK ({step.percentage}%)
                    </Typography>
                  </Box>
                ))}
              </Grid>
              <Grid item xs={4}>
                {[
                  {
                    label: "PROVE",
                    value: proveRevenue,
                    setValue: setProveRevenue,
                    percentage: 75,
                  },
                  {
                    label: "PRESENT",
                    value: presentRevenue,
                    setValue: setPresentRevenue,
                    percentage: 90,
                  },
                  {
                    label: "CLOSE",
                    value: closeRevenue,
                    setValue: setCloseRevenue,
                    percentage: 100,
                  },
                ].map((step, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">{step.label}</Typography>
                    <TextField
                      fullWidth
                      label="Revenue"
                      type="number"
                      value={step.value || ""}
                      onChange={(e) => step.setValue(Number(e.target.value))}
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        step: 1,
                      }}
                    />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Yield:{" "}
                      {calculateYield(
                        step.value,
                        step.percentage
                      ).toLocaleString()}{" "}
                      SEK ({step.percentage}%)
                    </Typography>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Results Section */}
        <Grid item xs={11}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Results
            </Typography>
            {[
              {
                label: "Total Yield in the Pipeline",
                value: totalYield,
                unit: "SEK",
              },
              {
                label: "Projected Yield for the Year",
                value: projectedYield,
                unit: "SEK",
              },
              { label: "Gap", value: gap, unit: "SEK" },
              {
                label: "Additional Leads Required to Close the Gap",
                value: Math.ceil(additionalLeads),
                unit: "PCS",
              },
            ].map((result, index) => (
              <Card key={index} sx={{ mb: 1, p: 1, height: "55px" }}>
                <CardContent sx={{ p: 1 }}>
                  <Typography variant="subtitle2">{result.label}</Typography>
                  <Typography variant="h6">
                    {result.value.toLocaleString()} {result.unit}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PipelinePage;
