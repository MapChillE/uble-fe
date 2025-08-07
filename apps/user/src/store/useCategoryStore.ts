import { create } from "zustand";
import { Category } from "@/types/category";

interface CategoryState {
  // 홈, 지도에 표시되는 모든 카테고리 목록 (API 응답에 전체, 계절, VIP콕, 우리동네멤버십 추가)
  categories: Category[];
  setCategories: (categories: Category[]) => void;

  // 유저가 관심 카테고리로 선택할 카테고리 목록 (API 응답과 동일)
  userCategories: Category[];
  setUserCategories: (userCategories: Category[]) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),

  userCategories: [],
  setUserCategories: (userCategories) => set({ userCategories }),
}));
