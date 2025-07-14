"use client";

import { useCallback, useRef, useEffect } from "react";
import { Coordinates } from "@/types/map";
import type { NaverMap, NaverMapOptions } from "@/types/map";

const mapId = "naver-map";

interface NaverMapProps {
  loc: Coordinates;
  zoom?: number;
}

export default function NaverMap({ loc, zoom = 15 }: NaverMapProps) {
  const mapRef = useRef<NaverMap | null>(null);
  const [lng, lat] = loc; // 구조 분해

  const initializeMap = useCallback(() => {
    if (typeof window !== "undefined" && window.naver) {
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
  }, [lat, lng, zoom]);

  // 스크립트가 로드된 후 지도 초기화
  useEffect(() => {
    if (typeof window !== "undefined" && window.naver) {
      initializeMap();
    }
  }, [initializeMap]);

  return <div id={mapId} style={{ width: "100%", height: "100%" }} />;
}
