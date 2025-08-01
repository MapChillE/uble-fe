"use client";

import RecentSearchesSection from "./RecentSearchesSection";
import TrendingSearchesSection from "./TrendingSearchesSection";

interface SearchSuggestionsSectionProps {
  onSearchClick: (keyword: string) => void;
}

export default function SearchSuggestionsSection({ onSearchClick }: SearchSuggestionsSectionProps) {
  return (
    <div className="space-y-4">
      <RecentSearchesSection onSearchClick={onSearchClick} />
      <TrendingSearchesSection onSearchClick={onSearchClick} />
    </div>
  );
}
