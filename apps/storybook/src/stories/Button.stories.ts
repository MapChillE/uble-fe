import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Button } from "@workspace/ui/components/button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "filter_select",
        "filter_unselect",
        "disabled",
        "onb_unselected",
        "onb_selected",
        "onb_enabled",
        "onb_disabled",
        "unselected",
        "period_selected",
        "kakao",
        "black",
        "outline",
        "modal_cancel",
        "modal_submit",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon", "full", "select", "feedback"],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ===== 필터링 선택 버튼 (카테고리, 기간) =====
export const FilterSelect: Story = {
  args: {
    variant: "filter_select",
    size: "sm",
    children: "필터링",
  },
};

export const FilterUnselect: Story = {
  args: {
    variant: "filter_unselect",
    size: "sm",
    children: "필터링",
  },
};

// ===== 온보딩 버튼 =====
export const OnboardingUnselected: Story = {
  args: {
    variant: "onb_unselected",
    size: "select",
    children: "온보딩 미선택",
  },
};

export const OnboardingSelected: Story = {
  args: {
    variant: "onb_selected",
    size: "select",
    children: "온보딩 선택됨",
  },
};

export const OnboardingEnabled: Story = {
  args: {
    variant: "onb_enabled",
    size: "full",
    children: "온보딩 활성화",
  },
};

export const OnboardingDisabled: Story = {
  args: {
    variant: "onb_disabled",
    size: "full",
    children: "온보딩 비활성화",
  },
};

// ===== 소셜 로그인 버튼 =====
export const KakaoLogin: Story = {
  args: {
    variant: "kakao",
    size: "full",
    children: "카카오 로그인",
  },
};

// ===== 프로필 수정 페이지 버튼 =====
export const MypageSelected: Story = {
  args: {
    variant: "onb_selected",
    size: "mypage",
    children: "VVIP",
  },
};

export const MypageUnselected: Story = {
  args: {
    variant: "onb_unselected",
    size: "mypage",
    children: "VVIP",
  },
};

// ===== 모달 버튼 =====
export const ModalCancel: Story = {
  args: {
    variant: "modal_cancel",
    size: "feedback",
    children: "취소",
  },
};

export const ModalSubmit: Story = {
  args: {
    variant: "modal_submit",
    size: "feedback",
    children: "확인",
  },
};

export const FeedbackSubmit: Story = {
  args: {
    variant: "black",
    size: "feedback",
    children: "제출",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "아웃라인 버튼",
  },
};

// ===== 비활성화 버튼 =====
export const Disabled: Story = {
  args: {
    variant: "disabled",
    children: "비활성화",
    disabled: true,
  },
};

// ===== 크기별 버튼 =====
export const FullWidth: Story = {
  args: {
    variant: "default",
    size: "full",
    children: "전체 너비 버튼",
  },
};

export const SelectSize: Story = {
  args: {
    variant: "default",
    size: "select",
    children: "선택 버튼",
  },
};

export const FeedbackSize: Story = {
  args: {
    variant: "default",
    size: "feedback",
    children: "피드백 버튼",
  },
};

// ===== 아이콘 버튼 =====
export const IconButton: Story = {
  args: {
    variant: "default",
    size: "icon",
    children: "🔍",
  },
};
