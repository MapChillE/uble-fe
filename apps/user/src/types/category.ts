import { responseStatus } from "./api";

export interface Category {
  /** 카테고리 ID */
  categoryId: number | "SEASON" | "VIP" | "LOCAL";
  /** 카테고리 이름 */
  categoryName: string;
}

/**
 * 카테고리 전체 조회 API
 */
export interface CategoryListResponse extends responseStatus {
  data: {
    data: {
      /** 카테고리 목록 데이터 */
      categoryList: Category[];
    };
  };
}
