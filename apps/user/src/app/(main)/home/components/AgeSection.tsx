"use client";
import { useQuery } from "@tanstack/react-query";

import SectionHeader from "@/components/ui/SectionHeader";
import DynamicCard from "@/components/ui/DynamicCard";
import { fetchAgeRecommend } from "@/service/brand";
import SectionSkeleton from "./ui/SectionSkeleton";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import SectionError from "./ui/SectionError";
import EmptyRecommend from "./ui/EmptyRecommend";

const AgeSection = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ageRecommend"],
    queryFn: fetchAgeRecommend,
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

  const { ageRange, gender, recommendationsList } = data.data;

  return (
    <div className="space-y-4">
      <SectionHeader
        title={
          <>
            <span className="text-md">이런 제휴처는 어떠세요?</span>
            <br />#{ageRange}대 #{gender === "MALE" ? "남성" : "여성"}
          </>
        }
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
  );
};

export default AgeSection;
