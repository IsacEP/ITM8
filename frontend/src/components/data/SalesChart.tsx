import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type SalesData = {
  region: string;
  month: string;
  sales: number;
};

const SalesChart: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/salesdata/")
      .then((response) => {
        setSalesData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sales data:", error);
      });
  }, []);

  const chartData = {
    labels: salesData.map((data) => `${data.region} - ${data.month}`),
    datasets: [
      {
        label: "Sales",
        data: salesData.map((data) => data.sales),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Makes chart take full container size
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SalesChart;
