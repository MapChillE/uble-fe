import { useCallback } from "react";
import { Coordinates } from "@/types/map";
import { fetchStorePins } from "@/utils/fetchStorePins";
import { Pin } from "@/app/(main)/map/components/NaverMap";

interface SearchParams {
  searchType: string | null;
  searchId: number | null;
  searchStoreId: number | null;
  searchLocation: Coordinates | null;
  selectedCategory: { categoryId: number | "SEASON" | "VIP" | "LOCAL" };
  baseLocation: Coordinates;
}

interface UseSearchLogicProps {
  searchParams: SearchParams;
  setShowSearchBtn: (show: boolean) => void;
  setHasSearched: (searched: boolean) => void;
  dispatch: (action: any) => void;
  onPinClick?: (pin: Pin) => void;
}

export const useSearchLogic = ({
  searchParams,
  setShowSearchBtn,
  setHasSearched,
  dispatch,
  onPinClick,
}: UseSearchLogicProps) => {
  const { searchType, searchId, searchStoreId, searchLocation, selectedCategory, baseLocation } =
    searchParams;

  // 검색 타입별 fetchPins 실행
  const executeSearch = useCallback(
    async (center: Coordinates, bounds: naver.maps.LatLngBounds, zoom: number) => {
      let pins: Pin[] = [];

      try {
        if (searchStoreId && searchLocation) {
          // STORE 타입: 특정 매장만 표시
          pins = [
            {
              id: searchStoreId,
              coords: searchLocation,
              name: " ",
              category: "store",
              type: "store",
            },
          ];
        } else if (searchType === "BRAND" && searchId) {
          // BRAND 타입: 브랜드 매장들 표시
          pins = await fetchStorePins(center, bounds, 0, zoom, baseLocation, searchId);
        } else if (searchType === "CATEGORY" && searchId) {
          // CATEGORY 타입: 카테고리 매장들 표시
          pins = await fetchStorePins(center, bounds, searchId, zoom, baseLocation);
        } else {
          // 일반 모드: 선택된 카테고리 매장들 표시
          pins = await fetchStorePins(
            center,
            bounds,
            selectedCategory.categoryId,
            zoom,
            baseLocation
          );
        }

        dispatch({ type: "SET_PINS", payload: pins });
        setShowSearchBtn(false);
        setHasSearched(true);

        // STORE 타입인 경우 drawer 열기
        if (searchType === "STORE" && searchStoreId && onPinClick) {
          const storePin: Pin = {
            id: searchStoreId,
            coords: center,
            name: "",
            category: "store",
            type: "store",
          };
          onPinClick(storePin);
        }
      } catch (error) {
        dispatch({ type: "SET_PINS", payload: [] });
      }
    },
    [
      searchType,
      searchId,
      searchStoreId,
      searchLocation,
      selectedCategory.categoryId,
      baseLocation,
      dispatch,
      setShowSearchBtn,
      setHasSearched,
      onPinClick,
    ]
  );

  // 검색 상태 리셋
  const resetSearchState = useCallback(() => {
    setShowSearchBtn(false);
    setHasSearched(false);
  }, [setShowSearchBtn, setHasSearched]);

  return {
    executeSearch,
    resetSearchState,
  };
};
