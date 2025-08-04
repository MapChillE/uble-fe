"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function MapInitializer() {
  useEffect(() => {
    const loadNaverScript = () => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        const clientId = process.env.NEXT_PUBLIC_MAP_CLIENT_ID;
        script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}&submodules=geocoder`;
        script.async = true;
        script.onload = () => {
          resolve();
        };
        script.onerror = (err) => {
          reject(new Error("네이버 지도 스크립트 로드에 실패했습니다."));
        };
        document.head.appendChild(script);
      });
    };

    const waitForNaver = () => {
      return new Promise<void>((resolve, reject) => {
        let retry = 0;
        const maxRetry = 100;

        const interval = setInterval(() => {
          if (window.naver && window.naver.maps) {
            clearInterval(interval);
            resolve();
          } else if (retry++ > maxRetry) {
            clearInterval(interval);
            reject(new Error("네이버 지도 초기화에 실패했습니다."));
          }
        }, 50);
      });
    };

    const loadClusteringScript = () => {
      const script = document.createElement("script");
      script.src = "/MarkerClustering.js";
      script.async = true;
      document.body.appendChild(script);
    };

    const initialize = async () => {
      try {
        await loadNaverScript();
        await waitForNaver();
        await loadClusteringScript();
      } catch (err) {
        toast.error("지도 로드에 실패했습니다.", {
          description: "페이지를 새로고침하거나 잠시 후 다시 시도해주세요.",
          duration: 5000,
        });
      }
    };

    initialize();
  }, []);

  return null;
}
