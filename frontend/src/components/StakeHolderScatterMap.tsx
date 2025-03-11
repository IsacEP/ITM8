// src/components/StakeholderScatterChart.tsx
import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Slider, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
} from "recharts";
import { Stakeholder } from "../types/types";

const LOCAL_STORAGE_KEY = "stakeholders";

export const StakeholderScatterChart: React.FC = () => {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [name, setName] = useState("");
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);

  // Helper to update state and localStorage
  const updateStakeholders = (newStakeholders: Stakeholder[]) => {
    setStakeholders(newStakeholders);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newStakeholders));
    window.dispatchEvent(new Event("stakeholdersUpdated"));
  };

  // Read from localStorage on mount
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

  // Listen for custom update events to re-read the stored data
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

  // Custom tooltip with a remove button
  const renderTooltip = (props: any) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const { name } = payload[0].payload;
      return (
        <Box sx={{ background: "#fff", padding: 1, border: "1px solid #ccc" }}>
          <Typography variant="body2">{name}</Typography>
          <Button
            variant="text"
            size="small"
            onClick={() => handleRemove(name)}
          >
            Remove
          </Button>
        </Box>
      );
    }
    return null;
  };

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
      {/* Scatter Plot */}
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="Support" domain={[0, 100]} />
          <YAxis type="number" dataKey="y" name="Influence" domain={[0, 100]} />
          <Tooltip content={renderTooltip} />
          <Scatter name="Stakeholders" data={stakeholders} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
};
