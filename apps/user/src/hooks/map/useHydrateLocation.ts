import { useEffect } from "react";
import { useLocationStore } from "@/store/useLocationStore";
import { useCurrentLocation } from "@/hooks/map/useCurrentLocation";

export const useHydrateLocation = () => {
  const setCurrentLocation = useLocationStore((s) => s.setCurrentLocation);
  const { location, getCurrentLocation } = useCurrentLocation();

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  useEffect(() => {
    if (location) {
      setCurrentLocation(location);
    }
  }, [location, setCurrentLocation]);
};
