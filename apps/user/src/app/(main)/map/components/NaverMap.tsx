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
// 카테고리별 아이콘 반환 함수
function getCategoryIcon(category?: string) {
  switch (category) {
    case "액티비티":
      return {
        content: `<div style="background:#FF6B6B;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;">🏃</div>`,
        size: new window.naver.maps.Size(28, 28),
        anchor: new window.naver.maps.Point(14, 28),
      };
    case "뷰티/건강":
      return {
        content: `<div style="background:#FFB347;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;">💄</div>`,
        size: new window.naver.maps.Size(28, 28),
        anchor: new window.naver.maps.Point(14, 28),
      };
    case "쇼핑":
      return {
        content: `<div style="background:#6BCB77;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;">🛍️</div>`,
        size: new window.naver.maps.Size(28, 28),
        anchor: new window.naver.maps.Point(14, 28),
      };
    case "생활/건강":
      return {
        content: `<div style="background:#4D96FF;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;">🏠</div>`,
        size: new window.naver.maps.Size(28, 28),
        anchor: new window.naver.maps.Point(14, 28),
      };
    case "문화/여가":
      return {
        content: `<div style="background:#A259FF;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;">🎭</div>`,
        size: new window.naver.maps.Size(28, 28),
        anchor: new window.naver.maps.Point(14, 28),
      };
    case "교육":
      return {
        content: `<div style="background:#FFD93D;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;">📚</div>`,
        size: new window.naver.maps.Size(28, 28),
        anchor: new window.naver.maps.Point(14, 28),
      };
    case "여행/교통":
      return {
        content: `<div style="background:#43BCCD;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;">✈️</div>`,
        size: new window.naver.maps.Size(28, 28),
        anchor: new window.naver.maps.Point(14, 28),
      };
    case "식당":
      return {
        content: `<div style="background:#FF7F50;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;">🍽️</div>`,
        size: new window.naver.maps.Size(28, 28),
        anchor: new window.naver.maps.Point(14, 28),
      };
    case "카페":
      return {
        content: `<div style="background:#A3A847;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;">☕</div>`,
        size: new window.naver.maps.Size(28, 28),
        anchor: new window.naver.maps.Point(14, 28),
      };
    case "우리동네멤버십":
      return {
        content: `<div style="background:#22223B;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;color:#fff;">🏅</div>`,
        size: new window.naver.maps.Size(28, 28),
        anchor: new window.naver.maps.Point(14, 28),
      };
    default:
      return null;
  }
}

export default function NaverMap({ loc, zoom = 15, pins }: NaverMapProps) {
  const mapRef = useRef<NaverMapInstance | null>(null);
  const markerRefs = useRef<NaverMarker[]>([]);
  const clustererRef = useRef<any>(null);
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
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 4px rgba(0,0,0,0.3);
          "></div>`,
        size: new window.naver.maps.Size(20, 20),
        anchor: new window.naver.maps.Point(10, 10),
      };
    }
    // 카테고리별 마커 아이콘 적용
    if (pin.type === "store" && pin.category) {
      console.log(pin.category);
      const icon = getCategoryIcon(pin.category);
      if (icon) markerOptions.icon = icon;
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

  // 마커/클러스터러 관리
  useEffect(() => {
    if (!mapRef.current || !pins?.length || !window.naver || !window.MarkerClustering) return;

    // center 이동
    mapRef.current.setCenter(new window.naver.maps.LatLng(lat, lng));

    // 기존 마커 제거
    markerRefs.current.forEach((marker) => marker.setMap(null));
    markerRefs.current = [];

    // 기존 클러스터러 제거
    if (clustererRef.current) {
      clustererRef.current.setMap(null);
      clustererRef.current = null;
    }
    // 현위치 마커 분리
    const currentPin = pins.find((pin) => pin.type === "current");
    const otherPins = pins.filter((pin) => pin.type !== "current");

    // 현위치 마커 생성 및 지도에 표시
    let currentMarker: NaverMarker | null = null;
    if (currentPin) {
      currentMarker = createMarker(currentPin);
      currentMarker.setMap(mapRef.current);
    }
    // 나머지 마커 생성
    const newMarkers = otherPins.map((pin) => createMarker(pin));
    markerRefs.current = newMarkers;

    // 클러스터러 생성
    const HTMLMARKER = {
      content:
        "<div style='width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#6BCB77,#4D96FF);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.15);font-weight:bold;font-size:18px;color:#fff;'><span id='cluster-count'></span></div>",
      size: new window.naver.maps.Size(44, 44),
      anchor: new window.naver.maps.Point(22, 44),
    };
    clustererRef.current = new window.MarkerClustering({
      minClusterSize: 2,
      maxZoom: 14,
      map: mapRef.current,
      markers: newMarkers,
      disableClickZoom: false,
      gridSize: 150,
      icons: [HTMLMARKER],
      indexGenerator: [10, 50, 100, 200, 500],
      stylingFunction: (clusterMarker: any, count: number) => {
        const el = clusterMarker.getElement().querySelector("span#cluster-count");
        if (el) el.innerHTML = count;
      },
    });

    // 클린업 시 현위치 마커도 제거
    return () => {
      if (currentMarker) {
        currentMarker.setMap(null);
      }
    };
  }, [pins, loc]);

  return <div id={mapId} style={{ width: "100%", height: "100%" }} />;
}
