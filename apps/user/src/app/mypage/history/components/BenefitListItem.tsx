import React, { memo } from 'react';
import { Benefit } from '@/types/benefit';
import BenefitCard from './ui/BenefitCard';
import { Badge } from '@workspace/ui/components/badge';

interface BenefitListItemProps {
  data: Benefit;
}
const BenefitListItem = ({ data }: BenefitListItemProps) => {
  const {
    bookmarkId,
    brandId,
    brandName,
    storeName,
    category,
    brandImageUrl,
    usedAt
  } = data;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "푸드":
        return "bg-orange-100 text-orange-800"
      case "문화여가":
        return "bg-purple-100 text-purple-800"
      case "뷰티/건강":
        return "bg-pink-100 text-pink-800"
      case "쇼핑":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <BenefitCard>
      <div className="space-y-2">
        {/* 제휴처 이름 */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{brandName}</h3>
          <Badge className={getCategoryColor(category)}>{category}</Badge>
        </div>

        {/* 지점 정보 */}
        <p className="text-sm text-gray-600">{storeName}</p>

        {/* 사용 날짜 */}
        <p className="text-xs text-gray-500">
          {new Date(usedAt).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </BenefitCard>
  );
};

export default memo(BenefitListItem);