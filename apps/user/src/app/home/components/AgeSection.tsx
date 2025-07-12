import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import DynamicCard from '@/components/ui/DynamicCard';
import { BrandContent } from '@/types/brand';

const AgeSection = () => {
  const testData: BrandContent = {
    brandId: 104,
    name: "스타벅스",
    category: "푸드",
    description: "커피를 팝니다.",
    imgUrl: "",
    isVIPcock: true,
    minRank: "NONE",
    bookmarked: false
  }
  return (
    <div className="space-y-4">
      <SectionHeader title='20대같은 나이대별 추천' />
      <div
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <DynamicCard data={testData} />
      </div>
    </div>
  );
};

export default AgeSection;