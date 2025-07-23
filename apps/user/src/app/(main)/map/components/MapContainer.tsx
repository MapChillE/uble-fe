"use client";

import { useEffect, useMemo, useState } from "react";

import SearchSection from "@/app/(main)/home/components/SearchSection";
import MapWithBaseLocation from "@/app/(main)/map/components/MapWithBaseLocation";
import StoreDetailDrawer from "@/app/(main)/map/components/StoreDetailDrawer";
import MyPlaceDrawer from "@/app/(main)/map/components/MyPlaceDrawer";
import MyPlaceTriggerBtn from "@/app/(main)/map/components/MyPlaceTriggerBtn";

import CategorySection from "@/components/common/CategorySection";
import { getStoreDetail } from "@/service/store";
import { useBaseLocation } from "@/hooks/map/useBaseLocation";
import { useCurrentLocation } from "@/hooks/map/useCurrentLocation";

import { ALL_CATEGORY, DEFAULT_LOCATION } from "@/types/constants";
import { Category } from "@/types/category";
import { StoreDetail, StoreSummary } from "@/types/store";
import { Pin } from "@/app/(main)/map/components/NaverMap";
import { useHydrateCategories } from "@/hooks/map/useHydrateCategories";
import { useHydrateLocation } from "@/hooks/map/useHydrateLocation";
import { useLocationStore } from "@/store/useLocationStore";

export default function MapContainer() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(ALL_CATEGORY);

  const [isOpen, setIsOpen] = useState(false);
  const [snapIndex, setSnapIndex] = useState(0);
  const [storeDetail, setStoreDetail] = useState<StoreDetail | null>(null);

  useHydrateCategories();
  useHydrateLocation();

  const currentLocation = useLocationStore((s) => s.currentLocation);

  const baseLocation = useBaseLocation(currentLocation ?? DEFAULT_LOCATION);

  if (!currentLocation) {
    // TODO: 로딩 스피너 등으로 변경
    return <div> 현재 위치를 불러오는 중입니다...</div>;
  }

  const handlePinClick = async (pin: Pin) => {
    if (!pin.id) return;
    try {
      const data = await getStoreDetail({
        latitude: baseLocation[1],
        longitude: baseLocation[0],
        storeId: pin.id,
      });

      if (data) {
        setStoreDetail(data);
        setIsOpen(true);
        setSnapIndex(0);
      }
    } catch (error) {
      // TODO: 에러 처리
      alert("가맹점 상세 정보 로딩 실패: " + error);
    }
  };

  return (
    <div className="relative h-screen w-full">
      {/* {categories.length > 0 && ( */}
      <MapWithBaseLocation
        zoom={15}
        selectedCategory={selectedCategory}
        onPinClick={handlePinClick}
      />
      {/* )} */}
      <div className="absolute left-0 right-0 top-0 z-10">
        <SearchSection />
      </div>
      <div className="absolute left-4 right-4 top-16 z-10">
        <CategorySection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>
      <MyPlaceDrawer trigger={<MyPlaceTriggerBtn />} />
      <StoreDetailDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        detail={storeDetail}
        snapIndex={snapIndex}
        setSnapIndex={setSnapIndex}
      />
    </div>
  );
}
