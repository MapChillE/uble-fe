import { create } from 'zustand';
import type { UserInfo as OriginalUserInfo } from '@/types/profile';

// 초기 store에서만 gender를 null 허용으로 확장
export type UserInfo = Omit<OriginalUserInfo, 'gender'> & { gender: 'MALE' | 'FEMALE' | null };

interface UserStore {
  user: UserInfo;
  setUser: (user: UserInfo) => void;
  updateUser: (fields: Partial<UserInfo>) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: {
    nickname: '',
    rank: '',
    gender: null,
    birthDate: '',
    categoryIds: [],
  },
  setUser: (user) => set({ user }),
  updateUser: (fields) => set((state) => ({ user: { ...state.user, ...fields } })),
}));

export default useUserStore; 