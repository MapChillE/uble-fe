"use client";

import { useEffect, useRef } from "react";
import { Coordinates } from "@/types/map";
import type { NaverMap as NaverMapInstance, NaverMapOptions } from "@/types/map";
import { useLocationStore } from "@/store/useLocationStore";
import { useMarkerAndClusterManager } from "@/app/(main)/map/hooks/useMarkerAndClusterManager";

const mapId = "naver-map";

export interface Pin {
  id: number;
  coords: Coordinates; // [lng, lat]
  name?: string;
  onClick?: () => void;
  type?: string; // 예: "store", "current", "favorite" 등
  category?: string;
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
export default function NaverMap({
  loc,
  zoom = 15,
  pins,
  onBoundsChange,
  onZoomChange,
}: NaverMapProps) {
  const mapRef = useRef<NaverMapInstance | null>(null);
  const pinsRef = useRef<Pin[]>([]);
  const [lng, lat] = loc;
  const selectedPlaceId = useLocationStore((s) => s.selectedPlaceId);
  const selectedPlace = useLocationStore((s) => s.myPlaces.find((p) => p.id === selectedPlaceId));

  // 마커와 클러스터러 통합 관리 훅 사용
  const { markerRefs, currentMarkerRef, selectedMarkerRef, clustererRef, updateMarkerIcon } =
    useMarkerAndClusterManager({
      mapRef,
      pins,
      zoom,
      selectedPlace,
    });

  // 최초 지도 생성
  useEffect(() => {
    if (!mapRef.current && typeof window !== "undefined" && window.naver) {
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
          console.log("zoom", currentZoom);
          onZoomChange(currentZoom);

          // 줌 레벨 변경 시 마커 아이콘 업데이트
          const currentPins = pinsRef.current;
          if (currentPins) {
            const otherPins = currentPins.filter(
              (p) => p.type !== "current" && p.type !== "selected"
            );

            // 일반 마커들 업데이트
            markerRefs.current.forEach((marker, index) => {
              const pin = otherPins[index];
              if (pin) {
                updateMarkerIcon(marker, pin, currentZoom);
              }
            });

            // 선택된 마커 업데이트
            if (selectedMarkerRef.current) {
              const selectedPin = currentPins.find((p) => p.type === "selected");
              if (selectedPin) {
                updateMarkerIcon(selectedMarkerRef.current, selectedPin, currentZoom);
              }
            }
          }
        });
      }
    }
  }, [loc, onBoundsChange, onZoomChange]);

  // center 이동
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter(new window.naver.maps.LatLng(lat, lng));
    }
  }, [loc, lat, lng]);

  return <div id={mapId} style={{ width: "100%", height: "100%" }} />;
}
