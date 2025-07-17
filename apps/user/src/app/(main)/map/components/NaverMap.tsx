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
  const [lng, lat] = loc; // 구조 분해

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

  // 마커만 핀 변경될 때 갱신
  useEffect(() => {
    if (!mapRef.current) return;

    markerRefs.current.forEach((marker) => marker.setMap(null));
    markerRefs.current = [];

    if (pins) {
      pins.forEach((pin) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(pin.coords[1], pin.coords[0]),
          map: mapRef.current!,
          title: pin.name || "",
        });
        if (pin.onClick) {
          window.naver.maps.Event.addListener(marker, "click", pin.onClick);
        }
        markerRefs.current.push(marker);
      });
    }
  }, [pins]);

  return <div id={mapId} style={{ width: "100%", height: "100%" }} />;
}
