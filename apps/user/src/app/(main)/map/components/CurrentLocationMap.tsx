"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Coordinates,
  NaverMap as NaverMapInstance,
  NaverMapOptions,
  NaverMarker,
} from "@/types/map";

const mapId = "current-location-map";

type CurrentLocationMapProps = {
  zoom: number;
  category: string;
};

export default function CurrentLocationMap({ zoom, category }: CurrentLocationMapProps) {
  const mapRef = useRef<NaverMapInstance | null>(null);
  const markerRef = useRef<NaverMarker | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 현재 위치 가져오기
  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: Coordinates = [
          position.coords.longitude, // 경도
          position.coords.latitude, // 위도
        ];
        setCurrentLocation(coords);
        setLoading(false);
        console.log("현재 위치:", coords);
      },
      (error) => {
        console.error("위치 정보 오류:", error);
        setError(`위치 정보를 가져올 수 없습니다: ${error.message}`);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5분
      }
    );
  }, []);

  // 지도 초기화
  const initializeMap = useCallback(() => {
    if (typeof window !== "undefined" && window.naver && currentLocation) {
      const mapOptions: NaverMapOptions = {
        center: new window.naver.maps.LatLng(currentLocation[1], currentLocation[0]), // [lat, lng]
        zoom: zoom,
        scaleControl: true,
        mapDataControl: true,
        logoControlOptions: {
          position: window.naver.maps.Position.BOTTOM_LEFT,
        },
      };

      const map = new window.naver.maps.Map(mapId, mapOptions);
      mapRef.current = map;

      // 현재 위치에 마커 추가
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(currentLocation[1], currentLocation[0]),
        map: map,
        title: "현재 위치",
      });
      markerRef.current = marker;

      console.log("지도 초기화 완료:", currentLocation);
    }
  }, [currentLocation, zoom]);

  // 컴포넌트 마운트 시 현재 위치 가져오기
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  // 위치 정보 없이도 기본 지도 표시 (서울 시청)
  useEffect(() => {
    if (!currentLocation && !loading && !error && typeof window !== "undefined" && window.naver) {
      const defaultLocation: Coordinates = [126.978, 37.5665]; // 서울 시청
      const mapOptions: NaverMapOptions = {
        center: new window.naver.maps.LatLng(defaultLocation[1], defaultLocation[0]),
        zoom: zoom,
        scaleControl: true,
        mapDataControl: true,
        logoControlOptions: {
          position: window.naver.maps.Position.BOTTOM_LEFT,
        },
      };

      const map = new window.naver.maps.Map(mapId, mapOptions);
      mapRef.current = map;
      console.log("기본 지도 표시 (서울 시청)");
    }
  }, [currentLocation, loading, error, zoom]);

  // 현재 위치가 변경되면 지도 초기화
  useEffect(() => {
    if (currentLocation && typeof window !== "undefined" && window.naver) {
      initializeMap();
    }
  }, [currentLocation, initializeMap]);

  return (
    <div className="flex h-full w-full">
      <div id={mapId} className="w-full flex-1" />
    </div>
  );
}
