"use client";
import { useRouter } from "next/navigation";
import SearchInput from "@/components/common/SearchInput";
import { useState } from "react";

const MapSearchSection = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputClick = () => {
    // router.push("/search");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className="p-4">
      <div onClick={handleInputClick} className="cursor-pointer">
        <SearchInput
          searchQuery={searchQuery}
          onChange={handleInputChange}
          placeholder="매장 검색"
        />
      </div>
    </section>
  );
};

export default MapSearchSection;
