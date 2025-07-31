import { FeedbackData } from "@/types/feedback";
import { Card, CardContent } from "@workspace/ui/components/card";
import { MessageSquare } from "lucide-react";

interface FeedbackStatisticsProps {
  feedbackData: FeedbackData;
  currentPage: number;
}
const FeedbackStatistics = ({ feedbackData, currentPage = 1 }: FeedbackStatisticsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="border-none">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">전체 피드백</p>
              <p className="text-3xl font-bold">{feedbackData.totalCount}</p>
            </div>
            <MessageSquare className="h-10 w-10 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-none">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">전체 페이지</p>
              <p className="text-3xl font-bold">{feedbackData.totalPages}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <span className="text-lg font-bold text-green-600">#</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">현재 페이지</p>
              <p className="text-3xl font-bold">{currentPage}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
              <span className="text-lg font-bold text-purple-600">P</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackStatistics;
