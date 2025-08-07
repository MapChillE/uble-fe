import type { CategoryMarkerKey } from "@/constants/categoryMarkerStyle"; // 앞서 정의한 타입 재사용

const CATEGORY_BADGE_COLOR: Record<CategoryMarkerKey | "default", string> = {
  액티비티: "bg-red-100 text-red-800",
  식당: "bg-rose-100 text-rose-800",
  "뷰티/패션": "bg-pink-100 text-pink-800",
  카페: "bg-orange-100 text-orange-800",
  쇼핑: "bg-emerald-100 text-emerald-800",
  여행: "bg-teal-100 text-teal-800",
  렌트카: "bg-teal-50 text-teal-800",
  생활: "bg-blue-100 text-blue-800",
  편의점: "bg-sky-100 text-sky-800",
  "문화/여가": "bg-purple-100 text-purple-800",
  영화관: "bg-violet-100 text-violet-800",
  VIP콕: "bg-purple-200 text-purple-800",
  교육: "bg-yellow-100 text-yellow-800",
  계절: "bg-green-100 text-green-800",
  우리동네멤버십: "bg-slate-100 text-slate-800",
  default: "bg-slate-100 text-slate-800",
};

/* -------------------------------------------------------------------------- */
/*  배지 클래스 반환 유틸                                                      */
/* -------------------------------------------------------------------------- */
export const getCategoryColor = (category: string): string =>
  CATEGORY_BADGE_COLOR[(category as CategoryMarkerKey) ?? "default"] ??
  CATEGORY_BADGE_COLOR.default;
