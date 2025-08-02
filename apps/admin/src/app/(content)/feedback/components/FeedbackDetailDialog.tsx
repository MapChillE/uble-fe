import { Feedback } from "@/types/feedback";
import { formatDate } from "@/utils/feedbackUtil";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Star } from "lucide-react";
import { useCallback } from "react";

const FeedbackDetailDialog = ({ feedback }: { feedback: Feedback }) => {
  const renderStars = useCallback((rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-current text-yellow-400" : "text-gray-300"}`}
      />
    ));
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          상세보기
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>피드백 상세 정보</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">사용자</label>
              <p>{feedback.nickname}</p>
            </div>
            <div>
              <label className="text-sm font-medium">평점</label>
              <div className="flex items-center space-x-1">{renderStars(feedback.score)}</div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">작성일시</label>
            <p>{formatDate(feedback.createdAt)}</p>
          </div>

          <div>
            <label className="text-sm font-medium">제목</label>
            <p>{feedback.title}</p>
          </div>

          <div>
            <label className="text-sm font-medium">내용</label>
            <p className="whitespace-pre-wrap">{feedback.content}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDetailDialog;
