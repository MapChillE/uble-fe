import {
  Activity,
  HeartPulse,
  ShoppingCart,
  Home,
  Theater,
  GraduationCap,
  Plane,
  Utensils,
  Coffee,
  Users,
  Heart,
  Star,
  Calendar,
  HelpCircle, // default
} from "lucide-react";
import { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Types
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
  | "VIP콕"
  | "계절"
  | "default";

export interface CategoryMarkerStyle {
  color: string;
  icon: () => ReactNode;
}

export interface CategoryIconStyle {
  icon: () => ReactNode;
  color: string;
  markerColor: string;
}

// 공통 데이터 정의
const CATEGORY_META: Record<
  CategoryMarkerKey,
  { icon: any; markerColor: string; textColor: string }
> = {
  액티비티: { icon: Activity, markerColor: "#F87171", textColor: "text-red-500" },
  "뷰티/건강": { icon: HeartPulse, markerColor: "#A16207", textColor: "text-orange-500" },
  쇼핑: { icon: ShoppingCart, markerColor: "#34D399", textColor: "text-emerald-500" },
  "생활/건강": { icon: Home, markerColor: "#60A5FA", textColor: "text-blue-500" },
  "문화/여가": { icon: Theater, markerColor: "#C084FC", textColor: "text-purple-500" },
  교육: { icon: GraduationCap, markerColor: "#FACC15", textColor: "text-yellow-500" },
  "여행/교통": { icon: Plane, markerColor: "#5EEAD4", textColor: "text-teal-500" },
  식당: { icon: Utensils, markerColor: "#FB7185", textColor: "text-rose-500" },
  카페: { icon: Coffee, markerColor: "#FB923C", textColor: "text-orange-400" },
  우리동네멤버십: { icon: Users, markerColor: "#1E293B", textColor: "text-slate-700" },
  VIP콕: { icon: Star, markerColor: "#9869f1", textColor: "text-purple-600" },
  계절: { icon: Calendar, markerColor: "#22c55e", textColor: "text-green-500" },
  default: { icon: Heart, markerColor: "#FB7185", textColor: "text-gray-500" },
};

// 카테고리별 아이콘 스타일 정보 반환 (카테고리바용)
export const getCategoryIconStyle = (categoryName: string): CategoryIconStyle => {
  const meta = CATEGORY_META[categoryName as CategoryMarkerKey] || CATEGORY_META["default"];
  return {
    icon: () => <meta.icon size={16} />,
    color: meta.textColor,
    markerColor: meta.markerColor,
  };
};

// 카테고리별 아이콘 반환 (카테고리바용)
export const getCategoryIcon = (categoryName: string): ReactNode => {
  const iconStyle = getCategoryIconStyle(categoryName);
  return iconStyle.icon();
};

// 마커용 스타일 객체
export const CATEGORY_MARKER_STYLE: Record<CategoryMarkerKey, CategoryMarkerStyle> =
  Object.fromEntries(
    Object.entries(CATEGORY_META).map(([key, meta]) => [
      key,
      {
        color: meta.markerColor,
        icon: () => <meta.icon size={18} color="white" />,
      },
    ])
  ) as Record<CategoryMarkerKey, CategoryMarkerStyle>;

// HTML 문자열로 변환 (마커용)
export const getCategoryIconHTML = (iconComponent: () => ReactNode) => {
  const icon = iconComponent();
  return renderToStaticMarkup(icon as React.ReactElement);
};
