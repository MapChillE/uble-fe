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

// 시간대별 멘트 설정
export const TIME_MESSAGES = [
  { min: 0, max: 6, firstLine: "고요한 새벽", secondLine: "당신을 기다리는 특별한 제휴처" },
  {
    min: 6,
    max: 10,
    firstLine: "상쾌한 아침",
    secondLine: "기분 좋은 시작을 여는 인기 제휴처",
  },
  {
    min: 10,
    max: 14,
    firstLine: "활기찬 점심",
    secondLine: "가장 북적이는 인기 제휴처는 어디일까요?",
  },
  { min: 14, max: 17, firstLine: "여유로운 오후", secondLine: "잠시 머물고 싶은 인기 제휴처" },
  {
    min: 17,
    max: 20,
    firstLine: "따스한 저녁",
    secondLine: "하루의 마침표를 찍는 인기 제휴처",
  },
  { min: 20, max: 24, firstLine: "하루의 끝", secondLine: "마지막으로 사람들이 모이는 곳" },
] as const;

export const DEFAULT_MESSAGE = {
  firstLine: "지금 이시간,",
  secondLine: "이런 제휴처는 어떠세요?",
} as const;
