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

/**
 * 매장(스토어) 간략 정보 타입 (API 미구현으로 임시)
 */
export interface StoreSummary {
  // TODO: 상세 API 요청시 storeId로 보낼 수 있으니까 필요 여부 확인.
  // brandId: number;
  // storeId: number;
  storeName: string;
  description: string;
  address: string;
  phoneNumber: string;
  distance: number;
  category: string;
}

/**
 * 매장(스토어) 혜택 타입
 */
export interface StoreBenefit {
  benefitId: number;
  type: string;
  minRank: string;
  content: string;
  manual: string;
  provisionCount: string;
}

/**
 * 매장(스토어) 상세 API 응답 타입
 */
export interface StoreDetail {
  brandId: number;
  storeId: number;
  storeName: string;
  description: string;
  address: string;
  phoneNumber: string;
  distance: number;
  category: string;
  imageUrl?: string;
  benefitList: StoreBenefit[];
  normalAvailable: boolean;
  vipAvailable: boolean;
  localAvailable: boolean;
}

/**
 * 매장 상세 정보 API
 */ export interface StoreDetailResponse {
  data: StoreDetail;
  statusCode: number;
  message?: string;
}
