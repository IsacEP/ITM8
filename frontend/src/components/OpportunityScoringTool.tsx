import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, TextField, Button } from "@mui/material";

const OpportunityScoringTool: React.FC = () => {
  // State for input values
  const [budget, setBudget] = useState<number>(
    Number(localStorage.getItem("budget")) || 0
  );
  const [likelihood, setLikelihood] = useState<number>(
    Number(localStorage.getItem("likelihood")) || 0
  );
  const [revenue, setRevenue] = useState<number>(
    Number(localStorage.getItem("revenue")) || 0
  );
  const [time, setTime] = useState<number>(
    Number(localStorage.getItem("time")) || 0
  );

  // State for weights
  const [budgetWeight, setBudgetWeight] = useState<number>(
    Number(localStorage.getItem("budgetWeight")) || 0
  );
  const [likelihoodWeight, setLikelihoodWeight] = useState<number>(
    Number(localStorage.getItem("likelihoodWeight")) || 0
  );
  const [revenueWeight, setRevenueWeight] = useState<number>(
    Number(localStorage.getItem("revenueWeight")) || 0
  );
  const [timeWeight, setTimeWeight] = useState<number>(
    Number(localStorage.getItem("timeWeight")) || 0
  );

  // State for calculated score
  const [score, setScore] = useState<number | null>(null);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("budget", String(budget));
    localStorage.setItem("likelihood", String(likelihood));
    localStorage.setItem("revenue", String(revenue));
    localStorage.setItem("time", String(time));
    localStorage.setItem("budgetWeight", String(budgetWeight));
    localStorage.setItem("likelihoodWeight", String(likelihoodWeight));
    localStorage.setItem("revenueWeight", String(revenueWeight));
    localStorage.setItem("timeWeight", String(timeWeight));
  }, [
    budget,
    likelihood,
    revenue,
    time,
    budgetWeight,
    likelihoodWeight,
    revenueWeight,
    timeWeight,
  ]);

  // Format numbers with commas
  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  // Handle budget input change
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty input temporarily
    if (value === "") {
      setBudget(0);
      return;
    }

    const parsedValue = parseFloat(value.replace(/,/g, "")); // Remove commas for parsing
    setBudget(isNaN(parsedValue) ? 0 : parsedValue);
  };

  // Handle revenue input change
  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty input temporarily
    if (value === "") {
      setRevenue(0);
      return;
    }

    const parsedValue = parseFloat(value.replace(/,/g, "")); // Remove commas for parsing
    setRevenue(isNaN(parsedValue) ? 0 : parsedValue);
  };

  // Handle likelihood input change (0-100%)
  const handleLikelihoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty input temporarily
    if (value === "") {
      setLikelihood(0);
      return;
    }

    const parsedValue = parseFloat(value);

    // Ensure the value is within 0-100
    if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100) {
      setLikelihood(parsedValue / 100); // Convert percentage to 0-1
    }
  };

  // Handle time input change
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow empty input temporarily
    if (value === "") {
      setTime(0);
      return;
    }

    const parsedValue = parseFloat(value);
    setTime(isNaN(parsedValue) ? 0 : parsedValue);
  };

  // Calculate the opportunity score
  const calculateScore = () => {
    const normalizedRevenue = revenue / 10000;

    const normalizedLikelihood = likelihood * 10;

    const normalizedTime = time === 0 ? 0 : (1 / time) * 1000;

    const calculatedScore =
      normalizedRevenue * revenueWeight +
      normalizedLikelihood * likelihoodWeight +
      normalizedTime * timeWeight;

    setScore(calculatedScore);
  };

  return (
    <Box width="100%" sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Opportunity Scoring Tool
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Typography for Weight Instructions */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 1, fontSize: "16px" }}>
              The sum of weights should equal 1
            </Typography>
          </Grid>

          {/* Weight Inputs */}
          <Grid item xs={2.5} sm={2.5}>
            <TextField
              label="Budget Weight"
              type="number"
              fullWidth
              value={budgetWeight || ""} // Allow empty input
              onChange={(e) => setBudgetWeight(parseFloat(e.target.value))}
              inputProps={{ step: "any", disableScroll: true }} // Disable scroll/arrows
            />
          </Grid>
          <Grid item xs={2.5} sm={2.5}>
            <TextField
              label="Likelihood Weight"
              type="number"
              fullWidth
              value={likelihoodWeight || ""} // Allow empty input
              onChange={(e) => setLikelihoodWeight(parseFloat(e.target.value))}
              inputProps={{ step: "any", disableScroll: true }} // Disable scroll/arrows
            />
          </Grid>
          <Grid item xs={2.5} sm={2.5}>
            <TextField
              label="Revenue Weight"
              type="number"
              fullWidth
              value={revenueWeight || ""} // Allow empty input
              onChange={(e) => setRevenueWeight(parseFloat(e.target.value))}
              inputProps={{ step: "any", disableScroll: true }} // Disable scroll/arrows
            />
          </Grid>
          <Grid item xs={2.5} sm={2.5}>
            <TextField
              label="Time Weight"
              type="number"
              fullWidth
              value={timeWeight || ""} // Allow empty input
              onChange={(e) => setTimeWeight(parseFloat(e.target.value))}
              inputProps={{ step: "any", disableScroll: true }} // Disable scroll/arrows
            />
          </Grid>

          {/* Input Fields */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Budget"
              fullWidth
              value={budget === 0 ? "" : formatNumber(budget)} // Allow empty input
              onChange={handleBudgetChange}
              inputProps={{ disableScroll: true }} // Disable scroll
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Likelihood (0-100%)"
              type="number"
              fullWidth
              value={likelihood * 100 || ""} // Allow empty input
              onChange={handleLikelihoodChange}
              inputProps={{ min: 0, max: 100, disableScroll: true }} // Disable scroll/arrows
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Revenue"
              fullWidth
              value={revenue === 0 ? "" : formatNumber(revenue)} // Allow empty input
              onChange={handleRevenueChange}
              inputProps={{ disableScroll: true }} // Disable scroll
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Time (in months)"
              type="number"
              fullWidth
              value={time || ""} // Allow empty input
              onChange={handleTimeChange}
              inputProps={{ disableScroll: true }} // Disable scroll/arrows
            />
          </Grid>

          {/* Calculate Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={calculateScore}
              fullWidth
            >
              Calculate Score
            </Button>
          </Grid>

          {/* Display Score */}
          {score !== null && (
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Opportunity Score: {score.toFixed(2)}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default OpportunityScoringTool;
