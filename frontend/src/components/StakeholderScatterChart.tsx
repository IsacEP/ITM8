import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Slider,
  Button,
  Typography,
  IconButton,
  List,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  ReferenceLine,
} from "recharts";
import type { Stakeholder } from "../types/types";

const LOCAL_STORAGE_KEY = "stakeholders";

const StakeholderScatterChart: React.FC = () => {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [name, setName] = useState("");
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);

  // --- LocalStorage Logic ---
  const updateStakeholders = (newStakeholders: Stakeholder[]) => {
    setStakeholders(newStakeholders);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newStakeholders));
    // Fire an event in case other components also read from localStorage
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

  // Re-sync if any external changes happen
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

  // --- Handlers ---
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
        <div className="bg-white border border-gray-300 p-2 rounded-md shadow-md">
          <Typography variant="body2" className="text-gray-800 font-semibold">
            {name}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleRemove(name)}
            className="mt-1"
          >
            Remove
          </Button>
        </div>
      );
    }
    return null;
  };

  const renderLargeDot = (props: any) => {
    const { cx, cy, fill } = props;
    return <circle cx={cx} cy={cy} r={8} fill={fill} />;
  };

  // --- UI ---
  return (
    <div className="flex flex-col space-y-6">
      {/* INPUT CARD */}
      <Card className="shadow-sm hover:shadow-md transition-shadow border border-[rgb(95,37,159)]/[0.1] rounded-xl">
        <CardHeader
          title={
            <Typography
              variant="h6"
              className="text-[rgb(95,37,159)] font-bold"
            >
              Add a Stakeholder
            </Typography>
          }
          className="pb-0"
        />
        <CardContent className="flex flex-col space-y-4">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          />
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex flex-col">
              <Typography variant="caption" className="text-gray-600">
                Support ({x})
              </Typography>
              <Slider
                value={x}
                min={0}
                max={100}
                onChange={(_, newVal) => setX(newVal as number)}
                sx={{
                  width: 250,
                  height: 10,
                  "& .MuiSlider-thumb": {
                    width: 28,
                    height: 28,
                  },
                  "& .MuiSlider-track": {
                    height: 10,
                  },
                  "& .MuiSlider-rail": {
                    height: 10,
                  },
                }}
              />
            </div>
            <div className="flex flex-col">
              <Typography variant="caption" className="text-gray-600">
                Influence ({y})
              </Typography>
              <Slider
                value={y}
                min={0}
                max={100}
                onChange={(_, newVal) => setY(newVal as number)}
                sx={{
                  width: 250,
                  height: 10,
                  "& .MuiSlider-thumb": {
                    width: 28,
                    height: 28,
                  },
                  "& .MuiSlider-track": {
                    height: 10,
                  },
                  "& .MuiSlider-rail": {
                    height: 10,
                  },
                }}
              />
            </div>
            <Button
              variant="contained"
              onClick={handleAdd}
              className="bg-[rgb(95,37,159)] hover:bg-purple-800 text-white"
            >
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SCATTER CHART CARD */}
      <Card className="shadow-sm hover:shadow-md transition-shadow border border-[rgb(95,37,159)]/[0.1] rounded-xl">
        <CardHeader
          title={
            <Typography
              variant="h6"
              className="text-[rgb(95,37,159)] font-bold"
            >
              Stakeholder Map
            </Typography>
          }
          className="pb-0"
        />
        <CardContent>
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Support"
                  domain={[0, 100]}
                  tick={{ fill: "#4b5563" }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Influence"
                  domain={[0, 100]}
                  tick={{ fill: "#4b5563" }}
                />
                {/* Quadrant reference lines */}
                <ReferenceLine x={50} stroke="purple" strokeDasharray="3 3" />
                <ReferenceLine y={50} stroke="purple" strokeDasharray="3 3" />
                <Tooltip content={renderTooltip} />
                <Scatter
                  name="Stakeholders"
                  data={stakeholders}
                  fill="rgb(95,37,159)"
                  shape={renderLargeDot}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* STAKEHOLDER LIST CARD */}
      <Card className="shadow-sm hover:shadow-md transition-shadow border border-[rgb(95,37,159)]/[0.1] rounded-xl">
        <CardHeader
          title={
            <Typography
              variant="h6"
              className="text-[rgb(95,37,159)] font-bold"
            >
              Stakeholders
            </Typography>
          }
          className="pb-0"
        />
        <CardContent>
          {stakeholders.length === 0 ? (
            <Typography variant="body2" className="text-gray-600">
              No stakeholders yet. Add one above!
            </Typography>
          ) : (
            <List>
              {stakeholders.map((s) => (
                <div
                  key={s.name}
                  className="flex justify-between items-center mb-2 border-b border-gray-200 pb-2"
                >
                  <ListItemText
                    primary={
                      <span className="font-medium text-gray-700">
                        {s.name}
                      </span>
                    }
                    secondary={`Support: ${s.x}, Influence: ${s.y}`}
                  />
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleRemove(s.name)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StakeholderScatterChart;
