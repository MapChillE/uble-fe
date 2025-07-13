'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

import { ChevronRight, Gift } from 'lucide-react';

const BenefitListBtn = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/mypage/history")}
      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center space-x-3">
        <Gift className="w-5 h-5 text-gray-600" />
        <span className="font-medium text-gray-900">혜택 내역</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </button>
  );
};

export default BenefitListBtn;