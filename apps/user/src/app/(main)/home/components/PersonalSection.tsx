import React from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import DynamicCard from "@/components/ui/DynamicCard";

const PersonalSection = () => {
  return (
    <div className="space-y-4">
      <SectionHeader title="개인별 추천" />
      <div
        className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <DynamicCard />
      </div>
    </div>
  );
};

export default PersonalSection;
