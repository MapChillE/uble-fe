import { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Coordinates } from "@/types/map";
import { NaverMapRef } from "@/app/(main)/map/components/NaverMap";
import { DEFAULT_ZOOM_LEVEL } from "@/types/constants";

const mapId = "naver-map";
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
  mapRef: React.RefObject<NaverMapRef | null>;
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
  mapRef,
}: UseMapHandlersProps) => {
  // bounds 변경 핸들러 (디바운스 적용)
  const handleBoundsChange = useDebouncedCallback(
    (bounds: naver.maps.LatLngBounds, center: Coordinates) => {
      dispatch({ type: "SET_BOUNDS", payload: bounds });
      dispatch({ type: "SET_CENTER", payload: center });

      // 부모 컴포넌트로 현재 지도 center 전달
      onMapCenterChange?.(center);

      // bounds가 변경되면 항상 "현 지도에서 검색" 버튼 표시
      setShowSearchBtn(true);
      // 검색 모드가 있었고 이미 검색을 완료한 상태라면 리셋
      if (searchType && hasSearched) {
        setHasSearched(false);
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
    // 실시간으로 현재 지도의 바운드와 중심 좌표를 가져옴
    const currentBounds = mapRef.current?.getCurrentBounds();
    const currentCenter = mapRef.current?.getCurrentCenter();
    const currentZoom = mapRef.current?.getCurrentZoom() ?? state.zoom;

    if (currentBounds && currentCenter) {
      setShowSearchBtn(false);
      setHasSearched(false);

      if (searchType === "BRAND" && searchId) {
        fetchPins(currentCenter, currentBounds, 0, searchId, currentZoom);
      } else {
        fetchPins(
          currentCenter,
          currentBounds,
          selectedCategory.categoryId,
          undefined,
          currentZoom
        );
      }
    }
  }, [
    searchType,
    searchId,
    selectedCategory.categoryId,
    setShowSearchBtn,
    setHasSearched,
    fetchPins,
  ]);

  // "주변 매장 보기" 버튼 클릭 핸들러
  const handleShowNearbyStores = useCallback(() => {
    // 실시간으로 현재 지도의 바운드와 중심 좌표를 가져옴
    const currentBounds = mapRef.current?.getCurrentBounds();
    const currentCenter = mapRef.current?.getCurrentCenter();
    const currentZoom = mapRef.current?.getCurrentZoom() ?? state.zoom;

    if (currentBounds && currentCenter) {
      setShowSearchBtn(false);
      setHasSearched(true); // 주변 매장 보기 실행 시 검색 완료 상태로 설정

      // 검색 타입에 따라 다른 동작
      if (searchType === "STORE" && searchStoreId) {
        fetchPins(
          currentCenter,
          currentBounds,
          selectedCategory.categoryId,
          undefined,
          currentZoom
        );
      } else if (searchType === "BRAND" && searchId) {
        fetchPins(currentCenter, currentBounds, 0, searchId, currentZoom);
      } else if (searchType === "CATEGORY" && searchId) {
        fetchPins(currentCenter, currentBounds, searchId, undefined, currentZoom);
      } else {
        fetchPins(
          currentCenter,
          currentBounds,
          selectedCategory.categoryId,
          undefined,
          currentZoom
        );
      }
    }
  }, [
    searchType,
    searchStoreId,
    searchId,
    selectedCategory.categoryId,
    setShowSearchBtn,
    setHasSearched,
    fetchPins,
  ]);

  return {
    handleBoundsChange,
    handleZoomChange,
    handleSearchHere,
    handleShowNearbyStores,
  };
};
