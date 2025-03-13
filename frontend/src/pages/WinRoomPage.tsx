import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  Button,
  Modal,
  Paper,
  Backdrop,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import numeral from "numeral";
import MiniRowersChart from "../components/MiniRowersChart";
import "./WinRoomPage.css"; // Custom CSS if needed

// Types
type Activity = {
  description: string;
  deadline: string;
};

type Review = {
  description: string;
  responsible: string;
  deadline: string;
  budget: number;
  totalPipelineValue: number;
  closedValue: number;
  opportunityGap: number;
  pipelineGap: number;
  rowersValues: number[];
  activities: Activity[];
};

// Default object
const defaultReview: Review = {
  description: "",
  responsible: "",
  deadline: "",
  budget: 0,
  totalPipelineValue: 0,
  closedValue: 0,
  opportunityGap: 0,
  pipelineGap: 0,
  rowersValues: Array(6).fill(0),
  activities: [],
};

// ROWERS data with colors for the modal heading
const rowersData = [
  {
    letter: "R",
    title: "Roadblock",
    color: "#6200ea", // Purple
    description:
      "How well do you understand the customer's pain and obstacles?",
    steps: [
      "1: No clear pain or critical issue identified.",
      "2: A minor issue is identified.",
      "3: A problem exists, but not clearly articulated.",
      "4: A clear and significant pain is recognized.",
      "5: A well-defined and urgent problem exists.",
    ],
  },
  {
    letter: "O",
    title: "Ownership",
    color: "#FF9800", // Orange
    description: "Who in the customer's organization is responsible?",
    steps: [
      "1: No clear owner of the problem.",
      "2: Ownership is unclear or split.",
      "3: A stakeholder owns the problem with limited authority.",
      "4: A strong champion acknowledges the problem.",
      "5: A decision-maker is actively driving the decision.",
    ],
  },
  {
    letter: "W",
    title: "Win Likelihood",
    color: "#4CAF50", // Green
    description: "Assessment of how likely you are to win the deal.",
    steps: [
      "1: Very low likelihood.",
      "2: Low likelihood.",
      "3: Moderate likelihood.",
      "4: High likelihood.",
      "5: Very high likelihood.",
    ],
  },
  {
    letter: "E",
    title: "Economic Value",
    color: "#FFC107", // Amber
    description: "How compelling is the economic case for your solution?",
    steps: [
      "1: Economic value is unclear.",
      "2: Value may be provided, but not concrete.",
      "3: Economic value is somewhat understood.",
      "4: Financial impact is well-articulated.",
      "5: Economic value is compelling.",
    ],
  },
  {
    letter: "R",
    title: "Risk",
    color: "#F44336", // Red
    description: "Assessment of how well risks are managed.",
    steps: [
      "1: Significant risks exist.",
      "2: Several risks exist without a clear plan.",
      "3: Moderate risks with some mitigation.",
      "4: Low risks identified and addressed.",
      "5: Minimal or no risks.",
    ],
  },
  {
    letter: "S",
    title: "Stakeholders",
    color: "#2196F3", // Blue
    description: "Evaluation of engagement with key stakeholders.",
    steps: [
      "1: No engagement with key stakeholders.",
      "2: Limited engagement.",
      "3: Partial engagement.",
      "4: Strong engagement with most stakeholders.",
      "5: Full engagement with all key stakeholders.",
    ],
  },
];

const WinRoomPage: React.FC = () => {
  // Load or initialize reviews
  const loadReviews = (): Review[] => {
    try {
      const savedData = localStorage.getItem("reviews");
      return savedData ? JSON.parse(savedData) : Array(3).fill(defaultReview);
    } catch (error) {
      console.error("Error loading reviews:", error);
      return [defaultReview, defaultReview, defaultReview];
    }
  };

  const [reviews, setReviews] = useState<Review[]>(loadReviews());
  const [activityInputs, setActivityInputs] = useState(
    Array(3).fill({ description: "", deadline: "" })
  );

  // Modal states
  const [rowersModalOpen, setRowersModalOpen] = useState(false);
  const [selectedRowerIndex, setSelectedRowerIndex] = useState<number | null>(
    null
  );
  const [currentReviewIndex, setCurrentReviewIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  // Generic field handler
  const handleChange = (index: number, field: keyof Review, value: any) => {
    const updatedReviews = [...reviews];
    updatedReviews[index] = { ...updatedReviews[index], [field]: value };
    setReviews(updatedReviews);
  };

  // Update a ROWERS value
  const handleRowersChange = (
    reviewIndex: number,
    rowerIndex: number,
    value: number
  ) => {
    const updatedReviews = [...reviews];
    const updatedRowers = [...updatedReviews[reviewIndex].rowersValues];
    updatedRowers[rowerIndex] = value;
    updatedReviews[reviewIndex] = {
      ...updatedReviews[reviewIndex],
      rowersValues: updatedRowers,
    };
    setReviews(updatedReviews);
  };

  // Modal logic
  const openRowersModal = (reviewIndex: number, rowerIndex: number) => {
    setCurrentReviewIndex(reviewIndex);
    setSelectedRowerIndex(rowerIndex);
    setRowersModalOpen(true);
  };

  const closeRowersModal = () => {
    setRowersModalOpen(false);
    setSelectedRowerIndex(null);
    setCurrentReviewIndex(null);
  };

  // On selecting a value in the modal
  const handleSelectRowersValue = (value: number) => {
    if (currentReviewIndex !== null && selectedRowerIndex !== null) {
      handleRowersChange(currentReviewIndex, selectedRowerIndex, value);
    }
    closeRowersModal();
  };

  // Activity input changes
  const handleActivityInputChange = (
    index: number,
    field: keyof Activity,
    value: string
  ) => {
    const updatedInputs = [...activityInputs];
    updatedInputs[index] = { ...updatedInputs[index], [field]: value };
    setActivityInputs(updatedInputs);
  };

  const handleAddActivity = (reviewIndex: number) => {
    const newActivity = activityInputs[reviewIndex];
    if (newActivity.description.trim() === "") return;
    const updatedReviews = [...reviews];
    updatedReviews[reviewIndex].activities.push(newActivity);
    setReviews(updatedReviews);

    // Reset input fields for this review
    const updatedInputs = [...activityInputs];
    updatedInputs[reviewIndex] = { description: "", deadline: "" };
    setActivityInputs(updatedInputs);
  };

  const handleDeleteActivity = (reviewIndex: number, activityIndex: number) => {
    const updatedReviews = [...reviews];
    updatedReviews[reviewIndex].activities.splice(activityIndex, 1);
    setReviews(updatedReviews);
  };

  return (
    <Container maxWidth="lg" className="p-4">
      <Typography variant="h4" className="text-center my-8 font-bold">
        Win Room Board
      </Typography>
      <Grid container spacing={6}>
        {reviews.map((review, index) => (
          <Grid item xs={12} key={index}>
            <Card className="p-6 border-l-4 border-purple-600 shadow-lg">
              <CardContent>
                <Typography variant="h5" className="mb-4 font-semibold">
                  Review {index + 1}
                </Typography>

                <Grid container spacing={4}>
                  {/* Basic Info */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      multiline
                      rows={4}
                      variant="outlined"
                      value={review.description}
                      onChange={(e) =>
                        handleChange(index, "description", e.target.value)
                      }
                      className="bg-white"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Responsible"
                      variant="outlined"
                      value={review.responsible}
                      onChange={(e) =>
                        handleChange(index, "responsible", e.target.value)
                      }
                      className="bg-white"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Deadline"
                      type="date"
                      variant="outlined"
                      value={review.deadline}
                      onChange={(e) =>
                        handleChange(index, "deadline", e.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                      className="bg-white"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Budget (SEK)"
                      variant="outlined"
                      value={numeral(review.budget).format("0,0")}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "budget",
                          parseInt(e.target.value.replace(/\D/g, ""), 10) || 0
                        )
                      }
                      className="bg-white"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Total Pipeline Value (SEK)"
                      variant="outlined"
                      value={numeral(review.totalPipelineValue).format("0,0")}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "totalPipelineValue",
                          parseInt(e.target.value.replace(/\D/g, ""), 10) || 0
                        )
                      }
                      className="bg-white"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Closed Value (SEK)"
                      variant="outlined"
                      value={numeral(review.closedValue).format("0,0")}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "closedValue",
                          parseInt(e.target.value.replace(/\D/g, ""), 10) || 0
                        )
                      }
                      className="bg-white"
                    />
                  </Grid>

                  {/* ROWERS Analysis Section */}
                  <Grid item xs={12}>
                    <Typography variant="h6" className="mb-2 font-semibold">
                      ROWERS Analysis
                    </Typography>
                    {/* The row of clickable letters */}
                    <div className="flex space-x-4 justify-center mb-4">
                      {rowersData.map((rower, rowerIndex) => (
                        <div
                          key={rowerIndex}
                          className="cursor-pointer flex flex-col items-center"
                          onClick={() => openRowersModal(index, rowerIndex)}
                        >
                          <div
                            className="text-3xl font-bold"
                            style={{ color: rower.color }}
                          >
                            {rower.letter}
                          </div>
                          <div className="mt-1 text-sm">
                            Value: {review.rowersValues[rowerIndex]}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* The bar chart */}
                    <MiniRowersChart values={review.rowersValues} />
                  </Grid>

                  {/* Activity Section */}
                  <Grid item xs={12} className="mt-6">
                    <Typography variant="h6" className="font-semibold mb-2">
                      Activity
                    </Typography>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      {/* Activity Description */}
                      <TextField
                        label="Activity Description"
                        variant="outlined"
                        value={activityInputs[index].description}
                        onChange={(e) =>
                          handleActivityInputChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="bg-white flex-1"
                      />
                      {/* Deadline */}
                      <TextField
                        label="Deadline"
                        type="date"
                        variant="outlined"
                        value={activityInputs[index].deadline}
                        onChange={(e) =>
                          handleActivityInputChange(
                            index,
                            "deadline",
                            e.target.value
                          )
                        }
                        InputLabelProps={{ shrink: true }}
                        className="bg-white w-44"
                      />
                      {/* Add Button */}
                      <Button
                        variant="contained"
                        onClick={() => handleAddActivity(index)}
                        className="bg-[#6200ea] hover:bg-[#4b00b5] text-white px-4 py-2"
                      >
                        Add
                      </Button>
                    </div>
                    {review.activities.length > 0 && (
                      <div className="border-t pt-2 mt-2">
                        {review.activities.map((activity, actIndex) => (
                          <div
                            key={actIndex}
                            className="flex items-center py-1"
                          >
                            {/* Description (left), deadline (right), delete button */}
                            <span className="flex-1">
                              {activity.description}
                            </span>
                            <span className="text-sm text-gray-500 text-right w-32 mr-2">
                              {activity.deadline}
                            </span>
                            <IconButton
                              aria-label="delete"
                              size="small"
                              onClick={() =>
                                handleDeleteActivity(index, actIndex)
                              }
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </div>
                        ))}
                      </div>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for ROWERS Value Selection (no fade transition) */}
      <Modal
        open={rowersModalOpen}
        onClose={closeRowersModal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        {/* White Paper container in the center */}
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "70%", md: "50%" },
            maxWidth: "700px",
            p: 5,
            borderRadius: 4,
            boxShadow: 5,
            bgcolor: "white",
          }}
        >
          {selectedRowerIndex !== null && (
            <>
              {/* Letter + Title */}
              <Typography
                variant="h2"
                sx={{
                  color: rowersData[selectedRowerIndex].color,
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                {rowersData[selectedRowerIndex].letter}
              </Typography>
              <Typography variant="h5" sx={{ mb: 2 }}>
                {rowersData[selectedRowerIndex].title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                {rowersData[selectedRowerIndex].description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Select Value */}
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Select Value
              </Typography>
              <div className="flex justify-around mb-4">
                {[0, 1, 2, 3, 4, 5].map((val) => (
                  <Button
                    key={val}
                    variant="outlined"
                    onClick={() => handleSelectRowersValue(val)}
                  >
                    {val}
                  </Button>
                ))}
              </div>

              <Divider sx={{ my: 2 }} />

              {/* Guidelines */}
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Guidelines
              </Typography>
              <ul className="list-disc ml-5 text-sm space-y-1">
                {rowersData[selectedRowerIndex].steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </>
          )}
        </Paper>
      </Modal>
    </Container>
  );
};

export default WinRoomPage;
