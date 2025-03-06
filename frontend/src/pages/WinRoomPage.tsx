import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import numeral from "numeral";
import MiniRowersChart from "../components/MiniRowersChart";

type Opportunity = {
  description: string;
  responsible: string;
  deadline: string;
  budget: number;
  totalPipelineValue: number;
  closedValue: number;
  opportunityGap: number;
  pipelineGap: number;
  rowersValues: number[];
};

const WinRoomPage: React.FC = () => {
  // Load data from localStorage or set default values
  const loadOpportunities = (): Opportunity[] => {
    try {
      const savedData = localStorage.getItem("opportunities");
      return savedData
        ? JSON.parse(savedData)
        : Array(3).fill({
            description: "",
            responsible: "",
            deadline: "",
            budget: 0,
            totalPipelineValue: 0,
            closedValue: 0,
            opportunityGap: 0,
            pipelineGap: 0,
            rowersValues: Array(6).fill(0),
          });
    } catch (error) {
      console.error("Error loading opportunities:", error);
      return [];
    }
  };

  const [opportunities, setOpportunities] = useState<Opportunity[]>(
    loadOpportunities()
  );

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("opportunities", JSON.stringify(opportunities));
  }, [opportunities]);

  // Handle input change
  const handleChange = (
    index: number,
    field: keyof Opportunity,
    value: any
  ) => {
    const updatedOpportunities = [...opportunities];
    updatedOpportunities[index] = {
      ...updatedOpportunities[index],
      [field]: value,
    };
    setOpportunities(updatedOpportunities);
  };

  const handleRowersChange = (
    index: number,
    rowerIndex: number,
    value: number
  ) => {
    const updatedOpportunities = [...opportunities];
    const updatedRowers = [...updatedOpportunities[index].rowersValues];

    updatedRowers[rowerIndex] = value;
    updatedOpportunities[index] = {
      ...updatedOpportunities[index],
      rowersValues: updatedRowers,
    };

    setOpportunities(updatedOpportunities);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ textAlign: "center", my: 4 }}>
        Win Room Board
      </Typography>
      <Grid container spacing={3}>
        {opportunities.map((opp, index) => (
          <Grid item xs={12} key={index}>
            <Card sx={{ p: 3, borderLeft: "5px solid #6200ea" }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Opportunity {index + 1}
                </Typography>
                <Grid container spacing={2}>
                  {/* Description (Large Text Area) */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      multiline
                      rows={4}
                      value={opp.description}
                      onChange={(e) =>
                        handleChange(index, "description", e.target.value)
                      }
                    />
                  </Grid>

                  {/* Responsible & Deadline */}
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Responsible"
                      value={opp.responsible}
                      onChange={(e) =>
                        handleChange(index, "responsible", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Deadline"
                      type="date"
                      value={opp.deadline}
                      onChange={(e) =>
                        handleChange(index, "deadline", e.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  {/* Budget & Pipeline */}
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Budget (SEK)"
                      value={numeral(opp.budget).format("0,0")}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "budget",
                          parseInt(e.target.value.replace(/\D/g, ""), 10) || 0
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Total Pipeline Value (SEK)"
                      value={numeral(opp.totalPipelineValue).format("0,0")}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "totalPipelineValue",
                          parseInt(e.target.value.replace(/\D/g, ""), 10) || 0
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Closed Value (SEK)"
                      value={numeral(opp.closedValue).format("0,0")}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "closedValue",
                          parseInt(e.target.value.replace(/\D/g, ""), 10) || 0
                        )
                      }
                    />
                  </Grid>

                  {/* ROWERS Mini Chart */}
                  <Grid item xs={12}>
                    <MiniRowersChart
                      values={opp.rowersValues}
                      onChange={(rowerIndex, value) =>
                        handleRowersChange(index, rowerIndex, value)
                      }
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WinRoomPage;
