import { Card, CardContent } from "@workspace/ui/components/card";
import MembershipGrade from "../../app/(main)/home/components/ui/MembershipGrade";
import { BrandContent } from "@/types/brand";
import classNames from "classnames";
import FavoriteBtn from "../FavoriteBtn";
import { memo } from "react";
import Image from "next/image";
import { Badge } from "@workspace/ui/components/badge";
import { getCategoryColor } from "@/utils/categoryColor";

type Variant = "vertical" | "horizontal";
interface DynamicCardProps {
  data: BrandContent;
  variant?: Variant;
  onClick?: () => void;
}
const DynamicCard = ({ data, variant = "vertical", onClick }: DynamicCardProps) => {
  const { brandId, name, category, description, imgUrl, isVIPcock, minRank, isBookmarked } = data;

  return (
    <Card
      onClick={onClick}
      className={classNames(
        "hover:border-action-green cursor-pointer border-gray-200 bg-white object-fill transition-all duration-200 hover:shadow-lg",
        {
          // 세로형: 고정 너비 & 세로 레이아웃
          "w-64 flex-shrink-0": variant === "vertical",
          // 가로형: 가로로 늘어나는 flex row
          relative: variant === "horizontal",
        }
      )}
    >
      <CardContent className={variant === "vertical" ? "p-0" : "p-4"}>
        {variant === "vertical" ? (
          // --- Vertical Layout ---
          <>
            <div className="relative">
              <img
                src={imgUrl || "/placeholder.png"}
                alt={name}
                className="h-32 w-full rounded-t-lg object-cover"
              />
            </div>
            <div className="space-y-2 p-3">
              <div className="flex items-center justify-between">
                <Badge className={getCategoryColor(category)}>{category}</Badge>
                {isBookmarked !== null && (
                  <FavoriteBtn brandId={brandId} bookmarked={isBookmarked} variant={variant} />
                )}
              </div>
              <h3 className="line-clamp-1 text-sm font-semibold text-gray-900">{name}</h3>
              <h5 className="line-clamp-1 text-sm text-gray-900">{description}</h5>
              <div className="flex flex-col items-end space-y-0.5">
                <MembershipGrade rank={minRank} isVIPcock={isVIPcock} />
              </div>
            </div>
          </>
        ) : (
          // --- Horizontal Layout ---
          <div className="flex items-center space-x-4">
            <img
              src={imgUrl || "/placeholder.png"}
              alt={name}
              className="h-16 w-16 flex-shrink-0 rounded-lg object-fill"
            />
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="mb-1 text-xs font-semibold text-gray-500">{category}</p>
                  <h4 className="truncate text-sm font-bold leading-tight text-gray-900">{name}</h4>
                </div>
                {isBookmarked !== null && (
                  <FavoriteBtn brandId={brandId} bookmarked={isBookmarked} variant={variant} />
                )}
              </div>
              <h5 className="mb-2 line-clamp-2 text-sm text-gray-900">{description}</h5>
              {/* 등급별 배치 */}
              <div className="mb-2 flex flex-col space-y-1">
                {/* 예시: getGradeLayout 같은 helper를 쓰셔도 되고 */}
                <MembershipGrade rank={minRank} isVIPcock={isVIPcock} />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(DynamicCard);
