"use client";

import { useEffect, useMemo, useState, useCallback, useRef, useReducer } from "react";
import { useDebouncedCallback } from "use-debounce";
import NaverMap, { Pin } from "@/app/(main)/map/components/NaverMap";
import { Category } from "@/types/category";
import { useBaseLocation } from "@/hooks/map/useBaseLocation";
import { useLocationStore } from "@/store/useLocationStore";
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
}

export default function MapWithBaseLocation({
  selectedCategory,
  onPinClick,
  searchLocation,
  searchStoreId,
  searchType,
  searchId,
  onExitSearchMode,
}: MapWithBaseLocationProps) {
  const currentLocation = useLocationStore((s) => s.currentLocation);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [isExitingSearchMode, setIsExitingSearchMode] = useState(false);
  const baseLocation = useBaseLocation();
  const lastBaseLocationRef = useRef<Coordinates>(baseLocation);

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
      brandId?: number
    ) => {
      let pins: Pin[] = [];
      try {
        if (searchStoreId && searchLocation) {
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
          pins = await fetchStorePins(center, bounds, category, state.zoom, baseLocation, searchId);
        } else if (searchType === "CATEGORY" && searchId) {
          pins = await fetchStorePins(center, bounds, searchId, state.zoom, baseLocation);
        } else {
          pins = await fetchStorePins(
            center,
            bounds,
            category ?? selectedCategory,
            state.zoom,
            baseLocation
          );
        }
        dispatch({ type: "SET_PINS", payload: pins });
        setShowSearchBtn(false);
      } catch (error) {
        dispatch({ type: "SET_PINS", payload: [] });
      }
    },
    [
      selectedCategory.categoryId,
      searchStoreId,
      searchLocation,
      searchType,
      searchId,
      state.zoom,
      baseLocation,
    ]
  );

  // 초기화: currentLocation이 로드되면 첫 번째 fetchPins 실행
  useEffect(() => {
    if (currentLocation && !isInitialized) {
      const initialBounds = createBoundsFromCenterAndZoom(currentLocation, DEFAULT_ZOOM_LEVEL);
      if (initialBounds) {
        dispatch({ type: "SET_BOUNDS", payload: initialBounds });
        dispatch({ type: "SET_CENTER", payload: currentLocation });
        if (searchType === "BRAND" && searchId) {
          fetchPins(currentLocation, initialBounds, selectedCategory.categoryId, searchId);
        } else if (searchType === "CATEGORY" && searchId) {
          fetchPins(currentLocation, initialBounds, searchId);
        } else {
          fetchPins(currentLocation, initialBounds, selectedCategory.categoryId);
        }
        lastBaseLocationRef.current = currentLocation;
        setIsInitialized(true);
      }
    }
  }, [currentLocation, isInitialized, fetchPins]);

  useEffect(() => {
    if (
      baseLocation[0] !== lastBaseLocationRef.current[0] ||
      baseLocation[1] !== lastBaseLocationRef.current[1]
    ) {
      dispatch({ type: "SET_CENTER", payload: baseLocation });
      lastBaseLocationRef.current = baseLocation;

      // 새로운 baseLocation에 맞는 bounds 생성
      const newBounds = createBoundsFromCenterAndZoom(baseLocation, DEFAULT_ZOOM_LEVEL);
      if (newBounds) {
        dispatch({ type: "SET_BOUNDS", payload: newBounds });
        fetchPins(baseLocation, newBounds, selectedCategory.categoryId);
        setShowSearchBtn(false);
      }
    }
  }, [baseLocation]);

  // 카테고리 변경시 현재 위치에서 fetchPins
  useEffect(() => {
    if (isInitialized && state.bounds && state.center) {
      fetchPins(state.center, state.bounds, selectedCategory.categoryId);
    }
  }, [selectedCategory.categoryId]);

  // 검색 위치로 이동
  useEffect(() => {
    if (searchLocation && isInitialized) {
      dispatch({ type: "SET_CENTER", payload: searchLocation });
      const newBounds = createBoundsFromCenterAndZoom(searchLocation, DEFAULT_ZOOM_LEVEL);
      if (newBounds) {
        dispatch({ type: "SET_BOUNDS", payload: newBounds });
        fetchPins(searchLocation, newBounds, selectedCategory.categoryId);
        setShowSearchBtn(false);
      }
    }
  }, [searchLocation, isInitialized]);

  // 검색 모드 해제 시 주변 매장 표시
  useEffect(() => {
    if (isExitingSearchMode && isInitialized && state.bounds && state.center) {
      fetchPins(state.center, state.bounds, selectedCategory.categoryId);
      setIsExitingSearchMode(false);
    }
  }, [isExitingSearchMode, isInitialized, state.bounds, state.center, fetchPins]);

  const handleBoundsChange = useDebouncedCallback(
    (bounds: naver.maps.LatLngBounds, center: Coordinates) => {
      dispatch({ type: "SET_BOUNDS", payload: bounds });
      dispatch({ type: "SET_CENTER", payload: center });

      if (searchStoreId && searchLocation) {
        setShowSearchBtn(false);
        return;
      }

      // baseLocation과 center가 다르고, 사용자가 실제로 지도를 이동했을 때만 버튼 노출
      const distance = Math.sqrt(
        Math.pow(center[0] - baseLocation[0], 2) + Math.pow(center[1] - baseLocation[1], 2)
      );
      // 일정 거리 이상 이동했을 때만 버튼 표시 (약 100m)
      if (distance > 0.001) {
        setShowSearchBtn(true);
      } else {
        setShowSearchBtn(false);
      }
    },
    150
  );

  const handleZoomChange = useDebouncedCallback((zoom: number) => {
    dispatch({ type: "SET_ZOOM", payload: zoom });
    if (searchStoreId && searchLocation) {
      setShowSearchBtn(false);
      return;
    }
  }, 150);

  const handleSearchHere = () => {
    if (state.bounds && state.center) {
      setShowSearchBtn(false);
      fetchPins(state.center, state.bounds, selectedCategory.categoryId);
    }
  };

  const pinsWithClick = useMemo(
    () =>
      state.pins.map((pin) => ({
        ...pin,
        onClick:
          pin.type === "current" || pin.type === "selected"
            ? () => undefined
            : () => {
                onPinClick(pin);
              },
      })),
    [state.pins, onPinClick]
  );

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
      {(showSearchBtn || (searchStoreId && searchLocation)) && (
        <SearchModeBtn
          isSearchMode={!!(searchStoreId && searchLocation)}
          onExit={() => {
            onExitSearchMode?.();
            setIsExitingSearchMode(true);
          }}
          onSearchHere={handleSearchHere}
        />
      )}
    </div>
  );
}
