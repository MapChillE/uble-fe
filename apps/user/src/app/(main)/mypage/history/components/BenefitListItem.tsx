import { memo } from "react";
import { UsageHistoryData } from "@/types/usage";
import BenefitCard from "./ui/BenefitCard";
import { Badge } from "@workspace/ui/components/badge";
import { getCategoryColor } from "@/utils/categoryColor";

interface BenefitListItemProps {
  data: UsageHistoryData;
}
const BenefitListItem = ({ data }: BenefitListItemProps) => {
  const { category, imageUrl, storeName, usedAt } = data;

  return (
    <BenefitCard>
      <div className="flex items-center space-x-4">
        <img
          src={imageUrl || "/placeholder.png"}
          alt={storeName}
          className="h-16 w-16 flex-shrink-0 rounded-lg object-fill"
        />
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="truncate font-semibold text-gray-900">{storeName}</h3>
            <Badge className={getCategoryColor(category)}>{category}</Badge>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            {(() => {
              try {
                return new Date(usedAt).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
              } catch {
                return "날짜 정보 없음";
              }
            })()}
          </p>
        </div>
      </div>
    </BenefitCard>
  );
};

export default memo(BenefitListItem);
