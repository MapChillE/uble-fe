"use client";

import { useEffect } from "react";

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
          reject(err);
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
            reject("naver.maps 로드 실패");
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
        loadClusteringScript();
      } catch (err) {}
    };

    initialize();
  }, []);

  return null;
}
