import { create } from "zustand";

interface BenefitConfirmModalState {
  isOpen: boolean;
  storeId: number | null;
  isVIPcock: boolean;
  vipOnly: boolean;
  onSuccess: (() => void) | null;
  open: () => void;
  close: () => void;
  setInfo: (storeId: number, isVIPcock: boolean, vipOnly: boolean) => void;
  resetInfo: () => void;
  setOnSuccess: (cb: (() => void) | null) => void;
}

const useBenefitConfirmModalStore = create<BenefitConfirmModalState>((set) => ({
  isOpen: false,
  storeId: null,
  isVIPcock: false,
  vipOnly: false,
  onSuccess: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setInfo: (storeId, isVIPcock, vipOnly) => set({ storeId, isVIPcock, vipOnly }),
  resetInfo: () => set({ storeId: null, isVIPcock: false, onSuccess: null }),
  setOnSuccess: (cb) => set({ onSuccess: cb }),
}));

export default useBenefitConfirmModalStore;
