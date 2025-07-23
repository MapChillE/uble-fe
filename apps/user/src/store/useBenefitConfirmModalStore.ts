import { create } from "zustand";

interface BenefitConfirmModalState {
  isOpen: boolean;
  storeId: number | null;
  isVIPcock: boolean;
  open: () => void;
  close: () => void;
  setInfo: (storeId: number, isVIPcock: boolean) => void;
  resetInfo: () => void;
}

const useBenefitConfirmModalStore = create<BenefitConfirmModalState>((set) => ({
  isOpen: false,
  storeId: null,
  isVIPcock: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setInfo: (storeId, isVIPcock) => set({ storeId, isVIPcock }),
  resetInfo: () => set({ storeId: null, isVIPcock: false }),
}));

export default useBenefitConfirmModalStore;
