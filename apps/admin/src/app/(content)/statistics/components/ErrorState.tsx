import { Fragment } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import ChartSelector from "./ChartSelector";
import { statTypes } from "@/types/constants";

interface ErrorStateProps {
  activeStatType: string;
  setActiveStatType: React.Dispatch<React.SetStateAction<string>>;
  onRetry: () => void;
}

const ErrorState = ({ activeStatType, setActiveStatType, onRetry }: ErrorStateProps) => {
  return (
    <Fragment>
      <ChartSelector activeStatType={activeStatType} setActiveStatType={setActiveStatType} />
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="mt-5 text-xl font-bold">
            {statTypes.find((type) => type.id === activeStatType)?.label || "통계"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="flex h-64 flex-col items-center justify-center">
            <div className="text-center">
              <p className="mb-4 text-red-600">데이터를 불러오는 중 오류가 발생했습니다.</p>
              <button
                onClick={onRetry}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                다시 시도
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default ErrorState;
