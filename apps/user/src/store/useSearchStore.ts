import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchStore {
  recentSearches: string[];
  addRecentSearch: (search: string) => void;
  removeRecentSearch: (search: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set, get) => ({
      recentSearches: [],
      addRecentSearch: (search: string) => {
        const { recentSearches } = get();
        const trimmedSearch = search.trim();
        if (!trimmedSearch) return;

        // 중복 제거하고 최신 검색어를 맨 앞에 추가
        const filtered = recentSearches.filter((s) => s !== trimmedSearch);
        const newSearches = [trimmedSearch, ...filtered].slice(0, 10); // 최대 10개만 유지

        set({ recentSearches: newSearches });
      },
      removeRecentSearch: (search: string) => {
        const { recentSearches } = get();
        set({
          recentSearches: recentSearches.filter((s) => s !== search),
        });
      },
      clearRecentSearches: () => {
        set({ recentSearches: [] });
      },
    }),
    {
      name: "search-store",
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    }
  )
);
