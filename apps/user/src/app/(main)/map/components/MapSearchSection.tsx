"use client";
import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "@/components/common/SearchInput";
import { useState, useEffect } from "react";

const MapSearchSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showBackButton, setShowBackButton] = useState(false);

  // URL 파라미터에서 검색어 확인
  useEffect(() => {
    const query = searchParams.get("searchQuery");
    if (query) {
      setSearchQuery(query);
      setShowBackButton(true);
    } else {
      setSearchQuery("");
      setShowBackButton(false);
    }
  }, [searchParams]);

  const handleInputClick = () => {
    router.push("/search");
  };

  const handleBackClick = () => {
    // 검색 페이지로 이동
    router.push("/search");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className="px-4 py-3">
      <div onClick={handleInputClick} className="cursor-pointer">
        <SearchInput
          searchQuery={searchQuery}
          onChange={handleInputChange}
          onBackClick={handleBackClick}
          showBackButton={showBackButton}
          placeholder="검색어를 입력하세요"
        />
      </div>
    </section>
  );
};

export default MapSearchSection;
