import React from 'react';

import SectionHeader from './ui/SectionHeader';
import DynamicCard from './ui/DynamicCard';

const TimeSection = () => {
  return (
    <div className="space-y-4">
      <SectionHeader title='시간대별 추천' />
      <div
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <DynamicCard />
      </div>
    </div>
  );
};

export default TimeSection;