"use client";

import { useEffect, useMemo, useState, useCallback, useRef, useReducer } from "react";
import NaverMap, { Pin, NaverMapRef } from "@/app/(main)/map/components/NaverMap";
import { Category } from "@/types/category";
import { useBaseLocation } from "@/hooks/map/useBaseLocation";
import { useLocationStore } from "@/store/useLocationStore";
import { useMapInitialization } from "@/app/(main)/map/hooks/useMapInitialization";
import { useMapHandlers } from "@/app/(main)/map/hooks/useMapHandlers";
import { DEFAULT_LOCATION, DEFAULT_ZOOM_LEVEL } from "@/types/constants";
import { Coordinates } from "@/types/map";
import { mapReducer } from "@/app/(main)/map/reducers/mapReducer";
import { fetchStorePins } from "@/utils/fetchStorePins";
import { createBoundsFromCenterAndZoom } from "@/utils/mapBounds";
import SearchModeBtn from "./SearchModeBtn";

interface MapWithBaseLocationProps {
  selectedCategory: Category;
  onPinClick: (pin: Pin) => void;
  searchLocation?: Coordinates | null;
  searchStoreId?: number | null;
  searchType?: string | null;
  searchId?: number | null;
  currentMapCenter?: Coordinates | null;
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
  currentMapCenter,
  onExitSearchMode,
  onMapCenterChange,
}: MapWithBaseLocationProps) {
  const currentLocation = useLocationStore((s) => s.currentLocation);
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [isExitingSearchMode, setIsExitingSearchMode] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // 검색 완료 상태 추적
  const [isChangingBaseLocation, setIsChangingBaseLocation] = useState(false); // 내 장소 변경 중 플래그
  const [isMyPlaceButtonClick, setIsMyPlaceButtonClick] = useState(false); // 내 장소 버튼 클릭 플래그
  const baseLocation = useBaseLocation(currentLocation || DEFAULT_LOCATION);
  const lastBaseLocationRef = useRef<Coordinates>(baseLocation);
  const selectedPlaceId = useLocationStore((s) => s.selectedPlaceId);
  const lastSelectedPlaceIdRef = useRef<number>(selectedPlaceId);
  const mapRef = useRef<NaverMapRef>(null);

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
          pins = await fetchStorePins(center, bounds, 0, currentZoom, searchId);
        } else if (searchType === "CATEGORY" && searchId) {
          pins = await fetchStorePins(center, bounds, searchId, currentZoom);
        } else {
          pins = await fetchStorePins(center, bounds, category ?? selectedCategory, currentZoom);
        }
        dispatch({ type: "SET_PINS", payload: pins });
        setShowSearchBtn(false);
      } catch (error) {
        dispatch({ type: "SET_PINS", payload: [] });
      }
    },
    [selectedCategory.categoryId, searchStoreId, searchLocation, searchType, searchId]
  );

  // 새로운 훅들 초기화
  useMapInitialization({
    currentLocation,
    searchLocation: searchLocation || null,
    searchType: searchType || null,
    searchId: searchId || null,
    searchStoreId: searchStoreId || null,
    selectedCategory,
    state: { zoom: DEFAULT_ZOOM_LEVEL },
    dispatch,
    fetchPins,
    onPinClick,
    lastBaseLocationRef,
  });

  // currentMapCenter 변경 감지하여 지도 중심 업데이트
  useEffect(() => {
    if (currentMapCenter) {
      dispatch({ type: "SET_CENTER", payload: currentMapCenter });
      const currentZoom = mapRef.current?.getCurrentZoom() ?? state.zoom;
      const newBounds = createBoundsFromCenterAndZoom(currentMapCenter, currentZoom);
      if (newBounds) {
        dispatch({ type: "SET_BOUNDS", payload: newBounds });
      }
    }
  }, [currentMapCenter]);

  // baseLocation 변경 감지 (내 장소 변경)
  useEffect(() => {
    if (
      baseLocation[0] !== lastBaseLocationRef.current[0] ||
      baseLocation[1] !== lastBaseLocationRef.current[1]
    ) {
      // 내 장소 변경 중 플래그 설정
      setIsChangingBaseLocation(true);

      // center를 내 장소로 변경
      dispatch({ type: "SET_CENTER", payload: baseLocation });
      lastBaseLocationRef.current = baseLocation;

      // 새로운 baseLocation에 맞는 bounds 생성
      const newBounds = createBoundsFromCenterAndZoom(baseLocation, DEFAULT_ZOOM_LEVEL);
      if (newBounds) {
        dispatch({ type: "SET_BOUNDS", payload: newBounds });

        // 내 장소 버튼 클릭이면 지도 중심만 이동, 아니면 fetchPins 실행
        if (!isMyPlaceButtonClick) {
          const currentZoom = mapRef.current?.getCurrentZoom() ?? state.zoom;
          fetchPins(baseLocation, newBounds, selectedCategory.categoryId, undefined, currentZoom);
        }
        setShowSearchBtn(false);
      }
    }
  }, [baseLocation, fetchPins, searchType, selectedCategory.categoryId]);

  // selectedPlaceId 변경 감지 (내 장소 버튼 클릭 감지)
  useEffect(() => {
    if (selectedPlaceId !== lastSelectedPlaceIdRef.current) {
      setIsMyPlaceButtonClick(true);
      lastSelectedPlaceIdRef.current = selectedPlaceId;
    }
  }, [selectedPlaceId]);

  // 카테고리 변경시 현재 위치에서 fetchPins (baseLocation 변경과 중복되지 않도록, STORE 타입 제외)
  useEffect(() => {
    if (!searchType && !isChangingBaseLocation) {
      const currentBounds = mapRef.current?.getCurrentBounds();
      const currentCenter = mapRef.current?.getCurrentCenter();
      const currentZoom = mapRef.current?.getCurrentZoom() ?? state.zoom;

      if (currentBounds && currentCenter) {
        fetchPins(
          currentCenter,
          currentBounds,
          selectedCategory.categoryId,
          undefined,
          currentZoom
        );
      }
    }
  }, [selectedCategory.categoryId, fetchPins, searchType, isChangingBaseLocation]);

  // 검색 위치로 이동 (초기화 완료 후에만 실행)
  useEffect(() => {
    if (searchLocation && searchType && !isChangingBaseLocation) {
      // 초기화 시에는 이미 처리했으므로 중복 실행 방지
      const currentCenter = mapRef.current?.getCurrentCenter();
      const isInitialSearch =
        currentCenter &&
        searchLocation[0] === currentCenter[0] &&
        searchLocation[1] === currentCenter[1];

      // 검색 모드가 있고 아직 검색하지 않은 경우에만 지도 중심 변경
      // 이미 검색이 완료된 상태에서는 지도 중심을 변경하지 않음 (핀 클릭 시 원래 위치로 돌아가는 것 방지)
      if (!isInitialSearch && !hasSearched && searchType) {
        dispatch({ type: "SET_CENTER", payload: searchLocation });
        const currentZoom = mapRef.current?.getCurrentZoom() ?? state.zoom;
        const newBounds = createBoundsFromCenterAndZoom(searchLocation, currentZoom);
        if (newBounds) {
          dispatch({ type: "SET_BOUNDS", payload: newBounds });
          // 지도 이동 후 검색 실행을 위해 별도 useEffect에서 처리
          setShowSearchBtn(false);
        }
      }
    }
  }, [
    searchLocation,
    searchType,
    searchId,
    searchStoreId,
    selectedCategory.categoryId,
    onPinClick,
    isChangingBaseLocation,
    hasSearched,
  ]);

  // 지도 중심 이동 후 검색 실행 (searchLocation과 현재 center가 일치할 때)
  useEffect(() => {
    const currentBounds = mapRef.current?.getCurrentBounds();
    const currentCenter = mapRef.current?.getCurrentCenter();
    const currentZoom = mapRef.current?.getCurrentZoom() ?? state.zoom;

    if (
      currentBounds &&
      currentCenter &&
      searchLocation &&
      searchType &&
      !hasSearched && // 아직 검색하지 않은 경우에만 실행
      // 지도 중심이 검색 위치 근처에 있을 때 실행 (더 관대한 조건)
      Math.abs(currentCenter[0] - searchLocation[0]) < 0.01 &&
      Math.abs(currentCenter[1] - searchLocation[1]) < 0.01
    ) {
      if (searchType === "BRAND" && searchId) {
        fetchPins(currentCenter, currentBounds, 0, searchId, currentZoom);
      } else if (searchType === "CATEGORY" && searchId) {
        fetchPins(currentCenter, currentBounds, searchId, undefined, currentZoom);
      } else if (searchType === "STORE" && searchStoreId) {
        // STORE 타입: 매장 핀만 생성하고 drawer 열기 (전체 검색 실행하지 않음)
        const storePin: Pin = {
          id: searchStoreId,
          coords: currentCenter,
          name: "",
          category: "store",
          type: "search",
        };
        // 매장 핀만 dispatch
        dispatch({ type: "SET_PINS", payload: [storePin] });
        // STORE 타입은 onPinClick 호출하지 않고 hasSearched만 설정
        setHasSearched(true);
      }

      // 검색 완료 표시 (STORE 타입이 아닌 경우에만)
      if (searchType !== "STORE") {
        setHasSearched(true);
      }
    }
  }, [
    searchLocation,
    searchType,
    searchId,
    searchStoreId,
    fetchPins,
    selectedCategory.categoryId,
    hasSearched,
  ]);

  // 새로운 검색 시작 시 hasSearched 리셋 (핀 클릭으로 인한 searchLocation 변경은 제외)
  useEffect(() => {
    if (searchLocation || searchType) {
      // STORE 타입이 아닌 경우에만 hasSearched 리셋
      if (searchType !== "STORE" && !hasSearched) {
        setHasSearched(false);
      }
    }
  }, [searchLocation, searchType, hasSearched]);

  // 검색 타입 변경 시 즉시 검색 실행 (searchLocation이 설정되지 않은 경우에만)
  useEffect(() => {
    const currentBounds = mapRef.current?.getCurrentBounds();
    const currentCenter = mapRef.current?.getCurrentCenter();
    const currentZoom = mapRef.current?.getCurrentZoom() ?? state.zoom;

    if (
      currentBounds &&
      currentCenter &&
      searchType === "BRAND" &&
      searchId &&
      !searchLocation // searchLocation이 없을 때만 실행 (이미 이동된 경우 제외)
    ) {
      fetchPins(currentCenter, currentBounds, 0, searchId, currentZoom);
      setHasSearched(true); // 검색 완료 표시
    }
  }, [searchType, searchId, fetchPins, searchLocation]);

  // 검색 모드 해제 시 주변 매장 표시
  useEffect(() => {
    if (isExitingSearchMode) {
      const currentBounds = mapRef.current?.getCurrentBounds();
      const currentCenter = mapRef.current?.getCurrentCenter();
      const currentZoom = mapRef.current?.getCurrentZoom() ?? state.zoom;

      if (currentBounds && currentCenter) {
        fetchPins(
          currentCenter,
          currentBounds,
          selectedCategory.categoryId,
          undefined,
          currentZoom
        );
        setIsExitingSearchMode(false);
        setHasSearched(false); // 검색 모드 해제 시 리셋
      }
    }
  }, [isExitingSearchMode, fetchPins, selectedCategory.categoryId]);

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
      mapRef, // mapRef 추가
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
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="border-t-action-green mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300"></div>
        <p className="text-gray-600">현재 위치를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="map-content relative flex h-full w-full">
      <NaverMap
        ref={mapRef}
        loc={state.center}
        zoom={state.zoom}
        pins={pinsWithClick}
        onBoundsChange={handleBoundsChange}
        onZoomChange={handleZoomChange}
      />
      {showSearchBtn && (
        <SearchModeBtn
          isSearchMode={!!searchType}
          onExit={handleShowNearbyStores}
          onSearchHere={handleSearchHere}
        />
      )}
    </div>
  );
}
