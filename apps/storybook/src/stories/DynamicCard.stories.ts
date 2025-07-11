import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import DynamicCard from "./DynamicCard";

const meta = {
  title: "Components/DynamicCard",
  component: DynamicCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
      description: "카드의 제목",
    },
    image: {
      control: { type: "text" },
      description: "카드 이미지 URL",
    },
    category: {
      control: { type: "text" },
      description: "카테고리",
    },
    discount: {
      control: { type: "text" },
      description: "할인율 (예: 10%)",
    },
    rank: {
      control: { type: "select" },
      options: ["VIP", "NORMAL", "LOCAL", "VIP_NORMAL"],
      description: "멤버십 등급",
    },
    isFavorite: {
      control: { type: "boolean" },
      description: "즐겨찾기 여부",
    },
    usageLimit: {
      control: { type: "text" },
      description: "사용 제한 (예: 월 1회)",
    },
  },
  args: {
    title: "테스트 카드",
    image: "/placeholder.svg",
    category: "카테고리",
    discount: "10%",
    rank: "NORMAL",
    isFavorite: false,
    usageLimit: "월 1회",
  },
} satisfies Meta<typeof DynamicCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 카드
export const Default: Story = {
  args: {
    title: "기본 카드",
    image: "/placeholder.svg",
    category: "카테고리",
    discount: "10%",
    rank: "NORMAL",
    isFavorite: false,
    usageLimit: "월 1회",
  },
};

// VIP 등급 카드
export const VIPCard: Story = {
  args: {
    title: "VIP 전용 카드",
    image: "/placeholder.svg",
    category: "프리미엄",
    discount: "20%",
    rank: "VIP",
    isFavorite: true,
    usageLimit: "월 3회",
  },
};

// LOCAL 등급 카드
export const LOCALCard: Story = {
  args: {
    title: "로컬 카드",
    image: "/placeholder.svg",
    category: "로컬",
    discount: "5%",
    rank: "LOCAL",
    isFavorite: false,
    usageLimit: "월 2회",
  },
};

// VIP_NORMAL 등급 카드
export const VIPNORMALCard: Story = {
  args: {
    title: "VIP 일반 카드",
    image: "/placeholder.svg",
    category: "일반",
    discount: "15%",
    rank: "VIP_NORMAL",
    isFavorite: true,
    usageLimit: "월 1회",
  },
};

// 즐겨찾기된 카드
export const FavoriteCard: Story = {
  args: {
    title: "즐겨찾기 카드",
    image: "/placeholder.svg",
    category: "인기",
    discount: "25%",
    rank: "NORMAL",
    isFavorite: true,
    usageLimit: "월 5회",
  },
};

// 할인 없는 카드
export const NoDiscountCard: Story = {
  args: {
    title: "할인 없는 카드",
    image: "/placeholder.svg",
    category: "일반",
    discount: "",
    rank: "NORMAL",
    isFavorite: false,
    usageLimit: "무제한",
  },
};

// 긴 제목 카드
export const LongTitleCard: Story = {
  args: {
    title: "매우 긴 제목을 가진 카드입니다. 이 제목은 한 줄을 넘어갈 수 있습니다.",
    image: "/placeholder.svg",
    category: "긴제목",
    discount: "30%",
    rank: "VIP",
    isFavorite: false,
    usageLimit: "월 1회",
  },
}; 