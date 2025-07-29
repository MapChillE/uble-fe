"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import MapSearchSection from "@/app/(main)/map/components/MapSearchSection";
import MapWithBaseLocation from "@/app/(main)/map/components/MapWithBaseLocation";
import StoreDetailDrawer from "@/app/(main)/map/components/StoreDetailDrawer";
import MyPlaceDrawer from "@/app/(main)/map/components/MyPlaceDrawer";
import MyPlaceTriggerBtn from "@/app/(main)/map/components/MyPlaceTriggerBtn";
import CategorySection from "@/components/common/CategorySection";
import BenefitConfirmModal from "@/components/modal/BenefitConfirmModal";

import { getStoreDetail, getStoreSummary } from "@/service/store";
import { useHydrateCategories } from "@/hooks/map/useHydrateCategories";
import { useHydrateLocation } from "@/hooks/map/useHydrateLocation";
import { useLocationStore } from "@/store/useLocationStore";

import { ALL_CATEGORY, DEFAULT_LOCATION } from "@/types/constants";
import { Category } from "@/types/category";
import { StoreDetail, StoreSummary } from "@/types/store";
import { Pin } from "@/app/(main)/map/components/NaverMap";

import { toast } from "sonner";
import useUserStore from "@/store/useUserStore";
import { Coordinates } from "@/types/map";

/**
 * 지도 컨테이너 컴포넌트 (내부 로직)
 * @returns 지도 컨테이너 컴포넌트
 */
export default function MapContainer() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<Category>(ALL_CATEGORY);
  const [isOpen, setIsOpen] = useState(false);
  const [storeSummary, setStoreSummary] = useState<StoreSummary | null>(null);
  const [storeDetail, setStoreDetail] = useState<StoreDetail | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [snapIndex, setSnapIndex] = useState(0);
  const [searchLocation, setSearchLocation] = useState<Coordinates | null>(null);
  const [searchStoreId, setSearchStoreId] = useState<number | null>(null);

  useHydrateCategories();
  useHydrateLocation();

  const currentLocation = useLocationStore((s) => s.currentLocation);
  const baseLocation = useLocationStore((s) => s.baseLocation);
  const user = useUserStore((s) => s.user);

  const handleSelectCategory = useCallback((category: Category) => {
    setSelectedCategory(category);
  }, []);

  const handleStoreClick = useCallback(
    async (storeId: number, location?: Coordinates) => {
      try {
        const targetLocation = location || baseLocation || DEFAULT_LOCATION;
        const summary = await getStoreSummary({
          latitude: targetLocation[1],
          longitude: targetLocation[0],
          storeId: storeId,
        });
        setStoreSummary(summary);
        setStoreDetail(null);
        setIsOpen(true);
        setSnapIndex(0);
      } catch (error) {
        toast.error("가맹점 정보를 불러오지 못했습니다.");
      }
    },
    [baseLocation]
  );

  const handlePinClick = useCallback(
    async (pin: Pin) => {
      if (!pin.id) return;
      await handleStoreClick(pin.id);
    },
    [handleStoreClick]
  );

  const handleExitSearchMode = useCallback(() => {
    setSearchLocation(null);
    setSearchStoreId(null);
    router.push("/map");
  }, [router]);

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const storeId = searchParams.get("storeId");

    if (lat && lng) {
      const parsedLat = parseFloat(lat);
      const parsedLng = parseFloat(lng);
      if (isNaN(parsedLat) || isNaN(parsedLng)) {
        toast.error("유효하지 않은 위치 정보입니다.");
        return;
      }
      const location: Coordinates = [parsedLng, parsedLat];
      setSearchLocation(location);

      if (storeId) {
        const storeIdNum = parseInt(storeId, 10);
        if (isNaN(storeIdNum)) {
          toast.error("유효하지 않은 가맹점 ID입니다.");
          return;
        }
        setSearchStoreId(storeIdNum);
        handleStoreClick(storeIdNum, location);
      } else {
        setSearchStoreId(null);
      }
    } else {
      setSearchLocation(null);
      setSearchStoreId(null);
    }
  }, [searchParams, handleStoreClick]);

  const isSearchModeReady = useMemo(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const storeId = searchParams.get("storeId");
    return (lat && lng && storeId) || (!lat && !lng);
  }, [searchParams]);

  if (!currentLocation || !user || !isSearchModeReady) {
    return <div>현재 위치를 불러오는 중입니다...</div>;
  }

  const handleSnapChange = async (snap: number | string) => {
    if (typeof snap !== "number") return;
    setSnapIndex(snap);

    if (snap === 1 && storeSummary && !storeDetail) {
      try {
        setIsDetailLoading(true);
        const targetLocation = baseLocation || DEFAULT_LOCATION;
        const detail = await getStoreDetail({
          latitude: targetLocation[1],
          longitude: targetLocation[0],
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
    <div className="relative h-[100dvh] w-full">
      <MapWithBaseLocation
        selectedCategory={selectedCategory}
        onPinClick={handlePinClick}
        searchLocation={searchLocation}
        searchStoreId={searchStoreId}
        onExitSearchMode={handleExitSearchMode}
      />
      <div className="absolute left-0 right-0 top-0 z-10">
        <MapSearchSection />
      </div>
      <div className="absolute left-4 right-4 top-16 z-10">
        <CategorySection
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      </div>
      <MyPlaceDrawer trigger={<MyPlaceTriggerBtn />} />
      <StoreDetailDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        summary={storeSummary}
        detail={storeDetail}
        isDetailLoading={isDetailLoading}
        snapIndex={snapIndex}
        setSnapIndex={setSnapIndex}
        onSnapChange={handleSnapChange}
      />
      <BenefitConfirmModal />
    </div>
  );
}
