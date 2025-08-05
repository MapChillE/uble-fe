import { useEffect } from "react";
import { Coordinates } from "@/types/map";
import { createBoundsFromCenterAndZoom } from "@/utils/mapBounds";
import { DEFAULT_ZOOM_LEVEL } from "@/types/constants";
import { Pin } from "@/app/(main)/map/components/NaverMap";

interface UseMapInitializationProps {
  currentLocation: Coordinates | null;
  isInitialized: boolean;
  setIsInitialized: (initialized: boolean) => void;
  searchLocation: Coordinates | null;
  searchType: string | null;
  searchId: number | null;
  searchStoreId: number | null;
  selectedCategory: { categoryId: number | "SEASON" | "VIP" | "LOCAL" };
  state: { zoom: number };
  dispatch: (action: any) => void;
  fetchPins: (
    center: Coordinates,
    bounds: naver.maps.LatLngBounds,
    category: number | "SEASON" | "VIP" | "LOCAL",
    brandId?: number,
    zoom?: number
  ) => Promise<void>;
  onPinClick: (pin: Pin) => void;
  lastBaseLocationRef: React.MutableRefObject<Coordinates>;
}

export const useMapInitialization = ({
  currentLocation,
  isInitialized,
  setIsInitialized,
  searchLocation,
  searchType,
  searchId,
  searchStoreId,
  selectedCategory,
  state,
  dispatch,
  fetchPins,
  onPinClick,
  lastBaseLocationRef,
}: UseMapInitializationProps) => {
  useEffect(() => {
    if (currentLocation && !isInitialized) {
      const initialBounds = createBoundsFromCenterAndZoom(currentLocation, DEFAULT_ZOOM_LEVEL);
      if (initialBounds) {
        dispatch({ type: "SET_BOUNDS", payload: initialBounds });
        dispatch({ type: "SET_CENTER", payload: currentLocation });

        // 검색 모드가 있으면 검색 위치에서 검색, 없으면 현재 위치에서 전체 카테고리 검색
        if (searchLocation && searchType) {
          // 검색 모드: 검색 위치로 이동하고 검색 실행
          dispatch({ type: "SET_CENTER", payload: searchLocation });
          const searchBounds = createBoundsFromCenterAndZoom(searchLocation, DEFAULT_ZOOM_LEVEL);
          if (searchBounds) {
            dispatch({ type: "SET_BOUNDS", payload: searchBounds });
            if (searchType === "BRAND" && searchId) {
              fetchPins(searchLocation, searchBounds, 0, searchId, state.zoom);
            } else if (searchType === "CATEGORY" && searchId) {
              fetchPins(searchLocation, searchBounds, searchId, undefined, state.zoom);
            } else if (searchType === "STORE" && searchStoreId) {
              // STORE 타입: 매장 핀만 생성하고 drawer 열기 (전체 검색 실행하지 않음)
              const storePin: Pin = {
                id: searchStoreId,
                coords: searchLocation,
                name: "",
                category: "store",
                type: "store",
              };
              // 매장 핀만 dispatch
              dispatch({ type: "SET_PINS", payload: [storePin] });
              // drawer 열기
              onPinClick(storePin);
            }
          }
        } else {
          // 일반 모드: 현재 위치에서 전체 카테고리 검색
          fetchPins(
            currentLocation,
            initialBounds,
            selectedCategory.categoryId,
            undefined,
            state.zoom
          );
        }

        lastBaseLocationRef.current = currentLocation;
        setIsInitialized(true);
      }
    }
  }, [
    currentLocation,
    isInitialized,
    setIsInitialized,
    searchLocation,
    searchType,
    searchId,
    searchStoreId,
    selectedCategory.categoryId,
    state.zoom,
    dispatch,
    fetchPins,
    onPinClick,
    lastBaseLocationRef,
  ]);
};
