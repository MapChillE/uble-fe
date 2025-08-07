"use client";
import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { RankItem } from "@/types/dashboard";
import ChartCard from "./ui/ChartCard";
import EmptyChartState from "./ui/EmptyChartState";

// Chart.js 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface ChartSectionProps {
  topUsageLocalList: RankItem[];
  topUsageRankList: RankItem[];
}

const ChartSection: React.FC<ChartSectionProps> = ({ topUsageLocalList, topUsageRankList }) => {
  // 파이 차트 데이터 (지역구 인기 순위)
  const pieChartData = {
    labels: topUsageLocalList.map((item) => item.name),
    datasets: [
      {
        data: topUsageLocalList.map((item) => item.count),
        backgroundColor: [
          "#3B82F6", // blue-500
          "#10B981", // emerald-500
          "#F59E0B", // amber-500
          "#EF4444", // red-500
          "#8B5CF6", // violet-500
          "#06B6D4", // cyan-500
          "#84CC16", // lime-500
          "#F97316", // orange-500
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  // 파이 차트 옵션
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value}회 (${percentage}%)`;
          },
        },
      },
    },
  };

  // 바 차트 데이터 (Top 5 제휴처)
  const barChartData = {
    labels: topUsageRankList.slice(0, 5).map((item) => item.name),
    datasets: [
      {
        label: "이용 횟수",
        data: topUsageRankList.slice(0, 5).map((item) => item.count),
        backgroundColor: "#3B82F6", // blue-500
        borderColor: "#2563EB", // blue-600
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  // 바 차트 옵션
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `이용 횟수: ${context.parsed.y}회`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* 지역구 인기 순위 (파이 차트) */}
      <ChartCard title="지역구 인기 순위">
        {topUsageLocalList.length > 0 ? (
          <Pie data={pieChartData} options={pieOptions} />
        ) : (
          <EmptyChartState title="지역구 인기 순위" type="pie" />
        )}
      </ChartCard>

      {/* 가장 사용량이 많은 top5 제휴처 (바 차트) */}
      <ChartCard title="Top 5 제휴처">
        {topUsageRankList.length > 0 ? (
          <Bar data={barChartData} options={barOptions} />
        ) : (
          <EmptyChartState title="Top 5 제휴처" type="bar" />
        )}
      </ChartCard>
    </div>
  );
};

export default ChartSection;
