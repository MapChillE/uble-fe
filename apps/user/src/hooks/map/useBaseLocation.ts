"use client";

import { useEffect, useState } from "react";
import { Coordinates } from "@/types/map";
import { useMapStore } from "@/store/useMapStore";

/**
 * 선택된 장소 기반 위치 계산
 */
export function useBaseLocation(currentLocation: Coordinates) {
  const selectedPlaceId = useMapStore((s) => s.selectedPlaceId);
  const myPlaces = useMapStore((s) => s.myPlaces);
  const [baseLocation, setBaseLocation] = useState<Coordinates>(currentLocation);

  useEffect(() => {
    if (selectedPlaceId === "current" && currentLocation) {
      setBaseLocation(currentLocation);
    } else {
      const selected = myPlaces.find((p) => p.id === selectedPlaceId);
      if (selected && selected.coordinates) {
        setBaseLocation(selected.coordinates);
      }
    }
  }, [selectedPlaceId, currentLocation, myPlaces]);

  return baseLocation;
}
