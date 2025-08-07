import { UserInfo } from "@/types/profile";
import { create } from "zustand";

interface UserStore {
  user: UserInfo | null; // ← UserInfo 또는 null
  setUser: (user: UserInfo) => void;
  clearUser: () => void; // ← 로그아웃 등에서 user 초기화용
  updateUser: (fields: Partial<UserInfo>) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null, // ← 초기값을 null로
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }), // ← user 초기화
  updateUser: (fields) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, ...fields } // user가 있을 때만 병합
        : null,
    })),
}));

export default useUserStore;
