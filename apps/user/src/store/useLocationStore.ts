import { Coordinates } from "@/types/map";
import { create } from "zustand";

interface LocationState {
  currentLocation: Coordinates | null; // 현재 GPS 위치
  setCurrentLocation: (loc: Coordinates) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  currentLocation: null,
  setCurrentLocation: (loc) => set({ currentLocation: loc }),
}));
