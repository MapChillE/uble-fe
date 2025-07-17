"use client";

import { useEffect } from "react";
import { useCurrentLocation } from "@/hooks/map/useCurrentLocation";
import NaverMap from "@/app/(main)/map/components/NaverMap";
import { Category } from "@/types/category";
import { useBaseLocation } from "@/hooks/map/useBaseLocation";
import { useStorePins } from "@/hooks/map/useStorePins";
import { DEFAULT_LOCATION } from "@/types/constants";

interface MapWithBaseLocationProps {
  zoom: number;
  selectedCategory: Category;
}

export default function MapWithBaseLocation({ zoom, selectedCategory }: MapWithBaseLocationProps) {
  const { location: currentLocation, getCurrentLocation } = useCurrentLocation();

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const baseLocation = useBaseLocation(currentLocation ?? DEFAULT_LOCATION);
  const pins = useStorePins(baseLocation, selectedCategory);

  return (
    <div className="flex h-full w-full">
      {baseLocation && <NaverMap loc={baseLocation} zoom={zoom} pins={pins} />}
    </div>
  );
}
