"use client";

import CurrentLocationMap from "@/app/(main)/map/components/CurrentLocationMap";
import SearchInput from "@/components/common/SearchInput";
import CategoryBar from "@/components/common/CategoryBar";
import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Star } from "lucide-react";
import { Category } from "@/types/constants";

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="relative h-screen w-full">
      {/* 지도 */}
      <CurrentLocationMap zoom={15} category={selectedCategory} />

      {/* 상단 Search */}
      <div className="absolute left-4 right-4 top-4 z-10">
        <SearchInput searchQuery={searchQuery} handleChange={handleSearchChange} />
      </div>

      {/* 카테고리 바 */}
      <CategoryBar selected={selectedCategory} onSelect={setSelectedCategory} />

      {/* 내 장소 버튼 */}
      <div className="top-30 absolute right-4 z-10">
        <Button variant="circle_outline" size="icon" aria-label="즐겨찾기">
          <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
        </Button>
      </div>
    </div>
  );
}
