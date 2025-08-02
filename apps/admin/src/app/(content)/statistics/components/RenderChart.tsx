import { barOptions, lineOptions } from "@/types/constants";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { useEffect, useState } from "react";

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface RenderChartProps {
  activeStatType: string;
}

const RenderChart = ({ activeStatType }: RenderChartProps) => {
  const [chartHeight, setChartHeight] = useState(400);

  useEffect(() => {
    const updateHeight = () => {
      setChartHeight(window.innerWidth < 768 ? 300 : 400);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const partnerViewData = {
    labels: ["스타벅스", "맥도날드", "베스킨라빈스", "도미노피자", "쉐이크쉑"],
    datasets: [
      {
        label: "조회수",
        data: [4000, 3000, 2000, 2780, 1890],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const districtData = {
    labels: ["강남구", "서초구", "송파구", "마포구", "종로구"],
    datasets: [
      {
        label: "이용수",
        data: [3500, 2800, 2400, 2100, 1900],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const trendData = {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
    datasets: [
      {
        label: "카페",
        data: [4000, 3000, 2000, 2780, 1890, 2390],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "패스트푸드",
        data: [2400, 1398, 9800, 3908, 4800, 3800],
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "디저트",
        data: [2400, 2210, 2290, 2000, 2181, 2500],
        borderColor: "rgba(251, 191, 36, 1)",
        backgroundColor: "rgba(251, 191, 36, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const keywordData = {
    labels: ["스타벅스", "맥도날드", "카페", "치킨", "피자"],
    datasets: [
      {
        label: "검색 횟수",
        data: [1200, 980, 850, 720, 650],
        backgroundColor: "rgba(249, 115, 22, 0.8)",
        borderColor: "rgba(249, 115, 22, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };
  switch (activeStatType) {
    case "click":
    case "usage":
      return (
        <div style={{ height: chartHeight }}>
          <Bar data={partnerViewData} options={barOptions} />
        </div>
      );
    case "local":
      return (
        <div style={{ height: chartHeight }}>
          <Bar data={districtData} options={barOptions} />
        </div>
      );
    case "interest-change":
      return (
        <div style={{ height: chartHeight }}>
          <Line data={trendData} options={lineOptions} />
        </div>
      );
    case "keywords/daily-top":
    case "keywords/empty-top":
      return (
        <div style={{ height: chartHeight }}>
          <Bar data={keywordData} options={barOptions} />
        </div>
      );
    default:
      return null;
  }
};

export default RenderChart;
