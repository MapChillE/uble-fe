"use client";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import useFeedbackModalStore from "@/store/useFeedbackModalStore";
import { useState } from "react";
import { Star } from "lucide-react";
import { FeedbackForm } from "@/types/profile";
import { apiHandler } from "@api/apiHandler";
import { registFeedback } from "@/service/user";
import { toast } from "sonner";

const FeedbackModal = () => {
  const { isOpen, close } = useFeedbackModalStore();

  const [formData, setFormData] = useState<FeedbackForm>({ title: "", content: "", score: 0 });

  const canSubmit = formData.title.trim() && formData.content.trim() && formData.score > 0;

  const handleSubmit = async () => {
    const { data } = await apiHandler(() => registFeedback(formData));
    if (data?.statusCode === 0) {
      toast.success("소중한 의견 감사합니다.");
      close();
    } else toast.error("오류가 발생했습니다. 잠시 후 다시 이용해 주세요.");
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">피드백</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 안내 문구 */}
          <p className="text-center text-sm text-gray-600">
            서비스 개선을 위한 소중한 의견을 들려주세요.
          </p>

          {/* 별점 */}
          <div className="flex flex-col items-start space-y-1">
            <Label className="text-sm font-medium">별점</Label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setFormData((prev) => ({ ...prev, score: star }))}
                  aria-label={`${star}점`}
                  className="focus:outline-none"
                >
                  <Star
                    fill={star <= formData.score ? "#FFD600" : "none"}
                    stroke="#FFD600"
                    className="h-7 w-7 transition-colors"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 제목 */}
          <div className="space-y-2">
            <Label htmlFor="feedback-title">제목</Label>
            <Input
              id="feedback-title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="피드백 제목을 입력해주세요"
              className="focus-visible:ring-action-green h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            />
          </div>

          {/* 내용 */}
          <div className="space-y-2">
            <Label htmlFor="feedback-content">내용</Label>
            <Textarea
              id="feedback-content"
              value={formData.content}
              onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="자세한 내용을 입력해주세요"
              className="min-h-[120px] resize-none"
            />
          </div>

          {/* 버튼 */}
          <div className="flex space-x-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={close}
              className="flex-1 bg-transparent"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={!canSubmit}
              className="bg-action-green flex-1 text-white hover:bg-[#3bc085] disabled:bg-gray-300"
            >
              전송
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
