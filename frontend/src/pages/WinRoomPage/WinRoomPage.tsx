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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import numeral from "numeral";
import MiniRowersChart from "../../components/WinRoom/MiniRowersChart";
import {
  getWinroomData,
  getWinroomItem,
  createWinroomData,
  updateWinroomData,
  deleteWinroomData,
} from "../../services/api";
import "./WinRoomPage.css";

// ----- Types -----
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

// Default review object
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

console.log(defaultReview);

// ROWERS data (for the modal)
const rowersData = [
  {
    letter: "R",
    title: "Roadblock",
    color: "#6200ea",
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
    color: "#FF9800",
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
    color: "#4CAF50",
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
    color: "#FFC107",
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
    color: "#F44336",
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
    color: "#2196F3",
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
  const getNewReview = (): Review => ({
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
  });

  // ----- State for Winroom Data -----
  const [reviews, setReviews] = useState<Review[]>([
    getNewReview(),
    getNewReview(),
    getNewReview(),
  ]);
  const [winroomId, setWinroomId] = useState<number | "new">("new");

  // ----- Dropdown for Salesmen -----
  const [winroomList, setWinroomList] = useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ----- Modal for New Salesman Name -----
  const [showNameModal, setShowNameModal] = useState(false);
  const [newWinroomName, setNewWinroomName] = useState("");

  // ----- Toast Notification State -----
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // ----- ROWERS Modal (for selecting a rowers value) -----
  const [rowersModalOpen, setRowersModalOpen] = useState(false);
  const [selectedRowerIndex, setSelectedRowerIndex] = useState<number | null>(
    null
  );
  const [currentReviewIndex, setCurrentReviewIndex] = useState<number | null>(
    null
  );

  // ----- Activity input state (one per review) -----
  const [activityInputs, setActivityInputs] = useState([
    { description: "", deadline: "" },
    { description: "", deadline: "" },
    { description: "", deadline: "" },
  ]);

  // ----- Delete Confirmation Modal State for Winroom -----
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const token = localStorage.getItem("token") || "";

  // ----- Fetch Winroom Records on Mount -----
  useEffect(() => {
    const fetchWinrooms = async () => {
      if (token) {
        try {
          const data = await getWinroomData(token);
          setWinroomList(data);
          if (data.length > 0) {
            // Select the first record by default
            setWinroomId(data[0].id);
            setReviews(
              data[0].reviews || [
                getNewReview(),
                getNewReview(),
                getNewReview(),
              ]
            );
          } else {
            setWinroomId("new");
            setReviews([getNewReview(), getNewReview(), getNewReview()]);
          }
        } catch (error) {
          console.error("Error fetching winroom data:", error);
          setWinroomId("new");
          setReviews([getNewReview(), getNewReview(), getNewReview()]);
        }
      }
    };
    fetchWinrooms();
  }, [token]);

  // ----- Toast Handler -----
  const showToastMessage = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // ----- Generic Review Field Handler -----
  const handleChange = (index: number, field: keyof Review, value: any) => {
    const updated = [...reviews];
    updated[index] = { ...updated[index], [field]: value };
    setReviews(updated);
  };

  // ----- ROWERS Handler -----
  const handleRowersChange = (
    reviewIndex: number,
    rowerIndex: number,
    value: number
  ) => {
    const updated = [...reviews];
    const updatedRowers = [...updated[reviewIndex].rowersValues];
    updatedRowers[rowerIndex] = value;
    updated[reviewIndex] = {
      ...updated[reviewIndex],
      rowersValues: updatedRowers,
    };
    setReviews(updated);
  };

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

  const handleSelectRowersValue = (value: number) => {
    if (currentReviewIndex !== null && selectedRowerIndex !== null) {
      handleRowersChange(currentReviewIndex, selectedRowerIndex, value);
    }
    closeRowersModal();
  };

  // ----- Activity Handlers -----
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
    const newAct = activityInputs[reviewIndex];
    if (newAct.description.trim() === "") return;
    const updated = [...reviews];
    updated[reviewIndex].activities.push(newAct);
    setReviews(updated);
    const updatedInputs = [...activityInputs];
    updatedInputs[reviewIndex] = { description: "", deadline: "" };
    setActivityInputs(updatedInputs);
  };

  const handleDeleteActivity = (reviewIndex: number, activityIndex: number) => {
    const updated = [...reviews];
    updated[reviewIndex].activities.splice(activityIndex, 1);
    setReviews(updated);
  };

  // ----- Dropdown Handlers for Winroom Records -----
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleWinroomSelectChange = (value: number | "new") => {
    setDropdownOpen(false);
    if (value !== "new") {
      getWinroomItem(Number(value), token)
        .then((data) => {
          setWinroomId(data.id);
          setReviews(
            data.reviews || [getNewReview(), getNewReview(), getNewReview()]
          );
        })
        .catch((err) => console.error("Error fetching winroom item:", err));
    } else {
      setWinroomId("new");
      setReviews([getNewReview(), getNewReview(), getNewReview()]);
    }
  };

  // ----- Save Winroom Data Handler -----
  const handleSaveWinroom = async () => {
    const payload = { reviews };
    try {
      if (winroomId === "new") {
        // Instead of window.prompt(), open our modal to enter the name for the new record.
        setShowNameModal(true);
        return;
      } else {
        await updateWinroomData(Number(winroomId), payload, token);
        showToastMessage("Winroom data updated successfully!");
      }
    } catch (error: any) {
      console.error(
        "Error saving winroom data:",
        error.response ? error.response.data : error
      );
      showToastMessage("Error saving winroom data. Please try again.");
    }
  };

  // ----- Modal Save Handler for New Winroom Record -----
  const handleModalSave = async () => {
    if (!newWinroomName) return;
    const payload = { reviews };
    const newPayload = { name: newWinroomName, ...payload };
    try {
      console.log("Creating new winroom with payload:", newPayload);
      const newWinroom = await createWinroomData(newPayload, token);
      setWinroomId(newWinroom.id);
      showToastMessage("Winroom data created successfully!");
      setShowNameModal(false);
      setNewWinroomName("");
      // Refresh winroom list if needed
      const list = await getWinroomData(token);
      setWinroomList(list);
    } catch (error: any) {
      console.error(
        "Error saving winroom data:",
        error.response ? error.response.data : error
      );
      showToastMessage("Error saving winroom data. Please try again.");
    }
  };

  // ----- Delete Winroom Handler & Confirmation -----
  const handleDeleteWinroom = async () => {
    if (winroomId !== "new") {
      try {
        await deleteWinroomData(Number(winroomId), token);
        const list = await getWinroomData(token);
        setWinroomList(list);
        if (list.length > 0) {
          setWinroomId(list[0].id);
          setReviews(
            list[0].reviews || [getNewReview(), getNewReview(), getNewReview()]
          );
        } else {
          setWinroomId("new");
          setReviews([getNewReview(), getNewReview(), getNewReview()]);
        }
        showToastMessage("Salesman deleted successfully!");
      } catch (error) {
        console.error("Error deleting winroom record:", error);
        showToastMessage("Error deleting salesman. Please try again.");
      }
    }
  };

  return (
    <Container>
      {/* Salesmen Dropdown */}
      <div className="mt-4 mb-6 flex items-center space-x-4">
        <div className="relative inline-block text-left">
          <button
            onClick={toggleDropdown}
            className="inline-flex justify-between w-56 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          >
            {winroomId === "new"
              ? "New Salesman"
              : winroomList.find((w) => w.id === winroomId)?.name ||
                "Select Salesman"}
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
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1">
                <div
                  onClick={() => handleWinroomSelectChange("new")}
                  className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  New Salesman
                </div>
                {winroomList.map((w) => (
                  <div
                    key={w.id}
                    onClick={() => handleWinroomSelectChange(w.id)}
                    className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {w.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Button
          variant="contained"
          onClick={handleSaveWinroom}
          sx={{
            bgcolor: "indigo.600",
            "&:hover": { bgcolor: "indigo.700" },
            px: 2,
            py: 1,
            borderRadius: "8px",
            fontSize: "0.875rem",
          }}
        >
          Save WinRoom
        </Button>
        {winroomId !== "new" && (
          <Button
            variant="contained"
            onClick={() => setShowDeleteConfirm(true)}
            sx={{
              ml: 2,
              bgcolor: "transparent",
              border: "1px solid red",
              color: "red",
              "&:hover": { bgcolor: "red", color: "white" },
              px: 2,
              py: 1,
              borderRadius: "8px",
              fontSize: "0.875rem",
            }}
          >
            Delete WinRoom
          </Button>
        )}
      </div>

      {/* Winroom Reviews Section */}
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
                    <MiniRowersChart values={review.rowersValues} />
                  </Grid>

                  {/* Activity Section */}
                  <Grid item xs={12} className="mt-6">
                    <Typography variant="h6" className="font-semibold mb-2">
                      Activity
                    </Typography>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
                      <Button
                        variant="contained"
                        onClick={() => handleAddActivity(index)}
                        className="bg-[#6200ea] hover:bg-[#4b00b5] text-white px-4 py-2 rounded-md"
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

      {/* Toast Popup */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
          {toastMessage}
        </div>
      )}

      {/* Modal for ROWERS Value Selection */}
      <Modal
        open={rowersModalOpen}
        onClose={closeRowersModal}
        BackdropComponent={Backdrop}
        BackdropProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
      >
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

      {/* Modal for New Salesman Name */}
      {showNameModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Tinted overlay */}
          <div className="absolute inset-0 bg-gray-200 opacity-30"></div>
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-1/3 border border-gray-300">
            <h3 className="text-xl font-semibold mb-4">Enter Salesman Name</h3>
            <input
              type="text"
              value={newWinroomName}
              onChange={(e) => setNewWinroomName(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Salesman Name"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowNameModal(false);
                  setNewWinroomName("");
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this salesman record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteConfirm(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setShowDeleteConfirm(false);
              handleDeleteWinroom();
            }}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WinRoomPage;
