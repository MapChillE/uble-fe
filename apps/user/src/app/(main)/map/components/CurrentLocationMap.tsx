"use client";

import { useEffect } from "react";
import { useCurrentLocation } from "@/hooks/map/useCurrentLocation";
import NaverMap, { Pin } from "./NaverMap";
import { useMapStore } from "@/store/useMapStore";

const mapId = "current-location-map";

type CurrentLocationMapProps = {
  zoom: number;
  // category: string;
};

export default function CurrentLocationMap({ zoom }: CurrentLocationMapProps) {
  const { location, getCurrentLocation } = useCurrentLocation();
  const selectedCategory = useMapStore((s) => s.selectedCategory);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const pins: Pin[] = location
    ? [{ id: "current-location", coords: location, name: "현위치" }]
    : [];

  // TODO: 현위치 + 카테고리 를 request로 하는 api 연결

  return (
    <div className="flex h-full w-full">
      {location && <NaverMap loc={location} zoom={zoom} pins={pins} />}
    </div>
  );
}
