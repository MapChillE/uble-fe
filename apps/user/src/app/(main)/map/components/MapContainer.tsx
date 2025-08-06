"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import MapSearchSection from "@/app/(main)/map/components/MapSearchSection";
import MapWithBaseLocation from "@/app/(main)/map/components/MapWithBaseLocation";
import StoreDetailDrawer from "@/app/(main)/map/components/StoreDetailDrawer";
import MyPlaceDrawer from "@/app/(main)/map/components/MyPlaceDrawer";
import MyPlaceTriggerBtn from "@/app/(main)/map/components/MyPlaceTriggerBtn";
import CurrentLocationBtn from "@/app/(main)/map/components/CurrentLocationBtn";
import CategorySection from "@/components/common/CategorySection";
import OfflineBrandFilter from "@/components/common/OfflineBrandFilter";
import BrandSelectionDrawer from "@/components/common/BrandSelectionDrawer";
import BenefitConfirmModal from "@/components/modal/BenefitConfirmModal";

import { getStoreSummary } from "@/service/store";
import { fetchNearestStore } from "@/service/brand";
import { useLocationStore } from "@/store/useLocationStore";
import useStoreDetailDrawerStore from "@/store/useStoreDetailDrawerStore";

import { ALL_CATEGORY } from "@/types/constants";
import { Category } from "@/types/category";
import { Pin } from "@/app/(main)/map/components/NaverMap";

import { toast } from "sonner";
import useUserStore from "@/store/useUserStore";
import { Coordinates } from "@/types/map";
import { useCurrentLocation } from "@/hooks/map/useCurrentLocation";

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
  const [isLoadingStore, setIsLoadingStore] = useState(false); // 매장 로딩 상태 추적

  const currentLocation = useLocationStore((s) => s.currentLocation);
  const setCurrentLocation = useLocationStore((s) => s.setCurrentLocation);
  const { getCurrentLocation } = useCurrentLocation();
  const user = useUserStore((s) => s.user);

  const handleSelectCategory = useCallback(
    (category: Category) => {
      setSelectedCategory(category);
      // 카테고리 변경 시 브랜드 필터 초기화
      setSelectedBrandId(null);
      setSelectedBrandName(null);
      // 검색 모드도 초기화
      setSearchLocation(null);
      setSearchType(null);
      setSearchId(null);
      // URL 파라미터 제거하여 기본 모드로 전환
      router.push("/map");
    },
    [router]
  );

  const handleBrandSelect = useCallback(
    async (brandId: number | null, brandName?: string) => {
      setSelectedBrandId(brandId);
      setSelectedBrandName(brandName || null);

      // 브랜드 선택 시 검색 모드로 전환
      if (brandId) {
        // 브랜드 선택 시 카테고리가 전체가 아니면 전체로 초기화
        if (selectedCategory.categoryId !== 0) {
          setSelectedCategory(ALL_CATEGORY);
        }

        // 현재 위치 정보 (지도 center 또는 현재 위치)
        const currentPosition = currentMapCenter || currentLocation;

        if (currentPosition) {
          try {
            // 브랜드의 가장 가까운 매장 위치 조회
            const nearestStoreResponse = await fetchNearestStore({
              brandId,
              latitude: currentPosition[1], // 위도
              longitude: currentPosition[0], // 경도
            });

            const nearestStoreLocation: Coordinates = [
              nearestStoreResponse.data.longitude,
              nearestStoreResponse.data.latitude,
            ];

            // 가장 가까운 매장 위치로 이동
            setSearchLocation(nearestStoreLocation);
            setSearchType("BRAND");
            setSearchId(brandId);
            // 브랜드 선택 후 drawer 닫기
            setIsBrandDrawerOpen(false);
          } catch (error) {
            // API 실패 시 기존 로직으로 fallback
            setSearchLocation(currentPosition);
            setSearchType("BRAND");
            setSearchId(brandId);
            setIsBrandDrawerOpen(false);
          }
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
      // 이미 로딩 중이면 중복 실행 방지
      if (isLoadingStore) {
        return;
      }
      setIsLoadingStore(true);

      try {
        const summary = await getStoreSummary({
          latitude: location[1],
          longitude: location[0],
          storeId: storeId,
        });
        openStoreDetail(summary);
      } catch (error) {
        toast.error("가맹점 정보를 불러오지 못했습니다.");
      } finally {
        setIsLoadingStore(false);
      }
    },
    [openStoreDetail, isLoadingStore]
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

  // currentLocation이 로드되면 currentMapCenter 초기화
  useEffect(() => {
    if (currentLocation && !currentMapCenter) {
      setCurrentMapCenter(currentLocation);
    }
  }, [currentLocation, currentMapCenter]);

  // 브랜드 선택 시 searchLocation 설정 확인
  useEffect(() => {
    if (searchType === "BRAND" && searchId && !searchLocation) {
      // searchLocation이 없으면 currentMapCenter 또는 currentLocation 사용
      const location = currentMapCenter || currentLocation;
      if (location) {
        setSearchLocation(location);
      }
    }
  }, [searchType, searchId, searchLocation, currentLocation]);

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
        setSearchType("STORE");
        // handleStoreClick은 MapWithBaseLocation에서 처리하므로 여기서는 제거
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

  // 현재 위치로 이동
  const handleMoveToCurrentLocation = useCallback(async () => {
    try {
      // 실시간 GPS 위치를 새로 받아오기 (강제 새로고침)
      const newLocation = await getCurrentLocation({
        forceRefresh: true, // 캐시 무효화
        enableHighAccuracy: true,
        timeout: 10000,
      });

      // 새로운 위치 정보를 store에 저장하고 지도 중심 이동
      setCurrentLocation(newLocation);
      setCurrentMapCenter(newLocation);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "현재 위치를 가져올 수 없습니다.");
    }
  }, [getCurrentLocation, setCurrentLocation, setCurrentMapCenter]);

  if (!currentLocation || !user) {
    return <div>현재 위치를 불러오는 중입니다...</div>;
  }

  // URL 파라미터가 있는 경우 파싱이 완료될 때까지 대기
  const { type, id, lat, lng, storeId } = parseSearchParams();
  const hasSearchParams = !!(lat && lng && (storeId || (type && id)));

  if (hasSearchParams && !searchLocation && !searchType && !searchStoreId) {
    return <div>검색 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="map-container relative mx-auto h-screen w-full max-w-[1080px] overflow-hidden">
      <MapWithBaseLocation
        selectedCategory={selectedCategory}
        onPinClick={handlePinClick}
        searchLocation={searchLocation}
        searchStoreId={searchStoreId}
        searchType={searchType}
        searchId={searchId}
        currentMapCenter={currentMapCenter}
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
      <CurrentLocationBtn onClick={handleMoveToCurrentLocation} disabled={!currentLocation} />
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
