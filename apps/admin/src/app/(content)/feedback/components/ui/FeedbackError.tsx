import { UseQueryResult } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { AlertTriangle } from "lucide-react";

interface FeedbackErrorProps {
  refetch: () => ReturnType<UseQueryResult["refetch"]>;
}
const FeedbackError = ({ refetch }: FeedbackErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-20 text-center">
      <AlertTriangle className="text-destructive h-10 w-10" />
      <p className="text-lg font-semibold text-gray-800">데이터를 불러오는 중 문제가 발생했어요.</p>
      <p className="text-sm text-gray-500">네트워크 상태를 확인하거나, 다시 시도해 주세요.</p>
      <Button onClick={() => refetch()}>다시 시도하기</Button>
    </div>
  );
};

export default FeedbackError;
