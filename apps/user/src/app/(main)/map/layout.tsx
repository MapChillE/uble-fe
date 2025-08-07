"use client";
import Script from "next/script";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
      <div
        style={{
          position: "relative",
          height: "calc(100dvh - 55px - 55px)",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </>
  );
}
