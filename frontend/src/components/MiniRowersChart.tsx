import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type MiniRowersChartProps = {
  values: number[];
  onChange: (index: number, value: number) => void;
};

const MiniRowersChart: React.FC<MiniRowersChartProps> = ({
  values,
  onChange,
}) => {
  const categories = ["R", "O", "W", "E", "R", "S"];
  const chartData = categories.map((category, index) => ({
    name: category,
    value: values[index] || 0,
  }));

  return (
    <Box sx={{ mt: 3, p: 2, border: "1px solid #ddd", borderRadius: "8px" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        ROWERS Analysis
      </Typography>
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        {categories.map((letter, index) => (
          <TextField
            key={index}
            label={letter}
            type="number"
            inputProps={{ min: 0, max: 5 }}
            value={values[index]}
            onChange={(e) => onChange(index, parseInt(e.target.value, 10) || 0)}
            sx={{ width: "60px" }}
          />
        ))}
      </Box>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
          <Tooltip />
          <Bar dataKey="value" fill="#6200ea" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MiniRowersChart;
