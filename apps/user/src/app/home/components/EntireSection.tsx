import React from 'react';
import DynamicCard from '@/components/ui/DynamicCard';
import { BrandContent } from '@/types/brand';
import SectionHeader from '@/components/ui/SectionHeader';

const EntireSection = () => {
  const testData: BrandContent = {
    brandId: 104,
    name: "스타벅스",
    category: "푸드",
    description: "커피를 팝니다.",
    imgUrl: "",
    isVIPcock: true,
    minRank: "NONE",
    bookmarked: true
  }
  return (
    <div className="space-y-4">
      <SectionHeader title='전체 제휴처' />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        <DynamicCard data={testData} variant='horizontal' />
        <DynamicCard data={testData} variant='horizontal' />
        <DynamicCard data={testData} variant='horizontal' />
        <DynamicCard data={testData} variant='horizontal' />
        <DynamicCard data={testData} variant='horizontal' />
        <DynamicCard data={testData} variant='horizontal' />
      </div>
    </div>
  );
};

export default EntireSection;