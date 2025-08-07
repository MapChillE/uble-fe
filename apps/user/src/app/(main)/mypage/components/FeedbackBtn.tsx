"use client";
import { ChevronRight, MessageSquare } from "lucide-react";
import useFeedbackModalStore from "@/store/useFeedbackModalStore";

const FeedbackBtn = () => {
  const { open } = useFeedbackModalStore();
  return (
    <button
      onClick={open}
      className="flex w-full items-center justify-between p-4 transition-colors hover:bg-gray-50"
    >
      <div className="flex items-center space-x-3">
        <MessageSquare className="h-5 w-5 text-gray-600" />
        <span className="text-gray-900">피드백</span>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-400" />
    </button>
  );
};

export default FeedbackBtn;
