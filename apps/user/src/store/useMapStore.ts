import { create } from "zustand";
import { MyPlace } from "@/types/map";

interface MapState {
  myPlaces: MyPlace[];
  addMyPlace: (place: MyPlace) => void;

  selectedPlaceId: string;
  setSelectedPlaceId: (id: string) => void;
}

export const useMapStore = create<MapState>((set) => ({
  myPlaces: [],
  addMyPlace: (place) =>
    set((state) => ({
      myPlaces: [...state.myPlaces, place],
    })),

  selectedPlaceId: "current",
  setSelectedPlaceId: (id) => set({ selectedPlaceId: id }),
}));
