"use client";
import { StoreDetail, StoreSummary } from "@/types/store";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { MapPin, Phone, Heart } from "lucide-react";
import MembershipGrade from "@/app/(main)/home/components/ui/MembershipGrade";
import Image from "next/image";
import FavoriteBtn from "@/components/FavoriteBtn";
import BarcodeContainer from "@/components/ui/BarcodeContainer";

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
  <div className="space-y-2 px-2 pt-4 md:px-4">
    {/* 이미지 + 즐겨찾기 버튼 */}
    <div className="flex items-start justify-between">
      <Image
        src={data.imageUrl || "/placeholder.svg"}
        alt={data.storeName}
        width={96}
        height={96}
        quality={100}
        className="flex-shrink-0 rounded object-fill"
      />
      <FavoriteBtn brandId={data.brandId} bookmarked={data.isBookmarked} variant="horizontal" />
    </div>

    {/* 아래 텍스트 영역 */}
    <div className="flex flex-col space-y-1">
      <Badge className="w-fit text-xs font-semibold">{data.category}</Badge>
      <h1 className="break-words text-2xl font-bold">{data.storeName}</h1>

      {/* 설명 + 길찾기 버튼 한 줄 정렬 */}
      <div className="flex w-full items-center justify-between">
        <p className="break-words text-sm text-gray-600">{data.description}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={onRouteClick}
          className="h-8 whitespace-nowrap px-3 text-xs hover:bg-gray-50"
        >
          <MapPin className="mr-1 h-3 w-3" />
          길찾기
        </Button>
      </div>
    </div>
  </div>
);

// 공통 매장 정보 섹션
const StoreInfoSection = ({ data }: { data: StoreDetail | StoreSummary }) => (
  <div className="mx-2 space-y-2 rounded-lg border border-gray-200 p-4 md:mx-4">
    <h3 className="text-lg font-semibold text-gray-900">매장 정보</h3>
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
  <div className="space-y-4 overflow-y-auto pb-4">
    <StoreCardHeader data={data} onRouteClick={onRouteClick} onFavoriteToggle={onFavoriteToggle} />
    <StoreInfoSection data={data} />
    <div className="m-2 space-y-2 md:m-4">
      <div>
        {data.benefitList.map((benefit, idx) => (
          <div key={benefit.benefitId} className="flex flex-col space-y-2 pb-2">
            <h3 className="text-lg font-semibold">혜택 내용</h3>
            <div className="flex flex-col space-y-2">
              <MembershipGrade rank={benefit.minRank} isVIPcock={benefit.type === "VIP"} />
              <span className="text-sm font-medium text-gray-900">{benefit.content}</span>
            </div>
            <div className="space-y-2 py-4">
              <h3 className="text-lg font-semibold">이용 안내</h3>
              <p className="text-sm font-medium text-gray-900">
                {benefit.manual.split("\n").map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
            <p className="text-xs text-gray-600">이용 제한: {benefit.provisionCount}</p>
            <hr className="my-4 text-gray-200" />
            {data.benefitList.length - 1 === idx && (
              <BarcodeContainer storeId={data.storeId} isVIPcock={benefit.type === "VIP"} />
            )}
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
  <div className="space-y-4 overflow-y-auto pb-20">
    <StoreCardHeader data={data} onRouteClick={onRouteClick} onFavoriteToggle={onFavoriteToggle} />
    <StoreInfoSection data={data} />
  </div>
);
