import { useRef, useEffect, useState } from "react";
import type { NaverMarker, NaverMap as NaverMapInstance, MyPlace } from "@/types/map";
import { MarkerClustering } from "@/types/markerClustering";
import { Pin } from "@/app/(main)/map/components/NaverMap";
import {
  getCategoryIconByZoom,
  getSearchResultIcon,
  getMyPlaceIcon,
  getCurrentLocationIcon,
  CATEGORY_MARKER_STYLE,
  CategoryMarkerKey,
} from "@/constants/categoryMarkerStyle";

interface UseMarkerAndClusterManagerProps {
  mapRef: React.RefObject<NaverMapInstance | null>;
  pins: Pin[] | undefined;
  zoom: number;
  selectedPlace?: MyPlace;
}

export const useMarkerAndClusterManager = ({
  mapRef,
  pins,
  zoom,
  selectedPlace,
}: UseMarkerAndClusterManagerProps) => {
  const markerRefs = useRef<NaverMarker[]>([]);
  const currentMarkerRef = useRef<NaverMarker | null>(null);
  const selectedMarkerRef = useRef<NaverMarker | null>(null);
  const clustererRef = useRef<MarkerClustering | null>(null);
  const previousZoomRef = useRef<number>(zoom);
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);

  // 클릭된 마커에 강조 효과를 추가하는 함수
  const addEmphasisToMarker = (marker: NaverMarker, color: string) => {
    const element = marker.getElement();
    if (!element) return;

    // 기존 강조 효과 제거
    const existingEmphasis = element.querySelector(".marker-emphasis");
    if (existingEmphasis) {
      existingEmphasis.remove();
    }

    // 새로운 강조 효과 추가
    const emphasis = document.createElement("div");
    emphasis.className = "marker-emphasis";
    emphasis.style.cssText = `
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      border: 3px solid ${color};
      border-radius: 50%;
      animation: emphasisPulse 2s ease-in-out infinite;
      z-index: 0;
      pointer-events: none;
    `;

    // 마커 자체에 그림자 효과 추가
    const markerCircle = element.querySelector('div[style*="border-radius: 50%"]') as HTMLElement;
    if (markerCircle) {
      markerCircle.style.boxShadow = `
        0 4px 12px rgba(0,0,0,0.3),
        0 0 0 2px rgba(255,255,255,0.8) inset,
        0 0 20px ${color}40
      `;
      markerCircle.style.transform = "scale(1.1)";
      markerCircle.style.transition = "all 0.3s ease";
    }

    // 애니메이션 스타일 추가
    const style = document.createElement("style");
    style.textContent = `
      @keyframes emphasisPulse {
        0% {
          transform: scale(1);
          opacity: 0.8;
        }
        50% {
          transform: scale(1.2);
          opacity: 0.4;
        }
        100% {
          transform: scale(1);
          opacity: 0.8;
        }
      }
    `;
    document.head.appendChild(style);

    element.appendChild(emphasis);
  };

  // 마커에서 강조 효과 제거하는 함수
  const removeEmphasisFromMarker = (marker: NaverMarker) => {
    const element = marker.getElement();
    if (!element) return;

    // 강조 효과 제거
    const emphasis = element.querySelector(".marker-emphasis");
    if (emphasis) {
      emphasis.remove();
    }

    // 마커 원래 상태로 복원
    const markerCircle = element.querySelector('div[style*="border-radius: 50%"]') as HTMLElement;
    if (markerCircle) {
      markerCircle.style.boxShadow = "";
      markerCircle.style.transform = "scale(1)";
      markerCircle.style.transition = "all 0.3s ease";
    }
  };

  // 클릭된 마커에 꼬리를 추가하는 함수
  const addTailToMarker = (marker: NaverMarker, color: string) => {
    const element = marker.getElement();
    if (!element) return;

    // 기존 꼬리 제거
    const existingTail = element.querySelector(".marker-tail");
    if (existingTail) {
      existingTail.remove();
    }

    // 애니메이션 스타일 추가
    const style = document.createElement("style");
    style.textContent = `
      @keyframes tailAppear {
        0% {
          transform: translateX(-50%) rotate(-45deg) scale(0);
          opacity: 0;
        }
        50% {
          transform: translateX(-50%) rotate(-45deg) scale(1.2);
          opacity: 0.8;
        }
        100% {
          transform: translateX(-50%) rotate(-45deg) scale(1);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  };

  // 마커 아이콘 업데이트 함수
  const updateMarkerIcon = (marker: NaverMarker, pin: Pin, currentZoom: number) => {
    if (pin.type === "current" || pin.type === "selected") {
      return;
    } else if (pin.type === "store" && pin.category) {
      const icon = getCategoryIconByZoom(pin.category, pin.name, currentZoom);
      if (icon) {
        marker.setIcon(icon);

        // 선택된 마커인 경우 강조 효과 추가
        if (selectedMarkerId === pin.id) {
          // 카테고리 색상 사용
          const key = (pin.category as CategoryMarkerKey) ?? "default";
          const style = CATEGORY_MARKER_STYLE[key] ?? CATEGORY_MARKER_STYLE["default"];
          const color = style?.color || "#666";

          // 강조 효과 추가
          addEmphasisToMarker(marker, color);
        } else {
          // 강조 효과 제거
          removeEmphasisFromMarker(marker);
        }
      }
    } else if (pin.type === "search") {
      // 검색결과 마커 스타일
      const icon = getSearchResultIcon(pin.name, currentZoom);
      if (icon) {
        marker.setIcon(icon);
      }
    } else if (pin.type === "myplace") {
      // 내장소 마커 스타일
      const icon = getMyPlaceIcon(pin.name, currentZoom);
      if (icon) {
        marker.setIcon(icon);
      }
    }
  };

  // 마커 생성 함수
  const createMarker = (pin: Pin): NaverMarker => {
    const position = new window.naver.maps.LatLng(pin.coords[1], pin.coords[0]);

    const markerOptions: naver.maps.MarkerOptions = {
      position,
      map: mapRef.current!,
      title: pin.name || "",
    };

    // 마커 타입에 따른 zIndex 설정
    if (pin.type === "current") {
      markerOptions.zIndex = 1000; // 현위치 마커가 가장 위에
    } else if (pin.type === "search" || pin.type === "myplace") {
      markerOptions.zIndex = 900; // 검색결과, 내장소 마커가 그 다음
    } else if (pin.type === "selected") {
      markerOptions.zIndex = 800; // 선택된 마커
    } else {
      markerOptions.zIndex = 100; // 일반 카테고리 마커는 가장 아래
    }

    // 마커 타입에 따른 아이콘 설정
    if (pin.type === "current") {
      const currentIcon = getCurrentLocationIcon();
      if (currentIcon) {
        markerOptions.icon = currentIcon;
      }
    } else if (pin.type === "selected") {
      const selectedIcon = getCategoryIconByZoom(pin.category, selectedPlace?.name, zoom);
      if (selectedIcon) {
        markerOptions.icon = selectedIcon;
      }
    } else if (pin.type === "store" && pin.category) {
      const icon = getCategoryIconByZoom(pin.category, pin.name, zoom);
      if (icon) {
        markerOptions.icon = icon;
      }
    } else if (pin.type === "search") {
      const icon = getSearchResultIcon(pin.name, zoom);
      if (icon) {
        markerOptions.icon = icon;
      }
    } else if (pin.type === "myplace") {
      const icon = getMyPlaceIcon(pin.name, zoom);
      if (icon) {
        markerOptions.icon = icon;
      }
    }

    const marker = new window.naver.maps.Marker(markerOptions);

    // 마커 생성 후 선택 상태 적용
    if (selectedMarkerId === pin.id) {
      if (pin.type === "store" && pin.category) {
        // 카테고리 색상 사용
        const key = (pin.category as CategoryMarkerKey) ?? "default";
        const style = CATEGORY_MARKER_STYLE[key] ?? CATEGORY_MARKER_STYLE["default"];
        const color = style?.color || "#666";

        // 강조 효과 추가
        addEmphasisToMarker(marker, color);
      }
    }

    if (pin.onClick) {
      window.naver.maps.Event.addListener(marker, "click", () => {
        // 클릭 시 선택된 마커 ID 설정
        setSelectedMarkerId(pin.id);

        // 원래 onClick 함수 실행
        pin.onClick!();
      });
    }

    return marker;
  };

  // 클러스터 아이콘 생성 함수
  const createClusterIcon = (size: number, fontSize: number) => ({
    content: `
  <div style='
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: linear-gradient(135deg, #34D399, #10B981);
    color: white;
    font-weight: bold;
    font-size: ${fontSize}px;
    box-shadow: 0 3px 8px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.85;
  '><span id='cluster-count'></span></div>`,
    size: new window.naver.maps.Size(size, size),
    anchor: new window.naver.maps.Point(size / 2, size),
  });

  // 클러스터 아이콘 배열 생성
  const getClusterIcons = () => [
    createClusterIcon(36, 13), // 1-9개
    createClusterIcon(44, 15), // 10-49개
    createClusterIcon(48, 16), // 50-99개
    createClusterIcon(52, 17), // 100-199개
    createClusterIcon(56, 18), // 200개 이상
  ];

  // 클러스터러 생성
  const createClusterer = (markers: NaverMarker[]) => {
    if (!mapRef.current || !window.naver || !window.MarkerClustering) return null;

    const clusterIcons = getClusterIcons();

    return new window.MarkerClustering({
      minClusterSize: 1,
      maxZoom: 14,
      map: mapRef.current,
      markers: markers,
      disableClickZoom: false,
      gridSize: 150,
      icons: clusterIcons,
      indexGenerator: [10, 50, 100, 200, 500],
      stylingFunction: (clusterMarker: any, count: number) => {
        const el = clusterMarker.getElement().querySelector("span#cluster-count");
        if (el) {
          el.innerHTML = count;
        }
      },
    });
  };

  // 마커와 클러스터러 통합 관리
  useEffect(() => {
    if (!mapRef.current || !window.naver) return;

    // 기존 클러스터러 제거
    if (clustererRef.current) {
      clustererRef.current.setMap(null);
      clustererRef.current = null;
    }

    // 기존 마커 제거
    markerRefs.current.forEach((marker) => marker.setMap(null));
    markerRefs.current = [];

    // 기존 현위치 마커 제거
    if (currentMarkerRef.current) {
      currentMarkerRef.current.setMap(null);
      currentMarkerRef.current = null;
    }

    if (selectedMarkerRef.current) {
      selectedMarkerRef.current.setMap(null);
      selectedMarkerRef.current = null;
    }

    // pins가 없거나 빈 배열이면 마커 제거
    if (!pins || pins.length === 0) {
      return;
    }

    // 현위치 마커 분리
    const currentPin = pins.find((pin) => pin.type === "current");
    const selectedPin = pins.find((pin) => pin.type === "selected");
    const otherPins = pins.filter((pin) => pin.type !== "current" && pin.type !== "selected");

    // 현위치 마커 생성 및 지도에 표시
    if (currentPin) {
      currentMarkerRef.current = createMarker(currentPin);
      currentMarkerRef.current.setMap(mapRef.current);
    }

    if (selectedPin) {
      selectedMarkerRef.current = createMarker(selectedPin);
      selectedMarkerRef.current.setMap(mapRef.current);
    }

    // 나머지 마커 생성
    const newMarkers = otherPins.map((pin) => createMarker(pin));
    markerRefs.current = newMarkers;

    // 클러스터러 생성 (현위치 제외)
    if (newMarkers.length > 0 && window.MarkerClustering) {
      clustererRef.current = createClusterer(newMarkers);
    }

    // 클린업
    return () => {
      if (clustererRef.current) {
        clustererRef.current.setMap(null);
        clustererRef.current = null;
      }
      if (currentMarkerRef.current) {
        currentMarkerRef.current.setMap(null);
        currentMarkerRef.current = null;
      }
      if (selectedMarkerRef.current) {
        selectedMarkerRef.current.setMap(null);
        selectedMarkerRef.current = null;
      }
    };
  }, [pins, selectedPlace]);

  // zoom 변경 시 마커 아이콘만 업데이트
  useEffect(() => {
    if (!mapRef.current || !window.naver) return;

    // 줌 레벨이 변경되었을 때만 마커 아이콘 업데이트
    if (zoom === previousZoomRef.current) {
      return;
    }

    // 모든 마커의 아이콘 업데이트
    const otherPins =
      pins?.filter((pin) => pin.type !== "current" && pin.type !== "selected") || [];

    markerRefs.current.forEach((marker, index) => {
      const pin = otherPins[index];
      if (pin) {
        updateMarkerIcon(marker, pin, zoom);
      }
    });

    // 현재 줌 레벨을 이전 줌 레벨로 저장
    previousZoomRef.current = zoom;
  }, [zoom, pins]);

  // 선택된 마커 변경 시 아이콘 업데이트
  useEffect(() => {
    if (!mapRef.current || !window.naver) return;

    // 모든 마커의 아이콘 업데이트
    const otherPins =
      pins?.filter((pin) => pin.type !== "current" && pin.type !== "selected") || [];

    markerRefs.current.forEach((marker, index) => {
      const pin = otherPins[index];
      if (pin) {
        updateMarkerIcon(marker, pin, zoom);
      }
    });
  }, [selectedMarkerId, pins, zoom]);

  return {
    markerRefs,
    currentMarkerRef,
    selectedMarkerRef,
    clustererRef,
    updateMarkerIcon,
  };
};
