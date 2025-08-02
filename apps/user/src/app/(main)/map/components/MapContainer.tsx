"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import MapSearchSection from "@/app/(main)/map/components/MapSearchSection";
import MapWithBaseLocation from "@/app/(main)/map/components/MapWithBaseLocation";
import StoreDetailDrawer from "@/app/(main)/map/components/StoreDetailDrawer";
import MyPlaceDrawer from "@/app/(main)/map/components/MyPlaceDrawer";
import MyPlaceTriggerBtn from "@/app/(main)/map/components/MyPlaceTriggerBtn";
import CategorySection from "@/components/common/CategorySection";
import OfflineBrandFilter from "@/components/common/OfflineBrandFilter";
import BrandSelectionDrawer from "@/components/common/BrandSelectionDrawer";
import BenefitConfirmModal from "@/components/modal/BenefitConfirmModal";

import { getStoreSummary } from "@/service/store";
import { useLocationStore } from "@/store/useLocationStore";
import useStoreDetailDrawerStore from "@/store/useStoreDetailDrawerStore";

import { ALL_CATEGORY } from "@/types/constants";
import { Category } from "@/types/category";
import { Pin } from "@/app/(main)/map/components/NaverMap";

import { toast } from "sonner";
import useUserStore from "@/store/useUserStore";
import { Coordinates } from "@/types/map";
import CurrentPlaceBtn from "./CurrentPlaceBtn";

/**
 * 지도 컨테이너 컴포넌트 (내부 로직)
 * @returns 지도 컨테이너 컴포넌트
 */
const MapContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<Category>(ALL_CATEGORY);
  const [searchLocation, setSearchLocation] = useState<Coordinates | null>(null);
  const [searchStoreId, setSearchStoreId] = useState<number | null>(null);
  const [searchType, setSearchType] = useState<string | null>(null);
  const [searchId, setSearchId] = useState<number | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedBrandName, setSelectedBrandName] = useState<string | null>(null);
  const [isBrandDrawerOpen, setIsBrandDrawerOpen] = useState(false);
  const [currentMapCenter, setCurrentMapCenter] = useState<Coordinates | null>(null);

  const currentLocation = useLocationStore((s) => s.currentLocation);
  const user = useUserStore((s) => s.user);

  const handleSelectCategory = useCallback((category: Category) => {
    setSelectedCategory(category);
    // 카테고리 변경 시 브랜드 필터 초기화
    setSelectedBrandId(null);
    setSelectedBrandName(null);
    // 검색 모드도 초기화
    setSearchLocation(null);
    setSearchType(null);
    setSearchId(null);
  }, []);

  const handleBrandSelect = useCallback(
    (brandId: number | null, brandName?: string) => {
      setSelectedBrandId(brandId);
      setSelectedBrandName(brandName || null);

      // 브랜드 선택 시 검색 모드로 전환
      if (brandId) {
        // 브랜드 선택 시 카테고리가 전체가 아니면 전체로 초기화
        if (selectedCategory.categoryId !== 0) {
          setSelectedCategory(ALL_CATEGORY);
        }

        // 현재 지도 center를 사용 (없으면 현재 위치 사용)
        const searchCenter = currentMapCenter || currentLocation;
        if (searchCenter) {
          setSearchLocation(searchCenter);
          setSearchType("BRAND");
          setSearchId(brandId);
          // 브랜드 선택 후 drawer 닫기
          setIsBrandDrawerOpen(false);
        }
      } else if (brandId === null) {
        // 브랜드 선택 해제 시 검색 모드 초기화
        setSearchLocation(null);
        setSearchType(null);
        setSearchId(null);
      }
    },
    [currentLocation, currentMapCenter, selectedCategory.categoryId]
  );

  const handleOpenBrandDrawer = useCallback(() => {
    setIsBrandDrawerOpen(true);
  }, []);

  const handleCloseBrandDrawer = useCallback(() => {
    setIsBrandDrawerOpen(false);
  }, []);

  const { open: openStoreDetail } = useStoreDetailDrawerStore();

  const handleStoreClick = useCallback(
    async (storeId: number, location: Coordinates) => {
      try {
        const summary = await getStoreSummary({
          latitude: location[1],
          longitude: location[0],
          storeId: storeId,
        });
        openStoreDetail(summary);
      } catch (error) {
        toast.error("가맹점 정보를 불러오지 못했습니다.");
      }
    },
    [openStoreDetail]
  );

  const handlePinClick = useCallback(
    async (pin: Pin) => {
      if (!pin.id) return;
      await handleStoreClick(pin.id, pin.coords);
    },
    [handleStoreClick]
  );

  const handleMapCenterChange = useCallback((center: Coordinates) => {
    setCurrentMapCenter(center);
  }, []);

  // URL 파라미터 파싱
  const parseSearchParams = useCallback(() => {
    const type = searchParams.get("type"); // "BRAND" | "CATEGORY" | "STORE"
    const id = searchParams.get("id"); // brandId or categoryId
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const storeId = searchParams.get("storeId");
    const zoom = parseInt(searchParams.get("zoom") || "15");

    return { type, id, lat, lng, storeId, zoom };
  }, [searchParams]);

  // URL 파라미터 변경 감지 및 처리
  useEffect(() => {
    const { type, id, lat, lng, storeId } = parseSearchParams();

    // 검색 파라미터가 없으면 초기화
    if (!lat && !lng && !storeId && !type && !id) {
      setSearchLocation(null);
      setSearchStoreId(null);
      setSearchType(null);
      setSearchId(null);
      return;
    }

    // 위치 정보 파싱
    const parsedLat = parseFloat(lat || "");
    const parsedLng = parseFloat(lng || "");
    if (isNaN(parsedLat) || isNaN(parsedLng)) {
      toast.error("유효하지 않은 위치 정보입니다.");
      return;
    }

    const location: Coordinates = [parsedLng, parsedLat];

    // type에 따른 처리
    if ((type === "STORE" || storeId) && storeId) {
      // 1. STORE 타입: 해당 위치로 이동하고 storeId로 drawer 열기
      const parsedStoreId = parseInt(storeId, 10);
      if (!isNaN(parsedStoreId)) {
        setSearchLocation(location);
        setSearchStoreId(parsedStoreId);
        // storeId로 drawer 열기
        handleStoreClick(parsedStoreId, location);
      }
    } else if (type === "BRAND" && id) {
      // 2. BRAND 타입: 해당 위치로 이동하고 brandId로 검색
      const parsedId = parseInt(id, 10);
      if (!isNaN(parsedId)) {
        setSearchLocation(location);
        setSearchType("BRAND");
        setSearchId(parsedId);
      }
    } else if (type === "CATEGORY" && id) {
      // 3. CATEGORY 타입: 해당 위치로 이동하고 categoryId로 검색
      const parsedId = parseInt(id, 10);
      if (!isNaN(parsedId)) {
        setSearchLocation(location);
        setSearchType("CATEGORY");
        setSearchId(parsedId);
      }
    }
  }, [searchParams, parseSearchParams]);

  const handleExitSearchMode = useCallback(() => {
    setSearchLocation(null);
    setSearchStoreId(null);
    setSearchType(null);
    setSearchId(null);
    router.push("/map");
  }, [router]);

  // 에러 처리 및 초기화
  const handleError = useCallback((message: string) => {
    toast.error(message);
    setSearchLocation(null);
    setSearchStoreId(null);
    setSearchType(null);
    setSearchId(null);
  }, []);

  if (!currentLocation || !user) {
    return <div>현재 위치를 불러오는 중입니다...</div>;
  }

  return (
    <div className="map-container relative h-screen w-full overflow-hidden">
      <MapWithBaseLocation
        selectedCategory={selectedCategory}
        onPinClick={handlePinClick}
        searchLocation={searchLocation}
        searchStoreId={searchStoreId}
        searchType={searchType}
        searchId={searchId}
        onExitSearchMode={handleExitSearchMode}
        onMapCenterChange={handleMapCenterChange}
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
      <div className="absolute left-4 right-4 top-32 z-10">
        <OfflineBrandFilter
          isSelected={!!selectedBrandId}
          onSelect={() => {
            // 브랜드 필터 클릭 시 카테고리를 전체로 초기화
            setSelectedCategory(ALL_CATEGORY);
            handleOpenBrandDrawer();
          }}
          selectedBrandName={selectedBrandName}
        />
      </div>

      <MyPlaceDrawer trigger={<MyPlaceTriggerBtn />} />
      {/* <CurrentPlaceBtn /> */}
      <StoreDetailDrawer />
      <BenefitConfirmModal />
      <BrandSelectionDrawer
        isOpen={isBrandDrawerOpen}
        onClose={handleCloseBrandDrawer}
        onBrandSelect={handleBrandSelect}
        selectedBrandId={selectedBrandId}
      />
    </div>
  );
};
export default MapContainer;
