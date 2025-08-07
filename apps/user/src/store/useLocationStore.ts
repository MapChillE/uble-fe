import { Coordinates } from "@/types/map";
import { MyPlace } from "@/types/map";
import { create } from "zustand";
import { CURRENT_LOCATION_ID } from "@/types/constants";

interface LocationState {
  // GPS 위치
  currentLocation: Coordinates | null;
  setCurrentLocation: (loc: Coordinates) => void;

  // 내 장소 관리
  myPlaces: MyPlace[];
  addMyPlace: (place: MyPlace) => void;
  removeMyPlace: (id: number) => void;
  setMyPlaces: (places: MyPlace[]) => void;

  // 선택된 장소
  selectedPlaceId: number;
  setSelectedPlaceId: (id: number) => void;

  // 현재 기준 위치 (GPS 또는 선택된 장소)
  baseLocation: Coordinates | null;
  setBaseLocation: (loc: Coordinates) => void;
}

export const useLocationStore = create<LocationState>((set, get) => ({
  currentLocation: null,
  setCurrentLocation: (loc) => set({ currentLocation: loc }),

  myPlaces: [],
  addMyPlace: (place) => set((state) => ({ myPlaces: [...state.myPlaces, place] })),
  removeMyPlace: (id) =>
    set((state) => ({
      myPlaces: state.myPlaces.filter((p) => p.id !== id),
    })),
  setMyPlaces: (places) => set({ myPlaces: places }),

  selectedPlaceId: CURRENT_LOCATION_ID,
  setSelectedPlaceId: (id) => set({ selectedPlaceId: id }),

  baseLocation: null,
  setBaseLocation: (loc) => set({ baseLocation: loc }),
}));
