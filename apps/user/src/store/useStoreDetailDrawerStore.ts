import { create } from "zustand";
import { StoreSummary, StoreDetail } from "@/types/store";
import { getStoreDetail } from "@/service/store";
import { DEFAULT_LOCATION } from "@/types/constants";
import { toast } from "sonner";
import { Coordinates } from "@/types/map";

interface StoreDetailDrawerState {
  // Drawer 상태
  isOpen: boolean;
  snapIndex: number;
  isDetailLoading: boolean;

  // 데이터
  summary: StoreSummary | null;
  detail: StoreDetail | null;

  // 액션
  open: (summary: StoreSummary) => void;
  close: () => void;
  setSnapIndex: (index: number) => void;
  loadDetail: (baseLocation: Coordinates) => Promise<void>;
  updateBookmarkStatus: (isBookmarked: boolean) => void;
  reset: () => void;
}

const useStoreDetailDrawerStore = create<StoreDetailDrawerState>((set, get) => ({
  // 초기 상태
  isOpen: false,
  snapIndex: 0,
  isDetailLoading: false,
  summary: null,
  detail: null,

  // 액션
  open: (summary: StoreSummary) => {
    set({
      isOpen: true,
      summary,
      detail: null,
      snapIndex: 0,
    });
  },

  close: () => {
    set({
      isOpen: false,
      summary: null,
      detail: null,
      snapIndex: 0,
      isDetailLoading: false,
    });
  },

  setSnapIndex: (index: number) => {
    set({ snapIndex: index });
  },

  loadDetail: async (baseLocation: Coordinates) => {
    const { summary } = get();
    if (!summary) return;

    set({ isDetailLoading: true });

    try {
      const detail = await getStoreDetail({
        latitude: baseLocation[1],
        longitude: baseLocation[0],
        storeId: summary.storeId,
      });
      set({ detail, isDetailLoading: false });
    } catch (error) {
      toast.error("가맹점 상세 정보를 불러오지 못했습니다.");
      set({ isDetailLoading: false });
    }
  },

  updateBookmarkStatus: (isBookmarked: boolean) => {
    const { summary } = get();
    if (!summary) return;

    set({
      summary: {
        ...summary,
        isBookmarked,
      },
    });
  },

  reset: () => {
    set({
      isOpen: false,
      snapIndex: 0,
      isDetailLoading: false,
      summary: null,
      detail: null,
    });
  },
}));

export default useStoreDetailDrawerStore;
