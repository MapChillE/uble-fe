import { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Coordinates } from "@/types/map";

interface UseMapHandlersProps {
  dispatch: (action: any) => void;
  searchType: string | null;
  searchLocation: Coordinates | null;
  searchStoreId: number | null;
  searchId: number | null;
  selectedCategory: { categoryId: number | "SEASON" | "VIP" | "LOCAL" };
  state: { center: Coordinates; bounds: naver.maps.LatLngBounds | null; zoom: number };
  setShowSearchBtn: (show: boolean) => void;
  setHasSearched: (searched: boolean) => void;
  hasSearched: boolean;
  onMapCenterChange?: (center: Coordinates) => void;
  onExitSearchMode?: () => void;
  fetchPins: (
    center: Coordinates,
    bounds: naver.maps.LatLngBounds,
    category: number | "SEASON" | "VIP" | "LOCAL",
    brandId?: number,
    zoom?: number
  ) => Promise<void>;
}

export const useMapHandlers = ({
  dispatch,
  searchType,
  searchLocation,
  searchStoreId,
  searchId,
  selectedCategory,
  state,
  setShowSearchBtn,
  setHasSearched,
  hasSearched,
  onMapCenterChange,
  onExitSearchMode,
  fetchPins,
}: UseMapHandlersProps) => {
  // bounds 변경 핸들러 (디바운스 적용)
  const handleBoundsChange = useDebouncedCallback(
    (bounds: naver.maps.LatLngBounds, center: Coordinates) => {
      dispatch({ type: "SET_BOUNDS", payload: bounds });
      dispatch({ type: "SET_CENTER", payload: center });

      // 부모 컴포넌트로 현재 지도 center 전달
      onMapCenterChange?.(center);

      // 검색 모드가 있을 때 버튼 표시 로직
      if (searchType) {
        if (hasSearched) {
          // 이미 주변 매장 보기를 실행한 상태에서 bounds가 변경되면 다시 검색 가능하도록 리셋
          setHasSearched(false);
          setShowSearchBtn(true);
        } else {
          setShowSearchBtn(true);
        }
      } else {
        setShowSearchBtn(false);
      }
    },
    150
  );

  // 줌 변경 핸들러 (디바운스 적용)
  const handleZoomChange = useDebouncedCallback((zoom: number) => {
    dispatch({ type: "SET_ZOOM", payload: zoom });
    if (searchStoreId && searchLocation) {
      setShowSearchBtn(false);
      return;
    }
  }, 150);

  // "현 지도에서 검색" 버튼 클릭 핸들러
  const handleSearchHere = useCallback(() => {
    if (state.bounds && state.center) {
      setShowSearchBtn(false);
      setHasSearched(false); // 수동 검색 시 리셋
      if (searchType === "BRAND" && searchId) {
        fetchPins(state.center, state.bounds, 0, searchId, state.zoom);
      } else {
        fetchPins(state.center, state.bounds, selectedCategory.categoryId, undefined, state.zoom);
      }
    }
  }, [
    state.bounds,
    state.center,
    state.zoom,
    searchType,
    searchId,
    selectedCategory.categoryId,
    setShowSearchBtn,
    setHasSearched,
    fetchPins,
  ]);

  // "주변 매장 보기" 버튼 클릭 핸들러
  const handleShowNearbyStores = useCallback(() => {
    if (state.bounds) {
      setShowSearchBtn(false);
      setHasSearched(true); // 주변 매장 보기 실행 시 검색 완료 상태로 설정

      // 현재 지도 중심을 검색 중심점으로 사용
      const searchCenter = state.center;

      // 검색 타입에 따라 다른 동작
      if (searchType === "STORE" && searchStoreId) {
        fetchPins(searchCenter, state.bounds, selectedCategory.categoryId, undefined, state.zoom);
      } else if (searchType === "BRAND" && searchId) {
        fetchPins(searchCenter, state.bounds, 0, searchId, state.zoom);
      } else if (searchType === "CATEGORY" && searchId) {
        fetchPins(searchCenter, state.bounds, searchId, undefined, state.zoom);
      } else {
        fetchPins(searchCenter, state.bounds, selectedCategory.categoryId, undefined, state.zoom);
      }
    }
  }, [
    searchLocation,
    state.bounds,
    state.center,
    state.zoom,
    searchType,
    searchStoreId,
    searchId,
    selectedCategory.categoryId,
    setShowSearchBtn,
    setHasSearched,
    onExitSearchMode,
    fetchPins,
  ]);

  return {
    handleBoundsChange,
    handleZoomChange,
    handleSearchHere,
    handleShowNearbyStores,
  };
};
