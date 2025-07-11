"use client";

import { Input } from "@workspace/ui/components/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchInput() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="제휴처 검색"
          className="border border-gray-300 pl-10 shadow-none"
          value={searchQuery}
          onChange={handleChange}
        />
      </div>
    </section>
  );
}
