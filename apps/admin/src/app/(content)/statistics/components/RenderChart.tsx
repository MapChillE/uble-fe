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
} from "chart.js";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  transformClickData,
  transformUsageData,
  transformLocalData,
  transformInterestChangeData,
  transformKeywordsData,
  getDefaultChartData,
  getKeywordsDateList,
  type ChartData,
} from "../utils/chartDataTransformers";

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
  data?: any; // API 응답 데이터
}

const RenderChart = ({ activeStatType, data }: RenderChartProps) => {
  const [chartHeight, setChartHeight] = useState(400);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    const updateHeight = () => {
      setChartHeight(window.innerWidth < 768 ? 300 : 400);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // 데이터가 없을 때 로딩 상태 표시
  if (!data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-gray-600">차트 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // API 데이터를 차트 데이터로 변환하는 함수
  const transformApiDataToChartData = (): ChartData => {
    switch (activeStatType) {
      case "click":
        return transformClickData(data) || getDefaultChartData();
      case "usage":
        return transformUsageData(data) || getDefaultChartData();
      case "local":
        return transformLocalData(data) || getDefaultChartData();
      case "interest-change":
        return transformInterestChangeData(data) || getDefaultChartData();
      case "keywords/daily-top":
      case "keywords/empty-top":
        return transformKeywordsData(data, selectedDate) || getDefaultChartData();
      default:
        return getDefaultChartData();
    }
  };

  const chartData = transformApiDataToChartData();

  if (!chartData) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-600">차트 데이터를 표시할 수 없습니다.</p>
      </div>
    );
  }

  // 날짜 선택 컴포넌트 렌더링
  const renderDateSelector = () => {
    if (activeStatType === "keywords/daily-top" || activeStatType === "keywords/empty-top") {
      const dateList = getKeywordsDateList(data);

      if (dateList.length > 0) {
        const currentDate = selectedDate || dateList[dateList.length - 1]?.date;

        return (
          <div className="mb-4 flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">날짜 선택:</label>
            <Select value={currentDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateList.map((item) => (
                  <SelectItem key={item.date} value={item.date}>
                    {item.formattedDate}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      }
    }
    return null;
  };

  switch (activeStatType) {
    case "click":
    case "usage":
      return (
        <div style={{ height: chartHeight }}>
          <Bar data={chartData} options={barOptions} />
        </div>
      );
    case "local":
      return (
        <div style={{ height: chartHeight }}>
          <Bar data={chartData} options={barOptions} />
        </div>
      );
    case "interest-change":
      return (
        <div style={{ height: chartHeight }}>
          <Line data={chartData} options={lineOptions} />
        </div>
      );
    case "keywords/daily-top":
    case "keywords/empty-top":
      return (
        <div>
          {renderDateSelector()}
          <div style={{ height: chartHeight }}>
            <Bar data={chartData} options={barOptions} />
          </div>
        </div>
      );
    default:
      return (
        <div className="flex h-64 items-center justify-center">
          <p className="text-gray-600">지원하지 않는 차트 유형입니다.</p>
        </div>
      );
  }
};

export default RenderChart;
