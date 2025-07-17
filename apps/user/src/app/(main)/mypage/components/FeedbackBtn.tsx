"use client"
import { ChevronRight, MessageSquare } from 'lucide-react';
import useFeedbackModalStore from '@/store/useFeedbackModalStore';

const FeedbackBtn = () => {
  const { open } = useFeedbackModalStore();
  return (
    <button
      onClick={open}
      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center space-x-3">
        <MessageSquare className="w-5 h-5 text-gray-600" />
        <span className="font-medium text-gray-900">피드백</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </button>
  );
};

export default FeedbackBtn;