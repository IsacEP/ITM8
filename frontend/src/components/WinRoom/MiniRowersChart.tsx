import React from "react";
import { Box } from "@mui/material";
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
};

const MiniRowersChart: React.FC<MiniRowersChartProps> = ({ values }) => {
  const categories = ["R", "O", "W", "E", "R", "S"];
  const chartData = categories.map((category, index) => ({
    name: category,
    value: values[index] || 0,
  }));

  return (
    <Box
      className="border border-gray-300 rounded-lg"
      style={{ border: "none" }}
    >
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="#333" />
          <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} stroke="#333" />
          <Tooltip />
          <Bar dataKey="value" fill="#6200ea" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MiniRowersChart;
