"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useCurrentLocation } from "@/hooks/map/useCurrentLocation";
import NaverMap, { Pin } from "@/app/(main)/map/components/NaverMap";
import { Category } from "@/types/category";
import { useBaseLocation } from "@/hooks/map/useBaseLocation";
import { DEFAULT_LOCATION } from "@/types/constants";
import { Coordinates } from "@/types/map";
import { Button } from "@workspace/ui/components/button";
import { fetchStorePins } from "@/utils/fetchStorePins";
import { createBoundsFromCenterAndZoom } from "@/utils/mapBounds";

interface MapWithBaseLocationProps {
  selectedCategory: Category;
  onPinClick: (pin: Pin) => void;
  zoom?: number;
}

/**
 * 현재 위치를 기준으로 지도를 표시하는 컴포넌트
 * @param zoom 지도 줌 레벨
 * @param selectedCategory 선택된 카테고리
 * @param onPinClick 마커 클릭 시 호출되는 함수
 * @returns 지도 컴포넌트
 */
export default function MapWithBaseLocation({
  selectedCategory,
  onPinClick,
  zoom = 15,
}: MapWithBaseLocationProps) {
  const { location: currentLocation, getCurrentLocation } = useCurrentLocation();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const baseLocation = useBaseLocation(currentLocation ?? DEFAULT_LOCATION);

  // 지도 bounds/center 추적
  const [mapBounds, setMapBounds] = useState<naver.maps.LatLngBounds | null>(null);
  const [mapCenter, setMapCenter] = useState<Coordinates>(baseLocation);
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [pins, setPins] = useState<Pin[]>([]);
  const lastBaseLocationRef = useRef<Coordinates>(baseLocation);

  const fetchPins = useCallback(
    async (center: Coordinates, bounds: naver.maps.LatLngBounds, category?: Category) => {
      try {
        const pins = await fetchStorePins(
          center,
          bounds,
          category ?? selectedCategory,
          baseLocation
        );
        setPins(pins);
      } catch (error) {
        setPins([]);
      }
      setShowSearchBtn(false);
    },
    [baseLocation, selectedCategory]
  );

  // 초기화: currentLocation이 로드되면 첫 번째 fetchPins 실행
  useEffect(() => {
    if (currentLocation && !isInitialized) {
      const initialBounds = createBoundsFromCenterAndZoom(currentLocation, zoom);
      if (initialBounds) {
        setMapBounds(initialBounds);
        fetchPins(currentLocation, initialBounds);
        lastBaseLocationRef.current = currentLocation;
        setMapCenter(currentLocation);
        setIsInitialized(true);
      }
    }
  }, [currentLocation, isInitialized, fetchPins]);

  // baseLocation이 바뀌면 즉시 fetchPins (내장소/현위치 변경 시)
  useEffect(() => {
    if (
      isInitialized &&
      (baseLocation[0] !== lastBaseLocationRef.current[0] ||
        baseLocation[1] !== lastBaseLocationRef.current[1])
    ) {
      setMapCenter(baseLocation); // 지도 중심은 baseLocation으로 이동
      lastBaseLocationRef.current = baseLocation;

      // 새로운 baseLocation에 맞는 bounds 생성
      const newBounds = createBoundsFromCenterAndZoom(baseLocation, zoom);
      if (newBounds) {
        setMapBounds(newBounds);
        fetchPins(baseLocation, newBounds); // 새로운 bounds 기준으로 fetch
        setShowSearchBtn(false);
      }
    }
  }, [baseLocation, isInitialized, fetchPins]);

  // 카테고리 변경시 현재 위치에서 fetchPins
  useEffect(() => {
    if (isInitialized && mapBounds && mapCenter) {
      fetchPins(mapCenter, mapBounds, selectedCategory);
    }
  }, [selectedCategory.categoryId]);

  // 지도 bounds/center 변경 시 (드래그/줌)
  const handleBoundsChange = useDebouncedCallback(
    (bounds: naver.maps.LatLngBounds, center: Coordinates) => {
      setMapBounds(bounds);
      setMapCenter(center);

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
    300 // 300ms 디바운싱
  );

  // 버튼 클릭 시 현재 bounds/center로 fetchPins
  const handleSearchHere = () => {
    if (mapBounds && mapCenter) {
      fetchPins(mapCenter, mapBounds, selectedCategory);
    }
  };

  const pinsWithClick = useMemo(
    () =>
      pins.map((pin) => ({
        ...pin,
        onClick: () => {
          onPinClick(pin);
        },
      })),
    [pins, onPinClick]
  );

  // currentLocation이 로드될 때까지 로딩 표시
  if (!currentLocation) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-gray-500">현재 위치를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full">
      <NaverMap
        loc={mapCenter}
        zoom={zoom}
        pins={pinsWithClick}
        onBoundsChange={handleBoundsChange}
      />
      {showSearchBtn && (
        <Button
          className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full"
          variant="filter_select"
          onClick={handleSearchHere}
        >
          현재 위치에서 검색
        </Button>
      )}
    </div>
  );
}
