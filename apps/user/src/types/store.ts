import { responseStatus } from "@/types/api";

/**
 * 매장(스토어) 단일 항목 타입
 */
export interface StoreContent {
  storeId: number;
  storeName: string;
  category: string;
  latitude: number;
  longitude: number;
}

/**
 * 매장(스토어) 전체 리스트 API 응답 타입
 */
export interface StoreListData {
  data: StoreContent[];
  status: string;
  message?: string;
}

/**
 * 근처 매장 정보 조회 API
 */
export interface StoreListResponse extends responseStatus {
  data: {
    data: {
      storeList: StoreContent[];
    };
  };
}
