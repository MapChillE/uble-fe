import { create } from 'zustand';

interface ProfileEditModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useProfileEditModalStore = create<ProfileEditModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useProfileEditModalStore; 