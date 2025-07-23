import { responseStatus } from "./api";
import { BrandListData } from "./brand";

/**
 * 즐겨찾기 제휴처 전체 리스트 API
 */
export interface FavoriteBrandListResponse extends responseStatus {
  /** 브랜드 목록 데이터 */
  data: BrandListData;
}

export interface FavoritesResponse extends responseStatus {
  data: number;
}
