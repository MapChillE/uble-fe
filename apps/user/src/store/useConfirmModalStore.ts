import { create } from "zustand";

interface ConfirmModalState {
  isOpen: boolean;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  open: (options: {
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
  }) => void;
  close: () => void;
}

const useConfirmModalStore = create<ConfirmModalState>((set) => ({
  isOpen: false,
  message: "",
  confirmText: "확인",
  cancelText: "취소",
  onConfirm: undefined,
  open: ({ message, confirmText = "확인", cancelText = "취소", onConfirm }) =>
    set({ isOpen: true, message, confirmText, cancelText, onConfirm }),
  close: () =>
    set({
      isOpen: false,
      message: "",
      confirmText: "확인",
      cancelText: "취소",
      onConfirm: undefined,
    }),
}));

export default useConfirmModalStore;
