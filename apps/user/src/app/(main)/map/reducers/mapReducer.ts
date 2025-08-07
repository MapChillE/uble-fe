import { Coordinates } from "@/types/map";
import { Pin } from "@/app/(main)/map/components/NaverMap";

export interface MapState {
  center: Coordinates;
  bounds: naver.maps.LatLngBounds | null;
  zoom: number;
  pins: Pin[];
}

export type MapAction =
  | { type: "SET_CENTER"; payload: Coordinates }
  | { type: "SET_BOUNDS"; payload: naver.maps.LatLngBounds }
  | { type: "SET_ZOOM"; payload: number }
  | { type: "SET_PINS"; payload: Pin[] };

export const mapReducer = (state: MapState, action: MapAction): MapState => {
  switch (action.type) {
    case "SET_CENTER":
      return { ...state, center: action.payload };
    case "SET_BOUNDS":
      return { ...state, bounds: action.payload };
    case "SET_ZOOM":
      return { ...state, zoom: action.payload };
    case "SET_PINS":
      return { ...state, pins: action.payload };
    default:
      return state;
  }
};
