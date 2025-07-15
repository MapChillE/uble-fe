import { useState, useCallback } from "react";
import { Coordinates } from "@/types/map";

const DEFAULT_LOCATION: Coordinates = [126.978, 37.5665]; // 서울시청

export function useCurrentLocation() {
  const [location, setLocation] = useState<Coordinates>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("이 브라우저에서는 위치 정보를 지원하지 않습니다.");
      setLocation(DEFAULT_LOCATION);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: Coordinates = [position.coords.longitude, position.coords.latitude];
        setLocation(coords);
        setLoading(false);
        console.log("현재 위치:", coords);
      },
      // TODO : error, loading 처리
      (error) => {
        console.error("위치 정보 오류:", error);
        setError(`위치 정보를 가져올 수 없습니다: ${error.message}`);
        setLocation(DEFAULT_LOCATION); // 실패 시 기본 위치로 설정
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5분
      }
    );
  }, []);

  return { location, loading, error, getCurrentLocation };
}
