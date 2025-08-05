"use client";

import { useEffect, useMemo, useState, useCallback, useRef, useReducer } from "react";
import { useDebouncedCallback } from "use-debounce";
import NaverMap, { Pin } from "@/app/(main)/map/components/NaverMap";
import { Category } from "@/types/category";
import { useBaseLocation } from "@/hooks/map/useBaseLocation";
import { useLocationStore } from "@/store/useLocationStore";
import { useMapInitialization } from "@/app/(main)/map/hooks/useMapInitialization";
import { useMapEffects } from "@/app/(main)/map/hooks/useMapEffects";
import { useMapHandlers } from "@/app/(main)/map/hooks/useMapHandlers";
import { DEFAULT_LOCATION, DEFAULT_ZOOM_LEVEL } from "@/types/constants";
import { Coordinates } from "@/types/map";
import { mapReducer, MapState, MapAction } from "@/app/(main)/map/reducers/mapReducer";
import { fetchStorePins } from "@/utils/fetchStorePins";
import { createBoundsFromCenterAndZoom } from "@/utils/mapBounds";
import SearchModeBtn from "./SearchModeBtn";
import { useCurrentLocation } from "@/hooks/map/useCurrentLocation";

interface MapWithBaseLocationProps {
  selectedCategory: Category;
  onPinClick: (pin: Pin) => void;
  searchLocation?: Coordinates | null;
  searchStoreId?: number | null;
  searchType?: string | null;
  searchId?: number | null;
  onExitSearchMode?: () => void;
  onMapCenterChange?: (center: Coordinates) => void;
}

export default function MapWithBaseLocation({
  selectedCategory,
  onPinClick,
  searchLocation,
  searchStoreId,
  searchType,
  searchId,
  onExitSearchMode,
  onMapCenterChange,
}: MapWithBaseLocationProps) {
  const currentLocation = useLocationStore((s) => s.currentLocation);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [isExitingSearchMode, setIsExitingSearchMode] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // 검색 완료 상태 추적
  const [isChangingBaseLocation, setIsChangingBaseLocation] = useState(false); // 내 장소 변경 중 플래그
  const [isMyPlaceButtonClick, setIsMyPlaceButtonClick] = useState(false); // 내 장소 버튼 클릭 플래그
  const baseLocation = useBaseLocation(currentLocation || DEFAULT_LOCATION);
  const lastBaseLocationRef = useRef<Coordinates>(baseLocation);
  const selectedPlaceId = useLocationStore((s) => s.selectedPlaceId);
  const lastSelectedPlaceIdRef = useRef<number>(selectedPlaceId);

  const [state, dispatch] = useReducer(mapReducer, {
    center: baseLocation,
    bounds: null,
    zoom: DEFAULT_ZOOM_LEVEL,
    pins: [],
  });

  const fetchPins = useCallback(
    async (
      center: Coordinates,
      bounds: naver.maps.LatLngBounds,
      category: number | "SEASON" | "VIP" | "LOCAL",
      brandId?: number,
      zoom?: number
    ) => {
      const currentZoom = zoom || state.zoom;
      let pins: Pin[] = [];
      try {
        if (searchType === "BRAND" && searchId) {
          pins = await fetchStorePins(center, bounds, 0, currentZoom, baseLocation, searchId);
        } else if (searchType === "CATEGORY" && searchId) {
          pins = await fetchStorePins(center, bounds, searchId, currentZoom, baseLocation);
        } else {
          pins = await fetchStorePins(
            center,
            bounds,
            category ?? selectedCategory,
            currentZoom,
            baseLocation
          );
        }
        dispatch({ type: "SET_PINS", payload: pins });
        setShowSearchBtn(false);
      } catch (error) {
        dispatch({ type: "SET_PINS", payload: [] });
      }
    },
    [selectedCategory.categoryId, searchStoreId, searchLocation, searchType, searchId, baseLocation]
  );

  // 새로운 훅들 초기화
  useMapInitialization({
    currentLocation,
    isInitialized,
    setIsInitialized,
    searchLocation: searchLocation || null,
    searchType: searchType || null,
    searchId: searchId || null,
    searchStoreId: searchStoreId || null,
    selectedCategory,
    state,
    dispatch,
    fetchPins,
    onPinClick,
    lastBaseLocationRef,
  });

  // 모든 useEffect 로직들을 useMapEffects 훅으로 관리
  useMapEffects({
    // baseLocation 관련
    baseLocation,
    lastBaseLocationRef,
    isChangingBaseLocation,
    setIsChangingBaseLocation,
    isMyPlaceButtonClick,
    selectedCategory,
    searchType: searchType || null,
    state,
    dispatch,
    fetchPins,
    setShowSearchBtn,

    // selectedPlaceId 관련
    selectedPlaceId,
    lastSelectedPlaceIdRef,
    setIsMyPlaceButtonClick,

    // 카테고리 변경 관련
    isInitialized,

    // 검색 관련
    searchLocation: searchLocation || null,
    searchId: searchId || null,
    searchStoreId: searchStoreId || null,
    hasSearched,
    setHasSearched,
    isExitingSearchMode,
    setIsExitingSearchMode,
    onPinClick,
  });

  // 이벤트 핸들러들을 useMapHandlers 훅으로 관리
  const { handleBoundsChange, handleZoomChange, handleSearchHere, handleShowNearbyStores } =
    useMapHandlers({
      dispatch,
      searchType: searchType || null,
      searchLocation: searchLocation || null,
      searchStoreId: searchStoreId || null,
      searchId: searchId || null,
      selectedCategory,
      state,
      setShowSearchBtn,
      setHasSearched,
      hasSearched,
      onMapCenterChange,
      onExitSearchMode,
      fetchPins,
    });

  const pinsWithClick = useMemo(() => {
    return state.pins.map((pin) => ({
      ...pin,
      onClick:
        pin.type === "current" || pin.type === "myplace"
          ? () => undefined
          : () => {
              onPinClick(pin);
            },
    }));
  }, [state.pins, onPinClick]);

  // 위치 정보가 없을 때만 로딩 표시
  if (!currentLocation) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-gray-500">현재 위치를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="map-content relative flex h-full w-full">
      <NaverMap
        loc={state.center}
        zoom={state.zoom}
        pins={pinsWithClick}
        onBoundsChange={handleBoundsChange}
        onZoomChange={handleZoomChange}
      />
      {(showSearchBtn || (searchType && !hasSearched)) && (
        <SearchModeBtn
          isSearchMode={!!searchType}
          onExit={handleShowNearbyStores}
          onSearchHere={handleSearchHere}
        />
      )}
    </div>
  );
}
