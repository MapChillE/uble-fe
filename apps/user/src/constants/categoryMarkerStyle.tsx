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
  Search,
  MapPin,
  Navigation,
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

export type PinType = "store" | "search" | "myplace" | "current" | "selected";

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
  우리동네멤버십: { icon: Users, markerColor: "#A16207", textColor: "text-amber-700" },
  default: { icon: Search, markerColor: "#6366F1", textColor: "text-indigo-500" }, // 검색 결과와 동일한 보라색
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
export const getCategoryIconByZoom = (category?: string, name?: string, zoom: number = 16) => {
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
    // 중간 줌 레벨: 중간 크기 마커, 텍스트 숨김
    showText = false;
  } else {
    // 큰 줌 레벨: 기본 크기 마커, 기본 텍스트
    showText = true;
  }

  // 텍스트를 2줄로 분할하는 로직
  let textLines: string[] = [];
  let isTwoLines = false;

  if (showText && name) {
    const maxLength = 8;
    if (name.length <= maxLength) {
      textLines = [name];
    } else {
      // 공백을 기준으로 단어 분리
      const words = name.split(" ");

      if (words.length === 1) {
        // 단어가 하나면 중간에서 자르기
        const mid = Math.ceil(name.length / 2);
        textLines = [name.slice(0, mid), name.slice(mid)];
      } else {
        // 첫 번째 줄에 들어갈 단어들 찾기
        let firstLine = "";
        let secondLine = "";

        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          if (!word) continue;
          const testLine = firstLine + (firstLine ? " " : "") + word;
          if (testLine.length <= maxLength) {
            firstLine = testLine;
          } else {
            // 첫 번째 줄이 비어있으면 강제로 첫 번째 단어 추가
            if (!firstLine) {
              firstLine = word;
              secondLine = words.slice(i + 1).join(" ");
            } else {
              secondLine = words.slice(i).join(" ");
            }
            break;
          }
        }

        // 두 번째 줄이 비어있으면 첫 번째 줄을 중간에서 자르기
        if (!secondLine && firstLine.length > maxLength) {
          const mid = Math.ceil(firstLine.length / 2);
          secondLine = firstLine.slice(mid);
          firstLine = firstLine.slice(0, mid);
        }

        textLines = [firstLine, secondLine].filter((line) => line.length > 0);
      }
    }

    isTwoLines = textLines.length === 2;
  }

  const textHeight = isTwoLines ? 32 : 20; // 2줄일 때 높이 증가

  // default 카테고리일 때는 검색 결과와 동일한 물방울 핀 디자인 사용
  if (key === "default") {
    return getSearchResultIcon(name, zoom);
  }

  // 기존 원형 마커 디자인 (default가 아닌 경우)
  return {
    content: `
    <div style="
      position: relative;
      width: ${markerSize}px;
      height: ${markerSize}px;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
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
        showText && textLines.length > 0
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
          text-align: center;
          text-shadow:
            -1px -1px 0 white,
             1px -1px 0 white,
            -1px  1px 0 white,
             1px  1px 0 white,
             0px  0px 2px white;
          line-height: 1.2;
          max-width: 120px;
          word-break: keep-all;
        ">
          ${textLines.map((line) => `<div>${line}</div>`).join("")}
        </div>
        `
          : ""
      }
    </div>
  `,
    size: new window.naver.maps.Size(markerSize, markerSize + (showText ? textHeight : 0)),
    anchor: new window.naver.maps.Point(markerSize / 2, markerSize / 2),
  };
};

// 검색결과 마커 아이콘
export const getSearchResultIcon = (name?: string, zoom: number = 16) => {
  if (!window.naver?.maps) return null;

  const pinSize = 36;
  const fontSize = 11;
  let showText = zoom > 15;

  const iconString = getCategoryIconHTML(() => <Search size={16} color="white" />);

  return {
    content: `
    <div style="
      position: relative;
      width: ${pinSize}px;
      height: ${pinSize}px;
      z-index: 1000;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    ">
      <!-- 검색결과 물방울 핀 -->
      <div style="
        width: ${pinSize}px;
        height: ${pinSize}px;
        transform: rotate(-45deg);
        background: #6366F1;
        border-radius: 50% 50% 50% 0;
        box-shadow: 0 2px 6px rgba(0,0,0,0.25);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="transform: rotate(45deg);">
          ${iconString}
        </div>
      </div>

      ${
        showText && name
          ? `
        <!-- 텍스트는 마커 아래로 -->
        <div style="
          position: absolute;
          top: ${pinSize + 4}px;
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
    size: new window.naver.maps.Size(pinSize, pinSize + (showText ? 20 : 0)),
    anchor: new window.naver.maps.Point(pinSize / 2, pinSize),
  };
};

// 내장소 마커 아이콘
export const getMyPlaceIcon = (name?: string, zoom: number = 16) => {
  if (!window.naver?.maps) return null;

  const pinSize = 36;
  const fontSize = 11;
  let showText = zoom > 15;

  const iconString = getCategoryIconHTML(() => <Star size={16} color="white" />);

  return {
    content: `
    <div style="
      position: relative;
      width: ${pinSize}px;
      height: ${pinSize}px;
      z-index: 1000;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    ">
      <!-- 내장소 물방울 핀 -->
      <div style="
        width: ${pinSize}px;
        height: ${pinSize}px;
        transform: rotate(-45deg);
        background: #FACC15;
        border-radius: 50% 50% 50% 0;
        box-shadow: 0 2px 6px rgba(0,0,0,0.25);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="transform: rotate(45deg);">
          ${iconString}
        </div>
      </div>

      ${
        showText && name
          ? `
        <!-- 텍스트는 마커 아래로 -->
        <div style="
          position: absolute;
          top: ${pinSize + 4}px;
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
    size: new window.naver.maps.Size(pinSize, pinSize + (showText ? 20 : 0)),
    anchor: new window.naver.maps.Point(pinSize / 2, pinSize),
  };
};

// 현위치 마커 아이콘
export const getCurrentLocationIcon = () => {
  if (!window.naver?.maps) return null;

  return {
    content: `<div style="
        background: #f63b3b;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      ">
      </div>`,
    size: new window.naver.maps.Size(20, 20),
    anchor: new window.naver.maps.Point(10, 10),
  };
};
