"use client";

import React, { memo } from "react";
import { X } from "lucide-react";
import { useSearchStore } from "@/store/useSearchStore";

interface RecentSearchesSectionProps {
  onSearchClick: (keyword: string) => void;
}

const RecentSearchesSection = ({ onSearchClick }: RecentSearchesSectionProps) => {
  const { recentSearches, removeRecentSearch, clearRecentSearches } = useSearchStore();

  return (
    <div className="px-4 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">최근 검색어</h3>
        <button onClick={clearRecentSearches} className="text-sm text-gray-500 hover:text-gray-700">
          전체 삭제
        </button>
      </div>
      {recentSearches.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {recentSearches.map((search, index) => (
            <div
              key={`${search}-${index}`}
              className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-2"
            >
              <button
                onClick={() => onSearchClick(search)}
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                {search}
              </button>
              <button
                onClick={() => removeRecentSearch(search)}
                className="ml-1 rounded-full p-0.5 hover:bg-gray-200"
              >
                <X className="h-3 w-3 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(RecentSearchesSection);
