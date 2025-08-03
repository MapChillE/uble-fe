import { Coordinates } from "@/types/map";
import { Category } from "@/types/category";

export const GRADE_COLORS = {
  VIP콕: "#9869f1",
  VVIP: "#eb3f88",
  VIP: "#9869f1",
  우수: "#93aefe",
  일반: "#b5b3c2",
};

/** 사용자 추가 정보 입력 단계 */
export const TOTAL_STEPS = 5;

/** 개발 단계에서 사용할 기본 카테고리 목록 */
export const CATEGORIES = {
  1: "액티비티",
  2: "뷰티/패션",
  3: "쇼핑",
  4: "생활",
  5: "식당",
  6: "문화/여가",
  7: "교육",
  8: "여행",
  9: "카페",
  10: "편의점",
  11: "영화관",
  12: "렌트카",
} as const;

// export type Category = (typeof CATEGORIES)[number];

interface periodType {
  label: string;
  value: string;
}
export const periodOptions: periodType[] = [
  { label: "전체", value: "all" },
  { label: "1개월", value: "1month" },
  { label: "3개월", value: "3months" },
  { label: "6개월", value: "6months" },
  { label: "1년", value: "1year" },
];

export const DEFAULT_LOCATION: Coordinates = [126.978, 37.5665]; // 서울시청

export const ALL_CATEGORY: Category = { categoryId: 0, categoryName: "전체" };
export const ANY_CATEGORIES: Category[] = [
  { categoryId: "LOCAL", categoryName: "우리동네멤버십" },
  { categoryId: "SEASON", categoryName: "계절" },
  { categoryId: "VIP", categoryName: "VIP콕" },
];

export const MEMBERSHIP_GRADES = ["VVIP", "VIP", "우수", "일반"];

export const CURRENT_LOCATION_ID = -1;

export const DEFAULT_ZOOM_LEVEL = 16;
