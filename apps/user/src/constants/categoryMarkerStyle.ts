export type CategoryMarkerKey =
  | "액티비티"
  | "뷰티/건강"
  | "쇼핑"
  | "생활/건강"
  | "문화/여가"
  | "교육"
  | "여행/교통"
  | "식당"
  | "카페"
  | "우리동네멤버십"
  | "default";

export interface CategoryMarkerStyle {
  color: string;
  emoji: string;
}

export const CATEGORY_MARKER_STYLE: Record<CategoryMarkerKey, CategoryMarkerStyle> = {
  액티비티: { color: "#FF6B6B", emoji: "🏃" },
  "뷰티/건강": { color: "#FFB347", emoji: "💄" },
  쇼핑: { color: "#6BCB77", emoji: "🛍️" },
  "생활/건강": { color: "#4D96FF", emoji: "🏠" },
  "문화/여가": { color: "#A259FF", emoji: "🎭" },
  교육: { color: "#FFD93D", emoji: "📚" },
  "여행/교통": { color: "#43BCCD", emoji: "✈️" },
  식당: { color: "#FF7F50", emoji: "🍽️" },
  카페: { color: "#A3A847", emoji: "☕" },
  우리동네멤버십: { color: "#22223B", emoji: "🏅" },
  default: { color: "#888", emoji: "❓" },
};
