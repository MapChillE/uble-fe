import React from 'react';
import SectionHeader from '../../../components/ui/SectionHeader';
import DynamicCard from '../../../components/ui/DynamicCard';

const PersonalSection = () => {
  // section 하나당 하나의 api 응답을 가짐
  // props로 요청주소를 보내면 그거에 해당하는 카드 리스트 출력하게?
  return (
    <div className="space-y-4">
      <SectionHeader title='개인별 추천' />
      <div
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <DynamicCard />
      </div>
    </div>
  );
};

export default PersonalSection;