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
import PageLayout from "../components/PageLayout";

const formatNumber = (num: number) => {
  return num.toLocaleString("en-US").replace(/,/g, " ");
};

const PipelinePage: React.FC = () => {
  // State initialization from localStorage
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

  const projectedYield =
    sellCycleLength !== 0 ? (totalYield / sellCycleLength) * monthsLeft : 0;
  const gap = budget - projectedYield - yearToDateAttainment;
  const additionalLeads =
    avgOpportunitySize !== 0 ? (gap / avgOpportunitySize) * 10 : 0;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: (value: number) => void
  ) => {
    const rawValue = event.target.value.replace(/\s/g, "");
    const numericValue = Number(rawValue) || 0;
    setValue(numericValue);
  };

  return (
    <PageLayout title="Pipeline Volume Assessment Tool">
      <Box
        sx={{
          pl: 4,
          pr: 4,
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
          position: "relative",
        }}
      >
        <Grid
          container
          spacing={4}
          justifyContent="center"
          display="flex"
          flexDirection="row"
        >
          {/* Inputs Section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, pb: 6 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
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
                  type="text"
                  value={input.value ? formatNumber(input.value) : ""}
                  onChange={(e) => handleInputChange(e, input.setValue)}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    step: 1,
                  }}
                  sx={{ mb: 3, fontSize: "1.2rem" }}
                />
              ))}
            </Paper>
          </Grid>

          {/* Step Completed Section */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Revenue in Pipeline Sections
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
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
                    <Box key={index} sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontSize: "1.1rem" }}
                      >
                        {step.label}
                      </Typography>
                      <TextField
                        fullWidth
                        label="Revenue"
                        type="text"
                        value={step.value ? formatNumber(step.value) : ""}
                        onChange={(e) => handleInputChange(e, step.setValue)}
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          step: 1,
                        }}
                        sx={{ mb: 1, fontSize: "1.1rem" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ mt: 1, fontSize: "1.1rem" }}
                      >
                        Yield:{" "}
                        {calculateYield(step.value, step.percentage)
                          .toLocaleString("en-US")
                          .replace(/,/g, " ")}{" "}
                        SEK ({step.percentage}%)
                      </Typography>
                    </Box>
                  ))}
                </Grid>
                <Grid item xs={12} md={4}>
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
                    <Box key={index} sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontSize: "1.1rem" }}
                      >
                        {step.label}
                      </Typography>
                      <TextField
                        fullWidth
                        label="Revenue"
                        type="text"
                        value={step.value ? formatNumber(step.value) : ""}
                        onChange={(e) => handleInputChange(e, step.setValue)}
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          step: 1,
                        }}
                        sx={{ mb: 1, fontSize: "1.1rem" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ mt: 1, fontSize: "1.1rem" }}
                      >
                        Yield:{" "}
                        {calculateYield(step.value, step.percentage)
                          .toLocaleString("en-US")
                          .replace(/,/g, " ")}{" "}
                        SEK ({step.percentage}%)
                      </Typography>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Results Section */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
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
                <Card key={index} sx={{ mb: 2, p: 2, minHeight: "70px" }}>
                  <CardContent sx={{ p: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontSize: "1.1rem" }}>
                      {result.label}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: "" }}>
                      {result.value.toLocaleString("en-US").replace(/,/g, " ")}{" "}
                      {result.unit}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </PageLayout>
  );
};

export default PipelinePage;
