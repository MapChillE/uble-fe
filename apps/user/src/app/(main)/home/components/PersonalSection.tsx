"use client"
import SectionHeader from "@/components/ui/SectionHeader";
import DynamicCard from "@/components/ui/DynamicCard";
import { BrandContent } from "@/types/brand";
import useUserStore from "@/store/useUserStore";

const PersonalSection = () => {
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

  const nickname = useUserStore((state) => state.user.nickname);
  return (
    <div className="space-y-4">
      {nickname ? <SectionHeader title={`${nickname}님을 위한 혜택`} /> : <SectionHeader title="네트워크 문제가 발생했습니다." />}

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
