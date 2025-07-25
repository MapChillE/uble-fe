"use client";
import SectionHeader from "@/components/ui/SectionHeader";
import DynamicCard from "@/components/ui/DynamicCard";
import { BrandContent } from "@/types/brand";
import { useQuery } from "@tanstack/react-query";
import { fetchAgeRecommend } from "@/service/brand";

const AgeSection = () => {
  const testData: BrandContent = {
    brandId: 104,
    name: "스타벅스",
    category: "푸드",
    description: "커피를 팝니다.",
    imgUrl: "",
    isVIPcock: true,
    minRank: "NONE",
    isBookmarked: false,
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ageRecommend"],
    queryFn: fetchAgeRecommend,
  });
  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !data) return <div>에러</div>;
  const { ageRange, gender, recommendationsList } = data.data;
  return (
    <div className="space-y-4">
      <SectionHeader title={`${ageRange}대 ${gender === "MALE" ? "남성" : "여성"} 추천 제휴처`} />
      <div
        className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {recommendationsList.map((item) => (
          <DynamicCard data={item} key={item.brandId} />
        ))}
      </div>
    </div>
  );
};

export default AgeSection;
