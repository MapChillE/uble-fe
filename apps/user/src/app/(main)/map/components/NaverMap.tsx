"use client";

import { useEffect, useRef } from "react";
import { Coordinates } from "@/types/map";
import type { NaverMap as NaverMapInstance, NaverMapOptions, NaverMarker } from "@/types/map";

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
}

export default function NaverMap({ loc, zoom = 15, pins }: NaverMapProps) {
  const mapRef = useRef<NaverMapInstance | null>(null);
  const markerRefs = useRef<NaverMarker[]>([]);
  const [lng, lat] = loc;

  // 마커 생성 함수 (재사용)
  const createMarker = (pin: Pin): NaverMarker => {
    const position = new window.naver.maps.LatLng(pin.coords[1], pin.coords[0]);

    const markerOptions: any = {
      position,
      map: mapRef.current!,
      title: pin.name || "",
    };

    // 현위치 마커일 경우 커스텀 스타일 적용
    if (pin.type === "current") {
      markerOptions.icon = {
        content: `<div style="
            background: #f63b3b;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 4px rgba(0,0,0,0.3);
          "></div>`,
        size: new window.naver.maps.Size(20, 20),
        anchor: new window.naver.maps.Point(10, 10),
      };
    }

    const marker = new window.naver.maps.Marker(markerOptions);

    if (pin.onClick) {
      window.naver.maps.Event.addListener(marker, "click", pin.onClick);
    }

    return marker;
  };

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
    }
  }, [loc]);

  // BaseLocation 변경시 center 변경 및 마커 리렌더링
  useEffect(() => {
    if (mapRef.current && loc) {
      mapRef.current.setCenter(new window.naver.maps.LatLng(lat, lng));

      if (!pins?.length) return;
      markerRefs.current.forEach((marker) => marker.setMap(null));
      markerRefs.current = [];

      const newMarkers = pins.map((pin) => createMarker(pin));
      markerRefs.current = newMarkers;
    }
  }, [loc]);

  // 마커만 핀 변경될 때 갱신
  useEffect(() => {
    if (!mapRef.current || !pins?.length) return;

    markerRefs.current.forEach((marker) => marker.setMap(null));
    markerRefs.current = [];

    const newMarkers = pins.map((pin) => createMarker(pin));
    markerRefs.current = newMarkers;
  }, [pins]);

  return <div id={mapId} style={{ width: "100%", height: "100%" }} />;
}
