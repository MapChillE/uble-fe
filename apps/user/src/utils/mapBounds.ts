import { Coordinates } from "@/types/map";

/**
 * 지도 중심 좌표를 기반으로 지도 사각형 영역을 생성하는 함수
 * @param center 지도 중심 좌표
 * @returns 지도 사각형 영역
 */
export function createBoundsFromCenterAndZoom(
  center: Coordinates,
  zoom: number
): naver.maps.LatLngBounds | null {
  if (typeof window === "undefined" || !window.naver?.maps) return null;

  const zoomFactor = Math.pow(2, 15 - zoom);
  const latDelta = 0.005 / zoomFactor;
  const lngDelta = 0.005 / zoomFactor;

  const bounds = new window.naver.maps.LatLngBounds(
    new window.naver.maps.LatLng(center[1] - latDelta, center[0] - lngDelta),
    new window.naver.maps.LatLng(center[1] + latDelta, center[0] + lngDelta)
  );

  return bounds;
}
