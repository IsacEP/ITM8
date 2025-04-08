import React, { useState, useEffect } from "react";
import { TextField, Typography, Button } from "@mui/material";
import {
  getPipelines,
  getPipeline,
  createPipeline,
  updatePipeline,
} from "../../services/api";
import "./PipelinePage.css";

const formatNumber = (num: number) => {
  return num.toLocaleString("en-US").replace(/,/g, " ");
};

const PipelinePage: React.FC = () => {
  // --- State for Pipeline Fields ---
  const [budget, setBudget] = useState<number>(0);
  const [sellCycleLength, setSellCycleLength] = useState<number>(0);
  const [avgOpportunitySize, setAvgOpportunitySize] = useState<number>(0);
  const [monthsLeft, setMonthsLeft] = useState<number>(0);
  const [yearToDateAttainment, setYearToDateAttainment] = useState<number>(0);
  const [identifyRevenue, setIdentifyRevenue] = useState<number>(0);
  const [qualifyRevenue, setQualifyRevenue] = useState<number>(0);
  const [validateRevenue, setValidateRevenue] = useState<number>(0);
  const [proveRevenue, setProveRevenue] = useState<number>(0);
  const [presentRevenue, setPresentRevenue] = useState<number>(0);
  const [closeRevenue, setCloseRevenue] = useState<number>(0);

  // --- Pipeline Dropdown States ---
  const [pipelines, setPipelines] = useState<any[]>([]);
  const [selectedPipelineId, setSelectedPipelineId] = useState<number | "new">(
    "new"
  );
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  // --- Modal for New Pipeline Name ---
  const [showNameModal, setShowNameModal] = useState<boolean>(false);
  const [newPipelineName, setNewPipelineName] = useState<string>("");

  // --- Toast Notification States ---
  const [toastMessage, setToastMessage] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  // Get token from localStorage (or via your AuthContext)
  const token = localStorage.getItem("token") || "";

  // --- Fetch pipeline list on mount ---
  useEffect(() => {
    const fetchPipelines = async () => {
      if (token) {
        try {
          const data = await getPipelines(token);
          setPipelines(data);
        } catch (error) {
          console.error("Error fetching pipelines:", error);
        }
      }
    };
    fetchPipelines();
  }, [token]);

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

  // --- Input Change Handler ---
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: (value: number) => void
  ) => {
    const rawValue = event.target.value.replace(/\s/g, "");
    const numericValue = Number(rawValue) || 0;
    setValue(numericValue);
  };

  // --- Pipeline Metrics & Steps Config ---
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

  // --- Dropdown Handlers ---
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handlePipelineSelectChange = (value: number | "new") => {
    setSelectedPipelineId(value);
    setDropdownOpen(false);
  };

  const handleFetchPipeline = async () => {
    if (selectedPipelineId !== "new") {
      try {
        const data = await getPipeline(Number(selectedPipelineId), token);
        setBudget(Number(data.budget));
        setSellCycleLength(Number(data.sellCycleLength));
        setAvgOpportunitySize(Number(data.avgOpportunitySize));
        setMonthsLeft(Number(data.monthsLeft));
        setYearToDateAttainment(Number(data.yearToDateAttainment));
        setIdentifyRevenue(Number(data.identifyRevenue));
        setQualifyRevenue(Number(data.qualifyRevenue));
        setValidateRevenue(Number(data.validateRevenue));
        setProveRevenue(Number(data.proveRevenue));
        setPresentRevenue(Number(data.presentRevenue));
        setCloseRevenue(Number(data.closeRevenue));
      } catch (error) {
        console.error("Error fetching pipeline:", error);
      }
    }
  };

  // --- Toast Handler ---
  const showToastMessage = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // --- Save Handler ---
  const handleSavePipeline = async () => {
    const payload = {
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
    };

    try {
      if (selectedPipelineId === "new") {
        // Instead of window.prompt(), open our modal for pipeline name.
        setShowNameModal(true);
        return;
      } else {
        await updatePipeline(Number(selectedPipelineId), payload, token);
        const updatedPipelines = await getPipelines(token);
        setPipelines(updatedPipelines);
        showToastMessage("Pipeline updated successfully!");
      }
    } catch (error: any) {
      console.error(
        "Error saving pipeline:",
        error.response ? error.response.data : error
      );
      showToastMessage("Error saving pipeline. Please try again.");
    }
  };

  // --- Modal Save Handler ---
  const handleModalSave = async () => {
    if (!newPipelineName) return;
    const payload = {
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
    };
    const newPayload = { name: newPipelineName, ...payload };
    try {
      console.log("Creating new pipeline with payload:", newPayload);
      const newPipeline = await createPipeline(newPayload, token);
      const updatedPipelines = await getPipelines(token);
      setPipelines(updatedPipelines);
      setSelectedPipelineId(newPipeline.id);
      showToastMessage("Pipeline created successfully!");
      setShowNameModal(false);
      setNewPipelineName("");
    } catch (error: any) {
      console.error(
        "Error saving pipeline:",
        error.response ? error.response.data : error
      );
      showToastMessage("Error saving pipeline. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Custom Dropdown */}
        <div className="mb-6 flex items-center space-x-4">
          <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown}
              className="inline-flex justify-between w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              {selectedPipelineId === "new"
                ? "New Pipeline"
                : pipelines.find((p) => p.id === selectedPipelineId)?.name ||
                  "Select Pipeline"}
              <svg
                className="ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <div
                    onClick={() => handlePipelineSelectChange("new")}
                    className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    New Pipeline
                  </div>
                  {pipelines.map((pipeline) => (
                    <div
                      key={pipeline.id}
                      onClick={() => handlePipelineSelectChange(pipeline.id)}
                      className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {pipeline.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchPipeline}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
          >
            Fetch
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSavePipeline}
            className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md"
          >
            Save
          </Button>
        </div>

        {/* Pipeline Metrics & Revenue Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pipeline Metrics */}
          <div className="bg-white border border-indigo-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <Typography
              variant="h5"
              className="text-indigo-700 font-semibold mb-4 text-lg"
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
                  className="bg-white"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
                />
              ))}
            </div>
          </div>

          {/* Revenue in Pipeline Sections */}
          <div className="md:col-span-2 bg-white border border-indigo-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <Typography
              variant="h5"
              className="text-indigo-700 font-semibold mb-4 text-lg"
            >
              Revenue in Pipeline Sections
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
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
                        "& .MuiOutlinedInput-root": { borderRadius: "8px" },
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
              {/* Right column */}
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
                        "& .MuiOutlinedInput-root": { borderRadius: "8px" },
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
        <div className="mt-6 bg-white border border-indigo-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <Typography
            variant="h5"
            className="text-indigo-700 font-semibold mb-4 text-lg"
          >
            Results
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {resultsList.map((result, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-md p-4 border border-indigo-100 hover:border-indigo-300 transition-colors flex flex-col justify-center"
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

      {/* Toast Popup */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
          {toastMessage}
        </div>
      )}

      {/* Modal for New Pipeline Name */}
      {showNameModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Tinted background overlay */}
          <div className="absolute inset-0 bg-gray-200 opacity-30"></div>
          {/* Modal Content */}
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-1/3 border border-gray-300">
            <h3 className="text-xl font-semibold mb-4">Enter Pipeline Name</h3>
            <input
              type="text"
              value={newPipelineName}
              onChange={(e) => setNewPipelineName(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="New Pipeline"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowNameModal(false);
                  setNewPipelineName("");
                }}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PipelinePage;
