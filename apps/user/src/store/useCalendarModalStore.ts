import { create } from 'zustand';

interface CalendarModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useCalendarModalStore = create<CalendarModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useCalendarModalStore; 