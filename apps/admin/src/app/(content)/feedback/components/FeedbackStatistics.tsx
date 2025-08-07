import { FeedbackData } from "@/types/feedback";
import { Card, CardContent } from "@workspace/ui/components/card";
import { MessageSquare } from "lucide-react";

interface FeedbackStatisticsProps {
  totalCount: number;
}
const FeedbackStatistics = ({ totalCount }: FeedbackStatisticsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="border-none">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">전체 피드백</p>
              <p className="text-3xl font-bold">{totalCount}</p>
            </div>
            <MessageSquare className="h-10 w-10 text-blue-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackStatistics;
