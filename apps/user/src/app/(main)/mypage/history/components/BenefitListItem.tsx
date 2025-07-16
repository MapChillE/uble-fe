import { memo } from 'react';
import { Benefit } from '@/types/benefit';
import BenefitCard from './ui/BenefitCard';
import { Badge } from '@workspace/ui/components/badge';
import { getCategoryColor } from '@/utils/categoryColor';

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