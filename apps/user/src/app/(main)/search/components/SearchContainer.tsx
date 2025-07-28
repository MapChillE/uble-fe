"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import SearchInput from "@/components/common/SearchInput";
import CategoryBar from "@/components/common/CategoryBar";
import { Category } from "@/types/category";
import { ArrowLeft, MapPin, Search, Building, Tag } from "lucide-react";
import { toast } from "sonner";
import { getNearbyStores, GetNearbyStoresParams } from "@/service/store";
import { useLocationStore } from "@/store/useLocationStore";
import { fetchMapSearch } from "@/service/mapSearch";
import { DEFAULT_LOCATION } from "@/types/constants";
import { MapSuggestion } from "@/types/search";

const SearchContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    categoryId: 0,
    categoryName: "전체",
  });
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

  const handleMapSearch = async () => {
    if (!currentLocation) {
      toast.error("현재 위치를 불러올 수 없습니다.");
      return;
    }

    setIsSearching(true);

    try {
      // 실제 지도 검색 API 호출
      const results = await getNearbyStores({
        swLat: currentLocation[1] - 0.01,
        swLng: currentLocation[0] - 0.01,
        neLat: currentLocation[1] + 0.01,
        neLng: currentLocation[0] + 0.01,
        ...(selectedCategory.categoryId !== 0 && {
          categoryId: selectedCategory.categoryId as number,
        }),
      });

      // StoreContent를 MapSuggestion 형태로 변환
      const formattedResults: MapSuggestion[] = results.map((store) => ({
        suggestion: store.storeName,
        category: store.category || "기타",
        id: store.storeId,
        type: "STORE",
        longitude: store.longitude,
        latitude: store.latitude,
        address: "주소 정보 없음", // StoreContent에는 address가 없으므로 기본값 사용
      }));

      setSearchResults(formattedResults);
    } catch (error) {
      console.error("지도 검색 중 오류:", error);
      toast.error("주변 매장을 불러오지 못했습니다.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleResultClick = async (result: MapSuggestion) => {
    // STORE 타입일 때는 지도로 이동
    if (result.type === "STORE" && result.latitude && result.longitude) {
      const params = new URLSearchParams({
        lat: result.latitude.toString(),
        lng: result.longitude.toString(),
        storeId: result.id.toString(),
        searchQuery: searchQuery,
      });
      router.push(`/map?${params.toString()}`);
    } else if (result.type === "CATEGORY" || result.type === "BRAND") {
      // CATEGORY나 BRAND 타입일 때는 해당 필터로 주변 검색 실행
      if (!currentLocation) {
        toast.error("현재 위치를 불러올 수 없습니다.");
        return;
      }

      setIsSearching(true);

      try {
        const searchParams: GetNearbyStoresParams = {
          swLat: currentLocation[1] - 0.01,
          swLng: currentLocation[0] - 0.01,
          neLat: currentLocation[1] + 0.01,
          neLng: currentLocation[0] + 0.01,
        };

        // 타입에 따라 필터 추가
        if (result.type === "CATEGORY") {
          searchParams.categoryId = result.id;
        } else if (result.type === "BRAND") {
          searchParams.brandId = result.id;
        }

        const results = await getNearbyStores(searchParams);

        // StoreContent를 MapSuggestion 형태로 변환
        const formattedResults: MapSuggestion[] = results.map((store) => ({
          suggestion: store.storeName,
          category: store.category || "기타",
          id: store.storeId,
          type: "STORE",
          longitude: store.longitude,
          latitude: store.latitude,
          address: "주소 정보 없음",
        }));

        setSearchResults(formattedResults);
        toast.success(`${result.suggestion} 관련 매장을 찾았습니다.`);
      } catch (error) {
        console.error("카테고리/브랜드 검색 중 오류:", error);
        toast.error("해당 카테고리/브랜드의 매장을 찾을 수 없습니다.");
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  // const handleCategoryChange = (category: Category) => {
  //   setSelectedCategory(category);
  //   // 카테고리 변경 시 현재 검색 타입에 따라 재검색
  //   if (currentLocation) {
  //     handleMapSearch();
  //   } else if (searchQuery) {
  //     handleSearch(searchQuery);
  //   }
  // };

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
        {
          isSearching ? (
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
                  제휴처 이름이나 주소로 검색할 수 있습니다
                </p>
              </div>
            </div>
          )
          // )
        }
      </div>
    </div>
  );
};

export default SearchContainer;
