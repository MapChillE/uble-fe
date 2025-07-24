"use client";

import { useState } from "react";

import SearchSection from "@/app/(main)/home/components/SearchSection";
import MapWithBaseLocation from "@/app/(main)/map/components/MapWithBaseLocation";
import StoreDetailDrawer from "@/app/(main)/map/components/StoreDetailDrawer";
import MyPlaceDrawer from "@/app/(main)/map/components/MyPlaceDrawer";
import MyPlaceTriggerBtn from "@/app/(main)/map/components/MyPlaceTriggerBtn";
import CategorySection from "@/components/common/CategorySection";
import BenefitConfirmModal from "@/components/modal/BenefitConfirmModal";

import { getStoreDetail, getStoreSummary } from "@/service/store";
import { useBaseLocation } from "@/hooks/map/useBaseLocation";
import { useHydrateCategories } from "@/hooks/map/useHydrateCategories";
import { useHydrateLocation } from "@/hooks/map/useHydrateLocation";
import { useLocationStore } from "@/store/useLocationStore";

import { ALL_CATEGORY, DEFAULT_LOCATION } from "@/types/constants";
import { Category } from "@/types/category";
import { StoreDetail, StoreSummary } from "@/types/store";
import { Pin } from "@/app/(main)/map/components/NaverMap";

import { toast } from "sonner";

export default function MapContainer() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(ALL_CATEGORY);
  const [isOpen, setIsOpen] = useState(false);
  const [storeSummary, setStoreSummary] = useState<StoreSummary | null>(null);
  const [storeDetail, setStoreDetail] = useState<StoreDetail | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [snapIndex, setSnapIndex] = useState(0);

  useHydrateCategories();
  useHydrateLocation();

  const currentLocation = useLocationStore((s) => s.currentLocation);
  const baseLocation = useBaseLocation(currentLocation ?? DEFAULT_LOCATION);

  if (!currentLocation) {
    // TODO: 로딩 스피너 등으로 변경
    return <div>현재 위치를 불러오는 중입니다...</div>;
  }

  const handlePinClick = async (pin: Pin) => {
    if (!pin.id) return;
    try {
      const summary = await getStoreSummary({
        latitude: baseLocation[1],
        longitude: baseLocation[0],
        storeId: pin.id,
      });
      setStoreSummary(summary);
      setStoreDetail(null);
      setIsOpen(true);
      setSnapIndex(0);
    } catch (error) {
      toast.error("가맹점 요약 정보를 불러오지 못했습니다.");
    }
  };

  const handleSnapChange = async (snap: number | string) => {
    if (typeof snap !== "number") return;
    setSnapIndex(snap);

    if (snap === 1 && storeSummary && !storeDetail) {
      try {
        setIsDetailLoading(true);
        const detail = await getStoreDetail({
          latitude: baseLocation[1],
          longitude: baseLocation[0],
          storeId: storeSummary.storeId,
        });
        setStoreDetail(detail);
      } catch (error) {
        toast.error("가맹점 상세 정보를 불러오지 못했습니다.");
      } finally {
        setIsDetailLoading(false);
      }
    }
  };

  return (
    <div className="relative h-screen w-full">
      <MapWithBaseLocation
        zoom={15}
        selectedCategory={selectedCategory}
        onPinClick={handlePinClick}
      />
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
        summary={storeSummary}
        detail={storeDetail}
        snapIndex={snapIndex}
        setSnapIndex={setSnapIndex}
        onSnapChange={handleSnapChange}
        isDetailLoading={isDetailLoading}
      />
      <BenefitConfirmModal />
    </div>
  );
}
