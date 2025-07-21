"use client";

import { useEffect, useMemo } from "react";
import { useCurrentLocation } from "@/hooks/map/useCurrentLocation";
import NaverMap, { Pin } from "@/app/(main)/map/components/NaverMap";
import { Category } from "@/types/category";
import { useBaseLocation } from "@/hooks/map/useBaseLocation";
import { useStorePins } from "@/hooks/map/useStorePins";
import { DEFAULT_LOCATION } from "@/types/constants";
import { StoreSummary, StoreDetail } from "@/types/store";
import { useMapStore } from "@/store/useMapStore";

interface MapWithBaseLocationProps {
  zoom: number;
  selectedCategory: Category;
  onPinClick: (pin: Pin) => void;
}

export default function MapWithBaseLocation({
  zoom,
  selectedCategory,
  onPinClick,
}: MapWithBaseLocationProps) {
  const { location: currentLocation, getCurrentLocation } = useCurrentLocation();

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const places = useMapStore((s) => s.myPlaces);
  const selectedPlaceId = useMapStore((s) => s.selectedPlaceId);
  // 선택된 장소만 baseLocation으로 사용
  const selectedPlace = places.find((p) => p.id === selectedPlaceId);
  // fallback: currentLocation or default
  const baseLocation = selectedPlace
    ? selectedPlace.coordinates
    : (currentLocation ?? DEFAULT_LOCATION);

  const storePins = useStorePins(baseLocation, selectedCategory);
  const pins = useMemo(
    () =>
      storePins.map((pin) => ({
        ...pin,
        onClick: () => {
          onPinClick(pin); // TODO: coords 수정
        },
      })),
    [storePins, onPinClick]
  );
  return (
    <div className="flex h-full w-full">
      {baseLocation && <NaverMap loc={baseLocation} zoom={zoom} pins={pins} />}
    </div>
  );
}
