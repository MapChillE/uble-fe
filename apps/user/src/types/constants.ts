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
export const ANY_CATEGORYS: Category[] = [
  { categoryId: "LOCAL", categoryName: "우리동네멤버십" },
  { categoryId: "SEASON", categoryName: "계절" },
  { categoryId: "VIP", categoryName: "VIP콕" },
];

export const MEMBERSHIP_GRADES = ["VVIP", "VIP", "우수", "일반"];
