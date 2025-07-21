"use client";

import { useEffect, useMemo, useState } from "react";

import { apiHandler } from "@api/apiHandler";

import SearchSection from "@/app/(main)/home/components/SearchSection";
import MapWithBaseLocation from "@/app/(main)/map/components/MapWithBaseLocation";
import StoreDetailDrawer from "@/app/(main)/map/components/StoreDetailDrawer";
import MyPlaceDrawer from "@/app/(main)/map/components/MyPlaceDrawer";
import MyPlaceTriggerBtn from "@/app/(main)/map/components/MyPlaceTriggerBtn";

import CategorySection from "@/components/common/CategorySection";
import { getCategories } from "@/service/category";
import { getStoreDetail } from "@/service/store";
import { useBaseLocation } from "@/hooks/map/useBaseLocation";
import { useCurrentLocation } from "@/hooks/map/useCurrentLocation";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useMapStore } from "@/store/useMapStore";

import { ALL_CATEGORY, ANY_CATEGORYS, DEFAULT_LOCATION } from "@/types/constants";
import { Category } from "@/types/category";
import { Coordinates } from "@/types/map";
import { StoreDetail, StoreSummary } from "@/types/store";
import { Pin } from "@/app/(main)/map/components/NaverMap";

export default function MapContainer() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(ALL_CATEGORY);
  const setCategories = useCategoryStore((s) => s.setCategories);
  // const categories = useCategoryStore((s) => s.categories);

  const [isOpen, setIsOpen] = useState(false);
  const [snapIndex, setSnapIndex] = useState(0);
  const [storeDetail, setStoreDetail] = useState<StoreDetail | null>(null);

  // TODO: useCategoryStore에서 카테고리 존재 여부 if문 확인해서 추가 or api + 추가
  const handleFetchCategories = async () => {
    const { data, error } = await apiHandler(() => getCategories());
    if (error) {
      console.log("카테고리 로딩 실패: ", error);
      // TODO: 에러 상태 관리 또는 토스트 알림 추가
    }
    if (data && data.categoryList) {
      setCategories([
        ALL_CATEGORY,
        ...data.categoryList.map((category) => ({
          categoryId: category.categoryId,
          categoryName: category.categoryName,
        })),
        ...ANY_CATEGORYS,
      ]);
    }
  };

  useEffect(() => {
    handleFetchCategories();
    setSelectedCategory({ ...ALL_CATEGORY });
  }, []);

  const { location: currentLocation, getCurrentLocation } = useCurrentLocation();
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const baseLocation = useBaseLocation(currentLocation ?? DEFAULT_LOCATION);

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
        setSnapIndex(1);
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
