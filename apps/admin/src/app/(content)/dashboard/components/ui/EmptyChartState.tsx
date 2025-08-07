import { BarChart3, PieChart } from "lucide-react";

interface EmptyChartStateProps {
  title: string;
  type: "pie" | "bar";
}

const EmptyChartState: React.FC<EmptyChartStateProps> = ({ title, type }) => {
  const getIcon = () => {
    switch (type) {
      case "pie":
        return <PieChart className="h-12 w-12 text-gray-400" />;
      case "bar":
        return <BarChart3 className="h-12 w-12 text-gray-400" />;
      default:
        return <BarChart3 className="h-12 w-12 text-gray-400" />;
    }
  };

  const getMessage = () => {
    switch (type) {
      case "pie":
        return "아직 지역구별 이용 데이터가 없습니다.";
      case "bar":
        return "아직 제휴처 이용 데이터가 없습니다.";
      default:
        return "데이터가 없습니다.";
    }
  };

  return (
    <div className="flex h-64 flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50">
      {getIcon()}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{getMessage()}</p>
      </div>
    </div>
  );
};

export default EmptyChartState;
