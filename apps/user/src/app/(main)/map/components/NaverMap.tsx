"use client";

import { useEffect, useRef } from "react";
import { Coordinates } from "@/types/map";
import type { NaverMap as NaverMapInstance, NaverMapOptions, NaverMarker } from "@/types/map";

const mapId = "naver-map";

export interface Pin {
  id: string;
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
}

export default function NaverMap({ loc, zoom = 15, pins }: NaverMapProps) {
  const mapRef = useRef<NaverMapInstance | null>(null);
  const [lng, lat] = loc; // 구조 분해
  const markerRefs = useRef<NaverMarker[]>([]);

  // 지도 및 마커 초기화
  useEffect(() => {
    if (typeof window === "undefined" || !window.naver) return;

    // 지도 옵션
    const mapOptions: NaverMapOptions = {
      center: new window.naver.maps.LatLng(lat, lng),
      zoom: zoom,
      scaleControl: true,
      mapDataControl: true,
      logoControlOptions: {
        position: window.naver.maps.Position.BOTTOM_LEFT,
      },
    };

    // 지도 인스턴스 생성
    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;

    // 기존 마커 제거
    markerRefs.current.forEach((marker) => marker.setMap(null));
    markerRefs.current = [];

    // 마커 추가
    if (pins) {
      pins.forEach((pin) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(pin.coords[1], pin.coords[0]),
          map: map,
          title: pin.name || "",
        });
        if (pin.onClick) {
          window.naver.maps.Event.addListener(marker, "click", pin.onClick);
        }
        markerRefs.current.push(marker);
      });
    }
  }, [lat, lng, zoom, pins]);

  return <div id={mapId} style={{ width: "100%", height: "100%" }} />;
}
