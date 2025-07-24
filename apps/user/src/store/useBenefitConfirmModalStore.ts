import { create } from "zustand";

interface BenefitConfirmModalState {
  isOpen: boolean;
  storeId: number | null;
  isVIPcock: boolean;
  onSuccess: (() => void) | null;
  open: () => void;
  close: () => void;
  setInfo: (storeId: number, isVIPcock: boolean) => void;
  resetInfo: () => void;
  setOnSuccess: (cb: (() => void) | null) => void;
}

const useBenefitConfirmModalStore = create<BenefitConfirmModalState>((set) => ({
  isOpen: false,
  storeId: null,
  isVIPcock: false,
  onSuccess: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setInfo: (storeId, isVIPcock) => set({ storeId, isVIPcock }),
  resetInfo: () => set({ storeId: null, isVIPcock: false, onSuccess: null }),
  setOnSuccess: (cb) => set({ onSuccess: cb }),
}));

export default useBenefitConfirmModalStore;
