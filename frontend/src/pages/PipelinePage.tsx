import React, { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import { TextField, Typography } from "@mui/material";
import "./PipelinePage.css"; // We'll add custom overrides here

const formatNumber = (num: number) => {
  return num.toLocaleString("en-US").replace(/,/g, " ");
};

const PipelinePage: React.FC = () => {
  // --- State / LocalStorage ---
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

  // --- Calculations ---
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

  // --- Handler for numeric inputs (removes spaces) ---
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: (value: number) => void
  ) => {
    const rawValue = event.target.value.replace(/\s/g, "");
    const numericValue = Number(rawValue) || 0;
    setValue(numericValue);
  };

  // Pipeline Metrics config
  const pipelineMetricsFields = [
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
  ];

  // Pipeline Steps
  const pipelineStepsLeft = [
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
  ];
  const pipelineStepsRight = [
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
  ];

  // Results
  const resultsList = [
    { label: "Total Yield in the Pipeline", value: totalYield, unit: "SEK" },
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
  ];

  return (
    <PageLayout title="Pipeline Volume Assessment Tool">
      {/* Page background for subtle contrast */}
      <div className="bg-gray-50 min-h-screen py-8">
        {/* Container */}
        <div className="max-w-7xl mx-auto px-4">
          {/* Top section: Pipeline Metrics & Pipeline Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pipeline Metrics */}
            <div className="bg-white border border-[rgb(95,37,159)]/[0.1] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <Typography
                variant="h5"
                className="text-[rgb(95,37,159)] font-semibold mb-4 text-lg"
                sx={{ mb: 2 }}
              >
                Pipeline Metrics
              </Typography>
              <div className="flex flex-col gap-6">
                {pipelineMetricsFields.map((input, index) => (
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
                    // MUI + Tailwind synergy
                    className="bg-white"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Revenue in Pipeline Sections */}
            <div className="md:col-span-2 bg-white border border-[rgb(95,37,159)]/[0.1] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <Typography
                variant="h5"
                className="text-[rgb(95,37,159)] font-semibold mb-4 text-lg"
              >
                Revenue in Pipeline Sections
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column: IDENTIFY, QUALIFY, VALIDATE */}
                <div className="space-y-4">
                  {pipelineStepsLeft.map((step, index) => (
                    <div key={index}>
                      <Typography
                        variant="subtitle1"
                        className="text-gray-700 font-medium mb-1"
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
                        className="bg-white"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                          },
                        }}
                      />
                      <Typography
                        variant="body2"
                        className="text-gray-600 mt-1 text-sm"
                      >
                        Yield:{" "}
                        {calculateYield(step.value, step.percentage)
                          .toLocaleString("en-US")
                          .replace(/,/g, " ")}{" "}
                        SEK ({step.percentage}%)
                      </Typography>
                    </div>
                  ))}
                </div>
                {/* Right column: PROVE, PRESENT, CLOSE */}
                <div className="space-y-4">
                  {pipelineStepsRight.map((step, index) => (
                    <div key={index}>
                      <Typography
                        variant="subtitle1"
                        className="text-gray-700 font-medium mb-1"
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
                        className="bg-white"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                          },
                        }}
                      />
                      <Typography
                        variant="body2"
                        className="text-gray-600 mt-1 text-sm"
                      >
                        Yield:{" "}
                        {calculateYield(step.value, step.percentage)
                          .toLocaleString("en-US")
                          .replace(/,/g, " ")}{" "}
                        SEK ({step.percentage}%)
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="mt-6 bg-white border border-[rgb(95,37,159)]/[0.1] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <Typography
              variant="h5"
              className="text-[rgb(95,37,159)] font-semibold mb-4 text-lg"
            >
              Results
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {resultsList.map((result, index) => (
                <div
                  key={index}
                  className="
                    bg-gray-50 
                    rounded-md 
                    p-4 
                    border 
                    border-[rgb(95,37,159)]/[0.1]
                    hover:border-[rgb(95,37,159)]/[0.3]
                    transition-colors
                    flex 
                    flex-col 
                    justify-center
                  "
                >
                  <Typography
                    variant="subtitle2"
                    className="text-gray-500 mb-1 text-sm"
                  >
                    {result.label}
                  </Typography>
                  <Typography
                    variant="h6"
                    className="text-gray-800 font-semibold"
                  >
                    {result.value.toLocaleString("en-US").replace(/,/g, " ")}{" "}
                    {result.unit}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PipelinePage;
