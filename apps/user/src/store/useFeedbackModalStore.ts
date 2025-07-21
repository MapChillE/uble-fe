import { create } from 'zustand';

interface FeedbackModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useFeedbackModalStore = create<FeedbackModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useFeedbackModalStore; 