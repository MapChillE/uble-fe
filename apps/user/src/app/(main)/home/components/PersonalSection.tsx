import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import DynamicCard from "@/components/ui/DynamicCard";
import { BrandContent } from "@/types/brand";

const PersonalSection = () => {
  const testData: BrandContent = {
    brandId: 104,
    name: "스타벅스",
    category: "푸드",
    description: "커피를 팝니다.",
    imgUrl: "",
    isVIPcock: true,
    minRank: "NONE",
    bookmarked: false,
  };
  return (
    <div className="space-y-4">
      <SectionHeader title="개인별 추천" />
      <div
        className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <DynamicCard data={testData} />
      </div>
    </div>
  );
};

export default PersonalSection;
