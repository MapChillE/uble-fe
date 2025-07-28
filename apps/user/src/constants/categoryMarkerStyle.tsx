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
  HelpCircle, // default
} from "lucide-react";
import { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";

// iconComponent: () => ReactNode
export const getCategoryIconHTML = (iconComponent: () => ReactNode) => {
  const icon = iconComponent();
  return renderToStaticMarkup(icon as React.ReactElement);
};

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
  icon: () => ReactNode;
}

export const CATEGORY_MARKER_STYLE: Record<CategoryMarkerKey, CategoryMarkerStyle> = {
  액티비티: {
    color: "#F87171", // red-400
    icon: () => <Activity size={18} color="white" />,
  },
  "뷰티/건강": {
    color: "#A16207", // orange-400
    icon: () => <HeartPulse size={18} color="white" />,
  },
  쇼핑: {
    color: "#34D399", // emerald-400
    icon: () => <ShoppingCart size={18} color="white" />,
  },
  "생활/건강": {
    color: "#60A5FA", // blue-400
    icon: () => <Home size={18} color="white" />,
  },
  "문화/여가": {
    color: "#C084FC", // purple-400
    icon: () => <Theater size={18} color="white" />,
  },
  교육: {
    color: "#FACC15", // yellow-400
    icon: () => <GraduationCap size={18} color="white" />,
  },
  "여행/교통": {
    color: "#5EEAD4", // teal-300
    icon: () => <Plane size={18} color="white" />,
  },
  식당: {
    color: "#FB7185", // rose-400
    icon: () => <Utensils size={18} color="white" />,
  },
  카페: {
    color: "#FB923C", // warm brown tone
    icon: () => <Coffee size={18} color="white" />,
  },
  우리동네멤버십: {
    color: "#1E293B", // slate-800
    icon: () => <Users size={18} color="white" />,
  },
  default: {
    color: "#FB7185", // slate-400
    icon: () => <Heart size={18} color="white" />,
  },
};
