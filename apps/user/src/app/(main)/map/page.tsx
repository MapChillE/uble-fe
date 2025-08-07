import MapContainer from "@/app/(main)/map/components/MapContainer";
import { Suspense } from "react";

export default function MapPage() {
  return (
    <Suspense
      fallback={
        <div className="absolute inset-0 z-50 flex h-full w-full flex-col items-center justify-center gap-3">
          <div className="border-t-action-green mb-3 h-10 w-10 animate-spin rounded-full border-4 border-gray-200" />
          <div>로딩 중...</div>
        </div>
      }
    >
      <MapContainer />
    </Suspense>
  );
}
