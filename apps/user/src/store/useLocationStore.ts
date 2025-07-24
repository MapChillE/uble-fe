import { create } from "zustand";

export interface LocationType {
  // 필요한 필드를 여기에 추가하세요. 임시로 any로 둡니다.
  [key: string]: any;
}

interface LocationStoreState {
  location: LocationType | null;
  setCurrentLocation: (location: LocationType) => void;
}

export const useLocationStore = create<LocationStoreState>((set) => ({
  location: null,
  setCurrentLocation: (location) => set({ location }),
}));
