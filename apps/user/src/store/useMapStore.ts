import { create } from "zustand";
import { Category } from "@/types/constants";
import { MyPlace } from "@/types/map";

interface MapState {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;

  myPlaces: MyPlace[];
  addMyPlace: (place: MyPlace) => void;

  selectedPlaceId: string;
  setSelectedPlaceId: (id: string) => void;
}

export const useMapStore = create<MapState>((set) => ({
  selectedCategory: "전체",
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  myPlaces: [],
  addMyPlace: (place) =>
    set((state) => ({
      myPlaces: [...state.myPlaces, place],
    })),

  selectedPlaceId: "current",
  setSelectedPlaceId: (id) => set({ selectedPlaceId: id }),
}));
