import { UserInfo } from "@/types/profile";
import { create } from "zustand";

interface UserStore {
  user: UserInfo;
  setUser: (user: UserInfo) => void;
  updateUser: (fields: Partial<UserInfo>) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: {
    nickname: "",
    rank: "",
    gender: "MALE",
    birthDate: "",
    categoryIds: [],
    barcode: "",
  },
  setUser: (user) => set({ user }),
  updateUser: (fields) => set((state) => ({ user: { ...state.user, ...fields } })),
}));

export default useUserStore;
