import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import StakeholderScatterChart from "../../components/StakeHolder/StakeholderScatterChart";
import {
  getStakeholderData,
  getStakeholderItem,
  createStakeholderData,
  updateStakeholderData,
  deleteStakeholderData,
} from "../../services/api";
import StakeholderMapModal from "../../components/StakeHolder/StakeholderMapModal";

interface StakeholderMap {
  id: number;
  name: string;
  stakeholders: any[];
}

const StakeHolderPage: React.FC = () => {
  const token = localStorage.getItem("token") || "";

  const [stakeholderMapList, setStakeholderMapList] = useState<
    StakeholderMap[]
  >([]);
  const [selectedMapId, setSelectedMapId] = useState<number | "new">("new");
  const [showDropdown, setShowDropdown] = useState(false);
  const [newMapName, setNewMapName] = useState("");
  const [stakeholders, setStakeholders] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchStakeholderMaps = async () => {
      if (token) {
        try {
          const data = await getStakeholderData(token);
          setStakeholderMapList(data);
          if (data.length > 0) {
            setSelectedMapId(data[0].id);
            const mapData = await getStakeholderItem(data[0].id, token);
            setStakeholders(mapData.stakeholders || []);
          }
        } catch (error) {
          console.error("Error fetching stakeholder maps:", error);
        }
      }
    };

    fetchStakeholderMaps();
  }, [token]);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleStakeholderMapSelectChange = async (value: number | "new") => {
    setShowDropdown(false);
    setSelectedMapId(value);
    if (value !== "new") {
      try {
        const data = await getStakeholderItem(Number(value), token);
        setStakeholders(data.stakeholders || []);
      } catch (error) {
        console.error("Error fetching stakeholder map:", error);
      }
    } else {
      setStakeholders([]);
    }
  };

  const handleSaveStakeholderMap = async () => {
    const payload = { stakeholders };

    try {
      if (selectedMapId === "new") {
        if (!newMapName) {
          setShowModal(true);
          return;
        }
        const newPayload = { name: newMapName, ...payload };
        const newMap = await createStakeholderData(newPayload, token);
        setSelectedMapId(newMap.id);
        const refreshedList = await getStakeholderData(token);
        setStakeholderMapList(refreshedList);
      } else {
        await updateStakeholderData(Number(selectedMapId), payload, token);
        const refreshedList = await getStakeholderData(token);
        setStakeholderMapList(refreshedList);
      }
    } catch (error) {
      console.error("Error saving stakeholder data:", error);
    }
  };

  // Delete handler moved to a confirmation popup flow
  const handleDeleteStakeholderMap = async () => {
    if (selectedMapId !== "new") {
      try {
        await deleteStakeholderData(Number(selectedMapId), token);
        const refreshedList = await getStakeholderData(token);
        setStakeholderMapList(refreshedList);

        if (refreshedList.length > 0) {
          setSelectedMapId(refreshedList[0].id);
          const mapData = await getStakeholderItem(refreshedList[0].id, token);
          setStakeholders(mapData.stakeholders || []);
        } else {
          setSelectedMapId("new");
          setStakeholders([]);
        }
      } catch (error) {
        console.error("Error deleting stakeholder map:", error);
      }
    }
  };

  const handleModalSave = async () => {
    if (!newMapName) return;
    try {
      const newPayload = { name: newMapName, stakeholders };
      const newMap = await createStakeholderData(newPayload, token);
      setSelectedMapId(newMap.id);
      const refreshedList = await getStakeholderData(token);
      setStakeholderMapList(refreshedList);
      setShowModal(false);
      setNewMapName("");
    } catch (error) {
      console.error("Error creating new stakeholder map:", error);
    }
  };

  return (
    <Box className="bg-gray-50 min-h-screen py-8">
      <Container maxWidth="md">
        <div className="mb-6 flex items-center space-x-4">
          {/* Dropdown for Stakeholder Maps */}
          <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown}
              className="inline-flex justify-between w-56 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              {selectedMapId === "new"
                ? "New Stakeholder Map"
                : stakeholderMapList.find((m) => m.id === selectedMapId)
                    ?.name || "Select Stakeholder Map"}
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
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <div
                    onClick={() => handleStakeholderMapSelectChange("new")}
                    className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    New Stakeholder Map
                  </div>
                  {stakeholderMapList.map((map) => (
                    <div
                      key={map.id}
                      onClick={() => handleStakeholderMapSelectChange(map.id)}
                      className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {map.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Save and Delete Buttons */}
          <Button
            variant="contained"
            onClick={handleSaveStakeholderMap}
            sx={{
              bgcolor: "indigo.600",
              "&:hover": { bgcolor: "indigo.700" },
              px: 2,
              py: 1,
              borderRadius: "8px",
              fontSize: "0.875rem",
            }}
          >
            Save Stakeholder Map
          </Button>
          {selectedMapId !== "new" && (
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
              Delete Map
            </Button>
          )}
        </div>

        {/* Scatter Chart Component */}
        <StakeholderScatterChart
          stakeholders={stakeholders}
          setStakeholders={setStakeholders}
        />

        {/* Modal for Naming New Map */}
        {showModal && (
          <StakeholderMapModal
            name={newMapName}
            setName={setNewMapName}
            onClose={() => setShowModal(false)}
            onSave={handleModalSave}
          />
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this stakeholder map?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDeleteConfirm(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowDeleteConfirm(false);
                handleDeleteStakeholderMap();
              }}
              color="error"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {stakeholders.length > 0 && (
          <Typography variant="body2" className="text-center mt-4">
            {`Total stakeholders: ${stakeholders.length}`}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default StakeHolderPage;
