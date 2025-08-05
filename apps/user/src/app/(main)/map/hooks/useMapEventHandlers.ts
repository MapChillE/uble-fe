import { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Coordinates } from "@/types/map";

interface UseMapEventHandlersProps {
  dispatch: (action: any) => void;
  searchType: string | null;
  searchLocation: Coordinates | null;
  searchStoreId: number | null;
  setShowSearchBtn: (show: boolean) => void;
  onMapCenterChange?: (center: Coordinates) => void;
}

export const useMapEventHandlers = ({
  dispatch,
  searchType,
  searchLocation,
  searchStoreId,
  setShowSearchBtn,
  onMapCenterChange,
}: UseMapEventHandlersProps) => {
  // bounds 변경 핸들러 (디바운스 적용)
  const handleBoundsChange = useDebouncedCallback(
    (bounds: naver.maps.LatLngBounds, center: Coordinates) => {
      dispatch({ type: "SET_BOUNDS", payload: bounds });
      dispatch({ type: "SET_CENTER", payload: center });

      // 부모 컴포넌트로 현재 지도 center 전달
      onMapCenterChange?.(center);

      // 검색 모드가 있을 때만 "현재 위치에서 검색" 버튼 표시
      if (searchType && searchLocation) {
        setShowSearchBtn(true);
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

  return {
    handleBoundsChange,
    handleZoomChange,
  };
};
