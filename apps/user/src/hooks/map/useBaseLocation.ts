"use client";

import { useEffect, useMemo } from "react";
import { Coordinates } from "@/types/map";
import { useLocationStore } from "@/store/useLocationStore";
import { DEFAULT_LOCATION } from "@/types/constants";

/**
 * 선택된 장소 기반 위치 계산 및 관리
 * @param currentLocation 현재 GPS 위치
 * @returns 선택된 장소 기반 위치
 */
export function useBaseLocation(currentLocation: Coordinates) {
  const { selectedPlaceId, myPlaces, baseLocation, setBaseLocation } = useLocationStore();

  // baseLocation 계산을 메모이제이션하여 불필요한 재계산 방지
  const calculatedBaseLocation = useMemo(() => {
    if (selectedPlaceId === -1 && currentLocation) {
      // 현재 위치 선택 시
      return currentLocation;
    } else {
      // 내 장소 중 선택된 장소가 있을 때
      const selected = myPlaces.find((p) => p.id === selectedPlaceId);
      if (selected && selected.coordinates) {
        return selected.coordinates;
      } else {
        // 선택된 장소가 없거나 유효하지 않을 때 현재 위치 또는 기본 위치 사용
        return currentLocation || DEFAULT_LOCATION;
      }
    }
  }, [selectedPlaceId, currentLocation, myPlaces]);

  // baseLocation이 변경되었을 때만 스토어 업데이트
  useEffect(() => {
    if (
      !baseLocation ||
      baseLocation[0] !== calculatedBaseLocation[0] ||
      baseLocation[1] !== calculatedBaseLocation[1]
    ) {
      setBaseLocation(calculatedBaseLocation);
    }
  }, [calculatedBaseLocation, baseLocation, setBaseLocation]);

  return calculatedBaseLocation;
}
