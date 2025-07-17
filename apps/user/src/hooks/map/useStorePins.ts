"use client";

import { useEffect, useState } from "react";
import { Coordinates } from "@/types/map";
import { getStores } from "@/service/store";
import { useMapStore } from "@/store/useMapStore";
import { Category } from "@/types/category";
import { Pin } from "@/app/(main)/map/components/NaverMap";

export function useStorePins(baseLocation: Coordinates | null, selectedCategory: Category) {
  const selectedPlaceId = useMapStore((s) => s.selectedPlaceId);
  const [pins, setPins] = useState<Pin[]>([]);

  useEffect(() => {
    if (!baseLocation) return;

    getStores({
      latitude: baseLocation[1],
      longitude: baseLocation[0],
      distance: 500,
      ...(typeof selectedCategory.categoryId === "number" &&
        selectedCategory.categoryId !== 0 && { categoryId: selectedCategory.categoryId }),
    }).then(({ data, error }) => {
      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        const storePins: Pin[] = data.data.data.storeList.map((store) => ({
          id: store.storeId,
          coords: [store.longitude, store.latitude],
          name: store.storeName,
          category: store.category,
          type: "store",
        }));

        setPins([
          {
            id: 0,
            coords: baseLocation,
            name: selectedPlaceId === "current" ? "현위치" : "저장위치",
          },
          ...storePins,
        ]);
      }
    });
  }, [baseLocation, selectedCategory, selectedPlaceId]);

  return pins;
}
