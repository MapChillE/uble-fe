"use client";
import { useQuery } from "@tanstack/react-query";

import { Fragment, useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import DynamicCard from "@/components/ui/DynamicCard";
import { fetchTimeRecommend } from "@/service/brand";
import { useRouter } from "next/navigation";
import SectionSkeleton from "./ui/SectionSkeleton";
import SectionError from "./ui/SectionError";
import EmptyRecommend from "./ui/EmptyRecommend";

const TimeSection = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["timeRecommend"],
    queryFn: fetchTimeRecommend,
  });
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    // Skeleton UI
    return <SectionSkeleton />;
  }

  if (isError || !data) {
    // 사용자 친화적 에러 UI
    return <SectionError />;
  }

  const { recommendationsList } = data.data;
  return (
    <Fragment>
      <div className="space-y-4">
        <SectionHeader
          title="이시간 가장 인기있는 제휴처"
          isScroll
          Scrollref={scrollContainerRef}
        />
        <div
          className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          ref={scrollContainerRef}
        >
          {recommendationsList.length === 0 ? (
            <EmptyRecommend>
              아직 추천할 만한 제휴처가 없습니다.
              <br />곧 더 많은 추천 제휴처가 준비될 예정입니다!
            </EmptyRecommend>
          ) : (
            recommendationsList.map((item) => (
              <DynamicCard
                data={item}
                key={item.brandId}
                onClick={() => router.push(`/partnerships/${item.brandId}`)}
              />
            ))
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default TimeSection;
