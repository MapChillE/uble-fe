import { Meta, StoryObj } from "@storybook/nextjs-vite";
import GenderRadio from "@user/components/user/GenderRadio";

const meta = {
  title: "Components/GenderRadio",
  component: GenderRadio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isModal: {
      control: { type: "boolean" },
      description: "모달 스타일 사용 여부",
    },
  },
} satisfies Meta<typeof GenderRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isModal: false,
  },
};

export const Modal: Story = {
  args: {
    isModal: true,
  },
};
