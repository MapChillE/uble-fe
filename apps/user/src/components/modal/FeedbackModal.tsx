"use client"
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import useFeedbackModalStore from "@/store/useFeedbackModalStore";
import { useState } from "react";

const FeedbackModal = () => {
  const { isOpen, close } = useFeedbackModalStore();

  const [formData, setFormData] = useState({ title: "", content: "" })

  const canSubmit = formData.title.trim() && formData.content.trim();

  const handleSubmit = async () => {
    //향후 여기에 피드백 저장 요청 하면됨
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">피드백</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 안내 문구 */}
          <p className="text-sm text-gray-600 text-center">서비스 개선을 위한 소중한 의견을 들려주세요.</p>

          {/* 제목 */}
          <div className="space-y-2">
            <Label htmlFor="feedback-title">제목</Label>
            <Input
              id="feedback-title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="피드백 제목을 입력해주세요"
              className="h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-green focus-visible:ring-offset-2"
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
            <Button type="button" variant="outline" onClick={close} className="flex-1 bg-transparent">
              취소
            </Button>
            <Button
              type="submit"
              disabled={!canSubmit}
              className="flex-1 bg-[#41d596] hover:bg-[#3bc085] text-white disabled:bg-gray-300"
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