import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { BrandContent } from "@user/types/brand";
import DynamicCard from "../../../user/src/components/ui/DynamicCard";

// 더미 데이터 정의
const sampleBrand: BrandContent = {
  brandId: 1,
  name: "Awesome Brand",
  category: "패션",
  description: "트렌디한 의류를 만나보세요",
  imgUrl: "https://via.placeholder.com/150",
  isVIPcock: false,
  minRank: "NONE",
  bookmarked: false,
};

const meta = {
  title: "Components/DynamicCard",
  component: DynamicCard,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["vertical", "horizontal"],
      description: "카드 레이아웃 타입",
    },
    data: {
      control: "object",
      description: "브랜드/파트너 정보",
    },
    // onClick: { action: 'onClick' },
    // toggleFavorite: { action: 'toggleFavorite' },
  },
  args: {
    data: sampleBrand,
    variant: "vertical",
    // onClick: fn(),
    // toggleFavorite: fn(),
  },
} satisfies Meta<typeof DynamicCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── 스토리 정의 ──

// 세로 레이아웃
export const Vertical: Story = {};

// 가로 레이아웃
export const Horizontal: Story = {
  args: {
    variant: "horizontal",
  },
};

// 즐겨찾기된 상태 예시
export const Bookmarked: Story = {
  args: {
    data: { ...sampleBrand, bookmarked: true },
  },
};
