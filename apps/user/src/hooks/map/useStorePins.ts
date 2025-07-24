"use client";

import { useEffect, useState } from "react";
import { Coordinates } from "@/types/map";
import { getNearbyStores } from "@/service/store";
import { useMapStore } from "@/store/useMapStore";
import { Category } from "@/types/category";
import { Pin } from "@/app/(main)/map/components/NaverMap";
import { DEFAULT_LOCATION } from "@/types/constants";

export function useStorePins(baseLocation: Coordinates | null, selectedCategory: Category) {
  const selectedPlaceId = useMapStore((s) => s.selectedPlaceId);
  const [pins, setPins] = useState<Pin[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPins = async (baseLocation: Coordinates) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const stores = await getNearbyStores({
        latitude: baseLocation[1],
        longitude: baseLocation[0],
        distance: 500, //TODO: distance zoom 변환 설정
        ...(typeof selectedCategory.categoryId === "number" &&
          selectedCategory.categoryId !== 0 && { categoryId: selectedCategory.categoryId }),
      });

      const storePins: Pin[] = stores.map((store) => ({
        id: store.storeId,
        coords: [store.longitude, store.latitude],
        name: store.storeName,
        category: store.category,
        type: "store",
      }));

      setPins([
        {
          id: -1,
          coords: baseLocation,
          name: selectedPlaceId === -1 ? "현위치" : "저장위치",
          type: "current",
        },
        ...storePins,
      ]);
    } catch (error) {
      setPins([
        {
          id: -1,
          coords: baseLocation,
          name: selectedPlaceId === -1 ? "현위치" : "저장위치",
          type: "current",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!baseLocation || baseLocation === DEFAULT_LOCATION) return;
    fetchPins(baseLocation);
  }, [baseLocation, selectedCategory.categoryId]);

  return pins;
}
