import MapContainer from "@/app/(main)/map/components/MapContainer";
import { Suspense } from "react";

export default function MapPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <MapContainer />
    </Suspense>
  );
}
