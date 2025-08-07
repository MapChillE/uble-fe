import { responseStatus } from "./api";

export interface Category {
  /** 카테고리 ID */
  categoryId: number | "SEASON" | "VIP" | "LOCAL";
  /** 카테고리 이름 */
  categoryName: string;
}

export interface SearchParams extends Category {
  season: string;
  type: "VIP" | "LOCAL";
}

export interface CategoryList {
  categoryList: Category[];
}
/**
 * 카테고리 전체 조회 API[]
 */
export interface CategoryListResponse extends responseStatus {
  categoryList: Category[];
}
