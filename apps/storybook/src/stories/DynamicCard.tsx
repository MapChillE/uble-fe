import React from 'react';

import { Card, CardContent } from '@workspace/ui/components/card';
import { Badge } from '@workspace/ui/components/badge';
import { Heart } from 'lucide-react';
import MembershipGrade from './MembershipGrade';

interface DynamicCardProps {
  title: string;
  image: string;
  category: string;
  discount: string;
  rank: "VIP" | "NORMAL" | "LOCAL" | "VIP_NORMAL";
  isFavorite: boolean;
  usageLimit: string;
}

const DynamicCard = ({ title = "testest", image, category = "test", discount = "10%", rank = "NORMAL", isFavorite = false, usageLimit = "월 1회" }: DynamicCardProps) => {
  return (
    <Card
      className="flex-shrink-0 w-64 border-gray-200 hover:border-[#41d596] hover:shadow-lg transition-all duration-200 cursor-pointer"
    >
      <CardContent className="p-0">
        {/* IMAGE */}
        <div className="relative">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-32 object-cover rounded-t-lg"
          />
          {discount && (
            <Badge className="absolute bottom-2 left-2 bg-[#41d596] text-white border-0">{discount}</Badge>
          )}
        </div>

        {/* BODY */}
        <div className="p-3 space-y-2">
          {/* 카테고리와 하트 (개인 추천이 아닌 경우에만 하트 표시) */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded font-semibold">
              {category}
            </span>
            <Heart
              className="h-4 w-4"
              color={isFavorite ? "#FD7563" : "#9CA3AF"} // gray-400
              fill={isFavorite ? "#FD7563" : "none"}
            />
          </div>

          <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{title}</h3>

          {/* GRADES (최대 두 줄) - 세로 배치 어 따로 빼야함*/}
          <div className="flex flex-col items-end space-y-0.5">
            <MembershipGrade rank={rank} content='test' />
          </div>

          <div className="text-xs text-gray-500 text-right">{usageLimit ?? ""}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DynamicCard; 