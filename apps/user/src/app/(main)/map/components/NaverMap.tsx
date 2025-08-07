"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef, useState } from "react";
import { Coordinates } from "@/types/map";
import type { NaverMap as NaverMapInstance, NaverMapOptions } from "@/types/map";
import { useLocationStore } from "@/store/useLocationStore";
import { useMarkerAndClusterManager } from "@/app/(main)/map/hooks/useMarkerAndClusterManager";
import { toast } from "sonner";

const mapId = "naver-map";

export interface Pin {
  id: number;
  coords: Coordinates; // [lng, lat]
  name?: string;
  onClick?: () => void;
  type?: string; // 예: "store", "current", "favorite" 등
  category?: string;
}

export interface NaverMapRef {
  getMap: () => NaverMapInstance | null;
  getCurrentBounds: () => naver.maps.LatLngBounds | null;
  getCurrentCenter: () => Coordinates | null;
  getCurrentZoom: () => number;
}

interface NaverMapProps {
  loc: Coordinates;
  zoom: number;
  pins?: Pin[];
  onBoundsChange?: (bounds: naver.maps.LatLngBounds, center: Coordinates) => void;
  onZoomChange?: (zoom: number) => void;
}

/**
 * 지도에 마커, 클러스터러 등을 표시하는 컴포넌트
 * @param loc 지도 중심 좌표
 * @param zoom 지도 줌 레벨 (기본값: 15)
 * @param pins 마커 데이터
 * @param onBoundsChange 지도 바운드 변경 시 호출되는 함수
 * @returns 지도 컴포넌트
 */
const NaverMap = forwardRef<NaverMapRef, NaverMapProps>(
  ({ loc, zoom = 16, pins, onBoundsChange, onZoomChange }, ref) => {
    const mapRef = useRef<NaverMapInstance | null>(null);
    const [lng, lat] = loc;
    const selectedPlaceId = useLocationStore((s) => s.selectedPlaceId);
    const selectedPlace = useLocationStore((s) => s.myPlaces.find((p) => p.id === selectedPlaceId));
    const [isMapReady, setIsMapReady] = useState(false);
    
    // 마커와 클러스터러 통합 관리 훅 사용
    useMarkerAndClusterManager({
      mapRef,
      pins,
      zoom,
      selectedPlace,
    });

    // 외부에서 map 객체와 관련 메서드들에 접근할 수 있도록 노출
    useImperativeHandle(
      ref,
      () => ({
        getMap: () => mapRef.current,
        getCurrentBounds: () => {
          if (mapRef.current) {
            return mapRef.current.getBounds() as naver.maps.LatLngBounds;
          }
          return null;
        },
        getCurrentCenter: () => {
          if (mapRef.current) {
            const center = mapRef.current.getCenter();
            const latLngCenter = center as naver.maps.LatLng;
            return [latLngCenter.lng(), latLngCenter.lat()];
          }
          return null;
        },
        getCurrentZoom: () => {
          if (mapRef.current) {
            return mapRef.current.getZoom();
          }
          return zoom;
        },
      }),
      [zoom]
    );

    // 최초 지도 생성
    useEffect(() => {
      // 이미 지도가 초기화되었으면 재실행하지 않음
      if (mapRef.current || isMapReady) {
        return;
      }

      if (typeof window === "undefined" || !window.naver?.maps) {
        return;
      }

      let retryCount = 0;
      const maxRetries = 10; // 최대 10회 재시도

      const initializeMap = () => {
        if (!mapRef.current) {
          const mapOptions: NaverMapOptions = {
            center: new window.naver.maps.LatLng(lat, lng),
            zoom: zoom,
            scaleControl: true,
            mapDataControl: true,
            logoControlOptions: {
              position: window.naver.maps.Position.BOTTOM_LEFT,
            },
          };
          const map = new window.naver.maps.Map(mapId, mapOptions);
          mapRef.current = map;

          // bounds_changed 이벤트 리스너 등록
          if (onBoundsChange) {
            window.naver.maps.Event.addListener(map, "bounds_changed", () => {
              const bounds = map.getBounds();
              const center = map.getCenter();
              const latLngCenter = center as naver.maps.LatLng;
              onBoundsChange(bounds as naver.maps.LatLngBounds, [
                latLngCenter.lng(),
                latLngCenter.lat(),
              ]);
            });
          }

          if (onZoomChange) {
            window.naver.maps.Event.addListener(map, "zoomend", () => {
              const currentZoom = map.getZoom();
              onZoomChange(currentZoom);
            });
          }

          setIsMapReady(true); // 지도 준비 완료
          return true; // 초기화 성공
        }
        return false; // 초기화 실패
      };

      // 즉시 시도
      if (initializeMap()) {
        return;

      // 폴링 방식으로 재시도
      const interval = setInterval(() => {
        retryCount++;
        console.log(retryCount);
        // 최대 재시도 횟수 초과 시 중단
        if (retryCount >= maxRetries) {
          clearInterval(interval);
          toast.error("지도를 불러오는 중 오류가 발생했습니다.");
          return;
        }

        // 지도 초기화 시도
        if (initializeMap()) {
          clearInterval(interval);
          return;
        }
      }, 500);

      return () => clearInterval(interval);
    }, [loc, onBoundsChange, onZoomChange, lat, lng, zoom, isMapReady]);

    // center 이동
    useEffect(() => {
      if (mapRef.current) {
        mapRef.current.setCenter(new window.naver.maps.LatLng(lat, lng));
      }
    }, [loc, lat, lng]);

    return (
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        {!isMapReady && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80">
            <div className="text-center text-gray-600">
              <div className="mb-3 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
              <div>지도를 불러오는 중...</div>
            </div>
          </div>
        )}
        <div id={mapId} style={{ width: "100%", height: "100%" }} />
      </div>
    );
  }
);

NaverMap.displayName = "NaverMap";

export default NaverMap;
