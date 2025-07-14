export const GRADE_COLORS = {
  VIP콕: "#9869f1",
  VVIP: "#eb3f88",
  VIP: "#9869f1",
  우수: "#93aefe",
  일반: "#b5b3c2",
};

export const CATEGORIES = [
  "전체",
  "계절",
  "액티비티",
  "뷰티/건강",
  "쇼핑",
  "생활/편의",
  "푸드",
  "문화여가",
  "교육",
  "여행/교통",
  "우리동네멤버십",
] as const;

export type Category = (typeof CATEGORIES)[number];
