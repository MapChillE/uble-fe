import { StoreDetail, StoreSummary } from "@/types/store";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { MapPin, Phone, Heart } from "lucide-react";
import MembershipGrade from "@/app/(main)/home/components/ui/MembershipGrade";

// 공통 헤더 컴포넌트
const StoreCardHeader = ({
  data,
  onRouteClick,
  onFavoriteToggle,
}: {
  data: StoreDetail | StoreSummary;
  onRouteClick?: () => void;
  onFavoriteToggle?: () => void;
}) => (
  <div className="flex items-start justify-between">
    <div className="flex flex-col items-start space-y-4">
      <img
        src={data.imageUrl || "/placeholder.svg"}
        alt={data.storeName}
        className="h-24 w-24 flex-shrink-0 rounded object-cover"
      />
      <div className="w-full space-y-1">
        <Badge className="text-xs font-semibold">{data.category}</Badge>
        <h1 className="text-2xl font-bold">{data.storeName}</h1>
        <div className="flex w-full items-center justify-between">
          <p className="flex-1 text-gray-600">{data.description}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={onRouteClick}
            className="ml-4 h-8 flex-shrink-0 px-3 text-xs hover:bg-gray-50"
          >
            <MapPin className="mr-1 h-3 w-3" />
            길찾기
          </Button>
        </div>
      </div>
    </div>
    <button onClick={onFavoriteToggle} className="ml-2 flex-shrink-0">
      <Heart className="h-6 w-6 text-gray-400 hover:text-gray-600" />
    </button>
  </div>
);

// 공통 매장 정보 섹션
const StoreInfoSection = ({ data }: { data: StoreDetail | StoreSummary }) => (
  <div className="space-y-2 rounded-lg border border-gray-200 p-4">
    <h3 className="font-semibold text-gray-900">매장 정보</h3>
    <div className="flex items-start space-x-2">
      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500" />
      <span className="text-sm text-gray-600">{data.address}</span>
    </div>
    <div className="flex items-center space-x-2">
      <Phone className="h-4 w-4 flex-shrink-0 text-gray-500" />
      <span className="text-sm text-gray-600">{data.phoneNumber}</span>
    </div>
  </div>
);

export const DetailCard = ({
  data,
  onRouteClick,
  onFavoriteToggle,
}: {
  data: StoreDetail;
  onRouteClick?: () => void;
  onFavoriteToggle?: () => void;
}) => (
  <div className="space-y-4 overflow-y-auto px-4 pb-6">
    <StoreCardHeader data={data} onRouteClick={onRouteClick} onFavoriteToggle={onFavoriteToggle} />
    <StoreInfoSection data={data} />
    <div className="m-4 space-y-2">
      <div>
        {data.benefitList.map((benefit) => (
          <div key={benefit.benefitId} className="flex flex-col space-y-2 pb-4">
            <h3 className="font-semibold">혜택 내용</h3>
            <div className="flex flex-col space-y-2">
              <MembershipGrade
                rank={benefit.minRank as "NONE" | "NORMAL" | "PREMIUM" | "VIP"}
                isVIPcock={benefit.type == "VIP"}
              />
              <span className="text-sm font-medium text-gray-900">{benefit.content}</span>
            </div>
            <div className="space-y-2 py-4">
              <h3 className="font-semibold">이용 안내</h3>
              <p className="text-sm font-medium text-gray-900">{benefit.manual}</p>
            </div>
            <p className="text-xs text-gray-600">이용 제한: {benefit.provisionCount}</p>
            <hr className="my-4 text-gray-200" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const SummaryCard = ({
  data,
  onRouteClick,
  onFavoriteToggle,
}: {
  data: StoreSummary;
  onRouteClick?: () => void;
  onFavoriteToggle?: () => void;
}) => (
  <div className="space-y-4 overflow-y-auto px-4 pb-6">
    <StoreCardHeader data={data} onRouteClick={onRouteClick} onFavoriteToggle={onFavoriteToggle} />
    <StoreInfoSection data={data} />
  </div>
);
