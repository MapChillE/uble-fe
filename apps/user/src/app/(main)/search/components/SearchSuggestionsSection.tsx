"use client";

import React, { memo } from "react";
import RecentSearchesSection from "./RecentSearchesSection";
import TrendingSearchesSection from "./TrendingSearchesSection";

interface SearchSuggestionsSectionProps {
  onSearchClick: (keyword: string) => void;
}

const SearchSuggestionsSection = ({ onSearchClick }: SearchSuggestionsSectionProps) => {
  return (
    <div className="space-y-4">
      <RecentSearchesSection onSearchClick={onSearchClick} />
      <TrendingSearchesSection onSearchClick={onSearchClick} />
    </div>
  );
};

export default memo(SearchSuggestionsSection);
