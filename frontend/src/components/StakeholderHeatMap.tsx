// src/components/StakeholderHeatMap.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Slider,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stakeholder } from "../types/types";

const LOCAL_STORAGE_KEY = "stakeholders";

// Helper to convert stakeholder data into a 10x10 grid
const binData = (stakeholders: Stakeholder[], bins: number = 10) => {
  const grid = Array.from({ length: bins }, () => Array(bins).fill(0));
  stakeholders.forEach(({ x, y }) => {
    const i = Math.min(bins - 1, Math.floor(x / (100 / bins)));
    const j = Math.min(bins - 1, Math.floor(y / (100 / bins)));
    grid[j][i]++;
  });
  return grid;
};

export const StakeholderHeatMap: React.FC = () => {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [name, setName] = useState("");
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);

  const updateStakeholders = (newStakeholders: Stakeholder[]) => {
    setStakeholders(newStakeholders);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newStakeholders));
    window.dispatchEvent(new Event("stakeholdersUpdated"));
  };

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setStakeholders(JSON.parse(stored));
      } catch (error) {
        console.error("Error parsing stored stakeholders", error);
      }
    }
  }, []);

  useEffect(() => {
    const handleStorageUpdate = () => {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        try {
          setStakeholders(JSON.parse(stored));
        } catch (error) {
          console.error("Error parsing stored stakeholders", error);
        }
      }
    };
    window.addEventListener("stakeholdersUpdated", handleStorageUpdate);
    return () => {
      window.removeEventListener("stakeholdersUpdated", handleStorageUpdate);
    };
  }, []);

  const handleAdd = () => {
    if (name.trim()) {
      const newStakeholder: Stakeholder = { name, x, y };
      updateStakeholders([...stakeholders, newStakeholder]);
      setName("");
    }
  };

  const handleRemove = (nameToRemove: string) => {
    const updated = stakeholders.filter((s) => s.name !== nameToRemove);
    updateStakeholders(updated);
  };

  const grid = binData(stakeholders, 10);

  return (
    <Box>
      {/* Input Form */}
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Box>
          <Typography variant="caption">Support ({x})</Typography>
          <Slider
            value={x}
            min={0}
            max={100}
            onChange={(_, newVal) => setX(newVal as number)}
            sx={{ width: 150 }}
          />
        </Box>
        <Box>
          <Typography variant="caption">Influence ({y})</Typography>
          <Slider
            value={y}
            min={0}
            max={100}
            onChange={(_, newVal) => setY(newVal as number)}
            sx={{ width: 150 }}
          />
        </Box>
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </Box>

      {/* Heat Map Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gap: 1,
          mb: 2,
        }}
      >
        {grid.flat().map((count, idx) => {
          const intensity = Math.min(1, count / 5);
          return (
            <Box
              key={idx}
              sx={{
                aspectRatio: "1/1",
                bgcolor: `rgba(255, 0, 0, ${intensity})`,
                border: "1px solid #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {count > 0 && (
                <Typography variant="caption" color="white">
                  {count}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>

      {/* Stakeholder List */}
      <Typography variant="h6">Stakeholders</Typography>
      <List>
        {stakeholders.map((s) => (
          <ListItem
            key={s.name}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleRemove(s.name)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={`${s.name} (Support: ${s.x}, Influence: ${s.y})`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
