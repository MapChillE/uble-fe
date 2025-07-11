import React, { Fragment } from 'react';

import SectionHeader from '../../../components/ui/SectionHeader';
import DynamicCard from '../../../components/ui/DynamicCard';
import { BrandContent } from '@/types/brand';

const TimeSection = () => {
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
    <Fragment>
      <div className="space-y-4">
        <SectionHeader title='시간대별 추천' />
        <div
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <DynamicCard data={testData} />
          <DynamicCard data={testData} />
        </div>
      </div>
    </Fragment>
  );
};

export default TimeSection;