import { Card, CardContent } from "@workspace/ui/components/card";
import { Star, User } from "lucide-react";
import FeedbackDetailDialog from "./FeedbackDetailDialog";
import { formatDate } from "@/utils/feedbackUtil";
import { Feedback } from "@/types/feedback";
import { memo, useCallback } from "react";

interface FeedbackListItemProps {
  feedback: Feedback;
}
const FeedbackListItem = ({ feedback }: FeedbackListItemProps) => {
  const renderStars = useCallback((rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-current text-yellow-400" : "text-gray-300"}`}
      />
    ));
  }, []);
  return (
    <Card className="border-gray-200">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
          <div className="flex-1">
            <div className="mb-3 flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium">{feedback.nickname}</span>
              </div>
              <div className="flex items-center space-x-1">{renderStars(feedback.score)}</div>
              <span className="text-sm text-gray-500">{formatDate(feedback.createdAt)}</span>
            </div>

            <h3 className="mb-2 text-lg font-semibold">{feedback.title}</h3>
            <p className="leading-relaxed text-gray-600">{feedback.content}</p>
          </div>

          <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <FeedbackDetailDialog feedback={feedback} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(FeedbackListItem);
