"use client";

import { Star } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import SearchSection from "@/app/(main)/home/components/SearchSection";
import MapWithBaseLocation from "@/app/(main)/map/components/MapWithBaseLocation";
import MyPlaceSheet from "@/app/(main)/map/components/MyPlaceSheet";
import CategorySection from "@/components/common/CategorySection";
import { useEffect, useMemo, useState } from "react";
import { Category } from "@/types/category";
import { getCategories } from "@/service/category";
import { useCategoryStore } from "@/store/useCategoryStore";
import { apiHandler } from "@api/apiHandler";
import { ALL_CATEGORY, ANY_CATEGORYS } from "@/types/constants";
import { StoreDetail, StoreSummary } from "@/types/store";
import StoreDetailSheet, { mockdata } from "./StoreDetailSheet";

export default function MapContainer() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(ALL_CATEGORY);
  const setCategories = useCategoryStore((s) => s.setCategories);
  // const categories = useCategoryStore((s) => s.categories);

  const [isOpen, setIsOpen] = useState(false);
  const [snapIndex, setSnapIndex] = useState(1);
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

  const handlePinClick = async ({
    storeId,
    coords,
  }: {
    storeId: number;
    coords: [number, number];
  }) => {
    // TODO: 상세정보 API 호출
    // const response = await getStoreDetail({ storeId, latitude: coords[1], longitude: coords[0] });
    // if (response.data) {
    //  setStoreDetail(response.data);
    if (mockdata) {
      setStoreDetail(mockdata.data);
      setIsOpen(true);
      setSnapIndex(1);
    }
  };

  const trigger = useMemo(
    () => (
      <Button variant="circle_outline" size="icon" aria-label="내 장소">
        <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
      </Button>
    ),
    []
  );
  return (
    <div className="relative h-screen w-full">
      {/* {categories.length > 0 && ( */}
      <MapWithBaseLocation
        zoom={15}
        selectedCategory={selectedCategory}
        onPinClick={handlePinClick}
      />
      {/* )} */}
      <StoreDetailSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        detail={storeDetail}
        snapIndex={snapIndex}
        setSnapIndex={setSnapIndex}
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
      <MyPlaceSheet trigger={trigger} />
    </div>
  );
}
