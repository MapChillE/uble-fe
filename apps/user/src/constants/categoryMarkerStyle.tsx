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
  HelpCircle,
  Film,
  Car,
  Store,
  Popcorn,
  Gem,
} from "lucide-react";
import { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Types
export type CategoryMarkerKey =
  | "액티비티"
  | "뷰티/패션"
  | "쇼핑"
  | "생활"
  | "식당"
  | "문화/여가"
  | "교육"
  | "여행"
  | "카페"
  | "편의점"
  | "영화관"
  | "렌트카"
  | "우리동네멤버십"
  | "VIP콕"
  | "계절"
  | "default";

export interface CategoryMarkerStyle {
  color: string;
  icon: (size?: number) => ReactNode;
}

export interface CategoryIconStyle {
  icon: () => ReactNode;
  color: string;
  markerColor: string;
}

// 공통 데이터 정의
const CATEGORY_META = {
  액티비티: { icon: Activity, markerColor: "#F87171", textColor: "text-red-500" },
  식당: { icon: Utensils, markerColor: "#FB7185", textColor: "text-rose-500" },
  "뷰티/패션": { icon: Heart, markerColor: "#EC4899", textColor: "text-pink-500" },
  카페: { icon: Coffee, markerColor: "#FB923C", textColor: "text-orange-400" },
  쇼핑: { icon: ShoppingCart, markerColor: "#34D399", textColor: "text-emerald-500" },
  여행: { icon: Plane, markerColor: "#5EEAD4", textColor: "text-teal-400" },
  렌트카: { icon: Car, markerColor: "#2DD4BF", textColor: "text-teal-500" },
  생활: { icon: Home, markerColor: "#60A5FA", textColor: "text-blue-500" },
  편의점: { icon: Store, markerColor: "#38BDF8", textColor: "text-sky-500" },
  "문화/여가": { icon: Theater, markerColor: "#C084FC", textColor: "text-purple-500" },
  영화관: { icon: Popcorn, markerColor: "#A855F7", textColor: "text-purple-600" },
  VIP콕: { icon: Gem, markerColor: "#7C3AED", textColor: "text-purple-600" },
  교육: { icon: GraduationCap, markerColor: "#FACC15", textColor: "text-yellow-500" },
  계절: { icon: Calendar, markerColor: "#22C55E", textColor: "text-green-500" },
  우리동네멤버십: { icon: Users, markerColor: "#1E293B", textColor: "text-slate-700" },
  default: { icon: Star, markerColor: "#94A3B8", textColor: "text-slate-500" },
} as const;

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
        icon: (size: number = 18) => <meta.icon size={size} color="white" />,
      },
    ])
  ) as Record<CategoryMarkerKey, CategoryMarkerStyle>;

// HTML 문자열로 변환 (마커용)
export const getCategoryIconHTML = (iconComponent: (size?: number) => ReactNode, size?: number) => {
  const icon = iconComponent(size);
  return renderToStaticMarkup(icon as React.ReactElement);
};

// 줌 레벨에 따른 마커 스타일 반환
export const getCategoryIconByZoom = (category?: string, name?: string, zoom: number = 15) => {
  if (!window.naver?.maps) return null;

  const key: CategoryMarkerKey = (category as CategoryMarkerKey) ?? "default";
  const style = CATEGORY_MARKER_STYLE[key] ?? CATEGORY_MARKER_STYLE["default"];
  const { color, icon } = style;
  const iconSize = 16; // 마커 크기에 맞는 아이콘 크기
  const svgString = getCategoryIconHTML(icon, iconSize);

  // 줌 레벨에 따른 마커 크기와 텍스트 표시 여부 결정
  const markerSize = 28;
  const fontSize = 11;
  let showText = true;

  // if (zoom <= 12) {
  //   // 줌 레벨이 작을 때: 작은 마커, 텍스트 숨김
  //   markerSize = 20;
  // } else
  if (zoom <= 15) {
    // 중간 줌 레벨: 중간 크기 마커, 작은 텍스트

    showText = false;
  } else {
    // 큰 줌 레벨: 기본 크기 마커, 기본 텍스트
  }

  return {
    content: `
    <div style="
      position: relative;
      width: ${markerSize}px;
      height: ${markerSize}px;
    ">
      <!-- 마커 원 -->
      <div style="
        width: ${markerSize}px;
        height: ${markerSize}px;
        border-radius: 50%;
        background: ${color};
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
      ">
        ${svgString}
      </div>

      ${
        showText && name
          ? `
        <!-- 텍스트는 마커 아래로 -->
        <div style="
          position: absolute;
          top: ${markerSize + 4}px;
          left: 50%;
          transform: translateX(-50%);
          font-size: ${fontSize}px;
          font-weight: bold;
          color: #333;
          white-space: nowrap;
          text-shadow:
            -1px -1px 0 white,
             1px -1px 0 white,
            -1px  1px 0 white,
             1px  1px 0 white,
             0px  0px 2px white;
        ">
          ${name}
        </div>
        `
          : ""
      }
    </div>
  `,
    size: new window.naver.maps.Size(markerSize, markerSize + (showText ? 20 : 0)),
    anchor: new window.naver.maps.Point(markerSize / 2, markerSize / 2),
  };
};
