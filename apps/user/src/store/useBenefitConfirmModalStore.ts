import { create } from "zustand";
import { StoreDetail } from "@/types/store";

interface BenefitConfirmModalState {
  isOpen: boolean;
  storeId: number | null;
  storeDetail: StoreDetail | null;
  onSuccess: (() => void) | null;
  open: () => void;
  close: () => void;
  setInfo: (storeId: number, storeDetail: StoreDetail) => void;
  setOnSuccess: (cb: (() => void) | null) => void;
}

const useBenefitConfirmModalStore = create<BenefitConfirmModalState>((set) => ({
  isOpen: false,
  storeId: null,
  storeDetail: null,
  onSuccess: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setInfo: (storeId, storeDetail) => set({ storeId, storeDetail }),
  setOnSuccess: (cb) => set({ onSuccess: cb }),
}));

export default useBenefitConfirmModalStore;
