// In StakeholderScatterChart.tsx
import React, { useState, useEffect, useMemo } from "react";
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
  LabelList,
} from "recharts";
import type { Stakeholder } from "../../types/types";

interface StakeholderScatterChartProps {
  stakeholders: Stakeholder[];
  setStakeholders: (stakeholders: Stakeholder[]) => void;
}

const StakeholderScatterChart: React.FC<StakeholderScatterChartProps> = ({
  stakeholders,
  setStakeholders,
}) => {
  const [name, setName] = useState("");
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);

  // Calculate average support and influence
  const averageSupport = useMemo(() => {
    return stakeholders.length
      ? (
          stakeholders.reduce((sum, s) => sum + s.x, 0) / stakeholders.length
        ).toFixed(2)
      : "0.00";
  }, [stakeholders]);

  const averageInfluence = useMemo(() => {
    return stakeholders.length
      ? (
          stakeholders.reduce((sum, s) => sum + s.y, 0) / stakeholders.length
        ).toFixed(2)
      : "0.00";
  }, [stakeholders]);

  const handleAdd = () => {
    if (name.trim()) {
      const newStakeholder: Stakeholder = { name, x, y };
      const newList = [...stakeholders, newStakeholder];
      setStakeholders(newList);
      // Optionally update localStorage here if needed:
      localStorage.setItem("stakeholders", JSON.stringify(newList));
      window.dispatchEvent(new Event("stakeholdersUpdated"));
      setName("");
    }
  };

  const handleRemove = (nameToRemove: string) => {
    const updated = stakeholders.filter((s) => s.name !== nameToRemove);
    setStakeholders(updated);
    localStorage.setItem("stakeholders", JSON.stringify(updated));
    window.dispatchEvent(new Event("stakeholdersUpdated"));
  };

  // Custom tooltip and dot renderer defined as before...
  const renderTooltip = (props: any) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const { name, x, y } = payload[0].payload;
      return (
        <div className="bg-white border border-gray-300 p-2 rounded-md shadow-md">
          <Typography variant="body2" className="text-gray-800 font-semibold">
            {name}
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            Support: {x}
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            Influence: {y}
          </Typography>
        </div>
      );
    }
    return null;
  };

  const renderLargeDot = (props: any) => {
    const { cx, cy, fill } = props;
    return <circle cx={cx} cy={cy} r={8} fill={fill} />;
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* INPUT CARD */}
      <Card className="shadow-sm hover:shadow-md transition-shadow border rounded-xl">
        <CardHeader
          title={<Typography variant="h6">Add a Stakeholder</Typography>}
        />
        <CardContent className="flex flex-col space-y-4">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex flex-col">
              <Typography variant="caption">{`Support (${x})`}</Typography>
              <Slider
                value={x}
                min={0}
                max={100}
                onChange={(_, newVal) => setX(newVal as number)}
                sx={{ width: 250 }}
              />
            </div>
            <div className="flex flex-col">
              <Typography variant="caption">{`Influence (${y})`}</Typography>
              <Slider
                value={y}
                min={0}
                max={100}
                onChange={(_, newVal) => setY(newVal as number)}
                sx={{ width: 250 }}
              />
            </div>
            <Button variant="contained" onClick={handleAdd}>
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SCATTER CHART CARD */}
      <Card className="shadow-sm rounded-xl">
        <CardHeader
          title={<Typography variant="h6">Stakeholder Map</Typography>}
        />
        <CardContent>
          <div className="w-full h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
              >
                <CartesianGrid stroke="#e0e0e0" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Support"
                  domain={[0, 100]}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Influence"
                  domain={[0, 100]}
                  padding={{ top: 10, bottom: 10 }}
                />
                <ReferenceLine x={50} stroke="purple" strokeDasharray="3 3" />
                <ReferenceLine y={50} stroke="purple" strokeDasharray="3 3" />
                <Tooltip content={renderTooltip} />
                <Scatter
                  name="Stakeholders"
                  data={stakeholders}
                  fill="rgb(95,37,159)"
                  shape={renderLargeDot}
                  animationDuration={500}
                >
                  <LabelList dataKey="name" position="top" offset={15} />
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          {stakeholders.length > 0 && (
            <Typography variant="body2" className="mt-2 text-center">
              {`Average Support: ${averageSupport} | Average Influence: ${averageInfluence}`}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* STAKEHOLDER LIST CARD */}
      <Card className="shadow-sm rounded-xl">
        <CardHeader
          title={<Typography variant="h6">Stakeholders</Typography>}
        />
        <CardContent>
          {stakeholders.length === 0 ? (
            <Typography variant="body2">
              No stakeholders yet. Add one above!
            </Typography>
          ) : (
            <List>
              {stakeholders.map((s) => (
                <div
                  key={s.name}
                  className="flex justify-between items-center mb-2"
                >
                  <ListItemText
                    primary={s.name}
                    secondary={`Support: ${s.x}, Influence: ${s.y}`}
                  />
                  <IconButton onClick={() => handleRemove(s.name)}>
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
