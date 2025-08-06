"use client";

import { useEffect, useMemo, useState, useCallback, useRef, useReducer } from "react";
import NaverMap, { Pin } from "@/app/(main)/map/components/NaverMap";
import { Category } from "@/types/category";
import { useBaseLocation } from "@/hooks/map/useBaseLocation";
import { useLocationStore } from "@/store/useLocationStore";
import { useMapInitialization } from "@/app/(main)/map/hooks/useMapInitialization";
import { useMapHandlers } from "@/app/(main)/map/hooks/useMapHandlers";
import { DEFAULT_LOCATION, DEFAULT_ZOOM_LEVEL } from "@/types/constants";
import { Coordinates } from "@/types/map";
import { mapReducer, MapState, MapAction } from "@/app/(main)/map/reducers/mapReducer";
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
          fetchPins(baseLocation, newBounds, selectedCategory.categoryId, undefined, state.zoom);
        }
        setShowSearchBtn(false);
      }

      // 내 장소 변경 완료 후 플래그 해제 (약간의 지연 후)
      setTimeout(() => {
        setIsChangingBaseLocation(false);
      }, 500);
    }
  }, [baseLocation, selectedCategory.categoryId, fetchPins]);

  // selectedPlaceId 변경 감지 (내 장소 버튼 클릭 감지)
  useEffect(() => {
    if (selectedPlaceId !== lastSelectedPlaceIdRef.current) {
      setIsMyPlaceButtonClick(true);
      lastSelectedPlaceIdRef.current = selectedPlaceId;

      // 1초 후 플래그 해제
      setTimeout(() => {
        setIsMyPlaceButtonClick(false);
      }, 1000);
    }
  }, [selectedPlaceId]);

  // 카테고리 변경시 현재 위치에서 fetchPins (baseLocation 변경과 중복되지 않도록, STORE 타입 제외)
  useEffect(() => {
    if (isInitialized && state.bounds && state.center && !searchType && !isChangingBaseLocation) {
      // baseLocation 변경으로 인한 fetchPins와 중복되지 않도록 약간의 지연
      const timer = setTimeout(() => {
        if (state.bounds) {
          fetchPins(state.center, state.bounds, selectedCategory.categoryId, undefined, state.zoom);
        }
      }, 200); // 지연 시간을 늘려서 baseLocation 변경이 완전히 끝난 후 실행

      return () => clearTimeout(timer);
    }
  }, [selectedCategory.categoryId, isInitialized, fetchPins, searchType, isChangingBaseLocation]);

  // 검색 위치로 이동 (초기화 완료 후에만 실행)
  useEffect(() => {
    if (searchLocation && isInitialized && searchType && !isChangingBaseLocation) {
      // 초기화 시에는 이미 처리했으므로 중복 실행 방지
      const isInitialSearch =
        searchLocation[0] === state.center[0] && searchLocation[1] === state.center[1];

      // 검색 모드가 있고 아직 검색하지 않은 경우에만 지도 중심 변경
      // 이미 검색이 완료된 상태에서는 지도 중심을 변경하지 않음 (핀 클릭 시 원래 위치로 돌아가는 것 방지)
      if (!isInitialSearch && !hasSearched && searchType) {
        dispatch({ type: "SET_CENTER", payload: searchLocation });
        const newBounds = createBoundsFromCenterAndZoom(searchLocation, DEFAULT_ZOOM_LEVEL);
        if (newBounds) {
          dispatch({ type: "SET_BOUNDS", payload: newBounds });
          // 지도 이동 후 검색 실행을 위해 별도 useEffect에서 처리
          setShowSearchBtn(false);
        }
      }
    }
  }, [
    searchLocation,
    isInitialized,
    searchType,
    searchId,
    searchStoreId,
    selectedCategory.categoryId,
    onPinClick,
    isChangingBaseLocation,
  ]);

  // 지도 중심 이동 후 검색 실행 (searchLocation과 state.center가 일치할 때)
  useEffect(() => {
    if (
      isInitialized &&
      state.bounds &&
      state.center &&
      searchLocation &&
      searchType &&
      !hasSearched && // 아직 검색하지 않은 경우에만 실행
      // 지도 중심이 검색 위치와 일치할 때만 실행
      state.center[0] === searchLocation[0] &&
      state.center[1] === searchLocation[1]
    ) {
      if (searchType === "BRAND" && searchId) {
        fetchPins(state.center, state.bounds, 0, searchId, state.zoom);
      } else if (searchType === "CATEGORY" && searchId) {
        fetchPins(state.center, state.bounds, searchId, undefined, state.zoom);
      } else if (searchType === "STORE" && searchStoreId) {
        // STORE 타입: 매장 핀만 생성하고 drawer 열기 (전체 검색 실행하지 않음)
        const storePin: Pin = {
          id: searchStoreId,
          coords: state.center,
          name: "",
          category: "store",
          type: "search",
        };
        // 매장 핀만 dispatch
        dispatch({ type: "SET_PINS", payload: [storePin] });
        // drawer 열기
        onPinClick(storePin);
      }

      // 검색 완료 표시
      setHasSearched(true);
    }
  }, [
    state.center,
    state.bounds,
    searchLocation,
    searchType,
    searchId,
    searchStoreId,
    isInitialized,
    fetchPins,
    selectedCategory.categoryId,
    onPinClick,
    hasSearched,
  ]);

  // 새로운 검색 시작 시 hasSearched 리셋 (핀 클릭으로 인한 searchLocation 변경은 제외)
  useEffect(() => {
    if (searchLocation || searchType) {
      // searchLocation이 변경되었지만 이미 검색이 완료된 상태라면 핀 클릭으로 인한 변경일 가능성이 높음
      // 이 경우 hasSearched를 리셋하지 않음
      if (!hasSearched) {
        setHasSearched(false);
      }
    }
  }, [searchLocation, searchType, hasSearched]);

  // 검색 타입 변경 시 즉시 검색 실행 (searchLocation이 설정되지 않은 경우에만)
  useEffect(() => {
    if (
      isInitialized &&
      state.bounds &&
      state.center &&
      searchType === "BRAND" &&
      searchId &&
      !searchLocation // searchLocation이 없을 때만 실행 (이미 이동된 경우 제외)
    ) {
      fetchPins(state.center, state.bounds, 0, searchId, state.zoom);
      setHasSearched(true); // 검색 완료 표시
    }
  }, [searchType, searchId, isInitialized, fetchPins, searchLocation]);

  // 검색 모드 해제 시 주변 매장 표시
  useEffect(() => {
    if (isExitingSearchMode && isInitialized && state.bounds && state.center && !searchType) {
      fetchPins(state.center, state.bounds, selectedCategory.categoryId, undefined, state.zoom);
      setIsExitingSearchMode(false);
      setHasSearched(false); // 검색 모드 해제 시 리셋
    }
  }, [isExitingSearchMode, isInitialized, fetchPins, selectedCategory.categoryId, searchType]);

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
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        <p className="text-gray-600">현재 위치를 불러오는 중...</p>
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
