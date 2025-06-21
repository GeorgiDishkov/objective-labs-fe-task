"use client";

import { useGetCoinMarketChartQuery } from "@test_objectlabs_lib/coincap-sdk";
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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  coinId: string;
  vs_currency: string;
  days: string | number;
};

export default function CoinChart({ coinId, vs_currency, days }: Props) {
  const { data, isLoading, error } = useGetCoinMarketChartQuery({
    id: coinId,
    vs_currency,
    days,
  });

  if (isLoading) return <p>Loading chart...</p>;
  if (error || !data) return <p>Error loading chart data</p>;

  const labels = data.prices.map((p) => {
    const date = new Date(p[0]);
    return date.toLocaleDateString();
  });

  const priceData = data.prices.map((p) => p[1]);

  const chartData = {
    labels,
    datasets: [
      {
        label: `${coinId} Price (${vs_currency.toUpperCase()})`,
        data: priceData,
        borderColor: "#39ff14",
        backgroundColor: "rgba(57, 255, 20, 0.3)",
        fill: true,
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#39ff14" },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
      title: {
        display: true,
        text: "Price Historical Chart",
        color: "#39ff14",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        ticks: { color: "#39ff14" },
        grid: { color: "#222" },
      },
      y: {
        ticks: { color: "#39ff14" },
        grid: { color: "#222" },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
