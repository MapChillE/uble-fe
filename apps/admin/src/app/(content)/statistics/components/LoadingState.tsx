import { Fragment } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import ChartSelector from "./ChartSelector";
import { statTypes } from "@/types/constants";

interface LoadingStateProps {
  activeStatType: string;
  setActiveStatType: (type: string) => void;
}

const LoadingState = ({ activeStatType, setActiveStatType }: LoadingStateProps) => {
  return (
    <Fragment>
      <ChartSelector activeStatType={activeStatType} setActiveStatType={setActiveStatType} />
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="mt-5 text-xl font-bold">
            {statTypes.find((type) => type.id === activeStatType)?.label}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
              <p className="text-gray-600">데이터를 불러오는 중...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default LoadingState;
