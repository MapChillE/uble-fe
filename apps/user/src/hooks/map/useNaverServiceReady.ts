import { useEffect, useState } from "react";

/**
 * 네이버 지도 서비스 준비 상태를 확인하는 훅
 *
 * 지오코딩 서비스(MyPlaceForm 등)에서만 사용
 * 일반 지도 초기화에는 window.naver?.maps만 확인
 *
 * @returns {serviceReady: boolean, retryCount: number} 서비스 준비 상태와 재시도 횟수
 */
const useNaverServiceReady = () => {
  const [serviceReady, setServiceReady] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 30; // 최대 3초 (100ms * 50)

  useEffect(() => {
    const checkServices = () => {
      // 네이버 지도 API와 마커 클러스터링 스크립트 모두 확인
      const naverReady = typeof window !== "undefined" && window.naver?.maps?.Service;
      const clusteringReady = typeof window !== "undefined" && window.MarkerClustering;

      if (naverReady && clusteringReady) {
        setServiceReady(true);
        return true;
      }
      return false;
    };

    // 즉시 확인
    if (checkServices()) {
      return;
    }

    // 폴링 방식으로 재시도
    const interval = setInterval(() => {
      setRetryCount((prev) => {
        const newCount = prev + 1;

        if (checkServices()) {
          clearInterval(interval);
          return newCount;
        }

        if (newCount >= maxRetries) {
          console.warn("네이버 서비스 초기화 실패: 최대 재시도 횟수 초과");
          clearInterval(interval);
        }

        return newCount;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return { serviceReady, retryCount };
};

export default useNaverServiceReady;
