import { create } from "zustand";
import { MyPlace } from "@/types/map";
import { CURRENT_LOCATION_ID } from "@/types/constants";

interface MapState {
  myPlaces: MyPlace[];
  addMyPlace: (place: MyPlace) => void;
  removeMyPlace: (id: number) => void;
  setMyPlaces: (places: MyPlace[]) => void;

  selectedPlaceId: number;
  setSelectedPlaceId: (id: number) => void;
}

export const useMapStore = create<MapState>((set) => ({
  myPlaces: [],
  addMyPlace: (place) => set((state) => ({ myPlaces: [...state.myPlaces, place] })),
  removeMyPlace: (id) =>
    set((state) => ({
      myPlaces: state.myPlaces.filter((p) => p.id !== id),
    })),
  setMyPlaces: (places) => set({ myPlaces: places }),

  selectedPlaceId: CURRENT_LOCATION_ID,
  setSelectedPlaceId: (id) => set({ selectedPlaceId: id }),
}));
