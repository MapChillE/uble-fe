import MapInitializer from "@/components/MapInitializer";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MapInitializer />
      <div
        className="map-page"
        style={{
          height: "calc(100dvh - 55px - 55px)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {children}
      </div>
    </>
  );
}
