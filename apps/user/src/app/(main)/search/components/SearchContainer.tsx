"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@workspace/ui/components/button";
import SearchInput from "@/components/common/SearchInput";
import MapSearchResult from "@/app/(main)/map/components/MapSearchResult";
import { useLocationStore } from "@/store/useLocationStore";
import { fetchMapSearch } from "@/service/mapSearch";
import { DEFAULT_LOCATION, DEFAULT_ZOOM_LEVEL } from "@/types/constants";
import { MapSuggestion } from "@/types/search";

const SearchContainer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MapSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const currentLocation = useLocationStore((s) => s.currentLocation);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const debouncedSearch = useDebouncedCallback((query: string) => {
    if (query.trim()) {
      handleSearch(query);
    } else {
      setSearchResults([]);
    }
  }, 200);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery]);

  const handleBack = () => {
    router.back();
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setSearchQuery(query);

    try {
      const results = await fetchMapSearch({
        keyword: query,
        latitude: currentLocation?.[1] ?? DEFAULT_LOCATION[1],
        longitude: currentLocation?.[0] ?? DEFAULT_LOCATION[0],
      });

      setSearchResults(results.suggestionList);
    } catch (error) {
      console.error("검색 중 오류:", error);
      toast.error("검색 중 오류가 발생했습니다.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleResultClick = async (result: MapSuggestion) => {
    if (!result.latitude || !result.longitude) {
      toast.error("위치 정보를 찾을 수 없습니다.");
      return;
    }

    const params = new URLSearchParams({
      lat: result.latitude.toString(),
      lng: result.longitude.toString(),
      searchQuery: searchQuery,
    });

    if (result.type === "STORE") {
      params.set("storeId", result.id.toString());
      router.push(`/map?${params.toString()}`);
    } else if (result.type === "CATEGORY" || result.type === "BRAND") {
      params.set("zoom", DEFAULT_ZOOM_LEVEL.toString());
      params.set("type", result.type);
      params.set("id", result.id.toString());
      router.push(`/map?${params.toString()}`);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* 헤더 */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
        <Button variant="ghost" size="sm" onClick={handleBack} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="flex-1">
          <SearchInput
            ref={inputRef}
            searchQuery={searchQuery}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchKeyDown}
            placeholder="검색어를 입력해보세요"
          />
        </div>
      </div>

      {/* 검색 결과 */}
      <div className="flex-1 overflow-y-auto">
        {isSearching ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-gray-500">검색 중...</div>
          </div>
        ) : searchResults.length > 0 ? (
          <MapSearchResult
            searchResults={searchResults}
            onResultClick={(result) => handleResultClick(result as MapSuggestion)}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-gray-500">검색 결과가 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchContainer;
