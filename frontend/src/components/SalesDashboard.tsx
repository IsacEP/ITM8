import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

type Rower = {
  description: string;
  responsible: string;
  deadline: string;
  rowersValues: number[];
};

const SalesDashboard: React.FC = () => {
  // Load form data from localStorage or use default values
  const loadFormData = () => {
    try {
      const savedData = localStorage.getItem("formData");
      return savedData
        ? JSON.parse(savedData)
        : {
            name: "",
            budget: "",
            totalPipelineValue: "",
            closedValue: "",
            opportunityGap: "",
            pipelineGap: "",
          };
    } catch (error) {
      console.error("Error loading form data from localStorage:", error);
      return {
        name: "",
        budget: "",
        totalPipelineValue: "",
        closedValue: "",
        opportunityGap: "",
        pipelineGap: "",
      };
    }
  };

  // Load rowers data from localStorage or use default values
  const loadRowersData = () => {
    try {
      const savedData = localStorage.getItem("rowersData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Ensure each rower has a valid `rowersValues` array
        return parsedData.map((rower: Rower) => ({
          ...rower,
          rowersValues: Array.isArray(rower.rowersValues)
            ? rower.rowersValues
            : Array(6).fill(0),
        }));
      }
      // Default data if localStorage is empty
      return [
        {
          description: "",
          responsible: "",
          deadline: "",
          rowersValues: Array(6).fill(0),
        },
        {
          description: "",
          responsible: "",
          deadline: "",
          rowersValues: Array(6).fill(0),
        },
        {
          description: "",
          responsible: "",
          deadline: "",
          rowersValues: Array(6).fill(0),
        },
      ];
    } catch (error) {
      console.error("Error loading rowers data from localStorage:", error);
      // Fallback to default data if parsing fails
      return [
        {
          description: "",
          responsible: "",
          deadline: "",
          rowersValues: Array(6).fill(0),
        },
        {
          description: "",
          responsible: "",
          deadline: "",
          rowersValues: Array(6).fill(0),
        },
        {
          description: "",
          responsible: "",
          deadline: "",
          rowersValues: Array(6).fill(0),
        },
      ];
    }
  };

  const [formData, setFormData] = useState(loadFormData());
  const [rowers, setRowers] = useState<Rower[]>(loadRowersData());

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("formData", JSON.stringify(formData));
    } catch (error) {
      console.error("Error saving form data to localStorage:", error);
    }
  }, [formData]);

  // Save rowers data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("rowersData", JSON.stringify(rowers));
    } catch (error) {
      console.error("Error saving rowers data to localStorage:", error);
    }
  }, [rowers]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRowerChange = (
    index: number,
    field: keyof Omit<Rower, "rowersValues">,
    value: string
  ) => {
    const updatedRowers = [...rowers];
    updatedRowers[index][field] = value;
    setRowers(updatedRowers);
  };

  const handleRowersValueChange = (
    rowerIndex: number,
    markIndex: number,
    value: number
  ) => {
    if (value < 0 || value > 5) return; // Ensure value is between 0 and 5
    const updatedRowers = [...rowers];
    updatedRowers[rowerIndex].rowersValues[markIndex] = value;
    setRowers(updatedRowers);
  };

  return (
    <Box
      width="100%"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowX: "hidden", // Prevent horizontal scrollbar
      }}
    >
      <Container maxWidth={false} sx={{ width: "100%", p: 0 }}>
        {" "}
        {/* Adjusted maxWidth and padding */}
        <Box sx={{ my: 4, width: "100%" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Win Room Board
          </Typography>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Budget (SEK)"
                  name="budget"
                  value={formData.budget}
                  onChange={handleFormChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Total Pipeline Value (SEK)"
                  name="totalPipelineValue"
                  value={formData.totalPipelineValue}
                  onChange={handleFormChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Closed Value (SEK)"
                  name="closedValue"
                  value={formData.closedValue}
                  onChange={handleFormChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Opportunity Gap (#)"
                  name="opportunityGap"
                  value={formData.opportunityGap}
                  onChange={handleFormChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Pipeline Gap (SEK)"
                  name="pipelineGap"
                  value={formData.pipelineGap}
                  onChange={handleFormChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>
        {rowers.map((rower, index) => (
          <Box key={index} sx={{ my: 4, width: "100%" }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Opportunity {index + 1}
            </Typography>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {["R", "O", "W", "E", "R", "S"].map((letter, markIndex) => (
                      <TextField
                        key={markIndex}
                        label={letter}
                        type="number"
                        inputProps={{ min: 0, max: 5 }}
                        value={rower.rowersValues?.[markIndex] || 0} // Fallback to 0 if undefined
                        onChange={
                          (e) =>
                            handleRowersValueChange(
                              index,
                              markIndex,
                              parseInt(e.target.value, 10)
                            ) // Added missing parenthesis here
                        }
                        sx={{
                          width: "100px",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "purple",
                            },
                            "&:hover fieldset": {
                              borderColor: "purple",
                            },
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={rower.description}
                    onChange={(e) =>
                      handleRowerChange(index, "description", e.target.value)
                    }
                    margin="normal"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Responsible"
                    value={rower.responsible}
                    onChange={(e) =>
                      handleRowerChange(index, "responsible", e.target.value)
                    }
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Deadline"
                    value={rower.deadline}
                    onChange={(e) =>
                      handleRowerChange(index, "deadline", e.target.value)
                    }
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default SalesDashboard;
