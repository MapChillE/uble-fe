import { useCallback } from "react";
import { Coordinates } from "@/types/map";
import { createBoundsFromCenterAndZoom } from "@/utils/mapBounds";
import { DEFAULT_ZOOM_LEVEL } from "@/types/constants";

interface UseMapMovementProps {
  dispatch: (action: any) => void;
}

export const useMapMovement = ({ dispatch }: UseMapMovementProps) => {
  // 지도 중심 이동 및 bounds 생성
  const moveMapToLocation = useCallback(
    (location: Coordinates, zoom?: number) => {
      const targetZoom = zoom || DEFAULT_ZOOM_LEVEL;

      // 지도 중심 이동
      dispatch({ type: "SET_CENTER", payload: location });

      // 새로운 bounds 생성
      const newBounds = createBoundsFromCenterAndZoom(location, targetZoom);
      if (newBounds) {
        dispatch({ type: "SET_BOUNDS", payload: newBounds });
        return newBounds;
      }

      return null;
    },
    [dispatch]
  );

  // 줌 레벨 변경
  const changeZoom = useCallback(
    (zoom: number) => {
      dispatch({ type: "SET_ZOOM", payload: zoom });
    },
    [dispatch]
  );

  // bounds 변경
  const updateBounds = useCallback(
    (bounds: naver.maps.LatLngBounds) => {
      dispatch({ type: "SET_BOUNDS", payload: bounds });
    },
    [dispatch]
  );

  return {
    moveMapToLocation,
    changeZoom,
    updateBounds,
  };
};
