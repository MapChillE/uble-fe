"use client";
import Script from "next/script";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 네이버 지도 및 클러스터링 스크립트 */}
      <Script
        strategy="afterInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}&submodules=geocoder`}
        onLoad={() => {
          const script = document.createElement("script");
          script.src = "/MarkerClustering.js";
          script.async = true;
          document.body.appendChild(script);
        }}
      />

      <main
        style={{
          height: "calc(100vh - 60px - 72px)",
          overflow: "hidden",
        }}
      >
        {children}
      </main>
    </>
  );
}
