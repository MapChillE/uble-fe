"use client";
import SearchInput from "@/components/common/SearchInput";
import { useState } from "react";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className="p-4">
      <SearchInput searchQuery={searchQuery} handleChange={handleChange} />
    </section>
  );
};

export default SearchSection;
