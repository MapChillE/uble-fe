import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import { Coordinates } from "@/types/map";
import { DEFAULT_LOCATION } from "@/types/constants";

interface GetCurrentLocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  forceRefresh?: boolean; // 강제 새로고침
}

export function useCurrentLocation() {
  const [location, setLocation] = useState<Coordinates>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasShownError = useRef(false);

  const getCurrentLocation = useCallback(
    async (options?: GetCurrentLocationOptions): Promise<Coordinates> => {
      const defaultOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0, // 캐시 비활성화 (매번 새로운 위치 요청)
        forceRefresh: true, // 강제 새로고침 (캐시 무시)
      };

      const finalOptions = { ...defaultOptions, ...options };

      // forceRefresh가 true면 캐시 무효화
      if (finalOptions.forceRefresh) {
        finalOptions.maximumAge = 0;
      }

      if (!navigator.geolocation) {
        const errorMessage = "이 브라우저에서는 위치 정보를 지원하지 않습니다.";
        setError(errorMessage);
        setLocation(DEFAULT_LOCATION);
        setLoading(false);
        if (!hasShownError.current) {
          toast.error(errorMessage);
          hasShownError.current = true;
        }
        throw new Error(errorMessage);
      }

      setLoading(true);
      setError(null);

      return new Promise<Coordinates>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords: Coordinates = [position.coords.longitude, position.coords.latitude];
            setLocation(coords);
            setLoading(false);
            hasShownError.current = false; // 성공 시 오류 플래그 리셋
            resolve(coords);
          },
          // 위치 정보 오류 처리
          (error) => {
            let errorMessage = "위치 정보를 가져올 수 없습니다.";

            // 구체적인 오류 메시지 설정
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage =
                  "위치 정보 접근이 거부되었습니다. 브라우저 설정에서 위치 정보 접근을 허용해주세요.";
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = "위치 정보를 사용할 수 없습니다. 네트워크 연결을 확인해주세요.";
                break;
              case error.TIMEOUT:
                errorMessage = "위치 정보 요청 시간이 초과되었습니다. 다시 시도해주세요.";
                break;
              default:
                errorMessage = `위치 정보 오류: ${error.message}`;
            }

            setError(errorMessage);
            setLocation(DEFAULT_LOCATION); // 실패 시 기본 위치로 설정
            setLoading(false);

            // 오류 한 번만 표시
            if (!hasShownError.current) {
              toast.error(errorMessage);
              hasShownError.current = true;
            }

            reject(new Error(errorMessage));
          },
          {
            enableHighAccuracy: finalOptions.enableHighAccuracy,
            timeout: finalOptions.timeout,
            maximumAge: finalOptions.maximumAge,
          }
        );
      });
    },
    []
  );

  return {
    location,
    loading,
    error,
    getCurrentLocation,
  };
}
