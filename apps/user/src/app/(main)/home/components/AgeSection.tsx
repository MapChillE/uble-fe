"use client";
import SectionHeader from "@/components/ui/SectionHeader";
import DynamicCard from "@/components/ui/DynamicCard";
import { useQuery } from "@tanstack/react-query";
import { fetchAgeRecommend } from "@/service/brand";
import SectionSkeleton from "./SectionSkeleton";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import SectionError from "./SectionError";

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
        title={`${ageRange}대 ${gender === "MALE" ? "남성" : "여성"} 추천 제휴처`}
        isScroll
        ref={scrollContainerRef}
      />
      <div
        className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        ref={scrollContainerRef}
      >
        {recommendationsList.map((item) => (
          <DynamicCard
            data={item}
            key={item.brandId}
            onClick={() => router.push(`/partnerships/${item.brandId}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default AgeSection;
