"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import SearchInput from "@/components/common/SearchInput";
import { ArrowLeft, MapPin, Building, Tag } from "lucide-react";
import { toast } from "sonner";
import { getNearbyStores, GetNearbyStoresParams } from "@/service/store";
import { useLocationStore } from "@/store/useLocationStore";
import { fetchMapSearch } from "@/service/mapSearch";
import { DEFAULT_LOCATION } from "@/types/constants";
import { MapSuggestion } from "@/types/search";
import { DEFAULT_ZOOM_LEVEL } from "@/app/(main)/map/components/MapWithBaseLocation";

const SearchContainer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState<MapSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const currentLocation = useLocationStore((s) => s.currentLocation);

  const handleBack = () => {
    router.back();
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setSearchQuery(query);

    try {
      // 실제 검색 API 호출
      const results = await fetchMapSearch({
        keyword: query,
        latitude: currentLocation?.[1] ?? DEFAULT_LOCATION[1],
        longitude: currentLocation?.[0] ?? DEFAULT_LOCATION[0],
      });

      // 자동완성 결과를 검색 결과로 사용
      setSearchResults(results.suggestionList);
      setIsSearching(false);
    } catch (error) {
      console.error("검색 중 오류:", error);
      toast.error("검색 중 오류가 발생했습니다.");
      setIsSearching(false);
    }
  };

  const handleResultClick = async (result: MapSuggestion) => {
    // STORE 타입일 때는 지도로 이동
    if (!result.latitude || !result.longitude) {
      toast.error("위치 정보를 찾을 수 없습니다.");
      return;
    }

    if (result.type === "STORE") {
      const params = new URLSearchParams({
        lat: result.latitude.toString(),
        lng: result.longitude.toString(),
        storeId: result.id.toString(),
        searchQuery: searchQuery,
      });
      router.push(`/map?${params.toString()}`);
    } else if (result.type === "CATEGORY" || result.type === "BRAND") {
      const params = new URLSearchParams({
        lat: result.latitude.toString(),
        lng: result.longitude.toString(),
        zoom: DEFAULT_ZOOM_LEVEL.toString(),
        type: result.type,
        id: result.id.toString(),
        searchQuery: searchQuery,
      });

      router.push(`/map?${params.toString()}`);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set("q", e.target.value);
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
          <div className="divide-y divide-gray-100">
            {searchResults.map((result) => {
              // 타입별 아이콘과 색상 결정
              let icon = <MapPin className="h-5 w-5" />;
              let bgColor = "bg-blue-100";
              let iconColor = "text-blue-600";

              if (result.type === "CATEGORY") {
                icon = <Tag className="h-5 w-5" />;
                bgColor = "bg-green-100";
                iconColor = "text-green-600";
              } else if (result.type === "BRAND") {
                icon = <Building className="h-5 w-5" />;
                bgColor = "bg-purple-100";
                iconColor = "text-purple-600";
              }

              return (
                <div
                  key={result.id}
                  className="flex cursor-pointer items-start gap-3 px-4 py-4 hover:bg-gray-50"
                  onClick={() => handleResultClick(result)}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${bgColor}`}
                  >
                    <div className={iconColor}>{icon}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{result.suggestion}</h3>
                    {result.address && <p className="text-sm text-gray-500">{result.address}</p>}
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs text-blue-600">{result.category}</span>
                      <span className="text-xs text-gray-400">{result.type}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">검색어를 입력하거나 주변 검색을 해보세요</p>
              <p className="mt-1 text-sm text-gray-400">
                제휴처 이름이나 키워드로 검색할 수 있습니다 (ex{">"} 강남 맛집)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchContainer;
