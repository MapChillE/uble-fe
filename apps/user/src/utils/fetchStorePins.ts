import { Coordinates } from "@/types/map";
import { getNearbyStores } from "@/service/store";
import { getCurrentSeason } from "@/utils/season";
import { Pin } from "@/app/(main)/map/components/NaverMap";
import { useLocationStore } from "@/store/useLocationStore";

/**
 * 지도에 표시할 매장 데이터를 조회하는 함수
 * @param center 지도 중심 좌표
 * @param bounds 지도 사각형 영역
 * @param category 선택된 카테고리
 * @param zoomLevel 지도 줌 레벨
 * @param brandId 브랜드 ID
 * @returns 매장 marker 데이터 배열
 */
export async function fetchStorePins(
  center: Coordinates,
  bounds: naver.maps.LatLngBounds,
  category: number | "SEASON" | "VIP" | "LOCAL",
  zoomLevel: number,
  brandId?: number
): Promise<Pin[]> {
  try {
    const ne = bounds.getNE();
    const sw = bounds.getSW();

    const stores = await getNearbyStores({
      swLat: sw.lat(),
      swLng: sw.lng(),
      neLat: ne.lat(),
      neLng: ne.lng(),
      zoomLevel,
      ...(typeof category === "number" && category !== 0 ? { categoryId: category } : {}),
      season: category === "SEASON" ? getCurrentSeason() : undefined,
      type: category === "VIP" ? "VIP" : category === "LOCAL" ? "LOCAL" : undefined,
      brandId: brandId ?? undefined,
    });

    const storePins: Pin[] = stores.map((store) => ({
      id: store.storeId,
      coords: [store.longitude, store.latitude],
      name: store.storeName,
      category: store.category,
      type: "store",
    }));
    // 현재 위치와 내 장소 표시 여부 결정
    const currentLocation = useLocationStore.getState().currentLocation;
    const baseLocation = useLocationStore.getState().baseLocation;

    const shouldShowCurrentLocation =
      currentLocation &&
      Math.abs(center[0] - currentLocation[0]) < 0.0001 &&
      Math.abs(center[1] - currentLocation[1]) < 0.0001;

    const shouldShowBaseLocation =
      baseLocation &&
      Math.abs(center[0] - baseLocation[0]) < 0.0001 &&
      Math.abs(center[1] - baseLocation[1]) < 0.0001;

    if (shouldShowCurrentLocation) {
      return [
        {
          id: -1,
          coords: center,
          name: "현위치",
          type: "current",
        },
        ...storePins,
      ];
    } else if (shouldShowBaseLocation) {
      return [
        {
          id: -1,
          coords: center,
          name: "",
          type: "myplace",
        },
        ...storePins,
      ];
    }

    return storePins;
  } catch (error) {
    return [];
  }
}
