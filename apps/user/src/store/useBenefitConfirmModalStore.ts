import { create } from "zustand";

interface BenefitConfirmModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useBenefitConfirmModalStore = create<BenefitConfirmModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useBenefitConfirmModalStore;
